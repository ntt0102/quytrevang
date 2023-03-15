class Notifier {
    // Các thuộc tính
    status = "success";
    text = "test";
    autoclose = true;
    // Hàm khởi tạo
    constructor() {}
    // Các phương thức
    show = (status, text, autoclose) => {
        this.status = status || this.status;
        this.text = text || this.text;
        this.autoclose = autoclose && this.autoclose;
        this.notify = new Notify({
            status: this.status,
            text: this.text,
            autoclose: this.autoclose,
            position: "right bottom"
        });
    };
    hide = () => {
        this.notify.close();
    };
}
