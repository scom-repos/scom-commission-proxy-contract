/// <amd-module name="mock-contracts/contracts/MockAMMFactory.json.ts" />
declare module "mock-contracts/contracts/MockAMMFactory.json.ts" {
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
/// <amd-module name="mock-contracts/contracts/MockAMMFactory.ts" />
declare module "mock-contracts/contracts/MockAMMFactory.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface ICreatePairParams {
        token0: string;
        token1: string;
    }
    export class MockAMMFactory extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(options?: TransactionOptions): Promise<string>;
        parsePairCreatedEvent(receipt: TransactionReceipt): MockAMMFactory.PairCreatedEvent[];
        decodePairCreatedEvent(event: Event): MockAMMFactory.PairCreatedEvent;
        allPairs: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        allPairsLength: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        createPair: {
            (params: ICreatePairParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ICreatePairParams, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
    export module MockAMMFactory {
        interface PairCreatedEvent {
            token0: string;
            token1: string;
            pair: string;
            newSize: BigNumber;
            _event: Event;
        }
    }
}
/// <amd-module name="mock-contracts/contracts/MockAMMPair.json.ts" />
declare module "mock-contracts/contracts/MockAMMPair.json.ts" {
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
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: any[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        } | {
            inputs: any[];
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
    export default _default_1;
}
/// <amd-module name="mock-contracts/contracts/MockAMMPair.ts" />
declare module "mock-contracts/contracts/MockAMMPair.ts" {
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
    export class MockAMMPair extends _Contract {
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
    export module MockAMMPair {
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
}
/// <amd-module name="mock-contracts/contracts/MockOracleAdaptor.json.ts" />
declare module "mock-contracts/contracts/MockOracleAdaptor.json.ts" {
    const _default_2: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name?: undefined;
            outputs?: undefined;
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
        })[];
        bytecode: string;
    };
    export default _default_2;
}
/// <amd-module name="mock-contracts/contracts/MockOracleAdaptor.ts" />
declare module "mock-contracts/contracts/MockOracleAdaptor.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        weth: string;
        decimals: number | BigNumber;
        tokens: string[];
        prices: (number | BigNumber)[];
    }
    export interface IGetLatestPriceParams {
        from: string;
        to: string;
        param3: string;
    }
    export interface IGetRatioParams {
        from: string;
        to: string;
        param3: number | BigNumber;
        param4: number | BigNumber;
        param5: string;
    }
    export interface IIsSupportedParams {
        from: string;
        to: string;
    }
    export interface ISetPriceParams {
        token: string;
        price: number | BigNumber;
    }
    export interface ISetPrice_1Params {
        token0: string;
        token1: string;
        price0: number | BigNumber;
        price1: number | BigNumber;
    }
    export class MockOracleAdaptor extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        decimals: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        getLatestPrice: {
            (params: IGetLatestPriceParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getRatio: {
            (params: IGetRatioParams, options?: TransactionOptions): Promise<{
                numerator: BigNumber;
                denominator: BigNumber;
            }>;
        };
        isSupported: {
            (params: IIsSupportedParams, options?: TransactionOptions): Promise<boolean>;
        };
        setPrice: {
            (params: ISetPriceParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetPriceParams, options?: TransactionOptions) => Promise<void>;
        };
        setPrice_1: {
            (params: ISetPrice_1Params, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetPrice_1Params, options?: TransactionOptions) => Promise<void>;
        };
        weth: {
            (options?: TransactionOptions): Promise<string>;
        };
        private assign;
    }
}
/// <amd-module name="mock-contracts/contracts/MockOracleAdaptor3.json.ts" />
declare module "mock-contracts/contracts/MockOracleAdaptor3.json.ts" {
    const _default_3: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name?: undefined;
            outputs?: undefined;
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
        })[];
        bytecode: string;
    };
    export default _default_3;
}
/// <amd-module name="mock-contracts/contracts/MockOracleAdaptor3.ts" />
declare module "mock-contracts/contracts/MockOracleAdaptor3.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        weth: string;
        decimals: number | BigNumber;
        tokens: string[];
        prices: (number | BigNumber)[];
    }
    export interface IGetLatestPriceParams {
        from: string;
        to: string;
        param3: string;
    }
    export interface IGetRatioParams {
        from: string;
        to: string;
        param3: number | BigNumber;
        param4: number | BigNumber;
        param5: string;
    }
    export interface IIsSupportedParams {
        from: string;
        to: string;
    }
    export interface ISetPriceParams {
        token: string;
        price: number | BigNumber;
    }
    export class MockOracleAdaptor3 extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        decimals: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        getLatestPrice: {
            (params: IGetLatestPriceParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getRatio: {
            (params: IGetRatioParams, options?: TransactionOptions): Promise<{
                numerator: BigNumber;
                denominator: BigNumber;
            }>;
        };
        isSupported: {
            (params: IIsSupportedParams, options?: TransactionOptions): Promise<boolean>;
        };
        setPrice: {
            (params: ISetPriceParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetPriceParams, options?: TransactionOptions) => Promise<void>;
        };
        weth: {
            (options?: TransactionOptions): Promise<string>;
        };
        private assign;
    }
}
/// <amd-module name="mock-contracts/contracts/MockPriceOracle.json.ts" />
declare module "mock-contracts/contracts/MockPriceOracle.json.ts" {
    const _default_4: {
        abi: ({
            inputs: any[];
            stateMutability: string;
            type: string;
            name?: undefined;
            outputs?: undefined;
        } | {
            inputs: any[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: any[];
            stateMutability: string;
            type: string;
        })[];
        bytecode: string;
    };
    export default _default_4;
}
/// <amd-module name="mock-contracts/contracts/MockPriceOracle.ts" />
declare module "mock-contracts/contracts/MockPriceOracle.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export class MockPriceOracle extends _Contract {
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
}
/// <amd-module name="mock-contracts/contracts/MockRouter.json.ts" />
declare module "mock-contracts/contracts/MockRouter.json.ts" {
    const _default_5: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name?: undefined;
            outputs?: undefined;
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
        } | {
            stateMutability: string;
            type: string;
            inputs?: undefined;
            name?: undefined;
            outputs?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_5;
}
/// <amd-module name="mock-contracts/contracts/MockRouter.ts" />
declare module "mock-contracts/contracts/MockRouter.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        weth: string;
        pair: string[];
        tokenIn: string[];
        tokenOut: string[];
        rate: (number | BigNumber)[];
    }
    export interface ISwapETHForExactTokensParams {
        amountOut: number | BigNumber;
        pair: string[];
        to: string;
        deadline: number | BigNumber;
        data: string;
    }
    export interface ISwapExactETHForTokensParams {
        amountOutMin: number | BigNumber;
        pair: string[];
        to: string;
        deadline: number | BigNumber;
        data: string;
    }
    export interface ISwapExactTokensForETHParams {
        amountIn: number | BigNumber;
        amountOutMin: number | BigNumber;
        pair: string[];
        to: string;
        param5: number | BigNumber;
        param6: string;
    }
    export interface ISwapExactTokensForTokensParams {
        amountIn: number | BigNumber;
        amountOutMin: number | BigNumber;
        pair: string[];
        tokenIn: string;
        to: string;
        param6: number | BigNumber;
        param7: string;
    }
    export interface ISwapTokensForExactETHParams {
        amountOut: number | BigNumber;
        amountInMax: number | BigNumber;
        pair: string[];
        to: string;
        deadline: number | BigNumber;
        data: string;
    }
    export interface ISwapTokensForExactTokensParams {
        amountOut: number | BigNumber;
        amountInMax: number | BigNumber;
        pair: string[];
        tokenOut: string;
        to: string;
        deadline: number | BigNumber;
        data: string;
    }
    export class MockRouter extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: number | BigNumber | TransactionOptions): Promise<string>;
        WETH: {
            (options?: TransactionOptions): Promise<string>;
        };
        swapETHForExactTokens: {
            (params: ISwapETHForExactTokensParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapETHForExactTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<{
                path: string[];
                amounts: BigNumber[];
            }>;
        };
        swapExactETHForTokens: {
            (params: ISwapExactETHForTokensParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactETHForTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<{
                path: string[];
                amounts: BigNumber[];
            }>;
        };
        swapExactTokensForETH: {
            (params: ISwapExactTokensForETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactTokensForETHParams, options?: TransactionOptions) => Promise<{
                path: string[];
                amounts: BigNumber[];
            }>;
        };
        swapExactTokensForTokens: {
            (params: ISwapExactTokensForTokensParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactTokensForTokensParams, options?: TransactionOptions) => Promise<{
                path: string[];
                amounts: BigNumber[];
            }>;
        };
        swapTokensForExactETH: {
            (params: ISwapTokensForExactETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapTokensForExactETHParams, options?: TransactionOptions) => Promise<{
                path: string[];
                amounts: BigNumber[];
            }>;
        };
        swapTokensForExactTokens: {
            (params: ISwapTokensForExactTokensParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapTokensForExactTokensParams, options?: TransactionOptions) => Promise<{
                path: string[];
                amounts: BigNumber[];
            }>;
        };
        private assign;
    }
}
/// <amd-module name="mock-contracts/contracts/MockErc20.json.ts" />
declare module "mock-contracts/contracts/MockErc20.json.ts" {
    const _default_6: {
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
    export default _default_6;
}
/// <amd-module name="mock-contracts/contracts/MockErc20.ts" />
declare module "mock-contracts/contracts/MockErc20.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        name: string;
        symbol: string;
        decimals: number | BigNumber;
    }
    export interface IAllowanceParams {
        owner: string;
        spender: string;
    }
    export interface IApproveParams {
        spender: string;
        amount: number | BigNumber;
    }
    export interface IBurnFromParams {
        account: string;
        amount: number | BigNumber;
    }
    export interface IDecreaseAllowanceParams {
        spender: string;
        subtractedValue: number | BigNumber;
    }
    export interface IGetRoleMemberParams {
        role: string;
        index: number | BigNumber;
    }
    export interface IGrantRoleParams {
        role: string;
        account: string;
    }
    export interface IHasRoleParams {
        role: string;
        account: string;
    }
    export interface IIncreaseAllowanceParams {
        spender: string;
        addedValue: number | BigNumber;
    }
    export interface IMintParams {
        to: string;
        amount: number | BigNumber;
    }
    export interface IRenounceRoleParams {
        role: string;
        account: string;
    }
    export interface IRevokeRoleParams {
        role: string;
        account: string;
    }
    export interface ITransferParams {
        to: string;
        amount: number | BigNumber;
    }
    export interface ITransferFromParams {
        from: string;
        to: string;
        amount: number | BigNumber;
    }
    export class MockErc20 extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        parseApprovalEvent(receipt: TransactionReceipt): MockErc20.ApprovalEvent[];
        decodeApprovalEvent(event: Event): MockErc20.ApprovalEvent;
        parsePausedEvent(receipt: TransactionReceipt): MockErc20.PausedEvent[];
        decodePausedEvent(event: Event): MockErc20.PausedEvent;
        parseRoleAdminChangedEvent(receipt: TransactionReceipt): MockErc20.RoleAdminChangedEvent[];
        decodeRoleAdminChangedEvent(event: Event): MockErc20.RoleAdminChangedEvent;
        parseRoleGrantedEvent(receipt: TransactionReceipt): MockErc20.RoleGrantedEvent[];
        decodeRoleGrantedEvent(event: Event): MockErc20.RoleGrantedEvent;
        parseRoleRevokedEvent(receipt: TransactionReceipt): MockErc20.RoleRevokedEvent[];
        decodeRoleRevokedEvent(event: Event): MockErc20.RoleRevokedEvent;
        parseTransferEvent(receipt: TransactionReceipt): MockErc20.TransferEvent[];
        decodeTransferEvent(event: Event): MockErc20.TransferEvent;
        parseUnpausedEvent(receipt: TransactionReceipt): MockErc20.UnpausedEvent[];
        decodeUnpausedEvent(event: Event): MockErc20.UnpausedEvent;
        DEFAULT_ADMIN_ROLE: {
            (options?: TransactionOptions): Promise<string>;
        };
        MINTER_ROLE: {
            (options?: TransactionOptions): Promise<string>;
        };
        PAUSER_ROLE: {
            (options?: TransactionOptions): Promise<string>;
        };
        allowance: {
            (params: IAllowanceParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        approve: {
            (params: IApproveParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IApproveParams, options?: TransactionOptions) => Promise<boolean>;
        };
        balanceOf: {
            (account: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        burn: {
            (amount: number | BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (amount: number | BigNumber, options?: TransactionOptions) => Promise<void>;
        };
        burnFrom: {
            (params: IBurnFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IBurnFromParams, options?: TransactionOptions) => Promise<void>;
        };
        decimals: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        decreaseAllowance: {
            (params: IDecreaseAllowanceParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IDecreaseAllowanceParams, options?: TransactionOptions) => Promise<boolean>;
        };
        getRoleAdmin: {
            (role: string, options?: TransactionOptions): Promise<string>;
        };
        getRoleMember: {
            (params: IGetRoleMemberParams, options?: TransactionOptions): Promise<string>;
        };
        getRoleMemberCount: {
            (role: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        grantRole: {
            (params: IGrantRoleParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IGrantRoleParams, options?: TransactionOptions) => Promise<void>;
        };
        hasRole: {
            (params: IHasRoleParams, options?: TransactionOptions): Promise<boolean>;
        };
        increaseAllowance: {
            (params: IIncreaseAllowanceParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IIncreaseAllowanceParams, options?: TransactionOptions) => Promise<boolean>;
        };
        mint: {
            (params: IMintParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IMintParams, options?: TransactionOptions) => Promise<void>;
        };
        name: {
            (options?: TransactionOptions): Promise<string>;
        };
        pause: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
        };
        paused: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        renounceRole: {
            (params: IRenounceRoleParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRenounceRoleParams, options?: TransactionOptions) => Promise<void>;
        };
        revokeRole: {
            (params: IRevokeRoleParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRevokeRoleParams, options?: TransactionOptions) => Promise<void>;
        };
        supportsInterface: {
            (interfaceId: string, options?: TransactionOptions): Promise<boolean>;
        };
        symbol: {
            (options?: TransactionOptions): Promise<string>;
        };
        totalSupply: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        transfer: {
            (params: ITransferParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ITransferParams, options?: TransactionOptions) => Promise<boolean>;
        };
        transferFrom: {
            (params: ITransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ITransferFromParams, options?: TransactionOptions) => Promise<boolean>;
        };
        unpause: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
        };
        private assign;
    }
    export module MockErc20 {
        interface ApprovalEvent {
            owner: string;
            spender: string;
            value: BigNumber;
            _event: Event;
        }
        interface PausedEvent {
            account: string;
            _event: Event;
        }
        interface RoleAdminChangedEvent {
            role: string;
            previousAdminRole: string;
            newAdminRole: string;
            _event: Event;
        }
        interface RoleGrantedEvent {
            role: string;
            account: string;
            sender: string;
            _event: Event;
        }
        interface RoleRevokedEvent {
            role: string;
            account: string;
            sender: string;
            _event: Event;
        }
        interface TransferEvent {
            from: string;
            to: string;
            value: BigNumber;
            _event: Event;
        }
        interface UnpausedEvent {
            account: string;
            _event: Event;
        }
    }
}
/// <amd-module name="mock-contracts/contracts/WETH9.json.ts" />
declare module "mock-contracts/contracts/WETH9.json.ts" {
    const _default_7: {
        abi: ({
            constant: boolean;
            inputs: {
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                name: string;
                type: string;
            }[];
            payable: boolean;
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        } | {
            payable: boolean;
            stateMutability: string;
            type: string;
            constant?: undefined;
            inputs?: undefined;
            name?: undefined;
            outputs?: undefined;
            anonymous?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            constant?: undefined;
            outputs?: undefined;
            payable?: undefined;
            stateMutability?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_7;
}
/// <amd-module name="mock-contracts/contracts/WETH9.ts" />
declare module "mock-contracts/contracts/WETH9.ts" {
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
    export class WETH9 extends _Contract {
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
    export module WETH9 {
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
}
/// <amd-module name="mock-contracts/contracts/index.ts" />
declare module "mock-contracts/contracts/index.ts" {
    export { MockAMMFactory } from "mock-contracts/contracts/MockAMMFactory.ts";
    export { MockAMMPair } from "mock-contracts/contracts/MockAMMPair.ts";
    export { MockOracleAdaptor } from "mock-contracts/contracts/MockOracleAdaptor.ts";
    export { MockOracleAdaptor3 } from "mock-contracts/contracts/MockOracleAdaptor3.ts";
    export { MockPriceOracle } from "mock-contracts/contracts/MockPriceOracle.ts";
    export { MockRouter } from "mock-contracts/contracts/MockRouter.ts";
    export { MockErc20 } from "mock-contracts/contracts/MockErc20.ts";
    export { WETH9 } from "mock-contracts/contracts/WETH9.ts";
}
/// <amd-module name="mock-contracts" />
declare module "mock-contracts" {
    import * as Contracts from "mock-contracts/contracts/index.ts";
    export { Contracts };
}
