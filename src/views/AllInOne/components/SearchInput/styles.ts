import styled from "styled-components";

export const StyledSearch = styled.div<{ width?: string }>`
  position: relative;
  height: 40px;
  line-height: 38px;
  border: 1px solid #373A53;
  background: #212330;
  border-radius: 8px;
  padding: 0 20px 0 41px;
  width: ${({ width }) => width};
`;
export const StyledSearchIcon = styled.div`
  position: absolute;
  z-index: 1;
  left: 13px;
  top: 50%;
  transform: translateY(-50%);
`;
export const StyledSearchInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: #979ABE;
  font-weight: 400;
`;