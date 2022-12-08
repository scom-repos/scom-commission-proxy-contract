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
    static _abi: any;
    constructor(wallet: IWallet, address?: string);
    deploy(distributor: string, options?: TransactionOptions): Promise<string>;
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
    tokenIn: {
        (params: ITokenInParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ITokenInParams, options?: number | BigNumber | TransactionOptions) => Promise<void>;
        txData: (params: ITokenInParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
    };
    private assign;
}
export declare module Proxy {
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
