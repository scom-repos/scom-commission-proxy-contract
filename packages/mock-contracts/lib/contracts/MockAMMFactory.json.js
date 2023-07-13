"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "abi": [
        { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "contract IERC20", "name": "token0", "type": "address" }, { "indexed": true, "internalType": "contract IERC20", "name": "token1", "type": "address" }, { "indexed": false, "internalType": "contract MockAMMPair", "name": "pair", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "newSize", "type": "uint256" }], "name": "PairCreated", "type": "event" },
        { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "allPairs", "outputs": [{ "internalType": "contract MockAMMPair", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
        { "inputs": [], "name": "allPairsLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
        { "inputs": [{ "internalType": "contract IERC20", "name": "token0", "type": "address" }, { "internalType": "contract IERC20", "name": "token1", "type": "address" }], "name": "createPair", "outputs": [{ "internalType": "contract MockAMMPair", "name": "pair", "type": "address" }], "stateMutability": "nonpayable", "type": "function" }
    ],
    "bytecode": "608060405234801561001057600080fd5b50611290806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80631e3dd18b14610046578063574f2ba314610083578063c9c6539614610094575b600080fd5b61005961005436600461022c565b6100a7565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b60015460405190815260200161007a565b6100596100a236600461026e565b6100de565b600181815481106100b757600080fd5b60009182526020909120015473ffffffffffffffffffffffffffffffffffffffff16905081565b600082826040516100ee9061021f565b73ffffffffffffffffffffffffffffffffffffffff928316815291166020820152604001604051809103906000f08015801561012e573d6000803e3d6000fd5b506001805480820182557fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf601805473ffffffffffffffffffffffffffffffffffffffff8481167fffffffffffffffffffffffff00000000000000000000000000000000000000009283168117909355878116600081815260208181526040808320948b168084529482528083208054871688179055828252808320848452825291829020805490951686179094559454855194855292840192909252939450917f0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9910160405180910390a392915050565b610fb9806102a283390190565b60006020828403121561023e57600080fd5b5035919050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461026957600080fd5b919050565b6000806040838503121561028157600080fd5b61028a83610245565b915061029860208401610245565b9050925092905056fe60c060405234801561001057600080fd5b50604051610fb9380380610fb983398101604081905261002f91610094565b6001600160a01b038216158015906100585750806001600160a01b0316826001600160a01b0316105b61006157600080fd5b6001600160a01b039182166080521660a0526100c7565b80516001600160a01b038116811461008f57600080fd5b919050565b600080604083850312156100a757600080fd5b6100b083610078565b91506100be60208401610078565b90509250929050565b60805160a051610e95610124600039600081816102360152818161038a0152818161047d0152818161057301526106fd01526000818161012d015281816102a5015281816104360152818161053101526106100152610e956000f3fe608060405234801561001057600080fd5b50600436106100a35760003560e01c80635a76f25e11610076578063c5700a021161005b578063c5700a02146101ec578063d21220a714610231578063fff6cae91461025857600080fd5b80635a76f25e146101ad5780639cd441da146101d957600080fd5b8063022c0d9f146100a85780630902f1ac146100bd5780630dfe168114610128578063443cb4bc14610174575b600080fd5b6100bb6100b6366004610c82565b610260565b005b600054604080516dffffffffffffffffffffffffffff80841682526e01000000000000000000000000000084041660208201527c010000000000000000000000000000000000000000000000000000000090920463ffffffff16908201526060015b60405180910390f35b61014f7f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161011f565b60005461018e906dffffffffffffffffffffffffffff1681565b6040516dffffffffffffffffffffffffffff909116815260200161011f565b60005461018e906e01000000000000000000000000000090046dffffffffffffffffffffffffffff1681565b6100bb6101e7366004610d31565b610517565b60005461021c907c0100000000000000000000000000000000000000000000000000000000900463ffffffff1681565b60405163ffffffff909116815260200161011f565b61014f7f000000000000000000000000000000000000000000000000000000000000000081565b6100bb6105e2565b600080546040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201526dffffffffffffffffffffffffffff909116907f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16906370a0823190602401602060405180830381865afa158015610301573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103259190610d53565b61032f9190610d6c565b600080546040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015292935090916e0100000000000000000000000000009091046dffffffffffffffffffffffffffff16907f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16906370a0823190602401602060405180830381865afa1580156103e6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061040a9190610d53565b6104149190610d6c565b9050861561045d5761045d73ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000168689610832565b85156104a4576104a473ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000168688610832565b60408051838152602081018390529081018890526060810187905273ffffffffffffffffffffffffffffffffffffffff86169033907fd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d8229060800160405180910390a361050e6105e2565b50505050505050565b61055973ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001633308561090b565b61059b73ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001633308461090b565b604080518381526020810183905233917f4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f910160405180910390a26105de6105e2565b5050565b6040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201527f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16906370a0823190602401602060405180830381865afa15801561066c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106909190610d53565b600080547fffffffffffffffffffffffffffffffffffff0000000000000000000000000000166dffffffffffffffffffffffffffff929092169190911790556040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201527f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16906370a0823190602401602060405180830381865afa158015610759573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061077d9190610d53565b600080546dffffffffffffffffffffffffffff9081166e01000000000000000000000000000093821684027bffffffffffffffffffffffffffffffffffffffffffffffffffffffff16177c01000000000000000000000000000000000000000000000000000000004263ffffffff16021791829055604080518383168152939092041660208301527f1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1910160405180910390a1565b60405173ffffffffffffffffffffffffffffffffffffffff83166024820152604481018290526109069084907fa9059cbb00000000000000000000000000000000000000000000000000000000906064015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff000000000000000000000000000000000000000000000000000000009093169290921790915261096f565b505050565b60405173ffffffffffffffffffffffffffffffffffffffff808516602483015283166044820152606481018290526109699085907f23b872dd0000000000000000000000000000000000000000000000000000000090608401610884565b50505050565b60006109d1826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff16610a809092919063ffffffff16565b80519091501561090657808060200190518101906109ef9190610dac565b610906576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f7420737563636565640000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b6060610a8f8484600085610a99565b90505b9392505050565b606082471015610b2b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c00000000000000000000000000000000000000000000000000006064820152608401610a77565b73ffffffffffffffffffffffffffffffffffffffff85163b610ba9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610a77565b6000808673ffffffffffffffffffffffffffffffffffffffff168587604051610bd29190610df2565b60006040518083038185875af1925050503d8060008114610c0f576040519150601f19603f3d011682016040523d82523d6000602084013e610c14565b606091505b5091509150610c24828286610c2f565b979650505050505050565b60608315610c3e575081610a92565b825115610c4e5782518084602001fd5b816040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a779190610e0e565b600080600080600060808688031215610c9a57600080fd5b8535945060208601359350604086013573ffffffffffffffffffffffffffffffffffffffff81168114610ccc57600080fd5b9250606086013567ffffffffffffffff80821115610ce957600080fd5b818801915088601f830112610cfd57600080fd5b813581811115610d0c57600080fd5b896020828501011115610d1e57600080fd5b9699959850939650602001949392505050565b60008060408385031215610d4457600080fd5b50508035926020909101359150565b600060208284031215610d6557600080fd5b5051919050565b81810381811115610da6577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b92915050565b600060208284031215610dbe57600080fd5b81518015158114610a9257600080fd5b60005b83811015610de9578181015183820152602001610dd1565b50506000910152565b60008251610e04818460208701610dce565b9190910192915050565b6020815260008251806020840152610e2d816040850160208701610dce565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016040019291505056fea26469706673582212202b05060a67613acdc7cf8e4bd68c6ab79eff179f4333611b4b3a54749db7ca9f64736f6c63430008110033a2646970667358221220a3c7bba2097b044e7588759fcc917f67acec35ba48158b69aba33d05c526d92e64736f6c63430008110033"
};
