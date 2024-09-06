import { useEffect } from 'react';
import Big from 'big.js';
import { ethers } from 'ethers';

const OTOKEN_ABI = [
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalBorrows",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "exchangeRateCurrent",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "getAccountSnapshot",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "supplyRatePerBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "borrowRatePerBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
const UNITROLLER_ABI = [
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "markets",
    outputs: [
      { internalType: "bool", name: "isListed", type: "bool" },
      {
        internalType: "uint256",
        name: "collateralFactorMantissa",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "liquidationThresholdMantissa",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "collateralFactorMantissaVip",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "liquidationThresholdMantissaVip",
        type: "uint256",
      },
      { internalType: "bool", name: "isComped", type: "bool" },
      { internalType: "bool", name: "isPrivate", type: "bool" },
      {
        internalType: "bool",
        name: "onlyWhitelistedBorrow",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      {
        internalType: "contract IOToken",
        name: "oToken",
        type: "address",
      },
    ],
    name: "checkMembership",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "compSupplySpeeds",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "compBorrowSpeeds",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "compAccrued",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
const ORACLE_ABI = [
  {
    inputs: [
      {
        internalType: "contract IOToken",
        name: "oToken",
        type: "address",
      },
    ],
    name: "getUnderlyingPrice",
    outputs: [{ internalType: "uint256", name: "price", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
const ERC20_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

export default function TenderFinanceData (props: any) {

  const {
    multicallAddress,
    unitrollerAddress,
    lensAddress,
    oracleAddress,
    account,
    update,
    name,
    onLoad,
    markets,
    multicall,
    provider
  } = props;

  useEffect(() => {
    if (!multicallAddress || !unitrollerAddress || !update || !account) return;

    let _cTokensData: any = {};
    let _loanToValue: any = null;
    let _underlyPrice: any = {};
    let _liquidity: any = null;
    let _underlyingBalance: any = null;
    let _userMerberShip: any = null;
    let _rewards: any = {};
    let _accountRewards: any = {};
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
        const marketBorrowUsd = Big(market.totalBorrows || 0).mul(
          underlyingPrice
        );
        totalSupplyUsd = totalSupplyUsd.plus(marketSupplyUsd);
        totalBorrowUsd = totalBorrowUsd.plus(marketBorrowUsd);
        userTotalSupplyUsd = userTotalSupplyUsd.plus(
          Big(market.userSupply).mul(underlyingPrice)
        );
        userTotalBorrowUsd = userTotalBorrowUsd.plus(
          Big(market.userBorrow).mul(underlyingPrice)
        );
        if (_userMerberShip[market.address]) {
          totalCollateralUsd = totalCollateralUsd.plus(
            Big(market.userSupply)
              .mul(underlyingPrice)
              .mul(_loanToValue[market.address])
              .div(100)
          );
        }

        const supplyApy = Big(market.supplyRatePerBlock)
          .mul(4 * 60 * 24)
          .plus(1)
          .pow(365)
          .minus(1)
          .mul(100 * 1.2559808612440193);

        const borrowApy = Big(market.borrowRatePerBlock)
          .mul(4 * 60 * 24)
          .plus(1)
          .pow(365)
          .minus(1)
          .mul(100 * 1.2559808612440193);

        markets[market.address] = {
          ...market,
          loanToValue: _loanToValue[market.address],
          liquidity: _liquidity[market.address],
          underlyingPrice: underlyingPrice,
          userUnderlyingBalance: _underlyingBalance[market.address],
          userMerberShip: _userMerberShip[market.address],
          supplyApy: supplyApy.toFixed(2) + "%",
          borrowApy: borrowApy.toFixed(2) + "%",
          distributionApy: [],
          dapp: name,
        };
      });

      onLoad({
        markets,
        rewards: [],
        totalSupplyUsd: totalSupplyUsd.toString(),
        totalBorrowUsd: totalBorrowUsd.toString(),
        userTotalSupplyUsd: userTotalSupplyUsd.toString(),
        userTotalBorrowUsd: userTotalBorrowUsd.toString(),
        totalCollateralUsd: totalCollateralUsd.toString(),
      });
    };
    const getUnitrollerData = () => {
      const calls = [];
      const oTokens: Calls[] = Object.values(markets);
      oTokens.forEach((token) => {
        calls.push({
          address: unitrollerAddress,
          name: "markets",
          params: [token.address],
        });
        calls.push({
          address: unitrollerAddress,
          name: "checkMembership",
          params: [account, token.address],
        });
      });
      calls.push({
        address: unitrollerAddress,
        name: "compAccrued",
        params: [account],
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
            if (i === res.length - 1) {
              _accountRewards.reward = res[i]?.[0]
                ? ethers.utils.formatUnits(res[i]?.[0]._hex, 18)
                : "0";
              count++;
              formatedData("getUnitrollerData");
              return;
            }
            const index = Math.floor(i / (account ? 2 : 1));
            const mod = i % (account ? 2 : 1);
            switch (mod) {
              case 0:
                _loanToValue[oTokens[index].address] = ethers.utils.formatUnits(
                  res[i]?.[1]._hex,
                  16
                );
                break;
              case 1:
                _userMerberShip[oTokens[index].address] = res[i]?.[0] || false;
                break;
              default:
            }
          }
        })
        .catch((err: any) => {
          console.log("error-getUnitrollerData", err);
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
        name: "getUnderlyingPrice",
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
              res[i]?.[0]._hex,
              36 - markets[oTokens[i]].underlyingToken.decimals
            );
          }
          count++;
          formatedData("getUnderlyPrice");
        })
        .catch((err: any) => {
          console.log("error-getUnderlyPrice", err);
        });
    };
    const getOTokenLiquidity = () => {
      const assets = Object.values(markets);
      let nativeOToken = "";
      const calls = assets
        .filter((market: any) => {
          if (market.underlyingToken.address === "native")
            nativeOToken = market.address;
          return (
            market.underlyingToken.address &&
            market.underlyingToken.address !== "native"
          );
        })
        .map((market: any) => ({
          address: market.underlyingToken.address,
          name: "balanceOf",
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
            _liquidity[oToken.address] = res[i]?.[0]
              ? ethers.utils.formatUnits(
                res[i][0]._hex,
                oToken.underlyingToken.decimals
              )
              : "0";
          }
          if (nativeOToken) {
            provider.getBalance(nativeOToken).then((rawBalance: any) => {
              _liquidity[nativeOToken] = rawBalance
                ? ethers.utils.formatUnits(rawBalance._hex, 18)
                : 0;
              count++;
              formatedData("getOTokenLiquidity");
            });
          } else {
            count++;
            formatedData("getOTokenLiquidity");
          }
        })
        .catch(() => {
          setTimeout(() => {
            getOTokenLiquidity();
          }, 500);
        });
    };
    const getWalletBalance = () => {
      let nativeOToken = "";
      const underlyingTokens = Object.values(markets)
        .filter((market: any) => {
          if (market.underlyingToken.address === "native")
            nativeOToken = market.address;
          return (
            market.underlyingToken.address &&
            market.underlyingToken.address !== "native"
          );
        })
        .map((market: any) => ({
          ...market.underlyingToken,
          oTokenAddress: market.address,
        }));
      const calls = underlyingTokens.map((token) => ({
        address: token.address,
        name: "balanceOf",
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
            _underlyingBalance[underlyingTokens[i].oTokenAddress] = res[i]?.[0]
              ? ethers.utils.formatUnits(
                res[i][0]._hex,
                underlyingTokens[i].decimals
              )
              : "0";
          }
          if (nativeOToken) {
            provider.getBalance(account).then((rawBalance: any) => {
              _underlyingBalance[nativeOToken] = rawBalance
                ? ethers.utils.formatUnits(rawBalance._hex, 18)
                : "0";
              count++;
              formatedData("getWalletBalance");
            });
          } else {
            count++;
            formatedData("getWalletBalance");
          }
        })
        .catch((err: any) => {
          console.log("getWalletBalance error", err);
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
          name: "exchangeRateCurrent",
        },
        {
          address: oToken.address,
          name: "totalSupply",
        },
        {
          address: oToken.address,
          name: "totalBorrows",
        },
        {
          address: oToken.address,
          name: "supplyRatePerBlock",
        },
        {
          address: oToken.address,
          name: "borrowRatePerBlock",
        },
        {
          address: oToken.address,
          name: "getAccountSnapshot",
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
            res[0]?.[0]._hex,
            10 + oToken.underlyingToken.decimals
          );
          const userSupply = ethers.utils.formatUnits(
            res[5]?.[1]._hex,
            oToken.decimals
          );
          const totalSupply = ethers.utils.formatUnits(
            res[1]?.[0]._hex,
            oToken.decimals
          );
          _cTokensData[oToken.address] = {
            ...oToken,
            exchangeRateStored,
            totalSupply: Big(totalSupply).mul(exchangeRateStored).toString(),
            totalBorrows: ethers.utils.formatUnits(
              res[2]?.[0]._hex,
              oToken.underlyingToken.decimals
            ),
            supplyRatePerBlock: ethers.utils.formatUnits(res[3]?.[0]._hex, 18),
            borrowRatePerBlock: ethers.utils.formatUnits(res[4]?.[0]._hex, 18),
            userSupply: Big(userSupply).mul(exchangeRateStored).toString(),
            userBorrow: ethers.utils.formatUnits(
              res[5]?.[2]._hex,
              oToken.underlyingToken.decimals
            ),
          };
          if (oTokensLength === 0) {
            count++;
            formatedData("oTokens data");
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

    const getCTokenReward = ({ price, cTokens, index }: { price: number, cTokens: any, index: number }) => {
      const token = cTokens[index];
      const calls = [
        {
          address: unitrollerAddress,
          name: "compBorrowSpeeds",
          params: [token],
        },
        {
          address: unitrollerAddress,
          name: "compSupplySpeeds",
          params: [token],
        },
      ];
      multicall({
        abi: UNITROLLER_ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          const borrow = res[0][0]
            ? Big(ethers.utils.formatUnits(res[0][0]._hex, 18)).mul(price)
            : Big(0);
          const supply = res[1][0]
            ? Big(ethers.utils.formatUnits(res[1][0]._hex, 18)).mul(price)
            : Big(0);
          _rewards[token] = {
            borrow: borrow.mul(60 * 60 * 24 * 365),
            supply: supply.mul(60 * 60 * 24 * 365),
          };
          if (index === cTokens.length - 1) {
            count++;
            formatedData("rewards");
          } else {
            getCTokenReward({
              price,
              cTokens,
              index: index + 1,
            });
          }
        })
        .catch((err: any) => {
          console.log("error-rewards", err);
        });
    };
    getUnitrollerData();
    getUnderlyPrice();
    getOTokenLiquidity();
    getWalletBalance();
    getCTokensData();
  }, [update, account]);
};

interface Calls {
  address: string;
  name: string;
  params: any[];
}