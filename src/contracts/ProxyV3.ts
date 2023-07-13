import {IWallet, Contract as _Contract, Transaction, TransactionReceipt, BigNumber, Event, IBatchRequestObj, TransactionOptions} from "@ijstech/eth-contract";
import Bin from "./ProxyV3.json";
export interface ICampaignAccumulatedCommissionParams {param1:number|BigNumber;param2:string}
export interface IClaimantIdsParams {param1:string;param2:string}
export interface IGetCampaignParams {campaignId:number|BigNumber;returnArrays:boolean}
export interface IGetCampaignArrayData1Params {campaignId:number|BigNumber;targetAndSelectorsStart:number|BigNumber;targetAndSelectorsLength:number|BigNumber;referrersStart:number|BigNumber;referrersLength:number|BigNumber}
export interface IGetCampaignArrayData2Params {campaignId:number|BigNumber;inTokensStart:number|BigNumber;inTokensLength:number|BigNumber;outTokensStart:number|BigNumber;outTokensLength:number|BigNumber}
export interface IGetClaimantBalanceParams {claimant:string;token:string}
export interface IGetClaimantsInfoParams {fromId:number|BigNumber;count:number|BigNumber}
export interface IProjectBalanceParams {param1:number|BigNumber;param2:string}
export interface IProxyCallParams {referrer:string;campaignId:number|BigNumber;target:string;tokensIn:{token:string,amount:number|BigNumber}[];to:string;tokensOut:string[];data:string}
export interface IStakeParams {projectId:number|BigNumber;token:string;amount:number|BigNumber}
export interface IStakeMultipleParams {projectId:number|BigNumber;token:string[];amount:(number|BigNumber)[]}
export interface IStakesBalanceParams {param1:number|BigNumber;param2:string}
export class ProxyV3 extends _Contract{
    static _abi: any = Bin.abi;
    constructor(wallet: IWallet, address?: string){
        super(wallet, address, Bin.abi, Bin.bytecode);
        this.assign()
    }
    deploy(options?: TransactionOptions): Promise<string>{
        return this.__deploy([], options);
    }
    parseAddCommissionEvent(receipt: TransactionReceipt): ProxyV3.AddCommissionEvent[]{
        return this.parseEvents(receipt, "AddCommission").map(e=>this.decodeAddCommissionEvent(e));
    }
    decodeAddCommissionEvent(event: Event): ProxyV3.AddCommissionEvent{
        let result = event.data;
        return {
            to: result.to,
            token: result.token,
            amount: new BigNumber(result.amount),
            _event: event
        };
    }
    parseClaimEvent(receipt: TransactionReceipt): ProxyV3.ClaimEvent[]{
        return this.parseEvents(receipt, "Claim").map(e=>this.decodeClaimEvent(e));
    }
    decodeClaimEvent(event: Event): ProxyV3.ClaimEvent{
        let result = event.data;
        return {
            from: result.from,
            token: result.token,
            amount: new BigNumber(result.amount),
            _event: event
        };
    }
    parseNewCampaignEvent(receipt: TransactionReceipt): ProxyV3.NewCampaignEvent[]{
        return this.parseEvents(receipt, "NewCampaign").map(e=>this.decodeNewCampaignEvent(e));
    }
    decodeNewCampaignEvent(event: Event): ProxyV3.NewCampaignEvent{
        let result = event.data;
        return {
            campaignId: new BigNumber(result.campaignId),
            _event: event
        };
    }
    parseNewProjectEvent(receipt: TransactionReceipt): ProxyV3.NewProjectEvent[]{
        return this.parseEvents(receipt, "NewProject").map(e=>this.decodeNewProjectEvent(e));
    }
    decodeNewProjectEvent(event: Event): ProxyV3.NewProjectEvent{
        let result = event.data;
        return {
            projectId: new BigNumber(result.projectId),
            _event: event
        };
    }
    parseSkimEvent(receipt: TransactionReceipt): ProxyV3.SkimEvent[]{
        return this.parseEvents(receipt, "Skim").map(e=>this.decodeSkimEvent(e));
    }
    decodeSkimEvent(event: Event): ProxyV3.SkimEvent{
        let result = event.data;
        return {
            token: result.token,
            to: result.to,
            amount: new BigNumber(result.amount),
            _event: event
        };
    }
    parseTransferBackEvent(receipt: TransactionReceipt): ProxyV3.TransferBackEvent[]{
        return this.parseEvents(receipt, "TransferBack").map(e=>this.decodeTransferBackEvent(e));
    }
    decodeTransferBackEvent(event: Event): ProxyV3.TransferBackEvent{
        let result = event.data;
        return {
            target: result.target,
            token: result.token,
            sender: result.sender,
            amount: new BigNumber(result.amount),
            _event: event
        };
    }
    parseTransferForwardEvent(receipt: TransactionReceipt): ProxyV3.TransferForwardEvent[]{
        return this.parseEvents(receipt, "TransferForward").map(e=>this.decodeTransferForwardEvent(e));
    }
    decodeTransferForwardEvent(event: Event): ProxyV3.TransferForwardEvent{
        let result = event.data;
        return {
            target: result.target,
            token: result.token,
            sender: result.sender,
            amount: new BigNumber(result.amount),
            _event: event
        };
    }
    campaignAccumulatedCommission: {
        (params: ICampaignAccumulatedCommissionParams, options?: TransactionOptions): Promise<BigNumber>;
    }
    claim: {
        (token:string, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (token:string, options?: TransactionOptions) => Promise<void>;
        txData: (token:string, options?: TransactionOptions) => Promise<string>;
    }
    claimMultiple: {
        (tokens:string[], options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (tokens:string[], options?: TransactionOptions) => Promise<void>;
        txData: (tokens:string[], options?: TransactionOptions) => Promise<string>;
    }
    claimantIdCount: {
        (options?: TransactionOptions): Promise<BigNumber>;
    }
    claimantIds: {
        (params: IClaimantIdsParams, options?: TransactionOptions): Promise<BigNumber>;
    }
    claimantsInfo: {
        (param1:number|BigNumber, options?: TransactionOptions): Promise<{claimant:string,token:string,balance:BigNumber}>;
    }
    getCampaign: {
        (params: IGetCampaignParams, options?: TransactionOptions): Promise<{projectId:BigNumber,maxInputTokensInEachCall:BigNumber,maxOutputTokensInEachCall:BigNumber,referrersRequireApproval:boolean,startDate:BigNumber,endDate:BigNumber,targetAndSelectors:string[],inTokens:string[],commissionInTokenConfig:{directTransfer:boolean,rate:BigNumber,capPerTransaction:BigNumber,capPerCampaign:BigNumber}[],outTokens:string[],commissionOutTokenConfig:{rate:BigNumber,capPerTransaction:BigNumber,capPerCampaign:BigNumber}[],referrers:string[]}>;
    }
    getCampaignArrayData1: {
        (params: IGetCampaignArrayData1Params, options?: TransactionOptions): Promise<{targetAndSelectors:string[],referrers:string[]}>;
    }
    getCampaignArrayData2: {
        (params: IGetCampaignArrayData2Params, options?: TransactionOptions): Promise<{inTokens:string[],commissionInTokenConfig:{directTransfer:boolean,rate:BigNumber,capPerTransaction:BigNumber,capPerCampaign:BigNumber}[],outTokens:string[],commissionOutTokenConfig:{rate:BigNumber,capPerTransaction:BigNumber,capPerCampaign:BigNumber}[]}>;
    }
    getCampaignArrayLength: {
        (campaignId:number|BigNumber, options?: TransactionOptions): Promise<{targetAndSelectorsLength:BigNumber,inTokensLength:BigNumber,outTokensLength:BigNumber,referrersLength:BigNumber}>;
    }
    getClaimantBalance: {
        (params: IGetClaimantBalanceParams, options?: TransactionOptions): Promise<BigNumber>;
    }
    getClaimantsInfo: {
        (params: IGetClaimantsInfoParams, options?: TransactionOptions): Promise<{claimant:string,token:string,balance:BigNumber}[]>;
    }
    lastBalance: {
        (param1:string, options?: TransactionOptions): Promise<BigNumber>;
    }
    newCampaign: {
        (params:{projectId:number|BigNumber,maxInputTokensInEachCall:number|BigNumber,maxOutputTokensInEachCall:number|BigNumber,referrersRequireApproval:boolean,startDate:number|BigNumber,endDate:number|BigNumber,targetAndSelectors:string[],inTokens:string[],commissionInTokenConfig:{directTransfer:boolean,rate:number|BigNumber,capPerTransaction:number|BigNumber,capPerCampaign:number|BigNumber}[],outTokens:string[],commissionOutTokenConfig:{rate:number|BigNumber,capPerTransaction:number|BigNumber,capPerCampaign:number|BigNumber}[],referrers:string[]}, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params:{projectId:number|BigNumber,maxInputTokensInEachCall:number|BigNumber,maxOutputTokensInEachCall:number|BigNumber,referrersRequireApproval:boolean,startDate:number|BigNumber,endDate:number|BigNumber,targetAndSelectors:string[],inTokens:string[],commissionInTokenConfig:{directTransfer:boolean,rate:number|BigNumber,capPerTransaction:number|BigNumber,capPerCampaign:number|BigNumber}[],outTokens:string[],commissionOutTokenConfig:{rate:number|BigNumber,capPerTransaction:number|BigNumber,capPerCampaign:number|BigNumber}[],referrers:string[]}, options?: TransactionOptions) => Promise<BigNumber>;
        txData: (params:{projectId:number|BigNumber,maxInputTokensInEachCall:number|BigNumber,maxOutputTokensInEachCall:number|BigNumber,referrersRequireApproval:boolean,startDate:number|BigNumber,endDate:number|BigNumber,targetAndSelectors:string[],inTokens:string[],commissionInTokenConfig:{directTransfer:boolean,rate:number|BigNumber,capPerTransaction:number|BigNumber,capPerCampaign:number|BigNumber}[],outTokens:string[],commissionOutTokenConfig:{rate:number|BigNumber,capPerTransaction:number|BigNumber,capPerCampaign:number|BigNumber}[],referrers:string[]}, options?: TransactionOptions) => Promise<string>;
    }
    newProject: {
        (admins:string[], options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (admins:string[], options?: TransactionOptions) => Promise<BigNumber>;
        txData: (admins:string[], options?: TransactionOptions) => Promise<string>;
    }
    projectBalance: {
        (params: IProjectBalanceParams, options?: TransactionOptions): Promise<BigNumber>;
    }
    proxyCall: {
        (params: IProxyCallParams, options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IProxyCallParams, options?: number|BigNumber|TransactionOptions) => Promise<void>;
        txData: (params: IProxyCallParams, options?: number|BigNumber|TransactionOptions) => Promise<string>;
    }
    skim: {
        (tokens:string[], options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (tokens:string[], options?: TransactionOptions) => Promise<void>;
        txData: (tokens:string[], options?: TransactionOptions) => Promise<string>;
    }
    stake: {
        (params: IStakeParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IStakeParams, options?: TransactionOptions) => Promise<void>;
        txData: (params: IStakeParams, options?: TransactionOptions) => Promise<string>;
    }
    stakeETH: {
        (projectId:number|BigNumber, options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt>;
        call: (projectId:number|BigNumber, options?: number|BigNumber|TransactionOptions) => Promise<void>;
        txData: (projectId:number|BigNumber, options?: number|BigNumber|TransactionOptions) => Promise<string>;
    }
    stakeMultiple: {
        (params: IStakeMultipleParams, options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IStakeMultipleParams, options?: number|BigNumber|TransactionOptions) => Promise<void>;
        txData: (params: IStakeMultipleParams, options?: number|BigNumber|TransactionOptions) => Promise<string>;
    }
    stakesBalance: {
        (params: IStakesBalanceParams, options?: TransactionOptions): Promise<BigNumber>;
    }
    private assign(){
        let campaignAccumulatedCommissionParams = (params: ICampaignAccumulatedCommissionParams) => [this.wallet.utils.toString(params.param1),params.param2];
        let campaignAccumulatedCommission_call = async (params: ICampaignAccumulatedCommissionParams, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('campaignAccumulatedCommission',campaignAccumulatedCommissionParams(params),options);
            return new BigNumber(result);
        }
        this.campaignAccumulatedCommission = campaignAccumulatedCommission_call
        let claimantIdCount_call = async (options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('claimantIdCount',[],options);
            return new BigNumber(result);
        }
        this.claimantIdCount = claimantIdCount_call
        let claimantIdsParams = (params: IClaimantIdsParams) => [params.param1,params.param2];
        let claimantIds_call = async (params: IClaimantIdsParams, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('claimantIds',claimantIdsParams(params),options);
            return new BigNumber(result);
        }
        this.claimantIds = claimantIds_call
        let claimantsInfo_call = async (param1:number|BigNumber, options?: TransactionOptions): Promise<{claimant:string,token:string,balance:BigNumber}> => {
            let result = await this.call('claimantsInfo',[this.wallet.utils.toString(param1)],options);
            return {
                claimant: result.claimant,
                token: result.token,
                balance: new BigNumber(result.balance)
            };
        }
        this.claimantsInfo = claimantsInfo_call
        let getCampaignParams = (params: IGetCampaignParams) => [this.wallet.utils.toString(params.campaignId),params.returnArrays];
        let getCampaign_call = async (params: IGetCampaignParams, options?: TransactionOptions): Promise<{projectId:BigNumber,maxInputTokensInEachCall:BigNumber,maxOutputTokensInEachCall:BigNumber,referrersRequireApproval:boolean,startDate:BigNumber,endDate:BigNumber,targetAndSelectors:string[],inTokens:string[],commissionInTokenConfig:{directTransfer:boolean,rate:BigNumber,capPerTransaction:BigNumber,capPerCampaign:BigNumber}[],outTokens:string[],commissionOutTokenConfig:{rate:BigNumber,capPerTransaction:BigNumber,capPerCampaign:BigNumber}[],referrers:string[]}> => {
            let result = await this.call('getCampaign',getCampaignParams(params),options);
            return (
            {
                projectId: new BigNumber(result.projectId),
                maxInputTokensInEachCall: new BigNumber(result.maxInputTokensInEachCall),
                maxOutputTokensInEachCall: new BigNumber(result.maxOutputTokensInEachCall),
                referrersRequireApproval: result.referrersRequireApproval,
                startDate: new BigNumber(result.startDate),
                endDate: new BigNumber(result.endDate),
                targetAndSelectors: result.targetAndSelectors,
                inTokens: result.inTokens,
                commissionInTokenConfig: result.commissionInTokenConfig.map(e=>(
                    {
                        directTransfer: e.directTransfer,
                        rate: new BigNumber(e.rate),
                        capPerTransaction: new BigNumber(e.capPerTransaction),
                        capPerCampaign: new BigNumber(e.capPerCampaign)
                    }
                )),
                outTokens: result.outTokens,
                commissionOutTokenConfig: result.commissionOutTokenConfig.map(e=>(
                    {
                        rate: new BigNumber(e.rate),
                        capPerTransaction: new BigNumber(e.capPerTransaction),
                        capPerCampaign: new BigNumber(e.capPerCampaign)
                    }
                )),
                referrers: result.referrers
            }
            );
        }
        this.getCampaign = getCampaign_call
        let getCampaignArrayData1Params = (params: IGetCampaignArrayData1Params) => [this.wallet.utils.toString(params.campaignId),this.wallet.utils.toString(params.targetAndSelectorsStart),this.wallet.utils.toString(params.targetAndSelectorsLength),this.wallet.utils.toString(params.referrersStart),this.wallet.utils.toString(params.referrersLength)];
        let getCampaignArrayData1_call = async (params: IGetCampaignArrayData1Params, options?: TransactionOptions): Promise<{targetAndSelectors:string[],referrers:string[]}> => {
            let result = await this.call('getCampaignArrayData1',getCampaignArrayData1Params(params),options);
            return {
                targetAndSelectors: result.targetAndSelectors,
                referrers: result.referrers
            };
        }
        this.getCampaignArrayData1 = getCampaignArrayData1_call
        let getCampaignArrayData2Params = (params: IGetCampaignArrayData2Params) => [this.wallet.utils.toString(params.campaignId),this.wallet.utils.toString(params.inTokensStart),this.wallet.utils.toString(params.inTokensLength),this.wallet.utils.toString(params.outTokensStart),this.wallet.utils.toString(params.outTokensLength)];
        let getCampaignArrayData2_call = async (params: IGetCampaignArrayData2Params, options?: TransactionOptions): Promise<{inTokens:string[],commissionInTokenConfig:{directTransfer:boolean,rate:BigNumber,capPerTransaction:BigNumber,capPerCampaign:BigNumber}[],outTokens:string[],commissionOutTokenConfig:{rate:BigNumber,capPerTransaction:BigNumber,capPerCampaign:BigNumber}[]}> => {
            let result = await this.call('getCampaignArrayData2',getCampaignArrayData2Params(params),options);
            return {
                inTokens: result.inTokens,
                commissionInTokenConfig: result.commissionInTokenConfig.map(e=>(
                    {
                        directTransfer: e.directTransfer,
                        rate: new BigNumber(e.rate),
                        capPerTransaction: new BigNumber(e.capPerTransaction),
                        capPerCampaign: new BigNumber(e.capPerCampaign)
                    }
                )),
                outTokens: result.outTokens,
                commissionOutTokenConfig: result.commissionOutTokenConfig.map(e=>(
                    {
                        rate: new BigNumber(e.rate),
                        capPerTransaction: new BigNumber(e.capPerTransaction),
                        capPerCampaign: new BigNumber(e.capPerCampaign)
                    }
                ))
            };
        }
        this.getCampaignArrayData2 = getCampaignArrayData2_call
        let getCampaignArrayLength_call = async (campaignId:number|BigNumber, options?: TransactionOptions): Promise<{targetAndSelectorsLength:BigNumber,inTokensLength:BigNumber,outTokensLength:BigNumber,referrersLength:BigNumber}> => {
            let result = await this.call('getCampaignArrayLength',[this.wallet.utils.toString(campaignId)],options);
            return {
                targetAndSelectorsLength: new BigNumber(result.targetAndSelectorsLength),
                inTokensLength: new BigNumber(result.inTokensLength),
                outTokensLength: new BigNumber(result.outTokensLength),
                referrersLength: new BigNumber(result.referrersLength)
            };
        }
        this.getCampaignArrayLength = getCampaignArrayLength_call
        let getClaimantBalanceParams = (params: IGetClaimantBalanceParams) => [params.claimant,params.token];
        let getClaimantBalance_call = async (params: IGetClaimantBalanceParams, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('getClaimantBalance',getClaimantBalanceParams(params),options);
            return new BigNumber(result);
        }
        this.getClaimantBalance = getClaimantBalance_call
        let getClaimantsInfoParams = (params: IGetClaimantsInfoParams) => [this.wallet.utils.toString(params.fromId),this.wallet.utils.toString(params.count)];
        let getClaimantsInfo_call = async (params: IGetClaimantsInfoParams, options?: TransactionOptions): Promise<{claimant:string,token:string,balance:BigNumber}[]> => {
            let result = await this.call('getClaimantsInfo',getClaimantsInfoParams(params),options);
            return (result.map(e=>(
                {
                    claimant: e.claimant,
                    token: e.token,
                    balance: new BigNumber(e.balance)
                }
            )));
        }
        this.getClaimantsInfo = getClaimantsInfo_call
        let lastBalance_call = async (param1:string, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('lastBalance',[param1],options);
            return new BigNumber(result);
        }
        this.lastBalance = lastBalance_call
        let projectBalanceParams = (params: IProjectBalanceParams) => [this.wallet.utils.toString(params.param1),params.param2];
        let projectBalance_call = async (params: IProjectBalanceParams, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('projectBalance',projectBalanceParams(params),options);
            return new BigNumber(result);
        }
        this.projectBalance = projectBalance_call
        let stakesBalanceParams = (params: IStakesBalanceParams) => [this.wallet.utils.toString(params.param1),params.param2];
        let stakesBalance_call = async (params: IStakesBalanceParams, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('stakesBalance',stakesBalanceParams(params),options);
            return new BigNumber(result);
        }
        this.stakesBalance = stakesBalance_call
        let claim_send = async (token:string, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('claim',[token],options);
            return result;
        }
        let claim_call = async (token:string, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('claim',[token],options);
            return;
        }
        let claim_txData = async (token:string, options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('claim',[token],options);
            return result;
        }
        this.claim = Object.assign(claim_send, {
            call:claim_call
            , txData:claim_txData
        });
        let claimMultiple_send = async (tokens:string[], options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('claimMultiple',[tokens],options);
            return result;
        }
        let claimMultiple_call = async (tokens:string[], options?: TransactionOptions): Promise<void> => {
            let result = await this.call('claimMultiple',[tokens],options);
            return;
        }
        let claimMultiple_txData = async (tokens:string[], options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('claimMultiple',[tokens],options);
            return result;
        }
        this.claimMultiple = Object.assign(claimMultiple_send, {
            call:claimMultiple_call
            , txData:claimMultiple_txData
        });
        let newCampaign_send = async (params:{projectId:number|BigNumber,maxInputTokensInEachCall:number|BigNumber,maxOutputTokensInEachCall:number|BigNumber,referrersRequireApproval:boolean,startDate:number|BigNumber,endDate:number|BigNumber,targetAndSelectors:string[],inTokens:string[],commissionInTokenConfig:{directTransfer:boolean,rate:number|BigNumber,capPerTransaction:number|BigNumber,capPerCampaign:number|BigNumber}[],outTokens:string[],commissionOutTokenConfig:{rate:number|BigNumber,capPerTransaction:number|BigNumber,capPerCampaign:number|BigNumber}[],referrers:string[]}, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('newCampaign',[[this.wallet.utils.toString(params.projectId),this.wallet.utils.toString(params.maxInputTokensInEachCall),this.wallet.utils.toString(params.maxOutputTokensInEachCall),params.referrersRequireApproval,this.wallet.utils.toString(params.startDate),this.wallet.utils.toString(params.endDate),params.targetAndSelectors,params.inTokens,params.commissionInTokenConfig.map(e=>([e.directTransfer,this.wallet.utils.toString(e.rate),this.wallet.utils.toString(e.capPerTransaction),this.wallet.utils.toString(e.capPerCampaign)])),params.outTokens,params.commissionOutTokenConfig.map(e=>([this.wallet.utils.toString(e.rate),this.wallet.utils.toString(e.capPerTransaction),this.wallet.utils.toString(e.capPerCampaign)])),params.referrers]],options);
            return result;
        }
        let newCampaign_call = async (params:{projectId:number|BigNumber,maxInputTokensInEachCall:number|BigNumber,maxOutputTokensInEachCall:number|BigNumber,referrersRequireApproval:boolean,startDate:number|BigNumber,endDate:number|BigNumber,targetAndSelectors:string[],inTokens:string[],commissionInTokenConfig:{directTransfer:boolean,rate:number|BigNumber,capPerTransaction:number|BigNumber,capPerCampaign:number|BigNumber}[],outTokens:string[],commissionOutTokenConfig:{rate:number|BigNumber,capPerTransaction:number|BigNumber,capPerCampaign:number|BigNumber}[],referrers:string[]}, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('newCampaign',[[this.wallet.utils.toString(params.projectId),this.wallet.utils.toString(params.maxInputTokensInEachCall),this.wallet.utils.toString(params.maxOutputTokensInEachCall),params.referrersRequireApproval,this.wallet.utils.toString(params.startDate),this.wallet.utils.toString(params.endDate),params.targetAndSelectors,params.inTokens,params.commissionInTokenConfig.map(e=>([e.directTransfer,this.wallet.utils.toString(e.rate),this.wallet.utils.toString(e.capPerTransaction),this.wallet.utils.toString(e.capPerCampaign)])),params.outTokens,params.commissionOutTokenConfig.map(e=>([this.wallet.utils.toString(e.rate),this.wallet.utils.toString(e.capPerTransaction),this.wallet.utils.toString(e.capPerCampaign)])),params.referrers]],options);
            return new BigNumber(result);
        }
        let newCampaign_txData = async (params:{projectId:number|BigNumber,maxInputTokensInEachCall:number|BigNumber,maxOutputTokensInEachCall:number|BigNumber,referrersRequireApproval:boolean,startDate:number|BigNumber,endDate:number|BigNumber,targetAndSelectors:string[],inTokens:string[],commissionInTokenConfig:{directTransfer:boolean,rate:number|BigNumber,capPerTransaction:number|BigNumber,capPerCampaign:number|BigNumber}[],outTokens:string[],commissionOutTokenConfig:{rate:number|BigNumber,capPerTransaction:number|BigNumber,capPerCampaign:number|BigNumber}[],referrers:string[]}, options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('newCampaign',[[this.wallet.utils.toString(params.projectId),this.wallet.utils.toString(params.maxInputTokensInEachCall),this.wallet.utils.toString(params.maxOutputTokensInEachCall),params.referrersRequireApproval,this.wallet.utils.toString(params.startDate),this.wallet.utils.toString(params.endDate),params.targetAndSelectors,params.inTokens,params.commissionInTokenConfig.map(e=>([e.directTransfer,this.wallet.utils.toString(e.rate),this.wallet.utils.toString(e.capPerTransaction),this.wallet.utils.toString(e.capPerCampaign)])),params.outTokens,params.commissionOutTokenConfig.map(e=>([this.wallet.utils.toString(e.rate),this.wallet.utils.toString(e.capPerTransaction),this.wallet.utils.toString(e.capPerCampaign)])),params.referrers]],options);
            return result;
        }
        this.newCampaign = Object.assign(newCampaign_send, {
            call:newCampaign_call
            , txData:newCampaign_txData
        });
        let newProject_send = async (admins:string[], options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('newProject',[admins],options);
            return result;
        }
        let newProject_call = async (admins:string[], options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('newProject',[admins],options);
            return new BigNumber(result);
        }
        let newProject_txData = async (admins:string[], options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('newProject',[admins],options);
            return result;
        }
        this.newProject = Object.assign(newProject_send, {
            call:newProject_call
            , txData:newProject_txData
        });
        let proxyCallParams = (params: IProxyCallParams) => [params.referrer,this.wallet.utils.toString(params.campaignId),params.target,params.tokensIn.map(e=>([e.token,this.wallet.utils.toString(e.amount)])),params.to,params.tokensOut,this.wallet.utils.stringToBytes(params.data)];
        let proxyCall_send = async (params: IProxyCallParams, options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('proxyCall',proxyCallParams(params),options);
            return result;
        }
        let proxyCall_call = async (params: IProxyCallParams, options?: number|BigNumber|TransactionOptions): Promise<void> => {
            let result = await this.call('proxyCall',proxyCallParams(params),options);
            return;
        }
        let proxyCall_txData = async (params: IProxyCallParams, options?: number|BigNumber|TransactionOptions): Promise<string> => {
            let result = await this.txData('proxyCall',proxyCallParams(params),options);
            return result;
        }
        this.proxyCall = Object.assign(proxyCall_send, {
            call:proxyCall_call
            , txData:proxyCall_txData
        });
        let skim_send = async (tokens:string[], options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('skim',[tokens],options);
            return result;
        }
        let skim_call = async (tokens:string[], options?: TransactionOptions): Promise<void> => {
            let result = await this.call('skim',[tokens],options);
            return;
        }
        let skim_txData = async (tokens:string[], options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('skim',[tokens],options);
            return result;
        }
        this.skim = Object.assign(skim_send, {
            call:skim_call
            , txData:skim_txData
        });
        let stakeParams = (params: IStakeParams) => [this.wallet.utils.toString(params.projectId),params.token,this.wallet.utils.toString(params.amount)];
        let stake_send = async (params: IStakeParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('stake',stakeParams(params),options);
            return result;
        }
        let stake_call = async (params: IStakeParams, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('stake',stakeParams(params),options);
            return;
        }
        let stake_txData = async (params: IStakeParams, options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('stake',stakeParams(params),options);
            return result;
        }
        this.stake = Object.assign(stake_send, {
            call:stake_call
            , txData:stake_txData
        });
        let stakeETH_send = async (projectId:number|BigNumber, options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('stakeETH',[this.wallet.utils.toString(projectId)],options);
            return result;
        }
        let stakeETH_call = async (projectId:number|BigNumber, options?: number|BigNumber|TransactionOptions): Promise<void> => {
            let result = await this.call('stakeETH',[this.wallet.utils.toString(projectId)],options);
            return;
        }
        let stakeETH_txData = async (projectId:number|BigNumber, options?: number|BigNumber|TransactionOptions): Promise<string> => {
            let result = await this.txData('stakeETH',[this.wallet.utils.toString(projectId)],options);
            return result;
        }
        this.stakeETH = Object.assign(stakeETH_send, {
            call:stakeETH_call
            , txData:stakeETH_txData
        });
        let stakeMultipleParams = (params: IStakeMultipleParams) => [this.wallet.utils.toString(params.projectId),params.token,this.wallet.utils.toString(params.amount)];
        let stakeMultiple_send = async (params: IStakeMultipleParams, options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('stakeMultiple',stakeMultipleParams(params),options);
            return result;
        }
        let stakeMultiple_call = async (params: IStakeMultipleParams, options?: number|BigNumber|TransactionOptions): Promise<void> => {
            let result = await this.call('stakeMultiple',stakeMultipleParams(params),options);
            return;
        }
        let stakeMultiple_txData = async (params: IStakeMultipleParams, options?: number|BigNumber|TransactionOptions): Promise<string> => {
            let result = await this.txData('stakeMultiple',stakeMultipleParams(params),options);
            return result;
        }
        this.stakeMultiple = Object.assign(stakeMultiple_send, {
            call:stakeMultiple_call
            , txData:stakeMultiple_txData
        });
    }
}
export module ProxyV3{
    export interface AddCommissionEvent {to:string,token:string,amount:BigNumber,_event:Event}
    export interface ClaimEvent {from:string,token:string,amount:BigNumber,_event:Event}
    export interface NewCampaignEvent {campaignId:BigNumber,_event:Event}
    export interface NewProjectEvent {projectId:BigNumber,_event:Event}
    export interface SkimEvent {token:string,to:string,amount:BigNumber,_event:Event}
    export interface TransferBackEvent {target:string,token:string,sender:string,amount:BigNumber,_event:Event}
    export interface TransferForwardEvent {target:string,token:string,sender:string,amount:BigNumber,_event:Event}
}