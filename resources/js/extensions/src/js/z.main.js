class SmartOrder {
    // Hàm khởi tạo
    constructor() {
        this.global = new Config();
        this.global.a = new Alert();
        this.global.s = new Store();
        this.global.c = new Crypto(this.global);
        this.global.isM = navigator.userAgentData.mobile;
        this.c = new Chart(this.global, {
            gOrPo: this.gOrPoCb,
            cPo: this.cPoCb,
            oEnPr: this.oEnPrCb,
            oTpPr: this.oTpPrCb,
            oSlPr: this.oSlPrCb,
            cOr: this.cOrCb,
            aIvAc: this.aIvAcCb
        });
        this.p = new Popup(this.global, {
            lin: this.liCb,
            lou: this.loCb,
            tVo: this.tVoCb
        });
        this.m = new Menu(this.global, {
            tTrViCh: this.tTrViCb,
            tLiWeCh: this.tLiWeCb,
            tPo: this.tPoCb,
            gReDa: this.gReDaCb,
            aIvAc: this.aIvAcCb
        });
        this.rFuEv();
    }
    //
    // Các phương thức
    init = async () => {
        this.p.createNoLoginElement();
        await this.p.getDeviceId();
        await this.p.getUser();
        if (this.global.isLi) {
            await this.liCb();
            document.getElementById(
                "sohopdong"
            ).value = this.global.contractNumber;
            document.getElementById("right_price").value = "MTL";
        } else this.m.setBu.click();
    };
    liCb = async () => {
        this.global.a.s("warning", "Đang khởi tạo biểu đồ . . .", false);
        await this.p.getServerConfig();
        this.p.createLoggedinElement();
        this.c.create();
        await this.c.loadChartData();
        await this.c.getToolsData();
        this.m.createLoggedinElement();
        if (!!this.global.isViewChart) this.m.ligWeBu.click();
        this.c.connectSocket();
        this.global.a.h();
    };
    loCb = () => {
        this.m.removeLoggedinElement();
        this.p.removeLoggedinElement();
        this.c.remove();
        this.tTrViCb(false);
        this.tLiWeCb(false);
    };
    tTrViCb = (visible = true) => {
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
            leftEl.innerText = "Lệnh thường";
            rightEl.innerText = "Lệnh điều kiện";
            orderEl.innerText = "DANH SÁCH LỆNH";
            condOrderEl.innerText = "DANH SÁCH LỆNH ĐIỀU KIỆN";
        } else {
            this.tPoCb(false);
            document.body.classList.add("tradingview-chart");
            document.body.classList.add("full-chart");
            document.body.classList.remove("lightweight-chart");
            leftEl.innerText = "LT";
            rightEl.innerText = "LĐK";
            orderEl.innerText = "LỆNH THƯỜNG";
            condOrderEl.innerText = "L. ĐIỀU KIỆN";
        }
    };
    tLiWeCb = (visible = true) => {
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
            leftEl.innerText = "Lệnh thường";
            rightEl.innerText = "Lệnh điều kiện";
            //
            orderEl.classList.remove("fa", "fa-check-circle");
            orderEl.innerText = "DANH SÁCH LỆNH";
            condOrderEl.classList.remove("fa", "fa-question-circle");
            condOrderEl.innerText = "DANH SÁCH LỆNH ĐIỀU KIỆN";
        } else {
            this.tPoCb(false);
            document.body.classList.add("lightweight-chart");
            document.body.classList.add("full-chart");
            document.body.classList.remove("tradingview-chart");
            leftEl.innerText = "LT";
            rightEl.innerText = "LĐK";
            //
            orderEl.classList.add("fa", "fa-check-circle");
            orderEl.innerText = "";
            condOrderEl.classList.add("fa", "fa-question-circle");
            condOrderEl.innerText = "";
        }
    };
    gReDaCb = () => {
        return {
            revenue: +document
                .getElementById("vmAccInfo")
                .innerText.replaceAll(",", ""),
            fees: +document
                .getElementById("othersAccInfo")
                .innerText.replaceAll(",", "")
        };
    };
    gOrPoCb = () => {
        const el = document.querySelector(
            `#danhmuc_${this.global.symbol} > td:nth-child(2)`
        );
        if (!el) return 0;
        const position = el.innerText;
        if (isNaN(position)) return 0;
        else return +position;
    };
    cPoCb = () => {
        const position = this.gOrPoCb();
        if (position) {
            document.getElementById("select_normal_order_wrapper").click();
            document.getElementById("right_price").value = "MTL";
            document.getElementById("sohopdong").value = Math.abs(position);
            document
                .getElementById(`btn_${position > 0 ? "short" : "long"}`)
                .click();
        }
    };
    oEnPrCb = order => {
        this.cSc("onCancelAllOrderPending('order_condition')");
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
    oTpPrCb = (order, isInit = false) => {
        this.cSc("onCancelAllOrderPending('order')");
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
    oSlPrCb = (order, isInit = false) => {
        this.cSc("onCancelAllOrderPending('order_condition')");
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
    cOrCb = () => {
        this.cSc("onCancelAllOrderPending('order_condition')");
        this.cSc("onCancelAllOrderPending('order')");
    };
    tVoCb = visible => this.c.toggleChartVolume(visible);
    tPoCb = visible => this.p.toggle(visible);
    aIvAcCb = () => this.p.alertInvalidAccess();
    cSc = script => {
        var button = document.createElement("button");
        button.setAttribute("onclick", script);
        button.click();
    };
    rFuEv = () => {
        document
            .querySelector(".timeStamp")
            .addEventListener("dblclick", () => {
                if (document.fullscreenElement) document.exitFullscreen();
                else document.documentElement.requestFullscreen();
            });
    };
}

var smartOrder = new SmartOrder();
smartOrder.init();
