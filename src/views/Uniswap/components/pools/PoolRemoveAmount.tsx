import { memo } from 'react';
import styled from 'styled-components';

const StyledWrap = styled.div`
  background-color: #fff0dd;
  border-radius: 16px;
  padding: 16px;
  margin-top: 14px;
  .title {
    font-size: 16px;
    color: #101010;
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
    color: #101010;
    font-weight: bold;

    @media (max-width: 720px) {
      font-size: 30px;
    }
  }
  .gap-8 {
    gap: 8px;
  }
`;
const StyledItem = styled.div`
  width: 82px;
  height: 32px;
  border-radius: 6px;
  background-color: rgba(16, 16, 16, 0.1);
  font-size: 14px;
  color: #101010;
  cursor: pointer;
  &.active {
    border: 1px solid #000000;
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
    background: #a49b9a;
    height: 2px;
    border-radius: 5px;
    margin: 0 auto;
    outline: none;
  }
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: #101010;
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
                className={`hvc ${p === percent && 'active'}`}
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
