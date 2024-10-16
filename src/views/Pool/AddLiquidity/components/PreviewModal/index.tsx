import { memo, useMemo } from 'react';

import Modal from '@/components/Modal';
import PriceRange from '@/views/Pool/components/PriceRange';
import AmountPanel from '@/views/Pool/Detail/components/AmountPanel';
import Tokens from '@/views/Pool/Detail/components/Tokens';
import { CreateButton } from '@/views/Pool/IncreaseLiquidity/components/Button';

import { StyledContent } from './styles';

const PreviewModal = ({
  open,
  onClose,
  rangeType,
  fee,
  value0,
  value1,
  token0,
  token1,
  currentPrice,
  lowerPrice,
  upperPrice,
  reverse,
  loading,
  onClick
}: any) => {
  const [_upperPrice, _lowerPrice, _currentPrice] = useMemo(() => {
    if (reverse) return [upperPrice, lowerPrice, currentPrice];
    let _upper = upperPrice;
    let _lower = lowerPrice;
    let _current = currentPrice;
    if (!isNaN(_upper)) _upper = 1 / _upper;
    if (!isNaN(_lower)) _lower = 1 / _lower;
    if (!isNaN(_current)) _current = 1 / _current;
    return [_upper, _lower, _current];
  }, [reverse, upperPrice, lowerPrice, currentPrice]);

  return (
    <Modal
      display={open}
      title="Add Liquidity"
      width={462}
      onClose={onClose}
      content={
        <StyledContent>
          <Tokens
            type="V3"
            token0={token0}
            token1={token1}
            fee={fee}
            liquidity={100}
            from="add"
            rangeType={rangeType}
          />
          <AmountPanel token0={token0} token1={token1} amount0={value0} amount1={value1} />
          <PriceRange
            from="add"
            token0={token0}
            token1={token1}
            lowerPrice={_lowerPrice}
            upperPrice={_upperPrice}
            currentPrice={_currentPrice}
            isFullRange={rangeType === 3}
          />
          <CreateButton text="Add Liquidity" loading={loading} onClick={onClick} />
        </StyledContent>
      }
    />
  );
};

export default memo(PreviewModal);
