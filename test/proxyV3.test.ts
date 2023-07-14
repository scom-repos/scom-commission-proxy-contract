import 'mocha';
import { getProvider, print, assertEqual } from './helper';
import {stakeToVote, voteToPass, initHybridRouter, ammAddLiquidity, oracleAddLiquidity}  from './oswapHelper';

import Config from './config';
import networks from "../data/networks";

import { Utils, Wallet, Contract, BigNumber, TransactionReceipt, Erc20 } from "@ijstech/eth-wallet";
import * as OSWAP from "@scom/oswap-openswap-contract";
import { WETH9 as WETH, MockPriceOracle, MockErc20, MockOracleAdaptor3 } from "../packages/mock-contracts/src/contracts";

import Ganache from "ganache";
import * as assert from 'assert';

import fs from "fs";
import path from "path";

// import {expect, use} from "chai";
// import chaibignumber from "chai-bignumber";
// use(chaibignumber(BigNumber));

import { Contracts, deploy } from '../src';
import { utils } from 'mocha';

const outputPath = path.join(__dirname, "address.json");
const Address = ((!Config.networks[0].chainName.startsWith("local")) && fs.existsSync(outputPath)) ? JSON.parse(fs.readFileSync(outputPath, 'utf8').trim() || "{}") : {};

const TIME_FOR_VOTING = 3;

const LP_STAKE_USD = 10000;
const LP_STAKE_OSWAP = 100000;
const SUPER_TROLL_NFT_PRICE = 300000; // in oswap
const GENERAL_TROLL_NFT_PRICE = 25000; // in oswap
const TROLL_NFT_FEE = 100; // in oswap
const TROLL_OSWAP_BOND = 1000; // bond > swapInputAamount / oswapPrice
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

