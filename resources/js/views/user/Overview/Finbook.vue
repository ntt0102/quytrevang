<template>
    <div class="finbook-chart dx-card responsive-paddings content-block">
        <DxPieChart
            ref="pie"
            :data-source="finbooks"
            resolve-label-overlapping="shift"
            palette="Bright"
            :title="{
                text: $t('user.overview.finbook.title'),
                subtitle: { text: null },
            }"
            :legend="{
                horizontalAlignment: $devices.phone ? 'center' : 'right',
                itemTextPosition: 'right',
            }"
            :series="{
                argumentField: 'name',
                valueField: 'balance',
                label: {
                    visible: true,
                    customizeText: customizeLabel,
                    connector: {
                        visible: true,
                        width: 1,
                    },
                },
            }"
            :size="{ width: '100%', height: 450 }"
            :export="{ enabled: false }"
            @point-click="pointClickHandler"
            @legend-click="legendClickHandler"
        />
        <TransactionFinbookPopup ref="transactionFinbookPopup" />
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import DxPieChart from "devextreme-vue/pie-chart";
import TransactionFinbookPopup from "../../../components/Popups/TransactionFinbookPopup.vue";
import adminFinbooksStore from "../../../store/modules/Trading/Finbooks";

export default {
    components: {
        DxPieChart,
        TransactionFinbookPopup,
    },
    data() {
        return {
            sum: 0,
        };
    },
    beforeCreate() {
        this.$store.registerModule("Admin.finbooks", adminFinbooksStore);
    },
    created() {
        this.fetch();
        this.$bus.on("toggleMenu", () => {
            setTimeout(() => this.pie.render(), 300);
        });
    },
    destroyed() {
        this.$store.unregisterModule("Admin.finbooks");
        this.$bus.off("toggleMenu");
    },
    computed: {
        ...mapGetters("Admin.finbooks", ["finbooks"]),
        pie: function () {
            return this.$refs.pie.instance;
        },
    },
    watch: {
        finbooks() {
            this.sum = this.finbooks.reduce(
                (accumulator, object) => accumulator + object.balance,
                0
            );
            setTimeout(
                () =>
                    this.pie.option(
                        "title.subtitle.text",
                        `${this.$t(
                            "user.overview.finbook.subtitle"
                        )}: ${this.$options.filters.currency(this.sum)}`
                    ),
                0
            );
        },
    },
    methods: {
        ...mapActions("Admin.finbooks", ["fetch"]),
        pointClickHandler({ target: { data } }) {
            this.$refs.transactionFinbookPopup.show(data);
        },
        legendClickHandler(e) {
            const arg = e.target;
            const item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];
            if (item.isVisible()) item.hide();
            else item.show();
        },
        toggleVisibility(item) {
            item.isVisible() ? item.hide() : item.show();
        },
        customizeLabel(pointInfo) {
            return `${this.$options.filters.currency(pointInfo.valueText)} (${(
                (pointInfo.valueText / this.sum) *
                100
            ).toFixed(1)}%)`;
        },
    },
};
</script>
<style lang="scss"></style>
