import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo, useEffect } from 'react';

import Modal from '@/components/Modal';
import LendingButton from '@/modules/lending/components/Button';
import { ERC20_ABI, OTOKEN_ABI } from '@/modules/lending/components/InitCapital/Abi';
import LendingMarketInput from '@/modules/lending/components/InitCapital/Markets/components/Input';
import { useDynamicLoader, useMultiState } from '@/modules/lending/hooks';
import { StyledContainer, StyledFlex } from '@/styled/styles';
const ModalContent = memo((props: any) => {
  const {
    toast,
    token,
    data,
    sequence,
    account,
    markets,
    provider,
    chainId,
    addAction,
    dexConfig,
    actionText,
    multicall,
    multicallAddress,
    depositDataList,
    borrowDataList,
    underlyingPrices,
    onSuccess
  } = props;
  const { collateralFactor, borrowFactor } = data;

  const [Handler] = useDynamicLoader({ path: '/lending/handlers', name: dexConfig?.loaderName });
  const [state, updateState] = useMultiState<any>({
    balance: '',
    healthFactor: Infinity,
    amount: '',
    buttonClickable: false
  });
  const price = underlyingPrices[data?.address];
  const getBalance = async () => {
    if (actionText === 'Deposit') {
      const contract = new ethers.Contract(data?.underlyingToken?.address, ERC20_ABI, provider?.getSigner());
      const result = await contract.balanceOf(account);

      updateState({
        balance: ethers.utils.formatUnits(result, data?.underlyingToken?.decimals)
      });
    }
    if (actionText === 'Borrow') {
      let CollateralCredit = 0;
      depositDataList?.forEach((currentData, index) => {
        CollateralCredit = Big(CollateralCredit).plus(
          Big(currentData?.amount).times(underlyingPrices[currentData?.address]).times(currentData?.collateralFactor)
        );
      });
      let currBorrowCredit = 0;
      borrowDataList?.forEach((currentData, index) => {
        currBorrowCredit = Big(currBorrowCredit).plus(
          Big(currentData?.amount).times(underlyingPrices[currentData?.address]).times(currentData?.borrowFactor)
        );
      });
      const remainingBorrowCredit = Big(Big(CollateralCredit).div(1.02)).minus(currBorrowCredit);
      updateState({
        balance: Big(remainingBorrowCredit).div(Big(underlyingPrices[data?.address]).times(borrowFactor)).toFixed()
      });
    }
    if (actionText === 'Withdraw') {
      const borrowData = borrowDataList?.find(
        (borrowData) => borrowData?.address?.toLocaleLowerCase() === data?.address?.toLocaleLowerCase()
      );
      if (borrowData) {
        const BorrowCredit = Big(borrowData?.amount)
          .times(underlyingPrices[borrowData?.address])
          .times(markets[borrowData?.address]?.borrowFactor)
          .toFixed();
        const CollateralCredit = Big(1.02).times(BorrowCredit).toFixed();
        const TotalSupply = Big(CollateralCredit).div(Big(collateralFactor).times(price)).toFixed();
        updateState({
          balance: Big(data?.amount).minus(TotalSupply).toFixed()
        });
      } else {
        updateState({
          balance: data?.amount
        });
      }
    }

    if (actionText === 'Repay') {
      updateState({
        balance: data?.amount
      });
    }
  };
  const getTrade = () => {
    updateState({
      loading: true
    });
  };

  const { run: debouncedGetTrade } = useDebounceFn(getTrade, {
    wait: 500
  });

  const getHealthFactor = (_amount, _actionText) => {
    if (depositDataList && borrowDataList) {
      let CollateralCredit = 0;
      depositDataList?.forEach((currentData, index) => {
        CollateralCredit = Big(CollateralCredit).plus(
          Big(currentData?.amount).times(underlyingPrices[currentData?.address]).times(currentData?.collateralFactor)
        );
      });
      let BorrowCredit = 0;
      borrowDataList?.forEach((currentData, index) => {
        BorrowCredit = Big(BorrowCredit).plus(
          Big(currentData?.amount).times(underlyingPrices[currentData?.address]).times(currentData?.borrowFactor)
        );
      });
      if (_actionText === 'Deposit') {
        const currCollateralCredit = Big(CollateralCredit).plus(
          Big(_amount).times(underlyingPrices[data?.address]).times(data?.collateralFactor)
        );
        return Big(currCollateralCredit)
          .div(BorrowCredit ? BorrowCredit : 1)
          .toFixed();
      }
      if (_actionText === 'Withdraw') {
        const currCollateralCredit = Big(CollateralCredit).minus(
          Big(_amount).times(underlyingPrices[data?.address]).times(data?.collateralFactor)
        );
        return Big(currCollateralCredit)
          .div(BorrowCredit ? BorrowCredit : 1)
          .toFixed();
      }
      if (_actionText === 'Borrow') {
        const currBorrowCredit = Big(BorrowCredit).plus(
          Big(_amount).times(underlyingPrices[data?.address]).times(data?.borrowFactor)
        );
        return Big(CollateralCredit)
          .div(currBorrowCredit ? currBorrowCredit : 1)
          .toFixed();
      }
      if (_actionText === 'Repay') {
        const currBorrowCredit = Big(BorrowCredit).minus(
          Big(_amount).times(underlyingPrices[data?.address]).times(data?.borrowFactor)
        );
        return Big(CollateralCredit)
          .div(currBorrowCredit ? currBorrowCredit : 1)
          .toFixed();
      }
    } else {
      return Infinity;
    }
  };
  const onAmountChange = async (_amount: string) => {
    if (isNaN(Number(_amount))) return;
    if (_amount.split('.')[1]?.length > 18) return;
    const isZero = Big(_amount || 0).eq(0);
    if (isZero) {
      updateState({
        amount: _amount,
        buttonClickable: false,
        borrowLimit: '',
        isEmpty: Number(_amount) === 0 && _amount !== '',
        isOverSize: false,
        isBigerThanBalance: false
      });
      return;
    }

    const params: any = {};
    const _healthFactor = getHealthFactor(_amount, actionText);
    if (actionText === 'Deposit') {
      params.amount = _amount;
      params.healthFactor = _healthFactor;
      params.isOverSize = false;
      params.isBigerThanBalance = Big(_amount).gt(state?.balance || 0);
    }
    if (actionText === 'Withdraw') {
      // const _healthFactor = getHealthFactor(_amount, actionText)
      params.amount = _amount;
      params.healthFactor = _healthFactor;
      params.isOverSize = isFinite(_healthFactor) && Big(_healthFactor).lt(1.02);
      params.isBigerThanBalance = Big(_amount).gt(state?.balance || 0);
    }
    if (actionText === 'Borrow') {
      params.amount = _amount;
      params.healthFactor = _healthFactor;
      params.isBigerThanBalance = false;
      params.isOverSize = Big(_amount ? _amount : 0).gt(state?.balance || 0);
    }
    if (actionText === 'Repay') {
      params.amount = _amount;
      params.healthFactor = _healthFactor;
      params.isBigerThanBalance = false;
      params.isOverSize = Big(_amount ? _amount : 0).gt(state?.balance || 0);
    }
    params.buttonClickable = !params.isOverSize && !params.isBigerThanBalance;
    updateState(params);
    debouncedGetTrade();
  };

  useEffect(() => {
    getBalance();
  }, [data?.address]);
  return (
    <StyledContainer style={{ padding: '20px 30px' }}>
      <StyledFlex flexDirection="column" gap="10px">
        <LendingMarketInput
          icon={data?.underlyingToken?.icon}
          symbol={data?.underlyingToken?.symbol}
          decimals={data?.underlyingToken?.decimals}
          balance={state?.balance}
          price={price}
          amount={state.amount}
          onChange={onAmountChange}
        />
        <LendingButton
          disabled={!state.buttonClickable}
          actionText={actionText}
          amount={state.amount}
          data={{
            ...data,
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
          spender={dexConfig?.MONEY_MARKET_HOOK}
          onApprovedSuccess={getTrade}
          onSuccess={async () => {
            onSuccess?.();
            updateState({ amount: '' });
          }}
        />
      </StyledFlex>

      {Handler && (
        <Handler
          provider={provider}
          account={account}
          update={state.loading}
          chainId={chainId}
          data={{
            ...data,
            sequence,
            actionText,
            healthFactor: state?.healthFactor,
            config: dexConfig
          }}
          amount={state.amount}
          onLoad={(_data: any) => {
            console.log('%chandler DATA onLoad: %o', 'background: #6439FF; color:#fff;', _data);
            updateState({
              ..._data,
              loading: false
            });
          }}
        />
      )}
    </StyledContainer>
  );
});
export default memo(function index(props: any) {
  const { visible, onClose, actionText } = props;
  return (
    <Modal
      title={actionText}
      display={visible}
      showHeader
      width={460}
      onClose={onClose}
      content={<ModalContent {...{ ...props }} />}
    />
  );
});
