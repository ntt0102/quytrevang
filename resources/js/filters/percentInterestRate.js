import i18n from "../plugins/i18n";
export default function percentInterestRate(value) {
    const frequency = i18n.t("models.contract.frequency");
    let ret = "";
    if (!value) ret = "0";
    else ret = value * 100 + "";
    return ret.replaceAll(".", ",") + " %/" + frequency;
}
