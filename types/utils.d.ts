/// <reference path="@ijstech/eth-wallet/index.d.ts" />
import { IRpcWallet } from "@ijstech/eth-wallet";
declare const getProxyCampaign: (wallet: IRpcWallet, proxyAddress: string, campaignId: number) => Promise<{
    projectId: import("@ijstech/eth-wallet").BigNumber;
    maxInputTokensInEachCall: import("@ijstech/eth-wallet").BigNumber;
    maxOutputTokensInEachCall: import("@ijstech/eth-wallet").BigNumber;
    referrersRequireApproval: boolean;
    startDate: import("@ijstech/eth-wallet").BigNumber;
    endDate: import("@ijstech/eth-wallet").BigNumber;
    targetAndSelectors: string[];
    acceptAnyInToken: boolean;
    acceptAnyOutToken: boolean;
    inTokens: string[];
    directTransferInToken: boolean[];
    commissionInTokenConfig: {
        rate: import("@ijstech/eth-wallet").BigNumber;
        feeOnProjectOwner: boolean;
        capPerTransaction: import("@ijstech/eth-wallet").BigNumber;
        capPerCampaign: import("@ijstech/eth-wallet").BigNumber;
    }[];
    outTokens: string[];
    commissionOutTokenConfig: {
        rate: import("@ijstech/eth-wallet").BigNumber;
        feeOnProjectOwner: boolean;
        capPerTransaction: import("@ijstech/eth-wallet").BigNumber;
        capPerCampaign: import("@ijstech/eth-wallet").BigNumber;
    }[];
    referrers: string[];
}>;
declare const getCommissionRate: (wallet: IRpcWallet, proxyAddress: string, campaignId: number) => Promise<string>;
export { getProxyCampaign, getCommissionRate };
