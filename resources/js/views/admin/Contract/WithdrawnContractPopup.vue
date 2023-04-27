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
            :wrapperAttr="{ class: 'confirm-contract-popup' }"
            @hiding="onHiding"
        >
            <template #content>
                <DxScrollView>
                    <form @submit.prevent="onSubmit">
                        <DxButton
                            ref="submit"
                            class="display-none"
                            :useSubmitBehavior="true"
                        />
                        <div class="amount">
                            <div>
                                <span class="text-dark">{{
                                    $t("components.withdrawnContract.amount")
                                }}</span>
                                <b>{{ contract.advance | currency }}</b>
                                <span class="text-dark">/</span>
                                <span class="text-dark">{{
                                    contract.total | currency
                                }}</span>
                            </div>
                            <div v-if="contract.advance < contract.total">
                                <span class="text-dark">{{
                                    $t("components.withdrawnContract.surplus")
                                }}</span>
                                <span>{{
                                    (contract.total - contract.advance)
                                        | currency
                                }}</span>
                                <span class="text-dark">{{
                                    $t(
                                        "components.withdrawnContract.newContract"
                                    )
                                }}</span>
                            </div>
                        </div>
                        <DxAccordion
                            ref="accordion"
                            :collapsible="true"
                            :items="[
                                {
                                    title: $t(
                                        'components.withdrawnContract.step1'
                                    ),
                                    template: 'step1Template',
                                },
                                {
                                    title: $t(
                                        'components.withdrawnContract.step2'
                                    ),
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
                                            <div
                                                class="description text-darker"
                                            >
                                                {{
                                                    $t(
                                                        "models.contract.transfer.qrCode"
                                                    )
                                                }}
                                            </div>
                                            <div class="method">
                                                <div class="method1">
                                                    <Photoswipe
                                                        v-if="!!qrSrc"
                                                        @opened="
                                                            $mf.pushPhotoswipeToHistoryState
                                                        "
                                                        @close="
                                                            $mf.popRouteHistoryState
                                                        "
                                                    >
                                                        <div>
                                                            <img
                                                                :src="qrSrc"
                                                                v-pswp="qrSrc"
                                                                :alt="$appName"
                                                            />
                                                            <DxButton
                                                                class="download-qr"
                                                                :text="
                                                                    $t(
                                                                        'buttons.qrDownload'
                                                                    )
                                                                "
                                                                icon="download"
                                                                type="default"
                                                                styling-mode="text"
                                                                @click="
                                                                    downloadQR
                                                                "
                                                            />
                                                        </div>
                                                    </Photoswipe>
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
                                                            contract
                                                                .bank_account
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
                                                            contract
                                                                .bank_account
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
                                                                contract
                                                                    .bank_account
                                                                    .account_number
                                                            }}
                                                            <i
                                                                class="far fa-copy"
                                                                @click="
                                                                    $mf.copyText(
                                                                        contract
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
                                                                contract.advance
                                                                    | currency()
                                                            }}
                                                            <i
                                                                class="far fa-copy"
                                                                @click="
                                                                    $mf.copyText(
                                                                        contract.advance
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
                                                                    "models.contract.transfer.contentValue"
                                                                ).replace(
                                                                    "{contractCode}",
                                                                    contract.code
                                                                )
                                                            }}
                                                            <i
                                                                class="far fa-copy"
                                                                @click="
                                                                    $mf.copyText(
                                                                        $t(
                                                                            'models.contract.transfer.contentValue'
                                                                        ).replace(
                                                                            '{contractCode}',
                                                                            contract.code
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
                                                :text="
                                                    $t(
                                                        'buttons.receiptDownload'
                                                    )
                                                "
                                                icon="download"
                                                type="default"
                                                styling-mode="contained"
                                                @click="
                                                    () =>
                                                        $refs.pdf.download({
                                                            component:
                                                                'WithdrawReceiptPdf',
                                                            contract: contract,
                                                            isPreview:
                                                                formData.isPdfPreview,
                                                        })
                                                "
                                            />
                                            <DxCheckBox
                                                v-if="!$devices.phone"
                                                v-model="formData.isPdfPreview"
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
                                <div class="upload" :key="refreshKey">
                                    <div class="upload-browser">
                                        <input
                                            ref="receiptImage"
                                            type="file"
                                            id="receiptImage"
                                            multiple="multiple"
                                            accept="images/*"
                                            @change="onUploadImageChange"
                                        />
                                        <label for="receiptImage"
                                            ><i class="far fa-file-upload"></i>
                                            {{
                                                $t("titles.chooseImage")
                                            }}</label
                                        >
                                        <DxCheckBox
                                            id="contractDelete"
                                            v-model="formData.isDelete"
                                            :text="$t('titles.deleteOldImage')"
                                            @valueChanged="
                                                onCheckBoxDeleteChange
                                            "
                                        />
                                    </div>
                                    <Photoswipe
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
                                    </Photoswipe>
                                </div>
                            </template>
                        </DxAccordion>
                    </form>
                </DxScrollView>
            </template>
        </DxPopup>
        <Pdf ref="pdf" v-if="$mf.isSet(contract)" />
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import DxAccordion from "devextreme-vue/accordion";
import { DxLoadIndicator } from "devextreme-vue/load-indicator";
import Pdf from "../../../components/Pdfs/Index.vue";

export default {
    components: { DxAccordion, DxLoadIndicator, Pdf },
    data() {
        return {
            refreshKey: 0,
            contract: {},
            formData: {},
            backupDocuments: [],
            qrSrc: null,
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
        ...mapActions("Admin.contracts", ["withdrawnContract"]),
        show(contract) {
            this.popup.option(
                "title",
                this.$t(
                    `components.withdrawnContract.${
                        contract.status == 4 ? "withdrawnTitle" : "title"
                    }`
                ) +
                    " #" +
                    contract.code
            );
            this.contract = contract;
            this.popup.show();
            setTimeout(
                () =>
                    this.accordion.option(
                        "selectedIndex",
                        contract.status == 3 ? 0 : 1
                    ),
                500
            );
            this.backupDocuments = contract.url_withdrawn_docs.map((image) => ({
                file: image,
                isUpload: false,
            }));
            this.formData.documents = this.backupDocuments;
            let qrLink = `https://img.vietqr.io/image/${
                this.contract.bank_account.bank_name
            }-${
                this.contract.bank_account.account_number
            }-KRnx1D.jpg?accountName=${
                this.contract.bank_account.account_name
            }&amount=${this.contract.advance}&addInfo=${this.$t(
                "models.contract.transfer.contentValue"
            ).replace("{contractCode}", this.contract.code)}`;
            this.$mf.fetchImage(qrLink).then((image) => (this.qrSrc = image));

            this.$mf.pushPopupToHistoryState(() => this.popup.hide());
        },
        onUploadImageChange(e) {
            this.formData.documents = this.formData.documents.filter(
                (image) => !image.isUpload
            );
            [...e.target.files].forEach((file) =>
                this.formData.documents.push({
                    file: URL.createObjectURL(file),
                    isUpload: true,
                })
            );
        },
        onCheckBoxDeleteChange(e) {
            if (e.value)
                this.formData.documents = this.formData.documents.filter(
                    (image) => image.isUpload
                );
            else
                this.formData.documents = this.backupDocuments.concat(
                    this.formData.documents
                );
        },
        saveClick() {
            if (
                !this.formData.isDelete &&
                this.$refs.receiptImage.files.length == 0
            )
                this.$toasted.info(this.$t("messages.info.noChangedData"));
            else this.submit.element().click();
        },
        onSubmit() {
            this.$bus.emit("checkPin", async () => {
                let formData = new FormData();
                formData.append("contractId", this.contract.id);
                formData.append("isDelete", this.formData.isDelete);
                for (var i = 0; i < this.$refs.receiptImage.files.length; i++) {
                    let file = await this.$mf.resizeImage({
                        file: this.$refs.receiptImage.files[i],
                        maxSize: this.$mc.MAX_SIZE_IMAGE_UPLOAD,
                    });
                    formData.append(`receiptImages[${i}]`, file);
                }
                this.withdrawnContract(formData).then((isOk) => {
                    if (isOk) this.popup.hide();
                });
            });
        },
        downloadQR() {
            let a = document.createElement("a");
            a.href = this.qrSrc;
            a.download = `vietQR_${this.contract.code}`;
            a.click();
        },
        initFormData() {
            this.formData = {
                isPdfPreview: false,
                isDelete: false,
                documents: [],
            };
            this.qrSrc = null;
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
.confirm-contract-popup {
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

                .pswipe-gallery > div {
                    max-width: 100%;
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
}
body[screen-size="small"] {
    .confirm-contract-popup {
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
