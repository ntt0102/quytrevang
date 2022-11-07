<template>
  <DxPopup
    ref="popup"
    :showCloseButton="true"
    :fullScreen="$devices.phone ? true : false"
    :show-title="true"
    :wrapperAttr="{ class: 'paying-contract-popup' }"
    :toolbarItems="[
      {
        toolbar: 'bottom',
        location: 'after',
        widget: 'dxButton',
        options: {
          text: $t(
            `components.payingContract.${
              contract.status == 0 ? 'paidButton' : 'changeReceiptButton'
            }`
          ),
          onClick: saveClick,
        },
      },
    ]"
    @hiding="onHiding"
  >
    <template #content>
      <DxScrollView>
        <form @submit.prevent="onSubmit">
          <button ref="submit" class="display-none" />
          <div class="caution">
            <div>{{ $t("titles.caution") }}:</div>
            <div>
              &nbsp;- {{ $t("components.payingContract.paidDateCaution") }}
            </div>
            <div>&nbsp;- {{ $t("components.payingContract.timeCaution") }}</div>
          </div>
          <DxAccordion
            ref="accordion"
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
                    <Photoswipe
                      v-if="!!qrSrc"
                      @opened="$mf.pushPhotoswipeToHistoryState"
                      @close="$mf.popRouteHistoryState"
                    >
                      <div>
                        <img :src="qrSrc" v-pswp="qrSrc" :alt="$appName" />
                        <DxButton
                          class="download-qr"
                          :text="$t('buttons.qrDownload')"
                          icon="download"
                          type="default"
                          styling-mode="text"
                          @click="downloadQR"
                        />
                      </div>
                    </Photoswipe>
                    <DxLoadIndicator v-else :height="40" :width="40" />
                  </div>
                  <div class="method2">
                    <div>
                      <span>{{ $t("models.user.bankName") }}:</span>
                      <span>{{ transferInfo.bank_name }}</span>
                    </div>
                    <div>
                      <span>{{ $t("models.user.accountName") }}:</span>
                      <span>{{ transferInfo.account_name }}</span>
                    </div>
                    <div>
                      <span>{{ $t("models.user.accountNumber") }}:</span>
                      <span
                        >{{ transferInfo.account_number }}
                        <i
                          class="far fa-copy"
                          @click="$mf.copyText(transferInfo.account_number)"
                        ></i
                      ></span>
                    </div>
                    <div>
                      <span>{{ $t("models.contract.transfer.amount") }}:</span>
                      <span
                        >{{ contract.principal | currency() }}
                        <i
                          class="far fa-copy"
                          @click="$mf.copyText(contract.principal)"
                        ></i
                      ></span>
                    </div>
                    <div>
                      <span>{{ $t("models.contract.transfer.content") }}:</span>
                      <span
                        >{{
                          $t("models.contract.transfer.contentValue").replace(
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
                              ).replace('{contractCode}', contract.code)
                            )
                          "
                        ></i
                      ></span>
                    </div>
                    <div class="text-darker">
                      {{ $t("models.contract.transfer.note") }}
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template #step2Template>
              <div class="upload">
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
                    {{ $t("titles.chooseImage") }}</label
                  >
                  <DxCheckBox
                    v-if="contract.status == 1"
                    id="contractDelete"
                    v-model="formData.isDelete"
                    :text="$t('titles.deleteOldImage')"
                    @valueChanged="onCheckBoxDeleteChange"
                  />
                </div>
                <Photoswipe
                  v-if="formData.documents.length"
                  @opened="$mf.pushPhotoswipeToHistoryState"
                  @close="$mf.popRouteHistoryState"
                >
                  <div
                    v-for="(image, index) in formData.documents"
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
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import DxAccordion from "devextreme-vue/accordion";
import DxLoadIndicator from "devextreme-vue/load-indicator";

export default {
  components: { DxAccordion, DxLoadIndicator },
  data() {
    return {
      formData: {},
      backupDocuments: [],
      contract: {},
      qrSrc: null,
    };
  },
  mounted() {
    this.initFormData();
  },
  computed: {
    ...mapGetters("User.contract", ["transferInfo"]),
    popup() {
      return this.$refs.popup.instance;
    },
    accordion() {
      return this.$refs.accordion.instance;
    },
  },
  methods: {
    ...mapActions("User.contract", ["payingContract"]),
    show(contract) {
      this.popup.option(
        "title",
        this.$t(
          `components.payingContract.${
            contract.status == 0 ? "title" : "changeReceiptTitle"
          }`
        ) +
          " #" +
          contract.code
      );
      this.contract = contract;
      this.popup.show();
      setTimeout(
        () => this.accordion.option("selectedIndex", contract.status),
        0
      );
      this.backupDocuments = contract.url_paid_docs.map((image) => ({
        file: image,
        isUpload: false,
      }));
      this.formData.documents = this.backupDocuments;
      let qrLink = `https://img.vietqr.io/image/${
        this.transferInfo.bank_name
      }-${this.transferInfo.account_number}-KRnx1D.jpg?accountName=${
        this.transferInfo.account_name
      }&amount=${this.contract.principal}&addInfo=${this.$t(
        "models.contract.transfer.contentValue"
      ).replace("{contractCode}", this.contract.code)}`;
      this.$mf.fetchImage(qrLink).then((image) => (this.qrSrc = image));
      this.$mf.pushPopupToHistoryState(() => this.popup.hide());
    },
    downloadQR() {
      let a = document.createElement("a");
      a.href = this.qrSrc;
      a.download = `vietQR_${this.contract.code}`;
      a.click();
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
      if (this.formData.documents.findIndex((image) => image.isUpload) != -1)
        this.$refs.submit.click();
      else this.$toasted.show(this.$t("messages.info.noUploadImage"));
    },
    onSubmit() {
      this.$bus.emit("checkPin", async () => {
        let formData = new FormData();
        formData.append("contractId", this.contract.id);
        formData.append("type", this.type);
        formData.append("isDelete", this.formData.isDelete);
        for (var i = 0; i < this.$refs.receiptImage.files.length; i++) {
          let file = await this.$mf.resizeImage({
            file: this.$refs.receiptImage.files[i],
            maxSize: this.$mc.MAX_SIZE_IMAGE_UPLOAD,
          });
          formData.append(`receiptImages[${i}]`, file);
        }
        this.payingContract(formData).then((isOk) => {
          if (isOk) this.popup.hide();
        });
      });
    },
    initFormData() {
      this.formData = {
        isDelete: false,
        documents: [],
      };
      this.qrSrc = null;
    },
    onHiding() {
      this.$mf.popRouteHistoryState();
      this.initFormData();
    },
  },
};
</script>
<style lang="scss">
@import "../../../sass/variables.scss";
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
}
body[screen-size="small"] {
  .paying-contract-popup {
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
