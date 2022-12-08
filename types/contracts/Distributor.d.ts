import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
export interface IAddCommissionsParams {
    token: string;
    commissions: {
        to: string;
        amount: number | BigNumber;
    }[];
}
export interface IDistributionsParams {
    param1: string;
    param2: string;
}
export declare class Distributor extends _Contract {
    static _abi: any;
    constructor(wallet: IWallet, address?: string);
    deploy(options?: number | BigNumber | TransactionOptions): Promise<string>;
    parseAddCommissionEvent(receipt: TransactionReceipt): Distributor.AddCommissionEvent[];
    decodeAddCommissionEvent(event: Event): Distributor.AddCommissionEvent;
    parseClaimEvent(receipt: TransactionReceipt): Distributor.ClaimEvent[];
    decodeClaimEvent(event: Event): Distributor.ClaimEvent;
    addCommissions: {
        (params: IAddCommissionsParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IAddCommissionsParams, options?: number | BigNumber | TransactionOptions) => Promise<void>;
        txData: (params: IAddCommissionsParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
    };
    claim: {
        (token: string, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (token: string, options?: TransactionOptions) => Promise<void>;
        txData: (token: string, options?: TransactionOptions) => Promise<string>;
    };
    claimMultiple: {
        (tokens: string[], options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (tokens: string[], options?: TransactionOptions) => Promise<void>;
        txData: (tokens: string[], options?: TransactionOptions) => Promise<string>;
    };
    distributions: {
        (params: IDistributionsParams, options?: TransactionOptions): Promise<BigNumber>;
    };
    lastBalance: {
        (param1: string, options?: TransactionOptions): Promise<BigNumber>;
    };
    private assign;
}
export declare module Distributor {
    interface AddCommissionEvent {
        to: string;
        token: string;
        amount: BigNumber;
        _event: Event;
    }
    interface ClaimEvent {
        from: string;
        token: string;
        amount: BigNumber;
        _event: Event;
    }
}
