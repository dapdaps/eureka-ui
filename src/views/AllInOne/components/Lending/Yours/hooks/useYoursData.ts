import Big from 'big.js';
import { useEffect,useState } from 'react';

interface Dapp {
  userTotalSupplyUsd: string;
  userTotalBorrowUsd: string;
  totalCollateralUsd: string;
  dappIcon: string;
  dappName: string;
  rewards?: Reward[];
}

interface IDapps {
    [key: string]: Dapp;
}

interface Market {
  dapp: string;
  underlyingToken: { icon: string; symbol: string };
  userSupply: string;
  userBorrow: string;
  supplyApy: string;
  borrowApy: string;
  distributionApy?: { 
    apyAccountSupply?: string; 
    apyAccountBorrow?: string;
    supply?: string;
    borrow?: string;
  }[]
  underlyingPrice: string;
  address: string;
  userMerberShip: boolean;
}

interface Reward {
  icon: string;
  symbol: string;
  dailyRewards: string;
  price: string;
  unclaimed: string;
  dappIcon: string;
  dappName: string;
}

const useYoursData = (currentDapp: string, dapps: IDapps, markets: Market[]) => {
  const [userTotalSupplyUsd, setUserTotalSupplyUsd] = useState(Big(0));
  const [userTotalBorrowUsd, setUserTotalBorrowUsd] = useState(Big(0));
  const [userBorrowLimit, setUserBorrowLimit] = useState('0.00');
  const [supplies, setSupplies] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [netApy, setNetApy] = useState('0.00');


  const getUserTotalAmounts = () => {
    let userTotalSupplyUsd = Big(0);
    let userTotalBorrowUsd = Big(0);
    let totalCollateralUsd = Big(0);

    if (currentDapp === 'All') {
      Object.values(dapps).forEach((dapp) => {
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

    return { userTotalSupplyUsd, userTotalBorrowUsd, totalCollateralUsd };
  };

  const processMarketData = () => {
    const supplies: any = [];
    const borrows: any = [];
    let change = Big(0);

    Object.values(markets)
      .filter((market) => market.dapp === currentDapp || currentDapp === 'All')
      .forEach((market) => {
        const dapp = dapps[market.dapp];
        let rewardSupplyApy = 0;
        let rewardBorrowApy = 0;

        if (market.distributionApy) {
          market.distributionApy.forEach((reward) => {
            const supplyApy = reward.apyAccountSupply || reward.supply;
            const borrowApy = reward.apyAccountBorrow || reward.borrow;
            rewardSupplyApy += Number(supplyApy?.slice(0, -1) ?? 0);
            rewardBorrowApy += Number(borrowApy?.slice(0, -1) ?? 0);
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
            balance_value: Big(market.userSupply || 0).mul(market.underlyingPrice).toString(),
            address: market.address,
            distributionApy: market.distributionApy,
          });
          change = change.add(
            Big((Number(market.supplyApy.slice(0, -1)) + rewardSupplyApy) / 100 || 0)
              .mul(market.userSupply || 0)
              .mul(market.underlyingPrice),
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
            borrowed_value: Big(market.userBorrow || 0).mul(market.underlyingPrice).toString(),
            address: market.address,
            distributionApy: market.distributionApy,
          });
          change = change.minus(
            Big((Number(market.borrowApy.slice(0, -1)) - rewardBorrowApy) / 100 || 0)
              .mul(market.userBorrow || 0)
              .mul(market.underlyingPrice),
          );
        }
      });

    return { supplies, borrows, change };
  };

  const processRewardData = () => {
    const rewards: any = [];

    Object.values(dapps).forEach((dapp) => {
      if (dapp.rewards && dapp.rewards.length && (currentDapp === 'All' || currentDapp === dapp.dappName)) {
        dapp.rewards.forEach((reward: any) => {
          rewards.push({
            icon: reward.icon,
            symbol: reward.symbol,
            dappIcon: dapp.dappIcon,
            dappName: dapp.dappName,
            dailyReward: reward.dailyRewards,
            dailyReward_value: Big(reward.dailyRewards || 0).mul(reward.price || 0).toString(),
            unclaimed: reward.unclaimed,
            unclaimed_value: Big(reward.unclaimed || 0).mul(reward.price || 0).toString(),
            ...reward,
          });
        });
      }
    });

    return rewards;
  };

  const formatData = () => {
    const { userTotalSupplyUsd, userTotalBorrowUsd, totalCollateralUsd } = getUserTotalAmounts();
    const { supplies, borrows, change } = processMarketData();
    const rewards = processRewardData();

    let _userBorrowLimit = Big(userTotalBorrowUsd || 0).div(totalCollateralUsd.eq(0) ? 1 : totalCollateralUsd).mul(100);
    _userBorrowLimit = _userBorrowLimit.gt(100) ? Big(100) : _userBorrowLimit;

    setUserTotalSupplyUsd(userTotalSupplyUsd);
    setUserTotalBorrowUsd(userTotalBorrowUsd);
    setUserBorrowLimit(_userBorrowLimit.toFixed(2));
    setSupplies(supplies);
    setBorrows(borrows);
    setRewards(rewards);
    setNetApy(change.div(userTotalSupplyUsd.eq(0) ? 1 : userTotalSupplyUsd).mul(100).toFixed(2));
  };

  useEffect(() => {
    if (markets) {
      formatData();
    }
    }, [currentDapp, dapps, markets]);

  return {
    userTotalSupplyUsd,
    userTotalBorrowUsd,
    userBorrowLimit,
    supplies,
    borrows,
    rewards,
    netApy,
  };
};


export default useYoursData;