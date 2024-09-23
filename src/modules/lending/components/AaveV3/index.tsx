import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import Loading from '@/modules/components/Loading';
import Spinner from '@/modules/components/Spinner';
import { useDynamicLoader, useMultiState } from '@/modules/lending/hooks';
import { TabKey } from '@/modules/lending/models';

import type { DexProps } from '../../models/dex.model';
import RewardsTable from './Cards/RewardsTable';
import Chain from './Chain';
import { useIsolateStore } from './hooks/useIsolateStore';
import Markets from './Markets';
import AlertModal from './Modal/Alert';
import ReloadModal from './Modal/Reload';
import PrimaryButton from './PrimaryButton';
import { ChainsWrap, FlexContainer, Label, SubTitle, Title, Value, Wrap, Yours, YoursTableWrapper } from './style';
import TabSwitcher from './TabSwitcher';
import { chunk, formatHealthFactor, isValid, ROUND_DOWN, unifyNumber } from './utils';
import HeroData from './Yours/HeroData';
import YourBorrows from './Yours/YourBorrows';
import YourSupplies from './Yours/YourSupplies';

export interface Props extends DexProps {
  chainIdNotSupport?: boolean;
  GAS_LIMIT_RECOMMENDATIONS: any;
  refresh?: () => void;
  tab: TabKey;
}

