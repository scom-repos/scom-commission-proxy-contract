import {IWallet, Contract as _Contract, Transaction, TransactionReceipt, BigNumber, Event, IBatchRequestObj, TransactionOptions} from "@ijstech/eth-contract";
import Bin from "./MockOracleAdaptor.json";

export interface IDeployParams {weth:string;decimals:number|BigNumber;tokens:string[];prices:(number|BigNumber)[]}
export interface IGetLatestPriceParams {from:string;to:string;param3:string}
export interface IGetRatioParams {from:string;to:string;param3:number|BigNumber;param4:number|BigNumber;param5:string}
export interface IIsSupportedParams {from:string;to:string}
export interface ISetPriceParams {token:string;price:number|BigNumber}
export interface ISetPrice_1Params {token0:string;token1:string;price0:number|BigNumber;price1:number|BigNumber}
export class MockOracleAdaptor extends _Contract{
    constructor(wallet: IWallet, address?: string){
        super(wallet, address, Bin.abi, Bin.bytecode);
        this.assign()
    }
    deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>{
        return this.__deploy([params.weth,this.wallet.utils.toString(params.decimals),params.tokens,this.wallet.utils.toString(params.prices)], options);
    }
    decimals: {
        (options?: TransactionOptions): Promise<BigNumber>;
    }
    getLatestPrice: {
        (params: IGetLatestPriceParams, options?: TransactionOptions): Promise<BigNumber>;
    }
    getRatio: {
        (params: IGetRatioParams, options?: TransactionOptions): Promise<{numerator:BigNumber,denominator:BigNumber}>;
    }
    isSupported: {
        (params: IIsSupportedParams, options?: TransactionOptions): Promise<boolean>;
    }
    setPrice: {
        (params: ISetPriceParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISetPriceParams, options?: TransactionOptions) => Promise<void>;
        txData: (params: ISetPriceParams, options?: TransactionOptions) => Promise<string>;
    }
    setPrice_1: {
        (params: ISetPrice_1Params, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISetPrice_1Params, options?: TransactionOptions) => Promise<void>;
        txData: (params: ISetPrice_1Params, options?: TransactionOptions) => Promise<string>;
    }
    weth: {
        (options?: TransactionOptions): Promise<string>;
    }
    private assign(){
        let decimals_call = async (options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('decimals',[],options);
            return new BigNumber(result);
        }
        this.decimals = decimals_call
        let getLatestPriceParams = (params: IGetLatestPriceParams) => [params.from,params.to,this.wallet.utils.stringToBytes(params.param3)];
        let getLatestPrice_call = async (params: IGetLatestPriceParams, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('getLatestPrice',getLatestPriceParams(params),options);
            return new BigNumber(result);
        }
        this.getLatestPrice = getLatestPrice_call
        let getRatioParams = (params: IGetRatioParams) => [params.from,params.to,this.wallet.utils.toString(params.param3),this.wallet.utils.toString(params.param4),this.wallet.utils.stringToBytes(params.param5)];
        let getRatio_call = async (params: IGetRatioParams, options?: TransactionOptions): Promise<{numerator:BigNumber,denominator:BigNumber}> => {
            let result = await this.call('getRatio',getRatioParams(params),options);
            return {
                numerator: new BigNumber(result.numerator),
                denominator: new BigNumber(result.denominator)
            };
        }
        this.getRatio = getRatio_call
        let isSupportedParams = (params: IIsSupportedParams) => [params.from,params.to];
        let isSupported_call = async (params: IIsSupportedParams, options?: TransactionOptions): Promise<boolean> => {
            let result = await this.call('isSupported',isSupportedParams(params),options);
            return result;
        }
        this.isSupported = isSupported_call
        let weth_call = async (options?: TransactionOptions): Promise<string> => {
            let result = await this.call('weth',[],options);
            return result;
        }
        this.weth = weth_call
        let setPriceParams = (params: ISetPriceParams) => [params.token,this.wallet.utils.toString(params.price)];
        let setPrice_send = async (params: ISetPriceParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('setPrice',setPriceParams(params),options);
            return result;
        }
        let setPrice_call = async (params: ISetPriceParams, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('setPrice',setPriceParams(params),options);
            return;
        }
        let setPrice_txData = async (params: ISetPriceParams, options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('setPrice',setPriceParams(params),options);
            return result;
        }
        this.setPrice = Object.assign(setPrice_send, {
            call:setPrice_call
            , txData:setPrice_txData
        });
        let setPrice_1Params = (params: ISetPrice_1Params) => [params.token0,params.token1,this.wallet.utils.toString(params.price0),this.wallet.utils.toString(params.price1)];
        let setPrice_1_send = async (params: ISetPrice_1Params, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('setPrice',setPrice_1Params(params),options);
            return result;
        }
        let setPrice_1_call = async (params: ISetPrice_1Params, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('setPrice',setPrice_1Params(params),options);
            return;
        }
        let setPrice_1_txData = async (params: ISetPrice_1Params, options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('setPrice',setPrice_1Params(params),options);
            return result;
        }
        this.setPrice_1 = Object.assign(setPrice_1_send, {
            call:setPrice_1_call
            , txData:setPrice_1_txData
        });
    }
}