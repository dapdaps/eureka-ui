import { useRouter } from 'next/router';
import { memo, useRef,useState } from 'react';

import Loading from '@/components/Icons/Loading';
import AddButton, { CreateButton } from '@/views/Pool/IncreaseLiquidity/components/Button';

import DepositAmounts from '../components/DepositAmounts/V2';
import Setting from '../components/Setting';
import useDappConfig from '../hooks/useDappConfig';
import useIncrease from '../IncreaseLiquidity/hooks/useIncreaseV2';
import Header from './components/Header';
import PoolNoExsitHints from './components/PoolNoExsitHints';
import SelectFee from './components/SelectFeeV2';
import SelectPair from './components/SelectPair';
import SelectTokens from './components/SelectTokens';
import useCreatePair from './hooks/useCreatePair';
import useData from './hooks/useDataV2';
import { LoadingWrapper,StyledContainer, StyledContent } from './styles';

const Add = ({ from, onClose, setVersion }: any) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showSelectTokens, setShowSelectTokens] = useState(false);
  const [selectedToken, setSelectedToken] = useState<any>({});
  const [errorTips, setErrorTips] = useState('');
  const { theme = {}, chainId } = useDappConfig();
  const router = useRouter();
  const inputType = useRef<0 | 1>(0);

  const {
    token0,
    token1,
    value0,
    value1,
    noPair,
    fee,
    loading,
    info,
    onSelectToken,
    onCleanAll,
    onSelectFee,
    setValue0,
    setValue1,
    queryPool,
  } = useData();

  const { loading: increasing, onIncrease } = useIncrease({
    token0,
    token1,
    value0,
    value1,
    chainId,
    routerAddress: info?.routerAddress,
    onSuccess: () => {
      if (from === 'modal') {
        onClose();
      } else {
        router.push(`/dapp/${router.query.dappRoute}`);
      }
    },
  });

  const { loading: creating, onCreate } = useCreatePair({
    token0,
    token1,
    fee,
    onSuccess: () => {
      queryPool();
    },
  });

  return (
    <StyledContainer style={{ ...theme, margin: from !== 'modal' ? '20px auto 0px' : '0px' }}>
      <Header
        setShowSettings={setShowSettings}
        onCleanAll={onCleanAll}
        from={from}
        onClose={onClose}
        version="V2"
        setVersion={setVersion}
      />
      <StyledContent>
        <SelectPair
          token0={token0}
          token1={token1}
          onSelectToken={(type: 0 | 1) => {
            inputType.current = type;
            setShowSelectTokens(true);
          }}
        />
        <SelectFee fee={fee} disabled={!token0 || !token1} onSelectFee={onSelectFee} />
        {loading ? (
          <LoadingWrapper style={{ height: 100, lineHeight: '100px' }}>
            <Loading size={40} />
          </LoadingWrapper>
        ) : (
          <>{noPair && token0 && token1 && <PoolNoExsitHints />}</>
        )}
        <DepositAmounts
          label="Supply Amount"
          token0={token0}
          token1={token1}
          value0={value0}
          value1={value1}
          setValue0={setValue0}
          setValue1={setValue1}
          reserve0={info?.reserve0 || 0}
          reserve1={info?.reserve1 || 0}
          onError={(tips: string) => {
            setErrorTips(tips);
          }}
        />
        {noPair && token0 && token1 ? (
          <CreateButton loading={creating} onClick={onCreate} />
        ) : (
          <AddButton
            text="Add Liquidity"
            errorTips={errorTips}
            loading={increasing}
            onClick={onIncrease}
            value0={value0}
            value1={value1}
            token0={token0}
            token1={token1}
            spender={info?.routerAddress}
          />
        )}
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
        />
      </StyledContent>
    </StyledContainer>
  );
};

export default memo(Add);
