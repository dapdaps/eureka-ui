// @ts-nocheck
import * as Accordion from '@radix-ui/react-accordion';
import * as Tabs from '@radix-ui/react-tabs';
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo, useEffect } from 'react';

import Avatar from '@/modules/components/Avatar';
import Button from '@/modules/components/Button';
import ChainWarningBox from '@/modules/components/ChainWarningBox';
import { useMultiState } from '@/modules/hooks';
import { formatValueDecimal } from '@/utils/formate';
import { asyncFetch } from '@/utils/http';

import Pool from './components/Pool';
import {
  AssetsPanel,
  AssetsWrapper,
  EmptyWrap,
  GridContainer,
  GridItem,
  HeadWrapper,
  PoolItem,
  TabsList,
  Wrapper
} from './styles';

const RewardsContractABI = [
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
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
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      }
    ],
    name: 'maxWithdraw',
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
    name: 'newRewardRatio',
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
    name: 'rewardRate',
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
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'rewards',
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
    inputs: [
      {
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256'
      }
    ],
    name: 'convertToShares',
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
const RewardPoolDepositABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_rewardPoolAddress',
        type: 'address'
      },
      {
        internalType: 'contract IERC20',
        name: '_inputToken',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_inputAmount',
        type: 'uint256'
      },
      {
        internalType: 'bytes32',
        name: '_balancerPoolId',
        type: 'bytes32'
      },
      {
        components: [
          {
            internalType: 'contract IAsset[]',
            name: 'assets',
            type: 'address[]'
          },
          {
            internalType: 'uint256[]',
            name: 'maxAmountsIn',
            type: 'uint256[]'
          },
          {
            internalType: 'bytes',
            name: 'userData',
            type: 'bytes'
          },
          {
            internalType: 'bool',
            name: 'fromInternalBalance',
            type: 'bool'
          }
        ],
        internalType: 'struct IBalancerVault.JoinPoolRequest',
        name: '_request',
        type: 'tuple'
      }
    ],
    name: 'depositSingle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
