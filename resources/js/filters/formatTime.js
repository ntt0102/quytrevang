import { format } from "date-fns";

export default function formatTime(time) {
    return format(new Date(time), "MM/dd/yyyy hh:mm");
}
