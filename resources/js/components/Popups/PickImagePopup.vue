<template>
    <CorePopup
        ref="popupRef"
        :title="$t('components.pickImage.title')"
        @shown="onShown"
        @hidden="onHidden"
    >
        <DxScrollView>
            <FileManager
                @copiedUrl="onCopiedUrl"
                :clientPath="state.clientPath"
            />
        </DxScrollView>
    </CorePopup>
</template>
<script setup>
import { reactive, ref } from "vue";
import FileManager from "../../components/FileManager.vue";
import CorePopup from "./CorePopup.vue";
const popupRef = ref(null);
const state = reactive({ clientPath: "" });
let params = { callback: null, emitData: null };
function show({ clientPath, callback }) {
    state.clientPath = clientPath;
    params.callback = callback;
    popupRef.value.show();
}
function onCopiedUrl(copiedUrl) {
    params.emitData = copiedUrl;
    popupRef.value.hide();
}

function onShown() {}
function onHidden() {
    if (typeof params.callback === "function") params.callback(params.emitData);
}
defineExpose({ show });
</script>
