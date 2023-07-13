"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockOracleAdaptor = void 0;
const eth_contract_1 = require("@ijstech/eth-contract");
const MockOracleAdaptor_json_1 = __importDefault(require("./MockOracleAdaptor.json"));
class MockOracleAdaptor extends eth_contract_1.Contract {
    constructor(wallet, address) {
        super(wallet, address, MockOracleAdaptor_json_1.default.abi, MockOracleAdaptor_json_1.default.bytecode);
        this.assign();
    }
    deploy(params, options) {
        return this.__deploy([params.weth, this.wallet.utils.toString(params.decimals), params.tokens, this.wallet.utils.toString(params.prices)], options);
    }
    assign() {
        let decimals_call = async (options) => {
            let result = await this.call('decimals', [], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.decimals = decimals_call;
        let getLatestPriceParams = (params) => [params.from, params.to, this.wallet.utils.stringToBytes(params.param3)];
        let getLatestPrice_call = async (params, options) => {
            let result = await this.call('getLatestPrice', getLatestPriceParams(params), options);
            return new eth_contract_1.BigNumber(result);
        };
        this.getLatestPrice = getLatestPrice_call;
        let getRatioParams = (params) => [params.from, params.to, this.wallet.utils.toString(params.param3), this.wallet.utils.toString(params.param4), this.wallet.utils.stringToBytes(params.param5)];
        let getRatio_call = async (params, options) => {
            let result = await this.call('getRatio', getRatioParams(params), options);
            return {
                numerator: new eth_contract_1.BigNumber(result.numerator),
                denominator: new eth_contract_1.BigNumber(result.denominator)
            };
        };
        this.getRatio = getRatio_call;
        let isSupportedParams = (params) => [params.from, params.to];
        let isSupported_call = async (params, options) => {
            let result = await this.call('isSupported', isSupportedParams(params), options);
            return result;
        };
        this.isSupported = isSupported_call;
        let weth_call = async (options) => {
            let result = await this.call('weth', [], options);
            return result;
        };
        this.weth = weth_call;
        let setPriceParams = (params) => [params.token, this.wallet.utils.toString(params.price)];
        let setPrice_send = async (params, options) => {
            let result = await this.send('setPrice', setPriceParams(params), options);
            return result;
        };
        let setPrice_call = async (params, options) => {
            let result = await this.call('setPrice', setPriceParams(params), options);
            return;
        };
        this.setPrice = Object.assign(setPrice_send, {
            call: setPrice_call
        });
        let setPrice_1Params = (params) => [params.token0, params.token1, this.wallet.utils.toString(params.price0), this.wallet.utils.toString(params.price1)];
        let setPrice_1_send = async (params, options) => {
            let result = await this.send('setPrice', setPrice_1Params(params), options);
            return result;
        };
        let setPrice_1_call = async (params, options) => {
            let result = await this.call('setPrice', setPrice_1Params(params), options);
            return;
        };
        this.setPrice_1 = Object.assign(setPrice_1_send, {
            call: setPrice_1_call
        });
    }
}
MockOracleAdaptor._abi = MockOracleAdaptor_json_1.default.abi;
exports.MockOracleAdaptor = MockOracleAdaptor;
