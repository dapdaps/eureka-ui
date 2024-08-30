import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import useAccount from '@/hooks/useAccount';

import LendingLoadingIcon from '../../LendingLoadingIcon';
import { ERC20_ABI } from './abi';

const Button = styled.button`
  background: #ffff;
  height: 46px;
  border-radius: 10px;
  color: #000;
  font-size: 18px;
  font-weight: 400;
  border: none;
  width: 100%;
  transition: 0.5s;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.5;
  }
  //&.borrow {
  //  background-color: var(--agg-primary-color, var(--repay-border-color));
  //  border: 1px solid var(--repay-border-color);
  //}
  //&.repay {
  //  background-color: var(--agg-pink-color, var(--repay-bg-hover-color));
  //  border: 1px solid var(--repay-border-color);
  //}
`;

interface IProps {
  disabled: boolean;
  actionText: string;
  amount: string;
  data: any;
  chainId: number;
  onSuccess: any;
  toast: any;
  addAction: any;
  unsignedTx?: any;
  loading: boolean;
  gas?: any;
  onApprovedSuccess?: () => void;
  account: any;
}

const LendingDialogButton = (props: IProps) => {
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
    account
  } = props;

  const tokenSymbol = data.underlyingToken.symbol;
  const { provider } = useAccount();

  const [state, setState] = useState({
    approving: false,
    isApproved: false,
    isGasEnough: true,
    pending: false,
    checking: true,
    loading: false,
    gasBalance: '',
    gas: ''
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      approving: false,
      isApproved: false,
      isGasEnough: true,
      pending: false,
      checking: true
    }));
  }, [amount]);

  useEffect(() => {
    if (!account || !gas) return;
    provider.getBalance(account).then((rawBalance: any) => {
      const gasBalance = rawBalance.toString();
      setState((prevState) => ({
        ...prevState,
        gasBalance,
        isGasEnough: !Big(gasBalance).lt(gas.toString()),
        gas: ethers.utils.formatUnits(gas, 18)
      }));
    });
  }, [account, gas]);

  const handleButtonClick = () => {
    const isEnter = actionText === 'Enable as Collateral';
    const toastId = toast?.loading({
      title: `Submitting ${tokenSymbol} ${isEnter ? 'enable' : 'disable'} as collateral request...`
    });
    setState((prevState) => ({
      ...prevState,
      loading: true
    }));

    provider
      .getSigner()
      .sendTransaction(unsignedTx)
      .then((tx: any) => {
        tx.wait()
          .then((res: any) => {
            const { status, transactionHash } = res;
            toast?.dismiss(toastId);
            setState((prevState) => ({
              ...prevState,
              loading: false
            }));
            if (status !== 1) throw new Error('');
            toast?.success({
              title: `${tokenSymbol} ${isEnter ? 'enable' : 'disable'} as collateral request successed!`,
              tx: transactionHash,
              chainId
            });
            onSuccess?.(data.dapp);
          })
          .catch(() => {
            setState((prevState) => ({
              ...prevState,
              loading: false
            }));
          });
      })
      .catch((err: any) => {
        setState((prevState) => ({
          ...prevState,
          loading: false
        }));
        toast?.dismiss(toastId);
        toast?.fail({
          title: err?.message?.includes('user rejected transaction')
            ? 'User rejected transaction'
            : `${tokenSymbol} ${isEnter ? 'enable' : 'disable'} as collateral request failed!`,
          tx: err ? err.hash : '',
          chainId
        });
      });
  };

  const getAAVE2TokenAddress = () => {
    return data.underlyingToken.address === 'native' ? data.address : data.underlyingToken.address;
  };

  const getAAVE2ApproveAddress = () => {
    return data.underlyingToken.address === 'native' ? data.config.wethGateway : data.config.lendingPoolAddress;
  };

  const tokenAddr = data.config.type === 'aave2' ? getAAVE2TokenAddress() : data.underlyingToken.address;
  const spender = data.config.type === 'aave2' ? getAAVE2ApproveAddress() : data.address;

  const getAllowance = () => {
    const TokenContract = new ethers.Contract(tokenAddr, ERC20_ABI, provider.getSigner());
    TokenContract.allowance(account, spender).then((allowanceRaw: any) => {
      setState((prevState) => ({
        ...prevState,
        isApproved: !Big(ethers.utils.formatUnits(allowanceRaw._hex, data.underlyingToken.decimals)).lt(amount || '0'),
        checking: false
      }));
    });
  };

  useEffect(() => {
    if (data.underlyingToken.isNative) {
      setState((prevState) => ({ ...prevState, isApproved: true, checking: false }));
    } else {
      if (['Deposit', 'Repay'].includes(actionText)) {
        getAllowance();
      }
      if (['Withdraw', 'Borrow'].includes(actionText)) {
        setState((prevState) => ({ ...prevState, isApproved: true, checking: false }));
      }
    }
  }, [account, amount, actionText]);

  if (!actionText || !account) return;

  if (actionText.includes('Collateral')) {
    return (
      <>
        <Button disabled={state.loading || disabled || estimating || !state.isGasEnough} onClick={handleButtonClick}>
          {state.loading || estimating ? (
            <LendingLoadingIcon size={16} />
          ) : !state.isGasEnough ? (
            `Not enough gas(${Big(state.gas || 0).toFixed(2)}) needed`
          ) : (
            'Confirm'
          )}
        </Button>
      </>
    );
  }
  if (!amount) {
    return (
      <Button disabled={true} className={actionText.toLowerCase()}>
        Enter An Amount
      </Button>
    );
  }

  if (!state.isApproved) {
    const handleApprove = () => {
      const toastId = toast?.loading({
        title: `Approve ${tokenSymbol}`
      });
      setState((prevState) => ({
        ...prevState,
        approving: true
      }));
      const TokenContract = new ethers.Contract(tokenAddr, ERC20_ABI, provider.getSigner());
      TokenContract.approve(spender, ethers.utils.parseUnits(amount, data.underlyingToken.decimals))
        .then((tx: any) => {
          tx.wait()
            .then((res: any) => {
              const { status, transactionHash } = res;
              toast?.dismiss(toastId);
              if (status !== 1) throw new Error('');
              setState((prevState) => ({
                ...prevState,
                isApproved: true,
                approving: false
              }));
              toast?.success({
                title: 'Approve Successfully!',
                // text: `Approve ${Big(amount).toFixed(2)} ${tokenSymbol}`,
                tx: transactionHash,
                chainId
              });
              onApprovedSuccess?.();
            })
            .catch(() => {
              setState((prevState) => ({
                ...prevState,
                isApproved: false,
                approving: false
              }));
            });
        })
        .catch((err: any) => {
          setState((prevState) => ({
            ...prevState,
            isApproved: false,
            approving: false
          }));
          toast?.dismiss(toastId);
          toast?.fail({
            title: 'Approve Failed!',
            text: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : null
          });
        });
    };
    return (
      <Button onClick={handleApprove} disabled={state.approving}>
        {state.approving || state.checking ? <LendingLoadingIcon size={16} /> : 'Approve'}
      </Button>
    );
  }

  const handleSubmit = () => {
    const toastId = toast?.loading({
      title: `Submitting ${tokenSymbol} ${actionText.toLowerCase()} request...`
    });
    setState((prevState) => ({
      ...prevState,
      pending: true
    }));

    provider
      .getSigner()
      .sendTransaction(unsignedTx)
      .then((tx: any) => {
        tx.wait()
          .then((res: any) => {
            const { status, transactionHash } = res;
            toast?.dismiss(toastId);
            setState((prevState) => ({
              ...prevState,
              pending: false
            }));
            addAction?.({
              type: 'Lending',
              action: actionText,
              token: data.underlyingToken,
              amount,
              template: data.dappName || data.dapp,
              add: false,
              status,
              transactionHash
            });
            if (status === 1) {
              onSuccess?.(data.dapp);
              toast?.success({
                title: `${tokenSymbol} ${actionText.toLowerCase()} request successed!`,
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
          })
          .catch(() => {
            setState((prevState) => ({
              ...prevState,
              pending: false
            }));
          });
      })
      .catch((err: any) => {
        setState((prevState) => ({
          ...prevState,
          pending: false
        }));
        console.log('err', err);
        toast?.dismiss(toastId);
        toast?.fail({
          title: err?.message?.includes('user rejected transaction')
            ? 'User rejected transaction'
            : `${tokenSymbol} ${actionText.toLowerCase()} request failed!`,
          tx: err ? err.hash : '',
          chainId
        });
      });
  };

  return (
    <>
      <Button
        disabled={state.pending || disabled || estimating || !state.isGasEnough}
        className={actionText.toLowerCase()}
        onClick={handleSubmit}
      >
        {state.pending || estimating ? (
          <LendingLoadingIcon size={16} />
        ) : !state.isGasEnough ? (
          `Not enough gas(${Big(state.gas || 0).toFixed(2)}) needed`
        ) : actionText === 'Deposit' ? (
          'Supply'
        ) : (
          actionText
        )}
      </Button>
    </>
  );
};

export default LendingDialogButton;
