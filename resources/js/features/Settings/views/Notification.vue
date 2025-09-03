<template>
    <div class="content-block dx-card responsive-paddings">
        <form class="setting-notification-page" @submit.prevent="onSubmit">
            <DxForm
                ref="formRef"
                :form-data="state.formData"
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
                                                name: 'admin-user',
                                                query: {
                                                    selected:
                                                        state.formData.receiver,
                                                },
                                            }),
                                    },
                                    name: 'selectUsers',
                                    location: 'after',
                                },
                            ],
                        }"
                        :validation-rules="state.validationRules.receiver"
                        :label="{
                            text: $t('settings.notification.receiver'),
                        }"
                    />
                    <DxItem
                        data-field="title"
                        :validation-rules="state.validationRules.title"
                        :label="{
                            text: $t('settings.notification.notificationTitle'),
                        }"
                    />
                    <DxItem
                        data-field="body"
                        :validation-rules="state.validationRules.body"
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
                                            $refs.pickImagePopupRef.show({
                                                clientPath: 'notifications',
                                                callback: (url) =>
                                                    (state.formData.image =
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
                            v-for="(action, index) in state.actionOptions"
                            :key="'action' + (index + 1)"
                            :data-field="'actions[' + index + ']'"
                            :editor-options="action"
                            :label="{
                                text:
                                    $t('settings.notification.action.title') +
                                    ' ' +
                                    (index + 1),
                            }"
                        />
                    </DxItem>
                    <DxItem
                        item-type="button"
                        :button-options="state.addActionOptions"
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
        <PickImagePopup ref="pickImagePopupRef" />
    </div>
</template>
<script setup>
import DxForm, { DxItem } from "devextreme-vue/form";
import PickImagePopup from "../../../components/Popups/PickImagePopup.vue";
import { inject, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const store = useStore();
const route = useRoute();
const { t } = useI18n();
const bus = inject("bus");
const mt = inject("mt");
const formRef = ref(null);
const state = reactive({
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
                    t("settings.notification.receiver") +
                    mt.validations.required,
            },
        ],
        title: [
            {
                type: "required",
                message:
                    t("settings.notification.notificationTitle") +
                    mt.validations.required,
            },
        ],
        body: [
            {
                type: "required",
                message:
                    t("settings.notification.body") + mt.validations.required,
            },
        ],
    },
});
state.actionOptions = getActionsOptions(state.formData.actions);
state.addActionOptions = {
    icon: "add",
    text: t("buttons.add"),
    onClick: () => {
        state.formData.actions.push("");
        state.actionOptions = getActionsOptions(state.formData.actions);
    },
};
onMounted(() => {
    state.formData.receiver = route.query.codes || null;
    setTimeout(() => {
        formRef.value.instance.getEditor("receiver").focus();
    }, 500);
});

function onSubmit() {
    bus.emit("checkPin", () => {
        store.dispatch("setting/sendNotification", state.formData);
    });
}
function getActionsOptions(actions) {
    let options = [];
    for (let i = 0; i < actions.length; i++) {
        options.push(generateNewActionOptions(i));
    }
    return options;
}
function generateNewActionOptions(index) {
    return {
        placeholder: t("settings.notification.action.placeholder"),
        buttons: [
            {
                name: "trash",
                location: "after",
                options: {
                    stylingMode: "text",
                    icon: "trash",
                    onClick: () => {
                        state.formData.actions.splice(index, 1);
                        state.actionOptions = getActionsOptions(
                            state.formData.actions
                        );
                    },
                },
            },
        ],
    };
}
</script>
<style lang="scss">
.setting-notification-page {
    margin-top: 20px;
    margin-left: 20px;
}
</style>
