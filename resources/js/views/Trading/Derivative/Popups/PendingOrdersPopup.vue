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
                    text: $t('trading.derivative.orderContext.closeAll'),
                    onClick: closeAllOrders,
                },
            },
        ]"
        @shown="onShown"
        @hidden="onHidden"
    >
        <DxDataGrid
            :data-source="pendingOrders"
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
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const emit = defineEmits(["closeAllOrders"]);
const pendingOrders = computed(
    () => store.state.tradingDerivative.status.pendingOrders
);
const popupRef = ref(null);
const columns = [
    { field: "time", minWidth: 100 },
    { field: "type", minWidth: 70 },
    { field: "side", minWidth: 90 },
    { field: "volume", minWidth: 70 },
    { field: "price", minWidth: 130 },
];

function show() {
    popupRef.value.show();
}

function onShown() {}
function onHidden() {}

function closeAllOrders() {
    emit("closeAllOrders");
}

defineExpose({
    show,
});
</script>
<style lang="scss"></style>
