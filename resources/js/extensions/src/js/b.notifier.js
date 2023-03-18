class Notifier {
    // Hàm khởi tạo
    constructor() {}
    // Các phương thức
    show = (status = "success", text = "message", autoclose = true) => {
        this.notify = new Notify({
            status: status,
            text: text,
            autoclose: autoclose,
            position: "right bottom"
        });
    };
    hide = () => this.notify.close();
}
