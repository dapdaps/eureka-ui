import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect } from 'react';

const OTOKEN_ABI = [
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalBorrows',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'exchangeRateCurrent',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'getAccountSnapshot',
    outputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'supplyRatePerTimestamp',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'borrowRatePerTimestamp',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];
const UNITROLLER_ABI = [
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'markets',
    outputs: [
      { internalType: 'bool', name: 'isListed', type: 'bool' },
      {
        internalType: 'uint256',
        name: 'collateralFactorMantissa',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'contract MToken', name: 'mToken', type: 'address' },
    ],
    name: 'checkMembership',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
];
const ORACLE_ABI = [
  {
    inputs: [
      {
        internalType: 'contract IOToken',
        name: 'oToken',
        type: 'address',
      },
    ],
    name: 'getUnderlyingPrice',
    outputs: [{ internalType: 'uint256', name: 'price', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];
const ERC20_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];
const REWARD_ABI = [
  {
    inputs: [{ internalType: 'address', name: '_user', type: 'address' }],
    name: 'getOutstandingRewardsForUser',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'mToken', type: 'address' },
          {
            components: [
              {
                internalType: 'address',
                name: 'emissionToken',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'totalAmount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplySide',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'borrowSide',
                type: 'uint256',
              },
            ],
            internalType: 'struct MultiRewardDistributorCommon.RewardInfo[]',
            name: 'rewards',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct MultiRewardDistributorCommon.RewardWithMToken[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract MToken',
        name: '_mToken',
        type: 'address',
      },
    ],
    name: 'getAllMarketConfigs',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'owner', type: 'address' },
          {
            internalType: 'address',
            name: 'emissionToken',
            type: 'address',
          },
          { internalType: 'uint256', name: 'endTime', type: 'uint256' },
          {
            internalType: 'uint224',
            name: 'supplyGlobalIndex',
            type: 'uint224',
          },
          {
            internalType: 'uint32',
            name: 'supplyGlobalTimestamp',
            type: 'uint32',
          },
          {
            internalType: 'uint224',
            name: 'borrowGlobalIndex',
            type: 'uint224',
          },
          {
            internalType: 'uint32',
            name: 'borrowGlobalTimestamp',
            type: 'uint32',
          },
          {
            internalType: 'uint256',
            name: 'supplyEmissionsPerSec',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'borrowEmissionsPerSec',
            type: 'uint256',
          },
        ],
        internalType: 'struct MultiRewardDistributorCommon.MarketConfig[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const MoonwellData = (props: any) => {
  const {
    multicallAddress,
    unitrollerAddress,
    oracleAddress,
    rewardDistributorAddress,
    account,
    update,
    name,
    onLoad,
    markets,
    multicall,
    prices,
    provider,
  } = props;

  useEffect(() => {
    if (!multicallAddress || !unitrollerAddress || !update || !account) return;

    const _cTokensData: any = {};
    let _loanToValue: any = null;
    let _underlyPrice: any = {};
    let _liquidity: any = null;
    let _underlyingBalance: any = null;
    let _userMerberShip: any = null;
    let _accountRewards: any = {};
    const _rewardsForWell: any = {};
    let count = 0;
    let oTokensLength = Object.values(markets).length;
    const REWARD_TOKEN = {
      icon: 'https://ipfs.near.social/ipfs/bafkreih3un4tcbwp3tneicomraozegmftz45sfx4rtg3qyui67nfdrptei',
      symbol: 'WELL',
    };

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
      const markets: any = {};
      Object.values(_cTokensData).forEach((market: any) => {
        const underlyingPrice = _underlyPrice[market.address];
        const marketSupplyUsd = Big(market.totalSupply || 0).mul(underlyingPrice);
        const marketBorrowUsd = Big(market.totalBorrows || 0).mul(
          underlyingPrice,
        );
        totalSupplyUsd = totalSupplyUsd.plus(marketSupplyUsd);
        totalBorrowUsd = totalBorrowUsd.plus(marketBorrowUsd);

        userTotalSupplyUsd = userTotalSupplyUsd.plus(
          Big(market.userSupply).mul(underlyingPrice),
        );
        userTotalBorrowUsd = userTotalBorrowUsd.plus(
          Big(market.userBorrow).mul(underlyingPrice),
        );
        if (_userMerberShip[market.address]) {
          totalCollateralUsd = totalCollateralUsd.plus(
            Big(market.userSupply)
              .mul(underlyingPrice)
              .mul(_loanToValue[market.address])
              .div(100),
          );
        }
        const distributionSupplyApy = Big(_rewardsForWell[market.address].supply)
          .mul(365)
          .div(marketSupplyUsd.eq(0) ? 1 : marketSupplyUsd)
          .mul(100)
          .toFixed(2);
        const distributionBorrowApy = Big(_rewardsForWell[market.address].borrow)
          .mul(365)
          .div(marketBorrowUsd.eq(0) ? 1 : marketBorrowUsd)
          .mul(100)
          .toFixed(2);
        totalAccountDistributionApy = totalAccountDistributionApy
          .plus(distributionSupplyApy)
          .plus(distributionBorrowApy);
        const supplyApy = Big(market.supplyRatePerTimestamp)
          .mul(60 * 60 * 24)
          .plus(1)
          .pow(365)
          .minus(1)
          .mul(100)
          .toFixed(2);
        const borrowApy = Big(market.borrowRatePerTimestamp)
          .mul(60 * 60 * 24)
          .plus(1)
          .pow(365)
          .minus(1)
          .mul(100)
          .toFixed(2);

        markets[market.address] = {
          ...market,
          loanToValue: _loanToValue[market.address],
          liquidity: _liquidity[market.address],
          underlyingPrice: underlyingPrice,
          userUnderlyingBalance: _underlyingBalance[market.address],
          userMerberShip: _userMerberShip[market.address],
          supplyApy: supplyApy + '%',
          borrowApy: borrowApy + '%',
          distributionApy: [
            {
              ...REWARD_TOKEN,
              supply: distributionSupplyApy + '%',
              borrow: distributionBorrowApy + '%',
            },
          ],
          dapp: name,
          // rewards,
        };
      });
      let rewards: any;
      if (_accountRewards && Big(_accountRewards.reward || 0).gt(0)) {
        const dailyRewards = totalAccountDistributionApy
          .mul(userTotalSupplyUsd.add(userTotalBorrowUsd))
          .div(365 * 100)
          .div(_accountRewards.price);
        rewards = [
          {
            ...REWARD_TOKEN,
            dailyRewards: dailyRewards.toString(),
            price: _accountRewards.price,
            unclaimed: _accountRewards.reward,
          },
        ];
      }
      onLoad({
        markets,
        rewards,
        totalSupplyUsd: totalSupplyUsd.toString(),
        totalBorrowUsd: totalBorrowUsd.toString(),
        userTotalSupplyUsd: userTotalSupplyUsd.toString(),
        userTotalBorrowUsd: userTotalBorrowUsd.toString(),
        totalCollateralUsd: totalCollateralUsd.toString(),
      });
    };
    const getUnitrollerData = () => {
      const calls: any = [];
      const oTokens: any = Object.values(markets);
      oTokens.forEach((token: any) => {
        calls.push({
          address: unitrollerAddress,
          name: 'markets',
          params: [token.address],
        });
        if (account) {
          calls.push({
            address: unitrollerAddress,
            name: 'checkMembership',
            params: [account, token.address],
          });
        }
      });
      multicall({
        abi: UNITROLLER_ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          _loanToValue = {};
          _userMerberShip = {};
          for (let i = 0, len = res.length; i < len; i++) {
            const index = Math.floor(i / (account ? 2 : 1));
            const mod = i % (account ? 2 : 1);
            switch (mod) {
              case 0:
                _loanToValue[oTokens[index].address] = ethers.utils.formatUnits(
                  res[i][1]._hex,
                  16,
                );
                break;
              case 1:
                _userMerberShip[oTokens[index].address] = res[i] ? res[i][0] || false : false;
                break;
              default:
            }
          }
          count++;
          formatedData('getUnitrollerData');
        })
        .catch((err: any) => {
          console.log('getUnitrollerData error', err);
          setTimeout(() => {
            getUnitrollerData();
          }, 1000);
        });
    };
    const getUnderlyPrice = () => {
      if (!oracleAddress) return;
      const oTokens = Object.keys(markets);
      const calls = oTokens.map((token) => ({
        address: oracleAddress,
        name: 'getUnderlyingPrice',
        params: [token],
      }));
      multicall({
        abi: ORACLE_ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          _underlyPrice = {};
          for (let i = 0, len = res.length; i < len; i++) {
            _underlyPrice[oTokens[i]] = ethers.utils.formatUnits(
              res[i][0]._hex,
              36 - markets[oTokens[i]].underlyingToken.decimals,
            );
          }
          count++;
          formatedData('getUnderlyPrice');
        })
        .catch((err: any) => {
          console.log('getUnderlyPrice error', err);
        });
    };
    const getOTokenLiquidity = () => {
      if (!account) {
        return;
      }
      const underlyingTokens = Object.values(markets).map((market: any) => ({
        ...market.underlyingToken,
        oTokenAddress: market.address,
      }));
      const calls = underlyingTokens.map((token) => ({
        address: token.address,
        name: 'balanceOf',
        params: [token.oTokenAddress],
      }));
      multicall({
        abi: ERC20_ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          _liquidity = {};
          for (let i = 0, len = res.length; i < len; i++) {
            const oToken = markets[calls[i].params[0]];
            _liquidity[oToken.address] = ethers.utils.formatUnits(
              res[i][0]._hex,
              oToken.underlyingToken.decimals,
            );
          }
          count++;
          formatedData('getOTokenLiquidity');
        })
        .catch((err: any) => {
          console.log('getOTokenLiquidity error', err);
          setTimeout(() => {
            getOTokenLiquidity();
          }, 500);
        });
    };
    const getWalletBalance = () => {
      let nativeOToken = '';
      const underlyingTokens = Object.values(markets)
        .filter((market: any) => {
          if (market.underlyingToken.address === 'native')
            nativeOToken = market.address;
          return (
            market.underlyingToken.address &&
            market.underlyingToken.address !== 'native'
          );
        })
        .map((market: any) => ({
          ...market.underlyingToken,
          oTokenAddress: market.address,
        }));
      const calls = underlyingTokens.map((token) => ({
        address: token.address,
        name: 'balanceOf',
        params: [account],
      }));
      multicall({
        abi: ERC20_ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          _underlyingBalance = {};
          for (let i = 0, len = res.length; i < len; i++) {
            _underlyingBalance[underlyingTokens[i].oTokenAddress] = res[i] && res[i][0]
              ? ethers.utils.formatUnits(
                res[i][0]._hex,
                underlyingTokens[i].decimals,
              )
              : '0';
          }
          if (nativeOToken) {
            provider.getBalance(account).then((rawBalance: any) => {
              _underlyingBalance[nativeOToken] = ethers.utils.formatUnits(
                rawBalance._hex,
                18,
              );
              count++;
              formatedData('getWalletBalance');
            });
          } else {
            count++;
            formatedData('getWalletBalance');
          }
        })
        .catch((err: any) => {
          console.log('getWalletBalance error', err);
          setTimeout(() => {
            getWalletBalance();
          }, 500);
        });
    };
    const getCTokenData = (oToken: any) => {
      if (oTokensLength === 0) return;
      const calls = [
        {
          address: oToken.address,
          name: 'exchangeRateCurrent',
        },
        {
          address: oToken.address,
          name: 'totalSupply',
        },
        {
          address: oToken.address,
          name: 'totalBorrows',
        },
        {
          address: oToken.address,
          name: 'supplyRatePerTimestamp',
        },
        {
          address: oToken.address,
          name: 'borrowRatePerTimestamp',
        },
        {
          address: oToken.address,
          name: 'getAccountSnapshot',
          params: [account],
        },
      ];
      multicall({
        abi: OTOKEN_ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          oTokensLength--;
          const exchangeRateStored = ethers.utils.formatUnits(
            res[0][0]._hex,
            10 + oToken.underlyingToken.decimals,
          );
          const userSupply = ethers.utils.formatUnits(
            res[5][1]._hex,
            oToken.decimals,
          );
          const totalSupply = ethers.utils.formatUnits(
            res[1][0]._hex,
            oToken.decimals,
          );
          _cTokensData[oToken.address] = {
            ...oToken,
            exchangeRateStored,
            totalSupply: Big(totalSupply).mul(exchangeRateStored).toString(),
            totalBorrows: ethers.utils.formatUnits(
              res[2][0]._hex,
              oToken.underlyingToken.decimals,
            ),
            supplyRatePerTimestamp: ethers.utils.formatUnits(res[3][0]._hex, 18),
            borrowRatePerTimestamp: ethers.utils.formatUnits(res[4][0]._hex, 18),
            userSupply: Big(userSupply).mul(exchangeRateStored).toString(),
            userBorrow: ethers.utils.formatUnits(
              res[5][2]._hex,
              oToken.underlyingToken.decimals,
            ),
          };
          if (oTokensLength === 0) {
            count++;
            formatedData('oTokens data');
          }
        })
        .catch((err: any) => {
          console.log('oTokens data error', err);
          setTimeout(() => {
            getCTokenData(oToken);
          }, 500);
        });
    };
    const getCTokensData = () => {
      Object.values(markets).forEach((market) => {
        getCTokenData(market);
      });
    };
    const getRewards = () => {
      const price = prices[REWARD_TOKEN.symbol] || 0.007578;
      const cTokens = Object.keys(markets);
      const calls = cTokens.map((token) => ({
        address: rewardDistributorAddress,
        name: 'getAllMarketConfigs',
        params: [token],
      }));
      calls.push({
        address: rewardDistributorAddress,
        name: 'getOutstandingRewardsForUser',
        params: [account],
      });
      multicall({
        abi: REWARD_ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          for (let i = 0, len = res.length; i < len; i++) {
            const item = res[i];
            let totalRewards = Big(0);
            if (i === res.length - 1) {
              item[0].forEach((slip: any) => {
                if (_rewardsForWell[slip[0]]) {
                  totalRewards = totalRewards
                    .plus(ethers.utils.formatUnits(slip[1][0][2]._hex, 18))
                    .plus(ethers.utils.formatUnits(slip[1][0][3]._hex, 18));
                }
              });
              _accountRewards = {
                reward: totalRewards.toString(),
                price,
              };
              count++;
              formatedData('getRewards');
              return;
            }
            _rewardsForWell[cTokens[i]] = {
              supply: Big(ethers.utils.formatUnits(item[0][0][7], 18))
                .mul(price)
                .mul(60 * 60 * 24),
              borrow: Big(ethers.utils.formatUnits(item[0][0][8], 18))
                .mul(price)
                .mul(60 * 60 * 24),
            };
          }
        })
        .catch((err: any) => {
          console.log('rewards error', err);
        });
    };

    getUnitrollerData();
    getUnderlyPrice();
    getOTokenLiquidity();
    getWalletBalance();
    getCTokensData();
    getRewards();
  }, [update, account]);

  return null;
};

export default MoonwellData;
