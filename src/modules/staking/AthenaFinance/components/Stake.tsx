// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo, useEffect } from 'react';
import styled from 'styled-components';

import Avatar from '@/modules/components/Avatar';
import Button from '@/modules/components/Button';
import { useMultiState } from '@/modules/hooks';

import { useAllowance, useGetTokenBalance } from '../../hooks';
const StakePanel = styled.div`
  width: 510px;
  margin: 0 auto;
  /* reset input */
  .bos-input-number {
    background-color: var(--dark);
    color: var(--white);
    border: none;
    border-radius: 10px !important;
  }
  .input-group {
    column-gap: 5px;
  }
  .append-token {
    display: flex;
    align-items: center;
    gap: 6px;
    position: absolute;
    right: 12px;
    /* top: 4px; */
    height: 36px;
    z-index: 5;
  }
`;
const AmountList = styled.div`
  display: flex;
  font-size: var(--fz12);
  color: var(--purple);
  justify-content: space-between;
  padding: 10px 0 16px;
  .amount-left {
  }
  .amount-right {
  }
  .amount-white {
    text-decoration: underline;
    color: var(--white);
    cursor: pointer;
  }
`;
const StakeBtnWrap = styled.div`
  display: flex;
  column-gap: 14px;
`;
const ChainBtnWrap = styled.div`
  margin-top: 16px;
  display: flex;
`;

