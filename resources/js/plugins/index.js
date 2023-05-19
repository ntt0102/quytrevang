import mitt from "mitt";
// import VueGtag from "vue-gtag";
import Chat from "vue3-beautiful-chat";

import DxScrollView from "devextreme-vue/scroll-view";
import DxToolbar from "devextreme-vue/toolbar";
import DxPopup from "devextreme-vue/popup";
import DxButton from "devextreme-vue/button";
import DxCheckBox from "devextreme-vue/check-box";
import DxLoadPanel from "devextreme-vue/load-panel";
import DxValidator from "devextreme-vue/validator";

export default {
    install(app) {
        const bus = mitt();
        app.config.globalProperties.$bus = bus;
        app.provide("bus", bus);

        app.use(Chat);
        // app.use(
        //     VueGtag,
        //     {
        //         config: { id: import.meta.env.VITE_GA_MEASUREMENT_ID },
        //         appName: window.appName,
        //         pageTrackerScreenviewEnabled: true,
        //     },
        //     router
        // );

        app.component("DxScrollView", DxScrollView);
        app.component("DxToolbar", DxToolbar);
        app.component("DxPopup", DxPopup);
        app.component("DxButton", DxButton);
        app.component("DxCheckBox", DxCheckBox);
        app.component("DxLoadPanel", DxLoadPanel);
        app.component("DxValidator", DxValidator);
    },
};
