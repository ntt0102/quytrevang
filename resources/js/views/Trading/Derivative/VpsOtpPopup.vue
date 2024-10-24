<template>
    <CorePopup
        ref="popupRef"
        :width="400"
        :height="190"
        class="vps-otp-popup"
        :title="$t('trading.derivative.buttons.loginVps')"
        @shown="onShown"
        @hidden="onHidden"
    >
        <OtpInput
            v-if="isEnabled"
            ref="otpInputRef"
            v-model:value="otp"
            input-classes="otp-input"
            separator="-"
            :num-inputs="6"
            :should-auto-focus="true"
            input-type="letter-numeric"
            @on-complete="handleOnComplete"
        />
    </CorePopup>
</template>
<script setup>
import OtpInput from "vue3-otp-input";
import CorePopup from "../../../components/Popups/CorePopup.vue";
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const popupRef = ref(null);
const otpInputRef = ref(null);
const isEnabled = ref(false);
const otp = ref("");

function show() {
    popupRef.value.show();
    setTimeout(checkClipboard, 500);
}
function checkClipboard() {
    if (navigator.clipboard) {
        navigator.clipboard.readText().then((text) => {
            text = text.replace(/\s+/g, "");
            if (/^\d{6}$/.test(text)) otpInputRef.value.fillInput(text);
        });
    }
}
function handleOnComplete(e) {
    store.dispatch("tradingDerivative/loginVps", e).then((isOk) => {
        if (isOk) popupRef.value.hide();
        otpInputRef.value.clearInput();
    });
}
function onShown() {
    isEnabled.value = true;
}
function onHidden() {
    isEnabled.value = false;
}

defineExpose({ show });
</script>
<style lang="scss">
@import "../../../../sass/variables.scss";
.vps-otp-popup {
    .dx-popup-content {
        padding: 25px 10px !important;
        text-align: center;

        .otp-input {
            width: 40px;
            height: 40px;
            padding: 5px;
            margin: 0 10px;
            font-size: 20px;
            border-radius: 4px;
            border: 1px solid rgba(0, 0, 0, 0.3);
            text-align: center;
        }
        .otp-input.is-complete {
            background-color: #e4e4e4;
        }
        .otp-input::-webkit-inner-spin-button,
        .otp-input::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        input::placeholder {
            font-size: 15px;
            text-align: center;
            font-weight: 600;
        }
    }
}
</style>
