<template>
    <CorePopup
        ref="popupRef"
        class="withdrawn-contract-popup"
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
            <form @submit.prevent="onSubmit">
                <DxButton
                    ref="submitRef"
                    class="display-none"
                    :useSubmitBehavior="true"
                />
                <div class="amount">
                    <div
                        class="text-dark"
                        v-html="
                            $t('components.withdrawnContract.amount', [
                                $filters.currency(state.contract.advance),
                                $filters.currency(state.contract.total),
                            ])
                        "
                    ></div>
                    <div
                        class="text-dark"
                        v-if="state.contract.advance < state.contract.total"
                        v-html="
                            $t('components.withdrawnContract.surplus', [
                                $filters.currency(
                                    state.contract.total -
                                        state.contract.advance
                                ),
                            ])
                        "
                    ></div>
                </div>
                <DxAccordion
                    ref="accordionRef"
                    :collapsible="true"
                    :items="[
                        {
                            title: $t('components.withdrawnContract.step1'),
                            template: 'step1Template',
                        },
                        {
                            title: $t('components.withdrawnContract.step2'),
                            template: 'step2Template',
                        },
                    ]"
                >
                    <template #step1Template>
                        <DxAccordion
                            :collapsible="true"
                            :items="[
                                {
                                    title: $t(
                                        'components.withdrawnContract.withdrawnWay1'
                                    ),
                                    template: 'way1Template',
                                },
                                {
                                    title: $t(
                                        'components.withdrawnContract.withdrawnWay2'
                                    ),
                                    template: 'way2Template',
                                },
                            ]"
                        >
                            <template #way1Template>
                                <div class="way1">
                                    <div class="description text-darker">
                                        {{
                                            $t(
                                                "models.contract.transfer.qrCode"
                                            )
                                        }}
                                    </div>
                                    <div class="method">
                                        <div class="method1">
                                            <div v-if="!!state.qrSrc">
                                                <Photoswipe
                                                    :images="[state.qrSrc]"
                                                />
                                                <DxButton
                                                    class="download-qr"
                                                    :text="
                                                        $t('buttons.qrDownload')
                                                    "
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
                                                        $t(
                                                            "models.user.bankName"
                                                        )
                                                    }}:</span
                                                >
                                                <span>{{
                                                    state.contract.bank_account
                                                        .bank_name
                                                }}</span>
                                            </div>
                                            <div>
                                                <span
                                                    >{{
                                                        $t(
                                                            "models.user.accountName"
                                                        )
                                                    }}:</span
                                                >
                                                <span>{{
                                                    state.contract.bank_account
                                                        .account_name
                                                }}</span>
                                            </div>
                                            <div>
                                                <span
                                                    >{{
                                                        $t(
                                                            "models.user.accountNumber"
                                                        )
                                                    }}:</span
                                                >
                                                <span
                                                    >{{
                                                        state.contract
                                                            .bank_account
                                                            .account_number
                                                    }}
                                                    <i
                                                        class="far fa-copy"
                                                        @click="
                                                            $mf.copyText(
                                                                state.contract
                                                                    .bank_account
                                                                    .account_number
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
                                                            state.contract
                                                                .advance
                                                        )
                                                    }}
                                                    <i
                                                        class="far fa-copy"
                                                        @click="
                                                            $mf.copyText(
                                                                state.contract
                                                                    .advance
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
                                                            [
                                                                state.contract
                                                                    .code,
                                                            ]
                                                        )
                                                    }}
                                                    <i
                                                        class="far fa-copy"
                                                        @click="
                                                            $mf.copyText(
                                                                $t(
                                                                    'models.contract.transfer.contentValue',
                                                                    [
                                                                        state
                                                                            .contract
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
                                                    $t(
                                                        "models.contract.transfer.note"
                                                    )
                                                }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template #way2Template>
                                <div class="download way2">
                                    <DxButton
                                        :text="$t('buttons.receiptDownload')"
                                        icon="download"
                                        type="default"
                                        styling-mode="contained"
                                        @click="
                                            () =>
                                                $refs.pdfRef.download({
                                                    component:
                                                        'WithdrawReceiptPdf',
                                                    contract: state.contract,
                                                    isPreview:
                                                        state.formData
                                                            .isPdfPreview,
                                                })
                                        "
                                    />
                                    <DxCheckBox
                                        v-if="
                                            !$screen.getScreenSizeInfo.isXSmall
                                        "
                                        v-model="state.formData.isPdfPreview"
                                        :text="
                                            $t(
                                                'components.withdrawnContract.preview'
                                            )
                                        "
                                    />
                                </div>
                            </template>
                        </DxAccordion>
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
            </form>
        </DxScrollView>
    </CorePopup>

    <Pdf ref="pdfRef" v-if="$mf.isSet(state.contract)" />
</template>
<script setup>
import DxAccordion from "devextreme-vue/accordion";
import { DxLoadIndicator } from "devextreme-vue/load-indicator";
import Pdf from "../../../components/Pdfs/Index.vue";

import CorePopup from "../../../components/Popups/CorePopup.vue";
import Photoswipe from "../../../components/Photoswipe.vue";
import { ref, reactive, computed, inject } from "vue";
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
const receiptImageRef = ref(null);
const state = reactive({
    refreshKey: 0,
    contract: {},
    formData: {},
    qrSrc: null,
});
let backupDocuments = [];
const images = computed(() => {
    return new Set(state.formData.documents.map((d) => d.file));
});
initFormData();

function show(contract) {
    popupRef.value.setTitle(
        t(
            `components.withdrawnContract.${
                contract.status == 4 ? "withdrawnTitle" : "title"
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
function saveClick() {
    if (!state.formData.isDelete && receiptImageRef.value.files.length == 0)
        toast.info(t("messages.info.noChangedData"));
    else submitRef.value.instance.element().click();
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
        store
            .dispatch("adminContract/withdrawnContract", formData)
            .then((isOk) => {
                if (isOk) popupRef.value.hide();
            });
    });
}
function downloadQR() {
    let a = document.createElement("a");
    a.href = state.qrSrc;
    a.download = `vietQR_${state.contract.code}`;
    a.click();
}
function initFormData() {
    state.formData = {
        isPdfPreview: false,
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
                state.contract.status == 3 ? 0 : 1
            ),
        500
    );
    backupDocuments = state.contract.url_withdrawn_docs.map((image) => ({
        file: image,
        isUpload: false,
    }));
    state.formData.documents = backupDocuments;
    let qrLink = `https://img.vietqr.io/image/${
        state.contract.bank_account.bank_name
    }-${state.contract.bank_account.account_number}-KRnx1D.jpg?accountName=${
        state.contract.bank_account.account_name
    }&amount=${state.contract.advance}&addInfo=${t(
        "models.contract.transfer.contentValue",
        [state.contract.code]
    )}`;
    mf.fetchImage(qrLink).then((image) => (state.qrSrc = image));
}
function onHidden() {
    initFormData();
    state.refreshKey++;
}
defineExpose({ show });
</script>
<style lang="scss">
@import "../../../../sass/variables.scss";
.withdrawn-contract-popup {
    .amount {
        line-height: 30px;
    }
    .way1 {
        .description {
            font-size: 16px;
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
    .way2 {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .screen-x-small & {
        .dx-popup-content {
            padding: 24px 0 !important;
        }

        .amount {
            padding-left: 20px;
        }

        .way1 .method {
            flex-direction: column;
            align-items: center;
        }

        .way2 {
            justify-content: center;
        }
    }
}
</style>
