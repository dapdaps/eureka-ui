import { memo, useMemo, useState } from 'react';

import Modal from '@/components/Modal';

import DepositAmounts from '../components/DepositAmounts/V2';
import AmountPanel from '../Detail/components/AmountPanel';
import Tokens from '../Detail/components/Tokens';
import useDappConfig from '../hooks/useDappConfig';
import IncreaseButton from './components/Button';
import useIncrease from './hooks/useIncreaseV2';
import { StyledContent } from './styles';

const Increase = ({ open, onClose, onSuccess, detail, amount0, amount1, chainId }: any) => {
  const { token0, token1, fee, liquidity, reserve0, reserve1 } = detail;
  const [value0, setValue0] = useState('');
  const [value1, setValue1] = useState('');
  const [errorTips, setErrorTips] = useState('');
  const { contracts, basic } = useDappConfig();
  const routerAddress = useMemo(() => {
    const _contracts = contracts[token0.chainId];
    return basic.name === 'Nile' ? _contracts.RouterV2 : fee === '0.003' ? _contracts.Router3 : _contracts.Router10;
  }, [fee]);

  const { loading, onIncrease } = useIncrease({
    token0,
    token1,
    value0,
    value1,
    chainId,
    routerAddress,
    onSuccess
  });

  return (
    <Modal
      display={open}
      title="Increase Liquidity"
      width={462}
      onClose={onClose}
      content={
        <StyledContent>
          <Tokens type="V2" fee={fee ? fee * 1e6 : 0} liquidity={liquidity} token0={token0} token1={token1} />
          <AmountPanel token0={token0} token1={token1} amount0={amount0} amount1={amount1} />
          <DepositAmounts
            label="Add more liquidity"
            token0={token0}
            token1={token1}
            value0={value0}
            value1={value1}
            setValue0={setValue0}
            setValue1={setValue1}
            reserve0={reserve0}
            reserve1={reserve1}
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
            spender={routerAddress}
          />
        </StyledContent>
      }
    />
  );
};

export default memo(Increase);
