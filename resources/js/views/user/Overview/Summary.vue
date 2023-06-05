<template>
    <div class="overview-summary dx-card responsive-paddings content-block">
        <div class="header">{{ $t("user.overview.summary.title") }}</div>
        <DxDataGrid
            ref="dataGridRef"
            :data-source="state.gridData"
            key-expr="code"
            :show-borders="false"
            :column-auto-width="true"
            :allow-column-reordering="true"
            :allow-column-resizing="true"
            column-resizing-mode="widget"
            :paging="{ pageSize: 10 }"
            :headerFilter="{ visible: true }"
            :loadPanel="{ enabled: true }"
            :summary="{
                texts: {
                    count:
                        '{0} ' +
                        $t('user.overview.summary.userName').toLowerCase(),
                    sum: '{0}',
                },
                totalItems: [
                    { column: 'name', summaryType: 'count' },
                    {
                        column: 'principal',
                        summaryType: 'sum',
                        valueFormat: '#,##0 ₫',
                    },
                ],
            }"
            :editing="{
                allowAdding: false,
                allowUpdating: false,
                allowDeleting: false,
            }"
            @contentReady="
                $mf.dataGridPreload(state.gridData, dataGridRef.instance)
            "
            @cellDblClick="onCellDblClick"
        >
            <DxColumn
                data-field="name"
                data-type="string"
                :header-filter="{ allowSearch: true }"
                :caption="$t('user.overview.summary.userName')"
            />
            <DxColumn
                data-field="principal"
                data-type="number"
                format="#,##0 ₫"
                :header-filter="{ allowSearch: true }"
                :caption="$t('user.overview.summary.asset')"
            />
        </DxDataGrid>
    </div>
</template>
<script setup>
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const dataGridRef = ref(null);
const state = reactive({
    gridData: null,
});

store
    .dispatch("adminContract/getSummary")
    .then((summary) => (state.gridData = summary));

function onCellDblClick(e) {
    if (e.rowType == "data") {
        if (e.columnIndex == 0)
            router.push({
                name: "admin-user",
                query: { code: e.data.code },
            });
        else
            router.push({
                name: "admin-contract",
                query: { userCode: e.data.code },
            });
    }
}
</script>
<style lang="scss">
.overview-summary {
    margin-bottom: 20px;

    .dx-datagrid-headers .dx-datagrid-table .dx-row > td {
        font-size: 13px;
    }
    .dx-datagrid .dx-row > td {
        font-size: 16px;
    }
    .dx-datagrid-rowsview .dx-row > td {
        cursor: pointer;
    }

    .dx-datagrid-total-footer {
        border-bottom: unset !important;
        border-top: unset !important;
    }
}
</style>
