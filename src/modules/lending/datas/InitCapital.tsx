import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect } from 'react';

const OTOKEN_ABI = [
  {
    inputs: [],
    name: 'totalAssets',
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
    name: 'totalDebt',
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
    name: 'getSupplyRate_e18',
    outputs: [
      {
        internalType: 'uint256',
        name: 'supplyRate_e18',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getBorrowRate_e18',
    outputs: [
      {
        internalType: 'uint256',
        name: 'borrowRate_e18',
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
        name: '_shares',
        type: 'uint256'
      }
    ],
    name: 'toAmt',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amt',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];

const ERC20_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
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
];

const POS_MANAGER_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_viewer',
        type: 'address'
      }
    ],
    name: 'getViewerPosIdsLength',
    outputs: [
      {
        internalType: 'uint256',
        name: 'length',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_viewer',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_index',
        type: 'uint256'
      }
    ],
    name: 'getViewerPosIdsAt',
    outputs: [
      {
        internalType: 'uint256',
        name: 'posId',
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
        name: '_posId',
        type: 'uint256'
      }
    ],
    name: 'getPosCollInfo',
    outputs: [
      {
        internalType: 'address[]',
        name: 'pools',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: 'amts',
        type: 'uint256[]'
      },
      {
        internalType: 'address[]',
        name: 'wLps',
        type: 'address[]'
      },
      {
        internalType: 'uint256[][]',
        name: 'ids',
        type: 'uint256[][]'
      },
      {
        internalType: 'uint256[][]',
        name: 'wLpAmts',
        type: 'uint256[][]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];

const timers: any = [];

const InitCapitalData = (props: any) => {
  const {
    multicallAddress,
    unitrollerAddress,
    distributionAddress,
    oracleAddress,
    POS_MANAGER,
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
    const _underlyPrice: any = {};
    let _underlyingBalance: any = null;
    let _userSupply: any = {};
    let count = 0;
    let oTokensLength = Object.values(markets).length;
    const formatedData = (key: any) => {
      console.log(`${name}-${key}`, count);
      if (count < 1) return;
      try {
        count = 0;
        oTokensLength = Object.values(markets).length;
        const _markets: any = {};
        Object.values(_cTokensData).forEach((market: any) => {
          const underlyingPrice = _underlyPrice[market.address] || 1;
          _markets[market.address] = {
            ...market,
            // distributionApy: [distributionApy],
            underlyingPrice,
            userSupply: _userSupply?.[market.address] ?? '0',
            userUnderlyingBalance: _underlyingBalance[market.address],
            dapp: name
          };
        });
        onLoad({
          markets: _markets
        });
      } catch (err) {
        console.log('format error', err);
      }
    };

    const getApy = (rate: any) => {
      const SECONDS_PER_YEAR = 31536000;
      const APR = (rate / 1e18) * SECONDS_PER_YEAR;
      return (1 + APR / SECONDS_PER_YEAR) ** SECONDS_PER_YEAR - 1;
    };

    const getPosIdsLength = async () => {
      if (!POS_MANAGER) return;
      const contract = new ethers.Contract(POS_MANAGER, POS_MANAGER_ABI, provider.getSigner());
      try {
        return await contract.getViewerPosIdsLength(account);
      } catch (error) {
        console.log('getPosIdsLength---error:', error);
      }
    };
    const getPosIds = async (posIdsLength: number) => {
      if (!POS_MANAGER) return;
      const contract = new ethers.Contract(POS_MANAGER, POS_MANAGER_ABI, provider.getSigner());
      const calls = [];
      for (let i = 0; i < posIdsLength; i++) {
        calls.push({
          address: POS_MANAGER,
          name: 'getViewerPosIdsAt',
          params: [account, i]
        });
      }
      try {
        return (
          await multicall({
            abi: POS_MANAGER_ABI,
            calls,
            options: {},
            multicallAddress,
            provider
          })
        ).map((res: any) => (res[0] ? res[0] : '0'));
      } catch (error) {
        console.log('getPosIds---error:', error);
      }
    };

    const getPosCollInfos = async (posIds: any) => {
      if (!POS_MANAGER) return;
      const calls = [];
      for (let i = 0; i < posIds?.length; i++) {
        calls.push({
          address: POS_MANAGER,
          name: 'getPosCollInfo',
          params: [posIds[i]]
        });
      }
      return await multicall({
        abi: POS_MANAGER_ABI,
        calls,
        options: {},
        multicallAddress,
        provider
      });
    };

    const getAmts = async (posCollInfos) => {
      const calls = [];
      posCollInfos?.forEach((posCollInfo) => {
        const [pools, amts] = posCollInfo;
        calls.push({
          address: pools?.[0],
          name: 'toAmt',
          params: [amts[0]]
        });
      });
      console.log('===markets', markets);
      return (
        await multicall({
          abi: OTOKEN_ABI,
          calls,
          options: {},
          multicallAddress,
          provider
        })
      ).map((res: any, index) => {
        console.log('===res', res);
        const oToken = markets[calls?.[index]?.address];
        return [oToken?.address, res[0] ? ethers.utils.formatUnits(res[0]._hex, oToken.decimals) : '0'];
      });

      // if (!address) return;
      // const contract = new ethers.Contract(address, OTOKEN_ABI, provider.getSigner());
      // try {
      //   return await contract.toAmt(amt)
      // } catch (error) {
      //   console.log('getAmt----error', error)
      // }
    };

    const getUserSupply = async () => {
      try {
        const posIdsLength = await getPosIdsLength();
        const posIds = await getPosIds(posIdsLength);
        const posCollInfos = await getPosCollInfos(posIds);
        const amts = await getAmts(posCollInfos);
        _userSupply = {};
        amts.forEach((amt) => {
          _userSupply[amt?.[0]] = amt?.[1];
        });
        count++;
        formatedData('getUserSupply');
      } catch (error) {
        console.log('getUserSupply----error', error);
      }
    };

    const getUnderlyPrice = async () => {};
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

          console.log('========res=========', res);
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
            });
          } else {
            count++;
            formatedData('underlyingTokens');
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
          name: 'totalAssets'
        },
        {
          address: oToken.address,
          name: 'totalDebt'
        },
        {
          address: oToken.address,
          name: 'getSupplyRate_e18'
        },
        {
          address: oToken.address,
          name: 'getBorrowRate_e18'
        }
      ];
      multicall({
        abi: OTOKEN_ABI,
        calls,
        options: {},
        multicallAddress,
        provider
      })
        .then(async (res: any) => {
          oTokensLength--;
          const totalAssets = res[0] ? ethers.utils.formatUnits(res[0][0], oToken?.decimals) : '0';
          const totalDebt = res[1] ? ethers.utils.formatUnits(res[1][0], oToken?.decimals) : '0';
          // const supplyRate = res[2] ? ethers.utils.formatUnits(res[2][0], oToken?.decimals) : '0'
          // const borrowRate = res[3] ? ethers.utils.formatUnits(res[3][0], oToken?.decimals) : '0'

          console.log('===getApy(res[2])', getApy(res[2]));
          console.log('===getApy(res[3])', getApy(res[3]));
          _cTokensData[oToken.address] = {
            ...oToken,
            totalSupply: Big(totalAssets).times(prices[oToken?.underlyingToken?.symbol]).toFixed(),
            totalBorrows: Big(totalDebt).times(prices[oToken?.underlyingToken?.symbol]).toFixed(),
            supplyApy: Big(getApy(res[2])).times(100).toFixed(2) + '%',
            borrowApy: Big(getApy(res[3])).times(100).toFixed(2) + '%',
            utilization: Big(totalDebt).div(totalAssets).toFixed()
          };
          if (oTokensLength === 0) {
            count++;
            formatedData('oTokens data');
          }
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

    getUnderlyPrice();
    getUserSupply();
    getCTokensData();
    getWalletBalance();

    return () => {
      timers.forEach((timer: any) => {
        clearTimeout(timer);
      });
    };
  }, [update, account, chainId, provider]);

  return null;
};

export default InitCapitalData;
