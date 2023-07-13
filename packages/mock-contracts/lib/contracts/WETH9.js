"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WETH9 = void 0;
const eth_contract_1 = require("@ijstech/eth-contract");
const WETH9_json_1 = __importDefault(require("./WETH9.json"));
class WETH9 extends eth_contract_1.Contract {
    constructor(wallet, address) {
        super(wallet, address, WETH9_json_1.default.abi, WETH9_json_1.default.bytecode);
        this.assign();
    }
    deploy(options) {
        return this.__deploy([], options);
    }
    parseApprovalEvent(receipt) {
        return this.parseEvents(receipt, "Approval").map(e => this.decodeApprovalEvent(e));
    }
    decodeApprovalEvent(event) {
        let result = event.data;
        return {
            src: result.src,
            guy: result.guy,
            wad: new eth_contract_1.BigNumber(result.wad),
            _event: event
        };
    }
    parseTransferEvent(receipt) {
        return this.parseEvents(receipt, "Transfer").map(e => this.decodeTransferEvent(e));
    }
    decodeTransferEvent(event) {
        let result = event.data;
        return {
            src: result.src,
            dst: result.dst,
            wad: new eth_contract_1.BigNumber(result.wad),
            _event: event
        };
    }
    parseDepositEvent(receipt) {
        return this.parseEvents(receipt, "Deposit").map(e => this.decodeDepositEvent(e));
    }
    decodeDepositEvent(event) {
        let result = event.data;
        return {
            dst: result.dst,
            wad: new eth_contract_1.BigNumber(result.wad),
            _event: event
        };
    }
    parseWithdrawalEvent(receipt) {
        return this.parseEvents(receipt, "Withdrawal").map(e => this.decodeWithdrawalEvent(e));
    }
    decodeWithdrawalEvent(event) {
        let result = event.data;
        return {
            src: result.src,
            wad: new eth_contract_1.BigNumber(result.wad),
            _event: event
        };
    }
    assign() {
        let name_call = async (options) => {
            let result = await this.call('name', [], options);
            return result;
        };
        this.name = name_call;
        let totalSupply_call = async (options) => {
            let result = await this.call('totalSupply', [], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.totalSupply = totalSupply_call;
        let decimals_call = async (options) => {
            let result = await this.call('decimals', [], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.decimals = decimals_call;
        let balanceOf_call = async (param1, options) => {
            let result = await this.call('balanceOf', [param1], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.balanceOf = balanceOf_call;
        let symbol_call = async (options) => {
            let result = await this.call('symbol', [], options);
            return result;
        };
        this.symbol = symbol_call;
        let allowanceParams = (params) => [params.param1, params.param2];
        let allowance_call = async (params, options) => {
            let result = await this.call('allowance', allowanceParams(params), options);
            return new eth_contract_1.BigNumber(result);
        };
        this.allowance = allowance_call;
        let approveParams = (params) => [params.guy, this.wallet.utils.toString(params.wad)];
        let approve_send = async (params, options) => {
            let result = await this.send('approve', approveParams(params), options);
            return result;
        };
        let approve_call = async (params, options) => {
            let result = await this.call('approve', approveParams(params), options);
            return result;
        };
        this.approve = Object.assign(approve_send, {
            call: approve_call
        });
        let transferFromParams = (params) => [params.src, params.dst, this.wallet.utils.toString(params.wad)];
        let transferFrom_send = async (params, options) => {
            let result = await this.send('transferFrom', transferFromParams(params), options);
            return result;
        };
        let transferFrom_call = async (params, options) => {
            let result = await this.call('transferFrom', transferFromParams(params), options);
            return result;
        };
        this.transferFrom = Object.assign(transferFrom_send, {
            call: transferFrom_call
        });
        let withdraw_send = async (wad, options) => {
            let result = await this.send('withdraw', [this.wallet.utils.toString(wad)], options);
            return result;
        };
        let withdraw_call = async (wad, options) => {
            let result = await this.call('withdraw', [this.wallet.utils.toString(wad)], options);
            return;
        };
        this.withdraw = Object.assign(withdraw_send, {
            call: withdraw_call
        });
        let transferParams = (params) => [params.dst, this.wallet.utils.toString(params.wad)];
        let transfer_send = async (params, options) => {
            let result = await this.send('transfer', transferParams(params), options);
            return result;
        };
        let transfer_call = async (params, options) => {
            let result = await this.call('transfer', transferParams(params), options);
            return result;
        };
        this.transfer = Object.assign(transfer_send, {
            call: transfer_call
        });
        let deposit_send = async (options) => {
            let result = await this.send('deposit', [], options);
            return result;
        };
        let deposit_call = async (options) => {
            let result = await this.call('deposit', [], options);
            return;
        };
        this.deposit = Object.assign(deposit_send, {
            call: deposit_call
        });
    }
}
WETH9._abi = WETH9_json_1.default.abi;
exports.WETH9 = WETH9;
