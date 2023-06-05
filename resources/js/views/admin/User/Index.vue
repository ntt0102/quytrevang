<template>
    <div class="users-page content-block dx-card responsive-paddings">
        <DxDataGrid
            ref="dataGridRef"
            :data-source="state.gridData"
            key-expr="code"
            :show-borders="true"
            :column-auto-width="true"
            :allow-column-reordering="true"
            :allow-column-resizing="true"
            column-resizing-mode="widget"
            :column-chooser="{
                enabled: true,
                mode: 'select',
                allowSearch: true,
            }"
            :paging="{ pageSize: 10 }"
            :headerFilter="{ visible: true }"
            :loadPanel="{ enabled: true }"
            :selection="{ mode: 'multiple', showCheckBoxesMode: 'always' }"
            :editing="{
                allowAdding: true,
                allowUpdating: true,
                allowDeleting: true,
                confirmDelete: false,
                mode: 'popup',
                popup: {
                    showTitle: true,
                    onShown: onShown,
                    onHiding: onHidden,
                },
                form: {
                    colCount: 2,
                    labelLocation: $screen.getScreenSizeInfo.isXSmall
                        ? 'top'
                        : 'left',
                    items: [
                        {
                            itemType: 'group',
                            caption: $t('models.user.groups.personalInfo'),
                            items: [
                                { dataField: 'name' },
                                { dataField: 'sex' },
                                { dataField: 'birthday' },
                            ],
                        },
                        {
                            itemType: 'group',
                            caption: $t('models.user.groups.idInfo'),
                            items: [
                                { dataField: 'identity.number' },
                                { dataField: 'identity.issued_on' },
                                {
                                    dataField: '',
                                    editorOptions: {
                                        value: $mt.idIssuedAtValue,
                                        readOnly: true,
                                    },
                                    label: {
                                        text: $t('models.user.idIssuedAt'),
                                    },
                                },
                            ],
                        },
                        {
                            colCount: 2,
                            colSpan: 2,
                            itemType: 'group',
                            caption: $t('models.user.groups.contactInfo'),
                            items: [
                                { dataField: 'phone' },
                                { dataField: 'email' },
                                { dataField: 'address', colSpan: 2 },
                            ],
                        },
                        {
                            colCount: 2,
                            colSpan: 2,
                            itemType: 'group',
                            caption: $t('models.user.groups.bankInfo'),
                            items: [
                                { dataField: 'bank_account.bank_name' },
                                { dataField: 'bank_account.account_name' },
                                {
                                    dataField: 'bank_account.account_number',
                                },
                            ],
                        },
                        {
                            visible: permissions.includes('system@control'),
                            colCount: 2,
                            colSpan: 2,
                            itemType: 'group',
                            caption: $t('models.user.groups.permission'),
                            items: [
                                { dataField: 'roles', colSpan: 2 },
                                { dataField: 'permissions', colSpan: 2 },
                            ],
                        },
                    ],
                },
            }"
            @cell-prepared="onCellPrepared"
            @contentReady="
                $mf.dataGridPreload(state.gridData, dataGridRef.instance)
            "
            @toolbar-preparing="onToolbarPreparing"
            @init-new-row="onInitNewRow"
            @editing-start="onEditingStart"
            @cellDblClick="onCellDblClick"
            @saved="onSaved"
        >
            <DxColumn
                :fixed="true"
                :width="$screen.getScreenSizeInfo.isXSmall ? 35 : 125"
                type="buttons"
                cssClass="dx-datagrid-command-column"
                cell-template="commandCellTemplate"
                :caption="
                    $t(
                        `titles.commandHeaderTitle${
                            $screen.getScreenSizeInfo.isXSmall ? 'Short' : ''
                        }`
                    )
                "
            />
            <DxColumn
                :width="60"
                :allow-sorting="false"
                :allowFiltering="false"
                data-field="url_avatar"
                cell-template="avatarCellTemplate"
                cssClass="avatar-column"
                :caption="$t('models.user.avatar')"
            />
            <DxColumn
                :allow-editing="false"
                data-field="code"
                data-type="string"
                :header-filter="{ allowSearch: true }"
                name="code"
                :caption="$t('models.user.codeShort')"
            />
            <DxColumn
                :allow-editing="false"
                data-field="level"
                dataType="number"
                :caption="$t('models.user.status')"
                :lookup="{
                    dataSource: $mf.getUserLevelList(),
                    displayExpr: 'name',
                    valueExpr: 'value',
                }"
            />
            <DxColumn
                data-field="name"
                data-type="string"
                :header-filter="{ allowSearch: true }"
                :caption="$t('models.user.name')"
                :validation-rules="state.validationRules.name"
            />
            <DxColumn
                :visible="false"
                data-field="sex"
                data-type="number"
                :caption="$t('models.user.sex')"
                :validation-rules="state.validationRules.sex"
                :lookup="{
                    dataSource: $mf.getSexList(),
                    displayExpr: 'name',
                    valueExpr: 'value',
                }"
            />
            <DxColumn
                :visible="false"
                data-field="birthday"
                data-type="date"
                :editor-options="{
                    dateSerializationFormat: $mc.DX_SERVER_DATE_FORMAT,
                    showClearButton: 'true',
                    useMaskBehavior: 'true',
                }"
                :caption="$t('models.user.birthday')"
                :validation-rules="state.validationRules.birthday"
            />
            <DxColumn
                :visible="false"
                data-field="identity.number"
                data-type="string"
                :editor-options="{
                    mask: '000000000000',
                }"
                :header-filter="{ allowSearch: true }"
                :caption="$t('models.user.idNumber')"
                :validation-rules="state.validationRules.idNumber"
            />
            <DxColumn
                :visible="false"
                data-field="identity.issued_on"
                data-type="date"
                :editor-options="{
                    dateSerializationFormat: $mc.DX_SERVER_DATE_FORMAT,
                    showClearButton: 'true',
                    useMaskBehavior: 'true',
                }"
                :caption="$t('models.user.idIssuedOn')"
                :validation-rules="state.validationRules.idIssuedOn"
            />
            <DxColumn
                data-field="phone"
                data-type="string"
                :editor-options="{
                    mask: '0000.000.000',
                }"
                :header-filter="{ allowSearch: true }"
                :caption="$t('models.user.phone')"
                :validation-rules="state.validationRules.phone"
            />
            <DxColumn
                :visible="false"
                data-field="email"
                data-type="string"
                name="email"
                :header-filter="{ allowSearch: true }"
                :caption="$t('models.user.email')"
                :validation-rules="state.validationRules.email"
            />
            <DxColumn
                :visible="false"
                data-field="address"
                data-type="string"
                :header-filter="{ allowSearch: true }"
                :caption="$t('models.user.address')"
                :validation-rules="state.validationRules.address"
            />
            <DxColumn
                :visible="false"
                data-field="bank_account.bank_name"
                data-type="string"
                :lookup="{
                    dataSource: state.banks,
                    displayExpr: 'short_name',
                    valueExpr: 'short_name',
                    allowClearing: true,
                }"
                :header-filter="{ allowSearch: true }"
                :caption="$t('models.user.bankName')"
            />
            <DxColumn
                :visible="false"
                data-field="bank_account.account_name"
                data-type="string"
                :header-filter="{ allowSearch: true }"
                :caption="$t('models.user.accountName')"
            />
            <DxColumn
                :visible="false"
                data-field="bank_account.account_number"
                data-type="string"
                :header-filter="{ allowSearch: true }"
                :caption="$t('models.user.accountNumber')"
            />
            <DxColumn
                v-if="permissions.includes('system@control')"
                :visible="false"
                :allow-sorting="false"
                data-field="roles"
                data-type="string"
                :cell-template="tagBoxCellTemplate"
                :calculate-filter-expression="
                    state.rolesCalculateFilterExpression
                "
                :caption="$t('models.user.roles')"
                edit-cell-template="roleTagBoxEditor"
                :validation-rules="state.validationRules.role"
                :lookup="{
                    dataSource: allRolesName,
                }"
            />
            <DxColumn
                v-if="permissions.includes('system@control')"
                :visible="false"
                :allow-sorting="false"
                data-field="permissions"
                data-type="string"
                :cell-template="tagBoxCellTemplate"
                :calculate-filter-expression="
                    state.permissionsCalculateFilterExpression
                "
                :caption="$t('models.user.permissions')"
                edit-cell-template="permissionTagBoxEditor"
                :lookup="{
                    dataSource: allPermissionsName,
                }"
            />
            <template #avatarCellTemplate="{ data }">
                <img
                    :src="data.value"
                    :width="40"
                    :style="{ borderRadius: '50%' }"
                />
            </template>
            <template #roleTagBoxEditor="{ data: cellInfo }">
                <ListTagBox
                    :value="cellInfo.value"
                    :on-value-changed="
                        (value) => onValueChanged(value, cellInfo)
                    "
                    :data-source="allRolesName"
                    :data-grid-component="cellInfo.component"
                />
            </template>
            <template #permissionTagBoxEditor="{ data: cellInfo }">
                <ListTagBox
                    :value="cellInfo.value"
                    :on-value-changed="
                        (value) => onValueChanged(value, cellInfo)
                    "
                    :data-source="allPermissionsName"
                    :data-grid-component="cellInfo.component"
                />
            </template>
            <template #commandCellTemplate="{ data }">
                <DxToolbar
                    :items="[
                        {
                            visible:
                                [4, 5].includes(data.data.level) ||
                                (permissions.includes('system@control') &&
                                    data.data.level > 5),
                            locateInMenu: 'auto',
                            showText: 'inMenu',
                            location: 'center',
                            widget: 'dxButton',
                            options: {
                                type: 'default',
                                icon: `far fa-${
                                    data.data.level == 4
                                        ? 'check'
                                        : 'file-check'
                                } small`,
                                hint: $t(
                                    `components.confirmUser.${
                                        data.data.level == 4
                                            ? 'title'
                                            : 'confirmedTitle'
                                    }`
                                ),
                                text: $t(
                                    `components.confirmUser.${
                                        data.data.level == 4
                                            ? 'title'
                                            : 'confirmedTitle'
                                    }`
                                ),
                                onClick: () =>
                                    $refs.confirmUserPopupRef.show({
                                        user: data.data,
                                    }),
                            },
                        },
                        {
                            visible: data.data.level >= 6,
                            locateInMenu: 'auto',
                            showText: 'inMenu',
                            location: 'center',
                            widget: 'dxButton',
                            options: {
                                type: 'default',
                                icon: 'far fa-usd-circle small',
                                hint: $t('admin.users.buttons.viewContract'),
                                text: $t('admin.users.buttons.viewContract'),
                                onClick: () =>
                                    $router.push({
                                        name: 'admin-contract',
                                        query: { userCode: data.data.code },
                                    }),
                            },
                        },
                        {
                            visible:
                                !data.data.permissions.includes(
                                    'system@control'
                                ) || permissions.includes('system@control'),
                            locateInMenu: 'auto',
                            showText: 'inMenu',
                            location: 'center',
                            widget: 'dxButton',
                            options: {
                                type: 'default',
                                icon: 'edit',
                                hint: $t('buttons.edit'),
                                text: $t('buttons.edit'),
                                onClick: () =>
                                    dataGridRef.instance.editRow(data.rowIndex),
                            },
                        },
                        {
                            visible:
                                data.data.level <= 6 &&
                                data.data.code != code &&
                                !data.data.permissions.includes(
                                    'system@control'
                                ),
                            locateInMenu: 'auto',
                            showText: 'inMenu',
                            location: 'center',
                            widget: 'dxButton',
                            options: {
                                type: 'default',
                                icon: 'trash',
                                hint: $t('buttons.delete'),
                                text: $t('buttons.delete'),
                                onClick: () =>
                                    $bus.emit('checkPin', () =>
                                        dataGridRef.instance.deleteRow(
                                            data.rowIndex
                                        )
                                    ),
                            },
                        },
                        {
                            locateInMenu: 'auto',
                            showText: 'inMenu',
                            location: 'center',
                            widget: 'dxButton',
                            options: {
                                type: 'default',
                                icon: 'info',
                                hint: $t('admin.users.detailUser'),
                                text: $t('admin.users.detailUser'),
                                onClick: () =>
                                    $refs.userDetailPopupRef.show(data.data),
                            },
                        },
                    ]"
                />
            </template>
        </DxDataGrid>
    </div>
    <DeletedUsersPopup ref="deletedUsersPopupRef" />
    <ConfirmUserPopup ref="confirmUserPopupRef" />
    <UserDetailPopup ref="userDetailPopupRef" />
