import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
export declare class MockPriceOracle extends _Contract {
    static _abi: any;
    constructor(wallet: IWallet, address?: string);
    deploy(options?: TransactionOptions): Promise<string>;
    latestAnswer: {
        (options?: TransactionOptions): Promise<BigNumber>;
    };
    setPrice: {
        (price: number | BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (price: number | BigNumber, options?: TransactionOptions) => Promise<void>;
    };
    private assign;
}
