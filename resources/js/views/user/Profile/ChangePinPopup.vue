<template>
  <DxPopup
    ref="popup"
    id="changePinPopup"
    :width="250"
    :height="hasPin ? 355 : 285"
    :showCloseButton="true"
    :title="title"
    :show-title="true"
    @hiding="$mf.popRouteHistoryState"
  >
    <template #content>
      <form class="change-pin-form" @submit.prevent="onSubmit">
        <DxForm ref="form" :form-data="formData" labelMode="static">
          <DxItem
            :visible="hasPin"
            name="pin"
            data-field="pin"
            editor-type="dxTextBox"
            :editor-options="{
              stylingMode: 'outlined',
              mode: 'password',
              mask: '0000',
            }"
            :validation-rules="validationRules.oldPin"
            :label="{ text: $t('components.changePin.oldPin') }"
          />
          <DxItem
            name="new_pin"
            data-field="new_pin"
            editor-type="dxTextBox"
            :editor-options="{
              stylingMode: 'outlined',
              mode: 'password',
              mask: '0000',
            }"
            :validation-rules="validationRules.newPin"
            :label="{ text: $t('components.changePin.newPin') }"
          />
          <DxItem
            name="pin_confirmation"
            data-field="pin_confirmation"
            editor-type="dxTextBox"
            :editor-options="{
              stylingMode: 'outlined',
              mode: 'password',
              mask: '0000',
            }"
            :validation-rules="validationRules.confirmPin"
            :label="{ text: $t('components.changePin.confirmPin') }"
          />
          <DxItem
            item-type="button"
            :button-options="{
              width: '100%',
              type: 'default',
              text: $t('components.changePin.submit'),
              useSubmitBehavior: true,
            }"
          />
        </DxForm>
      </form>
    </template>
  </DxPopup>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import DxForm, { DxItem } from "devextreme-vue/form";

export default {
  components: {
    DxForm,
    DxItem,
  },
  data() {
    return {
      title: null,
      hasPin: false,
      formData: {},
      validationRules: {
        oldPin: [
          {
            type: "required",
            message:
              this.$t("components.changePin.oldPin") +
              this.$mt.validations.required,
          },
        ],
        newPin: [
          {
            type: "required",
            message:
              this.$t("components.changePin.newPin") +
              this.$mt.validations.required,
          },
        ],
        confirmPin: [
          {
            type: "required",
            message:
              this.$t("components.changePin.confirmPin") +
              this.$mt.validations.required,
          },
          {
            type: "compare",
            comparisonTarget: this.pinComparison,
            message:
              this.$t("components.changePin.confirmPin") +
              this.$mt.validations.match,
          },
        ],
      },
    };
  },
  mounted() {
    this.hasPin = this.level >= 3;
    this.title = this.$t(
      "components.changePin." + (this.hasPin ? "title" : "setTitle")
    );
  },
  computed: {
    ...mapGetters("Auth", ["level"]),
    popup() {
      return this.$refs.popup.instance;
    },
    form() {
      return this.$refs.form.instance;
    },
  },
  methods: {
    ...mapActions("Auth", ["fetch"]),
    ...mapActions("User.profile", ["changePin"]),
    show() {
      this.initFormData();
      this.popup.show();
      this.setFocus();
      this.$mf.pushPopupToHistoryState(() => this.popup.hide());
    },
    onSubmit() {
      this.changePin(this.formData).then((isOk) => {
        if (isOk) {
          this.fetch(true);
          this.popup.hide();
        } else {
          this.initFormData();
          this.setFocus();
        }
      });
    },
    pinComparison() {
      return this.formData.new_pin;
    },
    initFormData() {
      this.formData = {
        pin: "",
        new_pin: "",
        pin_confirmation: "",
      };
    },
    setFocus() {
      setTimeout(
        () => this.form.getEditor(this.hasPin ? "pin" : "new_pin").focus(),
        1000
      );
    },
  },
};
</script>
<style lang="scss">
.change-pin-form {
  margin-top: -20px;

  .dx-field-item {
    padding-top: 10px !important;
  }
  .dx-popup-content {
    padding: 7px 15px;
  }
  .dx-texteditor-input {
    font-size: 30px;
    padding: 5px !important;
    text-align: center;
    text-indent: 28px;
    letter-spacing: 30px;
  }
}
</style>

