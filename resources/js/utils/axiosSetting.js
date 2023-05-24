import lang from "../lang";
import store from "../store";
import crypto from "./crypto";
import { toast } from "vue3-toastify";
import mf from "../properties/functions";
import config from "devextreme/core/config";

axios.interceptors.request.use(
    (config) => {
        console.log("request:" + config.method + "/" + config.url);
        const token = store.state.auth.token;
        if (!!token) config.headers["Authorization"] = `Bearer ${token}`;
        if (config.method === "post" && !config.noLoading) {
            if (navigator.onLine) store.dispatch("setSyncing", true);
            else toast.info(lang.global.t("messages.info.offline"));
        }
        config.data = crypto.encrypt(config.data);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        store.dispatch("setSyncing", false);
        response.data = crypto.decrypt(response.data);
        console.log(
            "response:" + response.config.method + "/" + response.config.url,
            response.data
        );
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
        if (navigator.onLine) {
            if (!!error.response) mf.handleError(error);
        } else toast.error(lang.global.t("messages.error.offline"));
        return Promise.reject(error);
    }
);

store.dispatch("getContact");
store.dispatch("getFaqs");

config({
    editorStylingMode: "underlined",
});
