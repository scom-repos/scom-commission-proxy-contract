import {IWallet, Contract as _Contract, Transaction, TransactionReceipt, BigNumber, Event, IBatchRequestObj, TransactionOptions} from "@ijstech/eth-contract";
import Bin from "./MockRouter.json";
export interface IDeployParams {weth:string;pair:string[];tokenIn:string[];tokenOut:string[];rate:(number|BigNumber)[]}
export interface ISwapETHForExactTokensParams {amountOut:number|BigNumber;pair:string[];to:string;deadline:number|BigNumber;data:string}
export interface ISwapExactETHForTokensParams {amountOutMin:number|BigNumber;pair:string[];to:string;deadline:number|BigNumber;data:string}
export interface ISwapExactTokensForETHParams {amountIn:number|BigNumber;amountOutMin:number|BigNumber;pair:string[];to:string;param5:number|BigNumber;param6:string}
export interface ISwapExactTokensForTokensParams {amountIn:number|BigNumber;amountOutMin:number|BigNumber;pair:string[];tokenIn:string;to:string;param6:number|BigNumber;param7:string}
export interface ISwapTokensForExactETHParams {amountOut:number|BigNumber;amountInMax:number|BigNumber;pair:string[];to:string;deadline:number|BigNumber;data:string}
export interface ISwapTokensForExactTokensParams {amountOut:number|BigNumber;amountInMax:number|BigNumber;pair:string[];tokenOut:string;to:string;deadline:number|BigNumber;data:string}
export class MockRouter extends _Contract{
    static _abi: any = Bin.abi;
    constructor(wallet: IWallet, address?: string){
        super(wallet, address, Bin.abi, Bin.bytecode);
        this.assign()
    }
    deploy(params: IDeployParams, options?: number|BigNumber|TransactionOptions): Promise<string>{
        return this.__deploy([params.weth,params.pair,params.tokenIn,params.tokenOut,this.wallet.utils.toString(params.rate)], options);
    }
    WETH: {
        (options?: TransactionOptions): Promise<string>;
    }
    swapETHForExactTokens: {
        (params: ISwapETHForExactTokensParams, options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISwapETHForExactTokensParams, options?: number|BigNumber|TransactionOptions) => Promise<{path:string[],amounts:BigNumber[]}>;
    }
    swapExactETHForTokens: {
        (params: ISwapExactETHForTokensParams, options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISwapExactETHForTokensParams, options?: number|BigNumber|TransactionOptions) => Promise<{path:string[],amounts:BigNumber[]}>;
    }
    swapExactTokensForETH: {
        (params: ISwapExactTokensForETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISwapExactTokensForETHParams, options?: TransactionOptions) => Promise<{path:string[],amounts:BigNumber[]}>;
    }
    swapExactTokensForTokens: {
        (params: ISwapExactTokensForTokensParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISwapExactTokensForTokensParams, options?: TransactionOptions) => Promise<{path:string[],amounts:BigNumber[]}>;
    }
    swapTokensForExactETH: {
        (params: ISwapTokensForExactETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISwapTokensForExactETHParams, options?: TransactionOptions) => Promise<{path:string[],amounts:BigNumber[]}>;
    }
    swapTokensForExactTokens: {
        (params: ISwapTokensForExactTokensParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISwapTokensForExactTokensParams, options?: TransactionOptions) => Promise<{path:string[],amounts:BigNumber[]}>;
    }
    private assign(){
        let WETH_call = async (options?: TransactionOptions): Promise<string> => {
            let result = await this.call('WETH',[],options);
            return result;
        }
        this.WETH = WETH_call
        let swapETHForExactTokensParams = (params: ISwapETHForExactTokensParams) => [this.wallet.utils.toString(params.amountOut),params.pair,params.to,this.wallet.utils.toString(params.deadline),this.wallet.utils.stringToBytes(params.data)];
        let swapETHForExactTokens_send = async (params: ISwapETHForExactTokensParams, options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('swapETHForExactTokens',swapETHForExactTokensParams(params),options);
            return result;
        }
        let swapETHForExactTokens_call = async (params: ISwapETHForExactTokensParams, options?: number|BigNumber|TransactionOptions): Promise<{path:string[],amounts:BigNumber[]}> => {
            let result = await this.call('swapETHForExactTokens',swapETHForExactTokensParams(params),options);
            return {
                path: result.path,
                amounts: result.amounts.map(e=>new BigNumber(e))
            };
        }
        this.swapETHForExactTokens = Object.assign(swapETHForExactTokens_send, {
            call:swapETHForExactTokens_call
        });
        let swapExactETHForTokensParams = (params: ISwapExactETHForTokensParams) => [this.wallet.utils.toString(params.amountOutMin),params.pair,params.to,this.wallet.utils.toString(params.deadline),this.wallet.utils.stringToBytes(params.data)];
        let swapExactETHForTokens_send = async (params: ISwapExactETHForTokensParams, options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('swapExactETHForTokens',swapExactETHForTokensParams(params),options);
            return result;
        }
        let swapExactETHForTokens_call = async (params: ISwapExactETHForTokensParams, options?: number|BigNumber|TransactionOptions): Promise<{path:string[],amounts:BigNumber[]}> => {
            let result = await this.call('swapExactETHForTokens',swapExactETHForTokensParams(params),options);
            return {
                path: result.path,
                amounts: result.amounts.map(e=>new BigNumber(e))
            };
        }
        this.swapExactETHForTokens = Object.assign(swapExactETHForTokens_send, {
            call:swapExactETHForTokens_call
        });
        let swapExactTokensForETHParams = (params: ISwapExactTokensForETHParams) => [this.wallet.utils.toString(params.amountIn),this.wallet.utils.toString(params.amountOutMin),params.pair,params.to,this.wallet.utils.toString(params.param5),this.wallet.utils.stringToBytes(params.param6)];
        let swapExactTokensForETH_send = async (params: ISwapExactTokensForETHParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('swapExactTokensForETH',swapExactTokensForETHParams(params),options);
            return result;
        }
        let swapExactTokensForETH_call = async (params: ISwapExactTokensForETHParams, options?: TransactionOptions): Promise<{path:string[],amounts:BigNumber[]}> => {
            let result = await this.call('swapExactTokensForETH',swapExactTokensForETHParams(params),options);
            return {
                path: result.path,
                amounts: result.amounts.map(e=>new BigNumber(e))
            };
        }
        this.swapExactTokensForETH = Object.assign(swapExactTokensForETH_send, {
            call:swapExactTokensForETH_call
        });
        let swapExactTokensForTokensParams = (params: ISwapExactTokensForTokensParams) => [this.wallet.utils.toString(params.amountIn),this.wallet.utils.toString(params.amountOutMin),params.pair,params.tokenIn,params.to,this.wallet.utils.toString(params.param6),this.wallet.utils.stringToBytes(params.param7)];
        let swapExactTokensForTokens_send = async (params: ISwapExactTokensForTokensParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('swapExactTokensForTokens',swapExactTokensForTokensParams(params),options);
            return result;
        }
        let swapExactTokensForTokens_call = async (params: ISwapExactTokensForTokensParams, options?: TransactionOptions): Promise<{path:string[],amounts:BigNumber[]}> => {
            let result = await this.call('swapExactTokensForTokens',swapExactTokensForTokensParams(params),options);
            return {
                path: result.path,
                amounts: result.amounts.map(e=>new BigNumber(e))
            };
        }
        this.swapExactTokensForTokens = Object.assign(swapExactTokensForTokens_send, {
            call:swapExactTokensForTokens_call
        });
        let swapTokensForExactETHParams = (params: ISwapTokensForExactETHParams) => [this.wallet.utils.toString(params.amountOut),this.wallet.utils.toString(params.amountInMax),params.pair,params.to,this.wallet.utils.toString(params.deadline),this.wallet.utils.stringToBytes(params.data)];
        let swapTokensForExactETH_send = async (params: ISwapTokensForExactETHParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('swapTokensForExactETH',swapTokensForExactETHParams(params),options);
            return result;
        }
        let swapTokensForExactETH_call = async (params: ISwapTokensForExactETHParams, options?: TransactionOptions): Promise<{path:string[],amounts:BigNumber[]}> => {
            let result = await this.call('swapTokensForExactETH',swapTokensForExactETHParams(params),options);
            return {
                path: result.path,
                amounts: result.amounts.map(e=>new BigNumber(e))
            };
        }
        this.swapTokensForExactETH = Object.assign(swapTokensForExactETH_send, {
            call:swapTokensForExactETH_call
        });
        let swapTokensForExactTokensParams = (params: ISwapTokensForExactTokensParams) => [this.wallet.utils.toString(params.amountOut),this.wallet.utils.toString(params.amountInMax),params.pair,params.tokenOut,params.to,this.wallet.utils.toString(params.deadline),this.wallet.utils.stringToBytes(params.data)];
        let swapTokensForExactTokens_send = async (params: ISwapTokensForExactTokensParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('swapTokensForExactTokens',swapTokensForExactTokensParams(params),options);
            return result;
        }
        let swapTokensForExactTokens_call = async (params: ISwapTokensForExactTokensParams, options?: TransactionOptions): Promise<{path:string[],amounts:BigNumber[]}> => {
            let result = await this.call('swapTokensForExactTokens',swapTokensForExactTokensParams(params),options);
            return {
                path: result.path,
                amounts: result.amounts.map(e=>new BigNumber(e))
            };
        }
        this.swapTokensForExactTokens = Object.assign(swapTokensForExactTokens_send, {
            call:swapTokensForExactTokens_call
        });
    }
}