const AaveV3 = (props: Props) => {
  const {
    dexConfig,
    multicallAddress,
    chainIdNotSupport,
    multicall,
    account,
    addAction,
    toast,
    chainId,
    curChain,
    CHAIN_LIST,
    onSwitchChain,
    from,
    prices,
    GAS_LIMIT_RECOMMENDATIONS,
    refresh,
    tab
  } = props;
  const [config, setConfig] = useState<any>(null);

  const setIsolateStore = useIsolateStore((store) => store.set);

  const fetchConfig = async () => {
    const { CONTRACT_ABI = {} } = dexConfig || {};
    if (!CONTRACT_ABI) {
      return;
    }

    const abis = await Promise.allSettled([
      fetch(CONTRACT_ABI.wrappedTokenGatewayV3ABI).then((res) => res.json()),
      fetch(CONTRACT_ABI.erc20Abi).then((res) => res.json()),
      fetch(CONTRACT_ABI.aavePoolV3ABI).then((res) => res.json()),
      fetch(CONTRACT_ABI.variableDebtTokenABI).then((res) => res.json())
    ]);

    const [wrappedTokenGatewayV3ABI, erc20Abi, aavePoolV3ABI, variableDebtTokenABI] = abis.map((result) =>
      result.status === 'fulfilled' ? result.value : null
    );

    const constants = {
      FIXED_LIQUIDATION_VALUE: '1.0',
      MAX_UINT_256: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
      AAVE_API_BASE_URL: 'https://aave-data-service-7a85eea3aebe.herokuapp.com'
    };

    const finalConfig = {
      ...dexConfig.config,
      ...constants,
      erc20Abi,
      aavePoolV3ABI,
      variableDebtTokenABI,
      wrappedTokenGatewayV3ABI
    };

    setConfig(finalConfig);
  };

  const { provider } = useAccount();

  const [Data] = useDynamicLoader({ path: '/lending/datas', name: dexConfig.loaderName });

  const markets = dexConfig?.rawMarkets?.map((item: any) => ({
    ...item,
    tokenPrice: prices[item.symbol]
  }));

  const [state, updateState] = useMultiState<any>({
    markets: {},
    imports: {},

    showWithdrawModal: false,
    showSupplyModal: false,
    showRepayModal: false,
    showBorrowModal: false,

    threshold: 1,
    assetsToSupply: markets,
    yourSupplies: undefined,
    yourBorrows: undefined,
    netWorthUSD: '',
    netAPY: '',
    healthFactor: '',
    availableBorrowsUSD: '',

    fresh: 0, // fresh rewards
    yourSupplyApy: 0,
    yourBorrowApy: 0,
    yourTotalCollateral: 0,

    emissionPerSeconds: [],
    aTokenTotal: [],
    debtTotal: [],

    step1: false,

    updater: 0,
    isShowReloadModal: false,
    hasExistedLiquidity: false
  });

  useEffect(() => {
    fetchConfig();
  }, [dexConfig]);

  useEffect(() => {
    updateState({
      loading: !chainIdNotSupport
    });
  }, [chainIdNotSupport]);

  const showReload = () => updateState({ isShowReloadModal: true });

  const onSuccess = () => {
    updateState({
      ...state,
      fresh: state.fresh + 1
    });
  };

  const gasEstimation = (action: any) => {
    const assetsToSupply = state.assetsToSupply;
    if (!assetsToSupply || !config) {
      return Promise.resolve('-');
    }
    const baseAsset = assetsToSupply.find((asset: any) => asset.symbol === config.nativeCurrency.symbol);
    if (!baseAsset) {
      return Promise.resolve('-');
    }

    const { tokenPrice, decimals } = baseAsset;
    return provider
      .getGasPrice()
      .then((gasPrice: any) => {
        const gasLimit = GAS_LIMIT_RECOMMENDATIONS[action].limit;
        // console.log("gasPrice--", gasPrice);
        return Big(gasPrice.toString()).mul(gasLimit).div(Big(10).pow(decimals)).mul(tokenPrice).toFixed(2);
      })
      .catch((err: any) => {
        console.log('gasEstimation error');
      });
  };
  // - onActionSuccess -- start
  const getYourSupplies = () => {
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
            console.log(state.assetsToSupply, '995---state.assetsToSupply');

            console.log(market, '997----market');

            if (market) {
              const _bal = ethers.utils.formatUnits(res[index][0], market.decimals);
              market.underlyingBalance = _bal;
              market.underlyingBalanceUSD = Big(_bal).mul(prices[market.symbol]).toFixed();
              userDeposits.push(market);
            }
          }
        }

        const mm = state.assetsToSupply.reduce((prev: any, cur: any) => {
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
        // updateState({
        //   yourSupplies,
        // });
        return yourSupplies;
      })
      .then((_yourSupplies: any) => {
        if (!_yourSupplies || !_yourSupplies.length) {
          updateState((prev: any) => ({
            ...prev,
            yourSupplies: []
          }));
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
            console.log('getCollateralStatus-res:', res);
            const [[rawStatus] = [null], [addrs] = []] = res.map((item: any) => item ?? []);
            if (rawStatus) {
              const _status = parseInt(rawStatus.toString()).toString(2).split('');
              // console.log("_status--", _status);
              const _statusArray = chunk(_status, 2);
              // console.log("_status--", _statusArray, addrs, _yourSupplies);

              for (let i = 0; i < _yourSupplies.length; i++) {
                const item = _yourSupplies[i];

                const index = addrs.findIndex((addr: any) => addr.toLowerCase() === item.underlyingAsset.toLowerCase());

                _yourSupplies[i].isCollateraled = Number(_statusArray[index][0]);
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

              updateState((prev: any) => ({
                ...prev,
                yourSupplies: _yourSupplies,
                yourTotalCollateral
              }));
              setIsolateStore({
                data: _yourSupplies
              });
            } else {
              updateState((prev: any) => ({
                ...prev,
                yourSupplies: _yourSupplies
              }));
            }
          })
          .catch((err: any) => {
            console.log('getCollateralStatus-error:', err);
            showReload();
          });
      })
      .catch((err: any) => {
        console.log('getUsetDeposits_err', err);
      });
  };
  const getUserDebts = () => {
    const variableDebtTokenAddresss = markets?.map((item: any) => item.variableDebtTokenAddress);

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

        console.log('yourBorrows--', _yourBorrows);
        updateState({
          yourBorrows: _yourBorrows
        });
      })
      .catch((err: any) => {
        showReload();
        console.log('getUserDebts_err', err);
      });
  };
  const getUserBalance = () => {
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
              updateState({
                isShowReloadModal: true
              });
            } else {
              const _assetsToSupply = [...state.assetsToSupply];
              for (let index = 0; index < _assetsToSupply.length; index++) {
                const item = _assetsToSupply[index];
                const _bal = item.symbol === config.nativeCurrency.symbol ? baseAssetBalance : userBalances[index];
                const balanceRaw = Big(_bal || 0).div(Big(10).pow(item.decimals));
                const _balance = balanceRaw.toFixed(item.decimals, ROUND_DOWN);

                const _balanceInUSD = balanceRaw.times(Big(item.tokenPrice || 0)).toFixed();

                item.balance = _balance;
                item.balanceInUSD = _balanceInUSD;
              }

              updateState({
                assetsToSupply: _assetsToSupply
              });
            }
          })
          .catch((err: any) => {
            console.log('batchBalanceOfERROR:', err);
            showReload();
          });
      });
  };
  const batchBalanceOf = (userAddress: any, tokenAddresses: any) => {
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
  };
  const onActionSuccess = ({ msg, callback, step1 }: any) => {
    console.log('onActionSuccess--', msg, callback, step1);
    // update data if action finishes
    getUserBalance();

    if (step1) {
      getYourSupplies();
      getUserDebts();
    }

    updateState({
      step1: step1 || false,
      updater: state.updater + 1
    });
    // update UI after data has almost loaded
    const timer = setTimeout(() => {
      clearTimeout(timer);
      if (callback) {
        callback();
      }
      if (msg) {
        updateState({ alertModalText: msg });
      }
    }, 500);
  };
  // - onActionSuccess -- end
  // - calcHealthFactor -- start
  const calcHealthFactor = (type: any, symbol: any, amount: any) => {
    if (
      // !isValid(state.yourTotalCollateral) ||
      // !isValid(state.yourTotalBorrow) ||
      isNaN(Number(state.yourTotalCollateral)) ||
      isNaN(Number(state.yourTotalBorrow)) ||
      !isValid(amount)
    )
      return '-';
    let totalCollateral = Big(state.yourTotalCollateral);
    let totalBorrows = Big(state.yourTotalBorrow);

    const assetsUSD = Big(prices[symbol]).times(Big(amount));
    if (type === 'SUPPLY') {
      totalCollateral = Big(state.yourTotalCollateral).plus(assetsUSD);
    }
    if (type === 'INC_COLLATERAL') {
      totalCollateral = Big(state.yourTotalCollateral).plus(assetsUSD);
    }
    if (type === 'WITHDRAW') {
      totalCollateral = Big(state.yourTotalCollateral).minus(assetsUSD);
    }
    if (type === 'DEC_COLLATERAL') {
      totalCollateral = Big(state.yourTotalCollateral).minus(assetsUSD);
    }
    if (type === 'BORROW') {
      totalBorrows = Big(state.yourTotalBorrow).plus(assetsUSD);
    }
    if (type === 'REPAY') {
      totalBorrows = Big(state.yourTotalBorrow).minus(assetsUSD);
    }
    if (totalBorrows.eq(0)) return '∞';

    const newHealthFactor = totalCollateral.times(Big(state.threshold)).div(totalBorrows);

    console.log('calcHealthFactor--', newHealthFactor);

    return newHealthFactor.toFixed(2);
  };
  // - calcHealthFactor -- end

  // YourSupplies/YourBorrows

  console.log('state', state);

  if (!config) return null;

  return (
    <Wrap>
      {state.loading && <Spinner />}
      {tab === TabKey.Market && (
        <>
          <Markets
            config={config}
            assetsToSupply={state.assetsToSupply}
            showSupplyModal={state.showSupplyModal}
            setShowSupplyModal={(isShow: any) => updateState({ showSupplyModal: isShow })}
            healthFactor={state.healthFactor}
            yourTotalSupply={state.yourTotalSupply}
            gasEstimation={gasEstimation}
            onActionSuccess={onActionSuccess}
            calcHealthFactor={calcHealthFactor}
            {...props}
          />
        </>
      )}
      {tab === TabKey.Yours && (
        <>
          <HeroData
            config={config}
            netWorth={`$ ${state.netWorthUSD ? Big(state.netWorthUSD || 0).toFixed(2) : '-'}`}
            netAPY={`${
              state.netAPY
                ? Number(
                    Big(state.netAPY || 0)
                      .times(100)
                      .toFixed(2)
                  )
                : '-'
            }%`}
            healthFactor={formatHealthFactor(state.healthFactor)}
            totalMarketSize={state.totalMarketSize}
            totalAvailable={state.totalAvailable}
            totalBorrows={state.totalBorrows}
            theme={dexConfig?.theme}
            yourBorrows={state.yourBorrows}
          />

          <Yours>
            <YoursTableWrapper>
              <Title>
                You Supplies
                {state.yourSupplies && state.yourSupplies.length ? (
                  <SubTitle>
                    <Label>Balance:</Label>
                    <Value>$ {unifyNumber(state.yourTotalSupply)}</Value>

                    <Label>APY:</Label>
                    <Value>{Big(state.yourSupplyApy).times(100).toFixed(2)} %</Value>

                    <Label>Collateral:</Label>
                    <Value>$ {unifyNumber(state.yourTotalCollateral)}</Value>
                  </SubTitle>
                ) : null}
              </Title>

              <YourSupplies
                config={config}
                chainId={chainId}
                yourSupplies={state.yourSupplies}
                showWithdrawModal={state.showWithdrawModal}
                setShowWithdrawModal={(isShow: any) => updateState({ showWithdrawModal: isShow })}
                onActionSuccess={onActionSuccess}
                healthFactor={formatHealthFactor(state.healthFactor)}
                formatHealthFactor={formatHealthFactor}
                calcHealthFactor={calcHealthFactor}
                withdrawETHGas={gasEstimation('withdrawETH')}
                withdrawERC20Gas={gasEstimation('withdraw')}
                account={account}
                prices={prices}
                threshold={state.threshold}
                addAction={addAction}
                dexConfig={dexConfig}
                yourTotalCollateral={state.yourTotalCollateral}
                yourTotalBorrow={state.yourTotalBorrow}
                theme={dexConfig?.theme}
                unifyNumber={unifyNumber}
                provider={provider}
                gasEstimation={gasEstimation}
              />
            </YoursTableWrapper>
            <YoursTableWrapper>
              <Title>
                You Borrows
                {state.yourBorrows && state.yourBorrows.length ? (
                  <SubTitle>
                    <Label>Balance:</Label>
                    <Value>$ {unifyNumber(state.yourTotalBorrow || 0)}</Value>

                    <Label>APY:</Label>
                    <Value>
                      {Big(state.yourBorrowApy || 0)
                        .times(100)
                        .toFixed(2)}{' '}
                      %
                    </Value>

                    <Label>Borrow power used:</Label>
                    <Value>{Number(state.BorrowPowerUsed || 0).toFixed(2)}%</Value>
                  </SubTitle>
                ) : null}
              </Title>
              <YourBorrows
                config={config}
                chainId={chainId}
                assetsToSupply={state.assetsToSupply}
                yourBorrows={state.yourBorrows}
                showRepayModal={state.showRepayModal}
                setShowRepayModal={(isShow: any) => updateState({ showRepayModal: isShow })}
                showBorrowModal={state.showBorrowModal}
                setShowBorrowModal={(isShow: any) => updateState({ showBorrowModal: isShow })}
                formatHealthFactor={formatHealthFactor}
                calcHealthFactor={calcHealthFactor}
                onActionSuccess={onActionSuccess}
                borrowETHGas={gasEstimation('borrowETH')}
                borrowERC20Gas={gasEstimation('borrow')}
                addAction={addAction}
                provider={provider}
                gasEstimation={gasEstimation}
                healthFactor={state.healthFactor}
                prices={prices}
                dexConfig={dexConfig}
              />
            </YoursTableWrapper>
          </Yours>
          {dexConfig.rewardToken ? (
            <RewardsTable
              config={config}
              data={state.rewardData}
              dapps={dexConfig}
              markets={markets}
              theme={dexConfig?.theme}
              provider={provider}
              {...props}
            />
          ) : null}
        </>
      )}

      {state.alertModalText && (
        <AlertModal
          onRequestClose={() => updateState({ alertModalText: false })}
          config={config}
          theme={dexConfig?.theme}
          title="All done!"
          description={state.alertModalText}
        />
      )}
      {state.isShowReloadModal && (
        <ReloadModal title="You are temporarily unable to access the data, please try to reload.">
          <div>
            <PrimaryButton config={config} theme={dexConfig.theme} onClick={() => refresh?.()}>
              Reload
            </PrimaryButton>
            <PrimaryButton
              config={config}
              style={{ marginTop: 5 }}
              onClick={() => updateState({ isShowReloadModal: false })}
            >
              Close
            </PrimaryButton>
          </div>
        </ReloadModal>
      )}

      {Data && config && (
        <Data
          provider={provider}
          state={state}
          config={config}
          {...props}
          onLoad={(data: any) => {
            console.log('DATA_onLoad:', data);
            updateState({
              loading: false,
              timestamp: Date.now(),
              ...data
            });
          }}
        />
      )}
    </Wrap>
  );
};

export default AaveV3;
