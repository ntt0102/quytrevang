<template>
    <div
        class="settings-database-page content-block dx-card responsive-paddings"
    >
        <DxAccordion
            :collapsible="true"
            :items="[
                {
                    title: $t('settings.database.backup'),
                    template: 'backupTemplate',
                },
                {
                    title: $t('settings.database.restore'),
                    template: 'restoreTemplate',
                },
            ]"
        >
            <template #backupTemplate>
                <form @submit.prevent="onBackupForm">
                    <DxForm
                        ref="backupFormRef"
                        :form-data="state.backupData"
                        :label-location="
                            $screen.getScreenSizeInfo.isXSmall ? 'top' : 'left'
                        "
                        :scrolling-enabled="true"
                    >
                        <DxItem
                            data-field="sendMail"
                            editor-type="dxCheckBox"
                            :label="{
                                location: 'left',
                                text: $t('settings.database.sendMail'),
                            }"
                        />
                        <DxItem
                            data-field="download"
                            editor-type="dxCheckBox"
                            :label="{
                                location: 'left',
                                text: $t('settings.database.download'),
                            }"
                        />
                        <DxItem
                            item-type="button"
                            :button-options="{
                                disabled:
                                    !state.backupData.sendMail &&
                                    !state.backupData.download,
                                width: 150,
                                left: 0,
                                type: 'default',
                                icon: 'far fa-copy',
                                text: $t('buttons.backup'),
                                useSubmitBehavior: true,
                            }"
                        />
                    </DxForm>
                </form>
            </template>
            <template #restoreTemplate>
                <form @submit.prevent="onRestoreForm">
                    <DxForm
                        ref="restoreFormRef"
                        :form-data="state.backupData"
                        :label-location="
                            $screen.getScreenSizeInfo.isXSmall ? 'top' : 'left'
                        "
                        :scrolling-enabled="true"
                    >
                        <DxItem>
                            <template #default>
                                <div class="upload-browser">
                                    <input
                                        type="file"
                                        id="restoreFile"
                                        ref="fileRef"
                                        accept="sql"
                                        @change="onFileChange"
                                    />
                                    <label for="restoreFile"
                                        ><i class="far fa-file-upload"></i>
                                        {{ $t("buttons.chooseFile") }}
                                    </label>
                                    <span>{{ state.restoreFileName }}</span>
                                </div>
                            </template>
                        </DxItem>
                        <DxItem
                            item-type="button"
                            :button-options="{
                                disabled: !state.restoreFileName,
                                width: 150,
                                left: 0,
                                type: 'default',
                                icon: 'far fa-undo',
                                text: $t('buttons.restore'),
                                useSubmitBehavior: true,
                            }"
                        />
                    </DxForm>
                </form>
            </template>
        </DxAccordion>
    </div>
</template>
<script setup>
import { DxAccordion } from "devextreme-vue/accordion";
import DxForm, { DxItem } from "devextreme-vue/form";
import { inject, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";

const store = useStore();
const { t } = useI18n();
const bus = inject("bus");
const fileRef = ref("fileRef");
const state = reactive({
    backupData: {
        sendMail: true,
        download: true,
    },
    restoreFileName: null,
});

function onBackupForm() {
    bus.emit("checkPin", () =>
        store.dispatch("setting/backupDatabase", state.backupData)
    );
}
function onRestoreForm() {
    bus.emit("checkPin", () => {
        let formData = new FormData();
        formData.append("file", fileRef.value.files[0]);
        store.dispatch("setting/restoreDatabase", formData);
    });
}
function onFileChange(e) {
    var fileName = e.target.files[0].name;
    if (fileName.split(".").pop() === "sql") state.restoreFileName = fileName;
    else toast.show(t("settings.database.notMatchExtension"));
}
</script>
<style lang="scss">
.settings-database-page {
    padding-top: 20px;
}
</style>
