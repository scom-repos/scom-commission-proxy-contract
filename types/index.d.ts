import * as Contracts from './contracts/index';
export { Contracts };
import { IWallet } from '@ijstech/eth-wallet';
export interface IDeployOptions {
    version?: string;
    protocolRate?: string;
}
export interface IDeployResult {
    proxy: string;
}
export declare var DefaultDeployOptions: IDeployOptions;
export declare function deploy(wallet: IWallet, options?: IDeployOptions): Promise<IDeployResult>;
export declare function onProgress(handler: any): void;
declare const _default: {
    Contracts: typeof Contracts;
    deploy: typeof deploy;
    DefaultDeployOptions: IDeployOptions;
    onProgress: typeof onProgress;
};
export default _default;
