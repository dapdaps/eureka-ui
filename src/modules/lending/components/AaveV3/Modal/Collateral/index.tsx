import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { styled } from 'styled-components';

import { useMultiState } from '@/modules/hooks';

import PrimaryButton from '../../PrimaryButton';
import { formatHealthFactor, unifyNumber } from '../../utils';
import FlexBetween from '../FlexBetween';
import BaseModal from '../index';
import RoundedCard from '../RoundedCard';

const WithdrawContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TokenTexture = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: var(--agg-primary-color, #fff);
`;

const TokenWrapper = styled.div`
  display: flex;
  img {
    margin-right: 4px;
  }
`;

const GrayTexture = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #9b9b9b;
`;

const PurpleTexture = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #6f6f6f;
`;

const WhiteTexture = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: var(--agg-primary-color, #fff);
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TransactionOverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  outline: none;

  font-size: 20px;
  font-weight: bold;
  color: var(--agg-primary-color, #fff);
  flex: 1;
  width: 160px;

  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
`;

const Tips = styled.div`
  font-size: 14px;
  color: var(--agg-primary-color, rgba(188, 0, 0, 1));
`;

const CollateralModal = (props: any) => {
  const {
    config,
    data,
    onRequestClose,
    onActionSuccess,
    chainId,
    flag,
    calcHealthFactor,
    yourTotalBorrow,
    account,
    theme,
    from,
    provider
  } = props;

  const {
    icon,
    underlyingAsset,
    decimals,
    symbol,
    underlyingBalance,
    underlyingBalanceUSD,
    aTokenAddress,
    availableLiquidity,
    healthFactor
  } = data;

  const [state, updateState] = useMultiState<any>({
    amount: '',
    amountInUSD: '0.00',
    allowanceAmount: 0,
    needApprove: false,
    loading: false,
    newHealthFactor: '-',
    gas: '-'
  });

  function setColl() {
    updateState({
      loading: true
    });

    const CollContract = new ethers.Contract(
      config.aavePoolV3Address,
      [
        {
          inputs: [
            { internalType: 'address', name: 'asset', type: 'address' },
            { internalType: 'bool', name: 'useAsCollateral', type: 'bool' }
          ],
          name: 'setUserUseReserveAsCollateral',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      provider.getSigner()
    );

    CollContract.setUserUseReserveAsCollateral(data.underlyingAsset, flag)
      .then((tx: any) => {
        tx.wait()
          .then((res: any) => {
            const { status } = res;
            if (status === 1) {
              onActionSuccess({
                msg: `Success`,
                callback: () => {
                  onRequestClose();
                  updateState({
                    loading: false
                  });
                }
              });
              console.log('tx succeeded', res);
            } else {
              console.log('tx failed', res);
              updateState({
                loading: false
              });
            }
          })
          .catch(() => updateState({ loading: false }));
      })
      .catch(() => updateState({ loading: false }));
  }

  useEffect(() => {
    const type = flag ? 'INC_COLLATERAL' : 'DEC_COLLATERAL';
    const newHealthFactor = formatHealthFactor(calcHealthFactor(type, symbol, underlyingBalance));

    updateState({ newHealthFactor });
  }, []);
  const refuseClose = yourTotalBorrow && !isNaN(Number(state.newHealthFactor)) && Big(state.newHealthFactor).lt(1);

  if (!data) {
    return <div />;
  }

  return (
    <BaseModal title="Collateral" onRequestClose={props.onRequestClose} from={from} config={config} theme={theme}>
      <WithdrawContainer>
        <RoundedCard title="Transaction Overview">
          <TransactionOverviewContainer>
            <FlexBetween>
              <PurpleTexture>Supply balance</PurpleTexture>
              <WhiteTexture>
                <Icon src={icon} alt="" />
                {unifyNumber(underlyingBalance)}
                {symbol}
              </WhiteTexture>
            </FlexBetween>
            <FlexBetween>
              <PurpleTexture>Health Factor</PurpleTexture>
              <div style={{ textAlign: 'right' }}>
                <PurpleTexture>
                  {formatHealthFactor(healthFactor)}→{state.newHealthFactor}
                </PurpleTexture>
              </div>
            </FlexBetween>
          </TransactionOverviewContainer>
        </RoundedCard>
        {refuseClose ? (
          <Tips>
            You can not switch usage as collateral mode for this currency, because it will cause collateral call
          </Tips>
        ) : null}
        <PrimaryButton config={config} theme={theme} loading={state.loading} disabled={refuseClose} onClick={setColl}>
          {flag ? 'Enable' : 'Disable'} {data.symbol} as Collateral
        </PrimaryButton>
      </WithdrawContainer>
    </BaseModal>
  );
};

export default CollateralModal;
