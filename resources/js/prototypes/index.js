import devices from "devextreme/core/devices";
import constants from "./constants";
import texts from "./texts";
import functions from "./functions";
import "./other";

export default {
    install(Vue) {
        Vue.prototype.$appName = window.appName;
        Vue.prototype.$devices = devices.current();
        Vue.prototype.$screen = window.screen;
        Vue.prototype.$routeHistoryState = [];
        //
        Vue.prototype.$mc = constants;
        Vue.prototype.$mt = texts;
        Vue.prototype.$mf = functions;
    },
};
