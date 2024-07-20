import styled from 'styled-components';
import { StyledFlex } from '@/styled/styles';
import { StyledBestPrice } from '../styles';

const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 6px;
`;

const StyledAmount = styled.div`
  color: #979abe;
`;

export default function Market({ trade, bestTrade, length, onProvidersClick }: any) {
  return (
    <StyledFlex justifyContent="space-between" style={{ paddingTop: 16 }}>
      <StyledFlex gap="5px">
        <StyledIcon src={trade.logo} />
        <div>{trade.name}</div>
        {bestTrade.name === trade.name && <StyledBestPrice>Best Price</StyledBestPrice>}
      </StyledFlex>
      <StyledFlex gap="5px">
        <StyledAmount
          className="link"
          onClick={() => {
            if (!length) return;
            onProvidersClick();
          }}
        >
          {length || 0}
        </StyledAmount>
        <div>Providers</div>
      </StyledFlex>
    </StyledFlex>
  );
}
