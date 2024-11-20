import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import { ethers } from 'ethers';
import _ from 'lodash';
import { memo, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import Modal from '@/components/Modal';
import Loading from '@/modules/components/Loading';
import LendingButton from '@/modules/lending/components/Button';
import { ERC20_ABI } from '@/modules/lending/components/InitCapital/Abi';
import LendingMarketInput from '@/modules/lending/components/InitCapital/Markets/components/Input';
import useData from '@/modules/lending/components/InitCapital/Yours/hooks/useData';
import useFunctions from '@/modules/lending/components/InitCapital/Yours/hooks/useFunctions';
import { useDynamicLoader, useMultiState } from '@/modules/lending/hooks';
import { StyledContainer, StyledFlex, StyledFont, StyledSvg } from '@/styled/styles';
import { formatValueDecimal } from '@/utils/formate';

// const ArrowSvg = (
//   <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none" className="injected-svg" dataSrc="/static/icons/arrow-right.svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img">
//     <path d="M9.35355 4.35355C9.54882 4.15829 9.54882 3.84171 9.35355 3.64645L6.17157 0.464466C5.97631 0.269204 5.65973 0.269204 5.46447 0.464466C5.2692 0.659728 5.2692 0.976311 5.46447 1.17157L8.29289 4L5.46447 6.82843C5.2692 7.02369 5.2692 7.34027 5.46447 7.53553C5.65973 7.7308 5.97631 7.7308 6.17157 7.53553L9.35355 4.35355ZM0 4.5H9V3.5H0V4.5Z" fill="#1A1A1A"></path>
//   </svg>
// )
const StyledLine = styled.div`
  margin: 8px 0;
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.5);
`;
const StyledApproveButton = styled.div`
  margin-bottom: 8px;
  cursor: pointer;
  /* padding: 6px 16px; */
  width: 82px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--button-color);
  color: var(--button-text-color);
  font-family: Montserrat;
  font-size: 12px;
`;
type ModeType = 'general' | 'stable' | 'nonStable';
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
    walletBalances,
    multicallAddress,
    depositDataList,
    borrowDataList,
    underlyingPrices,
    onBack,
    onClose,
    onSuccess,
    setCheckedRecord
  } = props;

  const { MONEY_MARKET_HOOK } = dexConfig;

  const [repayDataList, setRepayDataList] = useState<any>(null);

  const [Handler] = useDynamicLoader({ path: '/lending/handlers', name: dexConfig?.loaderName });

  const { currMode, collateralFactor, borrowFactor, currHealthFactor, getLatestHealthFactor } = useData(props);

  const { getMode, getHealthFactor, getCollateralCredit, getBorrowCredit } = useFunctions();

  const needGetMoreTokens = useMemo(() => {
    const tokens: any = [];
    borrowDataList?.forEach((borrowData: any) => {
      const repayAmount = borrowData?.amount; // Big(borrowData?.amount).times(underlyingPrices[borrowData?.address]).div(props?.usdcPrice).toFixed()
      const walletBalance = walletBalances[borrowData?.address];

      console.log('==repayAmount', repayAmount);
      console.log('==walletBalance', walletBalance);
      // const usdcWalletBalance = Big(walletBalance).times(underlyingPrices[borrowData?.address]).div(props?.usdcPrice).toFixed()
      const needBalance = Big(repayAmount).minus(walletBalance).toFixed();
      if (Big(needBalance).gt(0)) {
        tokens.push({
          ...borrowData,
          needBalance,
          needUsdcBalance: Big(needBalance).times(underlyingPrices[borrowData?.address]).div(props?.usdcPrice).toFixed()
        });
      }
    });
    console.log('====tokens', tokens);
    return tokens;
  }, [walletBalances]);

  const needApprovedTokens = useMemo(() => {
    console.log('===repayDataList', repayDataList);
    return repayDataList?.filter((repayData: any) => !repayData?.approved);
  }, [repayDataList]);

  const [state, updateState] = useMultiState<any>({
    balance: '',
    healthFactor: Infinity,
    amount: '',
    buttonClickable: false
  });

  const price = underlyingPrices[data?.address];

  const tokenList = useMemo(() => Object.values(markets), [markets]);

  const getBalance = async () => {
    if (actionText === 'Deposit') {
      let result = null;
      if (data?.underlyingToken?.address === 'native') {
        result = await provider.getBalance(account);
      } else {
        const contract = new ethers.Contract(data?.underlyingToken?.address, ERC20_ABI, provider?.getSigner());
        result = await contract.balanceOf(account);
      }
      updateState({
        balance: ethers.utils.formatUnits(result, data?.underlyingToken?.decimals)
      });
    }
    if (actionText === 'Borrow') {
      const CollateralCredit = getCollateralCredit(depositDataList, currMode, underlyingPrices);
      const BorrowCredit = getBorrowCredit(borrowDataList, currMode, underlyingPrices);
      const remainingBorrowCredit = Big(Big(CollateralCredit).div(1.02)).minus(BorrowCredit);
      updateState({
        balance: Big(remainingBorrowCredit)
          .div(Big(underlyingPrices[data?.address]).times(borrowFactor))
          .toFixed(data?.underlyingToken?.decimals, 0)
      });
    }
    if (actionText === 'Withdraw') {
      if (borrowDataList?.length > 0) {
        const BorrowCredit = getBorrowCredit(borrowDataList, currMode, underlyingPrices);
        const CollateralCredit = Big(1.02).times(BorrowCredit).toFixed();
        console.log('=CollateralCredit', CollateralCredit);
        const TotalSupply = Big(CollateralCredit).div(Big(collateralFactor).times(price)).toFixed();
        const balance = Big(Big(data?.amount).minus(TotalSupply)).toFixed(data?.underlyingToken?.decimals, 0);
        updateState({
          balance: Big(balance).gt(0) ? balance : 0
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

  const latestHealthFactor: any = useMemo(
    () => getLatestHealthFactor(state?.amount, actionText, underlyingPrices),
    [state?.amount, actionText]
  );
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
    const _healthFactor: any = getLatestHealthFactor(_amount, actionText, underlyingPrices);
    const _depositDataList = _.cloneDeep(depositDataList);
    const _borrowDataList = _.cloneDeep(borrowDataList);

    if (actionText === 'Deposit') {
      params.amount = _amount;
      params.mode = getMode(
        [
          ..._depositDataList,
          {
            ...data,
            amount: _amount
          }
        ],
        _borrowDataList
      );
      params.healthFactor = _healthFactor;
      params.isOverSize = false;
      params.isBigerThanBalance = Big(_amount).gt(state?.balance || 0);
    }
    if (actionText === 'Withdraw') {
      const idx = _depositDataList.findIndex(
        (depositData: any, index: number) => depositData?.address === data?.address
      );
      if (idx > -1) {
        const _depositData = _depositDataList[idx];
        _depositData.amount = Big(_depositData?.amount ?? 0)
          .minus(_amount)
          .toFixed();
        if (Big(_depositData?.amount ?? 0).eq(0)) {
          _depositDataList.splice(idx);
        }
      }
      params.amount = _amount;
      params.mode = getMode(_depositDataList, _borrowDataList);
      params.healthFactor = _healthFactor;
      params.isOverSize = isFinite(_healthFactor) && Big(_healthFactor).lt(1.02);
      params.isBigerThanBalance = Big(_amount).gt(state?.balance || 0);
    }
    if (actionText === 'Borrow') {
      params.amount = _amount;
      params.mode = getMode(_depositDataList, [
        ..._borrowDataList,
        {
          ...data,
          amount: _amount
        }
      ]);
      params.healthFactor = _healthFactor;
      params.isBigerThanBalance = false;
      params.isOverSize = Big(_amount ? _amount : 0).gt(state?.balance || 0);
    }
    if (actionText === 'Repay') {
      const idx = _borrowDataList.findIndex((borrowData: any, index: number) => borrowData?.address === data?.address);

      if (idx > -1) {
        const _borrowData = _borrowDataList[idx];
        _borrowData.amount = Big(_borrowData?.amount ?? 0)
          .minus(_amount)
          .toFixed();
        if (Big(_borrowData?.amount ?? 0).eq(0)) {
          _borrowDataList.splice(idx);
        }
      }
      params.amount = _amount;
      params.mode = getMode(_depositDataList, _borrowDataList);
      params.healthFactor = _healthFactor;
      params.isBigerThanBalance = false;
      params.isOverSize = Big(_amount ? _amount : 0).gt(state?.balance || 0);
    }
    params.buttonClickable = !params.isOverSize && !params.isBigerThanBalance;
    updateState(params);
    debouncedGetTrade();
  };

  const getRepayDataList = async (_borrowDataList: any) => {
    const calls: any = [];
    _borrowDataList?.forEach((borrowData: any) => {
      calls.push({
        address:
          borrowData?.underlyingToken?.address === 'native'
            ? '0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8'
            : borrowData?.underlyingToken?.address,
        name: 'allowance',
        params: [account, MONEY_MARKET_HOOK]
      });
    });

    try {
      const response = await multicall({
        abi: ERC20_ABI,
        calls,
        options: {},
        multicallAddress,
        provider
      });

      console.log('====response', response);
      const _repayDataList = _.cloneDeep(_borrowDataList);
      for (let i = 0; i < _repayDataList?.length; i++) {
        const element = _repayDataList[i];
        const allowance = response?.[i]?.[0];
        const approveValue = Big(element?.amount).times(1.06).toFixed(6);
        _repayDataList[i].approved =
          element?.underlyingToken?.address === 'native'
            ? true
            : !Big(ethers.utils.formatUnits(allowance ?? 0, element.underlyingToken.decimals)).lt(approveValue || '0');
        _repayDataList[i].approving = false;
      }
      setRepayDataList(_repayDataList);
    } catch (error) {
      console.error(error);
    }
  };
  const updateRepayDataList = (index: number, params: any) => {
    const _repayDataList = _.cloneDeep(repayDataList);
    _repayDataList[index] = {
      ..._repayDataList[index],
      ...params
    };
    setRepayDataList(_repayDataList);
  };
  const handleApprove = (index: number) => {
    const _token: any = repayDataList[index];
    const toastId = toast?.loading({
      title: `Approve ${_token?.underlyingToken?.symbol}`
    });
    const _repayDataList = _.cloneDeep(repayDataList);

    updateRepayDataList(index, {
      approving: true
    });

    const contract = new ethers.Contract(_token?.underlyingToken?.address, ERC20_ABI, provider.getSigner());
    const approveValue: any = Big(_token?.amount).times(1.06).toFixed(6);

    contract
      .approve(MONEY_MARKET_HOOK, ethers.utils.parseUnits(approveValue, _token.underlyingToken.decimals))
      .then((tx: any) => tx.wait())
      .then((receipt: any) => {
        const { status, transactionHash } = receipt;
        toast?.dismiss(toastId);
        updateRepayDataList(index, {
          approved: true,
          approving: false
        });
        toast?.success({
          title: 'Approve Successfully!',
          tx: transactionHash,
          chainId
        });
      })
      .catch((error: any) => {
        updateRepayDataList(index, {
          approving: false
        });
        toast?.dismiss(toastId);
        toast?.fail({
          title: 'Approve Failed!',
          text: error?.message?.includes('user rejected transaction') ? 'User rejected transaction' : null
        });
      });
  };

  useEffect(() => {
    data?.address && getBalance();
  }, [data?.address]);

  useEffect(() => {
    getRepayDataList(props?.borrowDataList);
  }, [props?.borrowDataList]);

  useEffect(() => {
    if (actionText === 'Close Position') {
      const params: any = {};
      if (needGetMoreTokens?.length > 0) {
        params.isBigerThanBalance = true;
        params.isOverSize = false;
      }
      if (needApprovedTokens?.length > 0) {
        params.isBigerThanBalance = false;
        params.isOverSize = true;
      }
      params.mode = getMode(depositDataList, borrowDataList);
      params.healthFactor = getHealthFactor(depositDataList, borrowDataList, underlyingPrices);
      params.buttonClickable = !params.isOverSize && !params.isBigerThanBalance;
      updateState(params);
      debouncedGetTrade();
    }
  }, [actionText, needGetMoreTokens, needApprovedTokens]);

  return actionText === 'Close Position' ? (
    <StyledContainer style={{ padding: '12px 16px 16px' }}>
      <StyledFont color="#FFF" textAlign="center" fontSize="12px">
        By closing position, INIT will automatically repay all borrow assets and withdraw all deposit assets for you.
      </StyledFont>

      <StyledContainer style={{ marginTop: 8 }}>
        <StyledFlex justifyContent="space-between">
          <StyledFont color="rgba(255,255,255,0.6)">Position ID</StyledFont>
          <StyledFont color="#FFF" fontWeight="500">
            {props?.sequence}
          </StyledFont>
        </StyledFlex>

        <StyledLine />

        {repayDataList?.length > 0 && (
          <>
            <StyledFont color="rgba(255,255,255,0.6)" style={{ marginBottom: 8 }}>
              Repaying Debt
            </StyledFont>
            <StyledFlex flexDirection="column" gap="8px" style={{ marginBottom: 8 }}>
              {repayDataList?.map((borrowData: any, index: number) => (
                <StyledFlex key={index} justifyContent="space-between" style={{ width: '100%' }}>
                  <StyledFlex gap="4px">
                    <img src={borrowData?.underlyingToken?.icon} style={{ width: 12 }} />
                    <StyledFont color="#FFF" fontWeight="500">
                      {formatValueDecimal(borrowData?.amount, '', 6)} {borrowData?.underlyingToken?.symbol}
                    </StyledFont>
                  </StyledFlex>
                  <StyledFont color="#FFF" fontWeight="500">
                    {formatValueDecimal(
                      Big(borrowData?.amount)
                        .times(underlyingPrices[borrowData?.address])
                        .div(props?.usdcPrice)
                        .toFixed(),
                      '$',
                      2
                    )}
                  </StyledFont>
                </StyledFlex>
              ))}
            </StyledFlex>
            <StyledLine />
          </>
        )}
        <StyledFont color="rgba(255,255,255,0.6)" style={{ marginBottom: 8 }}>
          Final Withdrawal
        </StyledFont>
        <StyledFlex flexDirection="column" gap="8px" style={{ marginBottom: 8 }}>
          {props?.depositDataList?.map((depositData: any, index: number) => (
            <StyledFlex key={index} justifyContent="space-between" style={{ width: '100%' }}>
              <StyledFlex gap="4px">
                <img src={depositData?.underlyingToken?.icon} style={{ width: 12 }} />
                <StyledFont color="#FFF" fontWeight="500">
                  {formatValueDecimal(depositData?.amount, '', 6)} {depositData?.underlyingToken?.symbol}
                </StyledFont>
              </StyledFlex>
              <StyledFont color="#FFF" fontWeight="500">
                {formatValueDecimal(
                  Big(depositData?.amount)
                    .times(underlyingPrices[depositData?.address])
                    .div(props?.usdcPrice)
                    .toFixed(),
                  '$',
                  2
                )}
              </StyledFont>
            </StyledFlex>
          ))}
        </StyledFlex>

        {needGetMoreTokens?.length > 0 ? (
          <StyledContainer style={{ marginBottom: 8 }}>
            <StyledFont color="#EE4545" style={{ marginBottom: 8 }}>
              Insufficient balance in your wallet to repay debt. Please get more...
            </StyledFont>
            {needGetMoreTokens?.map((token: any, index: number) => (
              <StyledFlex justifyContent="space-between" alignItems="center" key={index}>
                <StyledFlex alignItems="center" gap="8px">
                  <img src={token?.underlyingToken?.icon} style={{ width: 12 }} />
                  <StyledFont color="#FFF">{formatValueDecimal(token?.needBalance, '', 4)}</StyledFont>
                  <StyledFont color="#FFF">{token?.underlyingToken?.symbol}</StyledFont>
                </StyledFlex>

                <StyledFont color="#FFF">{formatValueDecimal(token?.needUsdcBalance, '$', 2)}</StyledFont>
              </StyledFlex>
            ))}
          </StyledContainer>
        ) : needApprovedTokens?.length > 0 ? (
          <StyledContainer>
            <StyledFont color="rgba(255,255,255,0.6)" style={{ marginBottom: 8 }}>
              Token Approval
            </StyledFont>
            {needApprovedTokens?.map((token: any, index: number) => (
              <StyledFlex justifyContent="space-between" key={index}>
                <StyledFlex alignItems="center" gap="8px">
                  <img src={token?.underlyingToken?.icon} style={{ width: 24 }} />
                  <StyledFont color="#FFF">{token?.underlyingToken?.symbol}</StyledFont>
                </StyledFlex>

                {token?.approving ? (
                  <StyledApproveButton style={{ opacity: 0.5 }}>
                    <Loading size={16} />
                  </StyledApproveButton>
                ) : (
                  <StyledApproveButton
                    onClick={() => {
                      handleApprove(index);
                    }}
                  >
                    Approve
                  </StyledApproveButton>
                )}
              </StyledFlex>
            ))}
          </StyledContainer>
        ) : (
          <></>
        )}

        <LendingButton
          disabled={!state.buttonClickable}
          actionText={actionText}
          amount={Infinity}
          data={{
            ...data,
            dappName: dexConfig?.name,
            depositDataList,
            borrowDataList,
            walletBalances,
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
          spender={MONEY_MARKET_HOOK}
          onApprovedSuccess={getTrade}
          onSuccess={async () => {
            onSuccess?.();
            onClose?.();
            onBack?.();
            updateState({ amount: '' });
          }}
        />
      </StyledContainer>

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
            address: depositDataList?.[0]?.address,
            underlyingToken: depositDataList?.[0],
            depositDataList,
            borrowDataList,
            mode: state?.mode,
            config: dexConfig
          }}
          amount={Infinity}
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
  ) : (
    <StyledContainer style={{ padding: '12px 16px 16px' }}>
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
            onAmountChange('');
          }}
        />
        <StyledFlex gap="10px" flexDirection="column" style={{ width: '100%' }}>
          <StyledFlex justifyContent="space-between" style={{ width: '100%', padding: '0 8px' }}>
            <StyledFont color="#979abe" fontSize="12px" fontWeight="500">
              Health Factor
            </StyledFont>
            <StyledFlex gap="8px" style={{ color: '#FFF' }}>
              <StyledFont color="#FFF" fontSize="12px" fontWeight="500">
                {isFinite(currHealthFactor) ? formatValueDecimal(currHealthFactor, '', 2) : '∞'}
              </StyledFont>
              <StyledSvg>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path
                    d="M9.35355 4.35355C9.54882 4.15829 9.54882 3.84171 9.35355 3.64645L6.17157 0.464466C5.97631 0.269204 5.65973 0.269204 5.46447 0.464466C5.2692 0.659728 5.2692 0.976311 5.46447 1.17157L8.29289 4L5.46447 6.82843C5.2692 7.02369 5.2692 7.34027 5.46447 7.53553C5.65973 7.7308 5.97631 7.7308 6.17157 7.53553L9.35355 4.35355ZM0 4.5H9V3.5H0V4.5Z"
                    fill="#FFF"
                  />
                </svg>
              </StyledSvg>
              {isFinite(latestHealthFactor) ? (
                <StyledFont color={Big(latestHealthFactor).lt(1.02) ? 'red' : '#FFF'} fontSize="12px" fontWeight="500">
                  {formatValueDecimal(latestHealthFactor, '', 2)}
                </StyledFont>
              ) : (
                <StyledFont color="#FFF" fontSize="12px" fontWeight="500">
                  {Big(state?.amount ? state?.amount : 0).gt(0) ? '∞' : '-'}
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
          spender={MONEY_MARKET_HOOK}
          onApprovedSuccess={getTrade}
          onSuccess={async () => {
            onSuccess?.();
            onClose?.();
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
            mode: state?.mode,
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
      headerStyle={{ padding: '24px 16px 0' }}
      width={460}
      onClose={onClose}
      content={<ModalContent {...{ ...props }} />}
    />
  );
});
