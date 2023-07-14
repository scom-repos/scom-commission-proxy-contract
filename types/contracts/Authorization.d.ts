import { IWallet, Contract as _Contract, TransactionReceipt, Event, TransactionOptions } from "@ijstech/eth-contract";
export declare class Authorization extends _Contract {
    static _abi: any;
    constructor(wallet: IWallet, address?: string);
    deploy(options?: TransactionOptions): Promise<string>;
    parseAuthorizeEvent(receipt: TransactionReceipt): Authorization.AuthorizeEvent[];
    decodeAuthorizeEvent(event: Event): Authorization.AuthorizeEvent;
    parseDeauthorizeEvent(receipt: TransactionReceipt): Authorization.DeauthorizeEvent[];
    decodeDeauthorizeEvent(event: Event): Authorization.DeauthorizeEvent;
    parseStartOwnershipTransferEvent(receipt: TransactionReceipt): Authorization.StartOwnershipTransferEvent[];
    decodeStartOwnershipTransferEvent(event: Event): Authorization.StartOwnershipTransferEvent;
    parseTransferOwnershipEvent(receipt: TransactionReceipt): Authorization.TransferOwnershipEvent[];
    decodeTransferOwnershipEvent(event: Event): Authorization.TransferOwnershipEvent;
    deny: {
        (user: string, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (user: string, options?: TransactionOptions) => Promise<void>;
        txData: (user: string, options?: TransactionOptions) => Promise<string>;
    };
    isPermitted: {
        (param1: string, options?: TransactionOptions): Promise<boolean>;
    };
    newOwner: {
        (options?: TransactionOptions): Promise<string>;
    };
    owner: {
        (options?: TransactionOptions): Promise<string>;
    };
    permit: {
        (user: string, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (user: string, options?: TransactionOptions) => Promise<void>;
        txData: (user: string, options?: TransactionOptions) => Promise<string>;
    };
    takeOwnership: {
        (options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (options?: TransactionOptions) => Promise<void>;
        txData: (options?: TransactionOptions) => Promise<string>;
    };
    transferOwnership: {
        (newOwner: string, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (newOwner: string, options?: TransactionOptions) => Promise<void>;
        txData: (newOwner: string, options?: TransactionOptions) => Promise<string>;
    };
    private assign;
}
export declare module Authorization {
    interface AuthorizeEvent {
        user: string;
        _event: Event;
    }
    interface DeauthorizeEvent {
        user: string;
        _event: Event;
    }
    interface StartOwnershipTransferEvent {
        user: string;
        _event: Event;
    }
    interface TransferOwnershipEvent {
        user: string;
        _event: Event;
    }
}
