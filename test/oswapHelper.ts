import * as OSWAP from "@scom/oswap-openswap-contract";
import { Contract } from "@ijstech/eth-contract";
import {Wallet, Erc20, BigNumber, Utils, TransactionReceipt} from "@ijstech/eth-wallet";

const TIME_FOR_VOTING = 3;
export async function stakeToVote(deployer:string, staker:string, wallet: Wallet, oswap: OSWAP.IDeploymentContracts){
    let votingConfig = (await oswap.governance.votingConfigs(Utils.stringToBytes32("vote") as string));
    let amount = Utils.fromDecimals(BigNumber.max(votingConfig.minOaxTokenToCreateVote, votingConfig.minQuorum));
    wallet.defaultAccount = deployer;
    await oswap.openSwap.mint({address:staker, amount:amount});
    wallet.defaultAccount = staker;
    await oswap.openSwap.approve({spender:oswap.governance.address, amount:amount});
    await oswap.governance.stake(Utils.toDecimals(amount));
    let wait = (await oswap.governance.minStakePeriod()).toNumber() + 1/*networks[mainChainName].blockTime*/;
    await wallet.setBlockTime(wait);
    await oswap.governance.unlockStake();    
}
export async function newVote(wallet: Wallet, oswap: OSWAP.IDeploymentContracts, executor:Contract, type:string, param:string[]):Promise<OSWAP.Contracts.OAXDEX_VotingContract> {
    let now = <number>(await wallet.web3.eth.getBlock('latest')).timestamp;
    let votingConfig = (await oswap.governance.votingConfigs(Utils.stringToBytes32("vote") as string));
    let quorum = votingConfig.minQuorum;
    let threshold = Utils.toDecimals("0.5");
    let voteEndTime = now + votingConfig.minVoteDuration.toNumber() + TIME_FOR_VOTING;
    let exeDelay = votingConfig.minExeDelay.toNumber();

    let receipt = await oswap.registry.newVote({
        executor: executor.address,
        name: Utils.stringToBytes32(type) as string,
        options: [Utils.stringToBytes32('Y') as string, Utils.stringToBytes32('N') as string],
        quorum: quorum,
        threshold: threshold,
        voteEndTime: voteEndTime,
        executeDelay: exeDelay,
        executeParam: [Utils.stringToBytes32(type) as string].concat(param)
    });
    let events = oswap.governance.parseNewVoteEvent(receipt)[0];
    let voteAddr = events.vote;
    console.log("voting address " + voteAddr);

    let voting = new OSWAP.Contracts.OAXDEX_VotingContract(wallet, voteAddr);

    return voting;
}
export async function voteToPass(voter: string, wallet: Wallet, oswap: OSWAP.IDeploymentContracts, executor:Contract, type:string, param:string[]):Promise<TransactionReceipt> {
    wallet.defaultAccount = voter;
    let voting = await newVote(wallet, oswap, executor, type, param);
    await voting.vote(0);

    let now = <number>(await wallet.web3.eth.getBlock('latest')).timestamp;
    let end = (await voting.voteEndTime()).plus(await voting.executeDelay()).toNumber() + 1/*networks[chain].blockTime*/;
    if (end>now) {
        await wallet.setBlockTime((end-now)*1000);
        await wallet.send(wallet.defaultAccount, 0); // mine one block
    }
    return await voting.execute();
}
export async function initHybridRouter(wallet: Wallet, oswap: OSWAP.IDeploymentContracts) {
    let options = {
        registryAddress: oswap.hybridRouterRegistry.address,
        name: ['Amm', 'Oracle'], 
        factory: [oswap.factory.address, oswap.oracleFactory.address], 
        fee: [998000, 999000], 
        feeBase: [1000000, 1000000], 
        typeCode: [1, 2]
    }

    await OSWAP.initHybridRouterRegistry(wallet, options);
}
export async function ammAddLiquidity(wallet: Wallet, oswap: OSWAP.IDeploymentContracts, admin: string, lp: string, token0: Erc20, token1: Erc20, amount0: number, amount1: number, deadline: number): Promise<TransactionReceipt>{
    if (!token0) {
        token0 = token1;
        token1 = undefined;
        let tmp = amount0;
        amount0 = amount1;
        amount1 = tmp;
    }
    if (!token0) {
        throw new Error('Both tokens are null');
    }
    let weth: string;
    if (!token1) {
        weth = await oswap.router.WETH();
    }

    wallet.defaultAccount = admin;
    await token0.mint({ address: lp, amount: amount0 });
    if (token1) await token1.mint({ address: lp, amount: amount1 });

    wallet.defaultAccount = lp;
    let receipt;
    await token0.approve({ spender: oswap.router.address, amount: amount0 });
    if (token1) await token1.approve({ spender: oswap.router.address, amount: amount1 });
    if (token1) {
        receipt = await oswap.router.addLiquidity({
            tokenA: token0.address,
            tokenB: token1.address,
            amountADesired: Utils.toDecimals(amount0, await token0.decimals),
            amountBDesired: Utils.toDecimals(amount1, await token1.decimals),
            amountAMin: 0,
            amountBMin: 0,
            deadline: deadline,
            to: lp
        });
    } else {
        receipt = await oswap.router.addLiquidityETH({
            token: token0.address,
            amountTokenDesired: Utils.toDecimals(amount0, await token0.decimals),
            amountTokenMin: 0,
            amountETHMin: 0,
            deadline: deadline,
            to: lp
        }, Utils.toDecimals(amount1));
    }
    token0.parseApprovalEvent(receipt);
    wallet.defaultAccount = admin;
    let ammPair = new OSWAP.Contracts.OSWAP_Pair(wallet, await oswap.factory.getPair({ param1: token0.address, param2: token1 ? token1.address : weth }));
    await oswap.hybridRouterRegistry.registerPairByAddress({ factory: oswap.factory.address, pairAddress: ammPair.address });

    return receipt;
}
export async function oracleAddLiquidity(wallet: Wallet, oswap: OSWAP.IDeploymentContracts, admin: string, lp: string, token0: Erc20, token1: Erc20, amount0: number, amount1: number, expire: number, deadline: number): Promise<void>{
    if (!token0) {
        token0 = token1;
        token1 = undefined;
        let tmp = amount0;
        amount0 = amount1;
        amount1 = tmp;
    }
    if (!token0) {
        throw new Error('Both tokens are null');
    }
    let weth: string;
    if (!token1) {
        weth = await oswap.router.WETH();
    }
    
    // let oracle = new MockOracleAdaptor3(wallet);
    // await oracle.deploy({ weth: weth.address, decimals: 18, tokens: [token0.address, token1.address], prices: [Utils.toDecimals(1), Utils.toDecimals(amount0/amount1)] });
    // if (new BigNumber(token0.address.toLowerCase()).lt(token1.address.toLowerCase()))
    //     await voteToPass(admin, wallet, oswap, oswap.executor2, "setOracle", [Utils.addressToBytes32Right(token0.address, true), Utils.addressToBytes32Right(token1.address, true), Utils.addressToBytes32Right(oracle.address, true)]);
    // else
    //     await voteToPass(admin, wallet, oswap, oswap.executor2, "setOracle", [Utils.addressToBytes32Right(token1.address, true), Utils.addressToBytes32Right(token0.address, true), Utils.addressToBytes32Right(oracle.address, true)]);


    wallet.defaultAccount = admin;
    let oswapAmount = 200;
    await token0.mint({ address: lp, amount: amount0 });
    await token1.mint({ address: lp, amount: amount1 });
    await oswap.openSwap.mint({ address: lp, amount: oswapAmount * 2 });

    wallet.defaultAccount = lp;
    await token0.approve({ spender: oswap.oracleLiquidityProvider.address, amount: amount0 });
    await token1.approve({ spender: oswap.oracleLiquidityProvider.address, amount: amount1 });
    await oswap.openSwap.approve({ spender: oswap.oracleLiquidityProvider.address, amount: Utils.toDecimals(oswapAmount * 2) });

    if (token1) {
        await oswap.oracleLiquidityProvider.addLiquidity({
            tokenA: token0.address,
            tokenB: token1.address,
            addingTokenA: false,
            staked: Utils.toDecimals(100),
            afterIndex: 0,
            amountIn: Utils.toDecimals(amount1, await token1.decimals),
            expire: expire,
            enable: true,
            deadline: deadline
        });
        await oswap.oracleLiquidityProvider.addLiquidity({
            tokenA: token0.address,
            tokenB: token1.address,
            addingTokenA: true,
            staked: Utils.toDecimals(100),
            afterIndex: 0,
            amountIn: Utils.toDecimals(amount0, await token0.decimals),
            expire: expire,
            enable: true,
            deadline: deadline
        });
    } else {
        await oswap.oracleLiquidityProvider.addLiquidityETH({
            tokenA: token0.address,
            addingTokenA: false,
            staked: Utils.toDecimals(100),
            afterIndex: 0,
            amountAIn: 0,
            expire: expire,
            enable: true,
            deadline: deadline
        }, Utils.toDecimals(amount1));
        await oswap.oracleLiquidityProvider.addLiquidityETH({
            tokenA: token0.address,
            addingTokenA: true,
            staked: Utils.toDecimals(100),
            afterIndex: 0,
            amountAIn: Utils.toDecimals(amount0, await token0.decimals),
            expire: expire,
            enable: true,
            deadline: deadline
        });
    }

    wallet.defaultAccount = admin;
    let oraclePair = new OSWAP.Contracts.OSWAP_OraclePair(wallet, await oswap.oracleFactory.getPair({ param1: token0.address, param2: token1 ? token1.address : weth }));
    await oswap.hybridRouterRegistry.registerPairByAddress({ factory: oswap.oracleFactory.address, pairAddress: oraclePair.address });

}