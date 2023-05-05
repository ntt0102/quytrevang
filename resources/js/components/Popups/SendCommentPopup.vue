<template>
    <DxPopup
        ref="popup"
        :showCloseButton="true"
        :fullScreen="$devices.phone ? true : false"
        :show-title="true"
        :title="$t('components.sendComment.title')"
        :toolbarItems="[
            {
                toolbar: 'bottom',
                location: 'after',
                widget: 'dxButton',
                options: {
                    text: $t('buttons.send'),
                    onClick: () => form.getButton('submit').element().click(),
                },
            },
            {
                toolbar: 'bottom',
                location: 'after',
                widget: 'dxButton',
                options: {
                    text: $t('buttons.cancel'),
                    onClick: () => popup.hide(),
                },
            },
        ]"
        @hiding="onHiding"
    >
        <template #content>
            <form class="sent-comment-popup" @submit.prevent="onSubmit">
                <DxForm
                    ref="form"
                    :form-data="formData"
                    :label-location="$devices.phone ? 'top' : 'left'"
                    :scrolling-enabled="true"
                >
                    <DxItem
                        :visible="!isLoggedin"
                        data-field="name"
                        :validation-rules="
                            !isLoggedin ? validationRules.name : null
                        "
                        :label="{ text: $t('components.sendComment.name') }"
                    />
                    <DxItem
                        :visible="!isLoggedin"
                        data-field="phone"
                        :editorOptions="{
                            mask: '0000.000.000',
                        }"
                        :validation-rules="
                            !isLoggedin ? validationRules.phone : null
                        "
                        :label="{ text: $t('components.sendComment.phone') }"
                    />
                    <DxItem
                        data-field="subject"
                        :validation-rules="validationRules.subject"
                        :label="{ text: $t('components.sendComment.subject') }"
                    />
                    <DxItem
                        data-field="content"
                        editor-type="dxTextArea"
                        :editor-options="{ height: 150 }"
                        :validation-rules="validationRules.content"
                        :label="{ text: $t('components.sendComment.content') }"
                    />
                    <DxItem>
                        <template #default>
                            <div>
                                <div class="upload-browser">
                                    <input
                                        ref="file"
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
                                    <span v-if="formData.files.length">{{
                                        $t(
                                            "components.sendComment.fileCounter"
                                        ).replace(
                                            "{count}",
                                            formData.files.length
                                        )
                                    }}</span>
                                </div>
                                <Photoswipe v-if="formData.files.length">
                                    <div
                                        v-for="(url, index) in formData.files"
                                        :key="index"
                                    >
                                        <img
                                            :src="url"
                                            v-pswp="url"
                                            :alt="$appName"
                                        />
                                    </div>
                                </Photoswipe>
                            </div>
                        </template>
                    </DxItem>
                    <DxItem :visible="!isLoggedin">
                        <template #default>
                            <div class="recaptcha-container">
                                <VueRecaptcha
                                    ref="recaptcha"
                                    theme="dark"
                                    :size="
                                        $devices.phone ? 'compact' : 'normal'
                                    "
                                    @verify="onVerify"
                                    @expired="onExpired"
                                    :sitekey="siteKey"
                                />
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
            </form>
        </template>
    </DxPopup>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { DxForm, DxItem } from "devextreme-vue/form";
import DxTextBox from "devextreme-vue/text-box";
import DxTextArea from "devextreme-vue/text-area";
import DxValidator from "devextreme-vue/validator";
import VueRecaptcha from "vue-recaptcha";

export default {
    components: {
        DxForm,
        DxItem,
        DxTextBox,
        DxTextArea,
        DxValidator,
        VueRecaptcha,
    },
    data() {
        return {
            formData: {},
            siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
            isReCaptchaVerified: false,
            validationRules: {
                name: [
                    {
                        type: "required",
                        message:
                            this.$t("components.sendComment.name") +
                            this.$mt.validations.required,
                    },
                ],
                phone: [
                    {
                        type: "required",
                        message:
                            this.$t("components.sendComment.phone") +
                            this.$mt.validations.required,
                    },
                ],
                subject: [
                    {
                        type: "required",
                        message:
                            this.$t("components.sendComment.subject") +
                            this.$mt.validations.required,
                    },
                ],
                content: [
                    {
                        type: "required",
                        message:
                            this.$t("components.sendComment.content") +
                            this.$mt.validations.required,
                    },
                ],
            },
        };
    },
    created() {
        this.initFormData();
    },
    mounted() {
        this.$mf.includeScript("on", {
            src: "https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit",
            id: "recaptcha",
        });
    },
    destroyed() {
        this.$mf.includeScript("off", "recaptcha");
    },
    computed: {
        ...mapGetters("Auth", ["isLoggedin", "code"]),
        popup() {
            return this.$refs.popup.instance;
        },
        form() {
            return this.$refs.form.instance;
        },
    },
    methods: {
        ...mapActions(["sendComment"]),
        ...mapActions("Admin.comments", ["fetch"]),
        show() {
            this.popup.show();
            if (this.isLoggedin) {
                this.formData.userCode = this.code;
                this.isReCaptchaVerified = true;
            }
            setTimeout(
                () =>
                    this.form
                        .getEditor(this.isLoggedin ? "subject" : "name")
                        .focus(),
                1000
            );
            this.$mf.pushPopupToHistoryState(() => this.popup.hide());
        },
        async onSubmit() {
            if (this.isReCaptchaVerified) {
                let formData = new FormData();
                for (var key in this.formData) {
                    formData.append(key, this.formData[key]);
                }
                for (var i = 0; i < this.$refs.file.files.length; i++) {
                    let file = await this.$mf.resizeImage({
                        file: this.$refs.file.files[i],
                        maxSize: this.$mc.MAX_SIZE_IMAGE_UPLOAD,
                    });
                    formData.append(`files[${i}]`, file);
                }
                this.sendComment(formData).then((isOk) => {
                    if (isOk) {
                        this.popup.hide();
                        if (this.$route.name == "comments") this.fetch();
                    }
                });
            } else
                this.$toasted.show(
                    this.$t("messages.warning.unVerifiedReCaptcha")
                );
        },
        onHiding() {
            this.initFormData();
            this.$mf.popRouteHistoryState();
        },
        onFileChange(e) {
            this.formData.files = [];
            for (var i = 0; i < e.target.files.length; i++) {
                this.formData.files.push(
                    URL.createObjectURL(e.target.files[i])
                );
            }
        },
        initFormData() {
            this.formData = {
                userCode: 0,
                name: "",
                phone: "",
                subject: "",
                content: "",
                files: [],
            };
            this.isReCaptchaVerified = false;
        },
        onVerify: function (response) {
            this.isReCaptchaVerified = true;
        },
        onExpired: function () {
            this.isReCaptchaVerified = false;
        },
    },
};
</script>
<
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
