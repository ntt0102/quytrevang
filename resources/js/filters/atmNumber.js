export default function atmNumber(value) {
    let ret = "";
    if (value)
        ret = value.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1-$2-$3-$4");
    return ret;
}
