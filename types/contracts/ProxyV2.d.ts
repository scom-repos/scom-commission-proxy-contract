import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
export interface IClaimantIdsParams {
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
export interface IGetClaimantBalanceParams {
    claimant: string;
    token: string;
}
export interface IGetClaimantsInfoParams {
    fromId: number | BigNumber;
    count: number | BigNumber;
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
        totalCommissions: number | BigNumber;
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
        totalCommissions: number | BigNumber;
    };
    data: string;
}
export declare class ProxyV2 extends _Contract {
    static _abi: any;
    constructor(wallet: IWallet, address?: string);
    deploy(options?: number | BigNumber | TransactionOptions): Promise<string>;
    parseAddCommissionEvent(receipt: TransactionReceipt): ProxyV2.AddCommissionEvent[];
    decodeAddCommissionEvent(event: Event): ProxyV2.AddCommissionEvent;
    parseClaimEvent(receipt: TransactionReceipt): ProxyV2.ClaimEvent[];
    decodeClaimEvent(event: Event): ProxyV2.ClaimEvent;
    parseSkimEvent(receipt: TransactionReceipt): ProxyV2.SkimEvent[];
    decodeSkimEvent(event: Event): ProxyV2.SkimEvent;
    parseTransferBackEvent(receipt: TransactionReceipt): ProxyV2.TransferBackEvent[];
    decodeTransferBackEvent(event: Event): ProxyV2.TransferBackEvent;
    parseTransferForwardEvent(receipt: TransactionReceipt): ProxyV2.TransferForwardEvent[];
    decodeTransferForwardEvent(event: Event): ProxyV2.TransferForwardEvent;
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
    claimantIdCount: {
        (options?: TransactionOptions): Promise<BigNumber>;
    };
    claimantIds: {
        (params: IClaimantIdsParams, options?: TransactionOptions): Promise<BigNumber>;
    };
    claimantsInfo: {
        (param1: number | BigNumber, options?: TransactionOptions): Promise<{
            claimant: string;
            token: string;
            balance: BigNumber;
        }>;
    };
    ethIn: {
        (params: IEthInParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IEthInParams, options?: number | BigNumber | TransactionOptions) => Promise<void>;
        txData: (params: IEthInParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
    };
    getClaimantBalance: {
        (params: IGetClaimantBalanceParams, options?: TransactionOptions): Promise<BigNumber>;
    };
    getClaimantsInfo: {
        (params: IGetClaimantsInfoParams, options?: TransactionOptions): Promise<{
            claimant: string;
            token: string;
            balance: BigNumber;
        }[]>;
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
export declare module ProxyV2 {
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
