<template>
    <div class="finbook-chart dx-card responsive-paddings content-block">
        <DxPieChart
            ref="pieRef"
            :data-source="finbooks"
            resolve-label-overlapping="shift"
            palette="Bright"
            :title="{
                text: $t('user.overview.finbook.title'),
                subtitle: { text: null },
                horizontalAlignment: 'left',
            }"
            :legend="{
                horizontalAlignment: $screen.getScreenSizeInfo.isXSmall
                    ? 'center'
                    : 'right',
                itemTextPosition: 'right',
            }"
            :series="{
                argumentField: 'name',
                valueField: 'balance',
                label: {
                    visible: true,
                    customizeText: customizeLabel,
                    connector: {
                        visible: true,
                        width: 1,
                    },
                },
            }"
            :size="{ width: '100%', height: 450 }"
            :export="{ enabled: false }"
            @point-click="pointClickHandler"
            @legend-click="legendClickHandler"
        />
        <TransactionFinbookPopup ref="transactionFinbookPopupRef" />
    </div>
</template>
<script setup>
import DxPieChart from "devextreme-vue/pie-chart";
import TransactionFinbookPopup from "../../Trading/Finbook/TransactionFinbookPopup.vue";
import { computed, inject, onUnmounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
const filters = inject("filters");
const bus = inject("bus");
const pieRef = ref(null);
const transactionFinbookPopupRef = ref(null);
const finbooks = computed(() => store.state.tradingFinbook.finbooks);
let sum = 0;

store.dispatch("tradingFinbook/getFinbook");
bus.on("toggleMenu", () => {
    setTimeout(() => pieRef.value.instance.render(), 300);
});

onUnmounted(() => bus.off("toggleMenu"));

watch(
    () => store.state.tradingFinbook.finbooks,
    (value) => {
        sum = value.reduce(
            (accumulator, object) => accumulator + object.balance,
            0
        );
        setTimeout(
            () =>
                pieRef.value.instance.option(
                    "title.subtitle.text",
                    `${t("user.overview.finbook.subtitle", [
                        filters.currency(sum),
                    ])}`
                ),
            0
        );
    }
);

function pointClickHandler({ target: { data } }) {
    transactionFinbookPopupRef.value.show(data);
}
function legendClickHandler(e) {
    const arg = e.target;
    const item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];
    if (item.isVisible()) item.hide();
    else item.show();
}
function toggleVisibility(item) {
    item.isVisible() ? item.hide() : item.show();
}
function customizeLabel(pointInfo) {
    return `${filters.currency(pointInfo.valueText)} (${(
        (pointInfo.valueText / sum) *
        100
    ).toFixed(1)}%)`;
}
</script>
