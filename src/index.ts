import * as Contracts from './contracts/index';
export {Contracts};
import {IWallet, BigNumber} from '@ijstech/eth-wallet';

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
    progress('Deploy Proxy');
    await distributor.deploy();
    await proxy.deploy(distributor.address);
    progress('Proxy deployed ' + distributor.address + ' ' + proxy.address);
    progress('Contracts deployment finished');
    return {
        distributor: distributor.address,
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