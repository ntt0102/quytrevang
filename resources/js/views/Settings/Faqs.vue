<template>
    <div class="content-block dx-card responsive-paddings">
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
                :editing="{
                    allowAdding: true,
                    allowUpdating: true,
                    allowDeleting: true,
                    confirmDelete: false,
                    mode: 'popup',
                    popup: {
                        showTitle: true,
                        onShown: onShown,
                        onHidden: onHidden,
                    },
                    form: {
                        labelLocation: $screen.getScreenSizeInfo.isXSmall
                            ? 'top'
                            : 'left',
                        items: [
                            {
                                dataField: 'topic',
                                colSpan: 2,
                            },
                            {
                                dataField: 'question',
                                colSpan: 2,
                            },
                            {
                                editorType: 'dxCheckBox',
                                colSpan: 2,
                                editorOptions: {
                                    value: false,
                                    onValueChanged: onUseHtmlChange,
                                },
                                label: {
                                    text: $t('settings.faqs.useHtml'),
                                },
                            },
                            {
                                visible: true,
                                colSpan: 2,
                                dataField: 'answer',
                                editorType: 'dxTextArea',
                                editorOptions: {
                                    stylingMode: 'filled',
                                    height: 150,
                                },
                            },
                            {
                                visible: false,
                                dataField: 'answer',
                                colSpan: 2,
                                editorType: 'dxHtmlEditor',
                                editorOptions: {
                                    mediaResizing: { enabled: true },
                                    toolbar: {
                                        items: [
                                            'undo',
                                            'redo',
                                            'separator',
                                            'bold',
                                            'italic',
                                            'strike',
                                            'underline',
                                            'separator',
                                            'alignLeft',
                                            'alignCenter',
                                            'alignRight',
                                            'alignJustify',
                                            'separator',
                                            'orderedList',
                                            'bulletList',
                                            'separator',
                                            'color',
                                            'background',
                                            'separator',
                                            'link',
                                            'image',
                                            'separator',
                                            'clear',
                                            'insertTable',
                                        ],
                                    },
                                },
                            },
                        ],
                    },
                    startEditAction: 'dblClick',
                }"
                @contentReady="
                    $mf.dataGridPreload(state.gridData, dataGridRef.instance)
                "
                @init-new-row="onInitNewRow"
                @editing-start="onEditingStart"
                @saved="onSave"
            >
                <DxColumn
                    :fixed="true"
                    :width="$screen.getScreenSizeInfo.isXSmall ? 35 : 65"
                    type="buttons"
                    cssClass="dx-datagrid-command-column"
                    cell-template="commandCellTemplate"
                    :caption="
                        $t(
                            `titles.commandHeaderTitle${
                                $screen.getScreenSizeInfo.isXSmall
                                    ? 'Short'
                                    : ''
                            }`
                        )
                    "
                />
                <DxColumn
                    data-field="topic"
                    :header-filter="{ allowSearch: true }"
                    :caption="$t('settings.faqs.topic')"
                    :validation-rules="state.validationRules.topic"
                />
                <DxColumn
                    data-field="question"
                    :header-filter="{ allowSearch: true }"
                    :caption="$t('settings.faqs.question')"
                    :validation-rules="state.validationRules.question"
                />
                <DxColumn
                    :visible="false"
                    data-field="answer"
                    :header-filter="{ allowSearch: true }"
                    :caption="$t('settings.faqs.answer')"
                    :validation-rules="state.validationRules.answer"
                />
                <template #commandCellTemplate="{ data }">
                    <DxToolbar
                        :items="[
                            {
                                visible: data.data.status != 4,
                                locateInMenu: 'auto',
                                showText: 'inMenu',
                                location: 'center',
                                widget: 'dxButton',
                                options: {
                                    type: 'default',
                                    icon: 'edit',
                                    hint: $t('buttons.edit'),
                                    text: $t('buttons.edit'),
                                    onClick: () => {
                                        dataGridRef.instance.editRow(
                                            data.rowIndex
                                        );
                                    },
                                },
                            },
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
                                    onClick: () =>
                                        $bus.emit('checkPin', () =>
                                            dataGridRef.instance.deleteRow(
                                                data.rowIndex
                                            )
                                        ),
                                },
                            },
                        ]"
                    />
                </template>
            </DxDataGrid>
            <PickImagePopup ref="pickImagePopupRef" />
        </div>
    </div>
</template>
<script setup>
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import DxTextArea from "devextreme-vue/text-area";
import DxHtmlEditor from "devextreme-vue/html-editor";
import PickImagePopup from "../../components/Popups/PickImagePopup.vue";
import { inject, onUnmounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
const mt = inject("mt");
const mf = inject("mf");
const routeHistoryState = inject("routeHistoryState");
const dataGridRef = ref(null);
const pickImagePopupRef = ref(null);
const state = reactive({
    gridData: null,
    validationRules: {
        topic: [
            {
                type: "required",
                message: t("settings.faqs.topic") + mt.validations.required,
            },
        ],
        question: [
            {
                type: "required",
                message: t("settings.faqs.question") + mt.validations.required,
            },
        ],
        answer: [
            {
                type: "required",
                message: t("settings.faqs.answer") + mt.validations.required,
            },
        ],
    },
});

store.dispatch("settingFaq/getFaqs");

watch(
    () => store.state.settingFaq.faqs,
    (value) => {
        state.gridData = mf.cloneDeep(value);
    }
);
onUnmounted(() => store.dispatch("settingFaq/resetState"));
function onSave(formData) {
    if (!formData.length) return;
    store.dispatch("settingFaq/save", formData);
}
function onUseHtmlChange(e) {
    dataGridRef.value.instance.option(
        "editing.form.items[2].editorOptions.value",
        e.value
    );
    dataGridRef.value.instance.option(
        "editing.form.items[3].visible",
        !e.value
    );
    dataGridRef.value.instance.option("editing.form.items[4].visible", e.value);
}
function onInitNewRow(e) {
    dataGridRef.value.instance.option(
        "editing.popup.title",
        t("settings.faqs.popup.create")
    );
}
function onEditingStart(e) {
    const isUseHtml = /<\/?[a-z][\s\S]*>/i.test(e.data.answer);
    onUseHtmlChange({ value: isUseHtml });
    dataGridRef.value.instance.option(
        "editing.popup.title",
        t("settings.faqs.popup.edit")
    );
}
function onShown(e) {
    mf.checkPinDataGrid(e, dataGridRef.value.instance);
    let items = e.component.option("toolbarItems");
    items.push({
        toolbar: "bottom",
        location: "before",
        widget: "dxButton",
        options: {
            icon: "image",
            text: t("titles.chooseImage"),
            onClick: () => pickImagePopupRef.value.show({ clientPath: "faqs" }),
        },
    });
    e.component.option("toolbarItems", items);
    mf.pushPopupToHistoryState(routeHistoryState, () =>
        dataGridRef.value.instance.cancelEditData()
    );
}
function onHidden() {
    mf.popRouteHistoryState(routeHistoryState);
}
</script>
