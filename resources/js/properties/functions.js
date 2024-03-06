import lang from "../lang";
import { VietQR } from "vietqr";
import { toast } from "vue3-toastify";
import mt from "./texts";
import mitt from "mitt";

let shown429At = moment();

export default {
    handleError: (error, message) => {
        if (!error.response) return false;
        if (error.response.status == 401) return false;
        if (error.response.status == 403)
            message = lang.global.t("messages.error.server.403");
        else if (error.response.status == 429) {
            if (moment().diff(shown429At, "seconds") > 5) {
                message = lang.global.t("messages.error.server.429");
                shown429At = moment();
            } else message = null;
        } else {
            if (message == undefined)
                message = lang.global.t("messages.error.server.500");

            message +=
                "<br>[" +
                " " +
                (error.response.data.message || error.message) +
                " " +
                "]";
        }
        if (message) {
            toast.error(message, {
                duration: 5000,
                action: [
                    {
                        text: lang.global.t("buttons.copy"),
                        onClick: (e, toastObject) => {
                            navigator.clipboard
                                .writeText(
                                    toastObject.el.innerText.split(" ")[1]
                                )
                                .then(() => {
                                    toastObject.text(
                                        lang.global.t(
                                            "messages.info.copiedError"
                                        )
                                    );
                                    toastObject.goAway(2000);
                                });
                        },
                    },
                    {
                        text: lang.global.t("buttons.close"),
                        onClick: (e, toastObject) => {
                            toastObject.goAway(0);
                        },
                    },
                ],
            });
        }
    },
    checkPinDataGrid(e, dataGridInstance) {
        let items = e.component.option("toolbarItems");
        items[0].options.onClick = () => {
            if (dataGridInstance.hasEditData()) {
                mitt().emit("checkPin", () => {
                    dataGridInstance.saveEditData();
                });
            } else {
                toast.info(mt.messages.info.noChangedData);
                dataGridInstance.cancelEditData();
            }
        };
        e.component.option("toolbarItems", items);
    },
    getBanks() {
        let vietQR = new VietQR({
            clientID: import.meta.env.VITE_VIETQR_CLIENT_ID,
            apiKey: import.meta.env.VITE_VIETQR_API_KEY,
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
                text: lang.global.t("user.overview.levels.register"),
                level: 1,
            },
            {
                text: lang.global.t("user.overview.levels.verifyEmail"),
                level: 2,
            },
            {
                text: lang.global.t("user.overview.levels.setPin"),
                level: 3,
            },
            {
                text: lang.global.t("user.overview.levels.updateInfo"),
                level: 4,
            },
            {
                text: lang.global.t("user.overview.levels.signContract"),
                level: 5,
            },
            {
                text: lang.global.t("user.overview.levels.createContract"),
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
                        name: lang.global.t(
                            "models.contract.selects.status.paying"
                        ),
                        value: x,
                    });
                    break;
                case 1:
                    ret.push({
                        name: lang.global.t(
                            "models.contract.selects.status.confirming"
                        ),
                        value: x,
                    });
                    break;
                case 2:
                    ret.push({
                        name: lang.global.t(
                            "models.contract.selects.status.paid"
                        ),
                        value: x,
                    });
                    break;
                case 3:
                    ret.push({
                        name: lang.global.t(
                            "models.contract.selects.status.withdrawing"
                        ),
                        value: x,
                    });
                    break;
                case 4:
                    ret.push({
                        name: lang.global.t(
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
                        name: lang.global.t(
                            "models.contract.selects.method.bank"
                        ),
                        value: x,
                    });
                    break;
                case 2:
                    ret.push({
                        name: lang.global.t(
                            "models.contract.selects.method.viettelPay"
                        ),
                        value: x,
                    });
                    break;
                case 3:
                    ret.push({
                        name: lang.global.t(
                            "models.contract.selects.method.atm"
                        ),
                        value: x,
                    });
                    break;
            }
        });
        ret.push({
            name: lang.global.t("models.contract.selects.method.cash"),
            value: 4,
        });
        return ret;
    },
    getUserLevelList: () => {
        return [
            {
                name: lang.global.t("admin.users.selects.level.level1"),
                value: 1,
            },
            {
                name: lang.global.t("admin.users.selects.level.level2"),
                value: 2,
            },
            {
                name: lang.global.t("admin.users.selects.level.level3"),
                value: 3,
            },
            {
                name: lang.global.t("admin.users.selects.level.level4"),
                value: 4,
            },
            {
                name: lang.global.t("admin.users.selects.level.level5"),
                value: 5,
            },
            {
                name: lang.global.t("admin.users.selects.level.level6"),
                value: 6,
            },
            {
                name: lang.global.t("admin.users.selects.level.level7"),
                value: 7,
            },
        ];
    },
    getSexList: () => {
        return [
            { name: lang.global.t("models.user.selects.sex.male"), value: 1 },
            { name: lang.global.t("models.user.selects.sex.female"), value: 0 },
        ];
    },
    getCommandList: () => {
        return [
            {
                name: lang.global.t("settings.command.selects.cache"),
                value: "config:cache",
            },
            {
                name: lang.global.t("settings.command.selects.resetMigrate"),
                value: "migrate:refresh --seed,passport:install --force",
            },
            {
                name: lang.global.t("settings.command.selects.downMaintance"),
                value: "down",
            },
            {
                name: lang.global.t("settings.command.selects.upMaintance"),
                value: "up",
            },
            {
                name: lang.global.t("settings.command.selects.cleanLog"),
                value: "activitylog:clean --days=0",
            },
            {
                name: lang.global.t("settings.command.selects.updateTrade"),
                value: "trades:update",
            },
            {
                name: lang.global.t("settings.command.selects.storageLink"),
                value: "storage:link",
            },
            {
                name: lang.global.t("settings.command.selects.custom"),
                value: "custom",
            },
        ];
    },
    getNotificationReceiverList: () => {
        return [
            {
                name: lang.global.t("settings.notification.selects.all"),
                value: "all",
            },
            {
                name: lang.global.t("settings.notification.selects.exists"),
                value: "exists",
            },
            {
                name: lang.global.t("settings.notification.selects.notExists"),
                value: "not_exists",
            },
            {
                name: lang.global.t("settings.notification.selects.ids"),
                value: "ids",
            },
        ];
    },
    getChartPeriodList: () => {
        return [
            {
                name: lang.global.t("trading.statistic.periods.day"),
                value: "day",
            },
            {
                name: lang.global.t("trading.statistic.periods.week"),
                value: "week",
            },
            {
                name: lang.global.t("trading.statistic.periods.month"),
                value: "month",
            },
            {
                name: lang.global.t("trading.statistic.periods.quarter"),
                value: "quarter",
            },
            {
                name: lang.global.t("trading.statistic.periods.year"),
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
            if (!!settings.isReturnBase64) return dataUrl;
            else return dataURItoBlob(dataUrl);
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
    pushPopupToHistoryState(routeHistoryState, callback) {
        window.history.pushState(null, null);
        routeHistoryState.push({ poppedFlag: false, callback });
    },
    popRouteHistoryState(routeHistoryState, event = false) {
        console.log("popRouteHistoryState", event);
        if (routeHistoryState.length > 0) {
            if (!routeHistoryState[routeHistoryState.length - 1].poppedFlag) {
                routeHistoryState[
                    routeHistoryState.length - 1
                ].poppedFlag = true;
                if (event)
                    routeHistoryState[routeHistoryState.length - 1].callback();
                else window.history.back();
            } else routeHistoryState.pop();
        }
    },
    copyText(text) {
        navigator.clipboard
            .writeText(text)
            .then(() =>
                Vue.toasted.success(
                    lang.global.t("messages.success.copiedText")
                )
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
