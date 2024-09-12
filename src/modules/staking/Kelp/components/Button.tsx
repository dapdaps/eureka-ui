// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo, useEffect } from 'react';
import styled from 'styled-components';

import Loading from '@/modules/components/Loading';
import { useMultiState } from '@/modules/hooks';

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
const DEPOSIT_POOL_ABI = [
  {
    inputs: [{ internalType: 'string', name: 'referralId', type: 'string' }],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'asset', type: 'address' },
      { internalType: 'uint256', name: 'depositAmount', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'minRSETHAmountExpected',
        type: 'uint256'
      },
      { internalType: 'string', name: 'referralId', type: 'string' }
    ],
    name: 'depositAsset',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'minRSETHAmountExpected',
        type: 'uint256'
      },
      { internalType: 'string', name: 'referralId', type: 'string' }
    ],
    name: 'depositETH',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  }
];
const WITHDRAW_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'asset', type: 'address' },
      { internalType: 'uint256', name: 'rsETHUnstaked', type: 'uint256' }
    ],
    name: 'initiateWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

const Button = styled.button`
  background-color: var(--switch-color);
  color: var(--button-text-color);

  display: block;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  height: 56px;
  color: white;
  background-color: #075a5a;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.5s;
  margin-top: 20px;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.5;
  }
  /* &.borrow {
    background-color: var(--repay-border-color);
    border: 1px solid var(--repay-border-color);
  } */
`;
export default memo(function KelpButton(props) {
  const {
    tab,
    account,
    provider,
    actionText,
    amount,
    data,
    chainId,
    onSuccess,
    toast,
    addAction,
    loading: estimating,
    gas,
    dexConfig,
    stakeToken,
    onSwitchChain,
    DepositPool,
    ExchangeToken,
    WithdrawalContract
  } = props;
  const [state, updateState] = useMultiState({});
  // console.log("BUTTON--", props);
  const { parseUnits, formatUnits } = ethers.utils;

  let tokenSymbol;
  let tokenDecimals;
  let tokenAddr;
  let spender;
  if (actionText === 'Stake') {
    tokenSymbol = stakeToken?.symbol;
    tokenDecimals = stakeToken?.decimals;
    tokenAddr = stakeToken?.address;
    spender = DepositPool;
  }
  if (actionText === 'Unstake') {
    tokenSymbol = ExchangeToken.symbol;
    tokenDecimals = ExchangeToken.decimals;
    tokenAddr = ExchangeToken.address;
    spender = WithdrawalContract;
  }

  // console.log(tokenSymbol, tokenAddr, tokenDecimals, spender, amount);
  const ethChainId = 1;
  const switchChain = () => {
    onSwitchChain?.({ chainId: `0x${ethChainId.toString(16)}` });
  };

  function getAllowance() {
    updateState({
      pending: true
    });
    const TokenContract = new ethers.Contract(tokenAddr, ERC20_ABI, provider.getSigner());
    TokenContract.allowance(account, spender)
      .then((allowanceRaw) => {
        console.log('ALLOWANCE:', allowanceRaw.toString());
        updateState({
          pending: false,
          isApproved: !Big(formatUnits(allowanceRaw, tokenDecimals)).lt(amount || '0')
        });
      })
      .catch((err) => {
        console.log('getAllowance-error:', err);
        updateState({
          pending: false
        });
      });
  }
  function handleApprove() {
    const toastId = toast?.loading({
      title: `Approve ${tokenSymbol}`
    });
    updateState({
      approving: true
    });

    const TokenContract = new ethers.Contract(tokenAddr, ERC20_ABI, provider.getSigner());
    TokenContract.approve(spender, parseUnits(amount, tokenDecimals))
      .then((tx) => {
        tx.wait()
          .then((res) => {
            const { status, transactionHash } = res;
            toast?.dismiss(toastId);
            if (status !== 1) throw new Error('');
            updateState({
              isApproved: true,
              approving: false
            });
            toast?.success({
              title: 'Approve Successfully!',
              tx: transactionHash,
              chainId
            });
          })
          .catch((err) => {
            updateState({
              isApproved: false,
              approving: false
            });
          });
      })
      .catch((err) => {
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
  }

  function formatAddAction(actionText, _amount, status, transactionHash) {
    addAction?.({
      type: 'Staking',
      action: actionText,
      token: {
        symbol: tokenSymbol
      },
      amount: _amount,
      template: dexConfig.name,
      add: false,
      status,
      transactionHash
    });
  }

  function handleDepositErc20() {
    updateState({
      pending: true
    });
    const contract = new ethers.Contract(DepositPool, DEPOSIT_POOL_ABI, provider.getSigner());
    contract
      .depositAsset(tokenAddr, parseUnits(amount, tokenDecimals), 0, '0x00', {
        gasLimit: 4000000
      })
      .then((tx) => {
        tx.wait()
          .then((res) => {
            const { status, transactionHash } = res;
            if (status !== 1) throw new Error('');
            updateState({
              pending: false
            });
            onSuccess();
            formatAddAction(actionText, amount, status, transactionHash);
            toast?.success({
              title: `${actionText} Successfully!`,
              text: `${actionText} ${Big(amount).toFixed(2)} ${tokenSymbol}`,
              tx: transactionHash,
              chainId
            });
          })
          .catch((err) => {
            console.log('handleDeposit-error:', err);
            updateState({
              pending: false
            });
          });
      })
      .catch((err) => {
        updateState({
          pending: false
        });
        toast?.fail({
          title: `${actionText} Failed!`,
          text: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : ``
        });
      });
  }
  function otherChainsDepositETH() {
    updateState({
      pending: true
    });
    const contract = new ethers.Contract(DepositPool, DEPOSIT_POOL_ABI, provider.getSigner());
    contract
      .deposit('0x00', {
        value: parseUnits(amount),
        gasLimit: 4000000
      })
      .then((tx) => {
        tx.wait()
          .then((res) => {
            const { status, transactionHash } = res;
            if (status !== 1) throw new Error('');
            updateState({
              pending: false
            });
            onSuccess();
            formatAddAction(actionText, amount, status, transactionHash);
            toast?.success({
              title: `${actionText} Successfully!`,
              text: `${actionText} ${Big(amount).toFixed(2)} ${tokenSymbol}`,
              tx: transactionHash,
              chainId
            });
          })
          .catch((err) => {
            console.log('handleDeposit-error:', err);
            updateState({
              pending: false
            });
          });
      })
      .catch((err) => {
        updateState({
          pending: false
        });
        toast?.fail({
          title: `${actionText} Failed!`,
          text: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : ``
        });
      });
  }
  // for Ethereum chain
  function ethereumDepositETH() {
    updateState({
      pending: true
    });
    const contract = new ethers.Contract(DepositPool, DEPOSIT_POOL_ABI, provider.getSigner());
    contract
      .depositETH(0, '0x00', {
        value: parseUnits(amount),
        gasLimit: 4000000
      })
      .then((tx) => {
        tx.wait()
          .then((res) => {
            const { status, transactionHash } = res;
            if (status !== 1) throw new Error('');
            updateState({
              pending: false
            });
            onSuccess();
            formatAddAction(actionText, amount, status, transactionHash);
            toast?.success({
              title: `${actionText} Successfully!`,
              text: `${actionText} ${Big(amount).toFixed(2)} ${tokenSymbol}`,
              tx: transactionHash,
              chainId
            });
          })
          .catch((err) => {
            console.log('handleDeposit-error:', err);
            updateState({
              pending: false
            });
          });
      })
      .catch((err) => {
        updateState({
          pending: false
        });
        toast?.fail({
          title: `${actionText} Failed!`,
          text: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : ``
        });
      });
  }

  function handleWithdraw() {
    updateState({
      pending: true
    });
    const contract = new ethers.Contract(WithdrawalContract, WITHDRAW_ABI, provider.getSigner());
    contract
      .initiateWithdrawal(stakeToken.address, parseUnits(amount, tokenDecimals), {
        // gasLimit: 4000000,
      })
      .then((tx) => {
        tx.wait()
          .then((res) => {
            const { status, transactionHash } = res;
            if (status !== 1) throw new Error('');
            updateState({
              pending: false
            });
            onSuccess();
            formatAddAction(actionText, amount, status, transactionHash);
            toast?.success({
              title: `${actionText} Successfully!`,
              text: `${actionText} ${Big(amount).toFixed(2)} ${tokenSymbol}`,
              tx: transactionHash,
              chainId
            });
          })
          .catch((err) => {
            console.log('handleDeposit-error:', err);
            updateState({
              pending: false
            });
          });
      })
      .catch((err) => {
        updateState({
          pending: false
        });
        toast?.fail({
          title: `${actionText} Failed!`,
          text: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : ``
        });
      });
  }
  function handleClick() {
    if (actionText === 'Stake') {
      if (stakeToken.isNative) {
        if (chainId === 1) {
          ethereumDepositETH();
        } else {
          otherChainsDepositETH();
        }
      } else {
        handleDepositErc20();
      }
    }
    if (actionText === 'Unstake') {
      handleWithdraw();
    }
  }

  function render() {
    if (!actionText) return;
    if (actionText === 'Unstake' || actionText === 'Withdraw') {
      if (chainId !== 1) {
        return (
          <Button className={actionText.toLowerCase()} onClick={switchChain}>
            {`Switch to Ethereum to ${actionText}`}
          </Button>
        );
      }
    }
    if (!amount || !Number(amount)) {
      return (
        <Button disabled={true} className={actionText.toLowerCase()}>
          {tab === 'Stake' ? 'Stake' : 'Unstake'}
        </Button>
      );
    }
    if (!state.isApproved) {
      return (
        <Button onClick={handleApprove} disabled={state.approving}>
          {state.approving ? <Loading size={16} /> : 'Approve'}
        </Button>
      );
    }
    return (
      <Button disabled={state.pending} className={actionText.toLowerCase()} onClick={handleClick}>
        {state.pending ? <Loading size={16} /> : actionText}
      </Button>
    );
  }
  useEffect(() => {
    updateState({
      approving: false,
      isApproved: false
    });
  }, []);
  useEffect(() => {
    if (['Stake', 'Unstake'].includes(actionText) && !stakeToken?.isNative) {
      tokenAddr && getAllowance();
    } else {
      updateState({
        isApproved: true
      });
    }
  }, [amount, actionText]);
  return render();
});
