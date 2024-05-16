import { memo } from 'react';
import styled from 'styled-components';

const StyledWrap = styled.div`
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.5);
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
  background-color: #1e2026;
  font-size: 14px;
  color: #777e94;
  cursor: pointer;
  border: 1px solid #313540;
  &.active {
    border: 1px solid #777e94;
    color: #ffffff;
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
    background: var(--primary-color);
    height: 2px;
    border-radius: 5px;
    margin: 0 auto;
    outline: none;
  }
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: var(#fff);
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
