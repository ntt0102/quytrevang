<template>
    <CorePopup
        ref="popupRef"
        :width="300"
        :height="270"
        class="resend-email-popup"
        :title="$t('components.resendVerifyEmail.title')"
        @shown="onShown"
        @hidden="onHidden"
    >
        <form @submit.prevent="onSubmit">
            <div class="description">
                {{ $t("components.resendVerifyEmail.description", [email]) }}
            </div>
            <DxForm>
                <DxItem
                    item-type="button"
                    :button-options="{
                        width: '100%',
                        type: 'default',
                        text: $t('components.resendVerifyEmail.resend'),
                        useSubmitBehavior: true,
                    }"
                />
            </DxForm>
        </form>
    </CorePopup>
</template>
<script setup>
import DxForm, { DxItem } from "devextreme-vue/form";
import CorePopup from "./CorePopup.vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const popupRef = ref(null);
const email = computed(() => store.state.auth.user.email);

function show() {
    popupRef.value.show();
}
function onSubmit() {
    store.dispatch("auth/resendEmail").then(() => {
        popupRef.value.hide();
    });
}
function onShown() {}
function onHidden() {}

defineExpose({ show });
</script>
<style lang="scss">
.resend-email-popup {
    .description {
        margin-bottom: 30px;
    }
}
</style>
