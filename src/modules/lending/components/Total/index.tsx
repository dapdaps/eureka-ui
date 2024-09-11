import Big from 'big.js';

const LendingTotal = (props: Props) => {
  const { total, digit, unit = '', suffixUnit = '' } = props;

  if (total === '-') return '-' + suffixUnit;
  if (!total) return unit + '0' + suffixUnit;
  const BTotal = Big(total);
  if (BTotal.eq(0)) return unit + '0' + suffixUnit;
  const digitSplit = 1 / Math.pow(10, digit);
  if (BTotal.lt(digitSplit)) return '<' + unit + digitSplit + suffixUnit;
  if (BTotal.lt(1e3)) return unit + BTotal.toFixed(digit) + suffixUnit;
  if (BTotal.lt(1e6)) return unit + BTotal.div(1e3).toFixed(digit) + 'K' + suffixUnit;
  return unit + BTotal.div(1e6).toFixed(digit) + 'M' + suffixUnit;
};

export default LendingTotal;

export interface Props {
  total?: string;
  digit: number;
  unit?: string;
  suffixUnit?: string;
}
