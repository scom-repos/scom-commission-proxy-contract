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
exports.onProgress = exports.deploy = exports.DefaultDeployOptions = exports.Contracts = void 0;
const Contracts = __importStar(require("./contracts/index"));
exports.Contracts = Contracts;
;
;
var progressHandler;
exports.DefaultDeployOptions = {};
function progress(msg) {
    if (typeof (progressHandler) == 'function') {
        progressHandler(msg);
    }
    ;
}
async function deploy(wallet, options) {
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
