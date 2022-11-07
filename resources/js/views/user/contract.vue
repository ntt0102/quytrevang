<template>
  <div>
    <h2 class="content-block">
      {{ $t("user.contract.title") }}
    </h2>
    <div class="content-block dx-card responsive-paddings">
      <DxDataGrid
        ref="dataGrid"
        :column-min-width="40"
        :data-source="gridData"
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
          allowUpdating: allowModifying,
          allowDeleting: allowModifying,
          confirmDelete: false,
          mode: 'popup',
          popup: {
            width: 300,
            height: $devices.phone ? 250 : 210,
            fullScreen: false,
            showTitle: true,
            onShown: onShown,
            onHiding: $mf.popRouteHistoryState,
          },
          form: {
            labelLocation: $devices.phone ? 'top' : 'left',
            items: [{ dataField: 'principal', colSpan: 2 }],
          },
        }"
        @cell-prepared="$mf.setContractStatusColor"
        @contentReady="$mf.dataGridPreload(gridData, dataGrid)"
        @init-new-row="onInitNewRow"
        @editing-start="onEditingStart"
        @toolbar-preparing="onToolbarPreparing"
        @saved="onSaved"
      >
        <DxColumn
          :fixed="true"
          :width="$devices.phone ? 35 : 98"
          type="buttons"
          cssClass="dx-datagrid-command-column"
          cell-template="commandCellTemplate"
          :caption="
            $t(`titles.commandHeaderTitle${$devices.phone ? 'Short' : ''}`)
          "
        />
        <DxColumn
          :allow-editing="false"
          data-field="code"
          data-type="string"
          :header-filter="{ allowSearch: true }"
          :caption="$t('models.contract.codeShort')"
        />
        <DxColumn
          :allow-editing="false"
          data-field="status"
          :caption="$t('models.contract.status')"
          :lookup="{
            dataSource: $mf.getContractStatusList(),
            displayExpr: 'name',
            valueExpr: 'value',
          }"
        />
        <DxColumn
          name="principal"
          data-field="principal"
          data-type="number"
          format="#,##0 ₫"
          :editor-options="{
            step: '1000000',
            format: '#,##0 ₫',
          }"
          :header-filter="{ allowSearch: true }"
          :caption="$t('models.contract.principal')"
          :validation-rules="validationRules"
        />
        <DxColumn
          :allow-editing="false"
          data-field="interest_rate"
          data-type="number"
          :format="'#0.## %/' + $t('models.contract.frequency')"
          :caption="$t('models.contract.interestRate')"
        />
        <DxColumn
          :allow-editing="false"
          name="paidAt"
          data-field="paid_at"
          data-type="date"
          :caption="$t('models.contract.paidAt')"
        />
        <DxColumn
          :allow-editing="false"
          name="withdrawnAt"
          data-field="withdrawn_at"
          data-type="date"
          :caption="$t('models.contract.withdrawnAt')"
        >
        </DxColumn>
        <template #commandCellTemplate="{ data }">
          <DxToolbar
            :items="[
              {
                visible: data.data.status <= 1,
                locateInMenu: 'auto',
                showText: 'inMenu',
                location: 'before',
                widget: 'dxButton',
                options: {
                  type: 'default',
                  icon: `far fa-${
                    data.data.status == 0 ? 'arrow-square-up' : 'receipt'
                  }`,
                  hint: $t(
                    data.data.status == 0
                      ? 'user.contract.paidContract'
                      : 'user.contract.editPaidContract'
                  ),
                  text: $t(
                    data.data.status == 0
                      ? 'user.contract.paidContract'
                      : 'user.contract.editPaidContract'
                  ),
                  onClick: () => $refs.payingContractPopup.show(data.data),
                },
              },
              {
                visible: data.data.status == 2,
                locateInMenu: 'auto',
                showText: 'inMenu',
                location: 'before',
                widget: 'dxButton',
                options: {
                  type: 'default',
                  icon: 'far fa-arrow-square-down',
                  hint: $t('user.contract.withdrawContract'),
                  text: $t('user.contract.withdrawContract'),
                  onClick: () => $refs.withdrawingContractPopup.show(data.data),
                },
              },
              {
                visible: data.data.status == 3,
                locateInMenu: 'auto',
                showText: 'inMenu',
                location: 'before',
                widget: 'dxButton',
                options: {
                  type: 'default',
                  icon: 'undo',
                  hint: $t('user.contract.unwithdrawContract'),
                  text: $t('user.contract.unwithdrawContract'),
                  onClick: () =>
                    $bus.emit('checkPin', () =>
                      withdrawingContract({ id: data.data.id, advance: 0 })
                    ),
                },
              },
              {
                visible: data.data.status == 0,
                locateInMenu: 'auto',
                showText: 'inMenu',
                location: 'before',
                widget: 'dxButton',
                options: {
                  type: 'default',
                  icon: 'edit',
                  hint: $t('buttons.edit'),
                  text: $t('buttons.edit'),
                  onClick: () => dataGrid.editRow(data.rowIndex),
                },
              },
              {
                visible: data.data.status == 0,
                locateInMenu: 'auto',
                showText: 'inMenu',
                location: 'before',
                widget: 'dxButton',
                options: {
                  type: 'default',
                  icon: 'trash',
                  hint: $t('buttons.delete'),
                  text: $t('buttons.delete'),
                  onClick: () =>
                    $bus.emit('checkPin', () =>
                      dataGrid.deleteRow(data.rowIndex)
                    ),
                },
              },
              {
                visible: !isNaN(data.key) && data.data.status >= 1,
                locateInMenu: 'auto',
                showText: 'inMenu',
                location: 'before',
                widget: 'dxButton',
                options: {
                  type: 'default',
                  icon: 'info',
                  hint: $t('models.contract.popup.detail'),
                  text: $t('models.contract.popup.detail'),
                  onClick: () => $refs.contractDetailPopup.show(data.data),
                },
              },
            ]"
          />
        </template>
      </DxDataGrid>
    </div>
    <ContractConditionsPopup ref="contractConditionsPopup" />
    <PayingContractPopup ref="payingContractPopup" />
    <WithdrawingContractPopup ref="withdrawingContractPopup" />
    <ContractDetailPopup ref="contractDetailPopup" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import ContractConditionsPopup from "../../components/Popups/ContractConditionsPopup.vue";
