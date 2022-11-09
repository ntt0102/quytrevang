export default function numberVnFormat(number, fixed = -1) {
    if (number == undefined) number = 0;
    if (number != 0 && fixed > -1) number = number.toFixed(fixed);
    number = number.toString().replaceAll(".", ",");
    return fixed == 1 ? number.replace(",0", "") : number;
}
