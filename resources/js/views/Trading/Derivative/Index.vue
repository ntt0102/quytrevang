<template>
    <div class="content-block dx-card responsive-paddings">
        <DxToolbar
            :items="[
                {
                    location: 'before',
                    widget: 'dxButton',
                    options: {
                        icon: 'far fa-file-chart-pie small',
                        hint: $t('trading.derivative.buttons.report'),
                        onClick: report,
                    },
                },
                {
                    location: 'before',
                    widget: 'dxButton',
                    options: {
                        icon: 'far fa-cloud-arrow-down small',
                        hint: $t('trading.derivative.buttons.export'),
                        onClick: exportCsv,
                    },
                },
                {
                    location: 'before',
                    widget: 'dxButton',
                    options: {
                        icon: 'far fa-arrow-right-to-arc small',
                        hint: $t('trading.derivative.buttons.loginVps'),
                        onClick: loginVps,
                    },
                },
            ]"
        />
        <Chart />
    </div>
    <VpsOtpPopup ref="vpsOtpPopupRef" />
</template>

<script setup>
import Chart from "./Chart.vue";
import VpsOtpPopup from "./VpsOtpPopup.vue";
import { ref, inject } from "vue";
import { useStore } from "vuex";

const store = useStore();
const bus = inject("bus");
const vpsOtpPopupRef = ref(null);

function report() {
    bus.emit("checkPin", () => store.dispatch("tradingDerivative/report"));
}
function exportCsv() {
    bus.emit("checkPin", () => store.dispatch("tradingDerivative/export"));
}
function loginVps() {
    vpsOtpPopupRef.value.show();
}
</script>
<style lang="scss"></style>
