import 'mocha';
import { getProvider, print } from './helper';
import {stakeToVote, voteToPass, initHybridRouter, ammAddLiquidity, oracleAddLiquidity}  from './oswapHelper';

import {Utils, Wallet, Contract, BigNumber, TransactionReceipt, Erc20} from "@ijstech/eth-wallet";
import * as OSWAP from "@scom/oswap-openswap-contract";
import {WETH9 as WETH, MockPriceOracle, MockErc20, MockOracleAdaptor3} from "../packages/mock-contracts/src/contracts";

import * as assert from 'assert';

// import {expect, use} from "chai";
// import chaibignumber from "chai-bignumber";
// use(chaibignumber(BigNumber));

import { Contracts, deploy } from '../src';

const OSWAP_PRICE = 0.1;
const UNI_POOL_SIZE = 1000000;
const CAKE_POOL_SIZE = 1000000;
const WETH_POOL_SIZE = 1000;
const SWAP_INPUT_USDT = 10;
const SWAP_INPUT_BUSD = 10;
const SWAP_INPUT_CAKE = 100;
const SWAP_OUTPUT_UNI = 0.2;
const SWAP_INPUT_OSWAP = 100;
const CAKE_PRICE_USD = 12;
const UNI_PRICE_USD = 20;
const BNB_PRICE_USD = 400;
const ETH_PRICE_USD = 4000;

