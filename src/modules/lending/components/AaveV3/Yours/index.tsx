import { styled } from 'styled-components';

const StyledYours = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 16px;
`;
const YoursTableWrapper = styled.div`
  color: var(--agg-primary-color, #fff);
  background-color: var(--agg-secondary-color, rgba(53, 55, 73, 0.2));
  border: 1px solid var(--agg-border-color, rgba(53, 55, 73, 0.2));
  border-radius: 12px;
  width: 50%;
`;
const Title = styled.div`
  height: 60px;
  padding: 10px 20px 0;
  color: var(--agg-primary-color, #fff);
  /* border-bottom: 1px solid #292c42; */
`;
const SubTitle = styled.div`
  display: flex;
  align-items: center;
`;
const Label = styled.div`
  color: #979abe;
  font-size: 16px;
  font-weight: 400;
  margin-right: 5px;
`;
const Value = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  margin-right: 15px;
`;
const Yours = (props: any) => {
  return (
    <>
      <Widget
        src={`${config.ownerId}/widget/AAVE.HeroData`}
        props={{
          config,
          netWorth: `$ ${state.netWorthUSD ? Big(state.netWorthUSD || 0).toFixed(2) : '-'}`,
          netAPY: `${
            state.netAPY
              ? Number(
                  Big(state.netAPY || 0)
                    .times(100)
                    .toFixed(2),
                )
              : '-'
          }%`,
          healthFactor: formatHealthFactor(state.healthFactor),
          totalMarketSize: state.totalMarketSize,
          totalAvailable: state.totalAvailable,
          totalBorrows: state.totalBorrows,
          theme: dexConfig?.theme,
          yourBorrows: state.yourBorrows,
        }}
      />
      <StyledYours>
        <YoursTableWrapper>
          <Title>
            You Supplies
            {state.yourSupplies && state.yourSupplies.length ? (
              <SubTitle>
                <Label>Balance:</Label>
                <Value>$ {unifyNumber(state.yourTotalSupply)}</Value>

                <Label>APY:</Label>
                <Value>{Big(state.yourSupplyApy).times(100).toFixed(2)} %</Value>

                <Label>Collateral:</Label>
                <Value>$ {unifyNumber(state.yourTotalCollateral)}</Value>
              </SubTitle>
            ) : null}
          </Title>
          <Widget
            src={`${config.ownerId}/widget/AAVE.Card.YourSupplies`}
            props={{
              config,
              chainId: chainId,
              yourSupplies: state.yourSupplies,
              showWithdrawModal: state.showWithdrawModal,
              setShowWithdrawModal: (isShow) => State.update({ showWithdrawModal: isShow }),
              onActionSuccess,
              healthFactor: formatHealthFactor(state.healthFactor),
              formatHealthFactor,
              calcHealthFactor,
              withdrawETHGas,
              withdrawERC20Gas,
              account,
              prices,
              threshold: state.threshold,
              addAction,
              dexConfig,
              yourTotalCollateral: state.yourTotalCollateral,
              yourTotalBorrow: state.yourTotalBorrow,
              theme: dexConfig?.theme,
              unifyNumber,
            }}
          />
        </YoursTableWrapper>
        <YoursTableWrapper>
          <Title>
            You Borrows
            {state.yourBorrows && state.yourBorrows.length ? (
              <SubTitle>
                <Label>Balance:</Label>
                <Value>$ {unifyNumber(state.yourTotalBorrow || 0)}</Value>

                <Label>APY:</Label>
                <Value>
                  {Big(state.yourBorrowApy || 0)
                    .times(100)
                    .toFixed(2)}{' '}
                  %
                </Value>

                <Label>Borrow power used:</Label>
                <Value>{Number(state.BorrowPowerUsed || 0).toFixed(2)}%</Value>
              </SubTitle>
            ) : null}
          </Title>
          <Widget
            src={`${config.ownerId}/widget/AAVE.Card.YourBorrows`}
            props={{
              config,
              chainId: chainId,
              assetsToSupply: state.assetsToSupply,
              yourBorrows: state.yourBorrows,
              showRepayModal: state.showRepayModal,
              setShowRepayModal: (isShow) => State.update({ showRepayModal: isShow }),
              showBorrowModal: state.showBorrowModal,
              setShowBorrowModal: (isShow) => State.update({ showBorrowModal: isShow }),
              formatHealthFactor,
              calcHealthFactor,
              onActionSuccess,
              repayETHGas,
              repayERC20Gas,
              borrowETHGas,
              borrowERC20Gas,
              addAction,
              dexConfig,
              healthFactor: formatHealthFactor(state.healthFactor),
              theme: dexConfig?.theme,
              unifyNumber,
            }}
          />
        </YoursTableWrapper>
      </StyledYours>
      {dexConfig.rewardToken ? (
        <Widget
          src={`${config.ownerId}/widget/AAVE.Card.RewardsTable`}
          props={{
            account,
            config,
            data: state.rewardData,
            dapps: dexConfig,
            onSuccess,
            markets,
            prices,
            rewardAddress: config.incentivesProxy,
            toast,
            theme: dexConfig?.theme,
            unifyNumber,
          }}
        />
      ) : null}
    </>
  );
};

export default Yours;
