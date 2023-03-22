class Menu {
    // Các thuộc tính

    // Hàm khởi tạo
    constructor(global, callback) {
        this.global = global;
        this.callback = callback;
        this.createContainerElement();
        this.createNoLoginElement();
    }
    //
    // Các phương thức
    createContainerElement = () => {
        var container = document.createElement("div");
        container.id = "menuContainer";
        document.body.append(container);
        this.conEl = container;
    };
    createLoggedinElement = () => {
        var button = document.createElement("button");
        button.id = "lightWeightButton";
        button.classList = "fa fa-line-chart";
        button.title = "Biểu đồ đặt lệnh";
        button.addEventListener("click", () => this.callback.tLiWeCh());
        this.conEl.prepend(button);
        this.ligWeBu = button;
        //
        var button = document.createElement("button");
        button.classList = "fa fa-bar-chart";
        button.title = "Biểu đồ phân tích";
        button.addEventListener("click", () => this.callback.tTrViCh());
        this.conEl.prepend(button);
        this.traViBu = button;
        //
        if (
            !!this.global.isReport &&
            this.global.isOpeningMarket &&
            !this.global.isReportedResult
        ) {
            var button = document.createElement("button");
            button.id = "reportButton";
            button.classList = "fa fa-flag-checkered";
            button.title = "Báo cáo kết quả";
            button.addEventListener("click", () =>
                this.reportTradingResult(this)
            );
            this.conEl.append(button);
            this.repBu = button;
        }
        //
        this.setBu.classList.replace("fa-sign-in", "fa-cog");
        //
        this.interval = setInterval(() => {
            this.blinkLightWeightButton(this);
            if (moment().unix() == this.global.time.end)
                this.reportTradingResult(this);
        }, 1000);
    };
    removeLoggedinElement = () => {
        if (!!this.traViBu) this.traViBu.remove();
        if (!!this.ligWeBu) this.ligWeBu.remove();
        if (
            !!this.global.isReport &&
            this.global.isOpeningMarket &&
            !this.global.isReportedResult
        )
            if (!!this.repBu) this.repBu.remove();
        //
        this.setBu.classList.replace("fa-cog", "fa-sign-in");
        //
        clearInterval(this.interval);
    };
    createNoLoginElement = () => {
        var button = document.createElement("button");
        button.id = "settingButton";
        button.classList = "fa fa-sign-in";
        button.title = "Cài đặt";
        button.addEventListener("click", () => this.callback.tPo(true));
        this.conEl.append(button);
        this.setBu = button;
    };
    blinkLightWeightButton = self => {
        if (self.global.isInSession()) {
            if (self.ligWeBu.classList.contains("dark"))
                self.ligWeBu.classList.remove("dark");
            else self.ligWeBu.classList.add("dark");
        }
    };
    reportTradingResult = self => {
        self.global.a.s("warning", "Đang gửi báo cáo . . .", false);
        if (self.global.isOpeningMarket && !self.global.isReportedResult) {
            self.global.isReportedResult = true;
            self.global.toggleSpinner(true);
            const url = self.global.domain + self.global.endpoint.report;
            const data = self.global.c.e({
                ...self.callback.gReDa(),
                ...{ deviceId: self.global.deviceId }
            });
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${self.global.accessToken}`
                },
                body: data
            })
                .then(response => {
                    if (response.ok) return response.json();
                    throw new Error(response.statusText);
                })
                .then(json => {
                    json = self.global.c.d(json);
                    self.global.isReportedResult = json.isOk;
                    if (json.isOk) {
                        self.global.a.h().then(() => {
                            if (json.isExecuted)
                                self.global.a.s(
                                    "success",
                                    "Báo cáo đã gửi thành công."
                                );
                            else self.global.a.s("warning", "Đã gửi báo cáo");
                        });
                        self.repBu.remove();
                    } else if (json.message == "unauthorized")
                        self.callback.alertInvalidAccess();
                    //
                    self.global.toggleSpinner(false);
                })
                .catch(error => {
                    self.global.isReportedResult = false;
                    self.global.a
                        .h()
                        .then(() =>
                            self.global.a.s("error", "Gửi báo cáo thất bại")
                        );
                    self.global.toggleSpinner(false);
                });
        }
    };
}
