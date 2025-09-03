<template>
    <CorePopup
        ref="popupRef"
        class="paid-contract-popup"
        :toolbarItems="[
            {
                toolbar: 'bottom',
                location: 'after',
                widget: 'dxButton',
                options: {
                    text: $t('buttons.save'),
                    onClick: () => $refs.submitRef.click(),
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
            <form @submit.prevent="onSubmit">
                <button ref="submitRef" class="display-none" />
                <DxAccordion
                    ref="accordionRef"
                    :collapsible="true"
                    :selectedIndex="0"
                    :items="[
                        {
                            title: $t('components.paidContract.step1'),
                            template: 'step1Template',
                        },
                        {
                            title: $t('components.paidContract.step2'),
                            template: 'step2Template',
                        },
                    ]"
                >
                    <template #step1Template>
                        <div class="step1">
                            <div class="download">
                                <DxButton
                                    :text="$t('buttons.receiptDownload')"
                                    icon="download"
                                    type="default"
                                    styling-mode="contained"
                                    @click="
                                        () =>
                                            $refs.pdfRef.download({
                                                component: 'PayReceiptPdf',
                                                contract: state.contract,
                                                isPreview:
                                                    state.formData.isPdfPreview,
                                            })
                                    "
                                />
                                <DxCheckBox
                                    v-if="!$screen.getScreenSizeInfo.isXSmall"
                                    v-model="state.formData.isPdfPreview"
                                    :text="
                                        $t('components.paidContract.preview')
                                    "
                                />
                            </div>
                        </div>
                    </template>
                    <template #step2Template>
                        <div class="upload" :key="state.refreshKey">
                            <div class="upload-browser">
                                <input
                                    ref="receiptImageRef"
                                    type="file"
                                    id="receiptImage"
                                    multiple="multiple"
                                    accept="images/*"
                                    @change="onUploadImageChange"
                                />
                                <label for="receiptImage"
                                    ><i class="far fa-file-upload"></i>
                                    {{ $t("titles.chooseImage") }}</label
                                >
                                <DxCheckBox
                                    id="contractDelete"
                                    v-model="state.formData.isDelete"
                                    :text="$t('titles.deleteOldImage')"
                                    @valueChanged="onCheckBoxDeleteChange"
                                />
                            </div>
                            <Photoswipe v-if="images.length" :images="images" />
                        </div>
                    </template>
                </DxAccordion>
                <div class="is-confirmed">
                    <DxCheckBox
                        v-model="state.formData.isConfirmed"
                        :text="$t('components.paidContract.isConfirmed')"
                    />
                    <div v-if="!!state.contract.confirmed_by">
                        ({{ $t("components.paidContract.confirmedBy") }}
                        <RouterLink
                            :to="{
                                name: 'users',
                                query: { code: state.contract.confirmed_by },
                            }"
                            >#{{ state.contract.confirmed_by }}</RouterLink
                        >)
                    </div>
                </div>
            </form>
        </DxScrollView>
    </CorePopup>
    <Pdf ref="pdfRef" v-if="$mf.isSet(state.contract)" />
</template>
<script setup>
import DxAccordion from "devextreme-vue/accordion";
import Pdf from "../../../../components/Pdfs/Index.vue";
import CorePopup from "../../../../components/Popups/CorePopup.vue";
import Photoswipe from "../../../../components/Photoswipe.vue";
import { ref, reactive, computed, inject } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
const bus = inject("bus");
const mc = inject("mc");
const mf = inject("mf");
const popupRef = ref(null);
const accordionRef = ref(null);
const receiptImageRef = ref(null);
const state = reactive({
    refreshKey: 0,
    contract: {},
    formData: {},
});
let backupDocuments = [];
const images = computed(() => {
    return new Set(state.formData.documents.map((d) => d.file));
});
initFormData();

function show(contract) {
    popupRef.value.setTitle(
        t(
            `components.paidContract.${
                contract.status == 2 ? "confirmTitle" : "title"
            }`
        ) +
            " #" +
            contract.code
    );
    popupRef.value.show();
    state.contract = contract;
}
function onUploadImageChange(e) {
    state.formData.documents = state.formData.documents.filter(
        (image) => !image.isUpload
    );
    [...e.target.files].forEach((file) =>
        state.formData.documents.push({
            file: URL.createObjectURL(file),
            isUpload: true,
        })
    );
}
function onCheckBoxDeleteChange(e) {
    if (e.value)
        state.formData.documents = state.formData.documents.filter(
            (image) => image.isUpload
        );
    else
        state.formData.documents = backupDocuments.concat(
            state.formData.documents
        );
}
function onSubmit() {
    bus.emit("checkPin", async () => {
        let formData = new FormData();
        formData.append("contractId", state.contract.id);
        formData.append("isDelete", state.formData.isDelete);
        formData.append("isConfirmed", state.formData.isConfirmed);
        if (!!receiptImageRef.value) {
            for (var i = 0; i < receiptImageRef.value.files.length; i++) {
                let file = await mf.resizeImage({
                    file: receiptImageRef.value.files[i],
                    maxSize: mc.MAX_SIZE_IMAGE_UPLOAD,
                });
                formData.append(`receiptImages[${i}]`, file);
            }
        }
        store.dispatch("adminContract/paidContract", formData).then((isOk) => {
            if (isOk) popupRef.value.hide();
        });
    });
}
function initFormData() {
    state.formData = {
        isPdfPreview: false,
        isDelete: false,
        isConfirmed: false,
        documents: [],
    };
}

function onShown() {
    state.formData.isConfirmed = !!state.contract.confirmed_by;
    setTimeout(
        () =>
            accordionRef.value.instance.option(
                "selectedIndex",
                state.contract.status == 0 ? 0 : 1
            ),
        500
    );
    backupDocuments = state.contract.url_paid_docs.map((image) => ({
        file: image,
        isUpload: false,
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
.paid-contract-popup {
    .download {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .is-confirmed {
        margin: 20px;
        line-height: 2;
    }

    .screen-x-small & {
        .dx-popup-content {
            padding: 24px 0 !important;
        }
    }
}
</style>
