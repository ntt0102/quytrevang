import devices from "devextreme/core/devices";
import constants from "./constants";
import texts from "./texts";
import functions from "./functions";
import "./other";

export default {
    install(app) {
        app.config.globalProperties.$appName = window.appName;
        app.provide("devices", devices.current());
        app.provide("routeHistoryState", []);
        //
        app.config.globalProperties.$mc = constants;
        app.provide("mc", constants);
        app.config.globalProperties.$mt = texts;
        app.provide("mt", texts);
        app.config.globalProperties.$mf = functions;
        app.provide("mf", functions);
    },
};
