import { StyledFlex } from '@/styled/styles';

import { balanceFormated } from '@/utils/balance';
import Big from 'big.js';

export default function Result({ trade }: any) {
  return (
    <StyledFlex justifyContent="space-between" style={{ paddingTop: 13 }}>
      <StyledFlex gap="9px">
        <div>
          1 {trade.outputCurrency?.symbol} ={' '}
          {balanceFormated(
            Big(trade.inputCurrencyAmount || 0)
              .div(Big(trade.outputCurrencyAmount || 0).eq(0) ? 1 : trade.outputCurrencyAmount)
              .toString(),
            4,
          )}{' '}
          {trade.inputCurrency?.symbol}
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M1.01514 6.11148C0.887128 4.95763 1.55283 3.03456 3.70343 3.03456C5.85402 3.03456 10.9999 3.03456 10.9999 3.03456M10.9999 3.03456L9.01977 1M10.9999 3.03456L9.01977 5"
            stroke="#979ABE"
          />
          <path
            d="M10.9849 5.88071C11.1129 7.03456 10.4472 8.95763 8.29657 8.95763C6.14598 8.95763 1.00006 8.95763 1.00006 8.95763M1.00006 8.95763L3.01978 11M1.00006 8.95763L3.01978 7"
            stroke="#979ABE"
          />
        </svg>
      </StyledFlex>
      <div>Fees: ${balanceFormated(trade.gasUsd, 4)}</div>
    </StyledFlex>
  );
}
