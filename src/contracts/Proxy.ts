import {IWallet, Contract as _Contract, Transaction, TransactionReceipt, BigNumber, Event, IBatchRequestObj, TransactionOptions} from "@ijstech/eth-contract";
import Bin from "./Proxy.json";

export interface IEthInParams {target:string;commissions:{to:string,amount:number|BigNumber}[];data:string}
export interface IProxyCallParams {target:string;tokensIn:{token:string,amount:number|BigNumber,directTransfer:boolean,commissions:{to:string,amount:number|BigNumber}[]}[];to:string;tokensOut:string[];data:string}
export interface ITokenInParams {target:string;tokensIn:{token:string,amount:number|BigNumber,directTransfer:boolean,commissions:{to:string,amount:number|BigNumber}[]};data:string}
export class Proxy extends _Contract{
    constructor(wallet: IWallet, address?: string){
        super(wallet, address, Bin.abi, Bin.bytecode);
        this.assign()
    }
    deploy(distributor:string, options?: TransactionOptions): Promise<string>{
        return this.__deploy([distributor], options);
    }
    parseSkimEvent(receipt: TransactionReceipt): Proxy.SkimEvent[]{
        return this.parseEvents(receipt, "Skim").map(e=>this.decodeSkimEvent(e));
    }
    decodeSkimEvent(event: Event): Proxy.SkimEvent{
        let result = event.data;
        return {
            token: result.token,
            to: result.to,
            amount: new BigNumber(result.amount),
            _event: event
        };
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
    ethIn: {
        (params: IEthInParams, options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IEthInParams, options?: number|BigNumber|TransactionOptions) => Promise<void>;
        txData: (params: IEthInParams, options?: number|BigNumber|TransactionOptions) => Promise<string>;
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
    tokenIn: {
        (params: ITokenInParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ITokenInParams, options?: TransactionOptions) => Promise<void>;
        txData: (params: ITokenInParams, options?: TransactionOptions) => Promise<string>;
    }
    private assign(){
        let ethInParams = (params: IEthInParams) => [params.target,params.commissions.map(e=>([e.to,this.wallet.utils.toString(e.amount)])),this.wallet.utils.stringToBytes(params.data)];
        let ethIn_send = async (params: IEthInParams, options?: number|BigNumber|TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('ethIn',ethInParams(params),options);
            return result;
        }
        let ethIn_call = async (params: IEthInParams, options?: number|BigNumber|TransactionOptions): Promise<void> => {
            let result = await this.call('ethIn',ethInParams(params),options);
            return;
        }
        let ethIn_txData = async (params: IEthInParams, options?: number|BigNumber|TransactionOptions): Promise<string> => {
            let result = await this.txData('ethIn',ethInParams(params),options);
            return result;
        }
        this.ethIn = Object.assign(ethIn_send, {
            call:ethIn_call
            , txData:ethIn_txData
        });
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
        let tokenInParams = (params: ITokenInParams) => [params.target,[params.tokensIn.token,this.wallet.utils.toString(params.tokensIn.amount),params.tokensIn.directTransfer,params.tokensIn.commissions.map(e=>([e.to,this.wallet.utils.toString(e.amount)]))],this.wallet.utils.stringToBytes(params.data)];
        let tokenIn_send = async (params: ITokenInParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('tokenIn',tokenInParams(params),options);
            return result;
        }
        let tokenIn_call = async (params: ITokenInParams, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('tokenIn',tokenInParams(params),options);
            return;
        }
        let tokenIn_txData = async (params: ITokenInParams, options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('tokenIn',tokenInParams(params),options);
            return result;
        }
        this.tokenIn = Object.assign(tokenIn_send, {
            call:tokenIn_call
            , txData:tokenIn_txData
        });
    }
}
export module Proxy{
    export interface SkimEvent {token:string,to:string,amount:BigNumber,_event:Event}
    export interface TransferBackEvent {target:string,token:string,sender:string,amount:BigNumber,_event:Event}
    export interface TransferForwardEvent {target:string,token:string,sender:string,amount:BigNumber,commissions:BigNumber,_event:Event}
}