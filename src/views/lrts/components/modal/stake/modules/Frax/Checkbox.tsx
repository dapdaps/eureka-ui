import { memo } from 'react';
import styled from 'styled-components';

const StyledCheckbox = styled.div<{ checked: boolean; disabled?: boolean; }>`
  width: 22px;
  height: 22px;
  cursor: pointer;
  border-radius: 4px;
  position: relative;
  &::after {
    position: absolute;
    top: 0;
    color: #000;
    width: 100%;
    height: 100%;
    display: inline-block;
    visibility: visible;
    padding-left: 0px;
    text-align: center;
    content: '';
    border-radius: 4px;
    background-color: rgb(55, 58, 64);
  }
  ${({ checked }) =>
    checked &&
    ` &::after {
    content: '\\2713';
    color: #000;
    font-size: 14px;
    line-height: 22px;
    font-weight: bold;
    background-color: #fff;
    border-radius: 4px;
       width: 22px;
    height: 22px;
    text-align: center;
    vertical-align: middle;
  }`}
`;

const Checkbox = ({ checked, onClick }: { checked: boolean; onClick?: () => void }) => {
  return <StyledCheckbox checked={checked} onClick={onClick} />;
};

export default memo(Checkbox);
