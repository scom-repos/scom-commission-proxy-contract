/// <amd-module name="@ijstech/commission-proxy/contracts/Distributor.json.ts" />
declare module "@ijstech/commission-proxy/contracts/Distributor.json.ts" {
    const _default: {
        abi: ({
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            outputs?: undefined;
            stateMutability?: undefined;
        } | {
            inputs: ({
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            } | {
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            })[];
            name: string;
            outputs: any[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default;
}
/// <amd-module name="@ijstech/commission-proxy/contracts/Distributor.ts" />
declare module "@ijstech/commission-proxy/contracts/Distributor.ts" {
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
    export class Distributor extends _Contract {
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
    export module Distributor {
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
}
/// <amd-module name="@ijstech/commission-proxy/contracts/Proxy.json.ts" />
declare module "@ijstech/commission-proxy/contracts/Proxy.json.ts" {
    const _default_1: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: ({
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            } | {
                components: ({
                    internalType: string;
                    name: string;
                    type: string;
                    components?: undefined;
                } | {
                    components: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    internalType: string;
                    name: string;
                    type: string;
                })[];
                internalType: string;
                name: string;
                type: string;
            })[];
            name: string;
            outputs: any[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        } | {
            stateMutability: string;
            type: string;
            inputs?: undefined;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_1;
}
/// <amd-module name="@ijstech/commission-proxy/contracts/Proxy.ts" />
declare module "@ijstech/commission-proxy/contracts/Proxy.ts" {
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
    export class Proxy extends _Contract {
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
    export module Proxy {
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
}
/// <amd-module name="@ijstech/commission-proxy/contracts/index.ts" />
declare module "@ijstech/commission-proxy/contracts/index.ts" {
    export { Distributor } from "@ijstech/commission-proxy/contracts/Distributor.ts";
    export { Proxy } from "@ijstech/commission-proxy/contracts/Proxy.ts";
}
/// <amd-module name="@ijstech/commission-proxy" />
declare module "@ijstech/commission-proxy" {
    import * as Contracts from "@ijstech/commission-proxy/contracts/index.ts";
    export { Contracts };
    import { IWallet } from '@ijstech/eth-wallet';
    export interface IDeployOptions {
    }
    export interface IDeployResult {
        distributor: string;
        proxy: string;
    }
    export var DefaultDeployOptions: IDeployOptions;
    export function deploy(wallet: IWallet, options?: IDeployOptions): Promise<IDeployResult>;
    export function onProgress(handler: any): void;
    const _default_2: {
        Contracts: typeof Contracts;
        deploy: typeof deploy;
        DefaultDeployOptions: IDeployOptions;
        onProgress: typeof onProgress;
    };
    export default _default_2;
}
