export default {
"abi":[
{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"contract IERC20","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AddCommission","type":"event"},
{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"contract IERC20","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},
{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IERC20","name":"token","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Skim","type":"event"},
{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"target","type":"address"},{"indexed":true,"internalType":"contract IERC20","name":"token","type":"address"},{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TransferBack","type":"event"},
{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"target","type":"address"},{"indexed":true,"internalType":"contract IERC20","name":"token","type":"address"},{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"commissions","type":"uint256"}],"name":"TransferForward","type":"event"},
{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"internalType":"contract IERC20[]","name":"tokens","type":"address[]"}],"name":"claimMultiple","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"contract IERC20","name":"","type":"address"}],"name":"distributions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"target","type":"address"},{"components":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct ProxyWtihDistributor.Commission[]","name":"commissions","type":"tuple[]"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"ethIn","outputs":[],"stateMutability":"payable","type":"function"},
{"inputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"name":"lastBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"target","type":"address"},{"components":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"directTransfer","type":"bool"},{"components":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct ProxyWtihDistributor.Commission[]","name":"commissions","type":"tuple[]"}],"internalType":"struct ProxyWtihDistributor.TokensIn[]","name":"tokensIn","type":"tuple[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"contract IERC20[]","name":"tokensOut","type":"address[]"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"proxyCall","outputs":[],"stateMutability":"payable","type":"function"},
{"inputs":[{"internalType":"contract IERC20[]","name":"tokens","type":"address[]"}],"name":"skim","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"internalType":"address","name":"target","type":"address"},{"components":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"directTransfer","type":"bool"},{"components":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct ProxyWtihDistributor.Commission[]","name":"commissions","type":"tuple[]"}],"internalType":"struct ProxyWtihDistributor.TokensIn","name":"tokensIn","type":"tuple"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"tokenIn","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"stateMutability":"payable","type":"receive"}
],
"bytecode":"608060405234801561001057600080fd5b50612106806100206000396000f3fe60806040526004361061007f5760003560e01c8063b60c164c1161004e578063b60c164c1461011d578063c0da918d1461013d578063ee42d3a31461015d578063f303ad6e1461018a57600080fd5b806301417e7b1461008b5780631e83409a146100a0578063504ffe52146100c057806373d8690f1461010a57600080fd5b3661008657005b600080fd5b61009e610099366004611bb6565b6101aa565b005b3480156100ac57600080fd5b5061009e6100bb366004611c63565b610398565b3480156100cc57600080fd5b506100f86100db366004611c80565b600160209081526000928352604080842090915290825290205481565b60405190815260200160405180910390f35b61009e610118366004611d05565b61048a565b34801561012957600080fd5b5061009e610138366004611dc0565b610c98565b34801561014957600080fd5b5061009e610158366004611e02565b610e7f565b34801561016957600080fd5b506100f8610178366004611c63565b60006020819052908152604090205481565b34801561019657600080fd5b5061009e6101a5366004611dc0565b611260565b600082815b818110156102c057368686838181106101ca576101ca611e80565b90506040020190508060200135846101e29190611ede565b9350602081018035906001906000906101fb9085611c63565b73ffffffffffffffffffffffffffffffffffffffff168152602080820192909252604090810160009081208180529092528120805490919061023e908490611ede565b909155507fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef90506102726020830183611c63565b6040805173ffffffffffffffffffffffffffffffffffffffff909216825260006020838101919091528401359082015260600160405180910390a150806102b881611ef7565b9150506101af565b5060006102cd8334611f2f565b600080805260208190527fad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb58054929350859290919061030d908490611ede565b9091555050604080513381526020810183905290810184905260009073ffffffffffffffffffffffffffffffffffffffff8916907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a3600080855186602001848b5af18060000361038d573d6000803e3d6000fd5b503d6000803e3d6000f35b33600090815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff8516845282528083208054908490559183905282208054919283926103e5908490611f2f565b909155505073ffffffffffffffffffffffffffffffffffffffff82166104145761040f33826112a8565b610435565b61043573ffffffffffffffffffffffffffffffffffffffff831633836113b7565b6040805173ffffffffffffffffffffffffffffffffffffffff841681526020810183905233917f70eb43c4a8ae8c40502dcf22436c509c28d6ff421cf07c491be56984bd987068910160405180910390a25050565b846000805b828110156109dd57368989838181106104aa576104aa611e80565b90506020028101906104bc9190611f42565b90506000806104ce6060840184611f80565b9050905060005b8181101561063c57366104eb6060860186611f80565b838181106104fb576104fb611e80565b90506040020190508060200135846105139190611ede565b93506020810180359060019060009061052c9085611c63565b73ffffffffffffffffffffffffffffffffffffffff16815260208082019290925260400160009081209161056290890189611c63565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546105ab9190611ede565b909155507fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef90506105df6020830183611c63565b6105ec6020880188611c63565b6040805173ffffffffffffffffffffffffffffffffffffffff9384168152929091166020838101919091528401359082015260600160405180910390a1508061063481611ef7565b9150506104d5565b506000905061064f826020850135611f2f565b9050816000806106626020870187611c63565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546106ab9190611ede565b90915550600090506106c06020850185611c63565b73ffffffffffffffffffffffffffffffffffffffff16036107bd578415610748576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f6d6f7265207468616e206f6e6520455448207472616e7366657200000000000060448201526064015b60405180910390fd5b826020013534146107b5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f45544820616d6f756e74206e6f74206d61746368656400000000000000000000604482015260640161073f565b80945061095d565b6107cd6060840160408501611ff6565b1561088d5760006107ea6107e46020860186611c63565b8461148b565b905082811015610856576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f636f6d6d697373696f6e20616d6f756e74206e6f74206d617463686564000000604482015260640161073f565b610887338f846108696020890189611c63565b73ffffffffffffffffffffffffffffffffffffffff169291906115e1565b5061095d565b60006108a961089f6020860186611c63565b856020013561148b565b90508360200135811015610919576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f636f6d6d697373696f6e20616d6f756e74206e6f74206d617463686564000000604482015260640161073f565b6109498e600061092c6020880188611c63565b73ffffffffffffffffffffffffffffffffffffffff16919061163f565b61095b8e8361092c6020880188611c63565b505b61096a6020840184611c63565b604080513381526020810184905290810184905273ffffffffffffffffffffffffffffffffffffffff918216918f16907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a350505080806109d590611ef7565b91505061048f565b50600080845185602001848d5af1806000036109fd573d6000803e3d6000fd5b5083915060005b8281101561038d57600080878784818110610a2157610a21611e80565b9050602002016020810190610a369190611c63565b73ffffffffffffffffffffffffffffffffffffffff1603610a965760008080526020527fad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb554610a859047611f2f565b9050610a9188826112a8565b610c07565b600080888885818110610aab57610aab611e80565b9050602002016020810190610ac09190611c63565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054878784818110610b0d57610b0d611e80565b9050602002016020810190610b229190611c63565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff91909116906370a0823190602401602060405180830381865afa158015610b8e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bb29190612013565b610bbc9190611f2f565b9050610c078882898986818110610bd557610bd5611e80565b9050602002016020810190610bea9190611c63565b73ffffffffffffffffffffffffffffffffffffffff1691906113b7565b868683818110610c1957610c19611e80565b9050602002016020810190610c2e9190611c63565b6040805173ffffffffffffffffffffffffffffffffffffffff8b8116825260208201859052928316928e16917fc2534859c9972270c16d5b4255d200f9a0385f9a6ce3add96c0427ff9fc70f93910160405180910390a35080610c9081611ef7565b915050610a04565b8060005b81811015610e7957600080858584818110610cb957610cb9611e80565b9050602002016020810190610cce9190611c63565b905073ffffffffffffffffffffffffffffffffffffffff8116610d335760008080526020527fad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb554479250610d229083611f2f565b9150610d2e33836112a8565b610e17565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff8216906370a0823190602401602060405180830381865afa158015610d9d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dc19190612013565b73ffffffffffffffffffffffffffffffffffffffff8216600090815260208190526040902054909250610df49083611f2f565b9150610e1773ffffffffffffffffffffffffffffffffffffffff821633846113b7565b604051828152339073ffffffffffffffffffffffffffffffffffffffff8316907f2ae72b44f59d038340fca5739135a1d51fc5ab720bb02d983e4c5ff4119ca7b89060200160405180910390a350508080610e7190611ef7565b915050610c9c565b50505050565b81600080610e906060840184611f80565b9050905060005b81811015610ffe5736610ead6060860186611f80565b83818110610ebd57610ebd611e80565b9050604002019050806020013584610ed59190611ede565b935060208101803590600190600090610eee9085611c63565b73ffffffffffffffffffffffffffffffffffffffff168152602080820192909252604001600090812091610f24908b018b611c63565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610f6d9190611ede565b909155507fe3576de866d95e30a6b102b256dc468ead824ef133838792dc1813c3786414ef9050610fa16020830183611c63565b610fae60208a018a611c63565b6040805173ffffffffffffffffffffffffffffffffffffffff9384168152929091166020838101919091528401359082015260600160405180910390a15080610ff681611ef7565b915050610e97565b50600061100f836020860135611f2f565b9050826000806110226020880188611c63565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461106b9190611ede565b9091555061108190506060850160408601611ff6565b1561112357600061109e6110986020870187611c63565b8561148b565b90508381101561110a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f636f6d6d697373696f6e20616d6f756e74206e6f74206d617463686564000000604482015260640161073f565b61111d33898461086960208a018a611c63565b506111d6565b600061113f6111356020870187611c63565b866020013561148b565b905084602001358110156111af576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f636f6d6d697373696f6e20616d6f756e74206e6f74206d617463686564000000604482015260640161073f565b6111c288600061092c6020890189611c63565b6111d4888361092c6020890189611c63565b505b6111e36020850185611c63565b604080513381526020810184905290810185905273ffffffffffffffffffffffffffffffffffffffff918216918916907f0e25509c2c6fc37a8844100a9a4c5b2b038bd5daaf09d216161eb8574ad4878b9060600160405180910390a360008086518760200160008b5af18060000361038d573d6000803e3d6000fd5b8060005b81811015610e795761129684848381811061128157611281611e80565b90506020020160208101906100bb9190611c63565b806112a081611ef7565b915050611264565b6040805160008082526020820190925273ffffffffffffffffffffffffffffffffffffffff84169083906040516112df9190612050565b60006040518083038185875af1925050503d806000811461131c576040519150601f19603f3d011682016040523d82523d6000602084013e611321565b606091505b50509050806113b2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f5472616e7366657248656c7065723a204554485f5452414e534645525f46414960448201527f4c45440000000000000000000000000000000000000000000000000000000000606482015260840161073f565b505050565b60405173ffffffffffffffffffffffffffffffffffffffff83166024820152604481018290526113b29084907fa9059cbb00000000000000000000000000000000000000000000000000000000906064015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff00000000000000000000000000000000000000000000000000000000909316929092179091526117c1565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009073ffffffffffffffffffffffffffffffffffffffff8416906370a0823190602401602060405180830381865afa1580156114f8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061151c9190612013565b905061154073ffffffffffffffffffffffffffffffffffffffff84163330856115e1565b6040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152819073ffffffffffffffffffffffffffffffffffffffff8516906370a0823190602401602060405180830381865afa1580156115ac573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115d09190612013565b6115da9190611f2f565b9392505050565b60405173ffffffffffffffffffffffffffffffffffffffff80851660248301528316604482015260648101829052610e799085907f23b872dd0000000000000000000000000000000000000000000000000000000090608401611409565b8015806116df57506040517fdd62ed3e00000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff838116602483015284169063dd62ed3e90604401602060405180830381865afa1580156116b9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116dd9190612013565b155b61176b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527f20746f206e6f6e2d7a65726f20616c6c6f77616e636500000000000000000000606482015260840161073f565b60405173ffffffffffffffffffffffffffffffffffffffff83166024820152604481018290526113b29084907f095ea7b30000000000000000000000000000000000000000000000000000000090606401611409565b6000611823826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166118cd9092919063ffffffff16565b8051909150156113b257808060200190518101906118419190612062565b6113b2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f74207375636365656400000000000000000000000000000000000000000000606482015260840161073f565b60606118dc84846000856118e4565b949350505050565b606082471015611976576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c0000000000000000000000000000000000000000000000000000606482015260840161073f565b843b6119de576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161073f565b6000808673ffffffffffffffffffffffffffffffffffffffff168587604051611a079190612050565b60006040518083038185875af1925050503d8060008114611a44576040519150601f19603f3d011682016040523d82523d6000602084013e611a49565b606091505b5091509150611a59828286611a64565b979650505050505050565b60608315611a735750816115da565b825115611a835782518084602001fd5b816040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161073f919061207f565b73ffffffffffffffffffffffffffffffffffffffff81168114611ad957600080fd5b50565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600082601f830112611b1c57600080fd5b813567ffffffffffffffff80821115611b3757611b37611adc565b604051601f83017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908282118183101715611b7d57611b7d611adc565b81604052838152866020858801011115611b9657600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060008060608587031215611bcc57600080fd5b8435611bd781611ab7565b9350602085013567ffffffffffffffff80821115611bf457600080fd5b818701915087601f830112611c0857600080fd5b813581811115611c1757600080fd5b8860208260061b8501011115611c2c57600080fd5b602083019550809450506040870135915080821115611c4a57600080fd5b50611c5787828801611b0b565b91505092959194509250565b600060208284031215611c7557600080fd5b81356115da81611ab7565b60008060408385031215611c9357600080fd5b8235611c9e81611ab7565b91506020830135611cae81611ab7565b809150509250929050565b60008083601f840112611ccb57600080fd5b50813567ffffffffffffffff811115611ce357600080fd5b6020830191508360208260051b8501011115611cfe57600080fd5b9250929050565b600080600080600080600060a0888a031215611d2057600080fd5b8735611d2b81611ab7565b9650602088013567ffffffffffffffff80821115611d4857600080fd5b611d548b838c01611cb9565b909850965060408a01359150611d6982611ab7565b90945060608901359080821115611d7f57600080fd5b611d8b8b838c01611cb9565b909550935060808a0135915080821115611da457600080fd5b50611db18a828b01611b0b565b91505092959891949750929550565b60008060208385031215611dd357600080fd5b823567ffffffffffffffff811115611dea57600080fd5b611df685828601611cb9565b90969095509350505050565b600080600060608486031215611e1757600080fd5b8335611e2281611ab7565b9250602084013567ffffffffffffffff80821115611e3f57600080fd5b9085019060808288031215611e5357600080fd5b90925060408501359080821115611e6957600080fd5b50611e7686828701611b0b565b9150509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b80820180821115611ef157611ef1611eaf565b92915050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611f2857611f28611eaf565b5060010190565b81810381811115611ef157611ef1611eaf565b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81833603018112611f7657600080fd5b9190910192915050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112611fb557600080fd5b83018035915067ffffffffffffffff821115611fd057600080fd5b6020019150600681901b3603821315611cfe57600080fd5b8015158114611ad957600080fd5b60006020828403121561200857600080fd5b81356115da81611fe8565b60006020828403121561202557600080fd5b5051919050565b60005b8381101561204757818101518382015260200161202f565b50506000910152565b60008251611f7681846020870161202c565b60006020828403121561207457600080fd5b81516115da81611fe8565b602081526000825180602084015261209e81604085016020870161202c565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016040019291505056fea2646970667358221220ec0fadc55a188680d85e1d293129535865dbdf055dfe5251e248c29bb2d7398b64736f6c63430008110033"
}