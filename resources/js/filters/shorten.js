export default function shorten(value, suffix = "", prefix = "") {
    const formater = Intl.NumberFormat("vi-VN", {
        notation: "compact",
        maximumFractionDigits: 1,
    });
    let ret = "";
    if (!value) ret = "0";
    else ret = formater.format(Number(value));
    return prefix + ret + suffix;
}
