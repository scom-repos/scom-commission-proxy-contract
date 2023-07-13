import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
export interface IDeployParams {
    weth: string;
    pair: string[];
    tokenIn: string[];
    tokenOut: string[];
    rate: (number | BigNumber)[];
}
export interface ISwapETHForExactTokensParams {
    amountOut: number | BigNumber;
    pair: string[];
    to: string;
    deadline: number | BigNumber;
    data: string;
}
export interface ISwapExactETHForTokensParams {
    amountOutMin: number | BigNumber;
    pair: string[];
    to: string;
    deadline: number | BigNumber;
    data: string;
}
export interface ISwapExactTokensForETHParams {
    amountIn: number | BigNumber;
    amountOutMin: number | BigNumber;
    pair: string[];
    to: string;
    param5: number | BigNumber;
    param6: string;
}
export interface ISwapExactTokensForTokensParams {
    amountIn: number | BigNumber;
    amountOutMin: number | BigNumber;
    pair: string[];
    tokenIn: string;
    to: string;
    param6: number | BigNumber;
    param7: string;
}
export interface ISwapTokensForExactETHParams {
    amountOut: number | BigNumber;
    amountInMax: number | BigNumber;
    pair: string[];
    to: string;
    deadline: number | BigNumber;
    data: string;
}
export interface ISwapTokensForExactTokensParams {
    amountOut: number | BigNumber;
    amountInMax: number | BigNumber;
    pair: string[];
    tokenOut: string;
    to: string;
    deadline: number | BigNumber;
    data: string;
}
export declare class MockRouter extends _Contract {
    static _abi: any;
    constructor(wallet: IWallet, address?: string);
    deploy(params: IDeployParams, options?: number | BigNumber | TransactionOptions): Promise<string>;
    WETH: {
        (options?: TransactionOptions): Promise<string>;
    };
    swapETHForExactTokens: {
        (params: ISwapETHForExactTokensParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISwapETHForExactTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<{
            path: string[];
            amounts: BigNumber[];
        }>;
    };
    swapExactETHForTokens: {
        (params: ISwapExactETHForTokensParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISwapExactETHForTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<{
            path: string[];
            amounts: BigNumber[];
        }>;
    };
    swapExactTokensForETH: {
        (params: ISwapExactTokensForETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISwapExactTokensForETHParams, options?: TransactionOptions) => Promise<{
            path: string[];
            amounts: BigNumber[];
        }>;
    };
    swapExactTokensForTokens: {
        (params: ISwapExactTokensForTokensParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISwapExactTokensForTokensParams, options?: TransactionOptions) => Promise<{
            path: string[];
            amounts: BigNumber[];
        }>;
    };
    swapTokensForExactETH: {
        (params: ISwapTokensForExactETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISwapTokensForExactETHParams, options?: TransactionOptions) => Promise<{
            path: string[];
            amounts: BigNumber[];
        }>;
    };
    swapTokensForExactTokens: {
        (params: ISwapTokensForExactTokensParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISwapTokensForExactTokensParams, options?: TransactionOptions) => Promise<{
            path: string[];
            amounts: BigNumber[];
        }>;
    };
    private assign;
}
