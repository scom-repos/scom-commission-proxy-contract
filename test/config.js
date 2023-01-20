const oswapDeployOptions = {
    govOptions: {
        minStakePeriod: 1,
        tradeFee: 0.28,
        protocolFee: 0,
        protocolFeeTo: '',
        profiles: {
            name: ['poll','vote','addOldOracleToNewPair'],
            minExeDelay: [1,1,1],
            minVoteDuration: [0,0,0],
            maxVoteDuration: [1209600,1209600,1209600],
            minGovTokenToCreateVote: ['100','200000','100'],
            minQuorum: ['0','1000000','100']
        }
    },
    hybridRouter: {
    }
};

const Accounts = require('./hardhat-accounts.json');
const Accounts2 = Accounts;

module.exports = {
    oswapDeployOptions: oswapDeployOptions,
    oswapAccounts:[
        Accounts[0]
    ],
    admin: Accounts[0],
    networks: [
        {
            chainName: 'localGanache',
            // chainName: 'ganache',
            // chainName: 'hardhat',
            // chainName: 'localHardhat',
            genesisBlock: 0,
            confirmationBlocks: 2,
            accounts: Accounts
        }
    ]
};