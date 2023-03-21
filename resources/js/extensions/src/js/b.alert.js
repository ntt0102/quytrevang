class Al {
    // Hàm khởi tạo
    constructor() {}
    // Các phương thức
    s = (
        status = "success",
        text = "message",
        autoclose = true,
        keep = false
    ) => {
        this.notify = new Notify({
            status: status,
            text: text,
            autoclose: autoclose,
            position: "right bottom"
        });
        this.keep = keep;
    };
    h = () =>
        new Promise(resolve => {
            if (!this.keep) this.notify.close();
            else this.keep = false;
            setTimeout(() => resolve(), 500);
        });
}
