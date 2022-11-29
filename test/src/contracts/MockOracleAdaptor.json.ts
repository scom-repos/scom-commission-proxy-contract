export default {
"abi":[
{"inputs":[{"internalType":"address","name":"_weth","type":"address"},{"internalType":"uint8","name":"_decimals","type":"uint8"},{"internalType":"address[]","name":"_tokens","type":"address[]"},{"internalType":"uint256[]","name":"_prices","type":"uint256[]"}],"stateMutability":"nonpayable","type":"constructor"},
{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"getLatestPrice","outputs":[{"internalType":"uint256","name":"price","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"getRatio","outputs":[{"internalType":"uint256","name":"numerator","type":"uint256"},{"internalType":"uint256","name":"denominator","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"}],"name":"isSupported","outputs":[{"internalType":"bool","name":"supported","type":"bool"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"price","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"uint256","name":"price0","type":"uint256"},{"internalType":"uint256","name":"price1","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[],"name":"weth","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}
],
"bytecode":"60c06040523480156200001157600080fd5b5060405162000f3738038062000f37833981016040819052620000349162000516565b80518251146200007d5760405162461bcd60e51b815260206004820152601060248201526f0d8cadccee8d040dcdee840dac2e8c6d60831b604482015260640160405180910390fd5b6001600160a01b03841660a05260ff83166080819052600090620000a390600a62000728565b835190915060005b818110156200040a576040518060400160405280848152602001858381518110620000da57620000da6200073d565b6020026020010151815250600080878481518110620000fd57620000fd6200073d565b60200260200101516001600160a01b03166001600160a01b031681526020019081526020016000206000896001600160a01b03166001600160a01b03168152602001908152602001600020600082015181600001556020820151816001015590505060405180604001604052808583815181106200017f576200017f6200073d565b6020026020010151815260200184815250600080896001600160a01b03166001600160a01b031681526020019081526020016000206000878481518110620001cb57620001cb6200073d565b60200260200101516001600160a01b03166001600160a01b03168152602001908152602001600020600082015181600001556020820151816001015590505060008160016200021b919062000753565b90505b82811015620003f45760405180604001604052808683815181106200024757620002476200073d565b602002602001015181526020018684815181106200026957620002696200073d565b60200260200101518152506000808885815181106200028c576200028c6200073d565b60200260200101516001600160a01b03166001600160a01b031681526020019081526020016000206000888481518110620002cb57620002cb6200073d565b60200260200101516001600160a01b03166001600160a01b03168152602001908152602001600020600082015181600001556020820151816001015590505060405180604001604052808684815181106200032a576200032a6200073d565b602002602001015181526020018683815181106200034c576200034c6200073d565b60200260200101518152506000808884815181106200036f576200036f6200073d565b60200260200101516001600160a01b03166001600160a01b031681526020019081526020016000206000888581518110620003ae57620003ae6200073d565b6020908102919091018101516001600160a01b03168252818101929092526040016000208251815591015160019091015580620003eb8162000769565b9150506200021e565b5080620004018162000769565b915050620000ab565b5050505050505062000785565b80516001600160a01b03811681146200042f57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b038111828210171562000475576200047562000434565b604052919050565b60006001600160401b0382111562000499576200049962000434565b5060051b60200190565b600082601f830112620004b557600080fd5b81516020620004ce620004c8836200047d565b6200044a565b82815260059290921b84018101918181019086841115620004ee57600080fd5b8286015b848110156200050b5780518352918301918301620004f2565b509695505050505050565b600080600080608085870312156200052d57600080fd5b620005388562000417565b935060208086015160ff811681146200055057600080fd5b60408701519094506001600160401b03808211156200056e57600080fd5b818801915088601f8301126200058357600080fd5b815162000594620004c8826200047d565b81815260059190911b8301840190848101908b831115620005b457600080fd5b938501935b82851015620005dd57620005cd8562000417565b82529385019390850190620005b9565b60608b01519097509450505080831115620005f757600080fd5b50506200060787828801620004a3565b91505092959194509250565b634e487b7160e01b600052601160045260246000fd5b600181815b808511156200066a5781600019048211156200064e576200064e62000613565b808516156200065c57918102915b93841c93908002906200062e565b509250929050565b600082620006835750600162000722565b81620006925750600062000722565b8160018114620006ab5760028114620006b657620006d6565b600191505062000722565b60ff841115620006ca57620006ca62000613565b50506001821b62000722565b5060208310610133831016604e8410600b8410161715620006fb575081810a62000722565b62000707838362000629565b80600019048211156200071e576200071e62000613565b0290505b92915050565b600062000736838362000672565b9392505050565b634e487b7160e01b600052603260045260246000fd5b8082018082111562000722576200072262000613565b6000600182016200077e576200077e62000613565b5060010190565b60805160a051610780620007b76000396000818160d901526102bd015260008181609b015261025d01526107806000f3fe608060405234801561001057600080fd5b506004361061007c5760003560e01c8063495e43481161005b578063495e43481461012057806388462c8d14610141578063a405d31214610164578063d9da4fe6146101ef57600080fd5b8062e4768b14610081578063313ce567146100965780633fc8cef3146100d4575b600080fd5b61009461008f3660046103ec565b610254565b005b6100bd7f000000000000000000000000000000000000000000000000000000000000000081565b60405160ff90911681526020015b60405180910390f35b6100fb7f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100cb565b61013361012e36600461045f565b610323565b6040519081526020016100cb565b61015461014f3660046104c0565b610370565b60405190151581526020016100cb565b6100946101723660046104f3565b604080518082018252838152602080820184815273ffffffffffffffffffffffffffffffffffffffff978816600081815280845285812098909916808a5297835284892093518455905160019384015583518085018552948552848201958652958752868152828720958752949094529093209251835551910155565b61023f6101fd366004610535565b50505073ffffffffffffffffffffffffffffffffffffffff92831660009081526020818152604080832094909516825292909252502080546001909101549091565b604080519283526020830191909152016100cb565b600061028460ff7f000000000000000000000000000000000000000000000000000000000000000016600a6106fc565b604080518082018252848152602080820184815273ffffffffffffffffffffffffffffffffffffffff97881660008181528084528581207f0000000000000000000000000000000000000000000000000000000000000000909a16808252998452858120945185559151600194850155845180860186529586528583019788529781528082528381209781529690529420905181559151919092015550565b73ffffffffffffffffffffffffffffffffffffffff808516600090815260208181526040808320938716835292905290812060018101548154610366919061070f565b9695505050505050565b73ffffffffffffffffffffffffffffffffffffffff80831660009081526020818152604080832093851683529290529081206001810154158015906103b9575060008160010154115b9150505b92915050565b803573ffffffffffffffffffffffffffffffffffffffff811681146103e757600080fd5b919050565b600080604083850312156103ff57600080fd5b610408836103c3565b946020939093013593505050565b60008083601f84011261042857600080fd5b50813567ffffffffffffffff81111561044057600080fd5b60208301915083602082850101111561045857600080fd5b9250929050565b6000806000806060858703121561047557600080fd5b61047e856103c3565b935061048c602086016103c3565b9250604085013567ffffffffffffffff8111156104a857600080fd5b6104b487828801610416565b95989497509550505050565b600080604083850312156104d357600080fd5b6104dc836103c3565b91506104ea602084016103c3565b90509250929050565b6000806000806080858703121561050957600080fd5b610512856103c3565b9350610520602086016103c3565b93969395505050506040820135916060013590565b60008060008060008060a0878903121561054e57600080fd5b610557876103c3565b9550610565602088016103c3565b94506040870135935060608701359250608087013567ffffffffffffffff81111561058f57600080fd5b61059b89828a01610416565b979a9699509497509295939492505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600181815b8085111561063557817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0482111561061b5761061b6105ad565b8085161561062857918102915b93841c93908002906105e1565b509250929050565b60008261064c575060016103bd565b81610659575060006103bd565b816001811461066f576002811461067957610695565b60019150506103bd565b60ff84111561068a5761068a6105ad565b50506001821b6103bd565b5060208310610133831016604e8410600b84101617156106b8575081810a6103bd565b6106c283836105dc565b807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048211156106f4576106f46105ad565b029392505050565b6000610708838361063d565b9392505050565b600082610745577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b50049056fea26469706673582212208619e7fe5945970801237f26e284028f5a144bdb8fb4fa75e338119f51b4ff0b64736f6c63430008110033"
}