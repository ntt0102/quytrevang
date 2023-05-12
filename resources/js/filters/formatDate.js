import constants from "../properties/constants";
import lang from "../lang";
export default function formatDate(value, isFull = false) {
    let ret = "";
    if (!value) ret = "";
    else {
        let momentDate = moment(String(value));
        if (momentDate.isValid())
            ret = momentDate.format(
                isFull
                    ? lang.global.t("titles.dateFullFormat")
                    : constants.DATE_FORMAT
            );
        else ret = value;
    }
    return ret;
}
