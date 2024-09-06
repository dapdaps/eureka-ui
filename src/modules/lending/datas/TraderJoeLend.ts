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
    name: "supplyRatePerSecond",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "borrowRatePerSecond",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "borrowBalanceStored",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  // {
  //   "constant": true,
  //   "inputs": [],
  //   "name": "exchangeRateStored",
  //   "outputs": [
  //     {
  //       "internalType": "uint256",
  //       "name": "",
  //       "type": "uint256"
  //     }
  //   ],
  //   "payable": false,
  //   "stateMutability": "view",
  //   "type": "function"
  // },
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
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "contract MToken", name: "mToken", type: "address" },
    ],
    name: "checkMembership",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
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
const REWARD_ABI = [
  {
    constant: true,
    inputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "rewardBorrowSpeeds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "rewardSupplySpeeds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];


export default function TraderJoeLendData (props: any) {
  const {
    multicallAddress,
    unitrollerAddress,
    oracleAddress,
    account,
    update,
    name,
    onLoad,
    markets,
    multicall,
    prices,
    provider,
  } = props;


  useEffect(() => {
    if (!multicallAddress || !unitrollerAddress || !update || !account) return;

    let _cTokensData:  Record<string, Market>  = {};
    let _loanToValue: any = null;
    let _underlyPrice: Record<string, any> = {};
    let _liquidity: any = null;
    let _underlyingBalance: any = null;
    let _userMerberShip: any = null;
    let _accountRewards = {};
    let _rewards = {};
    let count = 0;
    let oTokensLength = Object.values(markets).length;
    const REWARD_TOKEN = [
      {
        icon: "https://ipfs.near.social/ipfs/bafkreiayj2bv6br4lt77qzhty7yu6butss42lqoatekdyk3is76yjxlw4e",
        symbol: "JOE",
      },
      {
        icon: "https://ipfs.near.social/ipfs/bafkreiaxodsgromeeaihu44fazsxdopkrqvinqzhyfxvx5mrbcmduqdfpq",
        symbol: "AVAX",
      },
    ];

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
      let totalAccountDistributionApy = Big(0);
      Object.values(_cTokensData).forEach((market ) => {
        const underlyingPrice = _underlyPrice[market.address];
        const marketSupplyUsd = Big(market.totalSupply || 0).mul(underlyingPrice);
        const marketBorrowUsd = Big(market.totalBorrows || 0).mul(
          underlyingPrice
        );
        totalSupplyUsd = totalSupplyUsd.plus(marketSupplyUsd);
        totalBorrowUsd = totalBorrowUsd.plus(marketBorrowUsd);

        userTotalSupplyUsd = userTotalSupplyUsd.plus(
          Big(market?.userSupply ?? 0).mul(underlyingPrice)
        );
        userTotalBorrowUsd = userTotalBorrowUsd.plus(
          Big(market?.userBorrow ?? 0).mul(underlyingPrice)
        );
        if (_userMerberShip[market.address]) {
          totalCollateralUsd = totalCollateralUsd.plus(
            Big(market.userSupply)
              .mul(underlyingPrice)
              .mul(_loanToValue[market.address])
              .div(100)
          );
        }
        const distributionApy:DistributionApy[] = [];

        let rewards: any[] = [];
        // REWARD_TOKEN.forEach((reward) => {
        //   const _reward = _rewards[reward.symbol][market.address];
        //   const distributionSupplyApy = Big(_reward.supply)
        //     .div(marketSupplyUsd.eq(0) ? 1 : marketSupplyUsd)
        //     .plus(1)
        //     .pow(365)
        //     .minus(1)
        //     .mul(100)
        //     .toFixed(2);
        //   const distributionBorrowApy = Big(_reward.borrow)
        //     .div(marketBorrowUsd.eq(0) ? 1 : marketBorrowUsd)
        //     .plus(1)
        //     .pow(365)
        //     .minus(1)
        //     .mul(100)
        //     .toFixed(2);

        //   _reward.totalAccountDistributionApy = totalAccountDistributionApy
        //     .plus(distributionSupplyApy)
        //     .plus(distributionBorrowApy);

        //   distributionApy.push({
        //     icon: reward.icon,
        //     symbol: reward.symbol,
        //     supply: distributionSupplyApy + "%",
        //     borrow: distributionBorrowApy + "%",
        //   });
        // });

        const supplyApy = Big(market.supplyRatePerTimestamp)
          .mul(60 * 60 * 24)
          .plus(1)
          .pow(365)
          .minus(1)
          .mul(100)
          .toFixed(2);
        const borrowApy = Big(market.borrowRatePerTimestamp)
          .mul(60 * 60 * 24)
          .plus(1)
          .pow(365)
          .minus(1)
          .mul(100)
          .toFixed(2);

        markets[market.address] = {
          ...market,
          loanToValue: _loanToValue[market.address],
          liquidity: _liquidity[market.address],
          underlyingPrice: underlyingPrice,
          userUnderlyingBalance: _underlyingBalance[market.address],
          userMerberShip: _userMerberShip[market.address],
          supplyApy: supplyApy + "%",
          borrowApy: borrowApy + "%",
          distributionApy,
          dapp: name,
          rewards,
        };
      });
      // REWARD_TOKEN.forEach((reward) => {
      //   const _reward = _rewards[reward.symbol];
      //   if (_reward.reward && Big(_reward.reward || 0).gt(0)) {
      //     const dailyRewards = _reward.totalAccountDistributionApy
      //       .mul(userTotalSupplyUsd.add(userTotalBorrowUsd))
      //       .div(365 * 100)
      //       .div(_reward.price);
      //     rewards.push({
      //       icon: reward.icon,
      //       symbol: reward.symbol,
      //       dailyRewards: dailyRewards.toString(),
      //       price: _reward.price,
      //       unclaimed: _reward.reward,
      //     });
      //   }
      // });

      onLoad({
        markets,
        // rewards,
        totalSupplyUsd: totalSupplyUsd.toString(),
        totalBorrowUsd: totalBorrowUsd.toString(),
        userTotalSupplyUsd: userTotalSupplyUsd.toString(),
        userTotalBorrowUsd: userTotalBorrowUsd.toString(),
        totalCollateralUsd: totalCollateralUsd.toString(),
      });
    };
    const getUnitrollerData = () => {
      const calls: Calls[] = [];
      const oTokens: Market[] = Object.values(markets);
      oTokens.forEach((token) => {
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
          console.log("getUnitrollerData error", err);
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
              res[i][0]._hex,
              36 - markets[oTokens[i]].underlyingToken.decimals
            );
          }
          count++;
          formatedData("getUnderlyPrice");
        })
        .catch((err: any) => {
          console.log("getUnderlyPrice error", err);
        });
    };
    const getOTokenLiquidity = () => {
      if (!account) {
        return;
      }
      const underlyingTokens = Object.values(markets).map((market: any) => ({
        ...market.underlyingToken,
        oTokenAddress: market.address,
      }));
      const calls = underlyingTokens.map((token) => ({
        address: token.address,
        name: "balanceOf",
        params: [token.oTokenAddress],
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
              res[i][0]._hex,
              oToken.underlyingToken.decimals
            );
          }
          count++;
          formatedData("getOTokenLiquidity");
        })
        .catch((err: any) => {
          console.log("getOTokenLiquidity error", err);
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
          name: "supplyRatePerSecond",
        },
        {
          address: oToken.address,
          name: "borrowRatePerSecond",
        },
        {
          address: oToken.address,
          name: "balanceOf",
          params: [account],
        },
        {
          address: oToken.address,
          name: "borrowBalanceStored",
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
            res[0][0]._hex,
            10 + oToken.underlyingToken.decimals
          );
          const totalSupply = ethers.utils.formatUnits(
            res[1][0]._hex,
            oToken.decimals
          );
          _cTokensData[oToken.address] = {
            ...oToken,
            exchangeRateStored,
            totalSupply: Big(totalSupply).mul(exchangeRateStored).toString(),
            totalBorrows: ethers.utils.formatUnits(
              res[2][0]._hex,
              oToken.underlyingToken.decimals
            ),
            supplyRatePerTimestamp: ethers.utils.formatUnits(res[3]?.[0]._hex, 18),
            borrowRatePerTimestamp: ethers.utils.formatUnits(res[4]?.[0]._hex, 18),
            userSupply: Big(ethers.BigNumber.from(res[5]?.[0]?._hex ?? 0) as any).times(ethers.BigNumber.from(res[0][0]?._hex ?? 0) as any).div(Math.pow(10, 18 + oToken.underlyingToken.decimals)).toString(),
            userBorrow: res[6] ? ethers.utils.formatUnits(
              res[6][0]._hex,
              oToken.underlyingToken.decimals
            ) : 0,
          };
          if (oTokensLength === 0) {
            count++;
            formatedData("oTokens data");
          }
        })
        .catch((err: any) => {
          console.log("oTokens data error", err);
          // setTimeout(() => {
          //   getCTokenData(oToken);
          // }, 500);
        });
    };
    const getCTokensData = () => {
      Object.values(markets).forEach((market) => {
        getCTokenData(market);
      });
    };

    // const getRewards = () => {
    //   const cTokens = Object.keys(markets);
    //   const calls = [];
    //   cTokens.forEach((token) => {
    //     calls.push({
    //       address: rewardDistributorAddress,
    //       name: "rewardSupplySpeeds",
    //       params: [0, token],
    //     });
    //     calls.push({
    //       address: rewardDistributorAddress,
    //       name: "rewardBorrowSpeeds",
    //       params: [0, token],
    //     });
    //     calls.push({
    //       address: rewardDistributorAddress,
    //       name: "rewardSupplySpeeds",
    //       params: [1, token],
    //     });
    //     calls.push({
    //       address: rewardDistributorAddress,
    //       name: "rewardBorrowSpeeds",
    //       params: [1, token],
    //     });
    //   });
    //   multicall({
    //     abi: REWARD_ABI,
    //     calls,
    //     options: {},
    //     multicallAddress,
    //     provider: Ethers.provider(),
    //   })
    //     .then((res) => {
    //       cTokens.forEach((cToken, i) => {
    //         REWARD_TOKEN.forEach((reward, j) => {
    //           if (!_rewards[reward.symbol]) _rewards[reward.symbol] = {};
    //           const price = prices[reward].symbol || 1;
    //           _rewards[reward.symbol].price = price;
    //           const index = i * 4 + j * 2;
    //           _rewards[reward.symbol][cToken] = {
    //             supply: res[index][0]
    //               ? ethers.utils
    //                   .formatUnits(item[index][0]._hex, 18)
    //                   .mul(price)
    //                   .mul(60 * 60 * 24)
    //               : "0",
    //             borrow: res[index + 1][0]
    //               ? ethers.utils
    //                   .formatUnits(item[index + 1][0]._hex, 18)
    //                   .mul(price)
    //                   .mul(60 * 60 * 24)
    //               : "0",
    //           };
    //         });
    //       });
    //       count++;
    //       formatedData("getRewards");
    //     })
    //     .catch((err) => {
    //       console.log("rewards error", err);
    //     });
    // };
    getUnitrollerData();
    getUnderlyPrice();
    getOTokenLiquidity();
    getWalletBalance();
    getCTokensData();
    // getRewards();
  }, [update, account]);
}

interface Market {
  address: string;
  totalSupply: number;
  totalBorrows: number;
  userSupply: number;
  userBorrow: number;
  supplyRatePerTimestamp: number;
  borrowRatePerTimestamp: number;
}

interface DistributionApy {
  icon: string;
  symbol: string;
  dailyRewards: string;
  price: string;
  unclaimed: string;
}

interface Calls {
  address: string;
  name: string;
  params: any[];
}