"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockAMMPair = void 0;
const eth_contract_1 = require("@ijstech/eth-contract");
const MockAMMPair_json_1 = __importDefault(require("./MockAMMPair.json"));
class MockAMMPair extends eth_contract_1.Contract {
    constructor(wallet, address) {
        super(wallet, address, MockAMMPair_json_1.default.abi, MockAMMPair_json_1.default.bytecode);
        this.assign();
    }
    deploy(params, options) {
        return this.__deploy([params.token0, params.token1], options);
    }
    parseMintEvent(receipt) {
        return this.parseEvents(receipt, "Mint").map(e => this.decodeMintEvent(e));
    }
    decodeMintEvent(event) {
        let result = event.data;
        return {
            sender: result.sender,
            amount0: new eth_contract_1.BigNumber(result.amount0),
            amount1: new eth_contract_1.BigNumber(result.amount1),
            _event: event
        };
    }
    parseSwapEvent(receipt) {
        return this.parseEvents(receipt, "Swap").map(e => this.decodeSwapEvent(e));
    }
    decodeSwapEvent(event) {
        let result = event.data;
        return {
            sender: result.sender,
            amount0In: new eth_contract_1.BigNumber(result.amount0In),
            amount1In: new eth_contract_1.BigNumber(result.amount1In),
            amount0Out: new eth_contract_1.BigNumber(result.amount0Out),
            amount1Out: new eth_contract_1.BigNumber(result.amount1Out),
            to: result.to,
            _event: event
        };
    }
    parseSyncEvent(receipt) {
        return this.parseEvents(receipt, "Sync").map(e => this.decodeSyncEvent(e));
    }
    decodeSyncEvent(event) {
        let result = event.data;
        return {
            reserve0: new eth_contract_1.BigNumber(result.reserve0),
            reserve1: new eth_contract_1.BigNumber(result.reserve1),
            _event: event
        };
    }
    assign() {
        let blockTimestampLast_call = async (options) => {
            let result = await this.call('blockTimestampLast', [], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.blockTimestampLast = blockTimestampLast_call;
        let getReserves_call = async (options) => {
            let result = await this.call('getReserves', [], options);
            return {
                reserve0: new eth_contract_1.BigNumber(result._reserve0),
                reserve1: new eth_contract_1.BigNumber(result._reserve1),
                blockTimestampLast: new eth_contract_1.BigNumber(result._blockTimestampLast)
            };
        };
        this.getReserves = getReserves_call;
        let reserve0_call = async (options) => {
            let result = await this.call('reserve0', [], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.reserve0 = reserve0_call;
        let reserve1_call = async (options) => {
            let result = await this.call('reserve1', [], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.reserve1 = reserve1_call;
        let token0_call = async (options) => {
            let result = await this.call('token0', [], options);
            return result;
        };
        this.token0 = token0_call;
        let token1_call = async (options) => {
            let result = await this.call('token1', [], options);
            return result;
        };
        this.token1 = token1_call;
        let addLiquidityParams = (params) => [this.wallet.utils.toString(params.amount0In), this.wallet.utils.toString(params.amount1In)];
        let addLiquidity_send = async (params, options) => {
            let result = await this.send('addLiquidity', addLiquidityParams(params), options);
            return result;
        };
        let addLiquidity_call = async (params, options) => {
            let result = await this.call('addLiquidity', addLiquidityParams(params), options);
            return;
        };
        this.addLiquidity = Object.assign(addLiquidity_send, {
            call: addLiquidity_call
        });
        let swapParams = (params) => [this.wallet.utils.toString(params.amount0Out), this.wallet.utils.toString(params.amount1Out), params.to, this.wallet.utils.stringToBytes(params.param4)];
        let swap_send = async (params, options) => {
            let result = await this.send('swap', swapParams(params), options);
            return result;
        };
        let swap_call = async (params, options) => {
            let result = await this.call('swap', swapParams(params), options);
            return;
        };
        this.swap = Object.assign(swap_send, {
            call: swap_call
        });
        let sync_send = async (options) => {
            let result = await this.send('sync', [], options);
            return result;
        };
        let sync_call = async (options) => {
            let result = await this.call('sync', [], options);
            return;
        };
        this.sync = Object.assign(sync_send, {
            call: sync_call
        });
    }
}
MockAMMPair._abi = MockAMMPair_json_1.default.abi;
exports.MockAMMPair = MockAMMPair;
