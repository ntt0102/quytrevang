import fromNow from "./timeFilter";
import numberVnFormat from "./numberVnFormat";
import formatTime from "./formatTime";
import formatDate from "./formatDate";
import currency from "./currency";
import readCurrency from "./readCurrency";
import phone from "./phone";
import atmNumber from "./atmNumber";
import percentInterestRate from "./percentInterestRate";

export default {
    install(app) {
        const filters = {
            fromNow,
            numberVnFormat,
            formatTime,
            formatDate,
            currency,
            readCurrency,
            phone,
            atmNumber,
            percentInterestRate,
        };
        app.config.globalProperties.$filters = filters;
        app.provide("filters", filters);
    },
};
