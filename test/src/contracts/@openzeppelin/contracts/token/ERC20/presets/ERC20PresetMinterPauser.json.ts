export default {
"abi":[
{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},
{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},
{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},
{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},
{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},
{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},
{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},
{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},
{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"MINTER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"PAUSER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},
{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"}
],
"bytecode":"60806040523480156200001157600080fd5b5060405162002640380380620026408339810160408190526200003491620002f7565b81816005620000448382620003ef565b506006620000538282620003ef565b50506007805460ff19169055506200006d600033620000cd565b620000997f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a633620000cd565b620000c57f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a33620000cd565b5050620004bb565b620000e482826200011060201b62000b591760201c565b60008281526001602090815260409091206200010b91839062000b6362000120821b17901c565b505050565b6200011c828262000140565b5050565b600062000137836001600160a01b038416620001e0565b90505b92915050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff166200011c576000828152602081815260408083206001600160a01b03851684529091529020805460ff191660011790556200019c3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b600081815260018301602052604081205462000229575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556200013a565b5060006200013a565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200025a57600080fd5b81516001600160401b038082111562000277576200027762000232565b604051601f8301601f19908116603f01168101908282118183101715620002a257620002a262000232565b81604052838152602092508683858801011115620002bf57600080fd5b600091505b83821015620002e35785820183015181830184015290820190620002c4565b600093810190920192909252949350505050565b600080604083850312156200030b57600080fd5b82516001600160401b03808211156200032357600080fd5b620003318683870162000248565b935060208501519150808211156200034857600080fd5b50620003578582860162000248565b9150509250929050565b600181811c908216806200037657607f821691505b6020821081036200039757634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200010b57600081815260208120601f850160051c81016020861015620003c65750805b601f850160051c820191505b81811015620003e757828155600101620003d2565b505050505050565b81516001600160401b038111156200040b576200040b62000232565b62000423816200041c845462000361565b846200039d565b602080601f8311600181146200045b5760008415620004425750858301515b600019600386901b1c1916600185901b178555620003e7565b600085815260208120601f198616915b828110156200048c578886015182559484019460019091019084016200046b565b5085821015620004ab5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61217580620004cb6000396000f3fe608060405234801561001057600080fd5b50600436106101c45760003560e01c806370a08231116100f9578063a457c2d711610097578063d539139311610071578063d5391393146103fa578063d547741f14610421578063dd62ed3e14610434578063e63ab1e91461047a57600080fd5b8063a457c2d7146103c1578063a9059cbb146103d4578063ca15c873146103e757600080fd5b80639010d07c116100d35780639010d07c1461033557806391d148541461036d57806395d89b41146103b1578063a217fddf146103b957600080fd5b806370a08231146102e457806379cc67901461031a5780638456cb591461032d57600080fd5b8063313ce567116101665780633f4ba83a116101405780633f4ba83a146102ab57806340c10f19146102b357806342966c68146102c65780635c975abb146102d957600080fd5b8063313ce5671461027657806336568abe14610285578063395093511461029857600080fd5b806318160ddd116101a257806318160ddd1461021957806323b872dd1461022b578063248a9ca31461023e5780632f2ff15d1461026157600080fd5b806301ffc9a7146101c957806306fdde03146101f1578063095ea7b314610206575b600080fd5b6101dc6101d7366004611d4b565b6104a1565b60405190151581526020015b60405180910390f35b6101f96104fd565b6040516101e89190611db1565b6101dc610214366004611e2b565b61058f565b6004545b6040519081526020016101e8565b6101dc610239366004611e55565b6105a5565b61021d61024c366004611e91565b60009081526020819052604090206001015490565b61027461026f366004611eaa565b610690565b005b604051601281526020016101e8565b610274610293366004611eaa565b6106b7565b6101dc6102a6366004611e2b565b6106d9565b610274610722565b6102746102c1366004611e2b565b6107e2565b6102746102d4366004611e91565b6108a6565b60075460ff166101dc565b61021d6102f2366004611ed6565b73ffffffffffffffffffffffffffffffffffffffff1660009081526002602052604090205490565b610274610328366004611e2b565b6108b3565b610274610967565b610348610343366004611ef1565b610a25565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016101e8565b6101dc61037b366004611eaa565b60009182526020828152604080842073ffffffffffffffffffffffffffffffffffffffff93909316845291905290205460ff1690565b6101f9610a44565b61021d600081565b6101dc6103cf366004611e2b565b610a53565b6101dc6103e2366004611e2b565b610b2b565b61021d6103f5366004611e91565b610b38565b61021d7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b61027461042f366004611eaa565b610b4f565b61021d610442366004611f13565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260036020908152604080832093909416825291909152205490565b61021d7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f5a05180f0000000000000000000000000000000000000000000000000000000014806104f757506104f782610b85565b92915050565b60606005805461050c90611f3d565b80601f016020809104026020016040519081016040528092919081815260200182805461053890611f3d565b80156105855780601f1061055a57610100808354040283529160200191610585565b820191906000526020600020905b81548152906001019060200180831161056857829003601f168201915b5050505050905090565b600061059c338484610c1c565b50600192915050565b60006105b2848484610dcf565b73ffffffffffffffffffffffffffffffffffffffff8416600090815260036020908152604080832033845290915290205482811015610678576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206160448201527f6c6c6f77616e636500000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b6106858533858403610c1c565b506001949350505050565b61069a828261108e565b60008281526001602052604090206106b29082610b63565b505050565b6106c182826110b4565b60008281526001602052604090206106b29082611163565b33600081815260036020908152604080832073ffffffffffffffffffffffffffffffffffffffff87168452909152812054909161059c91859061071d908690611fbf565b610c1c565b61074c7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a3361037b565b6107d8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603960248201527f45524332305072657365744d696e7465725061757365723a206d75737420686160448201527f76652070617573657220726f6c6520746f20756e706175736500000000000000606482015260840161066f565b6107e0611185565b565b61080c7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a63361037b565b610898576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603660248201527f45524332305072657365744d696e7465725061757365723a206d75737420686160448201527f7665206d696e74657220726f6c6520746f206d696e7400000000000000000000606482015260840161066f565b6108a28282611266565b5050565b6108b03382611392565b50565b60006108bf8333610442565b905081811015610950576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f45524332303a206275726e20616d6f756e74206578636565647320616c6c6f7760448201527f616e636500000000000000000000000000000000000000000000000000000000606482015260840161066f565b61095d8333848403610c1c565b6106b28383611392565b6109917f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a3361037b565b610a1d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603760248201527f45524332305072657365744d696e7465725061757365723a206d75737420686160448201527f76652070617573657220726f6c6520746f207061757365000000000000000000606482015260840161066f565b6107e061158b565b6000828152600160205260408120610a3d908361164b565b9392505050565b60606006805461050c90611f3d565b33600090815260036020908152604080832073ffffffffffffffffffffffffffffffffffffffff8616845290915281205482811015610b14576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f000000000000000000000000000000000000000000000000000000606482015260840161066f565b610b213385858403610c1c565b5060019392505050565b600061059c338484610dcf565b60008181526001602052604081206104f790611657565b6106c18282611661565b6108a28282611687565b6000610a3d8373ffffffffffffffffffffffffffffffffffffffff8416611777565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f7965db0b0000000000000000000000000000000000000000000000000000000014806104f757507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316146104f7565b73ffffffffffffffffffffffffffffffffffffffff8316610cbe576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f7265737300000000000000000000000000000000000000000000000000000000606482015260840161066f565b73ffffffffffffffffffffffffffffffffffffffff8216610d61576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f7373000000000000000000000000000000000000000000000000000000000000606482015260840161066f565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526003602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b73ffffffffffffffffffffffffffffffffffffffff8316610e72576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f6472657373000000000000000000000000000000000000000000000000000000606482015260840161066f565b73ffffffffffffffffffffffffffffffffffffffff8216610f15576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f6573730000000000000000000000000000000000000000000000000000000000606482015260840161066f565b610f208383836117c6565b73ffffffffffffffffffffffffffffffffffffffff831660009081526002602052604090205481811015610fd6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e63650000000000000000000000000000000000000000000000000000606482015260840161066f565b73ffffffffffffffffffffffffffffffffffffffff80851660009081526002602052604080822085850390559185168152908120805484929061101a908490611fbf565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161108091815260200190565b60405180910390a350505050565b6000828152602081905260409020600101546110aa81336117d1565b6106b28383611687565b73ffffffffffffffffffffffffffffffffffffffff81163314611159576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c660000000000000000000000000000000000606482015260840161066f565b6108a282826118a1565b6000610a3d8373ffffffffffffffffffffffffffffffffffffffff8416611958565b60075460ff166111f1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f5061757361626c653a206e6f7420706175736564000000000000000000000000604482015260640161066f565b600780547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390a1565b73ffffffffffffffffffffffffffffffffffffffff82166112e3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640161066f565b6112ef600083836117c6565b80600460008282546113019190611fbf565b909155505073ffffffffffffffffffffffffffffffffffffffff82166000908152600260205260408120805483929061133b908490611fbf565b909155505060405181815273ffffffffffffffffffffffffffffffffffffffff8316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b73ffffffffffffffffffffffffffffffffffffffff8216611435576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360448201527f7300000000000000000000000000000000000000000000000000000000000000606482015260840161066f565b611441826000836117c6565b73ffffffffffffffffffffffffffffffffffffffff8216600090815260026020526040902054818110156114f7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60448201527f6365000000000000000000000000000000000000000000000000000000000000606482015260840161066f565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600260205260408120838303905560048054849290611533908490611fd2565b909155505060405182815260009073ffffffffffffffffffffffffffffffffffffffff8516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3505050565b60075460ff16156115f8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f5061757361626c653a2070617573656400000000000000000000000000000000604482015260640161066f565b600780547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25861123c3390565b6000610a3d8383611a4b565b60006104f7825490565b60008281526020819052604090206001015461167d81336117d1565b6106b283836118a1565b60008281526020818152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915290205460ff166108a25760008281526020818152604080832073ffffffffffffffffffffffffffffffffffffffff85168452909152902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660011790556117193390565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60008181526001830160205260408120546117be575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556104f7565b5060006104f7565b6106b2838383611a75565b60008281526020818152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915290205460ff166108a2576118278173ffffffffffffffffffffffffffffffffffffffff166014611b08565b611832836020611b08565b604051602001611843929190611fe5565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152908290527f08c379a000000000000000000000000000000000000000000000000000000000825261066f91600401611db1565b60008281526020818152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915290205460ff16156108a25760008281526020818152604080832073ffffffffffffffffffffffffffffffffffffffff8516808552925280832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b60008181526001830160205260408120548015611a4157600061197c600183611fd2565b855490915060009061199090600190611fd2565b90508181146119f55760008660000182815481106119b0576119b0612066565b90600052602060002001549050808760000184815481106119d3576119d3612066565b6000918252602080832090910192909255918252600188019052604090208390555b8554869080611a0657611a06612095565b6001900381819060005260206000200160009055905585600101600086815260200190815260200160002060009055600193505050506104f7565b60009150506104f7565b6000826000018281548110611a6257611a62612066565b9060005260206000200154905092915050565b60075460ff16156106b2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f45524332305061757361626c653a20746f6b656e207472616e7366657220776860448201527f696c652070617573656400000000000000000000000000000000000000000000606482015260840161066f565b60606000611b178360026120c4565b611b22906002611fbf565b67ffffffffffffffff811115611b3a57611b3a6120db565b6040519080825280601f01601f191660200182016040528015611b64576020820181803683370190505b5090507f300000000000000000000000000000000000000000000000000000000000000081600081518110611b9b57611b9b612066565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f780000000000000000000000000000000000000000000000000000000000000081600181518110611bfe57611bfe612066565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506000611c3a8460026120c4565b611c45906001611fbf565b90505b6001811115611ce2577f303132333435363738396162636465660000000000000000000000000000000085600f1660108110611c8657611c86612066565b1a60f81b828281518110611c9c57611c9c612066565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060049490941c93611cdb8161210a565b9050611c48565b508315610a3d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e74604482015260640161066f565b600060208284031215611d5d57600080fd5b81357fffffffff0000000000000000000000000000000000000000000000000000000081168114610a3d57600080fd5b60005b83811015611da8578181015183820152602001611d90565b50506000910152565b6020815260008251806020840152611dd0816040850160208701611d8d565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b803573ffffffffffffffffffffffffffffffffffffffff81168114611e2657600080fd5b919050565b60008060408385031215611e3e57600080fd5b611e4783611e02565b946020939093013593505050565b600080600060608486031215611e6a57600080fd5b611e7384611e02565b9250611e8160208501611e02565b9150604084013590509250925092565b600060208284031215611ea357600080fd5b5035919050565b60008060408385031215611ebd57600080fd5b82359150611ecd60208401611e02565b90509250929050565b600060208284031215611ee857600080fd5b610a3d82611e02565b60008060408385031215611f0457600080fd5b50508035926020909101359150565b60008060408385031215611f2657600080fd5b611f2f83611e02565b9150611ecd60208401611e02565b600181811c90821680611f5157607f821691505b602082108103611f8a577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b808201808211156104f7576104f7611f90565b818103818111156104f7576104f7611f90565b7f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081526000835161201d816017850160208801611d8d565b7f206973206d697373696e6720726f6c6520000000000000000000000000000000601791840191820152835161205a816028840160208801611d8d565b01602801949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b80820281158282048414176104f7576104f7611f90565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60008161211957612119611f90565b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff019056fea26469706673582212202bace1aa8da0038710be31eaeec7d715c84f29cfdd0511db26f90d2893c3d28b64736f6c63430008110033"
}