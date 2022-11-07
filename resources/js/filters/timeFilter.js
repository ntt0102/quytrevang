export default function fromNow(time) {
    return moment(time, "X").fromNow();
}
