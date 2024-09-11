import styled from 'styled-components';

export const Process = styled.div`
  position: relative;
  width: 100%;
`;
export const ActiveBar = styled.div`
  height: 5px;
  border-radius: 10px;
  background-color: var(--supply-color);
  position: absolute;
  left: 0px;
  top: 12px;
`;
export const Range = styled.input`
  -webkit-appearance: none;
  width: 100%;
  background-color: transparent;
  position: relative;
  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 5px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.3);
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #fff;
    border: 2px solid #181a27;
    margin-top: -7px;
  }
`;
export const Percent = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const PercentItem = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #979abe;
  cursor: pointer;
`;
