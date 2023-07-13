import Ganache from "ganache";
import HttpProvider from "web3-providers-http";
import {Wallet, Erc20, BigNumber, Utils, TransactionReceipt} from "@ijstech/eth-wallet";
import assert from "assert";

export function getProvider(url?: string) {
    url = url || process.env.PROVIDER_URL;
    return url ? new HttpProvider(url) : Ganache.provider({
        wallet:{totalAccounts: 20, mnemonic: "test test test test test test test test test test test junk", defaultBalance: 10000},
        logging: { quiet: true }});
}

export function toWeiInv(n: any, unit?: any) {
    // return BigNumber.from("10").pow("18").div(n.toString());
    return new BigNumber("1").shiftedBy((unit || 18)*2).idiv(new BigNumber(n).shiftedBy(unit || 18));
}

export async function expectToFail(f:Promise<TransactionReceipt>, error:string=""): Promise<void> {
    try {
        await f;
        throw new Error("Exception not thrown");
    } catch(e) {
        if ((Array.isArray(error) && error.some(f=>e.message.includes(f))) ||
            e.message.includes(error)){
            return console.log("exception thrown as expected");
        } else {
            throw e;
        }
    }
}
export function print(...o:any) {
    console.log.apply(this, o.map(e=>_print(e)));
}
function _print(o:any, indent?:string) {
    let s = "";
    indent = indent || "";
    if (!o) {
        s += o;
    } else if (o._isBigNumber) {
        s += ((o.gt("2000000000")?Utils.fromDecimals(o):o).toFixed());
    } else if (typeof o === "string") {
        s += (/^\d{9,}$/.test(o)?Utils.fromDecimals(o).toFixed():o);
    } else if (typeof o === "number") {
        s += ((<number>o>2000000000)?Utils.fromDecimals(o).toFixed():o);
    } else if (typeof o === "boolean") {
        s += o;
    } else if (Array.isArray(o)) {
        let _indent = (indent || "") + "  ";
        let s1 = o.map(e=>_print(e, _indent));
        let s2 = s1.join(", ");
        if (s2.length < 50){
            s += "[ " + s2 + " ]";
        } else {
            s += "[\n" + _indent + s1.join(",\n"+_indent) + "\n" + indent + "]";
        }
    } else if (typeof o === "object") {
        let _indent = (indent || "") + "  ";
        let s1 = Object.keys(o).map(key=>key+": "+_print(o[key], _indent));
        let s2 = s1.join(",");
        if (s2.length < 50){
            s += "{ " + s2 + " }";
        } else {
            s += "{\n" + _indent + s1.join("\n"+_indent) + "\n" + indent + "}";
        }
    } else {
        s += indent + o ;
    }
    return s;
}
export function assertEqual(a:any, b:any, include?: boolean) {
    return _assertEqual(a, b, include);
}
function _assertEqual(a:any, b:any, include?: boolean, path?:string) {
    path = path || "";

    if (!a) {
        assert.equal(a, b);
    } else if (a._isBigNumber){
        // assert(BigNumber.isBigNumber(b));
        assert.equal(a.toFixed(), new BigNumber(b).toFixed());
    } else if (Array.isArray(a)){
        assert(Array.isArray(b));
        assert.equal(a.length, b.length);
        a.forEach((e,i) => _assertEqual(e, b[i], include, `${path}[${i}]`));
    } else if (typeof a === 'object') {
        assert.equal(typeof b, 'object');
        if (!include)
            assert.deepEqual(Object.keys(a), Object.keys(b));
        for (let key in b) {
            _assertEqual(a[key], b[key], include, `${path}.${key}`);
        }
    } else {
        assert.equal(a, b);
    }
}