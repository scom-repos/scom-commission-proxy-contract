"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onProgress = exports.deploy = exports.DefaultDeployOptions = exports.ContractUtils = exports.Contracts = void 0;
const Contracts = __importStar(require("./contracts/index"));
exports.Contracts = Contracts;
const eth_wallet_1 = require("@ijstech/eth-wallet");
const ContractUtils = __importStar(require("./utils"));
exports.ContractUtils = ContractUtils;
;
;
var progressHandler;
exports.DefaultDeployOptions = {
    version: 'V3',
    protocolRate: '0.01'
};
function progress(msg) {
    if (typeof (progressHandler) == 'function') {
        progressHandler(msg);
    }
    ;
}
async function deploy(wallet, options) {
    progress('Contracts deployment start');
    let proxy;
    if (options.version == 'V3') {
        proxy = new Contracts.ProxyV3(wallet);
        progress('Deploy Proxy');
        await proxy.deploy(eth_wallet_1.Utils.toDecimals(options.protocolRate, 6));
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
}
exports.deploy = deploy;
;
function onProgress(handler) {
    progressHandler = handler;
}
exports.onProgress = onProgress;
;
exports.default = {
    Contracts,
    deploy,
    DefaultDeployOptions: exports.DefaultDeployOptions,
    onProgress
};
