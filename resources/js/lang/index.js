import { createI18n } from "vue-i18n";
import { locale, loadMessages } from "devextreme/localization";
import viDevextreme from "./devextreme/vi.json";
import vi from "./vi.json";
const devextremeMessages = { vi: viDevextreme };
loadMessages(devextremeMessages[window.lang]);
locale(window.lang);
window.moment.locale(window.lang);

export default createI18n({
    legacy: false,
    locale: window.lang || "en",
    fallbackLocale: window.lang || "en",
    messages: { vi },
});
