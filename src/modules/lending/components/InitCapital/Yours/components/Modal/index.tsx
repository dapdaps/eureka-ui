import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo, useEffect, useMemo } from 'react';

import Modal from '@/components/Modal';
import LendingButton from '@/modules/lending/components/Button';
import { ERC20_ABI, OTOKEN_ABI } from '@/modules/lending/components/InitCapital/Abi';
import LendingMarketInput from '@/modules/lending/components/InitCapital/Markets/components/Input';
import { useDynamicLoader, useMultiState } from '@/modules/lending/hooks';
import { StyledContainer, StyledFlex, StyledFont, StyledSvg } from '@/styled/styles';
import { formatValueDecimal } from '@/utils/formate';

// const ArrowSvg = (
//   <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none" className="injected-svg" dataSrc="/static/icons/arrow-right.svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img">
//     <path d="M9.35355 4.35355C9.54882 4.15829 9.54882 3.84171 9.35355 3.64645L6.17157 0.464466C5.97631 0.269204 5.65973 0.269204 5.46447 0.464466C5.2692 0.659728 5.2692 0.976311 5.46447 1.17157L8.29289 4L5.46447 6.82843C5.2692 7.02369 5.2692 7.34027 5.46447 7.53553C5.65973 7.7308 5.97631 7.7308 6.17157 7.53553L9.35355 4.35355ZM0 4.5H9V3.5H0V4.5Z" fill="#1A1A1A"></path>
//   </svg>
// )
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
    onSuccess,
    setCheckedRecord
  } = props;
  const { collateralFactor, borrowFactor } = data || {};

  const [Handler] = useDynamicLoader({ path: '/lending/handlers', name: dexConfig?.loaderName });
  const [state, updateState] = useMultiState<any>({
    balance: '',
    healthFactor: Infinity,
    amount: '',
    buttonClickable: false
  });

  const price = underlyingPrices[data?.address];

  const tokenList = useMemo(() => Object.values(markets), [markets]);

  const currHealthFactor = useMemo(() => {
    if (depositDataList && borrowDataList) {
      let CollateralCredit: any = 0;
      depositDataList?.forEach((currentData: any, index: number) => {
        CollateralCredit = Big(CollateralCredit).plus(
          Big(currentData?.amount).times(underlyingPrices[currentData?.address]).times(currentData?.collateralFactor)
        );
      });
      let BorrowCredit: any = 0;
      borrowDataList?.forEach((currentData: any, index: number) => {
        BorrowCredit = Big(BorrowCredit).plus(
          Big(currentData?.amount).times(underlyingPrices[currentData?.address]).times(currentData?.borrowFactor)
        );
      });
      return Big(CollateralCredit)
        .div(BorrowCredit ? BorrowCredit : 1)
        .toFixed();
    } else {
      return Infinity;
    }
  }, [depositDataList, borrowDataList]);
  const getBalance = async () => {
    if (actionText === 'Deposit') {
      const contract = new ethers.Contract(data?.underlyingToken?.address, ERC20_ABI, provider?.getSigner());
      const result = await contract.balanceOf(account);

      updateState({
        balance: ethers.utils.formatUnits(result, data?.underlyingToken?.decimals)
      });
    }
    if (actionText === 'Borrow') {
      let CollateralCredit: any = 0;
      depositDataList?.forEach((currentData: any, index: number) => {
        CollateralCredit = Big(CollateralCredit).plus(
          Big(currentData?.amount).times(underlyingPrices[currentData?.address]).times(currentData?.collateralFactor)
        );
      });
      let currBorrowCredit: any = 0;
      borrowDataList?.forEach((currentData: any, index: number) => {
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
        (borrowData: any) => borrowData?.address?.toLocaleLowerCase() === data?.address?.toLocaleLowerCase()
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

  const getHealthFactor = (_amount: string, _actionText: any) => {
    if (depositDataList && borrowDataList && _amount) {
      let CollateralCredit: any = 0;
      depositDataList?.forEach((currentData: any, index: number) => {
        CollateralCredit = Big(CollateralCredit).plus(
          Big(currentData?.amount).times(underlyingPrices[currentData?.address]).times(currentData?.collateralFactor)
        );
      });
      let BorrowCredit: any = 0;
      borrowDataList?.forEach((currentData: any, index: number) => {
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
  const newHealthFactor: any = useMemo(() => getHealthFactor(state?.amount, actionText), [state?.amount, actionText]);
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
    const _healthFactor: any = getHealthFactor(_amount, actionText);
    if (actionText === 'Deposit') {
      params.amount = _amount;
      params.healthFactor = _healthFactor;
      params.isOverSize = false;
      params.isBigerThanBalance = Big(_amount).gt(state?.balance || 0);
    }
    if (actionText === 'Withdraw') {
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
    data?.address && getBalance();
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
          tokenList={tokenList}
          onTokenChange={(token: any) => {
            setCheckedRecord(token);
          }}
        />
        <StyledFlex gap="10px" flexDirection="column" style={{ width: '100%' }}>
          {/* <StyledFlex justifyContent='space-between' style={{ width: '100%', padding: '0 8px' }}>
            <StyledFont color='#979abe' fontSize='12px' fontWeight='500'>Deposit APY</StyledFont>
            <StyledFont color='#FFF' fontSize='12px' fontWeight='500'>1</StyledFont>
          </StyledFlex>
          <StyledFlex justifyContent='space-between' style={{ width: '100%', padding: '0 8px' }}>
            <StyledFont color='#979abe' fontSize='12px' fontWeight='500'>Reward APY</StyledFont>
            <StyledFont color='#FFF' fontSize='12px' fontWeight='500'>1</StyledFont>
          </StyledFlex>
          <StyledFlex justifyContent='space-between' style={{ width: '100%', padding: '0 8px' }}>
            <StyledFont color='#979abe' fontSize='12px' fontWeight='500'>Health Factor</StyledFont>
            <StyledFont color='#FFF' fontSize='12px' fontWeight='500'>1</StyledFont>
          </StyledFlex>
          <StyledFlex justifyContent='space-between' style={{ width: '100%', padding: '0 8px' }}>
            <StyledFont color='#979abe' fontSize='12px' fontWeight='500'>Total Deposit</StyledFont>
            <StyledFont color='#FFF' fontSize='12px' fontWeight='500'>1</StyledFont>
          </StyledFlex> */}
          <StyledFlex justifyContent="space-between" style={{ width: '100%', padding: '0 8px' }}>
            <StyledFont color="#979abe" fontSize="12px" fontWeight="500">
              Health Factor
            </StyledFont>
            <StyledFlex gap="8px" style={{ color: '#FFF' }}>
              <StyledFont color="#FFF" fontSize="12px" fontWeight="500">
                {formatValueDecimal(currHealthFactor, '', 2)}
              </StyledFont>
              <StyledSvg>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path
                    d="M9.35355 4.35355C9.54882 4.15829 9.54882 3.84171 9.35355 3.64645L6.17157 0.464466C5.97631 0.269204 5.65973 0.269204 5.46447 0.464466C5.2692 0.659728 5.2692 0.976311 5.46447 1.17157L8.29289 4L5.46447 6.82843C5.2692 7.02369 5.2692 7.34027 5.46447 7.53553C5.65973 7.7308 5.97631 7.7308 6.17157 7.53553L9.35355 4.35355ZM0 4.5H9V3.5H0V4.5Z"
                    fill="#FFF"
                  />
                </svg>
              </StyledSvg>
              {isFinite(newHealthFactor) ? (
                <StyledFont color={Big(newHealthFactor).lt(1.02) ? 'red' : '#FFF'} fontSize="12px" fontWeight="500">
                  {isFinite(newHealthFactor) ? formatValueDecimal(newHealthFactor, '', 2) : '-'}
                </StyledFont>
              ) : (
                <StyledFont color="#FFF" fontSize="12px" fontWeight="500">
                  -
                </StyledFont>
              )}
            </StyledFlex>
          </StyledFlex>
        </StyledFlex>
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
