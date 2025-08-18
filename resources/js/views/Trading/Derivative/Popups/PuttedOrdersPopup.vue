<template>
    <CorePopup
        ref="popupRef"
        class="der-putted-orders-popup"
        :title="$t('trading.derivative.orderContext.history')"
        @shown="onShown"
        @hidden="onHidden"
    >
        <DxScrollView>
            <DxDataGrid
                :data-source="orders"
                key-expr="id"
                :show-borders="true"
            >
                <DxColumn
                    v-for="column in columns"
                    :data-field="column.field"
                    :minWidth="column.minWidth"
                    :caption="
                        $t(`trading.derivative.orderContext.${column.field}`)
                    "
                />
            </DxDataGrid>
        </DxScrollView>
    </CorePopup>
</template>
<script setup>
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import CorePopup from "../../../../components/Popups/CorePopup.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { format } from "date-fns";

const store = useStore();
const popupRef = ref(null);
const orders = ref([]);
const columns = [
    { field: "time", minWidth: 200 },
    { field: "type", minWidth: 70 },
    { field: "side", minWidth: 90 },
    { field: "price", minWidth: 100 },
    { field: "tpPrice", minWidth: 100 },
    { field: "slPrice", minWidth: 100 },
];

function show() {
    popupRef.value.show();
}

function onShown() {
    store.dispatch("tradingDerivative/getPuttedOrders").then((data) => {
        orders.value = formatData(data);
    });
}
function formatData(data) {
    return data.map((order) => ({
        id: order.id,
        time: format(new Date(order.created_at), "dd/MM/yyyy HH:mm:ss"),
        type: order.type,
        side: order.side > 0 ? "LONG" : "SHORT",
        price: order.entry_price,
        tpPrice: order.tp_price,
        slPrice: order.sl_price,
    }));
}
function onHidden() {}

defineExpose({
    show,
});
</script>
<style lang="scss"></style>
