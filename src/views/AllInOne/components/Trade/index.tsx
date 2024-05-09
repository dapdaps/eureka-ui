import { useState } from 'react';
import {
  StyledTradeContainer,
  StyledTradeIcon,
  StyledTradeButton,
  StyledTradeFooter,
  StyledTradeEth,
  StyledMarketIcon,
  StyledMarketTitle,
  StyledMarketTag,
  StyledMarketCount,
  ArrowWrap,
  StyledMarketsContainer,
  StyledMarketItem,
  StyledMarketItemLeft,
  StyledMarketItemRight,
  StyledMarketItemIcon,
  StyledMarketItemName,
  StyledMarketItemToken,
  StyledMarketItemBalance,
  StyledMarketArrow

} from '@/views/AllInOne/components/Trade/styles';
import Currency from '@/views/AllInOne/components/Currency/index';
import { StyledFlex } from '@/styled/styles';
import ArrowIcon from '@/components/Icons/ArrowIcon';

const Trade = (props: { chain: any }) => {
  const { chain } = props;
  const [amount, setAmount] = useState<number | string>(1);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [selectedMarket, setSelectedMarket] = useState<string>('');
  const onFromChange = (m: number | string) => {
    setAmount(m);
  };

  const TradeIcon = () => (
    <svg width="42" height="43" viewBox="0 0 42 43" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2.25586" width="38" height="38" rx="10" fill="#2E3142" stroke="#16181D" stroke-width="4" />
      <path d="M21.4999 15.7559V26.2559M21.4999 26.2559L16 20.7559M21.4999 26.2559L27 20.7559" stroke="white"
            stroke-width="2" stroke-linecap="round" />
    </svg>

  );

  const showMarketDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const onSelectMarket = (item: string) => {
    setSelectedMarket(item);
  }
  return <>
    <StyledTradeContainer>
      <div className="from-currency_margin">
        <Currency title="Swap From" textUnderline={true} onAmountChange={onFromChange} />
      </div>
      <StyledTradeIcon>
        <TradeIcon />
      </StyledTradeIcon>
      <Currency title="To" disabled={true} />
    </StyledTradeContainer>
    <StyledTradeButton bgColor={chain.selectBgColor} color={chain.iconColor ?? '#fff'}>Swap</StyledTradeButton>
    <StyledTradeFooter>
      <StyledTradeEth>1 ETH = 3422.2502675 USDC</StyledTradeEth>
      <StyledFlex gap="8px">
        <StyledMarketIcon url=""></StyledMarketIcon>
        <StyledMarketTitle>soidspoi</StyledMarketTitle>
        <StyledMarketTag>Best Price</StyledMarketTag>
        <StyledFlex className={isDropdown ? 'light' : 'dark'} gap="8px">
          <StyledMarketCount onClick={showMarketDropdown}>3 Markets</StyledMarketCount>
          <ArrowWrap isDropdown={isDropdown} onClick={showMarketDropdown}>
            <ArrowIcon size={10}></ArrowIcon>
          </ArrowWrap>
        </StyledFlex>
      </StyledFlex>
    </StyledTradeFooter>
    <StyledMarketsContainer className={!!selectedMarket ? 'active-market' : ''}>
      { ['1', '2', '3'].map((i: string) => <StyledMarketItem onClick={() => onSelectMarket(i)} active={i === selectedMarket} color={chain.selectBgColor}>
        <StyledMarketItemLeft>
          <StyledMarketItemIcon />
          <StyledMarketItemName>SyncSwap</StyledMarketItemName>
          <StyledMarketTag>Best Price</StyledMarketTag>
        </StyledMarketItemLeft>
        <StyledMarketItemRight>
          <StyledMarketItemToken />
          <StyledMarketItemBalance>3420.77</StyledMarketItemBalance>
          <StyledMarketArrow>
            <ArrowIcon size={10}></ArrowIcon>
          </StyledMarketArrow>
        </StyledMarketItemRight>
      </StyledMarketItem>) }
    </StyledMarketsContainer>
  </>
;
};

export default Trade;