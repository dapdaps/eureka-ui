import Big from 'big.js';

import Modal from '@/components/Modal';
import { useSettingsStore } from '@/stores/settings';
import { StyledFlex } from '@/styled/styles';
import { balanceFormated } from '@/utils/balance';

import { StyledBestPrice } from '../../styles';
import {
  StyledContainer,
  StyledDesc,
  StyledIcon,
  StyledItem,
  StyledLine,
  StyledTitle,
  StyledTokenIcon
} from './styles';

const MarketsModal = ({ display, onClose, markets = [], bestTrade, outputCurrency, onSelectMarket, trade }: any) => {
  const slippage: any = useSettingsStore((store: any) => store.slippage);
  return (
    <Modal
      display={display}
      onClose={onClose}
      title="Providers"
      width={600}
      content={
        <StyledContainer>
          {markets.map((item: any) => (
            <StyledItem
              isActive={trade?.name === item.name}
              key={item.name}
              onClick={() => {
                onSelectMarket(item);
                onClose();
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
                    {balanceFormated(
                      Big(item.outputCurrencyAmount || 0)
                        .mul(1 - slippage / 100)
                        .toString(),
                      8
                    )}
                  </StyledTitle>
                  <StyledTokenIcon src={outputCurrency.icon} />
                </StyledFlex>
              </StyledFlex>
              <StyledFlex gap="20px" style={{ marginTop: 16 }}>
                <StyledFlex gap="5px" alignItems="center" style={{ width: '50%' }}>
                  <StyledDesc>Min. Received</StyledDesc>
                  <StyledLine />
                  <StyledDesc>
                    {balanceFormated(
                      Big(item.outputCurrencyAmount || 0)
                        .mul(1 - slippage / 100)
                        .toString(),
                      8
                    )}{' '}
                    {outputCurrency.symbol}
                  </StyledDesc>
                </StyledFlex>
                <StyledFlex gap="5px" alignItems="center" style={{ width: '50%' }}>
                  <StyledDesc>Price Impact</StyledDesc>
                  <StyledLine />
                  <StyledDesc>
                    <span className={`price-impact-${item.priceImpactType}`}>{item.priceImpact || '-'}%</span>
                  </StyledDesc>
                </StyledFlex>
              </StyledFlex>
              <StyledFlex gap="20px" style={{ marginTop: 16 }}>
                <StyledFlex gap="5px" alignItems="center" style={{ width: '50%' }}>
                  <StyledDesc>Fees</StyledDesc>
                  <StyledLine />
                  <StyledDesc>${balanceFormated(item.gasUsd, 4)}</StyledDesc>
                </StyledFlex>
                <StyledFlex gap="5px" alignItems="center" style={{ width: '50%' }}>
                  <StyledDesc>Route</StyledDesc>
                  <StyledLine />
                  <StyledDesc>{item.routerStr}</StyledDesc>
                </StyledFlex>
              </StyledFlex>
            </StyledItem>
          ))}
        </StyledContainer>
      }
    />
  );
};

export default MarketsModal;
