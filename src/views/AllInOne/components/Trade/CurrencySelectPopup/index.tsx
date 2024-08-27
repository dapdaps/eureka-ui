import { useMemo, useState } from 'react';

import Loading from '@/components/Icons/Loading';
import Modal from '@/components/Modal';
import useTokensBalance from '@/hooks/useTokensBalance';
import { usePriceStore } from '@/stores/price';
import type { Token } from '@/types';
import { balanceFormated, valueFormated } from '@/utils/balance';

import {
  Content,
  CurrencyAmount,
  CurrencyIcon,
  CurrencyLabel,
  CurrencyList,
  CurrencyName,
  CurrencyRow,
  CurrencySymbol,
  Empty,
  Input,
  InputWarpper,
  StyledBalanceWrap,
  StyledRowR,
  StyledTokenNameWrapper,
} from './styles';

type Props = {
  tokens: Token[];
  display: boolean;
  currency?: Token;
  onClose: () => void;
  onSelect: (token: Token) => void;
};
const CurrencySelectPopup = ({ tokens, display, currency, onClose, onSelect }: Props) => {
  const prices = usePriceStore((store) => store.price);
  const [searchVal, setSearchVal] = useState('');
  const { loading, balances = {} } = useTokensBalance(tokens);

  const filterTokens = useMemo(() => {
    return tokens.filter((token: any) => {
      if (!searchVal) {
        return true;
      }
      return (
        token.address.toLowerCase() === searchVal?.toLowerCase() ||
        token.name.toLowerCase().includes(searchVal?.toLowerCase())
      );
    });
  }, [tokens, searchVal]);

  return (
    <Modal
      display={display}
      onClose={onClose}
      title="Select a token"
      width={462}
      content={
        <Content
          onClick={(ev) => {
            ev.stopPropagation();
          }}
        >
          <InputWarpper>
            <Input
              placeholder="Search name or paste address"
              onChange={(ev) => {
                setSearchVal(ev.target.value);
              }}
            />
          </InputWarpper>
          <CurrencyList>
            {filterTokens.map((token) => {
              const balance = balances[token.address];

              return (
                <CurrencyRow
                  key={token.address}
                  onClick={() => {
                    onSelect(token);
                  }}
                >
                  <CurrencyLabel>
                    <CurrencyIcon src={token.icon} />
                    <StyledTokenNameWrapper>
                      <CurrencyName>{token.name}</CurrencyName>
                      <CurrencySymbol>{token.symbol}</CurrencySymbol>
                    </StyledTokenNameWrapper>
                  </CurrencyLabel>
                  <StyledRowR>
                    {token.address === currency?.address && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
                        <path d="M1 5L6 10L15 1" stroke="var(--border-color)" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    )}
                    {loading ? (
                      <Loading />
                    ) : (
                      <StyledBalanceWrap>
                        <span className="balance">{balanceFormated(balance, 4)}</span>
                        <CurrencyAmount>
                          ${valueFormated(balance, prices[token.priceKey || token.symbol])}
                        </CurrencyAmount>
                      </StyledBalanceWrap>
                    )}
                  </StyledRowR>
                </CurrencyRow>
              );
            })}
            {!filterTokens.length && <Empty>No token.</Empty>}
          </CurrencyList>
        </Content>
      }
    />
  );
};

export default CurrencySelectPopup;
