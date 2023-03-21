class So {
    //
    // Hàm khởi tạo
    constructor() {
        this.g = new Co();
        this.g.a = new Al();
        this.g.s = new St();
        this.g.c = new Cr(this.g);
        this.g.isM = navigator.userAgentData.mobile;
        this.c = new Ch(this.g, {
            gOrPo: this.gOrPoCb,
            cPo: this.cPoCb,
            oEnPr: this.oEnPrCb,
            oTpPr: this.oTpPrCb,
            oSlPr: this.oSlPrCb,
            cOr: this.cOrCb
        });
        this.p = new Po(this.g, {
            lin: this.liCb,
            lou: this.loCb,
            tVo: this.c.tVo
        });
        this.m = new Me(this.g, {
            tTrViCh: this.tTrViCb,
            tLiWeCh: this.tLiWeCb,
            tPo: this.p.t,
            gReDa: this.gReDaCb
        });
        this.rFuEv();
    }

    // Các phương thức
    i = async () => {
        this.g.a.s("warning", "Đang khởi động SmartOrder . . .", false);
        this.p.cNoLoEl();
        await this.p.gU();
        if (this.g.isLi) {
            await this.liCb();
            document.getElementById("sohopdong").value = this.g.contractNumber;
            document.getElementById("right_price").value = "MTL";
        } else this.m.setBu.click();
        this.g.a.h();
    };
    liCb = async () => {
        await this.p.gSeCo();
        this.c.c();
        await this.c.lChDa();
        await this.c.gToDa();
        this.p.cLoEl();
        this.m.cLoEl();
        if (!!this.g.isViewChart) this.m.ligWeBu.click();
        this.c.cnSk();
    };
    loCb = () => {
        this.m.rLoEl();
        this.p.rLoEl();
        this.c.r();
    };
    tTrViCb = () => {
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
        if (document.body.classList.contains("tradingview-chart")) {
            document.body.classList.remove("tradingview-chart");
            document.body.classList.remove("full-chart");
            leftEl.innerText = "Lệnh thường";
            rightEl.innerText = "Lệnh điều kiện";
            orderEl.innerText = "DANH SÁCH LỆNH";
            condOrderEl.innerText = "DANH SÁCH LỆNH ĐIỀU KIỆN";
        } else {
            document.body.classList.add("tradingview-chart");
            document.body.classList.add("full-chart");
            document.body.classList.remove("lightweight-chart");
            leftEl.innerText = "LT";
            rightEl.innerText = "LĐK";
            orderEl.innerText = "LỆNH THƯỜNG";
            condOrderEl.innerText = "L. ĐIỀU KIỆN";
        }
    };
    tLiWeCb = () => {
        var leftEl = document.getElementById("left_order_type");
        var rightEl = document.getElementById("right_order_type");
        var orderEl = document.querySelector(
            "#mainFooter .foot_tab:nth-child(1)"
        );
        var condOrderEl = document.querySelector(
            "#mainFooter .foot_tab:nth-child(2)"
        );
        if (document.body.classList.contains("lightweight-chart")) {
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
            `#danhmuc_${this.g.symbol} > td:nth-child(2)`
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
                +order.entry.price + order.side * this.g.takeProfit;
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
            order.sl.price = +order.entry.price - order.side * this.g.stopLoss;
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

var so = new So();
so.i();
