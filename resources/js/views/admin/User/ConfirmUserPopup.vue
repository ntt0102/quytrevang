<template>
    <div>
        <DxPopup
            ref="popup"
            :showCloseButton="true"
            :fullScreen="$devices.phone ? true : false"
            :show-title="true"
            :toolbarItems="[
                {
                    toolbar: 'bottom',
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        text: $t('buttons.save'),
                        onClick: saveClick,
                    },
                },
                {
                    toolbar: 'bottom',
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        text: $t('buttons.cancel'),
                        onClick: () => $refs.submit.click(),
                    },
                },
            ]"
            :wrapperAttr="{ class: 'confirm-user-popup' }"
            @hiding="onHiding"
        >
            <template #content>
                <DxScrollView>
                    <DxAccordion
                        ref="accordion"
                        :collapsible="true"
                        :items="[
                            {
                                title: $t('components.confirmUser.step1'),
                                template: 'step1Template',
                            },
                            {
                                title: $t('components.confirmUser.step2'),
                                template: 'step2Template',
                            },
                        ]"
                    >
                        <template #step1Template>
                            <div class="download">
                                <DxButton
                                    :text="$t('buttons.download')"
                                    icon="download"
                                    type="default"
                                    styling-mode="contained"
                                    @click="
                                        () =>
                                            $refs.pdf.download({
                                                component: 'ContractPdf',
                                                user: user,
                                                isPreview:
                                                    formData.isPdfPreview,
                                            })
                                    "
                                />
                                <DxCheckBox
                                    v-if="!$devices.phone"
                                    v-model="formData.isPdfPreview"
                                    :text="$t('components.confirmUser.preview')"
                                />
                            </div>
                        </template>
                        <template #step2Template>
                            <form @submit.prevent="onSubmit">
                                <DxButton
                                    ref="submit"
                                    class="display-none"
                                    :useSubmitBehavior="true"
                                />
                                <div class="upload" :key="refreshKey">
                                    <div class="upload-browser">
                                        <input
                                            ref="contractImage"
                                            type="file"
                                            id="contractImage"
                                            multiple="multiple"
                                            accept="images/*"
                                            @change="onUploadImageChange"
                                        />
                                        <label for="contractImage"
                                            ><i class="far fa-file-upload"></i>
                                            {{
                                                $t(
                                                    "components.confirmUser.chooseContractImage"
                                                )
                                            }}</label
                                        >
                                        <DxCheckBox
                                            id="contractDelete"
                                            v-model="formData.isContractDelete"
                                            :text="$t('titles.deleteOldImage')"
                                            @valueChanged="
                                                onCheckBoxDeleteChange
                                            "
                                        />
                                    </div>
                                    <div class="upload-browser">
                                        <input
                                            ref="identityImage"
                                            type="file"
                                            id="identityImage"
                                            multiple="multiple"
                                            accept="images/*"
                                            @change="onUploadImageChange"
                                        />
                                        <label for="identityImage"
                                            ><i class="far fa-file-upload"></i>
                                            {{
                                                $t(
                                                    "components.confirmUser.chooseIdentityImage"
                                                )
                                            }}</label
                                        >
                                        <DxCheckBox
                                            id="identityDelete"
                                            v-model="formData.isIdentityDelete"
                                            :text="$t('titles.deleteOldImage')"
                                            @valueChanged="
                                                onCheckBoxDeleteChange
                                            "
                                        />
                                    </div>
                                    <!-- <Photoswipe
                                        v-if="formData.documents.length"
                                        @opened="
                                            $mf.pushPhotoswipeToHistoryState
                                        "
                                        @close="$mf.popRouteHistoryState"
                                    >
                                        <div
                                            v-for="(
                                                image, index
                                            ) in formData.documents"
                                            :key="index"
                                        >
                                            <img
                                                :src="image.file"
                                                v-pswp="image.file"
                                                :alt="$appName"
                                            />
                                        </div>
                                    </Photoswipe> -->
                                </div>
                            </form>
                        </template>
                    </DxAccordion>
                </DxScrollView>
            </template>
        </DxPopup>
        <Pdf ref="pdf" v-if="$mf.isSet(user)" />
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import DxAccordion from "devextreme-vue/accordion";
import Pdf from "../../../components/Pdfs/Index.vue";

