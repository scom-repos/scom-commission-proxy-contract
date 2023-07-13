"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockPriceOracle = void 0;
const eth_contract_1 = require("@ijstech/eth-contract");
const MockPriceOracle_json_1 = __importDefault(require("./MockPriceOracle.json"));
class MockPriceOracle extends eth_contract_1.Contract {
    constructor(wallet, address) {
        super(wallet, address, MockPriceOracle_json_1.default.abi, MockPriceOracle_json_1.default.bytecode);
        this.assign();
    }
    deploy(options) {
        return this.__deploy([], options);
    }
    assign() {
        let latestAnswer_call = async (options) => {
            let result = await this.call('latestAnswer', [], options);
            return new eth_contract_1.BigNumber(result);
        };
        this.latestAnswer = latestAnswer_call;
        let setPrice_send = async (price, options) => {
            let result = await this.send('setPrice', [this.wallet.utils.toString(price)], options);
            return result;
        };
        let setPrice_call = async (price, options) => {
            let result = await this.call('setPrice', [this.wallet.utils.toString(price)], options);
            return;
        };
        this.setPrice = Object.assign(setPrice_send, {
            call: setPrice_call
        });
    }
}
MockPriceOracle._abi = MockPriceOracle_json_1.default.abi;
exports.MockPriceOracle = MockPriceOracle;
