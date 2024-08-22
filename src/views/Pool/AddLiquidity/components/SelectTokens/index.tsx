import { memo, useMemo, useState } from 'react';

import Modal from '@/components/Modal';
import useTokensBalance from '@/hooks/useTokensBalance';
import useDappConfig from '@/views/Pool/hooks/useDappConfig';

import { StyledContent, StyledSearch, StyledTokens } from './styles';
import TokenRow from './TokenRow';

const SelectTokens = ({ open, selectedToken, onClose, onSelectToken }: any) => {
  const [searchVal, setSearchVal] = useState('');

  const { tokens, currentChain } = useDappConfig();

  const chainTokens = useMemo(() => {
    const _chainId = currentChain.chain_id;
    return Object.values(tokens[_chainId]);
  }, [tokens]);

  const filterTokens = useMemo(() => {
    return chainTokens.filter((token: any) => {
      if (!searchVal) {
        return true;
      }
      return (
        token.address.toLowerCase() === searchVal?.toLowerCase() ||
        token.name.toLowerCase().includes(searchVal?.toLowerCase())
      );
    });
  }, [chainTokens, searchVal]);

  const { loading, balances = {} } = useTokensBalance(chainTokens);

  return (
    <Modal
      display={open}
      title="Select a token"
      onClose={onClose}
      width={462}
      content={
        <StyledContent>
          <StyledSearch className="hv">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
              <path
                d="M13 12.899C14.2372 11.6364 15 9.90731 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C9.95869 15 11.7295 14.1955 13 12.899ZM13 12.899L18.101 18"
                stroke="#979ABE"
                strokeWidth="2"
              />
            </svg>
            <input
              value={searchVal}
              onChange={(ev) => {
                setSearchVal(ev.target.value);
              }}
              type="text"
              placeholder="Seach name or paste address"
            />
          </StyledSearch>
          <StyledTokens>
            {filterTokens.map((token: any) => (
              <TokenRow
                key={token.address}
                token={token}
                balance={balances[token.address]}
                loading={loading}
                isSelected={
                  selectedToken.address ? selectedToken.address.toLowerCase() === token.address.toLowerCase() : false
                }
                onClick={() => {
                  onSelectToken(token);
                }}
              />
            ))}
          </StyledTokens>
        </StyledContent>
      }
    />
  );
};

export default memo(SelectTokens);
