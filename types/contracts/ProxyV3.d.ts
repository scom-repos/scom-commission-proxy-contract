import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
export interface ICampaignAccumulatedCommissionParams {
    param1: number | BigNumber;
    param2: string;
}
export interface IClaimantIdsParams {
    param1: string;
    param2: string;
}
export interface IGetCampaignParams {
    campaignId: number | BigNumber;
    returnArrays: boolean;
}
export interface IGetCampaignArrayData1Params {
    campaignId: number | BigNumber;
    targetAndSelectorsStart: number | BigNumber;
    targetAndSelectorsLength: number | BigNumber;
    referrersStart: number | BigNumber;
    referrersLength: number | BigNumber;
}
export interface IGetCampaignArrayData2Params {
    campaignId: number | BigNumber;
    inTokensStart: number | BigNumber;
    inTokensLength: number | BigNumber;
    outTokensStart: number | BigNumber;
    outTokensLength: number | BigNumber;
}
export interface IGetClaimantBalanceParams {
    claimant: string;
    token: string;
}
export interface IGetClaimantsInfoParams {
    fromId: number | BigNumber;
    count: number | BigNumber;
}
export interface IProjectBalanceParams {
    param1: number | BigNumber;
    param2: string;
}
export interface IProxyCallParams {
    referrer: string;
    campaignId: number | BigNumber;
    target: string;
    tokensIn: {
        token: string;
        amount: number | BigNumber;
    }[];
    to: string;
    tokensOut: string[];
    data: string;
}
export interface IStakeParams {
    projectId: number | BigNumber;
    token: string;
    amount: number | BigNumber;
}
export interface IStakeMultipleParams {
    projectId: number | BigNumber;
    token: string[];
    amount: (number | BigNumber)[];
}
export interface IStakesBalanceParams {
    param1: number | BigNumber;
    param2: string;
}
export declare class ProxyV3 extends _Contract {
    static _abi: any;
    constructor(wallet: IWallet, address?: string);
    deploy(options?: TransactionOptions): Promise<string>;
    parseAddCommissionEvent(receipt: TransactionReceipt): ProxyV3.AddCommissionEvent[];
    decodeAddCommissionEvent(event: Event): ProxyV3.AddCommissionEvent;
    parseClaimEvent(receipt: TransactionReceipt): ProxyV3.ClaimEvent[];
    decodeClaimEvent(event: Event): ProxyV3.ClaimEvent;
    parseNewCampaignEvent(receipt: TransactionReceipt): ProxyV3.NewCampaignEvent[];
    decodeNewCampaignEvent(event: Event): ProxyV3.NewCampaignEvent;
    parseNewProjectEvent(receipt: TransactionReceipt): ProxyV3.NewProjectEvent[];
    decodeNewProjectEvent(event: Event): ProxyV3.NewProjectEvent;
    parseSkimEvent(receipt: TransactionReceipt): ProxyV3.SkimEvent[];
    decodeSkimEvent(event: Event): ProxyV3.SkimEvent;
    parseTransferBackEvent(receipt: TransactionReceipt): ProxyV3.TransferBackEvent[];
    decodeTransferBackEvent(event: Event): ProxyV3.TransferBackEvent;
    parseTransferForwardEvent(receipt: TransactionReceipt): ProxyV3.TransferForwardEvent[];
    decodeTransferForwardEvent(event: Event): ProxyV3.TransferForwardEvent;
    campaignAccumulatedCommission: {
        (params: ICampaignAccumulatedCommissionParams, options?: TransactionOptions): Promise<BigNumber>;
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
    getCampaign: {
        (params: IGetCampaignParams, options?: TransactionOptions): Promise<{
            projectId: BigNumber;
            maxInputTokensInEachCall: BigNumber;
            maxOutputTokensInEachCall: BigNumber;
            referrersRequireApproval: boolean;
            startDate: BigNumber;
            endDate: BigNumber;
            targetAndSelectors: string[];
            inTokens: string[];
            commissionInTokenConfig: {
                directTransfer: boolean;
                rate: BigNumber;
                capPerTransaction: BigNumber;
                capPerCampaign: BigNumber;
            }[];
            outTokens: string[];
            commissionOutTokenConfig: {
                rate: BigNumber;
                capPerTransaction: BigNumber;
                capPerCampaign: BigNumber;
            }[];
            referrers: string[];
        }>;
    };
    getCampaignArrayData1: {
        (params: IGetCampaignArrayData1Params, options?: TransactionOptions): Promise<{
            targetAndSelectors: string[];
            referrers: string[];
        }>;
    };
    getCampaignArrayData2: {
        (params: IGetCampaignArrayData2Params, options?: TransactionOptions): Promise<{
            inTokens: string[];
            commissionInTokenConfig: {
                directTransfer: boolean;
                rate: BigNumber;
                capPerTransaction: BigNumber;
                capPerCampaign: BigNumber;
            }[];
            outTokens: string[];
            commissionOutTokenConfig: {
                rate: BigNumber;
                capPerTransaction: BigNumber;
                capPerCampaign: BigNumber;
            }[];
        }>;
    };
    getCampaignArrayLength: {
        (campaignId: number | BigNumber, options?: TransactionOptions): Promise<{
            targetAndSelectorsLength: BigNumber;
            inTokensLength: BigNumber;
            outTokensLength: BigNumber;
            referrersLength: BigNumber;
        }>;
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
    newCampaign: {
        (params: {
            projectId: number | BigNumber;
            maxInputTokensInEachCall: number | BigNumber;
            maxOutputTokensInEachCall: number | BigNumber;
            referrersRequireApproval: boolean;
            startDate: number | BigNumber;
            endDate: number | BigNumber;
            targetAndSelectors: string[];
            inTokens: string[];
            commissionInTokenConfig: {
                directTransfer: boolean;
                rate: number | BigNumber;
                capPerTransaction: number | BigNumber;
                capPerCampaign: number | BigNumber;
            }[];
            outTokens: string[];
            commissionOutTokenConfig: {
                rate: number | BigNumber;
                capPerTransaction: number | BigNumber;
                capPerCampaign: number | BigNumber;
            }[];
            referrers: string[];
        }, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: {
            projectId: number | BigNumber;
            maxInputTokensInEachCall: number | BigNumber;
            maxOutputTokensInEachCall: number | BigNumber;
            referrersRequireApproval: boolean;
            startDate: number | BigNumber;
            endDate: number | BigNumber;
            targetAndSelectors: string[];
            inTokens: string[];
            commissionInTokenConfig: {
                directTransfer: boolean;
                rate: number | BigNumber;
                capPerTransaction: number | BigNumber;
                capPerCampaign: number | BigNumber;
            }[];
            outTokens: string[];
            commissionOutTokenConfig: {
                rate: number | BigNumber;
                capPerTransaction: number | BigNumber;
                capPerCampaign: number | BigNumber;
            }[];
            referrers: string[];
        }, options?: TransactionOptions) => Promise<BigNumber>;
        txData: (params: {
            projectId: number | BigNumber;
            maxInputTokensInEachCall: number | BigNumber;
            maxOutputTokensInEachCall: number | BigNumber;
            referrersRequireApproval: boolean;
            startDate: number | BigNumber;
            endDate: number | BigNumber;
            targetAndSelectors: string[];
            inTokens: string[];
            commissionInTokenConfig: {
                directTransfer: boolean;
                rate: number | BigNumber;
                capPerTransaction: number | BigNumber;
                capPerCampaign: number | BigNumber;
            }[];
            outTokens: string[];
            commissionOutTokenConfig: {
                rate: number | BigNumber;
                capPerTransaction: number | BigNumber;
                capPerCampaign: number | BigNumber;
            }[];
            referrers: string[];
        }, options?: TransactionOptions) => Promise<string>;
    };
    newProject: {
        (admins: string[], options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (admins: string[], options?: TransactionOptions) => Promise<BigNumber>;
        txData: (admins: string[], options?: TransactionOptions) => Promise<string>;
    };
    projectBalance: {
        (params: IProjectBalanceParams, options?: TransactionOptions): Promise<BigNumber>;
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
    stake: {
        (params: IStakeParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IStakeParams, options?: TransactionOptions) => Promise<void>;
        txData: (params: IStakeParams, options?: TransactionOptions) => Promise<string>;
    };
    stakeETH: {
        (projectId: number | BigNumber, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
        call: (projectId: number | BigNumber, options?: number | BigNumber | TransactionOptions) => Promise<void>;
        txData: (projectId: number | BigNumber, options?: number | BigNumber | TransactionOptions) => Promise<string>;
    };
    stakeMultiple: {
        (params: IStakeMultipleParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IStakeMultipleParams, options?: number | BigNumber | TransactionOptions) => Promise<void>;
        txData: (params: IStakeMultipleParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
    };
    stakesBalance: {
        (params: IStakesBalanceParams, options?: TransactionOptions): Promise<BigNumber>;
    };
    private assign;
}
export declare module ProxyV3 {
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
    interface NewCampaignEvent {
        campaignId: BigNumber;
        _event: Event;
    }
    interface NewProjectEvent {
        projectId: BigNumber;
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
        _event: Event;
    }
}
