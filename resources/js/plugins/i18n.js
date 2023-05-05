import Vue from "vue";
import VueI18n from "vue-i18n";
import vi from "../locales/vi.json";

Vue.use(VueI18n);
window.moment.locale(window.lang);

export default new VueI18n({
    locale: window.lang || "en",
    fallbackLocale: window.lang || "en",
    messages: { vi },
});
