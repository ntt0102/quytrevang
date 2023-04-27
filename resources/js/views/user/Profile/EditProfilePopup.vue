<template>
  <div>
    <DxPopup
      ref="popup"
      :showCloseButton="true"
      :fullScreen="$devices.phone ? true : false"
      :show-title="true"
      :title="$t('components.editProfile.title')"
      :toolbarItems="[
        {
          toolbar: 'bottom',
          location: 'after',
          widget: 'dxButton',
          options: {
            text: $t('buttons.save'),
            onClick: () => form.getButton('submit').element().click(),
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
      @hiding="$mf.popRouteHistoryState"
    >
      <template #content>
        <form @submit.prevent="onSubmit">
          <button ref="submit" class="display-none" />
          <DxForm
            ref="form"
            class="profile-form"
            :form-data="formData"
            labelMode="floating"
            :col-count="2"
            :label-location="$devices.phone ? 'top' : 'left'"
            :scrolling-enabled="true"
          >
            <DxItem
              item-type="group"
              :caption="$t('models.user.groups.personalInfo')"
            >
              <DxItem
                data-field="name"
                :validation-rules="validationRules.name"
                :label="{ text: $t('models.user.name') }"
              />
              <DxItem
                data-field="sex"
                editor-type="dxSelectBox"
                :editor-options="{
                  searchEnabled: false,
                  items: $mf.getSexList(),
                  displayExpr: 'name',
                  valueExpr: 'value',
                  placeholder: $t('titles.dxSelectPlacehoder'),
                }"
                :validation-rules="validationRules.sex"
                :label="{ text: $t('models.user.sex') }"
              />
              <DxItem
                data-field="birthday"
                editor-type="dxDateBox"
                :editor-options="{
                  dateSerializationFormat: $mc.DX_SERVER_DATE_FORMAT,
                  showClearButton: 'true',
                  useMaskBehavior: 'true',
                }"
                :validation-rules="validationRules.birthday"
                :label="{ text: $t('models.user.birthday') }"
              />
            </DxItem>
            <DxItem
              item-type="group"
              :caption="$t('models.user.groups.idInfo')"
            >
              <DxItem
                data-field="identity.number"
                :editorOptions="{
                  mask: '000000000000',
                }"
                :validation-rules="validationRules.idNumber"
                :label="{ text: $t('models.user.idNumber') }"
              />
              <DxItem
                data-field="identity.issued_on"
                editor-type="dxDateBox"
                :editor-options="{
                  dateSerializationFormat: $mc.DX_SERVER_DATE_FORMAT,
                  showClearButton: 'true',
                  useMaskBehavior: 'true',
                }"
                :validation-rules="validationRules.idIssuedOn"
                :label="{ text: $t('models.user.idIssuedOn') }"
              />
              <DxItem
                data-field=""
                :editorOptions="{
                  value: $mt.idIssuedAtValue,
                  readOnly: true,
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
                  mask: '0000.000.000',
                }"
                :validation-rules="validationRules.phone"
                :label="{ text: $t('models.user.phone') }"
              />
              <DxItem
                data-field="email"
                :validation-rules="validationRules.email"
                :label="{ text: $t('models.user.email') }"
              />
              <DxItem
                :col-span="2"
                data-field="address"
                editor-type="dxTextArea"
                :validation-rules="validationRules.address"
                :label="{ text: $t('models.user.address') }"
              />
            </DxItem>
            <DxItem
              item-type="group"
              :col-span="2"
              :col-count="2"
              :caption="$t('models.user.groups.bankInfo')"
            >
              <DxItem
                data-field="bank_account.bank_name"
                editor-type="dxSelectBox"
                :editor-options="{
                  searchEnabled: true,
                  items: banks,
                  displayExpr: 'short_name',
                  searchExpr: 'short_name',
                  valueExpr: 'short_name',
                  placeholder: $t('titles.dxSelectPlacehoder'),
                }"
                :validation-rules="validationRules.bankAccount.bankName"
                :label="{ text: $t('models.user.bankName') }"
              />
              <DxItem
                data-field="bank_account.account_number"
                :validation-rules="validationRules.bankAccount.accountNumber"
                :label="{ text: $t('models.user.accountNumber') }"
              />
              <DxItem
                data-field="bank_account.account_name"
                editor-type="dxTextBox"
                :editor-options="{
                  inputAttr: { style: 'text-transform: uppercase' },
                }"
                :validation-rules="validationRules.bankAccount.accountName"
                :label="{ text: $t('models.user.accountName') }"
              />
            </DxItem>
            <DxItem
              name="submit"
              cssClass="display-none"
              item-type="button"
              :button-options="{
                useSubmitBehavior: true,
              }"
            />
          </DxForm>
          <DxLoadPanel
            :position="{ of: '.profile-form' }"
            :visible="isLoading"
            :shading="false"
          />
        </form>
      </template>
    </DxPopup>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { DxForm, DxItem } from "devextreme-vue/form";