const PoolContractABI = [
  {
    inputs: [{ internalType: 'bytes32', name: 'poolId', type: 'bytes32' }],
    name: 'getPoolTokens',
    outputs: [
      {
        internalType: 'contract IERC20[]',
        name: 'tokens',
        type: 'address[]'
      },
      { internalType: 'uint256[]', name: 'balances', type: 'uint256[]' },
      {
        internalType: 'uint256',
        name: 'lastChangeBlock',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];
const LPTokenABI = [
  {
    inputs: [],
    name: 'getActualSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getSwapFeePercentage',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
];

const globalABI = [
  {
    inputs: [],
    name: 'reductionPerCliff',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'EMISSIONS_MAX_SUPPLY',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
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
    name: 'totalCliffs',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
];

const auraGlobalData = {
  auraMaxSupply: '50000000000000000000000000',
  auraTotalCliffs: '500',
  auraMinterMinted: '0',
  auraReductionPerCliff: '100000000000000000000000',
  auraTotalSupply: '70357299813420858641594656'
};
export default memo(function AuraFinance(props) {
  const {
    toast,
    account,
    provider,
    curChain,
    onSwitchChain,
    switchingChain,
    chainId,
    isChainSupported,
    multicallAddress,
    multicall,
    dexConfig,
    prices
  } = props;

  const { POOLS, TOKENS } = dexConfig;
  const { RewardPoolDepositWrapper, PoolContractWrapper } = dexConfig;
  const initList = POOLS?.map((item) => ({
    ...item,
    swapFee: 0,
    stakedAmount: 0,
    reward: 0
  }));
  const [state, updateState] = useMultiState({
    currentTab: 'TAB_POOL',
    account: '', // current wallet address
    poolsList: initList, //
    myPoolsList: [],
    totalDepositAmount: 0,
    totalRewardsAmount: 0,
    isClaiming: false,
    isAllClaiming: false,
    flag1: false,
    flag2: false,
    flag3: false
  });
  // const account = Ethers.send("eth_requestAccounts", [])[0];

  function initPoolList() {
    for (let i = 0; i < state.poolsList?.length; i++) {
      const item = state.poolsList[i];
      getMultiLPToken(item, i);
      getMultiRewards(item, i);
    }
    getMultiPoolTokens();
  }

  function getMultiRewards(pool, index) {
    const calls = [
      {
        address: pool.Rewards_contract_address,
        name: 'balanceOf',
        params: [account]
      },
      {
        address: pool.Rewards_contract_address,
        name: 'rewardRate'
      },
      {
        address: pool.Rewards_contract_address,
        name: 'totalSupply'
      },
      {
        address: pool.Rewards_contract_address,
        name: 'rewards',
        params: [account]
      }
    ];
    multicall({
      abi: RewardsContractABI,
      calls,
      options: {},
      multicallAddress,
      provider
    })
      .then((res) => {
        const temp = [...state.poolsList];
        const balance = res[0] ? res[0][0] : 0;
        const rewardRate = res[1] ? res[1][0] : 0;
        const totalSupply = res[2] ? res[2][0] : 0;
        const rewards = res[3] ? res[3][0] : 0;
        // console.log(ethers.utils.formatUnits(balance || 0));
        temp[index].rewardRate = rewardRate;
        temp[index].stakedAmount = Big(ethers.utils.formatUnits(balance || 0)).toFixed();
        temp[index].rewardTotalSupply = totalSupply;
        temp[index].reward = Big(ethers.utils.formatUnits(rewards || 0)).toFixed();
        updateState({
          poolsList: temp,
          flag1: true
        });
      })
      .catch((err) => {
        console.log('getMultiRewards_error', err);
      });
  }

  function getMultiLPToken(pool, index) {
    const calls = [
      {
        address: pool.LP_token_address,
        name: 'balanceOf',
        params: [account]
      },
      {
        address: pool.LP_token_address,
        name: 'getActualSupply'
      },
      {
        address: pool.LP_token_address,
        name: 'getSwapFeePercentage'
      }
    ];

    multicall({
      abi: LPTokenABI,
      calls,
      options: {},
      multicallAddress,
      provider
    })
      .then((res) => {
        console.log('getMultiLPToken res:', res);
        const temp = [...state.poolsList];
        // const [[balance], [totalSupply], [swapFeePer]] = res;
        const balance = res[0] ? res[0][0] : ethers.BigNumber.from(0);
        const totalSupply = res[1] ? res[1][0] : ethers.BigNumber.from(0);
        const swapFeePer = res[2] ? res[2][0] : ethers.BigNumber.from(0);

        temp[index].bptAmount = ethers.utils.formatUnits(balance || 0);
        temp[index].bptTotalSupply = totalSupply;
        const _swapFee = Big(ethers.utils.formatUnits(swapFeePer)).mul(100).toFixed();
        temp[index].swapFee = _swapFee;

        updateState({
          poolsList: temp,
          flag2: true
        });
      })
      .catch((err) => {
        console.log('getMultiLPToken_error', err);
      });
  }

  function getMultiPoolTokens() {
    const ids = state.poolsList?.map((item) => item.Balancer_Pool_ID);

    console.log('===ids', ids);
    const calls = ids?.map((id) => ({
      address: PoolContractWrapper,
      name: 'getPoolTokens',
      params: [id]
    }));

    multicall({
      abi: PoolContractABI,
      calls,
      options: {},
      multicallAddress,
      provider
    })
      .then((res) => {
        console.log('getMultiPoolTokens res:', res);
        const temp = [...state.poolsList];
        for (let i = 0; i < res.length; i++) {
          const addrArray = res[i][0];
          const tokenBalArray = res[i][1];
          temp[i].tokenAssets = addrArray;
          temp[i].tokenBalance = tokenBalArray;
          temp[i].tokens = addrArray ? addrArray.map((addr) => TOKENS[addr]?.symbol) : [];
        }
        updateState({
          poolsList: temp,
          flag3: true
        });
      })
      .catch((err) => {
        console.log('getMultiPoolTokens_error', err);
      });
  }

  function getMultiGlobal() {
    const globalAddress = '0xC0c293ce456fF0ED870ADd98a0828Dd4d2903DBF';
    const calls = [
      {
        address: globalAddress,
        name: 'reductionPerCliff'
      },
      {
        address: globalAddress,
        name: 'EMISSIONS_MAX_SUPPLY'
      },
      {
        address: globalAddress,
        name: 'totalSupply'
      },
      {
        address: globalAddress,
        name: 'totalCliffs'
      }
    ];

    multicall({
      abi: globalABI,
      calls,
      options: {},
      multicallAddress,
      provider
    })
      .then((res) => {
        console.log('getMultiGlobal res:', res);
      })
      .catch((err) => {
        console.log('getMultiGlobal error', err);
      });
  }

  function getAuraMintAmount(balEarned, global) {
    const reductionPerCliff = ethers.BigNumber.from(global.auraReductionPerCliff);
    const maxSupply = ethers.BigNumber.from(global.auraMaxSupply);
    const totalSupply = ethers.BigNumber.from(global.auraTotalSupply);
    const totalCliffs = ethers.BigNumber.from(global.auraTotalCliffs);
    const minterMinted = ethers.BigNumber.from(0);

    // e.g. emissionsMinted = 6e25 - 5e25 - 0 = 1e25;
    const emissionsMinted = totalSupply.sub(maxSupply).sub(minterMinted);

    // e.g. reductionPerCliff = 5e25 / 500 = 1e23
    // e.g. cliff = 1e25 / 1e23 = 100
    const cliff = emissionsMinted.div(reductionPerCliff);

    // e.g. 100 < 500
    if (cliff.lt(totalCliffs)) {
      // e.g. (new) reduction = (500 - 100) * 2.5 + 700 = 1700;
      // e.g. (new) reduction = (500 - 250) * 2.5 + 700 = 1325;
      // e.g. (new) reduction = (500 - 400) * 2.5 + 700 = 950;
      const reduction = totalCliffs.sub(cliff).mul(5).div(2).add(700);
      // e.g. (new) amount = 1e19 * 1700 / 500 =  34e18;
      // e.g. (new) amount = 1e19 * 1325 / 500 =  26.5e18;
      // e.g. (new) amount = 1e19 * 950 / 500  =  19e17;
      // let amount = simpleToExact(balEarned).mul(reduction).div(totalCliffs);
      let amount = ethers.utils.parseUnits(balEarned).mul(reduction).div(totalCliffs);

      // e.g. amtTillMax = 5e25 - 1e25 = 4e25
      const amtTillMax = maxSupply.sub(emissionsMinted);
      if (amount.gt(amtTillMax)) {
        amount = amtTillMax;
      }

      return amount;
    }

    return ethers.BigNumber.from(0);
  }
  function calcTVL(dataList) {
    const temp = [...state.poolsList];

    console.log('====dataList', dataList);
    for (let i = 0; i < temp.length; i++) {
      console.log('===temp[i]', temp[i]);
      const tokens = temp[i].tokens;
      const tokenBalance = temp[i].tokenBalance;
      const bptTotalSupply = temp[i].bptTotalSupply;
      const rewardTotalSupply = temp[i].rewardTotalSupply;
      const rewardRate = temp[i].rewardRate;

      if (tokens && tokenBalance && bptTotalSupply && rewardTotalSupply) {
        try {
          const sum = tokens?.reduce((total, cur, j) => {
            if (cur) {
              const price = prices[cur] || 0;

              return Big(total)
                .plus(Big(ethers.utils.formatUnits(tokenBalance[j] || 0)).times(Big(price || 0)))
                .toFixed();
            } else {
              return total;
            }
          }, 0);
          const bptPriceUsd = Big(sum).div(Big(bptTotalSupply));
          const TVL = Big(rewardTotalSupply).times(bptPriceUsd).toFixed(0);
          temp[i].bptPriceUsd = bptPriceUsd;
          const pool = dataList.find(
            (data) => data?.lpToken?.address.toLocaleLowerCase() === temp[i]?.LP_token_address.toLocaleLowerCase()
          );
          if (
            ['0x7644fa5d0ea14fcf3e813fdf93ca9544f8567655', '0x66888e4f35063ad8bb11506a6fde5024fb4f1db0'].indexOf(
              temp[i]?.LP_token_address
            ) > -1
          ) {
            console.log('====11111=====');
            temp[i].TVL = pool?.balancerPool?.totalLiquidity?.tvl?.calculated;
          } else {
            temp[i].TVL = TVL;
          }

          // calc bal apr
          temp[i].APR = 0;
          temp[i].pjAPR = 0;
          pool?.aprs?.breakdown?.forEach((item) => {
            temp[i].APR += item?.value;
          });
          pool?.aprs?.projectedBreakdown?.forEach((item) => {
            temp[i].pjAPR += item?.value;
          });
          console.log('====APR', temp[i].APR);
        } catch (error) {
          console.log('calcTVL_error', error);
        }
      }
    }
    updateState({
      poolsList: temp
    });
  }

  const handleChangeTabs = (value) => {
    updateState({
      currentTab: value
    });
  };
  const getPoolIcon = (tokenAssets) => {
    if (tokenAssets) {
      const icons = tokenAssets?.map((addr, index) => TOKENS[addr]?.icon);
      const usefulIcons = icons.filter((n) => n);
      return usefulIcons;
    } else {
      return [];
    }
  };

  const renderPoolIcon = (tokenAssets) => {
    const icons = getPoolIcon(tokenAssets);

    if (icons) {
      return icons.map((addr, index) => {
        return (
          <span key={index} style={{ marginRight: -12 }}>
            <Avatar src={addr} />
          </span>
        );
      });
    }
  };

  const handleClaim = (address, index) => {
    const temp = [...state.myPoolsList];
    temp[index].isClaiming = true;
    updateState({
      myPoolsList: temp
    });
    const ClaimRewardsContract = new ethers.Contract(
      address,
      [
        {
          inputs: [
            {
              internalType: 'address',
              name: '_account',
              type: 'address'
            },
            {
              internalType: 'bool',
              name: '_claimExtras',
              type: 'bool'
            }
          ],
          name: 'getReward',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool'
            }
          ],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      provider.getSigner()
    );

    return ClaimRewardsContract.getReward(account, true)
      .then((tx) => {
        console.log('tx: ', tx);
        tx.wait()
          .then((res) => {
            const { status, transactionHash } = res;
            console.info('tx_res: ', res);
            if (status === 1) {
              toast.success?.({
                title: 'Transaction Successful!',
                text: `transactionHash ${transactionHash}`
              });
            } else {
              toast.fail?.({
                title: 'Transaction Failed!',
                text: `transactionHash ${transactionHash}`
              });
            }
          })
          .finally(() => {
            const temp = [...state.myPoolsList];
            temp[index].isClaiming = false;
            updateState({
              myPoolsList: temp
            });
          });
      })
      .catch((err) => {
        console.log('getPoolTokens_error:', err);
        const temp = [...state.myPoolsList];
        temp[index].isClaiming = false;
        updateState({
          myPoolsList: temp
        });
      });
  };

  const handleClaimAll = () => {
    updateState({
      isAllClaiming: true
    });
    const getClaimAllArray = [];

    for (let i = 0; i < state.myPoolsList.length; i++) {
      const addr = state.myPoolsList[i].Rewards_contract_address;
      getClaimAllArray.push(handleClaim(addr));
    }
    Promise.allSettled(getClaimAllArray)
      .then((res) => {
        console.info('getClaimAllArray: ', res);
      })
      .catch((error) => {
        console.info('getClaimAllArray: ', error);
      })
      .finally(() => {
        updateState({
          isAllClaiming: false
        });
      });
  };
  const getDataList = function (callback) {
    asyncFetch('https://data.aura.finance/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        operationName: 'Pools',
        variables: { chainId: 100, account: '0x5caf809086b2d77ec6cb54932e48b3bbb6546c53' },
        query:
          'query Pools($chainId: Int! = 1, $account: String = "") {\n  pools(chainId: $chainId) {\n    ...PoolAll\n    account(id: $account) {\n      id\n      staked\n      rewards {\n        earned\n        earnedUSD\n        reward {\n          id\n          expired\n          isMintedAura\n          lastUpdateTime\n          periodFinish\n          queuedRewards\n          rewardPerTokenStored\n          rewardPerYear\n          rewardRate\n          token {\n            ...Token\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  allSystem(chainIds: [1, 10, 137, 42161]) {\n    auraBalTotalSupply\n    isShutdown\n    chainId\n    __typename\n  }\n  allBlocks(chainIds: [1, 10, 100, 137, 1101, 42161, 43114]) {\n    chainId\n    number\n    __typename\n  }\n}\n\nfragment PoolAll on PoolSchema {\n  id\n  address\n  addedAt\n  balancerPoolId\n  balancerPool {\n    totalLiquidity\n    factory\n    balancerTokenIds\n    __typename\n  }\n  boost\n  chainId\n  gauge\n  stash\n  isShutdown\n  isPhantomPool\n  name\n  price\n  prevIds: prevPoolIds\n  rewardPool\n  totalStaked\n  totalSupply\n  tvl\n  lpToken {\n    ...Token\n    __typename\n  }\n  rewards {\n    id\n    expired\n    isMintedAura\n    lastUpdateTime\n    periodFinish\n    queuedRewards\n    rewardPerTokenStored\n    rewardPerYear\n    rewardRate\n    token {\n      ...Token\n      __typename\n    }\n    __typename\n  }\n  extraRewards {\n    id\n    amount\n    token {\n      ...Token\n      __typename\n    }\n    funded {\n      id\n      epoch\n      amount\n      __typename\n    }\n    queued {\n      id\n      epoch\n      amount\n      __typename\n    }\n    __typename\n  }\n  token {\n    ...Token\n    __typename\n  }\n  tokens {\n    ...Token\n    __typename\n  }\n  tokenWeights\n  aprs {\n    breakdown {\n      id\n      token {\n        ...Token\n        __typename\n      }\n      name\n      value\n      isExtraBalancerRewards\n      isExtraAuraRewards\n      isBalancerYield\n      __typename\n    }\n    stakingToken {\n      ...Token\n      __typename\n    }\n    total\n    projectedBreakdown {\n      id\n      token {\n        ...Token\n        __typename\n      }\n      name\n      value\n      isExtraBalancerRewards\n      isExtraAuraRewards\n      isBalancerYield\n      __typename\n    }\n    projectedTotal\n    __typename\n  }\n  __typename\n}\n\nfragment Token on TokenSchema {\n  __typename\n  chainId\n  address\n  decimals\n  symbol\n  name\n  price\n  l1Token {\n    address\n    chainId\n    symbol\n    decimals\n    name\n    __typename\n  }\n}'
      })
    }).then((result) => {
      callback && callback(result?.data?.pools);
    });
  };

  useEffect(() => {
    updateState({ account });
    if (account && isChainSupported) {
      initPoolList();
    }
  }, [account, isChainSupported]);

  useEffect(() => {
    if (state.flag1 && state.flag2 && state.flag3) {
      try {
        const totalDepositAmount = state.poolsList.reduce((total, cur) => {
          return Big(cur.stakedAmount || 0)
            .plus(total)
            .toFixed(2);
        }, 0);
        const totalRewardsAmount = state.poolsList.reduce((total, cur) => {
          return Big(cur.reward || 0)
            .plus(total)
            .toFixed(2);
        }, 0);

        const temp = state.poolsList.filter((item) => Big(item.stakedAmount || 0).gt(0));
        const _myPools = temp.map((item) => ({ ...item, isClaiming: false }));
        getDataList(calcTVL);
        updateState({
          totalDepositAmount,
          totalRewardsAmount,
          myPoolsList: _myPools
        });
      } catch (error) {
        console.log(333, error);
      }
    }
  }, [state.flag1, state.flag2, state.flag3]);
  console.info('STATE: ', state);
  return (
    <Wrapper>
      <Tabs.Root value={state.currentTab} onValueChange={handleChangeTabs}>
        <TabsList>
          <Tabs.Trigger value="TAB_POOL" asChild>
            <div className={`tab-head-item ${state.currentTab === 'TAB_POOL' ? 'active' : ''}`}>All Pools</div>
          </Tabs.Trigger>
          <Tabs.Trigger value="TAB_ASSETS" asChild>
            <div className={`tab-head-item ${state.currentTab === 'TAB_ASSETS' ? 'active' : ''}`}>Your Assets</div>
          </Tabs.Trigger>
        </TabsList>
        <Tabs.Content value="TAB_POOL">
          <GridContainer className="grid-pool-head">
            <GridItem>Pool</GridItem>
            <GridItem>APR</GridItem>
            <GridItem>TVL</GridItem>
            <GridItem>You Staked</GridItem>
            <GridItem>Your rewards</GridItem>
          </GridContainer>
          <Accordion.Root type="single" collapsible>
            {state.poolsList?.map((item, index) => (
              <PoolItem key={index}>
                <Pool
                  key={item.poolName}
                  {...{
                    ...props,
                    data: item,
                    account: state.account,
                    TOKENS,
                    RewardPoolDepositWrapper,
                    RewardPoolDepositABI,
                    tokenIcons: getPoolIcon(item.tokenAssets)
                  }}
                />
              </PoolItem>
            ))}
          </Accordion.Root>
        </Tabs.Content>
        <Tabs.Content value="TAB_ASSETS">
          <AssetsWrapper>
            <AssetsPanel>
              <div className="as-title">You deposit</div>
              <div className="as-amount">${state.totalDepositAmount}</div>
            </AssetsPanel>
            <AssetsPanel>
              <div className="as-title">Claimable Rewards</div>
              <div className="as-action">
                <div className="as-amount">
                  ${state.totalRewardsAmount}
                  <span className="as-sub"></span>
                </div>
                {state.myPoolsList.length ? (
                  <Button
                    {...{
                      text: 'Claim All',
                      type: 'primary',
                      style: { width: 118 },
                      loading: state.isAllClaiming,
                      disabled: !state.myPoolsList.length,
                      onClick: handleClaimAll
                    }}
                  />
                ) : null}
              </div>
            </AssetsPanel>
          </AssetsWrapper>
          {state.myPoolsList.length ? (
            <GridContainer className="grid-pool-head">
              <GridItem>Pool</GridItem>
              <GridItem>APR</GridItem>
              <GridItem>You Staked</GridItem>
              <GridItem>Your rewards</GridItem>
              <GridItem className="action-item-head">Action</GridItem>
            </GridContainer>
          ) : null}

          <HeadWrapper>
            {state.myPoolsList.length ? (
              state.myPoolsList?.map((item, index) => (
                <PoolItem key={index}>
                  <GridContainer className="pool-head">
                    <GridItem>
                      <div className="title-primary">
                        {renderPoolIcon(item.tokenAssets)}

                        <span style={{ marginLeft: 20 }}>{item.poolName}</span>
                      </div>
                    </GridItem>
                    <GridItem>
                      <div className="title-secondary">{Big(item.APR || 0).toFixed(2)}%</div>
                      <div className="title-sub">proj.{Big(item.pjAPR).toFixed(2)} %</div>
                    </GridItem>
                    <GridItem>
                      <div className="title-secondary">{formatValueDecimal(item.stakedAmount, '', 2)}</div>
                    </GridItem>
                    <GridItem>
                      <div className="title-secondary">{formatValueDecimal(item.reward, '', 2)}</div>
                      <div className="title-sub"></div>
                    </GridItem>
                    <GridItem className="action-item">
                      {Big(item.reward).gt(0) ? (
                        <Button
                          {...{
                            text: 'Claim',
                            type: 'primary',
                            style: { width: 118 },
                            loading: item.isClaiming,
                            onClick: () => {
                              handleClaim(item.Rewards_contract_address, index);
                            }
                          }}
                        />
                      ) : (
                        <Button
                          {...{
                            text: 'Claim',
                            type: 'primary',
                            disabled: true,
                            style: { width: 118 }
                          }}
                        />
                      )}
                    </GridItem>
                  </GridContainer>
                </PoolItem>
              ))
            ) : (
              <EmptyWrap>
                <div className="empty-title">No productive assets detected</div>
                <div className="empty-intro">
                  Head over to the pools list and make a deposit to start earning yield!
                </div>
              </EmptyWrap>
            )}
          </HeadWrapper>
        </Tabs.Content>
      </Tabs.Root>
      {!isChainSupported && (
        <ChainWarningBox
          chain={curChain}
          onSwitchChain={onSwitchChain}
          switchingChain={switchingChain}
          theme={dexConfig.theme}
        />
      )}
    </Wrapper>
  );
});
