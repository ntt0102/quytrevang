<template>
  <DxPopup
    ref="popup"
    :showCloseButton="true"
    :fullScreen="$devices.phone ? true : false"
    :show-title="true"
    @hiding="$mf.popRouteHistoryState"
  >
    <template #content>
      <div>
        <DxForm
          ref="form"
          class="user-detail-form"
          :form-data="formData"
          :col-count="2"
          :read-only="true"
          :label-location="$devices.phone ? 'top' : 'left'"
          :scrolling-enabled="true"
        >
          <DxItem
            item-type="group"
            :caption="$t('models.user.groups.personalInfo')"
          >
            <DxItem
              data-field="name"
              :label="{ text: $t('models.user.name') }"
            />
            <DxItem
              data-field="sex"
              editor-type="dxSelectBox"
              :editor-options="{
                items: $mf.getSexList(),
                displayExpr: 'name',
                valueExpr: 'value',
              }"
              :label="{ text: $t('models.user.sex') }"
            />
            <DxItem
              data-field="birthday"
              editor-type="dxDateBox"
              :label="{ text: $t('models.user.birthday') }"
            />
          </DxItem>
          <DxItem item-type="group" :caption="$t('models.user.groups.idInfo')">
            <DxItem
              data-field="identity.number"
              :label="{ text: $t('models.user.idNumber') }"
            />
            <DxItem
              data-field="identity.issued_on"
              editor-type="dxDateBox"
              :label="{ text: $t('models.user.idIssuedOn') }"
            />
            <DxItem
              data-field=""
              :editorOptions="{
                value: $mt.idIssuedAtValue,
              }"
              :label="{ text: $t('models.user.idIssuedAt') }"
            />
          </DxItem>
          <DxItem
            item-type="group"
            :col-span="2"
            :col-count="2"
            :caption="$t('models.user.groups.contactInfo')"
          >
            <DxItem
              data-field="phone"
              :editorOptions="{
                mask: !!formData.phone ? '0000.000.000' : null,
              }"
              :label="{ text: $t('models.user.phone') }"
            />
            <DxItem
              data-field="email"
              :label="{ text: $t('models.user.email') }"
            />
            <DxItem
              :col-span="2"
              data-field="address"
              :label="{ text: $t('models.user.address') }"
            />
          </DxItem>
          <DxItem
            item-type="group"
            :col-span="2"
            :caption="$t('models.user.groups.bankInfo')"
          >
            <DxItem
              data-field="bank_account.bank_name"
              :label="{ text: $t('models.user.bankName') }"
            />
            <DxItem
              data-field="bank_account.account_number"
              :label="{ text: $t('models.user.accountNumber') }"
            />
            <DxItem
              data-field="bank_account.account_name"
              :label="{ text: $t('models.user.accountName') }"
            />
          </DxItem>
          <DxItem
            :visible="hasConfirmedDocs"
            item-type="group"
            :col-span="2"
            :caption="$t('models.user.groups.confirmDocuments')"
          >
            <DxItem>
              <template #default>
                <Photoswipe
                  @opened="$mf.pushPhotoswipeToHistoryState"
                  @close="$mf.popRouteHistoryState"
                >
                  <div
                    v-for="(image, index) in formData.url_documents"
                    :key="index"
                  >
                    <img
                      :src="image.file"
                      v-pswp="image.file"
                      :alt="$appName"
                    />
                  </div>
                </Photoswipe>
              </template>
            </DxItem>
          </DxItem>
        </DxForm>
        <DxLoadPanel
          :position="{ of: '.user-detail-form' }"
          :visible="isLoading"
          :shading="false"
        />
      </div>
    </template>
  </DxPopup>
</template>
<script>
import { DxForm, DxItem, DxTab } from "devextreme-vue/form";
import DxTextArea from "devextreme-vue/text-area";

export default {
  components: {
    DxForm,
    DxItem,
    DxTab,
    DxTextArea,
  },
  data() {
    return {
      isLoading: false,
      formData: { url_documents: [] },
    };
  },
  computed: {
    popup() {
      return this.$refs.popup.instance;
    },
    hasConfirmedDocs() {
      return this.formData.url_documents.length > 0;
    },
  },
  methods: {
    show({ user, getUser }) {
      if (!user) {
        this.popup.option("title", this.$t("admin.users.detailUser"));
        this.popup.show();
        this.isLoading = true;
        getUser().then((data) => {
          this.formData = data;
          this.isLoading = false;
        });
      } else {
        this.popup.option(
          "title",
          `${this.$t("admin.users.detailUser")} #${user.code}`
        );
        this.formData = user;
        this.popup.show();
      }
      this.$mf.pushPopupToHistoryState(() => this.popup.hide());
    },
  },
};
</script>
<style lang="scss">
</style>
