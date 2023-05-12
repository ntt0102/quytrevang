<template>
    <div class="comments-page">
        <h2 class="content-block">
            {{ $t("admin.comments.title") }}
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
                :editing="{
                    allowAdding: false,
                    allowUpdating: false,
                    allowDeleting: true,
                    mode: 'batch',
                }"
                :showColumnHeaders="false"
                :showColumnLines="true"
                @contentReady="$mf.dataGridPreload(gridData, dataGrid)"
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
                        <div v-show="data.data.id == selectedId">
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
                            <!-- <Photoswipe v-if="data.data.url_images.length">
                <div v-for="(url, index) in data.data.url_images" :key="index">
                  <img :src="url" v-pswp="url" :alt="$appName" />
                </div>
              </Photoswipe> -->
                        </div>
                    </div>
                </template>
            </DxDataGrid>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import adminCommentsStore from "../../store/modules/Admin/Comment";

export default {
    components: {
        DxDataGrid,
        DxColumn,
    },
    data() {
        return {
            gridData: null,
            selectedId: null,
        };
    },
    beforeCreate() {
        this.$store.registerModule("Admin.comments", adminCommentsStore);
    },
    created() {
        this.fetch();
    },
    destroyed() {
        this.$store.unregisterModule("Admin.comments");
    },
    computed: {
        ...mapGetters("Admin.comments", ["comments"]),
        dataGrid: function () {
            return this.$refs.dataGrid.instance;
        },
    },
    watch: {
        comments() {
            this.cloneDeepData();
        },
    },
    methods: {
        ...mapActions("Admin.comments", [
            "fetch",
            "markAsRead",
            "delete",
            "resetState",
        ]),
        onCellClick(e) {
            if (e.columnIndex == 0) {
                this.selectedId =
                    this.selectedId != e.data.id ? e.data.id : null;
                console.log(e);
                if (e.data.read != 1) {
                    e.data.read = 1;
                    this.markAsRead(e.data.id);
                }
            }
        },
        onSave(e) {
            this.delete(e.changes.map(({ key }) => key)).then(() => {
                this.$toasted.success(this.$mt.messages.success.saved);
            });
        },
        cloneDeepData() {
            this.gridData = this.$mf.cloneDeep(this.comments);
        },
    },
};
</script>
<style lang="scss">
.comments-page {
    .dx-row > td:first-child {
        cursor: pointer;
    }
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
</style>
