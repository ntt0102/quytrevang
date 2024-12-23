<template>
    <div class="derivative-page content-block dx-card responsive-paddings">
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
                        icon: 'far fa-arrow-right-to-arc small',
                        hint: $t('trading.derivative.buttons.loginVps'),
                        onClick: loginVps,
                    },
                },
                {
                    location: 'before',
                    widget: 'dxDropDownButton',
                    options: {
                        splitButton: true,
                        items: exportTypes,
                        displayExpr: 'text',
                        keyExpr: 'value',
                        icon: 'far fa-cloud-arrow-down small',
                        hint: $t('trading.derivative.buttons.downloadExport'),
                        width: '60',
                        dropDownOptions: { width: '160' },
                        elementAttr: { class: 'export' },
                        onButtonClick: exportClick,
                        onItemClick: exportItemClick,
                    },
                },
                {
                    location: 'after',
                    widget: 'dxDropDownButton',
                    options: {
                        showArrowIcon: false,
                        items: dataSource,
                        displayExpr: 'name',
                        keyExpr: 'name',
                        selectedItemKey: source,
                        stylingMode: 'text',
                        useSelectMode: true,
                        width: '130',
                        elementAttr: { class: 'source' },
                        onSelectionChanged: sourceSelect,
                    },
                },
            ]"
        />
        <Chart ref="chartRef" />
    </div>
    <VpsOtpPopup ref="vpsOtpPopupRef" />
</template>

<script setup>
import Chart from "./Chart.vue";
import VpsOtpPopup from "./VpsOtpPopup.vue";
import { ref, inject, computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
const bus = inject("bus");
const source = computed(() => store.state.tradingDerivative.config.source);
const chartRef = ref(null);
const vpsOtpPopupRef = ref(null);
const exportTypes = ref([
    {
        text: t("trading.derivative.buttons.downloadExport"),
        value: "download",
        icon: "far fa-cloud-arrow-down",
    },
    {
        text: t("trading.derivative.buttons.cloneExport"),
        value: "clone",
        icon: "far fa-file-export",
    },
]);
const dataSource = ref([
    { name: "FIREANT", icon: "far fa-database small" },
    { name: "DNSE", icon: "far fa-database small" },
    { name: "VPS", icon: "far fa-database small" },
]);

function report() {
    bus.emit("checkPin", () => store.dispatch("tradingDerivative/report"));
}
function loginVps() {
    vpsOtpPopupRef.value.show();
}
function exportClick() {
    bus.emit("checkPin", () =>
        store.dispatch("tradingDerivative/export", "download")
    );
}
function exportItemClick({ itemData }) {
    bus.emit("checkPin", () =>
        store.dispatch("tradingDerivative/export", itemData.value)
    );
}
function sourceSelect({ item: { name } }) {
    chartRef.value.connectSocket();
    store.dispatch("tradingDerivative/setSource", name);
}
</script>
<style lang="scss">
.derivative-page {
    .export {
        .dx-button-content {
            padding-right: unset !important;
        }
    }
    .source {
        .dx-button-text {
            text-transform: unset !important;
        }
    }
}
</style>
