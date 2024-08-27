import { memo, useMemo, useState } from 'react';
import styled from 'styled-components';

import Header from './Header';
import SearchInput from './SearchInput';
import TokenRow from './TokenRow';

const StyledContainer = styled.div`
  padding-top: 16px;
  flex-grow: 1;
`;

const StyledTokenList = styled.div`
  max-height: 50vh;
  padding-bottom: 20px;
  overflow-y: auto;
`;

const Tokens = ({ tokens, onClose, selectedNetwork, onSelectToken }: any) => {
  const [searchVal, setSearchVal] = useState('');
  const networkTokens = useMemo(() => {
    const _tokens = Object.values(tokens || {});
    if (!_tokens.length) return [];
    return _tokens.filter((token: any) => token.network.name === selectedNetwork.name);
  }, [selectedNetwork]);

  const filteredTokens = useMemo(() => {
    if (networkTokens.length === 0) return [];
    if (!searchVal) return networkTokens;
    const _searchVal = searchVal.toLowerCase();
    return networkTokens.filter((token: any) => {
      return token.symbol.toLowerCase().includes(_searchVal) || token.address?.toLowerCase() === _searchVal;
    });
  }, [searchVal, networkTokens]);
  return (
    <StyledContainer>
      <Header onClose={onClose} />
      <SearchInput value={searchVal} onChange={setSearchVal} />
      <StyledTokenList>
        {filteredTokens.map((token: any) => (
          <TokenRow
            key={token.id}
            token={token}
            onClick={() => {
              onSelectToken(token);
            }}
          />
        ))}
      </StyledTokenList>
    </StyledContainer>
  );
};

export default memo(Tokens);
