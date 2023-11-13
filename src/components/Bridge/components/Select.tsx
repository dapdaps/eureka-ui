import { memo } from 'react';
import styled from 'styled-components';

import type { Chain, Token } from '../types';
import SelectChains from './SelectChains';
import SelectTokens from './SelectTokens';

const Container = styled.div`
  width: 100%;
  height: 78px;
  border-radius: 12px;
  display: flex;
  width: 100%;
  gap: 10px;
  border: 1px solid #373a53;
  background-color: rgba(11, 12, 19, 0.5);
  padding: 10px 20px;
  box-sizing: border-box;
`;

const Select = ({
  token,
  chain,
  tokenDisabled,
  chainDisabled,
}: {
  token?: Token;
  chain?: Chain;
  tokenDisabled?: boolean;
  chainDisabled?: boolean;
}) => {
  return (
    <Container>
      <SelectTokens token={token} disabled={tokenDisabled} />
      <SelectChains chain={chain} disabled={chainDisabled} />
    </Container>
  );
};

export default memo(Select);
