<template>
    <div class="settings-page">
        <h2 class="content-block">
            {{ $t("settings.parameters.title") }}
        </h2>
        <div class="content-block dx-card responsive-paddings">
            <DxDataGrid
                ref="dataGrid"
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
                    allowAdding: false,
                    allowUpdating: true,
                    allowDeleting: false,
                    mode: 'batch',
                    startEditAction: 'dblClick',
                }"
                @contentReady="$mf.dataGridPreload(gridData, dataGrid)"
                @saved="onSave"
            >
                <DxColumn
                    :allow-editing="false"
                    data-field="description"
                    :header-filter="{ allowSearch: true }"
                    :caption="$t('admin.settings.parameters.description')"
                />
                <DxColumn
                    data-field="value"
                    :caption="$t('admin.settings.parameters.value')"
                    :validation-rules="validationRules.value"
                />
            </DxDataGrid>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import adminSettingsParametersStore from "../../store/modules/Settings/Parameters";

export default {
    components: {
        DxDataGrid,
        DxColumn,
    },
    data() {
        return {
            gridData: null,
            validationRules: {
                value: [
                    {
                        type: "required",
                        message:
                            this.$t("settings.parameters.value") +
                            this.$mt.validations.required,
                    },
                ],
            },
        };
    },
    beforeCreate() {
        this.$store.registerModule(
            "Settings.parameters",
            adminSettingsParametersStore
        );
    },
    created() {
        this.fetch();
    },
    destroyed() {
        this.$store.unregisterModule("Settings.parameters");
    },
    computed: {
        ...mapGetters("Settings.parameters", ["parameters"]),
        dataGrid: function () {
            return this.$refs.dataGrid.instance;
        },
    },
    watch: {
        parameters() {
            this.cloneDeepData();
        },
    },
    methods: {
        ...mapActions("Settings.parameters", ["fetch", "save", "resetState"]),
        onSave(formData) {
            this.$bus.emit("checkPin", () => this.save(formData));
        },
        cloneDeepData() {
            this.gridData = this.$mf.cloneDeep(this.parameters);
        },
    },
};
</script>
<style lang="scss"></style>
