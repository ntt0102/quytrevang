import Vue from "vue";
import i18n from "../plugins/i18n";
import store from "../store/index";
import config from "devextreme/core/config";

Vue.config.productionTip = false;

axios.interceptors.request.use(
    config => {
        console.log("request:" + config.method + "/" + config.url);
        const token = store.getters["Auth/token"];
        if (!!token) config.headers["Authorization"] = `Bearer ${token}`;
        if (config.method === "post" && !config.noLoading) {
            if (navigator.onLine) store.dispatch("setSyncing", true);
            else Vue.toasted.info(i18n.t("messages.info.offline"));
        }
        if (!!config.crypto)
            config.data = Vue.prototype.$crypto.encrypt(config.data);
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
        store.dispatch("setSyncing", false);
        if (!!response.config.crypto)
            response.data = Vue.prototype.$crypto.decrypt(response.data);
        console.log(
            "response:" + response.config.method + "/" + response.config.url,
            response.data
        );
        if (!response.config.notify && response.data.hasOwnProperty("isOk")) {
            if (response.data.isOk) {
                if (response.data.hasOwnProperty("message")) {
                    if (response.data.message !== null)
                        Vue.toasted.success(
                            i18n.t(`messages.success.${response.data.message}`)
                        );
                } else Vue.toasted.success(i18n.t("messages.success.saved"));
            } else {
                if (response.data.hasOwnProperty("message")) {
                    if (response.data.message !== null) {
                        let message = i18n.t(
                            `messages.error.${response.data.message}`
                        );
                        if (!!response.data.param)
                            message = message.replace(
                                "{param}",
                                response.data.param
                            );
                        Vue.toasted.error(message);
                    }
                } else Vue.toasted.error(i18n.t("messages.error.unsaved"));
            }
        }
        return response;
    },
    error => {
        console.log("error:");
        console.log(error.response);
        store.dispatch("setSyncing", false);
        if (navigator.onLine) {
            if (!!error.response) Vue.prototype.$mf.handleError(error);
        } else Vue.toasted.error(i18n.t("messages.error.offline"));
        return Promise.reject(error);
    }
);

store.dispatch("getContact");
store.dispatch("getFaqs");

config({
    editorStylingMode: "underlined"
});
