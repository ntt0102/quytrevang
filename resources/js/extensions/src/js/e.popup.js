class Popup {
    // Các thuộc tính
    TOKEN_KEY = "SOAT";

    // Hàm khởi tạo
    constructor(global, callback) {
        this.global = global;
        this.callback = callback;
        this.createContainerElement();
        this.getDeviceId();
    }

    // Các phương thức
    createContainerElement = () => {
        var container = document.createElement("div");
        container.id = "optionViewContainer";
        document.body.append(container);
        this.containerElement = container;
    };
    createNoLoginElement = () => {
        this.createHearderContainer();
        this.createLoginContainer();
        this.createRegisterContainer();
    };
    createHearderContainer = () => {
        var div = document.createElement("div");
        div.id = "hearderContainer";
        this.containerElement.append(div);
        this.hearderContainer = div;
        //
        var p = document.createElement("label");
        div.append(p);
        p.className = "title";
        p.innerText = this.global.appName;
    };
    createLoginContainer = () => {
        var div = document.createElement("div");
        div.id = "loginContainer";
        div.className = "section";
        div.style.display = this.global.isLoggedin ? "none" : "block";
        this.containerElement.append(div);
        this.loginContainer = div;
        //
        var wrapper = document.createElement("form");
        div.append(wrapper);
        wrapper.id = "loginForm";
        wrapper.className = "wrapper";
        wrapper.addEventListener("submit", e => this.login(e, this));
        //
        var p = document.createElement("label");
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
        if (!this.global.isLoggedin) this.loginUsername.focus();
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
        this.loginSubmit = button;
        //
        var routeWrapper = document.createElement("div");
        routeWrapper.className = "link-group";
        wrapper.append(routeWrapper);
        var route = document.createElement("label");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Đăng ký";
        route.addEventListener("click", e => {
            this.loginContainer.style.display = "none";
            this.registerContainer.style.display = "block";
            this.registerName.focus();
        });
        var route = document.createElement("label");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Trang chủ";
        route.addEventListener("click", () =>
            window.open("https://www.w3schools.com")
        );
    };
    createRegisterContainer = () => {
        var div = document.createElement("div");
        div.id = "registerContainer";
        div.className = "section";
        div.style.display = "none";
        this.containerElement.append(div);
        this.registerContainer = div;
        //
        var wrapper = document.createElement("form");
        div.append(wrapper);
        wrapper.id = "registerForm";
        wrapper.className = "wrapper";
        wrapper.addEventListener("submit", e => this.register(e, this));
        //
        var p = document.createElement("label");
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
        this.registerSubmit = button;
        //
        var routeWrapper = document.createElement("div");
        routeWrapper.className = "link-group";
        wrapper.append(routeWrapper);
        var route = document.createElement("label");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Đăng nhập";
        route.addEventListener("click", e => {
            this.registerContainer.style.display = "none";
            this.loginContainer.style.display = "block";
            this.loginUsername.focus();
        });
        var route = document.createElement("label");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Trang chủ";
        route.addEventListener("click", () =>
            window.open("https://www.w3schools.com")
        );
    };
    createLoggedinElement = () => {
        this.createInfoContainer();
        this.createOptionContainer();
        this.createAboutContainer();
        //
        this.loginContainer.style.display = "none";
        this.registerContainer.style.display = "none";
        this.infoContainer.style.display = "block";
    };
    createInfoContainer = () => {
        var div = document.createElement("div");
        div.id = "infoContainer";
        div.className = "section";
        div.style.display = this.global.isLoggedin ? "block" : "none";
        this.containerElement.append(div);
        this.infoContainer = div;
        //
        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        div.append(wrapper);
        //
        var list = document.createElement("div");
        list.className = "list";
        wrapper.append(list);
        var title = document.createElement("label");
        list.append(title);
        title.className = "title";
        title.innerText = "Thông tin tài khoản:";
        var item = document.createElement("div");
        item.className = "item";
        list.append(item);
        var label = document.createElement("span");
        label.innerText = "Tên:";
        item.append(label);
        var value = document.createElement("span");
        value.innerText = this.global.user.name;
        item.append(value);
        //
        var item = document.createElement("div");
        item.className = "item";
        list.append(item);
        var label = document.createElement("span");
        label.innerText = "Email:";
        item.append(label);
        var value = document.createElement("span");
        value.innerText = this.global.user.email;
        item.append(value);
        //
        var item = document.createElement("div");
        item.className = "item";
        list.append(item);
        var label = document.createElement("span");
        label.innerText = "Điện thoại:";
        item.append(label);
        var value = document.createElement("span");
        value.innerText = this.global.user.phone;
        item.append(value);
        //
        var item = document.createElement("div");
        item.className = "item";
        list.append(item);
        var label = document.createElement("span");
        label.innerText = "Ngày đăng ký:";
        item.append(label);
        var value = document.createElement("span");
        value.innerText = moment(this.global.registerDate).format("DD/MM/YYYY");
        item.append(value);
        //
        var list = document.createElement("div");
        list.className = "list";
        wrapper.append(list);
        var title = document.createElement("label");
        list.append(title);
        title.className = "title";
        title.innerText = "Thông tin gói dịch vụ:";
        var item = document.createElement("div");
        item.className = "item";
        list.append(item);
        var label = document.createElement("span");
        label.innerText = "Ngày bắt đầu:";
        item.append(label);
        var value = document.createElement("span");
        value.innerText = moment(this.global.startDate).format("DD/MM/YYYY");
        item.append(value);
        //
        var item = document.createElement("div");
        item.className = "item";
        list.append(item);
        var label = document.createElement("span");
        label.innerText = "Ngày hết hạn:";
        item.append(label);
        var value = document.createElement("span");
        value.innerText = moment(this.global.expiresDate).format("DD/MM/YYYY");
        item.append(value);
        //
        var item = document.createElement("div");
        item.className = "item";
        list.append(item);
        var label = document.createElement("span");
        label.innerText = "Số lượng thiết bị:";
        item.append(label);
        var value = document.createElement("span");
        value.innerText = this.global.deviceLimit;
        item.append(value);
        //
        var button = document.createElement("button");
        wrapper.append(button);
        button.innerText = "ĐĂNG XUẤT";
        button.addEventListener("click", () => this.logout(this));
        //
        var routeWrapper = document.createElement("div");
        routeWrapper.className = "link-group";
        wrapper.append(routeWrapper);
        var route = document.createElement("label");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Cài đặt";
        route.addEventListener("click", e => {
            this.infoContainer.style.display = "none";
            this.optionContainer.style.display = "block";
        });
        var route = document.createElement("label");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Cập nhật";
        route.addEventListener("click", e => {
            this.infoContainer.style.display = "none";
            this.aboutContainer.style.display = "block";
        });
    };
    createOptionContainer = () => {
        var div = document.createElement("div");
        div.id = "optionContainer";
        div.className = "section";
        div.style.display = "none";
        this.containerElement.append(div);
        this.optionContainer = div;
        //
        var wrapper = document.createElement("form");
        div.append(wrapper);
        wrapper.id = "optionForm";
        wrapper.className = "wrapper";
        wrapper.addEventListener("submit", e =>
            this.setServerConfig(e, this).then(isOk => {
                this.optionSubmit.innerText = "LƯU CÀI ĐẶT";
                this.optionSubmit.disabled = false;
                if (isOk)
                    this.global.alert.show("success", "Lưu cài đặt thành công");
                else this.global.alert.show("error", "Lưu cài đặt thất bại");
                //
                this.callback.toggleVolume(this.isVolumeCheckbox.checked);
            })
        );
        //
        var list = document.createElement("div");
        list.className = "list";
        wrapper.append(list);
        //
        var item = document.createElement("div");
        item.className = "item";
        list.append(item);
        var label = document.createElement("span");
        label.innerText = "Khung thời gian:";
        item.append(label);
        var select = document.createElement("select");
        select.style.width = "69px";
        this.global.timeFrames.forEach((item, index) => {
            var option = document.createElement("option");
            option.value = item.value;
            option.text = item.text;
            select.appendChild(option);
        });
        select.value = this.global.timeFrame;
        this.timeFrameSelect = select;
        item.append(select);
        //
        item = document.createElement("div");
        item.className = "item";
        list.append(item);
        label = document.createElement("span");
        label.innerText = "Loại biểu đồ:";
        item.append(label);
        select = document.createElement("select");
        this.global.chartTypes.forEach((item, index) => {
            var option = document.createElement("option");
            option.value = item.value;
            option.text = item.text;
            select.appendChild(option);
        });
        select.value = this.global.chartType;
        this.chartTypeSelect = select;
        item.append(select);
        //
        item = document.createElement("div");
        item.className = "item";
        list.append(item);
        label = document.createElement("span");
        label.innerText = "Số hợp đồng:";
        item.append(label);
        var input = document.createElement("input");
        input.type = "number";
        input.style.width = "69px";
        input.style.height = "21px";
        input.value = this.global.contractNumber;
        this.contractNumberInput = input;
        item.append(input);
        //
        item = document.createElement("div");
        item.className = "item";
        list.append(item);
        label = document.createElement("span");
        label.innerText = "Điểm chốt lời:";
        item.append(label);
        var input = document.createElement("input");
        input.type = "number";
        input.style.width = "69px";
        input.style.height = "21px";
        input.value = this.global.takeProfit;
        this.takeProfitInput = input;
        item.append(input);
        //
        item = document.createElement("div");
        item.className = "item";
        list.append(item);
        label = document.createElement("span");
        label.innerText = "Điểm cắt lỗ:";
        item.append(label);
        var input = document.createElement("input");
        input.type = "number";
        input.style.width = "69px";
        input.style.height = "21px";
        input.value = this.global.stopLoss;
        this.stopLossInput = input;
        item.append(input);
        //
        item = document.createElement("div");
        item.className = "item";
        list.append(item);
        label = document.createElement("span");
        label.innerText = "Hiển thị biểu đồ khối lượng:";
        item.append(label);
        input = document.createElement("input");
        input.type = "checkbox";
        input.style.width = "17px";
        input.checked = !!this.global.isVolume;
        this.isVolumeCheckbox = input;
        item.append(input);
        //
        item = document.createElement("div");
        item.className = "item";
        list.append(item);
        label = document.createElement("span");
        label.innerText = "Mở biểu đồ khi khởi động:";
        item.append(label);
        input = document.createElement("input");
        input.type = "checkbox";
        input.style.width = "17px";
        input.checked = !!this.global.isViewChart;
        this.isViewChartCheckbox = input;
        item.append(input);
        //
        var button = document.createElement("button");
        wrapper.append(button);
        button.id = "optionSubmit";
        button.innerText = "LƯU CÀI ĐẶT";
        button.type = "submit";
        this.optionSubmit = button;
        //
        var route = document.createElement("label");
        wrapper.append(route);
        route.className = "link";
        route.innerText = "Trở về";
        route.addEventListener("click", e => {
            this.optionContainer.style.display = "none";
            this.infoContainer.style.display = "block";
        });
    };
    createAboutContainer = () => {
        var div = document.createElement("div");
        div.id = "aboutContainer";
        div.className = "section";
        div.style.display = "none";
        this.containerElement.append(div);
        this.aboutContainer = div;
        //
        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        div.append(wrapper);
        //
        var list = document.createElement("div");
        list.className = "list";
        wrapper.append(list);
        var item = document.createElement("div");
        item.className = "item";
        list.append(item);
        var label = document.createElement("span");
        label.innerText = "Phiên bản:";
        item.append(label);
        var value = document.createElement("span");
        value.innerText = this.global.version;
        item.append(value);
        //
        var item = document.createElement("div");
        item.className = "item";
        list.append(item);
        var label = document.createElement("span");
        label.innerText = "Ngày xuất bản:";
        item.append(label);
        var value = document.createElement("span");
        value.innerText = this.global.publishDate;
        item.append(value);
        //
        var item = document.createElement("div");
        item.className = "item";
        list.append(item);
        var label = document.createElement("span");
        label.innerText = "Nhà phát triển:";
        item.append(label);
        var value = document.createElement("span");
        value.innerText = this.global.developer;
        item.append(value);
        //
        var item = document.createElement("div");
        item.className = "item";
        list.append(item);
        var label = document.createElement("span");
        label.innerText = "Số điện thoại:";
        item.append(label);
        var value = document.createElement("span");
        value.innerText = this.global.contact.phone;
        item.append(value);
        //
        var item = document.createElement("div");
        item.className = "item";
        list.append(item);
        var label = document.createElement("span");
        label.innerText = "Email:";
        item.append(label);
        var value = document.createElement("span");
        value.innerText = this.global.contact.email;
        item.append(value);
        //
        if (this.global.version != this.global.latestVersion) {
            var download = document.createElement("div");
            download.className = "download";
            wrapper.append(download);
            var label = document.createElement("label");
            download.append(label);
            label.innerHTML = "Đã có phiên bản cập nhật mới.";
            var button = document.createElement("button");
            download.append(button);
            button.innerText = "TẢI XUỐNG";
            button.addEventListener("click", e => this.logout(e, this));
        }
        //
        var routeWrapper = document.createElement("div");
        routeWrapper.className = "link-group";
        wrapper.append(routeWrapper);
        var route = document.createElement("label");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Trở về";
        route.addEventListener("click", e => {
            this.aboutContainer.style.display = "none";
            this.infoContainer.style.display = "block";
        });
        var route = document.createElement("label");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Trang chủ";
        route.addEventListener("click", () =>
            window.open("https://www.w3schools.com")
        );
    };
    removeLoggedinElement = () => {
        this.infoContainer.remove();
        this.optionContainer.remove();
        this.aboutContainer.remove();
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
                deviceId: self.global.deviceId,
                chanel: self.global.appName
            };
            const url = this.global.domain + this.global.endpoint.register;
            fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.ok) return response.json();
                    throw new Error(response.statusText);
                })
                .then(async json => {
                    // console.log("register: ", json);
                    self.registerSubmit.innerText = "ĐĂNG KÝ";
                    self.registerSubmit.disabled = false;
                    if (json.isOk) {
                        self.setToken(json.token);
                        self.global.accessToken = json.token.access_token;
                        self.global.user = json.user;
                        await self.callback.loggedin();
                        self.global.alert.show("success", "Đăng ký thành công");
                        self.registerName.value = "";
                        self.registerEmail.value = "";
                        self.registerPhone.value = "";
                        self.registerPassword.value = "";
                        self.registerConfirmPassword.value = "";
                    } else {
                        if (json.message == "emailExist")
                            self.registerMessage.innerText =
                                "Emai này đã đăng ký";
                        else if (json.message == "phoneExist")
                            self.registerMessage.innerText =
                                "Số điện thoại này đã đăng ký";
                    }
                })
                .catch(error => {
                    console.log(error);
                    self.global.alert.show("error", "Đăng ký lỗi");
                    self.registerSubmit.innerText = "ĐĂNG KÝ";
                    self.registerSubmit.disabled = false;
                });
        }
    };
    login = (e, self) => {
        e.preventDefault();
        self.loginSubmit.innerText = "Đang đăng nhập...";
        self.loginSubmit.disabled = true;
        self.loginMessage.innerText = "";
        const data = {
            username: self.loginUsername.value,
            password: self.loginPassword.value,
            rememberMe: self.loginRememberMe.value,
            deviceId: self.global.deviceId,
            chanel: self.global.appName
        };
        const url = this.global.domain + this.global.endpoint.login;
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) return response.json();
                throw new Error(response.statusText);
            })
            .then(async json => {
                // console.log("login: ", json);
                self.loginSubmit.innerText = "ĐĂNG NHẬP";
                self.loginSubmit.disabled = false;
                if (json.isOk) {
                    self.setToken(json.token);
                    self.global.accessToken = json.token.access_token;
                    self.global.user = json.user;
                    self.loginUsername.value = "";
                    self.loginPassword.value = "";
                    await self.callback.loggedin();
                } else {
                    if (json.message == "unauthorized")
                        self.loginMessage.innerText = "Sai thông tin đăng nhập";
                    else if (json.message == "unsetup")
                        self.loginMessage.innerText = "Lỗi khởi tạo tài khoản";
                    else if (json.message == "expired")
                        self.loginMessage.innerText = "Quá hạn sử dụng dịch vụ";
                    else if (json.message == "deviceLimit")
                        self.loginMessage.innerText = "Quá giới hạn thiết bị";
                }
            })
            .catch(error => {
                self.global.alert.show("error", "Đăng nhập lỗi");
                self.loginSubmit.innerText = "ĐĂNG NHẬP";
                self.loginSubmit.disabled = false;
            });
    };
    logout = self => {
        const url = this.global.domain + this.global.endpoint.logout;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${self.global.accessToken}`
            }
        }).then(() => {
            self.removeToken();
            self.infoContainer.style.display = "none";
            self.loginContainer.style.display = "block";
            self.callback.loggedout();
            self.loginUsername.focus();
        });
    };
    getUser = () => {
        return new Promise(resolve => {
            this.global.accessToken = this.getToken();
            if (!this.global.accessToken) resolve();
            else {
                const url = this.global.domain + this.global.endpoint.user;
                fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.global.accessToken}`
                    }
                })
                    .then(response => {
                        if (response.ok) return response.json();
                        throw new Error(response.statusText);
                    })
                    .then(json => {
                        console.log("getUser: ", json);
                        this.global.user = json;
                        this.global.isLoggedin = !!json.code;
                        resolve();
                    })
                    .catch(error => resolve());
            }
        });
    };
    getLocalConfig = () => {
        return new Promise((resolve, reject) => {
            const file = chrome.runtime.getURL("config.json");
            fetch(file)
                .then(response => response.json())
                .then(json => {
                    // console.log("localConfig", json);
                    for (const key in json) this.global[key] = json[key];

                    resolve();
                })
                .catch(() => {
                    console.log(err);
                    var choice = confirm(
                        "Get local config error. Refresh now?"
                    );
                    if (choice) location.reload();
                });
        });
    };
    getServerConfig = () => {
        return new Promise((resolve, reject) => {
            const url = this.global.domain + this.global.endpoint.getConfig;
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.global.accessToken}`
                },
                body: JSON.stringify({ securities: this.global.securities })
            })
                .then(response => response.json())
                .then(json => {
                    console.log("serverConfig", json);
                    for (const key in json) {
                        if (key == "endpoint")
                            this.global.endpoint.socket = json.endpoint.socket;
                        else this.global[key] = json[key];
                    }
                    //
                    resolve();
                })
                .catch(err => {
                    console.log(err);
                    var choice = confirm(
                        "Get server config error. Refresh now?"
                    );
                    if (choice) location.reload();
                });
        });
    };
    setServerConfig = (e, self) => {
        e.preventDefault();
        return new Promise(resolve => {
            self.optionSubmit.innerText = "Đang lưu cài đặt...";
            self.optionSubmit.disabled = true;
            const data = {
                timeFrame: +self.timeFrameSelect.value,
                chartType: self.chartTypeSelect.value,
                contractNumber: +self.contractNumberInput.value,
                takeProfit: +self.takeProfitInput.value,
                stopLoss: +self.stopLossInput.value,
                isVolume: self.isVolumeCheckbox.checked,
                isViewChart: self.isViewChartCheckbox.checked
            };
            console.log("data:", data);
            const url = this.global.domain + this.global.endpoint.setConfig;
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${self.global.accessToken}`
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.ok) return response.json();
                    throw new Error(response.statusText);
                })
                .then(async json => {
                    console.log("setConfig: ", json);
                    resolve(json.isOk);
                })
                .catch(error => resolve(false));
        });
    };
    setToken = token =>
        localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
    removeToken = () => localStorage.removeItem(this.TOKEN_KEY);
    getToken = () => {
        const token = JSON.parse(localStorage.getItem(this.TOKEN_KEY));
        if (!!token && moment().isBefore(token.expires_at))
            return token.access_token;
        else return false;
    };
    getDeviceId = () => {
        return new Promise(resolve => {
            FingerprintJS.load()
                .then(fp => fp.get())
                .then(result => {
                    this.global.deviceId = result.visitorId;
                    resolve();
                });
        });
    };
    toggle = () => {
        if (this.containerElement.classList.contains("show"))
            this.containerElement.classList.remove("show");
        else this.containerElement.classList.add("show");
    };
}
