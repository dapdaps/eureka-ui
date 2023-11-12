import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

import { CloseIcon } from './Icons';
import Modal from './ModalBox';
import PoolIncreaseLiquidityData from './PoolIncreaseLiquidityData';
import PoolPriceRange from './PoolPriceRange';
import PoolRemovePair from './PoolRemovePair';
import Loading from '@/components/Icons/Loading';
import useAddLiquidity from '../../hooks/useAddLiquidity';
import useRequestModal from '../../hooks/useRequestModal';

import { sortTokens } from '../../utils/sortTokens';

const StyledContent = styled.div`
  width: 460px;
  .vchb {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .hvc {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hv {
    display: flex;
    align-items: center;
  }
  .w-full {
    width: 100%;
  }
`;
const StyledHead = styled.div`
  .title {
    font-size: 20px;
    color: #ffffff;
    font-weight: 700;
  }
  svg {
    cursor: pointer;
  }
`;
const StyledBody = styled.div`
  margin-top: 16px;
  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 16px;
    background-color: #1b1b1b;
    padding: 18px;
    gap: 20px;
    img {
      width: 22px;
      height: 22px;
      border-radius: 100px;
      margin-right: 7px;
    }
    .symbol {
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
    }
    .balance {
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
    }
  }
`;

const StyledAdd = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 62px;
  border-radius: 16px;
  background-color: #62ddff;
  font-size: 18px;
  color: #1b1b1b;
  font-weight: 600;
  margin-top: 15px;
  gap: 6px;
  ${({ disabled }) => (disabled ? 'opacity: 0.3; cursor: not-allowed;' : 'cursor: pointer;')}
`;

const PreviewModal = (props: any) => {
  const {
    isOpen,
    onRequestClose,
    token0,
    token1,
    value0,
    value1,
    lowerTick,
    highTick,
    tick,
    fee,
    tokenId,
    price,
    noPair,
    isMint,
  } = props;
  const [reverse, setReverse] = useState(false);
  const { loading, onAdd } = useAddLiquidity(() => {
    onRequestClose();
  });
  useEffect(() => {
    if (!token0 || !token1) return;
    const [_token0, _token1] = sortTokens(token0, token1);
    setReverse(_token0.address === token1.address);
  }, [token0, token1]);

  const { openRequestModal } = useRequestModal();
  const _lowerTick = lowerTick > highTick ? highTick : lowerTick;
  const _highTick = lowerTick > highTick ? lowerTick : highTick;
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <StyledContent>
        <StyledHead className="vchb">
          <span className="title">Add liquidity</span>
          <CloseIcon onClick={onRequestClose} />
        </StyledHead>
        <StyledBody>
          <PoolRemovePair
            status={_lowerTick <= tick && tick <= _highTick ? 'in' : 'out'}
            token0={token0}
            token1={token1}
            fee={fee}
          />
          <PoolIncreaseLiquidityData token0={token0} token1={token1} value0={value0} value1={value1} />
          <PoolPriceRange
            type="1"
            detail={{
              token0: token0,
              token1: token1,
              tickLow: _lowerTick,
              tickHigh: _highTick,
              tick,
            }}
            isReverse={reverse}
            onSetReverse={() => {
              setReverse(!reverse);
            }}
          />
          <StyledAdd
            className="hvc"
            onClick={() => {
              openRequestModal({ open: true });
              onRequestClose();
              onAdd({
                token0,
                token1,
                value0,
                value1,
                fee,
                tickLower: lowerTick,
                tickUpper: highTick,
                noPair,
                isMint,
                tokenId,
                price,
              });
            }}
            disabled={loading}
          >
            {loading && <Loading />} Add
          </StyledAdd>
        </StyledBody>
      </StyledContent>
    </Modal>
  );
};

export default memo(PreviewModal);
