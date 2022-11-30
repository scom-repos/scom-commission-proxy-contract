import 'mocha';
import {print} from './helper';

import Config from './config';
import networks from "../data/networks";

import {Utils, Wallet, Contract, BigNumber, TransactionReceipt, Erc20} from "@ijstech/eth-wallet";
import * as OSWAP from "@openswap/sdk";
import {WETH9 as WETH, MockPriceOracle, MockErc20, MockOracleAdaptor3} from "./src/contracts";

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

function isLocalNetwork(chainName:string){
    return chainName.includes("ganache")||chainName.includes("Ganache")||chainName.includes("hardhat")||chainName.includes("Hardhat");
}
async function voteToPass(chain:string, wallet: Wallet, oswapContracts: OSWAP.IDeploymentContracts, executor, type, quorum, param):Promise<TransactionReceipt> {
    let origAccount = wallet.defaultAccount;
    wallet.account = Config.oswapAccounts[0];
    let voting = await newVote(chain, wallet, oswapContracts, executor, type, quorum, param);
    await voting.vote(0);

    let now = <number>(await wallet.web3.eth.getBlock('latest')).timestamp;
    let end = (await voting.voteEndTime()).plus(await voting.executeDelay()).toNumber() + networks[chain].blockTime;
if (end>now) {
        await wallet.setBlockTime(end-now+1);
        // console.log("wait for " + (end-now+1) + " sec")
        // await Utils.sleep((end-now)*1000);
        // if (isLocalNetwork(chain))
        //     await wallet.send(wallet.defaultAccount, 0); // mine one block
    }
    wallet.defaultAccount = origAccount;
    return await voting.execute();
}
async function newVote(chain:string, wallet: Wallet, oswapContracts: OSWAP.IDeploymentContracts, executor, type, quorum, param):Promise<OSWAP.Contracts.OAXDEX_VotingContract> {
    if (isLocalNetwork(chain))
        await wallet.send(wallet.defaultAccount, 0); // mine one block
    let now = <number>(await wallet.web3.eth.getBlock('latest')).timestamp;
    let votingConfig = (await oswapContracts.governance.votingConfigs(Utils.stringToBytes32("vote") as string));
    quorum = votingConfig.minQuorum;
    let threshold = Utils.toDecimals("0.5");
    let voteEndTime = now + votingConfig.minVoteDuration.toNumber() + (isLocalNetwork(chain) ? TIME_FOR_VOTING : 4*networks[chain].blockTime);
    let exeDelay = votingConfig.minExeDelay.toNumber();

    let receipt = await oswapContracts.registry.newVote({
        executor: executor.address,
        name: Utils.stringToBytes32(type) as string,
        options: [Utils.stringToBytes32('Y') as string, Utils.stringToBytes32('N') as string],
        quorum: quorum,
        threshold: threshold,
        voteEndTime: voteEndTime,
        executeDelay: exeDelay,
        executeParam: [Utils.stringToBytes32(type) as string].concat(param)
    });
    let events = oswapContracts.governance.parseNewVoteEvent(receipt)[0];
    let voteAddr = events.vote;
    console.log("voting address " + voteAddr);

    let voting = new OSWAP.Contracts.OAXDEX_VotingContract(wallet, voteAddr);

    return voting;
}
async function expectToFail<Type>(f:Promise<Type>, error:string|string[]): Promise<void> {
    try {
        await f;
        throw new Error("Exception not thrown");
    } catch(e) {
        if ((Array.isArray(error) && error.some(f=>e.message.includes(f))) ||
            e.message.includes(error)){
            return console.log("exception thrown as expected");
        } else {
            throw e;
        }
    }
}
function genGanache(idx: number) {
    let networkName = Config.networks[idx].chainName;
    let networkId:number = networks[networkName].networkId;;
    return Ganache.provider({chainId:networkId, network_id:networkId, accounts:Config.networks[idx].accounts.map(e=>{
        return {secretKey: e.privateKey, balance: "0x"+Utils.toDecimals(10000).toString(16)};
    })});
}
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

    let oswapContracts: OSWAP.IDeploymentContracts;

    let weth: WETH;
    let busd: Erc20;
    let cake: Erc20;
    let busdUsdOracle: MockPriceOracle;

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
    async function checkBalance(wallet:Wallet, chain:string, oswap:OSWAP.OpenSwap, address:string, amount:BigNumber){
        if ((await oswap.balanceOf(address)).lt(amount)){
            if (isLocalNetwork(chain)){
                let _address = wallet.defaultAccount;
                wallet.defaultAccount = admin;//Config.oswapAccounts[0].address;
                await oswap.mint({address:address,amount:amount.times(10)});
                wallet.defaultAccount = _address;
            } else {
                console.log(address + " doesn't have enough oswap");
                return process.exit(0);
            }
        }
    }
    before('Deploy oswap\'s contracts', async function(){
        // deploy oswap's contracts
        let contracts = Address[chainName].openswap;
        if (!contracts) {
            console.log("deploy oswap contracts on main chain");
            contracts = await OSWAP.deploy(wallet, Object.assign({tokens: {weth: weth.address}}, Config.oswapDeployOptions));
            Address[chainName].openswap = contracts;
            fs.writeFileSync(outputPath, JSON.stringify(Address,null,"    "), "utf8");

            let profile = Config.oswapDeployOptions.govOptions.profiles;
            let amount = BigNumber.max(profile.minGovTokenToCreateVote[1], profile.minQuorum[1]);
            let oswap = new OSWAP.Contracts.OpenSwap(wallet, contracts.oswap);
        }
        oswapContracts = OSWAP.toDeploymentContracts(wallet, contracts);

        if ((await oswapContracts.governance.stakeOf(Config.oswapAccounts[0].address)).toNumber() == 0) {
            let votingConfig = (await oswapContracts.governance.votingConfigs(Utils.stringToBytes32("vote") as string));
            let amount = Utils.fromDecimals(BigNumber.max(votingConfig.minOaxTokenToCreateVote, votingConfig.minQuorum));
            await checkBalance(wallet, chainName, oswapContracts.openSwap, Config.oswapAccounts[0].address, amount);

            wallet.account = Config.oswapAccounts[0];
            await oswapContracts.openSwap.approve({spender:oswapContracts.governance.address, amount:amount});
            await oswapContracts.governance.stake(Utils.toDecimals(amount));
            let wait = (await oswapContracts.governance.minStakePeriod()).toNumber() + networks[chainName].blockTime + 1;
            await wallet.setBlockTime(wait);
            // console.log("wait for " + wait + " sec")
            // await Utils.sleep(wait*1000);
            // if (isLocalNetwork(chainName))
            //     await wallet.send(Config.oswapAccounts[0].address, 0); // mine one block
            await oswapContracts.governance.unlockStake();
        }

        if (!(await oswapContracts.governance.isVotingExecutor(oswapContracts.executor2.address))) {
            await voteToPass(chainName, wallet, oswapContracts, oswapContracts.executor, "setVotingExecutor", "1000000", [Utils.addressToBytes32Right(oswapContracts.executor2.address, true), Utils.numberToBytes32(1, true)]);
        }
        if (!(await oswapContracts.governance.isVotingExecutor(oswapContracts.hybridRouterRegistry.address))) {
            await voteToPass(chainName, wallet, oswapContracts, oswapContracts.executor, "setVotingExecutor", "1000000", [Utils.addressToBytes32Right(oswapContracts.hybridRouterRegistry.address, true), Utils.numberToBytes32(1, true)]);
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

        if (!Address[chainName].dependent.CAKE) {
            let token = new MockErc20(wallet);
            await token.deploy({name:"CAKE", symbol:"CAKE", decimals:18});
            Address[chainName].dependent.CAKE = token.address;
            fs.writeFileSync(outputPath, JSON.stringify(Address,null,"    "), "utf8");
            console.log("CAKE " + token.address);
        }
        cake = new Erc20(wallet, Address[chainName].dependent.CAKE);

        if (isLocalNetwork(chainName)){
            if ((await oswapContracts.factory.getPair({param1:busd.address, param2:cake.address})) == Utils.nullAddress) {
                wallet.defaultAccount = admin;
                let cakeAmount = CAKE_POOL_SIZE;
                let busdAmount = cakeAmount * CAKE_PRICE_USD;
                await busd.mint({address: lp2, amount: busdAmount});
                await cake.mint({address: lp2, amount: cakeAmount});

                wallet.defaultAccount = lp2;
                await busd.approve({spender: oswapContracts.router.address, amount: busdAmount});
                await cake.approve({spender: oswapContracts.router.address, amount: cakeAmount});
                await oswapContracts.router.addLiquidity({
                    tokenA: busd.address,
                    tokenB: cake.address,
                    amountADesired: Utils.toDecimals(busdAmount, await busd.decimals),
                    amountBDesired: Utils.toDecimals(cakeAmount, await cake.decimals),
                    amountAMin: 0,
                    amountBMin: 0,
                    deadline: 100000000000,
                    to: lp2
                });
            }
            if ((await oswapContracts.factory.getPair({param1:busd.address, param2:Address[chainName].weth})) == Utils.nullAddress) {
                wallet.defaultAccount = admin;
                let wethAmount = WETH_POOL_SIZE;
                let busdAmount = wethAmount * BNB_PRICE_USD;
                await busd.mint({address: lp2, amount: busdAmount});

                wallet.defaultAccount = lp2;
                await busd.approve({spender: oswapContracts.router.address, amount: busdAmount});
                await oswapContracts.router.addLiquidityETH({
                    token: busd.address,
                    amountTokenDesired: Utils.toDecimals(busdAmount, await busd.decimals),
                    amountTokenMin: 0,
                    amountETHMin: 0,
                    deadline: 100000000000,
                    to: lp2
                }, Utils.toDecimals(wethAmount));
            }
            if ((await oswapContracts.oracleFactory.oracles({param1:busd.address, param2:cake.address})) == Utils.nullAddress) {
                let oracle = new MockOracleAdaptor3(wallet);
                await oracle.deploy({weth:weth.address, decimals:18, tokens:[busd.address, cake.address], prices:[Utils.toDecimals(1),Utils.toDecimals(CAKE_PRICE_USD)]});
                if (new BigNumber(busd.address.toLowerCase()).lt(cake.address.toLowerCase()))
                    await voteToPass(chainName, wallet, oswapContracts, oswapContracts.executor2, "setOracle", "1000000", [Utils.addressToBytes32Right(busd.address, true), Utils.addressToBytes32Right(cake.address, true),Utils.addressToBytes32Right(oracle.address, true)]);
                else
                    await voteToPass(chainName, wallet, oswapContracts, oswapContracts.executor2, "setOracle", "1000000", [Utils.addressToBytes32Right(cake.address, true), Utils.addressToBytes32Right(busd.address, true),Utils.addressToBytes32Right(oracle.address, true)]);
            }
            if ((await oswapContracts.oracleFactory.getPair({param1:busd.address, param2:cake.address})) == Utils.nullAddress) {
                wallet.defaultAccount = admin;
                let cakeAmount = CAKE_POOL_SIZE;
                let busdAmount = cakeAmount * CAKE_PRICE_USD;
                let oswapAmount = 200;
                await busd.mint({address: lp2, amount: busdAmount});
                await cake.mint({address: lp2, amount: cakeAmount});
                await oswapContracts.openSwap.mint({address: lp2, amount: oswapAmount*2});

                wallet.defaultAccount = lp2;
                await busd.approve({spender: oswapContracts.oracleLiquidityProvider.address, amount: busdAmount});
                await cake.approve({spender: oswapContracts.oracleLiquidityProvider.address, amount: cakeAmount});
                await oswapContracts.openSwap.approve({spender: oswapContracts.oracleLiquidityProvider.address, amount: Utils.toDecimals(oswapAmount*2)});
                await oswapContracts.oracleLiquidityProvider.addLiquidity({
                    tokenA: busd.address,
                    tokenB: cake.address,
                    addingTokenA: false,
                    staked: Utils.toDecimals(100),
                    afterIndex: 0,
                    amountIn: Utils.toDecimals(cakeAmount, await cake.decimals),
                    expire: Math.round(Date.now()/1000) + 100000,
                    enable: true,
                    deadline: Math.round(Date.now()/1000) + 100000
                });
                await oswapContracts.oracleLiquidityProvider.addLiquidity({
                    tokenA: busd.address,
                    tokenB: cake.address,
                    addingTokenA: true,
                    staked: Utils.toDecimals(100),
                    afterIndex: 0,
                    amountIn: Utils.toDecimals(busdAmount, await busd.decimals),
                    expire: Math.round(Date.now()/1000) + 100000,
                    enable: true,
                    deadline: Math.round(Date.now()/1000) + 100000
                });
            }
            wallet.defaultAccount = admin

            // hybrid router
            let hybridRouterRegistry = oswapContracts.hybridRouterRegistry;
            let hybridRouter = oswapContracts.hybridRouter;
            if (hybridRouter) {
            }else {
                if (Address[chainName].dependent.hybridRouter) {
                    hybridRouterRegistry = new OSWAP.Contracts.OSWAP_HybridRouterRegistry(wallet, Address[chainName].openswap.hybridRouterRegistry);
                    hybridRouter = new OSWAP.Contracts.OSWAP_HybridRouter2(wallet, Address[chainName].openswap.hybridRouter);
                } else {
                    hybridRouterRegistry = new OSWAP.Contracts.OSWAP_HybridRouterRegistry(wallet);
                    await hybridRouterRegistry.deploy(oswapContracts.governance.address);
                    hybridRouter = new OSWAP.Contracts.OSWAP_HybridRouter2(wallet);
                    await hybridRouter.deploy({registry: hybridRouterRegistry.address, WETH: weth.address})

                    await voteToPass(chainName, wallet, oswapContracts, oswapContracts.executor, "setVotingExecutor", "1000000", [Utils.addressToBytes32Right(hybridRouterRegistry.address, true), Utils.numberToBytes32(1, true)]);
                    Address[chainName].dependent.hybridRouterRegistry = hybridRouterRegistry.address;
                    Address[chainName].dependent.hybridRouter = hybridRouter.address;
                    fs.writeFileSync(outputPath, JSON.stringify(Address,null,"    "), "utf8");
                    console.log("hybridRouterRegistry " + hybridRouterRegistry.address);
                    console.log("hybridRouter " + hybridRouter.address);
                }
            }

            if ((await hybridRouterRegistry.protocols(oswapContracts.factory.address)).typeCode.toNumber() == 0) {
                wallet.defaultAccount = admin;
                let name = Utils.stringToBytes32("AMM") as string;
                    await voteToPass(chainName, wallet, oswapContracts, hybridRouterRegistry, "registerProtocol", "1000000", [name, Utils.addressToBytes32Right(oswapContracts.factory.address, true), Utils.numberToBytes32(100000, true),  Utils.numberToBytes32(100000, true), Utils.numberToBytes32(1, true)]);
            }
            let ammPair = new OSWAP.Contracts.OSWAP_Pair(wallet, await oswapContracts.factory.getPair({param1:busd.address,param2:cake.address}));
            if ((await hybridRouterRegistry.pairs(ammPair.address)).factory == Utils.nullAddress)
                await hybridRouterRegistry.registerPairByAddress({factory:oswapContracts.factory.address, pairAddress:ammPair.address});
            ammPair = new OSWAP.Contracts.OSWAP_Pair(wallet, await oswapContracts.factory.getPair({param1:busd.address,param2:Address[chainName].weth}));
            if ((await hybridRouterRegistry.pairs(ammPair.address)).factory == Utils.nullAddress)
                await hybridRouterRegistry.registerPairByAddress({factory:oswapContracts.factory.address, pairAddress:ammPair.address});

            if ((await hybridRouterRegistry.protocols(oswapContracts.oracleFactory.address)).typeCode.toNumber() == 0) {
                wallet.defaultAccount = admin;
                let name = Utils.stringToBytes32("ORACLE") as string;
                await voteToPass(chainName, wallet, oswapContracts, hybridRouterRegistry, "registerProtocol", "1000000", [name, Utils.addressToBytes32Right(oswapContracts.oracleFactory.address, true), Utils.numberToBytes32(100000, true),  Utils.numberToBytes32(100000, true), Utils.numberToBytes32(2, true)]);
            }
            let oraclePair = new OSWAP.Contracts.OSWAP_OraclePair(wallet, await oswapContracts.oracleFactory.getPair({param1:busd.address,param2:cake.address}));
            if ((await hybridRouterRegistry.pairs(oraclePair.address)).factory == Utils.nullAddress)
                await hybridRouterRegistry.registerPairByAddress({factory:oswapContracts.oracleFactory.address, pairAddress:oraclePair.address});
            if (!(await oswapContracts.oracleFactory.isWhitelisted(hybridRouter.address)))
                await voteToPass(chainName, wallet, oswapContracts, oswapContracts.executor2, "setWhiteList", "1000000", [Utils.addressToBytes32Right(hybridRouter.address, true), Utils.numberToBytes32(1, true)]);
        }

        // price oracle
        if (Address[chainName].dependent.busdUsdOracle) {
            busdUsdOracle = new MockPriceOracle(wallet, Address[chainName].dependent.busdUsdOracle);
        } else {
            wallet.defaultAccount = admin;
            busdUsdOracle = new MockPriceOracle(wallet);
            await busdUsdOracle.deploy();
            await busdUsdOracle.setPrice(Utils.toDecimals(1));
            console.log("busdUsdOracle " + busdUsdOracle.address);
            Address[chainName].dependent.busdUsdOracle = busdUsdOracle.address;
        }
    });

    let proxy: Contracts.Proxy;
    let distributor: Contracts.Distributor;
    it('deploy', async function(){
        let result = await deploy(wallet);

        proxy = new Contracts.Proxy(wallet, result.proxy);
        distributor = new Contracts.Distributor(wallet, result.distributor);
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
                ]
            }
        ];
        let to = trader;
        let tokensOut = [cake.address];

        await busd.approve({spender:proxy.address, amount:amountIn * 2});
        let receipt = await proxy.proxyCall({target,tokensIn,to,tokensOut,data}, 0);
        print(receipt);
        print(proxy.parseTransferForwardEvent(receipt));
        print(proxy.parseTransferBackEvent(receipt));
        print(distributor.parseAddCommissionEvent(receipt));
        let balance = await cake.balanceOf(trader);
        assert.strictEqual(balance.toFixed(), "83.326389467544371302");

        wallet.defaultAccount = referrer1;
        balance = await distributor.distributions({param1:referrer1, param2:busd.address});
        assert.strictEqual(balance.toFixed(), "10000000000000000000");

        await distributor.claim(busd.address);
        balance = await busd.balanceOf(referrer1); 
        assert.strictEqual(balance.toFixed(), "10");

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
                ]
            }
        ];
        let to = trader;
        let tokensOut = [busd.address];

        let receipt = await proxy.proxyCall({target,tokensIn,to,tokensOut,data}, Utils.toDecimals(amountIn + 0.10 + 0.15, decimals));
        print(receipt);
        print(proxy.parseTransferForwardEvent(receipt));
        print(proxy.parseTransferBackEvent(receipt));
        print(distributor.parseAddCommissionEvent(receipt));
        let balance = await busd.balanceOf(trader);
        assert.strictEqual(balance.toFixed(), "4935.396039603960396039");

        wallet.defaultAccount = referrer1;
        balance = await distributor.distributions({param1:referrer1, param2:Utils.nullAddress});
        assert.strictEqual(balance.toFixed(), "100000000000000000");

        await distributor.claim(Utils.nullAddress);
        balance = await wallet.balanceOf(referrer1); 
        assert.strictEqual(balance.toFixed(), "10000.099798232"); // 10000 + 0.1 - gas fee
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
                ]
            }
        ];
        let to = trader;
        let tokensOut = [Utils.nullAddress];

        await busd.approve({spender:proxy.address, amount:amountIn * 2});
        let receipt = await proxy.proxyCall({target,tokensIn,to,tokensOut,data}, 0);
        print(receipt);
        print(proxy.parseTransferForwardEvent(receipt));
        print(proxy.parseTransferBackEvent(receipt));
        print(distributor.parseAddCommissionEvent(receipt));
        let balance = await wallet.balanceOf(trader);
        assert.strictEqual(balance.toFixed(), "9992.292043855235979152"); 

        wallet.defaultAccount = referrer1;
        balance = await distributor.distributions({param1:referrer1, param2:busd.address});
        assert.strictEqual(balance.toFixed(), "10000000000000000000");

        await distributor.claim(Utils.nullAddress);
        balance = await busd.balanceOf(referrer1); 
        assert.strictEqual(balance.toFixed(), "10");
    });
});
