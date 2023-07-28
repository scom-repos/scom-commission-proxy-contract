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
            { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "balance", "type": "uint256" }], "name": "Unstake", "type": "event" },
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
            { "inputs": [], "name": "getProjectsLength", "outputs": [{ "internalType": "uint256", "name": "length", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "isPermitted", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "lastBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "components": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "internalType": "uint24", "name": "maxInputTokensInEachCall", "type": "uint24" }, { "internalType": "uint24", "name": "maxOutputTokensInEachCall", "type": "uint24" }, { "internalType": "bool", "name": "referrersRequireApproval", "type": "bool" }, { "internalType": "uint64", "name": "startDate", "type": "uint64" }, { "internalType": "uint64", "name": "endDate", "type": "uint64" }, { "internalType": "bytes24[]", "name": "targetAndSelectors", "type": "bytes24[]" }, { "internalType": "bool", "name": "acceptAnyInToken", "type": "bool" }, { "internalType": "bool", "name": "acceptAnyOutToken", "type": "bool" }, { "internalType": "contract IERC20[]", "name": "inTokens", "type": "address[]" }, { "internalType": "bool[]", "name": "directTransferInToken", "type": "bool[]" }, { "components": [{ "internalType": "uint24", "name": "rate", "type": "uint24" }, { "internalType": "bool", "name": "feeOnProjectOwner", "type": "bool" }, { "internalType": "uint256", "name": "capPerTransaction", "type": "uint256" }, { "internalType": "uint256", "name": "capPerCampaign", "type": "uint256" }], "internalType": "struct ProxyV3.CommissionTokenConfig[]", "name": "commissionInTokenConfig", "type": "tuple[]" }, { "internalType": "contract IERC20[]", "name": "outTokens", "type": "address[]" }, { "components": [{ "internalType": "uint24", "name": "rate", "type": "uint24" }, { "internalType": "bool", "name": "feeOnProjectOwner", "type": "bool" }, { "internalType": "uint256", "name": "capPerTransaction", "type": "uint256" }, { "internalType": "uint256", "name": "capPerCampaign", "type": "uint256" }], "internalType": "struct ProxyV3.CommissionTokenConfig[]", "name": "commissionOutTokenConfig", "type": "tuple[]" }, { "internalType": "address[]", "name": "referrers", "type": "address[]" }], "internalType": "struct ProxyV3.CampaignParams", "name": "params", "type": "tuple" }], "name": "newCampaign", "outputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "newOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address[]", "name": "admins", "type": "address[]" }], "name": "newProject", "outputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "protocolFeeBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
            { "inputs": [], "name": "protocolRate", "outputs": [{ "internalType": "uint24", "name": "", "type": "uint24" }], "stateMutability": "view", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "internalType": "address", "name": "target", "type": "address" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "address", "name": "referrer", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "components": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "internalType": "struct ProxyV3.TokensIn[]", "name": "tokensIn", "type": "tuple[]" }, { "internalType": "contract IERC20[]", "name": "tokensOut", "type": "address[]" }], "name": "proxyCall", "outputs": [], "stateMutability": "payable", "type": "function" },
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
            { "inputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "unstake", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }], "name": "unstakeETH", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "inputs": [{ "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "internalType": "contract IERC20[]", "name": "token", "type": "address[]" }, { "internalType": "uint256[]", "name": "amount", "type": "uint256[]" }], "name": "unstakeMultiple", "outputs": [], "stateMutability": "payable", "type": "function" },
            { "stateMutability": "payable", "type": "receive" }
        ],
        "bytecode": "60806040523480156200001157600080fd5b5060405162005df938038062005df9833981016040819052620000349162000097565b600080546001600160a01b031916331790556003805462ffffff831662ffffff1990911681179091556040519081527ffe25e86988ec652fe5401545da69d35d6d22e8bcf8632c423f273264a656d22f9060200160405180910390a150620000c5565b600060208284031215620000aa57600080fd5b815162ffffff81168114620000be57600080fd5b9392505050565b615d2480620000d56000396000f3fe6080604052600436106102e05760003560e01c806399dd156611610184578063d3b7d4c3116100d6578063f0f3f2c81161008a578063f9492ad311610064578063f9492ad3146108dc578063f9738d4214610914578063fec3e5531461093457600080fd5b8063f0f3f2c81461086d578063f2fde38b1461089c578063f303ad6e146108bc57600080fd5b8063dfecbd8e116100bb578063dfecbd8e146107f3578063e5e05bd714610813578063ee42d3a31461084057600080fd5b8063d3b7d4c3146107b3578063d4ee1d90146107d357600080fd5b8063b0d36ce811610138578063c6bdc0a211610112578063c6bdc0a214610702578063d224d9ec14610717578063d2ef84641461074457600080fd5b8063b0d36ce8146106b9578063b316d714146106cc578063b60c164c146106e257600080fd5b8063a2f55ae511610169578063a2f55ae514610659578063a5184fbf14610679578063a8d369ff1461069957600080fd5b806399dd1566146106095780639c52a7f11461063957600080fd5b80633fd8cc4e1161023d5780636e9c931c116101f157806383e40a51116101cb57806383e40a511461056157806384fee38e146105995780638da5cb5b146105d157600080fd5b80636e9c931c1461050e5780636ecc20da1461052e5780637eb140341461054157600080fd5b806351a7c7161161022257806351a7c716146104c657806360536172146104e657806362d53403146104fb57600080fd5b80633fd8cc4e146104585780634d3c5da11461049857600080fd5b80631e83409a1161029457806332e879c71161027957806332e879c714610405578063368e9852146104255780633a8c874f1461044557600080fd5b80631e83409a146103d2578063202c0cee146103f257600080fd5b806311e9ff02116102c557806311e9ff02146103455780631333af5214610385578063188ff72b146103a557600080fd5b80630455f177146102ec578063068c53911461032357600080fd5b366102e757005b600080fd5b3480156102f857600080fd5b5061030c610307366004614e3d565b610965565b60405161031a929190614ebc565b60405180910390f35b34801561032f57600080fd5b5061034361033e366004614f5a565b610ba5565b005b34801561035157600080fd5b50610365610360366004614f8a565b610c3e565b60408051948552602085019390935291830152606082015260800161031a565b34801561039157600080fd5b506103436103a0366004614fb4565b610c8e565b3480156103b157600080fd5b506103c56103c0366004614fd1565b610cf7565b60405161031a9190614ff3565b3480156103de57600080fd5b506103436103ed366004615058565b610e98565b61034361040036600461523c565b610ea4565b34801561041157600080fd5b506103436104203660046153c1565b6119be565b34801561043157600080fd5b50610343610440366004614f5a565b611a28565b610343610453366004615403565b611ab7565b34801561046457600080fd5b50610488610473366004615058565b60026020526000908152604090205460ff1681565b604051901515815260200161031a565b3480156104a457600080fd5b506104b86104b3366004614f8a565b611b7e565b60405190815260200161031a565b3480156104d257600080fd5b506103436104e136600461547d565b611bad565b3480156104f257600080fd5b50610343611bb8565b610343610509366004614f8a565b611cae565b34801561051a57600080fd5b5061034361052936600461547d565b611cba565b61034361053c366004614f8a565b611cc5565b34801561054d57600080fd5b5061034361055c366004614f8a565b611cd1565b34801561056d57600080fd5b506104b861057c3660046154b5565b600d60209081526000928352604080842090915290825290205481565b3480156105a557600080fd5b506104b86105b4366004614f5a565b600960209081526000928352604080842090915290825290205481565b3480156105dd57600080fd5b506000546105f1906001600160a01b031681565b6040516001600160a01b03909116815260200161031a565b34801561061557600080fd5b506003546106259062ffffff1681565b60405162ffffff909116815260200161031a565b34801561064557600080fd5b50610343610654366004615058565b611df5565b34801561066557600080fd5b50610343610674366004615058565b611e7b565b34801561068557600080fd5b506104b86106943660046153c1565b611f04565b3480156106a557600080fd5b506104b86106b43660046154e3565b612063565b6103436106c7366004615403565b6129ec565b3480156106d857600080fd5b506104b8600b5481565b3480156106ee57600080fd5b506103436106fd3660046153c1565b612a98565b34801561070e57600080fd5b506006546104b8565b34801561072357600080fd5b5061073761073236600461552d565b612c39565b60405161031a919061562d565b34801561075057600080fd5b5061078d61075f366004614f8a565b600c602052600090815260409020805460018201546002909201546001600160a01b03918216929091169083565b604080516001600160a01b0394851681529390921660208401529082015260600161031a565b3480156107bf57600080fd5b506104b86107ce3660046154b5565b613297565b3480156107df57600080fd5b506001546105f1906001600160a01b031681565b3480156107ff57600080fd5b5061034361080e366004614f5a565b6132d1565b34801561081f57600080fd5b506104b861082e366004615058565b60046020526000908152604090205481565b34801561084c57600080fd5b506104b861085b366004615058565b60056020526000908152604090205481565b34801561087957600080fd5b5061088d610888366004614f8a565b6133c4565b60405161031a939291906157ba565b3480156108a857600080fd5b506103436108b7366004615058565b6134b4565b3480156108c857600080fd5b506103436108d73660046153c1565b613531565b3480156108e857600080fd5b506104b86108f7366004614f5a565b600a60209081526000928352604080842090915290825290205481565b34801561092057600080fd5b5061034361092f366004615058565b61357e565b34801561094057600080fd5b5061095461094f366004614e3d565b61359e565b60405161031a9594939291906157ef565b60608060006007888154811061097d5761097d61585c565b90600052602060002090600c02019050600081600201805490508811156109a657600282015497505b60028201546109b5888a6158ba565b11156109ce5760028201546109cb9089906158cd565b96505b8667ffffffffffffffff8111156109e7576109e7615075565b604051908082528060200260200182016040528015610a10578160200160208202803683370190505b5093505b86811015610a9d5760028201610a2a89836158ba565b81548110610a3a57610a3a61585c565b9060005260206000200160009054906101000a900460401b848281518110610a6457610a6461585c565b7fffffffffffffffffffffffffffffffffffffffffffffffff000000000000000090921660209283029190910190910152600101610a14565b50600a810154600090861115610ab557600a82015495505b600a820154610ac486886158ba565b1115610add57600a820154610ada9087906158cd565b94505b8467ffffffffffffffff811115610af657610af6615075565b604051908082528060200260200182016040528015610b1f578160200160208202803683370190505b5092505b84811015610b9957600a8201610b3987836158ba565b81548110610b4957610b4961585c565b9060005260206000200160009054906101000a90046001600160a01b0316838281518110610b7957610b7961585c565b6001600160a01b0390921660209283029190910190910152600101610b23565b50509550959350505050565b600060068381548110610bba57610bba61585c565b6000918252602090912060049091020160018101549091506001600160a01b03163314610c2e5760405162461bcd60e51b815260206004820152600e60248201527f6e6f742066726f6d206f776e657200000000000000000000000000000000000060448201526064015b60405180910390fd5b610c39838284613ae0565b505050565b600080600080600060078681548110610c5957610c5961585c565b60009182526020909120600c90910201600281015460058201546006830154600a909301549199909850919650945092505050565b600380547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000001662ffffff83169081179091556040519081527ffe25e86988ec652fe5401545da69d35d6d22e8bcf8632c423f273264a656d22f906020015b60405180910390a150565b6060600083118015610d0b5750600b548311155b610d575760405162461bcd60e51b815260206004820152600d60248201527f6f7574206f6620626f756e6473000000000000000000000000000000000000006044820152606401610c25565b600083600b54610d6791906158cd565b610d729060016158ba565b905080831115610d80578092505b8267ffffffffffffffff811115610d9957610d99615075565b604051908082528060200260200182016040528015610e0257816020015b60408051606081018252600080825260208083018290529282015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff909201910181610db75790505b5091508360005b84811015610e8f576000828152600c6020908152604091829020825160608101845281546001600160a01b0390811682526001830154169281019290925260020154918101919091528451859083908110610e6657610e6661585c565b602002602001018190525081610e7b906158e0565b915080610e87816158e0565b915050610e09565b50505092915050565b610ea181613bb4565b50565b6007548710610ef55760405162461bcd60e51b815260206004820152601060248201527f696e76616c69642063616d706169676e000000000000000000000000000000006044820152606401610c25565b600060078881548110610f0a57610f0a61585c565b90600052602060002090600c020190508060030160008888610f2b90615918565b60405160609290921b7fffffffffffffffffffffffffffffffffffffffff0000000000000000000000001660208301527fffffffff00000000000000000000000000000000000000000000000000000000166034820152603801604051602081830303815290604052610f9d90615968565b7fffffffffffffffffffffffffffffffffffffffffffffffff000000000000000016815260208101919091526040016000205460ff1661101f5760405162461bcd60e51b815260206004820152601460248201527f73656c6563746f72206e6f74206d6174636865640000000000000000000000006044820152606401610c25565b60018101544267010000000000000090910467ffffffffffffffff161180159061106a575060018101546f01000000000000000000000000000000900467ffffffffffffffff164211155b6110dc5760405162461bcd60e51b815260206004820152602860248201527f63616d706169676e206e6f74207374617274656420796574202f20616c72656160448201527f647920656e6465640000000000000000000000000000000000000000000000006064820152608401610c25565b60018101546601000000000000900460ff16158061114c5750600a8101541580159061114c57506001600160a01b0385166000818152600b83016020526040902054600a8301805490919081106111355761113561585c565b6000918252602090912001546001600160a01b0316145b6111985760405162461bcd60e51b815260206004820152600e60248201527f6e6f7420612072656665727265720000000000000000000000000000000000006044820152606401610c25565b825160018201546000919062ffffff168111156111f75760405162461bcd60e51b815260206004820152601760248201527f696e546f6b656e206c656e6774682065786365656465640000000000000000006044820152606401610c25565b60005b818110156114eb5760008682815181106112165761121661585c565b602002602001015160000151905060008211156112b557866112396001846158cd565b815181106112495761124961585c565b6020026020010151600001516001600160a01b0316816001600160a01b0316116112b55760405162461bcd60e51b815260206004820152601f60248201527f696e20746f6b656e206e6f7420696e20617363656e64696e67206f72646572006044820152606401610c25565b600485015460ff16611345576001600160a01b03811660009081526008860160205260409020805462ffffff161515806112f7575080546301000000900460ff165b6113435760405162461bcd60e51b815260206004820152601660248201527f6e6f7420616e20616363657074656420746f6b656e73000000000000000000006044820152606401610c25565b505b60008783815181106113595761135961585c565b602002602001015160200151905060006001600160a01b0316826001600160a01b0316036114265784156113cf5760405162461bcd60e51b815260206004820152601a60248201527f6d6f7265207468616e206f6e6520455448207472616e736665720000000000006044820152606401610c25565b80341461141e5760405162461bcd60e51b815260206004820152601660248201527f45544820616d6f756e74206e6f74206d617463686564000000000000000000006044820152606401610c25565b809450611498565b6001600160a01b038216600090815260078701602052604090205460ff16156114635761145e6001600160a01b038316338e84613caa565b611498565b61146d8282613d79565b90506114846001600160a01b0383168d6000613ea8565b6114986001600160a01b0383168d83613ea8565b60408051338152602081018390526001600160a01b0380851692908f16917fbe526fefdf314c4faee4a30e01b840fe0c1517bd7fc9295829eb6d8441e80b18910160405180910390a350506001016111fa565b6000808a518b602001868e5af18060000361150a573d6000803e3d6000fd5b5050835160018401549092506301000000900462ffffff1682111590506115735760405162461bcd60e51b815260206004820152601860248201527f6f7574546f6b656e206c656e67746820657863656564656400000000000000006044820152606401610c25565b6000805b828210156119685760008583815181106115935761159361585c565b60200260200101519050600083111561162a57856115b26001856158cd565b815181106115c2576115c261585c565b60200260200101516001600160a01b0316816001600160a01b03161161162a5760405162461bcd60e51b815260206004820152601f60248201527f696e20746f6b656e206e6f7420696e20617363656e64696e67206f72646572006044820152606401610c25565b6004850154610100900460ff166116bf576001600160a01b03811660009081526009860160205260409020805462ffffff16151580611671575080546301000000900460ff165b6116bd5760405162461bcd60e51b815260206004820152601660248201527f6e6f7420616e20616363657074656420746f6b656e73000000000000000000006044820152606401610c25565b505b60006001600160a01b038216611715576000805260056020527f05b8ccbb9d4d8fb16ea74ce3c29a41f1b461fbdaff4714a0d9a8eb05499746bc5461170490476158cd565b90506117108982613ff6565b6117c8565b6001600160a01b038216600081815260056020526040908190205490517f70a082310000000000000000000000000000000000000000000000000000000081523060048201529091906370a0823190602401602060405180830381865afa158015611784573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117a891906159b4565b6117b291906158cd565b90506117c86001600160a01b0383168a836140b3565b8751831080156118065750816001600160a01b03168884815181106117ef576117ef61585c565b6020026020010151600001516001600160a01b0316105b1561185f57611854868e8c60018c88815181106118255761182561585c565b6020026020010151600001518d89815181106118435761184361585c565b6020026020010151602001516140fc565b6001909201916117c8565b87518310801561189d5750816001600160a01b03168884815181106118865761188661585c565b6020026020010151600001516001600160a01b0316145b15611901576118f6868e8c60018c88815181106118bc576118bc61585c565b602002602001015160000151868e8a815181106118db576118db61585c565b6020026020010151602001516118f191906158cd565b6140fc565b600190920191611910565b611910868e8c600086866140fc565b604080516001600160a01b038b811682526020820184905280851692908f16917fc2534859c9972270c16d5b4255d200f9a0385f9a6ce3add96c0427ff9fc70f93910160405180910390a35050600190910190611577565b85518110156119b1576119a9848c8a60018a868151811061198b5761198b61585c565b6020026020010151600001518b87815181106118435761184361585c565b600101611968565b5050503d6000803e3d6000f35b6000546001600160a01b031633146119d557600080fd5b8060005b81811015611a2257611a108484838181106119f6576119f661585c565b9050602002016020810190611a0b9190615058565b614568565b80611a1a816158e0565b9150506119d9565b50505050565b600060068381548110611a3d57611a3d61585c565b6000918252602090912060049091020160018101549091506001600160a01b03163314611aac5760405162461bcd60e51b815260206004820152600e60248201527f6e6f742066726f6d206f776e65720000000000000000000000000000000000006044820152606401610c25565b610c39838284614612565b82818114611b075760405162461bcd60e51b815260206004820152601260248201527f6c656e677468206e6f74206d61746368656400000000000000000000000000006044820152606401610c25565b60005b81811015611b6357611b5b87878784818110611b2857611b2861585c565b9050602002016020810190611b3d9190615058565b868685818110611b4f57611b4f61585c565b9050602002013561481d565b600101611b0a565b3415611b7557611b758760003461481d565b50505050505050565b600060068281548110611b9357611b9361585c565b600091825260209091206002600490920201015492915050565b610c398383836148ff565b6001546001600160a01b03163314611c385760405162461bcd60e51b815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e00000000000000000000000000000000000000000000006064820152608401610c25565b60018054600080546001600160a01b0383167fffffffffffffffffffffffff000000000000000000000000000000000000000091821681179092559091169091556040519081527fcfaaa26691e16e66e73290fc725eee1a6b4e0e693a1640484937aac25ffb55a49060200160405180910390a1565b610ea1816000346148ff565b610c3983838361481d565b610ea18160003461481d565b600060068281548110611ce657611ce661585c565b6000918252602090912060049091020160018101549091506001600160a01b03163314611d555760405162461bcd60e51b815260206004820152600e60248201527f6e6f742066726f6d206f776e65720000000000000000000000000000000000006044820152606401610c25565b8054611d6d90839083906001600160a01b0316614612565b80547fffffffffffffffffffffffff0000000000000000000000000000000000000000908116331782556001808301805490921690915554611dbb90839083906001600160a01b0316613ae0565b60405133815282907fcae10d66f75f577faa75ec3d290ee81497368211d6817451dae38673b5ccf992906020015b60405180910390a25050565b6000546001600160a01b03163314611e0c57600080fd5b6001600160a01b03811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905590519182527f79ede3839cd7a7d8bd77e97e5c890565fe4f76cdbbeaa364646e28a8695a78849101610cec565b6000546001600160a01b03163314611e9257600080fd5b6001600160a01b03811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905590519182527f6d81a01b39982517ba331aeb4f387b0f9cc32334b65bb9a343a077973cf7adf59101610cec565b6006805460018101808355600083815291929083908110611f2757611f2761585c565b60009182526020808320600490920290910180547fffffffffffffffffffffffff00000000000000000000000000000000000000009081163390811783556002830180546001810182559086528486200180549092168117909155835260038101909152604082208290559150835b8082101561202f576000868684818110611fb257611fb261585c565b9050602002016020810190611fc79190615058565b600285018054600181810183556000928352602080842090920180546001600160a01b039095167fffffffffffffffffffffffff0000000000000000000000000000000000000000909516851790559282526003870190526040902093019283905550611f96565b60405184907fd78a25afe0b6160e2dc1fc71b2845c76cc268398d17be04665b78ba59b47440790600090a250505092915050565b6006546000908235106120b85760405162461bcd60e51b815260206004820152601160248201527f496e76616c69642070726f6a65637449640000000000000000000000000000006044820152606401610c25565b600060068360000135815481106120d1576120d161585c565b600091825260208083203380855260049390930201600381019091526040909220546002830180549394509192811061210c5761210c61585c565b6000918252602090912001546001600160a01b03161461216e5760405162461bcd60e51b815260206004820152601360248201527f6e6f7420612070726f6a6563742061646d696e000000000000000000000000006044820152606401610c25565b61217e60c0840160a085016159cd565b67ffffffffffffffff1661219860a08501608086016159cd565b67ffffffffffffffff1611156121f05760405162461bcd60e51b815260206004820152601560248201527f696e76616c69642063616d706169676e206461746500000000000000000000006044820152606401610c25565b600780548435600090815260086020908152604082208054600181810183559184529183209091018390558354018084558382529194509190849081106122395761223961585c565b60009182526020918290208635600c9092020190815591506122619060408601908601614fb4565b6001820180547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000001662ffffff929092169190911790556122a76060850160408601614fb4565b60018201805462ffffff929092166301000000027fffffffffffffffffffffffffffffffffffffffffffffffffffff000000ffffff9092169190911790556122f560808501606086016159f7565b6001820180549115156601000000000000027fffffffffffffffffffffffffffffffffffffffffffffffffff00ffffffffffff90921691909117905561234160a08501608086016159cd565b60018201805467ffffffffffffffff92909216670100000000000000027fffffffffffffffffffffffffffffffffff0000000000000000ffffffffffffff90921691909117905561239860c0850160a086016159cd565b60018201805467ffffffffffffffff929092166f01000000000000000000000000000000027fffffffffffffffffff0000000000000000ffffffffffffffffffffffffffffff9092169190911790556000806123f760c0870187615a14565b9150612408905060c0870187615a14565b612416916002860191614d48565b505b808210156124c557600160038401600061243560c08a018a615a14565b868181106124455761244561585c565b905060200201602081019061245a9190615a7c565b7fffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000168152602081019190915260400160002080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001691151591909117905560019190910190612418565b6124d6610100870160e088016159f7565b6004840180547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016911515919091179055612519610120870161010088016159f7565b600484018054911515610100027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff90921691909117905560009150612562610120870187615a14565b91506125749050610140870187615a14565b905081148015612592575061258d610160870187615abe565b905081145b6126045760405162461bcd60e51b815260206004820152602260248201527f696e20746f6b656e20636f6e666967206c656e677468206e6f74206d6174636860448201527f65640000000000000000000000000000000000000000000000000000000000006064820152608401610c25565b612612610120870187615a14565b612620916005860191614dbd565b505b8082101561276c57612638610140870187615a14565b838181106126485761264861585c565b905060200201602081019061265d91906159f7565b6007840160006126716101208a018a615a14565b868181106126815761268161585c565b90506020020160208101906126969190615058565b6001600160a01b03168152602081019190915260400160002080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169115159190911790556126ea610160870187615abe565b838181106126fa576126fa61585c565b905060800201836008016000888061012001906127179190615a14565b868181106127275761272761585c565b905060200201602081019061273c9190615058565b6001600160a01b03168152602081019190915260400160002061275f8282615b26565b5050600190910190612622565b6000915061277e610180870187615a14565b915061279090506101a0870187615abe565b905081146128065760405162461bcd60e51b815260206004820152602360248201527f6f757420746f6b656e20636f6e666967206c656e677468206e6f74206d61746360448201527f68656400000000000000000000000000000000000000000000000000000000006064820152608401610c25565b612814610180870187615a14565b612822916006860191614dbd565b505b808210156128bc5761283a6101a0870187615abe565b8381811061284a5761284a61585c565b905060800201836009016000888061018001906128679190615a14565b868181106128775761287761585c565b905060200201602081019061288c9190615058565b6001600160a01b0316815260208101919091526040016000206128af8282615b26565b5050600190910190612824565b600091506128ce6101c0870187615a14565b9150508015156128e460808801606089016159f7565b1515146129335760405162461bcd60e51b815260206004820152601860248201527f696e76616c696420726566657272657273206c656e67746800000000000000006044820152606401610c25565b6129416101c0870187615a14565b61294f91600a860191614dbd565b505b808210156129b85781600b8401600061296e6101c08a018a615a14565b8681811061297e5761297e61585c565b90506020020160208101906129939190615058565b6001600160a01b03168152602081019190915260400160002055600190910190612951565b60405185907ff91d5ca55c5415a1aa70a5dfde98765e180ec8b56375e3de9149ee89efc28f9d90600090a250505050919050565b82818114612a3c5760405162461bcd60e51b815260206004820152601260248201527f6c656e677468206e6f74206d61746368656400000000000000000000000000006044820152606401610c25565b60005b81811015611b7557612a9087878784818110612a5d57612a5d61585c565b9050602002016020810190612a729190615058565b868685818110612a8457612a8461585c565b905060200201356148ff565b600101612a3f565b8060005b81811015611a2257600080858584818110612ab957612ab961585c565b9050602002016020810190612ace9190615058565b90506001600160a01b038116612b27576000805260056020527f05b8ccbb9d4d8fb16ea74ce3c29a41f1b461fbdaff4714a0d9a8eb05499746bc54479250612b1690836158cd565b9150612b223383613ff6565b612be4565b6040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201526001600160a01b038216906370a0823190602401602060405180830381865afa158015612b84573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612ba891906159b4565b6001600160a01b038216600090815260056020526040902054909250612bce90836158cd565b9150612be46001600160a01b03821633846140b3565b60405182815233906001600160a01b038316907f2ae72b44f59d038340fca5739135a1d51fc5ab720bb02d983e4c5ff4119ca7b89060200160405180910390a350508080612c31906158e0565b915050612a9c565b612cd6604051806101e0016040528060008152602001600062ffffff168152602001600062ffffff168152602001600015158152602001600067ffffffffffffffff168152602001600067ffffffffffffffff168152602001606081526020016000151581526020016000151581526020016060815260200160608152602001606081526020016060815260200160608152602001606081525090565b600060078481548110612ceb57612ceb61585c565b6000918252602091829020600c9091020180548452600181015462ffffff8082169386019390935263010000008104909216604085015260ff6601000000000000830481161515606086015267ffffffffffffffff6701000000000000008404811660808701526f0100000000000000000000000000000090930490921660a08501526004810154808316151560e086015261010090819004909216151591840191909152905082156132905780600201805480602002602001604051908101604052809291908181526020018280548015612e0c57602002820191906000526020600020905b815460401b7fffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000168152600190910190602001808311612dd2575b505050505060c08301526005810180546040805160208084028201810190925282815260009390918390830182828015612e6f57602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311612e51575b50505050508461012001819052508067ffffffffffffffff811115612e9657612e96615075565b604051908082528060200260200182016040528015612ebf578160200160208202803683370190505b506101408501528067ffffffffffffffff811115612edf57612edf615075565b604051908082528060200260200182016040528015612f4f57816020015b6040805160808101825260008082526020808301829052928201819052606082015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff909201910181612efd5790505b506101608501525b8082101561307a57826007016000846005018481548110612f7a57612f7a61585c565b60009182526020808320909101546001600160a01b03168352820192909252604001902054610140850151805160ff9092169184908110612fbd57612fbd61585c565b602002602001019015159081151581525050826008016000846005018481548110612fea57612fea61585c565b60009182526020808320909101546001600160a01b0316835282810193909352604091820190208151608081018352815462ffffff8116825260ff6301000000909104161515938101939093526001810154918301919091526002015460608201526101608501518051849081106130645761306461585c565b6020908102919091010152600190910190612f57565b505060068101805460408051602080840282018101909252828152600093909183908301828280156130d557602002820191906000526020600020905b81546001600160a01b031681526001909101906020018083116130b7575b50505050508461018001819052508067ffffffffffffffff8111156130fc576130fc615075565b60405190808252806020026020018201604052801561316c57816020015b6040805160808101825260008082526020808301829052928201819052606082015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90920191018161311a5790505b506101a08501525b80821015613227578260090160008460060184815481106131975761319761585c565b60009182526020808320909101546001600160a01b0316835282810193909352604091820190208151608081018352815462ffffff8116825260ff6301000000909104161515938101939093526001810154918301919091526002015460608201526101a08501518051849081106132115761321161585c565b6020908102919091010152600190910190613174565b82600a0180548060200260200160405190810160405280929190818152602001828054801561327f57602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311613261575b5050505050846101c0018190525050505b5092915050565b6001600160a01b038083166000908152600d602090815260408083209385168352928152828220548252600c905220600201545b92915050565b6000600683815481106132e6576132e661585c565b6000918252602090912060049091020180549091506001600160a01b031633146133525760405162461bcd60e51b815260206004820152600e60248201527f6e6f742066726f6d206f776e65720000000000000000000000000000000000006044820152606401610c25565b6001810180547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03841690811790915560405190815283907fd76f6b3fb9ea3802f0403d54d37db427cea79df08cd8817552eb23790d2b54919060200160405180910390a2505050565b60008060606000600685815481106133de576133de61585c565b600091825260209091206004909102018054600182015460028301546001600160a01b0392831697509116945090915067ffffffffffffffff81111561342657613426615075565b60405190808252806020026020018201604052801561344f578160200160208202803683370190505b50600282018054604080516020808402820181019092528281529395508301828280156134a557602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311613487575b50505050509150509193909250565b6000546001600160a01b031633146134cb57600080fd5b600180547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0383169081179091556040519081527f686a7ab184e6928ddedba810af7b443d6baa40bf32c4787ccd72c5b4b28cae1b90602001610cec565b8060005b81811015611a225761356c8484838181106135525761355261585c565b90506020020160208101906135679190615058565b613bb4565b80613576816158e0565b915050613535565b6000546001600160a01b0316331461359557600080fd5b610ea181614568565b6060806060806060600060078b815481106135bb576135bb61585c565b90600052602060002090600c02019050600081600501805490508b11156135e45760058201549a505b60058201546135f38b8d6158ba565b111561360c576005820154613609908c906158cd565b99505b8967ffffffffffffffff81111561362557613625615075565b60405190808252806020026020018201604052801561364e578160200160208202803683370190505b5096508967ffffffffffffffff81111561366a5761366a615075565b604051908082528060200260200182016040528015613693578160200160208202803683370190505b5095508967ffffffffffffffff8111156136af576136af615075565b60405190808252806020026020018201604052801561371f57816020015b6040805160808101825260008082526020808301829052928201819052606082015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9092019101816136cd5790505b5094505b898110156138aa57600582016137398c836158ba565b815481106137495761374961585c565b9060005260206000200160009054906101000a90046001600160a01b03168782815181106137795761377961585c565b60200260200101906001600160a01b031690816001600160a01b0316815250508160070160008883815181106137b1576137b161585c565b60200260200101516001600160a01b03166001600160a01b0316815260200190815260200160002060009054906101000a900460ff168682815181106137f9576137f961585c565b6020026020010190151590811515815250508160080160008883815181106138235761382361585c565b6020908102919091018101516001600160a01b031682528181019290925260409081016000208151608081018352815462ffffff811682526301000000900460ff1615159381019390935260018101549183019190915260020154606082015285518690839081106138975761389761585c565b6020908102919091010152600101613723565b5060068101546000908911156138c257600682015498505b60068201546138d1898b6158ba565b11156138ea5760068201546138e7908a906158cd565b97505b8767ffffffffffffffff81111561390357613903615075565b60405190808252806020026020018201604052801561392c578160200160208202803683370190505b5093508767ffffffffffffffff81111561394857613948615075565b6040519080825280602002602001820160405280156139b857816020015b6040805160808101825260008082526020808301829052928201819052606082015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9092019101816139665790505b5092505b87811015613ad157600682016139d28a836158ba565b815481106139e2576139e261585c565b9060005260206000200160009054906101000a90046001600160a01b0316848281518110613a1257613a1261585c565b60200260200101906001600160a01b031690816001600160a01b031681525050816009016000858381518110613a4a57613a4a61585c565b6020908102919091018101516001600160a01b031682528181019290925260409081016000208151608081018352815462ffffff811682526301000000900460ff161515938101939093526001810154918301919091526002015460608201528351849083908110613abe57613abe61585c565b60209081029190910101526001016139bc565b50509550955095509550959050565b6001600160a01b03811660008181526003840160205260409020546002840180549091908110613b1257613b1261585c565b6000918252602090912001546001600160a01b031614610c39576002820180546001600160a01b03831660008181526003860160209081526040808320859055600185018655948252812090920180547fffffffffffffffffffffffff00000000000000000000000000000000000000001682179055915185917f1c3cea70d3dcea4dc82722f4fb7300d19f76e272a8349e73a99780429f2c151691a3505050565b336000908152600d602090815260408083206001600160a01b0385811680865291845282852054808652600c85528386208451606081018652815484168152600182015490931683870152600201805483860181905290879055928652600590945291842080549394929391928392613c2e9084906158cd565b90915550506001600160a01b038416613c5057613c4b3382613ff6565b613c64565b613c646001600160a01b03851633836140b3565b6040518181526001600160a01b0385169033907f70eb43c4a8ae8c40502dcf22436c509c28d6ff421cf07c491be56984bd9870689060200160405180910390a350505050565b6040516001600160a01b0380851660248301528316604482015260648101829052611a229085907f23b872dd00000000000000000000000000000000000000000000000000000000906084015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152614abc565b6040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201526000906001600160a01b038416906370a0823190602401602060405180830381865afa158015613dd9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613dfd91906159b4565b9050613e146001600160a01b038416333085613caa565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015281906001600160a01b038516906370a0823190602401602060405180830381865afa158015613e73573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613e9791906159b4565b613ea191906158cd565b9392505050565b801580613f3b57506040517fdd62ed3e0000000000000000000000000000000000000000000000000000000081523060048201526001600160a01b03838116602483015284169063dd62ed3e90604401602060405180830381865afa158015613f15573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613f3991906159b4565b155b613fad5760405162461bcd60e51b815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527f20746f206e6f6e2d7a65726f20616c6c6f77616e6365000000000000000000006064820152608401610c25565b6040516001600160a01b038316602482015260448101829052610c399084907f095ea7b30000000000000000000000000000000000000000000000000000000090606401613cf7565b604080516000808252602082019092526001600160a01b0384169083906040516140209190615be3565b60006040518083038185875af1925050503d806000811461405d576040519150601f19603f3d011682016040523d82523d6000602084013e614062565b606091505b5050905080610c395760405162461bcd60e51b815260206004820152601360248201527f4554485f5452414e534645525f4641494c4544000000000000000000000000006044820152606401610c25565b6040516001600160a01b038316602482015260448101829052610c399084907fa9059cbb0000000000000000000000000000000000000000000000000000000090606401613cf7565b600083614122576001600160a01b0383166000908152600988016020526040902061413d565b6001600160a01b038316600090815260088801602052604090205b805490915062ffffff1615611b755786548154620f4240906141649062ffffff1685615bff565b61416e9190615c16565b925081600101548311156141c45760405162461bcd60e51b815260206004820152600c60248201527f63617020657863656564656400000000000000000000000000000000000000006044820152606401610c25565b600354600090620f4240906141de9062ffffff1686615bff565b6141e89190615c16565b6001600160a01b0386166000908152600460205260408120805492935083929091906142159084906158ba565b9091555050825460009081906301000000900460ff16156142445785915061423d83836158ba565b9050614254565b61424e83876158cd565b91508590505b60008481526009602090815260408083206001600160a01b038b1684529091529020548111156142c65760405162461bcd60e51b815260206004820152601560248201527f6e6f7420656e6f75676820636f6d6d697373696f6e00000000000000000000006044820152606401610c25565b60008481526009602090815260408083206001600160a01b038b16808552908352818420805486900390558d8452600a8352818420908452909152812080548392906143139084906158ba565b9091555050600285015460008b8152600a602090815260408083206001600160a01b038c16845290915290205411156143b45760405162461bcd60e51b815260206004820152602560248201527f616363756d756c6174656420636f6d6d697373696f6e2065786365656465642060448201527f6c696d69740000000000000000000000000000000000000000000000000000006064820152608401610c25565b6001600160a01b03808a166000908152600d60209081526040808320938b168352929052908120549081900361449857600b600081546143f3906158e0565b90915550604080516060810182526001600160a01b03808d168083528b821660208085018281528587018a8152600b80546000908152600c8552898120985189549089167fffffffffffffffffffffffff0000000000000000000000000000000000000000918216178a55935160018a01805491909916941693909317909655516002909601959095559254918452600d8352848420908452909152919020556144bf565b6000818152600c6020526040812060020180548592906144b99084906158ba565b90915550505b6000818152600c60209081526040808320600201546001600160a01b038c1684526004909252918290205491517fac98d1de12ec7e306f0033236185d2a9d904bb054995aa9987c7d5a6d7ff4c5792614552928e928d928992918b91906001600160a01b03968716815294909516602085015260408401929092526060830152608082015260a081019190915260c00190565b60405180910390a1505050505050505050505050565b6001600160a01b0381166000908152600460209081526040808320805490849055600590925282208054919283926145a19084906158cd565b90915550506001600160a01b0382166145c3576145be3382613ff6565b6145d7565b6145d76001600160a01b03831633836140b3565b816001600160a01b03167f6ec620dc21a80aff1281aac3592cbd6b0554bbf810aa4b75338ef3cc9ae1a66c82604051611de991815260200190565b6001600160a01b0381166000818152600384016020526040902054600284018054919291839081106146465761464661585c565b6000918252602090912001546001600160a01b0316146146a85760405162461bcd60e51b815260206004820152600c60248201527f6e6f7420616e2061646d696e00000000000000000000000000000000000000006044820152606401610c25565b60028301546000906146bc906001906158cd565b90508082146147625760008460020182815481106146dc576146dc61585c565b6000918252602090912001546002860180546001600160a01b03909216925082918590811061470d5761470d61585c565b600091825260208083209190910180547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0394851617905592909116815260038601909152604090208290555b8360020180548061477557614775615c51565b6000828152602080822083017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90810180547fffffffffffffffffffffffff00000000000000000000000000000000000000001690559092019092556001600160a01b03851680835260038701909152604080832083905551909187917fe76d77167882521e5d6872e780957ffd683d0e4710f4f159f4170fa42589387b9190a35050505050565b6001600160a01b03821615614839576148368282613d79565b90505b60008381526009602090815260408083206001600160a01b03861684529091528120805483929061486b9084906158ba565b90915550506001600160a01b038216600090815260056020526040812080548392906148989084906158ba565b909155505060008381526009602090815260408083206001600160a01b038616808552908352928190205481518581529283015285917f507ac39eb33610191cd8fd54286e91c5cc464c262861643be3978f5a9f18ab0291015b60405180910390a3505050565b600683815481106149125761491261585c565b60009182526020909120600490910201546001600160a01b0316331461497a5760405162461bcd60e51b815260206004820152600e60248201527f6e6f742066726f6d206f776e65720000000000000000000000000000000000006044820152606401610c25565b60008381526009602090815260408083206001600160a01b03861684529091529020548111156149ec5760405162461bcd60e51b815260206004820152601760248201527f616d6f756e742065786365656465642062616c616e63650000000000000000006044820152606401610c25565b60008381526009602090815260408083206001600160a01b0386168452825280832080548590039055600590915281208054839290614a2c9084906158cd565b90915550506001600160a01b03821615614a5957614a546001600160a01b03831633836140b3565b614a63565b614a633382613ff6565b60008381526009602090815260408083206001600160a01b038616808552908352928190205481518581529283015285917fc1e00202ee2c06861d326fc6374026b751863ff64218ccbaa38c3e603a8e72c291016148f2565b6000614b11826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316614ba19092919063ffffffff16565b805190915015610c395780806020019051810190614b2f9190615c80565b610c395760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f742073756363656564000000000000000000000000000000000000000000006064820152608401610c25565b6060614bb08484600085614bb8565b949350505050565b606082471015614c305760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c00000000000000000000000000000000000000000000000000006064820152608401610c25565b600080866001600160a01b03168587604051614c4c9190615be3565b60006040518083038185875af1925050503d8060008114614c89576040519150601f19603f3d011682016040523d82523d6000602084013e614c8e565b606091505b5091509150614c9f87838387614caa565b979650505050505050565b60608315614d19578251600003614d12576001600160a01b0385163b614d125760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610c25565b5081614bb0565b614bb08383815115614d2e5781518083602001fd5b8060405162461bcd60e51b8152600401610c259190615c9d565b828054828255906000526020600020908101928215614dad579160200282015b82811115614dad5781547fffffffffffffffff00000000000000000000000000000000000000000000000016833560401c178255602090920191600190910190614d68565b50614db9929150614e28565b5090565b828054828255906000526020600020908101928215614dad579160200282015b82811115614dad5781547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03843516178255602090920191600190910190614ddd565b5b80821115614db95760008155600101614e29565b600080600080600060a08688031215614e5557600080fd5b505083359560208501359550604085013594606081013594506080013592509050565b600081518084526020808501945080840160005b83811015614eb15781516001600160a01b031687529582019590820190600101614e8c565b509495945050505050565b604080825283519082018190526000906020906060840190828701845b82811015614f175781517fffffffffffffffffffffffffffffffffffffffffffffffff00000000000000001684529284019290840190600101614ed9565b50505083810382850152614f2b8186614e78565b9695505050505050565b6001600160a01b0381168114610ea157600080fd5b8035614f5581614f35565b919050565b60008060408385031215614f6d57600080fd5b823591506020830135614f7f81614f35565b809150509250929050565b600060208284031215614f9c57600080fd5b5035919050565b62ffffff81168114610ea157600080fd5b600060208284031215614fc657600080fd5b8135613ea181614fa3565b60008060408385031215614fe457600080fd5b50508035926020909101359150565b602080825282518282018190526000919060409081850190868401855b8281101561504b57815180516001600160a01b0390811686528782015116878601528501518585015260609093019290850190600101615010565b5091979650505050505050565b60006020828403121561506a57600080fd5b8135613ea181614f35565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040805190810167ffffffffffffffff811182821017156150c7576150c7615075565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff8111828210171561511457615114615075565b604052919050565b600067ffffffffffffffff82111561513657615136615075565b5060051b60200190565b600082601f83011261515157600080fd5b813560206151666151618361511c565b6150cd565b82815260069290921b8401810191818101908684111561518557600080fd5b8286015b848110156151cd57604081890312156151a25760008081fd5b6151aa6150a4565b81356151b581614f35565b81528185013585820152835291830191604001615189565b509695505050505050565b600082601f8301126151e957600080fd5b813560206151f96151618361511c565b82815260059290921b8401810191818101908684111561521857600080fd5b8286015b848110156151cd57803561522f81614f35565b835291830191830161521c565b600080600080600080600060e0888a03121561525757600080fd5b8735965060208089013561526a81614f35565b9650604089013567ffffffffffffffff8082111561528757600080fd5b818b0191508b601f83011261529b57600080fd5b8135818111156152ad576152ad615075565b6152dd847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116016150cd565b8181528d858386010111156152f157600080fd5b81858501868301376000858383010152809950505061531260608c01614f4a565b965061532060808c01614f4a565b955060a08b013592508083111561533657600080fd5b6153428c848d01615140565b945060c08b013592508083111561535857600080fd5b50506153668a828b016151d8565b91505092959891949750929550565b60008083601f84011261538757600080fd5b50813567ffffffffffffffff81111561539f57600080fd5b6020830191508360208260051b85010111156153ba57600080fd5b9250929050565b600080602083850312156153d457600080fd5b823567ffffffffffffffff8111156153eb57600080fd5b6153f785828601615375565b90969095509350505050565b60008060008060006060868803121561541b57600080fd5b85359450602086013567ffffffffffffffff8082111561543a57600080fd5b61544689838a01615375565b9096509450604088013591508082111561545f57600080fd5b5061546c88828901615375565b969995985093965092949392505050565b60008060006060848603121561549257600080fd5b8335925060208401356154a481614f35565b929592945050506040919091013590565b600080604083850312156154c857600080fd5b82356154d381614f35565b91506020830135614f7f81614f35565b6000602082840312156154f557600080fd5b813567ffffffffffffffff81111561550c57600080fd5b82016101e08185031215613ea157600080fd5b8015158114610ea157600080fd5b6000806040838503121561554057600080fd5b823591506020830135614f7f8161551f565b600081518084526020808501945080840160005b83811015614eb15781517fffffffffffffffffffffffffffffffffffffffffffffffff00000000000000001687529582019590820190600101615566565b600081518084526020808501945080840160005b83811015614eb15781511515875295820195908201906001016155b8565b600081518084526020808501945080840160005b83811015614eb1578151805162ffffff168852838101511515848901526040808201519089015260609081015190880152608090960195908201906001016155ea565b602081528151602082015260006020830151615650604084018262ffffff169052565b50604083015162ffffff81166060840152506060830151801515608084015250608083015167ffffffffffffffff811660a08401525060a083015167ffffffffffffffff811660c08401525060c08301516101e08060e08501526156b8610200850183615552565b915060e08501516101006156cf8187018315159052565b86015190506101206156e48682018315159052565b808701519150507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe06101408187860301818801526157228584614e78565b94508088015192505061016081878603018188015261574185846155a4565b94508088015192505061018081878603018188015261576085846155d6565b9450808801519250506101a081878603018188015261577f8584614e78565b9450808801519250506101c081878603018188015261579e85846155d6565b908801518782039092018488015293509050614f2b8382614e78565b60006001600160a01b038086168352808516602084015250606060408301526157e66060830184614e78565b95945050505050565b60a08152600061580260a0830188614e78565b828103602084015261581481886155a4565b9050828103604084015261582881876155d6565b9050828103606084015261583c8186614e78565b9050828103608084015261585081856155d6565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b808201808211156132cb576132cb61588b565b818103818111156132cb576132cb61588b565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036159115761591161588b565b5060010190565b6000815160208301517fffffffff00000000000000000000000000000000000000000000000000000000808216935060048310156159605780818460040360031b1b83161693505b505050919050565b6000815160208301517fffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000808216935060188310156159605760189290920360031b82901b161692915050565b6000602082840312156159c657600080fd5b5051919050565b6000602082840312156159df57600080fd5b813567ffffffffffffffff81168114613ea157600080fd5b600060208284031215615a0957600080fd5b8135613ea18161551f565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112615a4957600080fd5b83018035915067ffffffffffffffff821115615a6457600080fd5b6020019150600581901b36038213156153ba57600080fd5b600060208284031215615a8e57600080fd5b81357fffffffffffffffffffffffffffffffffffffffffffffffff000000000000000081168114613ea157600080fd5b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112615af357600080fd5b83018035915067ffffffffffffffff821115615b0e57600080fd5b6020019150600781901b36038213156153ba57600080fd5b8135615b3181614fa3565b62ffffff811690508154817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000082161783556020840135615b708161551f565b63ff00000081151560181b16837fffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000084161717845550505060408201356001820155606082013560028201555050565b60005b83811015615bda578181015183820152602001615bc2565b50506000910152565b60008251615bf5818460208701615bbf565b9190910192915050565b80820281158282048414176132cb576132cb61588b565b600082615c4c577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b600060208284031215615c9257600080fd5b8151613ea18161551f565b6020815260008251806020840152615cbc816040850160208701615bbf565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016040019291505056fea2646970667358221220678e05bb444adc7edd1cc5ebe8bf3107fa7968c3599a2bf55cdc56648d68f35364736f6c63430008110033"
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
        parseUnstakeEvent(receipt) {
            return this.parseEvents(receipt, "Unstake").map(e => this.decodeUnstakeEvent(e));
        }
        decodeUnstakeEvent(event) {
            let result = event.data;
            return {
                projectId: new eth_contract_4.BigNumber(result.projectId),
                token: result.token,
                amount: new eth_contract_4.BigNumber(result.amount),
                balance: new eth_contract_4.BigNumber(result.balance),
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
            let getProjectsLength_call = async (options) => {
                let result = await this.call('getProjectsLength', [], options);
                return new eth_contract_4.BigNumber(result);
            };
            this.getProjectsLength = getProjectsLength_call;
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
            let proxyCallParams = (params) => [this.wallet.utils.toString(params.campaignId), params.target, this.wallet.utils.stringToBytes(params.data), params.referrer, params.to, params.tokensIn.map(e => ([e.token, this.wallet.utils.toString(e.amount)])), params.tokensOut];
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
            let unstakeParams = (params) => [this.wallet.utils.toString(params.projectId), params.token, this.wallet.utils.toString(params.amount)];
            let unstake_send = async (params, options) => {
                let result = await this.send('unstake', unstakeParams(params), options);
                return result;
            };
            let unstake_call = async (params, options) => {
                let result = await this.call('unstake', unstakeParams(params), options);
                return;
            };
            let unstake_txData = async (params, options) => {
                let result = await this.txData('unstake', unstakeParams(params), options);
                return result;
            };
            this.unstake = Object.assign(unstake_send, {
                call: unstake_call,
                txData: unstake_txData
            });
            let unstakeETH_send = async (projectId, options) => {
                let result = await this.send('unstakeETH', [this.wallet.utils.toString(projectId)], options);
                return result;
            };
            let unstakeETH_call = async (projectId, options) => {
                let result = await this.call('unstakeETH', [this.wallet.utils.toString(projectId)], options);
                return;
            };
            let unstakeETH_txData = async (projectId, options) => {
                let result = await this.txData('unstakeETH', [this.wallet.utils.toString(projectId)], options);
                return result;
            };
            this.unstakeETH = Object.assign(unstakeETH_send, {
                call: unstakeETH_call,
                txData: unstakeETH_txData
            });
            let unstakeMultipleParams = (params) => [this.wallet.utils.toString(params.projectId), params.token, this.wallet.utils.toString(params.amount)];
            let unstakeMultiple_send = async (params, options) => {
                let result = await this.send('unstakeMultiple', unstakeMultipleParams(params), options);
                return result;
            };
            let unstakeMultiple_call = async (params, options) => {
                let result = await this.call('unstakeMultiple', unstakeMultipleParams(params), options);
                return;
            };
            let unstakeMultiple_txData = async (params, options) => {
                let result = await this.txData('unstakeMultiple', unstakeMultipleParams(params), options);
                return result;
            };
            this.unstakeMultiple = Object.assign(unstakeMultiple_send, {
                call: unstakeMultiple_call,
                txData: unstakeMultiple_txData
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
define("@scom/scom-commission-proxy-contract", ["require", "exports", "@scom/scom-commission-proxy-contract/contracts/index.ts", "@ijstech/eth-wallet"], function (require, exports, Contracts, eth_wallet_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.onProgress = exports.deploy = exports.DefaultDeployOptions = exports.Contracts = void 0;
    exports.Contracts = Contracts;
    ;
    ;
    var progressHandler;
    exports.DefaultDeployOptions = {
        version: 'V3',
        protocolRate: '0.01'
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
        if (options.version == 'V3') {
            proxy = new Contracts.ProxyV3(wallet);
            progress('Deploy Proxy');
            await proxy.deploy(eth_wallet_1.Utils.toDecimals(options.protocolRate, 6));
        }
        else {
            if (options.version == 'V2') {
                proxy = new Contracts.ProxyV2(wallet);
            }
            else {
                proxy = new Contracts.Proxy(wallet);
            }
            progress('Deploy Proxy');
            await proxy.deploy();
        }
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
