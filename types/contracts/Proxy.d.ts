import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
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
export declare class Proxy extends _Contract {
    constructor(wallet: IWallet, address?: string);
    deploy(distributor: string, options?: TransactionOptions): Promise<string>;
    parseSkimEvent(receipt: TransactionReceipt): Proxy.SkimEvent[];
    decodeSkimEvent(event: Event): Proxy.SkimEvent;
    parseTransferBackEvent(receipt: TransactionReceipt): Proxy.TransferBackEvent[];
    decodeTransferBackEvent(event: Event): Proxy.TransferBackEvent;
    parseTransferForwardEvent(receipt: TransactionReceipt): Proxy.TransferForwardEvent[];
    decodeTransferForwardEvent(event: Event): Proxy.TransferForwardEvent;
    ethIn: {
        (params: IEthInParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IEthInParams, options?: number | BigNumber | TransactionOptions) => Promise<void>;
        txData: (params: IEthInParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
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
export declare module Proxy {
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
