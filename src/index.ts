import * as Contracts from './contracts/index';
export {Contracts};
import {IWallet, BigNumber, Utils} from '@ijstech/eth-wallet';
import * as ContractUtils from './utils';
export {ContractUtils};

export interface IDeployOptions {
    version?: string;
    protocolRate?: string;
};
export interface IDeployResult {
    proxy: string;
};
var progressHandler: any;
export var DefaultDeployOptions: IDeployOptions = {
    version: 'V3',
    protocolRate: '0.01'
};
function progress(msg: string){
    if (typeof(progressHandler) == 'function'){
        progressHandler(msg);
    };
}
export async function deploy(wallet: IWallet, options?: IDeployOptions): Promise<IDeployResult>{
    progress('Contracts deployment start');
    let proxy;
    if (options.version == 'V3') {
        proxy = new Contracts.ProxyV3(wallet);
        progress('Deploy Proxy');
        await proxy.deploy(Utils.toDecimals(options.protocolRate, 6))
    }
    else {
        if (options.version == 'V2') {
            proxy = new Contracts.ProxyV2(wallet);
        }
        else {
            proxy = new Contracts.Proxy(wallet);
        }
        progress('Deploy Proxy');
        await proxy.deploy();
    }
    progress('Proxy deployed ' + proxy.address);
    progress('Contracts deployment finished');
    return {
        proxy: proxy.address
    };
};
export function onProgress(handler: any){
    progressHandler = handler;
};
export default {
    Contracts,
    deploy,
    DefaultDeployOptions,
    onProgress
};