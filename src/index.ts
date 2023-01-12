import * as Contracts from './contracts/index';
export {Contracts};
import {IWallet, BigNumber, Utils} from '@ijstech/eth-wallet';

export interface IDeployOptions {
};
export interface IDeployResult {
    distributor: string;
    proxy: string;
};
var progressHandler: any;
export var DefaultDeployOptions: IDeployOptions = {
};
function progress(msg: string){
    if (typeof(progressHandler) == 'function'){
        progressHandler(msg);
    };
}
export async function deploy(wallet: IWallet, options?: IDeployOptions): Promise<IDeployResult>{
    progress('Contracts deployment start');
    let distributor = new Contracts.Distributor(wallet);
    let proxy = new Contracts.Proxy(wallet);
    progress('Deploy Distributor');
    await distributor.deploy();
    progress('Distributor deployed ' + distributor.address);
    progress('Deploy Proxy');
    await proxy.deploy(distributor.address);
    progress('Proxy deployed ' + proxy.address);
    progress('Contracts deployment finished');
    return {
        distributor: distributor.address,
        proxy: proxy.address
    };
};
export async function deployProxyWithDistributor(wallet: IWallet, options?: IDeployOptions): Promise<IDeployResult>{
    progress('Contracts deployment start');
    let proxy = new Contracts.ProxyWtihDistributor(wallet);
    progress('Deploy Proxy');
    await proxy.deploy();
    progress('Proxy deployed ' + proxy.address);
    progress('Contracts deployment finished');
    return {
        distributor: Utils.nullAddress,
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