import DxTextArea from "devextreme-vue/text-area";

export default {
  components: {
    DxForm,
    DxItem,
    DxTextArea,
  },
  data() {
    return {
      isLoading: false,
      formData: null,
      banks: [],
      validationRules: {
        name: [
          {
            type: "required",
            message:
              this.$t("models.user.name") + this.$mt.validations.required,
          },
          {
            type: "stringLength",
            max: 50,
            message: this.$t("models.user.validations.name"),
          },
        ],
        sex: [
          {
            type: "required",
            message: this.$t("models.user.sex") + this.$mt.validations.required,
          },
        ],
        birthday: [
          {
            type: "required",
            message:
              this.$t("models.user.birthday") + this.$mt.validations.required,
          },
          {
            type: "custom",
            validationCallback: this.validateBirthday,
            message: this.$t("models.user.validations.birthday"),
          },
        ],
        idNumber: [
          {
            type: "required",
            message:
              this.$t("models.user.idNumber") + this.$mt.validations.required,
          },
          {
            type: "async",
            validationCallback: this.validateDuplicateIdNumber,
            message:
              this.$t("models.user.idNumber") + this.$mt.validations.duplicate,
          },
        ],
        idIssuedOn: [
          {
            type: "required",
            message:
              this.$t("models.user.idIssuedOn") + this.$mt.validations.required,
          },
          {
            type: "custom",
            validationCallback: this.validateIdIssuedOn,
            message: this.$t("models.user.validations.idIssuedOn"),
          },
        ],
        phone: [
          {
            type: "required",
            message:
              this.$t("models.user.phone") + this.$mt.validations.required,
          },
          {
            type: "async",
            validationCallback: this.validateDuplicatePhone,
            message:
              this.$t("models.user.phone") + this.$mt.validations.duplicate,
          },
        ],
        email: [
          {
            type: "required",
            message:
              this.$t("models.user.email") + this.$mt.validations.required,
          },
          {
            type: "email",
            message: this.$t("models.user.email") + this.$mt.validations.email,
          },
          {
            type: "async",
            validationCallback: this.validateDuplicateEmail,
            message:
              this.$t("models.user.email") + this.$mt.validations.duplicate,
          },
        ],
        address: [
          {
            type: "required",
            message:
              this.$t("models.user.address") + this.$mt.validations.required,
          },
          {
            type: "stringLength",
            max: 100,
            message: this.$t("models.user.validations.address"),
          },
        ],
        bankAccount: {
          bankName: [
            {
              type: "required",
              message:
                this.$t("models.user.bankName") + this.$mt.validations.required,
            },
          ],
          accountName: [
            {
              type: "required",
              message:
                this.$t("models.user.accountName") +
                this.$mt.validations.required,
            },
          ],
          accountNumber: [
            {
              type: "required",
              message:
                this.$t("models.user.accountNumber") +
                this.$mt.validations.required,
            },
            {
              type: "numeric",
              message:
                this.$t("models.user.accountNumber") +
                this.$mt.validations.numeric,
            },
          ],
        },
      },
    };
  },
  computed: {
    ...mapGetters("User.profile", ["profile"]),
    popup() {
      return this.$refs.popup.instance;
    },
    form() {
      return this.$refs.form.instance;
    },
  },
  methods: {
    ...mapActions("User.profile", [
      "fetch",
      "save",
      "validateDuplicateEmail",
      "validateDuplicateIdNumber",
      "validateDuplicatePhone",
    ]),
    show() {
      this.isLoading = true;
      this.popup.show();
      this.fetch().then(() => {
        this.formData = this.$mf.cloneDeep(this.profile);
        setTimeout(() => this.form.getEditor("name").focus(), 500);
        this.$mf.getBanks().then((banks) => (this.banks = banks));
        this.isLoading = false;
      });
      this.$mf.pushPopupToHistoryState(() => this.popup.hide());
    },
    onSubmit() {
      this.$bus.emit("checkPin", () => {
        this.save(this.formData).then((isOk) => {
          if (isOk) this.popup.hide();
        });
      });
    },
    validateBirthday(e) {
      return moment(e.value).isBefore(moment().subtract(18, "years"));
    },
    validateIdIssuedOn(e) {
      return moment(e.value).isBefore(moment().subtract(1, "day"));
    },
    saveClick() {
      this.form.getButton("submit").element().click();
    },
  },
};
</script>
<style lang="scss">
</style>

