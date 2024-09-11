import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect } from 'react';

const ABI = [
  {
    inputs: [],
    name: 'totalSupply',
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
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
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
  {
    inputs: [],
    name: 'totalBorrow',
    outputs: [
      {
        internalType: 'uint128',
        name: 'amount',
        type: 'uint128',
      },
      {
        internalType: 'uint128',
        name: 'shares',
        type: 'uint128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalAssets',
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
  {
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address',
      },
    ],
    name: 'getUserSnapshot',
    outputs: [
      {
        internalType: 'uint256',
        name: '_userAssetShares',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_userBorrowShares',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_userCollateralBalance',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_shares',
        type: 'uint256',
      },
    ],
    name: 'convertToAssets',
    outputs: [
      {
        internalType: 'uint256',
        name: '_assets',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'cleanLiquidationFee',
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
  {
    inputs: [],
    name: 'maxLTV',
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
  {
    inputs: [],
    name: 'exchangeRateInfo',
    outputs: [
      {
        internalType: 'address',
        name: 'oracle',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'maxOracleDeviation',
        type: 'uint32',
      },
      {
        internalType: 'uint184',
        name: 'lastTimestamp',
        type: 'uint184',
      },
      {
        internalType: 'uint256',
        name: 'lowExchangeRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'highExchangeRate',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_shares',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: '_roundUp',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: '_previewInterest',
        type: 'bool',
      },
    ],
    name: 'toBorrowAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
const RATE_ABI = [
  {
    inputs: [],
    name: 'MAX_FULL_UTIL_RATE',
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
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_deltaTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_utilization',
        type: 'uint256',
      },
      {
        internalType: 'uint64',
        name: '_oldFullUtilizationInterest',
        type: 'uint64',
      },
    ],
    name: 'getNewRate',
    outputs: [
      {
        internalType: 'uint64',
        name: '_newRatePerSec',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: '_newFullUtilizationInterest',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const SturdyData = (props: any) => {
  const {
    multicallAddress,
    multicall,
    account,
    prices,
    dexConfig,
    update,
    onLoad,
    markets,
    provider,
  } = props;

  const { formatUnits, parseUnits } = ethers.utils;

  useEffect(() => {
    if (!account || !update || !multicallAddress) return;
    let count = 0;
    let _balanceRes: any = [];
    let _borrowbalanceRes: any = [];
    let _totalBorrowRes: any = [];
    let _totalAssetsRes: any = [];
    let _liquidationFeeRes: any = [];
    let _maxLTVRes: any = [];
    let _exchangeRateRes: any = [];
    let _totalSupplyRes: any = [];
    let _yourBorrows: any = [];
    let _yourBorrowShares: any = [];
    let _yourCollaterals: any = [];
    let _yourLends: any = [];
    let _maxRateRes: any = [];

    const rawMarkets: any = Object.values(markets);

    function formatData(params: any) {
      if (count < 11) return;

      const _markets: any = {};
      count = 0;
      for (let i = 0; i < rawMarkets.length; i++) {
        rawMarkets[i].underlyingPrice = prices[rawMarkets[i].underlyingToken.symbol] || 1;
        rawMarkets[i].borrowTokenPrice = prices[rawMarkets[i].borrowToken.symbol] || 1;

        rawMarkets[i].totalSupplied = formatUnits(
          _totalSupplyRes[i][0],
          rawMarkets[i].borrowToken.decimals,
        ).toString();
        rawMarkets[i].totalSupplyUsd = Big(rawMarkets[i].totalSupplied).times(rawMarkets[i].borrowTokenPrice).toFixed(2);
        rawMarkets[i].totalBorrows = _totalBorrowRes[i]
          ? _totalBorrowRes[i][0]
          : 0;
        rawMarkets[i].totalBorrowed = formatUnits(
          _totalBorrowRes[i][0],
          rawMarkets[i].borrowToken.decimals,
        ).toString();
        rawMarkets[i].totalBorrowUsd = Big(rawMarkets[i].totalBorrowed).times(rawMarkets[i].borrowTokenPrice).toFixed(2);
        rawMarkets[i].totalAssets = _totalAssetsRes[i]
          ? _totalAssetsRes[i][0]
          : 0;

        rawMarkets[i].liquidationFee = formatUnits(_liquidationFeeRes[i][0], 5);
        rawMarkets[i].maxLTV = formatUnits(_maxLTVRes[i][0], 5);
        rawMarkets[i].exchangeRate = _exchangeRateRes[i][_exchangeRateRes[i].length - 1].toString();
        // formatUnits(
        //   _exchangeRateRes[i][_exchangeRateRes[i].length - 1]
        // );
        // const [rest, borrowShares, collateralShares] = _yourBorrowShares;
        rawMarkets[i].yourBorrowShares = _yourBorrowShares[i]
          ? _yourBorrowShares[i][1]
          : 0;
        const yourBorrow = _yourBorrows[i]
          ? formatUnits(_yourBorrows[i][0], rawMarkets[i].borrowToken.decimals)
          : 0;

        rawMarkets[i].yourBorrow = yourBorrow;
        rawMarkets[i].yourBorrowUSD = Big(yourBorrow)
          .times(Big(rawMarkets[i].borrowTokenPrice))
          .toFixed();

        const yourCollateral = _yourCollaterals[i]
          ? formatUnits(_yourCollaterals[i][0], rawMarkets[i].underlyingToken.decimals)
          : 0;

        rawMarkets[i].yourCollateral = yourCollateral;
        rawMarkets[i].yourCollateralUSD = Big(yourCollateral)
          .times(Big(rawMarkets[i].underlyingPrice))
          .toFixed();

        const yourLends = _yourLends[i]
          ? formatUnits(_yourLends[i][0], rawMarkets[i].borrowToken.decimals)
          : 0;

        rawMarkets[i].yourLends = yourLends;
        rawMarkets[i].yourLendsUSD = Big(yourLends)
          .times(Big(rawMarkets[i].borrowTokenPrice))
          .toFixed();

        rawMarkets[i].MAX_FULL_UTIL_RATE = _maxRateRes[i] ? _maxRateRes[i][0] : 0;

        rawMarkets[i].Utilization = Big(rawMarkets[i].totalBorrows)
          .div(Big(rawMarkets[i].totalAssets))
          .toFixed(4);

        _markets[rawMarkets[i].address] = {
          ...rawMarkets[i],
        };
      }

      // for (let i = 0; i < rawMarkets.length; i++) {
      //   rawMarkets[i].ratePerSecRes = _ratePerSecRes[i][0];
      // }
      for (let i = 0; i < _balanceRes.length; i++) {
        _markets[rawMarkets[i].address].userUnderlyingBalance = formatUnits(
          _balanceRes[i] ? _balanceRes[i][0] : 0,
          rawMarkets[i].underlyingToken.decimals,
        );
      }
      for (let i = 0; i < _borrowbalanceRes.length; i++) {
        _markets[rawMarkets[i].address].userBorrowBalance = formatUnits(
          _borrowbalanceRes[i] ? _borrowbalanceRes[i][0] : 0,
          rawMarkets[i].borrowToken.decimals,
        );
      }

      const userTotalCollateralUsd = rawMarkets.reduce((total: any, item: any) => {
        return Big(total).plus(Big(item.yourCollateralUSD)).toFixed();
      }, 0);
      const userTotalBorrowUsd = rawMarkets.reduce((total: any, item: any) => {
        return Big(total).plus(Big(item.yourBorrowUSD)).toFixed();
      }, 0);
      const userTotalSupplyUsd = rawMarkets.reduce((total: any, item: any) => {
        return Big(total).plus(Big(item.yourLendsUSD)).toFixed();
      }, 0);

      onLoad({
        markets: _markets,
        userTotalCollateralUsd,
        userTotalBorrowUsd,
        userTotalSupplyUsd,
      });

      getNewRates(_markets);
    }

    function getTotalBorrow() {
      const calls = rawMarkets.map((item: any) => ({
        address: item.address,
        name: 'totalBorrow',
        // params: [],
      }));

      multicall({
        abi: ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          console.log('getTotalBorrow_res', res);
          _totalBorrowRes = res;
          count++;
          formatData('getTotalBorrow');
        })
        .catch((err: any) => {
          console.log('getTotalAssets_error:', err);
        });
    }

    function getTotalAssets() {
      const calls = rawMarkets.map((item: any) => ({
        address: item.address,
        name: 'totalAssets',
        // params: [],
      }));

      multicall({
        abi: ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          console.log('getTotalAssets--', res);
          _totalAssetsRes = res;
          count++;
          formatData('getTotalAssets');
        })
        .catch((err: any) => {
          console.log('getTotalAssets_error:', err);
        });
    }

    function getLiquidationFee() {
      const calls = rawMarkets.map((item: any) => ({
        address: item.address,
        name: 'cleanLiquidationFee',
        // params: [],
      }));

      multicall({
        abi: ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          console.log('get cleanLiquidationFee--', res);
          _liquidationFeeRes = res;
          count++;
          formatData('getLiquidationFee');
        })
        .catch((err: any) => {
          console.log('getcleanLiquidationFee_error:', err);
        });
    }

    function getMaxLTV() {
      const calls = rawMarkets.map((item: any) => ({
        address: item.address,
        name: 'maxLTV',
        // params: [],
      }));

      multicall({
        abi: ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          console.log('get getMaxLTV--', res);
          _maxLTVRes = res;
          count++;
          formatData('getMaxLTV');
        })
        .catch((err: any) => {
          console.log('get MaxLTV_error:', err);
        });
    }

    function getExchangeRate() {
      const calls = rawMarkets.map((item: any) => ({
        address: item.address,
        name: 'exchangeRateInfo',
        // params: [],
      }));

      multicall({
        abi: ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          console.log('getExchangeRate--', res);
          _exchangeRateRes = res;
          count++;
          formatData('getExchangeRate');
        })
        .catch((err: any) => {
          console.log('getExchangeRate_error:', err);
        });
    }

    function getTotalSupply() {
      const calls = rawMarkets.map((item: any) => ({
        address: item.address,
        name: 'totalSupply',
      }));

      multicall({
        abi: ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          console.log('getTotalSupply--', res);
          _totalSupplyRes = res;
          count++;
          formatData('getTotalSupply');
        })
        .catch((err: any) => {
          console.log('getTotalSupply-error:', err);
        });
    }

    function getUserSnapshot() {
      const calls = rawMarkets.map((item: any) => ({
        address: item.address,
        name: 'getUserSnapshot',
        params: [account],
      }));

      multicall({
        abi: ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          console.log('getUserSnapshot--', res);
          return res;
        })
        .then((snapshot: any) => {
          const calls = rawMarkets.map((item: any, index: any) => {
            const snapshotItem = snapshot[index] ? snapshot[index] : [0, 0, 0];
            const [rest, borrowShares, collateralShares] = snapshotItem;

            return {
              address: item.address,
              name: 'toBorrowAmount',
              params: [borrowShares, true, true],
            };
          });

          return multicall({
            abi: ABI,
            calls,
            options: {},
            multicallAddress,
            provider: provider,
          }).then((res: any) => {
            console.log('_yourBorrows--', res, snapshot);

            _yourBorrows = res;
            _yourBorrowShares = snapshot;
            // count++;
            // formatData("getUserSnapshot");
            return snapshot;
          });
        })
        .then((snapshot: any) => {
          const calls = rawMarkets.map((item: any, index: any) => {
            const snapshotItem = snapshot[index] ? snapshot[index] : [0, 0, 0];
            const [rest, borrowShares, collateralShares] = snapshotItem;
            return {
              address: item.address,
              name: 'convertToAssets',
              params: [collateralShares],
            };
          });

          multicall({
            abi: ABI,
            calls,
            options: {},
            multicallAddress,
            provider: provider,
          }).then((res: any) => {
            console.log('_yourCollaterals--', res);
            _yourCollaterals = res;
            count++;
            formatData('getBorrow&Collateral');
          });
        })
        .catch((err: any) => {
          console.log('getUserSnapshot-error:', err);
        });
    }

    function getUserLends() {
      const calls = rawMarkets.map((item: any) => ({
        address: item.address,
        name: 'balanceOf',
        params: [account],
      }));

      multicall({
        abi: ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          console.log('getUserLends--', res);
          return res;
        })
        .then((lendShare: any) => {
          const calls = rawMarkets.map((item: any, index: any) => {
            const _lendShare = lendShare[index] ? lendShare[index][0] : 0;
            return {
              address: item.address,
              name: 'convertToAssets',
              params: [_lendShare],
            };
          });

          multicall({
            abi: ABI,
            calls,
            options: {},
            multicallAddress,
            provider: provider,
          }).then((res: any) => {
            console.log('convertToAssets--', res);
            _yourLends = res;
            count++;
            formatData('getUserLends');
          });
        })

        .catch((err: any) => {
          console.log('getUserSnapshot-error:', err);
        });
    }

    function getWalletBalance() {
      const calls = rawMarkets.map((item: any) => ({
        address: item.underlyingToken.address,
        name: 'balanceOf',
        params: [account],
      }));

      multicall({
        abi: [
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
        ],
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          console.log('get_wallet_bal_res:', res);
          _balanceRes = res;
          count++;
          formatData('getWalletBalance');
        })
        .catch((err: any) => {
          console.log('getWalletBalance_error', err);
        });
    }

    function getBorrowWalletBalance() {
      const calls = rawMarkets.map((item: any) => ({
        address: item.borrowToken.address,
        name: 'balanceOf',
        params: [account],
      }));

      multicall({
        abi: [
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
        ],
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          console.log('get_Borrow_wallet_bal_res:', res);
          _borrowbalanceRes = res;
          count++;
          formatData('getBorrowWalletBalance');
        })
        .catch((err: any) => {
          console.log('getBorrowWalletBalance_error', err);
        });
    }

    function getRate() {
      const contract = new ethers.Contract(
        '0xAE610460522F3e71c40Ad6a2c70f486341B88Daf',
        [
          {
            inputs: [],
            name: 'MAX_FULL_UTIL_RATE',
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
          {
            inputs: [
              {
                internalType: 'uint256',
                name: '_deltaTime',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: '_utilization',
                type: 'uint256',
              },
              {
                internalType: 'uint64',
                name: '_oldFullUtilizationInterest',
                type: 'uint64',
              },
            ],
            name: 'getNewRate',
            outputs: [
              {
                internalType: 'uint64',
                name: '_newRatePerSec',
                type: 'uint64',
              },
              {
                internalType: 'uint64',
                name: '_newFullUtilizationInterest',
                type: 'uint64',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
        ],
        provider.getSigner(),
      );
      contract
        .getNewRate(0, 0, 0)
        .then((res: any) => {
          // _totalBorrowRes = res;
          count++;
          formatData('getRate');
        })
        .catch((err: any) => {
          console.log(222, err);
        });
    }

    function getMaxRates() {
      const calls = rawMarkets.map((item: any) => ({
        address: item.rate,
        name: 'MAX_FULL_UTIL_RATE',
        // params: [],
      }));

      multicall({
        abi: RATE_ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          console.log('getMaxRates--', res);
          _maxRateRes = res;
          count++;
          formatData('getMaxRates');
        })
        .catch((err: any) => {
          console.log('getRates-error:', err);
        });
    }

    function getNewRates(_markets: any) {
      const _rawMarkets: any = Object.values(_markets);
      const calls = _rawMarkets.map((item: any) => {
        return {
          address: item.rate,
          name: 'getNewRate',
          params: [0, parseUnits(item.Utilization, 5), item.MAX_FULL_UTIL_RATE],
        };
      });

      multicall({
        abi: RATE_ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          console.log('getNewRates--', res);

          for (let index = 0; index < res.length; index++) {
            const _ratePerSec: any = res[index][0].toString();
            const { borrowAPR, lendAPR } = caLcSiLoAPYS(
              _ratePerSec,
              _rawMarkets[index].Utilization,
              _rawMarkets[index].protocolFee,
            );
            _markets[rawMarkets[index].address].borrowAPR = Big(borrowAPR || 0).times(100).toFixed(2) + '%';
            _markets[rawMarkets[index].address].lendAPR = Big(lendAPR || 0).times(100).toFixed(2) + '%';
            _markets[rawMarkets[index].address].Utilization = Big(_rawMarkets[index].Utilization || 0).times(100).toFixed(2) + '%';
          }
          onLoad({
            markets: _markets,
          });
        })
        .catch((err: any) => {
          console.log('getNewRates-error:', err);
        });
    }

    function caLcSiLoAPYS(ratePerSec: any, utilizationRate: any, protocolFee: any) {
      const FEE_PRECISION = 100_000;
      const RATE_PRECISION = Math.pow(10, 18);
      const SECONDS_PER_YEAR = 60 * 60 * 24 * 365;

      const interestPerSecond = Big(ratePerSec).div(RATE_PRECISION);
      const fee = Big(protocolFee).div(FEE_PRECISION).toNumber();

      const borrowAPR = interestPerSecond.times(SECONDS_PER_YEAR).toString();
      // const borrowAPY =
      //   (1 + interestPerSecond) ** SECONDS_PER_YEAR.toNumber() - 1;
      const lendAPR = Big(borrowAPR)
        .times(1 - fee)
        .times(utilizationRate)
        .toString();
      // const lendAPY = borrowAPY * (1 - fee) * utilizationRate;
      return {
        borrowAPR,
        lendAPR,
        //  borrowAPY, lendAPY,
      };
    }

    // caLcSiLoAPYS(7503944640, 0.8184, 0.1);
    getTotalBorrow();
    getTotalAssets();
    getLiquidationFee();
    getMaxLTV();
    getExchangeRate();
    getTotalSupply();
    getUserSnapshot();
    getUserLends();
    getWalletBalance();
    getBorrowWalletBalance();
    getMaxRates();
  }, [account, update]);

};

export default SturdyData;
