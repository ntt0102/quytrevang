<template>
    <div class="users-page">
        <h2 class="content-block">
            {{ $t("admin.users.title") }}
        </h2>
        <div class="content-block dx-card responsive-paddings">
            <DxDataGrid
                ref="dataGrid"
                :data-source="gridData"
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
                        onHiding: $mf.popRouteHistoryState,
                    },
                    form: {
                        colCount: 2,
                        labelLocation: $devices.phone ? 'top' : 'left',
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
                                        dataField:
                                            'bank_account.account_number',
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
                @contentReady="$mf.dataGridPreload(gridData, dataGrid)"
                @toolbar-preparing="onToolbarPreparing"
                @init-new-row="onInitNewRow"
                @editing-start="onEditingStart"
                @cellDblClick="onCellDblClick"
                @saved="onSaved"
            >
                <DxColumn
                    :fixed="true"
                    :width="$devices.phone ? 35 : 125"
                    type="buttons"
                    cssClass="dx-datagrid-command-column"
                    cell-template="commandCellTemplate"
                    :caption="
                        $t(
                            `titles.commandHeaderTitle${
                                $devices.phone ? 'Short' : ''
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
                    :validation-rules="validationRules.name"
                />
                <DxColumn
                    :visible="false"
                    data-field="sex"
                    data-type="number"
                    :caption="$t('models.user.sex')"
                    :validation-rules="validationRules.sex"
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
                    :validation-rules="validationRules.birthday"
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
                    :validation-rules="validationRules.idNumber"
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
                    :validation-rules="validationRules.idIssuedOn"
                />
                <DxColumn
                    data-field="phone"
                    data-type="string"
                    :editor-options="{
                        mask: '0000.000.000',
                    }"
                    :header-filter="{ allowSearch: true }"
                    :caption="$t('models.user.phone')"
                    :validation-rules="validationRules.phone"
                />
                <DxColumn
                    :visible="false"
                    data-field="email"
                    data-type="string"
                    name="email"
                    :header-filter="{ allowSearch: true }"
                    :caption="$t('models.user.email')"
                    :validation-rules="validationRules.email"
                />
                <DxColumn
                    :visible="false"
                    data-field="address"
                    data-type="string"
                    :header-filter="{ allowSearch: true }"
                    :caption="$t('models.user.address')"
                    :validation-rules="validationRules.address"
                />
                <DxColumn
                    :visible="false"
                    data-field="bank_account.bank_name"
                    data-type="string"
                    :lookup="{
                        dataSource: banks,
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
                        rolesCalculateFilterExpression
                    "
                    :caption="$t('models.user.roles')"
                    edit-cell-template="roleTagBoxEditor"
                    :validation-rules="validationRules.role"
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
                        permissionsCalculateFilterExpression
                    "
                    :caption="$t('models.user.permissions')"
                    edit-cell-template="permissionTagBoxEditor"
                    :lookup="{
                        dataSource: allPermissionsName,
                    }"
                />
                <template #avatarCellTemplate="{}">
                    <!-- <Photoswipe
                        @opened="$mf.pushPhotoswipeToHistoryState"
                        @close="$mf.popRouteHistoryState"
                    >
                        <img
                            :src="data.value"
                            v-pswp="data.value"
                            width="40"
                            :alt="$appName"
                            style="border-radius: 50%"
                        />
                    </Photoswipe> -->
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
                                        $refs.confirmUserPopup.show({
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
                                    hint: $t(
                                        'admin.users.buttons.viewContract'
                                    ),
                                    text: $t(
                                        'admin.users.buttons.viewContract'
                                    ),
                                    onClick: () =>
                                        $router.push({
                                            name: 'contracts',
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
                                        dataGrid.editRow(data.rowIndex),
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
                                            dataGrid.deleteRow(data.rowIndex)
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
                                        $refs.userDetailPopup.show({
                                            user: data.data,
                                        }),
                                },
                            },
                        ]"
                    />
                </template>
            </DxDataGrid>
        </div>
        <DeletedUsersPopup ref="deletedUsersPopup" />
        <ConfirmUserPopup ref="confirmUserPopup" />
        <UserDetailPopup ref="userDetailPopup" />
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import ListTagBox from "../../../components/ListTagBox.vue";
import DeletedUsersPopup from "./DeletedUsersPopup.vue";
import ConfirmUserPopup from "./ConfirmUserPopup.vue";
import UserDetailPopup from "../../../components/Popups/UserDetailPopup.vue";
import adminUsersStore from "../../../store/modules/Admin/User";

export default {
    components: {
        DxDataGrid,
        DxColumn,
        ListTagBox,
        DeletedUsersPopup,
        ConfirmUserPopup,
        UserDetailPopup,
    },
    data() {
        return {
            gridData: null,
            banks: [],
            rolesCalculateFilterExpression: function (
                filterValue,
                selectedFilterOperation,
                target
            ) {
                if (target === "search" && typeof filterValue === "string") {
                    return [this.dataField, "contains", filterValue];
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
                    return [this.dataField, "contains", filterValue];
                }
                return function (data) {
                    return (data.permissions || []).indexOf(filterValue) !== -1;
                };
            },
            validationRules: {
                name: [
                    {
                        type: "required",
                        message:
                            this.$t("models.user.name") +
                            this.$mt.validations.required,
                    },
                    {
                        type: "stringLength",
                        max: 50,
                        message: this.$t("models.user.validations.name"),
                    },
                ],
                sex: [
                    {
                        type: "required",
                        message:
                            this.$t("models.user.sex") +
                            this.$mt.validations.required,
                    },
                ],
                role: [
                    {
                        type: "required",
                        message:
                            this.$t("models.user.roles") +
                            this.$mt.validations.required,
                    },
                ],
                birthday: [
                    {
                        type: "required",
                        message:
                            this.$t("models.user.birthday") +
                            this.$mt.validations.required,
                    },
                    {
                        type: "custom",
                        validationCallback: this.validateBirthday,
                        message: this.$t("models.user.validations.birthday"),
                    },
                ],
                idNumber: [
                    {
                        type: "required",
                        message:
                            this.$t("models.user.idNumber") +
                            this.$mt.validations.required,
                    },
                    {
                        type: "async",
                        validationCallback: this.validateDuplicateIdNumber,
                        message:
                            this.$t("models.user.idNumber") +
                            this.$mt.validations.duplicate,
                    },
                ],
                idIssuedOn: [
                    {
                        type: "required",
                        message:
                            this.$t("models.user.idIssuedOn") +
                            this.$mt.validations.required,
                    },
                    {
                        type: "custom",
                        validationCallback: this.validateIdIssuedOn,
                        message: this.$t("models.user.validations.idIssuedOn"),
                    },
                ],
                phone: [
                    {
                        type: "required",
                        message:
                            this.$t("models.user.phone") +
                            this.$mt.validations.required,
                    },
                    {
                        type: "async",
                        validationCallback: this.validateDuplicatePhone,
                        message:
                            this.$t("models.user.phone") +
                            this.$mt.validations.duplicate,
                    },
                ],
                email: [
                    {
                        type: "required",
                        message:
                            this.$t("models.user.email") +
                            this.$mt.validations.required,
                    },
                    {
                        type: "email",
                        message:
                            this.$t("models.user.email") +
                            this.$mt.validations.email,
                    },
                    {
                        type: "async",
                        validationCallback: this.validateDuplicateEmail,
                        message:
                            this.$t("models.user.email") +
                            this.$mt.validations.duplicate,
                    },
                ],
                address: [
                    {
                        type: "required",
                        message:
                            this.$t("models.user.address") +
                            this.$mt.validations.required,
                    },
                    {
                        type: "stringLength",
                        max: 100,
                        message: this.$t("models.user.validations.address"),
                    },
                ],
            },
        };
    },
    beforeCreate() {
        this.$store.registerModule("Admin.users", adminUsersStore);
    },
    created() {
        this.fetch()
            .then(() => this.$mf.getBanks())
            .then((banks) => (this.banks = banks));
    },
    destroyed() {
        this.$store.unregisterModule("Admin.users");
    },
    computed: {
        ...mapGetters("Auth", ["permissions", "code"]),
        ...mapGetters("Admin.users", [
            "users",
            "allRolesName",
            "allPermissionsName",
        ]),
        dataGrid: function () {
            return this.$refs.dataGrid.instance;
        },
        contextMenu: function () {
            return this.$refs.contextMenu.instance;
        },
    },
    watch: {
        users() {
            this.cloneDeepData();
        },
    },
    methods: {
        ...mapActions("Admin.users", [
            "fetch",
            "save",
            "validateDuplicateEmail",
            "validateDuplicateIdNumber",
            "validateDuplicatePhone",
            "resetState",
        ]),
        ...mapActions("User.layout", ["initLayout"]),
        onSaved(e) {
            e.isDeleted = false;
            this.save(e);
        },
        onToolbarPreparing(e) {
            e.toolbarOptions.items.unshift(
                {
                    visible: this.$mf.isSet(this.$route.query),
                    location: "before",
                    widget: "dxButton",
                    options: {
                        icon: "far fa-arrow-left small",
                        hint: this.$t("buttons.back"),
                        onClick: () => {
                            this.$router.go(-1);
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
                        hint: this.$t("admin.users.buttons.sendNotification"),
                        text: this.$t("admin.users.buttons.sendNotification"),
                        onClick: () => {
                            let selectedRowKeys =
                                this.dataGrid.getSelectedRowKeys();
                            if (selectedRowKeys.length > 0) {
                                this.$router.push({
                                    name: "setting-notification",
                                    query: {
                                        codes: this.dataGrid
                                            .getSelectedRowKeys()
                                            .join(","),
                                    },
                                });
                            } else
                                this.$toasted.show(
                                    this.$t("messages.info.noSelectedRow")
                                );
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
                        hint: this.$t("admin.users.buttons.selectedDelete"),
                        text: this.$t("admin.users.buttons.selectedDelete"),
                        onClick: () => {
                            let selectedRowKeys =
                                this.dataGrid.getSelectedRowKeys();
                            if (selectedRowKeys.length > 0) {
                                this.$bus.emit("checkPin", () => {
                                    this.dataGrid.option(
                                        "editing.mode",
                                        "batch"
                                    );
                                    selectedRowKeys.forEach((key) => {
                                        this.dataGrid.deleteRow(
                                            this.dataGrid.getRowIndexByKey(key)
                                        );
                                    });
                                    this.dataGrid.saveEditData();
                                });
                                this.dataGrid.option("editing.mode", "popup");
                            } else
                                this.$toasted.show(
                                    this.$t("messages.info.noSelectedRow")
                                );
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
                        hint: this.$t("admin.users.deletedUsers"),
                        text: this.$t("admin.users.deletedUsers"),
                        onClick: () => this.$refs.deletedUsersPopup.show(),
                    },
                }
            );
        },
        tagBoxCellTemplate(container, options) {
            var noBreakSpace = "\u00A0",
                text = (options.value || [])
                    .map((element) => {
                        return options.column.lookup.calculateCellValue(
                            element
                        );
                    })
                    .join(", ");
            container.textContent = text || noBreakSpace;
            container.title = text;
        },
        onValueChanged(value, cellInfo) {
            cellInfo.setValue(value);
            cellInfo.component.updateDimensions();
        },
        validateBirthday(e) {
            return moment(e.value).isBefore(moment().subtract(18, "years"));
        },
        validateIdIssuedOn(e) {
            return moment(e.value).isBefore(moment().subtract(1, "day"));
        },
        onInitNewRow(e) {
            e.data.roles = ["user"];
            e.data.bank_account = {};
            this.dataGrid.option(
                "editing.popup.title",
                this.$t("models.user.popup.create")
            );
        },
        onEditingStart(e) {
            this.dataGrid.option(
                "editing.popup.title",
                `${this.$t("models.user.popup.edit")} #${e.data.code}`
            );
        },
        cloneDeepData() {
            this.gridData = this.$mf.cloneDeep(this.users);
            if (!!this.$route.query.code) {
                this.dataGrid.columnOption("code", "filterValues", [
                    +this.$route.query.code,
                ]);
            }
            if (!!this.$route.query.selected) {
                setTimeout(
                    () =>
                        this.dataGrid.selectRows(
                            this.$route.query.selected.split(","),
                            true
                        ),
                    0
                );
            }
        },
        onShown(e) {
            this.$mf.checkPinDataGrid(e, this);
            this.$mf.pushPopupToHistoryState(() =>
                this.dataGrid.cancelEditData()
            );
        },
        onCellPrepared(e) {
            if (e.rowType === "data") {
                if (e.column.dataField === "level") {
                    let color;
                    if (e.value < 4) color = "#adadad";
                    else if (e.value == 4) color = "#edc578";
                    else color = "#86c285";
                    e.cellElement.style.color = color;
                }
                if (e.column.dataField === "phone")
                    e.cellElement.innerHTML = this.$options.filters.phone(
                        e.value
                    );
            }
        },
        onCellDblClick(e) {
            if (e.rowType == "data" && e.columnIndex == 5)
                this.$mf.openLink(`https://zalo.me/${e.data.phone}`);
        },
    },
};
</script>
<style lang="scss">
.users-page {
    .avatar-column[role="gridcell"] {
        padding: 0 !important;
    }
}
</style>
