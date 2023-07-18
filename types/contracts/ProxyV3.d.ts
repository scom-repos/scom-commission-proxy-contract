import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
export interface IAddProjectAdminParams {
    projectId: number | BigNumber;
    admin: string;
}
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
export interface IProxyCallParams {
    campaignId: number | BigNumber;
    target: string;
    tokensIn: {
        token: string;
        amount: number | BigNumber;
    }[];
    to: string;
    tokensOut: string[];
    referrer: string;
    data: string;
}
export interface IRemoveProjectAdminParams {
    projectId: number | BigNumber;
    admin: string;
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
export interface ITransferProjectOwnershipParams {
    projectId: number | BigNumber;
    newOwner: string;
}
export declare class ProxyV3 extends _Contract {
    static _abi: any;
    constructor(wallet: IWallet, address?: string);
    deploy(protocolRate: number | BigNumber, options?: TransactionOptions): Promise<string>;
    parseAddCommissionEvent(receipt: TransactionReceipt): ProxyV3.AddCommissionEvent[];
    decodeAddCommissionEvent(event: Event): ProxyV3.AddCommissionEvent;
    parseAddProjectAdminEvent(receipt: TransactionReceipt): ProxyV3.AddProjectAdminEvent[];
    decodeAddProjectAdminEvent(event: Event): ProxyV3.AddProjectAdminEvent;
    parseAuthorizeEvent(receipt: TransactionReceipt): ProxyV3.AuthorizeEvent[];
    decodeAuthorizeEvent(event: Event): ProxyV3.AuthorizeEvent;
    parseClaimEvent(receipt: TransactionReceipt): ProxyV3.ClaimEvent[];
    decodeClaimEvent(event: Event): ProxyV3.ClaimEvent;
    parseClaimProtocolFeeEvent(receipt: TransactionReceipt): ProxyV3.ClaimProtocolFeeEvent[];
    decodeClaimProtocolFeeEvent(event: Event): ProxyV3.ClaimProtocolFeeEvent;
    parseDeauthorizeEvent(receipt: TransactionReceipt): ProxyV3.DeauthorizeEvent[];
    decodeDeauthorizeEvent(event: Event): ProxyV3.DeauthorizeEvent;
    parseNewCampaignEvent(receipt: TransactionReceipt): ProxyV3.NewCampaignEvent[];
    decodeNewCampaignEvent(event: Event): ProxyV3.NewCampaignEvent;
    parseNewProjectEvent(receipt: TransactionReceipt): ProxyV3.NewProjectEvent[];
    decodeNewProjectEvent(event: Event): ProxyV3.NewProjectEvent;
    parseRemoveProjectAdminEvent(receipt: TransactionReceipt): ProxyV3.RemoveProjectAdminEvent[];
    decodeRemoveProjectAdminEvent(event: Event): ProxyV3.RemoveProjectAdminEvent;
    parseSetProtocolRateEvent(receipt: TransactionReceipt): ProxyV3.SetProtocolRateEvent[];
    decodeSetProtocolRateEvent(event: Event): ProxyV3.SetProtocolRateEvent;
    parseSkimEvent(receipt: TransactionReceipt): ProxyV3.SkimEvent[];
    decodeSkimEvent(event: Event): ProxyV3.SkimEvent;
    parseStakeEvent(receipt: TransactionReceipt): ProxyV3.StakeEvent[];
    decodeStakeEvent(event: Event): ProxyV3.StakeEvent;
    parseStartOwnershipTransferEvent(receipt: TransactionReceipt): ProxyV3.StartOwnershipTransferEvent[];
    decodeStartOwnershipTransferEvent(event: Event): ProxyV3.StartOwnershipTransferEvent;
    parseTakeoverProjectOwnershipEvent(receipt: TransactionReceipt): ProxyV3.TakeoverProjectOwnershipEvent[];
    decodeTakeoverProjectOwnershipEvent(event: Event): ProxyV3.TakeoverProjectOwnershipEvent;
    parseTransferBackEvent(receipt: TransactionReceipt): ProxyV3.TransferBackEvent[];
    decodeTransferBackEvent(event: Event): ProxyV3.TransferBackEvent;
    parseTransferForwardEvent(receipt: TransactionReceipt): ProxyV3.TransferForwardEvent[];
    decodeTransferForwardEvent(event: Event): ProxyV3.TransferForwardEvent;
    parseTransferOwnershipEvent(receipt: TransactionReceipt): ProxyV3.TransferOwnershipEvent[];
    decodeTransferOwnershipEvent(event: Event): ProxyV3.TransferOwnershipEvent;
    parseTransferProjectOwnershipEvent(receipt: TransactionReceipt): ProxyV3.TransferProjectOwnershipEvent[];
    decodeTransferProjectOwnershipEvent(event: Event): ProxyV3.TransferProjectOwnershipEvent;
    addProjectAdmin: {
        (params: IAddProjectAdminParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IAddProjectAdminParams, options?: TransactionOptions) => Promise<void>;
        txData: (params: IAddProjectAdminParams, options?: TransactionOptions) => Promise<string>;
    };
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
    claimMultipleProtocolFee: {
        (tokens: string[], options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (tokens: string[], options?: TransactionOptions) => Promise<void>;
        txData: (tokens: string[], options?: TransactionOptions) => Promise<string>;
    };
    claimProtocolFee: {
        (token: string, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (token: string, options?: TransactionOptions) => Promise<void>;
        txData: (token: string, options?: TransactionOptions) => Promise<string>;
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
    deny: {
        (user: string, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (user: string, options?: TransactionOptions) => Promise<void>;
        txData: (user: string, options?: TransactionOptions) => Promise<string>;
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
            acceptAnyInToken: boolean;
            acceptAnyOutToken: boolean;
            inTokens: string[];
            directTransferInToken: boolean[];
            commissionInTokenConfig: {
                rate: BigNumber;
                feeOnProjectOwner: boolean;
                capPerTransaction: BigNumber;
                capPerCampaign: BigNumber;
            }[];
            outTokens: string[];
            commissionOutTokenConfig: {
                rate: BigNumber;
                feeOnProjectOwner: boolean;
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
            directTransferInToken: boolean[];
            commissionInTokenConfig: {
                rate: BigNumber;
                feeOnProjectOwner: boolean;
                capPerTransaction: BigNumber;
                capPerCampaign: BigNumber;
            }[];
            outTokens: string[];
            commissionOutTokenConfig: {
                rate: BigNumber;
                feeOnProjectOwner: boolean;
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
    getProject: {
        (projectId: number | BigNumber, options?: TransactionOptions): Promise<{
            owner: string;
            newOwner: string;
            projectAdmins: string[];
        }>;
    };
    getProjectAdminsLength: {
        (projectId: number | BigNumber, options?: TransactionOptions): Promise<BigNumber>;
    };
    isPermitted: {
        (param1: string, options?: TransactionOptions): Promise<boolean>;
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
            acceptAnyInToken: boolean;
            acceptAnyOutToken: boolean;
            inTokens: string[];
            directTransferInToken: boolean[];
            commissionInTokenConfig: {
                rate: number | BigNumber;
                feeOnProjectOwner: boolean;
                capPerTransaction: number | BigNumber;
                capPerCampaign: number | BigNumber;
            }[];
            outTokens: string[];
            commissionOutTokenConfig: {
                rate: number | BigNumber;
                feeOnProjectOwner: boolean;
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
            acceptAnyInToken: boolean;
            acceptAnyOutToken: boolean;
            inTokens: string[];
            directTransferInToken: boolean[];
            commissionInTokenConfig: {
                rate: number | BigNumber;
                feeOnProjectOwner: boolean;
                capPerTransaction: number | BigNumber;
                capPerCampaign: number | BigNumber;
            }[];
            outTokens: string[];
            commissionOutTokenConfig: {
                rate: number | BigNumber;
                feeOnProjectOwner: boolean;
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
            acceptAnyInToken: boolean;
            acceptAnyOutToken: boolean;
            inTokens: string[];
            directTransferInToken: boolean[];
            commissionInTokenConfig: {
                rate: number | BigNumber;
                feeOnProjectOwner: boolean;
                capPerTransaction: number | BigNumber;
                capPerCampaign: number | BigNumber;
            }[];
            outTokens: string[];
            commissionOutTokenConfig: {
                rate: number | BigNumber;
                feeOnProjectOwner: boolean;
                capPerTransaction: number | BigNumber;
                capPerCampaign: number | BigNumber;
            }[];
            referrers: string[];
        }, options?: TransactionOptions) => Promise<string>;
    };
    newOwner: {
        (options?: TransactionOptions): Promise<string>;
    };
    newProject: {
        (admins: string[], options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (admins: string[], options?: TransactionOptions) => Promise<BigNumber>;
        txData: (admins: string[], options?: TransactionOptions) => Promise<string>;
    };
    owner: {
        (options?: TransactionOptions): Promise<string>;
    };
    permit: {
        (user: string, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (user: string, options?: TransactionOptions) => Promise<void>;
        txData: (user: string, options?: TransactionOptions) => Promise<string>;
    };
    protocolFeeBalance: {
        (param1: string, options?: TransactionOptions): Promise<BigNumber>;
    };
    protocolRate: {
        (options?: TransactionOptions): Promise<BigNumber>;
    };
    proxyCall: {
        (params: IProxyCallParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IProxyCallParams, options?: number | BigNumber | TransactionOptions) => Promise<void>;
        txData: (params: IProxyCallParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
    };
    removeProjectAdmin: {
        (params: IRemoveProjectAdminParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IRemoveProjectAdminParams, options?: TransactionOptions) => Promise<void>;
        txData: (params: IRemoveProjectAdminParams, options?: TransactionOptions) => Promise<string>;
    };
    setProtocolRate: {
        (newRate: number | BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (newRate: number | BigNumber, options?: TransactionOptions) => Promise<void>;
        txData: (newRate: number | BigNumber, options?: TransactionOptions) => Promise<string>;
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
    takeOwnership: {
        (options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (options?: TransactionOptions) => Promise<void>;
        txData: (options?: TransactionOptions) => Promise<string>;
    };
    takeoverProjectOwnership: {
        (projectId: number | BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (projectId: number | BigNumber, options?: TransactionOptions) => Promise<void>;
        txData: (projectId: number | BigNumber, options?: TransactionOptions) => Promise<string>;
    };
    transferOwnership: {
        (newOwner: string, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (newOwner: string, options?: TransactionOptions) => Promise<void>;
        txData: (newOwner: string, options?: TransactionOptions) => Promise<string>;
    };
    transferProjectOwnership: {
        (params: ITransferProjectOwnershipParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ITransferProjectOwnershipParams, options?: TransactionOptions) => Promise<void>;
        txData: (params: ITransferProjectOwnershipParams, options?: TransactionOptions) => Promise<string>;
    };
    private assign;
}
export declare module ProxyV3 {
    interface AddCommissionEvent {
        to: string;
        token: string;
        commission: BigNumber;
        commissionBalance: BigNumber;
        protocolFee: BigNumber;
        protocolFeeBalance: BigNumber;
        _event: Event;
    }
    interface AddProjectAdminEvent {
        projectId: BigNumber;
        admin: string;
        _event: Event;
    }
    interface AuthorizeEvent {
        user: string;
        _event: Event;
    }
    interface ClaimEvent {
        from: string;
        token: string;
        amount: BigNumber;
        _event: Event;
    }
    interface ClaimProtocolFeeEvent {
        token: string;
        amount: BigNumber;
        _event: Event;
    }
    interface DeauthorizeEvent {
        user: string;
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
    interface RemoveProjectAdminEvent {
        projectId: BigNumber;
        admin: string;
        _event: Event;
    }
    interface SetProtocolRateEvent {
        protocolRate: BigNumber;
        _event: Event;
    }
    interface SkimEvent {
        token: string;
        to: string;
        amount: BigNumber;
        _event: Event;
    }
    interface StakeEvent {
        projectId: BigNumber;
        token: string;
        amount: BigNumber;
        balance: BigNumber;
        _event: Event;
    }
    interface StartOwnershipTransferEvent {
        user: string;
        _event: Event;
    }
    interface TakeoverProjectOwnershipEvent {
        projectId: BigNumber;
        newOwner: string;
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
    interface TransferOwnershipEvent {
        user: string;
        _event: Event;
    }
    interface TransferProjectOwnershipEvent {
        projectId: BigNumber;
        newOwner: string;
        _event: Event;
    }
}
