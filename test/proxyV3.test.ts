import 'mocha';
import { getProvider, print, assertEqual } from './helper';
import {stakeToVote, voteToPass, initHybridRouter, ammAddLiquidity, oracleAddLiquidity}  from './oswapHelper';

import { Utils, Wallet, Contract, BigNumber, TransactionReceipt, Erc20 } from "@ijstech/eth-wallet";
import * as OSWAP from "@scom/oswap-openswap-contract";
import { WETH9 as WETH, MockPriceOracle, MockErc20, MockOracleAdaptor3 } from "../packages/mock-contracts/src/contracts";

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

describe('proxy', function () {
    let accounts: string[];
    let wallet: Wallet;

    let oswapContracts: OSWAP.IDeploymentContracts;

    let weth: Erc20;
    let busd: Erc20;
    let cake: Erc20;

    let admin: string;
    let oswapAdmin: string;
    let projectOwner: string;
    let projectAdmin: string;
    let lp1: string;
    let lp2: string;
    let trader: string;
    let referrer1: string;
    let referrer2: string;

    before(async function () {
        wallet = new Wallet(getProvider());
        accounts = await wallet.accounts;


        admin = accounts[0];
        oswapAdmin = accounts[0];
        projectOwner = accounts[1];
        projectAdmin = accounts[2];
        lp1 = accounts[3];
        lp2 = accounts[4];
        trader = accounts[5];
        referrer1 = accounts[6];
        referrer2 = accounts[7];

        wallet.defaultAccount = admin;
    });
    before('Deploy weth/tokens', async function () {
        wallet.defaultAccount = admin;
        weth = new Erc20(wallet, await new WETH(wallet).deploy());
        console.log(`weth: ${weth.address}`);

        busd = new Erc20(wallet, await new MockErc20(wallet).deploy({name:"BUSD", symbol:"USDT", decimals:18}));
        console.log(`busd: ${busd.address}`);
        cake = new Erc20(wallet, await new MockErc20(wallet).deploy({name:"CAKE", symbol:"CAKE", decimals:18}));
        console.log(`cake: ${cake.address}`);
    });
    before('Deploy oswap\'s contracts', async function () {
        wallet.defaultAccount = admin;
        oswapContracts = OSWAP.toDeploymentContracts(<any>wallet, await OSWAP.deploy(<any>wallet, {tokens: {weth: weth.address}, hybridRouter: {}}));
        await initHybridRouter(wallet, oswapContracts);
        await stakeToVote(admin, admin, wallet, oswapContracts);

        let deadline = await wallet.getBlockTimestamp() + 10000;
        await ammAddLiquidity(wallet, oswapContracts, admin, lp2, busd, cake, CAKE_POOL_SIZE * CAKE_PRICE_USD, CAKE_POOL_SIZE, deadline);
        await ammAddLiquidity(wallet, oswapContracts, admin, lp2, busd, undefined, WETH_POOL_SIZE * BNB_PRICE_USD, WETH_POOL_SIZE, deadline);

        let oracle = new MockOracleAdaptor3(wallet);
        await oracle.deploy({ weth: weth.address, decimals: 18, tokens: [weth.address, busd.address, cake.address], prices: [Utils.toDecimals(ETH_PRICE_USD), Utils.toDecimals(1), Utils.toDecimals(CAKE_PRICE_USD)] });
        if (new BigNumber(busd.address.toLowerCase()).lt(cake.address.toLowerCase()))
            await voteToPass(admin, wallet, oswapContracts, oswapContracts.executor2, "setOracle", [Utils.addressToBytes32Right(busd.address, true), Utils.addressToBytes32Right(cake.address, true), Utils.addressToBytes32Right(oracle.address, true)]);
        else
            await voteToPass(admin, wallet, oswapContracts, oswapContracts.executor2, "setOracle", [Utils.addressToBytes32Right(cake.address, true), Utils.addressToBytes32Right(busd.address, true), Utils.addressToBytes32Right(oracle.address, true)]);
        if (new BigNumber(busd.address.toLowerCase()).lt(weth.address.toLowerCase()))
            await voteToPass(admin, wallet, oswapContracts, oswapContracts.executor2, "setOracle", [Utils.addressToBytes32Right(busd.address, true), Utils.addressToBytes32Right(weth.address, true), Utils.addressToBytes32Right(oracle.address, true)]);
        else
            await voteToPass(admin, wallet, oswapContracts, oswapContracts.executor2, "setOracle", [Utils.addressToBytes32Right(weth.address, true), Utils.addressToBytes32Right(busd.address, true), Utils.addressToBytes32Right(oracle.address, true)]);

        let expire = await wallet.getBlockTimestamp() + 100000;
        deadline = await wallet.getBlockTimestamp() + 10000;
        await oracleAddLiquidity(wallet, oswapContracts, admin, lp2, busd, cake, CAKE_POOL_SIZE * CAKE_PRICE_USD, CAKE_POOL_SIZE, expire, deadline);
        await oracleAddLiquidity(wallet, oswapContracts, admin, lp2, busd, undefined, WETH_POOL_SIZE * BNB_PRICE_USD, WETH_POOL_SIZE, expire, deadline);

        wallet.defaultAccount = admin
        await voteToPass(admin, wallet, oswapContracts, oswapContracts.executor2, "setWhiteList", [Utils.addressToBytes32Right(oswapContracts.hybridRouter.address, true), Utils.numberToBytes32(1, true)]);
    });

    let proxy: Contracts.ProxyV3;
    let projectId: number;
    describe('setup', async function () {
    it('deploy', async function () {
        // let result = await deploy(wallet, {
        //     version: 'V1'
        // });

        wallet.defaultAccount = admin;
        proxy = new Contracts.ProxyV3(wallet);
        await proxy.deploy(Utils.toDecimals("0.01", 6));
        console.log('proxy', proxy.address);
        await voteToPass(admin, wallet, oswapContracts, oswapContracts.executor2, "setWhiteList", [Utils.addressToBytes32Right(proxy.address, true), Utils.numberToBytes32(1, true)]);
    });

    it('register project', async function () {
        // new project
        wallet.defaultAccount = projectOwner;
        let receipt = await proxy.newProject([projectAdmin]);
        let newProjectEvent = proxy.parseNewProjectEvent(receipt);
        assertEqual(newProjectEvent.length, 1);
        assertEqual(newProjectEvent[0], {
            projectId: 0
        }, true);
        projectId = newProjectEvent[0].projectId.toNumber();
        assertEqual(await proxy.getProject(projectId), {
            owner: projectOwner,
            newOwner: Utils.nullAddress,
            projectAdmins: [projectOwner, projectAdmin]
        });
        assertEqual(await proxy.getProjectAdminsLength(projectId), 2);
    });
    it('project staking', async function () {
        wallet.defaultAccount = admin;
        await busd.mint({address:admin,amount:Utils.toDecimals(1000)});

        wallet.defaultAccount = admin;
        await busd.approve({spender: proxy.address, amount:Utils.toDecimals(1000)});
        let receipt = await proxy.stake({projectId: projectId, token:busd.address, amount:Utils.toDecimals(1000)});
        let stakeEvent = proxy.parseStakeEvent(receipt);
        assertEqual(stakeEvent.length, 1);
        assertEqual(stakeEvent[0], {
            projectId: 0, 
            token: busd.address, 
            amount: Utils.toDecimals(1000), 
            balance: Utils.toDecimals(1000)
        }, true);
        assertEqual(await proxy.stakesBalance({param1: projectId, param2: busd.address}), Utils.toDecimals(1000));

        receipt = await proxy.stakeETH(projectId, Utils.toDecimals(10));
        stakeEvent = proxy.parseStakeEvent(receipt);
        assertEqual(stakeEvent.length, 1);
        assertEqual(stakeEvent[0], {
            projectId: 0, 
            token: Utils.nullAddress, 
            amount: Utils.toDecimals(10), 
            balance: Utils.toDecimals(10)
        }, true);
        assertEqual(await proxy.stakesBalance({param1: projectId, param2: Utils.nullAddress}), Utils.toDecimals(10));

        let balance = await proxy.lastBalance(busd.address);
        assertEqual(balance, Utils.toDecimals(1000));
        balance = await proxy.lastBalance(Utils.nullAddress);
        assertEqual(balance, Utils.toDecimals(10));
    });
    });

    describe('commission on token in', async function () {
    let campaignId: number;
    it('register campaign', async function () {
        wallet.defaultAccount = projectAdmin;
        let selector = ["swapExactTokensForTokens", "swapTokensForExactTokens", "swapExactETHForTokens", "swapTokensForExactETH", "swapExactTokensForETH", "swapETHForExactTokens"];
        selector = selector.map(e=>e + "(" + oswapContracts.router._abi.filter(f=>f.name==e)[0].inputs.map(f=>f.type).join(',') + ")");
        selector = selector.map(e=>wallet.soliditySha3(e).substring(0,10));
        selector = selector.map(e=>oswapContracts.router.address.toLowerCase() + e.replace("0x", ""));
        console.log(selector);
        let now = await wallet.getBlockTimestamp();
        let campaign = {
            projectId: projectId,
            // target: oswapContracts.router.address,
            // selector: selector,
            maxInputTokensInEachCall: 1,
            maxOutputTokensInEachCall: 1,
            referrersRequireApproval: true,
            startDate: now,
            endDate: now + (30*24*60*60),
            targetAndSelectors: selector,
            acceptAnyInToken: true,
            acceptAnyOutToken: true,
            inTokens: [busd.address, Utils.nullAddress],
            directTransferInToken: [false, false],
            commissionInTokenConfig: [
                {
                    rate: Utils.toDecimals("0.01", 6),
                    feeOnProjectOwner: true,
                    capPerTransaction: Utils.toDecimals(10, await busd.decimals),
                    capPerCampaign: Utils.toDecimals(1000, await busd.decimals)
                },
                {
                    rate: Utils.toDecimals("0.01", 6),
                    feeOnProjectOwner: true,
                    capPerTransaction: Utils.toDecimals("0.1"),
                    capPerCampaign: Utils.toDecimals(1)
                }
            ],
            outTokens: [],
            commissionOutTokenConfig: [],
            referrers: [referrer1]
        };
        let receipt = await proxy.newCampaign(campaign);
        let newCamapignEvent = proxy.parseNewCampaignEvent(receipt);
        assertEqual(newCamapignEvent.length, 1);
        assertEqual(newCamapignEvent[0], {
            campaignId: 0
        }, true);
        campaignId = newCamapignEvent[0].campaignId.toNumber();

        let _campaign = await proxy.getCampaign({campaignId:campaignId, returnArrays:true});
        assertEqual(_campaign, campaign);

        let len = await proxy.getCampaignArrayLength(campaignId);
        assertEqual(len, {
            targetAndSelectorsLength: 6,
            inTokensLength: 2,
            outTokensLength: 0,
            referrersLength: 1
        });
        print(await proxy.getCampaignArrayData1({
            campaignId: campaignId, 
            targetAndSelectorsStart:0, targetAndSelectorsLength: len.targetAndSelectorsLength,
            referrersStart: 0, referrersLength: len.referrersLength
        }));
        print(await proxy.getCampaignArrayData2({
            campaignId: campaignId, 
            inTokensStart: 0, inTokensLength: len.inTokensLength, 
            outTokensStart: 0, outTokensLength: len.outTokensLength
        }));
    });

    it('token to token', async function () {

        let amountIn = 1000
        let decimals = await busd.decimals;
        let amountInWei = Utils.toDecimals(amountIn, decimals);

        wallet.defaultAccount = admin;
        await busd.mint({ address: trader, amount: amountIn * 2 });

        wallet.defaultAccount = trader;
        let now = await wallet.getBlockTimestamp();

        let to = trader;
        let data = await oswapContracts.router.swapExactTokensForTokens.txData({
            amountIn: amountInWei,
            amountOutMin: 0,
            path: [busd.address, cake.address],
            to: proxy.address, // trader
            deadline: now + 1000
        });
        print(data);

        let referrer = referrer1;
        let target = oswapContracts.router.address;
        let tokensIn = [
            {
                token: busd.address,
                amount: Utils.toDecimals(amountIn, decimals)
            }
        ];
        let tokensOut = [cake.address];

        await busd.approve({ spender: proxy.address, amount: amountIn * 2 });
        let receipt = await proxy.proxyCall({ referrer, campaignId, target, tokensIn, to, tokensOut, data }, 0);
        // print(receipt);
        print(proxy.parseTransferForwardEvent(receipt));
        print(proxy.parseTransferBackEvent(receipt));
        print(proxy.parseAddCommissionEvent(receipt));

        let balance = await proxy.lastBalance(busd.address);
        assertEqual(balance, Utils.toDecimals(1000));
        balance = await proxy.lastBalance(Utils.nullAddress);
        assertEqual(balance, Utils.toDecimals(10));

        balance = await proxy.campaignAccumulatedCommission({param1:campaignId,param2:busd.address});
        assertEqual(balance, Utils.toDecimals("10.1")); // 1000 * 0.01 + (1000 * 0.01 * 0.01)
        balance = await proxy.campaignAccumulatedCommission({param1:campaignId,param2:Utils.nullAddress});
        assertEqual(balance, Utils.toDecimals("0"));
        balance = await proxy.stakesBalance({param1: projectId, param2: busd.address});
        assertEqual(balance, Utils.toDecimals("989.9"));
        balance = await proxy.stakesBalance({param1: projectId, param2: Utils.nullAddress});
        assertEqual(balance, Utils.toDecimals("10"));
        balance = await proxy.protocolFeeBalance(busd.address);
        assertEqual(balance, Utils.toDecimals("0.1"));
        balance = await proxy.protocolFeeBalance(Utils.nullAddress);
        assertEqual(balance, Utils.toDecimals("0"));

        balance = await cake.balanceOf(trader);
        assertEqual(balance, "83.326389467544371302");

        wallet.defaultAccount = referrer1;
        balance = await proxy.getClaimantBalance({
            claimant: referrer1,
            token: busd.address
        });
        assertEqual(balance, Utils.toDecimals("10"));
        balance = await proxy.protocolFeeBalance(busd.address);
        assertEqual(balance, Utils.toDecimals("0.1"));

        receipt = await proxy.claim(busd.address);
        print(proxy.parseClaimEvent(receipt));

        balance = await busd.balanceOf(referrer1);
        assertEqual(balance, "10");

        balance = await proxy.lastBalance(busd.address);
        assertEqual(balance, Utils.toDecimals("990"));
        balance = await proxy.lastBalance(Utils.nullAddress);
        assertEqual(balance, Utils.toDecimals(10));
    });
    it('ETH to token', async function () {

        let amountIn = 10
        let decimals = 18;
        let amountInWei = Utils.toDecimals(amountIn, decimals);

        wallet.defaultAccount = trader;
        let now = parseInt((await wallet.getBlock()).timestamp.toString());

        let to = trader;
        let data = await oswapContracts.router.swapExactETHForTokens.txData({
            // amountIn: amountInWei,
            amountOutMin: 0,
            path: [weth.address, busd.address],
            to: to, // trader
            deadline: now + 1000
        }, amountInWei);
        print(data);

        let referrer = referrer1;
        let target = oswapContracts.router.address;
        let tokensIn = [
            {
                token: Utils.nullAddress,
                amount: Utils.toDecimals(amountIn, decimals)
            }
        ];
        let tokensOut = [busd.address];

        let receipt = await proxy.proxyCall({ referrer, campaignId, target, tokensIn, to, tokensOut, data }, Utils.toDecimals(amountIn, decimals));
        // print(receipt);
        print(proxy.parseTransferForwardEvent(receipt));
        print(proxy.parseTransferBackEvent(receipt));
        print(proxy.parseAddCommissionEvent(receipt));

        let balance = await proxy.lastBalance(busd.address);
        assertEqual(balance, Utils.toDecimals("990")); // 1000 - 10
        balance = await proxy.lastBalance(Utils.nullAddress);
        assertEqual(balance, Utils.toDecimals("10"));

        balance = await proxy.campaignAccumulatedCommission({param1:campaignId,param2:busd.address});
        assertEqual(balance, Utils.toDecimals("10.1"));
        balance = await proxy.campaignAccumulatedCommission({param1:campaignId,param2:Utils.nullAddress});
        assertEqual(balance, Utils.toDecimals("0.101"));
        balance = await proxy.stakesBalance({param1: projectId, param2: busd.address});
        assertEqual(balance, Utils.toDecimals("989.9"));
        balance = await proxy.stakesBalance({param1: projectId, param2: Utils.nullAddress});
        assertEqual(balance, Utils.toDecimals("9.899"));
        balance = await proxy.protocolFeeBalance(busd.address);
        assertEqual(balance, Utils.toDecimals("0.1"));
        balance = await proxy.protocolFeeBalance(Utils.nullAddress);
        assertEqual(balance, Utils.toDecimals("0.001"));

        balance = await busd.balanceOf(trader);
        assertEqual(balance, "4960.396039603960396039");

        wallet.defaultAccount = referrer1;
        balance = await proxy.getClaimantBalance({
            claimant: referrer1,
            token: Utils.nullAddress
        });
        assertEqual(balance, Utils.toDecimals("0.1"));

        await proxy.claim(Utils.nullAddress);
        balance = await wallet.balanceOf(referrer1);
        print(balance, receipt.gasUsed.toString(), receipt.effectiveGasPrice.toString());
        
        // assertEqual(balance, "10000.098771332"); // 10000 + 0.099 - gas fee

        balance = await proxy.lastBalance(busd.address);
        assertEqual(balance, Utils.toDecimals("990"));
        balance = await proxy.lastBalance(Utils.nullAddress);
        assertEqual(balance, Utils.toDecimals("9.9"));
    });
    it('token to ETH', async function () {

        let amountIn = 1000
        let decimals = await busd.decimals;
        let amountInWei = Utils.toDecimals(amountIn, decimals);

        wallet.defaultAccount = admin;
        await busd.mint({ address: trader, amount: amountIn * 2 });

        wallet.defaultAccount = trader;
        let now = parseInt((await wallet.getBlock()).timestamp.toString());

        let to = trader;
        let data = await oswapContracts.router.swapExactTokensForETH.txData({
            amountIn: amountInWei,
            amountOutMin: 0,
            path: [busd.address, weth.address],
            to: to, // trader
            deadline: now + 1000
        });
        print(data);

        let referrer = referrer1;
        let target = oswapContracts.router.address;
        let tokensIn = [
            {
                token: busd.address,
                amount: Utils.toDecimals(amountIn, decimals)
            }
        ];
        let tokensOut = [Utils.nullAddress];

        await busd.approve({ spender: proxy.address, amount: amountIn * 2 });
        let receipt = await proxy.proxyCall({ referrer, campaignId, target, tokensIn, to, tokensOut, data }, 0);
        // print(receipt);
        print(proxy.parseTransferForwardEvent(receipt));
        print(proxy.parseTransferBackEvent(receipt));
        print(proxy.parseAddCommissionEvent(receipt));

        let balance = await proxy.lastBalance(busd.address);
        assertEqual(balance, Utils.toDecimals("990"));
        balance = await proxy.lastBalance(Utils.nullAddress);
        assertEqual(balance, Utils.toDecimals("9.9"));

        balance = await proxy.campaignAccumulatedCommission({param1:campaignId,param2:busd.address});
        assertEqual(balance, Utils.toDecimals("20.2"));
        balance = await proxy.campaignAccumulatedCommission({param1:campaignId,param2:Utils.nullAddress});
        assertEqual(balance, Utils.toDecimals("0.101"));
        balance = await proxy.stakesBalance({param1: projectId, param2: busd.address});
        assertEqual(balance, Utils.toDecimals("979.8"));
        balance = await proxy.stakesBalance({param1: projectId, param2: Utils.nullAddress});
        assertEqual(balance, Utils.toDecimals("9.899"));
        balance = await proxy.protocolFeeBalance(busd.address);
        assertEqual(balance, Utils.toDecimals("0.2"));
        balance = await proxy.protocolFeeBalance(Utils.nullAddress);
        assertEqual(balance, Utils.toDecimals("0.001"));

        balance = await wallet.balanceOf(trader);
        assertEqual(balance, "9992.541714231236"); // 10000 - 10 + (1000/400) - gas fee*3

        wallet.defaultAccount = referrer1;
        balance = await proxy.getClaimantBalance({
            claimant: referrer1,
            token: busd.address
        });
        assertEqual(balance, Utils.toDecimals("10"));

        await proxy.claim(busd.address);
        balance = await busd.balanceOf(referrer1);
        assertEqual(balance, "20");

        balance = await proxy.lastBalance(busd.address);
        assertEqual(balance, Utils.toDecimals("980"));
        balance = await proxy.lastBalance(Utils.nullAddress);
        assertEqual(balance, Utils.toDecimals("9.9"));
    });
    });

    describe('commission on token out', async function () {
    let campaignId: number;
    it('register campaign 2', async function () {
        wallet.defaultAccount = projectAdmin;
        let selector = ["swapExactTokensForTokens", "swapTokensForExactTokens", "swapExactETHForTokens", "swapTokensForExactETH", "swapExactTokensForETH", "swapETHForExactTokens"];
        selector = selector.map(e=>e + "(" + oswapContracts.oracleRouter._abi.filter(f=>f.name==e)[0].inputs.map(f=>f.type).join(',') + ")");
        selector = selector.map(e=>wallet.soliditySha3(e).substring(0,10));
        selector = selector.map(e=>oswapContracts.oracleRouter.address.toLowerCase() + e.replace("0x", ""));
        let now = await wallet.getBlockTimestamp();
        let campaign = {
            projectId: projectId,
            maxInputTokensInEachCall: 1,
            maxOutputTokensInEachCall: 2,
            referrersRequireApproval: true,
            startDate: now,
            endDate: now + (30*24*60*60),
            targetAndSelectors: selector,
            acceptAnyInToken: true,
            acceptAnyOutToken: true,
            inTokens: [],
            directTransferInToken: [],
            commissionInTokenConfig: [],
            outTokens: [busd.address, Utils.nullAddress],
            commissionOutTokenConfig: [
                {
                    rate: Utils.toDecimals("0.01", 6),
                    feeOnProjectOwner: false,
                    capPerTransaction: Utils.toDecimals("10.01", await busd.decimals),
                    capPerCampaign: Utils.toDecimals(1001, await busd.decimals)
                },
                {
                    rate: Utils.toDecimals("0.01", 6),
                    feeOnProjectOwner: false,
                    capPerTransaction: Utils.toDecimals("10"),
                    capPerCampaign: Utils.toDecimals("10")
                }
            ],
            referrers: [referrer1]
        };
        let receipt = await proxy.newCampaign(campaign);
        let newCamapignEvent = proxy.parseNewCampaignEvent(receipt);
        assertEqual(newCamapignEvent.length, 1);
        assertEqual(newCamapignEvent[0], {
            campaignId: 1
        }, true);
        campaignId = newCamapignEvent[0].campaignId.toNumber();

        let _campaign = await proxy.getCampaign({campaignId:campaignId, returnArrays:true});
        assertEqual(_campaign, campaign);

        let len = await proxy.getCampaignArrayLength(campaignId);
        assertEqual(len, {
            targetAndSelectorsLength: 6,
            inTokensLength: 0,
            outTokensLength: 2,
            referrersLength: 1
        });
        print(await proxy.getCampaignArrayData1({
            campaignId: campaignId, 
            targetAndSelectorsStart:0, targetAndSelectorsLength: len.targetAndSelectorsLength,
            referrersStart: 0, referrersLength: len.referrersLength
        }));
        print(await proxy.getCampaignArrayData2({
            campaignId: campaignId, 
            inTokensStart: 0, inTokensLength: len.inTokensLength, 
            outTokensStart: 0, outTokensLength: len.outTokensLength
        }));
    });
    it('ETH to token', async function () {
        let amountIn = 0.25;
        let amountOutInWei = Utils.toDecimals(amountIn*ETH_PRICE_USD); // 0.25*4000=1000
        let decimals = 18;
        let amountInWei = Utils.toDecimals(amountIn, decimals).times(100);

        wallet.defaultAccount = trader;
        let now = parseInt((await wallet.getBlock()).timestamp.toString());

        let to = trader;
        let data = await oswapContracts.oracleRouter.swapETHForExactTokens.txData({
            amountOut: amountOutInWei,
            path: [weth.address, busd.address],
            to: proxy.address, //to, // trader
            deadline: now + 1000,
            useOracle: [true],
            data: "0x"
        }, amountInWei);
        print(data);

        let referrer = referrer1;
        let target = oswapContracts.oracleRouter.address;
        let tokensIn = [
            {
                token: Utils.nullAddress,
                amount: amountInWei
            }
        ];
        let tokensOut = [Utils.nullAddress, busd.address];// Utils.nullAddress

        let receipt = await proxy.proxyCall({ referrer, campaignId, target, tokensIn, to, tokensOut, data }, amountInWei);
        // print(receipt);
        print(proxy.parseTransferForwardEvent(receipt));
        print(proxy.parseTransferBackEvent(receipt));
        print(proxy.parseAddCommissionEvent(receipt));

        let balance = await proxy.lastBalance(busd.address);
        assertEqual(balance, Utils.toDecimals("980"));
        balance = await proxy.lastBalance(Utils.nullAddress);
        assertEqual(balance, Utils.toDecimals("9.9"));

        balance = await proxy.campaignAccumulatedCommission({param1:campaignId,param2:busd.address});
        assertEqual(balance, Utils.toDecimals("10.00000000000000008"));
        balance = await proxy.campaignAccumulatedCommission({param1:campaignId,param2:Utils.nullAddress});
        assertEqual(balance, Utils.toDecimals("0"));
        balance = await proxy.stakesBalance({param1: projectId, param2: busd.address});
        assertEqual(balance, Utils.toDecimals("969.79999999999999992")); // 979.8 - 10 // 969.799999999999999920
        balance = await proxy.stakesBalance({param1: projectId, param2: Utils.nullAddress});
        assertEqual(balance, Utils.toDecimals("9.899"));
        balance = await proxy.protocolFeeBalance(busd.address);
        assertEqual(balance, Utils.toDecimals("0.3"));
        balance = await proxy.protocolFeeBalance(Utils.nullAddress);
        assertEqual(balance, Utils.toDecimals("0.001"));
        
        balance = await busd.balanceOf(trader);
        assertEqual(balance, "6960.396039603960404039"); // 4960.396039603960396039 + 2000
        balance = await wallet.balanceOf(trader);
        assertEqual(balance, "9992.291054841236"); // 10000 - 10 + (1000/400) - 0.25  - gas fee*4

        wallet.defaultAccount = referrer1;
        balance = await proxy.getClaimantBalance({
            claimant: referrer1,
            token: busd.address
        });
        assertEqual(balance, Utils.toDecimals("9.90000000000000008"));
        balance = await proxy.getClaimantBalance({
            claimant: referrer1,
            token: Utils.nullAddress
        });
        assertEqual(balance, 0);

        await proxy.claim(busd.address);
        balance = await busd.balanceOf(referrer1);
        assertEqual(balance, "29.90000000000000008");

        balance = await proxy.lastBalance(busd.address);
        assertEqual(balance, Utils.toDecimals("970.09999999999999992"));
        balance = await proxy.lastBalance(Utils.nullAddress);
        assertEqual(balance, Utils.toDecimals("9.9"));
    });
    it('token to ETH', async function () {
        let amountIn = 40000
        let decimals = await busd.decimals;
        let amountInWei = Utils.toDecimals(amountIn, decimals);
        let amountOutInWei = Utils.toDecimals(amountIn/ETH_PRICE_USD);

        wallet.defaultAccount = admin;
        await busd.mint({ address: trader, amount: amountIn * 10 });

        wallet.defaultAccount = trader;
        let now = parseInt((await wallet.getBlock()).timestamp.toString());
        let to = trader;
        let data = await oswapContracts.oracleRouter.swapTokensForExactETH.txData({
            amountOut: amountOutInWei,
            amountInMax: amountInWei.times(10),
            path: [busd.address, weth.address],
            to: proxy.address, //to, // trader,
            useOracle: [true],
            deadline: now + 1000,
            data: "0x"
        });
        print(data);

        let referrer = referrer1;
        let target = oswapContracts.oracleRouter.address;
        let tokensIn = [
            {
                token: busd.address,
                amount: amountInWei.times(10)
            }
        ];
        let tokensOut = [Utils.nullAddress,busd.address];

        await busd.approve({ spender: proxy.address, amount: amountIn * 10 });
        let receipt = await proxy.proxyCall({ referrer, campaignId, target, tokensIn, to, tokensOut, data });
        // print(receipt);
        print(proxy.parseTransferForwardEvent(receipt));
        print(proxy.parseTransferBackEvent(receipt));
        print(proxy.parseAddCommissionEvent(receipt));

        let balance = await proxy.lastBalance(busd.address);
        assertEqual(balance, Utils.toDecimals("970.099999999999999920"));
        balance = await proxy.lastBalance(Utils.nullAddress);
        assertEqual(balance, Utils.toDecimals("9.9"));

        balance = await proxy.campaignAccumulatedCommission({param1:campaignId,param2:busd.address});
        assertEqual(balance, Utils.toDecimals("10.00000000000000008"));
        balance = await proxy.campaignAccumulatedCommission({param1:campaignId,param2:Utils.nullAddress});
        assertEqual(balance, Utils.toDecimals("0.1"));
        balance = await proxy.stakesBalance({param1: projectId, param2: busd.address});
        assertEqual(balance, Utils.toDecimals("969.79999999999999992"));
        balance = await proxy.stakesBalance({param1: projectId, param2: Utils.nullAddress});
        assertEqual(balance, Utils.toDecimals("9.799")); // 9.899 - 0.1
        balance = await proxy.protocolFeeBalance(busd.address);
        assertEqual(balance, Utils.toDecimals("0.3"));
        balance = await proxy.protocolFeeBalance(Utils.nullAddress);
        assertEqual(balance, Utils.toDecimals("0.002"));

        balance = await wallet.balanceOf(trader);
        assertEqual(balance, "10002.290255341235"); // 10000 - 10 + (1000/400) - 0.25 + (40000/4000) - gas fee*4

        wallet.defaultAccount = referrer1;
        balance = await proxy.getClaimantBalance({
            claimant: referrer1,
            token: Utils.nullAddress
        });
        assertEqual(balance, Utils.toDecimals("0.099")); // 40000/4000*0.01 - 40000/4000*0.0001

        await proxy.claim(Utils.nullAddress);
        balance = await wallet.balanceOf(referrer1);
        assertEqual(balance, "10000.198467058"); // 10000.099 + 0.025 - gas fee

        balance = await proxy.lastBalance(busd.address);
        assertEqual(balance, Utils.toDecimals("970.09999999999999992"));
        balance = await proxy.lastBalance(Utils.nullAddress);
        assertEqual(balance, Utils.toDecimals("9.801"));
    });
    });

    if (false)
    describe('getClaimantsInfo', async function () {
    it('getClaimantsInfo', async function () {
        const claimantIdCount = await proxy.claimantIdCount();
        let list = await proxy.getClaimantsInfo({
            fromId: 1,
            count: claimantIdCount
        });
        assert.strictEqual(list.length, claimantIdCount.toNumber());
        list = await proxy.getClaimantsInfo({
            fromId: 1,
            count: 10
        });
        assert.strictEqual(list.length, 2);
        list = await proxy.getClaimantsInfo({
            fromId: 2,
            count: 5
        });
        assert.strictEqual(list.length, 1);
        list = await proxy.getClaimantsInfo({
            fromId: 1,
            count: 2
        });
        assert.strictEqual(list.length, 2);
        list = await proxy.getClaimantsInfo({
            fromId: 2,
            count: 2
        });
        assert.strictEqual(list.length, 1);
        try {
            list = await proxy.getClaimantsInfo({
                fromId: 5,
                count: 2
            });
            throw null;
        }
        catch (error) {
            assert.strictEqual(error.message, 'VM Exception while processing transaction: revert out of bounds');
        }
    });
    });

    // describe('others', async function () {
    // it('Skim', async function () {
    //     wallet.defaultAccount = trader;
    //     await busd.approve({
    //         spender: proxy.address,
    //         amount: 10
    //     })
    //     await busd.transfer({
    //         address: proxy.address,
    //         amount: 10
    //     })
    //     await wallet.send(proxy.address, 10);
    //     let busdBalanceBefore = await busd.balanceOf(trader);
    //     let ethBalanceBefore = await wallet.balanceOf(trader);
    //     let cakeBalanceBefore = await cake.balanceOf(trader);
    //     await proxy.skim([busd.address, Utils.nullAddress, cake.address])
    //     let busdBalanceAfter = await busd.balanceOf(trader);
    //     assert.strictEqual(busdBalanceAfter.toFixed(), busdBalanceBefore.plus(10).toFixed());
    //     let ethBalanceAfter = await wallet.balanceOf(trader);
    //     assert.strictEqual(ethBalanceAfter.toFixed(2), ethBalanceBefore.plus(10).toFixed(2));
    //     let cakeBalanceAfter = await cake.balanceOf(trader);
    //     assert.strictEqual(cakeBalanceAfter.toFixed(), cakeBalanceBefore.toFixed());
    // });
    // });
});
