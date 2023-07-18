define("@scom/scom-commission-proxy-contract/contracts/Authorization.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-commission-proxy-contract/contracts/Authorization.json.ts'/> 
    exports.default = {
        "abi": [
            { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "Authorize", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "Deauthorize", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "StartOwnershipTransfer", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "TransferOwnership", "type": "event" },
            { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "deny", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "isPermitted", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "newOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "takeOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "newOwner_", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
        ],
        "bytecode": "608060405234801561001057600080fd5b50600080546001600160a01b031916331790556104e4806100326000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80639c52a7f11161005b5780639c52a7f114610109578063a2f55ae51461011c578063d4ee1d901461012f578063f2fde38b1461014f57600080fd5b80633fd8cc4e1461008257806360536172146100ba5780638da5cb5b146100c4575b600080fd5b6100a5610090366004610471565b60026020526000908152604090205460ff1681565b60405190151581526020015b60405180910390f35b6100c2610162565b005b6000546100e49073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100b1565b6100c2610117366004610471565b610290565b6100c261012a366004610471565b610337565b6001546100e49073ffffffffffffffffffffffffffffffffffffffff1681565b6100c261015d366004610471565b6103da565b60015473ffffffffffffffffffffffffffffffffffffffff16331461020d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e0000000000000000000000000000000000000000000000606482015260840160405180910390fd5b600180546000805473ffffffffffffffffffffffffffffffffffffffff83167fffffffffffffffffffffffff000000000000000000000000000000000000000091821681179092559091169091556040519081527fcfaaa26691e16e66e73290fc725eee1a6b4e0e693a1640484937aac25ffb55a49060200160405180910390a1565b60005473ffffffffffffffffffffffffffffffffffffffff1633146102b457600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905590519182527f79ede3839cd7a7d8bd77e97e5c890565fe4f76cdbbeaa364646e28a8695a788491015b60405180910390a150565b60005473ffffffffffffffffffffffffffffffffffffffff16331461035b57600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905590519182527f6d81a01b39982517ba331aeb4f387b0f9cc32334b65bb9a343a077973cf7adf5910161032c565b60005473ffffffffffffffffffffffffffffffffffffffff1633146103fe57600080fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040519081527f686a7ab184e6928ddedba810af7b443d6baa40bf32c4787ccd72c5b4b28cae1b9060200161032c565b60006020828403121561048357600080fd5b813573ffffffffffffffffffffffffffffffffffffffff811681146104a757600080fd5b939250505056fea264697066735822122033e2168c52e6ad7dba3a67ff5b9b8ef2f2aca308087efe2ebf7dfc9d5ef61bee64736f6c63430008110033"
    };
});
define("@scom/scom-commission-proxy-contract/contracts/Authorization.ts", ["require", "exports", "@ijstech/eth-contract", "@scom/scom-commission-proxy-contract/contracts/Authorization.json.ts"], function (require, exports, eth_contract_1, Authorization_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Authorization = void 0;
    class Authorization extends eth_contract_1.Contract {
        constructor(wallet, address) {
            super(wallet, address, Authorization_json_1.default.abi, Authorization_json_1.default.bytecode);
            this.assign();
        }
        deploy(options) {
            return this.__deploy([], options);
        }
        parseAuthorizeEvent(receipt) {
            return this.parseEvents(receipt, "Authorize").map(e => this.decodeAuthorizeEvent(e));
        }
        decodeAuthorizeEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseDeauthorizeEvent(receipt) {
            return this.parseEvents(receipt, "Deauthorize").map(e => this.decodeDeauthorizeEvent(e));
        }
        decodeDeauthorizeEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseStartOwnershipTransferEvent(receipt) {
            return this.parseEvents(receipt, "StartOwnershipTransfer").map(e => this.decodeStartOwnershipTransferEvent(e));
        }
        decodeStartOwnershipTransferEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseTransferOwnershipEvent(receipt) {
            return this.parseEvents(receipt, "TransferOwnership").map(e => this.decodeTransferOwnershipEvent(e));
        }
        decodeTransferOwnershipEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        assign() {
            let isPermitted_call = async (param1, options) => {
                let result = await this.call('isPermitted', [param1], options);
                return result;
            };
            this.isPermitted = isPermitted_call;
            let newOwner_call = async (options) => {
                let result = await this.call('newOwner', [], options);
                return result;
            };
            this.newOwner = newOwner_call;
            let owner_call = async (options) => {
                let result = await this.call('owner', [], options);
                return result;
            };
            this.owner = owner_call;
            let deny_send = async (user, options) => {
                let result = await this.send('deny', [user], options);
                return result;
            };
            let deny_call = async (user, options) => {
                let result = await this.call('deny', [user], options);
                return;
            };
            let deny_txData = async (user, options) => {
                let result = await this.txData('deny', [user], options);
                return result;
            };
            this.deny = Object.assign(deny_send, {
                call: deny_call,
                txData: deny_txData
            });
            let permit_send = async (user, options) => {
                let result = await this.send('permit', [user], options);
                return result;
            };
            let permit_call = async (user, options) => {
                let result = await this.call('permit', [user], options);
                return;
            };
            let permit_txData = async (user, options) => {
                let result = await this.txData('permit', [user], options);
                return result;
            };
            this.permit = Object.assign(permit_send, {
                call: permit_call,
                txData: permit_txData
            });
            let takeOwnership_send = async (options) => {
                let result = await this.send('takeOwnership', [], options);
                return result;
            };
            let takeOwnership_call = async (options) => {
                let result = await this.call('takeOwnership', [], options);
                return;
            };
            let takeOwnership_txData = async (options) => {
                let result = await this.txData('takeOwnership', [], options);
                return result;
            };
            this.takeOwnership = Object.assign(takeOwnership_send, {
                call: takeOwnership_call,
                txData: takeOwnership_txData
            });
            let transferOwnership_send = async (newOwner, options) => {
                let result = await this.send('transferOwnership', [newOwner], options);
                return result;
            };
            let transferOwnership_call = async (newOwner, options) => {
                let result = await this.call('transferOwnership', [newOwner], options);
                return;
            };
            let transferOwnership_txData = async (newOwner, options) => {
                let result = await this.txData('transferOwnership', [newOwner], options);
                return result;
            };
            this.transferOwnership = Object.assign(transferOwnership_send, {
                call: transferOwnership_call,
                txData: transferOwnership_txData
            });
        }
    }
    Authorization._abi = Authorization_json_1.default.abi;
    exports.Authorization = Authorization;
});
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
            { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct Proxy.Commission[]", "name": "commissions", "type": "tuple[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "ethIn", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "claimant", "type": "address" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }], "name": "getClaimantBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "fromId", "type": "uint256" }, { "internalType": "uint256", "name": "count", "type": "uint256" }], "name": "getClaimantsInfo", "outputs": [{ "components": [{ "internalType": "address", "name": "claimant", "type": "address" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }], "internalType": "struct Proxy.ClaimantInfo[]", "name": "claimantInfoList", "type": "tuple[]" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "lastBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "components": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "directTransfer", "type": "bool" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct Proxy.Commission[]", "name": "commissions", "type": "tuple[]" }], "internalType": "struct Proxy.TokensIn[]", "name": "tokensIn", "type": "tuple[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "contract IERC20[]", "name": "tokensOut", "type": "address[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "proxyCall", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20[]", "name": "tokens", "type": "address[]" }], "name": "skim", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "components": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "directTransfer", "type": "bool" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct Proxy.Commission[]", "name": "commissions", "type": "tuple[]" }], "internalType": "struct Proxy.TokensIn", "name": "tokensIn", "type": "tuple" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "tokenIn", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "stateMutability": "payable", "type": "receive" }
        ],
        "bytecode": "608060405234801561001057600080fd5b5061255a806100206000396000f3fe6080604052600436106100cb5760003560e01c8063b60c164c11610074578063d3b7d4c31161004e578063d3b7d4c31461027c578063ee42d3a31461029c578063f303ad6e146102c957600080fd5b8063b60c164c146101b1578063c0da918d146101d1578063d2ef8464146101f157600080fd5b806373d8690f116100a557806373d8690f1461014257806383e40a5114610155578063b316d7141461019b57600080fd5b806301417e7b146100d7578063188ff72b146100ec5780631e83409a1461012257600080fd5b366100d257005b600080fd5b6100ea6100e5366004611f63565b6102e9565b005b3480156100f857600080fd5b5061010c610107366004612010565b610493565b6040516101199190612032565b60405180910390f35b34801561012e57600080fd5b506100ea61013d3660046120a4565b610660565b6100ea61015036600461210d565b61066c565b34801561016157600080fd5b5061018d6101703660046121c8565b600360209081526000928352604080842090915290825290205481565b604051908152602001610119565b3480156101a757600080fd5b5061018d60005481565b3480156101bd57600080fd5b506100ea6101cc366004612201565b610e01565b3480156101dd57600080fd5b506100ea6101ec366004612243565b610fe9565b3480156101fd57600080fd5b5061024961020c3660046122c1565b600260208190526000918252604090912080546001820154919092015473ffffffffffffffffffffffffffffffffffffffff928316929091169083565b6040805173ffffffffffffffffffffffffffffffffffffffff948516815293909216602084015290820152606001610119565b34801561028857600080fd5b5061018d6102973660046121c8565b61134a565b3480156102a857600080fd5b5061018d6102b73660046120a4565b60016020526000908152604090205481565b3480156102d557600080fd5b506100ea6102e4366004612201565b611393565b600082815b818110156103bb5736868683818110610309576103096122da565b90506040020190508060200135846103219190612338565b935061033f61033360208301836120a4565b600083602001356113e0565b7fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef61036d60208301836120a4565b6040805173ffffffffffffffffffffffffffffffffffffffff909216825260006020838101919091528401359082015260600160405180910390a150806103b38161234b565b9150506102ee565b5060006103c88334612383565b600080805260016020527fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb4980549293508592909190610408908490612338565b9091555050604080513381526020810183905290810184905260009073ffffffffffffffffffffffffffffffffffffffff8916907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a3600080855186602001848b5af180600003610488573d6000803e3d6000fd5b503d6000803e3d6000f35b60606000831180156104a757506000548311155b610512576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f6f7574206f6620626f756e64730000000000000000000000000000000000000060448201526064015b60405180910390fd5b6000836000546105229190612383565b61052d906001612338565b90508083111561053b578092505b8267ffffffffffffffff81111561055457610554611e89565b6040519080825280602002602001820160405280156105bd57816020015b60408051606081018252600080825260208083018290529282015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9092019101816105725790505b5091508360005b84811015610657576000828152600260208181526040928390208351606081018552815473ffffffffffffffffffffffffffffffffffffffff9081168252600183015416928101929092529091015491810191909152845185908390811061062e5761062e6122da565b6020026020010181905250816106439061234b565b91508061064f8161234b565b9150506105c4565b50505092915050565b61066981611505565b50565b846000805b82811015610b44573689898381811061068c5761068c6122da565b905060200281019061069e9190612396565b90506000806106b060608401846123d4565b9050905060005b818110156107a957366106cd60608601866123d4565b838181106106dd576106dd6122da565b90506040020190508060200135846106f59190612338565b935061071e61070760208301836120a4565b61071460208801886120a4565b83602001356113e0565b7fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef61074c60208301836120a4565b61075960208801886120a4565b6040805173ffffffffffffffffffffffffffffffffffffffff9384168152929091166020838101919091528401359082015260600160405180910390a150806107a18161234b565b9150506106b7565b50600090506107bc826020850135612383565b905081600160006107d060208701876120a4565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546108199190612338565b909155506000905061082e60208501856120a4565b73ffffffffffffffffffffffffffffffffffffffff16036109265784156108b1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f6d6f7265207468616e206f6e6520455448207472616e736665720000000000006044820152606401610509565b8260200135341461091e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f45544820616d6f756e74206e6f74206d617463686564000000000000000000006044820152606401610509565b809450610ac4565b610936606084016040850161244a565b156109f557600061095361094d60208601866120a4565b84611633565b90508281146109be576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f636f6d6d697373696f6e20616d6f756e74206e6f74206d6174636865640000006044820152606401610509565b6109ef338f846109d160208901896120a4565b73ffffffffffffffffffffffffffffffffffffffff16929190611789565b50610ac4565b6000610a11610a0760208601866120a4565b8560200135611633565b905083602001358114610a80576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f616d6f756e74206e6f74206d61746368656400000000000000000000000000006044820152606401610509565b610ab08e6000610a9360208801886120a4565b73ffffffffffffffffffffffffffffffffffffffff169190611865565b610ac28e83610a9360208801886120a4565b505b610ad160208401846120a4565b604080513381526020810184905290810184905273ffffffffffffffffffffffffffffffffffffffff918216918f16907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a35050508080610b3c9061234b565b915050610671565b50600080845185602001848d5af180600003610b64573d6000803e3d6000fd5b5083915060005b8281101561048857600080878784818110610b8857610b886122da565b9050602002016020810190610b9d91906120a4565b73ffffffffffffffffffffffffffffffffffffffff1603610bfe576000805260016020527fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb4954610bed9047612383565b9050610bf988826119ec565b610d70565b60016000888885818110610c1457610c146122da565b9050602002016020810190610c2991906120a4565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054878784818110610c7657610c766122da565b9050602002016020810190610c8b91906120a4565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff91909116906370a0823190602401602060405180830381865afa158015610cf7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d1b9190612467565b610d259190612383565b9050610d708882898986818110610d3e57610d3e6122da565b9050602002016020810190610d5391906120a4565b73ffffffffffffffffffffffffffffffffffffffff169190611af6565b868683818110610d8257610d826122da565b9050602002016020810190610d9791906120a4565b6040805173ffffffffffffffffffffffffffffffffffffffff8b8116825260208201859052928316928e16917fc2534859c9972270c16d5b4255d200f9a0385f9a6ce3add96c0427ff9fc70f93910160405180910390a35080610df98161234b565b915050610b6b565b8060005b81811015610fe357600080858584818110610e2257610e226122da565b9050602002016020810190610e3791906120a4565b905073ffffffffffffffffffffffffffffffffffffffff8116610e9d576000805260016020527fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb4954479250610e8c9083612383565b9150610e9833836119ec565b610f81565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff8216906370a0823190602401602060405180830381865afa158015610f07573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f2b9190612467565b73ffffffffffffffffffffffffffffffffffffffff8216600090815260016020526040902054909250610f5e9083612383565b9150610f8173ffffffffffffffffffffffffffffffffffffffff82163384611af6565b604051828152339073ffffffffffffffffffffffffffffffffffffffff8316907f2ae72b44f59d038340fca5739135a1d51fc5ab720bb02d983e4c5ff4119ca7b89060200160405180910390a350508080610fdb9061234b565b915050610e05565b50505050565b81600080610ffa60608401846123d4565b9050905060005b818110156110e9573661101760608601866123d4565b83818110611027576110276122da565b905060400201905080602001358461103f9190612338565b935061105e61105160208301836120a4565b61071460208a018a6120a4565b7fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef61108c60208301836120a4565b61109960208a018a6120a4565b6040805173ffffffffffffffffffffffffffffffffffffffff9384168152929091166020838101919091528401359082015260600160405180910390a150806110e18161234b565b915050611001565b5060006110fa836020860135612383565b9050826001600061110e60208801886120a4565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546111579190612338565b9091555061116d9050606085016040860161244a565b1561120e57600061118a61118460208701876120a4565b85611633565b90508381146111f5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f636f6d6d697373696f6e20616d6f756e74206e6f74206d6174636865640000006044820152606401610509565b6112083389846109d160208a018a6120a4565b506112c0565b600061122a61122060208701876120a4565b8660200135611633565b905084602001358114611299576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f616d6f756e74206e6f74206d61746368656400000000000000000000000000006044820152606401610509565b6112ac886000610a9360208901896120a4565b6112be8883610a9360208901896120a4565b505b6112cd60208501856120a4565b604080513381526020810184905290810185905273ffffffffffffffffffffffffffffffffffffffff918216918916907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a360008086518760200160008b5af180600003610488573d6000803e3d6000fd5b73ffffffffffffffffffffffffffffffffffffffff8083166000908152600360209081526040808320938516835292815282822054825260029081905291902001545b92915050565b8060005b81811015610fe3576113ce8484838181106113b4576113b46122da565b90506020020160208101906113c991906120a4565b611505565b806113d88161234b565b915050611397565b73ffffffffffffffffffffffffffffffffffffffff8084166000908152600360209081526040808320938616835292905290812054908190036114d957600080815461142b9061234b565b909155506040805160608101825273ffffffffffffffffffffffffffffffffffffffff80871680835286821660208085018281528587018981526000805481526002808552898220985189549089167fffffffffffffffffffffffff0000000000000000000000000000000000000000918216178a55935160018a01805491909916941693909317909655519501949094558254918352600384528483209083529092529190912055610fe3565b600081815260026020819052604082200180548492906114fa908490612338565b909155505050505050565b33600090815260036020908152604080832073ffffffffffffffffffffffffffffffffffffffff8581168086529184528285205480865260028086528487208551606081018752815485168152600180830154909516818901529101805482870181905290889055938752919094529184208054939492939192839261158c908490612383565b909155505073ffffffffffffffffffffffffffffffffffffffff84166115bb576115b633826119ec565b6115dc565b6115dc73ffffffffffffffffffffffffffffffffffffffff85163383611af6565b6040805173ffffffffffffffffffffffffffffffffffffffff861681526020810183905233917f70eb43c4a8ae8c40502dcf22436c509c28d6ff421cf07c491be56984bd987068910160405180910390a250505050565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009073ffffffffffffffffffffffffffffffffffffffff8416906370a0823190602401602060405180830381865afa1580156116a0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116c49190612467565b90506116e873ffffffffffffffffffffffffffffffffffffffff8416333085611789565b6040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152819073ffffffffffffffffffffffffffffffffffffffff8516906370a0823190602401602060405180830381865afa158015611754573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117789190612467565b6117829190612383565b9392505050565b60405173ffffffffffffffffffffffffffffffffffffffff80851660248301528316604482015260648101829052610fe39085907f23b872dd00000000000000000000000000000000000000000000000000000000906084015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152611b4c565b80158061190557506040517fdd62ed3e00000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff838116602483015284169063dd62ed3e90604401602060405180830381865afa1580156118df573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119039190612467565b155b611991576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527f20746f206e6f6e2d7a65726f20616c6c6f77616e6365000000000000000000006064820152608401610509565b60405173ffffffffffffffffffffffffffffffffffffffff83166024820152604481018290526119e79084907f095ea7b300000000000000000000000000000000000000000000000000000000906064016117e3565b505050565b6040805160008082526020820190925273ffffffffffffffffffffffffffffffffffffffff8416908390604051611a2391906124a4565b60006040518083038185875af1925050503d8060008114611a60576040519150601f19603f3d011682016040523d82523d6000602084013e611a65565b606091505b50509050806119e7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f5472616e7366657248656c7065723a204554485f5452414e534645525f46414960448201527f4c454400000000000000000000000000000000000000000000000000000000006064820152608401610509565b60405173ffffffffffffffffffffffffffffffffffffffff83166024820152604481018290526119e79084907fa9059cbb00000000000000000000000000000000000000000000000000000000906064016117e3565b6000611bae826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff16611c589092919063ffffffff16565b8051909150156119e75780806020019051810190611bcc91906124b6565b6119e7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f742073756363656564000000000000000000000000000000000000000000006064820152608401610509565b6060611c678484600085611c6f565b949350505050565b606082471015611d01576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c00000000000000000000000000000000000000000000000000006064820152608401610509565b6000808673ffffffffffffffffffffffffffffffffffffffff168587604051611d2a91906124a4565b60006040518083038185875af1925050503d8060008114611d67576040519150601f19603f3d011682016040523d82523d6000602084013e611d6c565b606091505b5091509150611d7d87838387611d88565b979650505050505050565b60608315611e1e578251600003611e175773ffffffffffffffffffffffffffffffffffffffff85163b611e17576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610509565b5081611c67565b611c678383815115611e335781518083602001fd5b806040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161050991906124d3565b73ffffffffffffffffffffffffffffffffffffffff8116811461066957600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600082601f830112611ec957600080fd5b813567ffffffffffffffff80821115611ee457611ee4611e89565b604051601f83017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908282118183101715611f2a57611f2a611e89565b81604052838152866020858801011115611f4357600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060008060608587031215611f7957600080fd5b8435611f8481611e67565b9350602085013567ffffffffffffffff80821115611fa157600080fd5b818701915087601f830112611fb557600080fd5b813581811115611fc457600080fd5b8860208260061b8501011115611fd957600080fd5b602083019550809450506040870135915080821115611ff757600080fd5b5061200487828801611eb8565b91505092959194509250565b6000806040838503121561202357600080fd5b50508035926020909101359150565b602080825282518282018190526000919060409081850190868401855b82811015612097578151805173ffffffffffffffffffffffffffffffffffffffff9081168652878201511687860152850151858501526060909301929085019060010161204f565b5091979650505050505050565b6000602082840312156120b657600080fd5b813561178281611e67565b60008083601f8401126120d357600080fd5b50813567ffffffffffffffff8111156120eb57600080fd5b6020830191508360208260051b850101111561210657600080fd5b9250929050565b600080600080600080600060a0888a03121561212857600080fd5b873561213381611e67565b9650602088013567ffffffffffffffff8082111561215057600080fd5b61215c8b838c016120c1565b909850965060408a0135915061217182611e67565b9094506060890135908082111561218757600080fd5b6121938b838c016120c1565b909550935060808a01359150808211156121ac57600080fd5b506121b98a828b01611eb8565b91505092959891949750929550565b600080604083850312156121db57600080fd5b82356121e681611e67565b915060208301356121f681611e67565b809150509250929050565b6000806020838503121561221457600080fd5b823567ffffffffffffffff81111561222b57600080fd5b612237858286016120c1565b90969095509350505050565b60008060006060848603121561225857600080fd5b833561226381611e67565b9250602084013567ffffffffffffffff8082111561228057600080fd5b908501906080828803121561229457600080fd5b909250604085013590808211156122aa57600080fd5b506122b786828701611eb8565b9150509250925092565b6000602082840312156122d357600080fd5b5035919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b8082018082111561138d5761138d612309565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361237c5761237c612309565b5060010190565b8181038181111561138d5761138d612309565b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff818336030181126123ca57600080fd5b9190910192915050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe184360301811261240957600080fd5b83018035915067ffffffffffffffff82111561242457600080fd5b6020019150600681901b360382131561210657600080fd5b801515811461066957600080fd5b60006020828403121561245c57600080fd5b81356117828161243c565b60006020828403121561247957600080fd5b5051919050565b60005b8381101561249b578181015183820152602001612483565b50506000910152565b600082516123ca818460208701612480565b6000602082840312156124c857600080fd5b81516117828161243c565b60208152600082518060208401526124f2816040850160208701612480565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016040019291505056fea26469706673582212208741166fc231fb271ff0e49a5c08c7b28e738ee0db40a45e26ac068eacf5e10464736f6c63430008110033"
    };
});
define("@scom/scom-commission-proxy-contract/contracts/Proxy.ts", ["require", "exports", "@ijstech/eth-contract", "@scom/scom-commission-proxy-contract/contracts/Proxy.json.ts"], function (require, exports, eth_contract_2, Proxy_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Proxy = void 0;
    class Proxy extends eth_contract_2.Contract {
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
                amount: new eth_contract_2.BigNumber(result.amount),
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
                amount: new eth_contract_2.BigNumber(result.amount),
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
            let claimantIdCount_call = async (options) => {
                let result = await this.call('claimantIdCount', [], options);
                return new eth_contract_2.BigNumber(result);
            };
            this.claimantIdCount = claimantIdCount_call;
            let claimantIdsParams = (params) => [params.param1, params.param2];
            let claimantIds_call = async (params, options) => {
                let result = await this.call('claimantIds', claimantIdsParams(params), options);
                return new eth_contract_2.BigNumber(result);
            };
            this.claimantIds = claimantIds_call;
            let claimantsInfo_call = async (param1, options) => {
                let result = await this.call('claimantsInfo', [this.wallet.utils.toString(param1)], options);
                return {
                    claimant: result.claimant,
                    token: result.token,
                    balance: new eth_contract_2.BigNumber(result.balance)
                };
            };
            this.claimantsInfo = claimantsInfo_call;
            let getClaimantBalanceParams = (params) => [params.claimant, params.token];
            let getClaimantBalance_call = async (params, options) => {
                let result = await this.call('getClaimantBalance', getClaimantBalanceParams(params), options);
                return new eth_contract_2.BigNumber(result);
            };
            this.getClaimantBalance = getClaimantBalance_call;
            let getClaimantsInfoParams = (params) => [this.wallet.utils.toString(params.fromId), this.wallet.utils.toString(params.count)];
            let getClaimantsInfo_call = async (params, options) => {
                let result = await this.call('getClaimantsInfo', getClaimantsInfoParams(params), options);
                return (result.map(e => ({
                    claimant: e.claimant,
                    token: e.token,
                    balance: new eth_contract_2.BigNumber(e.balance)
                })));
            };
            this.getClaimantsInfo = getClaimantsInfo_call;
            let lastBalance_call = async (param1, options) => {
                let result = await this.call('lastBalance', [param1], options);
                return new eth_contract_2.BigNumber(result);
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
    Proxy._abi = Proxy_json_1.default.abi;
    exports.Proxy = Proxy;
});
define("@scom/scom-commission-proxy-contract/contracts/ProxyV2.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-commission-proxy-contract/contracts/ProxyV2.json.ts'/> 
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
            { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct ProxyV2.Commission[]", "name": "commissions", "type": "tuple[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "ethIn", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "claimant", "type": "address" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }], "name": "getClaimantBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "fromId", "type": "uint256" }, { "internalType": "uint256", "name": "count", "type": "uint256" }], "name": "getClaimantsInfo", "outputs": [{ "components": [{ "internalType": "address", "name": "claimant", "type": "address" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }], "internalType": "struct ProxyV2.ClaimantInfo[]", "name": "claimantInfoList", "type": "tuple[]" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "lastBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "components": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "directTransfer", "type": "bool" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct ProxyV2.Commission[]", "name": "commissions", "type": "tuple[]" }, { "internalType": "uint256", "name": "totalCommissions", "type": "uint256" }], "internalType": "struct ProxyV2.TokensIn[]", "name": "tokensIn", "type": "tuple[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "contract IERC20[]", "name": "tokensOut", "type": "address[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "proxyCall", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20[]", "name": "tokens", "type": "address[]" }], "name": "skim", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "components": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "directTransfer", "type": "bool" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct ProxyV2.Commission[]", "name": "commissions", "type": "tuple[]" }, { "internalType": "uint256", "name": "totalCommissions", "type": "uint256" }], "internalType": "struct ProxyV2.TokensIn", "name": "tokensIn", "type": "tuple" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "tokenIn", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "stateMutability": "payable", "type": "receive" }
        ],
        "bytecode": "608060405234801561001057600080fd5b506125ab806100206000396000f3fe6080604052600436106100cb5760003560e01c8063b60c164c11610074578063ee42d3a31161004e578063ee42d3a31461027c578063f303ad6e146102a9578063fddaea46146102c957600080fd5b8063b60c164c146101b1578063d2ef8464146101d1578063d3b7d4c31461025c57600080fd5b80637c93df2b116100a55780637c93df2b1461014257806383e40a5114610155578063b316d7141461019b57600080fd5b806301417e7b146100d7578063188ff72b146100ec5780631e83409a1461012257600080fd5b366100d257005b600080fd5b6100ea6100e5366004611fb4565b6102e9565b005b3480156100f857600080fd5b5061010c610107366004612061565b610493565b6040516101199190612083565b60405180910390f35b34801561012e57600080fd5b506100ea61013d3660046120f5565b610677565b6100ea61015036600461215e565b610683565b34801561016157600080fd5b5061018d610170366004612219565b600360209081526000928352604080842090915290825290205481565b604051908152602001610119565b3480156101a757600080fd5b5061018d60005481565b3480156101bd57600080fd5b506100ea6101cc366004612252565b610e3d565b3480156101dd57600080fd5b506102296101ec366004612294565b600260208190526000918252604090912080546001820154919092015473ffffffffffffffffffffffffffffffffffffffff928316929091169083565b6040805173ffffffffffffffffffffffffffffffffffffffff948516815293909216602084015290820152606001610119565b34801561026857600080fd5b5061018d610277366004612219565b611025565b34801561028857600080fd5b5061018d6102973660046120f5565b60016020526000908152604090205481565b3480156102b557600080fd5b506100ea6102c4366004612252565b61106e565b3480156102d557600080fd5b506100ea6102e43660046122ad565b6110bb565b600082815b818110156103bb57368686838181106103095761030961232b565b90506040020190508060200135846103219190612389565b935061033f61033360208301836120f5565b60008360200135611431565b7fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef61036d60208301836120f5565b6040805173ffffffffffffffffffffffffffffffffffffffff909216825260006020838101919091528401359082015260600160405180910390a150806103b38161239c565b9150506102ee565b5060006103c883346123d4565b600080805260016020527fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb4980549293508592909190610408908490612389565b9091555050604080513381526020810183905290810184905260009073ffffffffffffffffffffffffffffffffffffffff8916907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a3600080855186602001848b5af180600003610488573d6000803e3d6000fd5b503d6000803e3d6000f35b60606000831180156104a757506000548311155b610512576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f6f7574206f6620626f756e64730000000000000000000000000000000000000060448201526064015b60405180910390fd5b600060016105208486612389565b61052a91906123d4565b9050600054811115610552575060005461054484826123d4565b61054f906001612389565b92505b8267ffffffffffffffff81111561056b5761056b611eda565b6040519080825280602002602001820160405280156105d457816020015b60408051606081018252600080825260208083018290529282015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9092019101816105895790505b5091508360005b8481101561066e576000828152600260208181526040928390208351606081018552815473ffffffffffffffffffffffffffffffffffffffff908116825260018301541692810192909252909101549181019190915284518590839081106106455761064561232b565b60200260200101819052508161065a9061239c565b9150806106668161239c565b9150506105db565b50505092915050565b61068081611556565b50565b846000805b82811015610b8057368989838181106106a3576106a361232b565b90506020028101906106b591906123e7565b90506000806106c76060840184612425565b9050905060005b818110156107c057366106e46060860186612425565b838181106106f4576106f461232b565b905060400201905080602001358461070c9190612389565b935061073561071e60208301836120f5565b61072b60208801886120f5565b8360200135611431565b7fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef61076360208301836120f5565b61077060208801886120f5565b6040805173ffffffffffffffffffffffffffffffffffffffff9384168152929091166020838101919091528401359082015260600160405180910390a150806107b88161239c565b9150506106ce565b5060009050816001826107d660208701876120f5565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461081f9190612389565b909155506000905061083460208501856120f5565b73ffffffffffffffffffffffffffffffffffffffff160361093c5784156108b7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f6d6f7265207468616e206f6e6520455448207472616e736665720000000000006044820152606401610509565b82602001353414610924576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f45544820616d6f756e74206e6f74206d617463686564000000000000000000006044820152606401610509565b6109328260208501356123d4565b9050809450610b00565b61094c606084016040850161249b565b15610a2457600061096d61096360208601866120f5565b8560800135611684565b9050828110156109d9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f636f6d6d697373696f6e20616d6f756e74206e6f74206d6174636865640000006044820152606401610509565b6109eb608085013560208601356123d4565b9150610a1e338f84610a0060208901896120f5565b73ffffffffffffffffffffffffffffffffffffffff169291906117da565b50610b00565b6000610a40610a3660208601866120f5565b8560200135611684565b90508360200135811015610ab0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f616d6f756e74206e6f74206d61746368656400000000000000000000000000006044820152606401610509565b610aba83826123d4565b9150610aec8e6000610acf60208801886120f5565b73ffffffffffffffffffffffffffffffffffffffff1691906118b6565b610afe8e83610acf60208801886120f5565b505b610b0d60208401846120f5565b604080513381526020810184905290810184905273ffffffffffffffffffffffffffffffffffffffff918216918f16907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a35050508080610b789061239c565b915050610688565b50600080845185602001848d5af180600003610ba0573d6000803e3d6000fd5b5083915060005b8281101561048857600080878784818110610bc457610bc461232b565b9050602002016020810190610bd991906120f5565b73ffffffffffffffffffffffffffffffffffffffff1603610c3a576000805260016020527fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb4954610c2990476123d4565b9050610c358882611a3d565b610dac565b60016000888885818110610c5057610c5061232b565b9050602002016020810190610c6591906120f5565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054878784818110610cb257610cb261232b565b9050602002016020810190610cc791906120f5565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff91909116906370a0823190602401602060405180830381865afa158015610d33573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d5791906124b8565b610d6191906123d4565b9050610dac8882898986818110610d7a57610d7a61232b565b9050602002016020810190610d8f91906120f5565b73ffffffffffffffffffffffffffffffffffffffff169190611b47565b868683818110610dbe57610dbe61232b565b9050602002016020810190610dd391906120f5565b6040805173ffffffffffffffffffffffffffffffffffffffff8b8116825260208201859052928316928e16917fc2534859c9972270c16d5b4255d200f9a0385f9a6ce3add96c0427ff9fc70f93910160405180910390a35080610e358161239c565b915050610ba7565b8060005b8181101561101f57600080858584818110610e5e57610e5e61232b565b9050602002016020810190610e7391906120f5565b905073ffffffffffffffffffffffffffffffffffffffff8116610ed9576000805260016020527fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb4954479250610ec890836123d4565b9150610ed43383611a3d565b610fbd565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff8216906370a0823190602401602060405180830381865afa158015610f43573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f6791906124b8565b73ffffffffffffffffffffffffffffffffffffffff8216600090815260016020526040902054909250610f9a90836123d4565b9150610fbd73ffffffffffffffffffffffffffffffffffffffff82163384611b47565b604051828152339073ffffffffffffffffffffffffffffffffffffffff8316907f2ae72b44f59d038340fca5739135a1d51fc5ab720bb02d983e4c5ff4119ca7b89060200160405180910390a3505080806110179061239c565b915050610e41565b50505050565b73ffffffffffffffffffffffffffffffffffffffff8083166000908152600360209081526040808320938516835292815282822054825260029081905291902001545b92915050565b8060005b8181101561101f576110a984848381811061108f5761108f61232b565b90506020020160208101906110a491906120f5565b611556565b806110b38161239c565b915050611072565b816000806110cc6060840184612425565b9050905060005b818110156111bb57366110e96060860186612425565b838181106110f9576110f961232b565b90506040020190508060200135846111119190612389565b935061113061112360208301836120f5565b61072b60208a018a6120f5565b7fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef61115e60208301836120f5565b61116b60208a018a6120f5565b6040805173ffffffffffffffffffffffffffffffffffffffff9384168152929091166020838101919091528401359082015260600160405180910390a150806111b38161239c565b9150506110d3565b506000826001826111cf60208801886120f5565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546112189190612389565b9091555061122e9050606085016040860161249b565b156112e857600061124f61124560208701876120f5565b8660800135611684565b9050838110156112bb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f636f6d6d697373696f6e20616d6f756e74206e6f74206d6174636865640000006044820152606401610509565b6112cd608086013560208701356123d4565b91506112e2338984610a0060208a018a6120f5565b506113a7565b60006113046112fa60208701876120f5565b8660200135611684565b90508460200135811015611374576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f616d6f756e74206e6f74206d61746368656400000000000000000000000000006044820152606401610509565b61137e84826123d4565b9150611393886000610acf60208901896120f5565b6113a58883610acf60208901896120f5565b505b6113b460208501856120f5565b604080513381526020810184905290810185905273ffffffffffffffffffffffffffffffffffffffff918216918916907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a360008086518760200160008b5af180600003610488573d6000803e3d6000fd5b73ffffffffffffffffffffffffffffffffffffffff80841660009081526003602090815260408083209386168352929052908120549081900361152a57600080815461147c9061239c565b909155506040805160608101825273ffffffffffffffffffffffffffffffffffffffff80871680835286821660208085018281528587018981526000805481526002808552898220985189549089167fffffffffffffffffffffffff0000000000000000000000000000000000000000918216178a55935160018a0180549190991694169390931790965551950194909455825491835260038452848320908352909252919091205561101f565b6000818152600260208190526040822001805484929061154b908490612389565b909155505050505050565b33600090815260036020908152604080832073ffffffffffffffffffffffffffffffffffffffff858116808652918452828520548086526002808652848720855160608101875281548516815260018083015490951681890152910180548287018190529088905593875291909452918420805493949293919283926115dd9084906123d4565b909155505073ffffffffffffffffffffffffffffffffffffffff841661160c576116073382611a3d565b61162d565b61162d73ffffffffffffffffffffffffffffffffffffffff85163383611b47565b6040805173ffffffffffffffffffffffffffffffffffffffff861681526020810183905233917f70eb43c4a8ae8c40502dcf22436c509c28d6ff421cf07c491be56984bd987068910160405180910390a250505050565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009073ffffffffffffffffffffffffffffffffffffffff8416906370a0823190602401602060405180830381865afa1580156116f1573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061171591906124b8565b905061173973ffffffffffffffffffffffffffffffffffffffff84163330856117da565b6040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152819073ffffffffffffffffffffffffffffffffffffffff8516906370a0823190602401602060405180830381865afa1580156117a5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117c991906124b8565b6117d391906123d4565b9392505050565b60405173ffffffffffffffffffffffffffffffffffffffff8085166024830152831660448201526064810182905261101f9085907f23b872dd00000000000000000000000000000000000000000000000000000000906084015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152611b9d565b80158061195657506040517fdd62ed3e00000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff838116602483015284169063dd62ed3e90604401602060405180830381865afa158015611930573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061195491906124b8565b155b6119e2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527f20746f206e6f6e2d7a65726f20616c6c6f77616e6365000000000000000000006064820152608401610509565b60405173ffffffffffffffffffffffffffffffffffffffff8316602482015260448101829052611a389084907f095ea7b30000000000000000000000000000000000000000000000000000000090606401611834565b505050565b6040805160008082526020820190925273ffffffffffffffffffffffffffffffffffffffff8416908390604051611a7491906124f5565b60006040518083038185875af1925050503d8060008114611ab1576040519150601f19603f3d011682016040523d82523d6000602084013e611ab6565b606091505b5050905080611a38576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f5472616e7366657248656c7065723a204554485f5452414e534645525f46414960448201527f4c454400000000000000000000000000000000000000000000000000000000006064820152608401610509565b60405173ffffffffffffffffffffffffffffffffffffffff8316602482015260448101829052611a389084907fa9059cbb0000000000000000000000000000000000000000000000000000000090606401611834565b6000611bff826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff16611ca99092919063ffffffff16565b805190915015611a385780806020019051810190611c1d9190612507565b611a38576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f742073756363656564000000000000000000000000000000000000000000006064820152608401610509565b6060611cb88484600085611cc0565b949350505050565b606082471015611d52576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c00000000000000000000000000000000000000000000000000006064820152608401610509565b6000808673ffffffffffffffffffffffffffffffffffffffff168587604051611d7b91906124f5565b60006040518083038185875af1925050503d8060008114611db8576040519150601f19603f3d011682016040523d82523d6000602084013e611dbd565b606091505b5091509150611dce87838387611dd9565b979650505050505050565b60608315611e6f578251600003611e685773ffffffffffffffffffffffffffffffffffffffff85163b611e68576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610509565b5081611cb8565b611cb88383815115611e845781518083602001fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105099190612524565b73ffffffffffffffffffffffffffffffffffffffff8116811461068057600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600082601f830112611f1a57600080fd5b813567ffffffffffffffff80821115611f3557611f35611eda565b604051601f83017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908282118183101715611f7b57611f7b611eda565b81604052838152866020858801011115611f9457600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060008060608587031215611fca57600080fd5b8435611fd581611eb8565b9350602085013567ffffffffffffffff80821115611ff257600080fd5b818701915087601f83011261200657600080fd5b81358181111561201557600080fd5b8860208260061b850101111561202a57600080fd5b60208301955080945050604087013591508082111561204857600080fd5b5061205587828801611f09565b91505092959194509250565b6000806040838503121561207457600080fd5b50508035926020909101359150565b602080825282518282018190526000919060409081850190868401855b828110156120e8578151805173ffffffffffffffffffffffffffffffffffffffff908116865287820151168786015285015185850152606090930192908501906001016120a0565b5091979650505050505050565b60006020828403121561210757600080fd5b81356117d381611eb8565b60008083601f84011261212457600080fd5b50813567ffffffffffffffff81111561213c57600080fd5b6020830191508360208260051b850101111561215757600080fd5b9250929050565b600080600080600080600060a0888a03121561217957600080fd5b873561218481611eb8565b9650602088013567ffffffffffffffff808211156121a157600080fd5b6121ad8b838c01612112565b909850965060408a013591506121c282611eb8565b909450606089013590808211156121d857600080fd5b6121e48b838c01612112565b909550935060808a01359150808211156121fd57600080fd5b5061220a8a828b01611f09565b91505092959891949750929550565b6000806040838503121561222c57600080fd5b823561223781611eb8565b9150602083013561224781611eb8565b809150509250929050565b6000806020838503121561226557600080fd5b823567ffffffffffffffff81111561227c57600080fd5b61228885828601612112565b90969095509350505050565b6000602082840312156122a657600080fd5b5035919050565b6000806000606084860312156122c257600080fd5b83356122cd81611eb8565b9250602084013567ffffffffffffffff808211156122ea57600080fd5b9085019060a082880312156122fe57600080fd5b9092506040850135908082111561231457600080fd5b5061232186828701611f09565b9150509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b808201808211156110685761106861235a565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036123cd576123cd61235a565b5060010190565b818103818111156110685761106861235a565b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6183360301811261241b57600080fd5b9190910192915050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe184360301811261245a57600080fd5b83018035915067ffffffffffffffff82111561247557600080fd5b6020019150600681901b360382131561215757600080fd5b801515811461068057600080fd5b6000602082840312156124ad57600080fd5b81356117d38161248d565b6000602082840312156124ca57600080fd5b5051919050565b60005b838110156124ec5781810151838201526020016124d4565b50506000910152565b6000825161241b8184602087016124d1565b60006020828403121561251957600080fd5b81516117d38161248d565b60208152600082518060208401526125438160408501602087016124d1565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016040019291505056fea26469706673582212209cca70a9576e9493198c65a6086f463ebf4f83feb8872306feb8c98fcff97b4b64736f6c63430008110033"
    };
});
define("@scom/scom-commission-proxy-contract/contracts/ProxyV2.ts", ["require", "exports", "@ijstech/eth-contract", "@scom/scom-commission-proxy-contract/contracts/ProxyV2.json.ts"], function (require, exports, eth_contract_3, ProxyV2_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProxyV2 = void 0;
    class ProxyV2 extends eth_contract_3.Contract {
        constructor(wallet, address) {
            super(wallet, address, ProxyV2_json_1.default.abi, ProxyV2_json_1.default.bytecode);
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
            let claimantIdCount_call = async (options) => {
                let result = await this.call('claimantIdCount', [], options);
                return new eth_contract_3.BigNumber(result);
            };
            this.claimantIdCount = claimantIdCount_call;
            let claimantIdsParams = (params) => [params.param1, params.param2];
            let claimantIds_call = async (params, options) => {
                let result = await this.call('claimantIds', claimantIdsParams(params), options);
                return new eth_contract_3.BigNumber(result);
            };
            this.claimantIds = claimantIds_call;
            let claimantsInfo_call = async (param1, options) => {
                let result = await this.call('claimantsInfo', [this.wallet.utils.toString(param1)], options);
                return {
                    claimant: result.claimant,
                    token: result.token,
                    balance: new eth_contract_3.BigNumber(result.balance)
                };
            };
            this.claimantsInfo = claimantsInfo_call;
            let getClaimantBalanceParams = (params) => [params.claimant, params.token];
            let getClaimantBalance_call = async (params, options) => {
                let result = await this.call('getClaimantBalance', getClaimantBalanceParams(params), options);
                return new eth_contract_3.BigNumber(result);
            };
            this.getClaimantBalance = getClaimantBalance_call;
            let getClaimantsInfoParams = (params) => [this.wallet.utils.toString(params.fromId), this.wallet.utils.toString(params.count)];
            let getClaimantsInfo_call = async (params, options) => {
                let result = await this.call('getClaimantsInfo', getClaimantsInfoParams(params), options);
                return (result.map(e => ({
                    claimant: e.claimant,
                    token: e.token,
                    balance: new eth_contract_3.BigNumber(e.balance)
                })));
            };
            this.getClaimantsInfo = getClaimantsInfo_call;
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
    ProxyV2._abi = ProxyV2_json_1.default.abi;
    exports.ProxyV2 = ProxyV2;
});
define("@scom/scom-commission-proxy-contract/contracts/ProxyV3.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-commission-proxy-contract/contracts/ProxyV3.json.ts'/> 
    exports.default = {
        "abi": [
            { "inputs": [{ "internalType": "uint24", "name": "_protocolRate", "type": "uint24" }], "stateMutability": "nonpayable", "type": "constructor" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "commission", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "commissionBalance", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "protocolFee", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "protocolFeeBalance", "type": "uint256" }], "name": "AddCommission", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "admin", "type": "address" }], "name": "AddProjectAdmin", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "Authorize", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Claim", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "ClaimProtocolFee", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "Deauthorize", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "campaignId", "type": "uint256" }], "name": "NewCampaign", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "projectId", "type": "uint256" }], "name": "NewProject", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "admin", "type": "address" }], "name": "RemoveProjectAdmin", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint24", "name": "protocolRate", "type": "uint24" }], "name": "SetProtocolRate", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Skim", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "balance", "type": "uint256" }], "name": "Stake", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "StartOwnershipTransfer", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "TakeoverProjectOwnership", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "target", "type": "address" }, { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "TransferBack", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "target", "type": "address" }, { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "TransferForward", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "TransferOwnership", "type": "event" },
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "TransferProjectOwnership", "type": "event" },
            { "inputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "internalType": "address", "name": "admin", "type": "address" }], "name": "addProjectAdmin", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "campaignAccumulatedCommission", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20[]", "name": "tokens", "type": "address[]" }], "name": "claimMultiple", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20[]", "name": "tokens", "type": "address[]" }], "name": "claimMultipleProtocolFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }], "name": "claimProtocolFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "claimantIdCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "claimantIds", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "claimantsInfo", "outputs": [{ "internalType": "address", "name": "claimant", "type": "address" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "deny", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "internalType": "bool", "name": "returnArrays", "type": "bool" }], "name": "getCampaign", "outputs": [{ "components": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "internalType": "uint24", "name": "maxInputTokensInEachCall", "type": "uint24" }, { "internalType": "uint24", "name": "maxOutputTokensInEachCall", "type": "uint24" }, { "internalType": "bool", "name": "referrersRequireApproval", "type": "bool" }, { "internalType": "uint64", "name": "startDate", "type": "uint64" }, { "internalType": "uint64", "name": "endDate", "type": "uint64" }, { "internalType": "bytes24[]", "name": "targetAndSelectors", "type": "bytes24[]" }, { "internalType": "bool", "name": "acceptAnyInToken", "type": "bool" }, { "internalType": "bool", "name": "acceptAnyOutToken", "type": "bool" }, { "internalType": "contract IERC20[]", "name": "inTokens", "type": "address[]" }, { "internalType": "bool[]", "name": "directTransferInToken", "type": "bool[]" }, { "components": [{ "internalType": "uint24", "name": "rate", "type": "uint24" }, { "internalType": "bool", "name": "feeOnProjectOwner", "type": "bool" }, { "internalType": "uint256", "name": "capPerTransaction", "type": "uint256" }, { "internalType": "uint256", "name": "capPerCampaign", "type": "uint256" }], "internalType": "struct ProxyV3.CommissionTokenConfig[]", "name": "commissionInTokenConfig", "type": "tuple[]" }, { "internalType": "contract IERC20[]", "name": "outTokens", "type": "address[]" }, { "components": [{ "internalType": "uint24", "name": "rate", "type": "uint24" }, { "internalType": "bool", "name": "feeOnProjectOwner", "type": "bool" }, { "internalType": "uint256", "name": "capPerTransaction", "type": "uint256" }, { "internalType": "uint256", "name": "capPerCampaign", "type": "uint256" }], "internalType": "struct ProxyV3.CommissionTokenConfig[]", "name": "commissionOutTokenConfig", "type": "tuple[]" }, { "internalType": "address[]", "name": "referrers", "type": "address[]" }], "internalType": "struct ProxyV3.CampaignParams", "name": "campaign", "type": "tuple" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "internalType": "uint256", "name": "targetAndSelectorsStart", "type": "uint256" }, { "internalType": "uint256", "name": "targetAndSelectorsLength", "type": "uint256" }, { "internalType": "uint256", "name": "referrersStart", "type": "uint256" }, { "internalType": "uint256", "name": "referrersLength", "type": "uint256" }], "name": "getCampaignArrayData1", "outputs": [{ "internalType": "bytes24[]", "name": "targetAndSelectors", "type": "bytes24[]" }, { "internalType": "address[]", "name": "referrers", "type": "address[]" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "internalType": "uint256", "name": "inTokensStart", "type": "uint256" }, { "internalType": "uint256", "name": "inTokensLength", "type": "uint256" }, { "internalType": "uint256", "name": "outTokensStart", "type": "uint256" }, { "internalType": "uint256", "name": "outTokensLength", "type": "uint256" }], "name": "getCampaignArrayData2", "outputs": [{ "internalType": "contract IERC20[]", "name": "inTokens", "type": "address[]" }, { "internalType": "bool[]", "name": "directTransferInToken", "type": "bool[]" }, { "components": [{ "internalType": "uint24", "name": "rate", "type": "uint24" }, { "internalType": "bool", "name": "feeOnProjectOwner", "type": "bool" }, { "internalType": "uint256", "name": "capPerTransaction", "type": "uint256" }, { "internalType": "uint256", "name": "capPerCampaign", "type": "uint256" }], "internalType": "struct ProxyV3.CommissionTokenConfig[]", "name": "commissionInTokenConfig", "type": "tuple[]" }, { "internalType": "contract IERC20[]", "name": "outTokens", "type": "address[]" }, { "components": [{ "internalType": "uint24", "name": "rate", "type": "uint24" }, { "internalType": "bool", "name": "feeOnProjectOwner", "type": "bool" }, { "internalType": "uint256", "name": "capPerTransaction", "type": "uint256" }, { "internalType": "uint256", "name": "capPerCampaign", "type": "uint256" }], "internalType": "struct ProxyV3.CommissionTokenConfig[]", "name": "commissionOutTokenConfig", "type": "tuple[]" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }], "name": "getCampaignArrayLength", "outputs": [{ "internalType": "uint256", "name": "targetAndSelectorsLength", "type": "uint256" }, { "internalType": "uint256", "name": "inTokensLength", "type": "uint256" }, { "internalType": "uint256", "name": "outTokensLength", "type": "uint256" }, { "internalType": "uint256", "name": "referrersLength", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "claimant", "type": "address" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }], "name": "getClaimantBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "fromId", "type": "uint256" }, { "internalType": "uint256", "name": "count", "type": "uint256" }], "name": "getClaimantsInfo", "outputs": [{ "components": [{ "internalType": "address", "name": "claimant", "type": "address" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }], "internalType": "struct ProxyV3.ClaimantInfo[]", "name": "claimantInfoList", "type": "tuple[]" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }], "name": "getProject", "outputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "newOwner", "type": "address" }, { "internalType": "address[]", "name": "projectAdmins", "type": "address[]" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }], "name": "getProjectAdminsLength", "outputs": [{ "internalType": "uint256", "name": "length", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "isPermitted", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "lastBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "components": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "internalType": "uint24", "name": "maxInputTokensInEachCall", "type": "uint24" }, { "internalType": "uint24", "name": "maxOutputTokensInEachCall", "type": "uint24" }, { "internalType": "bool", "name": "referrersRequireApproval", "type": "bool" }, { "internalType": "uint64", "name": "startDate", "type": "uint64" }, { "internalType": "uint64", "name": "endDate", "type": "uint64" }, { "internalType": "bytes24[]", "name": "targetAndSelectors", "type": "bytes24[]" }, { "internalType": "bool", "name": "acceptAnyInToken", "type": "bool" }, { "internalType": "bool", "name": "acceptAnyOutToken", "type": "bool" }, { "internalType": "contract IERC20[]", "name": "inTokens", "type": "address[]" }, { "internalType": "bool[]", "name": "directTransferInToken", "type": "bool[]" }, { "components": [{ "internalType": "uint24", "name": "rate", "type": "uint24" }, { "internalType": "bool", "name": "feeOnProjectOwner", "type": "bool" }, { "internalType": "uint256", "name": "capPerTransaction", "type": "uint256" }, { "internalType": "uint256", "name": "capPerCampaign", "type": "uint256" }], "internalType": "struct ProxyV3.CommissionTokenConfig[]", "name": "commissionInTokenConfig", "type": "tuple[]" }, { "internalType": "contract IERC20[]", "name": "outTokens", "type": "address[]" }, { "components": [{ "internalType": "uint24", "name": "rate", "type": "uint24" }, { "internalType": "bool", "name": "feeOnProjectOwner", "type": "bool" }, { "internalType": "uint256", "name": "capPerTransaction", "type": "uint256" }, { "internalType": "uint256", "name": "capPerCampaign", "type": "uint256" }], "internalType": "struct ProxyV3.CommissionTokenConfig[]", "name": "commissionOutTokenConfig", "type": "tuple[]" }, { "internalType": "address[]", "name": "referrers", "type": "address[]" }], "internalType": "struct ProxyV3.CampaignParams", "name": "params", "type": "tuple" }], "name": "newCampaign", "outputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "newOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address[]", "name": "admins", "type": "address[]" }], "name": "newProject", "outputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "protocolFeeBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "protocolRate", "outputs": [{ "internalType": "uint24", "name": "", "type": "uint24" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "internalType": "address", "name": "target", "type": "address" }, { "components": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct ProxyV3.TokensIn[]", "name": "tokensIn", "type": "tuple[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "contract IERC20[]", "name": "tokensOut", "type": "address[]" }, { "internalType": "address", "name": "referrer", "type": "address" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "proxyCall", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "internalType": "address", "name": "admin", "type": "address" }], "name": "removeProjectAdmin", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint24", "name": "newRate", "type": "uint24" }], "name": "setProtocolRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20[]", "name": "tokens", "type": "address[]" }], "name": "skim", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "stake", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }], "name": "stakeETH", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "internalType": "contract IERC20[]", "name": "token", "type": "address[]" }, { "internalType": "uint256[]", "name": "amount", "type": "uint256[]" }], "name": "stakeMultiple", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "stakesBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "takeOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }], "name": "takeoverProjectOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "newOwner_", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferProjectOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "stateMutability": "payable", "type": "receive" }
        ],
        "bytecode": "60806040523480156200001157600080fd5b506040516200584438038062005844833981016040819052620000349162000097565b600080546001600160a01b031916331790556003805462ffffff831662ffffff1990911681179091556040519081527ffe25e86988ec652fe5401545da69d35d6d22e8bcf8632c423f273264a656d22f9060200160405180910390a150620000c5565b600060208284031215620000aa57600080fd5b815162ffffff81168114620000be57600080fd5b9392505050565b61576f80620000d56000396000f3fe6080604052600436106102a45760003560e01c80639c52a7f11161016e578063d4ee1d90116100cb578063f2fde38b1161007f578063f9492ad311610064578063f9492ad314610845578063f9738d421461087d578063fec3e5531461089d57600080fd5b8063f2fde38b14610805578063f303ad6e1461082557600080fd5b8063e5e05bd7116100b0578063e5e05bd71461077c578063ee42d3a3146107a9578063f0f3f2c8146107d657600080fd5b8063d4ee1d901461073c578063dfecbd8e1461075c57600080fd5b8063b316d71411610122578063d224d9ec11610107578063d224d9ec14610680578063d2ef8464146106ad578063d3b7d4c31461071c57600080fd5b8063b316d7141461064a578063b60c164c1461066057600080fd5b8063a2f55ae511610153578063a2f55ae5146105ea578063a5184fbf1461060a578063a8d369ff1461062a57600080fd5b80639c52a7f1146105b75780639d4f5c7d146105d757600080fd5b80633fd8cc4e1161021c5780637eb14034116101d057806384fee38e116101b557806384fee38e146105175780638da5cb5b1461054f57806399dd15661461058757600080fd5b80637eb14034146104bf57806383e40a51146104df57600080fd5b8063605361721161020157806360536172146104775780636e9c931c1461048c5780636ecc20da146104ac57600080fd5b80633fd8cc4e146104095780634d3c5da11461044957600080fd5b8063188ff72b1161027357806332e879c71161025857806332e879c7146103b6578063368e9852146103d65780633a8c874f146103f657600080fd5b8063188ff72b146103695780631e83409a1461039657600080fd5b80630455f177146102b0578063068c5391146102e757806311e9ff02146103095780631333af521461034957600080fd5b366102ab57005b600080fd5b3480156102bc57600080fd5b506102d06102cb366004614866565b6108ce565b6040516102de9291906148e5565b60405180910390f35b3480156102f357600080fd5b50610307610302366004614983565b610b0e565b005b34801561031557600080fd5b506103296103243660046149b3565b610ba7565b6040805194855260208501939093529183015260608201526080016102de565b34801561035557600080fd5b506103076103643660046149dd565b610bf7565b34801561037557600080fd5b506103896103843660046149fa565b610c60565b6040516102de9190614a1c565b3480156103a257600080fd5b506103076103b1366004614a81565b610e01565b3480156103c257600080fd5b506103076103d1366004614aea565b610e0d565b3480156103e257600080fd5b506103076103f1366004614983565b610e77565b610307610404366004614b2c565b610f06565b34801561041557600080fd5b50610439610424366004614a81565b60026020526000908152604090205460ff1681565b60405190151581526020016102de565b34801561045557600080fd5b506104696104643660046149b3565b610fcd565b6040519081526020016102de565b34801561048357600080fd5b50610307610ffc565b34801561049857600080fd5b506103076104a7366004614ba6565b6110f2565b6103076104ba3660046149b3565b6110fd565b3480156104cb57600080fd5b506103076104da3660046149b3565b611109565b3480156104eb57600080fd5b506104696104fa366004614bde565b600d60209081526000928352604080842090915290825290205481565b34801561052357600080fd5b50610469610532366004614983565b600960209081526000928352604080842090915290825290205481565b34801561055b57600080fd5b5060005461056f906001600160a01b031681565b6040516001600160a01b0390911681526020016102de565b34801561059357600080fd5b506003546105a39062ffffff1681565b60405162ffffff90911681526020016102de565b3480156105c357600080fd5b506103076105d2366004614a81565b61122d565b6103076105e5366004614dd9565b6112b3565b3480156105f657600080fd5b50610307610605366004614a81565b611b7c565b34801561061657600080fd5b50610469610625366004614aea565b611c05565b34801561063657600080fd5b50610469610645366004614f2e565b611d64565b34801561065657600080fd5b50610469600b5481565b34801561066c57600080fd5b5061030761067b366004614aea565b6126ed565b34801561068c57600080fd5b506106a061069b366004614f78565b61288e565b6040516102de9190615078565b3480156106b957600080fd5b506106f66106c83660046149b3565b600c602052600090815260409020805460018201546002909201546001600160a01b03918216929091169083565b604080516001600160a01b039485168152939092166020840152908201526060016102de565b34801561072857600080fd5b50610469610737366004614bde565b612eec565b34801561074857600080fd5b5060015461056f906001600160a01b031681565b34801561076857600080fd5b50610307610777366004614983565b612f26565b34801561078857600080fd5b50610469610797366004614a81565b60046020526000908152604090205481565b3480156107b557600080fd5b506104696107c4366004614a81565b60056020526000908152604090205481565b3480156107e257600080fd5b506107f66107f13660046149b3565b613019565b6040516102de93929190615205565b34801561081157600080fd5b50610307610820366004614a81565b613109565b34801561083157600080fd5b50610307610840366004614aea565b613186565b34801561085157600080fd5b50610469610860366004614983565b600a60209081526000928352604080842090915290825290205481565b34801561088957600080fd5b50610307610898366004614a81565b6131d3565b3480156108a957600080fd5b506108bd6108b8366004614866565b6131f3565b6040516102de95949392919061523a565b6060806000600788815481106108e6576108e66152a7565b90600052602060002090600c020190506000816002018054905088111561090f57600282015497505b600282015461091e888a615305565b1115610937576002820154610934908990615318565b96505b8667ffffffffffffffff81111561095057610950614c0c565b604051908082528060200260200182016040528015610979578160200160208202803683370190505b5093505b86811015610a0657600282016109938983615305565b815481106109a3576109a36152a7565b9060005260206000200160009054906101000a900460401b8482815181106109cd576109cd6152a7565b7fffffffffffffffffffffffffffffffffffffffffffffffff00000000000000009092166020928302919091019091015260010161097d565b50600a810154600090861115610a1e57600a82015495505b600a820154610a2d8688615305565b1115610a4657600a820154610a43908790615318565b94505b8467ffffffffffffffff811115610a5f57610a5f614c0c565b604051908082528060200260200182016040528015610a88578160200160208202803683370190505b5092505b84811015610b0257600a8201610aa28783615305565b81548110610ab257610ab26152a7565b9060005260206000200160009054906101000a90046001600160a01b0316838281518110610ae257610ae26152a7565b6001600160a01b0390921660209283029190910190910152600101610a8c565b50509550959350505050565b600060068381548110610b2357610b236152a7565b6000918252602090912060049091020160018101549091506001600160a01b03163314610b975760405162461bcd60e51b815260206004820152600e60248201527f6e6f742066726f6d206f776e657200000000000000000000000000000000000060448201526064015b60405180910390fd5b610ba2838284613735565b505050565b600080600080600060078681548110610bc257610bc26152a7565b60009182526020909120600c90910201600281015460058201546006830154600a909301549199909850919650945092505050565b600380547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000001662ffffff83169081179091556040519081527ffe25e86988ec652fe5401545da69d35d6d22e8bcf8632c423f273264a656d22f906020015b60405180910390a150565b6060600083118015610c745750600b548311155b610cc05760405162461bcd60e51b815260206004820152600d60248201527f6f7574206f6620626f756e6473000000000000000000000000000000000000006044820152606401610b8e565b600083600b54610cd09190615318565b610cdb906001615305565b905080831115610ce9578092505b8267ffffffffffffffff811115610d0257610d02614c0c565b604051908082528060200260200182016040528015610d6b57816020015b60408051606081018252600080825260208083018290529282015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff909201910181610d205790505b5091508360005b84811015610df8576000828152600c6020908152604091829020825160608101845281546001600160a01b0390811682526001830154169281019290925260020154918101919091528451859083908110610dcf57610dcf6152a7565b602002602001018190525081610de49061532b565b915080610df08161532b565b915050610d72565b50505092915050565b610e0a81613809565b50565b6000546001600160a01b03163314610e2457600080fd5b8060005b81811015610e7157610e5f848483818110610e4557610e456152a7565b9050602002016020810190610e5a9190614a81565b6138ff565b80610e698161532b565b915050610e28565b50505050565b600060068381548110610e8c57610e8c6152a7565b6000918252602090912060049091020160018101549091506001600160a01b03163314610efb5760405162461bcd60e51b815260206004820152600e60248201527f6e6f742066726f6d206f776e65720000000000000000000000000000000000006044820152606401610b8e565b610ba28382846139a9565b82818114610f565760405162461bcd60e51b815260206004820152601260248201527f6c656e677468206e6f74206d61746368656400000000000000000000000000006044820152606401610b8e565b60005b81811015610fb257610faa87878784818110610f7757610f776152a7565b9050602002016020810190610f8c9190614a81565b868685818110610f9e57610f9e6152a7565b90506020020135613bb4565b600101610f59565b3415610fc457610fc487600034613bb4565b50505050505050565b600060068281548110610fe257610fe26152a7565b600091825260209091206002600490920201015492915050565b6001546001600160a01b0316331461107c5760405162461bcd60e51b815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e00000000000000000000000000000000000000000000006064820152608401610b8e565b60018054600080546001600160a01b0383167fffffffffffffffffffffffff000000000000000000000000000000000000000091821681179092559091169091556040519081527fcfaaa26691e16e66e73290fc725eee1a6b4e0e693a1640484937aac25ffb55a49060200160405180910390a1565b610ba2838383613bb4565b610e0a81600034613bb4565b60006006828154811061111e5761111e6152a7565b6000918252602090912060049091020160018101549091506001600160a01b0316331461118d5760405162461bcd60e51b815260206004820152600e60248201527f6e6f742066726f6d206f776e65720000000000000000000000000000000000006044820152606401610b8e565b80546111a590839083906001600160a01b03166139a9565b80547fffffffffffffffffffffffff00000000000000000000000000000000000000009081163317825560018083018054909216909155546111f390839083906001600160a01b0316613735565b60405133815282907fcae10d66f75f577faa75ec3d290ee81497368211d6817451dae38673b5ccf992906020015b60405180910390a25050565b6000546001600160a01b0316331461124457600080fd5b6001600160a01b03811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905590519182527f79ede3839cd7a7d8bd77e97e5c890565fe4f76cdbbeaa364646e28a8695a78849101610c55565b60075487106113045760405162461bcd60e51b815260206004820152601060248201527f696e76616c69642063616d706169676e000000000000000000000000000000006044820152606401610b8e565b600060078881548110611319576113196152a7565b90600052602060002090600c02019050806003016000888461133a90615363565b60405160609290921b7fffffffffffffffffffffffffffffffffffffffff0000000000000000000000001660208301527fffffffff000000000000000000000000000000000000000000000000000000001660348201526038016040516020818303038152906040526113ac906153b3565b7fffffffffffffffffffffffffffffffffffffffffffffffff000000000000000016815260208101919091526040016000205460ff1661142e5760405162461bcd60e51b815260206004820152601460248201527f73656c6563746f72206e6f74206d6174636865640000000000000000000000006044820152606401610b8e565b60018101544267010000000000000090910467ffffffffffffffff1611801590611479575060018101546f01000000000000000000000000000000900467ffffffffffffffff164211155b6114eb5760405162461bcd60e51b815260206004820152602860248201527f63616d706169676e206e6f74207374617274656420796574202f20616c72656160448201527f647920656e6465640000000000000000000000000000000000000000000000006064820152608401610b8e565b60018101546601000000000000900460ff16801561150c5750600a81015415155b801561155c57506001600160a01b0383166000818152600b83016020526040902054600a830180549091908110611545576115456152a7565b6000918252602090912001546001600160a01b0316145b6115a85760405162461bcd60e51b815260206004820152600e60248201527f6e6f7420612072656665727265720000000000000000000000000000000000006044820152606401610b8e565b855160018201546000919062ffffff168111156116075760405162461bcd60e51b815260206004820152601760248201527f696e546f6b656e206c656e6774682065786365656465640000000000000000006044820152606401610b8e565b60005b8181101561189f576000898281518110611626576116266152a7565b602090810291909101810151516001600160a01b038116600090815260088801909252604090912060048701549192509060ff166116c657805462ffffff1615158061167a575080546301000000900460ff165b6116c65760405162461bcd60e51b815260206004820152601660248201527f6e6f7420616e20616363657074656420746f6b656e73000000000000000000006044820152606401610b8e565b60008b84815181106116da576116da6152a7565b602002602001015160200151905060006001600160a01b0316836001600160a01b0316036117a75785156117505760405162461bcd60e51b815260206004820152601a60248201527f6d6f7265207468616e206f6e6520455448207472616e736665720000000000006044820152606401610b8e565b80341461179f5760405162461bcd60e51b815260206004820152601660248201527f45544820616d6f756e74206e6f74206d617463686564000000000000000000006044820152606401610b8e565b809550611819565b6001600160a01b038316600090815260078801602052604090205460ff16156117e4576117df6001600160a01b038416338f84613c95565b611819565b6117ee8382613d64565b90506118056001600160a01b0384168e6000613e93565b6118196001600160a01b0384168e83613e93565b826001600160a01b03168d6001600160a01b03167fbe526fefdf314c4faee4a30e01b840fe0c1517bd7fc9295829eb6d8441e80b1833846040516118729291906001600160a01b03929092168252602082015260400190565b60405180910390a3815462ffffff161561189457611894878f848c8786613fe1565b50505060010161160a565b600080865187602001868e5af1806000036118be573d6000803e3d6000fd5b50865160018501549092506301000000900462ffffff168211156119245760405162461bcd60e51b815260206004820152601860248201527f6f7574546f6b656e206c656e67746820657863656564656400000000000000006044820152606401610b8e565b5060005b81811015611b72576000878281518110611944576119446152a7565b6020908102919091018101516001600160a01b038116600090815260098801909252604090912060048701549192509060ff166119e357805462ffffff16151580611997575080546301000000900460ff165b6119e35760405162461bcd60e51b815260206004820152601660248201527f6e6f7420616e20616363657074656420746f6b656e73000000000000000000006044820152606401610b8e565b60006001600160a01b038316611a39576000805260056020527f05b8ccbb9d4d8fb16ea74ce3c29a41f1b461fbdaff4714a0d9a8eb05499746bc54611a289047615318565b9050611a348b826143df565b611aec565b6001600160a01b038316600081815260056020526040908190205490517f70a082310000000000000000000000000000000000000000000000000000000081523060048201529091906370a0823190602401602060405180830381865afa158015611aa8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611acc91906153ff565b611ad69190615318565b9050611aec6001600160a01b0384168c8361449c565b815462ffffff1615611b0657611b06878f848c8786613fe1565b826001600160a01b03168d6001600160a01b03167fc2534859c9972270c16d5b4255d200f9a0385f9a6ce3add96c0427ff9fc70f938d84604051611b5f9291906001600160a01b03929092168252602082015260400190565b60405180910390a3505050600101611928565b3d6000803e3d6000f35b6000546001600160a01b03163314611b9357600080fd5b6001600160a01b03811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905590519182527f6d81a01b39982517ba331aeb4f387b0f9cc32334b65bb9a343a077973cf7adf59101610c55565b6006805460018101808355600083815291929083908110611c2857611c286152a7565b60009182526020808320600490920290910180547fffffffffffffffffffffffff00000000000000000000000000000000000000009081163390811783556002830180546001810182559086528486200180549092168117909155835260038101909152604082208290559150835b80821015611d30576000868684818110611cb357611cb36152a7565b9050602002016020810190611cc89190614a81565b600285018054600181810183556000928352602080842090920180546001600160a01b039095167fffffffffffffffffffffffff0000000000000000000000000000000000000000909516851790559282526003870190526040902093019283905550611c97565b60405184907fd78a25afe0b6160e2dc1fc71b2845c76cc268398d17be04665b78ba59b47440790600090a250505092915050565b600654600090823510611db95760405162461bcd60e51b815260206004820152601160248201527f496e76616c69642070726f6a65637449640000000000000000000000000000006044820152606401610b8e565b60006006836000013581548110611dd257611dd26152a7565b6000918252602080832033808552600493909302016003810190915260409092205460028301805493945091928110611e0d57611e0d6152a7565b6000918252602090912001546001600160a01b031614611e6f5760405162461bcd60e51b815260206004820152601360248201527f6e6f7420612070726f6a6563742061646d696e000000000000000000000000006044820152606401610b8e565b611e7f60c0840160a08501615418565b67ffffffffffffffff16611e9960a0850160808601615418565b67ffffffffffffffff161115611ef15760405162461bcd60e51b815260206004820152601560248201527f696e76616c69642063616d706169676e206461746500000000000000000000006044820152606401610b8e565b60078054843560009081526008602090815260408220805460018181018355918452918320909101839055835401808455838252919450919084908110611f3a57611f3a6152a7565b60009182526020918290208635600c909202019081559150611f6290604086019086016149dd565b6001820180547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000001662ffffff92909216919091179055611fa860608501604086016149dd565b60018201805462ffffff929092166301000000027fffffffffffffffffffffffffffffffffffffffffffffffffffff000000ffffff909216919091179055611ff66080850160608601615442565b6001820180549115156601000000000000027fffffffffffffffffffffffffffffffffffffffffffffffffff00ffffffffffff90921691909117905561204260a0850160808601615418565b60018201805467ffffffffffffffff92909216670100000000000000027fffffffffffffffffffffffffffffffffff0000000000000000ffffffffffffff90921691909117905561209960c0850160a08601615418565b60018201805467ffffffffffffffff929092166f01000000000000000000000000000000027fffffffffffffffffff0000000000000000ffffffffffffffffffffffffffffff9092169190911790556000806120f860c087018761545f565b9150612109905060c087018761545f565b612117916002860191614771565b505b808210156121c657600160038401600061213660c08a018a61545f565b86818110612146576121466152a7565b905060200201602081019061215b91906154c7565b7fffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000168152602081019190915260400160002080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001691151591909117905560019190910190612119565b6121d7610100870160e08801615442565b6004840180547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001691151591909117905561221a61012087016101008801615442565b600484018054911515610100027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff9092169190911790556000915061226361012087018761545f565b9150612275905061014087018761545f565b905081148015612293575061228e610160870187615509565b905081145b6123055760405162461bcd60e51b815260206004820152602260248201527f696e20746f6b656e20636f6e666967206c656e677468206e6f74206d6174636860448201527f65640000000000000000000000000000000000000000000000000000000000006064820152608401610b8e565b61231361012087018761545f565b6123219160058601916147e6565b505b8082101561246d5761233961014087018761545f565b83818110612349576123496152a7565b905060200201602081019061235e9190615442565b6007840160006123726101208a018a61545f565b86818110612382576123826152a7565b90506020020160208101906123979190614a81565b6001600160a01b03168152602081019190915260400160002080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169115159190911790556123eb610160870187615509565b838181106123fb576123fb6152a7565b90506080020183600801600088806101200190612418919061545f565b86818110612428576124286152a7565b905060200201602081019061243d9190614a81565b6001600160a01b0316815260208101919091526040016000206124608282615571565b5050600190910190612323565b6000915061247f61018087018761545f565b915061249190506101a0870187615509565b905081146125075760405162461bcd60e51b815260206004820152602360248201527f6f757420746f6b656e20636f6e666967206c656e677468206e6f74206d61746360448201527f68656400000000000000000000000000000000000000000000000000000000006064820152608401610b8e565b61251561018087018761545f565b6125239160068601916147e6565b505b808210156125bd5761253b6101a0870187615509565b8381811061254b5761254b6152a7565b90506080020183600901600088806101800190612568919061545f565b86818110612578576125786152a7565b905060200201602081019061258d9190614a81565b6001600160a01b0316815260208101919091526040016000206125b08282615571565b5050600190910190612525565b600091506125cf6101c087018761545f565b9150508015156125e56080880160608901615442565b1515146126345760405162461bcd60e51b815260206004820152601860248201527f696e76616c696420726566657272657273206c656e67746800000000000000006044820152606401610b8e565b6126426101c087018761545f565b61265091600a8601916147e6565b505b808210156126b95781600b8401600061266f6101c08a018a61545f565b8681811061267f5761267f6152a7565b90506020020160208101906126949190614a81565b6001600160a01b03168152602081019190915260400160002055600190910190612652565b60405185907ff91d5ca55c5415a1aa70a5dfde98765e180ec8b56375e3de9149ee89efc28f9d90600090a250505050919050565b8060005b81811015610e715760008085858481811061270e5761270e6152a7565b90506020020160208101906127239190614a81565b90506001600160a01b03811661277c576000805260056020527f05b8ccbb9d4d8fb16ea74ce3c29a41f1b461fbdaff4714a0d9a8eb05499746bc5447925061276b9083615318565b915061277733836143df565b612839565b6040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201526001600160a01b038216906370a0823190602401602060405180830381865afa1580156127d9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906127fd91906153ff565b6001600160a01b0382166000908152600560205260409020549092506128239083615318565b91506128396001600160a01b038216338461449c565b60405182815233906001600160a01b038316907f2ae72b44f59d038340fca5739135a1d51fc5ab720bb02d983e4c5ff4119ca7b89060200160405180910390a3505080806128869061532b565b9150506126f1565b61292b604051806101e0016040528060008152602001600062ffffff168152602001600062ffffff168152602001600015158152602001600067ffffffffffffffff168152602001600067ffffffffffffffff168152602001606081526020016000151581526020016000151581526020016060815260200160608152602001606081526020016060815260200160608152602001606081525090565b600060078481548110612940576129406152a7565b6000918252602091829020600c9091020180548452600181015462ffffff8082169386019390935263010000008104909216604085015260ff6601000000000000830481161515606086015267ffffffffffffffff6701000000000000008404811660808701526f0100000000000000000000000000000090930490921660a08501526004810154808316151560e08601526101009081900490921615159184019190915290508215612ee55780600201805480602002602001604051908101604052809291908181526020018280548015612a6157602002820191906000526020600020905b815460401b7fffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000168152600190910190602001808311612a27575b505050505060c08301526005810180546040805160208084028201810190925282815260009390918390830182828015612ac457602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311612aa6575b50505050508461012001819052508067ffffffffffffffff811115612aeb57612aeb614c0c565b604051908082528060200260200182016040528015612b14578160200160208202803683370190505b506101408501528067ffffffffffffffff811115612b3457612b34614c0c565b604051908082528060200260200182016040528015612ba457816020015b6040805160808101825260008082526020808301829052928201819052606082015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff909201910181612b525790505b506101608501525b80821015612ccf57826007016000846005018481548110612bcf57612bcf6152a7565b60009182526020808320909101546001600160a01b03168352820192909252604001902054610140850151805160ff9092169184908110612c1257612c126152a7565b602002602001019015159081151581525050826008016000846005018481548110612c3f57612c3f6152a7565b60009182526020808320909101546001600160a01b0316835282810193909352604091820190208151608081018352815462ffffff8116825260ff630100000090910416151593810193909352600181015491830191909152600201546060820152610160850151805184908110612cb957612cb96152a7565b6020908102919091010152600190910190612bac565b50506006810180546040805160208084028201810190925282815260009390918390830182828015612d2a57602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311612d0c575b50505050508461018001819052508067ffffffffffffffff811115612d5157612d51614c0c565b604051908082528060200260200182016040528015612dc157816020015b6040805160808101825260008082526020808301829052928201819052606082015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff909201910181612d6f5790505b506101a08501525b80821015612e7c57826009016000846006018481548110612dec57612dec6152a7565b60009182526020808320909101546001600160a01b0316835282810193909352604091820190208151608081018352815462ffffff8116825260ff6301000000909104161515938101939093526001810154918301919091526002015460608201526101a0850151805184908110612e6657612e666152a7565b6020908102919091010152600190910190612dc9565b82600a01805480602002602001604051908101604052809291908181526020018280548015612ed457602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311612eb6575b5050505050846101c0018190525050505b5092915050565b6001600160a01b038083166000908152600d602090815260408083209385168352928152828220548252600c905220600201545b92915050565b600060068381548110612f3b57612f3b6152a7565b6000918252602090912060049091020180549091506001600160a01b03163314612fa75760405162461bcd60e51b815260206004820152600e60248201527f6e6f742066726f6d206f776e65720000000000000000000000000000000000006044820152606401610b8e565b6001810180547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03841690811790915560405190815283907fd76f6b3fb9ea3802f0403d54d37db427cea79df08cd8817552eb23790d2b54919060200160405180910390a2505050565b6000806060600060068581548110613033576130336152a7565b600091825260209091206004909102018054600182015460028301546001600160a01b0392831697509116945090915067ffffffffffffffff81111561307b5761307b614c0c565b6040519080825280602002602001820160405280156130a4578160200160208202803683370190505b50600282018054604080516020808402820181019092528281529395508301828280156130fa57602002820191906000526020600020905b81546001600160a01b031681526001909101906020018083116130dc575b50505050509150509193909250565b6000546001600160a01b0316331461312057600080fd5b600180547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0383169081179091556040519081527f686a7ab184e6928ddedba810af7b443d6baa40bf32c4787ccd72c5b4b28cae1b90602001610c55565b8060005b81811015610e71576131c18484838181106131a7576131a76152a7565b90506020020160208101906131bc9190614a81565b613809565b806131cb8161532b565b91505061318a565b6000546001600160a01b031633146131ea57600080fd5b610e0a816138ff565b6060806060806060600060078b81548110613210576132106152a7565b90600052602060002090600c02019050600081600501805490508b11156132395760058201549a505b60058201546132488b8d615305565b111561326157600582015461325e908c90615318565b99505b8967ffffffffffffffff81111561327a5761327a614c0c565b6040519080825280602002602001820160405280156132a3578160200160208202803683370190505b5096508967ffffffffffffffff8111156132bf576132bf614c0c565b6040519080825280602002602001820160405280156132e8578160200160208202803683370190505b5095508967ffffffffffffffff81111561330457613304614c0c565b60405190808252806020026020018201604052801561337457816020015b6040805160808101825260008082526020808301829052928201819052606082015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9092019101816133225790505b5094505b898110156134ff576005820161338e8c83615305565b8154811061339e5761339e6152a7565b9060005260206000200160009054906101000a90046001600160a01b03168782815181106133ce576133ce6152a7565b60200260200101906001600160a01b031690816001600160a01b031681525050816007016000888381518110613406576134066152a7565b60200260200101516001600160a01b03166001600160a01b0316815260200190815260200160002060009054906101000a900460ff1686828151811061344e5761344e6152a7565b602002602001019015159081151581525050816008016000888381518110613478576134786152a7565b6020908102919091018101516001600160a01b031682528181019290925260409081016000208151608081018352815462ffffff811682526301000000900460ff1615159381019390935260018101549183019190915260020154606082015285518690839081106134ec576134ec6152a7565b6020908102919091010152600101613378565b50600681015460009089111561351757600682015498505b6006820154613526898b615305565b111561353f57600682015461353c908a90615318565b97505b8767ffffffffffffffff81111561355857613558614c0c565b604051908082528060200260200182016040528015613581578160200160208202803683370190505b5093508767ffffffffffffffff81111561359d5761359d614c0c565b60405190808252806020026020018201604052801561360d57816020015b6040805160808101825260008082526020808301829052928201819052606082015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9092019101816135bb5790505b5092505b8781101561372657600682016136278a83615305565b81548110613637576136376152a7565b9060005260206000200160009054906101000a90046001600160a01b0316848281518110613667576136676152a7565b60200260200101906001600160a01b031690816001600160a01b03168152505081600901600085838151811061369f5761369f6152a7565b6020908102919091018101516001600160a01b031682528181019290925260409081016000208151608081018352815462ffffff811682526301000000900460ff161515938101939093526001810154918301919091526002015460608201528351849083908110613713576137136152a7565b6020908102919091010152600101613611565b50509550955095509550959050565b6001600160a01b03811660008181526003840160205260409020546002840180549091908110613767576137676152a7565b6000918252602090912001546001600160a01b031614610ba2576002820180546001600160a01b03831660008181526003860160209081526040808320859055600185018655948252812090920180547fffffffffffffffffffffffff00000000000000000000000000000000000000001682179055915185917f1c3cea70d3dcea4dc82722f4fb7300d19f76e272a8349e73a99780429f2c151691a3505050565b336000908152600d602090815260408083206001600160a01b0385811680865291845282852054808652600c85528386208451606081018652815484168152600182015490931683870152600201805483860181905290879055928652600590945291842080549394929391928392613883908490615318565b90915550506001600160a01b0384166138a5576138a033826143df565b6138b9565b6138b96001600160a01b038516338361449c565b6040518181526001600160a01b0385169033907f70eb43c4a8ae8c40502dcf22436c509c28d6ff421cf07c491be56984bd9870689060200160405180910390a350505050565b6001600160a01b038116600090815260046020908152604080832080549084905560059092528220805491928392613938908490615318565b90915550506001600160a01b03821661395a5761395533826143df565b61396e565b61396e6001600160a01b038316338361449c565b816001600160a01b03167f6ec620dc21a80aff1281aac3592cbd6b0554bbf810aa4b75338ef3cc9ae1a66c8260405161122191815260200190565b6001600160a01b0381166000818152600384016020526040902054600284018054919291839081106139dd576139dd6152a7565b6000918252602090912001546001600160a01b031614613a3f5760405162461bcd60e51b815260206004820152600c60248201527f6e6f7420616e2061646d696e00000000000000000000000000000000000000006044820152606401610b8e565b6002830154600090613a5390600190615318565b9050808214613af9576000846002018281548110613a7357613a736152a7565b6000918252602090912001546002860180546001600160a01b039092169250829185908110613aa457613aa46152a7565b600091825260208083209190910180547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0394851617905592909116815260038601909152604090208290555b83600201805480613b0c57613b0c61560a565b6000828152602080822083017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90810180547fffffffffffffffffffffffff00000000000000000000000000000000000000001690559092019092556001600160a01b03851680835260038701909152604080832083905551909187917fe76d77167882521e5d6872e780957ffd683d0e4710f4f159f4170fa42589387b9190a35050505050565b6001600160a01b03821615613bd057613bcd8282613d64565b90505b60008381526009602090815260408083206001600160a01b038616845290915281208054839290613c02908490615305565b90915550506001600160a01b03821660009081526005602052604081208054839290613c2f908490615305565b909155505060008381526009602090815260408083206001600160a01b038616808552908352928190205481518581529283015285917f507ac39eb33610191cd8fd54286e91c5cc464c262861643be3978f5a9f18ab02910160405180910390a3505050565b6040516001600160a01b0380851660248301528316604482015260648101829052610e719085907f23b872dd00000000000000000000000000000000000000000000000000000000906084015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff00000000000000000000000000000000000000000000000000000000909316929092179091526144e5565b6040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201526000906001600160a01b038416906370a0823190602401602060405180830381865afa158015613dc4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613de891906153ff565b9050613dff6001600160a01b038416333085613c95565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015281906001600160a01b038516906370a0823190602401602060405180830381865afa158015613e5e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613e8291906153ff565b613e8c9190615318565b9392505050565b801580613f2657506040517fdd62ed3e0000000000000000000000000000000000000000000000000000000081523060048201526001600160a01b03838116602483015284169063dd62ed3e90604401602060405180830381865afa158015613f00573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613f2491906153ff565b155b613f985760405162461bcd60e51b815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527f20746f206e6f6e2d7a65726f20616c6c6f77616e6365000000000000000000006064820152608401610b8e565b6040516001600160a01b038316602482015260448101829052610ba29084907f095ea7b30000000000000000000000000000000000000000000000000000000090606401613ce2565b85548454620f424090613ff99062ffffff1684615639565b6140039190615650565b915084600101548211156140595760405162461bcd60e51b815260206004820152600c60248201527f63617020657863656564656400000000000000000000000000000000000000006044820152606401610b8e565b600354600090620f4240906140739062ffffff1685615639565b61407d9190615650565b6001600160a01b0385166000908152600460205260408120805492935083929091906140aa908490615305565b9091555050855460009081906301000000900460ff16156140d9578491506140d28383615305565b90506140e9565b6140e38386615318565b91508490505b60008481526009602090815260408083206001600160a01b038a16845290915290205481111561415b5760405162461bcd60e51b815260206004820152601560248201527f6e6f7420656e6f75676820636f6d6d697373696f6e00000000000000000000006044820152606401610b8e565b60008481526009602090815260408083206001600160a01b038a16808552908352818420805486900390558c8452600a8352818420908452909152812080548392906141a8908490615305565b9091555050600288015460008a8152600a602090815260408083206001600160a01b038b16845290915290205411156142495760405162461bcd60e51b815260206004820152602560248201527f616363756d756c6174656420636f6d6d697373696f6e2065786365656465642060448201527f6c696d69740000000000000000000000000000000000000000000000000000006064820152608401610b8e565b6001600160a01b038088166000908152600d60209081526040808320938a168352929052908120549081900361432d57600b600081546142889061532b565b90915550604080516060810182526001600160a01b03808b168083528a821660208085018281528587018a8152600b80546000908152600c8552898120985189549089167fffffffffffffffffffffffff0000000000000000000000000000000000000000918216178a55935160018a01805491909916941693909317909655516002909601959095559254918452600d835284842090845290915291902055614354565b6000818152600c60205260408120600201805485929061434e908490615305565b90915550505b6000818152600c60209081526040808320600201546001600160a01b038b81168086526004855294839020548351918e1682529381019490945290830186905260608301526080820186905260a08201527fac98d1de12ec7e306f0033236185d2a9d904bb054995aa9987c7d5a6d7ff4c579060c00160405180910390a15050505050505050505050565b604080516000808252602082019092526001600160a01b03841690839060405161440991906156af565b60006040518083038185875af1925050503d8060008114614446576040519150601f19603f3d011682016040523d82523d6000602084013e61444b565b606091505b5050905080610ba25760405162461bcd60e51b815260206004820152601360248201527f4554485f5452414e534645525f4641494c4544000000000000000000000000006044820152606401610b8e565b6040516001600160a01b038316602482015260448101829052610ba29084907fa9059cbb0000000000000000000000000000000000000000000000000000000090606401613ce2565b600061453a826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166145ca9092919063ffffffff16565b805190915015610ba2578080602001905181019061455891906156cb565b610ba25760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f742073756363656564000000000000000000000000000000000000000000006064820152608401610b8e565b60606145d984846000856145e1565b949350505050565b6060824710156146595760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c00000000000000000000000000000000000000000000000000006064820152608401610b8e565b600080866001600160a01b0316858760405161467591906156af565b60006040518083038185875af1925050503d80600081146146b2576040519150601f19603f3d011682016040523d82523d6000602084013e6146b7565b606091505b50915091506146c8878383876146d3565b979650505050505050565b6060831561474257825160000361473b576001600160a01b0385163b61473b5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610b8e565b50816145d9565b6145d983838151156147575781518083602001fd5b8060405162461bcd60e51b8152600401610b8e91906156e8565b8280548282559060005260206000209081019282156147d6579160200282015b828111156147d65781547fffffffffffffffff00000000000000000000000000000000000000000000000016833560401c178255602090920191600190910190614791565b506147e2929150614851565b5090565b8280548282559060005260206000209081019282156147d6579160200282015b828111156147d65781547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03843516178255602090920191600190910190614806565b5b808211156147e25760008155600101614852565b600080600080600060a0868803121561487e57600080fd5b505083359560208501359550604085013594606081013594506080013592509050565b600081518084526020808501945080840160005b838110156148da5781516001600160a01b0316875295820195908201906001016148b5565b509495945050505050565b604080825283519082018190526000906020906060840190828701845b828110156149405781517fffffffffffffffffffffffffffffffffffffffffffffffff00000000000000001684529284019290840190600101614902565b5050508381038285015261495481866148a1565b9695505050505050565b6001600160a01b0381168114610e0a57600080fd5b803561497e8161495e565b919050565b6000806040838503121561499657600080fd5b8235915060208301356149a88161495e565b809150509250929050565b6000602082840312156149c557600080fd5b5035919050565b62ffffff81168114610e0a57600080fd5b6000602082840312156149ef57600080fd5b8135613e8c816149cc565b60008060408385031215614a0d57600080fd5b50508035926020909101359150565b602080825282518282018190526000919060409081850190868401855b82811015614a7457815180516001600160a01b0390811686528782015116878601528501518585015260609093019290850190600101614a39565b5091979650505050505050565b600060208284031215614a9357600080fd5b8135613e8c8161495e565b60008083601f840112614ab057600080fd5b50813567ffffffffffffffff811115614ac857600080fd5b6020830191508360208260051b8501011115614ae357600080fd5b9250929050565b60008060208385031215614afd57600080fd5b823567ffffffffffffffff811115614b1457600080fd5b614b2085828601614a9e565b90969095509350505050565b600080600080600060608688031215614b4457600080fd5b85359450602086013567ffffffffffffffff80821115614b6357600080fd5b614b6f89838a01614a9e565b90965094506040880135915080821115614b8857600080fd5b50614b9588828901614a9e565b969995985093965092949392505050565b600080600060608486031215614bbb57600080fd5b833592506020840135614bcd8161495e565b929592945050506040919091013590565b60008060408385031215614bf157600080fd5b8235614bfc8161495e565b915060208301356149a88161495e565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040805190810167ffffffffffffffff81118282101715614c5e57614c5e614c0c565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715614cab57614cab614c0c565b604052919050565b600067ffffffffffffffff821115614ccd57614ccd614c0c565b5060051b60200190565b600082601f830112614ce857600080fd5b81356020614cfd614cf883614cb3565b614c64565b82815260059290921b84018101918181019086841115614d1c57600080fd5b8286015b84811015614d40578035614d338161495e565b8352918301918301614d20565b509695505050505050565b600082601f830112614d5c57600080fd5b813567ffffffffffffffff811115614d7657614d76614c0c565b614da760207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601614c64565b818152846020838601011115614dbc57600080fd5b816020850160208301376000918101602001919091529392505050565b600080600080600080600060e0888a031215614df457600080fd5b873596506020880135614e068161495e565b9550604088013567ffffffffffffffff80821115614e2357600080fd5b818a0191508a601f830112614e3757600080fd5b8135614e45614cf882614cb3565b8082825260208201915060208360061b86010192508d831115614e6757600080fd5b6020850194505b82851015614ebb576040858f031215614e8657600080fd5b614e8e614c3b565b614e98863561495e565b853581526020860135602082015280835250602082019150604085019450614e6e565b9850614ecc91505060608b01614973565b955060808a0135915080821115614ee257600080fd5b614eee8b838c01614cd7565b9450614efc60a08b01614973565b935060c08a0135915080821115614f1257600080fd5b50614f1f8a828b01614d4b565b91505092959891949750929550565b600060208284031215614f4057600080fd5b813567ffffffffffffffff811115614f5757600080fd5b82016101e08185031215613e8c57600080fd5b8015158114610e0a57600080fd5b60008060408385031215614f8b57600080fd5b8235915060208301356149a881614f6a565b600081518084526020808501945080840160005b838110156148da5781517fffffffffffffffffffffffffffffffffffffffffffffffff00000000000000001687529582019590820190600101614fb1565b600081518084526020808501945080840160005b838110156148da578151151587529582019590820190600101615003565b600081518084526020808501945080840160005b838110156148da578151805162ffffff16885283810151151584890152604080820151908901526060908101519088015260809096019590820190600101615035565b60208152815160208201526000602083015161509b604084018262ffffff169052565b50604083015162ffffff81166060840152506060830151801515608084015250608083015167ffffffffffffffff811660a08401525060a083015167ffffffffffffffff811660c08401525060c08301516101e08060e0850152615103610200850183614f9d565b915060e085015161010061511a8187018315159052565b860151905061012061512f8682018315159052565b808701519150507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe061014081878603018188015261516d85846148a1565b94508088015192505061016081878603018188015261518c8584614fef565b9450808801519250506101808187860301818801526151ab8584615021565b9450808801519250506101a08187860301818801526151ca85846148a1565b9450808801519250506101c08187860301818801526151e98584615021565b90880151878203909201848801529350905061495483826148a1565b60006001600160a01b0380861683528085166020840152506060604083015261523160608301846148a1565b95945050505050565b60a08152600061524d60a08301886148a1565b828103602084015261525f8188614fef565b905082810360408401526152738187615021565b9050828103606084015261528781866148a1565b9050828103608084015261529b8185615021565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b80820180821115612f2057612f206152d6565b81810381811115612f2057612f206152d6565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361535c5761535c6152d6565b5060010190565b6000815160208301517fffffffff00000000000000000000000000000000000000000000000000000000808216935060048310156153ab5780818460040360031b1b83161693505b505050919050565b6000815160208301517fffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000808216935060188310156153ab5760189290920360031b82901b161692915050565b60006020828403121561541157600080fd5b5051919050565b60006020828403121561542a57600080fd5b813567ffffffffffffffff81168114613e8c57600080fd5b60006020828403121561545457600080fd5b8135613e8c81614f6a565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe184360301811261549457600080fd5b83018035915067ffffffffffffffff8211156154af57600080fd5b6020019150600581901b3603821315614ae357600080fd5b6000602082840312156154d957600080fd5b81357fffffffffffffffffffffffffffffffffffffffffffffffff000000000000000081168114613e8c57600080fd5b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe184360301811261553e57600080fd5b83018035915067ffffffffffffffff82111561555957600080fd5b6020019150600781901b3603821315614ae357600080fd5b813561557c816149cc565b62ffffff811690508154817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000821617835560208401356155bb81614f6a565b63ff00000081151560181b16837fffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000084161717845550505060408201356001820155606082013560028201555050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b8082028115828204841417612f2057612f206152d6565b600082615686577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b60005b838110156156a657818101518382015260200161568e565b50506000910152565b600082516156c181846020870161568b565b9190910192915050565b6000602082840312156156dd57600080fd5b8151613e8c81614f6a565b602081526000825180602084015261570781604085016020870161568b565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016040019291505056fea26469706673582212208dfb972cfbdaf3de410cb9a2ba1a4661be1a3551335b25b7ebcc4c119b98ab3764736f6c63430008110033"
    };
});
define("@scom/scom-commission-proxy-contract/contracts/ProxyV3.ts", ["require", "exports", "@ijstech/eth-contract", "@scom/scom-commission-proxy-contract/contracts/ProxyV3.json.ts"], function (require, exports, eth_contract_4, ProxyV3_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProxyV3 = void 0;
    class ProxyV3 extends eth_contract_4.Contract {
        constructor(wallet, address) {
            super(wallet, address, ProxyV3_json_1.default.abi, ProxyV3_json_1.default.bytecode);
            this.assign();
        }
        deploy(protocolRate, options) {
            return this.__deploy([this.wallet.utils.toString(protocolRate)], options);
        }
        parseAddCommissionEvent(receipt) {
            return this.parseEvents(receipt, "AddCommission").map(e => this.decodeAddCommissionEvent(e));
        }
        decodeAddCommissionEvent(event) {
            let result = event.data;
            return {
                to: result.to,
                token: result.token,
                commission: new eth_contract_4.BigNumber(result.commission),
                commissionBalance: new eth_contract_4.BigNumber(result.commissionBalance),
                protocolFee: new eth_contract_4.BigNumber(result.protocolFee),
                protocolFeeBalance: new eth_contract_4.BigNumber(result.protocolFeeBalance),
                _event: event
            };
        }
        parseAddProjectAdminEvent(receipt) {
            return this.parseEvents(receipt, "AddProjectAdmin").map(e => this.decodeAddProjectAdminEvent(e));
        }
        decodeAddProjectAdminEvent(event) {
            let result = event.data;
            return {
                projectId: new eth_contract_4.BigNumber(result.projectId),
                admin: result.admin,
                _event: event
            };
        }
        parseAuthorizeEvent(receipt) {
            return this.parseEvents(receipt, "Authorize").map(e => this.decodeAuthorizeEvent(e));
        }
        decodeAuthorizeEvent(event) {
            let result = event.data;
            return {
                user: result.user,
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
                amount: new eth_contract_4.BigNumber(result.amount),
                _event: event
            };
        }
        parseClaimProtocolFeeEvent(receipt) {
            return this.parseEvents(receipt, "ClaimProtocolFee").map(e => this.decodeClaimProtocolFeeEvent(e));
        }
        decodeClaimProtocolFeeEvent(event) {
            let result = event.data;
            return {
                token: result.token,
                amount: new eth_contract_4.BigNumber(result.amount),
                _event: event
            };
        }
        parseDeauthorizeEvent(receipt) {
            return this.parseEvents(receipt, "Deauthorize").map(e => this.decodeDeauthorizeEvent(e));
        }
        decodeDeauthorizeEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseNewCampaignEvent(receipt) {
            return this.parseEvents(receipt, "NewCampaign").map(e => this.decodeNewCampaignEvent(e));
        }
        decodeNewCampaignEvent(event) {
            let result = event.data;
            return {
                campaignId: new eth_contract_4.BigNumber(result.campaignId),
                _event: event
            };
        }
        parseNewProjectEvent(receipt) {
            return this.parseEvents(receipt, "NewProject").map(e => this.decodeNewProjectEvent(e));
        }
        decodeNewProjectEvent(event) {
            let result = event.data;
            return {
                projectId: new eth_contract_4.BigNumber(result.projectId),
                _event: event
            };
        }
        parseRemoveProjectAdminEvent(receipt) {
            return this.parseEvents(receipt, "RemoveProjectAdmin").map(e => this.decodeRemoveProjectAdminEvent(e));
        }
        decodeRemoveProjectAdminEvent(event) {
            let result = event.data;
            return {
                projectId: new eth_contract_4.BigNumber(result.projectId),
                admin: result.admin,
                _event: event
            };
        }
        parseSetProtocolRateEvent(receipt) {
            return this.parseEvents(receipt, "SetProtocolRate").map(e => this.decodeSetProtocolRateEvent(e));
        }
        decodeSetProtocolRateEvent(event) {
            let result = event.data;
            return {
                protocolRate: new eth_contract_4.BigNumber(result.protocolRate),
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
                amount: new eth_contract_4.BigNumber(result.amount),
                _event: event
            };
        }
        parseStakeEvent(receipt) {
            return this.parseEvents(receipt, "Stake").map(e => this.decodeStakeEvent(e));
        }
        decodeStakeEvent(event) {
            let result = event.data;
            return {
                projectId: new eth_contract_4.BigNumber(result.projectId),
                token: result.token,
                amount: new eth_contract_4.BigNumber(result.amount),
                balance: new eth_contract_4.BigNumber(result.balance),
                _event: event
            };
        }
        parseStartOwnershipTransferEvent(receipt) {
            return this.parseEvents(receipt, "StartOwnershipTransfer").map(e => this.decodeStartOwnershipTransferEvent(e));
        }
        decodeStartOwnershipTransferEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseTakeoverProjectOwnershipEvent(receipt) {
            return this.parseEvents(receipt, "TakeoverProjectOwnership").map(e => this.decodeTakeoverProjectOwnershipEvent(e));
        }
        decodeTakeoverProjectOwnershipEvent(event) {
            let result = event.data;
            return {
                projectId: new eth_contract_4.BigNumber(result.projectId),
                newOwner: result.newOwner,
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
                amount: new eth_contract_4.BigNumber(result.amount),
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
                amount: new eth_contract_4.BigNumber(result.amount),
                _event: event
            };
        }
        parseTransferOwnershipEvent(receipt) {
            return this.parseEvents(receipt, "TransferOwnership").map(e => this.decodeTransferOwnershipEvent(e));
        }
        decodeTransferOwnershipEvent(event) {
            let result = event.data;
            return {
                user: result.user,
                _event: event
            };
        }
        parseTransferProjectOwnershipEvent(receipt) {
            return this.parseEvents(receipt, "TransferProjectOwnership").map(e => this.decodeTransferProjectOwnershipEvent(e));
        }
        decodeTransferProjectOwnershipEvent(event) {
            let result = event.data;
            return {
                projectId: new eth_contract_4.BigNumber(result.projectId),
                newOwner: result.newOwner,
                _event: event
            };
        }
        assign() {
            let campaignAccumulatedCommissionParams = (params) => [this.wallet.utils.toString(params.param1), params.param2];
            let campaignAccumulatedCommission_call = async (params, options) => {
                let result = await this.call('campaignAccumulatedCommission', campaignAccumulatedCommissionParams(params), options);
                return new eth_contract_4.BigNumber(result);
            };
            this.campaignAccumulatedCommission = campaignAccumulatedCommission_call;
            let claimantIdCount_call = async (options) => {
                let result = await this.call('claimantIdCount', [], options);
                return new eth_contract_4.BigNumber(result);
            };
            this.claimantIdCount = claimantIdCount_call;
            let claimantIdsParams = (params) => [params.param1, params.param2];
            let claimantIds_call = async (params, options) => {
                let result = await this.call('claimantIds', claimantIdsParams(params), options);
                return new eth_contract_4.BigNumber(result);
            };
            this.claimantIds = claimantIds_call;
            let claimantsInfo_call = async (param1, options) => {
                let result = await this.call('claimantsInfo', [this.wallet.utils.toString(param1)], options);
                return {
                    claimant: result.claimant,
                    token: result.token,
                    balance: new eth_contract_4.BigNumber(result.balance)
                };
            };
            this.claimantsInfo = claimantsInfo_call;
            let getCampaignParams = (params) => [this.wallet.utils.toString(params.campaignId), params.returnArrays];
            let getCampaign_call = async (params, options) => {
                let result = await this.call('getCampaign', getCampaignParams(params), options);
                return ({
                    projectId: new eth_contract_4.BigNumber(result.projectId),
                    maxInputTokensInEachCall: new eth_contract_4.BigNumber(result.maxInputTokensInEachCall),
                    maxOutputTokensInEachCall: new eth_contract_4.BigNumber(result.maxOutputTokensInEachCall),
                    referrersRequireApproval: result.referrersRequireApproval,
                    startDate: new eth_contract_4.BigNumber(result.startDate),
                    endDate: new eth_contract_4.BigNumber(result.endDate),
                    targetAndSelectors: result.targetAndSelectors,
                    acceptAnyInToken: result.acceptAnyInToken,
                    acceptAnyOutToken: result.acceptAnyOutToken,
                    inTokens: result.inTokens,
                    directTransferInToken: result.directTransferInToken,
                    commissionInTokenConfig: result.commissionInTokenConfig.map(e => ({
                        rate: new eth_contract_4.BigNumber(e.rate),
                        feeOnProjectOwner: e.feeOnProjectOwner,
                        capPerTransaction: new eth_contract_4.BigNumber(e.capPerTransaction),
                        capPerCampaign: new eth_contract_4.BigNumber(e.capPerCampaign)
                    })),
                    outTokens: result.outTokens,
                    commissionOutTokenConfig: result.commissionOutTokenConfig.map(e => ({
                        rate: new eth_contract_4.BigNumber(e.rate),
                        feeOnProjectOwner: e.feeOnProjectOwner,
                        capPerTransaction: new eth_contract_4.BigNumber(e.capPerTransaction),
                        capPerCampaign: new eth_contract_4.BigNumber(e.capPerCampaign)
                    })),
                    referrers: result.referrers
                });
            };
            this.getCampaign = getCampaign_call;
            let getCampaignArrayData1Params = (params) => [this.wallet.utils.toString(params.campaignId), this.wallet.utils.toString(params.targetAndSelectorsStart), this.wallet.utils.toString(params.targetAndSelectorsLength), this.wallet.utils.toString(params.referrersStart), this.wallet.utils.toString(params.referrersLength)];
            let getCampaignArrayData1_call = async (params, options) => {
                let result = await this.call('getCampaignArrayData1', getCampaignArrayData1Params(params), options);
                return {
                    targetAndSelectors: result.targetAndSelectors,
                    referrers: result.referrers
                };
            };
            this.getCampaignArrayData1 = getCampaignArrayData1_call;
            let getCampaignArrayData2Params = (params) => [this.wallet.utils.toString(params.campaignId), this.wallet.utils.toString(params.inTokensStart), this.wallet.utils.toString(params.inTokensLength), this.wallet.utils.toString(params.outTokensStart), this.wallet.utils.toString(params.outTokensLength)];
            let getCampaignArrayData2_call = async (params, options) => {
                let result = await this.call('getCampaignArrayData2', getCampaignArrayData2Params(params), options);
                return {
                    inTokens: result.inTokens,
                    directTransferInToken: result.directTransferInToken,
                    commissionInTokenConfig: result.commissionInTokenConfig.map(e => ({
                        rate: new eth_contract_4.BigNumber(e.rate),
                        feeOnProjectOwner: e.feeOnProjectOwner,
                        capPerTransaction: new eth_contract_4.BigNumber(e.capPerTransaction),
                        capPerCampaign: new eth_contract_4.BigNumber(e.capPerCampaign)
                    })),
                    outTokens: result.outTokens,
                    commissionOutTokenConfig: result.commissionOutTokenConfig.map(e => ({
                        rate: new eth_contract_4.BigNumber(e.rate),
                        feeOnProjectOwner: e.feeOnProjectOwner,
                        capPerTransaction: new eth_contract_4.BigNumber(e.capPerTransaction),
                        capPerCampaign: new eth_contract_4.BigNumber(e.capPerCampaign)
                    }))
                };
            };
            this.getCampaignArrayData2 = getCampaignArrayData2_call;
            let getCampaignArrayLength_call = async (campaignId, options) => {
                let result = await this.call('getCampaignArrayLength', [this.wallet.utils.toString(campaignId)], options);
                return {
                    targetAndSelectorsLength: new eth_contract_4.BigNumber(result.targetAndSelectorsLength),
                    inTokensLength: new eth_contract_4.BigNumber(result.inTokensLength),
                    outTokensLength: new eth_contract_4.BigNumber(result.outTokensLength),
                    referrersLength: new eth_contract_4.BigNumber(result.referrersLength)
                };
            };
            this.getCampaignArrayLength = getCampaignArrayLength_call;
            let getClaimantBalanceParams = (params) => [params.claimant, params.token];
            let getClaimantBalance_call = async (params, options) => {
                let result = await this.call('getClaimantBalance', getClaimantBalanceParams(params), options);
                return new eth_contract_4.BigNumber(result);
            };
            this.getClaimantBalance = getClaimantBalance_call;
            let getClaimantsInfoParams = (params) => [this.wallet.utils.toString(params.fromId), this.wallet.utils.toString(params.count)];
            let getClaimantsInfo_call = async (params, options) => {
                let result = await this.call('getClaimantsInfo', getClaimantsInfoParams(params), options);
                return (result.map(e => ({
                    claimant: e.claimant,
                    token: e.token,
                    balance: new eth_contract_4.BigNumber(e.balance)
                })));
            };
            this.getClaimantsInfo = getClaimantsInfo_call;
            let getProject_call = async (projectId, options) => {
                let result = await this.call('getProject', [this.wallet.utils.toString(projectId)], options);
                return {
                    owner: result.owner,
                    newOwner: result.newOwner,
                    projectAdmins: result.projectAdmins
                };
            };
            this.getProject = getProject_call;
            let getProjectAdminsLength_call = async (projectId, options) => {
                let result = await this.call('getProjectAdminsLength', [this.wallet.utils.toString(projectId)], options);
                return new eth_contract_4.BigNumber(result);
            };
            this.getProjectAdminsLength = getProjectAdminsLength_call;
            let isPermitted_call = async (param1, options) => {
                let result = await this.call('isPermitted', [param1], options);
                return result;
            };
            this.isPermitted = isPermitted_call;
            let lastBalance_call = async (param1, options) => {
                let result = await this.call('lastBalance', [param1], options);
                return new eth_contract_4.BigNumber(result);
            };
            this.lastBalance = lastBalance_call;
            let newOwner_call = async (options) => {
                let result = await this.call('newOwner', [], options);
                return result;
            };
            this.newOwner = newOwner_call;
            let owner_call = async (options) => {
                let result = await this.call('owner', [], options);
                return result;
            };
            this.owner = owner_call;
            let protocolFeeBalance_call = async (param1, options) => {
                let result = await this.call('protocolFeeBalance', [param1], options);
                return new eth_contract_4.BigNumber(result);
            };
            this.protocolFeeBalance = protocolFeeBalance_call;
            let protocolRate_call = async (options) => {
                let result = await this.call('protocolRate', [], options);
                return new eth_contract_4.BigNumber(result);
            };
            this.protocolRate = protocolRate_call;
            let stakesBalanceParams = (params) => [this.wallet.utils.toString(params.param1), params.param2];
            let stakesBalance_call = async (params, options) => {
                let result = await this.call('stakesBalance', stakesBalanceParams(params), options);
                return new eth_contract_4.BigNumber(result);
            };
            this.stakesBalance = stakesBalance_call;
            let addProjectAdminParams = (params) => [this.wallet.utils.toString(params.projectId), params.admin];
            let addProjectAdmin_send = async (params, options) => {
                let result = await this.send('addProjectAdmin', addProjectAdminParams(params), options);
                return result;
            };
            let addProjectAdmin_call = async (params, options) => {
                let result = await this.call('addProjectAdmin', addProjectAdminParams(params), options);
                return;
            };
            let addProjectAdmin_txData = async (params, options) => {
                let result = await this.txData('addProjectAdmin', addProjectAdminParams(params), options);
                return result;
            };
            this.addProjectAdmin = Object.assign(addProjectAdmin_send, {
                call: addProjectAdmin_call,
                txData: addProjectAdmin_txData
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
            let claimMultipleProtocolFee_send = async (tokens, options) => {
                let result = await this.send('claimMultipleProtocolFee', [tokens], options);
                return result;
            };
            let claimMultipleProtocolFee_call = async (tokens, options) => {
                let result = await this.call('claimMultipleProtocolFee', [tokens], options);
                return;
            };
            let claimMultipleProtocolFee_txData = async (tokens, options) => {
                let result = await this.txData('claimMultipleProtocolFee', [tokens], options);
                return result;
            };
            this.claimMultipleProtocolFee = Object.assign(claimMultipleProtocolFee_send, {
                call: claimMultipleProtocolFee_call,
                txData: claimMultipleProtocolFee_txData
            });
            let claimProtocolFee_send = async (token, options) => {
                let result = await this.send('claimProtocolFee', [token], options);
                return result;
            };
            let claimProtocolFee_call = async (token, options) => {
                let result = await this.call('claimProtocolFee', [token], options);
                return;
            };
            let claimProtocolFee_txData = async (token, options) => {
                let result = await this.txData('claimProtocolFee', [token], options);
                return result;
            };
            this.claimProtocolFee = Object.assign(claimProtocolFee_send, {
                call: claimProtocolFee_call,
                txData: claimProtocolFee_txData
            });
            let deny_send = async (user, options) => {
                let result = await this.send('deny', [user], options);
                return result;
            };
            let deny_call = async (user, options) => {
                let result = await this.call('deny', [user], options);
                return;
            };
            let deny_txData = async (user, options) => {
                let result = await this.txData('deny', [user], options);
                return result;
            };
            this.deny = Object.assign(deny_send, {
                call: deny_call,
                txData: deny_txData
            });
            let newCampaign_send = async (params, options) => {
                let result = await this.send('newCampaign', [[this.wallet.utils.toString(params.projectId), this.wallet.utils.toString(params.maxInputTokensInEachCall), this.wallet.utils.toString(params.maxOutputTokensInEachCall), params.referrersRequireApproval, this.wallet.utils.toString(params.startDate), this.wallet.utils.toString(params.endDate), params.targetAndSelectors, params.acceptAnyInToken, params.acceptAnyOutToken, params.inTokens, params.directTransferInToken, params.commissionInTokenConfig.map(e => ([this.wallet.utils.toString(e.rate), e.feeOnProjectOwner, this.wallet.utils.toString(e.capPerTransaction), this.wallet.utils.toString(e.capPerCampaign)])), params.outTokens, params.commissionOutTokenConfig.map(e => ([this.wallet.utils.toString(e.rate), e.feeOnProjectOwner, this.wallet.utils.toString(e.capPerTransaction), this.wallet.utils.toString(e.capPerCampaign)])), params.referrers]], options);
                return result;
            };
            let newCampaign_call = async (params, options) => {
                let result = await this.call('newCampaign', [[this.wallet.utils.toString(params.projectId), this.wallet.utils.toString(params.maxInputTokensInEachCall), this.wallet.utils.toString(params.maxOutputTokensInEachCall), params.referrersRequireApproval, this.wallet.utils.toString(params.startDate), this.wallet.utils.toString(params.endDate), params.targetAndSelectors, params.acceptAnyInToken, params.acceptAnyOutToken, params.inTokens, params.directTransferInToken, params.commissionInTokenConfig.map(e => ([this.wallet.utils.toString(e.rate), e.feeOnProjectOwner, this.wallet.utils.toString(e.capPerTransaction), this.wallet.utils.toString(e.capPerCampaign)])), params.outTokens, params.commissionOutTokenConfig.map(e => ([this.wallet.utils.toString(e.rate), e.feeOnProjectOwner, this.wallet.utils.toString(e.capPerTransaction), this.wallet.utils.toString(e.capPerCampaign)])), params.referrers]], options);
                return new eth_contract_4.BigNumber(result);
            };
            let newCampaign_txData = async (params, options) => {
                let result = await this.txData('newCampaign', [[this.wallet.utils.toString(params.projectId), this.wallet.utils.toString(params.maxInputTokensInEachCall), this.wallet.utils.toString(params.maxOutputTokensInEachCall), params.referrersRequireApproval, this.wallet.utils.toString(params.startDate), this.wallet.utils.toString(params.endDate), params.targetAndSelectors, params.acceptAnyInToken, params.acceptAnyOutToken, params.inTokens, params.directTransferInToken, params.commissionInTokenConfig.map(e => ([this.wallet.utils.toString(e.rate), e.feeOnProjectOwner, this.wallet.utils.toString(e.capPerTransaction), this.wallet.utils.toString(e.capPerCampaign)])), params.outTokens, params.commissionOutTokenConfig.map(e => ([this.wallet.utils.toString(e.rate), e.feeOnProjectOwner, this.wallet.utils.toString(e.capPerTransaction), this.wallet.utils.toString(e.capPerCampaign)])), params.referrers]], options);
                return result;
            };
            this.newCampaign = Object.assign(newCampaign_send, {
                call: newCampaign_call,
                txData: newCampaign_txData
            });
            let newProject_send = async (admins, options) => {
                let result = await this.send('newProject', [admins], options);
                return result;
            };
            let newProject_call = async (admins, options) => {
                let result = await this.call('newProject', [admins], options);
                return new eth_contract_4.BigNumber(result);
            };
            let newProject_txData = async (admins, options) => {
                let result = await this.txData('newProject', [admins], options);
                return result;
            };
            this.newProject = Object.assign(newProject_send, {
                call: newProject_call,
                txData: newProject_txData
            });
            let permit_send = async (user, options) => {
                let result = await this.send('permit', [user], options);
                return result;
            };
            let permit_call = async (user, options) => {
                let result = await this.call('permit', [user], options);
                return;
            };
            let permit_txData = async (user, options) => {
                let result = await this.txData('permit', [user], options);
                return result;
            };
            this.permit = Object.assign(permit_send, {
                call: permit_call,
                txData: permit_txData
            });
            let proxyCallParams = (params) => [this.wallet.utils.toString(params.campaignId), params.target, params.tokensIn.map(e => ([e.token, this.wallet.utils.toString(e.amount)])), params.to, params.tokensOut, params.referrer, this.wallet.utils.stringToBytes(params.data)];
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
            let removeProjectAdminParams = (params) => [this.wallet.utils.toString(params.projectId), params.admin];
            let removeProjectAdmin_send = async (params, options) => {
                let result = await this.send('removeProjectAdmin', removeProjectAdminParams(params), options);
                return result;
            };
            let removeProjectAdmin_call = async (params, options) => {
                let result = await this.call('removeProjectAdmin', removeProjectAdminParams(params), options);
                return;
            };
            let removeProjectAdmin_txData = async (params, options) => {
                let result = await this.txData('removeProjectAdmin', removeProjectAdminParams(params), options);
                return result;
            };
            this.removeProjectAdmin = Object.assign(removeProjectAdmin_send, {
                call: removeProjectAdmin_call,
                txData: removeProjectAdmin_txData
            });
            let setProtocolRate_send = async (newRate, options) => {
                let result = await this.send('setProtocolRate', [this.wallet.utils.toString(newRate)], options);
                return result;
            };
            let setProtocolRate_call = async (newRate, options) => {
                let result = await this.call('setProtocolRate', [this.wallet.utils.toString(newRate)], options);
                return;
            };
            let setProtocolRate_txData = async (newRate, options) => {
                let result = await this.txData('setProtocolRate', [this.wallet.utils.toString(newRate)], options);
                return result;
            };
            this.setProtocolRate = Object.assign(setProtocolRate_send, {
                call: setProtocolRate_call,
                txData: setProtocolRate_txData
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
            let stakeParams = (params) => [this.wallet.utils.toString(params.projectId), params.token, this.wallet.utils.toString(params.amount)];
            let stake_send = async (params, options) => {
                let result = await this.send('stake', stakeParams(params), options);
                return result;
            };
            let stake_call = async (params, options) => {
                let result = await this.call('stake', stakeParams(params), options);
                return;
            };
            let stake_txData = async (params, options) => {
                let result = await this.txData('stake', stakeParams(params), options);
                return result;
            };
            this.stake = Object.assign(stake_send, {
                call: stake_call,
                txData: stake_txData
            });
            let stakeETH_send = async (projectId, options) => {
                let result = await this.send('stakeETH', [this.wallet.utils.toString(projectId)], options);
                return result;
            };
            let stakeETH_call = async (projectId, options) => {
                let result = await this.call('stakeETH', [this.wallet.utils.toString(projectId)], options);
                return;
            };
            let stakeETH_txData = async (projectId, options) => {
                let result = await this.txData('stakeETH', [this.wallet.utils.toString(projectId)], options);
                return result;
            };
            this.stakeETH = Object.assign(stakeETH_send, {
                call: stakeETH_call,
                txData: stakeETH_txData
            });
            let stakeMultipleParams = (params) => [this.wallet.utils.toString(params.projectId), params.token, this.wallet.utils.toString(params.amount)];
            let stakeMultiple_send = async (params, options) => {
                let result = await this.send('stakeMultiple', stakeMultipleParams(params), options);
                return result;
            };
            let stakeMultiple_call = async (params, options) => {
                let result = await this.call('stakeMultiple', stakeMultipleParams(params), options);
                return;
            };
            let stakeMultiple_txData = async (params, options) => {
                let result = await this.txData('stakeMultiple', stakeMultipleParams(params), options);
                return result;
            };
            this.stakeMultiple = Object.assign(stakeMultiple_send, {
                call: stakeMultiple_call,
                txData: stakeMultiple_txData
            });
            let takeOwnership_send = async (options) => {
                let result = await this.send('takeOwnership', [], options);
                return result;
            };
            let takeOwnership_call = async (options) => {
                let result = await this.call('takeOwnership', [], options);
                return;
            };
            let takeOwnership_txData = async (options) => {
                let result = await this.txData('takeOwnership', [], options);
                return result;
            };
            this.takeOwnership = Object.assign(takeOwnership_send, {
                call: takeOwnership_call,
                txData: takeOwnership_txData
            });
            let takeoverProjectOwnership_send = async (projectId, options) => {
                let result = await this.send('takeoverProjectOwnership', [this.wallet.utils.toString(projectId)], options);
                return result;
            };
            let takeoverProjectOwnership_call = async (projectId, options) => {
                let result = await this.call('takeoverProjectOwnership', [this.wallet.utils.toString(projectId)], options);
                return;
            };
            let takeoverProjectOwnership_txData = async (projectId, options) => {
                let result = await this.txData('takeoverProjectOwnership', [this.wallet.utils.toString(projectId)], options);
                return result;
            };
            this.takeoverProjectOwnership = Object.assign(takeoverProjectOwnership_send, {
                call: takeoverProjectOwnership_call,
                txData: takeoverProjectOwnership_txData
            });
            let transferOwnership_send = async (newOwner, options) => {
                let result = await this.send('transferOwnership', [newOwner], options);
                return result;
            };
            let transferOwnership_call = async (newOwner, options) => {
                let result = await this.call('transferOwnership', [newOwner], options);
                return;
            };
            let transferOwnership_txData = async (newOwner, options) => {
                let result = await this.txData('transferOwnership', [newOwner], options);
                return result;
            };
            this.transferOwnership = Object.assign(transferOwnership_send, {
                call: transferOwnership_call,
                txData: transferOwnership_txData
            });
            let transferProjectOwnershipParams = (params) => [this.wallet.utils.toString(params.projectId), params.newOwner];
            let transferProjectOwnership_send = async (params, options) => {
                let result = await this.send('transferProjectOwnership', transferProjectOwnershipParams(params), options);
                return result;
            };
            let transferProjectOwnership_call = async (params, options) => {
                let result = await this.call('transferProjectOwnership', transferProjectOwnershipParams(params), options);
                return;
            };
            let transferProjectOwnership_txData = async (params, options) => {
                let result = await this.txData('transferProjectOwnership', transferProjectOwnershipParams(params), options);
                return result;
            };
            this.transferProjectOwnership = Object.assign(transferProjectOwnership_send, {
                call: transferProjectOwnership_call,
                txData: transferProjectOwnership_txData
            });
        }
    }
    ProxyV3._abi = ProxyV3_json_1.default.abi;
    exports.ProxyV3 = ProxyV3;
});
define("@scom/scom-commission-proxy-contract/contracts/index.ts", ["require", "exports", "@scom/scom-commission-proxy-contract/contracts/Authorization.ts", "@scom/scom-commission-proxy-contract/contracts/Proxy.ts", "@scom/scom-commission-proxy-contract/contracts/ProxyV2.ts", "@scom/scom-commission-proxy-contract/contracts/ProxyV3.ts"], function (require, exports, Authorization_1, Proxy_1, ProxyV2_1, ProxyV3_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProxyV3 = exports.ProxyV2 = exports.Proxy = exports.Authorization = void 0;
    Object.defineProperty(exports, "Authorization", { enumerable: true, get: function () { return Authorization_1.Authorization; } });
    Object.defineProperty(exports, "Proxy", { enumerable: true, get: function () { return Proxy_1.Proxy; } });
    Object.defineProperty(exports, "ProxyV2", { enumerable: true, get: function () { return ProxyV2_1.ProxyV2; } });
    Object.defineProperty(exports, "ProxyV3", { enumerable: true, get: function () { return ProxyV3_1.ProxyV3; } });
});
define("@scom/scom-commission-proxy-contract", ["require", "exports", "@scom/scom-commission-proxy-contract/contracts/index.ts"], function (require, exports, Contracts) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.onProgress = exports.deploy = exports.DefaultDeployOptions = exports.Contracts = void 0;
    exports.Contracts = Contracts;
    ;
    ;
    var progressHandler;
    exports.DefaultDeployOptions = {
        version: 'V1'
    };
    function progress(msg) {
        if (typeof (progressHandler) == 'function') {
            progressHandler(msg);
        }
        ;
    }
    async function deploy(wallet, options) {
        progress('Contracts deployment start');
        let proxy;
        if (options.version == 'V2') {
            proxy = new Contracts.ProxyV2(wallet);
        }
        else {
            proxy = new Contracts.Proxy(wallet);
        }
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
