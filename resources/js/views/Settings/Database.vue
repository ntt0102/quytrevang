<template>
    <div class="settings-page">
        <h2 class="content-block">
            {{ $t("settings.database.title") }}
        </h2>
        <div class="content-block dx-card responsive-paddings">
            <div class="settings-database-tab">
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
                                ref="form"
                                :form-data="backupData"
                                :label-location="
                                    $screen.getScreenSizeInfo.isXSmall
                                        ? 'top'
                                        : 'left'
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
                                            !backupData.sendMail &&
                                            !backupData.download,
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
                                ref="form"
                                :form-data="backupData"
                                :label-location="
                                    $screen.getScreenSizeInfo.isXSmall
                                        ? 'top'
                                        : 'left'
                                "
                                :scrolling-enabled="true"
                            >
                                <DxItem>
                                    <template #default>
                                        <div class="upload-browser">
                                            <input
                                                type="file"
                                                id="restoreFile"
                                                ref="file"
                                                :accept="`.${RESTORE_FILE_EXTENSION}`"
                                                @change="onFileChange"
                                            />
                                            <label for="restoreFile"
                                                ><i
                                                    class="far fa-file-upload"
                                                ></i>
                                                {{ $t("buttons.chooseFile") }}
                                            </label>
                                            <span>{{ restoreFileName }}</span>
                                        </div>
                                    </template>
                                </DxItem>
                                <DxItem
                                    item-type="button"
                                    :button-options="{
                                        disabled: !restoreFileName,
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
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { DxAccordion } from "devextreme-vue/accordion";
import DxForm, { DxItem } from "devextreme-vue/form";
import adminSettingsStore from "../../store/modules/Setting";

export default {
    components: {
        DxAccordion,
        DxForm,
        DxItem,
    },
    data() {
        return {
            backupData: {
                sendMail: true,
                download: true,
            },
            RESTORE_FILE_EXTENSION: "sql",
            restoreFileName: null,
        };
    },
    beforeCreate() {
        this.$store.registerModule("Settings", adminSettingsStore);
    },
    destroyed() {
        this.$store.unregisterModule("Settings");
    },
    methods: {
        ...mapActions("Settings", ["backupDatabase", "restoreDatabase"]),
        onBackupForm() {
            this.$bus.emit("checkPin", () =>
                this.backupDatabase(this.backupData)
            );
        },
        onRestoreForm() {
            this.$bus.emit("checkPin", () => {
                let formData = new FormData();
                formData.append("file", this.$refs.file.files[0]);
                this.restoreDatabase(formData);
            });
        },
        onFileChange(e) {
            var fileName = e.target.files[0].name;
            if (fileName.split(".").pop() === this.RESTORE_FILE_EXTENSION)
                this.restoreFileName = fileName;
            else
                this.$toasted.show(
                    this.$t("settings.database.notMatchExtension").replace(
                        "{extension}",
                        this.RESTORE_FILE_EXTENSION
                    )
                );
        },
    },
};
</script>
<style lang="scss" scoped>
.settings-database-tab {
    padding-top: 20px;
}
</style>
