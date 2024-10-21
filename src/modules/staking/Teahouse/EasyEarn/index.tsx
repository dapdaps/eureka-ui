import axios from 'axios';
import { Contract, providers, utils } from 'ethers';
import { useEffect, useState } from 'react';

import chainCofig from '@/config/chains';
import multicallConfig from '@/config/contract/multicall';
import useAccount from '@/hooks/useAccount';
import DepositModal from '@/modules/staking/Teahouse/EasyEarn/Deposit';
import WithdrawModal from '@/modules/staking/Teahouse/EasyEarn/Withdraw';
import { multicall } from '@/utils/multicall';

const TeahouseEasyEarn = (props: any) => {
  const { dexConfig } = props;

  const { account, provider } = useAccount();

  const { easyEarn } = dexConfig;

  const { pools, shareInfoApi } = easyEarn;
  const tokenList: any = [];
  const shareInfoList: any = [];
  for (const _chainId in pools) {
    const chainId = +_chainId;
    // @ts-ignore
    const currChain = chainCofig[chainId];
    const multicallAddress = multicallConfig[currChain.chainId];
    const _pools = pools[chainId];
    Object.values(_pools).forEach((pool: any) => {
      const tokenIdx = tokenList.findIndex((token: any) => token.symbol === pool.token.symbol);
      if (tokenIdx < 0) {
        tokenList.push({
          icon: pool.token.icon,
          symbol: pool.token.symbol,
          chainList: [
            {
              ...currChain,
              multicallAddress,
              pool
            }
          ]
        });
        shareInfoList.push(axios.get(shareInfoApi({ account, chainId, address: pool.address })));
        return;
      }
      tokenList[tokenIdx].chainList.push({
        ...currChain,
        multicallAddress,
        pool
      });
      shareInfoList.push(axios.get(shareInfoApi({ account, chainId, address: pool.address })));
    });
  }

  console.log('>>>>>>>> tokenList：: %o', tokenList);
  console.log('>>>>>>>> props：: %o', props);

  const [depositVisible, setDepositVisible] = useState(false);
  const [withdrawVisible, setWithdrawVisible] = useState(false);
  const [data, setData] = useState<any>({});

  const handleDeposit = (token: any) => {
    setData(token);
    setDepositVisible(true);
  };

  const handleWithdraw = (token: any) => {
    setData(token);
    setWithdrawVisible(true);
  };

  const handleClose = () => {
    setDepositVisible(false);
    setWithdrawVisible(false);
    setData({});
  };

  useEffect(() => {
    if (!account) return;
    Promise.all(shareInfoList).then((res: any) => {
      console.log('>>>>>>>> shareInfoList：: %o', res);
    });
  }, [account]);

  return (
    <div className="w-[1076px] flex items-stretch justify-between gap-[12px] flex-wrap">
      {tokenList.map((it: any) => (
        <div
          key={it.symbol}
          className="w-[260px] h-[254px] relative border border-[#373A53!important] rounded-[16px] bg-[#33364b]"
        >
          <div className="w-full absolute left-0 top-0 px-[16px] pt-[16px] pb-[14px] rounded-[16px] border-b border-[#373A53!important] bg-[#262836]">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-[6px]">
                <img className="w-[36px] h-[36px]" src={it.icon} alt="" />
                <div className="text-white text-[16px] font-[500]">{it.symbol}</div>
              </div>
              <div className="flex items-center gap-[6px] justify-end">
                {it.chainList.map((c: any) => (
                  <img key={c.chainId} className="w-[20px] h-[20px] rounded-[4px]" src={c.icon} alt="" />
                ))}
              </div>
            </div>
            <div className="flex justify-between items-start mt-[26px]">
              <div className="flex flex-col gap-[5px] leading-[1]">
                <div className="text-[#979ABE] text-[14px] font-[400]">APR%</div>
                <div className="text-white text-[20px] font-[700]">5-10%</div>
              </div>
              <div className="flex flex-col gap-[5px] leading-[1]">
                <div className="text-[#979ABE] text-[14px] font-[400]">AUM</div>
                <div className="text-white text-[20px] font-[700]">3.39k</div>
                <div className="text-white text-[12px] font-[400] mt-[-3px]">$795.37k</div>
              </div>
            </div>
            <div className="flex justify-between items-start gap-[10px] mt-[20px]">
              <button
                type="button"
                className="flex-1 h-[40px] rounded-[8px] bg-[#B4E9CB] border border-[#B4E9CB] text-center leading-[38px] text-black text-[16px] font-[600]"
                onClick={() => handleDeposit(it)}
              >
                Deposit
              </button>
              <button
                type="button"
                className="flex-1 h-[40px] rounded-[8px] bg-[#262836] border border-[#B4E9CB] text-center leading-[38px] text-[#B4E9CB] text-[16px] font-[600]"
                onClick={() => handleWithdraw(it)}
              >
                Withdraw
              </button>
            </div>
          </div>
          <div className="flex justify-between items-end absolute w-full bottom-[16px] left-[0] px-[16px]">
            <div
              className="text-[#979ABE] text-[14px] font-[400]"
              onClick={() => {
                const arb = it.chainList.find((c: any) => c.chainId === 42161);

                console.log('>>>>>>>> it：: %o', it);
                console.log('>>>>>>>> arb：: %o', arb);

                const chainConfig = chainCofig[42161];
                console.log(chainConfig.rpcUrls[0]);
                const providerRpc = new providers.JsonRpcProvider(chainConfig.rpcUrls[0]);
                const contract = new Contract(arb.pool.address, ABI_1, providerRpc);
                // contract.requestedFunds(account).then((res: any) => {
                //   console.log('requestedFunds: %o', res);
                // });
                // contract.claimOwedShares(account).then((res: any) => {
                //   console.log('claimOwedShares: %o', res);
                // });
                // contract.balanceOf(account).then((res: any) => {
                //   console.log('balanceOf: %o', res);
                // });
                contract
                  .totalSupply()
                  .then((res: any) => {
                    console.log('totalSupply: %o', utils.formatUnits(res.toString(), 18));
                  })
                  .catch((err: any) => {
                    console.log('totalSupply error: %o', err);
                  });
                // contract.fundConfig().then((res: any) => {
                //   console.log('fundConfig: %o', res);
                // });
                // contract.feeConfig().then((res: any) => {
                //   console.log('feeConfig: %o', res);
                // });
                // contract.globalState().then((res: any) => {
                //   console.log('globalState: %o', res);
                // });
                // contract.allowance(account, arb.pool.address).then((res: any) => {
                //   console.log('allowance: %o', res);
                // });
                // contract.decimals().then((res: any) => {
                //   console.log('decimals: %o', res);
                // });
                // contract.symbol().then((res: any) => {
                //   console.log('symbol: %o', res);
                // });

                multicall({
                  abi: ABI_1,
                  options: {},
                  calls: [
                    {
                      address: arb.pool.address,
                      name: 'decimals',
                      params: []
                    },
                    {
                      address: arb.pool.address,
                      name: 'symbol',
                      params: []
                    },
                    {
                      address: arb.pool.address,
                      name: 'balanceOf',
                      params: [account]
                    },
                    {
                      address: arb.pool.address,
                      name: 'globalState',
                      params: []
                    },
                    {
                      address: arb.pool.address,
                      name: 'allowance',
                      params: [account, arb.pool.address]
                    },
                    {
                      address: arb.pool.address,
                      name: 'feeConfig',
                      params: []
                    },
                    {
                      address: arb.pool.address,
                      name: 'fundConfig',
                      params: []
                    },
                    {
                      address: arb.pool.address,
                      name: 'totalSupply',
                      params: []
                    },
                    {
                      address: arb.pool.address,
                      name: 'requestedFunds',
                      params: [account]
                    },
                    {
                      address: arb.pool.address,
                      name: 'claimOwedShares',
                      params: [account]
                    },
                    {
                      address: arb.pool.address,
                      name: 'userState',
                      params: [account]
                    }
                  ],
                  multicallAddress: arb.multicallAddress,
                  provider: providerRpc
                })
                  .then((res: any) => {
                    const [
                      decimals,
                      symbol,
                      balanceOf,
                      globalState,
                      allowance,
                      feeConfig,
                      fundConfig,
                      totalSupply,
                      requestedFunds,
                      userState
                    ] = res;

                    const _decimals = decimals[0];
                    const _symbol = symbol[0];
                    const _totalSupply = utils.formatUnits(totalSupply[0].toString(), _decimals);
                    const _balance = utils.formatUnits(balanceOf ? balanceOf[0] : '0', _decimals);
                    const _allowance = utils.formatUnits(allowance ? allowance[0] : '0', _decimals);
                    console.log('decimals: %o', _decimals);
                    console.log('symbol: %o', _symbol);
                    console.log('totalSupply: %o', _totalSupply);
                    console.log('balance: %o', _balance);
                    console.log('allowance: %o', _allowance);
                    console.log('feeConfig: %o', feeConfig);
                    console.log('fundConfig: %o', fundConfig);
                    console.log('requestedFunds: %o', requestedFunds);
                    console.log('userState: %o', userState);

                    contract.cycleState(globalState.cycleIndex).then((res: any) => {
                      console.log('cycleState: %o', res);
                    });
                  })
                  .catch((err: any) => {
                    console.log(err);
                  });

                return;

                multicall({
                  abi: ABI_1,
                  options: {},
                  calls: [
                    {
                      address: arb.pool.address,
                      name: 'requestedFunds',
                      params: [account]
                    },
                    {
                      address: arb.pool.address,
                      name: 'cycleState',
                      params: [23]
                    },
                    {
                      address: arb.pool.address,
                      name: 'allowance',
                      params: [account, arb.pool.address]
                    }
                  ],
                  multicallAddress: arb.multicallAddress,
                  provider: provider
                })
                  .then((res: any) => {
                    console.log(res);
                  })
                  .catch((err: any) => {
                    console.log(err);
                  });
              }}
            >
              My Assets
            </div>
            <div className="text-white text-[14px] font-[600]">0</div>
          </div>
        </div>
      ))}
      {data && <DepositModal visible={depositVisible} onClose={handleClose} data={data} name={props.name} />}
      {data && <WithdrawModal visible={withdrawVisible} onClose={handleClose} data={data} name={props.name} />}
    </div>
  );
};

