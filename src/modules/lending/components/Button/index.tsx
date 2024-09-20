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
        type: 'address',
      },
      {
        name: '_spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

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
  } = props;

  const { provider } = useAccount();

  const tokenSymbol = data.underlyingToken.symbol;

  const [state, updateState] = useMultiState<any>({});

  const isCollateral = useMemo(() => {
    if (['Add Collateral', 'Remove Collateral'].includes(actionText)) return false;
    return actionText.includes('Collateral');
  }, [actionText]);

  const getAAVE2TokenAddress = () => {
    return data.underlyingToken.address === 'native'
      ? data.address
      : data.underlyingToken.address;
  };

  const getAAVE2ApproveAddress = () => {
    return data.underlyingToken.address === 'native'
      ? data.config.wethGateway
      : data.config.lendingPoolAddress;
  };

  const spender = data.config.type == 'aave2' ? getAAVE2ApproveAddress() : data.address;
  const tokenAddr = useMemo(() => {
    if (data.config.type === 'aave2') {
      return getAAVE2TokenAddress();
    }
    if (marketsType && [MarketsType.Borrow, MarketsType.Earn].includes(marketsType)) {
      if (['Borrow', 'Repay', 'Deposit', 'Withdraw'].includes(actionText)) {
        return data.borrowToken?.address;
      }
    }
    return data.underlyingToken.address;
  }, [data, marketsType, actionText]);

  const getAllowance = () => {
    const TokenContract = new ethers.Contract(
      tokenAddr,
      ERC20_ABI,
      provider.getSigner(),
    );
    TokenContract.allowance(account, spender).then((allowanceRaw: any) => {
      updateState({
        isApproved: !Big(
          ethers.utils.formatUnits(
            allowanceRaw._hex,
            data.underlyingToken.decimals,
          ),
        ).lt(amount || '0'),
        checking: false,
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
      checking: true,
    });
  }, [amount, actionText, account]);

  useEffect(() => {
    if (!actionText || !account || !gas) return;
    provider.getBalance(account).then((rawBalance: any) => {
      updateState({
        gasBalance: rawBalance.toString(),
        isGasEnough: !Big(rawBalance.toString()).lt(gas.toString()),
        gas: ethers.utils.formatUnits(gas, 18),
      });
    });
  }, [account, gas, actionText]);

  useEffect(() => {
    if (!actionText || !account || !amount || isCollateral) return;

    if (data.underlyingToken.isNative) {
      updateState({ isApproved: true, checking: false });
      onLoad?.(true);
    } else {
      if (['Deposit', 'Repay', 'Add Collateral'].includes(actionText)) {
        getAllowance();
      }
      if (['Withdraw', 'Borrow', 'Remove Collateral'].includes(actionText)) {
        updateState({ isApproved: true, checking: false });
        onLoad?.(true);
      }
    }
  }, [account, amount, actionText]);

  if (!actionText || !account) return;

  if (isCollateral) {
    return (
      <>
        <StyledButton
          disabled={state.loading || disabled || estimating || !state.isGasEnough}
          onClick={() => {
            const isEnter = actionText === 'Enable as Collateral';
            const toastId = toast?.loading({
              title: `Submitting ${tokenSymbol} ${
                isEnter ? 'enable' : 'disable'
              } as collateral request...`,
            });
            updateState({
              loading: true,
            });

            provider
              .getSigner()
              .sendTransaction(unsignedTx)
              .then((tx: any) => {
                tx.wait()
                  .then((res: any) => {
                    const { status, transactionHash } = res;
                    toast?.dismiss(toastId);
                    if (status !== 1) throw new Error('');
                    updateState({
                      loading: false,
                    });
                    toast?.success({
                      title: `${tokenSymbol} ${
                        isEnter ? 'enable' : 'disable'
                      } as collateral request successed!`,
                      tx: transactionHash,
                      chainId,
                    });
                    onSuccess?.(data.dapp);
                  })
                  .catch((err: any) => {
                    updateState({
                      loading: false,
                    });
                  });
              })
              .catch((err: any) => {
                updateState({
                  loading: false,
                });
                toast?.dismiss(toastId);
                toast?.fail({
                  title: err?.message?.includes('user rejected transaction')
                    ? 'User rejected transaction'
                    : `${tokenSymbol} ${
                      isEnter ? 'enable' : 'disable'
                    } as collateral request failed!`,
                  tx: err ? err.hash : '',
                  chainId,
                });
              });
          }}
        >
          {state.loading || estimating ? (
            <Loading size={16} />
          ) : !state.isGasEnough ? (
            `Not enough gas(${Big(state.gas || 0).toFixed(2)}) needed`
          ) : (
            'Confirm'
          )}
        </StyledButton>
      </>
    );
  }

  if (!amount) {
    return (
      <StyledButton disabled={true} className={actionText.toLowerCase()}>
        Enter An Amount
      </StyledButton>
    );
  }

  if (!state.isApproved) {
    const handleApprove = () => {
      const toastId = toast?.loading({
        title: `Approve ${tokenSymbol}`,
      });
      updateState({
        approving: true,
      });
      const TokenContract = new ethers.Contract(
        tokenAddr,
        ERC20_ABI,
        provider.getSigner(),
      );
      TokenContract.approve(
        spender,
        ethers.utils.parseUnits(amount, data.underlyingToken.decimals),
      )
        .then((tx: any) => {
          tx.wait()
            .then((res: any) => {
              const { status, transactionHash } = res;
              toast?.dismiss(toastId);
              if (status !== 1) throw new Error('');
              updateState({
                isApproved: true,
                approving: false,
              });
              toast?.success({
                title: 'Approve Successfully!',
                // text: `Approve ${Big(amount).toFixed(2)} ${tokenSymbol}`,
                tx: transactionHash,
                chainId,
              });
              onApprovedSuccess();
            })
            .catch((err: any) => {
              updateState({
                isApproved: false,
                approving: false,
              });
            });
        })
        .catch((err: any) => {
          updateState({
            isApproved: false,
            approving: false,
          });
          toast?.dismiss(toastId);
          toast?.fail({
            title: 'Approve Failed!',
            text: err?.message?.includes('user rejected transaction')
              ? 'User rejected transaction'
              : null,
          });
          onLoad?.(false);
        });
    };
    return (
      <StyledButton onClick={handleApprove} disabled={state.approving}>
        {state.approving || state.checking ? (
          <Loading size={16} />
        ) : (
          'Approve'
        )}
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
            title: `Submitting ${tokenSymbol} ${actionText.toLowerCase()} request...`,
          });
          updateState({
            pending: true,
          });

          provider
            .getSigner()
            .sendTransaction(unsignedTx)
            .then((tx: any) => {
              tx.wait()
                .then((res: any) => {
                  const { status, transactionHash } = res;
                  toast?.dismiss(toastId);
                  updateState({
                    pending: false,
                  });
                  addAction?.({
                    type: 'Lending',
                    action: actionText,
                    token: data.underlyingToken,
                    amount,
                    template: data.dappName || data.dapp,
                    add: false,
                    status,
                    transactionHash,
                  });
                  if (status === 1) {
                    onSuccess?.(data.dapp);
                    toast?.success({
                      title: `${tokenSymbol} ${actionText.toLowerCase()} request successed!`,
                      tx: transactionHash,
                      chainId,
                    });
                  } else {
                    toast?.fail({
                      title: `${tokenSymbol} ${actionText.toLowerCase()} request failed!`,
                      tx: transactionHash,
                      chainId,
                    });
                  }
                })
                .catch((err: any) => {
                  console.log('tx.wait failure: %o', err);
                  updateState({
                    pending: false,
                  });
                  toast?.fail({
                    title: `${tokenSymbol} ${actionText.toLowerCase()} request failed!`,
                    chainId,
                  });
                });
            })
            .catch((err: any) => {
              updateState({
                pending: false,
              });
              console.log('sendTransaction failure: %o', err);
              toast?.dismiss(toastId);
              toast?.fail({
                title: err?.message?.includes('user rejected transaction')
                  ? 'User rejected transaction'
                  : `${tokenSymbol} ${actionText.toLowerCase()} request failed!`,
                tx: err ? err.hash : '',
                chainId,
              });
            });
        }}
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
  amount: string;
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
}