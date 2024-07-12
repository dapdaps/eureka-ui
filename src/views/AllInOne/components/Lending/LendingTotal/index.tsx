import Big from "big.js";


interface IProps {
    total: string | Big;
    digit: number;
    unit?: string;
}


const LendingTotal = (props: IProps) => {
    const { total, digit } = props;
    const unit = props.unit || "";

    if (total === "-") {
        return "-";
    }

    if (!total) {
        return unit + "0";
    }

    const BTotal = Big(total);

    if (BTotal.eq(0)) {
        return unit + "0";
    }

    const digitSplit = 1 / Math.pow(10, digit);

    if (BTotal.lt(digitSplit)) {
        return "<" + unit + digitSplit;
    }

    if (BTotal.lt(1e3)) {
        return unit + BTotal.toFixed(digit);
    }

    if (BTotal.lt(1e6)) {
        return unit + BTotal.div(1e3).toFixed(digit) + "K";
    }

    return unit + BTotal.div(1e6).toFixed(digit) + "M";
}

export default LendingTotal