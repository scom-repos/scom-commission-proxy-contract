define("@scom/scom-commission-proxy-contract/contracts/Proxy.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-commission-proxy-contract/contracts/Proxy.json.ts'/> 
    exports.default = {
        "abi": [
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "AddCommission", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Claim", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Skim", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "target", "type": "address" }, { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "TransferBack", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "target", "type": "address" }, { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "commissions", "type": "uint256" }], "name": "TransferForward", "type": "event" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20[]", "name": "tokens", "type": "address[]" }], "name": "claimMultiple", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "claimantIdCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "claimantIds", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "claimantsInfo", "outputs": [{ "internalType": "address", "name": "claimant", "type": "address" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "distributions", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct Proxy.Commission[]", "name": "commissions", "type": "tuple[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "ethIn", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "fromId", "type": "uint256" }, { "internalType": "uint256", "name": "count", "type": "uint256" }], "name": "getClaimantsInfo", "outputs": [{ "components": [{ "internalType": "address", "name": "claimant", "type": "address" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }], "internalType": "struct Proxy.ClaimantInfo[]", "name": "claimantInfoList", "type": "tuple[]" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "lastBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "components": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "directTransfer", "type": "bool" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct Proxy.Commission[]", "name": "commissions", "type": "tuple[]" }, { "internalType": "uint256", "name": "totalCommissions", "type": "uint256" }], "internalType": "struct Proxy.TokensIn[]", "name": "tokensIn", "type": "tuple[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "contract IERC20[]", "name": "tokensOut", "type": "address[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "proxyCall", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20[]", "name": "tokens", "type": "address[]" }], "name": "skim", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "components": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "directTransfer", "type": "bool" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct Proxy.Commission[]", "name": "commissions", "type": "tuple[]" }, { "internalType": "uint256", "name": "totalCommissions", "type": "uint256" }], "internalType": "struct Proxy.TokensIn", "name": "tokensIn", "type": "tuple" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "tokenIn", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "stateMutability": "payable", "type": "receive" }
        ],
        "bytecode": "608060405234801561001057600080fd5b50612530806100206000396000f3fe6080604052600436106100cb5760003560e01c8063b316d71411610074578063ee42d3a31161004e578063ee42d3a314610292578063f303ad6e146102bf578063fddaea46146102df57600080fd5b8063b316d714146101d3578063b60c164c146101e9578063d2ef84641461020957600080fd5b8063504ffe52116100a5578063504ffe52146101425780637c93df2b1461018857806383e40a511461019b57600080fd5b806301417e7b146100d7578063188ff72b146100ec5780631e83409a1461012257600080fd5b366100d257005b600080fd5b6100ea6100e5366004611f33565b6102ff565b005b3480156100f857600080fd5b5061010c610107366004611fe0565b6104a9565b6040516101199190612002565b60405180910390f35b34801561012e57600080fd5b506100ea61013d366004612074565b6105d2565b34801561014e57600080fd5b5061017a61015d366004612091565b600260209081526000928352604080842090915290825290205481565b604051908152602001610119565b6100ea610196366004612116565b6105de565b3480156101a757600080fd5b5061017a6101b6366004612091565b600460209081526000928352604080842090915290825290205481565b3480156101df57600080fd5b5061017a60005481565b3480156101f557600080fd5b506100ea6102043660046121d1565b610d99565b34801561021557600080fd5b5061025f610224366004612213565b60036020526000908152604090208054600182015460029092015473ffffffffffffffffffffffffffffffffffffffff918216929091169083565b6040805173ffffffffffffffffffffffffffffffffffffffff948516815293909216602084015290820152606001610119565b34801561029e57600080fd5b5061017a6102ad366004612074565b60016020526000908152604090205481565b3480156102cb57600080fd5b506100ea6102da3660046121d1565b610f81565b3480156102eb57600080fd5b506100ea6102fa36600461222c565b610fce565b600082815b818110156103d1573686868381811061031f5761031f6122aa565b90506040020190508060200135846103379190612308565b93506103556103496020830183612074565b60008360200135611344565b7fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef6103836020830183612074565b6040805173ffffffffffffffffffffffffffffffffffffffff909216825260006020838101919091528401359082015260600160405180910390a150806103c981612321565b915050610304565b5060006103de8334612359565b600080805260016020527fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb498054929350859290919061041e908490612308565b9091555050604080513381526020810183905290810184905260009073ffffffffffffffffffffffffffffffffffffffff8916907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a3600080855186602001848b5af18060000361049e573d6000803e3d6000fd5b503d6000803e3d6000f35b60608167ffffffffffffffff8111156104c4576104c4611e59565b60405190808252806020026020018201604052801561052d57816020015b60408051606081018252600080825260208083018290529282015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9092019101816104e25790505b5090508260005b838110156105ca576000828152600360209081526040918290208251606081018452815473ffffffffffffffffffffffffffffffffffffffff9081168252600183015416928101929092526002015491810191909152835184908390811061059e5761059e6122aa565b602002602001018190525081806105b490612321565b92505080806105c290612321565b915050610534565b505092915050565b6105db816114e6565b50565b846000805b82811015610adc57368989838181106105fe576105fe6122aa565b9050602002810190610610919061236c565b905060008061062260608401846123aa565b9050905060005b8181101561071b573661063f60608601866123aa565b8381811061064f5761064f6122aa565b90506040020190508060200135846106679190612308565b93506106906106796020830183612074565b6106866020880188612074565b8360200135611344565b7fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef6106be6020830183612074565b6106cb6020880188612074565b6040805173ffffffffffffffffffffffffffffffffffffffff9384168152929091166020838101919091528401359082015260600160405180910390a1508061071381612321565b915050610629565b5060009050816001826107316020870187612074565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461077a9190612308565b909155506000905061078f6020850185612074565b73ffffffffffffffffffffffffffffffffffffffff160361089c578415610817576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f6d6f7265207468616e206f6e6520455448207472616e7366657200000000000060448201526064015b60405180910390fd5b82602001353414610884576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f45544820616d6f756e74206e6f74206d61746368656400000000000000000000604482015260640161080e565b610892826020850135612359565b9050809450610a5c565b6108ac6060840160408501612420565b156109845760006108cd6108c36020860186612074565b8560800135611603565b905082811015610939576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f636f6d6d697373696f6e20616d6f756e74206e6f74206d617463686564000000604482015260640161080e565b61094b60808501356020860135612359565b915061097e338f846109606020890189612074565b73ffffffffffffffffffffffffffffffffffffffff16929190611759565b50610a5c565b60006109a06109966020860186612074565b8560200135611603565b905082811015610a0c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f636f6d6d697373696f6e20616d6f756e74206e6f74206d617463686564000000604482015260640161080e565b610a168382612359565b9150610a488e6000610a2b6020880188612074565b73ffffffffffffffffffffffffffffffffffffffff169190611835565b610a5a8e83610a2b6020880188612074565b505b610a696020840184612074565b604080513381526020810184905290810184905273ffffffffffffffffffffffffffffffffffffffff918216918f16907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a35050508080610ad490612321565b9150506105e3565b50600080845185602001848d5af180600003610afc573d6000803e3d6000fd5b5083915060005b8281101561049e57600080878784818110610b2057610b206122aa565b9050602002016020810190610b359190612074565b73ffffffffffffffffffffffffffffffffffffffff1603610b96576000805260016020527fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb4954610b859047612359565b9050610b9188826119bc565b610d08565b60016000888885818110610bac57610bac6122aa565b9050602002016020810190610bc19190612074565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054878784818110610c0e57610c0e6122aa565b9050602002016020810190610c239190612074565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff91909116906370a0823190602401602060405180830381865afa158015610c8f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cb3919061243d565b610cbd9190612359565b9050610d088882898986818110610cd657610cd66122aa565b9050602002016020810190610ceb9190612074565b73ffffffffffffffffffffffffffffffffffffffff169190611ac6565b868683818110610d1a57610d1a6122aa565b9050602002016020810190610d2f9190612074565b6040805173ffffffffffffffffffffffffffffffffffffffff8b8116825260208201859052928316928e16917fc2534859c9972270c16d5b4255d200f9a0385f9a6ce3add96c0427ff9fc70f93910160405180910390a35080610d9181612321565b915050610b03565b8060005b81811015610f7b57600080858584818110610dba57610dba6122aa565b9050602002016020810190610dcf9190612074565b905073ffffffffffffffffffffffffffffffffffffffff8116610e35576000805260016020527fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb4954479250610e249083612359565b9150610e3033836119bc565b610f19565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff8216906370a0823190602401602060405180830381865afa158015610e9f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ec3919061243d565b73ffffffffffffffffffffffffffffffffffffffff8216600090815260016020526040902054909250610ef69083612359565b9150610f1973ffffffffffffffffffffffffffffffffffffffff82163384611ac6565b604051828152339073ffffffffffffffffffffffffffffffffffffffff8316907f2ae72b44f59d038340fca5739135a1d51fc5ab720bb02d983e4c5ff4119ca7b89060200160405180910390a350508080610f7390612321565b915050610d9d565b50505050565b8060005b81811015610f7b57610fbc848483818110610fa257610fa26122aa565b9050602002016020810190610fb79190612074565b6114e6565b80610fc681612321565b915050610f85565b81600080610fdf60608401846123aa565b9050905060005b818110156110ce5736610ffc60608601866123aa565b8381811061100c5761100c6122aa565b90506040020190508060200135846110249190612308565b93506110436110366020830183612074565b61068660208a018a612074565b7fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef6110716020830183612074565b61107e60208a018a612074565b6040805173ffffffffffffffffffffffffffffffffffffffff9384168152929091166020838101919091528401359082015260600160405180910390a150806110c681612321565b915050610fe6565b506000826001826110e26020880188612074565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461112b9190612308565b9091555061114190506060850160408601612420565b156111fb5760006111626111586020870187612074565b8660800135611603565b9050838110156111ce576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f636f6d6d697373696f6e20616d6f756e74206e6f74206d617463686564000000604482015260640161080e565b6111e060808601356020870135612359565b91506111f533898461096060208a018a612074565b506112ba565b600061121761120d6020870187612074565b8660200135611603565b90508460200135811015611287576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f636f6d6d697373696f6e20616d6f756e74206e6f74206d617463686564000000604482015260640161080e565b6112918482612359565b91506112a6886000610a2b6020890189612074565b6112b88883610a2b6020890189612074565b505b6112c76020850185612074565b604080513381526020810184905290810185905273ffffffffffffffffffffffffffffffffffffffff918216918916907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a360008086518760200160008b5af18060000361049e573d6000803e3d6000fd5b73ffffffffffffffffffffffffffffffffffffffff8084166000908152600460209081526040808320938616835292905290812054900361143e57600080815461138d90612321565b909155506040805160608101825273ffffffffffffffffffffffffffffffffffffffff808616808352858216602080850182815285870188815260008054815260038452888120975188549088167fffffffffffffffffffffffff000000000000000000000000000000000000000091821617895592516001890180549190981693169290921790955593516002909501949094558254918352600484528483209083529092529190912055611498565b73ffffffffffffffffffffffffffffffffffffffff808416600090815260046020908152604080832093861683529281528282205480835260039091529181206002018054849290611491908490612308565b9091555050505b73ffffffffffffffffffffffffffffffffffffffff8084166000908152600260209081526040808320938616835292905290812080548392906114dc908490612308565b9091555050505050565b33600081815260046020908152604080832073ffffffffffffffffffffffffffffffffffffffff86168085529083528184205494845260028084528285208286528452828520805487875260038652848720909201869055918552908490556001909252822080549192839261155d908490612359565b909155505073ffffffffffffffffffffffffffffffffffffffff831661158c5761158733826119bc565b6115ad565b6115ad73ffffffffffffffffffffffffffffffffffffffff84163383611ac6565b6040805173ffffffffffffffffffffffffffffffffffffffff851681526020810183905233917f70eb43c4a8ae8c40502dcf22436c509c28d6ff421cf07c491be56984bd987068910160405180910390a2505050565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009073ffffffffffffffffffffffffffffffffffffffff8416906370a0823190602401602060405180830381865afa158015611670573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611694919061243d565b90506116b873ffffffffffffffffffffffffffffffffffffffff8416333085611759565b6040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152819073ffffffffffffffffffffffffffffffffffffffff8516906370a0823190602401602060405180830381865afa158015611724573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611748919061243d565b6117529190612359565b9392505050565b60405173ffffffffffffffffffffffffffffffffffffffff80851660248301528316604482015260648101829052610f7b9085907f23b872dd00000000000000000000000000000000000000000000000000000000906084015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152611b1c565b8015806118d557506040517fdd62ed3e00000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff838116602483015284169063dd62ed3e90604401602060405180830381865afa1580156118af573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118d3919061243d565b155b611961576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527f20746f206e6f6e2d7a65726f20616c6c6f77616e636500000000000000000000606482015260840161080e565b60405173ffffffffffffffffffffffffffffffffffffffff83166024820152604481018290526119b79084907f095ea7b300000000000000000000000000000000000000000000000000000000906064016117b3565b505050565b6040805160008082526020820190925273ffffffffffffffffffffffffffffffffffffffff84169083906040516119f3919061247a565b60006040518083038185875af1925050503d8060008114611a30576040519150601f19603f3d011682016040523d82523d6000602084013e611a35565b606091505b50509050806119b7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f5472616e7366657248656c7065723a204554485f5452414e534645525f46414960448201527f4c45440000000000000000000000000000000000000000000000000000000000606482015260840161080e565b60405173ffffffffffffffffffffffffffffffffffffffff83166024820152604481018290526119b79084907fa9059cbb00000000000000000000000000000000000000000000000000000000906064016117b3565b6000611b7e826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff16611c289092919063ffffffff16565b8051909150156119b75780806020019051810190611b9c919061248c565b6119b7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f74207375636365656400000000000000000000000000000000000000000000606482015260840161080e565b6060611c378484600085611c3f565b949350505050565b606082471015611cd1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c0000000000000000000000000000000000000000000000000000606482015260840161080e565b6000808673ffffffffffffffffffffffffffffffffffffffff168587604051611cfa919061247a565b60006040518083038185875af1925050503d8060008114611d37576040519150601f19603f3d011682016040523d82523d6000602084013e611d3c565b606091505b5091509150611d4d87838387611d58565b979650505050505050565b60608315611dee578251600003611de75773ffffffffffffffffffffffffffffffffffffffff85163b611de7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161080e565b5081611c37565b611c378383815115611e035781518083602001fd5b806040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161080e91906124a9565b73ffffffffffffffffffffffffffffffffffffffff811681146105db57600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600082601f830112611e9957600080fd5b813567ffffffffffffffff80821115611eb457611eb4611e59565b604051601f83017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908282118183101715611efa57611efa611e59565b81604052838152866020858801011115611f1357600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060008060608587031215611f4957600080fd5b8435611f5481611e37565b9350602085013567ffffffffffffffff80821115611f7157600080fd5b818701915087601f830112611f8557600080fd5b813581811115611f9457600080fd5b8860208260061b8501011115611fa957600080fd5b602083019550809450506040870135915080821115611fc757600080fd5b50611fd487828801611e88565b91505092959194509250565b60008060408385031215611ff357600080fd5b50508035926020909101359150565b602080825282518282018190526000919060409081850190868401855b82811015612067578151805173ffffffffffffffffffffffffffffffffffffffff9081168652878201511687860152850151858501526060909301929085019060010161201f565b5091979650505050505050565b60006020828403121561208657600080fd5b813561175281611e37565b600080604083850312156120a457600080fd5b82356120af81611e37565b915060208301356120bf81611e37565b809150509250929050565b60008083601f8401126120dc57600080fd5b50813567ffffffffffffffff8111156120f457600080fd5b6020830191508360208260051b850101111561210f57600080fd5b9250929050565b600080600080600080600060a0888a03121561213157600080fd5b873561213c81611e37565b9650602088013567ffffffffffffffff8082111561215957600080fd5b6121658b838c016120ca565b909850965060408a0135915061217a82611e37565b9094506060890135908082111561219057600080fd5b61219c8b838c016120ca565b909550935060808a01359150808211156121b557600080fd5b506121c28a828b01611e88565b91505092959891949750929550565b600080602083850312156121e457600080fd5b823567ffffffffffffffff8111156121fb57600080fd5b612207858286016120ca565b90969095509350505050565b60006020828403121561222557600080fd5b5035919050565b60008060006060848603121561224157600080fd5b833561224c81611e37565b9250602084013567ffffffffffffffff8082111561226957600080fd5b9085019060a0828803121561227d57600080fd5b9092506040850135908082111561229357600080fd5b506122a086828701611e88565b9150509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b8082018082111561231b5761231b6122d9565b92915050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203612352576123526122d9565b5060010190565b8181038181111561231b5761231b6122d9565b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff618336030181126123a057600080fd5b9190910192915050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe18436030181126123df57600080fd5b83018035915067ffffffffffffffff8211156123fa57600080fd5b6020019150600681901b360382131561210f57600080fd5b80151581146105db57600080fd5b60006020828403121561243257600080fd5b813561175281612412565b60006020828403121561244f57600080fd5b5051919050565b60005b83811015612471578181015183820152602001612459565b50506000910152565b600082516123a0818460208701612456565b60006020828403121561249e57600080fd5b815161175281612412565b60208152600082518060208401526124c8816040850160208701612456565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016040019291505056fea26469706673582212207538ac84d88c1b4005e6ba1874cf81366912f145667809e73374c0db79c0c74964736f6c63430008110033"
    };
});
define("@scom/scom-commission-proxy-contract/contracts/Proxy.ts", ["require", "exports", "@ijstech/eth-contract", "@scom/scom-commission-proxy-contract/contracts/Proxy.json.ts"], function (require, exports, eth_contract_1, Proxy_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Proxy = void 0;
    class Proxy extends eth_contract_1.Contract {
        constructor(wallet, address) {
            super(wallet, address, Proxy_json_1.default.abi, Proxy_json_1.default.bytecode);
            this.assign();
        }
        deploy(options) {
            return this.__deploy([], options);
        }
        parseAddCommissionEvent(receipt) {
            return this.parseEvents(receipt, "AddCommission").map(e => this.decodeAddCommissionEvent(e));
        }
        decodeAddCommissionEvent(event) {
            let result = event.data;
            return {
                to: result.to,
                token: result.token,
                amount: new eth_contract_1.BigNumber(result.amount),
                _event: event
            };
        }
        parseClaimEvent(receipt) {
            return this.parseEvents(receipt, "Claim").map(e => this.decodeClaimEvent(e));
        }
        decodeClaimEvent(event) {
            let result = event.data;
            return {
                from: result.from,
                token: result.token,
                amount: new eth_contract_1.BigNumber(result.amount),
                _event: event
            };
        }
        parseSkimEvent(receipt) {
            return this.parseEvents(receipt, "Skim").map(e => this.decodeSkimEvent(e));
        }
        decodeSkimEvent(event) {
            let result = event.data;
            return {
                token: result.token,
                to: result.to,
                amount: new eth_contract_1.BigNumber(result.amount),
                _event: event
            };
        }
        parseTransferBackEvent(receipt) {
            return this.parseEvents(receipt, "TransferBack").map(e => this.decodeTransferBackEvent(e));
        }
        decodeTransferBackEvent(event) {
            let result = event.data;
            return {
                target: result.target,
                token: result.token,
                sender: result.sender,
                amount: new eth_contract_1.BigNumber(result.amount),
                _event: event
            };
        }
        parseTransferForwardEvent(receipt) {
            return this.parseEvents(receipt, "TransferForward").map(e => this.decodeTransferForwardEvent(e));
        }
        decodeTransferForwardEvent(event) {
            let result = event.data;
            return {
                target: result.target,
                token: result.token,
                sender: result.sender,
                amount: new eth_contract_1.BigNumber(result.amount),
                commissions: new eth_contract_1.BigNumber(result.commissions),
                _event: event
            };
        }
        assign() {
            let claimantIdCount_call = async (options) => {
                let result = await this.call('claimantIdCount', [], options);
                return new eth_contract_1.BigNumber(result);
            };
            this.claimantIdCount = claimantIdCount_call;
            let claimantIdsParams = (params) => [params.param1, params.param2];
            let claimantIds_call = async (params, options) => {
                let result = await this.call('claimantIds', claimantIdsParams(params), options);
                return new eth_contract_1.BigNumber(result);
            };
            this.claimantIds = claimantIds_call;
            let claimantsInfo_call = async (param1, options) => {
                let result = await this.call('claimantsInfo', [this.wallet.utils.toString(param1)], options);
                return {
                    claimant: result.claimant,
                    token: result.token,
                    balance: new eth_contract_1.BigNumber(result.balance)
                };
            };
            this.claimantsInfo = claimantsInfo_call;
            let distributionsParams = (params) => [params.param1, params.param2];
            let distributions_call = async (params, options) => {
                let result = await this.call('distributions', distributionsParams(params), options);
                return new eth_contract_1.BigNumber(result);
            };
            this.distributions = distributions_call;
            let getClaimantsInfoParams = (params) => [this.wallet.utils.toString(params.fromId), this.wallet.utils.toString(params.count)];
            let getClaimantsInfo_call = async (params, options) => {
                let result = await this.call('getClaimantsInfo', getClaimantsInfoParams(params), options);
                return (result.map(e => ({
                    claimant: e.claimant,
                    token: e.token,
                    balance: new eth_contract_1.BigNumber(e.balance)
                })));
            };
            this.getClaimantsInfo = getClaimantsInfo_call;
            let lastBalance_call = async (param1, options) => {
                let result = await this.call('lastBalance', [param1], options);
                return new eth_contract_1.BigNumber(result);
            };
            this.lastBalance = lastBalance_call;
            let claim_send = async (token, options) => {
                let result = await this.send('claim', [token], options);
                return result;
            };
            let claim_call = async (token, options) => {
                let result = await this.call('claim', [token], options);
                return;
            };
            let claim_txData = async (token, options) => {
                let result = await this.txData('claim', [token], options);
                return result;
            };
            this.claim = Object.assign(claim_send, {
                call: claim_call,
                txData: claim_txData
            });
            let claimMultiple_send = async (tokens, options) => {
                let result = await this.send('claimMultiple', [tokens], options);
                return result;
            };
            let claimMultiple_call = async (tokens, options) => {
                let result = await this.call('claimMultiple', [tokens], options);
                return;
            };
            let claimMultiple_txData = async (tokens, options) => {
                let result = await this.txData('claimMultiple', [tokens], options);
                return result;
            };
            this.claimMultiple = Object.assign(claimMultiple_send, {
                call: claimMultiple_call,
                txData: claimMultiple_txData
            });
            let ethInParams = (params) => [params.target, params.commissions.map(e => ([e.to, this.wallet.utils.toString(e.amount)])), this.wallet.utils.stringToBytes(params.data)];
            let ethIn_send = async (params, options) => {
                let result = await this.send('ethIn', ethInParams(params), options);
                return result;
            };
            let ethIn_call = async (params, options) => {
                let result = await this.call('ethIn', ethInParams(params), options);
                return;
            };
            let ethIn_txData = async (params, options) => {
                let result = await this.txData('ethIn', ethInParams(params), options);
                return result;
            };
            this.ethIn = Object.assign(ethIn_send, {
                call: ethIn_call,
                txData: ethIn_txData
            });
            let proxyCallParams = (params) => [params.target, params.tokensIn.map(e => ([e.token, this.wallet.utils.toString(e.amount), e.directTransfer, e.commissions.map(e => ([e.to, this.wallet.utils.toString(e.amount)])), this.wallet.utils.toString(e.totalCommissions)])), params.to, params.tokensOut, this.wallet.utils.stringToBytes(params.data)];
            let proxyCall_send = async (params, options) => {
                let result = await this.send('proxyCall', proxyCallParams(params), options);
                return result;
            };
            let proxyCall_call = async (params, options) => {
                let result = await this.call('proxyCall', proxyCallParams(params), options);
                return;
            };
            let proxyCall_txData = async (params, options) => {
                let result = await this.txData('proxyCall', proxyCallParams(params), options);
                return result;
            };
            this.proxyCall = Object.assign(proxyCall_send, {
                call: proxyCall_call,
                txData: proxyCall_txData
            });
            let skim_send = async (tokens, options) => {
                let result = await this.send('skim', [tokens], options);
                return result;
            };
            let skim_call = async (tokens, options) => {
                let result = await this.call('skim', [tokens], options);
                return;
            };
            let skim_txData = async (tokens, options) => {
                let result = await this.txData('skim', [tokens], options);
                return result;
            };
            this.skim = Object.assign(skim_send, {
                call: skim_call,
                txData: skim_txData
            });
            let tokenInParams = (params) => [params.target, [params.tokensIn.token, this.wallet.utils.toString(params.tokensIn.amount), params.tokensIn.directTransfer, params.tokensIn.commissions.map(e => ([e.to, this.wallet.utils.toString(e.amount)])), this.wallet.utils.toString(params.tokensIn.totalCommissions)], this.wallet.utils.stringToBytes(params.data)];
            let tokenIn_send = async (params, options) => {
                let result = await this.send('tokenIn', tokenInParams(params), options);
                return result;
            };
            let tokenIn_call = async (params, options) => {
                let result = await this.call('tokenIn', tokenInParams(params), options);
                return;
            };
            let tokenIn_txData = async (params, options) => {
                let result = await this.txData('tokenIn', tokenInParams(params), options);
                return result;
            };
            this.tokenIn = Object.assign(tokenIn_send, {
                call: tokenIn_call,
                txData: tokenIn_txData
            });
        }
    }
    exports.Proxy = Proxy;
    Proxy._abi = Proxy_json_1.default.abi;
});
define("@scom/scom-commission-proxy-contract/contracts/index.ts", ["require", "exports", "@scom/scom-commission-proxy-contract/contracts/Proxy.ts"], function (require, exports, Proxy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Proxy = void 0;
    Object.defineProperty(exports, "Proxy", { enumerable: true, get: function () { return Proxy_1.Proxy; } });
});
define("@scom/scom-commission-proxy-contract", ["require", "exports", "@scom/scom-commission-proxy-contract/contracts/index.ts"], function (require, exports, Contracts) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.onProgress = exports.deploy = exports.DefaultDeployOptions = exports.Contracts = void 0;
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
        let proxy = new Contracts.Proxy(wallet);
        progress('Deploy Proxy');
        await proxy.deploy();
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
});
