// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo, useEffect } from 'react';
import styled from 'styled-components';

import Avatar from '@/modules/components/Avatar';
import Button from '@/modules/components/Button';
import { useMultiState } from '@/modules/hooks';
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

  .avatars {
    margin-right: 20px;
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
    color: var(--white);
    text-decoration: underline;
    cursor: pointer;
  }
`;

const UnStakeBtnWrap = styled.div`
  display: flex;
  column-gap: 22px;
  align-items: center;
  .switch-wrap {
    display: flex;
    align-items: center;
    column-gap: 8px;
    color: var(--purple);
  }
`;

const ChainBtnWrap = styled.div`
  margin-top: 16px;
  display: flex;
`;
export default memo(function Unstake(props) {
  const { data, account, provider, TOKENS, startUnlockIndex, addAction } = props;
  const curToken = data.tokenAddress;
  const { poolType, poolName, totalDeposit, unlocking, StakingAddress, stakedAmount } = data;

  const [state, updateState] = useMultiState({
    // isClaimRewards: false,
    inputValue: '',
    canUnstake: false,
    unstaking: false,
    stakedAmountShow: Number(stakedAmount).toFixed(2)
  });

  const handleInputChange = (e) => {
    updateState({
      inputValue: e.target.value
    });
  };
  function handleUnStake() {
    if (poolType === 'Locking') {
      handleUnStakeLocking();
    }
    if (poolType === 'MasterChief') {
      handleUnStakeMasterChief();
    }
  }

  function handleUnStakeLocking() {
    updateState({
      unstaking: true
    });
    const UnstakeContract = new ethers.Contract(
      StakingAddress,
      [
        {
          type: 'function',
          stateMutability: 'nonpayable',
          outputs: [],
          name: 'startUnlock',
          inputs: [
            {
              type: 'uint256',
              name: 'strategyIndex',
              internalType: 'uint256'
            },
            {
              type: 'uint256',
              name: 'amount',
              internalType: 'uint256'
            },
            {
              type: 'uint256',
              name: 'slotIndex',
              internalType: 'uint256'
            }
          ]
        }
      ],
      provider.getSigner()
    );

    UnstakeContract.startUnlock(0, ethers.utils.parseUnits(state.inputValue), startUnlockIndex, {
      gasLimit: 5000000
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
                action: 'Unstake',
                token: TOKENS[curToken],
                amount: state.inputValue,
                template: 'Athena Finance',
                add: false,
                status,
                transactionHash
              });
              updateStakedAmount();
            } else {
              toast.fail?.({
                title: 'Transaction Failed!',
                text: `transactionHash ${transactionHash}`
              });
            }
          })
          .finally(() => {
            updateState({
              unstaking: false
            });
          });
      })
      .catch((err) => {
        updateState({
          unstaking: false
        });
        console.log('handleUnStakeLocking_error:', err);
      });
  }

  function handleUnStakeMasterChief() {
    updateState({
      unstaking: true
    });
    const UnstakeContract = new ethers.Contract(
      StakingAddress,
      [
        {
          type: 'function',
          stateMutability: 'nonpayable',
          outputs: [],
          name: 'withdraw',
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
    UnstakeContract.withdraw(curToken, ethers.utils.parseUnits(state.inputValue))
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
                action: 'Unstake',
                token: TOKENS[curToken],
                amount: state.inputValue,
                template: 'Athena Finance',
                add: false,
                status,
                transactionHash
              });
              updateStakedAmount();
            } else {
              toast.fail?.({
                title: 'Transaction Failed!',
                text: `transactionHash ${transactionHash}`
              });
            }
          })
          .finally(() => {
            updateState({
              unstaking: false
            });
          });
      })
      .catch((err) => {
        updateState({
          unstaking: false
        });
        console.log('handleUnStakeMasterChief_error:', err);
      });
  }

  function updateStakedAmount() {
    updateState({
      stakedAmountShow: state.stakedAmountShow - state.inputValue
    });
  }

  function fillBalance() {
    updateState({
      inputValue: stakedAmount
    });
  }

  useEffect(() => {
    if (
      !state.inputValue ||
      !Big(Number(state.inputValue)).gt(0) ||
      Big(Number(state.inputValue)).gt(Big(stakedAmount || 0))
    ) {
      updateState({
        canUnstake: false
      });
    } else {
      updateState({
        canUnstake: true
      });
    }
  }, [state.inputValue]);
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
          Balance: <span className="amount-white">{state.stakedAmountShow}</span>
          {/* {TOKENS[curToken].symbol} */}
        </span>
      </AmountList>
      <UnStakeBtnWrap>
        <Button
          {...{
            text: 'Unstake',
            type: 'green',
            style: { flex: 1 },
            loading: state.unstaking,
            disabled: !state.canUnstake,
            onClick: handleUnStake
          }}
        />
      </UnStakeBtnWrap>
    </StakePanel>
  );
});