function isLocalNetwork(chainName: string) {
    return chainName.includes("ganache") || chainName.includes("Ganache") || chainName.includes("hardhat") || chainName.includes("Hardhat");
}
describe('proxy', function () {
    if (Config.networks.some(e => networks[e.chainName]
        && networks[e.chainName].rpc
        && networks[e.chainName].rpc.includes("infura.io"))
        && !process.env.INFURA_ID) {
        console.log("Please set env INFURA_ID, e.g.: INFURA_ID=<INFURA_ID> npm run test");
        return process.exit();
    }
    if (!Config.oswapAccounts[0].privateKey.startsWith("0x")) {
        console.log("Please set priv key of " + Config.oswapAccounts[0].address + " in config");
        return process.exit();
    }

    let chainName = Config.networks[0].chainName;
    let chainId: number = networks[chainName].networkId;

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
    async function checkBalance(wallet: Wallet, chain: string, oswap: OSWAP.OpenSwap, address: string, amount: BigNumber) {
        if ((await oswap.balanceOf(address)).lt(amount)) {
            if (isLocalNetwork(chain)) {
                let _address = wallet.defaultAccount;
                wallet.defaultAccount = admin;//Config.oswapAccounts[0].address;
                await oswap.mint({ address: address, amount: amount.times(10) });
                wallet.defaultAccount = _address;
            } else {
                console.log(address + " doesn't have enough oswap");
                return process.exit(0);
            }
        }
    }
    before('Deploy oswap\'s contracts', async function () {
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

    let proxy: Contracts.ProxyV3;
    it('deploy', async function () {
        // let result = await deploy(wallet, {
        //     version: 'V1'
        // });

        wallet.defaultAccount = admin;
        proxy = new Contracts.ProxyV3(wallet);
        await proxy.deploy(Utils.toDecimals("0.01", 6));
    });

    let projectId: number;
    let campaignId: number;
    it('register', async function () {
        wallet.defaultAccount = projectOwner;
        let receipt = await proxy.newProject([projectAdmin]);
        let newProjectEvent = proxy.parseNewProjectEvent(receipt);
        projectId = newProjectEvent[0].projectId.toNumber();

        wallet.defaultAccount = projectAdmin;
        let selector = ["swapExactTokensForTokens", "swapTokensForExactTokens", "swapExactETHForTokens", "swapTokensForExactETH", "swapExactTokensForETH", "swapETHForExactTokens"];
        selector = selector.map(e=>e + "(" + oswapContracts.router._abi.filter(f=>f.name==e)[0].inputs.map(f=>f.type).join(',') + ")");
        selector = selector.map(e=>wallet.soliditySha3(e).substring(0,10));
        selector = selector.map(e=>oswapContracts.router.address + e.replace("0x", ""));
        console.log(selector);
        let now = await wallet.getBlockTimestamp();
        receipt = await proxy.newCampaign({
            projectId: projectId,
            // target: oswapContracts.router.address,
            // selector: selector,
            maxInputTokensInEachCall: 1,
            maxOutputTokensInEachCall: 1,
            referrersRequireApproval: true,
            startDate: now,
            endDate: now + (30*24*60*60),
            targetAndSelectors: selector,
            inTokens: [busd.address, Utils.nullAddress],
            commissionInTokenConfig: [
                {
                    directTransfer: false,
                    rate: Utils.toDecimals("0.01", 6),
                    capPerTransaction: Utils.toDecimals(10, await busd.decimals),
                    capPerCampaign: Utils.toDecimals(1000, await busd.decimals)
                },
                {
                    directTransfer: false,
                    rate: Utils.toDecimals("0.01", 6),
                    capPerTransaction: Utils.toDecimals("0.1"),
                    capPerCampaign: Utils.toDecimals(1)
                }
            ],
            outTokens: [],
            commissionOutTokenConfig: [],
            referrers: [referrer1]
        });
        let newCamapignEvent = proxy.parseNewCampaignEvent(receipt);
        campaignId = newCamapignEvent[0].campaignId.toNumber();

        print(await proxy.getCampaign({campaignId:campaignId, returnArrays:true}));
        let len = await proxy.getCampaignArrayLength(campaignId);
        print(len);
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


        wallet.defaultAccount = admin;
        await busd.mint({address:admin,amount:Utils.toDecimals(1000)});

        wallet.defaultAccount = admin;
        await busd.approve({spender: proxy.address, amount:Utils.toDecimals(1000)});
        receipt = await proxy.stake({projectId: projectId, token:busd.address, amount:Utils.toDecimals(1000)});
        proxy.parseStakeEvent(receipt);
        receipt = await proxy.stakeETH(projectId, Utils.toDecimals(10));
        proxy.parseStakeEvent(receipt);

        let balance = await proxy.lastBalance(busd.address);
        assertEqual(balance, Utils.toDecimals(1000));
        balance = await proxy.lastBalance(Utils.nullAddress);
        assertEqual(balance, Utils.toDecimals(10));
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
        let tokensOut = [cake.address];
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

        await busd.approve({ spender: proxy.address, amount: amountIn * 2 });
        let receipt = await proxy.proxyCall({ referrer, campaignId, target, tokensIn, to, tokensOut, data }, 0);

        print(proxy.parseTransferForwardEvent(receipt));
        print(proxy.parseTransferBackEvent(receipt));
        print(proxy.parseAddCommissionEvent(receipt));

        let balance = await proxy.lastBalance(busd.address);
        assertEqual(balance, Utils.toDecimals(1000));
        balance = await proxy.lastBalance(Utils.nullAddress);
        assertEqual(balance, Utils.toDecimals(10));

        balance = await cake.balanceOf(trader);
        assertEqual(balance, "83.326389467544371302");

        wallet.defaultAccount = referrer1;
        balance = await proxy.getClaimantBalance({
            claimant: referrer1,
            token: busd.address
        });
        assertEqual(balance, Utils.toDecimals("9.9"));
        balance = await proxy.protocolFeeBalance(busd.address);
        assertEqual(balance, Utils.toDecimals("0.1"));

        receipt = await proxy.claim(busd.address);
        print(proxy.parseClaimEvent(receipt));

        balance = await busd.balanceOf(referrer1);
        assertEqual(balance, "9.9");

        balance = await proxy.lastBalance(busd.address);
        assertEqual(balance, Utils.toDecimals("990.1"));
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
        let tokensOut = [busd.address];
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

        let receipt = await proxy.proxyCall({ referrer, campaignId, target, tokensIn, to, tokensOut, data }, Utils.toDecimals(amountIn, decimals));
        print(receipt);
        print(proxy.parseTransferForwardEvent(receipt));
        print(proxy.parseTransferBackEvent(receipt));
        print(proxy.parseAddCommissionEvent(receipt));

        let balance = await proxy.lastBalance(busd.address);
        assert.strictEqual(balance.toFixed(), Utils.toDecimals("990.1").toFixed()); // 1000 - 10
        balance = await proxy.lastBalance(Utils.nullAddress);
        assert.strictEqual(balance.toFixed(), Utils.toDecimals("10").toFixed());

        balance = await busd.balanceOf(trader);
        assert.strictEqual(balance.toFixed(), "4960.396039603960396039");

        wallet.defaultAccount = referrer1;
        balance = await proxy.getClaimantBalance({
            claimant: referrer1,
            token: Utils.nullAddress
        });
        assert.strictEqual(balance.toFixed(), Utils.toDecimals("0.099").toFixed());

        await proxy.claim(Utils.nullAddress);
        balance = await wallet.balanceOf(referrer1);
        assert.strictEqual(balance.toFixed(), "10000.098771512"); // 10000 + 0.099 - gas fee

        balance = await proxy.lastBalance(busd.address);
        assert.strictEqual(balance.toFixed(), Utils.toDecimals("990.1").toFixed());
        balance = await proxy.lastBalance(Utils.nullAddress);
        assert.strictEqual(balance.toFixed(), Utils.toDecimals("9.901").toFixed());
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
        let tokensOut = [Utils.nullAddress];
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


        await busd.approve({ spender: proxy.address, amount: amountIn * 2 });
        let receipt = await proxy.proxyCall({ referrer, campaignId, target, tokensIn, to, tokensOut, data }, 0);
        print(receipt);
        print(proxy.parseTransferForwardEvent(receipt));
        print(proxy.parseTransferBackEvent(receipt));
        print(proxy.parseAddCommissionEvent(receipt));

        let balance = await proxy.lastBalance(busd.address);
        assert.strictEqual(balance.toFixed(), Utils.toDecimals("990.1").toFixed());
        balance = await proxy.lastBalance(Utils.nullAddress);
        assert.strictEqual(balance.toFixed(), Utils.toDecimals("9.901").toFixed());

        balance = await wallet.balanceOf(trader);

        assert.strictEqual(balance.toFixed(2), "9992.54"); // 10000 - 10 - 0.1 - 0.15 + (1000/400) - gas fee*3

        wallet.defaultAccount = referrer1;
        balance = await proxy.getClaimantBalance({
            claimant: referrer1,
            token: busd.address
        });
        assert.strictEqual(balance.toFixed(), Utils.toDecimals("9.9").toFixed());

        await proxy.claim(busd.address);
        balance = await busd.balanceOf(referrer1);
        assert.strictEqual(balance.toFixed(), "19.8");

        balance = await proxy.lastBalance(busd.address);
        assert.strictEqual(balance.toFixed(), Utils.toDecimals("980.2").toFixed());
        balance = await proxy.lastBalance(Utils.nullAddress);
        assert.strictEqual(balance.toFixed(), Utils.toDecimals("9.901").toFixed());
    });

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
    // })
});
