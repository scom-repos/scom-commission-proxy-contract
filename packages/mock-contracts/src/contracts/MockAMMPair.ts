import {IWallet, Contract as _Contract, Transaction, TransactionReceipt, BigNumber, Event, IBatchRequestObj, TransactionOptions} from "@ijstech/eth-contract";
import Bin from "./MockAMMPair.json";
export interface IDeployParams {token0:string;token1:string}
export interface IAddLiquidityParams {amount0In:number|BigNumber;amount1In:number|BigNumber}
export interface ISwapParams {amount0Out:number|BigNumber;amount1Out:number|BigNumber;to:string;param4:string}
export class MockAMMPair extends _Contract{
    static _abi: any = Bin.abi;
    constructor(wallet: IWallet, address?: string){
        super(wallet, address, Bin.abi, Bin.bytecode);
        this.assign()
    }
    deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>{
        return this.__deploy([params.token0,params.token1], options);
    }
    parseMintEvent(receipt: TransactionReceipt): MockAMMPair.MintEvent[]{
        return this.parseEvents(receipt, "Mint").map(e=>this.decodeMintEvent(e));
    }
    decodeMintEvent(event: Event): MockAMMPair.MintEvent{
        let result = event.data;
        return {
            sender: result.sender,
            amount0: new BigNumber(result.amount0),
            amount1: new BigNumber(result.amount1),
            _event: event
        };
    }
    parseSwapEvent(receipt: TransactionReceipt): MockAMMPair.SwapEvent[]{
        return this.parseEvents(receipt, "Swap").map(e=>this.decodeSwapEvent(e));
    }
    decodeSwapEvent(event: Event): MockAMMPair.SwapEvent{
        let result = event.data;
        return {
            sender: result.sender,
            amount0In: new BigNumber(result.amount0In),
            amount1In: new BigNumber(result.amount1In),
            amount0Out: new BigNumber(result.amount0Out),
            amount1Out: new BigNumber(result.amount1Out),
            to: result.to,
            _event: event
        };
    }
    parseSyncEvent(receipt: TransactionReceipt): MockAMMPair.SyncEvent[]{
        return this.parseEvents(receipt, "Sync").map(e=>this.decodeSyncEvent(e));
    }
    decodeSyncEvent(event: Event): MockAMMPair.SyncEvent{
        let result = event.data;
        return {
            reserve0: new BigNumber(result.reserve0),
            reserve1: new BigNumber(result.reserve1),
            _event: event
        };
    }
    addLiquidity: {
        (params: IAddLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<void>;
    }
    blockTimestampLast: {
        (options?: TransactionOptions): Promise<BigNumber>;
    }
    getReserves: {
        (options?: TransactionOptions): Promise<{reserve0:BigNumber,reserve1:BigNumber,blockTimestampLast:BigNumber}>;
    }
    reserve0: {
        (options?: TransactionOptions): Promise<BigNumber>;
    }
    reserve1: {
        (options?: TransactionOptions): Promise<BigNumber>;
    }
    swap: {
        (params: ISwapParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISwapParams, options?: TransactionOptions) => Promise<void>;
    }
    sync: {
        (options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (options?: TransactionOptions) => Promise<void>;
    }
    token0: {
        (options?: TransactionOptions): Promise<string>;
    }
    token1: {
        (options?: TransactionOptions): Promise<string>;
    }
    private assign(){
        let blockTimestampLast_call = async (options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('blockTimestampLast',[],options);
            return new BigNumber(result);
        }
        this.blockTimestampLast = blockTimestampLast_call
        let getReserves_call = async (options?: TransactionOptions): Promise<{reserve0:BigNumber,reserve1:BigNumber,blockTimestampLast:BigNumber}> => {
            let result = await this.call('getReserves',[],options);
            return {
                reserve0: new BigNumber(result._reserve0),
                reserve1: new BigNumber(result._reserve1),
                blockTimestampLast: new BigNumber(result._blockTimestampLast)
            };
        }
        this.getReserves = getReserves_call
        let reserve0_call = async (options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('reserve0',[],options);
            return new BigNumber(result);
        }
        this.reserve0 = reserve0_call
        let reserve1_call = async (options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('reserve1',[],options);
            return new BigNumber(result);
        }
        this.reserve1 = reserve1_call
        let token0_call = async (options?: TransactionOptions): Promise<string> => {
            let result = await this.call('token0',[],options);
            return result;
        }
        this.token0 = token0_call
        let token1_call = async (options?: TransactionOptions): Promise<string> => {
            let result = await this.call('token1',[],options);
            return result;
        }
        this.token1 = token1_call
        let addLiquidityParams = (params: IAddLiquidityParams) => [this.wallet.utils.toString(params.amount0In),this.wallet.utils.toString(params.amount1In)];
        let addLiquidity_send = async (params: IAddLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('addLiquidity',addLiquidityParams(params),options);
            return result;
        }
        let addLiquidity_call = async (params: IAddLiquidityParams, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('addLiquidity',addLiquidityParams(params),options);
            return;
        }
        this.addLiquidity = Object.assign(addLiquidity_send, {
            call:addLiquidity_call
        });
        let swapParams = (params: ISwapParams) => [this.wallet.utils.toString(params.amount0Out),this.wallet.utils.toString(params.amount1Out),params.to,this.wallet.utils.stringToBytes(params.param4)];
        let swap_send = async (params: ISwapParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('swap',swapParams(params),options);
            return result;
        }
        let swap_call = async (params: ISwapParams, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('swap',swapParams(params),options);
            return;
        }
        this.swap = Object.assign(swap_send, {
            call:swap_call
        });
        let sync_send = async (options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('sync',[],options);
            return result;
        }
        let sync_call = async (options?: TransactionOptions): Promise<void> => {
            let result = await this.call('sync',[],options);
            return;
        }
        this.sync = Object.assign(sync_send, {
            call:sync_call
        });
    }
}
export module MockAMMPair{
    export interface MintEvent {sender:string,amount0:BigNumber,amount1:BigNumber,_event:Event}
    export interface SwapEvent {sender:string,amount0In:BigNumber,amount1In:BigNumber,amount0Out:BigNumber,amount1Out:BigNumber,to:string,_event:Event}
    export interface SyncEvent {reserve0:BigNumber,reserve1:BigNumber,_event:Event}
}