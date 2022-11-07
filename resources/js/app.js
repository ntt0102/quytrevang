import "./bootstrap";

import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import i18n from "./plugins/i18n";
import prototypes from "./prototypes";
import filters from "./filters";
import plugins from "./plugins";

require("./configs");
Vue.use(filters);
Vue.use(prototypes);
Vue.use(plugins);

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount("#app");
