import { memo, useMemo } from 'react';
import styled from 'styled-components';
import { tickToPrice } from '../../utils/tickMath';
import { sortTokens } from '../../utils/sortTokens';

const StyledContainer = styled.div`
  margin-top: 20px;
  .title {
    font-size: 16px;
    color: rgba(255, 255, 255, 1);
    margin-bottom: 16px;
  }
  .setArea {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  align-items: center;
  padding-bottom: 10px;
`;
const HeaderActions = styled.div`
  display: flex;
  gap: 5px;
`;
const HeaderFullAction = styled.div`
  height: 30px;
  line-height: 30px;
  border: 1px solid #3d363d;
  border-radius: 8px;
  width: 70px;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
`;
const HeaderTokensAction = styled.div`
  border: 1px solid #3d363d;
  border-radius: 8px;
  padding: 3px;
  box-sizing: border-box;
  display: flex;
`;
const HeaderTokenAction = styled.div<{ active?: boolean }>`
  font-size: 12px;
  line-height: 12px;
  padding: 6px;
  border-radius: 6px;
  color: ${({ active }) => (active ? ' #fff' : '#8E8E8E')};
  cursor: pointer;
  height: 24px;
  box-sizing: border-box;
  ${({ active }) => active && 'background-color: #262626;'}
`;

const SetPriceRange = ({
  lowerTick,
  highTick,
  setLowerTick,
  setHighTick,
  token0,
  token1,
  reverse,
  onExchangeTokens,
}: any) => {
  return (
    <StyledContainer>
      <Header>
        <div>Set price range</div>
        <HeaderActions>
          <HeaderFullAction
            onClick={() => {
              setLowerTick(-887272);
              setHighTick(887272);
            }}
          >
            Full range
          </HeaderFullAction>
          {token1 && token0 && (
            <HeaderTokensAction>
              <HeaderTokenAction onClick={onExchangeTokens} active={!reverse}>
                {reverse ? token1?.symbol : token0?.symbol}
              </HeaderTokenAction>
              <HeaderTokenAction onClick={onExchangeTokens} active={reverse}>
                {reverse ? token0?.symbol : token1?.symbol}
              </HeaderTokenAction>
            </HeaderTokensAction>
          )}
        </HeaderActions>
      </Header>
      <div className="setArea">
        <InputPriceBox
          type="low"
          tick={lowerTick}
          setTick={setLowerTick}
          token0={token0}
          token1={token1}
          reverse={reverse}
        />
        <InputPriceBox
          type="up"
          tick={highTick}
          setTick={setHighTick}
          token0={token0}
          token1={token1}
          reverse={reverse}
        />
      </div>
    </StyledContainer>
  );
};

const StyledInputPriceBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #303030;
  border-radius: 16px;
  padding: 12px 18px;
  background-color: #1b1b1b;
`;
const StyledPrice = styled.div`
  display: flex;
  flex-direction: column;
  .type {
    font-size: 14px;
    color: #8e8e8e;
  }
  input {
    font-size: 20px;
    color: #fff;
    font-weight: 700;
    background: none;
    border: none;
    outline: none;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .txt {
    font-size: 14px;
    color: #8e8e8e;
  }
`;
const StyledButtonArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  .b {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: 1px solid #3d363d;
    border-radius: 8px;
    background-color: #131313;
    cursor: pointer;
    color: #fff;
  }
`;
const InputPriceBox = ({ type, tick, setTick, token0, token1, reverse }: any) => {
  const value = useMemo(() => {
    if (!tick || !token0 || !token1) return 0;
    if (tick === -887272) return '0';
    if (tick === 887272) return '∞';
    const [_token0, _token1] = sortTokens(token0, token1);
    return tickToPrice({
      tick,
      decimals0: _token0.decimals,
      decimals1: _token1.decimals,
      isReverse: !reverse,
      isNumber: true,
    });
  }, [tick, token0, token1, reverse]);
  return (
    <StyledInputPriceBox>
      <StyledPrice>
        <span className="type">{type === 'low' ? 'Low' : 'High'} price</span>
        <input value={value} readOnly />
        <span className="txt">
          {token1?.symbol} per {token0?.symbol}
        </span>
      </StyledPrice>
      <StyledButtonArea>
        <div
          className="b"
          onClick={() => {
            setTick(tick - 1);
          }}
        >
          <Add />
        </div>
        <div
          className="b"
          onClick={() => {
            setTick(tick + 1);
          }}
        >
          <Sub />
        </div>
      </StyledButtonArea>
    </StyledInputPriceBox>
  );
};

const Add = () => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7H13" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 1L7 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};
const Sub = () => {
  return (
    <svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1H13" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

export default SetPriceRange;
