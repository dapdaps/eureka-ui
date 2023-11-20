import { memo } from 'react';
import styled from 'styled-components';

const StyledWrap = styled.div`
  border: 1px solid #303030;
  background-color: #1b1b1b;
  border-radius: 16px;
  padding: 16px;
  margin-top: 14px;
  .title {
    font-size: 16px;
    color: #8e8e8e;
  }
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
  .w-full {
    width: 100%;
  }
`;
const StyledQuick = styled.div`
  margin-top: 14px;
  .v {
    font-size: 36px;
    color: #ffffff;
    font-weight: bold;
  }
  .gap-8 {
    gap: 8px;
  }
`;
const StyledItem = styled.div`
  width: 82px;
  height: 32px;
  border-radius: 6px;
  background-color: rgba(98, 221, 255, 0.1);
  font-size: 14px;
  color: #62ddff;
  cursor: pointer;
  &.active {
    border: 1px solid #62ddff;
  }
  @media (max-width: 768px) {
    width: 48px;
  }
`;
const StyledInputRange = styled.div`
  margin-top: 24px;
  input[type='range'] {
    display: block;
    width: 100%;
    appearance: none;
    -webkit-appearance: none;
    background: #62ddff;
    height: 2px;
    border-radius: 5px;
    margin: 0 auto;
    outline: none;
  }
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: #62ddff;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;
  }
`;
const PERCENTS = [25, 50, 75, 100];
const PoolRemoveAmount = ({ percent, setPercent }: any) => {
  return (
    <StyledWrap>
      <span className="title">Amount</span>
      <StyledQuick className="vchb">
        <span className="v">{percent}%</span>
        <div className="hvc gap-8">
          {PERCENTS.map((p) => {
            return (
              <StyledItem
                className="hvc"
                key={p}
                onClick={() => {
                  setPercent(p);
                }}
              >
                {p === 100 ? 'Max' : p + '%'}
              </StyledItem>
            );
          })}
        </div>
      </StyledQuick>
      <StyledInputRange>
        <input
          type="range"
          value={percent}
          onChange={(ev) => {
            setPercent(ev.target.value);
          }}
        />
      </StyledInputRange>
    </StyledWrap>
  );
};

export default memo(PoolRemoveAmount);
