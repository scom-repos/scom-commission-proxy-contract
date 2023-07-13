import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
export interface IApproveParams {
    guy: string;
    wad: number | BigNumber;
}
export interface ITransferFromParams {
    src: string;
    dst: string;
    wad: number | BigNumber;
}
export interface ITransferParams {
    dst: string;
    wad: number | BigNumber;
}
export interface IAllowanceParams {
    param1: string;
    param2: string;
}
export declare class WETH9 extends _Contract {
    static _abi: any;
    constructor(wallet: IWallet, address?: string);
    deploy(options?: TransactionOptions): Promise<string>;
    parseApprovalEvent(receipt: TransactionReceipt): WETH9.ApprovalEvent[];
    decodeApprovalEvent(event: Event): WETH9.ApprovalEvent;
    parseTransferEvent(receipt: TransactionReceipt): WETH9.TransferEvent[];
    decodeTransferEvent(event: Event): WETH9.TransferEvent;
    parseDepositEvent(receipt: TransactionReceipt): WETH9.DepositEvent[];
    decodeDepositEvent(event: Event): WETH9.DepositEvent;
    parseWithdrawalEvent(receipt: TransactionReceipt): WETH9.WithdrawalEvent[];
    decodeWithdrawalEvent(event: Event): WETH9.WithdrawalEvent;
    name: {
        (options?: TransactionOptions): Promise<string>;
    };
    approve: {
        (params: IApproveParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IApproveParams, options?: TransactionOptions) => Promise<boolean>;
    };
    totalSupply: {
        (options?: TransactionOptions): Promise<BigNumber>;
    };
    transferFrom: {
        (params: ITransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ITransferFromParams, options?: TransactionOptions) => Promise<boolean>;
    };
    withdraw: {
        (wad: number | BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (wad: number | BigNumber, options?: TransactionOptions) => Promise<void>;
    };
    decimals: {
        (options?: TransactionOptions): Promise<BigNumber>;
    };
    balanceOf: {
        (param1: string, options?: TransactionOptions): Promise<BigNumber>;
    };
    symbol: {
        (options?: TransactionOptions): Promise<string>;
    };
    transfer: {
        (params: ITransferParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ITransferParams, options?: TransactionOptions) => Promise<boolean>;
    };
    deposit: {
        (options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
        call: (options?: number | BigNumber | TransactionOptions) => Promise<void>;
    };
    allowance: {
        (params: IAllowanceParams, options?: TransactionOptions): Promise<BigNumber>;
    };
    private assign;
}
export declare module WETH9 {
    interface ApprovalEvent {
        src: string;
        guy: string;
        wad: BigNumber;
        _event: Event;
    }
    interface TransferEvent {
        src: string;
        dst: string;
        wad: BigNumber;
        _event: Event;
    }
    interface DepositEvent {
        dst: string;
        wad: BigNumber;
        _event: Event;
    }
    interface WithdrawalEvent {
        src: string;
        wad: BigNumber;
        _event: Event;
    }
}
