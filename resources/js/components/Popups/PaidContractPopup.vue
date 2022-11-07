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
            onClick: () => $refs.submit.click(),
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
      :wrapperAttr="{ class: 'confirm-contract-popup' }"
      @hiding="onHiding"
    >
      <template #content>
        <DxScrollView>
          <form @submit.prevent="onSubmit">
            <button ref="submit" class="display-none" />
            <DxAccordion
              ref="accordion"
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
                          $refs.pdf.download({
                            component: 'PayReceiptPdf',
                            contract: contract,
                            isPreview: formData.isPdfPreview,
                          })
                      "
                    />
                    <DxCheckBox
                      v-if="!$devices.phone"
                      v-model="formData.isPdfPreview"
                      :text="$t('components.paidContract.preview')"
                    />
                  </div>
                </div>
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
                      {{ $t("titles.chooseImage") }}</label
                    >
                    <DxCheckBox
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
            <div class="is-confirmed">
              <DxCheckBox
                v-model="formData.isConfirmed"
                :text="$t('components.paidContract.isConfirmed')"
              />
              <div v-if="!!contract.confirmed_by">
                ({{ $t("components.paidContract.confirmedBy") }}
                <RouterLink
                  :to="{
                    name: 'users',
                    query: { code: contract.confirmed_by },
                  }"
                  >#{{ contract.confirmed_by }}</RouterLink
                >)
              </div>
            </div>
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
import Pdf from "../Pdfs/Index.vue";

export default {
  components: { DxAccordion, Pdf },
  data() {
    return {
      refreshKey: 0,
      contract: {},
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
  },
  methods: {
    ...mapActions("Admin.contracts", ["paidContract"]),
    show(contract) {
      this.popup.option(
        "title",
        this.$t(
          `components.paidContract.${
            contract.status == 2 ? "confirmTitle" : "title"
          }`
        ) +
          " #" +
          contract.code
      );
      this.contract = contract;
      this.formData.isConfirmed = !!contract.confirmed_by;
      this.popup.show();
      setTimeout(
        () =>
          this.accordion.option("selectedIndex", contract.status == 0 ? 0 : 1),
        500
      );
      this.backupDocuments = contract.url_paid_docs.map((image) => ({
        file: image,
        isUpload: false,
      }));
      this.formData.documents = this.backupDocuments;
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
    onSubmit() {
      this.$bus.emit("checkPin", async () => {
        let formData = new FormData();
        formData.append("contractId", this.contract.id);
        formData.append("isDelete", this.formData.isDelete);
        formData.append("isConfirmed", this.formData.isConfirmed);
        if (!!this.$refs.receiptImage) {
          for (var i = 0; i < this.$refs.receiptImage.files.length; i++) {
            let file = await this.$mf.resizeImage({
              file: this.$refs.receiptImage.files[i],
              maxSize: this.$mc.MAX_SIZE_IMAGE_UPLOAD,
            });
            formData.append(`receiptImages[${i}]`, file);
          }
        }
        this.paidContract(formData).then((isOk) => {
          if (isOk) this.popup.hide();
        });
      });
    },
    initFormData() {
      this.formData = {
        isPdfPreview: false,
        isDelete: false,
        isConfirmed: false,
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
@import "../../../sass/variables.scss";
.confirm-contract-popup {
  .download {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .is-confirmed {
    margin: 20px;
    line-height: 2;
  }
}
body[screen-size="small"] {
  .confirm-contract-popup {
    .dx-popup-content {
      padding: 24px 0 !important;
    }
  }
}
</style>
