import { memo } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin: 14px 12px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: #1b1e27;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StyledInputWrapper = styled.div`
  flex-grow: 1;
`;

const StyledInput = styled.input`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  width: 100%;

  &::placeholder {
    opacity: 0.2;
  }
`;

const SearchInput = ({ value, onChange }: any) => {
  return (
    <StyledContainer>
      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="15" viewBox="0 0 21 15" fill="none">
        <circle cx="7.01829" cy="7.01829" r="6.01829" stroke="#3D4159" stroke-width="2" />
        <rect
          x="14.9141"
          y="9.64941"
          width="6.141"
          height="2.63186"
          rx="1.31593"
          transform="rotate(30 14.9141 9.64941)"
          fill="#3D4159"
        />
      </svg>
      <StyledInputWrapper>
        <StyledInput
          placeholder="search token or paste address"
          value={value}
          onChange={(ev) => {
            onChange(ev.target.value);
          }}
        />
      </StyledInputWrapper>
    </StyledContainer>
  );
};

export default memo(SearchInput);
