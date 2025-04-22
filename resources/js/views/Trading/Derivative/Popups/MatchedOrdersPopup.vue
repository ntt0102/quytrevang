<template>
    <CorePopup
        ref="popupRef"
        class="der-matched-orders-popup"
        :title="$t('trading.derivative.matchedOrders')"
        @shown="onShown"
        @hidden="onHidden"
    >
        <DxDataGrid
            :data-source="orders"
            key-expr="orderNo"
            :show-borders="true"
        >
            <DxColumn
                v-for="column in columns"
                :data-field="column.field"
                :minWidth="column.minWidth"
                :caption="
                    $t(`trading.derivative.matchedOrdersPopup.${column.field}`)
                "
            />
        </DxDataGrid>
    </CorePopup>
</template>
<script setup>
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import CorePopup from "../../../../components/Popups/CorePopup.vue";
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const popupRef = ref(null);
const orders = ref([]);
const columns = [
    { field: "orderTime", minWidth: 100 },
    { field: "side", minWidth: 100 },
    { field: "volume", minWidth: 100 },
    { field: "matchVolume", minWidth: 100 },
    { field: "showPrice", minWidth: 100 },
    { field: "avgPrice", minWidth: 100 },
];

function show() {
    popupRef.value.show();
}

function onShown() {
    store.dispatch("tradingDerivative/getMatchedOrders").then((data) => {
        orders.value = data;
    });
}
function onHidden() {}

defineExpose({
    show,
});
</script>
<style lang="scss"></style>
