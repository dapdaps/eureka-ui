import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect } from 'react';

const OTOKEN_ABI = [
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalBorrows',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'exchangeRateCurrent',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'getAccountSnapshot',
    outputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'supplyRatePerBlock',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'borrowRatePerBlock',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
];
const UNITROLLER_ABI = [
  {
    constant: true,
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'markets',
    outputs: [
      { internalType: 'bool', name: 'isListed', type: 'bool' },
      {
        internalType: 'uint256',
        name: 'collateralFactorMantissa',
        type: 'uint256'
      },
      { internalType: 'bool', name: 'isQied', type: 'bool' }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      {
        internalType: 'contract IOToken',
        name: 'oToken',
        type: 'address'
      }
    ],
    name: 'checkMembership',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      { internalType: 'uint8', name: '', type: 'uint8' },
      { internalType: 'address', name: '', type: 'address' }
    ],
    name: 'supplyRewardSpeeds',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      { internalType: 'uint8', name: '', type: 'uint8' },
      { internalType: 'address', name: '', type: 'address' }
    ],
    name: 'borrowRewardSpeeds',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'venusBorrowSpeeds',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'venusSupplySpeeds',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
];
const ORACLE_ABI = [
  {
    inputs: [
      {
        internalType: 'contract IOToken',
        name: 'oToken',
        type: 'address'
      }
    ],
    name: 'getUnderlyingPrice',
    outputs: [{ internalType: 'uint256', name: 'price', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
];
const ERC20_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
];
const REWARD_PRIME_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'market', type: 'address' },
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint256', name: 'borrow', type: 'uint256' },
      { internalType: 'uint256', name: 'supply', type: 'uint256' },
      { internalType: 'uint256', name: 'xvsStaked', type: 'uint256' }
    ],
    name: 'estimateAPR',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'supplyAPR', type: 'uint256' },
          { internalType: 'uint256', name: 'borrowAPR', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'totalScore',
            type: 'uint256'
          },
          { internalType: 'uint256', name: 'userScore', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'xvsBalanceForScore',
            type: 'uint256'
          },
          { internalType: 'uint256', name: 'capital', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'cappedSupply',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'cappedBorrow',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'supplyCapUSD',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'borrowCapUSD',
            type: 'uint256'
          }
        ],
        internalType: 'struct IPrime.APRInfo',
        name: 'aprInfo',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      { internalType: 'address', name: 'holder', type: 'address' },
      {
        internalType: 'contract ComptrollerInterface',
        name: 'comptroller',
        type: 'address'
      }
    ],
    name: 'pendingRewards',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'distributorAddress',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'rewardTokenAddress',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'totalRewards',
            type: 'uint256'
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'vTokenAddress',
                type: 'address'
              },
              { internalType: 'uint256', name: 'amount', type: 'uint256' }
            ],
            internalType: 'struct VenusLens.PendingReward[]',
            name: 'pendingRewards',
            type: 'tuple[]'
          }
        ],
        internalType: 'struct VenusLens.RewardSummary',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
];

