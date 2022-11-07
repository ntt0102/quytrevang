<template>
  <div class="overview-week-trade dx-card responsive-paddings content-block">
    <DxChart
      ref="chart"
      :data-source="charts"
      :title="{
        text: $t('user.overview.weekTrade.title'),
        subtitle: { text: $t('user.overview.weekTrade.subtitle') },
        horizontalAlignment: 'center',
      }"
      :size="{ width: '100%', height: 300 }"
      :series="[
        {
          valueField: 'accumulatedProfit',
          argumentField: 'time',
          type: 'spline',
          color: $scss.baseAccent,
        },
      ]"
      :valueAxis="[
        {
          name: 'accumulatedProfit',
          synchronizedValue: 0,
          label: { visible: false },
          tick: { visible: false },
          visible: false,
        },
      ]"
      :legend="{ visible: false }"
    >
    </DxChart>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
const DxChart = () =>
  import(/* webpackPrefetch: true */ "devextreme-vue/chart");
import userTradeStore from "../../../store/modules/User/Trade";

export default {
  components: { DxChart },
  data() {
    return {};
  },
  beforeCreate() {
    this.$store.registerModule("User.trade", userTradeStore);
  },
  created() {
    this.getWeekChart();
    this.$bus.on("toggleMenu", () => {
      setTimeout(() => this.chart.render(), 300);
    });
  },
  destroyed() {
    this.$store.unregisterModule("User.trade");
    this.$bus.off("toggleMenu");
  },
  computed: {
    ...mapGetters("User.trade", ["charts"]),
    chart() {
      return this.$refs.chart.instance;
    },
  },
  methods: {
    ...mapActions("User.trade", ["getWeekChart"]),
  },
};
</script>
<style lang="scss">
.overview-week-trade {
  min-height: 180px;
}
</style>
