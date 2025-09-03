<template>
    <CorePopup
        ref="popupRef"
        class="paying-contract-popup"
        :toolbarItems="[
            {
                toolbar: 'bottom',
                location: 'after',
                widget: 'dxButton',
                options: {
                    text: $t(
                        `components.payingContract.${
                            state.contract.status == 0
                                ? 'paidButton'
                                : 'changeReceiptButton'
                        }`
                    ),
                    onClick: saveClick,
                },
            },
        ]"
        @shown="onShown"
        @hidden="onHidden"
    >
        <DxScrollView>
            <form @submit.prevent="onSubmit">
                <button ref="submitRef" class="display-none" />
                <div class="caution">
                    <div>{{ $t("titles.caution") }}:</div>
                    <div>
                        &nbsp;-
                        {{ $t("components.payingContract.paidDateCaution") }}
                    </div>
                    <div>
                        &nbsp;-
                        {{ $t("components.payingContract.timeCaution") }}
                    </div>
                </div>
                <DxAccordion
                    ref="accordionRef"
                    :collapsible="true"
                    :items="[
                        {
                            title: $t('components.payingContract.step1'),
                            template: 'step1Template',
                        },
                        {
                            title: $t('components.payingContract.step2'),
                            template: 'step2Template',
                        },
                    ]"
                >
                    <template #step1Template>
                        <div class="step1">
                            <div class="description text-darker">
                                {{ $t("models.contract.transfer.qrCode") }}
                            </div>
                            <div class="method">
                                <div class="method1">
                                    <div v-if="!!state.qrSrc">
                                        <Photoswipe :images="[state.qrSrc]" />
                                        <DxButton
                                            class="download-qr"
                                            :text="$t('buttons.qrDownload')"
                                            icon="download"
                                            type="default"
                                            styling-mode="text"
                                            @click="downloadQR"
                                        />
                                    </div>
                                    <DxLoadIndicator
                                        v-else
                                        :height="40"
                                        :width="40"
                                    />
                                </div>
                                <div class="method2">
                                    <div>
                                        <span
                                            >{{
                                                $t("models.user.bankName")
                                            }}:</span
                                        >
                                        <span>{{
                                            transferInfo.bank_name
                                        }}</span>
                                    </div>
                                    <div>
                                        <span
                                            >{{
                                                $t("models.user.accountName")
                                            }}:</span
                                        >
                                        <span>{{
                                            transferInfo.account_name
                                        }}</span>
                                    </div>
                                    <div>
                                        <span
                                            >{{
                                                $t("models.user.accountNumber")
                                            }}:</span
                                        >
                                        <span
                                            >{{ transferInfo.account_number }}
                                            <i
                                                class="far fa-copy"
                                                @click="
                                                    $mf.copyText(
                                                        transferInfo.account_number
                                                    )
                                                "
                                            ></i
                                        ></span>
                                    </div>
                                    <div>
                                        <span
                                            >{{
                                                $t(
                                                    "models.contract.transfer.amount"
                                                )
                                            }}:</span
                                        >
                                        <span
                                            >{{
                                                $filters.currency(
                                                    state.contract.principal
                                                )
                                            }}
                                            <i
                                                class="far fa-copy"
                                                @click="
                                                    $mf.copyText(
                                                        state.contract.principal
                                                    )
                                                "
                                            ></i
                                        ></span>
                                    </div>
                                    <div>
                                        <span
                                            >{{
                                                $t(
                                                    "models.contract.transfer.content"
                                                )
                                            }}:</span
                                        >
                                        <span
                                            >{{
                                                $t(
                                                    "models.contract.transfer.contentValue",
                                                    [state.contract.code]
                                                )
                                            }}
                                            <i
                                                class="far fa-copy"
                                                @click="
                                                    $mf.copyText(
                                                        $t(
                                                            'models.contract.transfer.contentValue',
                                                            [
                                                                state.contract
                                                                    .code,
                                                            ]
                                                        )
                                                    )
                                                "
                                            ></i
                                        ></span>
                                    </div>
                                    <div class="text-darker">
                                        {{
                                            $t("models.contract.transfer.note")
                                        }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template #step2Template>
                        <div class="upload">
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
                                    v-if="state.contract.status == 1"
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
            </form>
        </DxScrollView>
    </CorePopup>
</template>
<script setup>
import DxAccordion from "devextreme-vue/accordion";
import DxLoadIndicator from "devextreme-vue/load-indicator";
import CorePopup from "../../../../components/Popups/CorePopup.vue";
import Photoswipe from "../../../../components/Photoswipe.vue";
import { inject, ref, reactive, onMounted, computed } from "vue";
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
const state = reactive({
    formData: {},
    contract: {},
    qrSrc: null,
});
let backupDocuments = [];
const images = computed(() => {
    return new Set(state.formData.documents.map((d) => d.file));
});
const transferInfo = computed(() => store.state.userContract.transferInfo);

onMounted(() => initFormData());
function show(contract) {
    popupRef.value.setTitle(
        t(
            `components.payingContract.${
                contract.status == 0 ? "title" : "changeReceiptTitle"
            }`
        ) +
            " #" +
            contract.code
    );
    state.contract = contract;
    popupRef.value.show();
}
function downloadQR() {
    let a = document.createElement("a");
    a.href = state.qrSrc;
    a.download = `vietQR_${state.contract.code}`;
    a.click();
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
function saveClick() {
    if (state.formData.documents.findIndex((image) => image.isUpload) != -1)
        submitRef.value.click();
    else toast.show(t("messages.info.noUploadImage"));
}
function onSubmit() {
    bus.emit("checkPin", async () => {
        let formData = new FormData();
        formData.append("contractId", state.contract.id);
        formData.append("isDelete", state.formData.isDelete);
        for (var i = 0; i < receiptImageRef.value.files.length; i++) {
            let file = await mf.resizeImage({
                file: receiptImageRef.value.files[i],
                maxSize: mc.MAX_SIZE_IMAGE_UPLOAD,
            });
            formData.append(`receiptImages[${i}]`, file);
        }
        store.dispatch("userContract/payingContract", formData).then((isOk) => {
            if (isOk) popupRef.value.hide();
        });
    });
}
function initFormData() {
    state.formData = {
        isDelete: false,
        documents: [],
    };
    state.qrSrc = null;
}
function onShown() {
    setTimeout(
        () =>
            accordionRef.value.instance.option(
                "selectedIndex",
                state.contract.status
            ),
        0
    );
    backupDocuments = state.contract.url_paid_docs.map((image) => ({
        file: image,
        isUpload: false,
    }));
    state.formData.documents = backupDocuments;
    let qrLink = `https://img.vietqr.io/image/${transferInfo.value.bank_name}-${
        transferInfo.value.account_number
    }-KRnx1D.jpg?accountName=${transferInfo.value.account_name}&amount=${
        state.contract.principal
    }&addInfo=${t("models.contract.transfer.contentValue", [
        state.contract.code,
    ])}`;
    mf.fetchImage(qrLink).then((image) => (state.qrSrc = image));
}
function onHidden() {
    initFormData();
}

defineExpose({ show });
</script>
<style lang="scss">
@import "../../../../../sass/variables.scss";
.paying-contract-popup {
    .caution {
        padding: 10px;
        color: lighten(red, 10);
        font-weight: bold;
    }
    .step1 {
        .description {
            font-size: 16px;
            margin-bottom: 10px;
        }

        .method {
            display: flex;
            justify-content: space-around;

            .method1 {
                width: 200px;
                text-align: center;

                .photoswipe > a {
                    max-width: calc(100% - 20px);
                }

                .dx-button-text {
                    text-transform: unset !important;
                }
            }

            .method2 {
                font-size: 16px;
                line-height: 30px;
                margin-top: 15px;

                & > div {
                    display: flex;

                    > span {
                        &:first-child {
                            color: darken(white, 30);
                            width: 120px;
                        }
                        &:last-child {
                            font-size: 18px;
                            &.name {
                                font-weight: bold;
                            }
                        }
                    }
                }

                .fa-copy {
                    cursor: pointer;
                    color: $base-accent;
                }
            }
        }
    }
    .screen-x-small & {
        .dx-popup-content {
            padding: 24px 0 !important;
        }
        .step1 .method {
            flex-direction: column;
            align-items: center;
        }
    }
}
</style>
