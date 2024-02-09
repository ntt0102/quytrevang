<template>
    <CorePopup
        ref="popupRef"
        :title="$t('trading.stock.settingPopup.title')"
        @shown="onShown"
        @hidden="onHidden"
    >
        <DxScrollView>
            <div>
                <div class="dx-fieldset">
                    <div class="dx-field">
                        <div class="dx-field-label">
                            {{ $t("trading.stock.settingPopup.dateRange") }}
                        </div>
                        <div class="dx-field-value">
                            <DxDateRangeBox v-model="state.dateRange" />
                        </div>
                    </div>
                    <div class="dx-field">
                        <div class="dx-field-label">
                            {{ $t("trading.stock.settingPopup.filterModel") }}
                        </div>
                        <div class="dx-field-value">
                            <DxSelectBox
                                :width="'130px'"
                                height="30px"
                                :data-source="state.filterTypes"
                                keyExpr="value"
                                displayExpr="text"
                                v-model="state.type"
                            />
                        </div>
                    </div>
                    <div class="dx-field">
                        <div class="dx-field-label"></div>
                        <div class="dx-field-value">
                            <DxButton
                                icon="far fa-filter"
                                :text="$t('trading.stock.settingPopup.title')"
                                @click="filterSymbols()"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </DxScrollView>
    </CorePopup>
</template>
<script setup>
import DxDateRangeBox from "devextreme-vue/date-range-box";
import DxSelectBox from "devextreme-vue/select-box";
import CorePopup from "../../../components/Popups/CorePopup.vue";
import { inject, ref, reactive, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
const mf = inject("mf");
const popupRef = ref(null);
const state = reactive({
    dateRange: [],
    type: "cash",
    filterTypes: [
        { text: t("trading.stock.settingPopup.filterCash"), value: "cash" },
        { text: t("trading.stock.settingPopup.filterIndex"), value: "index" },
        { text: t("trading.stock.settingPopup.filterMix"), value: "mix" },
    ],
});

function show() {
    popupRef.value.show();
}
function filterSymbols(e) {
    const param = {
        from: moment(state.dateRange[0]).unix(),
        to: moment(state.dateRange[1]).unix(),
        type: e.itemData.value,
    };
    store.dispatch("tradingStock/filterSymbols", param);
}
function onShown() {
    store.dispatch("tradingOrder/getCopyistStatus");
}
function onHidden() {}

defineExpose({ show });
</script>