const ApproveABI = [
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

export default memo(function Stake(props) {
  const { data, account, provider, TOKENS, toast, addAction } = props;

  // curToken: token address
  const { poolType, tokenAddress: curToken, tokenAddress, StakingAddress } = data;
  const [state, updateState] = useMultiState({
    allowance: 0,
    curTokenBal: 0,
    needApprove: false,
    isApproving: false,
    isApproved: false,
    canStake: false,
    isStaking: false,
    inputValue: ''
  });

  function handleApprove(tokenAddress, spender) {
    updateState({
      isApproving: true
    });
    const TokenContract = new ethers.Contract(tokenAddress, ApproveABI, provider.getSigner());
    console.info('to approve: ', state.inputValue, TOKENS[curToken].decimals);

    TokenContract.approve(spender, ethers.utils.parseUnits(state.inputValue, TOKENS[curToken].decimals))
      .then((tx) => {
        tx.wait()
          .then((res) => {
            const { status, transactionHash } = res;
            console.info('approve_tx_res:', res);
            updateState({
              isApproved: status === 1,
              isApproving: false
            });
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
            updateState({
              isApproving: false
            });
          });
      })
      .catch((err) => {
        updateState({
          isApproving: false
        });
        console.info('approve_error: ', err);
      });
  }
  const handleInputChange = (e) => {
    updateState({
      inputValue: e.target.value
    });
  };

  function handleStake() {
    if (poolType === 'Locking') {
      handleLocking();
    }
    if (poolType === 'MasterChief') {
      handleMasterChief();
    }
  }

  function handleMasterChief() {
    updateState({
      isStaking: true
    });
    const MasterChiefContract = new ethers.Contract(
      StakingAddress,
      [
        {
          type: 'function',
          stateMutability: 'nonpayable',
          outputs: [],
          name: 'deposit',
          inputs: [
            {
              type: 'address',
              name: '_lp',
              internalType: 'address'
            },
            {
              type: 'uint256',
              name: '_amount',
              internalType: 'uint256'
            }
          ]
        }
      ],
      provider.getSigner()
    );
    const _amount = ethers.BigNumber.from(ethers.utils.parseUnits(state.inputValue, TOKENS[curToken].decimals));
    MasterChiefContract.deposit('0x31cfdA26D5841d92333D8F9B3acbd5efEedb39c1', _amount, {
      gasLimit: 1173642
    })
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
              addAction?.({
                type: 'Staking',
                action: 'Stake',
                token: TOKENS[curToken],
                amount: state.inputValue,
                template: 'Athena Finance',
                add: false,
                status,
                transactionHash
              });
            } else {
              toast.fail?.({
                title: 'Transaction Failed!',
                text: `transactionHash ${transactionHash}`
              });
            }
          })
          .catch((error) => {
            console.info('tx_error: ', error);
            toast.fail?.({
              title: 'Transaction Failed!',
              text: `${error.message}`
            });
          })
          .finally(() => {
            updateState({
              isStaking: false
            });
          });
      })
      .catch((err) => {
        console.info('LockingContract_error:', err);
        updateState({
          isStaking: false
        });
      });
  }

  function handleLocking() {
    updateState({
      isStaking: true
    });
    const LockingContract = new ethers.Contract(
      StakingAddress,
      [
        {
          type: 'function',
          stateMutability: 'nonpayable',
          outputs: [],
          name: 'deposit',
          inputs: [
            {
              type: 'uint256',
              name: '_amount',
              internalType: 'uint256'
            }
          ]
        }
      ],
      provider.getSigner()
    );
    const _amount = ethers.BigNumber.from(ethers.utils.parseUnits(state.inputValue, TOKENS[curToken].decimals));
    LockingContract.deposit(_amount, {
      gasLimit: 1173642
    })
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
              addAction?.({
                type: 'Staking',
                action: 'Stake',
                token: TOKENS[curToken],
                amount: state.inputValue,
                template: 'Athena Finance',
                add: false,
                status,
                transactionHash
              });
            } else {
              toast.fail?.({
                title: 'Transaction Failed!',
                text: `transactionHash ${transactionHash}`
              });
            }
          })
          .catch((error) => {
            console.info('tx_error: ', error);
            toast.fail?.({
              title: 'Transaction Failed!',
              text: `${error.message}`
            });
          })
          .finally(() => {
            updateState({
              isStaking: false
            });
          });
      })
      .catch((err) => {
        console.info('LockingContract_error:', err);
        updateState({
          isStaking: false
        });
      });
  }

  function updateAllowance(allowanceRaw) {
    const allowAmount = ethers.utils.formatUnits(allowanceRaw, TOKENS[curToken].decimals);

    updateState({
      allowance: allowAmount
    });
  }
  function updateTokenBalance(bal) {
    updateState({
      curTokenBal: bal
    });
  }

  function fillBalance() {
    updateState({
      inputValue: state.curTokenBal
    });
  }

  useAllowance({
    tokenAddress: curToken,
    owner: account,
    spender: StakingAddress,
    updateAllowance
  });
  useGetTokenBalance({
    tokenAddress: curToken,
    owner: account,
    updateTokenBalance
  });
  useEffect(() => {
    if (!state.inputValue) {
      // input none
      updateState({
        needApprove: false,
        canStake: false
      });
    } else {
      if (Big(state.allowance).lt(Big(state.inputValue || 0))) {
        updateState({
          canStake: false,
          isApproved: false,
          needApprove: true
        });
      } else {
        if (Big(state.inputValue || 0).gt(0)) {
          updateState({
            canStake: true,
            needApprove: false
          });
        }
      }
    }
  }, [state.inputValue, state.allowance, state.inputValue, curToken]);

  useEffect(() => {
    if (state.isApproved && Big(state.inputValue || 0).gt(0)) {
      updateState({
        canStake: true
      });
    } else {
      updateState({
        canStake: false
      });
    }
  }, [state.isApproved, state.inputValue]);

  return (
    <StakePanel>
      <div className="input-group">
        <input
          value={state.inputValue}
          type="number"
          className="form-control bos-input-number"
          placeholder="0.0"
          onChange={handleInputChange}
        />
        <div className="append-token">
          <Avatar src={TOKENS[curToken]?.icon} size={20} />
        </div>
      </div>

      <AmountList>
        <span></span>
        <span onClick={fillBalance}>
          Balance: <span className="amount-white">{Number(state.curTokenBal).toFixed(2)}</span>
          {/* {TOKENS[curToken].symbol} */}
        </span>
      </AmountList>
      <StakeBtnWrap>
        <Button
          {...{
            text: 'Approve',
            type: 'green',
            style: { flex: 1 },
            disabled: !state.needApprove || state.isApproved,
            loading: state.isApproving,
            onClick: () => {
              handleApprove(curToken, StakingAddress);
            }
          }}
        />
        <Button
          {...{
            text: 'Stake',
            type: 'green',
            style: { flex: 1 },
            disabled: !state.canStake,
            loading: state.isStaking,
            onClick: handleStake
          }}
        />
      </StakeBtnWrap>
    </StakePanel>
  );
});
