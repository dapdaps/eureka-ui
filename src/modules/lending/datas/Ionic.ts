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
    constant: true,
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'borrowBalanceCurrent',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
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
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'getAssetsIn',
    outputs: [
      { internalType: 'contract OToken[]', name: '', type: 'address[]' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
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

const IonicData = (props: any) => {
  const {
    collateralAddress,
    multicallAddress,
    unitrollerAddress,
    oracleAddress,
    account,
    update,
    name,
    onLoad,
    markets,
    multicall,
    prices,
    provider,
  } = props;

  const { formatUnits, parseUnits } = ethers.utils;

  useEffect(() => {
    if (!multicallAddress || !unitrollerAddress || !update || !account) return;

    console.log(`${name}-update`);

    const _cTokensData: any = {};
    const _loanToValue: any = null;
    let _underlyPrice: any = {};
    let _liquidity: any = null;
    let _underlyingBalance: any = null;
    const _userMerberShip: any = null;
    let _collateralMap: any = {};
    let _minBorrowMap: any = {};
    let _borrowCapsRes: any = {};
    let count = 0;
    let oTokensLength = Object.values(markets).length;

    const calcApy = (rateAsNumber: any) => {
      const blocksPerMin = 30;
      const daysPerYear = 365;
      const blocksPerDay = blocksPerMin * 60 * 24;
      const dailyGrowthRate: any = Big(rateAsNumber || 0)
        .mul(blocksPerDay)
        .toString();
      const annualGrowth =
        Math.exp(daysPerYear * Math.log1p(dailyGrowthRate)) - 1;
      const apy = Big(annualGrowth).mul(100);
      return apy;
    };

    const formatedData = (key: any) => {
      console.log(`${name}-${key}`, count);
      if (count < 7) return;
      count = 0;
      oTokensLength = Object.values(props.markets).length;
      let totalSupplyUsd = Big(0);
      let totalBorrowUsd = Big(0);
      let userTotalSupplyUsd = Big(0);
      let userTotalBorrowUsd = Big(0);
      let userTotalCollateralUsd = Big(0);
      let totalCollateralUsd = Big(0);
      const markets: any = {};

      Object.values(_cTokensData).forEach((market: any) => {
        // const underlyingPrice = _underlyPrice[market.address] || 1;

        let underlyingPrice =
          market.underlyingToken.symbol === 'weETH.mode'
            ? prices['weETH']
            : prices[market.underlyingToken.symbol];
        underlyingPrice = underlyingPrice || 1;

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

        if (_collateralMap[market.address]) {
          totalCollateralUsd = totalCollateralUsd.plus(
            Big(market.userSupply)
              .mul(underlyingPrice)
              .mul(market['COLLATERAL_FACTOR']),
          );
          userTotalCollateralUsd = userTotalCollateralUsd.plus(
            Big(market.userSupply).mul(underlyingPrice),
          );
        }
        // for ionic, every token's collateral usd
        const _userCollateralUSD = _collateralMap[market.address]
          ? Big(market.userSupply).mul(underlyingPrice).toString()
          : 0;
        const supplyApy = calcApy(market.supplyRatePerBlock);

        const borrowApy = calcApy(market.borrowRatePerBlock);

        const _minBorrowAmount = Big(
          formatUnits(_minBorrowMap[market.address][0]),
        )
          .times(Big(prices['ETH'] || 0))
          .div(underlyingPrice)
          .toFixed(6, 0);

        // const _borrowCaps = _borrowCapsRes[market.address]
        //   ? _borrowCapsRes[market.address].toString()
        //   : 0;

        const _borrowCaps = _borrowCapsRes[market.address]
          ? ethers.utils.formatUnits(
            _borrowCapsRes[market.address][0],
            market.decimals,
          )
          : 0;
        markets[market.address] = {
          ...market,
          // loanToValue: _loanToValue[market.address],
          liquidity: _liquidity[market.address],
          underlyingPrice: underlyingPrice,
          userCollateralUSD: _userCollateralUSD,

          userUnderlyingBalance: _underlyingBalance[market.address],
          userMerberShip: _collateralMap[market.address] ? true : false,
          // userMerberShip: _userMerberShip[market.address],
          supplyApy: supplyApy.toFixed(2) + '%',
          borrowApy: borrowApy.toFixed(2) + '%',
          minBorrowAmount: _minBorrowAmount,
          borrowCaps: _borrowCaps,
          dapp: name,
        };
      });

      onLoad({
        markets,
        totalSupplyUsd: totalSupplyUsd.toString(),
        totalBorrowUsd: totalBorrowUsd.toString(),
        userTotalSupplyUsd: userTotalSupplyUsd.toString(),
        userTotalBorrowUsd: userTotalBorrowUsd.toString(),
        userTotalCollateralUsd: userTotalCollateralUsd.toString(),
        totalCollateralUsd: totalCollateralUsd.toString(),
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
              formatedData('underlyingTokens');
            });
          } else {
            count++;
            formatedData('underlyingTokens');
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
          name: 'balanceOf',
          params: [account],
        },
        {
          address: oToken.address,
          name: 'borrowBalanceCurrent',
          params: [account],
        },
        {
          address: oToken.address,
          name: 'borrowRatePerBlock',
        },
        {
          address: oToken.address,
          name: 'supplyRatePerBlock',
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
          const exchangeRateStored = res[0][0]
            ? ethers.utils.formatUnits(res[0][0], 18)
            : '0';

          const totalSupply = res[1][0]
            ? ethers.utils.formatUnits(res[1][0]._hex, oToken.decimals)
            : '0';

          const userSupply = res[3] && res[3][0]
            ? ethers.utils.formatUnits(res[3][0]._hex, oToken.decimals)
            : '0';

          const _totalSupply = Big(totalSupply)
            .mul(exchangeRateStored)
            .toString();

          const _totalBorrows = res[2][0]
            ? ethers.utils.formatUnits(
              res[2][0]._hex,
              oToken.underlyingToken.decimals,
            )
            : '0';
          const supplyRatePerBlock = res[6][0]
            ? ethers.utils.formatUnits(res[6][0]._hex, 18)
            : '0';
          const borrowRatePerBlock = res[5][0]
            ? ethers.utils.formatUnits(res[5][0]._hex, 18)
            : '0';
          const _userSupply = Big(userSupply).mul(exchangeRateStored).toString();
          const _userBorrow = res[4] && res[4][0]
            ? ethers.utils.formatUnits(
              res[4][0]._hex,
              oToken.underlyingToken.decimals,
            )
            : '0';

          _cTokensData[oToken.address] = {
            ...oToken,
            exchangeRateStored,
            totalSupply: _totalSupply,
            totalBorrows: _totalBorrows,
            supplyRatePerBlock,
            borrowRatePerBlock,
            userSupply: _userSupply,
            userBorrow: _userBorrow,
          };
          if (oTokensLength === 0) {
            count++;
            formatedData('oTokens data');
          }
        })
        .catch((err: any) => {
          console.log('getCTokensData err', err);
          // setTimeout(() => {
          //   getCTokenData(oToken);
          // }, 1000);
        });
    };

    const getCTokensData = () => {
      Object.values(markets).forEach((market) => {
        getCTokenData(market);
      });
    };
    const getCollateralStatus = () => {
      const oTokens = Object.values(markets);
      const contract = new ethers.Contract(
        collateralAddress,
        UNITROLLER_ABI,
        provider,
      );
      contract
        .getAssetsIn(account)
        .then((res: any) => {
          console.log('getCollateralStatus-res:', res, oTokens);

          if (Array.isArray(res) && res.length) {
            _collateralMap = {};
            res.forEach((addr) => {
              const _market: any = oTokens.find(
                (item: any) =>
                  item.address.toLocaleLowerCase() === addr.toLocaleLowerCase(),
              );

              if (_market) {
                _collateralMap[_market.address] = true;
              }
            });
          }

          count++;
          formatedData('User Borrows');
        })
        .catch((err: any) => {
          console.log('CATCH_getCollateralStatus_ERROR:', err);
        });
    };
    const getBorrowCaps = () => {
      const cTokens = Object.keys(markets);
      const calls = cTokens.map((_cToken) => ({
        address: collateralAddress,
        name: 'borrowCaps',
        params: [_cToken],
      }));
      multicall({
        abi: [
          {
            inputs: [
              {
                internalType: 'address',
                name: '',
                type: 'address',
              },
            ],
            name: 'borrowCaps',
            outputs: [
              {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
        ],
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          console.log('getBorrowCaps-res:', res);

          if (Array.isArray(res) && res.length) {
            _borrowCapsRes = {};
            res.forEach((amount, index) => {
              _borrowCapsRes[cTokens[index]] = amount;
            });
          }

          count++;
          formatedData('getBorrowCaps');
        })
        .catch((err: any) => {
          console.log('CATCH_getBorrowCaps_ERROR:', err);
        });
    };
    const getMinBorrow = () => {
      const cTokens = Object.keys(markets);

      const calls = cTokens.map((_cToken) => ({
        address: '0x8ea3fc79D9E463464C5159578d38870b770f6E57',
        name: 'getMinBorrowEth',
        params: [_cToken],
      }));
      multicall({
        abi: [
          {
            inputs: [
              {
                internalType: 'contract ICErc20',
                name: '_ctoken',
                type: 'address',
              },
            ],
            name: 'getMinBorrowEth',
            outputs: [
              {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
        ],
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          console.log('getMinBorrow-res:', res);

          if (Array.isArray(res) && res.length) {
            _minBorrowMap = {};
            res.forEach((_rawMinAmount, index) => {
              _minBorrowMap[cTokens[index]] = _rawMinAmount;
            });
          }

          count++;
          formatedData('getMinBorrow');
        })
        .catch((err: any) => {
          console.log('CATCH_getMinBorrow_ERROR:', err);
        });
    };

    // getUnitrollerData();
    getUnderlyPrice();
    getBorrowCaps();
    getOTokenLiquidity();
    getWalletBalance();
    getCTokensData();
    getCollateralStatus();
    getMinBorrow();
  }, [update, account]);

  return null;
};

export default IonicData;
