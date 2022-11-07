<template>
  <div class="overview-summary content-block">
    <DxDataGrid
      ref="dataGrid"
      :data-source="gridData"
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
          count: '{0} ' + $t('user.overview.userName').toLowerCase(),
          sum: '{0}',
        },
        totalItems: [
          { column: 'name', summaryType: 'count' },
          { column: 'principal', summaryType: 'sum', valueFormat: '#,##0 ₫' },
        ],
      }"
      :editing="{
        allowAdding: false,
        allowUpdating: false,
        allowDeleting: false,
      }"
      @contentReady="$mf.dataGridPreload(gridData, dataGrid)"
      @cellDblClick="onCellDblClick"
    >
      <DxColumn
        data-field="name"
        data-type="string"
        :header-filter="{ allowSearch: true }"
        :caption="$t('user.overview.userName')"
      />
      <DxColumn
        data-field="principal"
        data-type="number"
        format="#,##0 ₫"
        :header-filter="{ allowSearch: true }"
        :caption="$t('user.overview.asset')"
      />
    </DxDataGrid>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import adminContractsStore from "../../../store/modules/Admin/Contracts";

export default {
  components: {
    DxDataGrid,
    DxColumn,
  },
  data() {
    return {
      gridData: null,
    };
  },
  beforeCreate() {
    this.$store.registerModule("Admin.contracts", adminContractsStore);
  },
  created() {
    this.getSummary().then((summary) => (this.gridData = summary));
  },
  destroyed() {
    this.$store.unregisterModule("Admin.contracts");
  },
  computed: {
    dataGrid: function () {
      return this.$refs.dataGrid.instance;
    },
  },
  methods: {
    ...mapActions("Admin.contracts", ["getSummary"]),
    onCellDblClick(e) {
      if (e.rowType == "data") {
        if (e.columnIndex == 0)
          this.$router.push({ name: "users", query: { code: e.data.code } });
        else
          this.$router.push({
            name: "contracts",
            query: { userCode: e.data.code },
          });
      }
    },
  },
};
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
}
</style>
