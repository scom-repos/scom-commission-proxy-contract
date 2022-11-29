define("@ijstech/commission-proxy/contracts/Distributor.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@ijstech/commission-proxy/contracts/Distributor.json.ts'/> 
    exports.default = {
        "abi": [
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "AddCommission", "type": "event" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct IDistributor.Commission[]", "name": "commissions", "type": "tuple[]" }], "name": "addCommissions", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "distributions", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "lastBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }
        ],
        "bytecode": "608060405234801561001057600080fd5b506105be806100206000396000f3fe6080604052600436106100345760003560e01c8063504ffe5214610039578063cf53a96014610083578063ee42d3a314610098575b600080fd5b34801561004557600080fd5b506100716100543660046103db565b600160209081526000928352604080842090915290825290205481565b60405190815260200160405180910390f35b610096610091366004610414565b6100c5565b005b3480156100a457600080fd5b506100716100b336600461049c565b60006020819052908152604090205481565b806000805b8281101561021f57368585838181106100e5576100e56104c0565b90506040020190508060200135836100fd919061051e565b925060208101803590600190600090610116908561049c565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461019c919061051e565b909155507fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef90506101d0602083018361049c565b6040805173ffffffffffffffffffffffffffffffffffffffff9283168152918a166020838101919091528401359082015260600160405180910390a1508061021781610537565b9150506100ca565b50600073ffffffffffffffffffffffffffffffffffffffff8616156102d1576040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff8716906370a0823190602401602060405180830381865afa1580156102a8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102cc919061056f565b6102d3565b475b73ffffffffffffffffffffffffffffffffffffffff871660009081526020819052604090205490915061030790839061051e565b811015610374576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f556e64657266756e640000000000000000000000000000000000000000000000604482015260640160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8616600090815260208190526040812080548392906103a990849061051e565b9091555050505050505050565b73ffffffffffffffffffffffffffffffffffffffff811681146103d857600080fd5b50565b600080604083850312156103ee57600080fd5b82356103f9816103b6565b91506020830135610409816103b6565b809150509250929050565b60008060006040848603121561042957600080fd5b8335610434816103b6565b9250602084013567ffffffffffffffff8082111561045157600080fd5b818601915086601f83011261046557600080fd5b81358181111561047457600080fd5b8760208260061b850101111561048957600080fd5b6020830194508093505050509250925092565b6000602082840312156104ae57600080fd5b81356104b9816103b6565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b80820180821115610531576105316104ef565b92915050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610568576105686104ef565b5060010190565b60006020828403121561058157600080fd5b505191905056fea26469706673582212207b39cb6126726318e83330935864d05b07726f23a7a4429e3b8e4fa7e403224764736f6c63430008110033"
    };
});
define("@ijstech/commission-proxy/contracts/Distributor.ts", ["require", "exports", "@ijstech/eth-contract", "@ijstech/commission-proxy/contracts/Distributor.json.ts"], function (require, exports, eth_contract_1, Distributor_json_1) {
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
        }
    }
    exports.Distributor = Distributor;
});
define("@ijstech/commission-proxy/contracts/Proxy.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@ijstech/commission-proxy/contracts/Proxy.json.ts'/> 
    exports.default = {
        "abi": [
            { "inputs": [{ "internalType": "contract IDistributor", "name": "_distributor", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "target", "type": "address" }, { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "TransferBack", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "target", "type": "address" }, { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "commissions", "type": "uint256" }], "name": "TransferForward", "type": "event" },
            { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "components": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "directTransfer", "type": "bool" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct IDistributor.Commission[]", "name": "commissions", "type": "tuple[]" }], "internalType": "struct Proxy.TokensIn[]", "name": "tokensIn", "type": "tuple[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "contract IERC20[]", "name": "tokensOut", "type": "address[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "proxyCall", "outputs": [], "stateMutability": "payable", "type": "function" }
        ],
        "bytecode": "60a060405234801561001057600080fd5b506040516115fa3803806115fa83398101604081905261002f91610040565b6001600160a01b0316608052610070565b60006020828403121561005257600080fd5b81516001600160a01b038116811461006957600080fd5b9392505050565b60805161156161009960003960008181610320015281816103b3015261041501526115616000f3fe60806040526004361061001e5760003560e01c806373d8690f14610023575b600080fd5b610036610031366004611101565b610038565b005b8160008167ffffffffffffffff811115610054576100546110d2565b60405190808252806020026020018201604052801561007d578160200160208202803683370190505b50905060005b828110156101bc57600086868381811061009f5761009f61124c565b90506020020160208101906100b4919061127b565b73ffffffffffffffffffffffffffffffffffffffff161461018b578585828181106100e1576100e161124c565b90506020020160208101906100f6919061127b565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff91909116906370a0823190602401602060405180830381865afa158015610162573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101869190611298565b61018d565b475b82828151811061019f5761019f61124c565b6020908102919091010152806101b4816112e0565b915050610083565b508691506000805b838110156105e057368a8a838181106101df576101df61124c565b90506020028101906101f19190611318565b90506000806102036060840184611356565b9050905060005b818110156102585761021f6060850185611356565b8281811061022f5761022f61124c565b905060400201602001358361024491906113be565b925080610250816112e0565b91505061020a565b506000905061026b8260208501356113d7565b9050600061027c602085018561127b565b73ffffffffffffffffffffffffffffffffffffffff16036103ad5782602001353414610309576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f45544820616d6f756e74206e6f74206d6174636865640000000000000000000060448201526064015b60405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001663cf53a9608360006103556060880188611356565b6040518563ffffffff1660e01b8152600401610373939291906113ea565b6000604051808303818588803b15801561038c57600080fd5b505af11580156103a0573d6000803e3d6000fd5b505050505080945061052c565b6103fe337f0000000000000000000000000000000000000000000000000000000000000000846103e0602088018861127b565b73ffffffffffffffffffffffffffffffffffffffff1692919061084c565b73ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001663cf53a960610447602086018661127b565b6104546060870187611356565b6040518463ffffffff1660e01b8152600401610472939291906113ea565b600060405180830381600087803b15801561048c57600080fd5b505af11580156104a0573d6000803e3d6000fd5b506104b592505050606084016040850161146a565b156104d2576104cd338f836103e0602088018861127b565b61052c565b6104e86104e2602085018561127b565b8261092e565b905061051a8e60006104fd602087018761127b565b73ffffffffffffffffffffffffffffffffffffffff169190610a84565b61052c8e826104fd602087018761127b565b610539602084018461127b565b73ffffffffffffffffffffffffffffffffffffffff168e73ffffffffffffffffffffffffffffffffffffffff167f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b3384866040516105c29392919073ffffffffffffffffffffffffffffffffffffffff9390931683526020830191909152604082015260600190565b60405180910390a350505080806105d8906112e0565b9150506101c4565b50600080855186602001848e5af180600003610600573d6000803e3d6000fd5b5084925060005b83811015610841576000808888848181106106245761062461124c565b9050602002016020810190610639919061127b565b73ffffffffffffffffffffffffffffffffffffffff160361068a578382815181106106665761066661124c565b60200260200101514761067991906113d7565b90506106858982610c0b565b6107b0565b83828151811061069c5761069c61124c565b60200260200101518888848181106106b6576106b661124c565b90506020020160208101906106cb919061127b565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff91909116906370a0823190602401602060405180830381865afa158015610737573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061075b9190611298565b61076591906113d7565b90506107b089828a8a8681811061077e5761077e61124c565b9050602002016020810190610793919061127b565b73ffffffffffffffffffffffffffffffffffffffff169190610d15565b8787838181106107c2576107c261124c565b90506020020160208101906107d7919061127b565b6040805173ffffffffffffffffffffffffffffffffffffffff8c8116825260208201859052928316928f16917fc2534859c9972270c16d5b4255d200f9a0385f9a6ce3add96c0427ff9fc70f93910160405180910390a35080610839816112e0565b915050610607565b503d6000803e3d6000f35b60405173ffffffffffffffffffffffffffffffffffffffff808516602483015283166044820152606481018290526109289085907f23b872dd00000000000000000000000000000000000000000000000000000000906084015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152610d6b565b50505050565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009073ffffffffffffffffffffffffffffffffffffffff8416906370a0823190602401602060405180830381865afa15801561099b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109bf9190611298565b90506109e373ffffffffffffffffffffffffffffffffffffffff841633308561084c565b6040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152819073ffffffffffffffffffffffffffffffffffffffff8516906370a0823190602401602060405180830381865afa158015610a4f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a739190611298565b610a7d91906113d7565b9392505050565b801580610b2457506040517fdd62ed3e00000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff838116602483015284169063dd62ed3e90604401602060405180830381865afa158015610afe573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b229190611298565b155b610bb0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527f20746f206e6f6e2d7a65726f20616c6c6f77616e6365000000000000000000006064820152608401610300565b60405173ffffffffffffffffffffffffffffffffffffffff8316602482015260448101829052610c069084907f095ea7b300000000000000000000000000000000000000000000000000000000906064016108a6565b505050565b6040805160008082526020820190925273ffffffffffffffffffffffffffffffffffffffff8416908390604051610c4291906114ab565b60006040518083038185875af1925050503d8060008114610c7f576040519150601f19603f3d011682016040523d82523d6000602084013e610c84565b606091505b5050905080610c06576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f5472616e7366657248656c7065723a204554485f5452414e534645525f46414960448201527f4c454400000000000000000000000000000000000000000000000000000000006064820152608401610300565b60405173ffffffffffffffffffffffffffffffffffffffff8316602482015260448101829052610c069084907fa9059cbb00000000000000000000000000000000000000000000000000000000906064016108a6565b6000610dcd826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff16610e779092919063ffffffff16565b805190915015610c065780806020019051810190610deb91906114bd565b610c06576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f742073756363656564000000000000000000000000000000000000000000006064820152608401610300565b6060610e868484600085610e8e565b949350505050565b606082471015610f20576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c00000000000000000000000000000000000000000000000000006064820152608401610300565b843b610f88576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610300565b6000808673ffffffffffffffffffffffffffffffffffffffff168587604051610fb191906114ab565b60006040518083038185875af1925050503d8060008114610fee576040519150601f19603f3d011682016040523d82523d6000602084013e610ff3565b606091505b509150915061100382828661100e565b979650505050505050565b6060831561101d575081610a7d565b82511561102d5782518084602001fd5b816040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161030091906114da565b73ffffffffffffffffffffffffffffffffffffffff8116811461108357600080fd5b50565b60008083601f84011261109857600080fd5b50813567ffffffffffffffff8111156110b057600080fd5b6020830191508360208260051b85010111156110cb57600080fd5b9250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080600080600080600060a0888a03121561111c57600080fd5b873561112781611061565b9650602088013567ffffffffffffffff8082111561114457600080fd5b6111508b838c01611086565b909850965060408a0135915061116582611061565b9094506060890135908082111561117b57600080fd5b6111878b838c01611086565b909550935060808a01359150808211156111a057600080fd5b818a0191508a601f8301126111b457600080fd5b8135818111156111c6576111c66110d2565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f0116810190838211818310171561120c5761120c6110d2565b816040528281528d602084870101111561122557600080fd5b82602086016020830137600060208483010152809550505050505092959891949750929550565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006020828403121561128d57600080fd5b8135610a7d81611061565b6000602082840312156112aa57600080fd5b5051919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611311576113116112b1565b5060010190565b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8183360301811261134c57600080fd5b9190910192915050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe184360301811261138b57600080fd5b83018035915067ffffffffffffffff8211156113a657600080fd5b6020019150600681901b36038213156110cb57600080fd5b808201808211156113d1576113d16112b1565b92915050565b818103818111156113d1576113d16112b1565b73ffffffffffffffffffffffffffffffffffffffff848116825260406020808401829052838201859052600092869160608601855b8881101561144e57843561143281611061565b841682528483013583830152938501939085019060010161141f565b509998505050505050505050565b801515811461108357600080fd5b60006020828403121561147c57600080fd5b8135610a7d8161145c565b60005b838110156114a257818101518382015260200161148a565b50506000910152565b6000825161134c818460208701611487565b6000602082840312156114cf57600080fd5b8151610a7d8161145c565b60208152600082518060208401526114f9816040850160208701611487565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016040019291505056fea264697066735822122041c0176b86cb7fcd1da2c79249d971b809704a61bb3f442bcfe60c8751c7d28f64736f6c63430008110033"
    };
});
define("@ijstech/commission-proxy/contracts/Proxy.ts", ["require", "exports", "@ijstech/eth-contract", "@ijstech/commission-proxy/contracts/Proxy.json.ts"], function (require, exports, eth_contract_2, Proxy_json_1) {
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
        }
    }
    exports.Proxy = Proxy;
});
define("@ijstech/commission-proxy/contracts/index.ts", ["require", "exports", "@ijstech/commission-proxy/contracts/Distributor.ts", "@ijstech/commission-proxy/contracts/Proxy.ts"], function (require, exports, Distributor_1, Proxy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Proxy = exports.Distributor = void 0;
    Object.defineProperty(exports, "Distributor", { enumerable: true, get: function () { return Distributor_1.Distributor; } });
    Object.defineProperty(exports, "Proxy", { enumerable: true, get: function () { return Proxy_1.Proxy; } });
});
define("@ijstech/commission-proxy", ["require", "exports", "@ijstech/commission-proxy/contracts/index.ts"], function (require, exports, Contracts) {
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
        progress('Deploy Proxy');
        await distributor.deploy();
        await proxy.deploy(distributor.address);
        progress('Proxy deployed ' + distributor.address + ' ' + proxy.address);
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
