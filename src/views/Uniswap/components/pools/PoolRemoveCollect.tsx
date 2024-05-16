import { memo } from 'react';
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
  width: 46px;
  height: 26px;
  padding: 2px;
  background-color: ${(props) => (props.on ? 'var(--primary-color)' : '#000')};
  border-radius: 200px;
  cursor: pointer;
  justify-content: ${(props) => (props.on ? 'flex-end' : 'flex-start')};
  .roll {
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    border-radius: 100px;
    background-color: ${(props) => (props.on ? '#fff' : '#313540')};
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
