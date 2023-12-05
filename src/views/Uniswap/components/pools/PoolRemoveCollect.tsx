import { memo } from 'react';
import styled from 'styled-components';

const StyledWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 21px;
  font-size: 16px;
  color: #101010;
  margin-top: 21px;
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
const StyledSwitchButton = styled.div<{ on: boolean }>`
  display: flex;
  align-items: center;
  width: 66px;
  height: 36px;
  border: 1px solid ${(props) => (props.on ? '#EBC28E' : '#A49B9A')};
  padding: 4px;
  background-color: ${(props) => (props.on ? '#EBC28E' : 'rgba(16, 16, 16, 0.1)')};
  border-radius: 200px;
  cursor: pointer;
  justify-content: ${(props) => (props.on ? 'flex-end' : 'flex-start')};
  .roll {
    flex-shrink: 0;
    width: 26px;
    height: 26px;
    border-radius: 100px;
    background-color: ${(props) => (props.on ? '#fff' : '#A49B9A')};
  }
`;
const PoolRemoveCollect = ({ useWeth, setUseWeth }: any) => {
  return (
    <StyledWrap className="vchb">
      <span>Collect as WETH</span>
      <StyledSwitchButton onClick={setUseWeth} on={useWeth}>
        <span className="roll"></span>
      </StyledSwitchButton>
    </StyledWrap>
  );
};

export default memo(PoolRemoveCollect);
