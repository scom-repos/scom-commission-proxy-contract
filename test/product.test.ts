import 'mocha';
import {print} from './helper';

import Config from './config';
import networks from "../data/networks";

import {Utils, Wallet, Contract, BigNumber, TransactionReceipt, Erc20} from "@ijstech/eth-wallet";
import {WETH9 as WETH, MockErc20} from "./src/contracts";

import * as Product from "@scom/product-contract";

import Ganache from "ganache";
import * as assert from 'assert';

import Web3 from 'web3';

import fs from "fs";
import path from "path";

// import {expect, use} from "chai";
// import chaibignumber from "chai-bignumber";
// use(chaibignumber(BigNumber));

import { Contracts, deploy } from '../src';

const outputPath = path.join(__dirname, "address.json");
const Address = ((!Config.networks[0].chainName.startsWith("local")) && fs.existsSync(outputPath)) ? JSON.parse(fs.readFileSync(outputPath, 'utf8').trim() || "{}") : {};

describe('proxy', function() {
    if (Config.networks.some(e=>networks[e.chainName]
                             && networks[e.chainName].rpc
                             && networks[e.chainName].rpc.includes("infura.io"))
                             && !process.env.INFURA_ID){
        console.log("Please set env INFURA_ID, e.g.: INFURA_ID=<INFURA_ID> npm run test");
        return process.exit();
    }
    if (!Config.oswapAccounts[0].privateKey.startsWith("0x")){
        console.log("Please set priv key of " + Config.oswapAccounts[0].address + " in config");
        return process.exit();
    }

    let chainName = Config.networks[0].chainName;
    let chainId:number = networks[chainName].networkId;

    let accounts: string[];
    let wallet: Wallet;

    let weth: WETH;
    let busd: Erc20;

    let admin: string;
    let oswapAdmin: string;
    let lp1: string;
    let lp2: string;    
    let trader: string;
    let referrer1: string;
    let referrer2: string;

    before(async function(){
        accounts = Config.networks[0].accounts.map(e=>e.address);
        console.log(accounts);

        if (!Address[chainName]) Address[chainName] = {};
        let provider =  // chainName=="localHardhat" ? hardhat.web3.currentProvider :
                        networks[chainName].rpc ? new Web3.providers.HttpProvider(networks[chainName].rpc, networks[chainName].rpcOptions) :
                        Ganache.provider({logging:{quiet:true},wallet:{totalAccounts:20,mnemonic:"test test test test test test test test test test test junk",defaultBalance:10000}});

        wallet = new Wallet(provider, Config.networks[0].accounts);


        admin = accounts[0];
        oswapAdmin = accounts[0];
        lp1 = accounts[5];
        lp2 = accounts[6];
        trader = accounts[7];
        referrer1 = accounts[3];
        referrer2 = accounts[4];

        wallet.defaultAccount = admin;
    });
    before('Deploy weth', async function(){
        if (Address[chainName].openswap && Address[chainName].openswap.weth){
            weth = new WETH(wallet, Address[chainName].openswap.weth);
        } else if (networks[chainName].weth9Token){
            weth = new WETH(wallet, networks[chainName].weth9Token);
        } else {
            weth = new WETH(wallet);
            await weth.deploy();
            Address[chainName].weth = weth.address;
            fs.writeFileSync(outputPath, JSON.stringify(Address,null,"    "), "utf8");
        }
    });

    before('Deploy dependent contracts', async function(){
        if (!Address[chainName].dependent)
            Address[chainName].dependent = {};

        wallet.defaultAccount = admin;
        // tokens
        if (!Address[chainName].dependent.BUSD) {
            let token = new MockErc20(wallet);
            await token.deploy({name:"BUSD", symbol:"BUSD", decimals:18});
            Address[chainName].dependent.BUSD = token.address;
            fs.writeFileSync(outputPath, JSON.stringify(Address,null,"    "), "utf8");
            console.log("BUSD " + token.address);
        }
        busd = new Erc20(wallet, Address[chainName].dependent.BUSD);
    });

    let productInfo: Product.Contacts.ProductInfo;
    let product1155: Product.Contacts.Product1155;
    let productId: BigNumber;
    let productId2: BigNumber;
    before('Setup Proeuct', async function(){
        let result = await Product.deploy(wallet, Product.DefaultDeployOptions);
        productInfo = new Product.Contracts.ProductInfo(wallet, result.productInfo);
        product1155 = new Product.Contracts.Product1155(wallet, result.product1155);

        //token
        let receipt = await productInfo.newProduct({ipfsCid:"", quantity:100, price: Utils.toDecimals(25), token:busd.address});
        let event = productInfo.parseNewProductEvent(receipt)[0];// {productId:BigNumber,owner:string,_event:Event}
        productId = event.productId;

        // ETH
        receipt = await productInfo.newProduct({ipfsCid:"", quantity:100, price: Utils.toDecimals(0.25), token:Utils.nullAddress});
        event = productInfo.parseNewProductEvent(receipt)[0];// {productId:BigNumber,owner:string,_event:Event}
        productId2 = event.productId;
    });

    let proxy: Contracts.Proxy;
    let distributor: Contracts.Distributor;
    let product2: Product.ProductInfo;
    it('deploy', async function(){
        let result = await deploy(wallet);

        proxy = new Contracts.Proxy(wallet, result.proxy);
        distributor = new Contracts.Distributor(wallet, result.distributor);
    });

    it('token', async function(){
        let decimals = await busd.decimals;
        let amountIn = 100;
        let amountInWei = Utils.toDecimals(amountIn, decimals);

        await busd.mint({address: trader, amount: 1000});

        wallet.defaultAccount = trader;

        // await busd.approve({spender:productInfo.address, amount:decimals});
        // let receipt = await productInfo.buy({productId:productId, quantity:4, to:trader});
        // print(receipt);

        let data = await productInfo.buy.txData({productId:productId, quantity:4, to:trader});
        print(data);

        let target = productInfo.address;
        let tokensIn = 
            {
                token: busd.address,
                amount: Utils.toDecimals(amountIn + 1.0 + 1.5, decimals),
                directTransfer: false,
                commissions: [
                    {to: referrer1, amount: Utils.toDecimals(1.0, decimals)},
                    {to: referrer2, amount: Utils.toDecimals(1.5, decimals)}
                ]
            }
        ;

        await busd.approve({spender:proxy.address, amount:amountIn * 2});
        let receipt = await proxy.tokenIn({target,tokensIn,data});
        print(receipt);
        print(proxy.parseTransferForwardEvent(receipt));
        print(distributor.parseAddCommissionEvent(receipt));
        print(product1155.parseTransferSingleEvent(receipt));

        let balance: BigNumber;
        balance = await busd.balanceOf(trader);
        assert.strictEqual(balance.toFixed(), "897.5"); // 1000 - 100 - 1.0 - 1.5
        balance = await product1155.balanceOf({account:trader, id:1});
        assert.strictEqual(balance.toFixed(), "4");

        wallet.defaultAccount = referrer1;
        balance = await distributor.distributions({param1:referrer1, param2:busd.address});
        assert.strictEqual(balance.toFixed(), "1000000000000000000");

        await distributor.claim(busd.address);
        balance = await busd.balanceOf(referrer1);
        assert.strictEqual(balance.toFixed(), "1");
    });

    it('ETH', async function(){
        let decimals = 18;
        let amountIn = 1;
        let amountInWei = Utils.toDecimals(amountIn, decimals);

        wallet.defaultAccount = trader;

        // let receipt = await productInfo.buyEth({productId:productId2, quantity:4, to:trader}, amountInWei);
        // print(receipt);

        let data = await productInfo.buyEth.txData({productId:productId2, quantity:4, to:trader}, amountInWei);
        print(data);

        let target = productInfo.address;
        let commissions = [
            {to: referrer1, amount: Utils.toDecimals(0.010, decimals)},
            {to: referrer2, amount: Utils.toDecimals(0.015, decimals)}
        ];

        let receipt = await proxy.ethIn({target,commissions,data}, Utils.toDecimals(amountIn + 0.010 + 0.015));
        print(receipt);
        print(proxy.parseTransferForwardEvent(receipt));
        print(distributor.parseAddCommissionEvent(receipt));
        print(product1155.parseTransferSingleEvent(receipt));

        let balance: BigNumber;
        balance = await wallet.balanceOf(trader);
        print(balance)
        assert.strictEqual(balance.toFixed(), "9998.974037456"); // 10000 - 1 - 0.010 - 0.015 - gas
        balance = await product1155.balanceOf({account:trader, id:2});
        assert.strictEqual(balance.toFixed(), "4");

        wallet.defaultAccount = referrer1;
        balance = await distributor.distributions({param1:referrer1, param2:Utils.nullAddress});
        assert.strictEqual(balance.toFixed(), "10000000000000000");

        await distributor.claim(Utils.nullAddress);
        balance = await wallet.balanceOf(referrer1);
        assert.strictEqual(balance.toFixed(), "10000.009798232"); // 10000 + 0.010 - gas
    });
});