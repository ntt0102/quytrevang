<template>
  <div>
    <div class="header">
      <div class="title">{{ $t("auth.resetPassword.title") }}</div>
    </div>
    <form class="reset-password-form" @submit.prevent="onSubmit">
      <DxForm ref="form" :form-data="formData" labelMode="floating">
        <DxItem
          data-field="email"
          editor-type="dxTextBox"
          :editor-options="{ mode: 'email' }"
          :validation-rules="validationRules.email"
          :label="{ text: $t('models.user.email') }"
        />
        <DxItem
          item-type="button"
          :button-options="{
            elementAttr: { class: 'submit-button' },
            width: '100%',
            type: 'default',
            text: $t('auth.resetPassword.send'),
            useSubmitBehavior: true,
          }"
        />
        <DxItem>
          <template #default>
            <div class="login-link">
              {{ $t("auth.resetPassword.returnTo") }}
              <router-link :to="{ name: 'login' }">{{
                $t("auth.resetPassword.signIn")
              }}</router-link>
            </div>
          </template>
        </DxItem>
      </DxForm>
    </form>
  </div>
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
      formData: { email: null },
      validationRules: {
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
            validationCallback: this.validateExistEmail,
            message: this.$t("models.user.validations.email"),
          },
        ],
      },
    };
  },
  mounted() {
    setTimeout(() => this.form.getEditor("email").focus(), 500);
  },
  computed: {
    form() {
      return this.$refs.form.instance;
    },
  },
  methods: {
    ...mapActions("Auth", ["resetPassword", "validateExistEmail"]),
    onSubmit() {
      this.resetPassword(this.formData);
    },
  },
};
</script>

<style lang="scss">
@import "../../../sass/variables.scss";

.reset-password-form {
  .submit-button {
    margin-top: 10px;
  }

  .login-link {
    color: $base-accent;
    font-size: 16px;
    text-align: center;
  }

  .dx-button-text {
    display: inline;
    vertical-align: middle;
  }

  .dx-button-submit-input {
    display: none;
  }
}
</style>
