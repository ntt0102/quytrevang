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
                data-field="id"
                :caption="$t('trading.derivative.orderContext.id')"
            />
            <DxColumn
                :width="90"
                data-field="side"
                :caption="$t('trading.derivative.orderContext.side')"
            />
            <DxColumn
                :width="90"
                data-field="price"
                :caption="$t('trading.derivative.orderContext.price')"
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
        <DxButton
            class="close-all"
            type="danger"
            stylingMode="outlined"
            icon="trash"
            :text="$t('trading.derivative.orderContext.closeAllOrders')"
            @click="closeAllOrders"
        />
    </CoreContext>
</template>

<script setup>
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import CoreContext from "./CoreContext.vue";
import { computed } from "vue";

const props = defineProps(["orders"]);
const emit = defineEmits(["closeOrder", "closeAllOrders"]);
const dataSource = computed(() =>
    Object.values(props.orders).map((order) => ({
        id: order.id,
        side: order.side > 0 ? "LONG" : "SHORT",
        price: order.entry_price,
    }))
);

function closeAllOrders() {
    emit("closeAllOrders");
}
function closeOrder(id) {
    const order = props.orders[id];
    emit("closeOrder", order);
}
</script>

<style lang="scss">
.order-context {
    width: 320px;
    .close-all {
        margin-top: 15px;
    }
}
</style>
