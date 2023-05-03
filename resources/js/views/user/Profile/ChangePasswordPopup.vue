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
            <ChangePasswordForm
                ref="cpForm"
                :hasEmail="false"
                @onSubmit="onSubmit"
            />
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
                        this.popup.hide();
                    }
                });
            });
        },
    },
};
</script>
<style></style>
