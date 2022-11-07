<template>
  <DxPopup
    ref="popup"
    :width="330"
    :height="300"
    :showCloseButton="true"
    :title="$t('components.contractConditions.title')"
    :show-title="true"
    :wrapperAttr="{ class: 'contract-conditions-popup' }"
    @hiding="$mf.popRouteHistoryState"
  >
    <template #content>
      <div class="container">
        <div>
          <span class="condition"
            >&#9312; {{ $t("user.contract.interestRate") }}:</span
          >
          <span>{{ $options.filters.percentInterestRate(interestRate) }}</span>
        </div>
        <div>
          <span class="condition"
            >&#9313; {{ $t("user.contract.principalMin") }}:</span
          >
          <span>{{ $options.filters.currency(principalMin) }}</span>
        </div>
        <div>
          <span class="condition"
            >&#9314; {{ $t("user.contract.holdWeeksMin") }}:</span
          >
          <span>{{ holdWeeksMin }} {{ $t("models.contract.frequency") }}</span>
        </div>
        <div>
          <div class="condition">
            &#9315; {{ $t("user.contract.interestFormula") }}:
          </div>
          <div style="text-align: center">
            <img
              style="background: white; padding: 10px"
              src="../../../images/interest-formula.gif"
            />
          </div>
        </div>
      </div>
    </template>
  </DxPopup>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  data() {
    return {
      callback: null,
    };
  },
  computed: {
    ...mapGetters("User.contract", [
      "interestRate",
      "principalMin",
      "holdWeeksMin",
    ]),
    popup() {
      return this.$refs.popup.instance;
    },
  },
  methods: {
    show(callback) {
      this.popup.show();
      this.callback = callback;
      this.$mf.pushPopupToHistoryState(() => this.popup.hide());
    },
  },
};
</script>
<style lang="scss">
.contract-conditions-popup {
  .container {
    line-height: 2;

    .condition {
      color: darken(white, 30);
    }
  }
}
</style>

