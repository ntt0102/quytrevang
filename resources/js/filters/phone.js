export default function phone(value) {
    let ret = "";
    if (value) ret = value.replace(/(\d{4})(\d{3})(\d{3})/, "$1.$2.$3");
    return ret;
}
