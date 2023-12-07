import { memo, useState } from 'react';
import styled from 'styled-components';

import useTokens from '../../hooks/useTokens';
import HistoryTokens from './HistoryTokens';
import { CloseIcon, GlassIcon } from './Icons';
import Modal from '@/components/ModalBox';
import TokenBalanceList from './TokenBalanceList';

const StyledContent = styled.div`
  width: 460px;
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
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const StyledHead = styled.div`
  .title {
    font-size: 20px;
    color: #101010;
    font-weight: 700;
  }
  svg {
    cursor: pointer;
  }
`;
const StyledBody = styled.div`
  margin-top: 16px;
  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 16px;
    background-color: #1b1b1b;
    padding: 18px;
    gap: 20px;
    img {
      width: 22px;
      height: 22px;
      border-radius: 100px;
      margin-right: 7px;
    }
    .symbol {
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
    }
    .balance {
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
    }
  }
`;
const StyledSearch = styled.div`
  margin-top: 18px;
  height: 44px;
  border: 1px solid #101010;
  border-radius: 12px;
  padding: 0 15px;
  gap: 8px;
  input {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    font-size: 14px;
    color: #101010;
  }
`;
const SelectTokenModal = (props: any) => {
  const { isOpen, onRequestClose, onSelectToken } = props;
  const { tokens, stableTokens } = useTokens();
  const [showHistory, setShowHistory] = useState(true);
  const [searchVal, setSearchVal] = useState('');

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} height="80vh">
      <StyledContent>
        <StyledHead className="vchb">
          <span className="title">Select a token</span>
          <CloseIcon onClick={onRequestClose} />
        </StyledHead>
        <StyledBody>
          <StyledSearch className="hv">
            <GlassIcon />
            <input
              value={searchVal}
              onChange={(ev) => {
                setSearchVal(ev.target.value);
              }}
              type="text"
              placeholder="Seach name or paste address"
            />
          </StyledSearch>
          {showHistory && <HistoryTokens tokens={stableTokens || []} onSelectToken={onSelectToken} />}
          <TokenBalanceList
            tokens={tokens}
            searchVal={searchVal}
            onHideHistory={() => {
              setShowHistory(false);
            }}
            onImportTokenCb={(token: any) => {
              onRequestClose();
              onSelectToken(token);
            }}
            onSelectToken={onSelectToken}
          />
        </StyledBody>
      </StyledContent>
    </Modal>
  );
};

export default memo(SelectTokenModal);
