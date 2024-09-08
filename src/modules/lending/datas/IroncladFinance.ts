import { ethers } from 'ethers';
import { useEffect } from 'react';
import Big from 'big.js';

const ORACLE_ABI = [
  {
    inputs: [{ internalType: "address[]", name: "assets", type: "address[]" }],
    name: "getAssetsPrices",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
];
const DATA_ABI = [
  {
    inputs: [{ internalType: "address", name: "asset", type: "address" }],
    name: "getReserveConfigurationData",
    outputs: [
      { internalType: "uint256", name: "decimals", type: "uint256" },
      { internalType: "uint256", name: "ltv", type: "uint256" },
      {
        internalType: "uint256",
        name: "liquidationThreshold",
        type: "uint256",
      },
      { internalType: "uint256", name: "liquidationBonus", type: "uint256" },
      { internalType: "uint256", name: "reserveFactor", type: "uint256" },
      { internalType: "bool", name: "usageAsCollateralEnabled", type: "bool" },
      { internalType: "bool", name: "borrowingEnabled", type: "bool" },
      { internalType: "bool", name: "stableBorrowRateEnabled", type: "bool" },
      { internalType: "bool", name: "isActive", type: "bool" },
      { internalType: "bool", name: "isFrozen", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "address", name: "user", type: "address" },
    ],
    name: "getUserReserveData",
    outputs: [
      {
        internalType: "uint256",
        name: "currentATokenBalance",
        type: "uint256",
      },
      { internalType: "uint256", name: "currentStableDebt", type: "uint256" },
      { internalType: "uint256", name: "currentVariableDebt", type: "uint256" },
      { internalType: "uint256", name: "principalStableDebt", type: "uint256" },
      { internalType: "uint256", name: "scaledVariableDebt", type: "uint256" },
      { internalType: "uint256", name: "stableBorrowRate", type: "uint256" },
      { internalType: "uint256", name: "liquidityRate", type: "uint256" },
      { internalType: "uint40", name: "stableRateLastUpdated", type: "uint40" },
      { internalType: "bool", name: "usageAsCollateralEnabled", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "asset", type: "address" }],
    name: "getReserveData",
    outputs: [
      { internalType: "uint256", name: "availableLiquidity", type: "uint256" },
      { internalType: "uint256", name: "totalStableDebt", type: "uint256" },
      { internalType: "uint256", name: "totalVariableDebt", type: "uint256" },
      { internalType: "uint256", name: "liquidityRate", type: "uint256" },
      { internalType: "uint256", name: "variableBorrowRate", type: "uint256" },
      { internalType: "uint256", name: "stableBorrowRate", type: "uint256" },
      {
        internalType: "uint256",
        name: "averageStableBorrowRate",
        type: "uint256",
      },
      { internalType: "uint256", name: "liquidityIndex", type: "uint256" },
      { internalType: "uint256", name: "variableBorrowIndex", type: "uint256" },
      { internalType: "uint40", name: "lastUpdateTimestamp", type: "uint40" },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const INCENTIVE_ABI = [
  {
    inputs: [],
    name: "totalAllocPoint",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardsPerSecond",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "poolInfo",
    outputs: [
      { internalType: "uint256", name: "totalSupply", type: "uint256" },
      { internalType: "uint256", name: "allocPoint", type: "uint256" },
      { internalType: "uint256", name: "lastRewardTime", type: "uint256" },
      { internalType: "uint256", name: "accRewardPerShare", type: "uint256" },
      {
        internalType: "contract IOnwardIncentivesController",
        name: "onwardIncentives",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "user", type: "address" },
    ],
    name: "userInfo",
    outputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "rewardDebt", type: "uint256" },
      { internalType: "uint256", name: "enterTime", type: "uint256" },
      { internalType: "uint256", name: "lastClaimTime", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_user", type: "address" },
      { internalType: "address[]", name: "_tokens", type: "address[]" },
    ],
    name: "pendingRewards",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
];

export default function IroncladFinanceData (props: any) {


  const {
    oracleAddress,
    walletBalanceProvider,
    aaveProtocolDataProviderAddress,
    poolAddressProvider,
    incentiveController,
    multicallAddress,
    wethAddress,
    multicall,
    markets,
    rewardToken,
    account,
    prices,
    name: dappName,
    update,
    onLoad,
    provider
  } = props;

  const { parseUnits, formatUnits } = ethers.utils;

  useEffect(() => {
    if (!account || !update || !oracleAddress || !multicallAddress) return;
    let info: any = {};
    let count = 0;
    const marketList: any[] = Object.values(markets);
    const underlyingTokensAddress = Object.keys(markets);

    const getRewardPrice = () => {
      if (!rewardToken) {
        getTokensPrice();
        return;
      }

      rewardToken.price = prices[rewardToken.symbol] || 0.3002;
      if (rewardToken.price) {
        getTokensPrice();
      }
    };

    const getTokensPrice = () => {
      const oracleContract = new ethers.Contract(
        oracleAddress,
        ORACLE_ABI,
       provider.getSigner()
      );
      oracleContract
        .getAssetsPrices(underlyingTokensAddress)
        .then((res: any) => {
          const scale =
            dappName === "Agave" ||
            dappName === "Valas Finance" ||
            oracleAddress === "0x8429d0AFade80498EAdb9919E41437A14d45A00B"
              ? 1000000000000000000
              : 100000000;
          const parsedRes = res.map((price: any) => {
            return Big(price.toString()).div(scale).toFixed();
          });

          underlyingTokensAddress.forEach((address, index) => {
            markets[address].underlyingPrice = parsedRes[index];
          });
          if (incentiveController) {
            getIncentiveData();
          } else {
            count++;
            formatedData("getTokensPrice");
          }
        })
        .catch((err: any) => {
          console.log("getTokensPrice error", err);
        });
    };

    const getUserWalletBalances = () => {
      if (!walletBalanceProvider) {
        getWalletBalance();
        return;
      }
      const walletBalanceProviderContract = new ethers.Contract(
        walletBalanceProvider,
        [
          {
            inputs: [
              { internalType: "address", name: "provider", type: "address" },
              { internalType: "address", name: "user", type: "address" },
            ],
            name: "getUserWalletBalances",
            outputs: [
              { internalType: "address[]", name: "", type: "address[]" },
              { internalType: "uint256[]", name: "", type: "uint256[]" },
            ],
            stateMutability: "view",
            type: "function",
          },
        ],
        provider.getSigner()
      );
      walletBalanceProviderContract
        .getUserWalletBalances(poolAddressProvider, account)
        .then((res: any) => {
          const addresses = res[0];
          const values = res[1];

          addresses.forEach((address: string, index: number) => {
            const value = values[index];

            if (markets[address]) {
              const parsedValue = Big(value.toString())
                .div(Big(10).pow(markets[address].underlyingToken.decimals))
                .toFixed();
              markets[address].userUnderlyingBalance = parsedValue;
            }
          });

          count++;
          formatedData("getUserWalletBalances");
        })
        .catch((err: any) => {
          console.log("getUserWalletBalances error");
        });
    };

    const getWalletBalance = () => {
      let nativeOToken = "";
      const underlyingTokens = Object.values(markets)
        .filter((market: any) => {
          if (market.underlyingToken.address === "native")
            nativeOToken = wethAddress;
          return (
            market.underlyingToken.address &&
            market.underlyingToken.address !== "native"
          );
        })
        .map((market: any) => ({
          ...market.underlyingToken,
        }));
      const calls = underlyingTokens.map((token) => ({
        address: token.address,
        name: "balanceOf",
        params: [account],
      }));

      multicall({
        abi: [
          {
            constant: true,
            inputs: [
              {
                name: "_owner",
                type: "address",
              },
            ],
            name: "balanceOf",
            outputs: [
              {
                name: "balance",
                type: "uint256",
              },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
          },
        ],
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          for (let i = 0, len = res.length; i < len; i++) {
            markets[underlyingTokens[i].address].userUnderlyingBalance = res[i]?.[0]
              ? ethers.utils.formatUnits(
                res[i][0]._hex,
                underlyingTokens[i].decimals
              )
              : "0";
          }

          if (nativeOToken) {
            provider.getBalance(account).then((rawBalance: any) => {
              markets[nativeOToken].userUnderlyingBalance =
                ethers.utils.formatUnits(rawBalance._hex, 18);

              count++;
              formatedData("getWalletBalance");
            });
          } else {
            count++;
            formatedData("getWalletBalance");
          }
        })
        .catch((err: any) => {
          console.log("getWalletBalance error", err);
        });
    };

    const getConfigurationData = () => {
      const calls = underlyingTokensAddress.map((address) => ({
        address: aaveProtocolDataProviderAddress,
        name: "getReserveConfigurationData",
        params: [address],
      }));
      multicall({
        abi: DATA_ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          console.info("getReserveConfigurationData_res:", res);
          res.forEach((item: any, i: number) => {
            const _address = underlyingTokensAddress[i];
            markets[_address].loanToValue = Big(item[1].toString())
              .div(100)
              .toNumber();
            markets[_address].collateralFactor = item[6];
          });
          count++;
          formatedData("getConfigurationData");
        })
        .catch((err: any) => {
          console.log("getConfigurationData error");
        });
    };

    const getReverseData = () => {
      const calls = underlyingTokensAddress.map((address) => ({
        address: aaveProtocolDataProviderAddress,
        name: "getReserveData",
        params: [address],
      }));

      multicall({
        abi: DATA_ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          console.log("getReverseData--", res);
          res.forEach((item: any, i: number) => {
            const _address = underlyingTokensAddress[i];

            const [
              availableLiquidity,
              totalStableDebt,
              totalVariableDebt,
              liquidityRate,
              variableBorrowRate,
            ] = item;
            const decimals = Big(10).pow(
              markets[_address].underlyingToken.decimals
            );
            const totalDebt = Big(totalStableDebt.toString())
              .plus(totalVariableDebt.toString())
              .div(decimals)
              .toFixed();
            const totalDebtRaw = Big(totalStableDebt.toString())
              .plus(totalVariableDebt.toString())
              .toFixed();
            const totalDeposit = Big(availableLiquidity.toString())
              .plus(totalDebtRaw)
              .div(decimals)
              .toFixed();
            const marketSize = Big(availableLiquidity.toString())
              .div(decimals)
              .toFixed();

            const RAY = Big(10).pow(27);

            const SECONDS_PER_YEAR = 31536000;

            const depositAPR = Big(liquidityRate).div(RAY);

            const variableBorrowAPR = Big(variableBorrowRate).div(RAY);

            const depositAPY0 = Big(1)
              .plus(depositAPR.div(Big(SECONDS_PER_YEAR)))
              .toNumber();

            const depositAPY = Big(
              100 * (Math.pow(depositAPY0, SECONDS_PER_YEAR) - 1)
            ).toFixed(2);

            const variableBorrowAPY0 = Big(1)
              .plus(Big(variableBorrowAPR).div(Big(SECONDS_PER_YEAR)))
              .toNumber();

            const variableBorrowAPYRaw = Big(
              100 * (Math.pow(variableBorrowAPY0, SECONDS_PER_YEAR) - 1)
            );

            const variableBorrowAPY = Big(
              100 * (Math.pow(variableBorrowAPY0, SECONDS_PER_YEAR) - 1)
            ).toFixed(2);

            const netApyBig = Big(depositAPY0).minus(variableBorrowAPYRaw);
            markets[_address].supplyApy = depositAPY + "%";
            if (!markets[_address]?.borrowApy) {
              markets[_address].borrowApy = variableBorrowAPY + "%";
            }
            markets[_address].totalBorrows = Big(totalDebt).toFixed(4);
            markets[_address].totalSupply = Big(totalDeposit).toFixed(4);
            markets[_address].liquidity = Big(marketSize).toFixed(4);
            markets[_address].netApy = Big(netApyBig).toFixed();
          });
          count++;
          formatedData("getReverseData");
        })
        .catch((err: any) => {
          console.log("getReverseData error", err);
        });
    };

    const getUserReserveData = () => {
      const calls = underlyingTokensAddress.map((address) => ({
        address: aaveProtocolDataProviderAddress,
        name: "getUserReserveData",
        params: [address, account],
      }));

      multicall({
        abi: DATA_ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          console.info("getUserReserveData_res: ", res);
          res.forEach((item: any, i: number) => {
            const _address = underlyingTokensAddress[i];

            const decimals = Big(10).pow(
              markets[_address].underlyingToken.decimals
            );

            markets[_address].userMerberShip = item[8];
            markets[_address].userSupply = item[0]
              ? Big(item[0].toString()).div(decimals).toFixed()
              : "0";
            markets[_address].userBorrow = item[1]
              ? Big(item[1].toString())
                .add(item[2].toString())
                .div(decimals)
                .toFixed()
              : "0";
          });
          count++;
          formatedData("getUserReserveData");
        })
        .catch((err: any) => {
          console.log("getUserReserveData error", err);
        });
    };
    let fetchedTokenLen = 0;
    const getIncentiveData = () => {
      const calls = [
        {
          address: incentiveController,
          name: "totalAllocPoint",
          params: [],
        },
        {
          address: incentiveController,
          name: "rewardsPerSecond",
          params: [],
        },
      ];
      multicall({
        abi: INCENTIVE_ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          info.totalAllocPoint = res[0].toString();
          info.rewardsPerSecond = res[1].toString();

          getIncentiveDataForToken({
            aTokenAddress: marketList[fetchedTokenLen].address,
            variableDebtTokenAddress:
            marketList[fetchedTokenLen].variableDebtTokenAddress,
            address:
              marketList[fetchedTokenLen].underlyingToken.address === "native"
                ? wethAddress
                : marketList[fetchedTokenLen].underlyingToken.address,
          });
        })
        .catch((err: any) => {
          console.log("getIncentiveData error");
        });
    };

    const getIncentiveDataForToken = (
      {
        aTokenAddress,
        variableDebtTokenAddress,
        address,
      }: any) => {
      const calls = [
        {
          address: incentiveController,
          name: "poolInfo",
          params: [aTokenAddress],
        },
        {
          address: incentiveController,
          name: "userInfo",
          params: [aTokenAddress, account],
        },
        {
          address: incentiveController,
          name: "pendingRewards",
          params: [account, [aTokenAddress]],
        },
        {
          address: incentiveController,
          name: "poolInfo",
          params: [variableDebtTokenAddress],
        },
        {
          address: incentiveController,
          name: "userInfo",
          params: [variableDebtTokenAddress, account],
        },
        {
          address: incentiveController,
          name: "pendingRewards",
          params: [account, [variableDebtTokenAddress]],
        },
      ];
      multicall({
        abi: INCENTIVE_ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          const ACC_REWARD_PRECISION = Big(10).pow(12);

          const poolInfo = res[0];
          const poolInfoDebt = res[3];

          const totalSupply = poolInfo[0].toString();
          const totalSupplyDebt = poolInfoDebt[0].toString();

          const allocPoint = poolInfo[1].toString();
          const allocPointDebt = poolInfoDebt[1].toString();

          const dailyRewardToThisPool = Big(60 * 60 * 24)
            .times(info.rewardsPerSecond)
            .times(allocPoint)
            .div(info.totalAllocPoint);

          let yearlyRewardToThisPool = Big(0);
          let yearlyRewardToThisPoolUsd = Big(0);
          let yearlyRewardToThisPoolDebt = Big(0);
          let yearlyRewardToThisPoolDebtUsd = Big(0);

          const dailyRewardToThisPoolDebt = Big(60 * 60 * 24)
            .times(info.rewardsPerSecond)
            .times(allocPointDebt)
            .div(info.totalAllocPoint);

          if (rewardToken) {
            yearlyRewardToThisPool = dailyRewardToThisPool
              .mul(365)
              .div(Big(10).pow(rewardToken.decimals));

            yearlyRewardToThisPoolUsd = Big(yearlyRewardToThisPool).times(
              rewardToken.price
            );

            yearlyRewardToThisPoolDebt = dailyRewardToThisPoolDebt
              .mul(365)
              .div(Big(10).pow(rewardToken.decimals));

            yearlyRewardToThisPoolDebtUsd = Big(yearlyRewardToThisPoolDebt).times(
              rewardToken.price
            );
          }

          const totalSupplyUsd = Big(markets[address].underlyingPrice).mul(
            ethers.utils.formatUnits(
              poolInfo[0]._hex,
              markets[address].underlyingToken.decimals
            )
          );

          markets[address].rewardSupplyApy = yearlyRewardToThisPoolUsd
            .div(totalSupplyUsd)
            .mul(100)
            .toFixed(2, 0);

          const totalBorrowUsd = Big(markets[address].underlyingPrice).mul(
            ethers.utils.formatUnits(
              poolInfoDebt[0]._hex,
              markets[address].underlyingToken.decimals
            )
          );

          markets[address].rewardBorrowApy = yearlyRewardToThisPoolDebtUsd
            .div(totalBorrowUsd)
            .mul(100)
            .toFixed(2, 0);

          const rewardPerShareThisPool = dailyRewardToThisPool
            .mul(ACC_REWARD_PRECISION)
            .div(totalSupply)
            .toFixed(0);

          const rewardPerShareThisPoolDebt = dailyRewardToThisPoolDebt
            .mul(ACC_REWARD_PRECISION)
            .div(totalSupplyDebt)
            .toFixed(0);

          const userInfo = res[1] || [0];
          const userInfoDebt = res[4] || [0];

          const amount = userInfo[0].toString();
          const amountDebt = userInfoDebt[0].toString();

          const userDailyReward = Big(rewardPerShareThisPool)
            .times(Big(amount))
            .div(ACC_REWARD_PRECISION)
            .div(Big(10).pow(rewardToken.decimals))
            .toFixed();

          const userDailyRewardDebt = Big(rewardPerShareThisPoolDebt)
            .times(Big(amountDebt))
            .div(ACC_REWARD_PRECISION)
            .div(Big(10).pow(rewardToken.decimals))
            .toFixed();

          const pendingRewards = res[2];
          const pendingRewardsDebt = res[5];

          const unclaimed = pendingRewards[0].toString();
          const unclaimedDebt = pendingRewardsDebt[0].toString();

          const dailyRewards = Big(userDailyReward).toFixed();

          const dailyRewardsDebt = Big(userDailyRewardDebt).toFixed();

          markets[address].unclaimed = Big(unclaimed)
            .plus(unclaimedDebt)
            .div(Big(10).pow(rewardToken.decimals))
            .toFixed();

          markets[address].dailyRewards = Big(dailyRewards)
            .plus(dailyRewardsDebt)
            .toFixed();
          fetchedTokenLen++;
          if (fetchedTokenLen === underlyingTokensAddress.length) {
            count++;
            formatedData("getIncentiveDataForToken");
          } else {
            getIncentiveDataForToken({
              aTokenAddress: marketList[fetchedTokenLen].address,
              variableDebtTokenAddress:
              marketList[fetchedTokenLen].variableDebtTokenAddress,
              address:
                marketList[fetchedTokenLen].underlyingToken.address === "native"
                  ? wethAddress
                  : marketList[fetchedTokenLen].underlyingToken.address,
            });
          }
        })
        .catch((err: any) => {
          console.log("getIncentiveDataForToken error", err);
        });
    };

    const formatedData = (key: string) => {
      if (count < 5) return;
      let totalSupplyUsd = Big(0);
      let totalBorrowUsd = Big(0);
      let userTotalSupplyUsd = Big(0);
      let userTotalBorrowUsd = Big(0);
      let totalCollateralUsd = Big(0);
      let totalUnclaimed = Big(0);
      let totalDailyRewards = Big(0);
      const _markets: any = {};
      console.log("formatedData_markets", markets);
      Object.values(markets).forEach((market: any, i) => {
        const underlyingPrice = market.underlyingPrice;
        const marketSupplyUsd = Big(market.totalSupply || 0).mul(underlyingPrice);
        const marketBorrowUsd = Big(market.totalBorrows || 0).mul(
          underlyingPrice
        );

        totalSupplyUsd = totalSupplyUsd.plus(marketSupplyUsd);
        totalBorrowUsd = totalBorrowUsd.plus(marketBorrowUsd);
        userTotalSupplyUsd = userTotalSupplyUsd.plus(
          Big(market.userSupply).mul(underlyingPrice)
        );
        userTotalBorrowUsd = userTotalBorrowUsd.plus(
          Big(market.userBorrow).mul(underlyingPrice)
        );

        if (market.userMerberShip) {
          totalCollateralUsd = totalCollateralUsd.plus(
            Big(market.userSupply)
              .mul(underlyingPrice)
              .mul(market.loanToValue)
              .div(100)
          );
        }

        if (!market?.distributionApy) {
          let distributionApy: any[] = [];
          if (rewardToken) {
            distributionApy = [
              {
                ...rewardToken,
                supply: market.rewardSupplyApy + "%",
                borrow: market.rewardBorrowApy + "%",
              },
            ];
            totalUnclaimed = totalUnclaimed.plus(market.unclaimed);
            totalDailyRewards = totalDailyRewards.plus(market.dailyRewards);
          }

          _markets[market.address] = {
            ...market,
            distributionApy,
            dapp: dappName,
          };
        } else {
          _markets[market.address] = {
            ...market,
            dapp: dappName,
          };
        }
      });
      let rewards: any[] = [];
      if (rewardToken) {
        rewards = [
          {
            ...rewardToken,
            dailyRewards: totalDailyRewards.toString(),
            unclaimed: totalUnclaimed.toString(),
          },
        ];
      }
      onLoad({
        markets: _markets,
        rewards,
        totalSupplyUsd: totalSupplyUsd.toString(),
        totalBorrowUsd: totalBorrowUsd.toString(),
        userTotalSupplyUsd: userTotalSupplyUsd.toString(),
        userTotalBorrowUsd: userTotalBorrowUsd.toString(),
        totalCollateralUsd: totalCollateralUsd.toString(),
      });
    };

    getUserReserveData();
    getReverseData();
    getConfigurationData();
    getUserWalletBalances();
    getRewardPrice();
  }, [account, update]);

}