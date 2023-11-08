import { memo, useState } from 'react';
import styled from 'styled-components';

import SelectTokenModal from './SelectTokenModal';
import { DEFAULT_TOKEN_ICON } from '@/config/uniswap/linea';

const StyledContainer = styled.div`
  flex-grow: 1;
`;
const StyledEmptyBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 45px;
  border-radius: 16px;
  background-color: #5ee0ff;
  padding: 5px 14px;
  font-size: 16px;
  color: #1b1b1b;
  font-weight: 600;
  cursor: pointer;
`;

const StyledContentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 45px;
  border-radius: 16px;
  border: 1px solid #3d363d;
  padding: 5px 14px;
  font-size: 16px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  .tokenInfo {
    display: flex;
    align-items: center;
    gap: 8px;
    img {
      width: 22px;
      height: 22px;
      border-radius: 100px;
    }
    .tokeName {
      font-size: 20px;
      color: #fff;
      font-weight: bold;
    }
  }
`;
const SelectToken = ({ onSelectToken, token }: any) => {
  const [open, setOpen] = useState(false);
  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }
  return (
    <StyledContainer>
      {!!token ? (
        <StyledContentBox onClick={openModal}>
          <div className="tokenInfo">
            <img src={token.icon || DEFAULT_TOKEN_ICON} />
            <span className="tokeName">{token.symbol}</span>
          </div>
          <ArrowDown />
        </StyledContentBox>
      ) : (
        <StyledEmptyBox onClick={openModal}>
          <span>Select a token</span>
          <ArrowDown />
        </StyledEmptyBox>
      )}
      <SelectTokenModal
        isOpen={open}
        onRequestClose={closeModal}
        onSelectToken={(token: any) => {
          onSelectToken(token);
          closeModal();
        }}
      />
    </StyledContainer>
  );
};

function ArrowDown(props: any) {
  return (
    <svg {...props} width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L5.5 5.5L10 1" stroke="currentColor" stroke-width="2" />
    </svg>
  );
}

export default memo(SelectToken);
