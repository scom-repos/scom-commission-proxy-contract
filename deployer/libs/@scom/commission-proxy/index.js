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
        "bytecode": "608060405234801561001057600080fd5b50610d21806100206000396000f3fe60806040526004361061005a5760003560e01c8063cf53a96011610043578063cf53a960146100cb578063ee42d3a3146100de578063f303ad6e1461010b57600080fd5b80631e83409a1461005f578063504ffe5214610081575b600080fd5b34801561006b57600080fd5b5061007f61007a366004610a03565b61012b565b005b34801561008d57600080fd5b506100b961009c366004610a27565b600160209081526000928352604080842090915290825290205481565b60405190815260200160405180910390f35b61007f6100d9366004610a60565b61021d565b3480156100ea57600080fd5b506100b96100f9366004610a03565b60006020819052908152604090205481565b34801561011757600080fd5b5061007f610126366004610ae8565b6104fd565b33600090815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff851684528252808320805490849055918390528220805491928392610178908490610b8c565b909155505073ffffffffffffffffffffffffffffffffffffffff82166101a7576101a2338261054b565b6101c8565b6101c873ffffffffffffffffffffffffffffffffffffffff8316338361065a565b6040805173ffffffffffffffffffffffffffffffffffffffff841681526020810183905233917f70eb43c4a8ae8c40502dcf22436c509c28d6ff421cf07c491be56984bd987068910160405180910390a25050565b806000805b82811015610377573685858381811061023d5761023d610ba5565b90506040020190508060200135836102559190610bd4565b92506020810180359060019060009061026e9085610a03565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546102f49190610bd4565b909155507fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef90506103286020830183610a03565b6040805173ffffffffffffffffffffffffffffffffffffffff9283168152918a166020838101919091528401359082015260600160405180910390a1508061036f81610be7565b915050610222565b50600073ffffffffffffffffffffffffffffffffffffffff861615610429576040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff8716906370a0823190602401602060405180830381865afa158015610400573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104249190610c1f565b61042b565b475b73ffffffffffffffffffffffffffffffffffffffff871660009081526020819052604090205490915061045f908390610bd4565b8110156104cd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f556e64657266756e64000000000000000000000000000000000000000000000060448201526064015b60405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff90951660009081526020819052604090209490945550505050565b8060005b818110156105455761053384848381811061051e5761051e610ba5565b905060200201602081019061007a9190610a03565b8061053d81610be7565b915050610501565b50505050565b6040805160008082526020820190925273ffffffffffffffffffffffffffffffffffffffff84169083906040516105829190610c5c565b60006040518083038185875af1925050503d80600081146105bf576040519150601f19603f3d011682016040523d82523d6000602084013e6105c4565b606091505b5050905080610655576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f5472616e7366657248656c7065723a204554485f5452414e534645525f46414960448201527f4c4544000000000000000000000000000000000000000000000000000000000060648201526084016104c4565b505050565b6040805173ffffffffffffffffffffffffffffffffffffffff848116602483015260448083018590528351808403909101815260649092018352602080830180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb0000000000000000000000000000000000000000000000000000000017905283518085019094528084527f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c656490840152610655928692916000916107259185169084906107cf565b80519091501561065557808060200190518101906107439190610c78565b610655576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f7420737563636565640000000000000000000000000000000000000000000060648201526084016104c4565b60606107de84846000856107e6565b949350505050565b606082471015610878576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c000000000000000000000000000000000000000000000000000060648201526084016104c4565b6000808673ffffffffffffffffffffffffffffffffffffffff1685876040516108a19190610c5c565b60006040518083038185875af1925050503d80600081146108de576040519150601f19603f3d011682016040523d82523d6000602084013e6108e3565b606091505b50915091506108f4878383876108ff565b979650505050505050565b6060831561099557825160000361098e5773ffffffffffffffffffffffffffffffffffffffff85163b61098e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016104c4565b50816107de565b6107de83838151156109aa5781518083602001fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104c49190610c9a565b73ffffffffffffffffffffffffffffffffffffffff81168114610a0057600080fd5b50565b600060208284031215610a1557600080fd5b8135610a20816109de565b9392505050565b60008060408385031215610a3a57600080fd5b8235610a45816109de565b91506020830135610a55816109de565b809150509250929050565b600080600060408486031215610a7557600080fd5b8335610a80816109de565b9250602084013567ffffffffffffffff80821115610a9d57600080fd5b818601915086601f830112610ab157600080fd5b813581811115610ac057600080fd5b8760208260061b8501011115610ad557600080fd5b6020830194508093505050509250925092565b60008060208385031215610afb57600080fd5b823567ffffffffffffffff80821115610b1357600080fd5b818501915085601f830112610b2757600080fd5b813581811115610b3657600080fd5b8660208260051b8501011115610b4b57600080fd5b60209290920196919550909350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b81810381811115610b9f57610b9f610b5d565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b80820180821115610b9f57610b9f610b5d565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610c1857610c18610b5d565b5060010190565b600060208284031215610c3157600080fd5b5051919050565b60005b83811015610c53578181015183820152602001610c3b565b50506000910152565b60008251610c6e818460208701610c38565b9190910192915050565b600060208284031215610c8a57600080fd5b81518015158114610a2057600080fd5b6020815260008251806020840152610cb9816040850160208701610c38565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016040019291505056fea26469706673582212206a28a0702b7d77a64ee4c5a96f67833b500abfeaab3f7f2c8e95e4c4a76161d264736f6c63430008110033"
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
    Distributor._abi = Distributor_json_1.default.abi;
});
define("@scom/commission-proxy/contracts/Proxy.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/commission-proxy/contracts/Proxy.json.ts'/> 
    exports.default = {
        "abi": [
            { "inputs": [{ "internalType": "contract IDistributor", "name": "_distributor", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "target", "type": "address" }, { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "TransferBack", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "target", "type": "address" }, { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "commissions", "type": "uint256" }], "name": "TransferForward", "type": "event" },
            { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct IDistributor.Commission[]", "name": "commissions", "type": "tuple[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "ethIn", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "components": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "directTransfer", "type": "bool" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct IDistributor.Commission[]", "name": "commissions", "type": "tuple[]" }], "internalType": "struct Proxy.TokensIn[]", "name": "tokensIn", "type": "tuple[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "contract IERC20[]", "name": "tokensOut", "type": "address[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "proxyCall", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "components": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "directTransfer", "type": "bool" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct IDistributor.Commission[]", "name": "commissions", "type": "tuple[]" }], "internalType": "struct Proxy.TokensIn", "name": "tokensIn", "type": "tuple" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "tokenIn", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "stateMutability": "payable", "type": "receive" }
        ],
        "bytecode": "60a060405234801561001057600080fd5b50604051611b64380380611b6483398101604081905261002f91610040565b6001600160a01b0316608052610070565b60006020828403121561005257600080fd5b81516001600160a01b038116811461006957600080fd5b9392505050565b608051611ab76100ad6000396000818160d8015281816104d501528181610568015281816105ca01528181610a750152610ab90152611ab76000f3fe6080604052600436106100385760003560e01c806301417e7b1461004457806373d8690f14610059578063c0da918d1461006c57600080fd5b3661003f57005b600080fd5b610057610052366004611570565b61007f565b005b610057610067366004611669565b6101ed565b61005761007a366004611724565b6109f6565b600082815b818110156100c75785858281811061009e5761009e6117a2565b90506040020160200135836100b39190611800565b9250806100bf81611819565b915050610084565b5060006100d48334611851565b90507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663cf53a96084600089896040518563ffffffff1660e01b815260040161013593929190611864565b6000604051808303818588803b15801561014e57600080fd5b505af1158015610162573d6000803e3d6000fd5b505060408051338152602081018690529081018790526000935073ffffffffffffffffffffffffffffffffffffffff8b1692507f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b915060600160405180910390a3600080855186602001848b5af1806000036101e2573d6000803e3d6000fd5b503d6000803e3d6000f35b8160008167ffffffffffffffff81111561020957610209611496565b604051908082528060200260200182016040528015610232578160200160208202803683370190505b50905060005b82811015610371576000868683818110610254576102546117a2565b905060200201602081019061026991906118d6565b73ffffffffffffffffffffffffffffffffffffffff161461034057858582818110610296576102966117a2565b90506020020160208101906102ab91906118d6565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff91909116906370a0823190602401602060405180830381865afa158015610317573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061033b91906118f3565b610342565b475b828281518110610354576103546117a2565b60209081029190910101528061036981611819565b915050610238565b508691506000805b8381101561079557368a8a83818110610394576103946117a2565b90506020028101906103a6919061190c565b90506000806103b8606084018461194a565b9050905060005b8181101561040d576103d4606085018561194a565b828181106103e4576103e46117a2565b90506040020160200135836103f99190611800565b92508061040581611819565b9150506103bf565b5060009050610420826020850135611851565b9050600061043160208501856118d6565b73ffffffffffffffffffffffffffffffffffffffff160361056257826020013534146104be576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f45544820616d6f756e74206e6f74206d6174636865640000000000000000000060448201526064015b60405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001663cf53a96083600061050a606088018861194a565b6040518563ffffffff1660e01b815260040161052893929190611864565b6000604051808303818588803b15801561054157600080fd5b505af1158015610555573d6000803e3d6000fd5b50505050508094506106e1565b6105b3337f00000000000000000000000000000000000000000000000000000000000000008461059560208801886118d6565b73ffffffffffffffffffffffffffffffffffffffff16929190610c37565b73ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001663cf53a9606105fc60208601866118d6565b610609606087018761194a565b6040518463ffffffff1660e01b815260040161062793929190611864565b600060405180830381600087803b15801561064157600080fd5b505af1158015610655573d6000803e3d6000fd5b5061066a9250505060608401604085016119c0565b1561068757610682338f8361059560208801886118d6565b6106e1565b61069d61069760208501856118d6565b82610d19565b90506106cf8e60006106b260208701876118d6565b73ffffffffffffffffffffffffffffffffffffffff169190610e6f565b6106e18e826106b260208701876118d6565b6106ee60208401846118d6565b73ffffffffffffffffffffffffffffffffffffffff168e73ffffffffffffffffffffffffffffffffffffffff167f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b3384866040516107779392919073ffffffffffffffffffffffffffffffffffffffff9390931683526020830191909152604082015260600190565b60405180910390a3505050808061078d90611819565b915050610379565b50600080855186602001848e5af1806000036107b5573d6000803e3d6000fd5b5084925060005b838110156101e2576000808888848181106107d9576107d96117a2565b90506020020160208101906107ee91906118d6565b73ffffffffffffffffffffffffffffffffffffffff160361083f5783828151811061081b5761081b6117a2565b60200260200101514761082e9190611851565b905061083a8982610ff6565b610965565b838281518110610851576108516117a2565b602002602001015188888481811061086b5761086b6117a2565b905060200201602081019061088091906118d6565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff91909116906370a0823190602401602060405180830381865afa1580156108ec573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061091091906118f3565b61091a9190611851565b905061096589828a8a86818110610933576109336117a2565b905060200201602081019061094891906118d6565b73ffffffffffffffffffffffffffffffffffffffff169190611100565b878783818110610977576109776117a2565b905060200201602081019061098c91906118d6565b6040805173ffffffffffffffffffffffffffffffffffffffff8c8116825260208201859052928316928f16917fc2534859c9972270c16d5b4255d200f9a0385f9a6ce3add96c0427ff9fc70f93910160405180910390a350806109ee81611819565b9150506107bc565b81600080610a07606084018461194a565b9050905060005b81811015610a5c57610a23606085018561194a565b82818110610a3357610a336117a2565b9050604002016020013583610a489190611800565b925080610a5481611819565b915050610a0e565b506000610a6d836020860135611851565b9050610aa2337f00000000000000000000000000000000000000000000000000000000000000008561059560208901896118d6565b73ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001663cf53a960610aeb60208701876118d6565b610af8606088018861194a565b6040518463ffffffff1660e01b8152600401610b1693929190611864565b600060405180830381600087803b158015610b3057600080fd5b505af1158015610b44573d6000803e3d6000fd5b50610b599250505060608501604086016119c0565b15610b7657610b7133888361059560208901896118d6565b610bad565b610b8661069760208601866118d6565b9050610b9b8760006106b260208801886118d6565b610bad87826106b260208801886118d6565b610bba60208501856118d6565b604080513381526020810184905290810185905273ffffffffffffffffffffffffffffffffffffffff918216918916907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a360008086518760200160008b5af1806000036101e2573d6000803e3d6000fd5b60405173ffffffffffffffffffffffffffffffffffffffff80851660248301528316604482015260648101829052610d139085907f23b872dd00000000000000000000000000000000000000000000000000000000906084015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152611156565b50505050565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009073ffffffffffffffffffffffffffffffffffffffff8416906370a0823190602401602060405180830381865afa158015610d86573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610daa91906118f3565b9050610dce73ffffffffffffffffffffffffffffffffffffffff8416333085610c37565b6040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152819073ffffffffffffffffffffffffffffffffffffffff8516906370a0823190602401602060405180830381865afa158015610e3a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e5e91906118f3565b610e689190611851565b9392505050565b801580610f0f57506040517fdd62ed3e00000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff838116602483015284169063dd62ed3e90604401602060405180830381865afa158015610ee9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f0d91906118f3565b155b610f9b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527f20746f206e6f6e2d7a65726f20616c6c6f77616e63650000000000000000000060648201526084016104b5565b60405173ffffffffffffffffffffffffffffffffffffffff8316602482015260448101829052610ff19084907f095ea7b30000000000000000000000000000000000000000000000000000000090606401610c91565b505050565b6040805160008082526020820190925273ffffffffffffffffffffffffffffffffffffffff841690839060405161102d9190611a01565b60006040518083038185875af1925050503d806000811461106a576040519150601f19603f3d011682016040523d82523d6000602084013e61106f565b606091505b5050905080610ff1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f5472616e7366657248656c7065723a204554485f5452414e534645525f46414960448201527f4c4544000000000000000000000000000000000000000000000000000000000060648201526084016104b5565b60405173ffffffffffffffffffffffffffffffffffffffff8316602482015260448101829052610ff19084907fa9059cbb0000000000000000000000000000000000000000000000000000000090606401610c91565b60006111b8826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166112629092919063ffffffff16565b805190915015610ff157808060200190518101906111d69190611a13565b610ff1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f7420737563636565640000000000000000000000000000000000000000000060648201526084016104b5565b60606112718484600085611279565b949350505050565b60608247101561130b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c000000000000000000000000000000000000000000000000000060648201526084016104b5565b6000808673ffffffffffffffffffffffffffffffffffffffff1685876040516113349190611a01565b60006040518083038185875af1925050503d8060008114611371576040519150601f19603f3d011682016040523d82523d6000602084013e611376565b606091505b509150915061138787838387611392565b979650505050505050565b606083156114285782516000036114215773ffffffffffffffffffffffffffffffffffffffff85163b611421576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016104b5565b5081611271565b611271838381511561143d5781518083602001fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104b59190611a30565b73ffffffffffffffffffffffffffffffffffffffff8116811461149357600080fd5b50565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600082601f8301126114d657600080fd5b813567ffffffffffffffff808211156114f1576114f1611496565b604051601f83017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f0116810190828211818310171561153757611537611496565b8160405283815286602085880101111561155057600080fd5b836020870160208301376000602085830101528094505050505092915050565b6000806000806060858703121561158657600080fd5b843561159181611471565b9350602085013567ffffffffffffffff808211156115ae57600080fd5b818701915087601f8301126115c257600080fd5b8135818111156115d157600080fd5b8860208260061b85010111156115e657600080fd5b60208301955080945050604087013591508082111561160457600080fd5b50611611878288016114c5565b91505092959194509250565b60008083601f84011261162f57600080fd5b50813567ffffffffffffffff81111561164757600080fd5b6020830191508360208260051b850101111561166257600080fd5b9250929050565b600080600080600080600060a0888a03121561168457600080fd5b873561168f81611471565b9650602088013567ffffffffffffffff808211156116ac57600080fd5b6116b88b838c0161161d565b909850965060408a013591506116cd82611471565b909450606089013590808211156116e357600080fd5b6116ef8b838c0161161d565b909550935060808a013591508082111561170857600080fd5b506117158a828b016114c5565b91505092959891949750929550565b60008060006060848603121561173957600080fd5b833561174481611471565b9250602084013567ffffffffffffffff8082111561176157600080fd5b908501906080828803121561177557600080fd5b9092506040850135908082111561178b57600080fd5b50611798868287016114c5565b9150509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b80820180821115611813576118136117d1565b92915050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361184a5761184a6117d1565b5060010190565b81810381811115611813576118136117d1565b73ffffffffffffffffffffffffffffffffffffffff848116825260406020808401829052838201859052600092869160608601855b888110156118c85784356118ac81611471565b8416825284830135838301529385019390850190600101611899565b509998505050505050505050565b6000602082840312156118e857600080fd5b8135610e6881611471565b60006020828403121561190557600080fd5b5051919050565b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8183360301811261194057600080fd5b9190910192915050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe184360301811261197f57600080fd5b83018035915067ffffffffffffffff82111561199a57600080fd5b6020019150600681901b360382131561166257600080fd5b801515811461149357600080fd5b6000602082840312156119d257600080fd5b8135610e68816119b2565b60005b838110156119f85781810151838201526020016119e0565b50506000910152565b600082516119408184602087016119dd565b600060208284031215611a2557600080fd5b8151610e68816119b2565b6020815260008251806020840152611a4f8160408501602087016119dd565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016040019291505056fea264697066735822122034b86398e5e7a7fd5c58765cd96b5e48756b2a1751024728425e12611c7ee15a64736f6c63430008110033"
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
    Proxy._abi = Proxy_json_1.default.abi;
});
define("@scom/commission-proxy/contracts/index.ts", ["require", "exports", "@scom/commission-proxy/contracts/Distributor.ts", "@scom/commission-proxy/contracts/Proxy.ts"], function (require, exports, Distributor_1, Proxy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Proxy = exports.Distributor = void 0;
    Object.defineProperty(exports, "Distributor", { enumerable: true, get: function () { return Distributor_1.Distributor; } });
    Object.defineProperty(exports, "Proxy", { enumerable: true, get: function () { return Proxy_1.Proxy; } });
});
define("@scom/commission-proxy", ["require", "exports", "@scom/commission-proxy/contracts/index.ts"], function (require, exports, Contracts) {
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
