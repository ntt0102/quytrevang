export default function formatTime(time) {
    return moment(String(time)).format("MM/DD/YYYY hh:mm");
}
