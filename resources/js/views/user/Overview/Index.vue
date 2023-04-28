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
import MonthTrade from "./MonthTrade.vue";
import TradeSummary from "./TradeSummary.vue";
import Finbook from "./Finbook.vue";
import Summary from "./Summary.vue";
import LevelBar from "./LevelBar.vue";
import Contracts from "./Contracts.vue";

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
