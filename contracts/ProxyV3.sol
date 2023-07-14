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
        address[] prjectAdmin;
        mapping(address => uint256) prjectAdminInv;
    }

    struct CommissionInTokenConfig {
        bool directTransfer;
        uint24 rate;
        uint256 capPerTransaction;
        uint256 capPerCampaign;
    }
    struct CommissionOutTokenConfig {
        uint24 rate;
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
        IERC20[] inTokens;
        IERC20[] outTokens;
        mapping(IERC20 => CommissionInTokenConfig) commissionInTokenConfig;
        mapping(IERC20 => CommissionOutTokenConfig) commissionOutTokenConfig;
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


    Project[] private projects;
    Campaign[] private campaigns;
    mapping(uint256 => mapping(IERC20 => uint256)) public projectBalance; // projectBalance[projectId][token] = balance
    mapping(uint256 => uint256[]) projectCampaignId; // projectCampaignId[projectId][idx] = campaignId
    mapping(uint256 => mapping(IERC20 => uint256)) public campaignAccumulatedCommission; // campaignAccumulatedCommission[campaignId][token] = commission
    mapping(uint256 => mapping(IERC20 => uint256)) public stakesBalance;
    mapping(IERC20 => uint256) public lastBalance;

    uint24 public protocolRate;
    mapping(IERC20 => uint256) public protocolFeeBalance;

    uint256 public claimantIdCount;
    mapping(uint256 => ClaimantInfo) public claimantsInfo; //claimantsInfo[id] = ClaimantInfo
    mapping(address => mapping(IERC20 => uint256)) public claimantIds; //claimantIds[address][IERC20] = id

    event SetProtocolRate(uint24 protocolRate);
    event NewProject(uint256 indexed projectId);
    event NewCampaign(uint256 indexed campaignId);
    event Stake(uint256 indexed projectId, IERC20 indexed token, uint256 amount, uint256 balance);
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

    function _transferAssetFrom(IERC20 token, uint256 amount) internal returns (uint256 balance) {
        balance = token.balanceOf(address(this));
        token.safeTransferFrom(msg.sender, address(this), amount);
        balance = token.balanceOf(address(this)) - balance;
    }
    function _safeTransferETH(address to, uint value) internal {
        (bool success,) = to.call{value:value}(new bytes(0));
        require(success, 'TransferHelper: ETH_TRANSFER_FAILED');
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
        project.prjectAdmin.push(msg.sender);
        project.prjectAdminInv[msg.sender] = 0;
        uint256 i;
        uint256 length = admins.length;
        while (i < length) {
            address admin = admins[i];
            project.prjectAdmin.push(admin);
            unchecked { i++; }
            project.prjectAdminInv[admin] = i; // owner is the first one
        }
        emit NewProject(projectId);
    }
    struct CampaignParams {
        uint256 projectId;
        uint24 maxInputTokensInEachCall;
        uint24 maxOutputTokensInEachCall;
        bool referrersRequireApproval;
        uint64 startDate;
        uint64 endDate;
        bytes24[] targetAndSelectors;
        IERC20[] inTokens;
        CommissionInTokenConfig[] commissionInTokenConfig;
        IERC20[] outTokens;
        CommissionOutTokenConfig[] commissionOutTokenConfig;
        address[] referrers;
    }
    function newCampaign(CampaignParams calldata params) external returns (uint256 campaignId) {
        require(params.projectId < projects.length, "Invalid projectId");
        Project storage project = projects[params.projectId];
        require(project.prjectAdmin[project.prjectAdminInv[msg.sender]] == msg.sender, "not a project admin");
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

        i = 0;
        length = params.inTokens.length;
        require(length == params.commissionInTokenConfig.length, "in token config length not matched");
        campaign.inTokens = params.inTokens;
        while (i < length) {
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
        if (returnArrays) {
            campaign.targetAndSelectors = _campaign.targetAndSelectors;
            uint256 i;
            uint256 length = _campaign.inTokens.length;
            campaign.inTokens = _campaign.inTokens;
            campaign.commissionInTokenConfig = new CommissionInTokenConfig[](length);
            while (i < length) {
                campaign.commissionInTokenConfig[i] = _campaign.commissionInTokenConfig[_campaign.inTokens[i]];
                unchecked { i++; }
            }
            i = 0;
            length = _campaign.outTokens.length;
            campaign.outTokens = _campaign.outTokens;
            campaign.commissionOutTokenConfig = new CommissionOutTokenConfig[](length);
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
        CommissionInTokenConfig[] memory commissionInTokenConfig,
        IERC20[] memory outTokens,
        CommissionOutTokenConfig[] memory commissionOutTokenConfig
    ) {
        Campaign storage _campaign = campaigns[campaignId];
        uint256 i;

        if (inTokensStart > _campaign.inTokens.length)
            inTokensStart = _campaign.inTokens.length;
        if (inTokensStart + inTokensLength > _campaign.inTokens.length)
            inTokensLength = _campaign.inTokens.length - inTokensStart;
        inTokens = new IERC20[](inTokensLength);
        commissionInTokenConfig = new CommissionInTokenConfig[](inTokensLength);
        while (i < inTokensLength) {
            inTokens[i] = _campaign.inTokens[i + inTokensStart];
            commissionInTokenConfig[i] = _campaign.commissionInTokenConfig[inTokens[i]];
            unchecked { i++; }
        }

        i = 0;
        if (outTokensStart > _campaign.outTokens.length)
            outTokensStart = _campaign.outTokens.length;
        if (outTokensStart + outTokensLength > _campaign.outTokens.length)
            outTokensLength = _campaign.outTokens.length - outTokensStart;
        outTokens = new IERC20[](outTokensLength);
        commissionOutTokenConfig = new CommissionOutTokenConfig[](outTokensLength);
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

    function addToDistributions(address claimant, IERC20 token, uint256 amount) internal {
        uint256 protocolFee = amount * protocolRate / 1e6;
        protocolFeeBalance[token] += protocolFee;
        unchecked { amount = amount - protocolFee; }

        uint256 claimantId = claimantIds[claimant][token];
        if (claimantId == 0) {
            ++claimantIdCount;
            claimantsInfo[claimantIdCount] = ClaimantInfo({
                claimant: claimant,
                token: token,
                balance: amount
            });
            claimantIds[claimant][token] = claimantIdCount;
        }
        else {
            claimantsInfo[claimantId].balance += amount;
        }
        emit AddCommission(claimant, token, amount, claimantsInfo[claimantId].balance, protocolFee, protocolFeeBalance[token]);
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

    function proxyCall(address referrer, uint256 campaignId, address target, TokensIn[] memory tokensIn, address to, IERC20[] memory tokensOut, bytes memory data) payable external {
        require(campaignId < campaigns.length, "invalid campaign");
        Campaign storage campaign = campaigns[campaignId];
        require(campaign.isTargetAndSelector[bytes24(abi.encodePacked(target,bytes4(data)))], "selector not matched");
        require(campaign.startDate <= block.timestamp && block.timestamp <= campaign.endDate, "campaign not started yet / already ended");
        require(campaign.referrersRequireApproval && campaign.referrers.length > 0 && campaign.referrers[campaign.referrersInv[referrer]] == referrer, "not a referrer");

        uint ethAmount;

        uint256 length = tokensIn.length;
        require(length <= campaign.maxInputTokensInEachCall, "inToken length exceeded");
        uint256 i;

        while (i < length){
            IERC20 token = tokensIn[i].token;
            uint256 amount = tokensIn[i].amount;
            CommissionInTokenConfig storage tokenConfig = campaign.commissionInTokenConfig[token];
            if (address(token) == address(0)) {
                require(ethAmount == 0, "more than one ETH transfer");
                require(msg.value == amount, "ETH amount not matched");
                ethAmount = amount;
            } else {
                if (tokenConfig.directTransfer) {
                    token.safeTransferFrom(msg.sender, target, amount);
                } else {
                    amount = _transferAssetFrom(token, amount);
                    // require(amount == tokensIn[i].amount, "amount not matched");
                    token.safeApprove(target, 0);
                    token.safeApprove(target, amount);
                }
            }
            emit TransferForward(target, token, msg.sender, amount);

            // deduct from stakes
            if (tokenConfig.rate > 0) {
                amount = amount * tokenConfig.rate / 1e6; // amount is commission from now on
                require(amount <= tokenConfig.capPerTransaction, "cap exceeded");
                require(amount <= stakesBalance[campaign.projectId][token], "not enough commission");
                unchecked { stakesBalance[campaign.projectId][token] -= amount; }
                campaignAccumulatedCommission[campaignId][token] += amount;
                require(campaignAccumulatedCommission[campaignId][token] <= tokenConfig.capPerCampaign, "accumulated commission exceeded limit");
                addToDistributions(referrer, token, amount); 
            }

            unchecked { i++; }
        }

        assembly {
            let ret := call(gas(), target, ethAmount, add(0x20,data), mload(data), 0, 0)
            // returndatacopy(0, 0, returndatasize())
            if eq(0, ret) {
                returndatacopy(0, 0, returndatasize())
                revert(0, returndatasize())
            }
        }

        // transfer token back
        length = tokensOut.length;
        require(length <= campaign.maxOutputTokensInEachCall, "outToken length exceeded");
        i = 0;
        while (i < length) {
            IERC20 outToken = tokensOut[i];
            CommissionOutTokenConfig storage tokenConfig = campaign.commissionOutTokenConfig[outToken];
            uint256 amount;
            if (address(outToken) == address(0)) {
                amount = address(this).balance - lastBalance[IERC20(address(0))];
                _safeTransferETH(to, amount);
            } else  {
                amount = outToken.balanceOf(address(this)) - lastBalance[outToken];
                outToken.safeTransfer(to, amount);
            }
            if (tokenConfig.rate > 0) {
                amount = amount * tokenConfig.rate / 1e6; // amount is commission from now on
                require(amount <= tokenConfig.capPerTransaction, "cap exceeded");
                require(amount <= stakesBalance[campaign.projectId][outToken], "not enough commission");
                unchecked { stakesBalance[campaign.projectId][outToken] -= amount; }
                campaignAccumulatedCommission[campaignId][outToken] += amount;
                require(campaignAccumulatedCommission[campaignId][outToken] <= tokenConfig.capPerCampaign, "accumulated commission exceeded limit");
                addToDistributions(referrer, outToken, amount); 
            }
            emit TransferBack(target, outToken, to, amount);
            unchecked { i++; }
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