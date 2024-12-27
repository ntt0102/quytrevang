<template>
    <div class="share-page content-block dx-card responsive-paddings">
        <DxToolbar
            :items="[
                {
                    visible: $mf.isSet($route.query),
                    location: 'before',
                    widget: 'dxButton',
                    options: {
                        icon: 'far fa-arrow-left small',
                        hint: $t('buttons.back'),
                        onClick: () => $router.go(-1),
                    },
                },
                {
                    location: 'before',
                    widget: 'dxDateBox',
                    options: {
                        type: 'date',
                        value: state.fromDate,
                        onValueChanged: fromDateChanged,
                    },
                },
                {
                    location: 'before',
                    widget: 'dxAutocomplete',
                    options: {
                        width: '100',
                        showClearButton: true,
                        openOnFieldClick: true,
                        minSearchLength: 0,
                        dataSource: groups,
                        value: state.group,
                        elementAttr: { class: 'symbol-group' },
                        placeholder: $t('trading.share.group'),
                        onEnterKey: groupChanged,
                        onFocusOut: groupChanged,
                        onItemClick: groupChanged,
                    },
                },
                {
                    visible: symbolsLength > 0,
                    location: 'before',
                    text: `(${symbolsLength})`,
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'far fa-trash-xmark small',
                        hint: $t('trading.share.deleteWatchList'),
                        onClick: deleteWatchlist,
                    },
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'far fa-filter small',
                        hint: $t('trading.share.filterSymbols'),
                        onClick: filterClick,
                    },
                },
            ]"
        />
        <Chart :fromDate="state.fromDate" ref="chartRef" />
    </div>
</template>

<script setup>
import Chart from "./Chart.vue";
import { reactive, ref, inject, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";
import { subYears } from "date-fns";

const store = useStore();
const route = useRoute();
const { t } = useI18n();
const bus = inject("bus");
const chartRef = ref(null);

const groups = computed(() => store.state.tradingShare.groups);
const symbolsLength = computed(() => store.state.tradingShare.symbols.length);

const state = reactive({
    group: route.query.list ?? "",
    fromDate: subYears(new Date(), 5),
});

store.dispatch("tradingShare/getGroups");

function groupChanged({ component }) {
    const value = component.option("value");
    state.group = value !== null ? value.trim().toUpperCase() : "";
    store.dispatch("tradingShare/getSymbols", state.group);
}
function fromDateChanged({ value }) {
    state.fromDate = value;
    chartRef.value.getChartData(true, value);
}
function deleteWatchlist() {
    bus.emit("checkPin", () =>
        store.dispatch("tradingShare/deleteWatchlist").then(() => {
            chartRef.value.clearWatchlist();
        })
    );
}
function filterClick() {
    const group = state.group;
    const filterTimes = chartRef.value.getFilterTimes();
    if (!group) {
        return toast.warning(t("trading.share.filterGroupWarning"));
    }
    if (filterTimes.length !== 4) {
        return toast.warning(t("trading.share.filterTimeWarning"));
    }
    bus.emit("checkPin", () => {
        store.dispatch("tradingShare/filterSymbols", { group, filterTimes });
    });
}
</script>
<style lang="scss">
.share-page {
    .symbol-group {
        .dx-texteditor-input {
            text-transform: uppercase;
        }
        .dx-texteditor-buttons-container {
            width: 23px !important;
        }
    }
}
</style>
