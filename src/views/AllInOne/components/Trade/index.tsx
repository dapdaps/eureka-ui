import { useState } from 'react';
import { StyledTradeContainer, StyledTradeIcon, StyledTradeButton, StyledTradeFooter ,StyledTradeEth, StyledMarketIcon, StyledMarketTitle, StyledMarketTag, StyledMarketCount} from '@/views/AllInOne/components/Trade/styles';
import Currency from '@/views/AllInOne/components/Trade/components/Currency/index';
import { StyledFlex } from "@/styled/styles";
import ArrowIcon from '@/components/Icons/ArrowIcon';
const Trade = (props) => {
  const { chain } = props;
  console.log(chain);
  const [ amount, setAmount ] = useState<number>(1);
  const [ isDropdown, setIsDropdown ] = useState<boolean>(false);
  const onFromChange = (m: number) => {
    setAmount(m);
  }
  
  const TradeIcon = () => (
    <svg width="42" height="43" viewBox="0 0 42 43" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2.25586" width="38" height="38" rx="10" fill="#2E3142" stroke="#16181D" stroke-width="4" />
      <path d="M21.4999 15.7559V26.2559M21.4999 26.2559L16 20.7559M21.4999 26.2559L27 20.7559" stroke="white"
            stroke-width="2" stroke-linecap="round" />
    </svg>

  )

  const showMarketDropdown = () => {
    setIsDropdown(!isDropdown);
  }
  return <div>
    <StyledTradeContainer>
      <div className='from-currency_margin'>
        <Currency title='Swap From' textUnderline={true} onAmountChange={onFromChange} />
      </div>
      <StyledTradeIcon>
        <TradeIcon />
      </StyledTradeIcon>
      <Currency title='To' disabled={true} />
    </StyledTradeContainer>
    <StyledTradeButton bgColor={chain.selectBgColor} color={chain.iconColor ?? '#fff'}>Swap</StyledTradeButton>
    <StyledTradeFooter>
      <StyledTradeEth>1 ETH = 3422.2502675 USDC</StyledTradeEth>
      <StyledFlex gap='8px'>
         <StyledMarketIcon url=''></StyledMarketIcon>
        <StyledMarketTitle>soidspoi</StyledMarketTitle>
        <StyledMarketTag>Best Price</StyledMarketTag>
        <StyledFlex className={isDropdown ? 'light' : 'dark'} gap='8px'>
          <StyledMarketCount onClick={showMarketDropdown}>3 Markets</StyledMarketCount>
          <span style={{ transform: isDropdown ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            <ArrowIcon size={10}></ArrowIcon>
          </span>
        </StyledFlex>
      </StyledFlex>
    </StyledTradeFooter>
  </div>
};

export default Trade;