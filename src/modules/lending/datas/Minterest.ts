import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import { useEffect } from 'react';

import { asyncFetch, get } from '@/utils/http';

const MinterestData = (props: any) => {
  const {
    marketsAddress,
    oracleAddress,
    userDataAddress,
    usdyApyAddress,
    methApyAddress,
    rewardTokens,
    markets,
    account,
    update,
    name,
    onLoad,
    multicall,
    prices,
    provider
  } = props;

  const oTokens: any = Object.values(markets);
  const rewardTokenNative = rewardTokens['native'];
  const rewardTokenMinty = rewardTokens['0x5eCDB76feda945DC71F7D9ce62dFe7EaFEfFFAb4'];
  const rewardTokenUSDY = rewardTokens['0x5bE26527e817998A7206475496fDE1E68957c5A6'];
  const rewardTokenMETH = rewardTokens['0xcDA86A272531e8640cD7F1a92c01839911B90bb0'];

  const apr2apy = (apr: string) => {
    let apy: any = Big(1).plus(Big(apr).div(100).div(12));
    apy = Big(apy).pow(12);
    apy = Big(apy).minus(1);
    apy = Big(apy).times(100).toFixed(2);
    return apy;
  };

  const getUnderlyingPrice = () => {
    const result: any = {};
    return new Promise((resolve) => {
      get(oracleAddress)
        .then((res: any) => {
          const { markets: _markets, mntOraclePriceUSD } = res || {};
          for (const token of oTokens) {
            if (token.symbol.toLowerCase() === 'mmnt') {
              result[token.symbol] = {
                priceUsd: mntOraclePriceUSD,
                address: token.underlyingToken.address
              };
              continue;
            }
            for (const market of _markets) {
              if (market.symbol.toLowerCase() === token.symbol.toLowerCase()) {
                result[token.symbol] = {
                  priceUsd: market.oraclePriceUSD,
                  address: token.underlyingToken.address
                };
                break;
              }
            }
          }
          resolve(result);
        })
        .catch((err: any) => {
          console.log('getUnderlyingPrice failure: %o', err);
          resolve(result);
        });
    });
  };

  const getUserData = () => {
    const result: any = {
      markets: {},
      totalCollateralUsd: '',
      userTotalBorrowUsd: '',
      userTotalSupplyUsd: ''
    };
    return new Promise((resolve) => {
      get(`${userDataAddress}/${account}`)
        .then((res: any) => {
          const { userMarkets } = res;
          for (const token of oTokens) {
            for (const market of userMarkets) {
              if (market.symbol.toLowerCase() === token.symbol.toLowerCase()) {
                result.markets[token.symbol] = {
                  userBorrow: market.userBorrowUnderlying,
                  // userMerberShip: market.collateralStatus,
                  userMerberShip: undefined,
                  userSupply: market.userSupplyUnderlying,
                  userUnderlyingBalance: market.underlyingBalance,
                  address: token.underlyingToken.address
                };
                break;
              }
            }
          }
          result.totalCollateralUsd = res.userTotalCollateralUSD;
          result.userTotalBorrowUsd = res.userTotalBorrowUSD;
          result.userTotalSupplyUsd = res.userTotalSupplyUSD;
          resolve(result);
        })
        .catch((err: any) => {
          console.log('getUserData failure: %o', err);
          resolve(result);
        });
    });
  };

  const getUsdyApy = () => {
    const result: any = [];
    return new Promise((resolve) => {
      fetch(usdyApyAddress)
        .then(async (res) => {
          const usdy = await res.text();
          if (rewardTokenUSDY) {
            result.push({
              borrow: Big(0).toFixed(2) + '%',
              decimals: rewardTokenUSDY.decimals,
              icon: rewardTokenUSDY.icon,
              supply: Big(usdy).times(100).toFixed(2) + '%',
              symbol: rewardTokenUSDY.symbol
            });
          }
          resolve(result);
        })
        .catch((err: any) => {
          console.log('getUsdyApy failure: %o', err);
          resolve(result);
        });
    });
  };

  const getMethApy = () => {
    const result: any = [];
    return new Promise((resolve) => {
      asyncFetch(methApyAddress)
        .then((res: any) => {
          if (rewardTokenMETH && res.data && res.data[0]) {
            result.push({
              borrow: Big(0).toFixed(2) + '%',
              decimals: rewardTokenMETH.decimals,
              icon: rewardTokenMETH.icon,
              supply: Big(res.data[0].OneDayAPY).times(100).toFixed(2) + '%',
              symbol: rewardTokenMETH.symbol
            });
          }
          resolve(result);
        })
        .catch((err: any) => {
          console.log('getMethApy failure: %o', err);
          resolve(result);
        });
    });
  };

  const { run: getMarkets } = useDebounceFn(
    () => {
      get(marketsAddress)
        .then(async (res: any) => {
          const { markets: _markets, totalBorrowUSD, totalSupplyUSD } = res || {};
          const [underlyingPrices, userData, usdyApy, methApy]: any = await Promise.all([
            getUnderlyingPrice(),
            getUserData(),
            getUsdyApy(),
            getMethApy()
          ]);
          const underlyingPricesList = Object.values(underlyingPrices);
          const userMarkets = Object.values(userData.markets);

          const result: any = {
            markets: {},
            rewards: [],
            totalBorrowUsd: totalBorrowUSD,
            totalCollateralUsd: userData.totalCollateralUsd,
            totalSupplyUsd: totalSupplyUSD,
            userTotalBorrowUsd: userData.userTotalBorrowUsd,
            userTotalSupplyUsd: userData.userTotalSupplyUsd
          };

          for (const token of oTokens) {
            for (const market of _markets) {
              const { economic, meta } = market;
              if (token.address.toLowerCase() === meta.address.toLowerCase()) {
                const underlyingPrice: any = underlyingPricesList.find(
                  (p: any) => p.address.toLowerCase() === meta.underlying.toLowerCase()
                );
                const userMarket: any = userMarkets.find(
                  (m: any) => m.address.toLowerCase() === meta.underlying.toLowerCase()
                );
                result.markets[meta.address] = {
                  address: meta.address,
                  borrowApy: apr2apy(economic.apr) + '%',
                  dapp: name,
                  decimals: meta.marketDecimals,
                  distributionApy: [],
                  liquidity: economic.marketLiquidityUnderlying,
                  loanToValue: economic.utilisationFactor,
                  supplyApy: Big(economic.apy).toFixed(2) + '%',
                  symbol: meta.symbol,
                  totalBorrows: economic.marketBorrowUnderlying,
                  totalSupply: economic.marketSupplyUnderlying,
                  underlyingPrice: underlyingPrice?.priceUsd,
                  underlyingToken: token.underlyingToken,
                  userBorrow: userMarket?.userBorrow,
                  userMerberShip: userMarket?.userMerberShip,
                  userSupply: userMarket?.userSupply,
                  userUnderlyingBalance: userMarket?.userUnderlyingBalance
                };
                // MNT
                if (
                  rewardTokenNative &&
                  (Big(economic.marketMantleBorrowAPY).gt(0) || Big(economic.marketMantleSupplyAPY).gt(0))
                ) {
                  result.markets[meta.address].distributionApy.push({
                    borrow: Big(economic.marketMantleBorrowAPY).toFixed(2) + '%',
                    decimals: rewardTokenNative.decimals,
                    icon: rewardTokenNative.icon,
                    supply: Big(economic.marketMantleSupplyAPY).toFixed(2) + '%',
                    symbol: rewardTokenNative.symbol
                  });
                }
                // MINTY
                if (
                  rewardTokenMinty &&
                  (Big(economic.marketMntBorrowAPY).gt(0) || Big(economic.marketMntSupplyAPY).gt(0))
                ) {
                  result.markets[meta.address].distributionApy.push({
                    borrow: Big(economic.marketMntBorrowAPY).toFixed(2) + '%',
                    decimals: rewardTokenMinty.decimals,
                    icon: rewardTokenMinty.icon,
                    supply: Big(economic.marketMntSupplyAPY).toFixed(2) + '%',
                    symbol: rewardTokenMinty.symbol
                  });
                }
                // mETH
                if (methApy.length && token.address === '0x5aA322875a7c089c1dB8aE67b6fC5AbD11cf653d') {
                  result.markets[meta.address].distributionApy.push(methApy[0]);
                }
                // USDY
                if (usdyApy.length && token.address === '0x5edBD8808F48Ffc9e6D4c0D6845e0A0B4711FD5c') {
                  result.markets[meta.address].distributionApy.push(usdyApy[0]);
                }
                break;
              }
            }
          }

          console.log('result: %o', result);
          onLoad(result);
        })
        .catch((err: any) => {
          console.log('getMarkets failure: %o', err);
        });
    },
    { wait: 500 }
  );

  useEffect(() => {
    getMarkets();
  }, [update, account]);

  return null;
};

export default MinterestData;