export default {
    components: { DxAccordion, Pdf },
    data() {
        return {
            refreshKey: 0,
            user: {},
            formData: {},
            backupDocuments: [],
        };
    },
    mounted() {
        this.initFormData();
    },
    computed: {
        popup() {
            return this.$refs.popup.instance;
        },
        accordion() {
            return this.$refs.accordion.instance;
        },
        submit() {
            return this.$refs.submit.instance;
        },
    },
    methods: {
        ...mapActions("Admin.users", ["uploadDocuments"]),
        show({ user }) {
            this.popup.option(
                "title",
                this.$t(
                    `components.confirmUser.${
                        user.level == 4 ? "title" : "confirmedTitle"
                    }`
                ) +
                    " #" +
                    user.code
            );
            this.user = user;
            this.popup.show();
            setTimeout(
                () =>
                    this.accordion.option(
                        "selectedIndex",
                        user.level == 4 ? 0 : 1
                    ),
                0
            );
            this.backupDocuments = user.url_documents.map((image) => ({
                ...image,
                ...{ isUpload: false },
            }));
            this.formData.documents = this.backupDocuments;
            this.$mf.pushPopupToHistoryState(() => this.popup.hide());
        },
        onUploadImageChange(e) {
            let type = e.target.id.replace("Image", "");
            this.formData.documents = this.formData.documents.filter(
                (image) => !(image.type == type && image.isUpload)
            );
            console.log("onUploadImageChange", e.target.files);
            [...e.target.files].forEach((file) =>
                this.formData.documents.push({
                    type: type,
                    file: URL.createObjectURL(file),
                    isUpload: true,
                })
            );
        },
        onCheckBoxDeleteChange(e) {
            let type = e.element.id.replace("Delete", "");
            if (e.value)
                this.formData.documents = this.formData.documents.filter(
                    (image) => !(image.type == type && !image.isUpload)
                );
            else
                this.formData.documents = this.backupDocuments
                    .filter((image) => image.type == type)
                    .concat(this.formData.documents);
        },
        saveClick() {
            if (
                !this.formData.isContractDelete &&
                !this.formData.isIdentityDelete &&
                this.$refs.contractImage.files.length == 0 &&
                this.$refs.identityImage.files.length == 0
            )
                this.$toasted.info(this.$t("messages.info.noChangedData"));
            else if (this.formData.documents.length == 0)
                this.$toasted.show(this.$t("messages.warning.imageEmpty"));
            else this.submit.element().click();
        },
        onSubmit() {
            this.$bus.emit("checkPin", async () => {
                let formData = new FormData();
                formData.append("userId", this.user.id);
                formData.append(
                    "isContractDelete",
                    this.formData.isContractDelete
                );
                formData.append(
                    "isIdentityDelete",
                    this.formData.isIdentityDelete
                );
                for (
                    var i = 0;
                    i < this.$refs.contractImage.files.length;
                    i++
                ) {
                    let file = await this.$mf.resizeImage({
                        file: this.$refs.contractImage.files[i],
                        maxSize: this.$mc.MAX_SIZE_IMAGE_UPLOAD,
                    });
                    formData.append(`contractImages[${i}]`, file);
                }
                for (
                    var i = 0;
                    i < this.$refs.identityImage.files.length;
                    i++
                ) {
                    let file = await this.$mf.resizeImage({
                        file: this.$refs.identityImage.files[i],
                        maxSize: this.$mc.MAX_SIZE_IMAGE_UPLOAD,
                    });
                    formData.append(`identityImages[${i}]`, file);
                }
                this.uploadDocuments(formData).then((isOk) => {
                    if (isOk) this.popup.hide();
                });
            });
        },
        initFormData() {
            this.formData = {
                isPdfPreview: false,
                isContractDelete: false,
                isIdentityDelete: false,
                documents: [],
            };
        },
        onHiding() {
            this.initFormData();
            this.refreshKey++;
            this.$mf.popRouteHistoryState();
        },
    },
};
</script>
<style lang="scss">
@import "../../../../sass/variables.scss";
.confirm-user-popup {
    .download {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .upload {
        margin-top: 10px;

        .upload-browser {
            border: solid 1px darken(white, 70);
        }
    }
}
body[screen-size="small"] {
    .confirm-user-popup {
        .dx-popup-content {
            padding: 24px 0 !important;

            .download {
                justify-content: center;
            }
        }
    }
}
</style>