</template>
<script setup>
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import ListTagBox from "../../../components/ListTagBox.vue";
import DeletedUsersPopup from "./DeletedUsersPopup.vue";
import ConfirmUserPopup from "./ConfirmUserPopup.vue";
import UserDetailPopup from "../../../components/Popups/UserDetailPopup.vue";
import { ref, reactive, inject, computed, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const store = useStore();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const bus = inject("bus");
const filters = inject("filters");
const mt = inject("mt");
const mf = inject("mf");
const routeHistoryState = inject("routeHistoryState");
const dataGridRef = ref(null);
const deletedUsersPopupRef = ref(null);
const state = reactive({
    gridData: null,
    banks: [],
    rolesCalculateFilterExpression: function (
        filterValue,
        selectedFilterOperation,
        target
    ) {
        if (target === "search" && typeof filterValue === "string") {
            return ["roles", "contains", filterValue];
        }
        return function (data) {
            return (data.roles || []).indexOf(filterValue) !== -1;
        };
    },
    permissionsCalculateFilterExpression: function (
        filterValue,
        selectedFilterOperation,
        target
    ) {
        if (target === "search" && typeof filterValue === "string") {
            return ["permissions", "contains", filterValue];
        }
        return function (data) {
            return (data.permissions || []).indexOf(filterValue) !== -1;
        };
    },
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
        role: [
            {
                type: "required",
                message: t("models.user.roles") + mt.validations.required,
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
                    store.dispatch("adminUser/validateDuplicateIdNumber", e),
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
                    store.dispatch("adminUser/validateDuplicatePhone", e),
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
                    store.dispatch("adminUser/validateDuplicateEmail", e),
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
    },
});
const permissions = computed(() => store.state.auth.user.permissions);
const code = computed(() => store.state.auth.user.code);
const allRolesName = computed(() => store.state.adminUser.allRolesName);
const allPermissionsName = computed(
    () => store.state.adminUser.allPermissionsName
);

store
    .dispatch("adminUser/getUsers")
    .then(() => mf.getBanks())
    .then((banks) => (state.banks = banks));

watch(
    () => store.state.adminUser.users,
    (value) => cloneDeepData(value)
);

function onSaved(e) {
    e.isDeleted = false;
    store.dispatch("adminUser/save", e);
}
function onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
        {
            visible: mf.isSet(route.query),
            location: "before",
            widget: "dxButton",
            options: {
                icon: "far fa-arrow-left small",
                hint: t("buttons.back"),
                onClick: () => {
                    router.go(-1);
                },
            },
        },
        {
            locateInMenu: "auto",
            showText: "inMenu",
            location: "before",
            widget: "dxButton",
            options: {
                icon: "far fa-share-square small",
                hint: t("admin.users.buttons.sendNotification"),
                text: t("admin.users.buttons.sendNotification"),
                onClick: () => {
                    let selectedRowKeys =
                        dataGridRef.value.instance.getSelectedRowKeys();
                    if (selectedRowKeys.length > 0) {
                        router.push({
                            name: "setting-notification",
                            query: {
                                codes: dataGridRef.value.instance
                                    .getSelectedRowKeys()
                                    .join(","),
                            },
                        });
                    } else toast.show(t("messages.info.noSelectedRow"));
                },
            },
        },
        {
            locateInMenu: "auto",
            showText: "inMenu",
            location: "before",
            widget: "dxButton",
            options: {
                icon: "far fa-trash small",
                hint: t("admin.users.buttons.selectedDelete"),
                text: t("admin.users.buttons.selectedDelete"),
                onClick: () => {
                    let selectedRowKeys =
                        dataGridRef.value.instance.getSelectedRowKeys();
                    if (selectedRowKeys.length > 0) {
                        bus.emit("checkPin", () => {
                            dataGridRef.value.instance.option(
                                "editing.mode",
                                "batch"
                            );
                            selectedRowKeys.forEach((key) => {
                                dataGridRef.value.instance.deleteRow(
                                    dataGridRef.value.instance.getRowIndexByKey(
                                        key
                                    )
                                );
                            });
                            dataGridRef.value.instance.saveEditData();
                        });
                        dataGridRef.value.instance.option(
                            "editing.mode",
                            "popup"
                        );
                    } else toast.show(t("messages.info.noSelectedRow"));
                },
            },
        },
        {
            locateInMenu: "auto",
            showText: "inMenu",
            location: "before",
            widget: "dxButton",
            options: {
                icon: "far fa-user-times small",
                hint: t("admin.users.deletedUsers"),
                text: t("admin.users.deletedUsers"),
                onClick: () => deletedUsersPopupRef.value.show(),
            },
        }
    );
}
function tagBoxCellTemplate(container, options) {
    var noBreakSpace = "\u00A0",
        text = (options.value || [])
            .map((element) => {
                return options.column.lookup.calculateCellValue(element);
            })
            .join(", ");
    container.textContent = text || noBreakSpace;
    container.title = text;
}
function onValueChanged(value, cellInfo) {
    cellInfo.setValue(value);
    cellInfo.component.updateDimensions();
}
function validateBirthday(e) {
    return moment(e.value).isBefore(moment().subtract(18, "years"));
}
function validateIdIssuedOn(e) {
    return moment(e.value).isBefore(moment().subtract(1, "day"));
}
function onInitNewRow(e) {
    e.data.roles = ["user"];
    e.data.bank_account = {};
    dataGridRef.value.instance.option(
        "editing.popup.title",
        t("models.user.popup.create")
    );
}
function onEditingStart(e) {
    dataGridRef.value.instance.option(
        "editing.popup.title",
        `${t("models.user.popup.edit")} #${e.data.code}`
    );
}
function cloneDeepData(users) {
    state.gridData = mf.cloneDeep(users);
    if (!!route.query.code) {
        dataGridRef.value.instance.columnOption("code", "filterValues", [
            +route.query.code,
        ]);
    }
    if (!!route.query.selected) {
        setTimeout(
            () =>
                dataGridRef.value.instance.selectRows(
                    route.query.selected.split(","),
                    true
                ),
            0
        );
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
function onCellPrepared(e) {
    if (e.rowType === "data") {
        if (e.column.dataField === "level") {
            let color;
            if (e.value < 4) color = "#adadad";
            else if (e.value == 4) color = "#edc578";
            else color = "#86c285";
            e.cellElement.style.color = color;
        }
        if (e.column.dataField === "phone")
            e.cellElement.innerHTML = filters.phone(e.value);
    }
}
function onCellDblClick(e) {
    if (e.rowType == "data" && e.columnIndex == 5)
        mf.openLink(`https://zalo.me/${e.data.phone}`);
}
</script>
<style lang="scss">
.users-page {
    .avatar-column[role="gridcell"] {
        padding: 0 0 0 10px !important;
    }
}
</style>
