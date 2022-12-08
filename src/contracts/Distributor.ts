import {IWallet, Contract as _Contract, Transaction, TransactionReceipt, BigNumber, Event, IBatchRequestObj, TransactionOptions} from "@ijstech/eth-contract";
import Bin from "./Distributor.json";
export interface IAddCommissionsParams {token:string;commissions:{to:string,amount:number|BigNumber}[]}
export interface IDistributionsParams {param1:string;param2:string}
export class Distributor extends _Contract{
    static _abi: any = Bin.abi;
    constructor(wallet: IWallet, address?: string){
        super(wallet, address, Bin.abi, Bin.bytecode);
        this.assign()
    }
    deploy(options?: number|BigNumber|TransactionOptions): Promise<string>{
        return this.__deploy([], options);
    }
    parseAddCommissionEvent(receipt: TransactionReceipt): Distributor.AddCommissionEvent[]{
        return this.parseEvents(receipt, "AddCommission").map(e=>this.decodeAddCommissionEvent(e));
    }
    decodeAddCommissionEvent(event: Event): Distributor.AddCommissionEvent{
        let result = event.data;
        return {
            to: result.to,
            token: result.token,
            amount: new BigNumber(result.amount),
            _event: event
        };
    }
    parseClaimEvent(receipt: TransactionReceipt): Distributor.ClaimEvent[]{
        return this.parseEvents(receipt, "Claim").map(e=>this.decodeClaimEvent(e));
    }
    decodeClaimEvent(event: Event): Distributor.ClaimEvent{
        let result = event.data;
        return {
            from: result.from,
            token: result.token,
            amount: new BigNumber(result.amount),
            _event: event
        };
    }
    addCommissions: {
        (params: IAddCommissionsParams, options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IAddCommissionsParams, options?: number|BigNumber|TransactionOptions) => Promise<void>;
        txData: (params: IAddCommissionsParams, options?: number|BigNumber|TransactionOptions) => Promise<string>;
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
    distributions: {
        (params: IDistributionsParams, options?: TransactionOptions): Promise<BigNumber>;
    }
    lastBalance: {
        (param1:string, options?: TransactionOptions): Promise<BigNumber>;
    }
    private assign(){
        let distributionsParams = (params: IDistributionsParams) => [params.param1,params.param2];
        let distributions_call = async (params: IDistributionsParams, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('distributions',distributionsParams(params),options);
            return new BigNumber(result);
        }
        this.distributions = distributions_call
        let lastBalance_call = async (param1:string, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('lastBalance',[param1],options);
            return new BigNumber(result);
        }
        this.lastBalance = lastBalance_call
        let addCommissionsParams = (params: IAddCommissionsParams) => [params.token,params.commissions.map(e=>([e.to,this.wallet.utils.toString(e.amount)]))];
        let addCommissions_send = async (params: IAddCommissionsParams, options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('addCommissions',addCommissionsParams(params),options);
            return result;
        }
        let addCommissions_call = async (params: IAddCommissionsParams, options?: number|BigNumber|TransactionOptions): Promise<void> => {
            let result = await this.call('addCommissions',addCommissionsParams(params),options);
            return;
        }
        let addCommissions_txData = async (params: IAddCommissionsParams, options?: number|BigNumber|TransactionOptions): Promise<string> => {
            let result = await this.txData('addCommissions',addCommissionsParams(params),options);
            return result;
        }
        this.addCommissions = Object.assign(addCommissions_send, {
            call:addCommissions_call
            , txData:addCommissions_txData
        });
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
    }
}
export module Distributor{
    export interface AddCommissionEvent {to:string,token:string,amount:BigNumber,_event:Event}
    export interface ClaimEvent {from:string,token:string,amount:BigNumber,_event:Event}
}