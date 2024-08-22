import styled from 'styled-components';

import SwitchNetworkButton from '@/views/Pool/components/SwitchNetworkButton';

const StyledContainer = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
  color: #777e94;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export default function Empty({ isChainSupport, chain }: any) {
  return (
    <StyledContainer>
      <svg xmlns="http://www.w3.org/2000/svg" width="42" height="34" viewBox="0 0 42 34" fill="none">
        <path
          d="M1 17L8.08994 3.65422C8.95763 2.02092 10.656 1 12.5055 1H29.4945C31.344 1 33.0424 2.02093 33.9101 3.65422L41 17M1 17V29C1 31.2091 2.79086 33 5 33H37C39.2091 33 41 31.2091 41 29V17M1 17H13L17 23H25L28.5 17H41"
          stroke="#777E94"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      <div>Your active V3 liquidity positions will appear here.</div>
      {!isChainSupport && <SwitchNetworkButton chain={chain} style={{ width: '400px', height: 60 }} />}
    </StyledContainer>
  );
}
