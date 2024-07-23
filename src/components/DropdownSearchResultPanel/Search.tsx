import styled from 'styled-components';

import IconSearch from '@public/images/header/input-prefix.svg';
import IconClear from '@public/images/header/input-clear.svg';

import { useState } from 'react';

const StyleSearch = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #333648;
  color: #fff;
  position: relative;
  .nav-input {
    background: transparent;
    border: none;
    color: #fff;
    font-size: 16px;
    width: 100%;
    outline: none;
    line-height: 16px;
    &::placeholder {
      color: #5e617e;
      font-weight: 400;
      line-height: 16px;
    }
  }
`;

const InputCloseIcon = styled.div`
  position: absolute;
  cursor: pointer;
  right: 12px;
  top: -3px;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;
const Search = () => {
  const [searchContent, setSearchContent] = useState('');
  return (
    <StyleSearch>
      <IconSearch />
      <input
        type="text"
        placeholder="search for chain, dApp, campaign, or medal"
        value={searchContent}
        onChange={(e) => setSearchContent(e.target.value)}
        autoFocus
        className="nav-input"
      />
      <InputCloseIcon
        onClick={() => {
          setSearchContent('');
        }}
      >
        <IconClear />
      </InputCloseIcon>
    </StyleSearch>
  );
};

export default Search;
