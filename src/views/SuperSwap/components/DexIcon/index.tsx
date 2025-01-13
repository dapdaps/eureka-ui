import styled from 'styled-components';

import { StyledIcon } from '../MarketsModal/styles';

const StyledWrapper = styled.div`
  position: relative;
`;
const StyledDexIcon = styled.img`
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 14px;
  height: 14px;
  border-radius: 3px;
`;

export default function DexIcon({ src, aggregator }: any) {
  console.log('===aggregator', aggregator);
  return (
    <StyledWrapper>
      <StyledIcon src={src || '/images/apps/default_token.png'} />
      {aggregator && aggregator !== 'Dapdap' && (
        <StyledDexIcon src={`/images/aggregators/${aggregator.toLowerCase()}.png`} />
      )}
    </StyledWrapper>
  );
}
