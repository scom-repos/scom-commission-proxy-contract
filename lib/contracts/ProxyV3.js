"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyV3 = void 0;
const eth_contract_1 = require("@ijstech/eth-contract");
const ProxyV3_json_1 = __importDefault(require("./ProxyV3.json"));
class ProxyV3 extends eth_contract_1.Contract {
    constructor(wallet, address) {
        super(wallet, address, ProxyV3_json_1.default.abi, ProxyV3_json_1.default.bytecode);
        this.assign();
    }
    deploy(protocolRate, options) {
        return this.__deploy([this.wallet.utils.toString(protocolRate)], options);
    }
    parseAddCommissionEvent(receipt) {
        return this.parseEvents(receipt, "AddCommission").map(e => this.decodeAddCommissionEvent(e));
    }
    decodeAddCommissionEvent(event) {
        let result = event.data;
        return {
            to: result.to,
            token: result.token,
            commission: new eth_contract_1.BigNumber(result.commission),
            commissionBalance: new eth_contract_1.BigNumber(result.commissionBalance),
            protocolFee: new eth_contract_1.BigNumber(result.protocolFee),
            protocolFeeBalance: new eth_contract_1.BigNumber(result.protocolFeeBalance),
            _event: event
        };
    }
    parseAddProjectAdminEvent(receipt) {
        return this.parseEvents(receipt, "AddProjectAdmin").map(e => this.decodeAddProjectAdminEvent(e));
    }
    decodeAddProjectAdminEvent(event) {
        let result = event.data;
        return {
            projectId: new eth_contract_1.BigNumber(result.projectId),
            admin: result.admin,
            _event: event
        };
    }
    parseAuthorizeEvent(receipt) {
        return this.parseEvents(receipt, "Authorize").map(e => this.decodeAuthorizeEvent(e));
    }
    decodeAuthorizeEvent(event) {
        let result = event.data;
        return {
            user: result.user,
            _event: event
        };
    }
    parseClaimEvent(receipt) {
        return this.parseEvents(receipt, "Claim").map(e => this.decodeClaimEvent(e));
    }
    decodeClaimEvent(event) {
        let result = event.data;
        return {
            from: result.from,
            token: result.token,
            amount: new eth_contract_1.BigNumber(result.amount),
            _event: event
        };
    }
    parseClaimProtocolFeeEvent(receipt) {
        return this.parseEvents(receipt, "ClaimProtocolFee").map(e => this.decodeClaimProtocolFeeEvent(e));
    }
    decodeClaimProtocolFeeEvent(event) {
        let result = event.data;
        return {
            token: result.token,
            amount: new eth_contract_1.BigNumber(result.amount),
            _event: event
        };
    }
    parseDeauthorizeEvent(receipt) {
        return this.parseEvents(receipt, "Deauthorize").map(e => this.decodeDeauthorizeEvent(e));
    }
    decodeDeauthorizeEvent(event) {
        let result = event.data;
        return {
            user: result.user,
            _event: event
        };
    }
    parseNewCampaignEvent(receipt) {
        return this.parseEvents(receipt, "NewCampaign").map(e => this.decodeNewCampaignEvent(e));
    }
    decodeNewCampaignEvent(event) {
        let result = event.data;
        return {
            campaignId: new eth_contract_1.BigNumber(result.campaignId),
            _event: event
        };
    }
    parseNewProjectEvent(receipt) {
        return this.parseEvents(receipt, "NewProject").map(e => this.decodeNewProjectEvent(e));
    }
    decodeNewProjectEvent(event) {
        let result = event.data;
        return {
            projectId: new eth_contract_1.BigNumber(result.projectId),
            _event: event
        };
    }
    parseRemoveProjectAdminEvent(receipt) {
        return this.parseEvents(receipt, "RemoveProjectAdmin").map(e => this.decodeRemoveProjectAdminEvent(e));
    }
    decodeRemoveProjectAdminEvent(event) {
        let result = event.data;
        return {
            projectId: new eth_contract_1.BigNumber(result.projectId),
            admin: result.admin,
            _event: event
        };
    }
    parseSetProtocolRateEvent(receipt) {
        return this.parseEvents(receipt, "SetProtocolRate").map(e => this.decodeSetProtocolRateEvent(e));
    }
    decodeSetProtocolRateEvent(event) {
        let result = event.data;
        return {
            protocolRate: new eth_contract_1.BigNumber(result.protocolRate),
            _event: event
        };
    }
    parseSkimEvent(receipt) {
        return this.parseEvents(receipt, "Skim").map(e => this.decodeSkimEvent(e));
    }
    decodeSkimEvent(event) {
        let result = event.data;
        return {
            token: result.token,
            to: result.to,
            amount: new eth_contract_1.BigNumber(result.amount),
            _event: event
        };
    }
    parseStakeEvent(receipt) {
        return this.parseEvents(receipt, "Stake").map(e => this.decodeStakeEvent(e));
    }
    decodeStakeEvent(event) {
        let result = event.data;
        return {
            projectId: new eth_contract_1.BigNumber(result.projectId),
            token: result.token,
            amount: new eth_contract_1.BigNumber(result.amount),
            balance: new eth_contract_1.BigNumber(result.balance),
            _event: event
        };
    }
    parseStartOwnershipTransferEvent(receipt) {
        return this.parseEvents(receipt, "StartOwnershipTransfer").map(e => this.decodeStartOwnershipTransferEvent(e));
    }
    decodeStartOwnershipTransferEvent(event) {
        let result = event.data;
        return {
            user: result.user,
            _event: event
        };
    }
    parseTakeoverProjectOwnershipEvent(receipt) {
        return this.parseEvents(receipt, "TakeoverProjectOwnership").map(e => this.decodeTakeoverProjectOwnershipEvent(e));
    }
    decodeTakeoverProjectOwnershipEvent(event) {
        let result = event.data;
        return {
            projectId: new eth_contract_1.BigNumber(result.projectId),
            newOwner: result.newOwner,
            _event: event
        };
    }
    parseTransferBackEvent(receipt) {
        return this.parseEvents(receipt, "TransferBack").map(e => this.decodeTransferBackEvent(e));
    }
    decodeTransferBackEvent(event) {
        let result = event.data;
        return {
            target: result.target,
            token: result.token,
            sender: result.sender,
            amount: new eth_contract_1.BigNumber(result.amount),
            _event: event
        };
    }
    parseTransferForwardEvent(receipt) {
        return this.parseEvents(receipt, "TransferForward").map(e => this.decodeTransferForwardEvent(e));
    }
    decodeTransferForwardEvent(event) {
        let result = event.data;
        return {
            target: result.target,
            token: result.token,
            sender: result.sender,
            amount: new eth_contract_1.BigNumber(result.amount),
            _event: event
        };
    }
    parseTransferOwnershipEvent(receipt) {
        return this.parseEvents(receipt, "TransferOwnership").map(e => this.decodeTransferOwnershipEvent(e));
    }
    decodeTransferOwnershipEvent(event) {
        let result = event.data;
        return {
            user: result.user,
            _event: event
        };
    }
    parseTransferProjectOwnershipEvent(receipt) {
        return this.parseEvents(receipt, "TransferProjectOwnership").map(e => this.decodeTransferProjectOwnershipEvent(e));
    }
    decodeTransferProjectOwnershipEvent(event) {
        let result = event.data;
        return {
            projectId: new eth_contract_1.BigNumber(result.projectId),
            newOwner: result.newOwner,
            _event: event
        };
    }
    assign() {
        let campaignAccumulatedCommissionParams = (params) => [this.wallet.utils.toString(params.param1), params.param2];
        let campaignAccumulatedCommission_call = async (params, options) => {
            let result = await this.call('campaignAccumulatedCommission', campaignAccumulatedCommissionParams(params), options);
            return new eth_contract_1.BigNumber(result);
        };
        this.campaignAccumulatedCommission = campaignAccumulatedCommission_call;
        let claimantIdCount_call = async (options) => {
            let result = await this.call('claimantIdCount', [], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.claimantIdCount = claimantIdCount_call;
        let claimantIdsParams = (params) => [params.param1, params.param2];
        let claimantIds_call = async (params, options) => {
            let result = await this.call('claimantIds', claimantIdsParams(params), options);
            return new eth_contract_1.BigNumber(result);
        };
        this.claimantIds = claimantIds_call;
        let claimantsInfo_call = async (param1, options) => {
            let result = await this.call('claimantsInfo', [this.wallet.utils.toString(param1)], options);
            return {
                claimant: result.claimant,
                token: result.token,
                balance: new eth_contract_1.BigNumber(result.balance)
            };
        };
        this.claimantsInfo = claimantsInfo_call;
        let getCampaignParams = (params) => [this.wallet.utils.toString(params.campaignId), params.returnArrays];
        let getCampaign_call = async (params, options) => {
            let result = await this.call('getCampaign', getCampaignParams(params), options);
            return ({
                projectId: new eth_contract_1.BigNumber(result.projectId),
                maxInputTokensInEachCall: new eth_contract_1.BigNumber(result.maxInputTokensInEachCall),
                maxOutputTokensInEachCall: new eth_contract_1.BigNumber(result.maxOutputTokensInEachCall),
                referrersRequireApproval: result.referrersRequireApproval,
                startDate: new eth_contract_1.BigNumber(result.startDate),
                endDate: new eth_contract_1.BigNumber(result.endDate),
                targetAndSelectors: result.targetAndSelectors,
                inTokens: result.inTokens,
                commissionInTokenConfig: result.commissionInTokenConfig.map(e => ({
                    directTransfer: e.directTransfer,
                    rate: new eth_contract_1.BigNumber(e.rate),
                    capPerTransaction: new eth_contract_1.BigNumber(e.capPerTransaction),
                    capPerCampaign: new eth_contract_1.BigNumber(e.capPerCampaign)
                })),
                outTokens: result.outTokens,
                commissionOutTokenConfig: result.commissionOutTokenConfig.map(e => ({
                    rate: new eth_contract_1.BigNumber(e.rate),
                    capPerTransaction: new eth_contract_1.BigNumber(e.capPerTransaction),
                    capPerCampaign: new eth_contract_1.BigNumber(e.capPerCampaign)
                })),
                referrers: result.referrers
            });
        };
        this.getCampaign = getCampaign_call;
        let getCampaignArrayData1Params = (params) => [this.wallet.utils.toString(params.campaignId), this.wallet.utils.toString(params.targetAndSelectorsStart), this.wallet.utils.toString(params.targetAndSelectorsLength), this.wallet.utils.toString(params.referrersStart), this.wallet.utils.toString(params.referrersLength)];
        let getCampaignArrayData1_call = async (params, options) => {
            let result = await this.call('getCampaignArrayData1', getCampaignArrayData1Params(params), options);
            return {
                targetAndSelectors: result.targetAndSelectors,
                referrers: result.referrers
            };
        };
        this.getCampaignArrayData1 = getCampaignArrayData1_call;
        let getCampaignArrayData2Params = (params) => [this.wallet.utils.toString(params.campaignId), this.wallet.utils.toString(params.inTokensStart), this.wallet.utils.toString(params.inTokensLength), this.wallet.utils.toString(params.outTokensStart), this.wallet.utils.toString(params.outTokensLength)];
        let getCampaignArrayData2_call = async (params, options) => {
            let result = await this.call('getCampaignArrayData2', getCampaignArrayData2Params(params), options);
            return {
                inTokens: result.inTokens,
                commissionInTokenConfig: result.commissionInTokenConfig.map(e => ({
                    directTransfer: e.directTransfer,
                    rate: new eth_contract_1.BigNumber(e.rate),
                    capPerTransaction: new eth_contract_1.BigNumber(e.capPerTransaction),
                    capPerCampaign: new eth_contract_1.BigNumber(e.capPerCampaign)
                })),
                outTokens: result.outTokens,
                commissionOutTokenConfig: result.commissionOutTokenConfig.map(e => ({
                    rate: new eth_contract_1.BigNumber(e.rate),
                    capPerTransaction: new eth_contract_1.BigNumber(e.capPerTransaction),
                    capPerCampaign: new eth_contract_1.BigNumber(e.capPerCampaign)
                }))
            };
        };
        this.getCampaignArrayData2 = getCampaignArrayData2_call;
        let getCampaignArrayLength_call = async (campaignId, options) => {
            let result = await this.call('getCampaignArrayLength', [this.wallet.utils.toString(campaignId)], options);
            return {
                targetAndSelectorsLength: new eth_contract_1.BigNumber(result.targetAndSelectorsLength),
                inTokensLength: new eth_contract_1.BigNumber(result.inTokensLength),
                outTokensLength: new eth_contract_1.BigNumber(result.outTokensLength),
                referrersLength: new eth_contract_1.BigNumber(result.referrersLength)
            };
        };
        this.getCampaignArrayLength = getCampaignArrayLength_call;
        let getClaimantBalanceParams = (params) => [params.claimant, params.token];
        let getClaimantBalance_call = async (params, options) => {
            let result = await this.call('getClaimantBalance', getClaimantBalanceParams(params), options);
            return new eth_contract_1.BigNumber(result);
        };
        this.getClaimantBalance = getClaimantBalance_call;
        let getClaimantsInfoParams = (params) => [this.wallet.utils.toString(params.fromId), this.wallet.utils.toString(params.count)];
        let getClaimantsInfo_call = async (params, options) => {
            let result = await this.call('getClaimantsInfo', getClaimantsInfoParams(params), options);
            return (result.map(e => ({
                claimant: e.claimant,
                token: e.token,
                balance: new eth_contract_1.BigNumber(e.balance)
            })));
        };
        this.getClaimantsInfo = getClaimantsInfo_call;
        let getProject_call = async (projectId, options) => {
            let result = await this.call('getProject', [this.wallet.utils.toString(projectId)], options);
            return {
                owner: result.owner,
                newOwner: result.newOwner,
                projectAdmins: result.projectAdmins
            };
        };
        this.getProject = getProject_call;
        let getProjectAdminsLength_call = async (projectId, options) => {
            let result = await this.call('getProjectAdminsLength', [this.wallet.utils.toString(projectId)], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.getProjectAdminsLength = getProjectAdminsLength_call;
        let isPermitted_call = async (param1, options) => {
            let result = await this.call('isPermitted', [param1], options);
            return result;
        };
        this.isPermitted = isPermitted_call;
        let lastBalance_call = async (param1, options) => {
            let result = await this.call('lastBalance', [param1], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.lastBalance = lastBalance_call;
        let newOwner_call = async (options) => {
            let result = await this.call('newOwner', [], options);
            return result;
        };
        this.newOwner = newOwner_call;
        let owner_call = async (options) => {
            let result = await this.call('owner', [], options);
            return result;
        };
        this.owner = owner_call;
        let projectBalanceParams = (params) => [this.wallet.utils.toString(params.param1), params.param2];
        let projectBalance_call = async (params, options) => {
            let result = await this.call('projectBalance', projectBalanceParams(params), options);
            return new eth_contract_1.BigNumber(result);
        };
        this.projectBalance = projectBalance_call;
        let protocolFeeBalance_call = async (param1, options) => {
            let result = await this.call('protocolFeeBalance', [param1], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.protocolFeeBalance = protocolFeeBalance_call;
        let protocolRate_call = async (options) => {
            let result = await this.call('protocolRate', [], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.protocolRate = protocolRate_call;
        let stakesBalanceParams = (params) => [this.wallet.utils.toString(params.param1), params.param2];
        let stakesBalance_call = async (params, options) => {
            let result = await this.call('stakesBalance', stakesBalanceParams(params), options);
            return new eth_contract_1.BigNumber(result);
        };
        this.stakesBalance = stakesBalance_call;
        let addProjectAdminParams = (params) => [this.wallet.utils.toString(params.projectId), params.admin];
        let addProjectAdmin_send = async (params, options) => {
            let result = await this.send('addProjectAdmin', addProjectAdminParams(params), options);
            return result;
        };
        let addProjectAdmin_call = async (params, options) => {
            let result = await this.call('addProjectAdmin', addProjectAdminParams(params), options);
            return;
        };
        let addProjectAdmin_txData = async (params, options) => {
            let result = await this.txData('addProjectAdmin', addProjectAdminParams(params), options);
            return result;
        };
        this.addProjectAdmin = Object.assign(addProjectAdmin_send, {
            call: addProjectAdmin_call,
            txData: addProjectAdmin_txData
        });
        let claim_send = async (token, options) => {
            let result = await this.send('claim', [token], options);
            return result;
        };
        let claim_call = async (token, options) => {
            let result = await this.call('claim', [token], options);
            return;
        };
        let claim_txData = async (token, options) => {
            let result = await this.txData('claim', [token], options);
            return result;
        };
        this.claim = Object.assign(claim_send, {
            call: claim_call,
            txData: claim_txData
        });
        let claimMultiple_send = async (tokens, options) => {
            let result = await this.send('claimMultiple', [tokens], options);
            return result;
        };
        let claimMultiple_call = async (tokens, options) => {
            let result = await this.call('claimMultiple', [tokens], options);
            return;
        };
        let claimMultiple_txData = async (tokens, options) => {
            let result = await this.txData('claimMultiple', [tokens], options);
            return result;
        };
        this.claimMultiple = Object.assign(claimMultiple_send, {
            call: claimMultiple_call,
            txData: claimMultiple_txData
        });
        let claimMultipleProtocolFee_send = async (tokens, options) => {
            let result = await this.send('claimMultipleProtocolFee', [tokens], options);
            return result;
        };
        let claimMultipleProtocolFee_call = async (tokens, options) => {
            let result = await this.call('claimMultipleProtocolFee', [tokens], options);
            return;
        };
        let claimMultipleProtocolFee_txData = async (tokens, options) => {
            let result = await this.txData('claimMultipleProtocolFee', [tokens], options);
            return result;
        };
        this.claimMultipleProtocolFee = Object.assign(claimMultipleProtocolFee_send, {
            call: claimMultipleProtocolFee_call,
            txData: claimMultipleProtocolFee_txData
        });
        let claimProtocolFee_send = async (token, options) => {
            let result = await this.send('claimProtocolFee', [token], options);
            return result;
        };
        let claimProtocolFee_call = async (token, options) => {
            let result = await this.call('claimProtocolFee', [token], options);
            return;
        };
        let claimProtocolFee_txData = async (token, options) => {
            let result = await this.txData('claimProtocolFee', [token], options);
            return result;
        };
        this.claimProtocolFee = Object.assign(claimProtocolFee_send, {
            call: claimProtocolFee_call,
            txData: claimProtocolFee_txData
        });
        let deny_send = async (user, options) => {
            let result = await this.send('deny', [user], options);
            return result;
        };
        let deny_call = async (user, options) => {
            let result = await this.call('deny', [user], options);
            return;
        };
        let deny_txData = async (user, options) => {
            let result = await this.txData('deny', [user], options);
            return result;
        };
        this.deny = Object.assign(deny_send, {
            call: deny_call,
            txData: deny_txData
        });
        let newCampaign_send = async (params, options) => {
            let result = await this.send('newCampaign', [[this.wallet.utils.toString(params.projectId), this.wallet.utils.toString(params.maxInputTokensInEachCall), this.wallet.utils.toString(params.maxOutputTokensInEachCall), params.referrersRequireApproval, this.wallet.utils.toString(params.startDate), this.wallet.utils.toString(params.endDate), params.targetAndSelectors, params.inTokens, params.commissionInTokenConfig.map(e => ([e.directTransfer, this.wallet.utils.toString(e.rate), this.wallet.utils.toString(e.capPerTransaction), this.wallet.utils.toString(e.capPerCampaign)])), params.outTokens, params.commissionOutTokenConfig.map(e => ([this.wallet.utils.toString(e.rate), this.wallet.utils.toString(e.capPerTransaction), this.wallet.utils.toString(e.capPerCampaign)])), params.referrers]], options);
            return result;
        };
        let newCampaign_call = async (params, options) => {
            let result = await this.call('newCampaign', [[this.wallet.utils.toString(params.projectId), this.wallet.utils.toString(params.maxInputTokensInEachCall), this.wallet.utils.toString(params.maxOutputTokensInEachCall), params.referrersRequireApproval, this.wallet.utils.toString(params.startDate), this.wallet.utils.toString(params.endDate), params.targetAndSelectors, params.inTokens, params.commissionInTokenConfig.map(e => ([e.directTransfer, this.wallet.utils.toString(e.rate), this.wallet.utils.toString(e.capPerTransaction), this.wallet.utils.toString(e.capPerCampaign)])), params.outTokens, params.commissionOutTokenConfig.map(e => ([this.wallet.utils.toString(e.rate), this.wallet.utils.toString(e.capPerTransaction), this.wallet.utils.toString(e.capPerCampaign)])), params.referrers]], options);
            return new eth_contract_1.BigNumber(result);
        };
        let newCampaign_txData = async (params, options) => {
            let result = await this.txData('newCampaign', [[this.wallet.utils.toString(params.projectId), this.wallet.utils.toString(params.maxInputTokensInEachCall), this.wallet.utils.toString(params.maxOutputTokensInEachCall), params.referrersRequireApproval, this.wallet.utils.toString(params.startDate), this.wallet.utils.toString(params.endDate), params.targetAndSelectors, params.inTokens, params.commissionInTokenConfig.map(e => ([e.directTransfer, this.wallet.utils.toString(e.rate), this.wallet.utils.toString(e.capPerTransaction), this.wallet.utils.toString(e.capPerCampaign)])), params.outTokens, params.commissionOutTokenConfig.map(e => ([this.wallet.utils.toString(e.rate), this.wallet.utils.toString(e.capPerTransaction), this.wallet.utils.toString(e.capPerCampaign)])), params.referrers]], options);
            return result;
        };
        this.newCampaign = Object.assign(newCampaign_send, {
            call: newCampaign_call,
            txData: newCampaign_txData
        });
        let newProject_send = async (admins, options) => {
            let result = await this.send('newProject', [admins], options);
            return result;
        };
        let newProject_call = async (admins, options) => {
            let result = await this.call('newProject', [admins], options);
            return new eth_contract_1.BigNumber(result);
        };
        let newProject_txData = async (admins, options) => {
            let result = await this.txData('newProject', [admins], options);
            return result;
        };
        this.newProject = Object.assign(newProject_send, {
            call: newProject_call,
            txData: newProject_txData
        });
        let permit_send = async (user, options) => {
            let result = await this.send('permit', [user], options);
            return result;
        };
        let permit_call = async (user, options) => {
            let result = await this.call('permit', [user], options);
            return;
        };
        let permit_txData = async (user, options) => {
            let result = await this.txData('permit', [user], options);
            return result;
        };
        this.permit = Object.assign(permit_send, {
            call: permit_call,
            txData: permit_txData
        });
        let proxyCallParams = (params) => [params.referrer, this.wallet.utils.toString(params.campaignId), params.target, params.tokensIn.map(e => ([e.token, this.wallet.utils.toString(e.amount)])), params.to, params.tokensOut, this.wallet.utils.stringToBytes(params.data)];
        let proxyCall_send = async (params, options) => {
            let result = await this.send('proxyCall', proxyCallParams(params), options);
            return result;
        };
        let proxyCall_call = async (params, options) => {
            let result = await this.call('proxyCall', proxyCallParams(params), options);
            return;
        };
        let proxyCall_txData = async (params, options) => {
            let result = await this.txData('proxyCall', proxyCallParams(params), options);
            return result;
        };
        this.proxyCall = Object.assign(proxyCall_send, {
            call: proxyCall_call,
            txData: proxyCall_txData
        });
        let removeProjectAdminParams = (params) => [this.wallet.utils.toString(params.projectId), params.admin];
        let removeProjectAdmin_send = async (params, options) => {
            let result = await this.send('removeProjectAdmin', removeProjectAdminParams(params), options);
            return result;
        };
        let removeProjectAdmin_call = async (params, options) => {
            let result = await this.call('removeProjectAdmin', removeProjectAdminParams(params), options);
            return;
        };
        let removeProjectAdmin_txData = async (params, options) => {
            let result = await this.txData('removeProjectAdmin', removeProjectAdminParams(params), options);
            return result;
        };
        this.removeProjectAdmin = Object.assign(removeProjectAdmin_send, {
            call: removeProjectAdmin_call,
            txData: removeProjectAdmin_txData
        });
        let setProtocolRate_send = async (newRate, options) => {
            let result = await this.send('setProtocolRate', [this.wallet.utils.toString(newRate)], options);
            return result;
        };
        let setProtocolRate_call = async (newRate, options) => {
            let result = await this.call('setProtocolRate', [this.wallet.utils.toString(newRate)], options);
            return;
        };
        let setProtocolRate_txData = async (newRate, options) => {
            let result = await this.txData('setProtocolRate', [this.wallet.utils.toString(newRate)], options);
            return result;
        };
        this.setProtocolRate = Object.assign(setProtocolRate_send, {
            call: setProtocolRate_call,
            txData: setProtocolRate_txData
        });
        let skim_send = async (tokens, options) => {
            let result = await this.send('skim', [tokens], options);
            return result;
        };
        let skim_call = async (tokens, options) => {
            let result = await this.call('skim', [tokens], options);
            return;
        };
        let skim_txData = async (tokens, options) => {
            let result = await this.txData('skim', [tokens], options);
            return result;
        };
        this.skim = Object.assign(skim_send, {
            call: skim_call,
            txData: skim_txData
        });
        let stakeParams = (params) => [this.wallet.utils.toString(params.projectId), params.token, this.wallet.utils.toString(params.amount)];
        let stake_send = async (params, options) => {
            let result = await this.send('stake', stakeParams(params), options);
            return result;
        };
        let stake_call = async (params, options) => {
            let result = await this.call('stake', stakeParams(params), options);
            return;
        };
        let stake_txData = async (params, options) => {
            let result = await this.txData('stake', stakeParams(params), options);
            return result;
        };
        this.stake = Object.assign(stake_send, {
            call: stake_call,
            txData: stake_txData
        });
        let stakeETH_send = async (projectId, options) => {
            let result = await this.send('stakeETH', [this.wallet.utils.toString(projectId)], options);
            return result;
        };
        let stakeETH_call = async (projectId, options) => {
            let result = await this.call('stakeETH', [this.wallet.utils.toString(projectId)], options);
            return;
        };
        let stakeETH_txData = async (projectId, options) => {
            let result = await this.txData('stakeETH', [this.wallet.utils.toString(projectId)], options);
            return result;
        };
        this.stakeETH = Object.assign(stakeETH_send, {
            call: stakeETH_call,
            txData: stakeETH_txData
        });
        let stakeMultipleParams = (params) => [this.wallet.utils.toString(params.projectId), params.token, this.wallet.utils.toString(params.amount)];
        let stakeMultiple_send = async (params, options) => {
            let result = await this.send('stakeMultiple', stakeMultipleParams(params), options);
            return result;
        };
        let stakeMultiple_call = async (params, options) => {
            let result = await this.call('stakeMultiple', stakeMultipleParams(params), options);
            return;
        };
        let stakeMultiple_txData = async (params, options) => {
            let result = await this.txData('stakeMultiple', stakeMultipleParams(params), options);
            return result;
        };
        this.stakeMultiple = Object.assign(stakeMultiple_send, {
            call: stakeMultiple_call,
            txData: stakeMultiple_txData
        });
        let takeOwnership_send = async (options) => {
            let result = await this.send('takeOwnership', [], options);
            return result;
        };
        let takeOwnership_call = async (options) => {
            let result = await this.call('takeOwnership', [], options);
            return;
        };
        let takeOwnership_txData = async (options) => {
            let result = await this.txData('takeOwnership', [], options);
            return result;
        };
        this.takeOwnership = Object.assign(takeOwnership_send, {
            call: takeOwnership_call,
            txData: takeOwnership_txData
        });
        let takeoverProjectOwnership_send = async (projectId, options) => {
            let result = await this.send('takeoverProjectOwnership', [this.wallet.utils.toString(projectId)], options);
            return result;
        };
        let takeoverProjectOwnership_call = async (projectId, options) => {
            let result = await this.call('takeoverProjectOwnership', [this.wallet.utils.toString(projectId)], options);
            return;
        };
        let takeoverProjectOwnership_txData = async (projectId, options) => {
            let result = await this.txData('takeoverProjectOwnership', [this.wallet.utils.toString(projectId)], options);
            return result;
        };
        this.takeoverProjectOwnership = Object.assign(takeoverProjectOwnership_send, {
            call: takeoverProjectOwnership_call,
            txData: takeoverProjectOwnership_txData
        });
        let transferOwnership_send = async (newOwner, options) => {
            let result = await this.send('transferOwnership', [newOwner], options);
            return result;
        };
        let transferOwnership_call = async (newOwner, options) => {
            let result = await this.call('transferOwnership', [newOwner], options);
            return;
        };
        let transferOwnership_txData = async (newOwner, options) => {
            let result = await this.txData('transferOwnership', [newOwner], options);
            return result;
        };
        this.transferOwnership = Object.assign(transferOwnership_send, {
            call: transferOwnership_call,
            txData: transferOwnership_txData
        });
        let transferProjectOwnershipParams = (params) => [this.wallet.utils.toString(params.projectId), params.newOwner];
        let transferProjectOwnership_send = async (params, options) => {
            let result = await this.send('transferProjectOwnership', transferProjectOwnershipParams(params), options);
            return result;
        };
        let transferProjectOwnership_call = async (params, options) => {
            let result = await this.call('transferProjectOwnership', transferProjectOwnershipParams(params), options);
            return;
        };
        let transferProjectOwnership_txData = async (params, options) => {
            let result = await this.txData('transferProjectOwnership', transferProjectOwnershipParams(params), options);
            return result;
        };
        this.transferProjectOwnership = Object.assign(transferProjectOwnership_send, {
            call: transferProjectOwnership_call,
            txData: transferProjectOwnership_txData
        });
    }
}
ProxyV3._abi = ProxyV3_json_1.default.abi;
exports.ProxyV3 = ProxyV3;
