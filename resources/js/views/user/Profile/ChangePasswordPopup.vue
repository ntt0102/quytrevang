<template>
    <DxPopup
        ref="popup"
        :width="300"
        :height="310"
        :showCloseButton="true"
        :show-title="true"
        :title="$t('components.changePassword.title')"
        @hiding="$mf.popRouteHistoryState"
    >
        <template #content>
            <ChangePasswordForm ref="cpForm" @onSubmit="onSubmit" />
        </template>
    </DxPopup>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ChangePasswordForm from "../../../components/Forms/ChangePasswordForm.vue";

export default {
    components: {
        ChangePasswordForm,
    },
    data() {
        return {};
    },
    computed: {
        popup() {
            return this.$refs.popup.instance;
        },
        popup() {
            return this.$refs.popup.instance;
        },
    },
    methods: {
        ...mapActions("User.profile", ["changePassword"]),
        show() {
            this.popup.show();
            this.$refs.cpForm.setFocus();
            this.$mf.pushPopupToHistoryState(() => this.popup.hide());
        },
        onSubmit(formData) {
            this.$bus.emit("checkPin", () => {
                this.changePassword(formData).then((isOk) => {
                    if (isOk) {
                        this.$toasted.success(
                            this.$t("components.changePassword.success")
                        );
                        this.popup.hide();
                    } else
                        this.$toasted.info(
                            this.$t("components.changePassword.error")
                        );
                });
            });
        },
    },
};
</script>
<style></style>
