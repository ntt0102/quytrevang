class Po {
    // Các thuộc tính
    TOKEN_KEY = "SOAT";

    // Hàm khởi tạo
    constructor(g, c) {
        this.g = g;
        this.cb = c;
        this.cCoEl();
        this.gDeId();
    }

    // Các phương thức
    cCoEl = () => {
        var container = document.createElement("div");
        container.id = "optionViewContainer";
        document.body.append(container);
        this.containerElement = container;
    };
    cNoLoEl = () => {
        this.cHeCo();
        this.cLoCo();
        this.cReCo();
    };
    cHeCo = () => {
        var div = document.createElement("div");
        div.id = "hearderContainer";
        this.containerElement.append(div);
        this.hearderContainer = div;
        //
        var p = document.createElement("label");
        div.append(p);
        p.className = "title";
        p.innerText = this.g.appName;
    };
    cLoCo = () => {
        var div = document.createElement("div");
        div.id = "loginContainer";
        div.className = "section";
        div.style.display = this.g.isLi ? "none" : "block";
        this.containerElement.append(div);
        this.loginContainer = div;
        //
        var wrapper = document.createElement("form");
        div.append(wrapper);
        wrapper.id = "loginForm";
        wrapper.className = "wrapper";
        wrapper.addEventListener("submit", e => this.lIn(e, this));
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
        if (!this.g.isLi) this.loginUsername.focus();
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
    cReCo = () => {
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
        wrapper.addEventListener("submit", e => this.rAc(e, this));
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
    cLoEl = () => {
        this.cInCo();
        this.cOpCo();
        this.cAbCo();
        //
        this.loginContainer.style.display = "none";
        this.registerContainer.style.display = "none";
        this.infoContainer.style.display = "block";
    };
    cInCo = () => {
        var div = document.createElement("div");
        div.id = "infoContainer";
        div.className = "section";
        div.style.display = this.g.isLi ? "block" : "none";
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
        value.innerText = this.g.user.name;
        item.append(value);
        //
        var item = document.createElement("div");
        item.className = "item";
        list.append(item);
        var label = document.createElement("span");
        label.innerText = "Email:";
        item.append(label);
        var value = document.createElement("span");
        value.innerText = this.g.user.email;
        item.append(value);
        //
        var item = document.createElement("div");
        item.className = "item";
        list.append(item);
        var label = document.createElement("span");
        label.innerText = "Điện thoại:";
        item.append(label);
        var value = document.createElement("span");
        value.innerText = this.g.user.phone;
        item.append(value);
        //
        var item = document.createElement("div");
        item.className = "item";
        list.append(item);
        var label = document.createElement("span");
        label.innerText = "Ngày đăng ký:";
        item.append(label);
        var value = document.createElement("span");
        value.innerText = moment(this.g.registerDate).format("DD/MM/YYYY");
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
        value.innerText = moment(this.g.startDate).format("DD/MM/YYYY");
        item.append(value);
        //
        var item = document.createElement("div");
        item.className = "item";
        list.append(item);
        var label = document.createElement("span");
        label.innerText = "Ngày hết hạn:";
        item.append(label);
        var value = document.createElement("span");
        value.innerText = moment(this.g.expiresDate).format("DD/MM/YYYY");
        item.append(value);
        //
        var item = document.createElement("div");
        item.className = "item";
        list.append(item);
        var label = document.createElement("span");
        label.innerText = "Số lượng thiết bị:";
        item.append(label);
        var value = document.createElement("span");
        value.innerText = this.g.deviceLimit;
        item.append(value);
        //
        var button = document.createElement("button");
        wrapper.append(button);
        button.innerText = "ĐĂNG XUẤT";
        button.addEventListener("click", () => this.lOu(this));
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
    cOpCo = () => {
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
            this.sSeCo(e, this).then(isOk => {
                this.optionSubmit.innerText = "LƯU CÀI ĐẶT";
                this.optionSubmit.disabled = false;
                if (isOk) this.g.a.s("success", "Lưu cài đặt thành công");
                else this.g.a.s("error", "Lưu cài đặt thất bại");
                //
                this.cb.tVo(this.isVolumeCheckbox.checked);
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
        this.g.timeFrames.forEach((item, index) => {
            var option = document.createElement("option");
            option.value = item.value;
            option.text = item.text;
            select.appendChild(option);
        });
        select.value = this.g.timeFrame;
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
        this.g.chartTypes.forEach((item, index) => {
            var option = document.createElement("option");
            option.value = item.value;
            option.text = item.text;
            select.appendChild(option);
        });
        select.value = this.g.chartType;
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
        input.value = this.g.contractNumber;
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
        input.value = this.g.takeProfit;
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
        input.value = this.g.stopLoss;
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
        input.checked = !!this.g.isVolume;
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
        input.checked = !!this.g.isViewChart;
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
    cAbCo = () => {
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
        value.innerText = this.g.version;
        item.append(value);
        //
        var item = document.createElement("div");
        item.className = "item";
        list.append(item);
        var label = document.createElement("span");
        label.innerText = "Ngày xuất bản:";
        item.append(label);
        var value = document.createElement("span");
        value.innerText = this.g.publishDate;
        item.append(value);
        //
        var item = document.createElement("div");
        item.className = "item";
        list.append(item);
        var label = document.createElement("span");
        label.innerText = "Nhà phát triển:";
        item.append(label);
        var value = document.createElement("span");
        value.innerText = this.g.developer;
        item.append(value);
        //
        var item = document.createElement("div");
        item.className = "item";
        list.append(item);
        var label = document.createElement("span");
        label.innerText = "Số điện thoại:";
        item.append(label);
        var value = document.createElement("span");
        value.innerText = this.g.contact.phone;
        item.append(value);
        //
        var item = document.createElement("div");
        item.className = "item";
        list.append(item);
        var label = document.createElement("span");
        label.innerText = "Email:";
        item.append(label);
        var value = document.createElement("span");
        value.innerText = this.g.contact.email;
        item.append(value);
        //
        if (this.g.version != this.g.latestVersion) {
            var download = document.createElement("div");
            download.className = "download";
            wrapper.append(download);
            var label = document.createElement("label");
            download.append(label);
            label.innerHTML = "Đã có phiên bản cập nhật mới.";
            var button = document.createElement("button");
            download.append(button);
            button.innerText = "TẢI XUỐNG";
            button.addEventListener("click", e => this.lOu(e, this));
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
    rLoEl = () => {
        this.infoContainer.remove();
        this.optionContainer.remove();
        this.aboutContainer.remove();
    };
    rAc = (e, self) => {
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
                deviceId: self.g.deviceId,
                chanel: self.g.appName
            };
            const url = this.g.domain + this.g.endpoint.register;
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
                        self.sTo(json.token);
                        self.g.accessToken = json.token.access_token;
                        self.g.user = json.user;
                        await self.cb.loggedin();
                        self.g.a.s("success", "Đăng ký thành công");
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
                    self.g.a.s("error", "Đăng ký lỗi");
                    self.registerSubmit.innerText = "ĐĂNG KÝ";
                    self.registerSubmit.disabled = false;
                });
        }
    };
    lIn = (e, self) => {
        e.preventDefault();
        self.loginSubmit.innerText = "Đang đăng nhập...";
        self.loginSubmit.disabled = true;
        self.loginMessage.innerText = "";
        const data = {
            username: self.loginUsername.value,
            password: self.loginPassword.value,
            rememberMe: self.loginRememberMe.value,
            deviceId: self.g.deviceId,
            chanel: self.g.appName
        };
        const url = this.g.domain + this.g.endpoint.login;
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
                    self.sTo(json.token);
                    self.g.accessToken = json.token.access_token;
                    self.g.user = json.user;
                    self.loginUsername.value = "";
                    self.loginPassword.value = "";
                    await self.cb.loggedin();
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
                self.g.a.s("error", "Đăng nhập lỗi");
                self.loginSubmit.innerText = "ĐĂNG NHẬP";
                self.loginSubmit.disabled = false;
            });
    };
    lOu = self => {
        const url = this.g.domain + this.g.endpoint.logout;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${self.g.accessToken}`
            }
        }).then(() => {
            self.rTo();
            self.infoContainer.style.display = "none";
            self.loginContainer.style.display = "block";
            self.cb.loggedout();
            self.loginUsername.focus();
        });
    };
    gU = () => {
        return new Promise(resolve => {
            this.g.accessToken = this.gTo();
            if (!this.g.accessToken) resolve();
            else {
                const url = this.g.domain + this.g.endpoint.user;
                fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.g.accessToken}`
                    }
                })
                    .then(response => {
                        if (response.ok) return response.json();
                        throw new Error(response.statusText);
                    })
                    .then(json => {
                        console.log("gU: ", json);
                        this.g.user = json;
                        this.g.isLi = !!json.code;
                        resolve();
                    })
                    .catch(error => resolve());
            }
        });
    };
    gSeCo = () => {
        return new Promise((resolve, reject) => {
            const url = this.g.domain + this.g.endpoint.getConfig;
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.g.accessToken}`
                },
                body: JSON.stringify({ securities: this.g.securities })
            })
                .then(response => response.json())
                .then(json => {
                    console.log("serverConfig", json);
                    for (const key in json) this.g[key] = json[key];
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
    sSeCo = (e, self) => {
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
            const url = this.g.domain + this.g.endpoint.setConfig;
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${self.g.accessToken}`
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
    sTo = token => localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
    rTo = () => localStorage.removeItem(this.TOKEN_KEY);
    gTo = () => {
        const token = JSON.parse(localStorage.getItem(this.TOKEN_KEY));
        if (!!token && moment().isBefore(token.expires_at))
            return token.access_token;
        else return false;
    };
    gDeId = () => {
        return new Promise(resolve => {
            FingerprintJS.load()
                .then(fp => fp.get())
                .then(result => {
                    this.g.deviceId = result.visitorId;
                    resolve();
                });
        });
    };
    t = () => {
        if (this.containerElement.classList.contains("show"))
            this.containerElement.classList.remove("show");
        else this.containerElement.classList.add("show");
    };
}
