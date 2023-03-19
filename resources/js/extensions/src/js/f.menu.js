class Me {
    // Các thuộc tính

    // Hàm khởi tạo
    constructor(g, c) {
        this.g = g;
        this.cb = c;
        this.cCoEl();
        this.cNoLoEl();
    }

    // Các phương thức
    cCoEl = () => {
        var container = document.createElement("div");
        container.id = "menuContainer";
        document.body.append(container);
        this.conEl = container;
    };
    cLoEl = () => {
        var button = document.createElement("button");
        button.id = "lightWeightButton";
        button.classList = "fa fa-line-chart";
        button.title = "LightWeight Chart";
        button.addEventListener("click", this.cb.tLiWeCh);
        this.conEl.prepend(button);
        this.ligWeBu = button;
        //
        var button = document.createElement("button");
        button.id = "tradingViewButton";
        button.classList = "fa fa-bar-chart";
        button.title = "TradingView Chart";
        button.addEventListener("click", this.cb.tTrViCh);
        this.conEl.prepend(button);
        this.traViBu = button;
        //
        if (this.g.isOpeningMarket) {
            var button = document.createElement("button");
            button.id = "reportButton";
            button.classList = "fa fa-flag-checkered";
            button.title = "Report";
            button.addEventListener("click", () => this.rTrRe(this));
            this.conEl.append(button);
            this.repBu = button;
        }
        //
        this.interval = setInterval(() => {
            this.bLiWeBu(this);
            if (moment().unix() == this.g.time.end) this.rTrRe(this);
        }, 1000);
    };
    rLoEl = () => {
        this.traViBu.remove();
        this.ligWeBu.remove();
        this.repBu.remove();
        //
        clearInterval(this.interval);
    };
    cNoLoEl = () => {
        var button = document.createElement("button");
        button.id = "settingButton";
        button.classList = "fa fa-cog";
        button.title = "Cài đặt";
        button.addEventListener("click", this.cb.tPo);
        this.conEl.append(button);
        this.setBu = button;
    };
    bLiWeBu = self => {
        if (self.ligWeBu.classList.contains("dark"))
            self.ligWeBu.classList.remove("dark");
        else self.ligWeBu.classList.add("dark");
    };
    rTrRe = self => {
        if (self.g.isOpeningMarket && !self.g.isReportedResult) {
            self.g.isReportedResult = true;
            self.g.tSp(true);
            const url = self.g.domain + self.g.endpoint.report;
            const data = self.cb.gReDa();
            fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.ok) return response.json();
                    throw new Error(response.statusText);
                })
                .then(jsondata => {
                    self.g.isReportedResult = jsondata.isOk;
                    if (jsondata.isOk) {
                        if (jsondata.isExecuted)
                            self.g.a.s("success", "Báo cáo đã gửi thành công.");
                        else self.g.a.s("warning", "Đã gửi báo cáo");
                    }
                    //
                    self.g.tSp(false);
                })
                .catch(error => {
                    self.g.isReportedResult = false;
                    self.g.a.s("error", "Gửi báo cáo thất bại");
                    self.g.tSp(false);
                });
        }
    };
    dDe = () => {
        if (this.g.isLi) {
            if (!!this.g.isViewChart) this.ligWeBu.click();
        } else this.setBu.click();
    };
}
