<template>
    <div class="overview-page">
        <!-- <TradeSummary v-if="user.permissions.includes('trades@view')" /> -->
        <LevelBar v-if="user.level < 6" />
        <!-- <MonthTrade v-if="user.level > 1" /> -->
        <Finbook v-if="user.permissions.includes('finbooks@control')" />
        <Summary v-if="user.permissions.includes('contracts@control')" />
        <Contracts v-if="user.level >= 6" />
    </div>
</template>
<script setup>
import MonthTrade from "./MonthTrade.vue";
import TradeSummary from "./TradeSummary.vue";
import Finbook from "./Finbook.vue";
import Summary from "./Summary.vue";
import LevelBar from "./LevelBar.vue";
import Contracts from "./Contracts.vue";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const user = computed(() => store.state.auth.user);
</script>
<style lang="scss">
.overview-page {
    .content-block:not(:last-child) {
        margin-bottom: 20px;
    }
}
</style>
