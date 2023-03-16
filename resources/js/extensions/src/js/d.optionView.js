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
        //
        var p = document.createElement("p");
        container.append(p);
        p.className = "title";
        p.innerText = "SmartOrder for VPS";
        //
        p = document.createElement("p");
        container.append(p);
        p.className = "subtitle";
        p.innerText = "Powered by Tho PS";
        //
        this.createLoginContainer(container);
        this.createRegisterContainer(container);
        this.createOptionContainer(container);
    };
    createLoginContainer = container => {
        var div = document.createElement("div");
        div.id = "loginContainer";
        div.className = "section";
        div.style.display = "block";
        container.append(div);
        this.loginContainer = div;
        //
        var wrapper = document.createElement("div");
        div.append(wrapper);
        //
        var p = document.createElement("p");
        wrapper.append(p);
        p.className = "link";
        p.innerText = "Đăng ký";
        p.addEventListener("click", e => {
            this.loginContainer.style.display = "none";
            this.registerContainer.style.display = "block";
        });
    };
    createRegisterContainer = container => {
        var div = document.createElement("div");
        div.id = "registerContainer";
        div.className = "section";
        div.style.display = "none";
        container.append(div);
        this.registerContainer = div;
        //
        var wrapper = document.createElement("div");
        div.append(wrapper);
        //
        var input = document.createElement("input");
        wrapper.append(input);
        input.id = "registerName";
        input.type = "text";
        input.placeholder = "Tên";
        //
        input = document.createElement("input");
        wrapper.append(input);
        input.id = "registerPhone";
        input.type = "text";
        input.placeholder = "Số điện thoại";
        //
        input = document.createElement("input");
        wrapper.append(input);
        input.id = "registerPassword";
        input.type = "text";
        input.placeholder = "Mật khẩu";
        //
        input = document.createElement("input");
        wrapper.append(input);
        input.id = "registerConfirmPassword";
        input.type = "text";
        input.placeholder = "Xác nhận mật khẩu";
        //
        var button = document.createElement("button");
        wrapper.append(button);
        button.id = "registerSubmit";
        button.innerText = "ĐĂNG KÝ";
        button.addEventListener("click", e => {
            alert("đăng ký");
        });
        //
        var p = document.createElement("p");
        wrapper.append(p);
        p.className = "link";
        p.innerText = "Đăng nhập";
        p.addEventListener("click", e => {
            this.registerContainer.style.display = "none";
            this.loginContainer.style.display = "block";
        });
    };
    createOptionContainer = container => {
        var div = document.createElement("div");
        div.id = "optionContainer";
        div.className = "section";
        div.style.display = "none";
        container.append(div);
        this.optionContainer = div;
        //
        var wrapper = document.createElement("div");
        div.append(wrapper);
        //
        var p = document.createElement("p");
        wrapper.append(p);
        p.innerText = "Đăng xuất";
        p.addEventListener("click", e => {
            this.optionContainer.style.display = "none";
            this.loginContainer.style.display = "block";
        });
    };
    toggle = () => {
        if (this.container.classList.contains("show"))
            this.container.classList.remove("show");
        else this.container.classList.add("show");
    };
}
