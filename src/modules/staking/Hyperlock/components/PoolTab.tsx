// @ts-nocheck
import { ethers } from 'ethers';
import { memo } from 'react';
import styled from 'styled-components';

import Loading from '@/modules/components/Loading';
import { useMultiState } from '@/modules/hooks';

import TokenCard from './TokenCard';

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 0px 20px 20px;
  min-height: 172px;
  box-sizing: border-box;

  .button {
    width: 246px;
  }
`;

const StyledButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const StyledEmpty = styled.div`
  height: 150px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 11px;
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export default memo(function PoolTab(props) {
  const {
    tokens,
    token0,
    token1,
    price0,
    price1,
    name,
    fee,
    dappLink,
    handler,
    from,
    type,
    onSuccess,
    onOpenStakeModal
  } = props;
  const [state, updateState] = useMultiState({});

  return (
    <StyledContainer>
      {tokens?.map((token) => (
        <TokenCard
          key={token.id}
          {...{
            price0,
            price1,
            name,
            id: token.id,
            from: 'pool',
            fee,
            active: state.id === token.id,
            token1,
            token0,
            amount0: ethers.utils.formatUnits(token.token0Amount || 0, token0.decimals),
            amount1: ethers.utils.formatUnits(token.token1Amount || 0, token1.decimals),
            price: token.price,
            balance: token.balance,
            onCardClick: () => {
              updateState({
                ...token
              });
            }
          }}
        />
      ))}
      {!!tokens.length && (
        <StyledButtons>
          {from === 'stake' && (
            <a
              className="button ghost"
              style={{ borderStyle: 'dashed', lineHeight: '46px' }}
              href={type === 'V2' ? 'https://app.thruster.finance/add' : dappLink}
              target="_blank"
            >
              + Create new position
            </a>
          )}
          <button
            className="button primary"
            disabled={state.loading || !state.id}
            onClick={() => {
              if (state.loading || !state.id) return;

              if (state.type === 'V2') {
                onOpenStakeModal({
                  title: from === 'stake' ? 'Deposit' : 'Withdraw',
                  token0,
                  token1,
                  price: state.price,
                  balance: state.balance,
                  id: state.id,
                  display: true
                });
                return;
              }
              updateState({
                loading: true
              });
              handler({
                pool: {
                  id: state.id,
                  name,
                  amount0: ethers.utils.formatUnits(state.token0Amount || 0, token0.decimals).toString(),
                  amount1: ethers.utils.formatUnits(state.token1Amount || 0, token1.decimals).toString(),
                  token0,
                  token1,
                  price0,
                  price1,
                  fee
                },
                method: from === 'stake' ? 'safeTransferFrom' : 'withdraw',
                onSuccess: () => {
                  updateState({
                    loading: false
                  });
                  onSuccess();
                },
                onError: () => {
                  updateState({
                    loading: false
                  });
                }
              });
            }}
          >
            {state.loading ? <Loading size={16} /> : from === 'stake' ? 'Stake' : 'Withdraw'}
          </button>
        </StyledButtons>
      )}

      {!tokens.length && (
        <StyledEmpty>
          <div>
            {from === 'stake'
              ? 'You have no LP tokens in your wallet for this token pair'
              : 'You have no LP tokens staked for this token pair'}
          </div>
          {from === 'stake' && (
            <div className="link">
              <a
                className="link-text"
                href={type === 'V2' ? 'https://app.thruster.finance/add' : dappLink}
                target="_blank"
              >
                Create new position on Thruster
              </a>
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="8" viewBox="0 0 5 8" fill="none">
                <path d="M1 1L4 4L1 7" stroke="currentColor" stroke-linecap="round" />
              </svg>
            </div>
          )}
        </StyledEmpty>
      )}
    </StyledContainer>
  );
});
