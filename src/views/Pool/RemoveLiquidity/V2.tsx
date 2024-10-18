import Big from 'big.js';
import { memo, useMemo, useState } from 'react';

import Modal from '@/components/Modal';

import Tokens from '../Detail/components/Tokens';
import useDappConfig from '../hooks/useDappConfig';
import Amount from './components/Amount';
import RemoveButton from './components/Button';
import Token from './components/Token';
import useRemove from './hooks/useRemoveV2';
import { StyledContent } from './styles';

const Remove = ({ amount0, amount1, open, onClose, onSuccess, detail }: any) => {
  const { token0, token1, fee, address, liquidity } = detail;
  const [percent, setPercent] = useState(0);
  const { contracts, currentChain, basic } = useDappConfig();

  const routerAddress = useMemo(() => {
    const _contracts = contracts[token0.chainId];
    return basic.name === 'Nile' ? _contracts.RouterV2 : fee === '0.003' ? _contracts.Router3 : _contracts.Router10;
  }, [fee]);

  const { loading, onRemove } = useRemove({
    detail,
    percent,
    amount0,
    amount1,
    routerAddress,
    onSuccess: () => {
      onSuccess(percent);
    }
  });

  const value = useMemo(() => {
    if (Big(liquidity || 0).eq(0)) return '';
    if (percent === 0) return '';
    return Big(liquidity || 0)
      .mul(percent / 100)
      .div(1e18)
      .toFixed(18);
  }, [liquidity, percent]);

  const lpToken = useMemo(() => ({ address, decimals: 18, symbol: `${token0.symbol}-${token1.symbol}` }), [address]);

  const errorTips = useMemo(() => {
    if (!percent) return 'Select a percent';
    return '';
  }, [percent]);

  return (
    <Modal
      display={open}
      title="Remove Liquidity"
      width={462}
      onClose={onClose}
      content={
        <StyledContent>
          <Tokens type="V2" fee={fee ? fee * 1e6 : 0} liquidity={liquidity} token0={token0} token1={token1} />
          <Amount percent={percent} setPercent={setPercent} />
          <Token type="V2" amount0={amount0} amount1={amount1} token0={token0} token1={token1} percent={percent} />
          {lpToken && (
            <RemoveButton
              text="Remove"
              loading={loading}
              onClick={onRemove}
              value={value}
              token={lpToken}
              spender={routerAddress}
              currentChain={currentChain}
              errorTips={errorTips}
            />
          )}
        </StyledContent>
      }
    />
  );
};

export default memo(Remove);
