<template>
    <div class="settings-log-page content-block dx-card responsive-paddings">
        <div>
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
                @contentReady="
                    $mf.dataGridPreload(state.gridData, dataGridRef.instance)
                "
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
                    :caption="$t('settings.log.createdAt')"
                />
                <DxColumn
                    data-field="causer"
                    :caption="$t('settings.log.causer')"
                />
                <DxColumn
                    data-field="subject"
                    :caption="$t('settings.log.subject')"
                />
                <DxColumn
                    data-field="description"
                    :caption="$t('settings.log.description')"
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
                                    hint: $t('settings.log.propertiesBtn'),
                                    text: $t('settings.log.propertiesBtn'),
                                    onClick: () =>
                                        showProperties(data.data.properties),
                                },
                            },
                        ]"
                    />
                </template>
            </DxDataGrid>
        </div>
    </div>
</template>
<script setup>
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import { alert } from "devextreme/ui/dialog";
import { inject, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
const bus = inject("bus");
const dataGridRef = ref(null);
const state = reactive({ gridData: null });

store
    .dispatch("setting/getLog")
    .then((activities) => (state.gridData = activities));

function showProperties(properties) {
    bus.emit("checkPin", () => {
        let html = JSON.stringify(properties.attributes, undefined, 4);
        alert(
            `<pre>${syntaxHighlight(html)}</pre>`,
            t("settings.log.propertiesTitle")
        );
    });
}
function syntaxHighlight(json) {
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
}
</script>
<style lang="scss">
.settings-log-page {
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
}
</style>
