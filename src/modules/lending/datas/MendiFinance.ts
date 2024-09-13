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
    name: 'supplyRatePerBlock',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'borrowRatePerBlock',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
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
        type: 'uint256',
      },
      { internalType: 'bool', name: 'isQied', type: 'bool' },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      {
        internalType: 'contract IOToken',
        name: 'oToken',
        type: 'address',
      },
    ],
    name: 'checkMembership',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { internalType: 'uint8', name: '', type: 'uint8' },
      { internalType: 'address', name: '', type: 'address' },
    ],
    name: 'supplyRewardSpeeds',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { internalType: 'uint8', name: '', type: 'uint8' },
      { internalType: 'address', name: '', type: 'address' },
    ],
    name: 'borrowRewardSpeeds',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
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
const DISTRIBUTION_ABI = [
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' },
    ],
    name: 'rewardMarketState',
    outputs: [
      { internalType: 'uint256', name: 'supplySpeed', type: 'uint256' },
      { internalType: 'uint224', name: 'supplyIndex', type: 'uint224' },
      { internalType: 'uint32', name: 'supplyBlock', type: 'uint32' },
      { internalType: 'uint256', name: 'borrowSpeed', type: 'uint256' },
      { internalType: 'uint224', name: 'borrowIndex', type: 'uint224' },
      { internalType: 'uint32', name: 'borrowBlock', type: 'uint32' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' },
    ],
    name: 'rewardAccountState',
    outputs: [
      { internalType: 'uint256', name: 'rewardAccrued', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
const LENS_ABI = [
  {
    inputs: [
      {
        internalType: 'contract ComptrollerLensInterface',
        name: 'comptroller',
        type: 'address',
      },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'rewardsAccrued',
    outputs: [
      {
        internalType: 'address[]',
        name: 'rewardTokens',
        type: 'address[]',
      },
      { internalType: 'uint256[]', name: 'accrued', type: 'uint256[]' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const MendiFinanceData = (props: any) => {
  const {
    multicallAddress,
    unitrollerAddress,
    oracleAddress,
    distributionAddress,
    lensAddress,
    account,
    update,
    name,
    onLoad,
    markets,
    multicall,
    prices,
    rewardToken,
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
    const _rewards: any = {};
    let _accountRewards: any = {};
    let count = 0;
    let oTokensLength = Object.values(markets).length;
    let usdcPrice = 0;

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
        const underlyingPrice = _underlyPrice[market.address] || 1;
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

        const distributionSupplyApy = _rewards[market.address].supply
          .div(marketSupplyUsd.eq(0) ? 1 : marketSupplyUsd)
          .mul(100)
          .toFixed(2);

        const distributionBorrowApy = _rewards[market.address].borrow
          .div(marketBorrowUsd.eq(0) ? 1 : marketBorrowUsd)
          .mul(100)
          .toFixed(2);
        totalAccountDistributionApy = totalAccountDistributionApy
          .plus(distributionSupplyApy)
          .plus(distributionBorrowApy);
        const supplyApy = Big(market.supplyRatePerBlock)
          .mul(60 * 60 * 24)
          .plus(1)
          .pow(365)
          .minus(1)
          .mul(100);

        const borrowApy = Big(market.borrowRatePerBlock)
          .mul(60 * 60 * 24)
          .plus(1)
          .pow(365)
          .minus(1)
          .mul(100);

        markets[market.address] = {
          ...market,
          loanToValue: _loanToValue[market.address],
          liquidity: _liquidity[market.address],
          underlyingPrice: underlyingPrice,
          userUnderlyingBalance: _underlyingBalance[market.address],
          userMerberShip: _userMerberShip[market.address],
          supplyApy: supplyApy.toFixed(2) + '%',
          borrowApy: borrowApy.toFixed(2) + '%',
          distributionApy: [
            {
              ...rewardToken,
              supply: distributionSupplyApy + '%',
              borrow: distributionBorrowApy + '%',
            },
          ],
          dapp: name,
          // rewards,
        };
      });
      let rewards;
      if (_accountRewards && Big(_accountRewards.reward || 0).gt(0)) {
        const dailyRewards = totalAccountDistributionApy
          .mul(userTotalSupplyUsd.add(userTotalBorrowUsd))
          .div(365 * 100)
          .div(_accountRewards.price);
        rewards = [
          {
            ...rewardToken,
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
            if (oTokens[i] === '0x333D8b480BDB25eA7Be4Dd87EEB359988CE1b30D')
              usdcPrice = _underlyPrice[oTokens[i]];
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
          if (market.underlyingToken.address === 'native')
            nativeOToken = market.address;
          return (
            market.underlyingToken.address &&
            market.underlyingToken.address !== 'native'
          );
        })
        .map((market: any) => ({
          address: market.underlyingToken.address,
          name: 'balanceOf',
          params: [market.address],
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
          if (nativeOToken) {
            provider.getBalance(nativeOToken).then((rawBalance: any) => {
              _liquidity[nativeOToken] = ethers.utils.formatUnits(
                rawBalance._hex,
                18,
              );
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
          console.log('error-getWalletBalance', err);
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
          name: 'supplyRatePerBlock',
        },
        {
          address: oToken.address,
          name: 'borrowRatePerBlock',
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
            supplyRatePerBlock: ethers.utils.formatUnits(res[3][0]._hex, 18),
            borrowRatePerBlock: ethers.utils.formatUnits(res[4][0]._hex, 18),
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
        .catch(() => {
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

    const getUserRewards = (price: any) => {
      multicall({
        abi: LENS_ABI,
        calls: [
          {
            address: lensAddress,
            name: 'rewardsAccrued',
            params: [unitrollerAddress, account],
          },
        ],
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          _accountRewards = {
            price,
            reward: ethers.utils.formatUnits(res[0][1][0], 18).toString(),
          };
          count++;
          formatedData('rewards');
        })
        .catch((err: any) => {
          console.log(name + ' error-user-rewards', err);
        });
    };
    const getRewards = () => {
      const price = prices[rewardToken.symbol] || 0.07192;
      const cTokens = Object.keys(markets);
      const calls = cTokens.map((token) => ({
        address: distributionAddress,
        name: 'rewardMarketState',
        params: [rewardToken.address, token],
      }));
      multicall({
        abi: DISTRIBUTION_ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          for (let i = 0, len = cTokens.length; i < len; i++) {
            const token = cTokens[i];
            const supply = Big(ethers.utils.formatUnits(res[i][0]._hex, 18)).mul(
              price,
            );
            const borrow = Big(ethers.utils.formatUnits(res[i][3]._hex, 18)).mul(
              price,
            );
            _rewards[token] = {
              borrow: borrow.mul(60 * 60 * 24 * 365),
              supply: supply.mul(60 * 60 * 24 * 365),
            };
          }
          getUserRewards(price);
        })
        .catch((err: any) => {
          console.log('error-rewards', err);
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

export default MendiFinanceData;
