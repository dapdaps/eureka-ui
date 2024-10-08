import { memo } from 'react';

import AddMetaMask from '@/views/ChainDetail/components/AddMetaMask';

import ColorBg from './ColorBg';
import {
  StyledBg,
  StyledButton,
  StyledChainLogo,
  StyledChainLogoWrapper,
  StyledChainName,
  StyledColorBg,
  StyledContainer,
  StyledContent,
  StyledInput,
  StyledInputWrapper,
  StyledMetaMaskWrapper,
  StyledSearchWrapper,
  StyledTitleWrapper,
} from './styles';

const Top = ({ chain }: any) => {
  return (
    <StyledContainer>
      <StyledBg />
      <StyledColorBg style={{ color: chain.selectBgColor }}>
        <ColorBg />
      </StyledColorBg>
      <StyledContent>
        <StyledTitleWrapper>
          <StyledChainLogoWrapper style={{ backgroundColor: chain.bgColor }}>
            <StyledChainLogo src={chain.icon} />
          </StyledChainLogoWrapper>
          <StyledChainName>{chain?.title}</StyledChainName>
          <StyledMetaMaskWrapper>
            <AddMetaMask chainId={chain?.chainId} />
          </StyledMetaMaskWrapper>
        </StyledTitleWrapper>
        {/* <StyledSearchWrapper>
          <StyledInputWrapper>
            <StyledInput placeholder="e.g. Swap 100 USDC" />
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="15" viewBox="0 0 21 15" fill="none">
              <circle cx="7.01829" cy="7.01829" r="6.01829" stroke="#EBF479" strokeWidth="2" />
              <rect
                x="14.9138"
                y="9.6499"
                width="6.141"
                height="2.63186"
                rx="1.31593"
                transform="rotate(30 14.9138 9.6499)"
                fill="#EBF479"
              />
            </svg>
          </StyledInputWrapper>
          <StyledButton>Execute</StyledButton>
        </StyledSearchWrapper> */}
      </StyledContent>
    </StyledContainer>
  );
};

export default memo(Top);
