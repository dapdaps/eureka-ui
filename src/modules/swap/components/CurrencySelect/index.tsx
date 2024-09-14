import { utils } from 'ethers';
import { useEffect, useState } from 'react';

import Loading from '@/components/Icons/Loading';
import Modal from '@/components/Modal';
import useTokenInfo from '@/hooks/useTokenInfo';
import useTokensBalance from '@/hooks/useTokensBalance';

import ImportWarning from '../ImportWarning';
import CurrencyImportRow from './CurrencyImportRow';
import CurrencyRow from './CurrencyRow';
import { Content, CurrencyList, Empty, IconBox, Input, InputWarpper, LoadingWrapper, Tab, Tabs } from './styles';

const TABS = ['All', 'Imported'];

export default function CurrencySelect({
  display,
  tokens,
  chainId,
  chainIdNotSupport,
  account,
  explor,
  onImport,
  onClose,
  onSelect,
  selectedTokenAddress
}: any) {
  const [tab, setTab] = useState('All');
  const [searchVal, setSearchVal] = useState('');
  const [currencies, setCurrencies] = useState<any>(tokens || []);
  const { loading, queryToken } = useTokenInfo();
  const [importToken, setImportToken] = useState(null);
  const [showImportWarning, setShowImportWarning] = useState(false);
  const { loading: balancesLoading, balances = {} } = useTokensBalance(tokens);

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
          console.log('token', token);
        }
      });
    } else {
      setCurrencies(_tokens);
      setImportToken(null);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [tab]);

  useEffect(() => {
    setCurrencies(tokens);
  }, [tokens]);

  return (
    <Modal
      display={display}
      title="Select a token"
      onClose={onClose}
      content={
        <Content>
          <InputWarpper>
            {!searchVal && (
              <IconBox>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="15" viewBox="0 0 21 15" fill="none">
                  <circle cx="7.01829" cy="7.01829" r="6.01829" stroke="#3D4159" strokeWidth="2" />
                  <rect
                    x="14.9141"
                    y="9.6499"
                    width="6.141"
                    height="2.63186"
                    rx="1.31593"
                    transform="rotate(30 14.9141 9.6499)"
                    fill="#3D4159"
                  />
                </svg>
              </IconBox>
            )}
            <Input
              placeholder="Search name or paste address"
              onChange={(ev) => {
                setSearchVal(ev.target.value);
                handleSearch();
              }}
            />
            {searchVal && (
              <IconBox
                onClick={() => {
                  handleSearch();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="#303142" />
                  <path
                    d="M13.444 12L16.7799 8.66415C17.0307 8.41332 17.0735 8.0494 16.8756 7.85157L16.1482 7.12424C15.9503 6.92632 15.5869 6.96974 15.3356 7.22041L12.0001 10.5561L8.66433 7.22049C8.41349 6.96941 8.04957 6.92632 7.85165 7.12449L7.12431 7.8519C6.92648 8.04949 6.96931 8.4134 7.22048 8.66423L10.5563 12L7.22048 15.336C6.96973 15.5866 6.92631 15.9503 7.12431 16.1482L7.85165 16.8756C8.04957 17.0735 8.41349 17.0306 8.66433 16.7799L12.0003 13.4439L15.3357 16.7794C15.587 17.0307 15.9504 17.0735 16.1483 16.8756L16.8757 16.1482C17.0735 15.9503 17.0307 15.5866 16.78 15.3356L13.444 12Z"
                    fill="#979ABE"
                  />
                </svg>
              </IconBox>
            )}
          </InputWarpper>
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
            {loading && (
              <LoadingWrapper>
                <Loading size={30} />
              </LoadingWrapper>
            )}
            {importToken && (
              <CurrencyImportRow
                currency={importToken}
                onImport={() => {
                  setShowImportWarning(true);
                }}
              />
            )}
            {currencies?.map((currency: any) => (
              <CurrencyRow
                key={currency.address}
                selectedTokenAddress={selectedTokenAddress}
                currency={currency}
                display={display}
                chainIdNotSupport={chainIdNotSupport}
                account={account}
                onClick={() => {
                  onSelect?.(currency);
                  onClose();
                }}
                loading={balancesLoading}
                balance={balances[currency.address]}
              />
            ))}
            {(!currencies || !currencies?.length) && !loading && !importToken && <Empty>No token.</Empty>}
          </CurrencyList>
          <ImportWarning
            display={showImportWarning}
            currency={importToken}
            onImport={(currency: any) => {
              onImport({ ...currency, chainId });
              onSelect?.(currency);
              onClose();
            }}
            explor={explor}
            onClose={() => {
              setShowImportWarning(false);
            }}
          />
        </Content>
      }
    />
  );
}