import PayingContractPopup from "../../components/Popups/PayingContractPopup.vue";
import WithdrawingContractPopup from "../../components/Popups/WithdrawingContractPopup.vue";
import ContractDetailPopup from "../../components/Popups/ContractDetailPopup.vue";
import userContractStore from "../../store/modules/User/Contract";

export default {
  components: {
    DxDataGrid,
    DxColumn,
    ContractConditionsPopup,
    PayingContractPopup,
    WithdrawingContractPopup,
    ContractDetailPopup,
  },
  data() {
    return {
      gridData: null,
      contract: { id: null },
      validationRules: [
        {
          type: "required",
          message:
            this.$t("models.contract.principal") +
            this.$mt.validations.required,
        },
        {
          type: "custom",
          validationCallback: this.validatePrincipal,
          message: this.$t("models.contract.validations.principal"),
        },
      ],
    };
  },
  beforeCreate() {
    this.$store.registerModule("User.contract", userContractStore);
  },
  created() {
    this.fetch().then(() => {
      if (this.$route.hash == "#conditions") this.showConditions();
    });
  },
  destroyed() {
    this.$store.unregisterModule("User.contract");
  },
  computed: {
    ...mapGetters("Auth", ["level"]),
    ...mapGetters("User.contract", [
      "contracts",
      "interestRate",
      "principalMin",
      "holdWeeksMin",
    ]),
    dataGrid: function () {
      return this.$refs.dataGrid.instance;
    },
  },
  watch: {
    contracts() {
      this.cloneDeepData();
    },
  },
  methods: {
    ...mapActions("User.contract", [
      "fetch",
      "save",
      "withdrawingContract",
      "resetState",
    ]),
    onSaved(formData) {
      this.save({ changes: formData.changes }).then(
        ({ isOk, type, contract }) => {
          if (isOk && type == "insert")
            this.$refs.payingContractPopup.show(contract);
        }
      );
    },
    allowModifying(e) {
      return e.row.data.status == 1;
    },
    validatePrincipal(e) {
      return e.value >= this.principalMin;
    },
    onInitNewRow(e) {
      e.data.status = 1;
      e.data.interest_rate = this.interestRate;
      e.data.paid_at = moment().format(this.$mc.SERVER_DATE_FORMAT);
      this.dataGrid.option(
        "editing.popup.title",
        this.$t("models.contract.popup.create")
      );
    },
    onEditingStart(e) {
      this.dataGrid.option(
        "editing.popup.title",
        `${this.$t("models.contract.popup.edit")} #${e.data.code}`
      );
    },
    cloneDeepData() {
      this.gridData = this.$mf.cloneDeep(this.contracts);
      if (!!this.$route.query.code) {
        this.dataGrid.columnOption("code", "filterValues", [
          +this.$route.query.code,
        ]);
      }
    },
    onShown(e) {
      this.$mf.checkPinDataGrid(e, this);
      this.$mf.pushPopupToHistoryState(() => this.dataGrid.cancelEditData());
    },
    onToolbarPreparing(e) {
      e.toolbarOptions.items.unshift({
        location: "before",
        widget: "dxButton",
        options: {
          icon: "help",
          type: "normal",
          hint: this.$t("components.contractConditions.title"),
          onClick: () => this.$refs.contractConditionsPopup.show(),
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.include-withdrawn {
  margin-left: 20px;
}
</style>
