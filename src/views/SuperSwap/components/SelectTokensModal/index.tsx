import { utils } from 'ethers';
import { useEffect, useState } from 'react';

import Loading from '@/components/Icons/Loading';
import Modal from '@/components/Modal';
import useTokenInfo from '@/hooks/useTokenInfo';
import useTokensBalance from '@/hooks/useTokensBalance';
import { usePriceStore } from '@/stores/price';
import type { Token } from '@/types';
import { balanceFormated, valueFormated } from '@/utils/balance';

import ImportWarning from '../ImportWarning';
import CurrencyImportRow from './CurrencyImportRow';
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
  StyledLoadingWrapper,
  StyledRowR,
  StyledTokenNameWrapper,
  Tab,
  Tabs
} from './styles';

type Props = {
  tokens: Token[];
  display: boolean;
  currency?: Token;
  loading: boolean;
  chainId?: number;
  onClose: () => void;
  onSelect: (token: Token) => void;
  onImport: (token: Token) => void;
};

const TABS = ['All', 'Imported'];

const SelectTokensModal = ({
  tokens,
  display,
  currency,
  loading: tokensLoading,
  chainId,
  onClose,
  onSelect,
  onImport
}: Props) => {
  const prices = usePriceStore((store) => store.price);
  const [tab, setTab] = useState('All');
  const [searchVal, setSearchVal] = useState('');
  const [currencies, setCurrencies] = useState<any>(tokens || []);
  const { loading, queryToken } = useTokenInfo();
  const [importToken, setImportToken] = useState<any>(null);
  const [showImportWarning, setShowImportWarning] = useState(false);
  const { loading: balancesLoading, balances = {}, queryBalance } = useTokensBalance(tokens);

  const handleSearch = () => {
    let tokenIsAvailable = false;
    const _tokens = tokens.filter((token: any) => {
      if (!searchVal) {
        return tab === 'All' ? true : token.isImport;
      }
      if (token.address.toLowerCase() === searchVal?.toLowerCase()) tokenIsAvailable = true;
      return (token.address.toLowerCase() === searchVal?.toLowerCase() ||
        token.name.toLowerCase().includes(searchVal.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchVal.toLowerCase())) &&
        tab === 'All'
        ? true
        : tab === 'Imported'
          ? token.isImport
          : false;
    });
    if (_tokens.length === 0 && utils.isAddress(searchVal) && !tokenIsAvailable) {
      setCurrencies([]);
      queryToken({
        chainId,
        address: searchVal,
        callback(token: any) {
          setImportToken({
            symbol: token[1][0],
            address: searchVal,
            decimals: token[2][0],
            name: token[0][0],
            chainId
          });
        }
      });
    } else {
      setCurrencies(_tokens);
      setImportToken(null);
    }
  };

  const handleClose = () => {
    setSearchVal('');
    onClose();
  };

  useEffect(() => {
    handleSearch();
  }, [tab, searchVal]);

  useEffect(() => {
    setCurrencies(tokens);
  }, [tokens]);

  useEffect(() => {
    if (display) queryBalance();
  }, [display]);

  return (
    <Modal
      display={display}
      onClose={handleClose}
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
          <>
            <Tabs>
              {TABS.map((_tab) => (
                <Tab
                  key={_tab}
                  className={tab === _tab ? 'active' : ''}
                  onClick={() => {
                    setTab(_tab);
                  }}
                >
                  {_tab}
                </Tab>
              ))}
            </Tabs>
            <CurrencyList>
              {(tokensLoading || loading) && (
                <StyledLoadingWrapper>
                  <Loading size={30} />
                </StyledLoadingWrapper>
              )}
              {importToken && (
                <CurrencyImportRow
                  currency={importToken}
                  onImport={() => {
                    setShowImportWarning(true);
                  }}
                />
              )}
              {currencies
                .sort((a: any, b: any) => {
                  const balanceA = balances[a.address];
                  const balanceB = balances[b.address];
                  return Number(balanceA) > Number(balanceB) ? -1 : 1;
                })
                .map((token: any) => {
                  const balance = balances[token.address];

                  return (
                    <CurrencyRow
                      key={token.address}
                      onClick={() => {
                        onSelect(token);
                        handleClose();
                      }}
                    >
                      <CurrencyLabel>
                        <CurrencyIcon src={token.icon || '/images/tokens/default_icon.png'} />
                        <StyledTokenNameWrapper>
                          <CurrencyName>{token.name}</CurrencyName>
                          <CurrencySymbol>{token.symbol}</CurrencySymbol>
                        </StyledTokenNameWrapper>
                      </CurrencyLabel>
                      <StyledRowR>
                        {token.address === currency?.address && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="12"
                            viewBox="0 0 16 12"
                            fill="none"
                          >
                            <path
                              d="M1 5L6 10L15 1"
                              stroke="var(--border-color)"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                        {balancesLoading ? (
                          <Loading />
                        ) : (
                          <StyledBalanceWrap>
                            <span className="balance">{balanceFormated(balance, 4)}</span>
                            <CurrencyAmount>
                              ${valueFormated(balance, prices[token.priceKey || token.symbol] || currency?.usd || '0')}
                            </CurrencyAmount>
                          </StyledBalanceWrap>
                        )}
                      </StyledRowR>
                    </CurrencyRow>
                  );
                })}
              {!currencies.length && !loading && !tokensLoading && !importToken && <Empty>No token.</Empty>}
            </CurrencyList>
          </>
          <ImportWarning
            display={showImportWarning}
            currency={importToken}
            onImport={(currency: any) => {
              onImport({ ...currency, chainId });
              onSelect?.(currency);
              handleClose();
            }}
            chainId={chainId}
            onClose={() => {
              setShowImportWarning(false);
            }}
          />
        </Content>
      }
    />
  );
};

export default SelectTokensModal;
