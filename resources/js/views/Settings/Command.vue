<template>
    <div class="settings-page">
        <h2 class="content-block">
            {{ $t("settings.command.title") }}
        </h2>
        <div class="content-block dx-card responsive-paddings">
            <form class="setting-command-tab" @submit.prevent="onSubmit">
                <DxForm
                    ref="form"
                    :form-data="formData"
                    :label-location="$devices.phone ? 'top' : 'left'"
                    :scrolling-enabled="true"
                >
                    <DxItem
                        data-field="radio"
                        editor-type="dxRadioGroup"
                        :editor-options="{
                            dataSource: $mf.getCommandList(),
                            displayExpr: 'name',
                            valueExpr: 'value',
                            onValueChanged: onValueChanged,
                        }"
                        :validation-rules="validationRules"
                        :label="{ visible: false }"
                    />
                    <DxItem
                        :visible="false"
                        data-field="textbox"
                        name="textbox"
                        :label="{ visible: false }"
                    />
                    <DxItem
                        item-type="button"
                        :button-options="{
                            width: 150,
                            left: 0,
                            type: 'default',
                            icon: 'far fa-running',
                            text: $t('settings.command.run'),
                            useSubmitBehavior: true,
                        }"
                    />
                </DxForm>
            </form>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import DxForm, { DxItem } from "devextreme-vue/form";
import DxRadioGroup from "devextreme-vue/radio-group";
import adminSettingsStore from "../../store/modules/Settings";

export default {
    components: {
        DxForm,
        DxItem,
        DxRadioGroup,
    },
    data() {
        return {
            formData: {
                radio: "config:cache",
                textbox: null,
            },
            validationRules: [
                {
                    type: "required",
                    message:
                        this.$t("settings.command.title") +
                        this.$mt.validations.required,
                },
            ],
        };
    },
    beforeCreate() {
        this.$store.registerModule("Settings", adminSettingsStore);
    },
    destroyed() {
        this.$store.unregisterModule("Settings");
    },
    computed: {
        form: function () {
            return this.$refs.form.instance;
        },
    },
    methods: {
        ...mapActions("Settings", ["runCommand"]),
        onSubmit() {
            this.$bus.emit("checkPin", () => {
                let data =
                    this.formData.radio != "custom"
                        ? this.formData.radio
                        : this.formData.textbox;
                this.runCommand(data);
            });
        },
        onValueChanged(e) {
            if (e.value != "custom") {
                this.form.itemOption("textbox", "visible", false);
                this.form.itemOption("textbox", "validationRules", null);
            } else {
                this.form.itemOption("textbox", "visible", true);
                this.form.itemOption(
                    "textbox",
                    "validationRules",
                    this.validationRules
                );
                this.form.getEditor("textbox").focus();
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.setting-command-tab {
    margin-left: 20px;
    .dx-radiogroup .dx-radiobutton {
        margin: 20px 0;
    }
}
</style>
