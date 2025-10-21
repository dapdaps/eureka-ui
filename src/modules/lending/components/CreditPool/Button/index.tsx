import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect, useMemo } from 'react';

import useAccount from '@/hooks/useAccount';
import Loading from '@/modules/components/Loading';
import { useMultiState } from '@/modules/lending/hooks';
import { MarketsType } from '@/modules/lending/models';

import { StyledButton } from './styles';

const ERC20_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address'
      },
      {
        name: '_spender',
        type: 'address'
      }
    ],
    name: 'allowance',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address'
      },
      {
        name: '_value',
        type: 'uint256'
      }
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

const MAX_APPROVE = '115792089237316195423570985008687907853269984665640564039457584007913129639935';

const LendingDialogButton = (props: Props) => {
  const {
    disabled,
    actionText,
    amount,
    data,
    chainId,
    onSuccess,
    toast,
    addAction,
    unsignedTx,
    loading: estimating,
    gas,
    onApprovedSuccess,
    account,
    onLoad,
    marketsType,
    spender,
    style
  } = props;

  const { provider } = useAccount();

  const tokenSymbol = data.underlyingToken?.symbol;
  const subType = useMemo(() => {
    if (['Borrow', 'Repay', 'Deposit', 'Withdraw'].includes(actionText)) {
      return actionText === 'Deposit' ? 'Supply' : actionText;
    }
    return '';
  }, [actionText]);

  const [state, updateState] = useMultiState<any>({});

  const tokenAddr = useMemo(() => {
    if (marketsType && [MarketsType.Borrow, MarketsType.Earn].includes(marketsType)) {
      if (['Borrow', 'Repay', 'Deposit', 'Withdraw'].includes(actionText) && !['Dolomite'].includes(data.dapp)) {
        return data.borrowToken?.address;
      }
    }
    return data.underlyingToken?.address;
  }, [data, marketsType, actionText]);

  const getAllowance = () => {
    let approveValue = data?.dapp === 'INIT' && actionText === 'Repay' ? Big(amount).times(1.06).toFixed(6) : amount;
    if (props.approveMax) {
      approveValue = Big(MAX_APPROVE)
        .div(Big(10).pow(data.underlyingToken.decimals))
        .toFixed(data.underlyingToken.decimals);
    }
    const TokenContract = new ethers.Contract(tokenAddr, ERC20_ABI, provider.getSigner());
    TokenContract.allowance(account, spender).then((allowanceRaw: any) => {
      updateState({
        isApproved: !Big(ethers.utils.formatUnits(allowanceRaw._hex, data.underlyingToken.decimals)).lt(
          approveValue || '0'
        ),
        checking: false
      });
    });
  };

  useEffect(() => {
    if (!actionText || !account) return;
    updateState({
      approving: false,
      isApproved: false,
      isGasEnough: true,
      pending: false,
      checking: true
    });
  }, [amount, actionText, account]);

  useEffect(() => {
    if (!actionText || !account || !gas) return;
    provider.getBalance(account).then((rawBalance: any) => {
      updateState({
        gasBalance: rawBalance.toString(),
        isGasEnough: !Big(rawBalance.toString()).lt(gas.toString()),
        gas: ethers.utils.formatUnits(gas, 18)
      });
    });
  }, [account, gas, actionText]);

  useEffect(() => {
    if (!actionText || !account || !amount) return;

    if (['Supply', 'Pair'].includes(actionText)) {
      getAllowance();
      return;
    }
    if (['Withdraw', 'Unpair'].includes(actionText)) {
      updateState({ isApproved: true, checking: false });
      onLoad?.(true);
    }
  }, [account, amount, actionText]);

  if (!actionText || !account) return;

  if (!amount) {
    return (
      <StyledButton disabled={true} className={actionText.toLowerCase()} style={style}>
        Enter An Amount
      </StyledButton>
    );
  }

  if (!state.isApproved) {
    const handleApprove = () => {
      const toastId = toast?.loading({
        title: `Approve ${tokenSymbol}`
      });
      updateState({
        approving: true
      });
      const TokenContract = new ethers.Contract(tokenAddr, ERC20_ABI, provider.getSigner());
      console.log('&& data.dapp', data.dapp);
      let approveValue: any =
        data?.dapp === 'INIT' && actionText === 'Repay' ? Big(amount).times(1.06).toFixed(6) : amount;
      if (props.approveMax) {
        approveValue = Big(MAX_APPROVE)
          .div(Big(10).pow(data.underlyingToken.decimals))
          .toFixed(data.underlyingToken.decimals);
      }
      TokenContract.approve(spender, ethers.utils.parseUnits(approveValue, data.underlyingToken.decimals))
        .then((tx: any) => {
          const handleSucceed = (res: any) => {
            const { status, transactionHash } = res;
            toast?.dismiss(toastId);
            if (status !== 1) throw new Error('');
            updateState({
              isApproved: true,
              approving: false
            });
            toast?.success({
              title: 'Approve Successfully!',
              // text: `Approve ${Big(amount).toFixed(2)} ${tokenSymbol}`,
              tx: transactionHash,
              chainId
            });
            onApprovedSuccess();
          };
          tx.wait()
            .then((res: any) => {
              handleSucceed(res);
            })
            .catch((err: any) => {
              console.log('approve tx.wait failure: %o', err);
              if (err?.message?.includes('transaction indexing is in progress') && tx) {
                const timer = setTimeout(async () => {
                  clearTimeout(timer);
                  try {
                    const res: any = await tx.wait();
                    handleSucceed(res);
                  } catch (_err: any) {
                    updateState({
                      isApproved: true,
                      approving: false
                    });
                    toast?.dismiss(toastId);
                    toast?.success({
                      title: 'Approve Successfully!',
                      chainId
                    });
                    onApprovedSuccess();
                  }
                }, 10000);
              }
            });
        })
        .catch((err: any) => {
          console.log('approve contract approve failure: %o', err);
          updateState({
            isApproved: false,
            approving: false
          });
          toast?.dismiss(toastId);
          toast?.fail({
            title: 'Approve Failed!',
            text: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : null
          });
          onLoad?.(false);
        });
    };
    return (
      <StyledButton onClick={handleApprove} disabled={state.approving || disabled} style={style}>
        {state.approving || state.checking ? <Loading size={16} /> : 'Approve'}
      </StyledButton>
    );
  }

  return (
    <>
      <StyledButton
        disabled={state.pending || disabled || estimating || !state.isGasEnough}
        className={actionText.toLowerCase()}
        onClick={() => {
          const toastId = toast?.loading({
            title: `Submitting ${tokenSymbol || ''} ${actionText.toLowerCase()} request...`
          });
          updateState({
            pending: true
          });

          provider
            .getSigner()
            .sendTransaction(unsignedTx)
            .then((tx: any) => {
              const handleSucceed = (res: any) => {
                const { status, transactionHash } = res;
                toast?.dismiss(toastId);
                updateState({
                  pending: false
                });
                if (actionText === 'Close Position') {
                  const { depositDataList, borrowDataList } = data;
                  const _actions: any = [];
                  const dataList = borrowDataList?.length > 0 ? borrowDataList : depositDataList;
                  dataList.forEach((action: any) => {
                    _actions.push({
                      amount: action.amount,
                      type: borrowDataList?.length > 0 ? 'Repay' : 'Withdraw',
                      tokenSymbol: action?.underlyingToken?.symbol,
                      tokenAddress:
                        action?.underlyingToken?.address === 'native'
                          ? '0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8'
                          : action?.underlyingToken?.address
                    });
                  });
                  addAction?.({
                    type: 'Lending',
                    sub_type: subType,
                    action: actionText,
                    amount,
                    template: 'Native',
                    add: false,
                    status,
                    transactionHash,
                    extra_data: { lending_actions: _actions }
                  });
                } else {
                  addAction?.({
                    type: 'Lending',
                    sub_type: subType,
                    action: actionText,
                    token: data.underlyingToken,
                    amount,
                    template: 'Native',
                    add: false,
                    status,
                    transactionHash
                  });
                }
                if (status === 1) {
                  onSuccess?.(data.dapp);
                  toast?.success({
                    title: `${tokenSymbol || ''} ${actionText.toLowerCase()} request successed!`,
                    tx: transactionHash,
                    chainId
                  });
                } else {
                  toast?.fail({
                    title: `${tokenSymbol} ${actionText.toLowerCase()} request failed!`,
                    tx: transactionHash,
                    chainId
                  });
                }
              };
              tx.wait()
                .then((res: any) => {
                  handleSucceed(res);
                })
                .catch((err: any) => {
                  console.log('tx.wait failure: %o', err);
                  // fix#DAP-962
                  // const timer = setTimeout(async () => {
                  //   clearTimeout(timer);
                  //   // try again
                  //   try {
                  //     const res: any = await tx.wait();
                  //     handleSucceed(res);
                  //   } catch (_err: any) {
                  //     updateState({
                  //       pending: false
                  //     });
                  //     onSuccess?.(data.dapp);
                  //     toast?.dismiss(toastId);
                  //     toast?.success({
                  //       title: `${tokenSymbol} ${actionText.toLowerCase()} request successed!`,
                  //       chainId
                  //     });
                  //   }
                  // }, 10000);
                  // toast?.fail({
                  //   title: `${tokenSymbol} ${actionText.toLowerCase()} request failed!`,
                  //   chainId,
                  // });
                });
            })
            .catch((err: any) => {
              updateState({
                pending: false
              });
              console.log('sendTransaction failure: %o', err);
              toast?.dismiss(toastId);
              toast?.fail({
                title: err?.message?.includes('user rejected transaction')
                  ? 'User rejected transaction'
                  : `${tokenSymbol} ${actionText.toLowerCase()} request failed!`,
                tx: err ? err.hash : '',
                chainId
              });
            });
        }}
        style={style}
      >
        {state.pending || estimating ? (
          <Loading size={16} />
        ) : !state.isGasEnough ? (
          `Not enough gas(${Big(state.gas || 0).toFixed(2)}) needed`
        ) : (
          actionText
        )}
      </StyledButton>
    </>
  );
};

export default LendingDialogButton;

export interface Props {
  disabled?: boolean;
  loading?: boolean;
  isError?: boolean;
  actionText: string;
  amount: string | number;
  data: any;
  chainId: number;
  onSuccess: any;
  toast: any;
  addAction: any;
  unsignedTx: any;
  gas: string;
  onApprovedSuccess: any;
  account: string;
  onLoad?: any;
  marketsType?: MarketsType;
  style?: React.CSSProperties;
  approveMax?: boolean;
  spender?: string;
}
