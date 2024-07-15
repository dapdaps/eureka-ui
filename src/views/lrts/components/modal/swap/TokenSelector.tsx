import { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { container } from '@/components/animation';
import { StyleTokenIcon, StyledTokenSymbol } from './InputCurrency';

const StyledTokenSelector = styled.div`
  height: 44px;
  border-radius: 4px;
  border: 1px solid #3f3f3f;
  display: flex;
  align-items: center;
  padding-left: 10px;
  cursor: pointer;
  transition: 0.5s;
  position: relative;
`;
const StyledDownIcon = styled.div`
  padding: 0px 10px;
  transition: 0.5s;
  transform: rotate(0deg);

  &.up {
    transform: rotate(-180deg);
  }
`;
const StyledMenuWrapper = styled(motion.div)`
  padding-top: 4px;
  position: absolute;
  top: 44px;
  left: 0px;
  z-index: 20;
`;
const StyledMenu = styled.div`
  border-radius: 4px;
  border: 1px solid #3f3f3f;
  background: #414141;
  width: 140px;
`;
const StyledMenuItem = styled.div`
  height: 44px;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    background: #373737;
  }
`;
const StyledMenuToken = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const StyledMenuTokenIcon = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;
const StyledMenuTokenSymbol = styled.div`
  color: #fff;
  font-size: 14px;
`;

export default function TokenSelector({ currency, tokens, onSelect }: any) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <StyledTokenSelector
      onClick={() => {
        setShowMenu(!showMenu);
      }}
    >
      <StyleTokenIcon src={currency.tokenIcon || '/images/tokens/default_icon.png'} />
      <StyledTokenSymbol>{currency.symbol}</StyledTokenSymbol>
      <StyledDownIcon>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
          <path
            d="M5.78087 6.52391C5.38055 7.02432 4.61946 7.02432 4.21913 6.52391L0.299758 1.6247C-0.224053 0.969932 0.242119 -9.40484e-07 1.08063 -8.67179e-07L8.91938 -1.81894e-07C9.75788 -1.08589e-07 10.2241 0.969932 9.70024 1.62469L5.78087 6.52391Z"
            fill="white"
          />
        </svg>
      </StyledDownIcon>
      {showMenu && (
        <StyledMenuWrapper {...container}>
          <StyledMenu>
            {tokens.map((token: any, index: number) => (
              <StyledMenuItem
                key={index}
                onClick={() => {
                  onSelect(token);
                }}
                key={token.address}
              >
                <StyledMenuToken key={token.address}>
                  <StyledMenuTokenIcon src={token.tokenIcon || '/images/tokens/default_icon.png'} />
                  <StyledMenuTokenSymbol>{token.symbol}</StyledMenuTokenSymbol>
                </StyledMenuToken>
                {currency.address === token.address && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="9" viewBox="0 0 13 9" fill="none">
                    <path d="M1.5 4L5 7.5L11.5 1" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
              </StyledMenuItem>
            ))}
          </StyledMenu>
        </StyledMenuWrapper>
      )}
    </StyledTokenSelector>
  );
}
