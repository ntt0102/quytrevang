<template>
    <CorePopup
        ref="popupRef"
        class="sent-comment-popup"
        :title="$t('components.sendComment.title')"
        :toolbarItems="[
            {
                toolbar: 'bottom',
                location: 'after',
                widget: 'dxButton',
                options: {
                    text: $t('buttons.send'),
                    onClick: () =>
                        formRef.instance.getButton('submit').element().click(),
                },
            },
            {
                toolbar: 'bottom',
                location: 'after',
                widget: 'dxButton',
                options: {
                    text: $t('buttons.cancel'),
                    onClick: () => popupRef.hide(),
                },
            },
        ]"
        @shown="onShown"
        @hidden="onHidden"
    >
        <DxScrollView>
            <div>
                <form @submit.prevent="onSubmit">
                    <DxForm
                        ref="formRef"
                        :form-data="state.formData"
                        :label-location="
                            $screen.getScreenSizeInfo.isXSmall ? 'top' : 'left'
                        "
                        :scrolling-enabled="true"
                    >
                        <DxItem
                            :visible="!userCode"
                            data-field="name"
                            :validation-rules="
                                !userCode ? state.validationRules.name : null
                            "
                            :label="{ text: $t('components.sendComment.name') }"
                        />
                        <DxItem
                            :visible="!userCode"
                            data-field="phone"
                            :editorOptions="{
                                mask: '0000.000.000',
                            }"
                            :validation-rules="
                                !userCode ? state.validationRules.phone : null
                            "
                            :label="{
                                text: $t('components.sendComment.phone'),
                            }"
                        />
                        <DxItem
                            data-field="subject"
                            :validation-rules="state.validationRules.subject"
                            :label="{
                                text: $t('components.sendComment.subject'),
                            }"
                        />
                        <DxItem
                            data-field="content"
                            editor-type="dxTextArea"
                            :editor-options="{ height: 150 }"
                            :validation-rules="state.validationRules.content"
                            :label="{
                                text: $t('components.sendComment.content'),
                            }"
                        />
                        <DxItem :visible="!userCode">
                            <template #default>
                                <div class="recaptcha-container">
                                    <VueRecaptcha
                                        ref="vueRecaptchaRef"
                                        theme="dark"
                                        :size="
                                            $screen.getScreenSizeInfo.isXSmall
                                                ? 'compact'
                                                : 'normal'
                                        "
                                        @verify="onVerify"
                                        @expired="onExpired"
                                        :sitekey="state.siteKey"
                                    />
                                </div>
                            </template>
                        </DxItem>
                        <DxItem>
                            <template #default>
                                <div>
                                    <div class="upload-browser">
                                        <input
                                            ref="fileRef"
                                            type="file"
                                            id="file"
                                            multiple="multiple"
                                            accept="images/*"
                                            @change="onFileChange"
                                        />
                                        <label for="file"
                                            ><i class="far fa-file-upload"></i>
                                            {{
                                                $t(
                                                    "components.sendComment.chooseFile"
                                                )
                                            }}</label
                                        >
                                        <span
                                            v-if="state.pictureItems.length"
                                            >{{
                                                $t(
                                                    "components.sendComment.fileCounter",
                                                    [state.pictureItems.length]
                                                )
                                            }}</span
                                        >
                                    </div>
                                </div>
                            </template>
                        </DxItem>
                        <DxItem
                            name="submit"
                            cssClass="display-none"
                            item-type="button"
                            :button-options="{
                                useSubmitBehavior: true,
                            }"
                        />
                    </DxForm>
                    <Photoswipe :images="state.pictureItems" />
                </form>
            </div>
        </DxScrollView>
    </CorePopup>
</template>
<script setup>
import { DxForm, DxItem } from "devextreme-vue/form";
import DxTextArea from "devextreme-vue/text-area";
import VueRecaptcha from "vue3-recaptcha2";
import CorePopup from "./CorePopup.vue";
import Photoswipe from "../Photoswipe.vue";
import { inject, ref, reactive, onMounted, onUnmounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";

const store = useStore();
const route = useRoute();
const { t } = useI18n();
const bus = inject("bus");
const mt = inject("mt");
const mc = inject("mc");
const mf = inject("mf");
const popupRef = ref(null);
const formRef = ref(null);
const fileRef = ref(null);
const vueRecaptchaRef = ref(null);
const state = reactive({
    formData: {},
    pictureItems: [],
    siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
    validationRules: {
        name: [
            {
                type: "required",
                message:
                    t("components.sendComment.name") + mt.validations.required,
            },
        ],
        phone: [
            {
                type: "required",
                message:
                    t("components.sendComment.phone") + mt.validations.required,
            },
        ],
        subject: [
            {
                type: "required",
                message:
                    t("components.sendComment.subject") +
                    mt.validations.required,
            },
        ],
        content: [
            {
                type: "required",
                message:
                    t("components.sendComment.content") +
                    mt.validations.required,
            },
        ],
    },
});
const userCode = computed(() => store.state.auth.user.code);
let isReCaptchaVerified = false;
initFormData();

onMounted(() => {
    mf.includeScript("on", {
        src: "https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit",
        id: "recaptcha",
    });
});

onUnmounted(() => {
    mf.includeScript("off", "recaptcha");
});

function show() {
    popupRef.value.show();
}
async function onSubmit() {
    if (isReCaptchaVerified) {
        let formData = new FormData();
        for (var key in state.formData) {
            formData.append(key, state.formData[key]);
        }
        for (var i = 0; i < fileRef.value.files.length; i++) {
            let file = await mf.resizeImage({
                file: fileRef.value.files[i],
                maxSize: mc.MAX_SIZE_IMAGE_UPLOAD,
            });
            formData.append(`files[${i}]`, file);
        }
        store.dispatch("sendComment", formData).then((isOk) => {
            if (isOk) {
                popupRef.value.hide();
                if (route.name == "comments")
                    store.dispatch("adminComment/getComments");
            }
        });
    } else toast.show(t("messages.warning.unVerifiedReCaptcha"));
}
function onFileChange(e) {
    state.pictureItems = [];
    for (var i = 0; i < e.target.files.length; i++) {
        state.pictureItems.push(URL.createObjectURL(e.target.files[i]));
    }
}
function initFormData() {
    state.formData = {
        userCode: 0,
        name: "",
        phone: "",
        subject: "",
        content: "",
        files: [],
    };
    isReCaptchaVerified = false;
}
function onVerify() {
    isReCaptchaVerified = true;
}
function onExpired() {
    isReCaptchaVerified = false;
    vueRecaptchaRef.reset();
}

function onShown() {
    if (!!userCode.value) {
        state.formData.userCode = userCode.value;
        isReCaptchaVerified = true;
    }
    formRef.value.instance
        .getEditor(!!userCode.value ? "subject" : "name")
        .focus();
}
function onHidden() {
    initFormData();
}

defineExpose({ show });
</script>

<style lang="scss">
.sent-comment-popup {
    .dx-field-label {
        width: 100px;
    }
    .dx-field-value {
        width: calc(100% - 100px) !important;
    }

    .button {
        margin-top: 50px;
        margin-right: 20px;
        float: right;
    }
}
</style>
