<template>
    <CorePopup
        ref="popupRef"
        :width="275"
        :height="190"
        class="check-pin-popup"
        :title="$t('components.checkPin.title')"
        :toolbarItems="[
            {
                toolbar: 'bottom',
                location: 'center',
                widget: 'dxButton',
                options: {
                    text: $t('components.checkPin.fingerPrint'),
                    icon: 'far fa-fingerprint small',
                    onClick: scanFingerPrint,
                },
            },
        ]"
        @shown="onShown"
        @hidden="onHidden"
    >
        <OtpInput
            v-if="isEnabled"
            ref="otpInputRef"
            v-model:value="pin"
            input-classes="otp-input"
            separator="-"
            :num-inputs="4"
            :should-auto-focus="true"
            input-type="letter-numeric"
            :conditionalClass="['one', 'two', 'three', 'four']"
            :placeholder="['*', '*', '*', '*']"
            @on-complete="handleOnComplete"
        />
    </CorePopup>
</template>
<script setup>
import OtpInput from "vue3-otp-input";
import CorePopup from "./CorePopup.vue";
import { inject, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const devices = inject("devices");
const popupRef = ref(null);
const otpInputRef = ref(null);
const isEnabled = ref(false);
const pin = ref("");
let params = null;

function show(e) {
    popupRef.value.show();
    params = e;
}
function scanFingerPrint() {
    store.dispatch("auth/confirmWebAuthn").then((isOk) => {
        if (isOk) {
            params.callback();
            popupRef.value.hide();
        }
    });
}
function handleOnComplete(e) {
    store.dispatch("auth/checkPin", e).then((isOk) => {
        if (isOk) {
            params.callback();
            popupRef.value.hide();
        }
        otpInputRef.value.clearInput();
    });
}
function onShown() {
    isEnabled.value = true;
    if (!params.forcePin && devices.phone && store.state.auth.user.webauthn)
        scanFingerPrint();
}
function onHidden() {
    isEnabled.value = false;
}

defineExpose({ show });
</script>
<style lang="scss">
@import "../../../sass/variables.scss";
.check-pin-popup {
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
        /* Background colour of an input field with value */
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
