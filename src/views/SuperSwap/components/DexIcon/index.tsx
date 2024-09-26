import styled from 'styled-components';

import { StyledIcon } from '../MarketsModal/styles';

const StyledWrapper = styled.div`
  position: relative;
`;
const StyledDexIcon = styled.img`
  position: absolute;
  right: 2px;
  bottom: 2px;
  width: 12px;
  height: 12px;
  border-radius: 3px;
  border: 1px solid #53577b;
`;

export default function DexIcon({ src, aggregator }: any) {
  return (
    <StyledWrapper>
      <StyledIcon src={src || '/images/apps/default_token.png'} />
      {aggregator && aggregator !== 'Dapdap' && (
        <StyledDexIcon src={`/images/aggregators/${aggregator.toLowerCase()}.png`} />
      )}
    </StyledWrapper>
  );
}
