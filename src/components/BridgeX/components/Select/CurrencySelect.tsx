import Big from 'big.js'
import { useEffect, useState } from 'react'
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';

import { ArrowDown, ArrowUp } from '../Arrows'
import CloseIcon from './CloseIcon';
import CurrencyRow from './CurrencyRow';

const Dialog = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: none;
  z-index: 11;

  &.display {
    display: block;
  }
`;

const SearchIcon = (
  <svg
    width="17"
    height="15"
    viewBox="0 0 17 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="7" cy="7" r="6.5" stroke="#8E8E8E" />
    <path
      d="M15.7 14.4C15.9209 14.5657 16.2343 14.5209 16.4 14.3C16.5657 14.0791 16.5209 13.7657 16.3 13.6L15.7 14.4ZM11.7 11.4L15.7 14.4L16.3 13.6L12.3 10.6L11.7 11.4Z"
      fill="#8E8E8E"
    />
  </svg>
);

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: rgba(255, 255, 255, 0.1); */
  /* backdrop-filter: blur(10px); */
  position: absolute;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 900px) {
    align-items: flex-end;
  }
`;

const Content = styled.div`
  width: 460px;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  background-color: #181a27;
  @media (max-width: 900px) {
    width: 100%;
    border-radius: 16px 16px 0px 0px;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 30px 30px 0px 30px;
`;
const InputWarpper = styled.div`
  height: 46px;
  border-bottom: 1px solid #332c4b;
  padding: 10px;
  gap: 12px;
  margin: 10px 25px 25px 30px;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
`;

const Input = styled.input`
  font-size: 16px;
  color: #fff;
  font-weight: 500;
  width: 100%;
  background-color: transparent;
  outline: none;
  border: none;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
`;
const CurrencyList = styled.div`
  padding: 0px 30px 20px;
  max-height: calc(60vh - 120px);
  overflow-x: auto;

  @media (max-width: 900px) {
    max-height: 50vh;
  }
`;
const Empty = styled.div`
  min-height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 18px;
  color: #fff;
`;


export default function CurrencySelect({ title, currentChain, tokens, display, onClose, selectedTokenAddress, onSelect }: any) {
  const [_tokens, setTokens] = useState(tokens)

  const handleSearch = (e: any) => {
    setTokens(e.target.value
      ? tokens.filter((token: any) => {
        return (
          token.address === e.target.value ||
          token.name.toLowerCase().includes(e.target.value?.toLowerCase())
        );
      })
      : tokens)
  };

  return (
    <Dialog className={display ? "display" : ""}>
      <Overlay>
        <Content>
          <Header>
            <Title>Select a token</Title>
            <CloseIcon onClose={onClose} />
          </Header>
          <InputWarpper>
            <Input
              placeholder="Search name or paste address"
              onChange={handleSearch}
            />
          </InputWarpper>
          <CurrencyList>
            {_tokens.map((currency: any) => (
              <CurrencyRow
                selectedTokenAddress={selectedTokenAddress}
                currency={currency}
                display={display}
                currentChain={currentChain}
                onClick={() => {
                  onSelect?.(currency)
                  onClose()
                }}
                key={currency.address}
              />
            ))}
            {(!tokens || !tokens.length) && <Empty>No token.</Empty>}
          </CurrencyList>
        </Content>
      </Overlay>
    </Dialog>
  );
}


