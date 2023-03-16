class OptionView {
    // Các thuộc tính

    // Hàm khởi tạo
    constructor(options) {
        this.registerEnpoint = options.registerEnpoint;
    }

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
        this.createHearderContainer(container);
        this.createLoginContainer(container);
        this.createRegisterContainer(container);
        this.createOptionContainer(container);
    };
    createHearderContainer = container => {
        var div = document.createElement("div");
        div.id = "hearderContainer";
        container.append(div);
        this.hearderContainer = div;
        //
        //
        var p = document.createElement("p");
        div.append(p);
        p.className = "title";
        p.innerText = "SmartOrder cho VPS";
        //
        p = document.createElement("p");
        div.append(p);
        p.className = "subtitle";
        p.innerText = "Phát triển bởi Tho PS";
        //
        p = document.createElement("p");
        div.append(p);
        p.className = "homepage link";
        p.innerText = "Trang chủ";
        p.addEventListener("click", () =>
            window.open("https://www.w3schools.com")
        );
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
        wrapper.className = "wrapper";
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
        var wrapper = document.createElement("form");
        div.append(wrapper);
        wrapper.id = "registerForm";
        wrapper.className = "wrapper";
        wrapper.addEventListener("submit", e => this.register(e, this));
        //
        var p = document.createElement("p");
        wrapper.append(p);
        p.className = "invalid";
        this.registerMessage = p;
        //
        var input = document.createElement("input");
        wrapper.append(input);
        input.id = "registerName";
        input.type = "text";
        input.placeholder = "Tên";
        input.required = true;
        this.registerName = input;
        //
        input = document.createElement("input");
        wrapper.append(input);
        input.id = "registerEmail";
        input.type = "email";
        input.placeholder = "Email";
        input.required = true;
        this.registerEmail = input;
        //
        input = document.createElement("input");
        wrapper.append(input);
        input.id = "registerPhone";
        input.type = "text";
        input.placeholder = "Số điện thoại";
        input.required = true;
        input.setAttribute("maxlength", 10);
        input.setAttribute("pattern", "[0-9]+");
        this.registerPhone = input;
        //
        input = document.createElement("input");
        wrapper.append(input);
        input.id = "registerPassword";
        input.type = "password";
        input.placeholder = "Mật khẩu";
        input.required = true;
        this.registerPassword = input;
        //
        input = document.createElement("input");
        wrapper.append(input);
        input.id = "registerConfirmPassword";
        input.type = "password";
        input.placeholder = "Xác nhận mật khẩu";
        input.required = true;
        this.registerConfirmPassword = input;
        //
        var button = document.createElement("button");
        wrapper.append(button);
        button.id = "registerSubmit";
        button.innerText = "ĐĂNG KÝ";
        button.type = "submit";
        button.setAttribute("form", "registerForm");
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
        wrapper.className = "wrapper";
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
    register = (e, self) => {
        e.preventDefault();
        if (self.registerConfirmPassword.value != self.registerPassword.value) {
            self.registerMessage.innerText = "Mật khẩu không khớp";
            return false;
        } else {
            self.registerMessage.innerText = "";
            const data = {
                name: self.registerName.value,
                email: self.registerEmail.value,
                phone: self.registerPhone.value,
                password: self.registerPassword.value
            };
            console.log("data-register", data);
            fetch(self.registerEnpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error(response.statusText);
                })
                .then(jsondata => {
                    console.log("register: ", jsondata);
                });
        }
    };
    toggle = () => {
        if (this.container.classList.contains("show"))
            this.container.classList.remove("show");
        else this.container.classList.add("show");
    };
}
