import { useEffect } from 'react';
import { ethers } from 'ethers';
import Big from 'big.js';

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
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "markets",
    outputs: [
      { internalType: "bool", name: "isListed", type: "bool" },
      {
        internalType: "uint256",
        name: "collateralFactorMantissa",
        type: "uint256",
      },
      { internalType: "bool", name: "isQied", type: "bool" },
    ],
    payable: false,
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
const LENS_ABI = [
  {
    inputs: [
      { internalType: "contract Comp", name: "comp", type: "address" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "getCompBalanceMetadata",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "balance", type: "uint256" },
          { internalType: "uint256", name: "votes", type: "uint256" },
          { internalType: "address", name: "delegate", type: "address" },
        ],
        internalType: "struct CompoundLens.CompBalanceMetadata",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export default function LodestarV1Data (props: any) {
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
    prices,
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
    const REWARD_TOKEN = {
      icon: "/images/tokens/lode.svg",
      symbol: "LODE",
      address: "0xf19547f9ed24aa66b03c3a552d181ae334fbb8db",
      price: prices["LODE"] || "0.3076",
      priceKey: ''
    };
    const formatedData = (key: string) => {
      if (count < 6) return;
      count = 0;
      const markets: any = {};
      oTokensLength = Object.values(markets).length;
      let totalSupplyUsd = Big(0);
      let totalBorrowUsd = Big(0);
      let userTotalSupplyUsd = Big(0);
      let userTotalBorrowUsd = Big(0);
      let totalCollateralUsd = Big(0);
      let totalAccountDistributionApy = Big(0);
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
        const distributionSupplyApy = _rewards[market.address].supply
          .div(marketSupplyUsd.eq(0) ? 1 : marketSupplyUsd)
          .plus(1)
          .pow(365)
          .minus(1)
          .mul(100)
          .toFixed(2);
        const distributionBorrowApy = _rewards[market.address].borrow
          .div(marketBorrowUsd.eq(0) ? 1 : marketBorrowUsd)
          .plus(1)
          .pow(365)
          .minus(1)
          .mul(100)
          .toFixed(2);
        totalAccountDistributionApy = totalAccountDistributionApy
          .plus(distributionSupplyApy)
          .plus(distributionBorrowApy);
        const supplyApy = Big(market.supplyRatePerBlock)
          .mul(5 * 60 * 24)
          .plus(1)
          .pow(365)
          .minus(1)
          .mul(100);

        const borrowApy = Big(market.borrowRatePerBlock)
          .mul(5 * 60 * 24)
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
          supplyApy: supplyApy.toFixed(2) + "%",
          borrowApy: borrowApy.toFixed(2) + "%",
          distributionApy: [
            {
              ...REWARD_TOKEN,
              supply: distributionSupplyApy + "%",
              borrow: distributionBorrowApy + "%",
            },
          ],
          dapp: name,
        };
      });

      // const arbApy = Big(28800 * 52)
      //   .mul(prices["ARB"] || 1)
      //   .div(totalSupplyUsd.add(totalBorrowUsd));

      // console.log("arbApy", arbApy.toString());

      let rewards;

      if (_accountRewards && Big(_accountRewards.reward || 0).gt(0)) {
        const dailyRewards = totalAccountDistributionApy
          .mul(userTotalSupplyUsd.add(userTotalBorrowUsd))
          .div(365 * 100)
          .div(_accountRewards.price);
        rewards = [
          {
            ...REWARD_TOKEN,
            dailyRewards: dailyRewards.toString(),
            price: _accountRewards.price,
            unclaimed: _accountRewards.reward,
          },
        ];
      }
      onLoad({
        markets,
        rewards,
        totalSupplyUsd: totalSupplyUsd.toString(),
        totalBorrowUsd: totalBorrowUsd.toString(),
        userTotalSupplyUsd: userTotalSupplyUsd.toString(),
        userTotalBorrowUsd: userTotalBorrowUsd.toString(),
        totalCollateralUsd: totalCollateralUsd.toString(),
      });
    };
    const getUnitrollerData = () => {
      const calls: any = [];
      const oTokens: any = Object.values(markets);
      oTokens.forEach((token: any) => {
        calls.push({
          address: unitrollerAddress,
          name: "markets",
          params: [token.address],
        });
        if (account) {
          calls.push({
            address: unitrollerAddress,
            name: "checkMembership",
            params: [account, token.address],
          });
        }
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
          count++;
          formatedData("getUnitrollerData");
        })
        .catch((err: any) => {
          console.log("error-getUnitrollerData", err);
          setTimeout(() => {
            getUnitrollerData();
          }, 1000);
        });
    };
    const getUnderlyPrice = () => {
      Object.values(markets).forEach((market: any) => {
        _underlyPrice[market.address] =
          prices[
          market.underlyingToken.priceKey || market.underlyingToken.symbol
            ] || "1";
      });
      count++;
      formatedData("getUnderlyPrice");
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
            _liquidity[oToken.address] = ethers.utils.formatUnits(
              res[i]?.[0]._hex,
              oToken.underlyingToken.decimals
            );
          }
          if (nativeOToken) {
            provider.getBalance(nativeOToken).then((rawBalance: any) => {
              _liquidity[nativeOToken] = ethers.utils.formatUnits(
                rawBalance._hex,
                18
              );
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
              _underlyingBalance[nativeOToken] = ethers.utils.formatUnits(
                rawBalance._hex,
                18
              );
              count++;
              formatedData("underlyingTokens");
            });
          } else {
            count++;
            formatedData("underlyingTokens");
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

    const getUserRewards = () => {
      multicall({
        abi: LENS_ABI,
        calls: [
          {
            address: lensAddress,
            name: "getCompBalanceMetadata",
            params: [REWARD_TOKEN.address, account],
          },
        ],
        options: {},
        multicallAddress,
        provider: provider,
      })
        .then((res: any) => {
          const price =
            prices[REWARD_TOKEN.priceKey || REWARD_TOKEN.symbol] || "1";
          _accountRewards = {
            price,
            reward: res[0]?.[0]?.[0]
              ? ethers.utils.formatUnits(res[0][0][0], 18).toString()
              : "0",
          };
          count++;
          formatedData("rewards");
        })
        .catch((err: any) => {
          console.log(name + " error-user-rewards", err);
        });
    };

    const getCTokenReward = ({ cTokens, index }: { cTokens: any, index: number }) => {
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
          const borrow = res[0]?.[0]
            ? Big(ethers.utils.formatUnits(res[0][0]._hex, 18)).mul(
              REWARD_TOKEN.price
            )
            : Big(0);
          const supply = res[1]?.[0]
            ? Big(ethers.utils.formatUnits(res[1][0]._hex, 18)).mul(
              REWARD_TOKEN.price
            )
            : Big(0);
          _rewards[token] = {
            borrow: borrow.mul(7200),
            supply: supply.mul(7200),
          };

          if (index === cTokens.length - 1) {
            getUserRewards();
          } else {
            getCTokenReward({
              cTokens,
              index: index + 1,
            });
          }
        })
        .catch((err: any) => {
          console.log("error-rewards", err);
        });
    };

    const getRewards = () => {
      const cTokens = Object.keys(markets);
      getCTokenReward({
        cTokens,
        index: 0,
      });
    };
    getUnitrollerData();
    getUnderlyPrice();
    getOTokenLiquidity();
    getWalletBalance();
    getCTokensData();
    getRewards();
  }, [update, account]);

}