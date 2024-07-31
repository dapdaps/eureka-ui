import styled from 'styled-components';

import IconSearch from '@public/images/header/input-prefix.svg';
import IconClear from '@public/images/header/input-clear.svg';

import { useCallback, useState } from 'react';
import { useDebounceFn } from 'ahooks';
import { useRecentStore } from './hooks/useRecentStore';

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
  const { currentSearch, setSearch, addRecentSearch } = useRecentStore();

  const { run: handleSearch } = useDebounceFn(
    (query: string) => {
      if (query.length > 0) {
        // wait api
      }
    },
    { wait: 300 }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    handleSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (currentSearch.trim().length > 0) {
        addRecentSearch(currentSearch.trim());
        handleSearch(currentSearch);
      }
    }
  };

  return (
    <StyleSearch>
      <IconSearch />
      <input
        type="text"
        maxLength={50}
        placeholder="search for chain, dApp, campaign, or medal"
        value={currentSearch}
        onKeyDown={handleKeyDown}
        onBlur={() => currentSearch.trim().length > 0 && addRecentSearch(currentSearch.trim())}
        onChange={handleChange}
        autoFocus
        className="nav-input"
      />
      <InputCloseIcon
        onClick={() => {
          setSearch('');
        }}
      >
        <IconClear />
      </InputCloseIcon>
    </StyleSearch>
  );
};

export default Search;
