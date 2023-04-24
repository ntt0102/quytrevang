export default function currency(value, prefix = "", suffix = " ₫") {
    let ret = "";
    if (!value) ret = "0";
    else ret = Number(value).toLocaleString("vi-VN");
    return prefix + ret + suffix;
}
