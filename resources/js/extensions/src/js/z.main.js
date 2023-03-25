class SmartOrder {
    // Hàm khởi tạo
    constructor() {
        this.global = new Config();
        this.global.alert = new Alert();
        this.global.store = new Store();
        this.global.crypto = new Crypto(this.global);
        this.global.isMobile = navigator.userAgentData.mobile;
        this.chart = new Chart(this.global, {
            getOrderPositionCallback: this.getOrderPositionCallback,
            closeOrderPositionCallback: this.closeOrderPositionCallback,
            orderEntryPriceCallback: this.orderEntryPriceCallback,
            orderTpPriceCallback: this.orderTpPriceCallback,
            orderSlPriceCallback: this.orderSlPriceCallback,
            cancelOrderCallback: this.cancelOrderCallback,
            alertInvalidAccessCallback: this.alertInvalidAccessCallback
        });
        this.popup = new Popup(this.global, {
            loginCallback: this.loginCallback,
            logoutCallback: this.logoutCallback,
            toggleChartVolumeCallback: this.toggleChartVolumeCallback
        });
        this.menu = new Menu(this.global, {
            toggleTradingViewButtonCallback: this
                .toggleTradingViewButtonCallback,
            toggleLightWeightButtonCallback: this
                .toggleLightWeightButtonCallback,
            togglePopupCallback: this.togglePopupCallback,
            getReportDataCallback: this.getReportDataCallback,
            alertInvalidAccessCallback: this.alertInvalidAccessCallback
        });
        this.registerFullscreenEvent();
        this.detectVpsSystem();
    }
    //
    // Các phương thức
    init = async () => {
        this.popup.createNoLoginElement();
        await this.popup.getDeviceId();
        await this.popup.getUser();
        if (this.global.isLoggedin) {
            await this.loginCallback();
            document.getElementById(
                "sohopdong"
            ).value = this.global.contractNumber;
            document.getElementById("right_price").value = "MTL";
        } else this.menu.settingButton.click();
    };
    loginCallback = async () => {
        this.global.alert.show("warning", "Đang khởi tạo biểu đồ . . .", false);
        await this.popup.getServerConfig();
        this.popup.createLoggedinElement();
        this.chart.create();
        await this.chart.loadChartData();
        await this.chart.getToolsData();
        this.menu.createLoggedinElement();
        if (!!this.global.isViewChart) this.menu.lightWeightButton.click();
        this.chart.connectSocket();
        this.global.alert.hide();
    };
    logoutCallback = () => {
        this.menu.removeLoggedinElement();
        this.popup.removeLoggedinElement();
        this.chart.remove();
        this.toggleTradingViewButtonCallback(false);
        this.toggleLightWeightButtonCallback(false);
    };
    toggleTradingViewButtonCallback = (visible = true) => {
        var leftEl = document.getElementById("left_order_type");
        var rightEl = document.getElementById("right_order_type");
        var orderEl = document.querySelector(
            "#mainFooter .foot_tab:nth-child(1)"
        );
        var condOrderEl = document.querySelector(
            "#mainFooter .foot_tab:nth-child(2)"
        );
        orderEl.classList.remove("fa", "fa-check-circle");
        condOrderEl.classList.remove("fa", "fa-question-circle");
        if (!visible || document.body.classList.contains("tradingview-chart")) {
            document.body.classList.remove("tradingview-chart");
            document.body.classList.remove("full-chart");
            if (this.global.isSmartPro) {
                leftEl.innerText = "Lệnh thường";
                rightEl.innerText = "Lệnh điều kiện";
                orderEl.innerText = "DANH SÁCH LỆNH";
                condOrderEl.innerText = "DANH SÁCH LỆNH ĐIỀU KIỆN";
            }
        } else {
            this.togglePopupCallback(false);
            document.body.classList.add("tradingview-chart");
            document.body.classList.add("full-chart");
            document.body.classList.remove("lightweight-chart");
            if (this.global.isSmartPro) {
                leftEl.innerText = "LT";
                rightEl.innerText = "LĐK";
                orderEl.innerText = "LỆNH THƯỜNG";
                condOrderEl.innerText = "L. ĐIỀU KIỆN";
            }
        }
    };
    toggleLightWeightButtonCallback = (visible = true) => {
        var leftEl = document.getElementById("left_order_type");
        var rightEl = document.getElementById("right_order_type");
        var orderEl = document.querySelector(
            "#mainFooter .foot_tab:nth-child(1)"
        );
        var condOrderEl = document.querySelector(
            "#mainFooter .foot_tab:nth-child(2)"
        );
        if (!visible || document.body.classList.contains("lightweight-chart")) {
            document.body.classList.remove("lightweight-chart");
            document.body.classList.remove("full-chart");
            if (this.global.isSmartPro) {
                leftEl.innerText = "Lệnh thường";
                rightEl.innerText = "Lệnh điều kiện";
                orderEl.classList.remove("fa", "fa-check-circle");
                orderEl.innerText = "DANH SÁCH LỆNH";
                condOrderEl.classList.remove("fa", "fa-question-circle");
                condOrderEl.innerText = "DANH SÁCH LỆNH ĐIỀU KIỆN";
            }
        } else {
            this.togglePopupCallback(false);
            document.body.classList.add("lightweight-chart");
            document.body.classList.add("full-chart");
            document.body.classList.remove("tradingview-chart");
            if (this.global.isSmartPro) {
                leftEl.innerText = "LT";
                rightEl.innerText = "LĐK";
                orderEl.classList.add("fa", "fa-check-circle");
                orderEl.innerText = "";
                condOrderEl.classList.add("fa", "fa-question-circle");
                condOrderEl.innerText = "";
            }
        }
    };
    getReportDataCallback = () => {
        return {
            revenue: +document
                .getElementById("vmAccInfo")
                .innerText.replaceAll(",", ""),
            fees: +document
                .getElementById("othersAccInfo")
                .innerText.replaceAll(",", "")
        };
    };
    getOrderPositionCallback = () => {
        const el = document.querySelector(
            `#danhmuc_${this.global.symbol} > td:nth-child(2)`
        );
        if (!el) return 0;
        const position = el.innerText;
        if (isNaN(position)) return 0;
        else return +position;
    };
    closeOrderPositionCallback = () => {
        const position = this.getOrderPositionCallback();
        if (position) {
            document.getElementById("select_normal_order_wrapper").click();
            document.getElementById("right_price").value = "MTL";
            document.getElementById("sohopdong").value = Math.abs(position);
            document
                .getElementById(`btn_${position > 0 ? "short" : "long"}`)
                .click();
        }
    };
    orderEntryPriceCallback = order => {
        this.callJavascript("onCancelAllOrderPending('order_condition')");
        document.getElementById("select_condition_order_wrapper").click();
        document.getElementById("right_stopOrderIndex").value =
            order.entry.price;
        document.getElementById("right_price").value = "MTL";
        document.getElementById("right_selStopOrderType").value =
            order.side > 0 ? "SOL" : "SOU";
        //
        setTimeout(() => {
            document
                .getElementById(`btn_${order.side > 0 ? "long" : "short"}`)
                .click();
        }, 1000);
    };
    orderTpPriceCallback = (order, isInit = false) => {
        this.callJavascript("onCancelAllOrderPending('order')");
        if (isInit)
            order.tp.price =
                +order.entry.price + order.side * this.global.takeProfit;
        setTimeout(() => {
            document.getElementById("select_normal_order_wrapper").click();
            document.getElementById("right_price").value = order.tp.price;
            document
                .getElementById(`btn_${order.side < 0 ? "long" : "short"}`)
                .click();
        }, 1000);
    };
    orderSlPriceCallback = (order, isInit = false) => {
        this.callJavascript("onCancelAllOrderPending('order_condition')");
        if (isInit)
            order.sl.price =
                +order.entry.price - order.side * this.global.stopLoss;
        setTimeout(() => {
            document.getElementById("select_condition_order_wrapper").click();
            document.getElementById("right_stopOrderIndex").value =
                order.sl.price;
            document.getElementById("right_price").value = "MTL";
            document.getElementById("right_selStopOrderType").value =
                order.side < 0 ? "SOL" : "SOU";
            document
                .getElementById(`btn_${order.side < 0 ? "long" : "short"}`)
                .click();
        }, 1000);
    };
    cancelOrderCallback = () => {
        this.callJavascript("onCancelAllOrderPending('order_condition')");
        this.callJavascript("onCancelAllOrderPending('order')");
    };
    toggleChartVolumeCallback = visible =>
        this.chart.toggleChartVolume(visible);
    togglePopupCallback = visible => this.popup.toggle(visible);
    alertInvalidAccessCallback = () => this.popup.alertInvalidAccess();
    callJavascript = script => {
        var button = document.createElement("button");
        button.setAttribute("onclick", script);
        button.click();
    };
    registerFullscreenEvent = () => {
        document
            .querySelector(".timeStamp")
            .addEventListener("dblclick", () => {
                if (document.fullscreenElement) document.exitFullscreen();
                else document.documentElement.requestFullscreen();
            });
    };
    detectVpsSystem = () => {
        const site = window.location.hostname.split(".")[0];
        document.body.classList.add(site);
        this.global.isSmartPro = site == "smartpro";
    };
}

var smartOrder = new SmartOrder();
smartOrder.init();
