<template>
    <DxPopup
        ref="popup"
        class="trade-popup"
        :showCloseButton="true"
        :fullScreen="true"
        :show-title="true"
        :title="$t('trading.trades.buttons.tradeFlow')"
        @shown="onShown"
        @hiding="$mf.popRouteHistoryState"
    >
        <template #content>
            <DxScrollView>
                <div>
                    <DxDiagram
                        id="diagram"
                        ref="diagram"
                        :read-only="false"
                        :simple-view="false"
                    />
                </div>
            </DxScrollView>
        </template>
    </DxPopup>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { DxDiagram } from "devextreme-vue/diagram";
import { alert } from "devextreme/ui/dialog";

export default {
    components: {
        DxDiagram,
    },
    data() {
        return { patterns: null };
    },
    async mounted() {
        const patterns = await import(
            `../../locales/tradeflow/${window.lang}.js`
        );
        this.patterns = patterns.default;
        console.log(this.patterns);
    },
    computed: {
        popup() {
            return this.$refs.popup.instance;
        },
        diagram() {
            return this.$refs.diagram.instance;
        },
    },
    methods: {
        ...mapActions("Trading.trades", ["getFlow", "saveFlow"]),
        show() {
            this.popup.show();
            this.getFlow().then((data) => {
                this.diagram.import(JSON.stringify(data));
            });
            this.$mf.pushPopupToHistoryState(() => this.popup.hide());
        },
        onShown(e) {
            let items = e.component.option("toolbarItems");
            if (items.length == 0) {
                items.push(
                    {
                        toolbar: "top",
                        location: "after",
                        widget: "dxButton",
                        options: {
                            icon: "far fa-info-circle small",
                            type: "normal",
                            hint: this.$t("components.tradeFlow.detail"),
                            onClick: () => {
                                let selectedItems =
                                    this.diagram.getSelectedItems();
                                if (selectedItems.length === 1) {
                                    if (selectedItems[0].itemType === "shape") {
                                        let pattern = this.patterns.find(
                                            (p) =>
                                                p.text === selectedItems[0].text
                                        );
                                        if (pattern)
                                            alert(
                                                pattern.detail,
                                                selectedItems[0].text
                                            );
                                    }
                                } else
                                    this.$toasted.show(
                                        this.$t(
                                            "components.tradeFlow.selectSingle"
                                        )
                                    );
                            },
                        },
                    },
                    {
                        toolbar: "top",
                        location: "after",
                        widget: "dxButton",
                        options: {
                            icon: "far fa-save small",
                            type: "normal",
                            hint: this.$t("buttons.save"),
                            onClick: () => {
                                let data = this.diagram.export();
                                this.saveFlow(JSON.stringify(data)).then(() =>
                                    this.$toasted.success(
                                        this.$mt.messages.success.saved
                                    )
                                );
                            },
                        },
                    }
                );
                e.component.option("toolbarItems", items);
            }
        },
    },
};
</script>
<style lang="scss">
@import "~devexpress-diagram/dist/dx-diagram.min.css";
#diagram {
    height: calc(100vh - 150px);

    .dx-diagram-properties-popup {
        .dx-popup-normal {
            max-height: 350px !important;
            .dx-popup-content {
                overflow-y: auto;
            }
        }
    }
}
</style>
