import Big from 'big.js';

const LendingTotal = (props: Props) => {
  const { total, digit, unit = '' } = props;

  if (total === '-') return '-';
  if (!total) return unit + '0';
  const BTotal = Big(total);
  if (BTotal.eq(0)) return unit + '0';
  const digitSplit = 1 / Math.pow(10, digit);
  if (BTotal.lt(digitSplit)) return '<' + unit + digitSplit;
  if (BTotal.lt(1e3)) return unit + BTotal.toFixed(digit);
  if (BTotal.lt(1e6)) return unit + BTotal.div(1e3).toFixed(digit) + 'K';
  return unit + BTotal.div(1e6).toFixed(digit) + 'M';
};

export default LendingTotal;

export interface Props {
  total: string;
  digit: number;
  unit: string;
}
