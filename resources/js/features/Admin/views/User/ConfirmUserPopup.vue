<template>
    <CorePopup
        ref="popupRef"
        :title="$t('admin.users.deletedUsers')"
        class="confirm-user-popup"
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
                    onClick: () => popupRef.hide(),
                },
            },
        ]"
        @shown="onShown"
        @hidden="onHidden"
    >
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
                                    $refs.pdfRef.download({
                                        component: 'ContractPdf',
                                        user: state.user,
                                        isPreview: state.formData.isPdfPreview,
                                    })
                            "
                        />
                        <DxCheckBox
                            v-if="!$screen.getScreenSizeInfo.isXSmall"
                            v-model="state.formData.isPdfPreview"
                            :text="$t('components.confirmUser.preview')"
                        />
                    </div>
                </template>
                <template #step2Template>
                    <form @submit.prevent="onSubmit">
                        <button ref="submitRef" class="display-none" />
                        <div class="upload" :key="state.refreshKey">
                            <div class="upload-browser">
                                <input
                                    ref="contractImageRef"
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
                                    v-model="state.formData.isContractDelete"
                                    :text="$t('titles.deleteOldImage')"
                                    @valueChanged="onCheckBoxDeleteChange"
                                />
                            </div>
                            <div class="upload-browser">
                                <input
                                    ref="identityImageRef"
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
                                    v-model="state.formData.isIdentityDelete"
                                    :text="$t('titles.deleteOldImage')"
                                    @valueChanged="onCheckBoxDeleteChange"
                                />
                            </div>
                            <Photoswipe v-if="images.length" :images="images" />
                        </div>
                    </form>
                </template>
            </DxAccordion>
        </DxScrollView>
    </CorePopup>
    <Pdf ref="pdfRef" v-if="$mf.isSet(state.user)" />
</template>
<script setup>
import DxAccordion from "devextreme-vue/accordion";
import Pdf from "../../../../components/Pdfs/Index.vue";
import CorePopup from "../../../../components/Popups/CorePopup.vue";
import Photoswipe from "../../../../components/Photoswipe.vue";
import { inject, ref, reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";

const store = useStore();
const { t } = useI18n();
const bus = inject("bus");
const mc = inject("mc");
const mf = inject("mf");
const popupRef = ref(null);
const accordionRef = ref(null);
const submitRef = ref(null);
const contractImageRef = ref(null);
const identityImageRef = ref(null);
const state = reactive({
    refreshKey: 0,
    user: {},
    formData: {},
});
let backupDocuments = [];
const images = computed(() => {
    return new Set(state.formData.documents.map((d) => d.file));
});

onMounted(() => initFormData());

function show({ user }) {
    popupRef.value.setTitle(
        t(
            `components.confirmUser.${
                user.level == 4 ? "title" : "confirmedTitle"
            }`
        ) +
            " #" +
            user.code
    );
    popupRef.value.show();
    state.user = user;
}
function onUploadImageChange(e) {
    let type = e.target.id.replace("Image", "");
    state.formData.documents = state.formData.documents.filter(
        (image) => !(image.type == type && image.isUpload)
    );
    console.log("onUploadImageChange", e.target.files);
    [...e.target.files].forEach((file) =>
        state.formData.documents.push({
            type: type,
            file: URL.createObjectURL(file),
            isUpload: true,
        })
    );
}
function onCheckBoxDeleteChange(e) {
    let type = e.element.id.replace("Delete", "");
    if (e.value)
        state.formData.documents = state.formData.documents.filter(
            (image) => !(image.type == type && !image.isUpload)
        );
    else
        state.formData.documents = backupDocuments
            .filter((image) => image.type == type)
            .concat(state.formData.documents);
}
function saveClick() {
    if (
        !state.formData.isContractDelete &&
        !state.formData.isIdentityDelete &&
        contractImageRef.value.files.length == 0 &&
        identityImageRef.value.files.length == 0
    )
        toast.info(t("messages.info.noChangedData"));
    else if (state.formData.documents.length == 0)
        toast.show(t("messages.warning.imageEmpty"));
    else submitRef.value.click();
}
function onSubmit() {
    bus.emit("checkPin", async () => {
        let formData = new FormData();
        formData.append("userId", state.user.id);
        formData.append("isContractDelete", state.formData.isContractDelete);
        formData.append("isIdentityDelete", state.formData.isIdentityDelete);
        for (var i = 0; i < contractImageRef.value.files.length; i++) {
            let file = await mf.resizeImage({
                file: contractImageRef.value.files[i],
                maxSize: mc.MAX_SIZE_IMAGE_UPLOAD,
            });
            formData.append(`contractImages[${i}]`, file);
        }
        for (var i = 0; i < identityImageRef.value.files.length; i++) {
            let file = await mf.resizeImage({
                file: identityImageRef.value.files[i],
                maxSize: mc.MAX_SIZE_IMAGE_UPLOAD,
            });
            formData.append(`identityImages[${i}]`, file);
        }
        store.dispatch("adminUser/uploadDocuments", formData).then((isOk) => {
            if (isOk) popupRef.value.hide();
        });
    });
}
function initFormData() {
    state.formData = {
        isPdfPreview: false,
        isContractDelete: false,
        isIdentityDelete: false,
        documents: [],
    };
}
function onShown() {
    setTimeout(
        () =>
            accordionRef.value.instance.option(
                "selectedIndex",
                state.user.level == 4 ? 0 : 1
            ),
        0
    );
    backupDocuments = state.user.url_documents.map((image) => ({
        ...image,
        ...{ isUpload: false },
    }));
    state.formData.documents = backupDocuments;
}
function onHidden() {
    initFormData();
    state.refreshKey++;
}
defineExpose({ show });
</script>
<style lang="scss">
@import "../../../../../sass/variables.scss";
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

    .screen-x-small & {
        .dx-popup-content {
            padding: 24px 0 !important;

            .download {
                justify-content: center;
            }
        }
    }
}
</style>
