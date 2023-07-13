import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
export interface IDeployParams {
    weth: string;
    decimals: number | BigNumber;
    tokens: string[];
    prices: (number | BigNumber)[];
}
export interface IGetLatestPriceParams {
    from: string;
    to: string;
    param3: string;
}
export interface IGetRatioParams {
    from: string;
    to: string;
    param3: number | BigNumber;
    param4: number | BigNumber;
    param5: string;
}
export interface IIsSupportedParams {
    from: string;
    to: string;
}
export interface ISetPriceParams {
    token: string;
    price: number | BigNumber;
}
export interface ISetPrice_1Params {
    token0: string;
    token1: string;
    price0: number | BigNumber;
    price1: number | BigNumber;
}
export declare class MockOracleAdaptor extends _Contract {
    static _abi: any;
    constructor(wallet: IWallet, address?: string);
    deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
    decimals: {
        (options?: TransactionOptions): Promise<BigNumber>;
    };
    getLatestPrice: {
        (params: IGetLatestPriceParams, options?: TransactionOptions): Promise<BigNumber>;
    };
    getRatio: {
        (params: IGetRatioParams, options?: TransactionOptions): Promise<{
            numerator: BigNumber;
            denominator: BigNumber;
        }>;
    };
    isSupported: {
        (params: IIsSupportedParams, options?: TransactionOptions): Promise<boolean>;
    };
    setPrice: {
        (params: ISetPriceParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISetPriceParams, options?: TransactionOptions) => Promise<void>;
    };
    setPrice_1: {
        (params: ISetPrice_1Params, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISetPrice_1Params, options?: TransactionOptions) => Promise<void>;
    };
    weth: {
        (options?: TransactionOptions): Promise<string>;
    };
    private assign;
}
