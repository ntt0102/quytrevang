<template>
    <div class="finbooks-page content-block dx-card responsive-paddings">
        <DxDataGrid
            ref="dataGridRef"
            :data-source="state.gridData"
            key-expr="id"
            :show-borders="true"
            :column-auto-width="true"
            :allow-column-reordering="true"
            :allow-column-resizing="true"
            column-resizing-mode="widget"
            :paging="{ pageSize: 10 }"
            :headerFilter="{ visible: true }"
            :loadPanel="{ enabled: true }"
            :selection="{ mode: 'single' }"
            :editing="{
                allowAdding: true,
                allowUpdating: true,
                allowDeleting: true,
                confirmDelete: false,
                mode: 'batch',
            }"
            @contentReady="
                $mf.dataGridPreload(state.gridData, dataGridRef.instance)
            "
            @init-new-row="onInitNewRow"
            @saved="onSave"
        >
            <DxColumn
                :fixed="true"
                :width="$screen.getScreenSizeInfo.isXSmall ? 35 : 70"
                alignment="center"
                type="buttons"
                cssClass="dx-datagrid-command-column"
                cell-template="commandCellTemplate"
                :caption="
                    $t(
                        `titles.commandHeaderTitle${
                            $screen.getScreenSizeInfo.isXSmall ? 'Short' : ''
                        }`
                    )
                "
            />
            <DxColumn
                data-field="display"
                dataType="number"
                :caption="$t('trading.finbooks.display')"
                :validation-rules="state.validationRules.display"
            />
            <DxColumn
                data-field="name"
                dataType="string"
                :header-filter="{ allowSearch: true }"
                :caption="$t('trading.finbooks.name')"
                :validation-rules="state.validationRules.name"
            />
            <DxColumn
                data-field="balance"
                data-type="number"
                format="#,##0 ₫"
                :editor-options="{
                    step: '1000000',
                    format: '#,##0 ₫',
                }"
                :header-filter="{ allowSearch: true }"
                :caption="$t('trading.finbooks.balance')"
                :validation-rules="state.validationRules.balance"
            />
            <DxColumn
                data-field="last_transaction"
                dataType="string"
                :header-filter="{ allowSearch: true }"
                :caption="$t('trading.finbooks.lastTransaction')"
                :validation-rules="state.validationRules.lastTransaction"
            />
            <DxColumn
                :allow-editing="false"
                data-field="updated_at"
                data-type="date"
                :editor-options="{
                    dateSerializationFormat: $mc.DX_SERVER_DATE_FORMAT,
                }"
                :caption="$t('trading.finbooks.updatedAt')"
            />
            <template #commandCellTemplate="{ data }">
                <DxToolbar
                    :items="[
                        {
                            locateInMenu: 'auto',
                            showText: 'inMenu',
                            location: 'center',
                            widget: 'dxButton',
                            options: {
                                type: 'default',
                                icon: 'far fa-envelope-open-dollar small',
                                hint: $t('trading.finbooks.createTransaction'),
                                text: $t('trading.finbooks.createTransaction'),
                                onClick: () =>
                                    $refs.transactionFinbookPopupRef.show(
                                        data.data
                                    ),
                            },
                        },
                        {
                            visible: data.data.balance == 0,
                            locateInMenu: 'auto',
                            showText: 'inMenu',
                            location: 'center',
                            widget: 'dxButton',
                            options: {
                                type: 'default',
                                icon: 'trash',
                                hint: $t('buttons.delete'),
                                text: $t('buttons.delete'),
                                onClick: () =>
                                    dataGrid.instance.deleteRow(data.rowIndex),
                            },
                        },
                    ]"
                />
            </template>
        </DxDataGrid>
        <TransactionFinbookPopup ref="transactionFinbookPopupRef" />
    </div>
</template>
<script setup>
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import TransactionFinbookPopup from "./TransactionFinbookPopup.vue";
import { useStore } from "vuex";
import { inject, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
const bus = inject("bus");
const mt = inject("mt");
const mf = inject("mf");
const dataGridRef = ref(null);
const state = reactive({
    gridData: null,
    validationRules: {
        name: [
            {
                type: "required",
                message: t("trading.finbooks.name") + mt.validations.required,
            },
        ],
        balance: [
            {
                type: "required",
                message:
                    t("trading.finbooks.balance") + mt.validations.required,
            },
        ],
        lastTransaction: [
            {
                type: "required",
                message:
                    t("trading.finbooks.lastTransaction") +
                    mt.validations.required,
            },
        ],
        display: [
            {
                type: "required",
                message:
                    t("trading.finbooks.display") + mt.validations.required,
            },
        ],
    },
});
store.dispatch("tradingFinbook/getFinbook");
watch(
    () => store.state.tradingFinbook.finbooks,
    (value) => {
        state.gridData = mf.cloneDeep(value);
    }
);

function onSave(e) {
    bus.emit("checkPin", () =>
        store.dispatch("tradingFinbook/save", { changes: e.changes })
    );
}
function onInitNewRow(e) {
    e.data.last_transaction = t("trading.finbooks.openNewBook");
}
</script>
<style lang="scss"></style>