describe('proxy', function() {
    let accounts: string[];
    let wallet: Wallet;

    let oswapContracts: OSWAP.IDeploymentContracts;

    let weth: Erc20;
    let busd: Erc20;
    let cake: Erc20;

    let admin: string;
    let oswapAdmin: string;
    let lp1: string;
    let lp2: string;    
    let trader: string;
    let referrer1: string;
    let referrer2: string;

    before(async function(){
        wallet = new Wallet(getProvider());
        accounts = await wallet.accounts;

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
        wallet.defaultAccount = admin;
        weth = new Erc20(wallet, await new WETH(wallet).deploy());
        console.log(`weth: ${weth.address}`);

        busd = new Erc20(wallet, await new MockErc20(wallet).deploy({name:"BUSD", symbol:"USDT", decimals:18}));
        console.log(`busd: ${busd.address}`);
        cake = new Erc20(wallet, await new MockErc20(wallet).deploy({name:"CAKE", symbol:"CAKE", decimals:18}));
        console.log(`cake: ${cake.address}`);
    });
    before('Deploy oswap\'s contracts', async function(){
        wallet.defaultAccount = admin;
        oswapContracts = OSWAP.toDeploymentContracts(<any>wallet, await OSWAP.deploy(<any>wallet, {tokens: {weth: weth.address}, hybridRouter: {}}));
        await initHybridRouter(wallet, oswapContracts);
        await stakeToVote(admin, admin, wallet, oswapContracts);

        let deadline = await wallet.getBlockTimestamp() + 10000;
        await ammAddLiquidity(wallet, oswapContracts, admin, lp2, busd, cake, CAKE_POOL_SIZE * CAKE_PRICE_USD, CAKE_POOL_SIZE, deadline);
        await ammAddLiquidity(wallet, oswapContracts, admin, lp2, busd, undefined, WETH_POOL_SIZE * BNB_PRICE_USD, WETH_POOL_SIZE, deadline);

        let oracle = new MockOracleAdaptor3(wallet);
        await oracle.deploy({ weth: weth.address, decimals: 18, tokens: [busd.address, cake.address], prices: [Utils.toDecimals(1), Utils.toDecimals(CAKE_PRICE_USD)] });
        if (new BigNumber(busd.address.toLowerCase()).lt(cake.address.toLowerCase()))
            await voteToPass(admin, wallet, oswapContracts, oswapContracts.executor2, "setOracle", [Utils.addressToBytes32Right(busd.address, true), Utils.addressToBytes32Right(cake.address, true), Utils.addressToBytes32Right(oracle.address, true)]);
        else
            await voteToPass(admin, wallet, oswapContracts, oswapContracts.executor2, "setOracle", [Utils.addressToBytes32Right(cake.address, true), Utils.addressToBytes32Right(busd.address, true), Utils.addressToBytes32Right(oracle.address, true)]);

        let expire = await wallet.getBlockTimestamp() + 100000;
        deadline = await wallet.getBlockTimestamp() + 10000;
        await oracleAddLiquidity(wallet, oswapContracts, admin, lp2, busd, cake, CAKE_POOL_SIZE * CAKE_PRICE_USD, CAKE_POOL_SIZE, expire, deadline);

        wallet.defaultAccount = admin
        await voteToPass(admin, wallet, oswapContracts, oswapContracts.executor2, "setWhiteList", [Utils.addressToBytes32Right(oswapContracts.hybridRouter.address, true), Utils.numberToBytes32(1, true)]);

    });

    let proxy: Contracts.ProxyV2;
    it('deploy', async function(){
        let result = await deploy(wallet, {
            version: 'V2'
        });

        proxy = new Contracts.ProxyV2(wallet, result.proxy);
    });

    it('token to token', async function(){

        let amountIn = 1000
        let decimals = await busd.decimals;
        let amountInWei = Utils.toDecimals(amountIn, decimals);

        wallet.defaultAccount = admin;
        await busd.mint({address:trader, amount:amountIn * 2});

        wallet.defaultAccount = trader;
        let now = parseInt((await wallet.getBlock()).timestamp.toString());

        // await busd.approve({spender:oswapContracts.router.address, amount:amountIn});
        // await oswapContracts.router.swapExactTokensForTokens({
        //     amountIn: amountInWei,
        //     amountOutMin: 0,
        //     path:[busd.address,cake.address],
        //     to: trader,
        //     deadline: now + 1000
        // });
        // print(await cake.balanceOf(trader));
        let data = await oswapContracts.router.swapExactTokensForTokens.txData({
            amountIn: amountInWei,
            amountOutMin: 0,
            path:[busd.address,cake.address],
            to: proxy.address, // trader
            deadline: now + 1000
        });
        print(data);

        let target = oswapContracts.router.address;
        let tokensIn = [
            {
                token: busd.address,
                amount: Utils.toDecimals(amountIn + 10 + 15, decimals),
                directTransfer: false,
                commissions: [
                    {to: referrer1, amount: Utils.toDecimals(10, decimals)},
                    {to: referrer2, amount: Utils.toDecimals(15, decimals)}
                ],
                totalCommissions: Utils.toDecimals(25, decimals)
            }
        ];
        let to = trader;
        let tokensOut = [cake.address];

        await busd.approve({spender:proxy.address, amount:amountIn * 2});
        let receipt = await proxy.proxyCall({target,tokensIn,to,tokensOut,data}, 0);
        print(receipt);
        print(proxy.parseTransferForwardEvent(receipt));
        print(proxy.parseTransferBackEvent(receipt));
        print(proxy.parseAddCommissionEvent(receipt));

        let balance = await proxy.lastBalance(busd.address);
        assert.strictEqual(balance.toFixed(), Utils.toDecimals(25).toFixed());
        balance = await proxy.lastBalance(Utils.nullAddress);
        assert.strictEqual(balance.toFixed(), "0");

        balance = await cake.balanceOf(trader);
        assert.strictEqual(balance.toFixed(), "83.326389467544371302");


        wallet.defaultAccount = referrer1;
        balance = await proxy.getClaimantBalance({
            claimant: referrer1,
            token: busd.address
        });
        assert.strictEqual(balance.toFixed(), Utils.toDecimals(10).toFixed());
        
        await proxy.claim(busd.address);
        balance = await busd.balanceOf(referrer1); 
        assert.strictEqual(balance.toFixed(), "10");

        balance = await proxy.lastBalance(busd.address);
        assert.strictEqual(balance.toFixed(), Utils.toDecimals(15).toFixed());
        balance = await proxy.lastBalance(Utils.nullAddress);
        assert.strictEqual(balance.toFixed(), "0");
    });

    it('ETH to token', async function(){

        let amountIn = 10
        let decimals = 18;
        let amountInWei = Utils.toDecimals(amountIn, decimals);

        wallet.defaultAccount = trader;
        let now = parseInt((await wallet.getBlock()).timestamp.toString());

        // await oswapContracts.router.swapExactETHForTokens({
        //     // amountIn: amountInWei,
        //     amountOutMin: 0,
        //     path:[busd.address,weth.address],
        //     to: trader,
        //     deadline: now + 1000
        // }, amountInWei);
        // print(await cake.balanceOf(trader));

        let data = await oswapContracts.router.swapExactETHForTokens.txData({
            // amountIn: amountInWei,
            amountOutMin: 0,
            path:[weth.address,busd.address],
            to: proxy.address, // trader
            deadline: now + 1000
        }, amountInWei);
        print(data);

        let target = oswapContracts.router.address;
        let tokensIn = [
            {
                token: Utils.nullAddress,
                amount: Utils.toDecimals(amountIn + 0.10 + 0.15, decimals),
                directTransfer: false,
                commissions: [
                    {to: referrer1, amount: Utils.toDecimals(0.10, decimals)},
                    {to: referrer2, amount: Utils.toDecimals(0.15, decimals)}
                ],
                totalCommissions: Utils.toDecimals(0.25, decimals)
            }
        ];
        let to = trader;
        let tokensOut = [busd.address];

        let receipt = await proxy.proxyCall({target,tokensIn,to,tokensOut,data}, Utils.toDecimals(amountIn + 0.10 + 0.15, decimals));
        print(receipt);
        print(proxy.parseTransferForwardEvent(receipt));
        print(proxy.parseTransferBackEvent(receipt));
        print(proxy.parseAddCommissionEvent(receipt));

        let balance = await proxy.lastBalance(busd.address);
        assert.strictEqual(balance.toFixed(), Utils.toDecimals(15).toFixed());
        balance = await proxy.lastBalance(Utils.nullAddress);
        assert.strictEqual(balance.toFixed(), Utils.toDecimals("0.25").toFixed());

        balance = await busd.balanceOf(trader);
        assert.strictEqual(balance.toFixed(), "4935.396039603960396039");

        wallet.defaultAccount = referrer1;
        balance = await proxy.getClaimantBalance({
            claimant: referrer1,
            token: Utils.nullAddress
        });
        assert.strictEqual(balance.toFixed(), Utils.toDecimals(0.1).toFixed());

        await proxy.claim(Utils.nullAddress);
        balance = await wallet.balanceOf(referrer1); 
        assert.strictEqual(balance.toFixed(), "10000.099771816"); // 10000 + 0.1 - gas fee

        balance = await proxy.lastBalance(busd.address);
        assert.strictEqual(balance.toFixed(), Utils.toDecimals(15).toFixed());
        balance = await proxy.lastBalance(Utils.nullAddress);
        assert.strictEqual(balance.toFixed(), Utils.toDecimals("0.15").toFixed());
    });

    it('token to ETH', async function(){

        let amountIn = 1000
        let decimals = await busd.decimals;
        let amountInWei = Utils.toDecimals(amountIn, decimals);

        wallet.defaultAccount = admin;
        await busd.mint({address:trader, amount:amountIn * 2});

        wallet.defaultAccount = trader;
        let now = parseInt((await wallet.getBlock()).timestamp.toString());

        // await busd.approve({spender:oswapContracts.router.address, amount:amountIn});
        // await oswapContracts.router.swapExactTokensForETH({
        //     amountIn: amountInWei,
        //     amountOutMin: 0,
        //     path:[busd.address,weth.address],
        //     to: trader,
        //     deadline: now + 1000
        // }, amountInWei);
        // print(await cake.balanceOf(trader));

        let data = await oswapContracts.router.swapExactTokensForETH.txData({
            amountIn: amountInWei,
            amountOutMin: 0,
            path:[busd.address,weth.address],
            to: proxy.address, // trader
            deadline: now + 1000
        });
        print(data);

        let target = oswapContracts.router.address;
        let tokensIn = [
            {
                token: busd.address,
                amount: Utils.toDecimals(amountIn + 10 + 15, decimals),
                directTransfer: false,
                commissions: [
                    {to: referrer1, amount: Utils.toDecimals(10, decimals)},
                    {to: referrer2, amount: Utils.toDecimals(15, decimals)}
                ],
                totalCommissions: Utils.toDecimals(25, decimals)
            }
        ];
        let to = trader;
        let tokensOut = [Utils.nullAddress];

        await busd.approve({spender:proxy.address, amount:amountIn * 2});
        let receipt = await proxy.proxyCall({target,tokensIn,to,tokensOut,data}, 0);
        print(receipt);
        print(proxy.parseTransferForwardEvent(receipt));
        print(proxy.parseTransferBackEvent(receipt));
        print(proxy.parseAddCommissionEvent(receipt));

        let balance = await proxy.lastBalance(busd.address);
        assert.strictEqual(balance.toFixed(), Utils.toDecimals(40).toFixed());
        balance = await proxy.lastBalance(Utils.nullAddress);
        assert.strictEqual(balance.toFixed(), Utils.toDecimals("0.15").toFixed());

        balance = await wallet.balanceOf(trader);
        assert.strictEqual(balance.toFixed(2), "9992.29"); // 10000 - 10 - 0.1 - 0.15 + (1000/400) - gas fee*3

        wallet.defaultAccount = referrer1;
        balance = await proxy.getClaimantBalance({
            claimant: referrer1,
            token: busd.address
        });
        assert.strictEqual(balance.toFixed(), Utils.toDecimals(10).toFixed());

        await proxy.claim(busd.address);
        balance = await busd.balanceOf(referrer1); 
        assert.strictEqual(balance.toFixed(), "20");

        balance = await proxy.lastBalance(busd.address);
        assert.strictEqual(balance.toFixed(), Utils.toDecimals(30).toFixed());
        balance = await proxy.lastBalance(Utils.nullAddress);
        assert.strictEqual(balance.toFixed(), Utils.toDecimals("0.15").toFixed());
    });


    it('token to token - tokenIn', async function(){

        let amountIn = 1000
        let decimals = await busd.decimals;
        let amountInWei = Utils.toDecimals(amountIn, decimals);

        wallet.defaultAccount = admin;
        await busd.mint({address:trader, amount:amountIn * 2});

        wallet.defaultAccount = trader;
        let now = parseInt((await wallet.getBlock()).timestamp.toString());

        // await busd.approve({spender:oswapContracts.router.address, amount:amountIn});
        // await oswapContracts.router.swapExactTokensForTokens({
        //     amountIn: amountInWei,
        //     amountOutMin: 0,
        //     path:[busd.address,cake.address],
        //     to: trader,
        //     deadline: now + 1000
        // });
        // print(await cake.balanceOf(trader));

        let data = await oswapContracts.router.swapExactTokensForTokens.txData({
            amountIn: amountInWei,
            amountOutMin: 0,
            path:[busd.address,cake.address],
            to: proxy.address, // trader
            deadline: now + 1000
        });
        print(data);

        let target = oswapContracts.router.address;
        let tokensIn = 
            {
                token: busd.address,
                amount: Utils.toDecimals(amountIn + 10 + 15, decimals),
                directTransfer: false,
                commissions: [
                    {to: referrer1, amount: Utils.toDecimals(10, decimals)},
                    {to: referrer2, amount: Utils.toDecimals(15, decimals)}
                ],
                totalCommissions: Utils.toDecimals(25, decimals)
            }
        ;
        let to = trader;
        let tokensOut = [cake.address];

        await busd.approve({spender:proxy.address, amount:amountIn * 2});
        let receipt = await proxy.tokenIn({target,tokensIn,data});
        print(receipt);
        print(proxy.parseTransferForwardEvent(receipt));
        print(proxy.parseTransferBackEvent(receipt));
        print(proxy.parseAddCommissionEvent(receipt));

        let balance = await proxy.lastBalance(busd.address);
        assert.strictEqual(balance.toFixed(), Utils.toDecimals(55).toFixed());
        balance = await proxy.lastBalance(Utils.nullAddress);
        assert.strictEqual(balance.toFixed(), Utils.toDecimals("0.15").toFixed());

        balance = await cake.balanceOf(trader);
        assert.strictEqual(balance.toFixed(), "83.326389467544371302");

        wallet.defaultAccount = referrer1;
        balance = await proxy.getClaimantBalance({
            claimant: referrer1,
            token: busd.address
        });
        assert.strictEqual(balance.toFixed(), Utils.toDecimals(10).toFixed());

        await proxy.claim(busd.address);
        balance = await busd.balanceOf(referrer1); 
        assert.strictEqual(balance.toFixed(), "30");

        balance = await proxy.lastBalance(busd.address);
        assert.strictEqual(balance.toFixed(), Utils.toDecimals(45).toFixed());
        balance = await proxy.lastBalance(Utils.nullAddress);
        assert.strictEqual(balance.toFixed(), Utils.toDecimals("0.15").toFixed());
    });

    it('ETH to token - ethIn', async function(){

        let amountIn = 10
        let decimals = 18;
        let amountInWei = Utils.toDecimals(amountIn, decimals);

        wallet.defaultAccount = trader;
        let now = parseInt((await wallet.getBlock()).timestamp.toString());

        // await oswapContracts.router.swapExactETHForTokens({
        //     // amountIn: amountInWei,
        //     amountOutMin: 0,
        //     path:[busd.address,weth.address],
        //     to: trader,
        //     deadline: now + 1000
        // }, amountInWei);
        // print(await cake.balanceOf(trader));

        let data = await oswapContracts.router.swapExactETHForTokens.txData({
            // amountIn: amountInWei,
            amountOutMin: 0,
            path:[weth.address,busd.address],
            to: proxy.address, // trader
            deadline: now + 1000
        }, amountInWei);
        print(data);

        let target = oswapContracts.router.address;
        let 
                commissions = [
                    {to: referrer1, amount: Utils.toDecimals(0.10, decimals)},
                    {to: referrer2, amount: Utils.toDecimals(0.15, decimals)}
                ]
        ;
        let to = trader;
        let tokensOut = [busd.address];

        let receipt = await proxy.ethIn({target,commissions,data}, Utils.toDecimals(amountIn + 0.10 + 0.15, decimals));
        print(receipt);
        print(proxy.parseTransferForwardEvent(receipt));
        print(proxy.parseTransferBackEvent(receipt));
        print(proxy.parseAddCommissionEvent(receipt));

        let balance = await proxy.lastBalance(busd.address);
        assert.strictEqual(balance.toFixed(), Utils.toDecimals(45).toFixed());
        balance = await proxy.lastBalance(Utils.nullAddress);
        assert.strictEqual(balance.toFixed(), Utils.toDecimals("0.40").toFixed());

        balance = await busd.balanceOf(trader);
        assert.strictEqual(balance.toFixed(), "6885.396039603960396039");

        wallet.defaultAccount = referrer1;
        balance = await proxy.getClaimantBalance({
            claimant: referrer1,
            token: Utils.nullAddress
        });
        assert.strictEqual(balance.toFixed(), "100000000000000000");

        await proxy.claim(Utils.nullAddress);
        balance = await wallet.balanceOf(referrer1); 
        assert.strictEqual(balance.toFixed(), "10000.199468864"); // 10000 + 0.1 - gas fee

        balance = await proxy.lastBalance(busd.address);
        assert.strictEqual(balance.toFixed(), Utils.toDecimals(45).toFixed());
        balance = await proxy.lastBalance(Utils.nullAddress);
        assert.strictEqual(balance.toFixed(), Utils.toDecimals("0.30").toFixed());

        const claimantIdCount = await proxy.claimantIdCount();
        const list = await proxy.getClaimantsInfo({
            fromId: 1,
            count: claimantIdCount
        });
    });
});
