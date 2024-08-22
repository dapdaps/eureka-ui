import { memo, useMemo, useState } from 'react';

import Modal from '@/components/Modal';

import DepositAmounts from '../components/DepositAmounts/V3';
import AmountPanel from '../Detail/components/AmountPanel';
import Range from '../Detail/components/Range';
import Tokens from '../Detail/components/Tokens';
import useDappConfig from '../hooks/useDappConfig';
import { checkIsFullRange,tickToPrice } from '../utils/tickMath';
import IncreaseButton from './components/Button';
import useIncrease from './hooks/useIncrease';
import { StyledContent } from './styles';

const Increase = ({ open, onClose, onSuccess, detail, amount0, amount1 }: any) => {
  const { token0, token1, tickLower, tickUpper, currentTick } = detail;
  const [value0, setValue0] = useState('');
  const [value1, setValue1] = useState('');
  const [errorTips, setErrorTips] = useState('');

  const { loading, onIncrease } = useIncrease({
    token0,
    token1,
    value0,
    value1,
    tokenId: detail.tokenId,
    onSuccess,
  });
  const { contracts, chainId } = useDappConfig();

  const rangeType = useMemo(() => {
    if (checkIsFullRange({ tickLower, tickUpper })) return 3;
    if (currentTick < tickUpper && currentTick > tickLower) return 0;
    if (currentTick < tickLower) return 1;
    if (currentTick > tickUpper) return 2;
  }, [tickLower, tickUpper, currentTick]);

  const upperPrice = useMemo(() => tickToPrice({ tick: tickUpper, token0, token1 }), [tickUpper]);
  const lowerPrice = useMemo(() => tickToPrice({ tick: tickLower, token0, token1 }), [tickLower]);
  const currentPrice = useMemo(() => tickToPrice({ tick: currentTick, token0, token1 }), [currentTick]);

  return (
    <Modal
      display={open}
      title="Increase Liquidity"
      width={462}
      onClose={onClose}
      content={
        <StyledContent>
          <Tokens {...detail} type="V3" />
          <AmountPanel token0={token0} token1={token1} amount0={amount0} amount1={amount1} />
          <Range
            token0={token0}
            token1={token1}
            tickLower={tickLower}
            tickUpper={tickUpper}
            currentTick={currentTick}
            from="increase"
          />
          <DepositAmounts
            label="Add more liquidity"
            token0={token0}
            token1={token1}
            value0={value0}
            value1={value1}
            setValue0={setValue0}
            setValue1={setValue1}
            rangeType={rangeType}
            upperPrice={upperPrice}
            lowerPrice={lowerPrice}
            currentPrice={currentPrice}
            onError={(tips: string) => {
              setErrorTips(tips);
            }}
          />
          <IncreaseButton
            text="Increase"
            errorTips={errorTips}
            loading={loading}
            onClick={onIncrease}
            value0={value0}
            value1={value1}
            token0={token0}
            token1={token1}
            spender={contracts[chainId]?.PositionManager}
          />
        </StyledContent>
      }
    />
  );
};

export default memo(Increase);
