<template>
  <section class="faqs">
    <h5 class="uppercase center">
      <b>{{ $t("policy.faq.title") }}</b>
    </h5>
    <DxDataGrid
      ref="dataGrid"
      :data-source="gridData"
      :show-borders="false"
      :column-auto-width="true"
      :paging="{ pageSize: 10 }"
      :loadPanel="{ enabled: true }"
      :searchPanel="{ visible: true, text: searchValue }"
      :editing="{
        allowAdding: false,
        allowUpdating: false,
        allowDeleting: false,
      }"
      @contentReady="$mf.dataGridPreload(gridData, dataGrid)"
      @rowPrepared="onRowPrepared"
    >
      <DxColumn
        :group-index="0"
        data-field="topic"
        dataType="string"
        groupCellTemplate="groupCellTemplate"
      />
      <DxColumn dataType="string" cell-template="dataCellTemplate" />
      <DxColumn data-field="question" dataType="string" :visible="false" />
      <DxColumn data-field="answer" dataType="string" :visible="false" />
      <template #dataCellTemplate="{ data }">
        <div class="item">
          <div class="question" @click="onItemClick(data)">
            {{ data.data.question }}
          </div>
          <div
            v-show="data.data.id == selectedId"
            class="answer"
            v-html="data.data.answer"
          ></div>
        </div>
      </template>
      <template #groupCellTemplate="{ data }">
        <div @click="onClick(data)">{{ data.text }}</div>
      </template>
    </DxDataGrid>
  </section>
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
      selectedId: null,
      gridData: null,
      searchValue: null,
    };
  },
  created() {
    if (this.$route.query.search) this.searchValue = this.$route.query.search;
    if (!!this.faqs) this.cloneDeepData();
  },
  computed: {
    ...mapGetters("Policy", ["faqs"]),
    dataGrid: function () {
      return this.$refs.dataGrid.instance;
    },
  },
  watch: {
    faqs() {
      this.cloneDeepData();
      this.selectedId = this.faqs.reduce(
        (id, item) => (item.question == this.searchValue ? item.id : id),
        0
      );
    },
  },
  methods: {
    onItemClick(e) {
      this.selectedId = this.selectedId != e.data.id ? e.data.id : null;
    },
    cloneDeepData() {
      this.gridData = this.$mf.cloneDeep(this.faqs);
    },
    onRowPrepared(e) {
      if (e.rowType == "header") e.rowElement.style.display = "none";
    },
    onClick(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="scss">
.faqs {
  min-height: 500px;

  .dx-toolbar-item-content > .dx-texteditor {
    width: 100%;
    margin-left: 0px;
  }

  .item {
    white-space: pre-line;

    .question {
      font-weight: bold;
      cursor: pointer;
      margin-top: -20px;
    }

    .answer {
      padding-top: 20px;
      color: darken(white, 30);
    }
  }
}
</style>