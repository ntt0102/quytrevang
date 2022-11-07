<template>
  <div class="overview-contracts">
    <div class="sum dx-card responsive-paddings content-block">
      <div>
        <div class="title">{{ $t("user.overview.assetSum") }}</div>
        <div v-if="asset != null" class="currency">
          {{ asset.toFixed(0) | currency() }}
        </div>
        <div v-else>-</div>
      </div>
      <div>
        <div class="title">{{ $t("user.overview.principalSum") }}</div>
        <div v-if="principal != null" class="currency">
          {{ principal.toFixed(0) | currency() }}
        </div>
        <div v-else>-</div>
      </div>
      <div>
        <div class="title">{{ $t("user.overview.interestSum") }}</div>
        <div v-if="interest != null" class="currency interest">
          {{ interest.toFixed(0) | currency("+ ") }}
        </div>
        <div v-else>-</div>
      </div>
    </div>
    <div v-show="level >= 6" class="list content-block">
      <DxDataGrid
        ref="dataGrid"
        :data-source="gridData"
        key-expr="id"
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
        @contentReady="$mf.dataGridPreload(gridData, dataGrid)"
        @rowPrepared="onRowPrepared"
      >
        <DxColumn />
        <template #dataRowTemplate="{ data: rowInfo }">
          <tr
            role="cell"
            class="item"
            @click="$refs.contractDetailPopup.show(rowInfo.data)"
          >
            <td>
              <div class="responsive-paddings" style="position: relative">
                <div :class="['status', getStatusClass(rowInfo.data.status)]" />
                <div class="info">
                  <div>
                    <span>#{{ rowInfo.data.code }}</span>
                    <span class="interest-rate">
                      {{ rowInfo.data.interest_rate | percentInterestRate }}
                    </span>
                  </div>
                  <div class="date">
                    <div>
                      {{ rowInfo.data.paid_at | formatDate() }} ~
                      {{ rowInfo.data.withdrawn_at | formatDate() }}
                      &nbsp;
                    </div>
                    <div>({{ rowInfo.data.duration }})</div>
                  </div>
                </div>
                <div class="currency">
                  <div class="principal">
                    {{ rowInfo.data.principal | currency() }}
                  </div>
                  <div class="interest">
                    {{ rowInfo.data.interest | currency("+ ") }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </template>
      </DxDataGrid>
    </div>
    <ContractDetailPopup ref="contractDetailPopup" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import ContractDetailPopup from "../../../components/Popups/ContractDetailPopup.vue";
import userContractStore from "../../../store/modules/User/Contract";

const DURATION = 100;
const INTERVAL = 4; // 4ms

export default {
  components: {
    DxDataGrid,
    DxColumn,
    ContractDetailPopup,
  },
  data() {
    return {
      gridData: null,
      sum: {},
      interval: {},
      change: {},
      doneFlag: false,
      asset: null,
      principal: null,
      interest: null,
    };
  },
  beforeCreate() {
    this.$store.registerModule("User.contract", userContractStore);
  },
  created() {
    this.fetch(false).then(() => {
      this.gridData = this.contracts;
      this.calculateSummary();
    });
  },
  destroyed() {
    this.$store.unregisterModule("User.contract");
  },
  computed: {
    ...mapGetters("User.contract", ["contracts"]),
    ...mapGetters("Auth", ["level"]),
    dataGrid: function () {
      return this.$refs.dataGrid.instance;
    },
  },
  methods: {
    ...mapActions("User.contract", ["fetch", "resetState"]),
    onRowPrepared(e) {
      if (e.rowType == "header") e.rowElement.style.display = "none";
    },

    getStatusClass(status) {
      return `status-${status}`;
    },
    calculateSummary() {
      this.sum = this.gridData.reduce(
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
      this.calculateChange();
      this.interval = setInterval(() => {
        this.animatedNumber("principal");
        this.animatedNumber("interest");
        this.animatedNumber("asset");
        if (this.doneFlag) clearInterval(this.interval);
      }, INTERVAL);
    },
    calculateChange() {
      let counterTimes = DURATION / INTERVAL;
      this.change = {
        principal: this.sum.principal / counterTimes,
        interest: this.sum.interest / counterTimes,
        asset: this.sum.asset / counterTimes,
      };
    },
    animatedNumber(type) {
      if (this[type] < this.sum[type] - this.change[type]) {
        this[type] += this.change[type];
        this.doneFlag = false;
      } else {
        this[type] = this.sum[type];
        this.doneFlag = true;
      }
    },
  },
};
</script>
<style lang="scss">
@import "../../../../sass/variables.scss";
.overview-contracts {
  .sum {
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

  .list {
    .dx-datagrid-headers {
      border-bottom: none;
    }

    .item {
      position: relative;

      td {
        padding: 0;
        cursor: pointer;
        border-bottom: 5px darken($base-bg, 5) solid;
      }

      .responsive-paddings {
        padding: 10px 15px 10px 25px;
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
}
body[screen-size="small"] {
  .overview-contracts {
    .sum > div {
      width: 100%;
      justify-content: space-between;
    }
    .list .info {
      flex-direction: column;
    }
  }
}
</style>
