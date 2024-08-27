import { useRouter } from 'next/router';
import { memo, useMemo, useState } from 'react';

import Loading from '@/components/Icons/Loading';
import Header from '@/views/Pool/AddLiquidity/components/Header';
import PreviewModal from '@/views/Pool/AddLiquidity/components/PreviewModal';
import Setting from '@/views/Pool/components/Setting';
import Tokens from '@/views/Pool/Detail/components/Tokens';
import { getTokenAmounts } from '@/views/Pool/Detail/helpers';
import useDappConfig from '@/views/Pool/hooks/useDappConfig';
import IncreaseButton from '@/views/Pool/IncreaseLiquidity/components/Button';
import { checkIsFullRange,tickToPrice } from '@/views/Pool/utils/tickMath';

import DepositAmounts from '../AddLiquidity/DepositAmounts';
import useAdd from '../hooks/useAdd';
import usePoolDetail from '../hooks/usePoolDetail';
import CurrentAmount from './CurrentAmount';
import Range from './Range';
import { StyledContainer, StyledContent,StyledLoadingWrapper } from './styles';

const IncreaseLiquidity = () => {
  const { theme = {}, tokenId, contracts, currentChain } = useDappConfig();
  const { detail, loading } = usePoolDetail(tokenId);
  const [value0, setValue0] = useState('');
  const [value1, setValue1] = useState('');
  const [errorTips, setErrorTips] = useState('');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const router = useRouter();

  const [amount0, amount1] = useMemo(() => {
    if (!detail) return [0, 0];
    return getTokenAmounts({
      liquidity: detail.liquidity,
      tickLower: detail.tickLower,
      tickUpper: detail.tickUpper,
      currentTick: detail.currentTick,
      token0: detail.token0,
      token1: detail.token1,
    });
  }, [detail]);
  const { rangeType, upperPrice, lowerPrice, currentPrice } = useMemo(() => {
    if (!detail)
      return {
        rangeType: 0,
        upperPrice: 0,
        lowerPrice: 0,
        currentPrice: 0,
      };
    const { tickLower, tickUpper, currentTick, token0, token1 } = detail;
    let rangeType = 0;

    if (checkIsFullRange({ tickLower, tickUpper })) {
      rangeType = 3;
    } else if (currentTick < tickUpper && currentTick > tickLower) {
      rangeType = 0;
    } else if (currentTick < tickLower) {
      rangeType = 1;
    } else if (currentTick > tickUpper) {
      rangeType = 2;
    }

    return {
      rangeType,
      upperPrice: tickToPrice({ tick: tickUpper, token0, token1 }),
      lowerPrice: tickToPrice({ tick: tickLower, token0, token1 }),
      currentPrice: tickToPrice({ tick: currentTick, token0, token1 }),
    };
  }, [detail]);

  const { loading: adding, onIncrease } = useAdd({
    token0: detail?.token0,
    token1: detail?.token1,
    value0,
    value1,
    noPair: false,
    currentPrice,
    lowerPrice,
    upperPrice,
    tokenId,
    onSuccess: () => {
      setShowPreviewModal(false);
      router.back();
    },
  });

  return (
    <StyledContainer style={{ ...theme, width: '1078px', position: 'relative' }}>
      <Header isAlign={true} title="Increase Liquidity" tab="positions" setShowSettings={setShowSettings} />
      {loading || !detail ? (
        <StyledLoadingWrapper>
          <Loading size={36} />
        </StyledLoadingWrapper>
      ) : (
        <StyledContent>
          <div style={{ width: '50%' }}>
            <Tokens {...detail} from="add" rangeType={rangeType} type="V3" />
            <CurrentAmount token0={detail.token0} token1={detail.token1} amount0={amount0} amount1={amount1} />
            <Range
              token0={detail.token0}
              token1={detail.token1}
              tickLower={detail.tickLower}
              tickUpper={detail.tickUpper}
              currentTick={detail.currentTick}
              from="detail"
            />
          </div>
          <div style={{ width: '50%' }}>
            <DepositAmounts
              label="Add more liquidity"
              token0={detail.token0}
              token1={detail.token1}
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
              loading={adding}
              onClick={() => {
                setShowPreviewModal(true);
              }}
              value0={value0}
              value1={value1}
              token0={detail.token0}
              token1={detail.token1}
              spender={contracts[currentChain.chain_id]?.PositionManager}
            />
          </div>
          <PreviewModal
            open={showPreviewModal}
            rangeType={rangeType}
            token0={detail.token0}
            token1={detail.token1}
            value0={value0}
            value1={value1}
            noPair={false}
            currentPrice={currentPrice}
            lowerPrice={lowerPrice}
            upperPrice={upperPrice}
            onClose={() => {
              setShowPreviewModal(false);
            }}
            loading={adding}
            onClick={onIncrease}
          />
          <Setting show={showSettings} setShow={setShowSettings} />
        </StyledContent>
      )}
    </StyledContainer>
  );
};

export default memo(IncreaseLiquidity);
