import constants from "../properties/constants";
import lang from "../lang";
import { isValid, parse, format } from "date-fns";

export default function formatDate(value, isFull = false) {
    let ret = "";
    if (!value) ret = "";
    else {
        let dateValue = parse(String(value), "yyyy-MM-dd", new Date());
        if (isValid(dateValue)) {
            ret = format(
                dateValue,
                isFull
                    ? lang.global.t("titles.dateFullFormat")
                    : constants.DATE_FORMAT
            );
        } else ret = value;
    }
    return ret;
}
