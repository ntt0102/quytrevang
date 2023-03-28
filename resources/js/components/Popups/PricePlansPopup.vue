<template>
    <DxPopup
        ref="popup"
        class="price-plans-popup"
        :showCloseButton="true"
        :fullScreen="$devices.phone ? true : false"
        :show-title="true"
        :title="$t('admin.smartorders.pricePlans')"
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
                            allowAdding: true,
                            allowUpdating: true,
                            allowDeleting: true,
                            mode: 'batch',
                            startEditAction: 'dblClick'
                        }"
                        @contentReady="$mf.dataGridPreload(gridData, dataGrid)"
                        @saved="onSave"
                    >
                        <DxColumn
                            :fixed="true"
                            :width="35"
                            type="buttons"
                            cssClass="dx-datagrid-command-column"
                            cell-template="commandCellTemplate"
                            :caption="$t(`titles.commandHeaderTitleShort`)"
                        />
                        <DxColumn
                            data-field="name"
                            data-type="string"
                            :caption="$t('admin.smartorders.planName')"
                            :validation-rules="validationRules.name"
                        />
                        <DxColumn
                            data-field="months"
                            data-type="number"
                            :caption="$t('admin.smartorders.months')"
                            :validation-rules="validationRules.months"
                        />
                        <DxColumn
                            data-field="price"
                            data-type="number"
                            format="#,##0"
                            :editor-options="{
                                step: '1000',
                                format: '#,##0'
                            }"
                            :caption="$t('admin.smartorders.planPrice')"
                            :validation-rules="validationRules.price"
                        />
                        <DxColumn
                            data-field="renewal_price"
                            data-type="number"
                            format="#,##0"
                            :editor-options="{
                                step: '1000',
                                format: '#,##0'
                            }"
                            :caption="$t('admin.smartorders.renewalPrice')"
                            :validation-rules="validationRules.renewalPrice"
                        />
                        <DxColumn
                            data-field="highest_price"
                            data-type="number"
                            format="#,##0"
                            :editor-options="{
                                step: '1000',
                                format: '#,##0'
                            }"
                            :caption="$t('admin.smartorders.highestPrice')"
                            :validation-rules="validationRules.highestPrice"
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
                                                dataGrid.deleteRow(
                                                    data.rowIndex
                                                );
                                            }
                                        }
                                    }
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
        DxColumn
    },
    data() {
        return {
            gridData: null,
            validationRules: {
                name: [
                    {
                        type: "required",
                        message:
                            this.$t("admin.smartorders.planName") +
                            this.$mt.validations.required
                    }
                ],
                months: [
                    {
                        type: "required",
                        message:
                            this.$t("admin.smartorders.months") +
                            this.$mt.validations.required
                    }
                ],
                price: [
                    {
                        type: "required",
                        message:
                            this.$t("admin.smartorders.planPrice") +
                            this.$mt.validations.required
                    }
                ],
                renewalPrice: [
                    {
                        type: "required",
                        message:
                            this.$t("admin.smartorders.renewalPrice") +
                            this.$mt.validations.required
                    }
                ],
                highestPrice: [
                    {
                        type: "required",
                        message:
                            this.$t("admin.smartorders.highestPrice") +
                            this.$mt.validations.required
                    }
                ]
            }
        };
    },
    computed: {
        ...mapGetters("Admin.smartorders", ["plans"]),
        popup() {
            return this.$refs.popup.instance;
        },
        dataGrid: function() {
            return this.$refs.dataGrid.instance;
        }
    },
    watch: {
        plans() {
            this.gridData = this.$mf.cloneDeep(this.plans);
        }
    },
    methods: {
        ...mapActions("Admin.smartorders", ["getPlans", "savePlans"]),
        show() {
            this.popup.show();
            this.getPlans();
            // this.getPlans().then(() => {
            //     this.gridData = this.$mf.cloneDeep(this.plans);
            // });
            this.$mf.pushPopupToHistoryState(() => this.popup.hide());
        },
        onSave(e) {
            setTimeout(
                () =>
                    this.$bus.emit("checkPin", () =>
                        this.savePlans({ changes: e.changes })
                    ),
                100
            );
        },
        onHiding() {
            this.gridData = null;
            this.$mf.popRouteHistoryState();
        }
    }
};
</script>
<style lang="scss">
.price-plans-popup {
    .dx-popup-content {
        padding: 0;
    }
}
</style>
