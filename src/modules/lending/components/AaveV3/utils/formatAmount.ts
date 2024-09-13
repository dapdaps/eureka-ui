import Big from "big.js";

const formatAmount = (amount: string, digits: number = 2, prev: string = "") => {
    if (!amount) return "-";
    const total = Big(amount);
    if (total.eq(0)) return prev + "0";
    const digitSplit = 1 / Math.pow(10, digits);

    if (total.lt(digitSplit)) return "<" + prev + digitSplit;

    return prev + Number(total.toFixed(digits)).toLocaleString("en-US");
}

export default formatAmount;


