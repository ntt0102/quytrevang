<template>
    <div class="settings-page">
        <h2 class="content-block">
            {{ $t("admin.settings.log.title") }}
        </h2>
        <div class="content-block dx-card responsive-paddings">
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
                    :paging="{ pageSize: 10 }"
                    :headerFilter="{ visible: true }"
                    :loadPanel="{ enabled: true }"
                    :selection="{ mode: 'single' }"
                    @contentReady="$mf.dataGridPreload(gridData, dataGrid)"
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
                        data-field="created_at"
                        data-type="date"
                        :caption="$t('admin.settings.log.createdAt')"
                    />
                    <DxColumn
                        data-field="causer"
                        :caption="$t('admin.settings.log.causer')"
                    />
                    <DxColumn
                        data-field="subject"
                        :caption="$t('admin.settings.log.subject')"
                    />
                    <DxColumn
                        data-field="description"
                        :caption="$t('admin.settings.log.description')"
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
                                        icon: 'info',
                                        hint: $t(
                                            'admin.settings.log.propertiesBtn'
                                        ),
                                        text: $t(
                                            'admin.settings.log.propertiesBtn'
                                        ),
                                        onClick: () =>
                                            showProperties(
                                                data.data.properties
                                            ),
                                    },
                                },
                            ]"
                        />
                    </template>
                </DxDataGrid>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import { alert } from "devextreme/ui/dialog";
import adminSettingsStore from "../../store/modules/Admin/Settings";

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
        this.$store.registerModule("Admin.settings", adminSettingsStore);
    },
    created() {
        this.fetchLog().then((activities) => (this.gridData = activities));
    },
    destroyed() {
        this.$store.unregisterModule("Admin.settings");
    },
    computed: {
        dataGrid: function () {
            return this.$refs.dataGrid.instance;
        },
    },
    methods: {
        ...mapActions("Admin.settings", ["fetchLog"]),
        showProperties(properties) {
            this.$bus.emit("checkPin", () => {
                let html = JSON.stringify(properties.attributes, undefined, 4);
                alert(
                    `<pre>${this.syntaxHighlight(html)}</pre>`,
                    this.$t("admin.settings.log.propertiesTitle")
                );
            });
        },
        syntaxHighlight(json) {
            json = json
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
            return json.replace(
                /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
                function (match) {
                    var cls = "number";
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            cls = "key";
                        } else {
                            cls = "string";
                        }
                    } else if (/true|false/.test(match)) {
                        cls = "boolean";
                    } else if (/null/.test(match)) {
                        cls = "null";
                    }
                    return '<span class="' + cls + '">' + match + "</span>";
                }
            );
        },
    },
};
</script>
<style lang="scss" scoped>
pre {
    .string {
        color: #82a055;
    }
    .number {
        color: #47a68a;
    }
    .boolean {
        color: #86a9f7;
    }
    .null {
        color: #9f68b3;
    }
    .key {
        color: #e0ac6b;
    }
}
</style>
