import lang from "../lang";
import store from "../store";
import router from "../router";
import crypto from "../plugins/crypto";
import { toast } from "vue3-toastify";
import mf from "../properties/functions";
import config from "devextreme/core/config";
import { differenceInSeconds, format } from "date-fns";

let shownOfflineAt = new Date();

axios.interceptors.request.use(
    (config) => {
        const dataKey = config.method === "post" ? "data" : "params";
        console.log(
            `request: ${config.url} (${format(new Date(), "HH:mm:ss")})`,
            config[dataKey]
        );
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
            console.log(
                `response: ${response.config.url} (${format(
                    new Date(),
                    "HH:mm:ss"
                )})`,
                response.data
            );
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
        console.log(
            `error: ${error.response.config.url} (${format(
                new Date(),
                "HH:mm:ss"
            )})`,
            error.response
        );
        store.dispatch("setSyncing", false);
        if (error.response) {
            if (error.response.config.url.includes("derivative")) {
                store.dispatch("tradingDerivative/setLoading", false);
            }
            if (error.response.status === 401) {
                store.dispatch("auth/clearToken");
                router.push({ name: "login" });
            }
            if (navigator.onLine) mf.handleError(error);
        }
        return Promise.reject(error);
    }
);

store.dispatch("getContact");
store.dispatch("getFaqs");

config({
    editorStylingMode: "underlined",
});
