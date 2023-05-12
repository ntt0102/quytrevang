import lang from "../lang";
export default function percentInterestRate(value) {
    const frequency = lang.global.t("models.contract.frequency");
    let ret = "";
    if (!value) ret = "0";
    else ret = value * 100 + "";
    return ret.replaceAll(".", ",") + " %/" + frequency;
}
