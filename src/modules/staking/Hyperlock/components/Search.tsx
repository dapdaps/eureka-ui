// @ts-nocheck
import { memo } from 'react';
import styled from 'styled-components';

import { useMultiState } from '@/modules/hooks';
const Search = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  background-color: var(--bg-1);
  height: 36px;
  border: 1px solid #373a53;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  gap: 6px;
`;
const Input = styled.input`
  font-size: 16px;
  color: #fff;
  font-weight: 500;
  outline: none;
  border: none;
  vertical-align: bottom;
  padding: 4px 10px 4px 0px;
  width: 150px;

  &::placeholder {
    color: rgba(151, 154, 190, 0.5);
  }
`;

export default memo(function Search(props) {
  const [state, updateState] = useMultiState({});
  const debounce = (fn, wait) => {
    let timer;
    return (args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(args);
      }, wait);
    };
  };
  const debouncedOnChange = debounce?.(props.onChange, 500);

  return (
    <Search>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="15"
        viewBox="0 0 21 15"
        fill="none"
        class="search-icon"
      >
        <circle cx="7.01829" cy="7.01829" r="6.01829" stroke="rgba(151, 154, 190, 0.7)" strokeWidth="2"></circle>
        <rect
          x="14.9138"
          y="9.64978"
          width="6.141"
          height="2.63186"
          rx="1.31593"
          transform="rotate(30 14.9138 9.64978)"
          fill="rgba(151, 154, 190, 0.7)"
        ></rect>
      </svg>
      <Input
        placeholder="Token Symbol"
        disabled={props.disabled}
        onChange={(ev) => {
          debouncedOnChange(ev.target.value);
        }}
      />
    </Search>
  );
});
