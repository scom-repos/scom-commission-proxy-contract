define("@scom/commission-proxy/contracts/Distributor.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/commission-proxy/contracts/Distributor.json.ts'/> 
    exports.default = {
        "abi": [
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "AddCommission", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Claim", "type": "event" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct IDistributor.Commission[]", "name": "commissions", "type": "tuple[]" }], "name": "addCommissions", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20[]", "name": "tokens", "type": "address[]" }], "name": "claimMultiple", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "distributions", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "lastBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }
        ],
        "bytecode": "608060405234801561001057600080fd5b50610cf7806100206000396000f3fe60806040526004361061005a5760003560e01c8063cf53a96011610043578063cf53a960146100cb578063ee42d3a3146100de578063f303ad6e1461010b57600080fd5b80631e83409a1461005f578063504ffe5214610081575b600080fd5b34801561006b57600080fd5b5061007f61007a3660046109e0565b61012b565b005b34801561008d57600080fd5b506100b961009c3660046109fd565b600160209081526000928352604080842090915290825290205481565b60405190815260200160405180910390f35b61007f6100d9366004610a36565b61021d565b3480156100ea57600080fd5b506100b96100f93660046109e0565b60006020819052908152604090205481565b34801561011757600080fd5b5061007f610126366004610abe565b6104fd565b33600090815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff851684528252808320805490849055918390528220805491928392610178908490610b62565b909155505073ffffffffffffffffffffffffffffffffffffffff82166101a7576101a2338261054b565b6101c8565b6101c873ffffffffffffffffffffffffffffffffffffffff8316338361065a565b6040805173ffffffffffffffffffffffffffffffffffffffff841681526020810183905233917f70eb43c4a8ae8c40502dcf22436c509c28d6ff421cf07c491be56984bd987068910160405180910390a25050565b806000805b82811015610377573685858381811061023d5761023d610b7b565b90506040020190508060200135836102559190610baa565b92506020810180359060019060009061026e90856109e0565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546102f49190610baa565b909155507fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef905061032860208301836109e0565b6040805173ffffffffffffffffffffffffffffffffffffffff9283168152918a166020838101919091528401359082015260600160405180910390a1508061036f81610bbd565b915050610222565b50600073ffffffffffffffffffffffffffffffffffffffff861615610429576040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff8716906370a0823190602401602060405180830381865afa158015610400573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104249190610bf5565b61042b565b475b73ffffffffffffffffffffffffffffffffffffffff871660009081526020819052604090205490915061045f908390610baa565b8110156104cd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f556e64657266756e64000000000000000000000000000000000000000000000060448201526064015b60405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff90951660009081526020819052604090209490945550505050565b8060005b818110156105455761053384848381811061051e5761051e610b7b565b905060200201602081019061007a91906109e0565b8061053d81610bbd565b915050610501565b50505050565b6040805160008082526020820190925273ffffffffffffffffffffffffffffffffffffffff84169083906040516105829190610c32565b60006040518083038185875af1925050503d80600081146105bf576040519150601f19603f3d011682016040523d82523d6000602084013e6105c4565b606091505b5050905080610655576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f5472616e7366657248656c7065723a204554485f5452414e534645525f46414960448201527f4c4544000000000000000000000000000000000000000000000000000000000060648201526084016104c4565b505050565b6040805173ffffffffffffffffffffffffffffffffffffffff848116602483015260448083018590528351808403909101815260649092018352602080830180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb0000000000000000000000000000000000000000000000000000000017905283518085019094528084527f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c656490840152610655928692916000916107259185169084906107cf565b80519091501561065557808060200190518101906107439190610c4e565b610655576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f7420737563636565640000000000000000000000000000000000000000000060648201526084016104c4565b60606107de84846000856107e8565b90505b9392505050565b60608247101561087a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c000000000000000000000000000000000000000000000000000060648201526084016104c4565b843b6108e2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016104c4565b6000808673ffffffffffffffffffffffffffffffffffffffff16858760405161090b9190610c32565b60006040518083038185875af1925050503d8060008114610948576040519150601f19603f3d011682016040523d82523d6000602084013e61094d565b606091505b509150915061095d828286610968565b979650505050505050565b606083156109775750816107e1565b8251156109875782518084602001fd5b816040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104c49190610c70565b73ffffffffffffffffffffffffffffffffffffffff811681146109dd57600080fd5b50565b6000602082840312156109f257600080fd5b81356107e1816109bb565b60008060408385031215610a1057600080fd5b8235610a1b816109bb565b91506020830135610a2b816109bb565b809150509250929050565b600080600060408486031215610a4b57600080fd5b8335610a56816109bb565b9250602084013567ffffffffffffffff80821115610a7357600080fd5b818601915086601f830112610a8757600080fd5b813581811115610a9657600080fd5b8760208260061b8501011115610aab57600080fd5b6020830194508093505050509250925092565b60008060208385031215610ad157600080fd5b823567ffffffffffffffff80821115610ae957600080fd5b818501915085601f830112610afd57600080fd5b813581811115610b0c57600080fd5b8660208260051b8501011115610b2157600080fd5b60209290920196919550909350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b81810381811115610b7557610b75610b33565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b80820180821115610b7557610b75610b33565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610bee57610bee610b33565b5060010190565b600060208284031215610c0757600080fd5b5051919050565b60005b83811015610c29578181015183820152602001610c11565b50506000910152565b60008251610c44818460208701610c0e565b9190910192915050565b600060208284031215610c6057600080fd5b815180151581146107e157600080fd5b6020815260008251806020840152610c8f816040850160208701610c0e565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016040019291505056fea2646970667358221220345d4bc5ee464a69c8eeb591e47d61af46ef19776d1113737c544a4e1f6b62f764736f6c63430008110033"
    };
});
define("@scom/commission-proxy/contracts/Distributor.ts", ["require", "exports", "@ijstech/eth-contract", "@scom/commission-proxy/contracts/Distributor.json.ts"], function (require, exports, eth_contract_1, Distributor_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Distributor = void 0;
    class Distributor extends eth_contract_1.Contract {
        constructor(wallet, address) {
            super(wallet, address, Distributor_json_1.default.abi, Distributor_json_1.default.bytecode);
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
        assign() {
            let distributionsParams = (params) => [params.param1, params.param2];
            let distributions_call = async (params, options) => {
                let result = await this.call('distributions', distributionsParams(params), options);
                return new eth_contract_1.BigNumber(result);
            };
            this.distributions = distributions_call;
            let lastBalance_call = async (param1, options) => {
                let result = await this.call('lastBalance', [param1], options);
                return new eth_contract_1.BigNumber(result);
            };
            this.lastBalance = lastBalance_call;
            let addCommissionsParams = (params) => [params.token, params.commissions.map(e => ([e.to, this.wallet.utils.toString(e.amount)]))];
            let addCommissions_send = async (params, options) => {
                let result = await this.send('addCommissions', addCommissionsParams(params), options);
                return result;
            };
            let addCommissions_call = async (params, options) => {
                let result = await this.call('addCommissions', addCommissionsParams(params), options);
                return;
            };
            let addCommissions_txData = async (params, options) => {
                let result = await this.txData('addCommissions', addCommissionsParams(params), options);
                return result;
            };
            this.addCommissions = Object.assign(addCommissions_send, {
                call: addCommissions_call,
                txData: addCommissions_txData
            });
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
        }
    }
    exports.Distributor = Distributor;
});
define("@scom/commission-proxy/contracts/Proxy.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/commission-proxy/contracts/Proxy.json.ts'/> 
    exports.default = {
        "abi": [
            { "inputs": [{ "internalType": "contract IDistributor", "name": "_distributor", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Skim", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "target", "type": "address" }, { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "TransferBack", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "target", "type": "address" }, { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "commissions", "type": "uint256" }], "name": "TransferForward", "type": "event" },
            { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct IDistributor.Commission[]", "name": "commissions", "type": "tuple[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "ethIn", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "components": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "directTransfer", "type": "bool" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct IDistributor.Commission[]", "name": "commissions", "type": "tuple[]" }], "internalType": "struct Proxy.TokensIn[]", "name": "tokensIn", "type": "tuple[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "contract IERC20[]", "name": "tokensOut", "type": "address[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "proxyCall", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20[]", "name": "tokens", "type": "address[]" }], "name": "skim", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "components": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "directTransfer", "type": "bool" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct IDistributor.Commission[]", "name": "commissions", "type": "tuple[]" }], "internalType": "struct Proxy.TokensIn", "name": "tokensIn", "type": "tuple" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "tokenIn", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "stateMutability": "payable", "type": "receive" }
        ],
        "bytecode": "60a060405234801561001057600080fd5b50604051611d32380380611d3283398101604081905261002f91610040565b6001600160a01b0316608052610070565b60006020828403121561005257600080fd5b81516001600160a01b038116811461006957600080fd5b9392505050565b608051611c846100ae600039600081816101100152818161050d015281816105a00152818161060201528181610c2b0152610c6f0152611c846000f3fe6080604052600436106100435760003560e01c806301417e7b1461004f57806373d8690f14610064578063b60c164c14610077578063c0da918d1461009757600080fd5b3661004a57005b600080fd5b61006261005d3660046116fb565b6100b7565b005b6100626100723660046117f4565b610225565b34801561008357600080fd5b506100626100923660046118af565b610a2e565b3480156100a357600080fd5b506100626100b23660046118f1565b610bac565b600082815b818110156100ff578585828181106100d6576100d661196f565b90506040020160200135836100eb91906119cd565b9250806100f7816119e6565b9150506100bc565b50600061010c8334611a1e565b90507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663cf53a96084600089896040518563ffffffff1660e01b815260040161016d93929190611a31565b6000604051808303818588803b15801561018657600080fd5b505af115801561019a573d6000803e3d6000fd5b505060408051338152602081018690529081018790526000935073ffffffffffffffffffffffffffffffffffffffff8b1692507f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b915060600160405180910390a3600080855186602001848b5af18060000361021a573d6000803e3d6000fd5b503d6000803e3d6000f35b8160008167ffffffffffffffff81111561024157610241611621565b60405190808252806020026020018201604052801561026a578160200160208202803683370190505b50905060005b828110156103a957600086868381811061028c5761028c61196f565b90506020020160208101906102a19190611aa3565b73ffffffffffffffffffffffffffffffffffffffff1614610378578585828181106102ce576102ce61196f565b90506020020160208101906102e39190611aa3565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff91909116906370a0823190602401602060405180830381865afa15801561034f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103739190611ac0565b61037a565b475b82828151811061038c5761038c61196f565b6020908102919091010152806103a1816119e6565b915050610270565b508691506000805b838110156107cd57368a8a838181106103cc576103cc61196f565b90506020028101906103de9190611ad9565b90506000806103f06060840184611b17565b9050905060005b818110156104455761040c6060850185611b17565b8281811061041c5761041c61196f565b905060400201602001358361043191906119cd565b92508061043d816119e6565b9150506103f7565b5060009050610458826020850135611a1e565b905060006104696020850185611aa3565b73ffffffffffffffffffffffffffffffffffffffff160361059a57826020013534146104f6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f45544820616d6f756e74206e6f74206d6174636865640000000000000000000060448201526064015b60405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001663cf53a9608360006105426060880188611b17565b6040518563ffffffff1660e01b815260040161056093929190611a31565b6000604051808303818588803b15801561057957600080fd5b505af115801561058d573d6000803e3d6000fd5b5050505050809450610719565b6105eb337f0000000000000000000000000000000000000000000000000000000000000000846105cd6020880188611aa3565b73ffffffffffffffffffffffffffffffffffffffff16929190610ded565b73ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001663cf53a9606106346020860186611aa3565b6106416060870187611b17565b6040518463ffffffff1660e01b815260040161065f93929190611a31565b600060405180830381600087803b15801561067957600080fd5b505af115801561068d573d6000803e3d6000fd5b506106a2925050506060840160408501611b8d565b156106bf576106ba338f836105cd6020880188611aa3565b610719565b6106d56106cf6020850185611aa3565b82610ec9565b90506107078e60006106ea6020870187611aa3565b73ffffffffffffffffffffffffffffffffffffffff16919061101f565b6107198e826106ea6020870187611aa3565b6107266020840184611aa3565b73ffffffffffffffffffffffffffffffffffffffff168e73ffffffffffffffffffffffffffffffffffffffff167f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b3384866040516107af9392919073ffffffffffffffffffffffffffffffffffffffff9390931683526020830191909152604082015260600190565b60405180910390a350505080806107c5906119e6565b9150506103b1565b50600080855186602001848e5af1806000036107ed573d6000803e3d6000fd5b5084925060005b8381101561021a576000808888848181106108115761081161196f565b90506020020160208101906108269190611aa3565b73ffffffffffffffffffffffffffffffffffffffff1603610877578382815181106108535761085361196f565b6020026020010151476108669190611a1e565b905061087289826111a6565b61099d565b8382815181106108895761088961196f565b60200260200101518888848181106108a3576108a361196f565b90506020020160208101906108b89190611aa3565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff91909116906370a0823190602401602060405180830381865afa158015610924573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109489190611ac0565b6109529190611a1e565b905061099d89828a8a8681811061096b5761096b61196f565b90506020020160208101906109809190611aa3565b73ffffffffffffffffffffffffffffffffffffffff1691906112b0565b8787838181106109af576109af61196f565b90506020020160208101906109c49190611aa3565b6040805173ffffffffffffffffffffffffffffffffffffffff8c8116825260208201859052928316928f16917fc2534859c9972270c16d5b4255d200f9a0385f9a6ce3add96c0427ff9fc70f93910160405180910390a35080610a26816119e6565b9150506107f4565b8060005b81811015610ba657600080858584818110610a4f57610a4f61196f565b9050602002016020810190610a649190611aa3565b905073ffffffffffffffffffffffffffffffffffffffff8116610a9357479150610a8e33836111a6565b610b44565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff8216906370a0823190602401602060405180830381865afa158015610afd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b219190611ac0565b9150610b4473ffffffffffffffffffffffffffffffffffffffff821633846112b0565b604051828152339073ffffffffffffffffffffffffffffffffffffffff8316907f2ae72b44f59d038340fca5739135a1d51fc5ab720bb02d983e4c5ff4119ca7b89060200160405180910390a350508080610b9e906119e6565b915050610a32565b50505050565b81600080610bbd6060840184611b17565b9050905060005b81811015610c1257610bd96060850185611b17565b82818110610be957610be961196f565b9050604002016020013583610bfe91906119cd565b925080610c0a816119e6565b915050610bc4565b506000610c23836020860135611a1e565b9050610c58337f0000000000000000000000000000000000000000000000000000000000000000856105cd6020890189611aa3565b73ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001663cf53a960610ca16020870187611aa3565b610cae6060880188611b17565b6040518463ffffffff1660e01b8152600401610ccc93929190611a31565b600060405180830381600087803b158015610ce657600080fd5b505af1158015610cfa573d6000803e3d6000fd5b50610d0f925050506060850160408601611b8d565b15610d2c57610d273388836105cd6020890189611aa3565b610d63565b610d3c6106cf6020860186611aa3565b9050610d518760006106ea6020880188611aa3565b610d6387826106ea6020880188611aa3565b610d706020850185611aa3565b604080513381526020810184905290810185905273ffffffffffffffffffffffffffffffffffffffff918216918916907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a360008086518760200160008b5af18060000361021a573d6000803e3d6000fd5b60405173ffffffffffffffffffffffffffffffffffffffff80851660248301528316604482015260648101829052610ba69085907f23b872dd00000000000000000000000000000000000000000000000000000000906084015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152611306565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009073ffffffffffffffffffffffffffffffffffffffff8416906370a0823190602401602060405180830381865afa158015610f36573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f5a9190611ac0565b9050610f7e73ffffffffffffffffffffffffffffffffffffffff8416333085610ded565b6040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152819073ffffffffffffffffffffffffffffffffffffffff8516906370a0823190602401602060405180830381865afa158015610fea573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061100e9190611ac0565b6110189190611a1e565b9392505050565b8015806110bf57506040517fdd62ed3e00000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff838116602483015284169063dd62ed3e90604401602060405180830381865afa158015611099573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110bd9190611ac0565b155b61114b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527f20746f206e6f6e2d7a65726f20616c6c6f77616e63650000000000000000000060648201526084016104ed565b60405173ffffffffffffffffffffffffffffffffffffffff83166024820152604481018290526111a19084907f095ea7b30000000000000000000000000000000000000000000000000000000090606401610e47565b505050565b6040805160008082526020820190925273ffffffffffffffffffffffffffffffffffffffff84169083906040516111dd9190611bce565b60006040518083038185875af1925050503d806000811461121a576040519150601f19603f3d011682016040523d82523d6000602084013e61121f565b606091505b50509050806111a1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f5472616e7366657248656c7065723a204554485f5452414e534645525f46414960448201527f4c4544000000000000000000000000000000000000000000000000000000000060648201526084016104ed565b60405173ffffffffffffffffffffffffffffffffffffffff83166024820152604481018290526111a19084907fa9059cbb0000000000000000000000000000000000000000000000000000000090606401610e47565b6000611368826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166114129092919063ffffffff16565b8051909150156111a157808060200190518101906113869190611be0565b6111a1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f7420737563636565640000000000000000000000000000000000000000000060648201526084016104ed565b60606114218484600085611429565b949350505050565b6060824710156114bb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c000000000000000000000000000000000000000000000000000060648201526084016104ed565b843b611523576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016104ed565b6000808673ffffffffffffffffffffffffffffffffffffffff16858760405161154c9190611bce565b60006040518083038185875af1925050503d8060008114611589576040519150601f19603f3d011682016040523d82523d6000602084013e61158e565b606091505b509150915061159e8282866115a9565b979650505050505050565b606083156115b8575081611018565b8251156115c85782518084602001fd5b816040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104ed9190611bfd565b73ffffffffffffffffffffffffffffffffffffffff8116811461161e57600080fd5b50565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600082601f83011261166157600080fd5b813567ffffffffffffffff8082111561167c5761167c611621565b604051601f83017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f011681019082821181831017156116c2576116c2611621565b816040528381528660208588010111156116db57600080fd5b836020870160208301376000602085830101528094505050505092915050565b6000806000806060858703121561171157600080fd5b843561171c816115fc565b9350602085013567ffffffffffffffff8082111561173957600080fd5b818701915087601f83011261174d57600080fd5b81358181111561175c57600080fd5b8860208260061b850101111561177157600080fd5b60208301955080945050604087013591508082111561178f57600080fd5b5061179c87828801611650565b91505092959194509250565b60008083601f8401126117ba57600080fd5b50813567ffffffffffffffff8111156117d257600080fd5b6020830191508360208260051b85010111156117ed57600080fd5b9250929050565b600080600080600080600060a0888a03121561180f57600080fd5b873561181a816115fc565b9650602088013567ffffffffffffffff8082111561183757600080fd5b6118438b838c016117a8565b909850965060408a01359150611858826115fc565b9094506060890135908082111561186e57600080fd5b61187a8b838c016117a8565b909550935060808a013591508082111561189357600080fd5b506118a08a828b01611650565b91505092959891949750929550565b600080602083850312156118c257600080fd5b823567ffffffffffffffff8111156118d957600080fd5b6118e5858286016117a8565b90969095509350505050565b60008060006060848603121561190657600080fd5b8335611911816115fc565b9250602084013567ffffffffffffffff8082111561192e57600080fd5b908501906080828803121561194257600080fd5b9092506040850135908082111561195857600080fd5b5061196586828701611650565b9150509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b808201808211156119e0576119e061199e565b92915050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611a1757611a1761199e565b5060010190565b818103818111156119e0576119e061199e565b73ffffffffffffffffffffffffffffffffffffffff848116825260406020808401829052838201859052600092869160608601855b88811015611a95578435611a79816115fc565b8416825284830135838301529385019390850190600101611a66565b509998505050505050505050565b600060208284031215611ab557600080fd5b8135611018816115fc565b600060208284031215611ad257600080fd5b5051919050565b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81833603018112611b0d57600080fd5b9190910192915050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112611b4c57600080fd5b83018035915067ffffffffffffffff821115611b6757600080fd5b6020019150600681901b36038213156117ed57600080fd5b801515811461161e57600080fd5b600060208284031215611b9f57600080fd5b813561101881611b7f565b60005b83811015611bc5578181015183820152602001611bad565b50506000910152565b60008251611b0d818460208701611baa565b600060208284031215611bf257600080fd5b815161101881611b7f565b6020815260008251806020840152611c1c816040850160208701611baa565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016040019291505056fea2646970667358221220cece5df7782ea35910c0625e61db9e591368b31f9255137563d83414d850c66e64736f6c63430008110033"
    };
});
define("@scom/commission-proxy/contracts/Proxy.ts", ["require", "exports", "@ijstech/eth-contract", "@scom/commission-proxy/contracts/Proxy.json.ts"], function (require, exports, eth_contract_2, Proxy_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Proxy = void 0;
    class Proxy extends eth_contract_2.Contract {
        constructor(wallet, address) {
            super(wallet, address, Proxy_json_1.default.abi, Proxy_json_1.default.bytecode);
            this.assign();
        }
        deploy(distributor, options) {
            return this.__deploy([distributor], options);
        }
        parseSkimEvent(receipt) {
            return this.parseEvents(receipt, "Skim").map(e => this.decodeSkimEvent(e));
        }
        decodeSkimEvent(event) {
            let result = event.data;
            return {
                token: result.token,
                to: result.to,
                amount: new eth_contract_2.BigNumber(result.amount),
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
                amount: new eth_contract_2.BigNumber(result.amount),
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
                amount: new eth_contract_2.BigNumber(result.amount),
                commissions: new eth_contract_2.BigNumber(result.commissions),
                _event: event
            };
        }
        assign() {
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
            let proxyCallParams = (params) => [params.target, params.tokensIn.map(e => ([e.token, this.wallet.utils.toString(e.amount), e.directTransfer, e.commissions.map(e => ([e.to, this.wallet.utils.toString(e.amount)]))])), params.to, params.tokensOut, this.wallet.utils.stringToBytes(params.data)];
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
            let tokenInParams = (params) => [params.target, [params.tokensIn.token, this.wallet.utils.toString(params.tokensIn.amount), params.tokensIn.directTransfer, params.tokensIn.commissions.map(e => ([e.to, this.wallet.utils.toString(e.amount)]))], this.wallet.utils.stringToBytes(params.data)];
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
});
define("@scom/commission-proxy/contracts/ProxyWtihDistributor.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/commission-proxy/contracts/ProxyWtihDistributor.json.ts'/> 
    exports.default = {
        "abi": [
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "AddCommission", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Claim", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Skim", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "target", "type": "address" }, { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "TransferBack", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "target", "type": "address" }, { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "commissions", "type": "uint256" }], "name": "TransferForward", "type": "event" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20[]", "name": "tokens", "type": "address[]" }], "name": "claimMultiple", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "distributions", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct ProxyWtihDistributor.Commission[]", "name": "commissions", "type": "tuple[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "ethIn", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "lastBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "components": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "directTransfer", "type": "bool" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct ProxyWtihDistributor.Commission[]", "name": "commissions", "type": "tuple[]" }], "internalType": "struct ProxyWtihDistributor.TokensIn[]", "name": "tokensIn", "type": "tuple[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "contract IERC20[]", "name": "tokensOut", "type": "address[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "proxyCall", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20[]", "name": "tokens", "type": "address[]" }], "name": "skim", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "components": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "directTransfer", "type": "bool" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct ProxyWtihDistributor.Commission[]", "name": "commissions", "type": "tuple[]" }], "internalType": "struct ProxyWtihDistributor.TokensIn", "name": "tokensIn", "type": "tuple" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "tokenIn", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "stateMutability": "payable", "type": "receive" }
        ],
        "bytecode": "608060405234801561001057600080fd5b50612106806100206000396000f3fe60806040526004361061007f5760003560e01c8063b60c164c1161004e578063b60c164c1461011d578063c0da918d1461013d578063ee42d3a31461015d578063f303ad6e1461018a57600080fd5b806301417e7b1461008b5780631e83409a146100a0578063504ffe52146100c057806373d8690f1461010a57600080fd5b3661008657005b600080fd5b61009e610099366004611bb6565b6101aa565b005b3480156100ac57600080fd5b5061009e6100bb366004611c63565b610398565b3480156100cc57600080fd5b506100f86100db366004611c80565b600160209081526000928352604080842090915290825290205481565b60405190815260200160405180910390f35b61009e610118366004611d05565b61048a565b34801561012957600080fd5b5061009e610138366004611dc0565b610c98565b34801561014957600080fd5b5061009e610158366004611e02565b610e7f565b34801561016957600080fd5b506100f8610178366004611c63565b60006020819052908152604090205481565b34801561019657600080fd5b5061009e6101a5366004611dc0565b611260565b600082815b818110156102c057368686838181106101ca576101ca611e80565b90506040020190508060200135846101e29190611ede565b9350602081018035906001906000906101fb9085611c63565b73ffffffffffffffffffffffffffffffffffffffff168152602080820192909252604090810160009081208180529092528120805490919061023e908490611ede565b909155507fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef90506102726020830183611c63565b6040805173ffffffffffffffffffffffffffffffffffffffff909216825260006020838101919091528401359082015260600160405180910390a150806102b881611ef7565b9150506101af565b5060006102cd8334611f2f565b600080805260208190527fad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb58054929350859290919061030d908490611ede565b9091555050604080513381526020810183905290810184905260009073ffffffffffffffffffffffffffffffffffffffff8916907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a3600080855186602001848b5af18060000361038d573d6000803e3d6000fd5b503d6000803e3d6000f35b33600090815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff8516845282528083208054908490559183905282208054919283926103e5908490611f2f565b909155505073ffffffffffffffffffffffffffffffffffffffff82166104145761040f33826112a8565b610435565b61043573ffffffffffffffffffffffffffffffffffffffff831633836113b7565b6040805173ffffffffffffffffffffffffffffffffffffffff841681526020810183905233917f70eb43c4a8ae8c40502dcf22436c509c28d6ff421cf07c491be56984bd987068910160405180910390a25050565b846000805b828110156109dd57368989838181106104aa576104aa611e80565b90506020028101906104bc9190611f42565b90506000806104ce6060840184611f80565b9050905060005b8181101561063c57366104eb6060860186611f80565b838181106104fb576104fb611e80565b90506040020190508060200135846105139190611ede565b93506020810180359060019060009061052c9085611c63565b73ffffffffffffffffffffffffffffffffffffffff16815260208082019290925260400160009081209161056290890189611c63565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546105ab9190611ede565b909155507fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef90506105df6020830183611c63565b6105ec6020880188611c63565b6040805173ffffffffffffffffffffffffffffffffffffffff9384168152929091166020838101919091528401359082015260600160405180910390a1508061063481611ef7565b9150506104d5565b506000905061064f826020850135611f2f565b9050816000806106626020870187611c63565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546106ab9190611ede565b90915550600090506106c06020850185611c63565b73ffffffffffffffffffffffffffffffffffffffff16036107bd578415610748576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f6d6f7265207468616e206f6e6520455448207472616e7366657200000000000060448201526064015b60405180910390fd5b826020013534146107b5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f45544820616d6f756e74206e6f74206d61746368656400000000000000000000604482015260640161073f565b80945061095d565b6107cd6060840160408501611ff6565b1561088d5760006107ea6107e46020860186611c63565b8461148b565b905082811015610856576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f636f6d6d697373696f6e20616d6f756e74206e6f74206d617463686564000000604482015260640161073f565b610887338f846108696020890189611c63565b73ffffffffffffffffffffffffffffffffffffffff169291906115e1565b5061095d565b60006108a961089f6020860186611c63565b856020013561148b565b90508360200135811015610919576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f636f6d6d697373696f6e20616d6f756e74206e6f74206d617463686564000000604482015260640161073f565b6109498e600061092c6020880188611c63565b73ffffffffffffffffffffffffffffffffffffffff16919061163f565b61095b8e8361092c6020880188611c63565b505b61096a6020840184611c63565b604080513381526020810184905290810184905273ffffffffffffffffffffffffffffffffffffffff918216918f16907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a350505080806109d590611ef7565b91505061048f565b50600080845185602001848d5af1806000036109fd573d6000803e3d6000fd5b5083915060005b8281101561038d57600080878784818110610a2157610a21611e80565b9050602002016020810190610a369190611c63565b73ffffffffffffffffffffffffffffffffffffffff1603610a965760008080526020527fad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb554610a859047611f2f565b9050610a9188826112a8565b610c07565b600080888885818110610aab57610aab611e80565b9050602002016020810190610ac09190611c63565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054878784818110610b0d57610b0d611e80565b9050602002016020810190610b229190611c63565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff91909116906370a0823190602401602060405180830381865afa158015610b8e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bb29190612013565b610bbc9190611f2f565b9050610c078882898986818110610bd557610bd5611e80565b9050602002016020810190610bea9190611c63565b73ffffffffffffffffffffffffffffffffffffffff1691906113b7565b868683818110610c1957610c19611e80565b9050602002016020810190610c2e9190611c63565b6040805173ffffffffffffffffffffffffffffffffffffffff8b8116825260208201859052928316928e16917fc2534859c9972270c16d5b4255d200f9a0385f9a6ce3add96c0427ff9fc70f93910160405180910390a35080610c9081611ef7565b915050610a04565b8060005b81811015610e7957600080858584818110610cb957610cb9611e80565b9050602002016020810190610cce9190611c63565b905073ffffffffffffffffffffffffffffffffffffffff8116610d335760008080526020527fad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb554479250610d229083611f2f565b9150610d2e33836112a8565b610e17565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff8216906370a0823190602401602060405180830381865afa158015610d9d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dc19190612013565b73ffffffffffffffffffffffffffffffffffffffff8216600090815260208190526040902054909250610df49083611f2f565b9150610e1773ffffffffffffffffffffffffffffffffffffffff821633846113b7565b604051828152339073ffffffffffffffffffffffffffffffffffffffff8316907f2ae72b44f59d038340fca5739135a1d51fc5ab720bb02d983e4c5ff4119ca7b89060200160405180910390a350508080610e7190611ef7565b915050610c9c565b50505050565b81600080610e906060840184611f80565b9050905060005b81811015610ffe5736610ead6060860186611f80565b83818110610ebd57610ebd611e80565b9050604002019050806020013584610ed59190611ede565b935060208101803590600190600090610eee9085611c63565b73ffffffffffffffffffffffffffffffffffffffff168152602080820192909252604001600090812091610f24908b018b611c63565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610f6d9190611ede565b909155507fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef9050610fa16020830183611c63565b610fae60208a018a611c63565b6040805173ffffffffffffffffffffffffffffffffffffffff9384168152929091166020838101919091528401359082015260600160405180910390a15080610ff681611ef7565b915050610e97565b50600061100f836020860135611f2f565b9050826000806110226020880188611c63565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461106b9190611ede565b9091555061108190506060850160408601611ff6565b1561112357600061109e6110986020870187611c63565b8561148b565b90508381101561110a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f636f6d6d697373696f6e20616d6f756e74206e6f74206d617463686564000000604482015260640161073f565b61111d33898461086960208a018a611c63565b506111d6565b600061113f6111356020870187611c63565b866020013561148b565b905084602001358110156111af576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f636f6d6d697373696f6e20616d6f756e74206e6f74206d617463686564000000604482015260640161073f565b6111c288600061092c6020890189611c63565b6111d4888361092c6020890189611c63565b505b6111e36020850185611c63565b604080513381526020810184905290810185905273ffffffffffffffffffffffffffffffffffffffff918216918916907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a360008086518760200160008b5af18060000361038d573d6000803e3d6000fd5b8060005b81811015610e795761129684848381811061128157611281611e80565b90506020020160208101906100bb9190611c63565b806112a081611ef7565b915050611264565b6040805160008082526020820190925273ffffffffffffffffffffffffffffffffffffffff84169083906040516112df9190612050565b60006040518083038185875af1925050503d806000811461131c576040519150601f19603f3d011682016040523d82523d6000602084013e611321565b606091505b50509050806113b2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f5472616e7366657248656c7065723a204554485f5452414e534645525f46414960448201527f4c45440000000000000000000000000000000000000000000000000000000000606482015260840161073f565b505050565b60405173ffffffffffffffffffffffffffffffffffffffff83166024820152604481018290526113b29084907fa9059cbb00000000000000000000000000000000000000000000000000000000906064015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff00000000000000000000000000000000000000000000000000000000909316929092179091526117c1565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009073ffffffffffffffffffffffffffffffffffffffff8416906370a0823190602401602060405180830381865afa1580156114f8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061151c9190612013565b905061154073ffffffffffffffffffffffffffffffffffffffff84163330856115e1565b6040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152819073ffffffffffffffffffffffffffffffffffffffff8516906370a0823190602401602060405180830381865afa1580156115ac573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115d09190612013565b6115da9190611f2f565b9392505050565b60405173ffffffffffffffffffffffffffffffffffffffff80851660248301528316604482015260648101829052610e799085907f23b872dd0000000000000000000000000000000000000000000000000000000090608401611409565b8015806116df57506040517fdd62ed3e00000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff838116602483015284169063dd62ed3e90604401602060405180830381865afa1580156116b9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116dd9190612013565b155b61176b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527f20746f206e6f6e2d7a65726f20616c6c6f77616e636500000000000000000000606482015260840161073f565b60405173ffffffffffffffffffffffffffffffffffffffff83166024820152604481018290526113b29084907f095ea7b30000000000000000000000000000000000000000000000000000000090606401611409565b6000611823826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166118cd9092919063ffffffff16565b8051909150156113b257808060200190518101906118419190612062565b6113b2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f74207375636365656400000000000000000000000000000000000000000000606482015260840161073f565b60606118dc84846000856118e4565b949350505050565b606082471015611976576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c0000000000000000000000000000000000000000000000000000606482015260840161073f565b843b6119de576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161073f565b6000808673ffffffffffffffffffffffffffffffffffffffff168587604051611a079190612050565b60006040518083038185875af1925050503d8060008114611a44576040519150601f19603f3d011682016040523d82523d6000602084013e611a49565b606091505b5091509150611a59828286611a64565b979650505050505050565b60608315611a735750816115da565b825115611a835782518084602001fd5b816040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161073f919061207f565b73ffffffffffffffffffffffffffffffffffffffff81168114611ad957600080fd5b50565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600082601f830112611b1c57600080fd5b813567ffffffffffffffff80821115611b3757611b37611adc565b604051601f83017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908282118183101715611b7d57611b7d611adc565b81604052838152866020858801011115611b9657600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060008060608587031215611bcc57600080fd5b8435611bd781611ab7565b9350602085013567ffffffffffffffff80821115611bf457600080fd5b818701915087601f830112611c0857600080fd5b813581811115611c1757600080fd5b8860208260061b8501011115611c2c57600080fd5b602083019550809450506040870135915080821115611c4a57600080fd5b50611c5787828801611b0b565b91505092959194509250565b600060208284031215611c7557600080fd5b81356115da81611ab7565b60008060408385031215611c9357600080fd5b8235611c9e81611ab7565b91506020830135611cae81611ab7565b809150509250929050565b60008083601f840112611ccb57600080fd5b50813567ffffffffffffffff811115611ce357600080fd5b6020830191508360208260051b8501011115611cfe57600080fd5b9250929050565b600080600080600080600060a0888a031215611d2057600080fd5b8735611d2b81611ab7565b9650602088013567ffffffffffffffff80821115611d4857600080fd5b611d548b838c01611cb9565b909850965060408a01359150611d6982611ab7565b90945060608901359080821115611d7f57600080fd5b611d8b8b838c01611cb9565b909550935060808a0135915080821115611da457600080fd5b50611db18a828b01611b0b565b91505092959891949750929550565b60008060208385031215611dd357600080fd5b823567ffffffffffffffff811115611dea57600080fd5b611df685828601611cb9565b90969095509350505050565b600080600060608486031215611e1757600080fd5b8335611e2281611ab7565b9250602084013567ffffffffffffffff80821115611e3f57600080fd5b9085019060808288031215611e5357600080fd5b90925060408501359080821115611e6957600080fd5b50611e7686828701611b0b565b9150509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b80820180821115611ef157611ef1611eaf565b92915050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611f2857611f28611eaf565b5060010190565b81810381811115611ef157611ef1611eaf565b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81833603018112611f7657600080fd5b9190910192915050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112611fb557600080fd5b83018035915067ffffffffffffffff821115611fd057600080fd5b6020019150600681901b3603821315611cfe57600080fd5b8015158114611ad957600080fd5b60006020828403121561200857600080fd5b81356115da81611fe8565b60006020828403121561202557600080fd5b5051919050565b60005b8381101561204757818101518382015260200161202f565b50506000910152565b60008251611f7681846020870161202c565b60006020828403121561207457600080fd5b81516115da81611fe8565b602081526000825180602084015261209e81604085016020870161202c565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016040019291505056fea2646970667358221220ec0fadc55a188680d85e1d293129535865dbdf055dfe5251e248c29bb2d7398b64736f6c63430008110033"
    };
});
define("@scom/commission-proxy/contracts/ProxyWtihDistributor.ts", ["require", "exports", "@ijstech/eth-contract", "@scom/commission-proxy/contracts/ProxyWtihDistributor.json.ts"], function (require, exports, eth_contract_3, ProxyWtihDistributor_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProxyWtihDistributor = void 0;
    class ProxyWtihDistributor extends eth_contract_3.Contract {
        constructor(wallet, address) {
            super(wallet, address, ProxyWtihDistributor_json_1.default.abi, ProxyWtihDistributor_json_1.default.bytecode);
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
                amount: new eth_contract_3.BigNumber(result.amount),
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
                amount: new eth_contract_3.BigNumber(result.amount),
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
                amount: new eth_contract_3.BigNumber(result.amount),
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
                amount: new eth_contract_3.BigNumber(result.amount),
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
                amount: new eth_contract_3.BigNumber(result.amount),
                commissions: new eth_contract_3.BigNumber(result.commissions),
                _event: event
            };
        }
        assign() {
            let distributionsParams = (params) => [params.param1, params.param2];
            let distributions_call = async (params, options) => {
                let result = await this.call('distributions', distributionsParams(params), options);
                return new eth_contract_3.BigNumber(result);
            };
            this.distributions = distributions_call;
            let lastBalance_call = async (param1, options) => {
                let result = await this.call('lastBalance', [param1], options);
                return new eth_contract_3.BigNumber(result);
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
            let proxyCallParams = (params) => [params.target, params.tokensIn.map(e => ([e.token, this.wallet.utils.toString(e.amount), e.directTransfer, e.commissions.map(e => ([e.to, this.wallet.utils.toString(e.amount)]))])), params.to, params.tokensOut, this.wallet.utils.stringToBytes(params.data)];
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
            let tokenInParams = (params) => [params.target, [params.tokensIn.token, this.wallet.utils.toString(params.tokensIn.amount), params.tokensIn.directTransfer, params.tokensIn.commissions.map(e => ([e.to, this.wallet.utils.toString(e.amount)]))], this.wallet.utils.stringToBytes(params.data)];
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
    exports.ProxyWtihDistributor = ProxyWtihDistributor;
});
define("@scom/commission-proxy/contracts/index.ts", ["require", "exports", "@scom/commission-proxy/contracts/Distributor.ts", "@scom/commission-proxy/contracts/Proxy.ts", "@scom/commission-proxy/contracts/ProxyWtihDistributor.ts"], function (require, exports, Distributor_1, Proxy_1, ProxyWtihDistributor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProxyWtihDistributor = exports.Proxy = exports.Distributor = void 0;
    Object.defineProperty(exports, "Distributor", { enumerable: true, get: function () { return Distributor_1.Distributor; } });
    Object.defineProperty(exports, "Proxy", { enumerable: true, get: function () { return Proxy_1.Proxy; } });
    Object.defineProperty(exports, "ProxyWtihDistributor", { enumerable: true, get: function () { return ProxyWtihDistributor_1.ProxyWtihDistributor; } });
});
define("@scom/commission-proxy", ["require", "exports", "@scom/commission-proxy/contracts/index.ts", "@ijstech/eth-wallet"], function (require, exports, Contracts, eth_wallet_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.onProgress = exports.deployProxyWithDistributor = exports.deploy = exports.DefaultDeployOptions = exports.Contracts = void 0;
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
        progress('Deploy Distributor');
        await distributor.deploy();
        progress('Distributor deployed ' + distributor.address);
        progress('Deploy Proxy');
        await proxy.deploy(distributor.address);
        progress('Proxy deployed ' + proxy.address);
        progress('Contracts deployment finished');
        return {
            distributor: distributor.address,
            proxy: proxy.address
        };
    }
    exports.deploy = deploy;
    ;
    async function deployProxyWithDistributor(wallet, options) {
        progress('Contracts deployment start');
        let proxy = new Contracts.ProxyWtihDistributor(wallet);
        progress('Deploy Proxy');
        await proxy.deploy();
        progress('Proxy deployed ' + proxy.address);
        progress('Contracts deployment finished');
        return {
            distributor: eth_wallet_1.Utils.nullAddress,
            proxy: proxy.address
        };
    }
    exports.deployProxyWithDistributor = deployProxyWithDistributor;
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
