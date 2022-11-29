"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proxy = void 0;
const eth_contract_1 = require("@ijstech/eth-contract");
const Proxy_json_1 = __importDefault(require("./Proxy.json"));
class Proxy extends eth_contract_1.Contract {
    constructor(wallet, address) {
        super(wallet, address, Proxy_json_1.default.abi, Proxy_json_1.default.bytecode);
        this.assign();
    }
    deploy(distributor, options) {
        return this.__deploy([distributor], options);
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
    }
}
exports.Proxy = Proxy;
