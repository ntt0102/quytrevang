import Vue from "vue";
import i18n from "../plugins/i18n";
export default function formatDate(value, isFull = false) {
    let ret = "";
    if (!value) ret = "";
    else {
        let momentDate = moment(String(value));
        if (momentDate.isValid())
            ret = momentDate.format(
                isFull
                    ? i18n.t("titles.dateFullFormat")
                    : Vue.prototype.$mc.DATE_FORMAT
            );
        else ret = value;
    }
    return ret;
}
