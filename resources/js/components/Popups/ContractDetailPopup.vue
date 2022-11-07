<template>
  <DxPopup
    ref="popup"
    :showCloseButton="true"
    :fullScreen="$devices.phone ? true : false"
    :show-title="true"
    @hiding="$mf.popRouteHistoryState"
  >
    <template #content>
      <DxForm
        class="contract-detail"
        :form-data="formData"
        :read-only="true"
        :label-location="$devices.phone ? 'top' : 'left'"
        :scrolling-enabled="true"
      >
        <DxItem :col-count="2" item-type="group">
          <DxItem
            data-field="status"
            editor-type="dxSelectBox"
            :editor-options="{
              searchEnabled: false,
              items: $mf.getContractStatusList(),
              displayExpr: 'name',
              valueExpr: 'value',
            }"
            :label="{ text: $t('models.contract.status') }"
          />
          <DxItem
            data-field="principal"
            editor-type="dxNumberBox"
            :editor-options="{ format: '#,##0 ₫' }"
            :label="{ text: $t('models.contract.principal') }"
          />
          <DxItem
            css-class="interest-item"
            data-field="interest"
            editor-type="dxNumberBox"
            :editor-options="{ format: '#,##0 ₫' }"
            :label="{ text: $t('models.contract.interest') }"
          />
          <DxItem
            data-field="interest_rate"
            editor-type="dxNumberBox"
            :editor-options="{
              format: '#0.# %/' + $t('models.contract.frequency'),
            }"
            :label="{ text: $t('models.contract.interestRate') }"
          />
          <DxItem
            data-field="paid_at"
            editor-type="dxDateBox"
            :label="{ text: $t('models.contract.paidAt') }"
          />
          <DxItem
            v-if="formData.withdrawn_at"
            data-field="withdrawn_at"
            editor-type="dxDateBox"
            :label="{ text: $t('models.contract.withdrawnAt') }"
          />
          <DxItem
            data-field="duration"
            :label="{ text: $t('models.contract.duration') }"
          />
        </DxItem>
        <DxItem
          :visible="hasConfirmedDocs"
          item-type="group"
          :col-span="2"
          :caption="$t('models.contract.receipt')"
        >
          <DxItem>
            <template #default>
              <Photoswipe
                @opened="$mf.pushPhotoswipeToHistoryState"
                @close="$mf.popRouteHistoryState"
              >
                <div
                  v-for="(image, index) in formData.url_paid_docs"
                  :key="10 + index"
                >
                  <img :src="image" v-pswp="image" :alt="$appName" />
                </div>
                <div
                  v-for="(image, index) in formData.url_withdrawn_docs"
                  :key="20 + index"
                >
                  <img :src="image" v-pswp="image" :alt="$appName" />
                </div>
              </Photoswipe>
            </template>
          </DxItem>
        </DxItem>
      </DxForm>
    </template>
  </DxPopup>
</template>
<script>
import DxForm, { DxItem } from "devextreme-vue/form";

export default {
  components: {
    DxForm,
    DxItem,
  },
  data() {
    return {
      enabled: false,
      formData: { url_paid_docs: [], url_withdrawn_docs: [] },
    };
  },
  computed: {
    popup() {
      return this.$refs.popup.instance;
    },
    hasConfirmedDocs() {
      return (
        this.formData.url_paid_docs.length > 0 ||
        this.formData.url_withdrawn_docs.length > 0
      );
    },
  },
  methods: {
    show(contract) {
      this.popup.option(
        "title",
        `${this.$t("models.contract.popup.detail")} #${contract.code}`
      );
      this.popup.show();
      this.formData = contract;
      this.$mf.pushPopupToHistoryState(() => this.popup.hide());
    },
  },
};
</script>
<style lang="scss">
.contract-detail {
  .interest-item .dx-texteditor-input {
    color: lime;
    font-weight: bold;
  }
  .contract {
    display: flex;
    flex-wrap: wrap;
    padding: 0;

    > div {
      -ms-flex: 50%;
      flex: 50%;
      max-width: 50%;
      padding: 0 4px;

      > img {
        margin-top: 8px;
        vertical-align: middle;
        width: 100%;
      }
    }
  }
}
body[screen-size="small"] {
  .contract-detail {
    .contract > div {
      -ms-flex: 100%;
      flex: 100%;
      max-width: 100%;
    }
  }
}
</style>
