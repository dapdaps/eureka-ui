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
    name: 'totalBorrow',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'exchangeRate',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'accountSnapshot',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'gTokenBalance',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'borrowBalance',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'exchangeRate',
            type: 'uint256'
          }
        ],
        internalType: 'struct Constant.AccountSnapshot',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getCash',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalReserve',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'reserveFactor',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getRateModel',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];
const UNITROLLER_ABI = [
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'marketInfos',
    outputs: [
      { internalType: 'bool', name: 'isListed', type: 'bool' },
      { internalType: 'uint256', name: 'supplyCap', type: 'uint256' },
      { internalType: 'uint256', name: 'borrowCap', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'collateralFactor',
        type: 'uint256'
      }
    ],
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
  }
];
const ORACLE_ABI = [
  {
    inputs: [{ internalType: 'address[]', name: 'gTokens', type: 'address[]' }],
    name: 'getUnderlyingPrices',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'asset', type: 'address' }],
    name: 'priceOf',
    outputs: [{ internalType: 'uint256', name: 'priceInUSD', type: 'uint256' }],
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
const RATE_ABI = [
  {
    inputs: [
      { internalType: 'uint256', name: 'cash', type: 'uint256' },
      { internalType: 'uint256', name: 'borrows', type: 'uint256' },
      { internalType: 'uint256', name: 'reserves', type: 'uint256' }
    ],
    name: 'getBorrowRate',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'cash', type: 'uint256' },
      { internalType: 'uint256', name: 'borrows', type: 'uint256' },
      { internalType: 'uint256', name: 'reserves', type: 'uint256' },
      { internalType: 'uint256', name: 'reserveFactor', type: 'uint256' }
    ],
    name: 'getSupplyRate',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
];
const DISTRIBUTION_ABI = [
  {
    inputs: [
      { internalType: 'address[]', name: 'markets', type: 'address[]' },
      { internalType: 'address', name: 'account', type: 'address' }
    ],
    name: 'accuredLAB',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'market', type: 'address' },
      { internalType: 'address', name: 'account', type: 'address' }
    ],
    name: 'apyDistributionOf',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'apySupplyLab',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'apyBorrowLab',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'apyAccountSupplyLab',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'apyAccountBorrowLab',
            type: 'uint256'
          }
        ],
        internalType: 'struct Constant.DistributionAPY',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];

const timers: any = [];