const VenusData = (props: any) => {
  const {
    multicallAddress,
    unitrollerAddress,
    rewardPrimeAddress,
    oracleAddress,
    rewardAddress,
    account,
    update,
    name,
    onLoad,
    multicall,
    markets,
    rewardsPrimeData,
    rewardToken,
    prices,
    provider
  } = props;

  useEffect(() => {
    if (!multicallAddress || !unitrollerAddress || !update || !account) return;

    const _cTokensData: any = {};
    let _loanToValue: any = null;
    let _underlyPrice: any = {};
    let _liquidity: any = null;
    let _underlyingBalance: any = null;
    let _userMerberShip: any = null;
    let count = 0;
    let _accountRewards = Big(0);
    const _rewardsPrimeApy: any = {};
    const _rewardsSupplyRate: any = {};
    const _rewardsBorrowRate: any = {};

    let oTokensLength = Object.values(markets).length;

    const formatedData = (key: any) => {
      console.log(`${name}-${key}`, count);
      if (count < 6) return;
      count = 0;
      oTokensLength = Object.values(props.markets).length;
      let totalSupplyUsd = Big(0);
      let totalBorrowUsd = Big(0);
      let userTotalSupplyUsd = Big(0);
      let userTotalBorrowUsd = Big(0);
      let totalCollateralUsd = Big(0);
      let totalAccountDistributionApy = Big(0);
      const rewardPrice = prices[rewardToken.symbol] || 12.28;
      const markets: any = {};
      Object.values(_cTokensData).forEach((market: any) => {
        const underlyingPrice = _underlyPrice[market.address] || 1;
        const marketSupplyUsd = Big(market.totalSupply || 0).mul(underlyingPrice);
        const marketBorrowUsd = Big(market.totalBorrows || 0).mul(underlyingPrice);
        totalSupplyUsd = totalSupplyUsd.plus(marketSupplyUsd);
        totalBorrowUsd = totalBorrowUsd.plus(marketBorrowUsd);
        userTotalSupplyUsd = userTotalSupplyUsd.plus(Big(market.userSupply).mul(underlyingPrice));
        userTotalBorrowUsd = userTotalBorrowUsd.plus(Big(market.userBorrow).mul(underlyingPrice));
        if (_userMerberShip[market.address]) {
          totalCollateralUsd = totalCollateralUsd.plus(
            Big(market.userSupply).mul(underlyingPrice).mul(_loanToValue[market.address]).div(100)
          );
        }
        const supplyApy = Big(market.supplyRatePerBlock)
          .mul(20 * 60 * 24)
          .plus(1)
          .pow(365)
          .minus(1)
          .mul(100);

        const borrowApy = Big(market.borrowRatePerBlock)
          .mul(20 * 60 * 24)
          .plus(1)
          .pow(365)
          .minus(1)
          .mul(100);

        const distributionApy: any = [];

        const distributionSupplyApy = marketSupplyUsd.eq(0)
          ? 0
          : Big(_rewardsSupplyRate[market.address])
              .mul(20 * 60 * 24)
              .mul(12.28)
              .div(marketSupplyUsd)
              .plus(1)
              .pow(365)
              .minus(1)
              .mul(100)
              .plus(_rewardsPrimeApy[market.address]?.supplyApy || 0)
              .toFixed(2);

        const distributionBorrowApy = marketBorrowUsd.eq(0)
          ? 0
          : Big(_rewardsBorrowRate[market.address])
              .mul(20 * 60 * 24)
              .mul(rewardPrice)
              .div(marketBorrowUsd)
              .plus(1)
              .pow(365)
              .minus(1)
              .mul(100)
              .plus(_rewardsPrimeApy[market.address]?.borrowApy || 0)
              .toFixed(2);

        totalAccountDistributionApy = totalAccountDistributionApy
          .plus(distributionSupplyApy)
          .plus(distributionBorrowApy);

        distributionApy.push({
          ...rewardToken,
          supply: distributionSupplyApy + '%',
          borrow: distributionBorrowApy + '%'
        });

        markets[market.address] = {
          ...market,
          loanToValue: _loanToValue[market.address],
          liquidity: _liquidity[market.address],
          underlyingPrice: underlyingPrice,
          userUnderlyingBalance: _underlyingBalance[market.address],
          userMerberShip: _userMerberShip[market.address],
          supplyApy: supplyApy.toFixed(2) + '%',
          borrowApy: borrowApy.toFixed(2) + '%',
          dapp: name,
          distributionApy
        };
      });

      const rewards: any = [];
      if (_accountRewards.gt(0)) {
        const dailyRewards = totalAccountDistributionApy
          .mul(userTotalSupplyUsd.add(userTotalBorrowUsd))
          .div(365 * 100)
          .div(rewardPrice);
        rewards.push({
          ...rewardToken,
          dailyRewards: dailyRewards.toString(),
          price: rewardPrice,
          unclaimed: _accountRewards.toFixed(rewardToken.decimals)
        });
      }

      onLoad({
        markets,
        rewards,
        totalSupplyUsd: totalSupplyUsd.toString(),
        totalBorrowUsd: totalBorrowUsd.toString(),
        userTotalSupplyUsd: userTotalSupplyUsd.toString(),
        userTotalBorrowUsd: userTotalBorrowUsd.toString(),
        totalCollateralUsd: totalCollateralUsd.toString()
      });
    };
    const getUnitrollerData = () => {
      const calls: any = [];
      const oTokens: any = Object.values(markets);
      oTokens.forEach((token: any) => {
        calls.push({
          address: unitrollerAddress,
          name: 'markets',
          params: [token.address]
        });
        calls.push({
          address: unitrollerAddress,
          name: 'checkMembership',
          params: [account, token.address]
        });
        calls.push({
          address: unitrollerAddress,
          name: 'venusSupplySpeeds',
          params: [token.address]
        });
        calls.push({
          address: unitrollerAddress,
          name: 'venusBorrowSpeeds',
          params: [token.address]
        });
      });

      multicall({
        abi: UNITROLLER_ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider
      })
        .then((res: any) => {
          _loanToValue = {};
          _userMerberShip = {};
          for (let i = 0, len = res.length; i < len; i++) {
            const index = Math.floor(i / 4);
            const mod = i % 4;
            switch (mod) {
              case 0:
                _loanToValue[oTokens[index].address] = ethers.utils.formatUnits(res[i] ? res[i][1]._hex : 0, 16);
                break;
              case 1:
                _userMerberShip[oTokens[index].address] = res[i] ? res[i][0] || false : false;
                break;
              case 2:
                _rewardsSupplyRate[oTokens[index].address] = ethers.utils.formatUnits(
                  res[i] ? res[i][0]?._hex || 0 : 0,
                  18
                );
              case 3:
                _rewardsBorrowRate[oTokens[index].address] = ethers.utils.formatUnits(
                  res[i] ? res[i][0]?._hex || 0 : 0,
                  18
                );
              default:
            }
          }
          count++;
          formatedData('getUnitrollerData');
        })
        .catch((err: any) => {
          console.log('error-getUnitrollerData', err);
          // setTimeout(() => {
          //   getUnitrollerData();
          // }, 1000);
        });
    };
    const getUnderlyPrice = () => {
      if (!oracleAddress) return;
      const oTokens = Object.keys(markets);
      const calls = oTokens.map((token) => ({
        address: oracleAddress,
        name: 'getUnderlyingPrice',
        params: [token]
      }));
      multicall({
        abi: ORACLE_ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider
      })
        .then((res: any) => {
          _underlyPrice = {};
          for (let i = 0, len = res.length; i < len; i++) {
            _underlyPrice[oTokens[i]] = ethers.utils.formatUnits(
              res[i][0]._hex,
              36 - markets[oTokens[i]].underlyingToken.decimals
            );
          }
          count++;
          formatedData('getUnderlyPrice');
        })
        .catch((err: any) => {
          console.log('error-getUnderlyPrice', err);
        });
    };
    const getOTokenLiquidity = () => {
      const assets = Object.values(markets);
      let nativeOToken = '';
      const calls = assets
        .filter((market: any) => {
          if (market.underlyingToken.address === 'native') nativeOToken = market.address;
          return market.underlyingToken.address && market.underlyingToken.address !== 'native';
        })
        .map((market: any) => ({
          address: market.underlyingToken.address,
          name: 'balanceOf',
          params: [market.address]
        }));
      multicall({
        abi: ERC20_ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider
      })
        .then((res: any) => {
          _liquidity = {};
          for (let i = 0, len = res.length; i < len; i++) {
            const oToken = markets[calls[i].params[0]];
            _liquidity[oToken.address] = ethers.utils.formatUnits(res[i][0]._hex, oToken.underlyingToken.decimals);
          }
          if (nativeOToken) {
            provider.getBalance(nativeOToken).then((rawBalance: any) => {
              _liquidity[nativeOToken] = ethers.utils.formatUnits(rawBalance._hex, 18);
              count++;
              formatedData('getOTokenLiquidity');
            });
          } else {
            count++;
            formatedData('getOTokenLiquidity');
          }
        })
        .catch((err: any) => {
          console.log('error-getOTokenLiquidity', err);
          // setTimeout(() => {
          //   getOTokenLiquidity();
          // }, 500);
        });
    };
    const getWalletBalance = () => {
      let nativeOToken = '';
      const underlyingTokens = Object.values(markets)
        .filter((market: any) => {
          if (market.underlyingToken.address === 'native') nativeOToken = market.address;
          return market.underlyingToken.address && market.underlyingToken.address !== 'native';
        })
        .map((market: any) => ({
          ...market.underlyingToken,
          oTokenAddress: market.address
        }));
      const calls = underlyingTokens.map((token) => ({
        address: token.address,
        name: 'balanceOf',
        params: [account]
      }));
      multicall({
        abi: ERC20_ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider
      })
        .then((res: any) => {
          _underlyingBalance = {};
          for (let i = 0, len = res.length; i < len; i++) {
            _underlyingBalance[underlyingTokens[i].oTokenAddress] =
              res[i] && res[i][0] ? ethers.utils.formatUnits(res[i][0]._hex, underlyingTokens[i].decimals) : '0';
          }
          if (nativeOToken) {
            provider.getBalance(account).then((rawBalance: any) => {
              _underlyingBalance[nativeOToken] = ethers.utils.formatUnits(rawBalance._hex, 18);
              count++;
              formatedData('underlyingTokens');
            });
          } else {
            count++;
            formatedData('underlyingTokens');
          }
        })
        .catch((err: any) => {
          console.log('error-getWalletBalance', err);
          // setTimeout(() => {
          //   getWalletBalance();
          // }, 500);
        });
    };
    const getCTokenData = (oToken: any) => {
      if (oTokensLength === 0) return;
      const calls = [
        {
          address: oToken.address,
          name: 'exchangeRateCurrent'
        },
        {
          address: oToken.address,
          name: 'totalSupply'
        },
        {
          address: oToken.address,
          name: 'totalBorrows'
        },
        {
          address: oToken.address,
          name: 'supplyRatePerBlock'
        },
        {
          address: oToken.address,
          name: 'borrowRatePerBlock'
        },
        {
          address: oToken.address,
          name: 'getAccountSnapshot',
          params: [account]
        }
      ];
      multicall({
        abi: OTOKEN_ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider
      })
        .then((res: any) => {
          oTokensLength--;
          const exchangeRateStored = ethers.utils.formatUnits(res[0]?.[0]._hex, 10 + oToken.underlyingToken.decimals);
          const userSupply = ethers.utils.formatUnits(res[5]?.[1]._hex, oToken.decimals);
          const totalSupply = ethers.utils.formatUnits(res[1]?.[0]._hex, oToken.decimals);
          _cTokensData[oToken.address] = {
            ...oToken,
            exchangeRateStored,
            totalSupply: Big(totalSupply).mul(exchangeRateStored).toString(),
            totalBorrows: ethers.utils.formatUnits(res[2]?.[0]._hex, oToken.underlyingToken.decimals),
            supplyRatePerBlock: ethers.utils.formatUnits(res[3][0]._hex, 18),
            borrowRatePerBlock: ethers.utils.formatUnits(res[4][0]._hex, 18),
            userSupply: Big(userSupply).mul(exchangeRateStored).toString(),
            userBorrow: ethers.utils.formatUnits(res[5]?.[2]._hex, oToken.underlyingToken.decimals)
          };
          if (oTokensLength === 0) {
            count++;
            formatedData('oTokens data');
          }
        })
        .catch((err: any) => {
          console.log('error-getCTokenData', err);
          // setTimeout(() => {
          //   getCTokenData(oToken);
          // }, 500);
        });
    };

    const getCTokensData = () => {
      Object.values(markets).forEach((market) => {
        getCTokenData(market);
      });
    };

    const getRewarsApy = () => {
      const rewardMarkets = Object.keys(rewardsPrimeData);
      const calls = rewardMarkets.map((market) => ({
        address: rewardPrimeAddress,
        name: 'estimateAPR',
        params: [
          market,
          account,
          Big(rewardsPrimeData[market].borrow || 0)
            .mul(Big(10).pow(18))
            .toFixed(0),
          Big(rewardsPrimeData[market].supply || 0)
            .mul(Big(10).pow(18))
            .toFixed(0),
          Big(rewardsPrimeData[market].stake || 0)
            .mul(Big(10).pow(18))
            .toFixed(0)
        ]
      }));
      calls.push({
        address: rewardAddress,
        name: 'pendingRewards',
        params: [account, unitrollerAddress]
      });
      multicall({
        abi: REWARD_PRIME_ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider
      })
        .then((res: any) => {
          res.forEach((item: any, i: number) => {
            if (i === res.length - 1) {
              count++;
              formatedData('getRewarsApy data');
              _accountRewards = Big(ethers.utils.formatUnits(item ? item[0][2] || 0 : 0, rewardToken.decimals));
              return;
            }
            const data = item[0];
            const supplyApr = data[0];
            const borrowApr = data[1];
            const supplyApy = Big(supplyApr?.toString() || 0)
              .div(10000)
              .div(365)
              .plus(1)
              .pow(365)
              .minus(1)
              .mul(100)
              .toFixed(2);
            const borrowApy = Big(borrowApr?.toString() || 0)
              .div(10000)
              .div(365)
              .plus(1)
              .pow(365)
              .minus(1)
              .mul(100)
              .toFixed(2);
            _rewardsPrimeApy[rewardMarkets[i]] = {
              supplyApy,
              borrowApy
            };
          });
        })
        .catch((err: any) => {
          console.log('err - 599', err);
        });
    };

    getUnitrollerData();
    getUnderlyPrice();
    getOTokenLiquidity();
    getWalletBalance();
    getCTokensData();
    getRewarsApy();
  }, [update, account]);

  return null;
};

export default VenusData;
