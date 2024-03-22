import { memo } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div<{ $active: boolean }>`
  width: 36px;
  height: 36px;
  border: 1px solid ${({ $active }) => ($active ? 'transparent' : '#979ABE')};
  border-radius: 50%;
  color: ${({ $active }) => ($active ? '#fff' : '#979ABE')};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-shrink: 0;
`;

const StyledBg = styled.div<{ $active: boolean; $loading: boolean }>`
  background-color: ${({ $active }) => ($active ? 'rgba(151, 154, 190, 0.2)' : 'transparent')};
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform-origin: center center;
  ${({ $loading }) => $loading && `animation: loading 1s linear infinite;`}
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const StyledIcon = styled.div`
  position: relative;
  z-index: 5;
`;

const StyledLoading = styled.div`
  position: absolute;
  z-index: 2;
  top: 0px;
  right: 0px;
`;

const StyledLabel = styled.div<{ $active: boolean }>`
  color: ${({ $active }) => ($active ? '#fff' : '#979ABE')};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: absolute;
  bottom: -20px;
`;

const ProcessIcon = ({ active, loading, icon, label }: any) => {
  return (
    <StyledContainer $active={active}>
      <StyledBg $active={active} $loading={loading}>
        {loading && (
          <StyledLoading>
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
              <path d="M18 19C18 9.05888 9.94113 1 0 1" stroke="#FCC42C" stroke-width="2" />
            </svg>
          </StyledLoading>
        )}
      </StyledBg>

      <StyledIcon>{icon}</StyledIcon>
      <StyledLabel $active={active}>{label}</StyledLabel>
    </StyledContainer>
  );
};

export default memo(ProcessIcon);
