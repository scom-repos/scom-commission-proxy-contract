"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyWtihDistributor = void 0;
const eth_contract_1 = require("@ijstech/eth-contract");
const ProxyWtihDistributor_json_1 = __importDefault(require("./ProxyWtihDistributor.json"));
class ProxyWtihDistributor extends eth_contract_1.Contract {
    constructor(wallet, address) {
        super(wallet, address, ProxyWtihDistributor_json_1.default.abi, ProxyWtihDistributor_json_1.default.bytecode);
        this.assign();
    }
    deploy(options) {
        return this.__deploy([], options);
    }
    parseAddCommissionEvent(receipt) {
        return this.parseEvents(receipt, "AddCommission").map(e => this.decodeAddCommissionEvent(e));
    }
    decodeAddCommissionEvent(event) {
        let result = event.data;
        return {
            to: result.to,
            token: result.token,
            amount: new eth_contract_1.BigNumber(result.amount),
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
            commissions: new eth_contract_1.BigNumber(result.commissions),
            _event: event
        };
    }
    assign() {
        let distributionsParams = (params) => [params.param1, params.param2];
        let distributions_call = async (params, options) => {
            let result = await this.call('distributions', distributionsParams(params), options);
            return new eth_contract_1.BigNumber(result);
        };
        this.distributions = distributions_call;
        let lastBalance_call = async (param1, options) => {
            let result = await this.call('lastBalance', [param1], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.lastBalance = lastBalance_call;
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
        let ethInParams = (params) => [params.target, params.commissions.map(e => ([e.to, this.wallet.utils.toString(e.amount)])), this.wallet.utils.stringToBytes(params.data)];
        let ethIn_send = async (params, options) => {
            let result = await this.send('ethIn', ethInParams(params), options);
            return result;
        };
        let ethIn_call = async (params, options) => {
            let result = await this.call('ethIn', ethInParams(params), options);
            return;
        };
        let ethIn_txData = async (params, options) => {
            let result = await this.txData('ethIn', ethInParams(params), options);
            return result;
        };
        this.ethIn = Object.assign(ethIn_send, {
            call: ethIn_call,
            txData: ethIn_txData
        });
        let proxyCallParams = (params) => [params.target, params.tokensIn.map(e => ([e.token, this.wallet.utils.toString(e.amount), e.directTransfer, e.commissions.map(e => ([e.to, this.wallet.utils.toString(e.amount)]))])), params.to, params.tokensOut, this.wallet.utils.stringToBytes(params.data)];
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
        let tokenInParams = (params) => [params.target, [params.tokensIn.token, this.wallet.utils.toString(params.tokensIn.amount), params.tokensIn.directTransfer, params.tokensIn.commissions.map(e => ([e.to, this.wallet.utils.toString(e.amount)]))], this.wallet.utils.stringToBytes(params.data)];
        let tokenIn_send = async (params, options) => {
            let result = await this.send('tokenIn', tokenInParams(params), options);
            return result;
        };
        let tokenIn_call = async (params, options) => {
            let result = await this.call('tokenIn', tokenInParams(params), options);
            return;
        };
        let tokenIn_txData = async (params, options) => {
            let result = await this.txData('tokenIn', tokenInParams(params), options);
            return result;
        };
        this.tokenIn = Object.assign(tokenIn_send, {
            call: tokenIn_call,
            txData: tokenIn_txData
        });
    }
}
exports.ProxyWtihDistributor = ProxyWtihDistributor;
