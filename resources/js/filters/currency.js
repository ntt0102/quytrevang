export default function currency(value, prefix = "") {
    let ret = "";
    if (!value) ret = "0";
    else ret = Number(value).toLocaleString();
    return prefix + ret.replaceAll(",", ".") + " ₫";
}
