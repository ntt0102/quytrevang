<template>
    <CorePopup
        ref="popupRef"
        class="der-matched-orders-popup"
        :title="$t('trading.derivative.pendingOrdersPopup.title')"
        :toolbarItems="[
            {
                toolbar: 'bottom',
                location: 'after',
                widget: 'dxButton',
                options: {
                    text: $t('trading.derivative.orderContext.closeAllOrders'),
                    onClick: closeAllOrders,
                },
            },
        ]"
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
                    $t(`trading.derivative.pendingOrdersPopup.${column.field}`)
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
const emit = defineEmits(["closeAllOrders"]);
const popupRef = ref(null);
const orders = ref([]);
const columns = [
    { field: "time", minWidth: 100 },
    { field: "type", minWidth: 100 },
    { field: "side", minWidth: 100 },
    { field: "volume", minWidth: 100 },
    { field: "price", minWidth: 100 },
];

function show() {
    popupRef.value.show();
}

function onShown() {
    orders.value = store.state.tradingDerivative.status.pendingOrders;
}
function onHidden() {}

function closeAllOrders() {
    emit("closeAllOrders");
}

defineExpose({
    show,
});
</script>
<style lang="scss"></style>
