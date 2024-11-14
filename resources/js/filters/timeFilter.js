import { formatDistanceToNow } from "date-fns";

export default function fromNow(time) {
    return formatDistanceToNow(new Date(time * 1000), { addSuffix: true });
}
