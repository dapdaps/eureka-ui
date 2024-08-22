import { useRouter } from 'next/router';
import { useMemo,useRef, useState } from 'react';

import Loading from '@/components/Icons/Loading';
import useAccount from '@/hooks/useAccount';
import { balanceFormated } from '@/utils/balance';
import Empty from '@/views/Pool/AddLiquidity/components/Empty';
import Header from '@/views/Pool/AddLiquidity/components/Header';
import OutRangeHints from '@/views/Pool/AddLiquidity/components/OutRangeHints';
import PoolHints from '@/views/Pool/AddLiquidity/components/PoolHints';
import PoolNoExsitHints from '@/views/Pool/AddLiquidity/components/PoolNoExsitHints';
import PreviewModal from '@/views/Pool/AddLiquidity/components/PreviewModal';
import StartingPrice from '@/views/Pool/AddLiquidity/components/StartingPrice';
import Setting from '@/views/Pool/components/Setting';
import useDappConfig from '@/views/Pool/hooks/useDappConfig';
import AddButton from '@/views/Pool/IncreaseLiquidity/components/Button';

import useAdd from '../hooks/useAdd';
import useAddLiquidityData from '../hooks/useAddLiquidityData';
import Chart from './Chart';
import DepositAmounts from './DepositAmounts';
import SelectPair from './SelectPair';
import SelectPriceRange from './SelectPriceRange';
import SelectTokens from './SelectTokens';
import {
  StyledContainer,
  StyledContent,
  StyledCurrentPrice,
  StyledLabel,
  StyledLabels,
  StyledLoadingWrapper,
} from './styles';

const AddLiquidity = () => {
  const { theme = {}, currentChain, contracts } = useDappConfig();
  const [showSettings, setShowSettings] = useState(false);
  const [showSelectTokens, setShowSelectTokens] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState<any>({});
  const inputType = useRef<0 | 1>(0);
  const router = useRouter();
  const [errorTips, setErrorTips] = useState('');
  const { chainId } = useAccount();

  const isChainSupport = useMemo(() => {
    if (!chainId || !currentChain) return false;
    return chainId === currentChain.chain_id;
  }, [chainId, currentChain]);

  const {
    token0,
    token1,
    value0,
    value1,
    noPair,
    loading,
    currentPrice,
    lowerPrice,
    upperPrice,
    reverse,
    rangeType,
    range,
    onSelectToken,
    onCleanAll,
    onExchangeTokens,
    onPriceChange,
    onPointChange,
    setValue0,
    setValue1,
    setCurrentPrice,
    setRange,
  } = useAddLiquidityData();

  const { loading: adding, onIncrease } = useAdd({
    token0,
    token1,
    value0,
    value1,
    noPair,
    currentPrice,
    lowerPrice,
    upperPrice,
    onSuccess: () => {
      setShowPreviewModal(false);
      router.push(`/dapp/${router.query.dappRoute}`);
    },
  });

  return (
    <StyledContainer style={{ ...theme, width: '1078px', position: 'relative' }}>
      <Header setShowSettings={setShowSettings} onCleanAll={onCleanAll} isAlign={false} />
      <StyledContent>
        <div style={{ width: '50%' }}>
          <SelectPair
            token0={token0}
            token1={token1}
            onSelectToken={(type: 0 | 1) => {
              inputType.current = type;
              setShowSelectTokens(true);
            }}
          />
          <StyledCurrentPrice>
            <div>Current Price</div>
            {token1 && token0 ? (
              <div>
                {balanceFormated(currentPrice, 5)} {token1.symbol} per {token0.symbol}
              </div>
            ) : (
              '-'
            )}
          </StyledCurrentPrice>
          <DepositAmounts
            label="Deposit amounts"
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
        </div>
        <div style={{ width: '50%' }}>
          {loading ? (
            <StyledLoadingWrapper>
              <Loading size={40} />
            </StyledLoadingWrapper>
          ) : (
            <>
              {noPair && token0 && token1 && isChainSupport && <PoolNoExsitHints />}{' '}
              {[1, 2].includes(rangeType) && !noPair && isChainSupport && <OutRangeHints type={rangeType} />}
              {noPair && token0 && token1 && isChainSupport && <PoolHints />}
              {noPair && isChainSupport && (
                <StartingPrice
                  token0={token0}
                  token1={token1}
                  price={currentPrice}
                  setPrice={(_price: any) => {
                    setCurrentPrice(_price);
                    setValue0('');
                    setValue1('');
                  }}
                />
              )}
              {currentPrice && token0 && token1 ? (
                <Chart
                  currentPrice={currentPrice}
                  fee={3000}
                  lowerPrice={lowerPrice}
                  highPrice={upperPrice === '∞' ? 2 ** 96 : upperPrice}
                  token0={token0}
                  token1={token1}
                  reverse={reverse}
                  onPriceChange={onPriceChange}
                  onExchangeTokens={() => {
                    onExchangeTokens();
                  }}
                />
              ) : (
                <Empty />
              )}
              <StyledLabels>
                {['Narrow', 'Common', 'Wide', 'Full'].map((label) => (
                  <StyledLabel
                    key={label}
                    $active={range === label}
                    onClick={() => {
                      if (!isChainSupport) return;
                      setRange(label);
                    }}
                  >
                    {label}
                  </StyledLabel>
                ))}
              </StyledLabels>
              <SelectPriceRange
                lowerPrice={lowerPrice}
                upperPrice={upperPrice}
                token0={token0}
                token1={token1}
                noPair={noPair}
                rangeType={rangeType}
                isChainSupport={isChainSupport}
                onPointChange={onPointChange}
                onPriceChange={onPriceChange}
              />
              <AddButton
                text="Add Liquidity"
                errorTips={errorTips}
                loading={loading}
                onClick={() => {
                  setShowPreviewModal(true);
                }}
                value0={value0}
                value1={value1}
                token0={token0}
                token1={token1}
                spender={contracts[currentChain.chain_id]?.PositionManager}
              />
            </>
          )}
        </div>

        <Setting show={showSettings} setShow={setShowSettings} />
        <SelectTokens
          open={showSelectTokens}
          selectedToken={selectedToken}
          onClose={() => {
            setShowSelectTokens(false);
          }}
          onSelectToken={(token: any) => {
            setSelectedToken(token);
            onSelectToken(token, inputType.current);
            setShowSelectTokens(false);
          }}
          token={inputType.current === 0 ? token1 : token0}
        />
        <PreviewModal
          open={showPreviewModal}
          rangeType={rangeType}
          token0={token0}
          token1={token1}
          value0={value0}
          value1={value1}
          noPair={noPair}
          currentPrice={currentPrice}
          lowerPrice={lowerPrice}
          upperPrice={upperPrice}
          onClose={() => {
            setShowPreviewModal(false);
          }}
          loading={adding}
          onClick={onIncrease}
        />
      </StyledContent>
      <Setting show={showSettings} setShow={setShowSettings} />
    </StyledContainer>
  );
};

export default AddLiquidity;
