<template>
  <div class="overview-page">
    <h2 class="content-block">
      {{ $t("user.overview.title") }}
    </h2>
    <TradeSummary v-if="permissions.includes('trades@view')" />
    <LevelBar v-if="level < 6" />
    <WeekTrade v-if="level > 1" />
    <Finbook v-if="permissions.includes('finbooks@control')" />
    <Summary v-if="permissions.includes('contracts@control')" />
    <Contracts v-if="level >= 6" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
const WeekTrade = () =>
  import(/* webpackPrefetch: true */ "./Overview/WeekTrade.vue");
const TradeSummary = () =>
  import(/* webpackPrefetch: true */ "./Overview/TradeSummary.vue");
const Finbook = () =>
  import(/* webpackPrefetch: true */ "./Overview/Finbook.vue");
const Summary = () =>
  import(/* webpackPrefetch: true */ "./Overview/Summary.vue");
const LevelBar = () =>
  import(/* webpackPrefetch: true */ "./Overview/LevelBar.vue");
const Contracts = () =>
  import(/* webpackPrefetch: true */ "./Overview/Contracts.vue");
export default {
  components: {
    WeekTrade,
    TradeSummary,
    Finbook,
    Summary,
    LevelBar,
    Contracts,
  },
  computed: {
    ...mapGetters("Auth", ["level", "permissions"]),
  },
};
</script>
<style lang="scss">
.overview-page {
  .content-block:not(:last-child) {
    margin-bottom: 20px;
  }
}
</style>
