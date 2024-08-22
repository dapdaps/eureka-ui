import { memo } from 'react';

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
  loading,
  onClick,
}: any) => {
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
            lowerPrice={lowerPrice}
            upperPrice={upperPrice}
            currentPrice={currentPrice}
            isFullRange={rangeType === 3}
          />
          <CreateButton text="Add Liquidity" loading={loading} onClick={onClick} />
        </StyledContent>
      }
    />
  );
};

export default memo(PreviewModal);
