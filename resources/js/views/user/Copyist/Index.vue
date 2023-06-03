<template>
    <div class="content-block dx-card responsive-paddings">
        <DxToolbar
            :items="[
                {
                    location: 'before',
                    widget: 'dxButton',
                    options: {
                        icon: 'far fa-cog small',
                        hint: $t('user.copyist.setting'),
                        onClick: () => $refs.settingPopupRef.show(),
                    },
                },
            ]"
        />
    </div>
    <SettingPopup ref="settingPopupRef" />
</template>
<script setup>
import SettingPopup from "./SettingPopup.vue";
import { inject, ref, reactive, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const store = useStore();
const route = useRoute();
const { t } = useI18n();
const bus = inject("bus");
const mt = inject("mt");
const mc = inject("mc");
const mf = inject("mf");
const routeHistoryState = inject("routeHistoryState");
const dataGridRef = ref(null);
const payingContractPopupRef = ref(null);
const contractConditionsPopupRef = ref(null);
const state = reactive({
    gridData: null,
    // contract: { id: null },
    validationRules: [
        {
            type: "required",
            message: t("models.contract.principal") + mt.validations.required,
        },
        {
            type: "custom",
            validationCallback: validatePrincipal,
            message: t("models.contract.validations.principal"),
        },
    ],
});
store.dispatch("userContract/getContracts").then(() => {
    if (route.hash == "#conditions") showConditions();
});

watch(
    () => store.state.userContract.contracts,
    (value) => cloneDeepData(value)
);

function onSaved(formData) {
    bus.emit("checkPin", () => {
        store
            .dispatch("userContract/save", { changes: formData.changes })
            .then(({ isOk, type, contract }) => {
                if (isOk && type == "insert")
                    payingContractPopupRef.value.show(contract);
            });
    });
}
function allowModifying(e) {
    return e.row.data.status == 1;
}
function validatePrincipal(e) {
    return e.value >= store.state.userContract.principalMin;
}
function onInitNewRow(e) {
    e.data.status = 1;
    e.data.interest_rate = store.state.userContract.interestRate;
    e.data.paid_at = moment().format(mc.SERVER_DATE_FORMAT);
    dataGridRef.value.instance.option(
        "editing.popup.title",
        t("models.contract.popup.create")
    );
}
function onEditingStart(e) {
    dataGridRef.value.instance.option(
        "editing.popup.title",
        `${t("models.contract.popup.edit")} #${e.data.code}`
    );
}
function cloneDeepData(contracts) {
    state.gridData = mf.cloneDeep(contracts);
    if (!!route.query.code) {
        dataGridRef.value.instance.columnOption("code", "filterValues", [
            +route.query.code,
        ]);
    }
}
function onShown(e) {
    mf.checkPinDataGrid(e, dataGridRef.value.instance);
    mf.pushPopupToHistoryState(routeHistoryState, () =>
        dataGridRef.value.instance.cancelEditData()
    );
}
function onHidden() {
    mf.popRouteHistoryState(routeHistoryState);
}
function onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
        location: "before",
        widget: "dxButton",
        options: {
            icon: "help",
            type: "normal",
            hint: t("components.contractConditions.title"),
            onClick: () => contractConditionsPopupRef.value.show(),
        },
    });
}
</script>

<style lang="scss" scoped>
.include-withdrawn {
    margin-left: 20px;
}
</style>
