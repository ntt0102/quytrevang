class OptionView {
    // Các thuộc tính

    // Hàm khởi tạo
    constructor() {}

    // Các phương thức
    init = () => {
        console.log("init optionview");
        this.createContainer();
    };
    createContainer = () => {
        var container = document.createElement("div");
        container.id = "optionViewContainer";
        document.body.append(container);
        this.container = container;
    };
    toggle = () => {
        if (this.container.classList.contains("show"))
            this.container.classList.remove("show");
        else this.container.classList.add("show");
    };
}