export default TeahouseEasyEarn;

// 0x0a0432f56be94c1dc03dc05aae1e0e306dedd91a
// 18
// TEAUSDC
const ABI_1 = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string'
      },
      {
        internalType: 'string',
        name: '_symbol',
        type: 'string'
      },
      {
        internalType: 'address',
        name: '_asset',
        type: 'address'
      },
      {
        internalType: 'uint128',
        name: '_priceNumerator',
        type: 'uint128'
      },
      {
        internalType: 'uint128',
        name: '_priceDenominator',
        type: 'uint128'
      },
      {
        internalType: 'uint256',
        name: '_mintAmount',
        type: 'uint256'
      },
      {
        internalType: 'uint64',
        name: '_startTimestamp',
        type: 'uint64'
      },
      {
        internalType: 'address',
        name: '_initialAdmin',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [],
    name: 'CancelDepositDisabled',
    type: 'error'
  },
  {
    inputs: [],
    name: 'CancelWithdrawDisabled',
    type: 'error'
  },
  {
    inputs: [],
    name: 'DepositDisabled',
    type: 'error'
  },
  {
    inputs: [],
    name: 'ExceedDepositLimit',
    type: 'error'
  },
  {
    inputs: [],
    name: 'FundIsClosed',
    type: 'error'
  },
  {
    inputs: [],
    name: 'FundIsNotClosed',
    type: 'error'
  },
  {
    inputs: [],
    name: 'FundingLocked',
    type: 'error'
  },
  {
    inputs: [],
    name: 'IncorrectCycleIndex',
    type: 'error'
  },
  {
    inputs: [],
    name: 'IncorrectCycleStartTimestamp',
    type: 'error'
  },
  {
    inputs: [],
    name: 'IncorrectVaultAddress',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidFeePercentage',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidFundValue',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidInitialPrice',
    type: 'error'
  },
  {
    inputs: [],
    name: 'NoDeposits',
    type: 'error'
  },
  {
    inputs: [],
    name: 'NotEnoughAssets',
    type: 'error'
  },
  {
    inputs: [],
    name: 'NotEnoughDeposits',
    type: 'error'
  },
  {
    inputs: [],
    name: 'NotEnoughWithdrawals',
    type: 'error'
  },
  {
    inputs: [],
    name: 'OnlyAvailableToAdmins',
    type: 'error'
  },
  {
    inputs: [],
    name: 'OnlyAvailableToAuditors',
    type: 'error'
  },
  {
    inputs: [],
    name: 'ReceiverDoNotHasNFT',
    type: 'error'
  },
  {
    inputs: [],
    name: 'WithdrawDisabled',
    type: 'error'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'Approval',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256'
      }
    ],
    name: 'ClaimOwedAssets',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint32',
        name: 'cycleIndex',
        type: 'uint32'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256'
      }
    ],
    name: 'ConvertToAssets',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint32',
        name: 'cycleIndex',
        type: 'uint32'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256'
      }
    ],
    name: 'ConvertToShares',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint32',
        name: 'cycleIndex',
        type: 'uint32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256'
      }
    ],
    name: 'DepositCanceled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint32',
        name: 'cycleIndex',
        type: 'uint32'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'depositLimit',
        type: 'uint256'
      }
    ],
    name: 'DepositLimitUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint32',
        name: 'cycleIndex',
        type: 'uint32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256'
      }
    ],
    name: 'DepositRequested',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint32',
        name: 'cycleIndex',
        type: 'uint32'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'teaVaultV2',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'DepositToVault',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint32',
        name: 'cycleIndex',
        type: 'uint32'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'disableChecks',
        type: 'bool'
      }
    ],
    name: 'DisableNFTChecks',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint32',
        name: 'cycleIndex',
        type: 'uint32'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fundValue',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'priceNumerator',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'priceDenominator',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'depositLimit',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'startTimestamp',
        type: 'uint64'
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'lockTimestamp',
        type: 'uint64'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'fundClosed',
        type: 'bool'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'platformFee',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'managerFee',
        type: 'uint256'
      }
    ],
    name: 'EnterNextCycle',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint32',
        name: 'cycleIndex',
        type: 'uint32'
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'platformVault',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'managerVault',
            type: 'address'
          },
          {
            internalType: 'uint24',
            name: 'platformEntryFee',
            type: 'uint24'
          },
          {
            internalType: 'uint24',
            name: 'managerEntryFee',
            type: 'uint24'
          },
          {
            internalType: 'uint24',
            name: 'platformExitFee',
            type: 'uint24'
          },
          {
            internalType: 'uint24',
            name: 'managerExitFee',
            type: 'uint24'
          },
          {
            internalType: 'uint24',
            name: 'platformPerformanceFee',
            type: 'uint24'
          },
          {
            internalType: 'uint24',
            name: 'managerPerformanceFee',
            type: 'uint24'
          },
          {
            internalType: 'uint24',
            name: 'platformManagementFee',
            type: 'uint24'
          },
          {
            internalType: 'uint24',
            name: 'managerManagementFee',
            type: 'uint24'
          }
        ],
        indexed: false,
        internalType: 'struct IHighTableVault.FeeConfig',
        name: 'feeConfig',
        type: 'tuple'
      }
    ],
    name: 'FeeConfigChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'priceNumerator',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'priceDenominator',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'startTimestamp',
        type: 'uint64'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'admin',
        type: 'address'
      }
    ],
    name: 'FundInitialized',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint32',
        name: 'cycleIndex',
        type: 'uint32'
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'lockTimestamp',
        type: 'uint64'
      }
    ],
    name: 'FundLockingTimestampUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint32',
        name: 'cycleIndex',
        type: 'uint32'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'disableDepositing',
        type: 'bool'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'disableWithdrawing',
        type: 'bool'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'disableCancelDepositing',
        type: 'bool'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'disableCancelWithdrawing',
        type: 'bool'
      }
    ],
    name: 'FundingChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint32',
        name: 'cycleIndex',
        type: 'uint32'
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'nfts',
        type: 'address[]'
      }
    ],
    name: 'NFTEnabled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32'
      }
    ],
    name: 'RoleAdminChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'RoleGranted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'RoleRevoked',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'Transfer',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint32',
        name: 'cycleIndex',
        type: 'uint32'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'teaVaultV2',
        type: 'address'
      }
    ],
    name: 'UpdateTeaVaultV2',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint32',
        name: 'cycleIndex',
        type: 'uint32'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'teaVaultV2',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'WithdrawFromVault',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint32',
        name: 'cycleIndex',
        type: 'uint32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256'
      }
    ],
    name: 'WithdrawalCanceled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint32',
        name: 'cycleIndex',
        type: 'uint32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256'
      }
    ],
    name: 'WithdrawalRequested',
    type: 'event'
  },
  {
    inputs: [],
    name: 'AUDITOR_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'SECONDS_IN_A_YEAR',
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
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address'
      }
    ],
    name: 'allowance',
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
        name: 'spender',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'asset',
    outputs: [
      {
        internalType: 'address',
        name: 'assetTokenAddress',
        type: 'address'
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
        internalType: 'uint256',
        name: '_assets',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_receiver',
        type: 'address'
      }
    ],
    name: 'cancelDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_shares',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_receiver',
        type: 'address'
      }
    ],
    name: 'cancelWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_assets',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_receiver',
        type: 'address'
      }
    ],
    name: 'claimAndRequestDeposit',
    outputs: [
      {
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_shares',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_owner',
        type: 'address'
      }
    ],
    name: 'claimAndRequestWithdraw',
    outputs: [
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_receiver',
        type: 'address'
      }
    ],
    name: 'claimOwedAssets',
    outputs: [
      {
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_receiver',
        type: 'address'
      }
    ],
    name: 'claimOwedFunds',
    outputs: [
      {
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_receiver',
        type: 'address'
      }
    ],
    name: 'claimOwedShares',
    outputs: [
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_shares',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_owner',
        type: 'address'
      }
    ],
    name: 'closePosition',
    outputs: [
      {
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_receiver',
        type: 'address'
      }
    ],
    name: 'closePositionAndClaim',
    outputs: [
      {
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'closePrice',
    outputs: [
      {
        internalType: 'uint128',
        name: 'numerator',
        type: 'uint128'
      },
      {
        internalType: 'uint128',
        name: 'denominator',
        type: 'uint128'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32'
      }
    ],
    name: 'cycleState',
    outputs: [
      {
        internalType: 'uint128',
        name: 'totalFundValue',
        type: 'uint128'
      },
      {
        internalType: 'uint128',
        name: 'fundValueAfterRequests',
        type: 'uint128'
      },
      {
        internalType: 'uint128',
        name: 'requestedDeposits',
        type: 'uint128'
      },
      {
        internalType: 'uint128',
        name: 'convertedDeposits',
        type: 'uint128'
      },
      {
        internalType: 'uint128',
        name: 'requestedWithdrawals',
        type: 'uint128'
      },
      {
        internalType: 'uint128',
        name: 'convertedWithdrawals',
        type: 'uint128'
      }
    ],
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
        name: 'spender',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'subtractedValue',
        type: 'uint256'
      }
    ],
    name: 'decreaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256'
      }
    ],
    name: 'depositToVault',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: '_cycleIndex',
        type: 'uint32'
      },
      {
        internalType: 'uint128',
        name: '_fundValue',
        type: 'uint128'
      },
      {
        internalType: 'uint128',
        name: '_depositLimit',
        type: 'uint128'
      },
      {
        internalType: 'uint128',
        name: '_withdrawAmount',
        type: 'uint128'
      },
      {
        internalType: 'uint64',
        name: '_cycleStartTimestamp',
        type: 'uint64'
      },
      {
        internalType: 'uint64',
        name: '_fundingLockTimestamp',
        type: 'uint64'
      },
      {
        internalType: 'bool',
        name: '_closeFund',
        type: 'bool'
      }
    ],
    name: 'enterNextCycle',
    outputs: [
      {
        internalType: 'uint256',
        name: 'platformFee',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'managerFee',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'feeConfig',
    outputs: [
      {
        internalType: 'address',
        name: 'platformVault',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'managerVault',
        type: 'address'
      },
      {
        internalType: 'uint24',
        name: 'platformEntryFee',
        type: 'uint24'
      },
      {
        internalType: 'uint24',
        name: 'managerEntryFee',
        type: 'uint24'
      },
      {
        internalType: 'uint24',
        name: 'platformExitFee',
        type: 'uint24'
      },
      {
        internalType: 'uint24',
        name: 'managerExitFee',
        type: 'uint24'
      },
      {
        internalType: 'uint24',
        name: 'platformPerformanceFee',
        type: 'uint24'
      },
      {
        internalType: 'uint24',
        name: 'managerPerformanceFee',
        type: 'uint24'
      },
      {
        internalType: 'uint24',
        name: 'platformManagementFee',
        type: 'uint24'
      },
      {
        internalType: 'uint24',
        name: 'managerManagementFee',
        type: 'uint24'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'fundConfig',
    outputs: [
      {
        internalType: 'contract ITeaVaultV2',
        name: 'teaVaultV2',
        type: 'address'
      },
      {
        internalType: 'bool',
        name: 'disableNFTChecks',
        type: 'bool'
      },
      {
        internalType: 'bool',
        name: 'disableDepositing',
        type: 'bool'
      },
      {
        internalType: 'bool',
        name: 'disableWithdrawing',
        type: 'bool'
      },
      {
        internalType: 'bool',
        name: 'disableCancelDepositing',
        type: 'bool'
      },
      {
        internalType: 'bool',
        name: 'disableCancelWithdrawing',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      }
    ],
    name: 'getRoleAdmin',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'globalState',
    outputs: [
      {
        internalType: 'uint128',
        name: 'depositLimit',
        type: 'uint128'
      },
      {
        internalType: 'uint128',
        name: 'lockedAssets',
        type: 'uint128'
      },
      {
        internalType: 'uint32',
        name: 'cycleIndex',
        type: 'uint32'
      },
      {
        internalType: 'uint64',
        name: 'cycleStartTimestamp',
        type: 'uint64'
      },
      {
        internalType: 'uint64',
        name: 'fundingLockTimestamp',
        type: 'uint64'
      },
      {
        internalType: 'bool',
        name: 'fundClosed',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'hasRole',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'addedValue',
        type: 'uint256'
      }
    ],
    name: 'increaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'initialPrice',
    outputs: [
      {
        internalType: 'uint128',
        name: 'numerator',
        type: 'uint128'
      },
      {
        internalType: 'uint128',
        name: 'denominator',
        type: 'uint128'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'nftEnabled',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint128',
        name: '_fundValue',
        type: 'uint128'
      },
      {
        internalType: 'uint64',
        name: '_timestamp',
        type: 'uint64'
      }
    ],
    name: 'previewNextCycle',
    outputs: [
      {
        internalType: 'uint256',
        name: 'withdrawAmount',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_assets',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_receiver',
        type: 'address'
      }
    ],
    name: 'requestDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_shares',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_owner',
        type: 'address'
      }
    ],
    name: 'requestWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address'
      }
    ],
    name: 'requestedFunds',
    outputs: [
      {
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint128',
        name: '_depositLimit',
        type: 'uint128'
      }
    ],
    name: 'setDepositLimit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: '_disableDepositing',
        type: 'bool'
      },
      {
        internalType: 'bool',
        name: '_disableWithdrawing',
        type: 'bool'
      },
      {
        internalType: 'bool',
        name: '_disableCancelDepositing',
        type: 'bool'
      },
      {
        internalType: 'bool',
        name: '_disableCancelWithdrawing',
        type: 'bool'
      }
    ],
    name: 'setDisableFunding',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: '_checks',
        type: 'bool'
      }
    ],
    name: 'setDisableNFTChecks',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_nfts',
        type: 'address[]'
      }
    ],
    name: 'setEnabledNFTs',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'platformVault',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'managerVault',
            type: 'address'
          },
          {
            internalType: 'uint24',
            name: 'platformEntryFee',
            type: 'uint24'
          },
          {
            internalType: 'uint24',
            name: 'managerEntryFee',
            type: 'uint24'
          },
          {
            internalType: 'uint24',
            name: 'platformExitFee',
            type: 'uint24'
          },
          {
            internalType: 'uint24',
            name: 'managerExitFee',
            type: 'uint24'
          },
          {
            internalType: 'uint24',
            name: 'platformPerformanceFee',
            type: 'uint24'
          },
          {
            internalType: 'uint24',
            name: 'managerPerformanceFee',
            type: 'uint24'
          },
          {
            internalType: 'uint24',
            name: 'platformManagementFee',
            type: 'uint24'
          },
          {
            internalType: 'uint24',
            name: 'managerManagementFee',
            type: 'uint24'
          }
        ],
        internalType: 'struct IHighTableVault.FeeConfig',
        name: '_feeConfig',
        type: 'tuple'
      }
    ],
    name: 'setFeeConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: '_fundLockingTimestamp',
        type: 'uint64'
      }
    ],
    name: 'setFundLockingTimestamp',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_teaVaultV2',
        type: 'address'
      }
    ],
    name: 'setTeaVaultV2',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4'
      }
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalSupply',
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
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'transfer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'transferFrom',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
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
    name: 'userState',
    outputs: [
      {
        internalType: 'uint128',
        name: 'requestedDeposits',
        type: 'uint128'
      },
      {
        internalType: 'uint128',
        name: 'owedShares',
        type: 'uint128'
      },
      {
        internalType: 'uint128',
        name: 'requestedWithdrawals',
        type: 'uint128'
      },
      {
        internalType: 'uint128',
        name: 'owedAssets',
        type: 'uint128'
      },
      {
        internalType: 'uint32',
        name: 'requestCycleIndex',
        type: 'uint32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256'
      }
    ],
    name: 'withdrawFromVault',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

// 0x777748d630ae01445fb6f82e950c902e9d432331
// 18
// TEAUSDT

// 0x0061704612f0f5138652b566bc795d50bc634099
// 18
// TEAWBTC

// 0x884bdd28aa7a7e7e4b56d1a321e456794ace7238
// 18
// TeaETHmax

// 0x7d641d88201a759adfd9824c2d6529febcf6bea8
// 18
// TeaETHultra
