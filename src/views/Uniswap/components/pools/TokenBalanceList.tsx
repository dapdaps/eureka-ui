import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { utils } from 'ethers';
import { balanceFormated } from '@/utils/balance';
import Loading from '@/components/Icons/Loading';
import TokenIcon from '../TokenIcon';
import { copyText } from '@/utils/copy';
import { TickIcon, CopyIcon } from './Icons';
import ImportTokenModal from './ImportTokenModal';
import useImportToken from '../../hooks/useImportToken';
import useTokensBalance from '../../hooks/useTokensBalance';

const StyledWrap = styled.div`
  .vchb {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .hvc {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hv {
    display: flex;
    align-items: center;
  }
  .w-full {
    width: 100%;
  }
  .hidden {
    display: none;
  }
`;
const StyledHeadTab = styled.div`
  padding: 12px 24px;
  border-bottom: 1px solid #e7e7e7;
  margin: 0 -24px;
  gap: 44px;
  .tabItem {
    font-size: 14px;
    color: #a49b9a;
    cursor: pointer;
  }
  .active {
    color: #101010;
  }
  @media (max-width: 768px) {
    border-bottom: 1px solid #343838;
  }
`;
const StyledList = styled.div`
  margin: 0 -24px;
  height: calc(80vh - 282px);
  overflow-y: auto;
`;
const LoadingWrapper = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #101010;
`;
const Empty = styled.div`
  min-height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 18px;
  color: #101010;
`;
type ITab = 'all' | 'import';

const TokenBalanceList = (props: any) => {
  const { loading: balanceLoading, balances } = useTokensBalance(props.tokens, 1);
  const [tokens, setTokens] = useState<any>([]);
  const [selected, setSelected] = useState<ITab>('all');
  const { loading, token: importToken, getImportToken } = useImportToken();
  function switchTab(tab: ITab) {
    setSelected(tab);
  }
  const handleSearch = ({ tab, searchVal }: any) => {
    const propsTokens = Object.values(props.tokens || {});
    const _tokens = propsTokens.filter((token: any) => {
      if (!searchVal) {
        return tab === 'all' ? true : token.isImport;
      }
      return (token.address.toLowerCase() === searchVal?.toLowerCase() ||
        token.name.toLowerCase().includes(searchVal?.toLowerCase())) &&
        tab === 'all'
        ? true
        : tab === 'import'
        ? token.isImport
        : false;
    });
    setTokens(_tokens);
    if (utils.isAddress(searchVal)) {
      getImportToken(searchVal);
    }
  };
  useEffect(() => {
    handleSearch({ tab: selected, searchVal: props.searchVal });
  }, [props.searchVal, selected]);

  return (
    <StyledWrap>
      <StyledHeadTab className="hv">
        <span
          className={`tabItem ${selected == 'all' ? 'active' : ''}`}
          onClick={() => {
            switchTab('all');
          }}
        >
          All
        </span>
        <span
          className={`tabItem ${selected == 'import' ? 'active' : ''}`}
          onClick={() => {
            switchTab('import');
          }}
        >
          Imported
        </span>
      </StyledHeadTab>
      <StyledList>
        {loading ? (
          <LoadingWrapper>
            <Loading size={30} />
          </LoadingWrapper>
        ) : tokens.length ? (
          <div className={selected == 'all' ? '' : 'hidden'}>
            {tokens.map((token: any) => {
              return (
                <TokenRow
                  key={token.address}
                  {...token}
                  loading={balanceLoading}
                  balance={balances[token.address]}
                  isSelected={token.address === props.selectedAddress}
                  onClick={() => {
                    props.onSelectToken(token);
                  }}
                />
              );
            })}
          </div>
        ) : importToken ? (
          <ImportTokenRow token={importToken} onImportTokenCb={props.onImportTokenCb} />
        ) : (
          <Empty>No token.</Empty>
        )}
      </StyledList>
    </StyledWrap>
  );
};

const StyledRow = styled.div`
  height: 67px;
  padding: 0 24px;
  cursor: pointer;
  &:hover {
    background-color: #eeeeee;
  }
  .L {
    gap: 12px;
  }
  .R {
    gap: 10px;
  }
  img {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border-radius: 100px;
  }
  .name_wrapper {
    display: flex;
    flex-direction: column;
    .name {
      font-size: 16px;
      color: #101010;
      font-weight: bold;
    }
    .symbol {
      font-size: 12px;
      color: #8e8e8e;
      display: flex;
      gap: 4px;
      align-items: center;
    }
  }
  .balance {
    font-size: 14px;
    color: #8e8e8e;
  }
`;
const TokenRow = ({ symbol, name, address, balance, icon, loading, isSelected, onClick }: any) => {
  return (
    <StyledRow className="vchb" onClick={onClick}>
      <div className="hvc L">
        <TokenIcon token={{ symbol, address, icon }} />
        <div className="name_wrapper">
          <div className="name">{name}</div>
          <div className="symbol">
            <span>{symbol}</span>
            {address !== 'native' && (
              <>
                <span>{address.slice(0, 9) + '...' + address.slice(-7)}</span>
                <CopyIcon
                  onClick={() => {
                    copyText(address);
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="hvc R">
        <span className="balance">{loading ? <Loading /> : balanceFormated(balance?.toString(), 4)}</span>
        <TickIcon className={!isSelected && 'hidden'} />
      </div>
    </StyledRow>
  );
};
const StyledImportRow = styled(StyledRow)`
  cursor: default;
  .importButton {
    height: 36px;
    cursor: pointer;
    padding: 0 24px;
    font-size: 16px;
    color: #ffffff;
    font-weight: 600;
    background-color: #101010;
    border-radius: 6px;
  }
`;
const ImportTokenRow = ({ token, onImportTokenCb }: any) => {
  const { symbol, name, icon } = token;

  const [open, setOpen] = useState<boolean>(false);
  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }
  return (
    <StyledImportRow className="vchb">
      <div className="hvc L">
        <TokenIcon token={token} />
        <div className="name_wrapper">
          <span className="name">{name}</span>
          <span className="symbol">{symbol}</span>
        </div>
      </div>
      <div className="importButton hvc" onClick={openModal}>
        Import
      </div>
      <ImportTokenModal
        isOpen={open}
        importToken={token}
        onRequestClose={closeModal}
        onImportTokenCb={() => {
          closeModal();
          onImportTokenCb(token);
        }}
      />
    </StyledImportRow>
  );
};

export default memo(TokenBalanceList);
