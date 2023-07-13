import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
export interface IDeployParams {
    token0: string;
    token1: string;
}
export interface IAddLiquidityParams {
    amount0In: number | BigNumber;
    amount1In: number | BigNumber;
}
export interface ISwapParams {
    amount0Out: number | BigNumber;
    amount1Out: number | BigNumber;
    to: string;
    param4: string;
}
export declare class MockAMMPair extends _Contract {
    static _abi: any;
    constructor(wallet: IWallet, address?: string);
    deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
    parseMintEvent(receipt: TransactionReceipt): MockAMMPair.MintEvent[];
    decodeMintEvent(event: Event): MockAMMPair.MintEvent;
    parseSwapEvent(receipt: TransactionReceipt): MockAMMPair.SwapEvent[];
    decodeSwapEvent(event: Event): MockAMMPair.SwapEvent;
    parseSyncEvent(receipt: TransactionReceipt): MockAMMPair.SyncEvent[];
    decodeSyncEvent(event: Event): MockAMMPair.SyncEvent;
    addLiquidity: {
        (params: IAddLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<void>;
    };
    blockTimestampLast: {
        (options?: TransactionOptions): Promise<BigNumber>;
    };
    getReserves: {
        (options?: TransactionOptions): Promise<{
            reserve0: BigNumber;
            reserve1: BigNumber;
            blockTimestampLast: BigNumber;
        }>;
    };
    reserve0: {
        (options?: TransactionOptions): Promise<BigNumber>;
    };
    reserve1: {
        (options?: TransactionOptions): Promise<BigNumber>;
    };
    swap: {
        (params: ISwapParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISwapParams, options?: TransactionOptions) => Promise<void>;
    };
    sync: {
        (options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (options?: TransactionOptions) => Promise<void>;
    };
    token0: {
        (options?: TransactionOptions): Promise<string>;
    };
    token1: {
        (options?: TransactionOptions): Promise<string>;
    };
    private assign;
}
export declare module MockAMMPair {
    interface MintEvent {
        sender: string;
        amount0: BigNumber;
        amount1: BigNumber;
        _event: Event;
    }
    interface SwapEvent {
        sender: string;
        amount0In: BigNumber;
        amount1In: BigNumber;
        amount0Out: BigNumber;
        amount1Out: BigNumber;
        to: string;
        _event: Event;
    }
    interface SyncEvent {
        reserve0: BigNumber;
        reserve1: BigNumber;
        _event: Event;
    }
}
