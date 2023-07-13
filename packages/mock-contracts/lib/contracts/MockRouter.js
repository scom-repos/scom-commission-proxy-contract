"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockRouter = void 0;
const eth_contract_1 = require("@ijstech/eth-contract");
const MockRouter_json_1 = __importDefault(require("./MockRouter.json"));
class MockRouter extends eth_contract_1.Contract {
    constructor(wallet, address) {
        super(wallet, address, MockRouter_json_1.default.abi, MockRouter_json_1.default.bytecode);
        this.assign();
    }
    deploy(params, options) {
        return this.__deploy([params.weth, params.pair, params.tokenIn, params.tokenOut, this.wallet.utils.toString(params.rate)], options);
    }
    assign() {
        let WETH_call = async (options) => {
            let result = await this.call('WETH', [], options);
            return result;
        };
        this.WETH = WETH_call;
        let swapETHForExactTokensParams = (params) => [this.wallet.utils.toString(params.amountOut), params.pair, params.to, this.wallet.utils.toString(params.deadline), this.wallet.utils.stringToBytes(params.data)];
        let swapETHForExactTokens_send = async (params, options) => {
            let result = await this.send('swapETHForExactTokens', swapETHForExactTokensParams(params), options);
            return result;
        };
        let swapETHForExactTokens_call = async (params, options) => {
            let result = await this.call('swapETHForExactTokens', swapETHForExactTokensParams(params), options);
            return {
                path: result.path,
                amounts: result.amounts.map(e => new eth_contract_1.BigNumber(e))
            };
        };
        this.swapETHForExactTokens = Object.assign(swapETHForExactTokens_send, {
            call: swapETHForExactTokens_call
        });
        let swapExactETHForTokensParams = (params) => [this.wallet.utils.toString(params.amountOutMin), params.pair, params.to, this.wallet.utils.toString(params.deadline), this.wallet.utils.stringToBytes(params.data)];
        let swapExactETHForTokens_send = async (params, options) => {
            let result = await this.send('swapExactETHForTokens', swapExactETHForTokensParams(params), options);
            return result;
        };
        let swapExactETHForTokens_call = async (params, options) => {
            let result = await this.call('swapExactETHForTokens', swapExactETHForTokensParams(params), options);
            return {
                path: result.path,
                amounts: result.amounts.map(e => new eth_contract_1.BigNumber(e))
            };
        };
        this.swapExactETHForTokens = Object.assign(swapExactETHForTokens_send, {
            call: swapExactETHForTokens_call
        });
        let swapExactTokensForETHParams = (params) => [this.wallet.utils.toString(params.amountIn), this.wallet.utils.toString(params.amountOutMin), params.pair, params.to, this.wallet.utils.toString(params.param5), this.wallet.utils.stringToBytes(params.param6)];
        let swapExactTokensForETH_send = async (params, options) => {
            let result = await this.send('swapExactTokensForETH', swapExactTokensForETHParams(params), options);
            return result;
        };
        let swapExactTokensForETH_call = async (params, options) => {
            let result = await this.call('swapExactTokensForETH', swapExactTokensForETHParams(params), options);
            return {
                path: result.path,
                amounts: result.amounts.map(e => new eth_contract_1.BigNumber(e))
            };
        };
        this.swapExactTokensForETH = Object.assign(swapExactTokensForETH_send, {
            call: swapExactTokensForETH_call
        });
        let swapExactTokensForTokensParams = (params) => [this.wallet.utils.toString(params.amountIn), this.wallet.utils.toString(params.amountOutMin), params.pair, params.tokenIn, params.to, this.wallet.utils.toString(params.param6), this.wallet.utils.stringToBytes(params.param7)];
        let swapExactTokensForTokens_send = async (params, options) => {
            let result = await this.send('swapExactTokensForTokens', swapExactTokensForTokensParams(params), options);
            return result;
        };
        let swapExactTokensForTokens_call = async (params, options) => {
            let result = await this.call('swapExactTokensForTokens', swapExactTokensForTokensParams(params), options);
            return {
                path: result.path,
                amounts: result.amounts.map(e => new eth_contract_1.BigNumber(e))
            };
        };
        this.swapExactTokensForTokens = Object.assign(swapExactTokensForTokens_send, {
            call: swapExactTokensForTokens_call
        });
        let swapTokensForExactETHParams = (params) => [this.wallet.utils.toString(params.amountOut), this.wallet.utils.toString(params.amountInMax), params.pair, params.to, this.wallet.utils.toString(params.deadline), this.wallet.utils.stringToBytes(params.data)];
        let swapTokensForExactETH_send = async (params, options) => {
            let result = await this.send('swapTokensForExactETH', swapTokensForExactETHParams(params), options);
            return result;
        };
        let swapTokensForExactETH_call = async (params, options) => {
            let result = await this.call('swapTokensForExactETH', swapTokensForExactETHParams(params), options);
            return {
                path: result.path,
                amounts: result.amounts.map(e => new eth_contract_1.BigNumber(e))
            };
        };
        this.swapTokensForExactETH = Object.assign(swapTokensForExactETH_send, {
            call: swapTokensForExactETH_call
        });
        let swapTokensForExactTokensParams = (params) => [this.wallet.utils.toString(params.amountOut), this.wallet.utils.toString(params.amountInMax), params.pair, params.tokenOut, params.to, this.wallet.utils.toString(params.deadline), this.wallet.utils.stringToBytes(params.data)];
        let swapTokensForExactTokens_send = async (params, options) => {
            let result = await this.send('swapTokensForExactTokens', swapTokensForExactTokensParams(params), options);
            return result;
        };
        let swapTokensForExactTokens_call = async (params, options) => {
            let result = await this.call('swapTokensForExactTokens', swapTokensForExactTokensParams(params), options);
            return {
                path: result.path,
                amounts: result.amounts.map(e => new eth_contract_1.BigNumber(e))
            };
        };
        this.swapTokensForExactTokens = Object.assign(swapTokensForExactTokens_send, {
            call: swapTokensForExactTokens_call
        });
    }
}
MockRouter._abi = MockRouter_json_1.default.abi;
exports.MockRouter = MockRouter;
