import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
export interface IDistributionsParams {
    param1: string;
    param2: string;
}
export interface IEthInParams {
    target: string;
    commissions: {
        to: string;
        amount: number | BigNumber;
    }[];
    data: string;
}
export interface IProxyCallParams {
    target: string;
    tokensIn: {
        token: string;
        amount: number | BigNumber;
        directTransfer: boolean;
        commissions: {
            to: string;
            amount: number | BigNumber;
        }[];
    }[];
    to: string;
    tokensOut: string[];
    data: string;
}
export interface ITokenInParams {
    target: string;
    tokensIn: {
        token: string;
        amount: number | BigNumber;
        directTransfer: boolean;
        commissions: {
            to: string;
            amount: number | BigNumber;
        }[];
    };
    data: string;
}
export declare class ProxyWtihDistributor extends _Contract {
    constructor(wallet: IWallet, address?: string);
    deploy(options?: number | BigNumber | TransactionOptions): Promise<string>;
    parseAddCommissionEvent(receipt: TransactionReceipt): ProxyWtihDistributor.AddCommissionEvent[];
    decodeAddCommissionEvent(event: Event): ProxyWtihDistributor.AddCommissionEvent;
    parseClaimEvent(receipt: TransactionReceipt): ProxyWtihDistributor.ClaimEvent[];
    decodeClaimEvent(event: Event): ProxyWtihDistributor.ClaimEvent;
    parseSkimEvent(receipt: TransactionReceipt): ProxyWtihDistributor.SkimEvent[];
    decodeSkimEvent(event: Event): ProxyWtihDistributor.SkimEvent;
    parseTransferBackEvent(receipt: TransactionReceipt): ProxyWtihDistributor.TransferBackEvent[];
    decodeTransferBackEvent(event: Event): ProxyWtihDistributor.TransferBackEvent;
    parseTransferForwardEvent(receipt: TransactionReceipt): ProxyWtihDistributor.TransferForwardEvent[];
    decodeTransferForwardEvent(event: Event): ProxyWtihDistributor.TransferForwardEvent;
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
    ethIn: {
        (params: IEthInParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IEthInParams, options?: number | BigNumber | TransactionOptions) => Promise<void>;
        txData: (params: IEthInParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
    };
    lastBalance: {
        (param1: string, options?: TransactionOptions): Promise<BigNumber>;
    };
    proxyCall: {
        (params: IProxyCallParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IProxyCallParams, options?: number | BigNumber | TransactionOptions) => Promise<void>;
        txData: (params: IProxyCallParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
    };
    skim: {
        (tokens: string[], options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (tokens: string[], options?: TransactionOptions) => Promise<void>;
        txData: (tokens: string[], options?: TransactionOptions) => Promise<string>;
    };
    tokenIn: {
        (params: ITokenInParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ITokenInParams, options?: TransactionOptions) => Promise<void>;
        txData: (params: ITokenInParams, options?: TransactionOptions) => Promise<string>;
    };
    private assign;
}
export declare module ProxyWtihDistributor {
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
    interface SkimEvent {
        token: string;
        to: string;
        amount: BigNumber;
        _event: Event;
    }
    interface TransferBackEvent {
        target: string;
        token: string;
        sender: string;
        amount: BigNumber;
        _event: Event;
    }
    interface TransferForwardEvent {
        target: string;
        token: string;
        sender: string;
        amount: BigNumber;
        commissions: BigNumber;
        _event: Event;
    }
}
