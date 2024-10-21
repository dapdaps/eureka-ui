import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect } from 'react';

const COMET_ABI = [
  {
    inputs: [{ internalType: 'address', name: 'priceFeed', type: 'address' }],
    name: 'getPrice',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'totalsCollateral',
    outputs: [
      {
        internalType: 'uint128',
        name: 'totalSupplyAsset',
        type: 'uint128'
      },
      { internalType: 'uint128', name: '_reserved', type: 'uint128' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
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
    name: 'baseTrackingBorrowSpeed',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'baseTrackingSupplySpeed',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'trackingIndexScale',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getUtilization',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'utilization', type: 'uint256' }],
    name: 'getSupplyRate',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'utilization', type: 'uint256' }],
    name: 'getBorrowRate',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'borrowBalanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' }
    ],
    name: 'userCollateral',
    outputs: [
      { internalType: 'uint128', name: 'balance', type: 'uint128' },
      { internalType: 'uint128', name: '_reserved', type: 'uint128' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getReserves',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
];

const CompoundV3Data = (props: any) => {
  const { comets, ethPriceFeed, multicall, multicallAddress, compPriceFeed, account, onLoad, chainId, provider } =
    props;

  let count: any = 0;
  let compPrice: any = 0;
  const rewardData: any = {};
  const secondsPerDay = 60 * 60 * 24;
  const secondsPerYear = 60 * 60 * 24 * 365;

  const getCometInfo = (len: any) => {
    const comet = comets[len - 1];
    const calls = [
      {
        address: comet.address,
        name: 'totalBorrow'
      },
      {
        address: comet.address,
        name: 'baseTrackingBorrowSpeed'
      },
      {
        address: comet.address,
        name: 'baseTrackingSupplySpeed'
      },
      {
        address: comet.address,
        name: 'trackingIndexScale'
      },
      { address: comet.address, name: 'getUtilization' },
      { address: comet.address, name: 'totalSupply' },
      { address: comet.address, name: 'getReserves' }
    ];
    multicall({
      abi: COMET_ABI,
      calls,
      options: {},
      multicallAddress,
      provider
    })
      .then((res: any) => {
        const baseTrackingSupplySpeed = res[2] ? Big(res[2][0]) : Big(0);
        const baseTrackingBorrowSpeed = res[1] ? Big(res[1][0]) : Big(0);
        rewardData[comet.address] = {
          baseTrackingSupplySpeed,
          baseTrackingBorrowSpeed,
          trackingIndexScale: res[3][0]
        };
        comet.totalBorrow = res[0] ? ethers.utils.formatUnits(res[0][0]?._hex || 0, comet.baseToken.decimals) : '0';
        comet.totalEarning = res[5][0] ? ethers.utils.formatUnits(res[5][0]?._hex || 0, comet.baseToken.decimals) : '0';
        comet.utilization = res[4][0] ? ethers.utils.formatUnits(res[4][0]?._hex || 0, 16) : '0';
        const reverses = res[6][0] ? ethers.utils.formatUnits(res[6][0]?._hex || 0, comet.baseToken.decimals) : '0';
        comet.liquidity = Big(comet.totalEarning).minus(comet.totalBorrow).add(reverses).toString();
        getCometRate(res[4][0], len);
      })
      .catch((err: any) => {
        console.log(`get comet info error ${comet.address}`, err);
      });
  };

  const getCometRate = (utilization: any, len: any) => {
    const comet = comets[len - 1];
    const calls = [
      {
        address: comet.address,
        name: 'getSupplyRate',
        params: [utilization]
      },
      {
        address: comet.address,
        name: 'getBorrowRate',
        params: [utilization]
      }
    ];

    multicall({
      abi: COMET_ABI,
      calls,
      options: {},
      multicallAddress,
      provider: provider
    })
      .then((res: any) => {
        const supplyApr = Big(res[0] || 0)
          .div(1e18)
          .mul(secondsPerYear);
        const borrowApr = Big(res[1] || 0)
          .div(1e18)
          .mul(secondsPerYear);
        comet.supplyApr = supplyApr.toString();
        comet.borrowApr = borrowApr.toString();
        len--;
        if (len > 0) {
          getCometInfo(len);
        } else {
          count++;
          formate();
        }
      })
      .catch((err: any) => {
        console.log(`get comets error ${comet.address}`, err);
      });
  };

  const getCometCollaterals = (len: any) => {
    const comet = comets[len - 1];
    const calls = comet.collateralAssets.map((asset: any) => ({
      address: comet.address,
      name: 'totalsCollateral',
      params: [asset.address]
    }));

    multicall({
      abi: COMET_ABI,
      calls,
      options: {},
      multicallAddress,
      provider: provider
    })
      .then((res: any) => {
        res.forEach((item: any, i: number) => {
          const amount =
            item && item[0] ? ethers.utils.formatUnits(item[0]?._hex || 0, comet.collateralAssets[i].decimals) : '0';
          comet.collateralAssets[i].collateral = amount;
        });
        len--;
        if (len > 0) {
          getCometCollaterals(len);
        } else {
          count++;
          formate();
        }
      })
      .catch((err: any) => {
        console.log(`get collaterals error`, err);
      });
  };

  const getPrice = (len: any) => {
    const comet = comets[len - 1];
    const calls = [
      {
        address: comet.address,
        name: 'getPrice',
        params: [comet.baseToken.priceFeed]
      },
      {
        address: comet.address,
        name: 'getPrice',
        params: [ethPriceFeed]
      }
    ];

    comet.collateralAssets.forEach((asset: any) => {
      calls.push({
        address: comet.address,
        name: 'getPrice',
        params: [asset.priceFeed]
      });
    });
    multicall({
      abi: COMET_ABI,
      calls,
      options: {},
      multicallAddress,
      provider: provider
    })
      .then((res: any) => {
        let ethPrice = '0';
        res.forEach((item: any, i: number) => {
          if (i === 0) {
            comet.baseToken.price = ethers.utils.formatUnits(item[0]?._hex || 0, 8);
            return;
          }
          if (i === 1) {
            ethPrice = ethers.utils.formatUnits(item[0]?._hex || 0, 8);
            return;
          }
          let _price = ethers.utils.formatUnits(item[0]?._hex || 0, 8);
          if (comet.collateralAssets[i - 2].isToEthPrice) {
            _price = ethers.utils.formatUnits(item[0]?._hex || 0, 18);
            _price = Big(_price).times(ethPrice).toFixed(8);
          }
          comet.collateralAssets[i - 2].price = _price;
        });
        len--;
        if (len > 0) {
          getPrice(len);
        } else {
          count++;
          formate();
        }
      })
      .catch((err: any) => {
        console.log(`get price error ${comet.address}`, err);
      });
  };

  const getCompPrice = (comet: any) => {
    if (!compPriceFeed) {
      count++;
      formate();
      return;
    }
    const calls = [
      {
        address: comet.address,
        name: 'getPrice',
        params: [compPriceFeed]
      }
    ];
    multicall({
      abi: COMET_ABI,
      calls,
      options: {},
      multicallAddress,
      provider: provider
    })
      .then((res: any) => {
        compPrice = res ? ethers.utils.formatUnits(res[0][0]?._hex || 0, 8) : 0;
        count++;
        formate();
      })
      .catch((err: any) => {
        console.log(`get comp price error`, err);
      });
  };

  const getAccountInfo = (comet: any, cb: any) => {
    const calls = [
      {
        address: comet.address,
        name: 'borrowBalanceOf',
        params: [account]
      },
      {
        address: comet.address,
        name: 'balanceOf',
        params: [account]
      },
      {
        address: comet.baseToken.address,
        name: 'balanceOf',
        params: [account]
      }
    ];
    let hasNative = '';
    comet.collateralAssets.forEach((asset: any) => {
      calls.push({
        address: comet.address,
        name: 'userCollateral',
        params: [account, asset.address]
      });
      calls.push({
        address: asset.address,
        name: 'balanceOf',
        params: [account]
      });
      if (asset.isNative) hasNative = asset.address;
    });

    multicall({
      abi: COMET_ABI,
      calls,
      options: {},
      multicallAddress,
      provider: provider
    })
      .then((res: any) => {
        const borrowedBalance = Big(res[0] || 0).div(Big(10).pow(comet.baseToken.decimals));
        const borrowedBalanceUsd = borrowedBalance.mul(comet.baseToken.price).toString();
        const balance = Big(res[1] || 0).div(Big(10).pow(comet.baseToken.decimals));
        const walletBalance = Big(res[2] || 0).div(Big(10).pow(comet.baseToken.decimals));
        let userCollateralUsd = Big(0);
        let userBorrowCapacityUsd = Big(0);
        const collateralBalances: any = {};
        let userLiquidationUsd = Big(0);
        let nativePrice = 0;
        comet.collateralAssets.forEach((collateralAsset: any, i: number) => {
          const startI = i * comet.collateralAssets.length + 3;
          const balance = Big(res[startI] ? res[startI][0] : 0).div(Big(10).pow(collateralAsset.decimals));
          userCollateralUsd = balance.mul(collateralAsset.price).add(userCollateralUsd);

          userBorrowCapacityUsd = balance
            .mul(collateralAsset.price)
            .mul(collateralAsset.borrowCollateralFactor / 100)
            .add(userBorrowCapacityUsd);

          userLiquidationUsd = balance
            .mul(collateralAsset.price)
            .mul(collateralAsset.liquidateCollateralFactor / 100)
            .add(userLiquidationUsd);

          const walletBalance = Big(res[startI + 1] || 0).div(Big(10).pow(collateralAsset.decimals));
          if (hasNative === collateralAsset.address) {
            nativePrice = collateralAsset.price;
          }
          collateralBalances[collateralAsset.address] = {
            balance: balance.toString(),
            balanceUsd: balance.mul(collateralAsset.price).toString(),
            walletBalance: walletBalance.toString(),
            walletBalanceUsd: walletBalance.mul(collateralAsset.price).toString()
          };
        });

        const returnData = {
          borrowedBalance: borrowedBalance.toString(),
          borrowedBalanceUsd,
          userCollateralUsd: userCollateralUsd.toString(),
          balance: balance.toString(),
          balanceUsd: balance.mul(comet.baseToken.price).toString(),
          walletBalance: walletBalance.toString(),
          walletBalanceUsd: walletBalance.mul(comet.baseToken.price).toString(),
          collateralBalances,
          userBorrowCapacityUsd: userBorrowCapacityUsd.toString(),
          userLiquidationUsd: userLiquidationUsd.toString()
        };

        if (hasNative) {
          provider.getBalance(account).then((rawBalance: any) => {
            const walletBalance = ethers.utils.formatUnits(rawBalance._hex, 18);
            collateralBalances[hasNative].walletBalance = walletBalance;
            collateralBalances[hasNative].walletBalanceUsd = Big(walletBalance).mul(nativePrice).toString();
            cb?.(returnData);
          });
        } else {
          cb?.(returnData);
        }
      })
      .catch((err: any) => {
        console.log('err', err);
      });
  };

  const formate = () => {
    if (count < 4) return;
    console.log(comets);
    const assets = comets.map((comet: any) => {
      const totalBorrowUsd = Big(comet.totalBorrow || 0)
        .mul(comet.baseToken.price)
        .toString();
      const totalEarningUsd = Big(comet.totalEarning || 0)
        .mul(comet.baseToken.price)
        .toString();

      let totalCollateral = Big(0);
      comet.collateralAssets?.forEach((asset: any) => {
        totalCollateral = totalCollateral.add(Big(asset.collateral || 0).mul(asset.price));
      });

      const cometRewardData = rewardData[comet.address];

      const compToSuppliersPerDay =
        (cometRewardData.baseTrackingSupplySpeed / cometRewardData.trackingIndexScale) * secondsPerDay;
      const compToBorrowersPerDay =
        (cometRewardData.baseTrackingBorrowSpeed / cometRewardData.trackingIndexScale) * secondsPerDay;

      const supplyCompRewardApr =
        ((compPrice * compToSuppliersPerDay) / (comet.totalEarning * comet.baseToken.price)) * 365;
      const borrowCompRewardApr =
        ((compPrice * compToBorrowersPerDay) / (comet.totalBorrow * comet.baseToken.price)) * 365;

      return {
        ...comet,
        totalBorrowUsd,
        totalEarningUsd,
        totalCollateralUsd: totalCollateral.toString(),
        supplyCompRewardApr,
        borrowCompRewardApr
      };
    });
    onLoad({
      getAccountInfo,
      assets,
      compPrice
    });
  };

  useEffect(() => {
    if (!comets.length) return;

    getPrice(comets.length);
    getCometInfo(comets.length);
    getCometCollaterals(comets.length);
    getCompPrice(comets[0]);
  }, [provider, chainId]);

  return null;
};

export default CompoundV3Data;
