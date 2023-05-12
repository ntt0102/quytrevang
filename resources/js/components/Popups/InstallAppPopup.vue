<template>
    <DxPopup
        ref="popupRef"
        :position="{ my: 'top', at: 'top' }"
        :showTitle="false"
        :shading="true"
        :width="$devices.phone ? '100%' : '400px'"
        height="90px"
    >
        <template #content>
            <div class="install-button">
                <div class="logo">
                    <img
                        src="../../../images/android-chrome-512x512.png"
                        :alt="$appName"
                    />
                    <span>{{ $appName }}</span>
                </div>
                <div class="button">
                    <DxButton
                        type="default"
                        :text="$t('buttons.installApp')"
                        @click="onInstallClick"
                    />
                </div>
            </div>
        </template>
    </DxPopup>
</template>
<script setup>
import { ref } from "vue";

let defferedPrompt = null;
const popupRef = ref(null);

function show() {
    window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        defferedPrompt = event;
        setTimeout(() => popupRef.value.instance.show(), 5000);
    });
}
function onInstallClick() {
    defferedPrompt.prompt();

    defferedPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
            console.log("user accepted the prompt");
        }
        defferedPrompt = null;
        popupRef.value.instance.hide();
    });
}
defineExpose({
    show,
});
</script>
<style lang="scss">
.install-button {
    display: flex;
    .logo {
        display: flex;
        align-items: center;
        img {
            width: 35px;
        }
        span {
            padding: 10px;
        }
    }
    > div:last-child {
        margin-left: auto;
    }
    .button {
        .dx-button {
            width: 106px;
            height: 71px;
            margin-top: -15px;

            .dx-button-content {
                padding: 0;
                padding-top: 25px;

                .dx-button-text {
                    white-space: pre-line;
                    line-height: 0px;
                    color: blanchedalmond;
                }
            }
        }
    }
}
</style>
