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
    constant: true,
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'borrowBalanceCurrent',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'supplyRatePerBlock',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'borrowRatePerBlock',
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

export default function FilDAData(props: any) {
  const {
    multicallAddress,
    unitrollerAddress,
    oracleAddress,
    account,
    update,
    name,
    onLoad,
    multicall,
    markets,
    prices,
    chainId,
    provider
  } = props;

  useEffect(() => {
    if (!multicallAddress || !unitrollerAddress || !update || !account) return;
    const _cTokensData: any = {};
    let _loanToValue: any = null;
    const _underlyPrice: any = {};
    let _liquidity: any = null;
    let _underlyingBalance: any = null;
    let _userMerberShip: any = null;
    let count = 0;
    let oTokensLength = Object.values(markets).length;

    const formatedData = (key: string) => {
      if (count < 5) return;
      count = 0;
      const markets: any = {};
      oTokensLength = Object.values(markets).length;
      let totalSupplyUsd = Big(0);
      let totalBorrowUsd = Big(0);
      let userTotalSupplyUsd = Big(0);
      let userTotalBorrowUsd = Big(0);
      let totalCollateralUsd = Big(0);
      Object.values(_cTokensData).forEach((market: any) => {
        const underlyingPrice = _underlyPrice[market.address] || 1;
        const marketSupplyUsd = Big(market.totalSupply || 0).mul(underlyingPrice);
        const marketBorrowUsd = Big(market.totalBorrows || 0).mul(underlyingPrice);
        totalSupplyUsd = totalSupplyUsd.plus(marketSupplyUsd);
        totalBorrowUsd = totalBorrowUsd.plus(marketBorrowUsd);
        userTotalSupplyUsd = userTotalSupplyUsd.plus(Big(market.userSupply).mul(underlyingPrice));
        userTotalBorrowUsd = userTotalBorrowUsd.plus(Big(market.userBorrow).mul(underlyingPrice));
        // const totalSupply = Big(_liquidity[market.address]).add(
        //   market.totalBorrows
        // );
        // market.exchangeRateStored = totalSupply
        //   .div(market.totalSupply)
        //   .toString();
        // market.userSupply = Big(market.userSupply || 0)
        //   .mul(market.exchangeRateStored)
        //   .toString();
        // market.totalSupply = totalSupply.toString();
        // const marketSupplyUsd = Big(market.totalSupply || 0).mul(underlyingPrice);
        // const marketBorrowUsd = Big(market.totalBorrows || 0).mul(
        //   underlyingPrice
        // );
        // totalSupplyUsd = totalSupplyUsd.plus(marketSupplyUsd);
        // totalBorrowUsd = totalBorrowUsd.plus(marketBorrowUsd);
        // userTotalSupplyUsd = userTotalSupplyUsd.plus(
        //   Big(market.userSupply).mul(underlyingPrice)
        // );
        // userTotalBorrowUsd = userTotalBorrowUsd.plus(
        //   Big(market.userBorrow).mul(underlyingPrice)
        // );
        if (_userMerberShip[market.address]) {
          totalCollateralUsd = totalCollateralUsd.plus(
            Big(market.userSupply).mul(underlyingPrice).mul(_loanToValue[market.address]).div(100)
          );
        }

        let secondsPerBlock = 15;
        if (chainId === 137) {
          secondsPerBlock = 2;
        }
        if (chainId === 56) {
          secondsPerBlock = 3;
        }
        const supplyApy = Big(market.supplyRatePerBlock)
          .mul((60 / secondsPerBlock) * 60 * 24)
          .plus(1)
          .pow(365)
          .minus(1)
          .mul(100);

        const borrowApy = Big(market.borrowRatePerBlock)
          .mul((60 / secondsPerBlock) * 60 * 24)
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
      const calls: any = [];
      const oTokens: any = Object.values(markets);
      oTokens.forEach((token: any) => {
        calls.push({
          address: unitrollerAddress,
          name: 'markets',
          params: [token.address]
        });
        calls.push({
          address: unitrollerAddress,
          name: 'checkMembership',
          params: [account, token.address]
        });
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
                _loanToValue[oTokens[index].address] = ethers.utils.formatUnits(res[i]?.[1]._hex, 16);
                break;
              case 1:
                _userMerberShip[oTokens[index].address] = res[i]?.[0] || false;
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
      Object.values(markets).forEach((market: any) => {
        _underlyPrice[market.address] = prices[market.underlyingToken.priceKey || market.underlyingToken.symbol];
      });
      count++;
      formatedData('getUnderlyPrice');
      // if (!oracleAddress) return;
      // const oTokens = Object.keys(markets);
      // const calls = oTokens.map((token) => ({
      //   address: oracleAddress,
      //   name: "getUnderlyingPrice",
      //   params: [token],
      // }));
      // multicall({
      //   abi: ORACLE_ABI,
      //   calls,
      //   options: {},
      //   multicallAddress,
      //   provider: Ethers.provider(),
      // })
      //   .then((res) => {
      //     _underlyPrice = {};
      //     for (let i = 0, len = res.length; i < len; i++) {
      //       _underlyPrice[oTokens[i]] = ethers.utils.formatUnits(
      //         res[i][0]._hex,
      //         36 - markets[oTokens[i]].underlyingToken.decimals
      //       );
      //     }
      //     count++;
      //     formatedData("getUnderlyPrice");
      //   })
      //   .catch((err) => {
      //     console.log("error-getUnderlyPrice", err);
      //   });
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
            _liquidity[oToken.address] = ethers.utils.formatUnits(
              res[i]?.[0]._hex || 0,
              oToken.underlyingToken.decimals
            );
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
        .catch(() => {
          setTimeout(() => {
            getOTokenLiquidity();
          }, 500);
        });
    };
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
        provider: provider
      })
        .then((res: any) => {
          _underlyingBalance = {};
          for (let i = 0, len = res.length; i < len; i++) {
            _underlyingBalance[underlyingTokens[i].oTokenAddress] = res[i]?.[0]
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
        .catch(() => {
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
          name: 'balanceOf',
          params: [account]
        },
        {
          address: oToken.address,
          name: 'borrowBalanceCurrent',
          params: [account]
        },
        {
          address: oToken.address,
          name: 'borrowRatePerBlock'
        },
        {
          address: oToken.address,
          name: 'supplyRatePerBlock'
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
          const exchangeRateStored = res[0]?.[0]
            ? ethers.utils.formatUnits(res[0][0]._hex, oToken.underlyingToken.decimals)
            : '0';

          const totalSupply = res[1]?.[0] ? ethers.utils.formatUnits(res[1][0]._hex, oToken.decimals) : '0';
          const userSupply = res[3]?.[0] ? ethers.utils.formatUnits(res[3][0]._hex, oToken.decimals) : '0';
          _cTokensData[oToken.address] = {
            ...oToken,
            exchangeRateStored,
            totalSupply: Big(totalSupply).mul(exchangeRateStored).toString(),
            totalBorrows: res[2]?.[0] ? ethers.utils.formatUnits(res[2][0]._hex, oToken.underlyingToken.decimals) : '0',
            supplyRatePerBlock: res[6]?.[0] ? ethers.utils.formatUnits(res[6][0]._hex, 18) : '0',
            borrowRatePerBlock: res[5]?.[0] ? ethers.utils.formatUnits(res[5][0]._hex, 18) : '0',
            userSupply: Big(userSupply).mul(exchangeRateStored).toString(),
            userBorrow: res[4]?.[0] ? ethers.utils.formatUnits(res[4][0]._hex, oToken.underlyingToken.decimals) : '0'
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
    getUnitrollerData();
    getUnderlyPrice();
    getOTokenLiquidity();
    getWalletBalance();
    getCTokensData();
  }, [update, account]);
}
