import React, {useState} from 'react';

import ArrowIcon from '@/components/Icons/ArrowIcon';
import {StyledFlex} from '@/styled/styles';
import Currency from '@/views/AllInOne/components/Trade/Currency/index';
import CloseIcon from '@/views/AllInOne/components/Trade/CloseIcon';
import {
  ArrowWrap,
  StyledMarketArrow,
  StyledMarketCount,
  StyledMarketIcon,
  StyledMarketItem,
  StyledMarketItemBalance,
  StyledMarketItemContent,
  StyledMarketItemDetail,
  StyledMarketItemIcon,
  StyledMarketItemLeft,
  StyledMarketItemName,
  StyledMarketItemRight,
  StyledMarketItemText,
  StyledMarketItemTextLeft,
  StyledMarketItemTextRight,
  StyledMarketItemToken,
  StyledMarketsContainer,
  StyledMarketTag,
  StyledMarketTitle,
  StyledTradeContainer,
  StyledTradeEth,
  StyledTradeFooter,
  StyledTradeIcon,
} from '@/views/AllInOne/components/Trade/styles';
import Arrow2Down from '@/views/AllInOne/components/Arrow2Down';
import AllInOneButton from "@/views/AllInOne/components/Button";

const Trade = (props: { chain: Record<string, any> }) => {
  const {chain} = props;
  const [amount, setAmount] = useState<number | string>(1);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [selectedMarket, setSelectedMarket] = useState<string>('');
  const onFromChange = (m: number | string) => {
    setAmount(m);
  };

  const showMarketDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const onSelectMarket = (item: string) => {
    setSelectedMarket(item);
  };

  const onClose = () => {
    setSelectedMarket('');
  };

  const markets = [
    {
      key: '1',
      label: 'Minimum Received',
      value: '0.04508452 ETH',
    },
    {
      key: '2',
      label: 'Price Impact',
      value: '1.67%',
    },
    {
      key: '3',
      label: 'Fees',
      value: '$0.777594',
    },
    {
      key: '4',
      label: 'Route',
      value: 'USDC > ETH',
    },
  ];

  const getMarketItemLeft = () => (
    <StyledMarketItemLeft>
      <StyledMarketItemIcon/>
      <StyledMarketItemName>SyncSwap</StyledMarketItemName>
      <StyledMarketTag>Best Price</StyledMarketTag>
    </StyledMarketItemLeft>
  );

  const getMarketItemElement = (marketItem: any) => {
    return <StyledMarketItem onClick={() => onSelectMarket(marketItem)} active={marketItem === selectedMarket}
                             color={chain.selectBgColor}>
      {getMarketItemLeft()}
      <StyledMarketItemRight>
        <StyledMarketItemToken/>
        <StyledMarketItemBalance>3420.77</StyledMarketItemBalance>
        <StyledMarketArrow>
          <ArrowIcon size={10}></ArrowIcon>
        </StyledMarketArrow>
      </StyledMarketItemRight>
    </StyledMarketItem>;
  };

  const marketsClassNames = () => {
    let classname = '';
    if (!!selectedMarket) {
      classname += ' active-market';
    }
    if (isDropdown) {
      classname += ' open-market';
    }
    return classname;
  };

  return (
    <div>
      <StyledTradeContainer>
        <div className="from-currency_margin">
          <Currency title="Swap From" textUnderline={true} onAmountChange={onFromChange}/>
        </div>
        <StyledTradeIcon>
          <Arrow2Down/>
        </StyledTradeIcon>
        <Currency title="To" disabled={true}/>
      </StyledTradeContainer>
      <AllInOneButton
        $background={chain?.selectBgColor}
        $borderColor={chain?.selectBgColor}
        color={chain?.iconColor}
        styles={{ marginTop: 20, marginBottom: 20 }}
      >
        Swap
      </AllInOneButton>
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
      <StyledMarketsContainer className={marketsClassNames()}>
        {
          ['1', '2', '3'].map((i: string) => {
            return selectedMarket ? (selectedMarket === i ? <StyledMarketItemDetail>
              <StyledMarketItem className="market-item_detail">
                {getMarketItemLeft()}
                <CloseIcon onClose={onClose}/>
              </StyledMarketItem>
              <StyledMarketItemContent>
                {
                  markets.map(i => (
                    <StyledMarketItemText key={i.key}>
                      <StyledMarketItemTextLeft>{i.label}</StyledMarketItemTextLeft>
                      <StyledMarketItemTextRight>{i.value}</StyledMarketItemTextRight>
                    </StyledMarketItemText>
                  ))
                }
              </StyledMarketItemContent>
            </StyledMarketItemDetail> : null) : getMarketItemElement(i);
          })
        }
      </StyledMarketsContainer>
    </div>
  );
};

export default Trade;