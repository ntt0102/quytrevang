import lang from "../lang";
import store from "../store";
import crypto from "../plugins/crypto";
import { toast } from "vue3-toastify";
import mf from "../properties/functions";
import config from "devextreme/core/config";
import { differenceInSeconds } from "date-fns";

let shownOfflineAt = new Date();

axios.interceptors.request.use(
    (config) => {
        const dataKey = config.method === "post" ? "data" : "params";
        console.log("request:" + config.url, config[dataKey]);
        config.headers["Authorization"] = `Bearer ${store.state.auth.token}`;
        if (!config.noCrypt) config[dataKey] = crypto.encrypt(config[dataKey]);
        if (!config.noLoading) store.dispatch("setSyncing", true);
        if (
            !navigator.onLine &&
            config.method === "post" &&
            differenceInSeconds(new Date(), new Date(shownOfflineAt)) > 5
        ) {
            toast.info(lang.global.t("messages.error.offline"));
            shownOfflineAt = new Date();
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        store.dispatch("setSyncing", false);
        if (response.headers["content-type"] == "application/json") {
            response.data = crypto.decrypt(response.data);
            console.log("response:" + response.config.url, response.data);
        }
        if (!response.config.notify && response.data.hasOwnProperty("isOk")) {
            if (response.data.isOk) {
                if (response.data.hasOwnProperty("message")) {
                    if (response.data.message !== null)
                        toast.success(
                            lang.global.t(
                                `messages.success.${response.data.message}`
                            )
                        );
                } else toast.success(lang.global.t("messages.success.saved"));
            } else {
                if (response.data.hasOwnProperty("message")) {
                    if (response.data.message !== null) {
                        let message = lang.global.t(
                            `messages.error.${response.data.message}`
                        );
                        if (!!response.data.param)
                            message = message.replace(
                                "{param}",
                                response.data.param
                            );
                        toast.error(message);
                    }
                } else toast.error(lang.global.t("messages.error.unsaved"));
            }
        }
        return response;
    },
    (error) => {
        console.log("error:");
        console.log(error.response);
        store.dispatch("setSyncing", false);
        if (navigator.onLine && !!error.response) mf.handleError(error);
        return Promise.reject(error);
    }
);

store.dispatch("getContact");
store.dispatch("getFaqs");

config({
    editorStylingMode: "underlined",
});
