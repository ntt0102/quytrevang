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
                        width: '25',
                        type: 'date',
                        elementAttr: { class: 'from-date' },
                        hint: format(state.fromDate, 'dd/MM/yyyy'),
                        value: state.fromDate,
                        onValueChanged: fromDateChanged,
                    },
                },
                {
                    location: 'before',
                    widget: 'dxAutocomplete',
                    options: {
                        showClearButton: true,
                        openOnFieldClick: true,
                        minSearchLength: 0,
                        dataSource: groups,
                        value: state.group,
                        width: '80',
                        dropDownOptions: { width: '90' },
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
                    visible: filterProcess === 0,
                    location: 'after',
                    widget: 'dxDropDownButton',
                    options: {
                        showArrowIcon: false,
                        items: sources,
                        selectedItemKey: source,
                        stylingMode: 'text',
                        useSelectMode: true,
                        width: '90',
                        dropDownOptions: { width: '100' },
                        elementAttr: { class: 'source' },
                        onSelectionChanged: sourceSelect,
                    },
                },
                {
                    location: 'after',
                    widget: 'dxDropDownButton',
                    options: {
                        showArrowIcon: false,
                        items: state.watchlistActions,
                        displayExpr: 'text',
                        keyExpr: 'value',
                        icon: 'far fa-heart-circle-bolt small',
                        dropDownOptions: { width: '220' },
                        onItemClick: watchlistItemClick,
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
                {
                    visible: filterProcess > 0,
                    location: 'after',
                    text: `(${filterProcess}%)`,
                },
            ]"
        />
        <Chart
            :source="source"
            :fromDate="state.fromDate"
            :group="state.group"
            ref="chartRef"
        />
    </div>
</template>

<script setup>
import Chart from "./Chart.vue";
import { reactive, ref, inject, computed, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";
import { format, subYears } from "date-fns";

const store = useStore();
const route = useRoute();
const { t } = useI18n();
const bus = inject("bus");
const chartRef = ref(null);

const groups = computed(() => store.state.tradingShare.groups);
const symbolsLength = computed(() => store.state.tradingShare.symbols.length);
const source = computed(() => store.state.tradingShare.source);
const sources = computed(() => store.state.tradingShare.sources);
const filterProcess = computed(() => store.state.tradingShare.filterProcess);

const state = reactive({
    group: route.query.list ?? "",
    fromDate: subYears(new Date(), 5),
    watchlistActions: [
        {
            icon: "far fa-heart-circle-plus small",
            text: t("trading.share.filterWatchList"),
            value: true,
        },
        {
            icon: "far fa-heart-circle-minus small",
            text: t("trading.share.deleteWatchList"),
            value: false,
        },
    ],
});

store.dispatch("tradingShare/getGroups");

onUnmounted(() => {
    store.dispatch("tradingShare/resetState");
});

function groupChanged({ component }) {
    const value = component.option("value");
    state.group = value !== null ? value.trim().toUpperCase() : "";
    store.dispatch("tradingShare/getSymbols", state.group);
}
function fromDateChanged({ value }) {
    state.fromDate = value;
    chartRef.value.getChartData(true, value);
}
function sourceSelect({ item }) {
    store.dispatch("tradingShare/setSource", item);
    chartRef.value.initData(item);
}
function watchlistItemClick({ itemData }) {
    bus.emit("checkPin", () => {
        const param = {
            multi: true,
            group: state.group,
            add: itemData.value,
        };
        store.dispatch("tradingShare/changeWatchlist", param).then((data) => {
            chartRef.value.updateWatchlist(data);
        });
    });
}
function filterClick() {
    const group = state.group;
    if (!group) {
        return toast.warning(t("trading.share.filterGroupWarning"));
    }
    const filterTimes = chartRef.value.getFilterTimes();
    if (filterTimes.length < 2) {
        return toast.warning(t("trading.share.filterTimeWarning"));
    }
    bus.emit("checkPin", () => {
        store.dispatch("tradingShare/filterSymbols", { group, filterTimes });
    });
}
</script>
<style lang="scss">
.share-page {
    .from-date {
        &.dx-texteditor::after {
            width: 0 !important;
        }
        .dx-texteditor-input-container {
            width: 0px !important;
            flex-grow: unset !important;
        }
    }
    .symbol-group {
        .dx-texteditor-input {
            text-transform: uppercase;
        }
        .dx-texteditor-buttons-container {
            width: 23px !important;
        }
    }
    .source {
        .dx-button-content {
            padding: 0 !important;
        }
    }
    .dx-icon-clear {
        margin-top: -9px !important;
        width: 18px !important;
        height: 18px !important;
    }
}
</style>
