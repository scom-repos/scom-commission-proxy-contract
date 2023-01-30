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
        "bytecode": "608060405234801561001057600080fd5b506121ed806100206000396000f3fe6080604052600436106100cb5760003560e01c8063b60c164c11610074578063d3b7d4c31161004e578063d3b7d4c31461027c578063ee42d3a31461029c578063f303ad6e146102c957600080fd5b8063b60c164c146101b1578063c0da918d146101d1578063d2ef8464146101f157600080fd5b806373d8690f116100a557806373d8690f1461014257806383e40a5114610155578063b316d7141461019b57600080fd5b806301417e7b146100d7578063188ff72b146100ec5780631e83409a1461012257600080fd5b366100d257005b600080fd5b6100ea6100e5366004611bef565b6102e9565b005b3480156100f857600080fd5b5061010c610107366004611c9c565b610493565b6040516101199190611cbe565b60405180910390f35b34801561012e57600080fd5b506100ea61013d366004611d30565b6105e2565b6100ea610150366004611da0565b6105ee565b34801561016157600080fd5b5061018d610170366004611e5b565b600360209081526000928352604080842090915290825290205481565b604051908152602001610119565b3480156101a757600080fd5b5061018d60005481565b3480156101bd57600080fd5b506100ea6101cc366004611e94565b610ca0565b3480156101dd57600080fd5b506100ea6101ec366004611ed6565b610e88565b3480156101fd57600080fd5b5061024961020c366004611f54565b600260208190526000918252604090912080546001820154919092015473ffffffffffffffffffffffffffffffffffffffff928316929091169083565b6040805173ffffffffffffffffffffffffffffffffffffffff948516815293909216602084015290820152606001610119565b34801561028857600080fd5b5061018d610297366004611e5b565b611101565b3480156102a857600080fd5b5061018d6102b7366004611d30565b60016020526000908152604090205481565b3480156102d557600080fd5b506100ea6102e4366004611e94565b61114a565b600082815b818110156103bb573686868381811061030957610309611f6d565b90506040020190508060200135846103219190611fcb565b935061033f6103336020830183611d30565b60008360200135611197565b7fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef61036d6020830183611d30565b6040805173ffffffffffffffffffffffffffffffffffffffff909216825260006020838101919091528401359082015260600160405180910390a150806103b381611fde565b9150506102ee565b5060006103c88334612016565b600080805260016020527fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb4980549293508592909190610408908490611fcb565b9091555050604080513381526020810183905290810184905260009073ffffffffffffffffffffffffffffffffffffffff8916907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a3600080855186602001848b5af180600003610488573d6000803e3d6000fd5b503d6000803e3d6000f35b60005460609060016104a58486611fcb565b6104af9190612016565b11156104bb5760005491505b8167ffffffffffffffff8111156104d4576104d4611b15565b60405190808252806020026020018201604052801561053d57816020015b60408051606081018252600080825260208083018290529282015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9092019101816104f25790505b5090508260005b838110156105da576000828152600260208181526040928390208351606081018552815473ffffffffffffffffffffffffffffffffffffffff908116825260018301541692810192909252909101549181019190915283518490839081106105ae576105ae611f6d565b602002602001018190525081806105c490611fde565b92505080806105d290611fde565b915050610544565b505092915050565b6105eb816112ec565b50565b846000805b828110156109e3573689898381811061060e5761060e611f6d565b90506020028101906106209190612029565b90506000806106326060840184612067565b9050905060005b8181101561072b573661064f6060860186612067565b8381811061065f5761065f611f6d565b90506040020190508060200135846106779190611fcb565b93506106a06106896020830183611d30565b6106966020880188611d30565b8360200135611197565b7fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef6106ce6020830183611d30565b6106db6020880188611d30565b6040805173ffffffffffffffffffffffffffffffffffffffff9384168152929091166020838101919091528401359082015260600160405180910390a1508061072381611fde565b915050610639565b506000905061073e826020850135612016565b905081600160006107526020870187611d30565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461079b9190611fcb565b90915550600090506107b06020850185611d30565b73ffffffffffffffffffffffffffffffffffffffff16036108ad578415610838576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f6d6f7265207468616e206f6e6520455448207472616e7366657200000000000060448201526064015b60405180910390fd5b826020013534146108a5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f45544820616d6f756e74206e6f74206d61746368656400000000000000000000604482015260640161082f565b809450610963565b6108bd60608401604085016120dd565b1561090b576108f33330846108d56020880188611d30565b73ffffffffffffffffffffffffffffffffffffffff1692919061141a565b610906338e836108d56020880188611d30565b610963565b6109213330602086018035906108d59088611d30565b6109518d60006109346020870187611d30565b73ffffffffffffffffffffffffffffffffffffffff1691906114f6565b6109638d826109346020870187611d30565b6109706020840184611d30565b604080513381526020810184905290810184905273ffffffffffffffffffffffffffffffffffffffff918216918f16907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a350505080806109db90611fde565b9150506105f3565b50600080845185602001848d5af180600003610a03573d6000803e3d6000fd5b5083915060005b8281101561048857600080878784818110610a2757610a27611f6d565b9050602002016020810190610a3c9190611d30565b73ffffffffffffffffffffffffffffffffffffffff1603610a9d576000805260016020527fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb4954610a8c9047612016565b9050610a988882611678565b610c0f565b60016000888885818110610ab357610ab3611f6d565b9050602002016020810190610ac89190611d30565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054878784818110610b1557610b15611f6d565b9050602002016020810190610b2a9190611d30565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff91909116906370a0823190602401602060405180830381865afa158015610b96573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bba91906120fa565b610bc49190612016565b9050610c0f8882898986818110610bdd57610bdd611f6d565b9050602002016020810190610bf29190611d30565b73ffffffffffffffffffffffffffffffffffffffff169190611782565b868683818110610c2157610c21611f6d565b9050602002016020810190610c369190611d30565b6040805173ffffffffffffffffffffffffffffffffffffffff8b8116825260208201859052928316928e16917fc2534859c9972270c16d5b4255d200f9a0385f9a6ce3add96c0427ff9fc70f93910160405180910390a35080610c9881611fde565b915050610a0a565b8060005b81811015610e8257600080858584818110610cc157610cc1611f6d565b9050602002016020810190610cd69190611d30565b905073ffffffffffffffffffffffffffffffffffffffff8116610d3c576000805260016020527fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb4954479250610d2b9083612016565b9150610d373383611678565b610e20565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff8216906370a0823190602401602060405180830381865afa158015610da6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dca91906120fa565b73ffffffffffffffffffffffffffffffffffffffff8216600090815260016020526040902054909250610dfd9083612016565b9150610e2073ffffffffffffffffffffffffffffffffffffffff82163384611782565b604051828152339073ffffffffffffffffffffffffffffffffffffffff8316907f2ae72b44f59d038340fca5739135a1d51fc5ab720bb02d983e4c5ff4119ca7b89060200160405180910390a350508080610e7a90611fde565b915050610ca4565b50505050565b81600080610e996060840184612067565b9050905060005b81811015610f885736610eb66060860186612067565b83818110610ec657610ec6611f6d565b9050604002019050806020013584610ede9190611fcb565b9350610efd610ef06020830183611d30565b61069660208a018a611d30565b7fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef610f2b6020830183611d30565b610f3860208a018a611d30565b6040805173ffffffffffffffffffffffffffffffffffffffff9384168152929091166020838101919091528401359082015260600160405180910390a15080610f8081611fde565b915050610ea0565b506000610f99836020860135612016565b90508260016000610fad6020880188611d30565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610ff69190611fcb565b9091555061100c905060608501604086016120dd565b1561103c576110243330856108d56020890189611d30565b6110373388836108d56020890189611d30565b611077565b6110523330602087018035906108d59089611d30565b6110658760006109346020880188611d30565b61107787826109346020880188611d30565b6110846020850185611d30565b604080513381526020810184905290810185905273ffffffffffffffffffffffffffffffffffffffff918216918916907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a360008086518760200160008b5af180600003610488573d6000803e3d6000fd5b73ffffffffffffffffffffffffffffffffffffffff8083166000908152600360209081526040808320938516835292815282822054825260029081905291902001545b92915050565b8060005b81811015610e825761118584848381811061116b5761116b611f6d565b90506020020160208101906111809190611d30565b6112ec565b8061118f81611fde565b91505061114e565b73ffffffffffffffffffffffffffffffffffffffff8084166000908152600360209081526040808320938616835292905290812054900361128e5760008081546111e090611fde565b909155506040805160608101825273ffffffffffffffffffffffffffffffffffffffff80861680835285821660208085018281528587018881526000805481526002808552898220985189549089167fffffffffffffffffffffffff0000000000000000000000000000000000000000918216178a55935160018a01805491909916941693909317909655519501949094558254918352600384528483209083529092529190912055505050565b73ffffffffffffffffffffffffffffffffffffffff80841660009081526003602090815260408083209386168352928152828220548083526002918290529282200180548492906112e0908490611fcb565b9091555050505b505050565b33600090815260036020908152604080832073ffffffffffffffffffffffffffffffffffffffff85811680865291845282852054808652600280865284872085516060810187528154851681526001808301549095168189015291018054828701819052908890559387529190945291842080549394929391928392611373908490612016565b909155505073ffffffffffffffffffffffffffffffffffffffff84166113a25761139d3382611678565b6113c3565b6113c373ffffffffffffffffffffffffffffffffffffffff85163383611782565b6040805173ffffffffffffffffffffffffffffffffffffffff861681526020810183905233917f70eb43c4a8ae8c40502dcf22436c509c28d6ff421cf07c491be56984bd987068910160405180910390a250505050565b60405173ffffffffffffffffffffffffffffffffffffffff80851660248301528316604482015260648101829052610e829085907f23b872dd00000000000000000000000000000000000000000000000000000000906084015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff00000000000000000000000000000000000000000000000000000000909316929092179091526117d8565b80158061159657506040517fdd62ed3e00000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff838116602483015284169063dd62ed3e90604401602060405180830381865afa158015611570573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061159491906120fa565b155b611622576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527f20746f206e6f6e2d7a65726f20616c6c6f77616e636500000000000000000000606482015260840161082f565b60405173ffffffffffffffffffffffffffffffffffffffff83166024820152604481018290526112e79084907f095ea7b30000000000000000000000000000000000000000000000000000000090606401611474565b6040805160008082526020820190925273ffffffffffffffffffffffffffffffffffffffff84169083906040516116af9190612137565b60006040518083038185875af1925050503d80600081146116ec576040519150601f19603f3d011682016040523d82523d6000602084013e6116f1565b606091505b50509050806112e7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f5472616e7366657248656c7065723a204554485f5452414e534645525f46414960448201527f4c45440000000000000000000000000000000000000000000000000000000000606482015260840161082f565b60405173ffffffffffffffffffffffffffffffffffffffff83166024820152604481018290526112e79084907fa9059cbb0000000000000000000000000000000000000000000000000000000090606401611474565b600061183a826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166118e49092919063ffffffff16565b8051909150156112e757808060200190518101906118589190612149565b6112e7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f74207375636365656400000000000000000000000000000000000000000000606482015260840161082f565b60606118f384846000856118fb565b949350505050565b60608247101561198d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c0000000000000000000000000000000000000000000000000000606482015260840161082f565b6000808673ffffffffffffffffffffffffffffffffffffffff1685876040516119b69190612137565b60006040518083038185875af1925050503d80600081146119f3576040519150601f19603f3d011682016040523d82523d6000602084013e6119f8565b606091505b5091509150611a0987838387611a14565b979650505050505050565b60608315611aaa578251600003611aa35773ffffffffffffffffffffffffffffffffffffffff85163b611aa3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161082f565b50816118f3565b6118f38383815115611abf5781518083602001fd5b806040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161082f9190612166565b73ffffffffffffffffffffffffffffffffffffffff811681146105eb57600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600082601f830112611b5557600080fd5b813567ffffffffffffffff80821115611b7057611b70611b15565b604051601f83017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908282118183101715611bb657611bb6611b15565b81604052838152866020858801011115611bcf57600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060008060608587031215611c0557600080fd5b8435611c1081611af3565b9350602085013567ffffffffffffffff80821115611c2d57600080fd5b818701915087601f830112611c4157600080fd5b813581811115611c5057600080fd5b8860208260061b8501011115611c6557600080fd5b602083019550809450506040870135915080821115611c8357600080fd5b50611c9087828801611b44565b91505092959194509250565b60008060408385031215611caf57600080fd5b50508035926020909101359150565b602080825282518282018190526000919060409081850190868401855b82811015611d23578151805173ffffffffffffffffffffffffffffffffffffffff90811686528782015116878601528501518585015260609093019290850190600101611cdb565b5091979650505050505050565b600060208284031215611d4257600080fd5b8135611d4d81611af3565b9392505050565b60008083601f840112611d6657600080fd5b50813567ffffffffffffffff811115611d7e57600080fd5b6020830191508360208260051b8501011115611d9957600080fd5b9250929050565b600080600080600080600060a0888a031215611dbb57600080fd5b8735611dc681611af3565b9650602088013567ffffffffffffffff80821115611de357600080fd5b611def8b838c01611d54565b909850965060408a01359150611e0482611af3565b90945060608901359080821115611e1a57600080fd5b611e268b838c01611d54565b909550935060808a0135915080821115611e3f57600080fd5b50611e4c8a828b01611b44565b91505092959891949750929550565b60008060408385031215611e6e57600080fd5b8235611e7981611af3565b91506020830135611e8981611af3565b809150509250929050565b60008060208385031215611ea757600080fd5b823567ffffffffffffffff811115611ebe57600080fd5b611eca85828601611d54565b90969095509350505050565b600080600060608486031215611eeb57600080fd5b8335611ef681611af3565b9250602084013567ffffffffffffffff80821115611f1357600080fd5b9085019060808288031215611f2757600080fd5b90925060408501359080821115611f3d57600080fd5b50611f4a86828701611b44565b9150509250925092565b600060208284031215611f6657600080fd5b5035919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b8082018082111561114457611144611f9c565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361200f5761200f611f9c565b5060010190565b8181038181111561114457611144611f9c565b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8183360301811261205d57600080fd5b9190910192915050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe184360301811261209c57600080fd5b83018035915067ffffffffffffffff8211156120b757600080fd5b6020019150600681901b3603821315611d9957600080fd5b80151581146105eb57600080fd5b6000602082840312156120ef57600080fd5b8135611d4d816120cf565b60006020828403121561210c57600080fd5b5051919050565b60005b8381101561212e578181015183820152602001612116565b50506000910152565b6000825161205d818460208701612113565b60006020828403121561215b57600080fd5b8151611d4d816120cf565b6020815260008251806020840152612185816040850160208701612113565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016040019291505056fea2646970667358221220e487efafaf0237e798f81ed8bdad17b8fc9cd7c218917fbd3398661e550ae50864736f6c63430008110033"
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
            let getClaimantBalanceParams = (params) => [params.claimant, params.token];
            let getClaimantBalance_call = async (params, options) => {
                let result = await this.call('getClaimantBalance', getClaimantBalanceParams(params), options);
                return new eth_contract_1.BigNumber(result);
            };
            this.getClaimantBalance = getClaimantBalance_call;
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
    Proxy._abi = Proxy_json_1.default.abi;
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
        "bytecode": "608060405234801561001057600080fd5b50612542806100206000396000f3fe6080604052600436106100cb5760003560e01c8063b60c164c11610074578063ee42d3a31161004e578063ee42d3a31461027c578063f303ad6e146102a9578063fddaea46146102c957600080fd5b8063b60c164c146101b1578063d2ef8464146101d1578063d3b7d4c31461025c57600080fd5b80637c93df2b116100a55780637c93df2b1461014257806383e40a5114610155578063b316d7141461019b57600080fd5b806301417e7b146100d7578063188ff72b146100ec5780631e83409a1461012257600080fd5b366100d257005b600080fd5b6100ea6100e5366004611f4b565b6102e9565b005b3480156100f857600080fd5b5061010c610107366004611ff8565b610493565b604051610119919061201a565b60405180910390f35b34801561012e57600080fd5b506100ea61013d36600461208c565b6105e2565b6100ea6101503660046120f5565b6105ee565b34801561016157600080fd5b5061018d6101703660046121b0565b600360209081526000928352604080842090915290825290205481565b604051908152602001610119565b3480156101a757600080fd5b5061018d60005481565b3480156101bd57600080fd5b506100ea6101cc3660046121e9565b610da9565b3480156101dd57600080fd5b506102296101ec36600461222b565b600260208190526000918252604090912080546001820154919092015473ffffffffffffffffffffffffffffffffffffffff928316929091169083565b6040805173ffffffffffffffffffffffffffffffffffffffff948516815293909216602084015290820152606001610119565b34801561026857600080fd5b5061018d6102773660046121b0565b610f91565b34801561028857600080fd5b5061018d61029736600461208c565b60016020526000908152604090205481565b3480156102b557600080fd5b506100ea6102c43660046121e9565b610fda565b3480156102d557600080fd5b506100ea6102e4366004612244565b611027565b600082815b818110156103bb5736868683818110610309576103096122c2565b90506040020190508060200135846103219190612320565b935061033f610333602083018361208c565b6000836020013561139d565b7fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef61036d602083018361208c565b6040805173ffffffffffffffffffffffffffffffffffffffff909216825260006020838101919091528401359082015260600160405180910390a150806103b381612333565b9150506102ee565b5060006103c8833461236b565b600080805260016020527fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb4980549293508592909190610408908490612320565b9091555050604080513381526020810183905290810184905260009073ffffffffffffffffffffffffffffffffffffffff8916907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a3600080855186602001848b5af180600003610488573d6000803e3d6000fd5b503d6000803e3d6000f35b60005460609060016104a58486612320565b6104af919061236b565b11156104bb5760005491505b8167ffffffffffffffff8111156104d4576104d4611e71565b60405190808252806020026020018201604052801561053d57816020015b60408051606081018252600080825260208083018290529282015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9092019101816104f25790505b5090508260005b838110156105da576000828152600260208181526040928390208351606081018552815473ffffffffffffffffffffffffffffffffffffffff908116825260018301541692810192909252909101549181019190915283518490839081106105ae576105ae6122c2565b602002602001018190525081806105c490612333565b92505080806105d290612333565b915050610544565b505092915050565b6105eb816114f2565b50565b846000805b82811015610aec573689898381811061060e5761060e6122c2565b9050602002810190610620919061237e565b905060008061063260608401846123bc565b9050905060005b8181101561072b573661064f60608601866123bc565b8381811061065f5761065f6122c2565b90506040020190508060200135846106779190612320565b93506106a0610689602083018361208c565b610696602088018861208c565b836020013561139d565b7fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef6106ce602083018361208c565b6106db602088018861208c565b6040805173ffffffffffffffffffffffffffffffffffffffff9384168152929091166020838101919091528401359082015260600160405180910390a1508061072381612333565b915050610639565b506000905081600182610741602087018761208c565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461078a9190612320565b909155506000905061079f602085018561208c565b73ffffffffffffffffffffffffffffffffffffffff16036108ac578415610827576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f6d6f7265207468616e206f6e6520455448207472616e7366657200000000000060448201526064015b60405180910390fd5b82602001353414610894576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f45544820616d6f756e74206e6f74206d61746368656400000000000000000000604482015260640161081e565b6108a282602085013561236b565b9050809450610a6c565b6108bc6060840160408501612432565b156109945760006108dd6108d3602086018661208c565b8560800135611620565b905082811015610949576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f636f6d6d697373696f6e20616d6f756e74206e6f74206d617463686564000000604482015260640161081e565b61095b6080850135602086013561236b565b915061098e338f84610970602089018961208c565b73ffffffffffffffffffffffffffffffffffffffff16929190611776565b50610a6c565b60006109b06109a6602086018661208c565b8560200135611620565b905082811015610a1c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f616d6f756e74206e6f74206d6174636865640000000000000000000000000000604482015260640161081e565b610a26838261236b565b9150610a588e6000610a3b602088018861208c565b73ffffffffffffffffffffffffffffffffffffffff169190611852565b610a6a8e83610a3b602088018861208c565b505b610a79602084018461208c565b604080513381526020810184905290810184905273ffffffffffffffffffffffffffffffffffffffff918216918f16907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a35050508080610ae490612333565b9150506105f3565b50600080845185602001848d5af180600003610b0c573d6000803e3d6000fd5b5083915060005b8281101561048857600080878784818110610b3057610b306122c2565b9050602002016020810190610b45919061208c565b73ffffffffffffffffffffffffffffffffffffffff1603610ba6576000805260016020527fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb4954610b95904761236b565b9050610ba188826119d4565b610d18565b60016000888885818110610bbc57610bbc6122c2565b9050602002016020810190610bd1919061208c565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054878784818110610c1e57610c1e6122c2565b9050602002016020810190610c33919061208c565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff91909116906370a0823190602401602060405180830381865afa158015610c9f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cc3919061244f565b610ccd919061236b565b9050610d188882898986818110610ce657610ce66122c2565b9050602002016020810190610cfb919061208c565b73ffffffffffffffffffffffffffffffffffffffff169190611ade565b868683818110610d2a57610d2a6122c2565b9050602002016020810190610d3f919061208c565b6040805173ffffffffffffffffffffffffffffffffffffffff8b8116825260208201859052928316928e16917fc2534859c9972270c16d5b4255d200f9a0385f9a6ce3add96c0427ff9fc70f93910160405180910390a35080610da181612333565b915050610b13565b8060005b81811015610f8b57600080858584818110610dca57610dca6122c2565b9050602002016020810190610ddf919061208c565b905073ffffffffffffffffffffffffffffffffffffffff8116610e45576000805260016020527fa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb4954479250610e34908361236b565b9150610e4033836119d4565b610f29565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff8216906370a0823190602401602060405180830381865afa158015610eaf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ed3919061244f565b73ffffffffffffffffffffffffffffffffffffffff8216600090815260016020526040902054909250610f06908361236b565b9150610f2973ffffffffffffffffffffffffffffffffffffffff82163384611ade565b604051828152339073ffffffffffffffffffffffffffffffffffffffff8316907f2ae72b44f59d038340fca5739135a1d51fc5ab720bb02d983e4c5ff4119ca7b89060200160405180910390a350508080610f8390612333565b915050610dad565b50505050565b73ffffffffffffffffffffffffffffffffffffffff8083166000908152600360209081526040808320938516835292815282822054825260029081905291902001545b92915050565b8060005b81811015610f8b57611015848483818110610ffb57610ffb6122c2565b9050602002016020810190611010919061208c565b6114f2565b8061101f81612333565b915050610fde565b8160008061103860608401846123bc565b9050905060005b81811015611127573661105560608601866123bc565b83818110611065576110656122c2565b905060400201905080602001358461107d9190612320565b935061109c61108f602083018361208c565b61069660208a018a61208c565b7fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef6110ca602083018361208c565b6110d760208a018a61208c565b6040805173ffffffffffffffffffffffffffffffffffffffff9384168152929091166020838101919091528401359082015260600160405180910390a1508061111f81612333565b91505061103f565b5060008260018261113b602088018861208c565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546111849190612320565b9091555061119a90506060850160408601612432565b156112545760006111bb6111b1602087018761208c565b8660800135611620565b905083811015611227576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f636f6d6d697373696f6e20616d6f756e74206e6f74206d617463686564000000604482015260640161081e565b6112396080860135602087013561236b565b915061124e33898461097060208a018a61208c565b50611313565b6000611270611266602087018761208c565b8660200135611620565b905084602001358110156112e0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f616d6f756e74206e6f74206d6174636865640000000000000000000000000000604482015260640161081e565b6112ea848261236b565b91506112ff886000610a3b602089018961208c565b6113118883610a3b602089018961208c565b505b611320602085018561208c565b604080513381526020810184905290810185905273ffffffffffffffffffffffffffffffffffffffff918216918916907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a360008086518760200160008b5af180600003610488573d6000803e3d6000fd5b73ffffffffffffffffffffffffffffffffffffffff808416600090815260036020908152604080832093861683529290529081205490036114945760008081546113e690612333565b909155506040805160608101825273ffffffffffffffffffffffffffffffffffffffff80861680835285821660208085018281528587018881526000805481526002808552898220985189549089167fffffffffffffffffffffffff0000000000000000000000000000000000000000918216178a55935160018a01805491909916941693909317909655519501949094558254918352600384528483209083529092529190912055505050565b73ffffffffffffffffffffffffffffffffffffffff80841660009081526003602090815260408083209386168352928152828220548083526002918290529282200180548492906114e6908490612320565b9091555050505b505050565b33600090815260036020908152604080832073ffffffffffffffffffffffffffffffffffffffff8581168086529184528285205480865260028086528487208551606081018752815485168152600180830154909516818901529101805482870181905290889055938752919094529184208054939492939192839261157990849061236b565b909155505073ffffffffffffffffffffffffffffffffffffffff84166115a8576115a333826119d4565b6115c9565b6115c973ffffffffffffffffffffffffffffffffffffffff85163383611ade565b6040805173ffffffffffffffffffffffffffffffffffffffff861681526020810183905233917f70eb43c4a8ae8c40502dcf22436c509c28d6ff421cf07c491be56984bd987068910160405180910390a250505050565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009073ffffffffffffffffffffffffffffffffffffffff8416906370a0823190602401602060405180830381865afa15801561168d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116b1919061244f565b90506116d573ffffffffffffffffffffffffffffffffffffffff8416333085611776565b6040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152819073ffffffffffffffffffffffffffffffffffffffff8516906370a0823190602401602060405180830381865afa158015611741573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611765919061244f565b61176f919061236b565b9392505050565b60405173ffffffffffffffffffffffffffffffffffffffff80851660248301528316604482015260648101829052610f8b9085907f23b872dd00000000000000000000000000000000000000000000000000000000906084015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152611b34565b8015806118f257506040517fdd62ed3e00000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff838116602483015284169063dd62ed3e90604401602060405180830381865afa1580156118cc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118f0919061244f565b155b61197e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527f20746f206e6f6e2d7a65726f20616c6c6f77616e636500000000000000000000606482015260840161081e565b60405173ffffffffffffffffffffffffffffffffffffffff83166024820152604481018290526114ed9084907f095ea7b300000000000000000000000000000000000000000000000000000000906064016117d0565b6040805160008082526020820190925273ffffffffffffffffffffffffffffffffffffffff8416908390604051611a0b919061248c565b60006040518083038185875af1925050503d8060008114611a48576040519150601f19603f3d011682016040523d82523d6000602084013e611a4d565b606091505b50509050806114ed576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f5472616e7366657248656c7065723a204554485f5452414e534645525f46414960448201527f4c45440000000000000000000000000000000000000000000000000000000000606482015260840161081e565b60405173ffffffffffffffffffffffffffffffffffffffff83166024820152604481018290526114ed9084907fa9059cbb00000000000000000000000000000000000000000000000000000000906064016117d0565b6000611b96826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff16611c409092919063ffffffff16565b8051909150156114ed5780806020019051810190611bb4919061249e565b6114ed576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f74207375636365656400000000000000000000000000000000000000000000606482015260840161081e565b6060611c4f8484600085611c57565b949350505050565b606082471015611ce9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c0000000000000000000000000000000000000000000000000000606482015260840161081e565b6000808673ffffffffffffffffffffffffffffffffffffffff168587604051611d12919061248c565b60006040518083038185875af1925050503d8060008114611d4f576040519150601f19603f3d011682016040523d82523d6000602084013e611d54565b606091505b5091509150611d6587838387611d70565b979650505050505050565b60608315611e06578251600003611dff5773ffffffffffffffffffffffffffffffffffffffff85163b611dff576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161081e565b5081611c4f565b611c4f8383815115611e1b5781518083602001fd5b806040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161081e91906124bb565b73ffffffffffffffffffffffffffffffffffffffff811681146105eb57600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600082601f830112611eb157600080fd5b813567ffffffffffffffff80821115611ecc57611ecc611e71565b604051601f83017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908282118183101715611f1257611f12611e71565b81604052838152866020858801011115611f2b57600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060008060608587031215611f6157600080fd5b8435611f6c81611e4f565b9350602085013567ffffffffffffffff80821115611f8957600080fd5b818701915087601f830112611f9d57600080fd5b813581811115611fac57600080fd5b8860208260061b8501011115611fc157600080fd5b602083019550809450506040870135915080821115611fdf57600080fd5b50611fec87828801611ea0565b91505092959194509250565b6000806040838503121561200b57600080fd5b50508035926020909101359150565b602080825282518282018190526000919060409081850190868401855b8281101561207f578151805173ffffffffffffffffffffffffffffffffffffffff90811686528782015116878601528501518585015260609093019290850190600101612037565b5091979650505050505050565b60006020828403121561209e57600080fd5b813561176f81611e4f565b60008083601f8401126120bb57600080fd5b50813567ffffffffffffffff8111156120d357600080fd5b6020830191508360208260051b85010111156120ee57600080fd5b9250929050565b600080600080600080600060a0888a03121561211057600080fd5b873561211b81611e4f565b9650602088013567ffffffffffffffff8082111561213857600080fd5b6121448b838c016120a9565b909850965060408a0135915061215982611e4f565b9094506060890135908082111561216f57600080fd5b61217b8b838c016120a9565b909550935060808a013591508082111561219457600080fd5b506121a18a828b01611ea0565b91505092959891949750929550565b600080604083850312156121c357600080fd5b82356121ce81611e4f565b915060208301356121de81611e4f565b809150509250929050565b600080602083850312156121fc57600080fd5b823567ffffffffffffffff81111561221357600080fd5b61221f858286016120a9565b90969095509350505050565b60006020828403121561223d57600080fd5b5035919050565b60008060006060848603121561225957600080fd5b833561226481611e4f565b9250602084013567ffffffffffffffff8082111561228157600080fd5b9085019060a0828803121561229557600080fd5b909250604085013590808211156122ab57600080fd5b506122b886828701611ea0565b9150509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b80820180821115610fd457610fd46122f1565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203612364576123646122f1565b5060010190565b81810381811115610fd457610fd46122f1565b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff618336030181126123b257600080fd5b9190910192915050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe18436030181126123f157600080fd5b83018035915067ffffffffffffffff82111561240c57600080fd5b6020019150600681901b36038213156120ee57600080fd5b80151581146105eb57600080fd5b60006020828403121561244457600080fd5b813561176f81612424565b60006020828403121561246157600080fd5b5051919050565b60005b8381101561248357818101518382015260200161246b565b50506000910152565b600082516123b2818460208701612468565b6000602082840312156124b057600080fd5b815161176f81612424565b60208152600082518060208401526124da816040850160208701612468565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016040019291505056fea26469706673582212203bf25bbfc6b82927788962f1207ef7d47cca3ba0896627a75c62176e43414bb664736f6c63430008110033"
    };
});
define("@scom/scom-commission-proxy-contract/contracts/ProxyV2.ts", ["require", "exports", "@ijstech/eth-contract", "@scom/scom-commission-proxy-contract/contracts/ProxyV2.json.ts"], function (require, exports, eth_contract_2, ProxyV2_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProxyV2 = void 0;
    class ProxyV2 extends eth_contract_2.Contract {
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
    exports.ProxyV2 = ProxyV2;
    ProxyV2._abi = ProxyV2_json_1.default.abi;
});
define("@scom/scom-commission-proxy-contract/contracts/index.ts", ["require", "exports", "@scom/scom-commission-proxy-contract/contracts/Proxy.ts", "@scom/scom-commission-proxy-contract/contracts/ProxyV2.ts"], function (require, exports, Proxy_1, ProxyV2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProxyV2 = exports.Proxy = void 0;
    Object.defineProperty(exports, "Proxy", { enumerable: true, get: function () { return Proxy_1.Proxy; } });
    Object.defineProperty(exports, "ProxyV2", { enumerable: true, get: function () { return ProxyV2_1.ProxyV2; } });
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
