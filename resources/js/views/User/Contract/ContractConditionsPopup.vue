<template>
    <CorePopup
        ref="popupRef"
        :width="330"
        :height="300"
        class="contract-conditions-popup"
        :title="$t('components.contractConditions.title')"
        @shown="onShown"
        @hidden="onHidden"
    >
        <div class="container">
            <div>
                <span class="condition"
                    >&#9312; {{ $t("user.contract.interestRate") }}:</span
                >
                <span>{{ $filters.percentInterestRate(interestRate) }}</span>
            </div>
            <div>
                <span class="condition"
                    >&#9313; {{ $t("user.contract.principalMin") }}:</span
                >
                <span>{{ $filters.currency(principalMin) }}</span>
            </div>
            <div>
                <span class="condition"
                    >&#9314; {{ $t("user.contract.holdWeeksMin") }}:</span
                >
                <span
                    >{{ holdWeeksMin }}
                    {{ $t("models.contract.frequency") }}</span
                >
            </div>
            <div>
                <div class="condition">
                    &#9315; {{ $t("user.contract.interestFormula") }}:
                </div>
                <div style="text-align: center">
                    <img
                        style="background: white; padding: 10px"
                        src="../../../../images/interest-formula.gif"
                    />
                </div>
            </div>
        </div>
    </CorePopup>
</template>
<script setup>
import CorePopup from "../../../components/Popups/CorePopup.vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const popupRef = ref(null);
const interestRate = computed(() => store.state.userContract.interestRate);
const principalMin = computed(() => store.state.userContract.principalMin);
const holdWeeksMin = computed(() => store.state.userContract.holdWeeksMin);
function show() {
    popupRef.value.show();
}
function onShown() {}
function onHidden() {}

defineExpose({ show });
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
