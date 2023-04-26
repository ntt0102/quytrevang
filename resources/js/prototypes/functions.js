import Vue from "vue";
import i18n from "../plugins/i18n";
import { VietQR } from "vietqr";

export default {
    handleError: (error, message) => {
        if (!error.response) return false;
        if (error.response.status == 401) return false;
        if (error.response.status == 403)
            message = i18n.t("messages.error.server.403");
        else if (error.response.status == 429)
            message = i18n.t("messages.error.server.429");
        else {
            if (message == undefined)
                message = i18n.t("messages.error.server.500");

            message +=
                "<br>[" +
                " " +
                (error.response.data.message || error.message) +
                " " +
                "]";
        }
        Vue.toasted.error(message, {
            duration: 5000,
            action: [
                {
                    text: i18n.t("buttons.copy"),
                    onClick: (e, toastObject) => {
                        navigator.clipboard
                            .writeText(toastObject.el.innerText.split(" ")[1])
                            .then(() => {
                                toastObject.text(
                                    i18n.t("messages.info.copiedError")
                                );
                                toastObject.goAway(2000);
                            });
                    },
                },
                {
                    text: i18n.t("buttons.close"),
                    onClick: (e, toastObject) => {
                        toastObject.goAway(0);
                    },
                },
            ],
        });
    },
    checkPinDataGrid(e, vm) {
        let items = e.component.option("toolbarItems");
        items[0].options.onClick = () => {
            if (vm.dataGrid.hasEditData()) {
                vm.$bus.emit("checkPin", () => {
                    vm.dataGrid.saveEditData();
                });
            } else {
                vm.$toasted.info(vm.$mt.messages.info.noChangedData);
                vm.dataGrid.cancelEditData();
            }
        };
        e.component.option("toolbarItems", items);
    },
    getBanks() {
        let vietQR = new VietQR({
            clientID: process.env.MIX_VIETQR_CLIENT_ID,
            apiKey: process.env.MIX_VIETQR_API_KEY,
        });
        return new Promise((resolve, reject) => {
            vietQR
                .getBanks()
                .then((banks) => {
                    resolve(banks.data);
                })
                .catch((err) => resolve([]));
        });
    },
    fetchImage(links) {
        let isArray = Array.isArray(links);
        if (!isArray) links = [links];
        return new Promise(async (resolve, reject) => {
            let response = await Promise.all(links.map((e) => fetch(e)));
            let blobs = await Promise.all(response.map((e) => e.blob()));
            let images = await Promise.all(
                blobs.map(
                    (e) =>
                        new Promise(async (resolve, reject) => {
                            let reader = new FileReader();
                            reader.onload = function () {
                                resolve(this.result);
                            };
                            reader.readAsDataURL(e);
                        })
                )
            );
            resolve(isArray ? images : images[0]);
        });
    },
    setContractStatusColor: (e) => {
        if (e.rowType === "data" && e.column.dataField === "status") {
            let color;
            switch (e.value) {
                case 0:
                case 1:
                    color = "#adadad";
                    break;
                case 2:
                    color = "#86c285";
                    break;
                case 3:
                    color = "#edc578";
                    break;
                case 4:
                    color = "#ef7d59";
                    break;
            }
            e.cellElement.style.color = color;
        }
    },
    getAccountLevelList: () => {
        return [
            {
                text: i18n.t("user.overview.levels.register"),
                level: 1,
            },
            {
                text: i18n.t("user.overview.levels.verifyEmail"),
                level: 2,
            },
            {
                text: i18n.t("user.overview.levels.setPin"),
                level: 3,
            },
            {
                text: i18n.t("user.overview.levels.updateInfo"),
                level: 4,
            },
            {
                text: i18n.t("user.overview.levels.signContract"),
                level: 5,
            },
            {
                text: i18n.t("user.overview.levels.createContract"),
                level: 6,
            },
        ];
    },
    getContractStatusList: (status = [0, 1, 2, 3, 4]) => {
        let ret = [];
        status.forEach((x) => {
            switch (x) {
                case 0:
                    ret.push({
                        name: i18n.t("models.contract.selects.status.paying"),
                        value: x,
                    });
                    break;
                case 1:
                    ret.push({
                        name: i18n.t(
                            "models.contract.selects.status.confirming"
                        ),
                        value: x,
                    });
                    break;
                case 2:
                    ret.push({
                        name: i18n.t("models.contract.selects.status.paid"),
                        value: x,
                    });
                    break;
                case 3:
                    ret.push({
                        name: i18n.t(
                            "models.contract.selects.status.withdrawing"
                        ),
                        value: x,
                    });
                    break;
                case 4:
                    ret.push({
                        name: i18n.t(
                            "models.contract.selects.status.withdrawn"
                        ),
                        value: x,
                    });
                    break;
            }
        });
        return ret;
    },
    getMethodList: (methods = [1, 2, 3]) => {
        let ret = [];
        methods.forEach((x) => {
            switch (x) {
                case 1:
                    ret.push({
                        name: i18n.t("models.contract.selects.method.bank"),
                        value: x,
                    });
                    break;
                case 2:
                    ret.push({
                        name: i18n.t(
                            "models.contract.selects.method.viettelPay"
                        ),
                        value: x,
                    });
                    break;
                case 3:
                    ret.push({
                        name: i18n.t("models.contract.selects.method.atm"),
                        value: x,
                    });
                    break;
            }
        });
        ret.push({
            name: i18n.t("models.contract.selects.method.cash"),
            value: 4,
        });
        return ret;
    },
    getUserLevelList: () => {
        return [
            {
                name: i18n.t("admin.users.selects.level.level1"),
                value: 1,
            },
            {
                name: i18n.t("admin.users.selects.level.level2"),
                value: 2,
            },
            {
                name: i18n.t("admin.users.selects.level.level3"),
                value: 3,
            },
            {
                name: i18n.t("admin.users.selects.level.level4"),
                value: 4,
            },
            {
                name: i18n.t("admin.users.selects.level.level5"),
                value: 5,
            },
            {
                name: i18n.t("admin.users.selects.level.level6"),
                value: 6,
            },
            {
                name: i18n.t("admin.users.selects.level.level7"),
                value: 7,
            },
        ];
    },
    getSexList: () => {
        return [
            { name: i18n.t("models.user.selects.sex.male"), value: 1 },
            { name: i18n.t("models.user.selects.sex.female"), value: 0 },
        ];
    },
    getCommandList: () => {
        return [
            {
                name: i18n.t("admin.settings.commands.selects.cache"),
                value: "config:cache",
            },
            {
                name: i18n.t("admin.settings.commands.selects.resetMigrate"),
                value: "migrate:refresh --seed,passport:install --force",
            },
            {
                name: i18n.t("admin.settings.commands.selects.downMaintance"),
                value: "down",
            },
            {
                name: i18n.t("admin.settings.commands.selects.upMaintance"),
                value: "up",
            },
            {
                name: i18n.t("admin.settings.commands.selects.cleanLog"),
                value: "activitylog:clean --days=0",
            },
            {
                name: i18n.t("admin.settings.commands.selects.updateTrade"),
                value: "trades:update",
            },
            {
                name: i18n.t("admin.settings.commands.selects.storageLink"),
                value: "storage:link",
            },
            {
                name: i18n.t("admin.settings.commands.selects.custom"),
                value: "custom",
            },
        ];
    },
    getNotificationReceiverList: () => {
        return [
            {
                name: i18n.t("admin.settings.notification.selects.all"),
                value: "all",
            },
            {
                name: i18n.t("admin.settings.notification.selects.exists"),
                value: "exists",
            },
            {
                name: i18n.t("admin.settings.notification.selects.notExists"),
                value: "not_exists",
            },
            {
                name: i18n.t("admin.settings.notification.selects.ids"),
                value: "ids",
            },
        ];
    },
    getChartPeriodList: () => {
        return [
            {
                name: i18n.t("admin.trades.selects.period.day"),
                value: "day",
            },
            {
                name: i18n.t("admin.trades.selects.period.week"),
                value: "week",
            },
            {
                name: i18n.t("admin.trades.selects.period.month"),
                value: "month",
            },
            {
                name: i18n.t("admin.trades.selects.period.quarter"),
                value: "quarter",
            },
            {
                name: i18n.t("admin.trades.selects.period.year"),
                value: "year",
            },
        ];
    },
    resizeImage: (settings) => {
        var file = settings.file;
        var maxSize = settings.maxSize;
        var reader = new FileReader();
        var image = new Image();
        var canvas = document.createElement("canvas");
        var dataURItoBlob = function (dataURI) {
            var bytes =
                dataURI.split(",")[0].indexOf("base64") >= 0
                    ? atob(dataURI.split(",")[1])
                    : unescape(dataURI.split(",")[1]);
            var mime = dataURI.split(",")[0].split(":")[1].split(";")[0];
            var max = bytes.length;
            var ia = new Uint8Array(max);
            for (var i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
            return new Blob([ia], { type: mime });
        };
        var resize = function () {
            var width = image.width;
            var height = image.height;
            if (width > height) {
                if (width > maxSize) {
                    height *= maxSize / width;
                    width = maxSize;
                }
            } else {
                if (height > maxSize) {
                    width *= maxSize / height;
                    height = maxSize;
                }
            }
            canvas.width = width;
            canvas.height = height;
            canvas.getContext("2d").drawImage(image, 0, 0, width, height);
            var dataUrl = canvas.toDataURL("image/jpeg");
            return dataURItoBlob(dataUrl);
        };
        return new Promise(function (ok, no) {
            if (!file.type.match(/image.*/)) {
                no(new Error("Not an image"));
                return;
            }
            reader.onload = function (readerEvent) {
                image.onload = function () {
                    return ok(resize());
                };
                image.src = readerEvent.target.result;
            };
            reader.readAsDataURL(file);
        });
    },
    includeScript: (status, param) => {
        if (status == "on") {
            let script = document.createElement("script");
            script.src = param.src;
            script.id = param.id;
            document.head.appendChild(script);
        } else if (status == "off") {
            document.head.removeChild(document.getElementById(param));
        }
    },
    removePreload: () => {
        let preload = document.getElementById("preload");
        if (!!preload) preload.remove();
    },
    getScreenSize() {
        const breakpoints = {
            Small: "(max-width: 599.99px)",
            Medium: "(min-width: 600px) and (max-width: 959.99px)",
            Large: "(min-width: 960px)",
        };
        // const breakpoints = {
        //     XSmall: "(max-width: 599.99px)",
        //     Small: "(min-width: 600px) and (max-width: 959.99px)",
        //     Medium: "(min-width: 960px) and (max-width: 1279.99px)",
        //     Large: "(min-width: 1280px)"
        // };

        const smallMedia = window.matchMedia(breakpoints.Small);
        const mediumMedia = window.matchMedia(breakpoints.Medium);
        const largeMedia = window.matchMedia(breakpoints.Large);

        const screenSize = {
            Small: smallMedia.matches,
            Medium: mediumMedia.matches,
            Large: largeMedia.matches,
        };

        let attribute = "";
        if (screenSize.Small) attribute = "small";
        else if (screenSize.Medium) attribute = "medium";
        else if (screenSize.Large) attribute = "large";
        document.body.setAttribute("screen-size", attribute);

        return screenSize;
    },
    pushPhotoswipeToHistoryState(pswp) {
        window.history.pushState(null, null);
        Vue.prototype.$routeHistoryState.push({
            poppedFlag: false,
            callback: () => pswp.close(),
        });
    },
    pushPopupToHistoryState(callback) {
        window.history.pushState(null, null);
        Vue.prototype.$routeHistoryState.push({ poppedFlag: false, callback });
    },
    popRouteHistoryState() {
        if (Vue.prototype.$routeHistoryState.length > 0) {
            if (
                !Vue.prototype.$routeHistoryState[
                    Vue.prototype.$routeHistoryState.length - 1
                ].poppedFlag
            ) {
                Vue.prototype.$routeHistoryState[
                    Vue.prototype.$routeHistoryState.length - 1
                ].poppedFlag = true;
                window.history.back();
            } else Vue.prototype.$routeHistoryState.pop();
        }
    },
    copyText(text) {
        navigator.clipboard
            .writeText(text)
            .then(() =>
                Vue.toasted.success(i18n.t("messages.success.copiedText"))
            );
    },
    dataGridPreload(gridData, dataGrid) {
        if (!!gridData) dataGrid.endCustomLoading();
        else dataGrid.beginCustomLoading();
    },
    openLink(url, name = "_blank") {
        window.open(url, name);
    },
    cloneDeep(data) {
        return JSON.parse(JSON.stringify(data));
    },
    isEmpty(value) {
        return !value || value.length === 0 || Object.keys(value).length === 0;
    },
    isSet(value) {
        return !(
            !value ||
            value.length === 0 ||
            Object.keys(value).length === 0
        );
    },
};
