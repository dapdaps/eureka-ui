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
    name: 'getCash',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalReserves',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'reserveFactorMantissa',
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
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'rewardAccrued',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
];
const ORACLE_ABI = [
  {
    inputs: [
      {
        internalType: 'contract IKToken',
        name: 'kToken',
        type: 'address'
      }
    ],
    name: 'getUnderlyingPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256'
      }
    ],
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
      {
        internalType: 'uint256',
        name: 'baseRatePerYear',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'multiplierPerYear',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'jumpMultiplierPerYear',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'kink_',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [],
    name: 'baseRatePerTimestamp',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'cash',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'borrows',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'reserves',
        type: 'uint256'
      }
    ],
    name: 'getBorrowRate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'cash',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'borrows',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'reserves',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'reserveFactorMantissa',
        type: 'uint256'
      }
    ],
    name: 'getSupplyRate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'isInterestRateModel',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'jumpMultiplierPerTimestamp',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'kink',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'multiplierPerTimestamp',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'timestampsPerYear',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'cash',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'borrows',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'reserves',
        type: 'uint256'
      }
    ],
    name: 'utilizationRate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  }
];

const KeomProtocolData = (props: any) => {
  const {
    multicallAddress,
    unitrollerAddress,
    rateModelSlopeAddress,
    oracleAddress,
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

    const _cTokensData: any = {};
    let _loanToValue: any = null;
    let _underlyPrice: any = {};
    let _liquidity: any = null;
    let _underlyingBalance: any = null;
    let _userMerberShip: any = null;
    const _rewards: any = {};
    const _accountRewards: any = {};
    let count = 0;
    let oTokensLength = Object.values(markets).length;

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
          liquidity: _liquidity[market.address],
          underlyingPrice: underlyingPrice,
          userUnderlyingBalance: _underlyingBalance[market.address],
          userMerberShip: _userMerberShip[market.address],
          supplyApy: supplyApy.toFixed(2) + '%',
          borrowApy: borrowApy.toFixed(2) + '%',
          dapp: name
        };
      });
      onLoad({
        markets,
        totalSupplyUsd: totalSupplyUsd.toString(),
        totalBorrowUsd: totalBorrowUsd.toString(),
        userTotalSupplyUsd: userTotalSupplyUsd.toString(),
        userTotalBorrowUsd: userTotalBorrowUsd.toString(),
        totalCollateralUsd: totalCollateralUsd.toString()
      });
    };
    const getUnitrollerData = () => {
      const calls = [];
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
      calls.push({
        address: unitrollerAddress,
        name: 'rewardAccrued',
        params: [account]
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
            if (i === res.length - 1) {
              _accountRewards.reward =
                res[i] && res[i][0] ? ethers.utils.formatUnits(res[i] ? res[i][0]._hex || 0 : 0, 18) : '0';
              count++;
              formatedData('getUnitrollerData');
              return;
            }
            const index = Math.floor(i / (account ? 2 : 1));
            const mod = i % (account ? 2 : 1);
            switch (mod) {
              case 0:
                _loanToValue[oTokens[index].address] = ethers.utils.formatUnits(res[i] ? res[i][1]._hex || 0 : 0, 16);
                break;
              case 1:
                _userMerberShip[oTokens[index].address] = res[i] ? res[i][0] || false : false;
                break;
              default:
            }
          }
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
      _underlyPrice = {};
      const UnderlyingContract = new ethers.Contract(oracleAddress, ORACLE_ABI, provider.getSigner());
      const getUnderlyingPrices = Object.values(markets).map((token: any) => {
        return new Promise((resolve) => {
          UnderlyingContract.getUnderlyingPrice(token.address)
            .then((res: any) => {
              const _price = ethers.utils.formatUnits(res._hex, 36 - markets[token.address].underlyingToken.decimals);
              resolve({ price: _price, address: token.address });
            })
            .catch((err: any) => {
              console.log('error-getUnderlyPrice', err);
              resolve({ price: prices[token.underlyingToken.symbol] || '1', address: token.address });
            });
        });
      });
      Promise.all(getUnderlyingPrices).then((res: any) => {
        res.forEach((price: any) => {
          _underlyPrice[price.address] = price.price;
        });
        count++;
        formatedData('getUnderlyPrice');
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
            _liquidity[oToken.address] = res[i]
              ? ethers.utils.formatUnits(res[i][0]._hex, oToken.underlyingToken.decimals)
              : '0';
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
          setTimeout(() => {
            getOTokenLiquidity();
          }, 500);
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
          name: 'getAccountSnapshot',
          params: [account]
        },
        {
          address: oToken.address,
          name: 'getCash'
        },
        {
          address: oToken.address,
          name: 'totalReserves'
        },
        {
          address: oToken.address,
          name: 'reserveFactorMantissa'
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
          const exchangeRateStored = ethers.utils.formatUnits(
            res[0] ? res[0][0]._hex || 0 : 0,
            10 + oToken.underlyingToken.decimals
          );
          const userSupply = ethers.utils.formatUnits(res[3] ? res[3][1]._hex || 0 : 0, oToken.decimals);
          const totalSupply = ethers.utils.formatUnits(res[1] ? res[1][0]._hex || 0 : 0, oToken.decimals);
          const totalBorrows = ethers.utils.formatUnits(
            res[2] ? res[2][0]._hex || 0 : 0,
            oToken.underlyingToken.decimals
          );
          const userBorrow = ethers.utils.formatUnits(
            res[3] ? res[3][2]._hex || 0 : 0,
            oToken.underlyingToken.decimals
          );
          const rateCalls = [
            {
              address: rateModelSlopeAddress,
              name: 'getBorrowRate',
              params: [
                res[4] ? res[4][0] || '0' : '0',
                res[2] ? res[2][0] || '0' : '0',
                res[5] ? res[5][0] || '0' : '0'
              ]
            },
            {
              address: rateModelSlopeAddress,
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
              const borrowRatePerTimestamp = rateRes[0] ? ethers.utils.formatUnits(rateRes[0][0]._hex || '0', 18) : '0';
              const supplyRatePerTimestamp = rateRes[1] ? ethers.utils.formatUnits(rateRes[1][0]._hex || '0', 18) : '0';
              _cTokensData[oToken.address] = {
                ...oToken,
                exchangeRateStored,
                totalSupply: Big(totalSupply).mul(exchangeRateStored).toString(),
                totalBorrows,
                borrowRatePerTimestamp,
                supplyRatePerTimestamp,
                userSupply: Big(userSupply).mul(exchangeRateStored).toString(),
                userBorrow
              };
              console.log('>>>>> %s data: %o', oToken.symbol, _cTokensData[oToken.address]);
              if (oTokensLength === 0) {
                count++;
                formatedData('oTokens data');
              }
            })
            .catch((err: any) => {
              console.log('error-getCTokenData-rateModelSlope', err);
              setTimeout(() => {
                getCTokenData(oToken);
              }, 500);
            });
        })
        .catch((err: any) => {
          console.log('error-getCTokenData', err);
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

    getUnitrollerData();
    getUnderlyPrice();
    getOTokenLiquidity();
    getWalletBalance();
    getCTokensData();
  }, [update, account, provider]);

  return null;
};

export default KeomProtocolData;
