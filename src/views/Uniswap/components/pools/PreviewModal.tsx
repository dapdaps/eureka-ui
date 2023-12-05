import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

import { CloseIcon } from './Icons';
import Modal from '@/components/ModalBox';
import PoolIncreaseLiquidityData from './PoolIncreaseLiquidityData';
import PoolPriceRange from './PoolPriceRange';
import PoolRemovePair from './PoolRemovePair';
import Loading from '@/components/Icons/Loading';
import useAddLiquidity from '../../hooks/useAddLiquidity';

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
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const StyledHead = styled.div`
  .title {
    font-size: 20px;
    color: #101010;
    font-weight: 700;
  }
  svg {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    .title {
      font-size: 16px;
    }
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
      color: #101010;
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
  background-color: #101010;
  font-size: 18px;
  color: #ffffff;
  font-weight: 600;
  margin-top: 15px;
  gap: 6px;
  ${({ disabled }) => (disabled ? 'opacity: 0.3; cursor: not-allowed;' : 'cursor: pointer;')}
  @media (max-width: 768px) {
    height: 50px;
    margin-bottom: 20px;
  }
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
          <PoolIncreaseLiquidityData token0={token0} token1={token1} value0={value0} value1={value1} type="1" />
          <PoolPriceRange
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
            type="1"
          />
          <StyledAdd
            className="hvc"
            onClick={() => {
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
