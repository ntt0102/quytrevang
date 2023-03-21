class Po {
    // Các thuộc tính
    TK = "__so";

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
        this.conEl = container;
    };
    cNoLoEl = () => {
        this.cHeCo();
        this.cLoCo();
        this.cReCo();
    };
    cHeCo = () => {
        var div = document.createElement("div");
        div.id = "hearderContainer";
        this.conEl.append(div);
        this.heaCo = div;
        //
        var p = document.createElement("span");
        div.append(p);
        p.className = "title";
        p.innerText = this.g.appName;
        //
        var logout = document.createElement("span");
        div.append(logout);
        logout.className = "logout fa fa-sign-out";
        logout.title = "Đăng xuất";
        logout.style.display = "none";
        logout.addEventListener("click", () => this.lOu(this));
        this.louBu = logout;
    };
    cLoCo = () => {
        var div = document.createElement("div");
        div.className = "section";
        this.conEl.append(div);
        this.logCo = div;
        //
        var wrapper = document.createElement("form");
        div.append(wrapper);
        wrapper.className = "wrapper";
        wrapper.addEventListener("submit", e => this.lIn(e, this));
        //
        var p = document.createElement("label");
        wrapper.append(p);
        p.className = "invalid";
        this.logMe = p;
        //
        var input = document.createElement("input");
        wrapper.append(input);
        input.type = "text";
        input.placeholder = "Email hoặc Số điện thoại";
        input.required = true;
        this.logUs = input;
        if (!this.g.isLi) this.logUs.focus();
        //
        input = document.createElement("input");
        wrapper.append(input);
        input.type = "password";
        input.placeholder = "Mật khẩu";
        input.required = true;
        this.logPa = input;
        //
        var checkboxWrapper = document.createElement("div");
        checkboxWrapper.style.display = "flex";
        wrapper.append(checkboxWrapper);
        input = document.createElement("input");
        checkboxWrapper.append(input);
        input.type = "checkbox";
        input.style.width = "17px";
        this.logReMe = input;
        var span = document.createElement("span");
        checkboxWrapper.append(span);
        span.innerHTML = "&ensp;Lưu đăng nhập";
        //
        var button = document.createElement("button");
        wrapper.append(button);
        button.innerText = "ĐĂNG NHẬP";
        button.type = "submit";
        this.logSu = button;
        //
        var routeWrapper = document.createElement("div");
        routeWrapper.className = "link-group";
        wrapper.append(routeWrapper);
        var route = document.createElement("label");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Đăng ký";
        route.addEventListener("click", () => {
            this.sPa(this.regCo);
            this.regNa.focus();
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
        div.className = "section";
        this.conEl.append(div);
        this.regCo = div;
        //
        var wrapper = document.createElement("form");
        div.append(wrapper);
        wrapper.className = "wrapper";
        wrapper.addEventListener("submit", e => this.rAc(e, this));
        //
        var span = document.createElement("span");
        span.innerText = "Được 7 ngày dùng thử khi đăng ký.";
        wrapper.append(span);
        //
        var input = document.createElement("input");
        wrapper.append(input);
        input.type = "text";
        input.placeholder = "Tên";
        input.required = true;
        this.regNa = input;
        //
        input = document.createElement("input");
        wrapper.append(input);
        input.type = "email";
        input.placeholder = "Email";
        input.required = true;
        this.regEm = input;
        //
        input = document.createElement("input");
        wrapper.append(input);
        input.type = "text";
        input.placeholder = "Số điện thoại";
        input.required = true;
        input.setAttribute("maxlength", 10);
        input.setAttribute("pattern", "[0-9]+");
        this.regPh = input;
        //
        input = document.createElement("input");
        wrapper.append(input);
        input.type = "password";
        input.placeholder = "Mật khẩu";
        input.required = true;
        this.regPa = input;
        //
        input = document.createElement("input");
        wrapper.append(input);
        input.type = "password";
        input.placeholder = "Xác nhận mật khẩu";
        input.required = true;
        this.regCoPa = input;
        //
        var span = document.createElement("span");
        wrapper.append(span);
        span.className = "invalid";
        this.regMe = span;
        //
        var button = document.createElement("button");
        wrapper.append(button);
        button.innerText = "ĐĂNG KÝ";
        button.type = "submit";
        this.regSu = button;
        //
        var routeWrapper = document.createElement("div");
        routeWrapper.className = "link-group";
        wrapper.append(routeWrapper);
        var route = document.createElement("label");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Đăng nhập";
        route.addEventListener("click", () => {
            this.sPa(this.logCo);
            this.logUs.focus();
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
        this.cOpCo();
        this.cInCo();
        this.cAbCo();
        //
        this.sPa(this.optCo);
        this.tLoBu(true);
    };
    cOpCo = () => {
        var div = document.createElement("div");
        div.id = "optionContainer";
        div.className = "section";
        this.conEl.append(div);
        this.optCo = div;
        //
        var wrapper = document.createElement("form");
        div.append(wrapper);
        wrapper.className = "wrapper";
        wrapper.addEventListener("submit", e =>
            this.sSeCo(e, this).then(isOk => {
                this.optSu.innerText = "LƯU CÀI ĐẶT";
                this.optSu.disabled = false;
                if (isOk) this.g.a.s("success", "Lưu cài đặt thành công");
                else this.g.a.s("error", "Lưu cài đặt thất bại");
                //
                this.cb.tVo(this.isVolCh.checked);
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
        this.g.timFrs.forEach((item, index) => {
            var option = document.createElement("option");
            option.value = item.value;
            option.text = item.text;
            select.appendChild(option);
        });
        select.value = this.g.timeFrame;
        this.timFrSe = select;
        item.append(select);
        //
        item = document.createElement("div");
        item.className = "item";
        list.append(item);
        label = document.createElement("span");
        label.innerText = "Loại biểu đồ:";
        item.append(label);
        select = document.createElement("select");
        this.g.chaTys.forEach((item, index) => {
            var option = document.createElement("option");
            option.value = item.value;
            option.text = item.text;
            select.appendChild(option);
        });
        select.value = this.g.chartType;
        this.chaTySe = select;
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
        this.conNuIn = input;
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
        this.takPrIn = input;
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
        this.stoLoIn = input;
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
        this.isVolCh = input;
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
        this.isVieChCh = input;
        item.append(input);
        //
        var button = document.createElement("button");
        wrapper.append(button);
        button.innerText = "LƯU CÀI ĐẶT";
        button.type = "submit";
        this.optSu = button;
        //
        var routeWrapper = document.createElement("div");
        routeWrapper.className = "link-group";
        wrapper.append(routeWrapper);
        var route = document.createElement("label");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Dịch vụ";
        route.addEventListener("click", () => this.sPa(this.infCo));
        var route = document.createElement("label");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Phần mềm";
        route.addEventListener("click", () => this.sPa(this.aboCo));
    };
    cInCo = () => {
        var div = document.createElement("div");
        div.className = "section";
        this.conEl.append(div);
        this.infCo = div;
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
        var routeWrapper = document.createElement("div");
        routeWrapper.className = "link-group";
        wrapper.append(routeWrapper);
        var route = document.createElement("label");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Trở về";
        route.addEventListener("click", () => this.sPa(this.optCo));
    };
    cAbCo = () => {
        var div = document.createElement("div");
        div.className = "section";
        this.conEl.append(div);
        this.aboCo = div;
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
        route.addEventListener("click", () => this.sPa(this.optCo));
        var route = document.createElement("label");
        routeWrapper.append(route);
        route.className = "link";
        route.innerText = "Trang chủ";
        route.addEventListener("click", () =>
            window.open("https://www.w3schools.com")
        );
    };
    rLoEl = () => {
        this.infCo.remove();
        this.optCo.remove();
        this.aboCo.remove();
        //
        this.louBu.style.display = "none";
    };
    rAc = (e, self) => {
        e.preventDefault();
        if (self.regCoPa.value != self.regPa.value) {
            self.regMe.innerText = "Mật khẩu không khớp";
            return false;
        } else {
            self.regSu.innerText = "Đang đăng ký...";
            self.regSu.disabled = true;
            self.regMe.innerText = "";
            const data = self.g.c.e({
                name: self.regNa.value,
                email: self.regEm.value,
                phone: self.regPh.value,
                password: self.regPa.value,
                deviceId: self.g.deviceId,
                chanel: self.g.appName
            });
            const url = this.g.domain + this.g.endpoint.register;
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
                    json = self.g.c.d(json);
                    // console.log("register: ", json);
                    self.regSu.innerText = "ĐĂNG KÝ";
                    self.regSu.disabled = false;
                    if (json.isOk) {
                        self.sTo(json.token);
                        self.g.accessToken = json.token.access_token;
                        self.g.user = json.user;
                        await self.cb.lin();
                        self.g.a.s("success", "Đăng ký thành công");
                        self.regNa.value = "";
                        self.regEm.value = "";
                        self.regPh.value = "";
                        self.regPa.value = "";
                        self.regCoPa.value = "";
                    } else {
                        if (json.message == "emailExist")
                            self.regMe.innerText = "Emai này đã đăng ký";
                        else if (json.message == "phoneExist")
                            self.regMe.innerText =
                                "Số điện thoại này đã đăng ký";
                        else if (json.message == "deviceExist")
                            self.regMe.innerText =
                                "Tài khoản khác đã dùng thiết bị này";
                    }
                })
                .catch(error => {
                    console.log(error);
                    self.g.a.s("error", "Đăng ký lỗi");
                    self.regSu.innerText = "ĐĂNG KÝ";
                    self.regSu.disabled = false;
                });
        }
    };
    lIn = (e, self) => {
        e.preventDefault();
        self.logSu.innerText = "Đang đăng nhập...";
        self.logSu.disabled = true;
        self.logMe.innerText = "";
        const data = self.g.c.e({
            username: self.logUs.value,
            password: self.logPa.value,
            rememberMe: self.logReMe.checked,
            deviceId: self.g.deviceId,
            chanel: self.g.appName
        });
        const url = self.g.domain + self.g.endpoint.login;
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
                json = self.g.c.d(json);
                // console.log("login: ", json);
                if (json.isOk) {
                    self.sTo(json.token);
                    self.g.accessToken = json.token.access_token;
                    self.g.user = json.user;
                    await self.cb.lin();
                    self.logUs.value = "";
                    self.logPa.value = "";
                } else {
                    if (json.message == "unauthorized")
                        self.logMe.innerText = "Sai thông tin đăng nhập";
                    else if (json.message == "unsetup")
                        self.logMe.innerText = "Lỗi khởi tạo tài khoản";
                    else if (json.message == "expired")
                        self.logMe.innerText = "Quá hạn sử dụng dịch vụ";
                    else if (json.message == "deviceLimit")
                        self.logMe.innerText = "Quá giới hạn thiết bị";
                }
                self.logSu.innerText = "ĐĂNG NHẬP";
                self.logSu.disabled = false;
            })
            .catch(error => {
                self.g.a.s("error", "Đăng nhập lỗi");
                self.logSu.innerText = "ĐĂNG NHẬP";
                self.logSu.disabled = false;
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
            self.infCo.style.display = "none";
            self.logCo.style.display = "block";
            self.cb.lou();
            self.logUs.focus();
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
                        // console.log("gU: ", json);
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
            const data = this.g.c.e({ securities: this.g.securities });
            const url = this.g.domain + this.g.endpoint.getConfig;
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.g.accessToken}`
                },
                body: data
            })
                .then(response => response.json())
                .then(json => {
                    json = this.g.c.d(json);
                    // console.log("serverConfig", json);
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
            self.optSu.innerText = "Đang lưu cài đặt...";
            self.optSu.disabled = true;
            const data = self.g.c.e({
                timeFrame: +self.timFrSe.value,
                chartType: self.chaTySe.value,
                contractNumber: +self.conNuIn.value,
                takeProfit: +self.takPrIn.value,
                stopLoss: +self.stoLoIn.value,
                isVolume: self.isVolCh.checked,
                isViewChart: self.isVieChCh.checked
            });
            const url = self.g.domain + self.g.endpoint.setConfig;
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${self.g.accessToken}`
                },
                body: data
            })
                .then(response => {
                    if (response.ok) return response.json();
                    throw new Error(response.statusText);
                })
                .then(async json => {
                    json = self.g.c.d(json);
                    // console.log("setConfig: ", json);
                    resolve(json.isOk);
                })
                .catch(error => resolve(false));
        });
    };
    sTo = token => localStorage.setItem(this.TK, JSON.stringify(token));
    rTo = () => localStorage.removeItem(this.TK);
    gTo = () => {
        const token = JSON.parse(localStorage.getItem(this.TK));
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
        if (this.conEl.classList.contains("show"))
            this.conEl.classList.remove("show");
        else {
            this.sPa(this.g.isLi ? this.optCo : this.logCo);
            this.conEl.classList.add("show");
        }
    };
    tLoBu = visible => {
        this.louBu.style.display = visible ? "block" : "none";
    };
    sPa = el => {
        var activeEl = document.querySelector(
            "#optionViewContainer .section.active"
        );
        if (activeEl) activeEl.classList.remove("active");
        el.classList.add("active");
    };
}
