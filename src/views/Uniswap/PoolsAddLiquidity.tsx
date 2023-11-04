import { memo } from 'react';
import styled from 'styled-components';

import Head from './components/pools/AddHead';
import Chart from './components/pools/Chart';
import DepositAmount from './components/pools/DepositAmount';
import Fee from './components/pools/Fee';
import SelectPair from './components/pools/SelectPair';
import SetPriceRange from './components/pools/SetPriceRange';
import SubmitButton from './components/pools/SubmitButton';

const StyledContainer = styled.div`
  width: 605px;
  border-radius: 24px;
  border: 1px solid #3d363d;
`;
const StyledBody = styled.div`
  padding: 20px;
`;

const PoolsAddLiquidity = () => {
  return (
    <StyledContainer>
      <Head />
      <StyledBody>
        <SelectPair />
        <Fee />
        <SetPriceRange />
        <Chart />
        <DepositAmount />
        <SubmitButton />
      </StyledBody>
    </StyledContainer>
  );
};

export default memo(PoolsAddLiquidity);
