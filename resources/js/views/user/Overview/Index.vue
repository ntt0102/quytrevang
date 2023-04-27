<template>
    <div class="overview-page">
        <h2 class="content-block">
            {{ $t("user.overview.title") }}
        </h2>
        <TradeSummary v-if="permissions.includes('trades@view')" />
        <LevelBar v-if="level < 6" />
        <MonthTrade v-if="level > 1" />
        <Finbook v-if="permissions.includes('finbooks@control')" />
        <Summary v-if="permissions.includes('contracts@control')" />
        <Contracts v-if="level >= 6" />
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
const MonthTrade = () => import(/* webpackPrefetch: true */ "./MonthTrade.vue");
const TradeSummary = () =>
    import(/* webpackPrefetch: true */ "./TradeSummary.vue");
const Finbook = () => import(/* webpackPrefetch: true */ "./Finbook.vue");
const Summary = () => import(/* webpackPrefetch: true */ "./Summary.vue");
const LevelBar = () => import(/* webpackPrefetch: true */ "./LevelBar.vue");
const Contracts = () => import(/* webpackPrefetch: true */ "./Contracts.vue");
export default {
    components: {
        MonthTrade,
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
