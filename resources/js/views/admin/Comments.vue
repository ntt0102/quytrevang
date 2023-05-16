<template>
    <div class="comments-page content-block dx-card responsive-paddings">
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
            :editing="{
                allowAdding: false,
                allowUpdating: false,
                allowDeleting: true,
                mode: 'batch',
            }"
            :showColumnHeaders="false"
            :showColumnLines="true"
            @contentReady="
                $mf.dataGridPreload(state.gridData, dataGridRef.instance)
            "
            @cellClick="onCellClick"
            @saved="onSave"
        >
            <DxColumn cell-template="dataCellTemplate" />
            <DxColumn
                :width="50"
                type="buttons"
                :buttons="[{ name: 'delete' }]"
                alignment="center"
            ></DxColumn>
            <template #dataCellTemplate="{ data }">
                <div class="comment">
                    <div class="subject">
                        <span :class="data.data.read ? 'mark' : 'unread'">{{
                            data.data.subject
                        }}</span>
                        <i
                            v-if="data.data.url_images.length > 0"
                            class="far fa-paperclip"
                        ></i>
                    </div>
                    <div v-show="data.data.id == state.selectedId">
                        <div class="info">
                            <div>
                                <em>{{ data.data.sent_at }}</em>
                            </div>
                            <div>
                                <b>{{ data.data.name }}</b>
                            </div>
                            <div>
                                <i class="dx-icon-tel"></i>
                                {{ data.data.phone | phone }}
                            </div>
                            <RouterLink
                                v-if="!!data.data.user_code"
                                :to="{
                                    name: 'users',
                                    query: { code: data.data.user_code },
                                }"
                                >{{
                                    $t("admin.comments.viewUser").replace(
                                        "{code}",
                                        data.data.user_code
                                    )
                                }}</RouterLink
                            >
                        </div>
                        <div class="content">
                            {{ data.data.content }}
                        </div>
                        <Photoswipe :images="data.data.url_images" />
                    </div>
                </div>
            </template>
        </DxDataGrid>
    </div>
</template>
<script setup>
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import Photoswipe from "../../components/Photoswipe.vue";
import { reactive, ref, watch, inject } from "vue";
import { useStore } from "vuex";
import { toast } from "vue3-toastify";

const store = useStore();
const mt = inject("mt");
const mf = inject("mf");
const dataGridRef = ref(null);
const state = reactive({
    gridData: null,
    selectedId: null,
});
store.dispatch("adminComment/getComments");

watch(
    () => store.state.adminComment.comments,
    (value) => {
        state.gridData = mf.cloneDeep(value);
    }
);

function onCellClick(e) {
    if (e.columnIndex == 0) {
        state.selectedId = state.selectedId != e.data.id ? e.data.id : null;
        if (e.data.read != 1) {
            e.data.read = 1;
            store.dispatch("adminComment/markAsRead", e.data.id);
        }
    }
}
function onSave(e) {
    store
        .dispatch(
            "adminComment/delete",
            e.changes.map(({ key }) => key)
        )
        .then(() => {
            toast.success(mt.messages.success.saved);
        });
}
</script>
<style lang="scss">
.comments-page {
    .dx-row > td:first-child {
        cursor: pointer;
    }
    .comment {
        padding: 10px;
        .subject {
            .mark {
                text-decoration-line: line-through;
            }
            .unread {
                text-decoration-line: none;
                font-weight: bold;
            }
        }
        .info {
            line-height: 20px;
            font-size: 13px;
            margin: 10px 0 20px 10px;
        }
        .content {
            white-space: pre-line;
        }
    }
}
</style>
