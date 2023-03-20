class Al {
    // Hàm khởi tạo
    constructor() {}
    // Các phương thức
    s = (status = "success", text = "message", autoclose = true) => {
        this.notify = new Notify({
            status: status,
            text: text,
            autoclose: autoclose,
            position: "right bottom"
        });
    };
    h = () =>
        new Promise(resolve => {
            this.notify.close();
            setTimeout(() => resolve(), 500);
        });
}
