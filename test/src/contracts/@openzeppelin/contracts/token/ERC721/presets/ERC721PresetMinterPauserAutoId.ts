import {IWallet, Contract as _Contract, Transaction, TransactionReceipt, BigNumber, Event, IBatchRequestObj, TransactionOptions} from "@ijstech/eth-contract";
import Bin from "./ERC721PresetMinterPauserAutoId.json";

export interface IDeployParams {name:string;symbol:string;baseTokenURI:string}
export interface IApproveParams {to:string;tokenId:number|BigNumber}
export interface IGetRoleMemberParams {role:string;index:number|BigNumber}
export interface IGrantRoleParams {role:string;account:string}
export interface IHasRoleParams {role:string;account:string}
export interface IIsApprovedForAllParams {owner:string;operator:string}
export interface IRenounceRoleParams {role:string;account:string}
export interface IRevokeRoleParams {role:string;account:string}
export interface ISafeTransferFromParams {from:string;to:string;tokenId:number|BigNumber}
export interface ISafeTransferFrom_1Params {from:string;to:string;tokenId:number|BigNumber;data:string}
export interface ISetApprovalForAllParams {operator:string;approved:boolean}
export interface ITokenOfOwnerByIndexParams {owner:string;index:number|BigNumber}
export interface ITransferFromParams {from:string;to:string;tokenId:number|BigNumber}
export class ERC721PresetMinterPauserAutoId extends _Contract{
    constructor(wallet: IWallet, address?: string){
        super(wallet, address, Bin.abi, Bin.bytecode);
        this.assign()
    }
    deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>{
        return this.__deploy([params.name,params.symbol,params.baseTokenURI], options);
    }
    parseApprovalEvent(receipt: TransactionReceipt): ERC721PresetMinterPauserAutoId.ApprovalEvent[]{
        return this.parseEvents(receipt, "Approval").map(e=>this.decodeApprovalEvent(e));
    }
    decodeApprovalEvent(event: Event): ERC721PresetMinterPauserAutoId.ApprovalEvent{
        let result = event.data;
        return {
            owner: result.owner,
            approved: result.approved,
            tokenId: new BigNumber(result.tokenId),
            _event: event
        };
    }
    parseApprovalForAllEvent(receipt: TransactionReceipt): ERC721PresetMinterPauserAutoId.ApprovalForAllEvent[]{
        return this.parseEvents(receipt, "ApprovalForAll").map(e=>this.decodeApprovalForAllEvent(e));
    }
    decodeApprovalForAllEvent(event: Event): ERC721PresetMinterPauserAutoId.ApprovalForAllEvent{
        let result = event.data;
        return {
            owner: result.owner,
            operator: result.operator,
            approved: result.approved,
            _event: event
        };
    }
    parsePausedEvent(receipt: TransactionReceipt): ERC721PresetMinterPauserAutoId.PausedEvent[]{
        return this.parseEvents(receipt, "Paused").map(e=>this.decodePausedEvent(e));
    }
    decodePausedEvent(event: Event): ERC721PresetMinterPauserAutoId.PausedEvent{
        let result = event.data;
        return {
            account: result.account,
            _event: event
        };
    }
    parseRoleAdminChangedEvent(receipt: TransactionReceipt): ERC721PresetMinterPauserAutoId.RoleAdminChangedEvent[]{
        return this.parseEvents(receipt, "RoleAdminChanged").map(e=>this.decodeRoleAdminChangedEvent(e));
    }
    decodeRoleAdminChangedEvent(event: Event): ERC721PresetMinterPauserAutoId.RoleAdminChangedEvent{
        let result = event.data;
        return {
            role: result.role,
            previousAdminRole: result.previousAdminRole,
            newAdminRole: result.newAdminRole,
            _event: event
        };
    }
    parseRoleGrantedEvent(receipt: TransactionReceipt): ERC721PresetMinterPauserAutoId.RoleGrantedEvent[]{
        return this.parseEvents(receipt, "RoleGranted").map(e=>this.decodeRoleGrantedEvent(e));
    }
    decodeRoleGrantedEvent(event: Event): ERC721PresetMinterPauserAutoId.RoleGrantedEvent{
        let result = event.data;
        return {
            role: result.role,
            account: result.account,
            sender: result.sender,
            _event: event
        };
    }
    parseRoleRevokedEvent(receipt: TransactionReceipt): ERC721PresetMinterPauserAutoId.RoleRevokedEvent[]{
        return this.parseEvents(receipt, "RoleRevoked").map(e=>this.decodeRoleRevokedEvent(e));
    }
    decodeRoleRevokedEvent(event: Event): ERC721PresetMinterPauserAutoId.RoleRevokedEvent{
        let result = event.data;
        return {
            role: result.role,
            account: result.account,
            sender: result.sender,
            _event: event
        };
    }
    parseTransferEvent(receipt: TransactionReceipt): ERC721PresetMinterPauserAutoId.TransferEvent[]{
        return this.parseEvents(receipt, "Transfer").map(e=>this.decodeTransferEvent(e));
    }
    decodeTransferEvent(event: Event): ERC721PresetMinterPauserAutoId.TransferEvent{
        let result = event.data;
        return {
            from: result.from,
            to: result.to,
            tokenId: new BigNumber(result.tokenId),
            _event: event
        };
    }
    parseUnpausedEvent(receipt: TransactionReceipt): ERC721PresetMinterPauserAutoId.UnpausedEvent[]{
        return this.parseEvents(receipt, "Unpaused").map(e=>this.decodeUnpausedEvent(e));
    }
    decodeUnpausedEvent(event: Event): ERC721PresetMinterPauserAutoId.UnpausedEvent{
        let result = event.data;
        return {
            account: result.account,
            _event: event
        };
    }
    DEFAULT_ADMIN_ROLE: {
        (options?: TransactionOptions): Promise<string>;
    }
    MINTER_ROLE: {
        (options?: TransactionOptions): Promise<string>;
    }
    PAUSER_ROLE: {
        (options?: TransactionOptions): Promise<string>;
    }
    approve: {
        (params: IApproveParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IApproveParams, options?: TransactionOptions) => Promise<void>;
        txData: (params: IApproveParams, options?: TransactionOptions) => Promise<string>;
    }
    balanceOf: {
        (owner:string, options?: TransactionOptions): Promise<BigNumber>;
    }
    burn: {
        (tokenId:number|BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (tokenId:number|BigNumber, options?: TransactionOptions) => Promise<void>;
        txData: (tokenId:number|BigNumber, options?: TransactionOptions) => Promise<string>;
    }
    getApproved: {
        (tokenId:number|BigNumber, options?: TransactionOptions): Promise<string>;
    }
    getRoleAdmin: {
        (role:string, options?: TransactionOptions): Promise<string>;
    }
    getRoleMember: {
        (params: IGetRoleMemberParams, options?: TransactionOptions): Promise<string>;
    }
    getRoleMemberCount: {
        (role:string, options?: TransactionOptions): Promise<BigNumber>;
    }
    grantRole: {
        (params: IGrantRoleParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IGrantRoleParams, options?: TransactionOptions) => Promise<void>;
        txData: (params: IGrantRoleParams, options?: TransactionOptions) => Promise<string>;
    }
    hasRole: {
        (params: IHasRoleParams, options?: TransactionOptions): Promise<boolean>;
    }
    isApprovedForAll: {
        (params: IIsApprovedForAllParams, options?: TransactionOptions): Promise<boolean>;
    }
    mint: {
        (to:string, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (to:string, options?: TransactionOptions) => Promise<void>;
        txData: (to:string, options?: TransactionOptions) => Promise<string>;
    }
    name: {
        (options?: TransactionOptions): Promise<string>;
    }
    ownerOf: {
        (tokenId:number|BigNumber, options?: TransactionOptions): Promise<string>;
    }
    pause: {
        (options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (options?: TransactionOptions) => Promise<void>;
        txData: (options?: TransactionOptions) => Promise<string>;
    }
    paused: {
        (options?: TransactionOptions): Promise<boolean>;
    }
    renounceRole: {
        (params: IRenounceRoleParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IRenounceRoleParams, options?: TransactionOptions) => Promise<void>;
        txData: (params: IRenounceRoleParams, options?: TransactionOptions) => Promise<string>;
    }
    revokeRole: {
        (params: IRevokeRoleParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: IRevokeRoleParams, options?: TransactionOptions) => Promise<void>;
        txData: (params: IRevokeRoleParams, options?: TransactionOptions) => Promise<string>;
    }
    safeTransferFrom: {
        (params: ISafeTransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISafeTransferFromParams, options?: TransactionOptions) => Promise<void>;
        txData: (params: ISafeTransferFromParams, options?: TransactionOptions) => Promise<string>;
    }
    safeTransferFrom_1: {
        (params: ISafeTransferFrom_1Params, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISafeTransferFrom_1Params, options?: TransactionOptions) => Promise<void>;
        txData: (params: ISafeTransferFrom_1Params, options?: TransactionOptions) => Promise<string>;
    }
    setApprovalForAll: {
        (params: ISetApprovalForAllParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ISetApprovalForAllParams, options?: TransactionOptions) => Promise<void>;
        txData: (params: ISetApprovalForAllParams, options?: TransactionOptions) => Promise<string>;
    }
    supportsInterface: {
        (interfaceId:string, options?: TransactionOptions): Promise<boolean>;
    }
    symbol: {
        (options?: TransactionOptions): Promise<string>;
    }
    tokenByIndex: {
        (index:number|BigNumber, options?: TransactionOptions): Promise<BigNumber>;
    }
    tokenOfOwnerByIndex: {
        (params: ITokenOfOwnerByIndexParams, options?: TransactionOptions): Promise<BigNumber>;
    }
    tokenURI: {
        (tokenId:number|BigNumber, options?: TransactionOptions): Promise<string>;
    }
    totalSupply: {
        (options?: TransactionOptions): Promise<BigNumber>;
    }
    transferFrom: {
        (params: ITransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (params: ITransferFromParams, options?: TransactionOptions) => Promise<void>;
        txData: (params: ITransferFromParams, options?: TransactionOptions) => Promise<string>;
    }
    unpause: {
        (options?: TransactionOptions): Promise<TransactionReceipt>;
        call: (options?: TransactionOptions) => Promise<void>;
        txData: (options?: TransactionOptions) => Promise<string>;
    }
    private assign(){
        let DEFAULT_ADMIN_ROLE_call = async (options?: TransactionOptions): Promise<string> => {
            let result = await this.call('DEFAULT_ADMIN_ROLE',[],options);
            return result;
        }
        this.DEFAULT_ADMIN_ROLE = DEFAULT_ADMIN_ROLE_call
        let MINTER_ROLE_call = async (options?: TransactionOptions): Promise<string> => {
            let result = await this.call('MINTER_ROLE',[],options);
            return result;
        }
        this.MINTER_ROLE = MINTER_ROLE_call
        let PAUSER_ROLE_call = async (options?: TransactionOptions): Promise<string> => {
            let result = await this.call('PAUSER_ROLE',[],options);
            return result;
        }
        this.PAUSER_ROLE = PAUSER_ROLE_call
        let balanceOf_call = async (owner:string, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('balanceOf',[owner],options);
            return new BigNumber(result);
        }
        this.balanceOf = balanceOf_call
        let getApproved_call = async (tokenId:number|BigNumber, options?: TransactionOptions): Promise<string> => {
            let result = await this.call('getApproved',[this.wallet.utils.toString(tokenId)],options);
            return result;
        }
        this.getApproved = getApproved_call
        let getRoleAdmin_call = async (role:string, options?: TransactionOptions): Promise<string> => {
            let result = await this.call('getRoleAdmin',[this.wallet.utils.stringToBytes32(role)],options);
            return result;
        }
        this.getRoleAdmin = getRoleAdmin_call
        let getRoleMemberParams = (params: IGetRoleMemberParams) => [this.wallet.utils.stringToBytes32(params.role),this.wallet.utils.toString(params.index)];
        let getRoleMember_call = async (params: IGetRoleMemberParams, options?: TransactionOptions): Promise<string> => {
            let result = await this.call('getRoleMember',getRoleMemberParams(params),options);
            return result;
        }
        this.getRoleMember = getRoleMember_call
        let getRoleMemberCount_call = async (role:string, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('getRoleMemberCount',[this.wallet.utils.stringToBytes32(role)],options);
            return new BigNumber(result);
        }
        this.getRoleMemberCount = getRoleMemberCount_call
        let hasRoleParams = (params: IHasRoleParams) => [this.wallet.utils.stringToBytes32(params.role),params.account];
        let hasRole_call = async (params: IHasRoleParams, options?: TransactionOptions): Promise<boolean> => {
            let result = await this.call('hasRole',hasRoleParams(params),options);
            return result;
        }
        this.hasRole = hasRole_call
        let isApprovedForAllParams = (params: IIsApprovedForAllParams) => [params.owner,params.operator];
        let isApprovedForAll_call = async (params: IIsApprovedForAllParams, options?: TransactionOptions): Promise<boolean> => {
            let result = await this.call('isApprovedForAll',isApprovedForAllParams(params),options);
            return result;
        }
        this.isApprovedForAll = isApprovedForAll_call
        let name_call = async (options?: TransactionOptions): Promise<string> => {
            let result = await this.call('name',[],options);
            return result;
        }
        this.name = name_call
        let ownerOf_call = async (tokenId:number|BigNumber, options?: TransactionOptions): Promise<string> => {
            let result = await this.call('ownerOf',[this.wallet.utils.toString(tokenId)],options);
            return result;
        }
        this.ownerOf = ownerOf_call
        let paused_call = async (options?: TransactionOptions): Promise<boolean> => {
            let result = await this.call('paused',[],options);
            return result;
        }
        this.paused = paused_call
        let supportsInterface_call = async (interfaceId:string, options?: TransactionOptions): Promise<boolean> => {
            let result = await this.call('supportsInterface',[interfaceId],options);
            return result;
        }
        this.supportsInterface = supportsInterface_call
        let symbol_call = async (options?: TransactionOptions): Promise<string> => {
            let result = await this.call('symbol',[],options);
            return result;
        }
        this.symbol = symbol_call
        let tokenByIndex_call = async (index:number|BigNumber, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('tokenByIndex',[this.wallet.utils.toString(index)],options);
            return new BigNumber(result);
        }
        this.tokenByIndex = tokenByIndex_call
        let tokenOfOwnerByIndexParams = (params: ITokenOfOwnerByIndexParams) => [params.owner,this.wallet.utils.toString(params.index)];
        let tokenOfOwnerByIndex_call = async (params: ITokenOfOwnerByIndexParams, options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('tokenOfOwnerByIndex',tokenOfOwnerByIndexParams(params),options);
            return new BigNumber(result);
        }
        this.tokenOfOwnerByIndex = tokenOfOwnerByIndex_call
        let tokenURI_call = async (tokenId:number|BigNumber, options?: TransactionOptions): Promise<string> => {
            let result = await this.call('tokenURI',[this.wallet.utils.toString(tokenId)],options);
            return result;
        }
        this.tokenURI = tokenURI_call
        let totalSupply_call = async (options?: TransactionOptions): Promise<BigNumber> => {
            let result = await this.call('totalSupply',[],options);
            return new BigNumber(result);
        }
        this.totalSupply = totalSupply_call
        let approveParams = (params: IApproveParams) => [params.to,this.wallet.utils.toString(params.tokenId)];
        let approve_send = async (params: IApproveParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('approve',approveParams(params),options);
            return result;
        }
        let approve_call = async (params: IApproveParams, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('approve',approveParams(params),options);
            return;
        }
        let approve_txData = async (params: IApproveParams, options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('approve',approveParams(params),options);
            return result;
        }
        this.approve = Object.assign(approve_send, {
            call:approve_call
            , txData:approve_txData
        });
        let burn_send = async (tokenId:number|BigNumber, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('burn',[this.wallet.utils.toString(tokenId)],options);
            return result;
        }
        let burn_call = async (tokenId:number|BigNumber, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('burn',[this.wallet.utils.toString(tokenId)],options);
            return;
        }
        let burn_txData = async (tokenId:number|BigNumber, options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('burn',[this.wallet.utils.toString(tokenId)],options);
            return result;
        }
        this.burn = Object.assign(burn_send, {
            call:burn_call
            , txData:burn_txData
        });
        let grantRoleParams = (params: IGrantRoleParams) => [this.wallet.utils.stringToBytes32(params.role),params.account];
        let grantRole_send = async (params: IGrantRoleParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('grantRole',grantRoleParams(params),options);
            return result;
        }
        let grantRole_call = async (params: IGrantRoleParams, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('grantRole',grantRoleParams(params),options);
            return;
        }
        let grantRole_txData = async (params: IGrantRoleParams, options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('grantRole',grantRoleParams(params),options);
            return result;
        }
        this.grantRole = Object.assign(grantRole_send, {
            call:grantRole_call
            , txData:grantRole_txData
        });
        let mint_send = async (to:string, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('mint',[to],options);
            return result;
        }
        let mint_call = async (to:string, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('mint',[to],options);
            return;
        }
        let mint_txData = async (to:string, options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('mint',[to],options);
            return result;
        }
        this.mint = Object.assign(mint_send, {
            call:mint_call
            , txData:mint_txData
        });
        let pause_send = async (options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('pause',[],options);
            return result;
        }
        let pause_call = async (options?: TransactionOptions): Promise<void> => {
            let result = await this.call('pause',[],options);
            return;
        }
        let pause_txData = async (options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('pause',[],options);
            return result;
        }
        this.pause = Object.assign(pause_send, {
            call:pause_call
            , txData:pause_txData
        });
        let renounceRoleParams = (params: IRenounceRoleParams) => [this.wallet.utils.stringToBytes32(params.role),params.account];
        let renounceRole_send = async (params: IRenounceRoleParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('renounceRole',renounceRoleParams(params),options);
            return result;
        }
        let renounceRole_call = async (params: IRenounceRoleParams, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('renounceRole',renounceRoleParams(params),options);
            return;
        }
        let renounceRole_txData = async (params: IRenounceRoleParams, options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('renounceRole',renounceRoleParams(params),options);
            return result;
        }
        this.renounceRole = Object.assign(renounceRole_send, {
            call:renounceRole_call
            , txData:renounceRole_txData
        });
        let revokeRoleParams = (params: IRevokeRoleParams) => [this.wallet.utils.stringToBytes32(params.role),params.account];
        let revokeRole_send = async (params: IRevokeRoleParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('revokeRole',revokeRoleParams(params),options);
            return result;
        }
        let revokeRole_call = async (params: IRevokeRoleParams, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('revokeRole',revokeRoleParams(params),options);
            return;
        }
        let revokeRole_txData = async (params: IRevokeRoleParams, options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('revokeRole',revokeRoleParams(params),options);
            return result;
        }
        this.revokeRole = Object.assign(revokeRole_send, {
            call:revokeRole_call
            , txData:revokeRole_txData
        });
        let safeTransferFromParams = (params: ISafeTransferFromParams) => [params.from,params.to,this.wallet.utils.toString(params.tokenId)];
        let safeTransferFrom_send = async (params: ISafeTransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('safeTransferFrom',safeTransferFromParams(params),options);
            return result;
        }
        let safeTransferFrom_call = async (params: ISafeTransferFromParams, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('safeTransferFrom',safeTransferFromParams(params),options);
            return;
        }
        let safeTransferFrom_txData = async (params: ISafeTransferFromParams, options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('safeTransferFrom',safeTransferFromParams(params),options);
            return result;
        }
        this.safeTransferFrom = Object.assign(safeTransferFrom_send, {
            call:safeTransferFrom_call
            , txData:safeTransferFrom_txData
        });
        let safeTransferFrom_1Params = (params: ISafeTransferFrom_1Params) => [params.from,params.to,this.wallet.utils.toString(params.tokenId),this.wallet.utils.stringToBytes(params.data)];
        let safeTransferFrom_1_send = async (params: ISafeTransferFrom_1Params, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('safeTransferFrom',safeTransferFrom_1Params(params),options);
            return result;
        }
        let safeTransferFrom_1_call = async (params: ISafeTransferFrom_1Params, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('safeTransferFrom',safeTransferFrom_1Params(params),options);
            return;
        }
        let safeTransferFrom_1_txData = async (params: ISafeTransferFrom_1Params, options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('safeTransferFrom',safeTransferFrom_1Params(params),options);
            return result;
        }
        this.safeTransferFrom_1 = Object.assign(safeTransferFrom_1_send, {
            call:safeTransferFrom_1_call
            , txData:safeTransferFrom_1_txData
        });
        let setApprovalForAllParams = (params: ISetApprovalForAllParams) => [params.operator,params.approved];
        let setApprovalForAll_send = async (params: ISetApprovalForAllParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('setApprovalForAll',setApprovalForAllParams(params),options);
            return result;
        }
        let setApprovalForAll_call = async (params: ISetApprovalForAllParams, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('setApprovalForAll',setApprovalForAllParams(params),options);
            return;
        }
        let setApprovalForAll_txData = async (params: ISetApprovalForAllParams, options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('setApprovalForAll',setApprovalForAllParams(params),options);
            return result;
        }
        this.setApprovalForAll = Object.assign(setApprovalForAll_send, {
            call:setApprovalForAll_call
            , txData:setApprovalForAll_txData
        });
        let transferFromParams = (params: ITransferFromParams) => [params.from,params.to,this.wallet.utils.toString(params.tokenId)];
        let transferFrom_send = async (params: ITransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('transferFrom',transferFromParams(params),options);
            return result;
        }
        let transferFrom_call = async (params: ITransferFromParams, options?: TransactionOptions): Promise<void> => {
            let result = await this.call('transferFrom',transferFromParams(params),options);
            return;
        }
        let transferFrom_txData = async (params: ITransferFromParams, options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('transferFrom',transferFromParams(params),options);
            return result;
        }
        this.transferFrom = Object.assign(transferFrom_send, {
            call:transferFrom_call
            , txData:transferFrom_txData
        });
        let unpause_send = async (options?: TransactionOptions): Promise<TransactionReceipt> => {
            let result = await this.send('unpause',[],options);
            return result;
        }
        let unpause_call = async (options?: TransactionOptions): Promise<void> => {
            let result = await this.call('unpause',[],options);
            return;
        }
        let unpause_txData = async (options?: TransactionOptions): Promise<string> => {
            let result = await this.txData('unpause',[],options);
            return result;
        }
        this.unpause = Object.assign(unpause_send, {
            call:unpause_call
            , txData:unpause_txData
        });
    }
}
export module ERC721PresetMinterPauserAutoId{
    export interface ApprovalEvent {owner:string,approved:string,tokenId:BigNumber,_event:Event}
    export interface ApprovalForAllEvent {owner:string,operator:string,approved:boolean,_event:Event}
    export interface PausedEvent {account:string,_event:Event}
    export interface RoleAdminChangedEvent {role:string,previousAdminRole:string,newAdminRole:string,_event:Event}
    export interface RoleGrantedEvent {role:string,account:string,sender:string,_event:Event}
    export interface RoleRevokedEvent {role:string,account:string,sender:string,_event:Event}
    export interface TransferEvent {from:string,to:string,tokenId:BigNumber,_event:Event}
    export interface UnpausedEvent {account:string,_event:Event}
}