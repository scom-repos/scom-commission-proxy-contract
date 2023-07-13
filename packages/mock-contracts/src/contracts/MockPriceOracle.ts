import {IWallet, Contract as _Contract, Transaction, TransactionReceipt, BigNumber, Event, IBatchRequestObj, TransactionOptions} from "@ijstech/eth-contract";
import Bin from "./MockPriceOracle.json";
export class MockPriceOracle extends _Contract{
    static _abi: any = Bin.abi;
    constructor(wallet: IWallet, address?: string){
        super(wallet, address, Bin.abi, Bin.bytecode);
        this.assign()
    }
    deploy(options?: TransactionOptions): Promise<string>{
        return this.__deploy([], options);
    }
    latestAnswer: {
        (options?: TransactionOptions): Promise<BigNumber>;
    }
    setPrice: {
        (price:number|BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (price:number|BigNumber, options?: TransactionOptions) => Promise<void>;
    }
    private assign(){
        let latestAnswer_call = async (options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('latestAnswer',[],options);
            return new BigNumber(result);
        }
        this.latestAnswer = latestAnswer_call
        let setPrice_send = async (price:number|BigNumber, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('setPrice',[this.wallet.utils.toString(price)],options);
            return result;
        }
        let setPrice_call = async (price:number|BigNumber, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('setPrice',[this.wallet.utils.toString(price)],options);
            return;
        }
        this.setPrice = Object.assign(setPrice_send, {
            call:setPrice_call
        });
    }
}