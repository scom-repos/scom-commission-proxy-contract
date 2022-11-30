"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Distributor = void 0;
const eth_contract_1 = require("@ijstech/eth-contract");
const Distributor_json_1 = __importDefault(require("./Distributor.json"));
class Distributor extends eth_contract_1.Contract {
    constructor(wallet, address) {
        super(wallet, address, Distributor_json_1.default.abi, Distributor_json_1.default.bytecode);
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
        let addCommissionsParams = (params) => [params.token, params.commissions.map(e => ([e.to, this.wallet.utils.toString(e.amount)]))];
        let addCommissions_send = async (params, options) => {
            let result = await this.send('addCommissions', addCommissionsParams(params), options);
            return result;
        };
        let addCommissions_call = async (params, options) => {
            let result = await this.call('addCommissions', addCommissionsParams(params), options);
            return;
        };
        let addCommissions_txData = async (params, options) => {
            let result = await this.txData('addCommissions', addCommissionsParams(params), options);
            return result;
        };
        this.addCommissions = Object.assign(addCommissions_send, {
            call: addCommissions_call,
            txData: addCommissions_txData
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
    }
}
exports.Distributor = Distributor;
