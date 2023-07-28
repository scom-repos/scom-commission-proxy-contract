// Commissions paid by projects

// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Authorization.sol";

contract ProxyV3 is Authorization {
    using SafeERC20 for IERC20;

    struct Project {
        address owner;
        address newOwner;
        address[] projectAdmins;
        mapping(address => uint256) projectAdminInv;
    }

    struct CommissionTokenConfig {
        uint24 rate;
        bool feeOnProjectOwner;
        uint256 capPerTransaction;
        uint256 capPerCampaign;
    }
    struct Campaign {
        uint256 projectId;
        uint24 maxInputTokensInEachCall;
        uint24 maxOutputTokensInEachCall;
        bool referrersRequireApproval;
        uint64 startDate;
        uint64 endDate;
        bytes24[] targetAndSelectors;
        mapping(bytes24 => bool) isTargetAndSelector;
        // token == 0 for native toekn
        bool acceptAnyInToken; // if set to false, either rate/feeOnProjectOwner has to be set
        bool acceptAnyOutToken; // save as above
        IERC20[] inTokens;
        IERC20[] outTokens;
        mapping(IERC20 => bool) directTransferInToken;
        mapping(IERC20 => CommissionTokenConfig) commissionInTokenConfig;
        mapping(IERC20 => CommissionTokenConfig) commissionOutTokenConfig;
        address[] referrers;
        mapping(address => uint256) referrersInv;
    }

    struct Commission {
        address to;
        uint256 amount;
    }
    struct TokensIn {
        IERC20 token; 
        uint256 amount;
    }
    struct ClaimantInfo {
        address claimant;
        IERC20 token;
        uint256 balance;
    }

    // protocol data
    uint24 public protocolRate;
    mapping(IERC20 => uint256) public protocolFeeBalance;
    mapping(IERC20 => uint256) public lastBalance;

    // project / campaign data
    Project[] private projects;
    Campaign[] private campaigns;
    mapping(uint256 => uint256[]) projectCampaignId; // projectCampaignId[projectId][idx] = campaignId
    mapping(uint256 => mapping(IERC20 => uint256)) public stakesBalance; // stakesBalance[projectId][token]
    mapping(uint256 => mapping(IERC20 => uint256)) public campaignAccumulatedCommission; // campaignAccumulatedCommission[campaignId][token] = commission

    // claimant data
    uint256 public claimantIdCount;
    mapping(uint256 => ClaimantInfo) public claimantsInfo; //claimantsInfo[id] = ClaimantInfo
    mapping(address => mapping(IERC20 => uint256)) public claimantIds; //claimantIds[address][IERC20] = id

    event SetProtocolRate(uint24 protocolRate);
    event NewProject(uint256 indexed projectId);
    event TransferProjectOwnership(uint256 indexed projectId, address newOwner);
    event TakeoverProjectOwnership(uint256 indexed projectId, address newOwner);
    event AddProjectAdmin(uint256 indexed projectId, address indexed admin);
    event RemoveProjectAdmin(uint256 indexed projectId, address indexed admin);
    event NewCampaign(uint256 indexed campaignId);
    event Stake(uint256 indexed projectId, IERC20 indexed token, uint256 amount, uint256 balance);
    event Unstake(uint256 indexed projectId, IERC20 indexed token, uint256 amount, uint256 balance);
    event TransferForward(address indexed target, IERC20 indexed token, address sender, uint256 amount);
    event TransferBack(address indexed target, IERC20 indexed token, address sender, uint256 amount);
    event Claim(address indexed from, IERC20 indexed token, uint256 amount);
    event ClaimProtocolFee(IERC20 indexed token, uint256 amount);
    event AddCommission(address to, IERC20 token, uint256 commission, uint256 commissionBalance, uint256 protocolFee, uint256 protocolFeeBalance);
    event Skim(IERC20 indexed token, address indexed to, uint256 amount);

    constructor(uint24 _protocolRate) {
        protocolRate = _protocolRate;
        emit SetProtocolRate(_protocolRate);
    }

    receive() external payable {}

    function _transferAssetFrom(IERC20 token, uint256 amount) internal returns (uint256 balance) {
        balance = token.balanceOf(address(this));
        token.safeTransferFrom(msg.sender, address(this), amount);
        balance = token.balanceOf(address(this)) - balance;
    }
    function _safeTransferETH(address to, uint value) internal {
        (bool success,) = to.call{value:value}(new bytes(0));
        require(success, 'ETH_TRANSFER_FAILED');
    }

    function setProtocolRate(uint24 newRate) external {
        protocolRate = newRate;
        emit SetProtocolRate(newRate);
    }

    function newProject(address[] calldata admins) external returns (uint256 projectId) {
        projectId = projects.length;
        projects.push();
        Project storage project = projects[projectId];
        project.owner = msg.sender;
        project.projectAdmins.push(msg.sender);
        project.projectAdminInv[msg.sender] = 0;
        uint256 i;
        uint256 length = admins.length;
        while (i < length) {
            address admin = admins[i];
            project.projectAdmins.push(admin);
            unchecked { i++; }
            project.projectAdminInv[admin] = i; // owner is the first one
        }
        emit NewProject(projectId);
    }
    function getProject(uint256 projectId) external view returns (
        address owner,
        address newOwner,
        address[] memory projectAdmins
    ) {
        Project storage project = projects[projectId];
        owner = project.owner;
        newOwner = project.newOwner;
        projectAdmins = new address[](project.projectAdmins.length);
        projectAdmins = project.projectAdmins;
    }
    function getProjectsLength() external view returns (uint256 length) {
        length = projects.length;
    }
    function getProjectAdminsLength(uint256 projectId) external view returns (uint256 length) {
        length = projects[projectId].projectAdmins.length;
    }
    function transferProjectOwnership(uint256 projectId, address newOwner) external {
        Project storage project = projects[projectId];
        require(msg.sender == project.owner, "not from owner");
        project.newOwner = newOwner;
        emit TransferProjectOwnership(projectId, newOwner);
    }
    function takeoverProjectOwnership(uint256 projectId) external {
        Project storage project = projects[projectId];
        require(msg.sender == project.newOwner, "not from owner");
        _removeProjectAdmin(projectId, project, project.owner);
        project.owner = msg.sender;
        project.newOwner = address(0);
        _addProjectAdmin(projectId, project, newOwner);
        emit TakeoverProjectOwnership(projectId, msg.sender);
    }
    function addProjectAdmin(uint256 projectId, address admin) external {
        Project storage project = projects[projectId];
        require(msg.sender == project.newOwner, "not from owner");
        _addProjectAdmin(projectId, project, admin);
    }
    function _addProjectAdmin(uint256 projectId, Project storage project, address admin) internal {
        if (project.projectAdmins[project.projectAdminInv[admin]] != admin) {
            project.projectAdminInv[admin] = project.projectAdmins.length;
            project.projectAdmins.push(admin);
            emit AddProjectAdmin(projectId, admin);
        }
    }
    function removeProjectAdmin(uint256 projectId, address admin) external {
        Project storage project = projects[projectId];
        require(msg.sender == project.newOwner, "not from owner");
        _removeProjectAdmin(projectId, project, admin);
    }
    function _removeProjectAdmin(uint256 projectId, Project storage project, address admin) internal {
        uint256 index = project.projectAdminInv[admin];
        require(project.projectAdmins[index] == admin, "not an admin");
        uint256 lastIndex = project.projectAdmins.length - 1;
        if (index != lastIndex){
            address last = project.projectAdmins[lastIndex];
            project.projectAdmins[index] = last;
            project.projectAdminInv[last] = index;
        }
        project.projectAdmins.pop();
        delete project.projectAdminInv[admin];
        emit RemoveProjectAdmin(projectId, admin);
    }
    struct CampaignParams {
        uint256 projectId;
        uint24 maxInputTokensInEachCall;
        uint24 maxOutputTokensInEachCall;
        bool referrersRequireApproval;
        uint64 startDate;
        uint64 endDate;
        bytes24[] targetAndSelectors;
        bool acceptAnyInToken;
        bool acceptAnyOutToken;
        IERC20[] inTokens;
        bool[] directTransferInToken;
        CommissionTokenConfig[] commissionInTokenConfig;
        IERC20[] outTokens;
        CommissionTokenConfig[] commissionOutTokenConfig;
        address[] referrers;
    }
    function newCampaign(CampaignParams calldata params) external returns (uint256 campaignId) {
        require(params.projectId < projects.length, "Invalid projectId");
        Project storage project = projects[params.projectId];
        require(project.projectAdmins[project.projectAdminInv[msg.sender]] == msg.sender, "not a project admin");
        require(params.startDate <= params.endDate, "invalid campaign date");
        campaignId = campaigns.length;

        projectCampaignId[params.projectId].push(campaignId);

        campaigns.push();
        Campaign storage campaign = campaigns[campaignId];
        campaign.projectId = params.projectId;
        campaign.maxInputTokensInEachCall = params.maxInputTokensInEachCall;
        campaign.maxOutputTokensInEachCall = params.maxOutputTokensInEachCall;
        campaign.referrersRequireApproval = params.referrersRequireApproval;
        campaign.startDate = params.startDate;
        campaign.endDate = params.endDate;

        uint256 i;
        uint256 length = params.targetAndSelectors.length;
        campaign.targetAndSelectors = params.targetAndSelectors;
        while (i < length) {
            campaign.isTargetAndSelector[params.targetAndSelectors[i]] = true;
            unchecked { i++; }
        }

        campaign.acceptAnyInToken = params.acceptAnyInToken;
        campaign.acceptAnyOutToken = params.acceptAnyOutToken;

        i = 0;
        length = params.inTokens.length;
        require(length == params.directTransferInToken.length && length == params.commissionInTokenConfig.length, "in token config length not matched");
        campaign.inTokens = params.inTokens;
        while (i < length) {
            campaign.directTransferInToken[params.inTokens[i]] = params.directTransferInToken[i];
            campaign.commissionInTokenConfig[params.inTokens[i]] = params.commissionInTokenConfig[i];
            unchecked { i++; }
        }

        i = 0;
        length = params.outTokens.length;
        require(length == params.commissionOutTokenConfig.length, "out token config length not matched");
        campaign.outTokens = params.outTokens;
        while (i < length) {
            campaign.commissionOutTokenConfig[params.outTokens[i]] = params.commissionOutTokenConfig[i];
            unchecked { i++; }
        }

        i = 0;
        length = params.referrers.length;
        require(params.referrersRequireApproval == (length!=0), "invalid referrers length");
        campaign.referrers = params.referrers;
        while (i < length) {
            campaign.referrersInv[params.referrers[i]] = i;
            unchecked { i++; }
        }
        emit NewCampaign(campaignId);
    }
    function getCampaign(uint256 campaignId, bool returnArrays) external view returns (CampaignParams memory campaign) {
        Campaign storage _campaign = campaigns[campaignId];
        campaign.projectId = _campaign.projectId;
        campaign.maxInputTokensInEachCall = _campaign.maxInputTokensInEachCall;
        campaign.maxOutputTokensInEachCall = _campaign.maxOutputTokensInEachCall;
        campaign.referrersRequireApproval = _campaign.referrersRequireApproval;
        campaign.startDate = _campaign.startDate;
        campaign.endDate = _campaign.endDate;
        campaign.acceptAnyInToken = _campaign.acceptAnyInToken;
        campaign.acceptAnyOutToken = _campaign.acceptAnyOutToken;

        if (returnArrays) {
            campaign.targetAndSelectors = _campaign.targetAndSelectors;
            uint256 i;
            uint256 length = _campaign.inTokens.length;
            campaign.inTokens = _campaign.inTokens;
            campaign.directTransferInToken = new bool[](length);
            campaign.commissionInTokenConfig = new CommissionTokenConfig[](length);
            while (i < length) {
                campaign.directTransferInToken[i] = _campaign.directTransferInToken[_campaign.inTokens[i]];
                campaign.commissionInTokenConfig[i] = _campaign.commissionInTokenConfig[_campaign.inTokens[i]];
                unchecked { i++; }
            }
            i = 0;
            length = _campaign.outTokens.length;
            campaign.outTokens = _campaign.outTokens;
            campaign.commissionOutTokenConfig = new CommissionTokenConfig[](length);
            while (i < length) {
                campaign.commissionOutTokenConfig[i] = _campaign.commissionOutTokenConfig[_campaign.outTokens[i]];
                unchecked { i++; }
            }
            campaign.referrers = _campaign.referrers;
        }
    }
    function getCampaignArrayLength(uint256 campaignId) external view returns (uint256 targetAndSelectorsLength, uint256 inTokensLength, uint256 outTokensLength, uint256 referrersLength) {
        Campaign storage _campaign = campaigns[campaignId];
        targetAndSelectorsLength = _campaign.targetAndSelectors.length;
        inTokensLength = _campaign.inTokens.length;
        outTokensLength = _campaign.outTokens.length;
        referrersLength = _campaign.referrers.length;
    }
    function getCampaignArrayData1(
        uint256 campaignId, 
        uint256 targetAndSelectorsStart, uint256 targetAndSelectorsLength, 
        uint256 referrersStart, uint256 referrersLength
    ) external view returns (
        bytes24[] memory targetAndSelectors,
        address[] memory referrers
    ) {
        Campaign storage _campaign = campaigns[campaignId];
        uint256 i;

        if (targetAndSelectorsStart > _campaign.targetAndSelectors.length)
            targetAndSelectorsStart = _campaign.targetAndSelectors.length;
        if (targetAndSelectorsStart + targetAndSelectorsLength > _campaign.targetAndSelectors.length)
            targetAndSelectorsLength = _campaign.targetAndSelectors.length - targetAndSelectorsStart;
        targetAndSelectors = new bytes24[](targetAndSelectorsLength);
        while (i < targetAndSelectorsLength) {
            targetAndSelectors[i] = _campaign.targetAndSelectors[i + targetAndSelectorsStart];
            unchecked { i++; }
        }

        i = 0;
        if (referrersStart > _campaign.referrers.length)
            referrersStart = _campaign.referrers.length;
        if (referrersStart + referrersLength > _campaign.referrers.length)
            referrersLength = _campaign.referrers.length - referrersStart;
        referrers = new address[](referrersLength);
        while (i < referrersLength) {
            referrers[i] = _campaign.referrers[i + referrersStart];
            unchecked { i++; }
        }
    }
    function getCampaignArrayData2(
        uint256 campaignId, 
        uint256 inTokensStart, uint256 inTokensLength, 
        uint256 outTokensStart, uint256 outTokensLength
    ) external view returns (
        IERC20[] memory inTokens,
        bool[] memory directTransferInToken,
        CommissionTokenConfig[] memory commissionInTokenConfig,
        IERC20[] memory outTokens,
        CommissionTokenConfig[] memory commissionOutTokenConfig
    ) {
        Campaign storage _campaign = campaigns[campaignId];
        uint256 i;

        if (inTokensStart > _campaign.inTokens.length)
            inTokensStart = _campaign.inTokens.length;
        if (inTokensStart + inTokensLength > _campaign.inTokens.length)
            inTokensLength = _campaign.inTokens.length - inTokensStart;
        inTokens = new IERC20[](inTokensLength);
        directTransferInToken = new bool[](inTokensLength);
        commissionInTokenConfig = new CommissionTokenConfig[](inTokensLength);
        while (i < inTokensLength) {
            inTokens[i] = _campaign.inTokens[i + inTokensStart];
            directTransferInToken[i] = _campaign.directTransferInToken[inTokens[i]];
            commissionInTokenConfig[i] = _campaign.commissionInTokenConfig[inTokens[i]];
            unchecked { i++; }
        }

        i = 0;
        if (outTokensStart > _campaign.outTokens.length)
            outTokensStart = _campaign.outTokens.length;
        if (outTokensStart + outTokensLength > _campaign.outTokens.length)
            outTokensLength = _campaign.outTokens.length - outTokensStart;
        outTokens = new IERC20[](outTokensLength);
        commissionOutTokenConfig = new CommissionTokenConfig[](outTokensLength);
        while (i < outTokensLength) {
            outTokens[i] = _campaign.outTokens[i + outTokensStart];
            commissionOutTokenConfig[i] = _campaign.commissionOutTokenConfig[outTokens[i]];
            unchecked { i++; }
        }
    }
    // function setCommissionConfig(address contractAddress, bytes4 selector, CommissionConfig calldata config) external {
    //     require(msg.sender == contractOwner[contractAddress], "not from contract owner");
    //     bytes24 id = bytes24(abi.encodePacked(contractAddress, selector));
    //     commissionConfig[id] = config;
    // }
    // function setCommissionInTokenConfig(address contractAddress, bytes4 selector, IERC20 token, CommissionTokenConfig calldata config) external {
    //     require(msg.sender == contractOwner[contractAddress], "not from contract owner");
    //     bytes24 id = bytes24(abi.encodePacked(contractAddress, selector));
    //     commissionInTokenConfig[id][token] = config;
    // }
    // function setCommissionOutTokenConfig(address contractAddress, bytes4 selector, IERC20 token, CommissionTokenConfig calldata config) external {
    //     require(msg.sender == contractOwner[contractAddress], "not from contract owner");
    //     bytes24 id = bytes24(abi.encodePacked(contractAddress, selector));
    //     commissionOutTokenConfig[id][token] = config;
    // }
    // function addReferrer(address contractAddress, bytes4 selector, address referrer) external {
    //     require(msg.sender == contractOwner[contractAddress], "not from contract owner");
    //     bytes24 id = bytes24(abi.encodePacked(contractAddress, selector));
    //     validReferrer[id][referrer] = true;
    // }
    // function removeReferrer(address contractAddress, bytes4 selector, address referrer) external {
    //     require(msg.sender == contractOwner[contractAddress], "not from contract owner");
    //     bytes24 id = bytes24(abi.encodePacked(contractAddress, selector));
    //     delete validReferrer[id][referrer];
    // }

    function addToDistributions(Campaign storage campaign, uint256 campaignId, address claimant, bool isTokenIn, IERC20 token, uint256 amount) internal {
        CommissionTokenConfig storage tokenConfig = isTokenIn ? campaign.commissionInTokenConfig[token] : campaign.commissionOutTokenConfig[token];
        if (tokenConfig.rate > 0) {
            uint256 projectId = campaign.projectId;
            amount = amount * tokenConfig.rate / 1e6; // amount is commission from now on
            require(amount <= tokenConfig.capPerTransaction, "cap exceeded");
            uint256 protocolFee = amount * protocolRate / 1e6;
            protocolFeeBalance[token] += protocolFee;

            uint256 claimantAmount;
            uint256 projectOwnerAmount;
            if (tokenConfig.feeOnProjectOwner){
                claimantAmount = amount;
                projectOwnerAmount = amount + protocolFee;
            } else {
                claimantAmount = amount - protocolFee;
                projectOwnerAmount = amount;
            }

            require(projectOwnerAmount <= stakesBalance[projectId][token], "not enough commission");
            unchecked { stakesBalance[projectId][token] -= projectOwnerAmount; }
            campaignAccumulatedCommission[campaignId][token] += projectOwnerAmount;
            require(campaignAccumulatedCommission[campaignId][token] <= tokenConfig.capPerCampaign, "accumulated commission exceeded limit");

            uint256 claimantId = claimantIds[claimant][token];
            if (claimantId == 0) {
                ++claimantIdCount;
                claimantsInfo[claimantIdCount] = ClaimantInfo({
                    claimant: claimant,
                    token: token,
                    balance: claimantAmount
                });
                claimantIds[claimant][token] = claimantIdCount;
            }
            else {
                claimantsInfo[claimantId].balance += claimantAmount;
            }
            emit AddCommission(claimant, token, claimantAmount, claimantsInfo[claimantId].balance, protocolFee, protocolFeeBalance[token]);
        }
    }
    function getClaimantBalance(address claimant, IERC20 token) external view returns (uint256) {
        uint256 claimantId = claimantIds[claimant][token];
        return claimantsInfo[claimantId].balance;
    }
    function getClaimantsInfo(uint256 fromId, uint256 count) external view returns (ClaimantInfo[] memory claimantInfoList) {
        require(fromId > 0 && fromId <= claimantIdCount, "out of bounds");
        uint256 maxCount = claimantIdCount - fromId + 1;
        if (count > maxCount) {
            count = maxCount;
        }
        claimantInfoList = new ClaimantInfo[](count);
        uint256 currId = fromId;
        for (uint256 i = 0; i < count; i++) {
            claimantInfoList[i] = claimantsInfo[currId];
            ++currId;
        }
    }

    function proxyCall(uint256 campaignId, address target, bytes memory data, address referrer, address to, TokensIn[] memory tokensIn, IERC20[] memory tokensOut) payable external {
        require(campaignId < campaigns.length, "invalid campaign");
        Campaign storage campaign = campaigns[campaignId];
        require(campaign.isTargetAndSelector[bytes24(abi.encodePacked(target,bytes4(data)))], "selector not matched");
        require(campaign.startDate <= block.timestamp && block.timestamp <= campaign.endDate, "campaign not started yet / already ended");
        require(!campaign.referrersRequireApproval || (campaign.referrers.length > 0 && campaign.referrers[campaign.referrersInv[referrer]] == referrer), "not a referrer");

        {
        uint ethAmount;
        uint256 length = tokensIn.length;
        require(length <= campaign.maxInputTokensInEachCall, "inToken length exceeded");
        uint256 i;
        while (i < length){
            IERC20 inToken = tokensIn[i].token;
            if (i > 0) {
                require(address(inToken) > address(tokensIn[i-1].token), "in token not in ascending order");
            }
            // check if it is an accepted token
            if (!campaign.acceptAnyInToken){
                CommissionTokenConfig storage tokenConfig = campaign.commissionInTokenConfig[inToken];
                require(tokenConfig.rate > 0 || tokenConfig.feeOnProjectOwner, "not an accepted tokens");
            }
            // transfer ETH / token to target
            uint256 amount = tokensIn[i].amount;
            if (address(inToken) == address(0)) {
                require(ethAmount == 0, "more than one ETH transfer");
                require(msg.value == amount, "ETH amount not matched");
                ethAmount = amount;
            } else {
                if (campaign.directTransferInToken[inToken]) {
                    inToken.safeTransferFrom(msg.sender, target, amount);
                } else {
                    amount = _transferAssetFrom(inToken, amount);
                    // require(amount == tokensIn[i].amount, "amount not matched");
                    inToken.safeApprove(target, 0);
                    inToken.safeApprove(target, amount);
                }
            }
            emit TransferForward(target, inToken, msg.sender, amount);
            unchecked { i++; }
        }
        // call target
        assembly {
            let ret := call(gas(), target, ethAmount, add(0x20,data), mload(data), 0, 0)
            // returndatacopy(0, 0, returndatasize())
            if eq(0, ret) {
                returndatacopy(0, 0, returndatasize())
                revert(0, returndatasize())
            }
        }
        }

        {
        // transfer token back
        uint256 length = tokensOut.length;
        require(length <= campaign.maxOutputTokensInEachCall, "outToken length exceeded");
        uint256 i;
        uint256 j;
        while (i < length) {
            IERC20 outToken = tokensOut[i];
            if (i > 0) {
                require(address(outToken) > address(tokensOut[i-1]), "in token not in ascending order");
            }
            // check if it is an accepted token
            if (!campaign.acceptAnyOutToken){
                CommissionTokenConfig storage tokenConfig = campaign.commissionOutTokenConfig[outToken];
                require(tokenConfig.rate > 0 || tokenConfig.feeOnProjectOwner, "not an accepted tokens");
            }
            uint256 amountBack;
            if (address(outToken) == address(0)) {
                amountBack = address(this).balance - lastBalance[IERC20(address(0))];
                _safeTransferETH(to, amountBack);
            } else {
                amountBack = outToken.balanceOf(address(this)) - lastBalance[outToken];
                outToken.safeTransfer(to, amountBack);
            }

            // commissions
            // deduct transfer back amount from input
            while (j < tokensIn.length && address(tokensIn[j].token) < address(outToken)) {
                addToDistributions(campaign, campaignId, referrer, true, tokensIn[j].token, tokensIn[j].amount); 
                unchecked { j++; }
            }
            if (j < tokensIn.length && address(tokensIn[j].token) == address(outToken)) {
                addToDistributions(campaign, campaignId, referrer, true, tokensIn[j].token, tokensIn[j].amount-amountBack); 
                unchecked { j++; }
            } else {
                addToDistributions(campaign, campaignId, referrer, false, outToken, amountBack); 
            }

            emit TransferBack(target, outToken, to, amountBack);
            unchecked { i++; }
        }
        // rest of tokens input
        while (j < tokensIn.length) {
            addToDistributions(campaign, campaignId, referrer, true, tokensIn[j].token, tokensIn[j].amount); 
            unchecked { j++; }
        }        
        }
        assembly {
            returndatacopy(0, 0, returndatasize())
            return(0, returndatasize())
        }
    }

    // stake
    function _stake(uint256 projectId, IERC20 token, uint256 amount) internal {
        if (address(token) != address(0))
            amount = _transferAssetFrom(token, amount);
        stakesBalance[projectId][token] += amount;
        lastBalance[token] += amount;

        emit Stake(projectId, token, amount, stakesBalance[projectId][token]);
    }
    function stake(uint256 projectId, IERC20 token, uint256 amount) external {
        _stake(projectId, token, amount);
    }
    function stakeETH(uint256 projectId) external payable {
        _stake(projectId, IERC20(address(0)), msg.value);
    }
    function stakeMultiple(uint256 projectId, IERC20[] calldata token, uint256[] calldata amount) external payable {
        uint256 length = token.length;
        require(length == amount.length, "length not matched");
        uint256 i;
        while (i < length) {
            _stake(projectId, token[i], amount[i]);
            unchecked { i++; }
        }
        if (msg.value > 0) {
            _stake(projectId, IERC20(address(0)), msg.value);
        }
    }
    function _unstake(uint256 projectId, IERC20 token, uint256 amount) internal {
        require(msg.sender == projects[projectId].owner, "not from owner");
        require(amount <= stakesBalance[projectId][token], "amount exceeded balance");
        unchecked {
            stakesBalance[projectId][token] -= amount;   
        }
        lastBalance[token] -= amount;
        if (address(token) != address(0))
            token.safeTransfer(msg.sender, amount);
        else
            _safeTransferETH(msg.sender, amount);

        emit Unstake(projectId, token, amount, stakesBalance[projectId][token]);
    }
    function unstake(uint256 projectId, IERC20 token, uint256 amount) external {
        _unstake(projectId, token, amount);
    }
    function unstakeETH(uint256 projectId) external payable {
        _unstake(projectId, IERC20(address(0)), msg.value);
    }
    function unstakeMultiple(uint256 projectId, IERC20[] calldata token, uint256[] calldata amount) external payable {
        uint256 length = token.length;
        require(length == amount.length, "length not matched");
        uint256 i;
        while (i < length) {
            _unstake(projectId, token[i], amount[i]);
            unchecked { i++; }
        }
    }

    // commissions
    function _claim(IERC20 token) internal {
        uint256 claimantId = claimantIds[msg.sender][token];
        ClaimantInfo memory claimantInfo = claimantsInfo[claimantId];
        uint256 balance = claimantInfo.balance;
        claimantsInfo[claimantId].balance = 0;
        lastBalance[token] -= balance;
        if (address(token) == address(0)) {
            _safeTransferETH(msg.sender, balance);
        } else {
            token.safeTransfer(msg.sender, balance);
        }
        emit Claim(msg.sender, token, balance);
    }
    function claim(IERC20 token) external {
        _claim(token);
    }
    function claimMultiple(IERC20[] calldata tokens) external {
        uint256 length = tokens.length;
        for (uint256 i ; i < length ; i++) {
            _claim(tokens[i]);
        }
    }

    function _claimProtocolFee(IERC20 token) internal {
        uint256 balance = protocolFeeBalance[token];
        protocolFeeBalance[token] = 0;
        lastBalance[token] -= balance;
        if (address(token) == address(0)) {
            _safeTransferETH(msg.sender, balance);
        } else {
            token.safeTransfer(msg.sender, balance);
        }
        emit ClaimProtocolFee(token, balance);
    }
    function claimProtocolFee(IERC20 token) external onlyOwner {
        _claimProtocolFee(token);
    }
    function claimMultipleProtocolFee(IERC20[] calldata tokens) external onlyOwner {
        uint256 length = tokens.length;
        for (uint256 i ; i < length ; i++) {
            _claimProtocolFee(tokens[i]);
        }
    }

    // transfer excess tokens to caller
    function skim(IERC20[] calldata tokens) external {
        uint256 length = tokens.length;
        for (uint256 i = 0 ; i < length ; i++) {
            uint256 amount;
            IERC20 token = tokens[i];
            if (address(token) == address(0)) {
                amount = address(this).balance;
                amount = amount - lastBalance[IERC20(address(0))];
                _safeTransferETH(msg.sender, amount);
            } else {
                amount = token.balanceOf(address(this));
                amount = amount - lastBalance[token];
                token.safeTransfer(msg.sender, amount);
            }
            emit Skim(token, msg.sender, amount);
        }
    }
}