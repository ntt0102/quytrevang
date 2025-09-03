<template>
    <div class="overview-contracts">
        <div class="sum dx-card responsive-paddings content-block">
            <div class="header">
                {{ $t("user.overview.contract.sumTitle") }}
            </div>
            <div class="body">
                <div>
                    <div class="title">
                        {{ $t("user.overview.contract.assetSum") }}
                    </div>
                    <div v-if="state.asset != null" class="currency">
                        {{ $filters.currency(state.asset.toFixed(0)) }}
                    </div>
                    <div v-else>-</div>
                </div>
                <div>
                    <div class="title">
                        {{ $t("user.overview.contract.principalSum") }}
                    </div>
                    <div v-if="state.principal != null" class="currency">
                        {{ $filters.currency(state.principal.toFixed(0)) }}
                    </div>
                    <div v-else>-</div>
                </div>
                <div>
                    <div class="title">
                        {{ $t("user.overview.contract.interestSum") }}
                    </div>
                    <div
                        v-if="state.interest != null"
                        class="currency interest"
                    >
                        {{ $filters.currency(state.interest.toFixed(0), "+ ") }}
                    </div>
                    <div v-else>-</div>
                </div>
            </div>
        </div>
        <div
            v-show="level >= 6"
            class="list dx-card responsive-paddings content-block"
        >
            <div class="header">
                {{ $t("user.overview.contract.listTitle") }}
            </div>
            <DxDataGrid
                ref="dataGridRef"
                :data-source="state.gridData"
                key-expr="code"
                :show-borders="false"
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
                    allowDeleting: false,
                }"
                data-row-template="dataRowTemplate"
                @contentReady="
                    () =>
                        $mf.dataGridPreload(
                            state.gridData,
                            dataGridRef.instance
                        )
                "
                @rowPrepared="onRowPrepared"
            >
                <DxColumn />
                <template #dataRowTemplate="{ data: rowInfo }">
                    <tr
                        role="cell"
                        class="item"
                        @click="contractDetailPopupRef.show(rowInfo.data)"
                    >
                        <td>
                            <div
                                class="responsive-paddings"
                                style="position: relative"
                            >
                                <div
                                    :class="[
                                        'status',
                                        getStatusClass(rowInfo.data.status),
                                    ]"
                                />
                                <div class="info">
                                    <div>
                                        <span>#{{ rowInfo.data.code }}</span>
                                        <span class="interest-rate">
                                            {{
                                                $filters.percentInterestRate(
                                                    rowInfo.data.interest_rate
                                                )
                                            }}
                                        </span>
                                    </div>
                                    <div class="date">
                                        <div>
                                            {{
                                                $filters.formatDate(
                                                    rowInfo.data.paid_at
                                                )
                                            }}
                                            ~
                                            {{
                                                $filters.formatDate(
                                                    rowInfo.data.withdrawn_at
                                                )
                                            }}
                                            &nbsp;
                                        </div>
                                        <div>({{ rowInfo.data.duration }})</div>
                                    </div>
                                </div>
                                <div class="currency">
                                    <div class="principal">
                                        {{
                                            $filters.currency(
                                                rowInfo.data.principal
                                            )
                                        }}
                                    </div>
                                    <div class="interest">
                                        {{
                                            $filters.currency(
                                                rowInfo.data.interest,
                                                "+ "
                                            )
                                        }}
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </template>
            </DxDataGrid>
        </div>
        <ContractDetailPopup ref="contractDetailPopupRef" />
    </div>
</template>
<script setup>
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import ContractDetailPopup from "../../../../components/Popups/ContractDetailPopup.vue";
import { computed, inject, reactive, ref } from "vue";
import { useStore } from "vuex";

const DURATION = 100;
const INTERVAL = 4; // 4ms

const store = useStore();
const mf = inject("mf");
const dataGridRef = ref(null);
const contractDetailPopupRef = ref(null);
const level = computed(() => store.state.auth.user.level);
const state = reactive({
    gridData: null,
    asset: null,
    principal: null,
    interest: null,
});
let params = {
    sum: {},
    interval: {},
    change: {},
    doneFlag: false,
};

store.dispatch("userContract/getContracts", false).then(() => {
    state.gridData = mf.cloneDeep(store.state.userContract.contracts);
    calculateSummary();
});

function onRowPrepared(e) {
    if (e.rowType == "header") e.rowElement.style.display = "none";
}
function getStatusClass(status) {
    return `status-${status}`;
}
function calculateSummary() {
    params.sum = state.gridData.reduce(
        (sum, contract) => {
            if ([2, 3].includes(contract.status)) {
                sum.principal += contract.principal;
                sum.interest += contract.interest;
                sum.asset += contract.total;
            }
            return sum;
        },
        {
            principal: 0,
            interest: 0,
            asset: 0,
        }
    );
    calculateChange();
    params.interval = setInterval(() => {
        animatedNumber("principal");
        animatedNumber("interest");
        animatedNumber("asset");
        if (params.doneFlag) clearInterval(params.interval);
    }, INTERVAL);
}
function calculateChange() {
    let counterTimes = DURATION / INTERVAL;
    params.change = {
        principal: params.sum.principal / counterTimes,
        interest: params.sum.interest / counterTimes,
        asset: params.sum.asset / counterTimes,
    };
}
function animatedNumber(type) {
    if (state[type] < params.sum[type] - params.change[type]) {
        state[type] += params.change[type];
        params.doneFlag = false;
    } else {
        state[type] = params.sum[type];
        params.doneFlag = true;
    }
}
</script>
<style lang="scss">
@import "../../../../../sass/variables.scss";
.overview-contracts {
    .sum {
        .body {
            display: flex;
            -webkit-flex-wrap: wrap;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;

            > div {
                text-align: center;
                display: flex;
                align-items: center;

                .title {
                    margin-right: 10px;
                    color: darken(white, 30);
                }
            }

            .currency {
                font-size: 20px;

                &.interest {
                    color: lime;
                }
            }
        }
    }

    .list {
        .dx-datagrid-headers {
            border-bottom: none;
        }

        .dx-data-row {
            &:not(:nth-last-child(2)) {
                border-bottom: 1px $base-border-color solid;
            }

            .item {
                position: relative;

                td {
                    padding: 0;
                    cursor: pointer;
                }

                .responsive-paddings {
                    padding: 10px 15px 10px 25px;
                }
            }
        }

        .status {
            position: absolute;
            top: 8px;
            bottom: 12px;
            left: 8px;
            width: 5px;
            border-radius: 2px;

            &.status-0,
            &.status-1 {
                background: #adadad;
            }

            &.status-2 {
                background: #86c285;
            }

            &.status-3 {
                background: #edc578;
            }

            &.status-4 {
                background: #ef7d59;
            }
        }

        .info {
            display: flex;
            justify-content: space-between;
            color: darken(white, 30);

            .interest-rate {
                margin-left: 20px;
            }

            .date {
                display: flex;
                -webkit-flex-wrap: wrap;
                flex-wrap: wrap;
            }
        }
        .currency {
            display: flex;
            -webkit-flex-wrap: wrap;
            flex-wrap: wrap;
            align-items: center;
            margin-top: 10px;

            > div:first-child {
                margin-right: auto;
            }

            .interest {
                color: lime;
                font-size: 20px;
            }

            .principal {
                font-size: 20px;
                color: white;
            }
        }
    }

    .screen-x-small & {
        .sum > .body > div {
            width: 100%;
            justify-content: space-between;
        }
        .list .info {
            flex-direction: column;
        }
    }
}
</style>
