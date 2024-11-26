<template>
    <CorePopup
        ref="popupRef"
        :width="300"
        :height="310"
        :title="$t('components.changePassword.title')"
        @shown="onShown"
    >
        <ChangePasswordForm
            ref="changePasswordFormRef"
            :hasEmail="false"
            @onSubmit="onSubmit"
        />
    </CorePopup>
</template>
<script setup>
import ChangePasswordForm from "../../../components/Forms/ChangePasswordForm.vue";
import CorePopup from "../../../components/Popups/CorePopup.vue";
import { inject, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const bus = inject("bus");
const popupRef = ref(null);
const changePasswordFormRef = ref(null);

function show() {
    popupRef.value.show();
}

function onSubmit(formData) {
    bus.emit("checkPin", () => {
        store.dispatch("userProfile/changePassword", formData).then((isOk) => {
            if (isOk) {
                popupRef.value.hide();
            }
        });
    });
}

function onShown() {
    changePasswordFormRef.value.setFocus();
}

defineExpose({
    show,
});
</script>
