<template>
    <CorePopup
        ref="popupRef"
        :title="$t('trading.stock.filterPopup.title')"
        @shown="onShown"
        @hidden="onHidden"
    >
        <DxScrollView>
            <div>
                <div class="dx-fieldset">
                    <div class="dx-field">
                        <div class="dx-field-label">
                            {{ $t("trading.stock.filterPopup.fromDate") }}
                        </div>
                        <div class="dx-field-value">
                            <DxDateBox
                                ref="fromDateRef"
                                v-model="state.fromDate"
                                :input-attr="{ 'aria-label': 'Date' }"
                                type="date"
                            />
                        </div>
                    </div>
                    <div class="dx-field">
                        <div class="dx-field-label">
                            {{ $t("trading.stock.filterPopup.toDate") }}
                        </div>
                        <div class="dx-field-value">
                            <DxDateBox
                                v-model="state.toDate"
                                :input-attr="{ 'aria-label': 'Date' }"
                                type="date"
                            />
                        </div>
                    </div>
                    <div class="dx-field">
                        <div class="dx-field-label">
                            {{ $t("trading.stock.filterPopup.filterModel") }}
                        </div>
                        <div class="dx-field-value">
                            <DxSelectBox
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
                                :text="$t('trading.stock.filterPopup.title')"
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
import DxDateBox from "devextreme-vue/date-box";
import DxSelectBox from "devextreme-vue/select-box";
import CorePopup from "../../../components/Popups/CorePopup.vue";
import { inject, ref, reactive, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
const mf = inject("mf");
const popupRef = ref(null);
const fromDateRef = ref(null);
const state = reactive({
    fromDate: null,
    toDate: null,
    type: null,
    filterTypes: [
        { text: t("trading.stock.symbolList.filterCash"), value: "fcash" },
        { text: t("trading.stock.symbolList.filterIndex"), value: "findex" },
        { text: t("trading.stock.symbolList.filterMix"), value: "fmix" },
    ],
});
function show(option) {
    if (!!option.from) state.fromDate = moment.unix(option.from);
    if (!!option.to) state.toDate = moment.unix(option.to);
    state.type = state.filterTypes[0];
    popupRef.value.show();
}
function filterSymbols() {
    const param = {
        from: moment(state.fromDate).unix(),
        to: moment(state.toDate).unix(),
        type: state.type.value,
    };
    store.dispatch("tradingStock/filterSymbols", param);
}
function onShown() {
    store.dispatch("tradingOrder/getCopyistStatus");
    fromDateRef.value.instance.focus();
}
function onHidden() {}

defineExpose({ show });
</script>
