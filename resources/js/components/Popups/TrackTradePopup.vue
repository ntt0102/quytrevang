<template>
  <DxPopup
    ref="popup"
    class="trade-popup"
    :showCloseButton="true"
    :fullScreen="$devices.phone ? true : false"
    :show-title="true"
    :title="$t('admin.trades.buttons.addData')"
    @hiding="onHiding"
  >
    <template #content>
      <DxScrollView>
        <div>
          <DxDataGrid
            ref="dataGrid"
            :data-source="gridData"
            key-expr="id"
            :show-borders="true"
            :column-auto-width="true"
            :allow-column-reordering="true"
            :allow-column-resizing="true"
            column-resizing-mode="widget"
            :paging="{ pageSize: 8 }"
            :headerFilter="{ visible: true }"
            :loadPanel="{ enabled: true }"
            :selection="{ mode: 'single' }"
            :editing="{
              allowAdding: permissions.includes(editPermission),
              allowUpdating: permissions.includes(editPermission),
              allowDeleting: permissions.includes(editPermission),
              mode: 'batch',
              startEditAction: 'dblClick',
            }"
            @contentReady="$mf.dataGridPreload(gridData, dataGrid)"
            @saved="onSave"
          >
            <DxColumn
              :fixed="true"
              :visible="permissions.includes(editPermission)"
              :width="35"
              type="buttons"
              cssClass="dx-datagrid-command-column"
              cell-template="commandCellTemplate"
              :caption="$t(`titles.commandHeaderTitleShort`)"
            />
            <DxColumn
              data-field="monday"
              data-type="date"
              :editor-options="{
                dateSerializationFormat: $mc.DX_SERVER_DATE_FORMAT,
                showClearButton: 'true',
                useMaskBehavior: 'true',
                applyValueMode: 'useButtons',
              }"
              :caption="$t('admin.trades.monday')"
              :validation-rules="validationRules.monday"
            />
            <DxColumn
              data-field="amount"
              data-type="number"
              :width="100"
              :caption="$t('admin.trades.amount')"
              :validation-rules="validationRules.amount"
            />
            <DxColumn
              data-field="scores"
              data-type="number"
              format="#0.#"
              :editor-options="{
                step: '0.1',
                format: '#0.#',
              }"
              :caption="$t('admin.trades.scores')"
              :validation-rules="validationRules.scores"
            />
            <DxColumn
              data-field="revenue"
              data-type="number"
              format="#,##0"
              :editor-options="{
                step: '1',
                format: '#,##0',
              }"
              :caption="$t('admin.trades.revenue')"
              :validation-rules="validationRules.revenue"
            />
            <DxColumn
              data-field="loss"
              data-type="number"
              format="#,##0"
              :editor-options="{
                step: '1',
                format: '#,##0',
              }"
              :caption="$t('admin.trades.loss')"
              :validation-rules="validationRules.loss"
            />
            <DxColumn
              data-field="fees"
              data-type="number"
              format="#,##0"
              :editor-options="{
                step: '1',
                format: '#,##0',
              }"
              :caption="$t('admin.trades.fees')"
              :validation-rules="validationRules.fees"
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
                      icon: 'trash',
                      hint: $t('buttons.delete'),
                      text: $t('buttons.delete'),
                      onClick: () => {
                        dataGrid.deleteRow(data.rowIndex);
                      },
                    },
                  },
                ]"
              />
            </template>
          </DxDataGrid>
        </div>
      </DxScrollView>
    </template>
  </DxPopup>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";

export default {
  components: {
    DxDataGrid,
    DxColumn,
  },
  data() {
    return {
      gridData: null,
      editPermission: "trades@edit",
      validationRules: {
        amount: [
          {
            type: "required",
            message:
              this.$t("admin.trades.amount") + this.$mt.validations.required,
          },
        ],
        scores: [
          {
            type: "required",
            message:
              this.$t("admin.trades.scores") + this.$mt.validations.required,
          },
        ],
        revenue: [
          {
            type: "required",
            message:
              this.$t("admin.trades.revenue") + this.$mt.validations.required,
          },
        ],
        loss: [
          {
            type: "required",
            message:
              this.$t("admin.trades.loss") + this.$mt.validations.required,
          },
        ],
        fees: [
          {
            type: "required",
            message:
              this.$t("admin.trades.fees") + this.$mt.validations.required,
          },
        ],
        monday: [
          {
            type: "required",
            message:
              this.$t("admin.trades.monday") + this.$mt.validations.required,
          },
          {
            type: "custom",
            validationCallback: this.validateMonday,
            message: this.$t("admin.trades.validations.monday"),
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters("Auth", ["permissions"]),
    ...mapGetters("Admin.trades", ["chart", "trades"]),
    popup() {
      return this.$refs.popup.instance;
    },
    dataGrid: function () {
      return this.$refs.dataGrid.instance;
    },
  },
  watch: {
    trades() {
      this.gridData = this.$mf.cloneDeep(this.trades);
    },
  },
  methods: {
    ...mapActions("Admin.trades", ["fetch", "save"]),
    show() {
      this.popup.show();
      this.fetch().then(() => {
        this.gridData = this.$mf.cloneDeep(this.trades);
      });
      this.$mf.pushPopupToHistoryState(() => this.popup.hide());
    },
    onSave(formData) {
      setTimeout(
        () => this.$bus.emit("checkPin", () => this.save(formData)),
        100
      );
    },
    validateMonday(e) {
      return moment(e.value).day() === 1;
    },
    onHiding() {
      this.gridData = null;
      this.$mf.popRouteHistoryState();
    },
  },
};
</script>
<style lang="scss">
.trade-popup {
  .dx-popup-content {
    padding: 0;
  }
}
</style>
