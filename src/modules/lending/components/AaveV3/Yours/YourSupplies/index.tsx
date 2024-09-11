import { styled } from 'styled-components';

import { useMultiState } from '@/modules/lending/hooks';

import CardEmpty from '../../Cards/CardEmpty';
import CardsTable from '../../Cards/CardsTable';
import CollateralModal from '../../Modal/Collateral';
import WithdrawModal from '../../Modal/Withdraw';
import PrimaryButton from '../../PrimaryButton';
import Switch from '../../Switch';
import TokenWrapper from '../../TokenWrapper';

const CenterItem = styled.div`
  display: flex;
  align-items: center;
`;
const PrimaryTxt = styled.div`
  color: var(--agg-primary-color, #fff);
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
`;
const SubText = styled.div`
  color: #6f6f6f;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;

const YourSupplies = (props: any) => {
  const {
    config,
    chainId,
    yourSupplies,
    yourTotalBorrow,
    yourTotalCollateral,
    onActionSuccess,
    showWithdrawModal,
    setShowWithdrawModal,
    healthFactor,
    withdrawETHGas,
    withdrawERC20Gas,
    formatHealthFactor,
    calcHealthFactor,
    account,
    addAction,
    dexConfig,
    threshold,
    prices,
    theme,
    onRefresh,
    unifyNumber,
    from,
    provider
  } = props;

  const [state, updateState] = useMultiState<any>({
    data: undefined,
    showCollateralModal: false
  });

  const WithdrawButton = ({ data }: any) => {
    return (
      <PrimaryButton
        config={config}
        theme={theme}
        onClick={() => {
          updateState({ data });
          setShowWithdrawModal(true);
        }}
      >
        Withdraw
      </PrimaryButton>
    );
  };
  const renderCollateral = (record: any) => {
    return (
      <Switch
        active={record.isCollateraled}
        theme={theme}
        onChange={() => {
          console.log('--------', record);
          updateState({
            data: record,
            showCollateralModal: true,
            flag: record.isCollateraled ? false : true
          });
        }}
      />
    );
  };

  return (
    <>
      {!yourSupplies || yourSupplies.length === 0 ? (
        <CardEmpty>Nothing supplied yet</CardEmpty>
      ) : (
        <>
          <CardsTable
            headers={['Asset', 'Balance', 'APY', 'Collateral', '']}
            data={yourSupplies.map((row: any, idx: any) => {
              return [
                <TokenWrapper key={idx}>
                  <img width={64} height={64} src={row?.icon} />
                  <CenterItem>
                    <PrimaryTxt>{row.symbol}</PrimaryTxt>
                  </CenterItem>
                </TokenWrapper>,
                <div key={idx}>
                  <PrimaryTxt>{unifyNumber(row.underlyingBalance)}</PrimaryTxt>
                  <SubText>${unifyNumber(row.underlyingBalanceUSD)}</SubText>
                </div>,

                <div key={idx}>
                  <PrimaryTxt>{`${(Number(row.supplyAPY) * 100).toFixed(2)} %`}</PrimaryTxt>
                  <SubText>
                    {dexConfig.rewardToken && row.supplyRewardApy
                      ? `${(Number(row.supplyRewardApy) * 100).toFixed(2)} %`
                      : ''}
                  </SubText>
                </div>,
                renderCollateral(row),
                <WithdrawButton key={idx} data={row} />
              ];
            })}
          />
        </>
      )}
      {showWithdrawModal && (
        <WithdrawModal
          config={config}
          theme={theme}
          chainId={chainId}
          data={{
            ...state.data,
            healthFactor
          }}
          dexConfig={dexConfig}
          onActionSuccess={onActionSuccess}
          withdrawETHGas={withdrawETHGas}
          withdrawERC20Gas={withdrawERC20Gas}
          formatHealthFactor={formatHealthFactor}
          calcHealthFactor={calcHealthFactor}
          account={account}
          prices={prices}
          from={from}
          yourTotalBorrow={yourTotalBorrow}
          yourTotalCollateral={yourTotalCollateral}
          threshold={threshold}
          addAction={addAction}
          unifyNumber={unifyNumber}
          onRequestClose={() => setShowWithdrawModal(false)}
          provider={provider}
        />
      )}
      {state.showCollateralModal && (
        <CollateralModal
          flag={state.flag}
          config={config}
          theme={theme}
          chainId={chainId}
          data={{
            ...state.data,
            healthFactor
          }}
          onActionSuccess={onActionSuccess}
          formatHealthFactor={formatHealthFactor}
          calcHealthFactor={calcHealthFactor}
          yourTotalBorrow={yourTotalBorrow}
          account={account}
          from={from}
          unifyNumber={unifyNumber}
          provider={provider}
          onRequestClose={() => {
            updateState({
              showCollateralModal: false
            });
            onRefresh?.();
          }}
        />
      )}
    </>
  );
};

export default YourSupplies;
