class Menu {
    // Các thuộc tính

    // Hàm khởi tạo
    constructor(global, callback) {
        this.global = global;
        this.callback = callback;
        this.createContainerElement();
        this.createNoLoginElement();
    }

    // Các phương thức
    createContainerElement = () => {
        var container = document.createElement("div");
        container.id = "menuContainer";
        document.body.append(container);
        this.containerElement = container;
    };
    createLoggedinElement = () => {
        var button = document.createElement("button");
        button.id = "lightWeightButton";
        button.classList = "fa fa-line-chart";
        button.title = "LightWeight Chart";
        button.addEventListener("click", this.callback.toggleLightWeightChart);
        this.containerElement.prepend(button);
        this.lightWeightButton = button;
        //
        var button = document.createElement("button");
        button.id = "tradingViewButton";
        button.classList = "fa fa-bar-chart";
        button.title = "TradingView Chart";
        button.addEventListener("click", this.callback.toggleTradingViewChart);
        this.containerElement.prepend(button);
        this.tradingViewButton = button;
        //
        var button = document.createElement("button");
        button.id = "reportButton";
        button.classList = "fa fa-flag-checkered";
        button.title = "Report";
        button.addEventListener("click", () => this.reportTradingResult(this));
        this.containerElement.append(button);
        this.reportButton = button;
        //
        this.interval = setInterval(() => {
            this.blinkLightWeightButton(this);
            if (moment().unix() == this.global.time.end)
                this.reportTradingResult(this);
        }, 1000);
    };
    removeLoggedinElement = () => {
        this.tradingViewButton.remove();
        this.lightWeightButton.remove();
        this.reportButton.remove();
        //
        clearInterval(this.interval);
    };
    createNoLoginElement = () => {
        var button = document.createElement("button");
        button.id = "settingButton";
        button.classList = "fa fa-cog";
        button.title = "Cài đặt";
        button.addEventListener("click", this.callback.togglePopup);
        this.containerElement.append(button);
        this.settingButton = button;
    };
    blinkLightWeightButton = self => {
        if (self.lightWeightButton.classList.contains("dark"))
            self.lightWeightButton.classList.remove("dark");
        else self.lightWeightButton.classList.add("dark");
    };
    reportTradingResult = self => {
        if (self.global.isOpeningMarket && !self.global.isReportedResult) {
            self.global.isReportedResult = true;
            self.global.toggleSpinner(true);
            const url = self.global.domain + self.global.endpoint.report;
            const data = self.callback.getReportData();
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
                    self.global.isReportedResult = jsondata.isOk;
                    if (jsondata.isOk) {
                        if (jsondata.isExecuted)
                            self.global.alert.show(
                                "success",
                                "Báo cáo đã gửi thành công."
                            );
                        else
                            self.global.alert.show("warning", "Đã gửi báo cáo");
                    }
                    //
                    self.global.toggleSpinner(false);
                })
                .catch(error => {
                    self.global.isReportedResult = false;
                    self.global.alert.show("error", "Gửi báo cáo thất bại");
                    self.global.toggleSpinner(false);
                });
        }
    };
    displayDefault = () => {
        if (this.global.isLoggedin) {
            if (!!this.global.isViewChart) this.lightWeightButton.click();
        } else this.settingButton.click();
    };
}
