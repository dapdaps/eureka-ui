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
    name: 'supplyRatePerTimestamp',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'borrowRatePerTimestamp',
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
    inputs: [
      { internalType: 'uint8', name: '', type: 'uint8' },
      { internalType: 'address', name: '', type: 'address' }
    ],
    name: 'rewardAccrued',
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

const BenqiData = (props: any) => {
  const {
    multicallAddress,
    unitrollerAddress,
    oracleAddress,
    lensAddress,
    account,
    update,
    name,
    onLoad,
    markets,
    multicall,
    prices,
    provider
  } = props;

  useEffect(() => {
    if (!multicallAddress || !unitrollerAddress || !update || !account) return;

    console.log(`${name}-update`);

    const _cTokensData: any = {};
    let _loanToValue: any = null;
    let _underlyPrice: any = {};
    let _underlyingBalance: any = null;
    let _userMerberShip: any = null;
    const _rewardsApy: any = {};
    const _accountRewards: any = {};
    let count = 0;
    let oTokensLength = Object.values(markets).length;
    const AVAX = {
      icon: 'https://ipfs.near.social/ipfs/bafkreiaxodsgromeeaihu44fazsxdopkrqvinqzhyfxvx5mrbcmduqdfpq',
      symbol: 'AVAX'
    };
    const QI = {
      icon: 'https://ipfs.near.social/ipfs/bafkreiel5ejkjafpw2au4v34muga4im5afzztojy7jedbnd24dtumgtzsi',
      symbol: 'QI'
    };

    const formatedData = (key: any) => {
      console.log(`${name}-${key}`, count);
      if (count < 5) return;
      count = 0;
      oTokensLength = Object.values(props.markets).length;
      let totalSupplyUsd = Big(0);
      let totalBorrowUsd = Big(0);
      let userTotalSupplyUsd = Big(0);
      let userTotalBorrowUsd = Big(0);
      let totalCollateralUsd = Big(0);
      let totalAccountQiDistributionApy = Big(0);
      let totalAccountAvaxDistributionApy = Big(0);
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
        const rewardsApy = _rewardsApy[market.address];
        const avaxSupplyDistributionApy = rewardsApy.avax.supply
          .div(marketSupplyUsd.eq(0) ? 1 : marketSupplyUsd)
          .mul(100)
          .toFixed(2);
        const avaxBorrowDistributionApy = rewardsApy.avax.borrow
          .div(marketBorrowUsd.eq(0) ? 1 : marketBorrowUsd)
          .mul(100)
          .toFixed(2);
        const qiSupplyDistributionApy = rewardsApy.qi.supply
          .div(marketSupplyUsd.eq(0) ? 1 : marketSupplyUsd)
          .mul(100)
          .toFixed(2);
        const qiBorrowDistributionApy = rewardsApy.qi.borrow
          .div(marketBorrowUsd.eq(0) ? 1 : marketBorrowUsd)
          .mul(100)
          .toFixed(2);
        const distributionApy = [
          {
            ...AVAX,
            supply: avaxSupplyDistributionApy + '%',
            borrow: avaxBorrowDistributionApy + '%'
          },
          {
            ...QI,
            supply: qiSupplyDistributionApy + '%',
            borrow: qiBorrowDistributionApy + '%'
          }
        ];
        totalAccountQiDistributionApy = totalAccountQiDistributionApy
          .plus(qiSupplyDistributionApy)
          .plus(qiBorrowDistributionApy);
        totalAccountAvaxDistributionApy = totalAccountAvaxDistributionApy
          .plus(avaxSupplyDistributionApy)
          .plus(avaxBorrowDistributionApy);
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

        markets[market.address] = {
          ...market,
          loanToValue: _loanToValue[market.address],
          liquidity: Big(market.totalSupply || 0)
            .minus(market.totalBorrows || 0)
            .toString(),
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

      if (_accountRewards && Big(_accountRewards.qiReward || 0).gt(0)) {
        const dailyRewards = totalAccountQiDistributionApy
          .mul(userTotalSupplyUsd.add(userTotalBorrowUsd))
          .div(365 * 100)
          .div(_accountRewards.qiPrice);
        rewards.push({
          ...QI,
          dailyRewards: dailyRewards.toString(),
          price: _accountRewards.qiPrice,
          unclaimed: _accountRewards.qiReward
        });
      }
      if (_accountRewards && Big(_accountRewards.avaxReward || 0).gt(0)) {
        const dailyRewards = totalAccountAvaxDistributionApy
          .mul(userTotalSupplyUsd.add(userTotalBorrowUsd))
          .div(365 * 100)
          .div(_accountRewards.avaxPrice);
        rewards.push({
          ...AVAX,
          dailyRewards: dailyRewards.toString(),
          price: _accountRewards.avaxPrice,
          unclaimed: _accountRewards.avaxReward
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
          _loanToValue = {};
          _userMerberShip = {};
          for (let i = 0, len = res.length; i < len; i++) {
            const index = Math.floor(i / (account ? 2 : 1));
            const mod = i % (account ? 2 : 1);
            switch (mod) {
              case 0:
                _loanToValue[oTokens[index].address] = ethers.utils.formatUnits(res[i][1]._hex, 16);
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
          console.log('error-getUnitrollerData', err);
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
              _underlyingBalance[nativeOToken] = rawBalance._hex ? ethers.utils.formatUnits(rawBalance._hex, 18) : '0';
              count++;
              formatedData('underlyingTokens');
            });
          } else {
            count++;
            formatedData('underlyingTokens');
          }
        })
        .catch((err: any) => {
          console.log('err getWalletBalance', err);
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
          name: 'supplyRatePerTimestamp'
        },
        {
          address: oToken.address,
          name: 'borrowRatePerTimestamp'
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
          const exchangeRateStored = ethers.utils.formatUnits(res[0][0]._hex, 10 + oToken.underlyingToken.decimals);
          const userSupply = ethers.utils.formatUnits(res[5][1]._hex, oToken.decimals);
          const totalSupply = ethers.utils.formatUnits(res[1][0]._hex, oToken.decimals);
          _cTokensData[oToken.address] = {
            ...oToken,
            exchangeRateStored,
            totalSupply: Big(totalSupply).mul(exchangeRateStored).toString(),
            totalBorrows: ethers.utils.formatUnits(res[2][0]._hex, oToken.underlyingToken.decimals),
            supplyRatePerTimestamp: ethers.utils.formatUnits(res[3][0]._hex, 18),
            borrowRatePerTimestamp: ethers.utils.formatUnits(res[4][0]._hex, 18),
            userSupply: Big(userSupply).mul(exchangeRateStored).toString(),
            userBorrow: ethers.utils.formatUnits(res[5][2]._hex, oToken.underlyingToken.decimals)
          };
          if (oTokensLength === 0) {
            count++;
            formatedData('oTokens data');
          }
        })
        .catch(() => {
          setTimeout(() => {
            getCTokenData(oToken);
          }, 500);
        });
    };

    const getCTokensData = () => {
      console.log(markets, 'markets');

      Object.values(markets).forEach((market) => {
        getCTokenData(market);
      });
    };

    const getUserRewards = () => {
      const calls = [
        {
          address: lensAddress,
          name: 'getClaimableReward',
          params: [account, 0]
        },
        {
          address: lensAddress,
          name: 'getClaimableReward',
          params: [account, 1]
        }
      ];
      multicall({
        abi: [
          {
            inputs: [
              {
                internalType: 'address',
                name: 'user',
                type: 'address'
              },
              {
                internalType: 'uint8',
                name: 'rewardType',
                type: 'uint8'
              }
            ],
            name: 'getClaimableReward',
            outputs: [
              {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
              },
              {
                internalType: 'address[]',
                name: '',
                type: 'address[]'
              }
            ],
            stateMutability: 'view',
            type: 'function'
          }
        ],
        calls,
        options: {},
        multicallAddress,
        provider: provider
      }).then((res: any) => {
        _accountRewards.qiReward = ethers.utils.formatUnits(res[0][0]._hex, 18);
        _accountRewards.avaxReward = ethers.utils.formatUnits(res[1][0]._hex, 18);
        count++;
        formatedData('rewards');
      });
    };

    const getCTokenReward = ({ avaxPrice, qiPrice, cTokens, index }: any) => {
      const token = cTokens[index];
      const calls = [
        {
          address: unitrollerAddress,
          name: 'borrowRewardSpeeds',
          params: [0, token]
        },
        {
          address: unitrollerAddress,
          name: 'borrowRewardSpeeds',
          params: [1, token]
        },
        {
          address: unitrollerAddress,
          name: 'supplyRewardSpeeds',
          params: [0, token]
        },
        {
          address: unitrollerAddress,
          name: 'supplyRewardSpeeds',
          params: [1, token]
        },
        {
          address: unitrollerAddress,
          name: 'rewardAccrued',
          params: [0, account]
        },
        {
          address: unitrollerAddress,
          name: 'rewardAccrued',
          params: [1, account]
        }
      ];
      multicall({
        abi: UNITROLLER_ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider
      })
        .then((res: any) => {
          const qiBorrow = Big(ethers.utils.formatUnits(res[0][0]._hex || '0', 18)).mul(qiPrice);
          const avaxBorrow = Big(ethers.utils.formatUnits(res[1][0]._hex || '0', 18)).mul(avaxPrice);
          const qiSupply = Big(ethers.utils.formatUnits(res[2][0]._hex || '0', 18)).mul(qiPrice);
          const avaxSupply = Big(ethers.utils.formatUnits(res[3][0]._hex || '0', 18)).mul(avaxPrice);
          _rewardsApy[token] = {
            avax: {
              borrow: avaxBorrow.mul(60 * 60 * 24 * 365),
              supply: avaxSupply.mul(60 * 60 * 24 * 365)
            },
            qi: {
              borrow: qiBorrow.mul(60 * 60 * 24 * 365),
              supply: qiSupply.mul(60 * 60 * 24 * 365)
            }
          };
          if (index === cTokens.length - 1) {
            getUserRewards();
          } else {
            getCTokenReward({
              avaxPrice,
              qiPrice,
              cTokens,
              index: index + 1
            });
          }
        })
        .catch((err: any) => {
          console.log('error-rewards', err);
        });
    };

    const getRewards = () => {
      const avaxPrice = prices['AVAX'] || 38.64;
      const qiPrice = prices['QI'] || 0.01918;
      const cTokens = Object.keys(markets);
      _accountRewards.avaxPrice = avaxPrice;
      _accountRewards.qiPrice = qiPrice;
      getCTokenReward({
        avaxPrice,
        qiPrice,
        cTokens,
        index: 0
      });
    };

    getUnitrollerData();
    getUnderlyPrice();
    getWalletBalance();
    getCTokensData();
    getRewards();
  }, [update, account]);

  return null;
};

export default BenqiData;
