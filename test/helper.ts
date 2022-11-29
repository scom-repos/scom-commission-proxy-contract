import {Utils} from "@ijstech/eth-wallet";

export function print(o:any, indent?:string) {
    console.log(_print(o, indent), "\n");
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