import Bus from "./bus";
import Crypto from "./crypto";
import VueCookies from "vue-cookies";
import router from "../router";
import Toasted from "vue-toasted";
import Photoswipe from "vue-pswipe";
import VueGtag from "vue-gtag";

const DxScrollView = () =>
    import(/* webpackPrefetch: true */ "devextreme-vue/scroll-view");
const DxToolbar = () =>
    import(/* webpackPrefetch: true */ "devextreme-vue/toolbar");
const DxPopup = () =>
    import(/* webpackPrefetch: true */ "devextreme-vue/popup");
const DxButton = () =>
    import(/* webpackPrefetch: true */ "devextreme-vue/button");
const DxCheckBox = () =>
    import(/* webpackPrefetch: true */ "devextreme-vue/check-box");
const DxLoadPanel = () =>
    import(/* webpackPrefetch: true */ "devextreme-vue/load-panel");

export default {
    install(Vue) {
        Vue.use(Bus);
        Vue.use(Crypto);
        Vue.use(VueCookies);
        Vue.use(Toasted, {
            duration: 2000,
            keepOnHover: true,
            theme: "bubble",
            position: "bottom-right",
            iconPack: "custom-class"
        });
        Vue.use(Photoswipe, { shareEl: false });
        Vue.use(
            VueGtag,
            {
                config: { id: process.env.MIX_GA_MEASUREMENT_ID },
                appName: window.appName,
                pageTrackerScreenviewEnabled: true
            },
            router
        );

        Vue.component("DxScrollView", DxScrollView);
        Vue.component("DxToolbar", DxToolbar);
        Vue.component("DxPopup", DxPopup);
        Vue.component("DxButton", DxButton);
        Vue.component("DxCheckBox", DxCheckBox);
        Vue.component("DxLoadPanel", DxLoadPanel);
    }
};
