import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect } from 'react';

import { useIsolateStore } from '../components/AaveV3/hooks/useIsolateStore';
import { ACTUAL_BORROW_AMOUNT_RATE, chunk, isValid, ROUND_DOWN } from '../components/AaveV3/utils';

const REWARD_TOKEN_DECIMALS = 1e18;
const SECONDS_PER_YEAR = 31536000;

const AaveV3Data = (props: any) => {
  const { account, prices, multicallAddress, multicall, isChainSupported, dexConfig, onLoad, provider, state, config } =
    props;
  const setIsolateStore = useIsolateStore((store) => store.set);

  const markets = dexConfig?.rawMarkets?.map((item: any) => ({
    ...item,
    tokenPrice: prices[item.symbol] || 1
  }));

  function calcAvailableBorrows(availableBorrowsUSD: any, tokenPrice: any) {
    const r =
      isValid(availableBorrowsUSD) && isValid(tokenPrice)
        ? Big(availableBorrowsUSD || 0)
            .div(tokenPrice)
            .toFixed()
        : Number(0).toFixed();

    return r;
  }

  function bigMin(_a: any, _b: any) {
    const a = Big(_a || 0);
    const b = Big(_b || 0);
    return a.gt(b) ? b : a;
  }

  function formatHealthFactor(hf: any) {
    try {
      if (hf === '∞') return hf;

      if (!hf || !isValid(hf)) return '-';

      if (Big(hf).gt(10000)) return '∞';
      if (Number(hf) === -1) return '∞';
      return Big(hf).toFixed(2, ROUND_DOWN);
    } catch (error) {
      console.log('CATCH_formatHealthFactor:', error);
    }
  }

  function showReload() {
    onLoad({
      isShowReloadModal: true
    });
  }

  function batchBalanceOf(userAddress: any, tokenAddresses: any) {
    const balanceProvider = new ethers.Contract(
      config.balanceProviderAddress,
      [
        {
          inputs: [
            { internalType: 'address[]', name: 'users', type: 'address[]' },
            { internalType: 'address[]', name: 'tokens', type: 'address[]' }
          ],
          name: 'batchBalanceOf',
          outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
          stateMutability: 'view',
          type: 'function'
        }
      ],
      provider.getSigner()
    );

    return balanceProvider.batchBalanceOf([userAddress], tokenAddresses);
  }

  function getLiquidity(userData?: any) {
    const { availableBorrowsUSD } = userData || state;
    const aTokenAddresss = markets?.map((item: any) => item.aTokenAddress);
    const variableDebtTokenAddresss = markets
      ?.filter((item: any) => item.variableDebtTokenAddress)
      .map((item: any) => item.variableDebtTokenAddress);

    const calls = aTokenAddresss
      ?.map((addr: any) => ({
        address: addr,
        name: 'totalSupply'
      }))
      .concat(
        variableDebtTokenAddresss?.map((addr: any) => ({
          address: addr,
          name: 'totalSupply'
        }))
      );

    multicall({
      abi: [
        {
          inputs: [],
          name: 'totalSupply',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function'
        }
      ],
      calls,
      options: {},
      multicallAddress,
      provider
    })
      .then((res: any) => {
        try {
          console.log('getLiquidity_res', res);
          const l = res.length;
          const aTokenTotal = res.slice(0, l / 2);
          const debtTotal = res.slice(l / 2);

          const _assetsToSupply = [...state.assetsToSupply];
          for (let i = 0; i < _assetsToSupply.length; i++) {
            const liquidityAmount = Big(aTokenTotal[i] || 0)
              .minus(Big(debtTotal[i] || 0))
              .toFixed();
            _assetsToSupply[i].availableLiquidity = liquidityAmount;
            const _availableLiquidityUSD = Big(ethers.utils.formatUnits(liquidityAmount, _assetsToSupply[i].decimals))
              .mul(Big(prices[_assetsToSupply[i].symbol] || 1))
              .toFixed();
            _assetsToSupply[i].availableLiquidityUSD = _availableLiquidityUSD;

            const _availableBorrowsUSD = bigMin(
              availableBorrowsUSD,
              ethers.utils.formatUnits(liquidityAmount, _assetsToSupply[i].decimals)
            )
              .times(ACTUAL_BORROW_AMOUNT_RATE)
              .toFixed();

            const _availableBorrows = calcAvailableBorrows(_availableBorrowsUSD, _assetsToSupply[i].tokenPrice || 1);

            _assetsToSupply[i].availableBorrowsUSD = _availableBorrowsUSD;
            _assetsToSupply[i].availableBorrows = _availableBorrows;
          }
          onLoad({
            assetsToSupply: _assetsToSupply,
            aTokenTotal,
            debtTotal,
            hasExistedLiquidity: true
          });
        } catch (error) {
          console.log('catch getLiquidity', error);
        }
      })
      .catch((err: any) => {
        console.log('getLiquidity_err', err);
        showReload();
      });
  }
  // update data in async manner
  function getUserBalance() {
    provider
      .getSigner()
      ?.getBalance()
      .then((balance: any) => {
        return balance;
      })
      .then((baseAssetBalance: any) => {
        // get user balances
        batchBalanceOf(
          account,
          markets?.map((market: any) => market.underlyingAsset)
        )
          .then((balances: any) => {
            return balances?.map((balance: any) => balance.toString());
          })
          .then((userBalances: any) => {
            console.log('getUserBalance--', userBalances);
            if (userBalances.every((item: any) => item === null)) {
              onLoad({
                isShowReloadModal: true
              });
            } else {
              const _assetsToSupply = [...state.assetsToSupply];
              for (let index = 0; index < _assetsToSupply.length; index++) {
                const item = _assetsToSupply[index];
                const _bal = item.symbol === config.nativeCurrency.symbol ? baseAssetBalance : userBalances[index];
                const balanceRaw = Big(_bal || 0).div(Big(10).pow(item.decimals));
                const _balance = balanceRaw.toFixed(item.decimals, ROUND_DOWN);

                const _balanceInUSD = balanceRaw.times(Big(item.tokenPrice || 1)).toFixed();

                item.balance = _balance;
                item.balanceInUSD = _balanceInUSD;
              }

              onLoad({
                assetsToSupply: _assetsToSupply
              });
            }
          })
          .catch((err: any) => {
            console.log('batchBalanceOfERROR:', err);
            showReload();
          });
      });
  }

  function getPoolDataProvider() {
    const underlyingTokens = dexConfig?.rawMarkets?.map((market: any) => market.underlyingAsset);
    // console.log("getPoolDataProvider--", underlyingTokens);
    const calls = underlyingTokens?.map((addr: any) => ({
      address: config.PoolDataProvider,
      name: 'getReserveData',
      params: [addr]
    }));

    multicall({
      abi: [
        {
          inputs: [{ internalType: 'address', name: 'asset', type: 'address' }],
          name: 'getReserveData',
          outputs: [
            { internalType: 'uint256', name: 'unbacked', type: 'uint256' },
            {
              internalType: 'uint256',
              name: 'accruedToTreasuryScaled',
              type: 'uint256'
            },
            { internalType: 'uint256', name: 'totalAToken', type: 'uint256' },
            {
              internalType: 'uint256',
              name: 'totalStableDebt',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'totalVariableDebt',
              type: 'uint256'
            },
            { internalType: 'uint256', name: 'liquidityRate', type: 'uint256' },
            {
              internalType: 'uint256',
              name: 'variableBorrowRate',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'stableBorrowRate',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'averageStableBorrowRate',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'liquidityIndex',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'variableBorrowIndex',
              type: 'uint256'
            },
            {
              internalType: 'uint40',
              name: 'lastUpdateTimestamp',
              type: 'uint40'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        }
      ],
      calls,
      options: {},
      multicallAddress,
      provider
    })
      .then((res: any) => {
        console.log('getPoolDataProvider_res', res);

        return res;
      })
      .then((poolData: any) => {
        console.log('CALC APY');
        if (!Array.isArray(poolData) || !poolData.length) return;

        const _assetsToSupply = [...state.assetsToSupply];

        for (let i = 0; i < poolData.length; i++) {
          if (poolData[i]) {
            const [
              unbacked,
              accruedToTreasuryScaled,
              totalAToken,
              totalStableDebt,
              totalVariableDebt,
              liquidityRate,
              variableBorrowRate,
              stableBorrowRate,
              averageStableBorrowRate,
              liquidityIndex,
              variableBorrowIndex,
              lastUpdateTimestamp
            ] = poolData[i];
            const RAY = Big(10).pow(27);
            const SECONDS_PER_YEAR = 31_536_000;
            const depositAPR = Big(liquidityRate).div(RAY || 1);
            const depositAPY0 = Big(1)
              .plus(depositAPR.div(Big(SECONDS_PER_YEAR)))
              .toNumber();

            const _supplyAPY = Big(Math.pow(depositAPY0, SECONDS_PER_YEAR) - 1).toFixed();
            console.log('_supplyAPY--', _supplyAPY);

            if (!_assetsToSupply[i]) return;
            const variableBorrowAPR = Big(variableBorrowRate).div(RAY || 1);

            const variableBorrowAPY0 = Big(1)
              .plus(Big(variableBorrowAPR || 0).div(Big(SECONDS_PER_YEAR)))
              .toNumber();

            const _borrowAPY = Big(Math.pow(variableBorrowAPY0, SECONDS_PER_YEAR) - 1).toFixed();

            const _utilized = Big(totalVariableDebt || 0)
              .div(Big(totalAToken || 1))
              .toFixed();

            _assetsToSupply[i].supplyAPY = _supplyAPY;
            _assetsToSupply[i].borrowAPY = _borrowAPY;
            _assetsToSupply[i].utilized = _utilized;
          }
        }
        onLoad({
          assetsToSupply: _assetsToSupply
        });
      })
      .catch((err: any) => {
        showReload();
        console.log('getPoolDataProvider_err', err);
      });
  }

  // Pool Liquidity Pac
  function getPoolDataProviderTotalSupplyForPac() {
    const prevAssetsToSupply = [...state.assetsToSupply];

    const underlyingTokens = dexConfig?.rawMarkets?.map((market: any) => market.underlyingAsset);

    const calls = underlyingTokens?.map((addr: any) => ({
      address: config.PoolDataProvider,
      name: 'getATokenTotalSupply',
      params: [addr]
    }));

    multicall({
      abi: [
        {
          inputs: [{ internalType: 'address', name: 'asset', type: 'address' }],
          name: 'getATokenTotalSupply',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function'
        }
      ],
      calls,
      options: {},
      multicallAddress,
      provider: provider
    })
      .then((res: any) => {
        console.log('getPoolDataProviderTotal_res', res);

        for (let i = 0; i < res.length; i++) {
          const _totalSupply = ethers.utils.formatUnits(res[i][0], prevAssetsToSupply[i].decimals);
          prevAssetsToSupply[i].totalSupply = _totalSupply;
        }
        onLoad({
          assetsToSupply: prevAssetsToSupply
        });
      })
      .catch((err: any) => {
        showReload();
        console.log('getPoolDataProviderTotal_err', err);
      });
  }

  // seamless use for yourSupplies
  function getPoolDataProviderTotalSupply() {
    const prevAssetsToSupply = [...state.assetsToSupply];

    const underlyingTokens = dexConfig?.rawMarkets?.map((market: any) => market.underlyingAsset);
    // console.log("getPoolDataProviderTotalSupply--", underlyingTokens);
    const calls = underlyingTokens?.map((addr: any) => ({
      address: config.PoolDataProvider,
      name: 'getATokenTotalSupply',
      params: [addr]
    }));

    multicall({
      abi: [
        {
          inputs: [{ internalType: 'address', name: 'asset', type: 'address' }],
          name: 'getATokenTotalSupply',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function'
        }
      ],
      calls,
      options: {},
      multicallAddress,
      provider
    })
      .then((res: any) => {
        console.log('getPoolDataProviderTotal_res', res);

        for (let i = 0; i < res.length; i++) {
          const _totalSupply = ethers.utils.formatUnits(res[i][0], prevAssetsToSupply[i].decimals);
          prevAssetsToSupply[i].totalSupply = _totalSupply;
          // console.log(
          //   "_totalSupply--",
          //   _totalSupply,
          //   prevAssetsToSupply[i].symbol,
          //   prices[prevAssetsToSupply[i].symbol]
          // );
          prevAssetsToSupply[i].totalSupplyUSD = Big(_totalSupply || 0)
            .times(prices[prevAssetsToSupply[i].symbol] || 1)
            .toFixed();
        }
        onLoad({
          assetsToSupply: prevAssetsToSupply
        });
      })
      .catch((err: any) => {
        console.log('getPoolDataProviderTotal_err', err);
        showReload();
      });
  }
  // seamless use for debt
  function getPoolDataProviderTotalDebt() {
    const prevAssetsToSupply = [...state.assetsToSupply];

    const underlyingTokens = dexConfig?.rawMarkets?.map((market: any) => market.underlyingAsset);
    // console.log("getPoolDataProviderTotalDebt--", underlyingTokens);
    const calls = underlyingTokens?.map((addr: any) => ({
      address: config.PoolDataProvider,
      name: 'getTotalDebt',
      params: [addr]
    }));

    multicall({
      abi: [
        {
          inputs: [{ internalType: 'address', name: 'asset', type: 'address' }],
          name: 'getTotalDebt',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function'
        }
      ],
      calls,
      options: {},
      multicallAddress,
      provider
    })
      .then((res: any) => {
        console.log('getPoolDataProviderTotal_res', res);

        for (let i = 0; i < res.length; i++) {
          const _totalDebts = ethers.utils.formatUnits(res[i][0], prevAssetsToSupply[i].decimals);
          prevAssetsToSupply[i].totalDebts = _totalDebts;
          prevAssetsToSupply[i].totalDebtsUSD = Big(_totalDebts)
            .times(prices[prevAssetsToSupply[i].symbol] || 1)
            .toFixed();
        }
        onLoad({
          assetsToSupply: prevAssetsToSupply
        });
      })
      .catch((err: any) => {
        console.log('getPoolDataProviderTotal_err', err);
        showReload();
      });
  }
  function getPoolDataProviderCaps() {
    const prevAssetsToSupply = [...state.assetsToSupply];

    const underlyingTokens = dexConfig?.rawMarkets?.map((market: any) => market.underlyingAsset);
    // console.log("getPoolDataProviderCaps--", underlyingTokens);
    const calls = underlyingTokens?.map((addr: any) => ({
      address: config.PoolDataProvider,
      name: 'getReserveCaps',
      params: [addr]
    }));

    multicall({
      abi: [
        {
          inputs: [{ internalType: 'address', name: 'asset', type: 'address' }],
          name: 'getReserveCaps',
          outputs: [
            { internalType: 'uint256', name: 'borrowCap', type: 'uint256' },
            { internalType: 'uint256', name: 'supplyCap', type: 'uint256' }
          ],
          stateMutability: 'view',
          type: 'function'
        }
      ],
      calls,
      options: {},
      multicallAddress,
      provider
    })
      .then((res: any) => {
        console.log('getPoolDataProviderCaps_res', res);

        for (let i = 0; i < res.length; i++) {
          const [borrowCap, supplyCap] = res[i];

          prevAssetsToSupply[i].borrowCap = borrowCap.toNumber();
          prevAssetsToSupply[i].borrowCapUSD = Big(borrowCap)
            .times(prices[prevAssetsToSupply[i].symbol] || 1)
            .toFixed();
          prevAssetsToSupply[i].supplyCap = supplyCap.toNumber();
          prevAssetsToSupply[i].supplyCapUSD = Big(supplyCap)
            .times(prices[prevAssetsToSupply[i].symbol] || 1)
            .toFixed();
        }
        onLoad({
          assetsToSupply: prevAssetsToSupply
        });
      })
      .catch((err: any) => {
        console.log('getPoolDataProviderCaps_err', err);
        showReload();
      });
  }

  function getUserAccountData() {
    try {
      const contract = new ethers.Contract(
        config.aavePoolV3Address,
        [
          {
            inputs: [
              {
                internalType: 'address',
                name: 'user',
                type: 'address'
              }
            ],
            name: 'getUserAccountData',
            outputs: [
              {
                internalType: 'uint256',
                name: 'totalCollateralBase',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'totalDebtBase',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'availableBorrowsBase',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'currentLiquidationThreshold',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'ltv',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'healthFactor',
                type: 'uint256'
              }
            ],
            stateMutability: 'view',
            type: 'function'
          }
        ],
        provider
      );
      contract
        .getUserAccountData(account)
        .then((res: any) => {
          console.log('getUserAccountData_res:', res);
          const [
            totalCollateralBase,
            totalDebtBase,
            availableBorrowsBase,
            currentLiquidationThreshold,
            ltv,
            healthFactor
          ] = res;

          const totalDebtBaseUSD = ethers.utils.formatUnits(totalDebtBase.toString(), 8);

          const totalCollateralBaseUSD = ethers.utils.formatUnits(totalCollateralBase.toString(), 8);

          const threshold = ethers.utils.formatUnits(currentLiquidationThreshold.toString(), 4);

          const _totalCollateralBaseUSD = Big(totalCollateralBaseUSD).times(Big(threshold));

          const BorrowPowerUsed = Big(totalDebtBaseUSD || 0)
            .div(_totalCollateralBaseUSD.eq(0) ? 1 : _totalCollateralBaseUSD)
            .times(100)
            .toFixed();

          const hf = Big(totalDebtBase).eq(0)
            ? formatHealthFactor('∞')
            : formatHealthFactor(ethers.utils.formatUnits(healthFactor));
          console.log(
            ethers.utils.formatUnits(availableBorrowsBase, 8),
            'ethers.utils.formatUnits(availableBorrowsBase, 8)'
          );

          onLoad({
            threshold,
            currentLiquidationThreshold,
            BorrowPowerUsed,
            healthFactor: hf,
            availableBorrowsUSD: ethers.utils.formatUnits(availableBorrowsBase, 8)
          });

          return {
            threshold,
            currentLiquidationThreshold,
            BorrowPowerUsed,
            healthFactor: hf,
            availableBorrowsUSD: ethers.utils.formatUnits(availableBorrowsBase, 8)
          };
        })
        .then((userData: any) => {
          getLiquidity(userData);
        })
        .catch((err: any) => {
          console.log('getUserAccountData_error', err);
          showReload();
        });
    } catch (error) {
      console.log('CATCH_ACCOUNT_DATA', error);
    }
  }

  function getYourSupplies() {
    const aTokenAddresss = markets?.map((item: any) => item.aTokenAddress);

    const calls = aTokenAddresss?.map((addr: any) => ({
      address: addr,
      name: 'balanceOf',
      params: [account]
    }));
    multicall({
      abi: [
        {
          inputs: [
            {
              internalType: 'address',
              name: 'user',
              type: 'address'
            }
          ],
          name: 'balanceOf',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        }
      ],
      calls,
      options: {},
      multicallAddress,
      provider
    })
      .then((res: any) => {
        console.log('getUsetDeposits_res', res);
        const userDeposits = [];
        for (let index = 0; index < res.length; index++) {
          if (res[index]) {
            // let underlyingBalance=
            const market = state.assetsToSupply.find((item: any) => item.aTokenAddress === aTokenAddresss[index]);
            if (market) {
              const _bal = ethers.utils.formatUnits(res[index][0], market.decimals);
              market.underlyingBalance = _bal;
              market.underlyingBalanceUSD = Big(_bal)
                .mul(prices[market.symbol] || 1)
                .toFixed();
              userDeposits.push(market);
            }
          }
        }

        const mm: any = state.assetsToSupply.reduce((prev: any, cur: any) => {
          prev[cur.underlyingAsset] = JSON.parse(JSON.stringify(cur));
          console.log('Current item:', cur.underlyingAsset, cur.availableLiquidity);
          return prev;
        }, {});

        const _yourSupplies = userDeposits?.map((userDeposit) => {
          const market = mm[userDeposit.underlyingAsset];

          return {
            ...market,
            ...userDeposit,
            ...(market.symbol === config.nativeCurrency.symbol
              ? {
                  ...config.nativeCurrency,
                  supportPermit: true
                }
              : {})
          };
        });
        const obj: any = {};
        const yourSupplies = _yourSupplies.reduce((prev: any, cur: any) => {
          obj[cur.aTokenAddress] ? '' : (obj[cur.aTokenAddress] = true && prev.push(cur));
          return prev;
        }, []);
        console.log('1029--yourSupplies:', yourSupplies);
        onLoad({
          yourSupplies
        });
        return yourSupplies;
      })
      .then((_yourSupplies: any) => {
        if (!_yourSupplies || !_yourSupplies.length) {
          onLoad({
            yourSupplies: []
          });
          return;
        }
        const calls = [
          {
            address: config.aavePoolV3Address,
            name: 'getUserConfiguration',
            params: [account]
          },
          {
            address: config.aavePoolV3Address,
            name: 'getReservesList'
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
                }
              ],
              name: 'getUserConfiguration',
              outputs: [
                {
                  components: [
                    {
                      internalType: 'uint256',
                      name: 'data',
                      type: 'uint256'
                    }
                  ],
                  internalType: 'struct DataTypes.UserConfigurationMap',
                  name: '',
                  type: 'tuple'
                }
              ],
              stateMutability: 'view',
              type: 'function'
            },
            {
              inputs: [],
              name: 'getReservesList',
              outputs: [
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
          provider
        })
          .then((res: any) => {
            const [[rawStatus] = [null], [addrs] = []] = res.map((item: any) => item ?? []);
            if (rawStatus) {
              const _status = parseInt(rawStatus.toString()).toString(2).split('');
              // console.log("_status--", _status);
              const _statusArray = chunk(_status, 2);
              console.log('_status--', _statusArray, addrs, _yourSupplies);

              for (let i = 0; i < _yourSupplies.length; i++) {
                const item = _yourSupplies[i];

                const index = addrs.findIndex((addr: any) => addr.toLowerCase() === item.underlyingAsset.toLowerCase());

                _yourSupplies[i].isCollateraled = Number(_statusArray[index]?.[0] ?? 0);
              }

              const yourTotalCollateral = _yourSupplies
                .filter((item: any) => item.isCollateraled === 1)
                .reduce(
                  (prev: any, curr: any) =>
                    Big(prev)
                      .plus(Big(curr.underlyingBalanceUSD || 0))
                      .toFixed(),
                  0
                );

              onLoad({
                yourSupplies: _yourSupplies,
                yourTotalCollateral
              });
            } else {
              onLoad({
                yourSupplies: _yourSupplies
              });
            }
            setIsolateStore({
              data: _yourSupplies
            });
          })
          .catch((err: any) => {
            console.log('getCollateralStatus-error:', err);
            showReload();
          });
      })
      .catch((err: any) => {
        console.log('getUsetDeposits_err', err);
      });
  }

  function getUserDebts() {
    const variableDebtTokenAddresss = markets
      ?.filter((item: any) => item.variableDebtTokenAddress)
      .map((item: any) => item.variableDebtTokenAddress);

    const calls = variableDebtTokenAddresss?.map((addr: any) => ({
      address: addr,
      name: 'balanceOf',
      params: [account]
    }));

    multicall({
      abi: [
        {
          inputs: [
            {
              internalType: 'address',
              name: 'user',
              type: 'address'
            }
          ],
          name: 'balanceOf',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        }
      ],
      calls,
      options: {},
      multicallAddress,
      provider
    })
      .then((res: any) => {
        console.log('getUserDebts_res', res);
        const userDebs = [];
        const _assetsToSupply = [...state.assetsToSupply];
        for (let index = 0; index < res.length; index++) {
          if (res[index]) {
            const market = _assetsToSupply.find(
              (item) => item.variableDebtTokenAddress === variableDebtTokenAddresss[index]
            );
            if (market) {
              const _debt = ethers.utils.formatUnits(res[index][0], market.decimals);

              market.debt = _debt;
              market.debtInUSD = Big(_debt || 0)
                .mul(prices[market.symbol] || 1)
                .toFixed();
              userDebs.push(market);
            }
          }
        }
        const hash: any = {};
        const _yourBorrows = userDebs.reduce((accum: any, item: any) => {
          hash[item['aTokenAddress']] ? '' : (hash[item['aTokenAddress']] = true && accum.push(item));
          return accum;
        }, []);
        onLoad({
          yourBorrows: _yourBorrows
        });
      })
      .catch((err: any) => {
        showReload();
        console.log('getUserDebts_err', err);
      });
  }

  const getRewardTokenPrice = (dexConfig: any, prices: any) => {
    if (dexConfig.name === 'ZeroLend') return 0.00025055;
    if (dexConfig.name === 'Seamless Protocol') return prices['SEAM'] || 1;
    if (dexConfig.name === 'AAVE V3' && config.chainName === 'Metis') return prices['METIS'] || 1;
    return 0;
  };

  const normalizeTokenAmount = (amount: any, decimals: any) => {
    return ethers.utils.formatUnits(amount?.toString() || '0', decimals);
  };

  const calculateRewardApy = (emissionPerSecond: any, totalTokenAmount: any, rewardTokenPrice: any) => {
    if (!emissionPerSecond || !totalTokenAmount || !rewardTokenPrice) return 0;
    console.log(emissionPerSecond, totalTokenAmount, rewardTokenPrice, '<===936===');
    try {
      const normalizedEmissionPerSecond = Big(Number(emissionPerSecond || 0)).div(Big(REWARD_TOKEN_DECIMALS));
      const rewardTokenPriceNum = Number(rewardTokenPrice);
      const totalTokenAmountNum = Number(totalTokenAmount || 1);

      return normalizedEmissionPerSecond
        .times(Big(rewardTokenPriceNum))
        .times(SECONDS_PER_YEAR)
        .div(Big(totalTokenAmountNum))
        .toFixed();
    } catch (error) {
      console.log(error, 'calculateRewardApy-1321');
    }
  };
  useEffect(() => {
    if (!account || !isChainSupported) return;

    if (!dexConfig.rewardToken) {
      onLoad({ step1: true });
      return;
    }

    const { emissionPerSeconds, aTokenTotal, debtTotal, assetsToSupply } = state;

    console.log('calc reward apy', emissionPerSeconds, aTokenTotal, debtTotal);

    if (!emissionPerSeconds.length || !aTokenTotal.length || !debtTotal.length) return;

    const rewardTokenPrice = getRewardTokenPrice(dexConfig, prices);

    try {
      const updatedAssetsToSupply = assetsToSupply.map((asset: any, index: any) => {
        const tokenTotalSupplyNormalized = normalizeTokenAmount(aTokenTotal[index], asset.decimals);
        const tokenTotalBorrowNormalized = normalizeTokenAmount(debtTotal[index], asset.decimals);

        const normalizedTotalTokenSupply = Big(tokenTotalSupplyNormalized || 0).times(Big(prices[asset.symbol] || 1));
        const normalizedTotalTokenBorrow = Big(tokenTotalBorrowNormalized || 0).times(Big(prices[asset.symbol] || 1));

        const supplyRewardApy = calculateRewardApy(
          emissionPerSeconds[index]?.[1],
          normalizedTotalTokenSupply.toString(),
          rewardTokenPrice
        );
        const borrowRewardApy = calculateRewardApy(
          emissionPerSeconds[index]?.[1],
          normalizedTotalTokenBorrow.toString(),
          rewardTokenPrice
        );

        return {
          ...asset,
          supplyRewardApy,
          borrowRewardApy: dexConfig.name === 'ZeroLend' ? borrowRewardApy : asset.borrowRewardApy
        };
      });
      console.log(updatedAssetsToSupply, '<===1014===updatedAssetsToSupply');
      onLoad({
        assetsToSupply: updatedAssetsToSupply,
        step1: true
      });
    } catch (error) {
      console.log('----CATCH:', error);
      onLoad({ step1: true });
    }
  }, [state.emissionPerSeconds, state.aTokenTotal, state.debtTotal]);

  useEffect(() => {
    if (!account || !isChainSupported) return;

    getUserBalance();
    getUserAccountData();
    getPoolDataProvider();
    if (dexConfig.name === 'Seamless Protocol') {
      getPoolDataProviderTotalSupply();
      getPoolDataProviderTotalDebt();
      getPoolDataProviderCaps();
    }

    if (dexConfig.name === 'Pac Finance') {
      getPoolDataProviderTotalSupplyForPac();
    }

    if (state.step1 && state.hasExistedLiquidity) {
      getYourSupplies();
      getUserDebts();
    }
  }, [account, isChainSupported, state.step1, state.updater, state.hasExistedLiquidity]);

  useEffect(() => {
    if (!account || !isChainSupported) return;

    try {
      if (!account || !isChainSupported) return;
      if (dexConfig.name !== 'Seamless Protocol') return;
      if (!Array.isArray(state.assetsToSupply)) return;

      const totalMarketSize = state.assetsToSupply.reduce((prev: any, curr: any) => {
        return Big(prev || 0)
          .plus(Big(curr.totalSupplyUSD || 0))
          .toFixed();
      }, 0);
      const totalBorrows = state.assetsToSupply.reduce((prev: any, curr: any) => {
        return Big(prev || 0)
          .plus(Big(curr.totalDebtsUSD || 0))
          .toFixed();
      }, 0);
      const totalAvailable = Big(totalMarketSize || 0)
        .minus(Big(totalBorrows || 0))
        .toFixed();
      onLoad({
        totalMarketSize,
        totalAvailable,
        totalBorrows
      });
    } catch (error) {
      console.log('CATCH_calc:', error);
    }
  }, [account, isChainSupported, state.assetsToSupply]);

  useEffect(() => {
    if (!account || !isChainSupported) return;
    if (!state.step1) return;
    // if (!["ZeroLend", "AAVE V3"].includes(dexConfig.name)) return;

    if (!state.yourSupplies || !state.yourBorrows) return;
    console.log('calc net apy', state.yourSupplies, state.yourBorrows);
    try {
      //calc net worth
      const supplyBal = state.yourSupplies.reduce(
        (total: any, cur: any) =>
          Big(total || 0)
            .plus(cur.underlyingBalanceUSD)
            .toFixed(),
        0
      );
      const debtsBal = state.yourBorrows.reduce(
        (total: any, cur: any) =>
          Big(total || 0)
            .plus(cur.debtInUSD)
            .toFixed(),
        0
      );
      console.log('debtsBal--', debtsBal, supplyBal);
      const netWorth = Big(supplyBal || 0)
        .minus(debtsBal)
        .toFixed(2, ROUND_DOWN);
      console.log('netWorth--', netWorth, state.yourSupplies);
      if (!Number(netWorth)) return;

      //calc net apy

      const weightedAverageSupplyAPY = state.yourSupplies.reduce(
        (total: any, cur: any) =>
          Big(total || 0)
            .plus(
              Big(cur.underlyingBalanceUSD || 0)
                .times(Big(cur.supplyAPY || 0))
                .div(supplyBal || 1)
            )
            .toFixed(),
        0
      );
      const yourSupplyRewardAPY = state.yourSupplies.reduce((total: any, cur: any) => {
        return Big(total || 0)
          .plus(Big(cur.supplyRewardApy || 0))
          .toFixed();
      }, 0);

      console.log('weightedAverageSupplyAPY--', weightedAverageSupplyAPY);
      const weightedAverageBorrowsAPY = state.yourBorrows.reduce((total: any, cur: any) => {
        return Big(total || 0)
          .plus(
            Big(cur.debtInUSD)
              .times(Big(cur.borrowAPY || 1))
              .div(debtsBal || 1)
          )
          .toFixed();
      }, 0);
      console.log('weightedAverageBorrowsAPY--', weightedAverageBorrowsAPY);

      const a = Big(weightedAverageSupplyAPY || 0)
        .times(supplyBal)
        .div(netWorth || 1)
        .toFixed();
      console.log('a--', a);
      const b = Big(weightedAverageBorrowsAPY || 0)
        .times(debtsBal)
        .div(netWorth || 1)
        .toFixed();
      console.log('b--', b);
      const netAPY = Big(a).minus(Big(b)).toFixed();
      console.log('netAPY--', netAPY);
      const yourTotalSupply = state.yourSupplies.reduce(
        (prev: any, curr: any) =>
          Big(prev)
            .plus(Big(curr.underlyingBalanceUSD || 0))
            .toFixed(),
        0
      );
      console.log('yourTotalSupply--', yourTotalSupply);

      const yourTotalBorrow = state.yourBorrows.reduce(
        (prev: any, curr: any) =>
          Big(prev)
            .plus(Big(curr.debtInUSD || 0))
            .toFixed(),
        0
      );
      console.log('yourTotalBorrow--', yourTotalBorrow);

      onLoad({
        netAPY,
        netWorthUSD: netWorth,
        yourTotalSupply,
        yourTotalBorrow,
        yourSupplyApy: Big(weightedAverageSupplyAPY).plus(yourSupplyRewardAPY).toFixed(),
        yourBorrowApy: weightedAverageBorrowsAPY
      });
    } catch (error) {
      console.log('CATCH_CALC_NET_APY_ERROR:', error);
    }
  }, [
    state.yourSupplies,
    state.yourBorrows,
    state.step1,
    state.yourTotalBorrow,
    state.yourTotalSupply,
    state.hasExistedLiquidity
  ]);

  useEffect(() => {
    if (!account) return;

    // if (dexConfig.name !== 'ZeroLend') return;

    function getRewardsData() {
      const aTokenAddresss = state.assetsToSupply?.map((item: any) => item.aTokenAddress);
      const calls = aTokenAddresss?.map((addr: any) => ({
        address: config.incentivesProxy,
        name: 'getRewardsData',
        params: [addr, config.rewardAddress]
      }));
      console.log('zeroLend-data--', calls);

      multicall({
        abi: [
          {
            inputs: [
              { internalType: 'address', name: 'asset', type: 'address' },
              { internalType: 'address', name: 'reward', type: 'address' }
            ],
            name: 'getRewardsData',
            outputs: [
              { internalType: 'uint256', name: '', type: 'uint256' },
              { internalType: 'uint256', name: '', type: 'uint256' },
              { internalType: 'uint256', name: '', type: 'uint256' },
              { internalType: 'uint256', name: '', type: 'uint256' }
            ],
            stateMutability: 'view',
            type: 'function'
          }
        ],
        calls,
        options: {},
        multicallAddress,
        provider
      })
        .then((res: any) => {
          console.log('--------------------fetchRewardsData_res', res);

          onLoad({
            emissionPerSeconds: res
          });
        })
        .catch((err: any) => {
          console.log('fetchRewardsData_err', err);
        });
    }

    function getAllUserRewards() {
      const arr = markets
        ?.filter((item: any) => item.variableDebtTokenAddress)
        .map((item: any) => [
          item.aTokenAddress,
          // item.stableDebtTokenAddress,
          item.variableDebtTokenAddress
        ])
        .flat();
      const addrs = [...new Set(arr)];

      const rewardsProvider = new ethers.Contract(
        config.incentivesProxy,
        [
          {
            inputs: [
              { internalType: 'address[]', name: 'assets', type: 'address[]' },
              { internalType: 'address', name: 'user', type: 'address' }
            ],
            name: 'getAllUserRewards',
            outputs: [
              {
                internalType: 'address[]',
                name: 'rewardsList',
                type: 'address[]'
              },
              {
                internalType: 'uint256[]',
                name: 'unclaimedAmounts',
                type: 'uint256[]'
              }
            ],
            stateMutability: 'view',
            type: 'function'
          }
        ],
        provider.getSigner()
      );
      rewardsProvider
        .getAllUserRewards(addrs, account)
        .then((res: any) => {
          try {
            console.log('getAllUserRewards_res:', res);
            console.log(dexConfig.rewardToken, 'dexConfig.rewardToken');
            const _rewardToken = [...dexConfig.rewardToken];

            const _amount = res[1].reduce((total: any, cur: any) => {
              return Big(total).plus(ethers.utils.formatUnits(cur)).toFixed();
            }, 0);

            _rewardToken[0].unclaimed = _amount;

            onLoad({
              rewardData: _rewardToken
            });
          } catch (error) {
            console.log('catch_getAllUserRewards_error', error);
          }
        })
        .catch((err: any) => {
          console.log('getAllUserRewards_error:', err);
        });
    }

    getRewardsData();
    getAllUserRewards();
  }, [account, dexConfig.name]);

  useEffect(() => {
    if (!account) return;

    if (dexConfig.name !== 'Seamless Protocol') return;

    function getRewardsData() {
      const aTokenAddresss = state.assetsToSupply?.map((item: any) => item.aTokenAddress);

      const calls = aTokenAddresss?.map((addr: any) => ({
        address: config.incentivesProxy,
        name: 'getRewardsData',
        params: [addr, config.rewardAddress]
      }));

      multicall({
        abi: [
          {
            inputs: [
              { internalType: 'address', name: 'asset', type: 'address' },
              { internalType: 'address', name: 'reward', type: 'address' }
            ],
            name: 'getRewardsData',
            outputs: [
              { internalType: 'uint256', name: '', type: 'uint256' },
              { internalType: 'uint256', name: '', type: 'uint256' },
              { internalType: 'uint256', name: '', type: 'uint256' },
              { internalType: 'uint256', name: '', type: 'uint256' }
            ],
            stateMutability: 'view',
            type: 'function'
          }
        ],
        calls,
        options: {},
        multicallAddress,
        provider
      })
        .then((res: any) => {
          console.log('fetchRewardsData_res', res);

          onLoad({
            emissionPerSeconds: res
          });
        })
        .catch((err: any) => {
          console.log('fetchRewardsData_err', err);
        });
    }

    function getAllUserRewards() {
      const arr = markets
        ?.filter((item: any) => item.variableDebtTokenAddress)
        .map((item: any) => [item.aTokenAddress, item.variableDebtTokenAddress])
        .flat();
      const addrs = [...new Set(arr)];

      const rewardsProvider = new ethers.Contract(
        config.incentivesProxy,
        [
          {
            inputs: [
              { internalType: 'address[]', name: 'assets', type: 'address[]' },
              { internalType: 'address', name: 'user', type: 'address' }
            ],
            name: 'getAllUserRewards',
            outputs: [
              {
                internalType: 'address[]',
                name: 'rewardsList',
                type: 'address[]'
              },
              {
                internalType: 'uint256[]',
                name: 'unclaimedAmounts',
                type: 'uint256[]'
              }
            ],
            stateMutability: 'view',
            type: 'function'
          }
        ],
        provider.getSigner()
      );

      rewardsProvider
        .getAllUserRewards(addrs, account)
        .then((res: any) => {
          try {
            console.log('getAllUserRewards_res:', res);
            const [addrs, amounts] = res;

            const updatedRewardToken = state.rewardToken.map((item: any) => {
              const index = addrs.findIndex((addr: any) => addr.toLowerCase() === item.address.toLowerCase());
              if (index !== -1) {
                return {
                  ...item,
                  unclaimed: ethers.utils.formatUnits(amounts[index], item.decimals || 18)
                };
              }
              return item;
            });

            onLoad({
              rewardData: updatedRewardToken
            });
          } catch (error) {
            console.log('catch_getAllUserRewards_error', error);
          }
        })
        .catch((err: any) => {
          console.log('getAllUserRewards_error:', err);
        });
    }

    getRewardsData();
    getAllUserRewards();
  }, [account, dexConfig.loaderName]);
};

export default AaveV3Data;
