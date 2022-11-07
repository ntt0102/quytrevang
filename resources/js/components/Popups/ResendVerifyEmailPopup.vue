<template>
  <div>
    <DxPopup
      ref="popup"
      :width="300"
      :height="270"
      :showCloseButton="true"
      :title="$t('components.resendVerifyEmail.title')"
      :show-title="true"
      @hiding="$mf.popRouteHistoryState"
    >
      <template #content>
        <form class="resend-email-form" @submit.prevent="onSubmit">
          <div class="description">
            {{ $t("components.resendVerifyEmail.description").format(email) }}
          </div>
          <DxForm>
            <DxItem
              item-type="button"
              :button-options="{
                width: '100%',
                type: 'default',
                text: $t('components.resendVerifyEmail.resend'),
                useSubmitBehavior: true,
              }"
            />
          </DxForm>
        </form>
      </template>
    </DxPopup>
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
    return {};
  },
  computed: {
    ...mapGetters("Auth", ["email"]),
    popup() {
      return this.$refs.popup.instance;
    },
  },
  methods: {
    ...mapActions("Auth", ["resendEmail"]),
    show() {
      this.popup.show();
      this.$mf.pushPopupToHistoryState(() => this.popup.hide());
    },
    onSubmit() {
      this.resendEmail().then(() => {
        this.popup.hide();
      });
    },
  },
};
</script>
<style lang="scss">
.description {
  margin-bottom: 30px;
}
</style>
