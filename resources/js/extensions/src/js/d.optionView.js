class OptionView {
    // Các thuộc tính
    TOKEN_KEY = "SOAT";
    // Hàm khởi tạo
    constructor(options) {
        this.APP_NAME = options.APP_NAME;
        this.registerEndpoint = options.registerEndpoint;
        this.loginEndpoint = options.loginEndpoint;
        this.logoutEndpoint = options.logoutEndpoint;
        this.getUserEndpoint = options.getUserEndpoint;
        this.notifier = options.notifier;
    }

    // Các phương thức
    init = () => {
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
        var wrapper = document.createElement("form");
        div.append(wrapper);
        wrapper.id = "loginForm";
        wrapper.className = "wrapper";
        wrapper.addEventListener("submit", e => this.login(e, this));
        //
        var p = document.createElement("p");
        wrapper.append(p);
        p.className = "invalid";
        this.loginMessage = p;
        //
        var input = document.createElement("input");
        wrapper.append(input);
        input.id = "loginUsername";
        input.type = "text";
        input.placeholder = "Email hoặc Số điện thoại";
        input.required = true;
        this.loginUsername = input;
        //
        input = document.createElement("input");
        wrapper.append(input);
        input.id = "loginPassword";
        input.type = "password";
        input.placeholder = "Mật khẩu";
        input.required = true;
        this.loginPassword = input;
        //
        var checkboxWrapper = document.createElement("div");
        wrapper.append(checkboxWrapper);
        input = document.createElement("input");
        checkboxWrapper.append(input);
        input.id = "loginRememberMe";
        input.type = "checkbox";
        this.loginRememberMe = input;
        var label = document.createElement("label");
        checkboxWrapper.append(label);
        label.setAttribute("for", "loginRememberMe");
        label.innerHTML = "&ensp;Lưu đăng nhập";
        //
        var button = document.createElement("button");
        wrapper.append(button);
        button.id = "loginSubmit";
        button.innerText = "ĐĂNG NHẬP";
        button.type = "submit";
        // button.setAttribute("form", "loginForm");
        this.loginSubmit = button;
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
        // button.setAttribute("form", "registerForm");
        this.registerSubmit = button;
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
            self.registerSubmit.innerText = "Đang đăng ký...";
            self.registerSubmit.disabled = true;
            self.registerMessage.innerText = "";
            const data = {
                name: self.registerName.value,
                email: self.registerEmail.value,
                phone: self.registerPhone.value,
                password: self.registerPassword.value,
                chanel: self.APP_NAME
            };
            fetch(self.registerEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.ok) return response.json();
                    throw new Error(response.statusText);
                })
                .then(jsondata => {
                    // console.log("register: ", jsondata);
                    if (jsondata.isOk) {
                        self.setToken(jsondata.token);
                        self.user = jsondata.user;
                        self.notifier.show("success", "Đăng ký thành công");
                    } else {
                        self.registerSubmit.innerText = "ĐĂNG KÝ";
                        self.registerSubmit.disabled = false;
                        if (jsondata.message == "emailExist")
                            self.registerMessage.innerText =
                                "Emai này đã đăng ký";
                        else if (jsondata.message == "phoneExist")
                            self.registerMessage.innerText =
                                "Số điện thoại này đã đăng ký";
                    }
                })
                .catch(error => {
                    self.notifier.show("error", "Đăng ký thất bại");
                    self.registerSubmit.innerText = "ĐĂNG KÝ";
                    self.registerSubmit.disabled = false;
                });
        }
    };
    login = (e, self) => {
        e.preventDefault();
        return new Promise(resolve => {
            self.loginSubmit.innerText = "Đang đăng nhập...";
            self.loginSubmit.disabled = true;
            self.loginMessage.innerText = "";
            const data = {
                username: self.loginUsername.value,
                password: self.loginPassword.value,
                rememberMe: self.loginRememberMe.value
            };
            console.log("login-data: ", data);
            fetch(self.loginEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.ok) return response.json();
                    throw new Error(response.statusText);
                })
                .then(jsondata => {
                    console.log("login: ", jsondata);
                    if (jsondata.isOk) {
                        self.setToken(jsondata.token);
                        self.user = jsondata.user;
                    } else {
                        self.loginSubmit.innerText = "ĐĂNG NHẬP";
                        self.loginSubmit.disabled = false;
                        self.loginMessage.innerText = "Sai thông tin đăng nhập";
                    }
                    resolve();
                })
                .catch(error => resolve(false));
        });
    };
    logout = () => {
        var self = this;
        return new Promise(resolve => {
            const accessToken = self.getToken();
            fetch(self.logoutEndpoint, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            }).then(() => {
                self.removeToken();
                resolve();
            });
        });
    };
    getUser = () => {
        var self = this;
        return new Promise(resolve => {
            const accessToken = self.getToken();
            if (!accessToken) resolve(false);
            else {
                fetch(self.getUserEndpoint, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                    .then(response => {
                        if (response.ok) return response.json();
                        throw new Error(response.statusText);
                    })
                    .then(jsondata => {
                        console.log("getUser: ", jsondata);
                        self.user = jsondata;
                        resolve(!!jsondata.code);
                    })
                    .catch(error => resolve(false));
            }
        });
    };
    setToken = token =>
        localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
    removeToken = () => localStorage.removeItem(this.TOKEN_KEY);
    getToken = () => {
        const token = JSON.parse(localStorage.getItem(this.TOKEN_KEY));
        if (moment().isBefore(token.expires_at)) return token.access_token;
        else return false;
    };
    toggle = () => {
        if (this.container.classList.contains("show"))
            this.container.classList.remove("show");
        else this.container.classList.add("show");
    };
}
