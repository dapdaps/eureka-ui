import Big from 'big.js';

import { useSettingsStore } from '@/stores/settings';
import { StyledFlex } from '@/styled/styles';
import { balanceFormated } from '@/utils/balance';
import DotFlashing from '@/views/SuperBridge/DotFlashing';

import { StyledBestPrice } from '../../styles';
import {
  StyledContainer,
  StyledDesc,
  StyledEmpty,
  StyledHeader,
  StyledIcon,
  StyledItem,
  StyledTitle,
  StyledTokenIcon
} from './styles';

const MarketsModal = ({ markets = [], loading, bestTrade, outputCurrency, errorTips, onSelectMarket, trade }: any) => {
  const slippage: any = useSettingsStore((store: any) => store.slippage);
  return (
    <StyledContainer>
      <StyledHeader>
        <div>{markets?.length || 0} Providers:</div>
        <div className="arrow">
          {loading ? <DotFlashing val={markets?.length || 0} /> : <span className="route-num">{markets?.length}</span>}
        </div>
      </StyledHeader>
      {markets.map((item: any) => (
        <StyledItem
          isActive={trade?.name === item.name}
          key={item.name}
          onClick={() => {
            onSelectMarket(item);
          }}
        >
          <StyledFlex justifyContent="space-between">
            <StyledFlex gap="6px">
              {item.logo ? <StyledIcon src={item.logo} /> : <div style={{ width: 30 }} />}
              <StyledTitle>{item.name}</StyledTitle>
              {bestTrade?.name === item.name && <StyledBestPrice>Cheapest</StyledBestPrice>}
            </StyledFlex>
            <StyledFlex gap="6px">
              <StyledTitle>
                ~
                {balanceFormated(
                  Big(item.outputCurrencyAmount || 0)
                    .mul(1 - slippage / 100)
                    .toString(),
                  3
                )}
              </StyledTitle>
              {outputCurrency?.icon && <StyledTokenIcon src={outputCurrency.icon} />}
            </StyledFlex>
          </StyledFlex>
          <StyledFlex gap="20px" justifyContent="space-between" style={{ marginTop: 16 }}>
            <StyledFlex gap="5px" alignItems="center">
              <StyledDesc>Price Impact</StyledDesc>
              <StyledDesc>
                <span className={`price-impact-${item.priceImpactType}`}>{item.priceImpact || '-'}%</span>
              </StyledDesc>
            </StyledFlex>
            <StyledFlex gap="5px" alignItems="center">
              <StyledDesc>Fees</StyledDesc>
              <StyledDesc>${balanceFormated(item.gasUsd, 4)}</StyledDesc>
            </StyledFlex>
          </StyledFlex>
        </StyledItem>
      ))}
      {markets.length === 0 && (
        <StyledEmpty>
          <svg width="36" height="46" viewBox="0 0 36 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.5 20.3704C3.70333 18.9517 1 15.2915 1 11C1 5.47715 5.47715 1 11 1C15.9212 1 20.0121 4.55476 20.845 9.2366"
              stroke="#979ABE"
              stroke-opacity="0.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.5 37.2705C18.2642 40.1097 21.4113 42.0001 25 42.0001C30.5228 42.0001 35 37.5229 35 32.0001C35 29.2027 33.8514 26.6736 32 24.8586"
              stroke="#979ABE"
              stroke-opacity="0.3"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-dasharray="2 2"
            />
            <path
              d="M29.7667 3.96638L29.7664 3.96682L29.7667 3.96638ZM29.5549 3.60563L6.06758 24.2745C5.58308 24.7009 5.88463 25.5 6.53001 25.5H15.5593L3.32516 43.6246C2.87606 44.2899 3.71787 45.0647 4.34373 44.5619L33.37 21.2457C33.8854 20.8318 33.5927 20 32.9317 20H20.4269L30.6024 4.51556C31.0505 3.8336 30.1676 3.0665 29.5549 3.60563Z"
              stroke="#979ABE"
              stroke-opacity="0.3"
              stroke-linejoin="round"
            />
          </svg>
          <div className="empty-text">{errorTips}</div>
        </StyledEmpty>
      )}
    </StyledContainer>
  );
};

export default MarketsModal;
