import Big from 'big.js';
import { styled } from 'styled-components';

import Tooltip from '@/components/TitleTooltip';
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

const StyledIso = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  border: 1px solid var(--agg-primary-color, #6f6f6f);
  border-radius: 4px;
  padding: 4px;
  font-size: 12px;
  text-align: center;
  color: #6f6f6f;
  gap: 4px;
  width: 70px;
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
    gasEstimation,
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
    const needDisable = dexConfig.name === 'Bend' && data.symbol != 'HONEY' && Big(yourTotalBorrow).gt(0);
    return (
      <PrimaryButton
        config={config}
        theme={theme}
        disabled={needDisable}
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
          updateState({
            data: record,
            showCollateralModal: true,
            flag: record.isCollateraled ? false : true
          });
        }}
      />
    );
  };

  const headers =
    dexConfig.name === 'Bend' ? ['Asset', 'Balance', 'APY', ''] : ['Asset', 'Balance', 'APY', 'Collateral', ''];

  return (
    <>
      {!yourSupplies || yourSupplies.length === 0 ? (
        <CardEmpty>Nothing supplied yet</CardEmpty>
      ) : (
        <>
          <CardsTable
            headers={['Asset', 'Balance', 'APY', 'Collateral', '']}
            data={yourSupplies
              .filter((item: any) => Big(item.underlyingBalanceUSD || 0).gt(0.0001))
              .map((row: any, idx: any) => {
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
                  <div key={idx}>
                    {renderCollateral(row)}
                    {row.isIsolated && (
                      <StyledIso>
                        <div>Isolated</div>
                        <Tooltip
                          sx={{ marginTop: '-2px' }}
                          content="Isolated assets have limited borrowing power and other assets cannot be used as collateral."
                        />
                      </StyledIso>
                    )}
                  </div>,
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
          formatHealthFactor={formatHealthFactor}
          calcHealthFactor={calcHealthFactor}
          account={account}
          prices={prices}
          from={from}
          yourTotalBorrow={yourTotalBorrow}
          yourTotalCollateral={yourTotalCollateral}
          threshold={threshold}
          addAction={addAction}
          onRequestClose={() => setShowWithdrawModal(false)}
          provider={provider}
          gasEstimation={gasEstimation}
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
