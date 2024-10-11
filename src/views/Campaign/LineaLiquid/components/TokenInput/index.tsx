import Big from 'big.js';
import type { Dispatch, SetStateAction } from 'react';
import { useMemo } from 'react';

import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';

import {
  StyledBalance,
  StyledBot,
  StyledBotRight,
  StyledContainer,
  StyledInput,
  StyledRule,
  StyledToken,
  StyledTokenIcon,
  StyledTop,
  StyledUsdValue
} from './styles';

const TokenInput = (props: Props) => {
  const {
    currentTab,
    token,
    price,
    style,
    amount,
    balance,
    setIsMax,
    setLoading,
    rule,
    disabled,
    debouncedGetTrade,
    cancelGetTrade,
    onAmountChange
  } = props;

  const handleAmountChange = (ev: any) => {
    if (isNaN(Number(ev.target.value))) {
      setLoading(false);
      cancelGetTrade();
      return;
    }
    const _amount = ev.target.value.replace(/\s+/g, '');
    onAmountChange && onAmountChange(_amount);
    if (!_amount || Big(_amount).lte(0)) {
      setLoading(false);
      cancelGetTrade();
      return _amount;
    }
    debouncedGetTrade();
    return _amount;
  };

  const handleAmount = (ev: any) => {
    const _amount = handleAmountChange(ev);
    if (!_amount) {
      setIsMax(false);
      return;
    }
    if (Big(_amount).eq(balance)) {
      setIsMax(true);
    } else {
      setIsMax(false);
    }
  };

  const handleBalance = () => {
    setIsMax(true);
    handleAmountChange({ target: { value: Big(balance).toFixed(token.decimals, 0) } });
  };

  const usdValue = useMemo(() => {
    if (!price || !amount || Big(price).lte(0) || Big(amount).lte(0)) {
      return Big(0);
    }
    return Big(amount).times(price);
  }, [price, amount]);

  return (
    <StyledContainer style={style}>
      <StyledTop>
        <StyledInput type="text" value={amount} onChange={handleAmount} placeholder="0.0" disabled={disabled} />
        <StyledToken>
          <StyledTokenIcon src={token.icon} alt="" />
          <span>{token.symbol}</span>
        </StyledToken>
      </StyledTop>
      <StyledBot>
        <StyledUsdValue>
          {formateValueWithThousandSeparatorAndFont(usdValue, 2, true, { prefix: '$', isZeroPrecision: true })}
        </StyledUsdValue>
        <StyledBotRight>
          <StyledRule>{rule}</StyledRule>
          <StyledBalance>
            <span className="label">{currentTab === 'Borrow' ? 'Borrow limit' : 'Balance'}:</span>
            <span className="value" onClick={handleBalance}>
              {formateValueWithThousandSeparatorAndFont(balance, 2, true)}
            </span>
          </StyledBalance>
        </StyledBotRight>
      </StyledBot>
    </StyledContainer>
  );
};

export default TokenInput;

interface Props {
  style?: React.CSSProperties;
  amount: string;
  balance: string | Big.Big;
  setIsMax: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  debouncedGetTrade: () => void;
  cancelGetTrade: () => void;
  token: any;
  price: string | Big.Big | number;
  rule?: any;
  disabled?: boolean;
  currentTab: string;

  onAmountChange?(amount: string): void;
}
