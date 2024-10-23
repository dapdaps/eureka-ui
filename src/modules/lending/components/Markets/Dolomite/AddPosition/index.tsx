import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import { trim } from 'lodash';
import { useEffect } from 'react';

import useAccount from '@/hooks/useAccount';
import LendingDialogButton from '@/modules/lending/components/Button';
import ExpandCard from '@/modules/lending/components/Markets/Dolomite/ExpandCard';
import LendingMarketDolomiteAddInfo from '@/modules/lending/components/Markets/Info/DolomiteAdd';
import type { Token } from '@/modules/lending/components/Markets/Input';
import LendingMarketInput from '@/modules/lending/components/Markets/Input';
import { useDynamicLoader, useMultiState } from '@/modules/lending/hooks';
import type { DexProps } from '@/modules/lending/models';
import { StyledFlex } from '@/styled/styles';

import { StyledNew } from './styles';

const DolomiteAddPosition = (props: Props) => {
  const { markets, dexConfig, addAction, toast, chainId, onSuccess, account } = props;

  const { provider } = useAccount();
  const [Handler] = useDynamicLoader({ path: '/lending/handlers', name: dexConfig.loaderName });

  const tokenList: any = Object.values(markets || {});

  const [state, updateState] = useMultiState<any>({
    expand: false,
    currentToken: tokenList[0] || { underlyingToken: {} },
    amount: '',
    loading: false
  });

  const { run: setLoading } = useDebounceFn(
    () => {
      updateState({ loading: true });
    },
    { wait: 600 }
  );

  const handleClick = () => {
    updateState({ expand: !state.expand });
  };

  const handleAmountChange = (_amount: string) => {
    if (isNaN(Number(_amount))) return;
    _amount = trim(_amount);
    if (_amount.split('.')[1]?.length > 18) return;
    const isZero = Big(_amount || 0).eq(0);
    const params: any = { amount: _amount };
    const value = Big(
      Big(_amount || 0)
        .mul(state.currentToken.price)
        .toFixed(20, 0)
    );
    params.isBiggerThanBalance = Big(_amount || 0).gt(state.currentToken.balance || 0);
    params.buttonClickable = !params.isBiggerThanBalance;
    if (isZero) {
      params.isBiggerThanBalance = false;
      params.buttonClickable = false;
    }
    updateState(params);

    setLoading();
  };

  useEffect(() => {
    if (!markets || state.currentToken?.symbol) return;
    updateState({ currentToken: tokenList[0] });
  }, [markets, state.currentToken]);

  useEffect(() => {
    if (!state.expand) {
      updateState({
        amount: ''
      });
    }
  }, [state.expand]);

  return (
    <>
      <ExpandCard
        expand={state.expand}
        onToggle={handleClick}
        expandHeight={200}
        arrowStyle={{
          width: '3%'
        }}
        content={<StyledNew>Open New Borrow Position</StyledNew>}
      >
        <StyledFlex style={{ paddingTop: 30 }}>
          <LendingMarketDolomiteAddInfo
            {...state.currentToken}
            tips="Start by adding collateral for the borrow position. You will then be able to borrow against that collateral."
            list={[
              {
                label: 'Available to Collateral',
                type: 'balance',
                value: { ...state.currentToken, precision: 2, unit: state.currentToken?.symbol }
              }
            ]}
          />
          <div>
            <LendingMarketInput
              icon={state.currentToken?.icon}
              symbol={state.currentToken?.symbol}
              balance={state.currentToken?.balance}
              price={state.currentToken?.price}
              decimals={state.currentToken?.decimals}
              amount={state.amount}
              tokenList={tokenList}
              onChange={handleAmountChange}
              onTokenChange={(token: Token) => {
                updateState({ currentToken: token });
              }}
            />
            <LendingDialogButton
              style={{
                marginTop: 12
              }}
              disabled={!state.buttonClickable}
              actionText={'Add Position'}
              amount={state.amount}
              data={{
                ...state.currentToken,
                config: dexConfig
              }}
              addAction={addAction}
              toast={toast}
              chainId={chainId}
              unsignedTx={state.unsignedTx}
              isError={state.isError}
              loading={state.loading}
              gas={state.gas}
              account={account}
              onApprovedSuccess={() => {
                setLoading();
              }}
              onSuccess={async () => {
                onSuccess?.();
                updateState({ amount: '' });
              }}
            />
          </div>
        </StyledFlex>
      </ExpandCard>
      {Handler && (
        <Handler
          provider={provider}
          account={account}
          update={state.loading}
          chainId={chainId}
          data={{
            actionText: 'Add Position',
            ...state.currentToken,
            config: dexConfig
          }}
          amount={state.amount}
          onLoad={(_data: any) => {
            console.log('%cadd position handler DATA onLoad: %o', 'background: #6439FF; color:#fff;', _data);
            updateState({
              ..._data,
              loading: false
            });
          }}
        />
      )}
    </>
  );
};

export default DolomiteAddPosition;

interface Props extends DexProps {
  markets: any;
}
