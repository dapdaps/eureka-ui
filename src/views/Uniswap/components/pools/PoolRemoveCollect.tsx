import { memo, useState } from 'react';
import styled from 'styled-components';

const StyledWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 21px;
  font-size: 16px;
  color: #8e8e8e;
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
  border: 1px solid ${(props) => (props.on ? '#62DDFF' : '#303030')};
  padding: 4px;
  background-color: #1b1b1b;
  border-radius: 200px;
  cursor: pointer;
  justify-content: ${(props) => (props.on ? 'flex-end' : 'flex-start')};
  .roll {
    flex-shrink: 0;
    width: 26px;
    height: 26px;
    border-radius: 100px;
    background-color: ${(props) => (props.on ? '#62DDFF' : '#4E4E4E')};
  }
`;
const PoolRemoveCollect = () => {
  const [on, setOn] = useState(false);
  function doSwitch() {
    setOn(!on);
  }
  return (
    <StyledWrap className="vchb">
      <span>Collect as WETH</span>
      <StyledSwitchButton onClick={doSwitch} on={on}>
        <span className="roll"></span>
      </StyledSwitchButton>
    </StyledWrap>
  );
};

export default memo(PoolRemoveCollect);
