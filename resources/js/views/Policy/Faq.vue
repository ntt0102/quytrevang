<template>
    <section class="faqs">
        <h5 class="uppercase center">
            <b>{{ $t("policy.faq.title") }}</b>
        </h5>
        <DxDataGrid
            ref="dataGridRef"
            :data-source="state.gridData"
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
            @contentReady="
                $mf.dataGridPreload(state.gridData, dataGridRef.instance)
            "
            @rowPrepared="onRowPrepared"
        >
            <DxColumn
                :group-index="0"
                data-field="topic"
                dataType="string"
                groupCellTemplate="groupCellTemplate"
            />
            <DxColumn dataType="string" cell-template="dataCellTemplate" />
            <DxColumn
                data-field="question"
                dataType="string"
                :visible="false"
            />
            <DxColumn data-field="answer" dataType="string" :visible="false" />
            <template #dataCellTemplate="{ data }">
                <div class="item">
                    <div class="question" @click="onItemClick(data)">
                        {{ data.data.question }}
                    </div>
                    <div
                        v-show="data.data.id == state.selectedId"
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

<script setup>
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import { reactive, ref, watch, inject } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();
const mf = inject("mf");
const dataGridRef = ref(null);

const state = reactive({
    selectedId: null,
    gridData: null,
    searchValue: null,
});
if (route.query.search) state.searchValue = route.query.search;
watch(
    () => store.state.policy.data.faqs,
    (value) => {
        state.gridData = mf.cloneDeep(value);
        state.selectedId = value.reduce(
            (id, item) => (item.question == state.searchValue ? item.id : id),
            0
        );
    }
);

function onItemClick(e) {
    state.selectedId = state.selectedId != e.data.id ? e.data.id : null;
}
function onRowPrepared(e) {
    if (e.rowType == "header") e.rowElement.style.display = "none";
}
function onClick(e) {}
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
        }

        .answer {
            padding-top: 20px;
            color: darken(white, 30);
        }
    }
}
</style>
