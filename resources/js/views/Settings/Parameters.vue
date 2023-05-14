<template>
    <div class="content-block dx-card responsive-paddings">
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
                allowAdding: false,
                allowUpdating: true,
                allowDeleting: false,
                mode: 'batch',
                startEditAction: 'dblClick',
            }"
            @contentReady="
                $mf.dataGridPreload(state.gridData, dataGridRef.instance)
            "
            @saved="onSave"
        >
            <DxColumn
                :allow-editing="false"
                data-field="description"
                :header-filter="{ allowSearch: true }"
                :caption="$t('settings.parameters.description')"
            />
            <DxColumn
                data-field="value"
                :caption="$t('settings.parameters.value')"
                :validation-rules="state.validationRules.value"
            />
        </DxDataGrid>
    </div>
</template>
<script setup>
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import { inject, onUnmounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
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
        value: [
            {
                type: "required",
                message:
                    t("settings.parameters.value") + mt.validations.required,
            },
        ],
    },
});

store.dispatch("settingParameter/getParameters");
watch(
    () => store.state.settingParameter.parameters,
    (value) => {
        state.gridData = mf.cloneDeep(value);
    }
);
onUnmounted(() => store.dispatch("settingParameter/resetState"));
function onSave(formData) {
    if (!formData.length) return;
    bus.emit("checkPin", () =>
        store.dispatch("settingParameter/save", formData)
    );
}
</script>
