<template>
    <CorePopup
        ref="popupRef"
        class="der-matched-orders-popup"
        :title="$t('trading.derivative.pendingOrders')"
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
                :data-field="column"
                :caption="$t(`trading.derivative.pendingOrdersPopup.${column}`)"
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
    "orderTime",
    "side",
    "volume",
    "matchVolume",
    "showPrice",
    "avgPrice",
];

function show() {
    popupRef.value.show();
}

function onShown() {
    orders.value = store.state.tradingDerivative.status.pendingOrders;
}
function onHidden() {}

defineExpose({
    show,
});
</script>
<style lang="scss"></style>
