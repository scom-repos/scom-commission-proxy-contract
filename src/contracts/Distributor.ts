import {IWallet, Contract as _Contract, Transaction, TransactionReceipt, BigNumber, Event, IBatchRequestObj, TransactionOptions} from "@ijstech/eth-contract";
import Bin from "./Distributor.json";

export interface IAddCommissionsParams {token:string;commissions:{to:string,amount:number|BigNumber}[]}
export interface IDistributionsParams {param1:string;param2:string}
export class Distributor extends _Contract{
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
    addCommissions: {
        (params: IAddCommissionsParams, options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IAddCommissionsParams, options?: number|BigNumber|TransactionOptions) => Promise<void>;
        txData: (params: IAddCommissionsParams, options?: number|BigNumber|TransactionOptions) => Promise<string>;
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
    }
}
export module Distributor{
    export interface AddCommissionEvent {to:string,token:string,amount:BigNumber,_event:Event}
}