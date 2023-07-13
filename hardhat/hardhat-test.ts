import {JsonRpcServer} from "hardhat/internal/hardhat-network/jsonrpc/server"
import * as hardhat from "hardhat";

// wrap the internal provider with public accessable endpoints
describe('Hardhat',()=>{
    before('Starting Hardhat server', async ()=>{
        const server = new JsonRpcServer({
            hostname: "0.0.0.0",
            port: 8545,
            provider: hardhat.network.provider
        });
        await server.listen();
    });
    it('Hardhat server started',()=>{});
});

import "../test/proxyV3.test";
