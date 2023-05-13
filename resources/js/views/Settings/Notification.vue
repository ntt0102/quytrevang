<template>
    <div class="settings-page">
        <h2 class="content-block">
            {{ $t("settings.notification.title") }}
        </h2>
        <div class="content-block dx-card responsive-paddings">
            <div>
                <form
                    class="setting-notification-tab"
                    @submit.prevent="onSubmit"
                >
                    <DxForm
                        ref="form"
                        :form-data="formData"
                        :label-location="
                            $screen.getScreenSizeInfo.isXSmall ? 'top' : 'left'
                        "
                        :scrolling-enabled="true"
                    >
                        <DxItem item-type="group">
                            <DxItem
                                data-field="receiver"
                                editor-type="dxTextBox"
                                :editor-options="{
                                    placeholder: $t(
                                        'settings.notification.receiverPlaceholder'
                                    ),
                                    buttons: [
                                        {
                                            options: {
                                                icon: 'far fa-user',
                                                onClick: () =>
                                                    $router.push({
                                                        name: 'users',
                                                        query: {
                                                            selected:
                                                                formData.receiver,
                                                        },
                                                    }),
                                            },
                                            name: 'selectUsers',
                                            location: 'after',
                                        },
                                    ],
                                }"
                                :validation-rules="validationRules.receiver"
                                :label="{
                                    text: $t('settings.notification.receiver'),
                                }"
                            />
                            <DxItem
                                data-field="title"
                                :validation-rules="validationRules.title"
                                :label="{
                                    text: $t(
                                        'settings.notification.notificationTitle'
                                    ),
                                }"
                            />
                            <DxItem
                                data-field="body"
                                :validation-rules="validationRules.body"
                                :label="{
                                    text: $t('settings.notification.body'),
                                }"
                            />
                            <DxItem
                                data-field="image"
                                editor-type="dxTextBox"
                                :editor-options="{
                                    buttons: [
                                        {
                                            options: {
                                                icon: 'far fa-image',
                                                onClick: () =>
                                                    $refs.pickImagePopup.show({
                                                        clientPath:
                                                            'notifications',
                                                        callback: (url) =>
                                                            (formData.image =
                                                                url),
                                                    }),
                                            },
                                            name: 'pickImage',
                                            location: 'after',
                                        },
                                    ],
                                }"
                                :label="{
                                    text: $t('settings.notification.image'),
                                }"
                            />
                        </DxItem>
                        <DxItem
                            item-type="group"
                            :caption="$t('settings.notification.action.title')"
                            name="actions-container"
                        >
                            <DxItem item-type="group" name="actions">
                                <DxItem
                                    v-for="(action, index) in actionOptions"
                                    :key="'action' + (index + 1)"
                                    :data-field="'actions[' + index + ']'"
                                    :editor-options="action"
                                    :label="{
                                        text:
                                            $t(
                                                'settings.notification.action.title'
                                            ) +
                                            ' ' +
                                            (index + 1),
                                    }"
                                />
                            </DxItem>
                            <DxItem
                                item-type="button"
                                :button-options="addActionOptions"
                                horizontal-alignment="left"
                            />
                        </DxItem>
                        <DxItem
                            item-type="button"
                            :button-options="{
                                width: 100,
                                left: 0,
                                type: 'default',
                                icon: 'far fa-paper-plane',
                                text: $t('buttons.send'),
                                useSubmitBehavior: true,
                            }"
                        />
                    </DxForm>
                </form>
                <PickImagePopup ref="pickImagePopup" />
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import DxForm, { DxItem } from "devextreme-vue/form";
import PickImagePopup from "../../components/Popups/PickImagePopup.vue";
import adminSettingsStore from "../../store/modules/Setting";

export default {
    components: {
        DxForm,
        DxItem,
        PickImagePopup,
    },
    data() {
        return {
            formData: {
                receiver: null,
                title: null,
                body: null,
                image: null,
                actions: [""],
            },
            actionOptions: null,
            addActionOptions: null,
            validationRules: {
                receiver: [
                    {
                        type: "required",
                        message:
                            this.$t("settings.notification.receiver") +
                            this.$mt.validations.required,
                    },
                ],
                title: [
                    {
                        type: "required",
                        message:
                            this.$t("settings.notification.notificationTitle") +
                            this.$mt.validations.required,
                    },
                ],
                body: [
                    {
                        type: "required",
                        message:
                            this.$t("settings.notification.body") +
                            this.$mt.validations.required,
                    },
                ],
            },
        };
    },
    beforeCreate() {
        this.$store.registerModule("Settings", adminSettingsStore);
    },
    created() {
        this.actionOptions = this.getActionsOptions(this.formData.actions);
        this.addActionOptions = {
            icon: "add",
            text: this.$t("buttons.add"),
            onClick: () => {
                this.formData.actions.push("");
                this.actionOptions = this.getActionsOptions(
                    this.formData.actions
                );
            },
        };
    },
    mounted() {
        this.formData.receiver = this.$route.query.codes || null;
        setTimeout(() => this.form.getEditor("receiver").focus(), 1000);
    },
    destroyed() {
        this.$store.unregisterModule("Settings");
    },
    computed: {
        toolbar: function () {
            return this.$refs.toolbar.instance;
        },
        form: function () {
            return this.$refs.form.instance;
        },
    },
    methods: {
        ...mapActions("Settings", ["sendNotification"]),
        onSubmit() {
            this.$bus.emit("checkPin", () => {
                this.sendNotification(this.formData);
            });
        },
        getActionsOptions(actions) {
            let options = [];
            for (let i = 0; i < actions.length; i++) {
                options.push(this.generateNewActionOptions(i));
            }
            return options;
        },
        generateNewActionOptions(index) {
            return {
                placeholder: this.$t(
                    "settings.notification.action.placeholder"
                ),
                buttons: [
                    {
                        name: "trash",
                        location: "after",
                        options: {
                            stylingMode: "text",
                            icon: "trash",
                            onClick: () => {
                                this.formData.actions.splice(index, 1);
                                this.actionOptions = this.getActionsOptions(
                                    this.formData.actions
                                );
                            },
                        },
                    },
                ],
            };
        },
    },
};
</script>
<style lang="scss" scoped>
.setting-notification-tab {
    margin-top: 20px;
    margin-left: 20px;
}
</style>
