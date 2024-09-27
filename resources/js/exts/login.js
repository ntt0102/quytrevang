class Login {
    // Hàm khởi tạo
    constructor() {
        this.setupExpire();
    }
    // Các phương thức
    setupExpire() {
        document.getElementById("slExpire").value = 720;
    }
}

new Login();
