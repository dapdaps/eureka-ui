import { memo } from 'react';
import Modal from '@/components/Modal';
import Tokens from '@/views/Pool/Detail/components/Tokens';
import AmountPanel from '@/views/Pool/Detail/components/AmountPanel';
import PriceRange from '@/views/Pool/components/PriceRange';
import IncreaseButton from '@/views/Pool/IncreaseLiquidity/components/Button';
import { StyledContent } from './styles';
import useIncrease from '@/views/Pool/IncreaseLiquidity/hooks/useIncrease';

const PreviewModal = ({
  open,
  onClose,
  onSuccess,
  rangeType,
  fee,
  value0,
  value1,
  token0,
  token1,
  noPair,
  currentPrice,
  lowerPrice,
  upperPrice,
}: any) => {
  const { loading, onIncrease } = useIncrease({
    token0,
    token1,
    value0,
    value1,
    fee,
    noPair,
    currentPrice,
    lowerPrice,
    upperPrice,
    onSuccess,
  });

  return (
    <Modal
      display={open}
      title="Add Liquidity"
      width={462}
      onClose={onClose}
      content={
        <StyledContent>
          <Tokens token0={token0} token1={token1} fee={fee} liquidity={100} from="add" rangeType={rangeType} />
          <AmountPanel token0={token0} token1={token1} amount0={value0} amount1={value1} />
          <PriceRange
            from="add"
            token0={token0}
            token1={token1}
            lowerPrice={lowerPrice}
            upperPrice={upperPrice}
            currentPrice={currentPrice}
          />
          <IncreaseButton
            text="Add Liquidity"
            loading={loading}
            onClick={onIncrease}
            value0={value0}
            value1={value1}
            token0={token0}
            token1={token1}
          />
        </StyledContent>
      }
    />
  );
};

export default memo(PreviewModal);
