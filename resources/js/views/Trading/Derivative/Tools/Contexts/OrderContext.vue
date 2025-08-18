<template>
    <CoreContext class="order-context">
        <DxDataGrid
            :data-source="dataSource"
            key-expr="id"
            :show-borders="true"
        >
            <DxColumn
                :width="50"
                type="buttons"
                cssClass="dx-datagrid-command-column"
                cell-template="commandCellTemplate"
            />
            <DxColumn
                v-for="column in columns"
                :data-field="column.field"
                :width="column.minWidth"
                :caption="$t(`trading.derivative.orderContext.${column.field}`)"
            />
            <template #commandCellTemplate="{ data }">
                <DxButton
                    type="danger"
                    stylingMode="text"
                    icon="trash"
                    @click="() => closeOrder(data.data.id)"
                />
            </template>
        </DxDataGrid>
        <DxToolbar
            :items="[
                {
                    location: 'before',
                    widget: 'dxButton',
                    options: {
                        type: 'success',
                        stylingMode: 'outlined',
                        icon: 'far fa-gavel',
                        text: $t('trading.derivative.orderContext.putOrder'),
                        onClick: putOrder,
                    },
                },
                {
                    location: 'center',
                    widget: 'dxButton',
                    options: {
                        type: 'danger',
                        stylingMode: 'outlined',
                        icon: 'trash',
                        text: $t('trading.derivative.orderContext.closeAll'),
                        onClick: closeAllOrders,
                    },
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        type: 'normal',
                        stylingMode: 'outlined',
                        icon: 'far fa-history small',
                        hint: $t('trading.derivative.orderContext.history'),
                        onClick: showPuttedOrders,
                    },
                },
            ]"
        />
        <PuttedOrdersPopup ref="puttedOrdersPopupRef" />
    </CoreContext>
</template>

<script setup>
import PuttedOrdersPopup from "../../Popups/PuttedOrdersPopup.vue";
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import CoreContext from "./CoreContext.vue";
import { ref, computed } from "vue";

const props = defineProps(["orders"]);
const emit = defineEmits(["closeOrder", "closeAllOrders", "putOrder"]);
const puttedOrdersPopupRef = ref(null);
const dataSource = computed(() =>
    Object.values(props.orders).map((order) => ({
        id: order.id,
        type: order.type,
        side: order.side > 0 ? "LONG" : "SHORT",
        price: order.entry_price,
    }))
);
const columns = [
    { field: "id", minWidth: 50 },
    { field: "type", minWidth: 90 },
    { field: "side", minWidth: 90 },
    { field: "price", minWidth: 100 },
];

function closeAllOrders() {
    emit("closeAllOrders");
}
function closeOrder(id) {
    const order = props.orders[id];
    emit("closeOrder", order);
}
function putOrder() {
    emit("putOrder");
}
function showPuttedOrders() {
    puttedOrdersPopupRef.value.show();
}
</script>

<style lang="scss">
.order-context {
    width: 320px;

    .dx-toolbar {
        padding: 0 10px;
    }
}
</style>
