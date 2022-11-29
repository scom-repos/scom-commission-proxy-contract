import {IWallet, Contract as _Contract, Transaction, TransactionReceipt, BigNumber, Event, IBatchRequestObj, TransactionOptions} from "@ijstech/eth-contract";
import Bin from "./Proxy.json";

export interface IProxyCallParams {target:string;tokensIn:{token:string,amount:number|BigNumber,directTransfer:boolean,commissions:{to:string,amount:number|BigNumber}[]}[];to:string;tokensOut:string[];data:string}
export class Proxy extends _Contract{
    constructor(wallet: IWallet, address?: string){
        super(wallet, address, Bin.abi, Bin.bytecode);
        this.assign()
    }
    deploy(distributor:string, options?: TransactionOptions): Promise<string>{
        return this.__deploy([distributor], options);
    }
    parseTransferBackEvent(receipt: TransactionReceipt): Proxy.TransferBackEvent[]{
        return this.parseEvents(receipt, "TransferBack").map(e=>this.decodeTransferBackEvent(e));
    }
    decodeTransferBackEvent(event: Event): Proxy.TransferBackEvent{
        let result = event.data;
        return {
            target: result.target,
            token: result.token,
            sender: result.sender,
            amount: new BigNumber(result.amount),
            _event: event
        };
    }
    parseTransferForwardEvent(receipt: TransactionReceipt): Proxy.TransferForwardEvent[]{
        return this.parseEvents(receipt, "TransferForward").map(e=>this.decodeTransferForwardEvent(e));
    }
    decodeTransferForwardEvent(event: Event): Proxy.TransferForwardEvent{
        let result = event.data;
        return {
            target: result.target,
            token: result.token,
            sender: result.sender,
            amount: new BigNumber(result.amount),
            commissions: new BigNumber(result.commissions),
            _event: event
        };
    }
    proxyCall: {
        (params: IProxyCallParams, options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IProxyCallParams, options?: number|BigNumber|TransactionOptions) => Promise<void>;
        txData: (params: IProxyCallParams, options?: number|BigNumber|TransactionOptions) => Promise<string>;
    }
    private assign(){
        let proxyCallParams = (params: IProxyCallParams) => [params.target,params.tokensIn.map(e=>([e.token,this.wallet.utils.toString(e.amount),e.directTransfer,e.commissions.map(e=>([e.to,this.wallet.utils.toString(e.amount)]))])),params.to,params.tokensOut,this.wallet.utils.stringToBytes(params.data)];
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
    }
}
export module Proxy{
    export interface TransferBackEvent {target:string,token:string,sender:string,amount:BigNumber,_event:Event}
    export interface TransferForwardEvent {target:string,token:string,sender:string,amount:BigNumber,commissions:BigNumber,_event:Event}
}