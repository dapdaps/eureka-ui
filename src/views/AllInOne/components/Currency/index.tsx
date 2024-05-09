import { StyledTradeBlock, StyledTradeTitle, StyledTradeInputContainer, StyledSelectToken, CurrencyIcon, CurrencyTitle, StyledTradeBalance} from './styles';
import CurrencyInput from '@/views/AllInOne/components/CurrencyInput/index';
import ArrowIcon from '@/components/Icons/ArrowIcon';
import { useState } from 'react';
import CurrencySelectPopup from '../CurrencySelectPopup';

type Props = {
  onAmountChange?: (amount: number | string) => void;
  title: string;
  disabled?: boolean;
  textUnderline?: boolean;
}
const Currency = (props: Props) => {
  console.log(props);
  const { onAmountChange, title, disabled, textUnderline } = props;
  const [amount, setAmount] = useState<number | string>(1);
  const [show, setShow] = useState<boolean>(false);
  const onCurrencyChange = (m: number | string) => {
    setAmount(m);
    onAmountChange?.(m);
  }
  const onShowSelect = () => {
    setShow(true);
  };
  return <><StyledTradeBlock>
    <StyledTradeTitle>{title}</StyledTradeTitle>
    <StyledTradeInputContainer>
      <CurrencyInput amount={amount} onAmountChange={onCurrencyChange} disabled={disabled}/>
      <StyledSelectToken onClick={onShowSelect}>
        <CurrencyIcon src={''} alt={'www'} />
        <CurrencyTitle>wdd</CurrencyTitle>
        <div className={'arrow-icon'}><ArrowIcon size={11.5} /></div>
      </StyledSelectToken>
    </StyledTradeInputContainer>
    <StyledTradeBalance underline={textUnderline}>
      <div>$5984950</div>
      <div className={'trade-balance'}>balance: 0</div>
    </StyledTradeBalance>
  </StyledTradeBlock>
    <CurrencySelectPopup display={show} onClose={() => setShow(false)} />
    </>
}

export default Currency;