<template>
  <DxPopup
    ref="popup"
    :width="275"
    :height="190"
    :showCloseButton="true"
    :title="$t('components.checkPin.title')"
    :show-title="true"
    :wrapperAttr="{ class: 'check-pin-popup' }"
    :toolbarItems="[
      {
        toolbar: 'bottom',
        location: 'center',
        widget: 'dxButton',
        options: {
          text: $t('components.checkPin.fingerPrint'),
          icon: 'far fa-fingerprint small',
          onClick: scanFingerPrint,
        },
      },
    ]"
    @hiding="onHiding"
  >
    <template #content>
      <OtpInput
        v-if="isEnabled"
        ref="otpInput"
        input-classes="otp-input"
        separator="-"
        :num-inputs="4"
        :should-auto-focus="true"
        :is-input-num="true"
        @on-complete="handleOnComplete"
      />
    </template>
  </DxPopup>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import OtpInput from "@bachdgvn/vue-otp-input";

export default {
  components: {
    OtpInput,
  },
  data() {
    return {
      isEnabled: false,
      callback: null,
    };
  },
  computed: {
    ...mapGetters(["isSyncing"]),
    ...mapGetters("Auth", ["webauthn"]),
    popup() {
      return this.$refs.popup.instance;
    },
  },
  methods: {
    ...mapActions("Auth", ["checkPin", "confirmWebAuthn"]),
    show({ callback, forcePin }) {
      this.popup.show();
      setTimeout(() => (this.isEnabled = true), 400);

      if (this.$devices.phone && this.webauthn && !forcePin)
        this.scanFingerPrint();

      this.callback = callback;
      this.$mf.pushPopupToHistoryState(() => this.popup.hide());
    },
    scanFingerPrint() {
      this.confirmWebAuthn().then((isOk) => {
        if (isOk) {
          this.callback();
          this.popup.hide();
        }
      });
    },
    handleOnComplete(e) {
      this.checkPin(e).then((isOk) => {
        if (isOk) {
          this.callback();
          this.popup.hide();
        } else this.$refs.otpInput.clearInput();
      });
    },
    onHiding() {
      this.isEnabled = false;
      this.$mf.popRouteHistoryState();
    },
  },
};
</script>
<style lang="scss">
@import "../../../sass/variables.scss";
.check-pin-popup {
  .dx-popup-content {
    padding: 25px 10px !important;
    text-align: center;

    .otp-input {
      width: 40px;
      height: 40px;
      padding: 5px;
      margin: 0 10px;
      font-size: 20px;
      border-radius: 4px;
      text-align: center;

      &:focus {
        outline: none !important;
        border: 2px solid $base-accent;
        box-shadow: 0 0 10px lighten($base-accent, 20);
      }

      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
}
</style>

