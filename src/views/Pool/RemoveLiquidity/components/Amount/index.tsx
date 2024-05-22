import { memo } from 'react';
import styled from 'styled-components';

const StyledWrap = styled.div`
  border-radius: 4px;
  background: #2e3142;
  padding: 16px;
  margin-top: 14px;
  .title {
    color: #fff;
    font-size: 16px;
    font-weight: 500;
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
    font-size: 26px;
    color: #fff;
    font-weight: 500;

    @media (max-width: 720px) {
      font-size: 20px;
    }
  }
  .gap-8 {
    gap: 8px;
  }
`;
const StyledItem = styled.div`
  width: 68px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #373a53;
  background: rgba(151, 154, 190, 0.1);
  font-size: 14px;
  color: #979abe;
  cursor: pointer;
  &.active {
    border: 1px solid #000;
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
    background: #979abe;
    height: 2px;
    border-radius: 5px;
    margin: 0 auto;
    outline: none;
  }
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: #979abe;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;
  }
`;
const PERCENTS = [25, 50, 75, 100];

const PoolRemoveAmount = ({ percent = 0, setPercent }: any) => {
  return (
    <StyledWrap>
      {/* <div className="vchb">
        <span className="title">Remove</span>
      </div> */}

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
