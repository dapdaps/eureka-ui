
function formatNumber(number: number) {
  if (typeof Number(number) !== "number") return "-";
  if (isNaN(Number(number))) return "-";

  let str_num;

  if (number >= 1e3 && number < 1e6) {
    str_num = number / 1e3;
    return str_num.toFixed(2) + "k";
  } else if (number >= 1e6) {
    str_num = number / 1e6;
    return str_num.toFixed(2) + "m";
  } else if (number >= 1e9) {
    str_num = number / 1e9;
    return str_num.toFixed(2) + "b";
  } else if (number >= 1e12) {
    str_num = number / 1e12;
    return str_num.toFixed(2) + "t";
  } else {
    return Number(number).toFixed(2);
  }
}

export default formatNumber;
