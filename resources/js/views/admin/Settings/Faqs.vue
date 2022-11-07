<template>
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
      :editing="{
        allowAdding: true,
        allowUpdating: true,
        allowDeleting: true,
        confirmDelete: false,
        mode: 'popup',
        popup: {
          showTitle: true,
          onShown: onShown,
          onHiding: $mf.popRouteHistoryState,
        },
        form: {
          labelLocation: $devices.phone ? 'top' : 'left',
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
              label: { text: $t('admin.settings.faqs.useHtml') },
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
      @contentReady="$mf.dataGridPreload(gridData, dataGrid)"
      @init-new-row="onInitNewRow"
      @editing-start="onEditingStart"
      @saved="onSave"
    >
      <DxColumn
        :fixed="true"
        :width="$devices.phone ? 35 : 65"
        type="buttons"
        cssClass="dx-datagrid-command-column"
        cell-template="commandCellTemplate"
        :caption="
          $t(`titles.commandHeaderTitle${$devices.phone ? 'Short' : ''}`)
        "
      />
      <DxColumn
        data-field="topic"
        :header-filter="{ allowSearch: true }"
        :caption="$t('admin.settings.faqs.topic')"
        :validation-rules="validationRules.topic"
      />
      <DxColumn
        data-field="question"
        :header-filter="{ allowSearch: true }"
        :caption="$t('admin.settings.faqs.question')"
        :validation-rules="validationRules.question"
      />
      <DxColumn
        :visible="false"
        data-field="answer"
        :header-filter="{ allowSearch: true }"
        :caption="$t('admin.settings.faqs.answer')"
        :validation-rules="validationRules.answer"
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
                  dataGrid.editRow(data.rowIndex);
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
                    dataGrid.deleteRow(data.rowIndex)
                  ),
              },
            },
          ]"
        />
      </template>
    </DxDataGrid>
    <PickImagePopup ref="pickImagePopup" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import DxTextArea from "devextreme-vue/text-area";
import DxHtmlEditor from "devextreme-vue/html-editor";
import PickImagePopup from "../../../components/Popups/PickImagePopup.vue";
import adminSettingsFaqsStore from "../../../store/modules/Admin/Settings/Faqs";

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxTextArea,
    DxHtmlEditor,
    PickImagePopup,
  },
  data() {
    return {
      gridData: null,
      validationRules: {
        topic: [
          {
            type: "required",
            message:
              this.$t("admin.settings.faqs.topic") +
              this.$mt.validations.required,
          },
        ],
        question: [
          {
            type: "required",
            message:
              this.$t("admin.settings.faqs.question") +
              this.$mt.validations.required,
          },
        ],
        answer: [
          {
            type: "required",
            message:
              this.$t("admin.settings.faqs.answer") +
              this.$mt.validations.required,
          },
        ],
      },
    };
  },
  beforeCreate() {
    this.$store.registerModule("Admin.settings.faqs", adminSettingsFaqsStore);
  },
  created() {
    this.fetch();
  },
  destroyed() {
    this.$store.unregisterModule("Admin.settings.faqs");
  },
  computed: {
    ...mapGetters("Admin.settings.faqs", ["faqs"]),
    dataGrid: function () {
      return this.$refs.dataGrid.instance;
    },
  },
  watch: {
    faqs() {
      this.cloneDeepData();
    },
  },
  methods: {
    ...mapActions("Admin.settings.faqs", ["fetch", "save", "resetState"]),
    onSave(formData) {
      this.save(formData);
    },
    cloneDeepData() {
      this.gridData = this.$mf.cloneDeep(this.faqs);
    },
    onUseHtmlChange(e) {
      this.dataGrid.option(
        "editing.form.items[2].editorOptions.value",
        e.value
      );
      this.dataGrid.option("editing.form.items[3].visible", !e.value);
      this.dataGrid.option("editing.form.items[4].visible", e.value);
    },
    onInitNewRow(e) {
      this.dataGrid.option(
        "editing.popup.title",
        this.$t("admin.settings.faqs.popup.create")
      );
    },
    onEditingStart(e) {
      const isUseHtml = /<\/?[a-z][\s\S]*>/i.test(e.data.answer);
      this.onUseHtmlChange({ value: isUseHtml });
      this.dataGrid.option(
        "editing.popup.title",
        this.$t("admin.settings.faqs.popup.edit")
      );
    },
    onShown(e) {
      this.$mf.checkPinDataGrid(e, this);
      let items = e.component.option("toolbarItems");
      items.push({
        toolbar: "bottom",
        location: "before",
        widget: "dxButton",
        options: {
          icon: "image",
          text: this.$t("titles.chooseImage"),
          onClick: () => this.$refs.pickImagePopup.show({ clientPath: "faqs" }),
        },
      });
      e.component.option("toolbarItems", items);
      this.$mf.pushPopupToHistoryState(() => this.dataGrid.cancelEditData());
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
