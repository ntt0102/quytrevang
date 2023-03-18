class Menu {
    // Các thuộc tính
    containerElement;

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
        button.id = "tradingViewButton";
        button.classList = "fa fa-bar-chart";
        button.title = "TradingView Chart";
        button.addEventListener("click", this.callback.toggleTradingViewChart);
        this.containerElement.append(button);
        this.tradingViewButton = button;
        //
        var button = document.createElement("button");
        button.id = "lightWeightButton";
        button.classList = "fa fa-line-chart";
        button.title = "LightWeight Chart";
        button.addEventListener("click", this.callback.toggleLightWeightChart);
        this.containerElement.append(button);
        this.lightWeightButton = button;
        //
        var button = document.createElement("button");
        button.id = "reportButton";
        button.classList = "fa fa-flag-checkered";
        button.title = "Report";
        button.addEventListener("click", this.callback.report);
        this.containerElement.append(button);
        this.reportButton = button;
    };
    removeLoggedinElement = () => {
        this.tradingViewButton.remove();
        this.lightWeightButton.remove();
        this.reportButton.remove();
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
}
