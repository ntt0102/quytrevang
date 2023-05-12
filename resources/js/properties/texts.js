import lang from "../lang";

export default {
    validations: {
        required: lang.global.t("validations.required"),
        email: lang.global.t("validations.email"),
        numeric: lang.global.t("validations.numeric"),
        duplicate: lang.global.t("validations.duplicate"),
        match: lang.global.t("validations.match"),
    },
    messages: {
        success: {
            saved: lang.global.t("messages.success.saved"),
        },
        warning: {},
        error: {
            unsaved: lang.global.t("messages.error.unsaved"),
            hasOpeningContract: lang.global.t(
                "messages.error.hasOpeningContract"
            ),
        },
        info: {
            noChangedData: lang.global.t("messages.info.noChangedData"),
        },
    },
    idIssuedAtValue: lang.global.t("models.user.idIssuedAtValue"),
};
