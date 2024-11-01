import Big from 'big.js';
import { useEffect } from 'react';

import LendingTotal from '@/modules/lending/components/Total';
import LendingBorrowTable from '@/modules/lending/components/Yours/BorrowTable';
import LendingDepositTable from '@/modules/lending/components/Yours/DepositTable';
import LendingRewardsTable from '@/modules/lending/components/Yours/RewardsTable';
import { useMultiState } from '@/modules/lending/hooks';

import { Label, Right, Title, Value, Yours, YoursTableWrapper } from './styles';

const LendingMarketYours = (props: Props) => {
  const { markets, dapps, toast, currentDapp, dappsConfig, onSuccess, account, chainId, dexConfig, curChain } = props;

  const [state, updateState] = useMultiState<any>({});

  const formatData = () => {
    let userTotalSupplyUsd = Big(0);
    let userTotalBorrowUsd = Big(0);
    let totalCollateralUsd = Big(0);
    if (currentDapp === 'All') {
      const dappsToList = Object.values(dapps);
      dappsToList.forEach((dapp: any) => {
        userTotalSupplyUsd = userTotalSupplyUsd.plus(dapp.userTotalSupplyUsd);
        userTotalBorrowUsd = userTotalBorrowUsd.plus(dapp.userTotalBorrowUsd);
        totalCollateralUsd = totalCollateralUsd.plus(dapp.totalCollateralUsd);
      });
    } else {
      const dapp = dapps[currentDapp];
      if (dapp) {
        userTotalSupplyUsd = Big(dapp.userTotalSupplyUsd || 0);
        userTotalBorrowUsd = Big(dapp.userTotalBorrowUsd || 0);
        totalCollateralUsd = Big(dapp.totalCollateralUsd || 0);
      }
    }
    const marketsToList = Object.values(markets);
    const supplies: any = [];
    const borrows: any = [];
    const rewards: any = [];
    let change = Big(0);
    marketsToList
      .filter((market: any) => market.dapp === currentDapp || currentDapp === 'All')
      .forEach((market: any) => {
        const dapp = dapps[market.dapp];
        let rewardSupplyApy = 0;
        let rewardBorrowApy = 0;
        if (market.distributionApy) {
          market.distributionApy.forEach((reward: any) => {
            const supplyApy = reward.apyAccountSupply || reward.supply;
            const borrowApy = reward.apyAccountBorrow || reward.borrow;
            rewardSupplyApy += Number(supplyApy.slice(0, -1));
            rewardBorrowApy += Number(borrowApy.slice(0, -1));
          });
        }

        if (Big(market.userSupply || 0).gt(0)) {
          supplies.push({
            icon: market.underlyingToken.icon,
            symbol: market.underlyingToken.symbol,
            dappIcon: dapp.dappIcon,
            dappName: dapp.dappName,
            apy: market.supplyApy,
            isCollateral: market.userMerberShip,
            balance: market.userSupply,
            balance_value: Big(market.userSupply || 0)
              .mul(market.underlyingPrice)
              .toString(),
            address: market.address,
            distributionApy: market.distributionApy,
            dexConfig: market.dexConfig
          });
          change = change.add(
            Big((Number(market?.supplyApy.slice(0, -1)) + rewardSupplyApy) / 100 || 0)
              .mul(market.userSupply || 0)
              .mul(market.underlyingPrice)
          );
        }
        if (Big(market.userBorrow || 0).gt(0)) {
          borrows.push({
            icon: market.underlyingToken.icon,
            symbol: market.underlyingToken.symbol,
            dappIcon: dapp.dappIcon,
            dappName: dapp.dappName,
            apy: market.borrowApy,
            borrowed: market.userBorrow,
            borrowed_value: Big(market.userBorrow || 0)
              .mul(market.underlyingPrice)
              .toString(),
            address: market.address,
            distributionApy: market.distributionApy
          });
          change = change.minus(
            Big((Number(market.borrowApy.slice(0, -1)) - rewardBorrowApy) / 100 || 0)
              .mul(market.userBorrow || 0)
              .mul(market.underlyingPrice)
          );
        }
      });
    Object.values(dapps).forEach((dapp: any) => {
      if (dapp.rewards && dapp.rewards.length && (currentDapp === 'All' || currentDapp === dapp.dappName)) {
        dapp.rewards.forEach((reward: any) => {
          rewards.push({
            icon: reward.icon,
            symbol: reward.symbol,
            dappIcon: dapp.dappIcon,
            dappName: dapp.dappName,
            dailyReward: reward.dailyRewards,
            dailyReward_value: Big(reward.dailyRewards || 0)
              .mul(reward.price || 0)
              .toString(),
            unclaimed: reward.unclaimed,
            unclaimed_value: Big(reward.unclaimed || 0)
              .mul(reward.price || 0)
              .toString(),
            ...reward
          });
        });
      }
    });

    let _userBorrowLimit = Big(userTotalBorrowUsd || 0)
      .div(totalCollateralUsd.eq(0) ? 1 : totalCollateralUsd)
      .mul(100);
    _userBorrowLimit = _userBorrowLimit.gt(100) ? Big(100) : _userBorrowLimit;

    updateState({
      userTotalSupplyUsd: userTotalSupplyUsd.toString(),
      userTotalBorrowUsd: userTotalBorrowUsd.toString(),
      userBorrowLimit: _userBorrowLimit.toFixed(2),
      supplies,
      borrows,
      rewards,
      netApy: change
        .div(userTotalSupplyUsd.eq(0) ? 1 : userTotalSupplyUsd)
        .mul(100)
        .toFixed(2)
    });
  };

  useEffect(() => {
    if (markets) {
      formatData();
    }
  }, [markets, currentDapp]);

  return (
    <>
      <Yours>
        <YoursTableWrapper>
          <Title>
            <div>
              <Label className="yours-table-title">You Deposit</Label>
              <Value className="supply-color">
                <LendingTotal total={state.userTotalSupplyUsd} digit={2} unit="$" />
              </Value>
            </div>
            <Right>
              <Label>Net APY</Label>
              <Value>{currentDapp === 'All' ? '-' : state.netApy}%</Value>
            </Right>
          </Title>
          <LendingDepositTable data={state.supplies || []} onButtonClick={props.onButtonClick} />
        </YoursTableWrapper>
        <YoursTableWrapper>
          <Title>
            <div>
              <Label className="yours-table-title">Borrow</Label>
              <Value className="borrow-color">
                <LendingTotal total={state.userTotalBorrowUsd} digit={2} unit="$" />
              </Value>
            </div>
            <Right>
              <Label>Your Borrow Limit</Label>
              <Value>{state.userBorrowLimit}%</Value>
            </Right>
          </Title>
          <LendingBorrowTable data={state.borrows || []} onButtonClick={props.onButtonClick} />
        </YoursTableWrapper>
      </Yours>
      <LendingRewardsTable
        data={state.rewards || []}
        dapps={dappsConfig}
        onSuccess={onSuccess}
        supplies={state.supplies}
        toast={toast}
        account={account}
        chainId={chainId}
        curChain={curChain}
        dexConfig={dexConfig}
      />
    </>
  );
};

export default LendingMarketYours;

export interface Props {
  markets: any;
  dapps: any;
  toast: any;
  currentDapp: any;
  dappsConfig: any;
  onSuccess: any;
  account: string;
  chainId: number;
  timestamp: number;
  dexConfig: any;
  curChain: any;

  onButtonClick?(address: string, text?: string): void;
}
