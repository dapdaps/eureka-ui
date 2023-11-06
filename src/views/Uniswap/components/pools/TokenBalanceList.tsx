import { memo, useState } from 'react';
import styled from 'styled-components';

import { TickIcon } from './Icons';
import ImportTokenModal from './ImportTokenModal';

const StyledWrap = styled.div`
  margin-top: 24px;
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
  border-bottom: 1px solid #242424;
  margin: 0 -24px;
  gap: 44px;
  .tabItem {
    font-size: 14px;
    color: #8e8e8e;
    cursor: pointer;
  }
  .active {
    color: #fff;
  }
`;
const StyledList = styled.div`
  margin: 0 -24px;
  height: 380px;
  overflow: auto;
`;
type ITab = 'all' | 'import';

const TokenBalanceList = () => {
  const balanceList = [
    { symbol: 'Ether', address: 'ETH', balance: '0.0245' },
    { symbol: 'Wrapped Ether', address: 'WETH', balance: '0.0245' },
    { symbol: '1inch', address: '1INCH', balance: '0.0245' },
    { symbol: 'Aave', address: 'AAVE', balance: '0.0245' },
    { symbol: 'Arcblock', address: 'WETH', balance: '0.0245' },
    { symbol: 'Alchemy Pay', address: 'ACH', balance: '0.0245' },
    { symbol: 'Ambire AdEx', address: 'ADX', balance: '0.0245' },
    { symbol: 'Wrapped Ether', address: 'WETH', balance: '0.0245' },
    { symbol: 'Wrapped Ether', address: 'WETH', balance: '0.0245' },
    { symbol: 'Wrapped Ether', address: 'WETH', balance: '0.0245' },
  ];
  const importList = [{ symbol: 'DeFiChain', address: 'DFI' }];
  const [selected, setSelected] = useState<ITab>('all');
  function switchTab(tab: ITab) {
    setSelected(tab);
  }
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
        <div className={selected == 'all' ? '' : 'hidden'}>
          {balanceList.map(({ symbol, address, balance }) => {
            return <TokenRow key={address} symbol={symbol} address={address} balance={balance} />;
          })}
        </div>
        <div className={selected == 'all' ? 'hidden' : ''}>
          {importList.map(({ symbol, address }) => {
            return <ImportTokenRow key={address} symbol={symbol} address={address} />;
          })}
        </div>
      </StyledList>
    </StyledWrap>
  );
};

const StyledRow = styled.div`
  height: 67px;
  padding: 0 24px;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
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
  .symbol {
    display: flex;
    flex-direction: column;
    .name {
      font-size: 16px;
      color: #fff;
      font-weight: bold;
    }
    .address {
      font-size: 12px;
      color: #8e8e8e;
    }
  }
  .balance {
    font-size: 14px;
    color: #fff;
  }
`;
const TokenRow = ({ symbol, address, balance }: { symbol: string; address: string; balance: string }) => {
  return (
    <StyledRow className="vchb">
      <div className="hvc L">
        <img src="" />
        <div className="symbol">
          <span className="name">{symbol}</span>
          <span className="address">{address}</span>
        </div>
      </div>
      <div className="hvc R">
        <span className="balance">{balance}</span>
        <TickIcon className="hidden" />
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
    color: #131313;
    font-weight: 600;
    background-color: #5ee0ff;
    border-radius: 18px;
  }
`;
const ImportTokenRow = ({ symbol, address }: { symbol: string; address: string }) => {
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
        <img src="" />
        <div className="symbol">
          <span className="name">{symbol}</span>
          <span className="address">{address}</span>
        </div>
      </div>
      <div className="importButton hvc" onClick={openModal}>
        Import
      </div>
      <ImportTokenModal isOpen={open} onRequestClose={closeModal} />
    </StyledImportRow>
  );
};

export default memo(TokenBalanceList);
