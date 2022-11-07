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
    install(Vue) {
        Vue.filter("fromNow", fromNow);
        Vue.filter("numberVnFormat", numberVnFormat);
        Vue.filter("formatTime", formatTime);
        Vue.filter("formatDate", formatDate);
        Vue.filter("currency", currency);
        Vue.filter("readCurrency", readCurrency);
        Vue.filter("phone", phone);
        Vue.filter("atmNumber", atmNumber);
        Vue.filter("percentInterestRate", percentInterestRate);
    }
};
