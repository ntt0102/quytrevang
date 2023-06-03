<template>
    <CorePopup
        ref="popupRef"
        :title="$t('components.editProfile.title')"
        :toolbarItems="[
            {
                toolbar: 'bottom',
                location: 'after',
                widget: 'dxButton',
                options: {
                    text: $t('buttons.save'),
                    onClick: () => $refs.submitRef.click(),
                },
            },
            {
                toolbar: 'bottom',
                location: 'after',
                widget: 'dxButton',
                options: {
                    text: $t('buttons.cancel'),
                    onClick: () => popupRef.hide(),
                },
            },
        ]"
        @shown="onShown"
        @hidden="onHidden"
    >
        <DxScrollView>
            <form @submit.prevent="onSubmit">
                <button ref="submitRef" class="display-none" />
                <DxForm
                    ref="formRef"
                    :form-data="state.formData"
                    labelMode="floating"
                    :col-count="2"
                    :label-location="
                        $screen.getScreenSizeInfo.isXSmall ? 'top' : 'left'
                    "
                    :scrolling-enabled="true"
                >
                    <DxItem
                        item-type="group"
                        :caption="$t('models.user.groups.personalInfo')"
                    >
                        <DxItem
                            data-field="name"
                            :validation-rules="state.validationRules.name"
                            :label="{ text: $t('models.user.name') }"
                        />
                        <DxItem
                            data-field="sex"
                            editor-type="dxSelectBox"
                            :editor-options="{
                                searchEnabled: false,
                                items: $mf.getSexList(),
                                displayExpr: 'name',
                                valueExpr: 'value',
                                placeholder: $t('titles.dxSelectPlacehoder'),
                            }"
                            :validation-rules="state.validationRules.sex"
                            :label="{ text: $t('models.user.sex') }"
                        />
                        <DxItem
                            data-field="birthday"
                            editor-type="dxDateBox"
                            :editor-options="{
                                dateSerializationFormat:
                                    $mc.DX_SERVER_DATE_FORMAT,
                                showClearButton: 'true',
                                useMaskBehavior: 'true',
                            }"
                            :validation-rules="state.validationRules.birthday"
                            :label="{ text: $t('models.user.birthday') }"
                        />
                    </DxItem>
                    <DxItem
                        item-type="group"
                        :caption="$t('models.user.groups.idInfo')"
                    >
                        <DxItem
                            data-field="identity.number"
                            :editorOptions="{
                                mask: '000000000000',
                            }"
                            :validation-rules="state.validationRules.idNumber"
                            :label="{ text: $t('models.user.idNumber') }"
                        />
                        <DxItem
                            data-field="identity.issued_on"
                            editor-type="dxDateBox"
                            :editor-options="{
                                dateSerializationFormat:
                                    $mc.DX_SERVER_DATE_FORMAT,
                                showClearButton: 'true',
                                useMaskBehavior: 'true',
                            }"
                            :validation-rules="state.validationRules.idIssuedOn"
                            :label="{ text: $t('models.user.idIssuedOn') }"
                        />
                        <DxItem
                            data-field=""
                            :editorOptions="{
                                value: $mt.idIssuedAtValue,
                                readOnly: true,
                            }"
                            :label="{ text: $t('models.user.idIssuedAt') }"
                        />
                    </DxItem>
                    <DxItem
                        item-type="group"
                        :col-span="2"
                        :col-count="2"
                        :caption="$t('models.user.groups.contactInfo')"
                    >
                        <DxItem
                            data-field="phone"
                            :editorOptions="{
                                mask: '0000.000.000',
                            }"
                            :validation-rules="state.validationRules.phone"
                            :label="{ text: $t('models.user.phone') }"
                        />
                        <DxItem
                            data-field="email"
                            :validation-rules="state.validationRules.email"
                            :label="{ text: $t('models.user.email') }"
                        />
                        <DxItem
                            :col-span="2"
                            data-field="address"
                            editor-type="dxTextArea"
                            :validation-rules="state.validationRules.address"
                            :label="{ text: $t('models.user.address') }"
                        />
                    </DxItem>
                    <DxItem
                        item-type="group"
                        :col-span="2"
                        :col-count="2"
                        :caption="$t('models.user.groups.bankInfo')"
                    >
                        <DxItem
                            data-field="bank_account.bank_name"
                            editor-type="dxSelectBox"
                            :editor-options="{
                                searchEnabled: true,
                                items: state.banks,
                                displayExpr: 'short_name',
                                searchExpr: 'short_name',
                                valueExpr: 'short_name',
                                placeholder: $t('titles.dxSelectPlacehoder'),
                            }"
                            :validation-rules="
                                state.validationRules.bankAccount.bankName
                            "
                            :label="{ text: $t('models.user.bankName') }"
                        />
                        <DxItem
                            data-field="bank_account.account_number"
                            :validation-rules="
                                state.validationRules.bankAccount.accountNumber
                            "
                            :label="{
                                text: $t('models.user.accountNumber'),
                            }"
                        />
                        <DxItem
                            data-field="bank_account.account_name"
                            editor-type="dxTextBox"
                            :editor-options="{
                                inputAttr: {
                                    style: 'text-transform: uppercase',
                                },
                            }"
                            :validation-rules="
                                state.validationRules.bankAccount.accountName
                            "
                            :label="{ text: $t('models.user.accountName') }"
                        />
                    </DxItem>
                </DxForm>
            </form>
        </DxScrollView>
    </CorePopup>
