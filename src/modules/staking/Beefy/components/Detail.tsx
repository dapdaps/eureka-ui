// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo, useMemo } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

import Balance from '@/modules/components/Balance';
import Select from '@/modules/components/Select';
import { useMultiState } from '@/modules/hooks';
import LiquidityLoading from '@/modules/liquidity/Bridge/Loading';

import {
  BalancePrice,
  Column,
  DetailWrapper,
  FilterButton,
  FilterButtonList,
  Input,
  InputSuffix,
  InputWrap,
  InputWrapList,
  PriceWrap,
  Row,
  StyledButton,
  StyledButtonList,
  StyledImageList,
  TotalPrice
} from '../styles';

const ABI = [
  {
    inputs: [
      { internalType: 'uint256', name: '_shares', type: 'uint256' },
      { internalType: 'uint256', name: '_amount0Max', type: 'uint256' },
      { internalType: 'uint256', name: '_amount1Max', type: 'uint256' }
    ],
    name: 'deposit',
    outputs: [
      {
        internalType: 'uint256',
        name: 'depositedAmount0',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'depositedAmount1',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_shares', type: 'uint256' },
      { internalType: 'uint256', name: '_amount0Min', type: 'uint256' },
      { internalType: 'uint256', name: '_amount1Min', type: 'uint256' }
    ],
    name: 'withdraw',
    outputs: [
      {
        internalType: 'uint256',
        name: 'withdrawnAmount0',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'withdrawnAmount1',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
export default memo(function Detail(props) {
  const { account, provider, data, toast, prices, refetch, defaultDex, addAction, userPositions, dexConfig } = props;
  const defaultDeposit = props.tab === 'deposit' || !props.tab;

  const curPositionUSD = userPositions && userPositions[data.VAULT_ADDRESS]?.balanceUSD;
  const [state, updateState] = useMultiState({
    isDeposit: defaultDeposit,
    lpBalance: '',
    balances: {},
    inAmount: '',
    lpAmount: '',
    isError: false,
    isLoading: false,
    isTokenApproved: true,
    isTokenApproving: false,
    loadingMsg: '',
    isPostTx: false,
    showPairs: false,
    updater: 0
  });

  const sourceBalances = {};
  const {
    isDeposit,
    balances,
    inAmount,
    isLoading,
    isError,
    isTokenApproved,
    isTokenApproving,
    loadingMsg,
    lpBalance,
    lpAmount,
    isPostTx
  } = state;

  const sender = account;
  const { VAULT_ADDRESS, LP_ADDRESS, id, token0, token1, decimals } = data;
  const symbol = id;
  const isInSufficient = Number(inAmount) > Number(balances[symbol]);
  const isWithdrawInsufficient = Number(lpAmount) > Number(lpBalance);

  // const inAmountUsd =
  const balanceLp = useMemo(() => {
    const amount = isDeposit ? inAmount : lpAmount;
    if (!amount) return '-';
    return '$ ' + Big(data?.detail?.price).times(amount).toFixed(2);
  }, [inAmount, lpAmount, isDeposit]);
  const updateLPBalance = async () => {
    const abi = [
      'function balanceOf(address) view returns (uint256)',
      {
        inputs: [],
        name: 'getPricePerFullShare',
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
    const contract = new ethers.Contract(VAULT_ADDRESS, abi, provider);
    const balanceOfResult = (await contract.balanceOf(account)) || 0;
    const getPricePerFullShareResult = (await contract.getPricePerFullShare()) || 0;
    updateState({
      lpBalance: Big(ethers.utils.formatUnits(balanceOfResult))
        .times(ethers.utils.formatUnits(getPricePerFullShareResult))
        .toFixed(18)
    });
  };
  const updateBalance = () => {
    const abi = ['function balanceOf(address) view returns (uint256)'];
    const contract = new ethers.Contract(LP_ADDRESS, abi, provider.getSigner());
    contract
      .balanceOf(sender)
      .then((balanceBig) => {
        const adjustedBalance = Big(ethers.utils.formatUnits(balanceBig)).toFixed();
        sourceBalances[symbol] = adjustedBalance;
        updateState({
          balances: sourceBalances
        });
      })
      .catch((error: Error) => {
        console.log('error: ', error);
        setTimeout(() => {
          updateBalance(token);
        }, 1500);
      });
  };
  const checkApproval = (amount) => {
    const wei: any = ethers.utils.parseUnits(Big(amount).toFixed(decimals), decimals);
    const abi = ['function allowance(address, address) external view returns (uint256)'];
    const contract = new ethers.Contract(LP_ADDRESS, abi, provider.getSigner());
    updateState({
      isTokenApproved: false
    });
    contract
      .allowance(sender, VAULT_ADDRESS)
      .then((allowance: any) => {
        const approved = !new Big(allowance.toString()).lt(wei);
        updateState({
          isTokenApproved: approved
        });
      })
      .catch((e: Error) => console.log(e));
  };
  const changeMode = (isDeposit) => {
    updateState({ isDeposit });
  };
  const handleMax = () => {
    handleTokenChange(balances[symbol]);
  };
  const handleTokenChange = (amount) => {
    updateState({ inAmount: amount });
    if (Number(amount) === 0) {
      updateState({
        inAmount: 0,
        isTokenApproved: true
      });
      return;
    }
    checkApproval(amount);
  };

  const handleLPChange = (amount) => {
    updateState({
      lpAmount: amount
    });
  };

  const handleApprove = () => {
    const payload = { isTokenApproving: true };
    const amount = Big(inAmount).toFixed(decimals);
    const toastId = toast?.loading({
      title: `Approve ${symbol}`
    });
    updateState({
      ...payload,
      isLoading: true,
      loadingMsg: `Approving ${symbol}...`
    });

    const wei = ethers.utils.parseUnits(amount, decimals);

    const abi = ['function approve(address, uint) public'];

    const contract = new ethers.Contract(LP_ADDRESS, abi, provider.getSigner());

    contract
      .approve(VAULT_ADDRESS, wei)
      .then((tx: any) => tx.wait())
      .then((receipt: any) => {
        const payload = { isTokenApproved: true, isTokenApproving: false };
        updateState({ ...payload, isLoading: false, loadingMsg: '' });
        toast?.dismiss(toastId);
        toast?.success({
          title: 'Approve Successfully!',
          tx: receipt.transactionHash,
          chainId: props.chainId
        });
      })
      .catch((error: Error) => {
        console.log('error: ', error);
        updateState({
          isError: true,
          isLoading: false,
          loadingMsg: error?.message,
          isTokenApproving: false
        });
        toast?.dismiss(toastId);
        toast?.fail({
          title: 'Approve Failed!',
          text: error?.message?.includes('user rejected transaction') ? 'User rejected transaction' : null
        });
      });
  };

  const handleDeposit = async () => {
    const toastId = toast?.loading({
      title: `Depositing...`
    });
    updateState({
      toastId,
      isLoading: true,
      isError: false,
      loadingMsg: 'Depositing...'
    });
    const wei = ethers.utils.parseUnits(Big(inAmount).toFixed(decimals), decimals);
    const abi = [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_amount',
            type: 'uint256'
          }
        ],
        name: 'deposit',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      }
    ];
    const contract = new ethers.Contract(VAULT_ADDRESS, abi, provider.getSigner());
    let estimateGas = new Big(1000000);
    try {
      estimateGas = await contract.estimateGas(wei);
    } catch (err: any) {
      if (err?.code === 'UNPREDICTABLE_GAS_LIMIT') {
        estimateGas = new Big(6000000);
      }
    }
    contract
      .deposit(wei, {
        gasLimit: estimateGas.mul(120).div(100).toString()
      })
      .then((tx) => tx.wait())
      .then((receipt: any) => {
        const { status, transactionHash } = receipt;
        addAction?.({
          type: 'Staking',
          action: 'Stake',
          token: `${token0} / ${token1}`,
          amount: inAmount,
          template: defaultDex,
          add: false,
          status,
          transactionHash
        });

        updateState({
          isLoading: false,
          isPostTx: true
        });

        setTimeout(() => updateState({ isPostTx: false }), 10_000);

        const { refetch } = props;
        refetch && refetch();

        toast?.dismiss(toastId);
        toast?.success({
          title: 'Deposit Successfully!'
        });
      })
      .catch((error: Error) => {
        updateState({
          isError: true,
          isLoading: false,
          loadingMsg: error?.message
        });
        toast?.dismiss(toastId);
        toast?.fail({
          title: 'Deposit Failed!',
          text: error?.message?.includes('user rejected transaction')
            ? 'User rejected transaction'
            : (error?.message ?? '')
        });
      });
  };

  const handleWithdraw = () => {
    const toastId = toast?.loading({
      title: `Withdrawing...`
    });
    updateState({
      isLoading: true,
      isError: false,
      loadingMsg: 'Withdrawing...'
    });

    const lpWeiAmount = ethers.utils.parseUnits(Big(lpAmount).toFixed(18), 18);
    const abi = Big(lpAmount).eq(lpBalance)
      ? [
          {
            inputs: [],
            name: 'withdrawAll',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function'
          }
        ]
      : [
          {
            inputs: [
              {
                internalType: 'uint256',
                name: '_shares',
                type: 'uint256'
              }
            ],
            name: 'withdraw',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function'
          }
        ];

    const contract = new ethers.Contract(VAULT_ADDRESS, abi, provider.getSigner());
    const method = Big(lpAmount).eq(lpBalance) ? 'withdrawAll' : 'withdraw';
    const params = Big(lpAmount).eq(lpBalance) ? [] : [lpWeiAmount];
    contract[method](...params)
      .then((tx) => tx.wait())
      .then((receipt) => {
        updateState({
          isLoading: false,
          isPostTx: true
        });
        const { status, transactionHash } = receipt;

        addAction?.({
          type: 'Staking',
          action: 'Unstake',
          token: `${token0} / ${token1}`,
          amount: inAmount,
          template: defaultDex,
          add: false,
          status,
          transactionHash
        });
        setTimeout(() => updateState({ isPostTx: false }), 10_000);
        const { refetch } = props;
        if (refetch) {
          setTimeout(() => {
            refetch();
          }, 3000);
        }
        toast?.dismiss(toastId);
        toast?.success({
          title: 'Withdraw Successfully!'
        });
      })
      .catch((error: Error) => {
        updateState({
          isError: true,
          isLoading: false,
          loadingMsg: error?.message
        });
        toast?.dismiss(toastId);
        toast?.fail({
          title: 'Withdraw Failed!',
          text: error?.message?.includes('user rejected transaction')
            ? 'User rejected transaction'
            : (error?.message ?? '')
        });
      });
  };

  const onUpdateLpPercent = (percent: number) => {
    updateState({
      lpPercent: percent
    });
  };

  useEffect(() => {
    if (!sender || !VAULT_ADDRESS) return;
    updateBalance();
    updateLPBalance();
  }, [sender, VAULT_ADDRESS]);

  useEffect(() => {
    if (inAmount) {
      handleTokenChange(inAmount, symbol);
    }
  }, [data]);

  return (
    <DetailWrapper>
      <FilterButtonList>
        <FilterButton className={isDeposit ? 'isActive' : ''} onClick={() => changeMode(true)}>
          Deposit
        </FilterButton>
        <FilterButton className={!isDeposit ? 'isActive' : ''} onClick={() => changeMode(false)}>
          Withdraw
        </FilterButton>
      </FilterButtonList>
      {isDeposit ? (
        <>
          <Row className="price-input">
            <Column>
              <InputWrap className={Number(inAmount) > Number(balances[symbol]) ? 'inSufficient' : ''}>
                <Input value={inAmount} type="number" onChange={(e) => handleTokenChange(e.target.value, id)} />
              </InputWrap>
              <PriceWrap>
                <TotalPrice>{balanceLp}</TotalPrice>
                <BalancePrice>
                  Balance:<span onClick={() => handleMax()}>{Big(balances[symbol] ?? 0).toFixed(6)}</span>
                </BalancePrice>
              </PriceWrap>
            </Column>
          </Row>
          <StyledButtonList>
            {isInSufficient && <StyledButton disabled>InSufficient Balance</StyledButton>}
            {!isInSufficient &&
              (isTokenApproved && !isTokenApproving ? (
                <StyledButton disabled={isLoading || !inAmount} onClick={handleDeposit}>
                  {isLoading ? <LiquidityLoading /> : 'Deposit'}
                </StyledButton>
              ) : (
                <>
                  <StyledButton disabled={isTokenApproved || isTokenApproving} onClick={() => handleApprove(true)}>
                    {isTokenApproving ? (
                      <LiquidityLoading />
                    ) : (
                      <>
                        {isTokenApproved ? 'Approved' : 'Approve'} {`${token0} / ${token1}`}
                      </>
                    )}
                  </StyledButton>
                </>
              ))}
          </StyledButtonList>
        </>
      ) : (
        <>
          <Row className="price-input">
            <Column>
              <InputWrap>
                <Input
                  value={lpAmount}
                  type="number"
                  onChange={(e) => {
                    handleLPChange(e.target.value);

                    const value = e.target.value;

                    if (!value) {
                      onUpdateLpPercent(0);
                    }

                    if (value && Big(value).gt(0)) {
                      const newSliderPercent = Big(value || 0)
                        .div(Big(lpBalance).gt(0) ? lpBalance : 1)
                        .times(100)
                        .toFixed(0);
                      onUpdateLpPercent(Number(newSliderPercent));
                    }
                  }}
                />
              </InputWrap>
              <PriceWrap>
                <TotalPrice>{balanceLp}</TotalPrice>
                <BalancePrice>
                  Balance:{' '}
                  <span
                    onClick={() => {
                      const newSliderPercent = Big(lpBalance || 0)
                        .div(Big(lpBalance).gt(0) ? lpBalance : 1)
                        .times(100)
                        .toFixed(0);

                      onUpdateLpPercent(Number(newSliderPercent));

                      handleLPChange(lpBalance);
                    }}
                  >
                    {Big(lpBalance).toFixed(6)}
                  </span>
                </BalancePrice>
              </PriceWrap>
            </Column>
          </Row>
          <StyledButtonList>
            <StyledButton
              disabled={isWithdrawInsufficient || isLoading || Number(lpAmount) <= 0}
              onClick={handleWithdraw}
            >
              {isLoading ? <LiquidityLoading /> : <>{isWithdrawInsufficient ? 'InSufficient Balance' : 'Withdraw'}</>}
            </StyledButton>
          </StyledButtonList>
        </>
      )}
    </DetailWrapper>
  );
});