const LayerBankData = (props: any) => {
  const {
    multicallAddress,
    unitrollerAddress,
    distributionAddress,
    oracleAddress,
    account,
    update,
    name,
    onLoad,
    markets,
    multicall,
    prices,
    rewardToken,
    chainId,
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
    const _rewardsApy: any = {};
    const _accountRewards: any = {};

    let count = 0;
    let oTokensLength = Object.values(markets).length;

    const formatedData = (key: any) => {
      console.log(`${name}-${key}`, count);
      if (count < 6) return;
      try {
        count = 0;
        oTokensLength = Object.values(markets).length;
        let totalSupplyUsd = Big(0);
        let totalBorrowUsd = Big(0);
        let userTotalSupplyUsd = Big(0);
        let userTotalBorrowUsd = Big(0);
        let totalCollateralUsd = Big(0);
        let totalAccountDistributionApy = Big(0);
        const _markets: any = {};
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

          const supplyApy = Big(market.supplyRatePerTimestamp)
            .mul(60 * 60 * 24)
            .plus(1)
            .pow(365)
            .minus(1)
            .mul(100);

          const borrowApy = Big(market.borrowRatePerTimestamp)
            .mul(60 * 60 * 24)
            .plus(1)
            .pow(365)
            .minus(1)
            .mul(100);
          const rewardApy = _rewardsApy[market.address];
          const distributionApy = {
            ...rewardToken,
            supply: Big(rewardApy.apySupply).mul(3).toFixed(2) + '%',
            borrow: Big(rewardApy.apyBorrow).mul(3).toFixed(2) + '%'
          };
          if (Big(rewardApy.apyAccountSupply).gt(0)) {
            distributionApy.apyAccountSupply = Big(rewardApy.apyAccountSupply).toFixed(2) + '%';
            totalAccountDistributionApy = totalAccountDistributionApy.plus(rewardApy.apyAccountSupply);
          }
          if (Big(rewardApy.apyAccountBorrow).gt(0)) {
            distributionApy.apyAccountBorrow = Big(rewardApy.apyAccountBorrow).toFixed(2) + '%';
            totalAccountDistributionApy = totalAccountDistributionApy.plus(rewardApy.apyAccountBorrow);
          }
          _markets[market.address] = {
            ...market,
            loanToValue: _loanToValue[market.address],
            liquidity: _liquidity[market.address],
            underlyingPrice: underlyingPrice,
            userUnderlyingBalance: _underlyingBalance[market.address],
            userMerberShip: _userMerberShip[market.address],
            supplyApy: supplyApy.toFixed(2) + '%',
            borrowApy: borrowApy.toFixed(2) + '%',
            distributionApy: [distributionApy],
            dapp: name
            // rewards
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
              icon: '/assets/tokens/lab.svg',
              symbol: 'LAB',
              dailyRewards: dailyRewards.toString(),
              price: _accountRewards.price,
              unclaimed: _accountRewards.reward
            }
          ];
        }

        onLoad({
          markets: _markets,
          rewards,
          totalSupplyUsd: totalSupplyUsd.toString(),
          totalBorrowUsd: totalBorrowUsd.toString(),
          userTotalSupplyUsd: userTotalSupplyUsd.toString(),
          userTotalBorrowUsd: userTotalBorrowUsd.toString(),
          totalCollateralUsd: totalCollateralUsd.toString()
        });
      } catch (err) {
        console.log('format error', err);
      }
    };
    const getUnitrollerData = () => {
      const calls: any = [];
      const oTokens: any = Object.values(markets);
      oTokens.forEach((token: any) => {
        calls.push({
          address: unitrollerAddress,
          name: 'marketInfos',
          params: [token.address]
        });
        if (account) {
          calls.push({
            address: unitrollerAddress,
            name: 'checkMembership',
            params: [account, token.address]
          });
        }
      });
      multicall({
        abi: UNITROLLER_ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider
      })
        .then((res: any) => {
          console.log('getUnitrollerData res: %o, account=%o', res, account);

          _loanToValue = {};
          _userMerberShip = {};
          for (let i = 0, len = res.length; i < len; i++) {
            const index = Math.floor(i / (account ? 2 : 1));
            const mod = i % (account ? 2 : 1);
            switch (mod) {
              case 0:
                _loanToValue[oTokens[index].address] = ethers.utils.formatUnits(res[i][3]._hex || 0, 16);
                break;
              case 1:
                _userMerberShip[oTokens[index].address] = res[i] ? res[i][0] || false : false;
                break;
              default:
            }
          }
          count++;
          formatedData('getUnitrollerData');
          getUnderlyPrice();
          getOTokenLiquidity();
        })
        .catch((err: any) => {
          console.log('error-getUnitrollerData', err);
          const timer = setTimeout(() => {
            getUnitrollerData();
          }, 1000);
          timers.push(timer);
        });
    };
    const getUnderlyPrice = () => {
      if (!oracleAddress) return;
      const oTokens = Object.keys(markets);
      const UnderlyingContract = new ethers.Contract(oracleAddress, ORACLE_ABI, provider.getSigner());
      UnderlyingContract.getUnderlyingPrices(oTokens)
        .then((res: any) => {
          _underlyPrice = {};
          for (let i = 0, len = res.length; i < len; i++) {
            _underlyPrice[oTokens[i]] = ethers.utils.formatUnits(res[i]._hex, 18);
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
          if (market.underlyingToken.isNative) nativeOToken = market.address;
          return market.underlyingToken.address && !market.underlyingToken.isNative;
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
            _liquidity[oToken.address] = ethers.utils.formatUnits(res[i][0]._hex || 0, oToken.underlyingToken.decimals);
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
          const timer = setTimeout(() => {
            getOTokenLiquidity();
          }, 500);
          timers.push(timer);
        });
    };
    const getWalletBalance = () => {
      let nativeOToken = '';
      const underlyingTokens = Object.values(markets)
        .filter((market: any) => {
          if (market.underlyingToken.isNative) nativeOToken = market.address;
          return market.underlyingToken.address && !market.underlyingToken.isNative;
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
        provider
      })
        .then((res: any) => {
          _underlyingBalance = {};
          for (let i = 0, len = res.length; i < len; i++) {
            _underlyingBalance[underlyingTokens[i].oTokenAddress] = res[i]
              ? ethers.utils.formatUnits(res[i][0]._hex, underlyingTokens[i].decimals)
              : '0';
          }
          if (nativeOToken) {
            provider.getBalance(account).then((rawBalance: any) => {
              _underlyingBalance[nativeOToken] = ethers.utils.formatUnits(rawBalance._hex, 18);
              count++;
              formatedData('underlyingTokens');
              getRewards();
            });
          } else {
            count++;
            formatedData('underlyingTokens');
            getRewards();
          }
        })
        .catch((err: any) => {
          console.log(err);
          const timer = setTimeout(() => {
            getWalletBalance();
          }, 500);
          timers.push(timer);
        });
    };
    const getCTokenData = (oToken: any) => {
      if (oTokensLength === 0) return;
      const calls = [
        {
          address: oToken.address,
          name: 'exchangeRate'
        },
        {
          address: oToken.address,
          name: 'totalSupply'
        },
        {
          address: oToken.address,
          name: 'totalBorrow'
        },
        {
          address: oToken.address,
          name: 'accountSnapshot',
          params: [account]
        },
        {
          address: oToken.address,
          name: 'getCash'
        },
        {
          address: oToken.address,
          name: 'totalReserve'
        },
        {
          address: oToken.address,
          name: 'reserveFactor'
        },
        {
          address: oToken.address,
          name: 'getRateModel'
        }
      ];
      multicall({
        abi: OTOKEN_ABI,
        calls,
        options: {},
        multicallAddress,
        provider
      })
        .then((res: any) => {
          const exchangeRateStored = res[0] ? ethers.utils.formatUnits(res[0][0]._hex, 18) : '0';
          const userSupply = res[3]
            ? ethers.utils.formatUnits(res[3][0][0]._hex, oToken.underlyingToken.decimals)
            : '0';
          const totalSupply = res[1] ? ethers.utils.formatUnits(res[1][0]._hex, oToken.underlyingToken.decimals) : '0';
          _cTokensData[oToken.address] = {
            ...oToken,
            exchangeRateStored,
            totalSupply: Big(totalSupply).mul(exchangeRateStored).toString(),
            totalBorrows: res[2] ? ethers.utils.formatUnits(res[2][0]._hex, oToken.underlyingToken.decimals) : '0',
            userSupply: Big(userSupply).mul(exchangeRateStored).toString(),
            userBorrow: res[3] ? ethers.utils.formatUnits(res[3][0][1]._hex, oToken.underlyingToken.decimals) : '0'
          };
          const rateCalls = [
            {
              address: res[7][0],
              name: 'getBorrowRate',
              params: [
                res[4] ? res[4][0] || '0' : '0',
                res[2] ? res[2][0] || '0' : '0',
                res[5] ? res[5][0] || '0' : '0'
              ]
            },
            {
              address: res[7][0],
              name: 'getSupplyRate',
              params: [
                res[4] ? res[4][0] || '0' : '0',
                res[2] ? res[2][0] || '0' : '0',
                res[5] ? res[5][0] || '0' : '0',
                res[6] ? res[6][0] || '0' : '0'
              ]
            }
          ];
          multicall({
            abi: RATE_ABI,
            calls: rateCalls,
            options: {},
            multicallAddress,
            provider
          })
            .then((rateRes: any) => {
              oTokensLength--;
              _cTokensData[oToken.address].borrowRatePerTimestamp = rateRes[0]
                ? ethers.utils.formatUnits(rateRes[0][0]._hex || '0', 18)
                : '0';
              _cTokensData[oToken.address].supplyRatePerTimestamp = rateRes[1]
                ? ethers.utils.formatUnits(rateRes[1][0]._hex || '0', 18)
                : '0';
              if (oTokensLength === 0) {
                count++;
                formatedData('oTokens data');
              }
            })
            .catch((err: any) => {
              console.log('oTokens data err', err);
              // setTimeout(() => {
              //   getCTokenData(oToken);
              // }, 1000);
            });
        })
        .catch((err: any) => {
          console.log('error-getCTokenData', err);
          const timer = setTimeout(() => {
            getCTokenData(oToken);
          }, 1000);
          timers.push(timer);
        });
    };
    const getCTokensData = () => {
      Object.values(markets).forEach((market) => {
        getCTokenData(market);
      });
    };
    const getRewards = () => {
      console.log('getRewards--', oracleAddress, rewardToken);
      const PriceToken = new ethers.Contract(oracleAddress, ORACLE_ABI, provider.getSigner());
      PriceToken.priceOf(rewardToken.address)
        .then((priceRes: any) => {
          const price = Big(ethers.utils.formatUnits(priceRes._hex, 18)).toString();
          getUserRewards(price);
        })
        .catch((error: any) => {
          getUserRewards(0.1);
          console.log('getRewards-error--', error);
        });
    };
    const getUserRewards = (price: any) => {
      const cTokens = Object.keys(markets);
      const calls = cTokens.map((cToken) => ({
        address: distributionAddress,
        name: 'apyDistributionOf',
        params: [cToken, account]
      }));
      calls.push({
        address: distributionAddress,
        name: 'accuredLAB',
        params: [cTokens, account]
      });
      multicall({
        abi: DISTRIBUTION_ABI,
        calls,
        options: {},
        multicallAddress,
        provider
      })
        .then((res: any) => {
          console.log('getUserRewards--', res);
          _accountRewards.price = price;
          for (let i = 0; i < res.length; i++) {
            if (i === res.length - 1) {
              const accured = res[i] ? ethers.utils.formatUnits(res[i][0]._hex, 18) : '0';
              _accountRewards.reward = accured;
              count++;
              formatedData('rewards');
              return;
            }
            _rewardsApy[cTokens[i]] = {
              apySupply: res[i] ? ethers.utils.formatUnits(res[i][0][0]._hex, 16) : '0',
              apyBorrow: res[i] ? ethers.utils.formatUnits(res[i][0][1]._hex, 16) : '0',
              apyAccountSupply: res[i] ? ethers.utils.formatUnits(res[i][0][2]._hex, 16) : '0',
              apyAccountBorrow: res[i] ? ethers.utils.formatUnits(res[i][0][3]._hex, 16) : '0'
            };
          }
        })
        .catch((err: any) => {
          console.log('error-rewards', err);
        });
    };

    getUnitrollerData();
    getWalletBalance();
    getCTokensData();

    return () => {
      timers.forEach((timer: any) => {
        clearTimeout(timer);
      });
    };
  }, [update, account, chainId, provider]);

  return null;
};

export default LayerBankData;
