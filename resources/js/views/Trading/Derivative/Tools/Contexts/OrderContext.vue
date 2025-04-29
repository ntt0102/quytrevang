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
                :minWidth="column.minWidth"
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
                    disabled: canOrder === 'none',
                    location: 'before',
                    widget: 'dxButton',
                    options: {
                        type: 'danger',
                        stylingMode: 'outlined',
                        icon: 'far fa-gavel',
                        text: $t('trading.derivative.orderContext.putOrder'),
                        onClick: putOrder,
                    },
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        type: 'danger',
                        stylingMode: 'outlined',
                        icon: 'trash',
                        text: $t('trading.derivative.orderContext.closeAll'),
                        onClick: closeAllOrders,
                    },
                },
            ]"
        />
    </CoreContext>
</template>

<script setup>
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import CoreContext from "./CoreContext.vue";
import { computed } from "vue";

const props = defineProps(["orders", "canOrder"]);
const emit = defineEmits(["closeOrder", "closeAllOrders", "putOrder"]);
const dataSource = computed(() =>
    Object.values(props.orders).map((order) => ({
        id: order.id,
        side: order.side > 0 ? "L" : "S",
        price: order.entry_price,
    }))
);
const columns = [
    { field: "id", minWidth: 50 },
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
</script>

<style lang="scss">
.order-context {
    width: 320px;

    .dx-toolbar {
        padding: 0 10px;
    }
}
</style>