</template>
<script setup>
import { DxForm, DxItem } from "devextreme-vue/form";
import DxTextArea from "devextreme-vue/text-area";
import CorePopup from "../../../components/Popups/CorePopup.vue";
import { inject, ref, reactive } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
const bus = inject("bus");
const mt = inject("mt");
const mf = inject("mf");
const popupRef = ref(null);
const formRef = ref(null);
const state = reactive({
    formData: null,
    banks: [],
    validationRules: {
        name: [
            {
                type: "required",
                message: t("models.user.name") + mt.validations.required,
            },
            {
                type: "stringLength",
                max: 50,
                message: t("models.user.validations.name"),
            },
        ],
        sex: [
            {
                type: "required",
                message: t("models.user.sex") + mt.validations.required,
            },
        ],
        birthday: [
            {
                type: "required",
                message: t("models.user.birthday") + mt.validations.required,
            },
            {
                type: "custom",
                validationCallback: validateBirthday,
                message: t("models.user.validations.birthday"),
            },
        ],
        idNumber: [
            {
                type: "required",
                message: t("models.user.idNumber") + mt.validations.required,
            },
            {
                type: "async",
                validationCallback: (e) =>
                    store.dispatch("userProfile/validateDuplicateIdNumber", e),
                message: t("models.user.idNumber") + mt.validations.duplicate,
            },
        ],
        idIssuedOn: [
            {
                type: "required",
                message: t("models.user.idIssuedOn") + mt.validations.required,
            },
            {
                type: "custom",
                validationCallback: validateIdIssuedOn,
                message: t("models.user.validations.idIssuedOn"),
            },
        ],
        phone: [
            {
                type: "required",
                message: t("models.user.phone") + mt.validations.required,
            },
            {
                type: "async",
                validationCallback: (e) =>
                    store.dispatch("userProfile/validateDuplicatePhone", e),
                message: t("models.user.phone") + mt.validations.duplicate,
            },
        ],
        email: [
            {
                type: "required",
                message: t("models.user.email") + mt.validations.required,
            },
            {
                type: "email",
                message: t("models.user.email") + mt.validations.email,
            },
            {
                type: "async",
                validationCallback: (e) =>
                    store.dispatch("userProfile/validateDuplicateEmail", e),
                message: t("models.user.email") + mt.validations.duplicate,
            },
        ],
        address: [
            {
                type: "required",
                message: t("models.user.address") + mt.validations.required,
            },
            {
                type: "stringLength",
                max: 100,
                message: t("models.user.validations.address"),
            },
        ],
        bankAccount: {
            bankName: [
                {
                    type: "required",
                    message:
                        t("models.user.bankName") + mt.validations.required,
                },
            ],
            accountName: [
                {
                    type: "required",
                    message:
                        t("models.user.accountName") + mt.validations.required,
                },
            ],
            accountNumber: [
                {
                    type: "required",
                    message:
                        t("models.user.accountNumber") +
                        mt.validations.required,
                },
                {
                    type: "numeric",
                    message:
                        t("models.user.accountNumber") + mt.validations.numeric,
                },
            ],
        },
    },
});

function show(e) {
    popupRef.value.show();
    state.formData = mf.cloneDeep(e);
}
function onSubmit() {
    bus.emit("checkPin", () => {
        store.dispatch("userProfile/save", state.formData).then((isOk) => {
            if (isOk) popupRef.value.hide();
        });
    });
}
function validateBirthday(e) {
    return moment(e.value).isBefore(moment().subtract(18, "years"));
}
function validateIdIssuedOn(e) {
    return moment(e.value).isBefore(moment().subtract(1, "day"));
}
function onShown() {
    setTimeout(() => formRef.value.instance.getEditor("name").focus(), 500);
    mf.getBanks().then((banks) => (state.banks = banks));
}
function onHidden() {}

defineExpose({ show });
</script>
