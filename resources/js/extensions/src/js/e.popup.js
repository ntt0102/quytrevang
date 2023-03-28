class Popup {
    // Các thuộc tính
    TK = "__so";

    // Hàm khởi tạo
    constructor(global, callback) {
        this.global = global;
        this.callback = callback;
        this.createContainerElement();
    }

    // Các phương thức
    createContainerElement = () => {
        var container = document.createElement("div");
        container.id = "optionViewContainer";
        document.body.append(container);
        this.containerElement = container;
    };
    createNoLoginElement = () => {
        this.createHeaderContainer();
        this.createLoginContainer();
        this.createRegisterContainer();
    };
    createHeaderContainer = () => {
        var div = document.createElement("div");
        div.id = "hearderContainer";
        this.containerElement.append(div);
        //
        var p = document.createElement("span");
        div.append(p);
        p.className = "title";
        p.innerText = this.global.appName;
        //
        var logout = document.createElement("span");
        div.append(logout);
        logout.className = "logout fa fa-sign-out";
        logout.title = "Đăng xuất";
        logout.style.display = "none";
        logout.addEventListener("click", () => this.logout(this));
        this.logoutButton = logout;
    };
    createLoginContainer = () => {
        var div = document.createElement("div");
        div.id = "loginContainer";
        div.className = "section";
        this.containerElement.append(div);
        this.loginContainer = div;
        //
        var wrapper = document.createElement("form");
        div.append(wrapper);
        wrapper.className = "wrapper";
        wrapper.addEventListener("submit", e => this.login(e, this));
        //
        var p = document.createElement("span");
        wrapper.append(p);
        p.className = "invalid";
        this.loginMessage = p;
        //
        var input = document.createElement("input");
        wrapper.append(input);
        input.id = "LoginUserName";
        input.type = "text";
        input.placeholder = "Email hoặc Số điện thoại";
        input.required = true;
        this.loginUsername = input;
        if (!this.global.isLoggedin) this.loginUsername.focus();
        //
        input = document.createElement("input");
        wrapper.append(input);
        input.id = "LoginPassword";
        input.type = "password";
        input.placeholder = "Mật khẩu";
        input.required = true;
        this.loginPassword = input;
        //
        var checkboxWrapper = document.createElement("div");
        checkboxWrapper.style.display = "flex";
        wrapper.append(checkboxWrapper);
        input = document.createElement("input");
        checkboxWrapper.append(input);
        input.type = "checkbox";
        input.style.width = "17px";
        this.loginRememberMe = input;
        var span = document.createElement("span");
        checkboxWrapper.append(span);
        span.innerHTML = "&ensp;Lưu đăng nhập";
        //
        var button = document.createElement("button");
        wrapper.append(button);
        button.innerText = "ĐĂNG NHẬP";
        button.type = "submit";
        this.loginSubmit = button;
        //
        var routeWrapper = document.createElement("div");
        routeWrapper.className = "link-group";
        wrapper.append(routeWrapper);
        var route = document.createElement("span");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Gia hạn";
        route.addEventListener("click", () => {
            this.setActivedSection(this.renewalContainer);
        });
        var route = document.createElement("span");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Đăng ký";
        route.addEventListener("click", () => {
            this.setActivedSection(this.registerContainer);
            this.registerName.focus();
        });
        //
        var routeWrapper = document.createElement("div");
        routeWrapper.className = "link-group";
        wrapper.append(routeWrapper);
        var route = document.createElement("span");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Phần mềm";
        route.addEventListener("click", () => {
            this.setActivedSection(this.aboutContainer);
        });
        var route = document.createElement("span");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Trang chủ";
        route.addEventListener("click", () =>
            window.open("https://smartorder.nguyenvanxuanphu.com")
        );
    };
    createRegisterContainer = () => {
        var div = document.createElement("div");
        div.id = "registerContainer";
        div.className = "section";
        this.containerElement.append(div);
        this.registerContainer = div;
        //
        var wrapper = document.createElement("form");
        div.append(wrapper);
        wrapper.className = "wrapper";
        wrapper.addEventListener("submit", e => this.registerAccount(e, this));
        //
        var span = document.createElement("span");
        span.innerText = "Được 7 ngày dùng thử với 2 thiết bị.";
        wrapper.append(span);
        //
        var span = document.createElement("span");
        wrapper.append(span);
        span.className = "invalid";
        this.registerMessage = span;
        //
        var input = document.createElement("input");
        wrapper.append(input);
        input.type = "text";
        input.placeholder = "Tên";
        input.required = true;
        this.registerName = input;
        //
        input = document.createElement("input");
        wrapper.append(input);
        input.type = "email";
        input.placeholder = "Email";
        input.required = true;
        this.registerEmail = input;
        //
        input = document.createElement("input");
        wrapper.append(input);
        input.type = "text";
        input.placeholder = "Số điện thoại";
        input.required = true;
        input.setAttribute("maxlength", 10);
        input.setAttribute("pattern", "[0-9]+");
        this.registerPhone = input;
        //
        input = document.createElement("input");
        wrapper.append(input);
        input.type = "password";
        input.placeholder = "Mật khẩu";
        input.required = true;
        this.registerPassword = input;
        //
        input = document.createElement("input");
        wrapper.append(input);
        input.type = "password";
        input.placeholder = "Xác nhận mật khẩu";
        input.required = true;
        this.registerConfirmPassword = input;
        //
        var button = document.createElement("button");
        wrapper.append(button);
        button.innerText = "ĐĂNG KÝ";
        button.type = "submit";
        this.registerSubmit = button;
        //
        var routeWrapper = document.createElement("div");
        routeWrapper.className = "link-group";
        wrapper.append(routeWrapper);
        var route = document.createElement("span");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Đăng nhập";
        route.addEventListener("click", () => {
            this.setActivedSection(this.loginContainer);
            this.loginUsername.focus();
        });
        var route = document.createElement("span");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Trang chủ";
        route.addEventListener("click", () =>
            window.open("https://smartorder.nguyenvanxuanphu.com")
        );
    };
    createLoggedinElement = () => {
        this.createOptionContainer();
        this.createInfoContainer();
        this.createAboutContainer();
        this.createRenewalContainer();
        //
        this.setActivedSection(this.optionContainer);
        this.toggleLogoutButton(true);
    };
    createOptionContainer = () => {
        var div = document.createElement("div");
        div.id = "optionContainer";
        div.className = "section";
        this.containerElement.append(div);
        this.optionContainer = div;
        //
        var wrapper = document.createElement("form");
        div.append(wrapper);
        wrapper.className = "wrapper";
        wrapper.addEventListener("submit", e => this.setServerConfig(e, this));
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
        select.style.width = "69px";
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
        label.innerText = "Tự động đặt TP/SL:";
        item.append(label);
        input = document.createElement("input");
        input.type = "checkbox";
        input.style.width = "17px";
        input.checked = !!this.global.isTpSl;
        this.isTpSlCheckbox = input;
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
        button.innerText = "LƯU CÀI ĐẶT";
        button.type = "submit";
        this.optionSubmit = button;
        //
        var routeWrapper = document.createElement("div");
        routeWrapper.className = "link-group";
        wrapper.append(routeWrapper);
        var route = document.createElement("span");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Dịch vụ";
        route.addEventListener("click", () =>
            this.setActivedSection(this.infoContainer)
        );
        var route = document.createElement("span");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Phần mềm";
        route.addEventListener("click", () =>
            this.setActivedSection(this.aboutContainer)
        );
    };
    createInfoContainer = () => {
        var div = document.createElement("div");
        div.id = "infoContainer";
        div.className = "section";
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
        var title = document.createElement("span");
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
        var title = document.createElement("span");
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
        var routeWrapper = document.createElement("div");
        routeWrapper.className = "link-group";
        wrapper.append(routeWrapper);
        var route = document.createElement("span");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Trở về";
        route.addEventListener("click", () =>
            this.setActivedSection(this.optionContainer)
        );
        var route = document.createElement("span");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Gia hạn";
        route.addEventListener("click", () => {
            this.setActivedSection(this.renewalContainer);
        });
    };
    createAboutContainer = () => {
        var div = document.createElement("div");
        div.id = "aboutContainer";
        div.className = "section";
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
            var download = document.createElement("form");
            download.setAttribute("method", "get");
            download.setAttribute(
                "action",
                "https://quytrevang.nguyenvanxuanphu.com/storage/files/smartorder.zip"
            );
            download.className = "download";
            wrapper.append(download);
            var label = document.createElement("span");
            download.append(label);
            label.innerHTML = "Đã có phiên bản cập nhật mới.";
            var button = document.createElement("button");
            download.append(button);
            button.type = "submit";
            button.innerText = "TẢI XUỐNG";
        }
        //
        var routeWrapper = document.createElement("div");
        routeWrapper.className = "link-group";
        wrapper.append(routeWrapper);
        var route = document.createElement("span");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Trở về";
        route.addEventListener("click", () =>
            this.setActivedSection(this.prevSection)
        );
        var route = document.createElement("span");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Trang chủ";
        route.addEventListener("click", () =>
            window.open("https://smartorder.nguyenvanxuanphu.com")
        );
    };
    createRenewalContainer = () => {
        var container = document.createElement("div");
        container.id = "renewalContainer";
        container.className = "section";
        this.containerElement.append(container);
        this.renewalContainer = container;
        //
        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        container.append(wrapper);
        //
        var list = document.createElement("div");
        list.className = "list";
        wrapper.append(list);
        //
        var item = document.createElement("div");
        item.className = "item";
        list.append(item);
        var label = document.createElement("div");
        label.innerText = "1. Chọn lần mua:";
        label.className = "title";
        item.append(label);
        var select = document.createElement("select");
        select.style.width = "80px";
        [
            { t: "Mua mới", v: 1 },
            { t: "Gia hạn", v: 2 }
        ].forEach(item => {
            var option = document.createElement("option");
            option.value = item.v;
            option.text = item.t;
            select.appendChild(option);
        });
        this.buyType = 2;
        select.value = this.buyType;
        select.addEventListener("change", e => {
            this.buyType = e.target.value;
            if (!!this.plan) {
                const temp = this.updatePlanInfo(this.buyType, this.plan);
                this.planPrice = temp.planPrice;
                this.planSaveMoney = temp.planSaveMoney;
                if (this.deviceNumber > 0) {
                    this.updatePaymentInfo(
                        this.deviceNumber,
                        this.planPrice,
                        this.planSaveMoney
                    );
                }
            }
        });
        item.append(select);
        //
        var item = document.createElement("div");
        item.className = "item";
        list.append(item);
        var label = document.createElement("div");
        label.innerText = "2. Chọn thời gian:";
        label.className = "title";
        item.append(label);
        var select = document.createElement("select");
        select.style.width = "80px";
        var option = document.createElement("option");
        option.value = 0;
        option.text = "";
        select.appendChild(option);
        this.global.plans.forEach((item, index) => {
            var option = document.createElement("option");
            option.value = item.months;
            option.text = item.name;
            select.appendChild(option);
        });
        select.addEventListener("change", e => {
            const value = e.target.value;
            if (value > 0) {
                this.plan = this.global.plans.filter(p => p.months == value)[0];
                const temp = this.updatePlanInfo(this.buyType, this.plan);
                this.planPrice = temp.planPrice;
                this.planSaveMoney = temp.planSaveMoney;
                this.priceInfo.style.display = "flex";
                //
                if (this.deviceNumber > 0) {
                    this.updatePaymentInfo(
                        this.deviceNumber,
                        this.planPrice,
                        this.planSaveMoney
                    );
                }
            } else {
                this.updatePaymentInfo();
                this.priceInfo.style.display = "none";
            }
        });
        item.append(select);
        //
        var item = document.createElement("div");
        item.className = "item";
        item.style.display = "none";
        list.append(item);
        this.priceInfo = item;
        var label = document.createElement("div");
        item.append(label);
        this.priceLabel = label;
        var label = document.createElement("div");
        item.append(label);
        this.saveMoneyLabel = label;
        //
        var item = document.createElement("div");
        item.className = "item";
        list.append(item);
        var label = document.createElement("div");
        label.innerText = "3. Chọn số thiết bị:";
        label.className = "title";
        item.append(label);
        var input = document.createElement("input");
        input.type = "number";
        input.style.width = "80px";
        input.style.height = "21px";
        input.addEventListener("change", e => {
            this.deviceNumber = Math.floor(e.target.value);
            this.updatePaymentInfo(
                this.deviceNumber,
                this.planPrice,
                this.planSaveMoney
            );
        });
        item.append(input);
        //
        var label = document.createElement("div");
        label.innerText = "4. Thanh toán:";
        label.className = "title";
        list.append(label);
        //
        var item = document.createElement("div");
        item.className = "item";
        list.append(item);
        var bank = document.createElement("div");
        item.append(bank);
        var info = document.createElement("div");
        info.innerText = `${this.global.bankAccount.bank_name}: ${this.global.bankAccount.account_number}`;
        bank.append(info);
        var info = document.createElement("div");
        info.innerText = `Tên: ${this.global.bankAccount.account_name.toLowerCase()}`;
        bank.append(info);
        var info = document.createElement("div");
        info.innerText = `NDCK: so ${
            this.global.isLoggedin ? this.global.user.phone : "<SĐT>"
        }`;
        bank.append(info);
        var info = document.createElement("div");
        bank.append(info);
        this.totalPriceInfo = info;
        var info = document.createElement("div");
        bank.append(info);
        this.totalSaveMoneyInfo = info;

        var qrCode = document.createElement("img");
        qrCode.style.width = "90px";
        qrCode.style.height = "90px";
        qrCode.style.visibility = "hidden";
        item.append(qrCode);
        this.qrCodeImg = qrCode;

        //
        var routeWrapper = document.createElement("div");
        routeWrapper.className = "link-group";
        wrapper.append(routeWrapper);
        var route = document.createElement("span");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Trở về";
        route.addEventListener("click", () =>
            this.setActivedSection(this.prevSection)
        );
    };
    removeLoggedinElement = () => {
        if (!!this.infoContainer) this.infoContainer.remove();
        if (!!this.optionContainer) this.optionContainer.remove();
        if (!!this.aboutContainer) this.aboutContainer.remove();
        //
        this.logoutButton.style.display = "none";
        this.setActivedSection(this.loginContainer);
        this.loginUsername.focus();
    };
    registerAccount = (e, self) => {
        e.preventDefault();
        if (self.registerConfirmPassword.value != self.registerPassword.value) {
            self.registerMessage.innerText = "Mật khẩu không khớp";
            return false;
        } else {
            self.registerSubmit.innerText = "Đang đăng ký...";
            self.registerSubmit.disabled = true;
            self.registerMessage.innerText = "";
            const data = self.global.crypto.encrypt({
                name: self.registerName.value,
                email: self.registerEmail.value,
                phone: self.registerPhone.value,
                password: self.registerPassword.value,
                deviceId: self.global.deviceId,
                chanel: self.global.appName
            });
            const url = self.global.domain + self.global.endpoint.register;
            fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: data
            })
                .then(response => {
                    if (response.ok) return response.json();
                    throw new Error(response.statusText);
                })
                .then(async json => {
                    json = self.global.crypto.decrypt(json);
                    // console.log("register: ", json);
                    self.registerSubmit.innerText = "ĐĂNG KÝ";
                    self.registerSubmit.disabled = false;
                    if (json.isOk) {
                        this.global.isLoggedin = true;
                        self.setToken(json.token);
                        self.global.accessToken = json.token.access_token;
                        self.global.user = json.user;
                        await self.callback.loginCallback();
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
                        else if (json.message == "deviceExist")
                            self.registerMessage.innerText =
                                "Tài khoản khác đã dùng thiết bị này";
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
        const data = self.global.crypto.encrypt({
            username: self.loginUsername.value,
            password: self.loginPassword.value,
            rememberMe: self.loginRememberMe.checked,
            deviceId: self.global.deviceId,
            chanel: self.global.appName
        });
        const url = self.global.domain + self.global.endpoint.login;
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: data
        })
            .then(response => {
                if (response.ok) return response.json();
                throw new Error(response.statusText);
            })
            .then(async json => {
                json = self.global.crypto.decrypt(json);
                // console.log("login: ", json);
                if (json.isOk) {
                    this.global.isLoggedin = true;
                    self.setToken(json.token);
                    self.global.accessToken = json.token.access_token;
                    self.global.user = json.user;
                    await self.callback.loginCallback();
                    self.loginUsername.value = "";
                    self.loginPassword.value = "";
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
                self.loginSubmit.innerText = "ĐĂNG NHẬP";
                self.loginSubmit.disabled = false;
            })
            .catch(error => {
                self.global.alert.show("error", "Đăng nhập lỗi");
                self.loginSubmit.innerText = "ĐĂNG NHẬP";
                self.loginSubmit.disabled = false;
            });
    };
    logout = self => {
        const url = self.global.domain + self.global.endpoint.logout;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${self.global.accessToken}`
            }
        }).then(() => {
            this.global.isLoggedin = false;
            self.removeToken();
            self.callback.logoutCallback();
        });
    };
    getUser = () => {
        return new Promise(resolve => {
            this.global.accessToken = this.getToken();
            if (!this.global.accessToken) resolve();
            else {
                const data = this.global.crypto.encrypt({
                    deviceId: this.global.deviceId
                });
                const url = this.global.domain + this.global.endpoint.user;
                fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.global.accessToken}`
                    },
                    body: data
                })
                    .then(response => {
                        if (response.ok) return response.json();
                        throw new Error(response.statusText);
                    })
                    .then(json => {
                        json = this.global.crypto.decrypt(json);
                        // console.log("gU: ", json);
                        this.global.isLoggedin = json.isOk;
                        if (json.isOk) this.global.user = json.user;
                        else this.alertInvalidAccess(true);
                        resolve();
                    })
                    .catch(error => resolve());
            }
        });
    };
    getServerConfig = () => {
        return new Promise((resolve, reject) => {
            const data = this.global.crypto.encrypt({
                deviceId: this.global.deviceId
            });
            const url = this.global.domain + this.global.endpoint.getConfig;
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.global.accessToken}`
                },
                body: data
            })
                .then(response => response.json())
                .then(json => {
                    json = this.global.crypto.decrypt(json);
                    console.log("serverConfig", json);
                    if (json.isOk)
                        for (const key in json.config)
                            this.global[key] = json.config[key];
                    else this.alertInvalidAccess();
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
            const data = self.global.crypto.encrypt({
                timeFrame: +self.timeFrameSelect.value,
                chartType: self.chartTypeSelect.value,
                contractNumber: +self.contractNumberInput.value,
                takeProfit: +self.takeProfitInput.value,
                stopLoss: +self.stopLossInput.value,
                isTpSl: self.isTpSlCheckbox.checked,
                isVolume: self.isVolumeCheckbox.checked,
                isViewChart: self.isViewChartCheckbox.checked,
                deviceId: self.global.deviceId
            });
            const url = self.global.domain + self.global.endpoint.setConfig;
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
                .then(async json => {
                    json = self.global.crypto.decrypt(json);
                    // console.log("setConfig: ", json);
                    self.optionSubmit.innerText = "LƯU CÀI ĐẶT";
                    self.optionSubmit.disabled = false;
                    if (json.isOk) {
                        self.global.alert.show(
                            "success",
                            "Lưu cài đặt thành công"
                        );
                        self.global.isTpSl = self.isTpSlCheckbox.checked;
                        self.callback.toggleChartVolumeCallback(
                            self.isVolumeCheckbox.checked
                        );
                    } else {
                        if (json.message == "unauthorized")
                            self.alertInvalidAccess();
                        else
                            self.global.alert.show(
                                "error",
                                "Lưu cài đặt thất bại"
                            );
                    }
                    resolve();
                });
        });
    };
    getServerBackground = () => {
        return new Promise((resolve, reject) => {
            const data = this.global.crypto.encrypt({
                deviceId: this.global.deviceId
            });
            const url = this.global.domain + this.global.endpoint.getBackground;
            fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: data
            })
                .then(response => response.json())
                .then(json => {
                    json = this.global.crypto.decrypt(json);
                    console.log("serverBackground", json);
                    if (json.isOk)
                        for (const key in json.config)
                            this.global[key] = json.config[key];
                    else this.alertInvalidAccess();
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
    setToken = token => {
        localStorage.setItem(this.TK, JSON.stringify(token));
    };
    removeToken = () => {
        localStorage.removeItem(this.TK);
    };
    getToken = () => {
        const token = JSON.parse(localStorage.getItem(this.TK));
        if (!token) return false;
        if (moment().isBefore(token.expires_at)) return token.access_token;
        this.global.alert.show("waring", "Phiên đăng nhập hết hạn");
        return false;
    };
    toggle = (visible = true) => {
        if (!visible || this.containerElement.classList.contains("show"))
            this.containerElement.classList.remove("show");
        else {
            this.setActivedSection(
                this.global.isLoggedin
                    ? this.optionContainer
                    : this.loginContainer
            );
            this.containerElement.classList.add("show");
        }
    };
    toggleLogoutButton = visible => {
        this.logoutButton.style.display = visible ? "block" : "none";
    };
    setActivedSection = el => {
        var activeEl = document.querySelector(
            "#optionViewContainer .section.active"
        );
        if (activeEl) {
            this.prevSection = activeEl;
            activeEl.classList.remove("active");
        }
        this.currSection = el;
        el.classList.add("active");
    };
    alertInvalidAccess = (h = false) => {
        this.logout(this);
        const msg = "Tài khoản đăng nhập sai cách";
        if (h)
            this.global.alert
                .hide()
                .then(() => this.global.alert.show("error", msg, true, true));
        else this.global.alert.show("error", msg);
    };
    currencyFormat = input => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND"
        }).format(input);
    };
    updatePlanInfo = (buyType, plan) => {
        const isRenewal = buyType == "2";
        const pricePerDevice = isRenewal ? plan.renewal_price : plan.price;
        this.priceLabel.innerText = `${this.currencyFormat(
            pricePerDevice
        )}/tháng`;
        const planPrice = plan.months * pricePerDevice;
        const planSaveMoney =
            plan.months * (plan.highest_price - pricePerDevice);
        this.saveMoneyLabel.innerText = `Tiết kiệm: ${this.currencyFormat(
            planSaveMoney
        )}`;
        return {
            planPrice,
            planSaveMoney
        };
    };
    updatePaymentInfo = (
        deviceNumber = 0,
        planPrice = 0,
        planSaveMoney = 0
    ) => {
        if (deviceNumber > 0) {
            const price = deviceNumber * planPrice;
            this.totalPriceInfo.innerText = `Tổng giá: ${this.currencyFormat(
                price
            )}`;
            this.totalSaveMoneyInfo.innerText = `Tiết kiệm: ${this.currencyFormat(
                deviceNumber * planSaveMoney
            )}`;
            this.qrCodeImg.src = `https://img.vietqr.io/image/${
                this.global.bankAccount.bank_name
            }-${
                this.global.bankAccount.account_number
            }-fcaSnpq.jpg?accountName=${
                this.global.bankAccount.account_name
            }&amount=${price}&addInfo=so ${
                this.global.isLoggedin ? this.global.user.phone : ""
            }`;
            this.qrCodeImg.style.visibility = "visible";
        } else {
            this.totalPriceInfo.innerText = "";
            this.totalSaveMoneyInfo.innerText = "";
            this.qrCodeImg.style.visibility = "hidden";
        }
    };
}
