import i18n from "../plugins/i18n";

export default {
    validations: {
        required: i18n.t("validations.required"),
        email: i18n.t("validations.email"),
        numeric: i18n.t("validations.numeric"),
        duplicate: i18n.t("validations.duplicate"),
        match: i18n.t("validations.match")
    },
    messages: {
        success: {
            saved: i18n.t("messages.success.saved")
        },
        warning: {},
        error: {
            unsaved: i18n.t("messages.error.unsaved"),
            hasOpeningContract: i18n.t("messages.error.hasOpeningContract")
        },
        info: {
            noChangedData: i18n.t("messages.info.noChangedData")
        }
    },
    idIssuedAtValue: i18n.t("models.user.idIssuedAtValue")
};
