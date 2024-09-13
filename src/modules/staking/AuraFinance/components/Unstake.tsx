// @ts-nocheck
import * as Switch from '@radix-ui/react-switch';
import { memo } from 'react';
import styled from 'styled-components';

import Avatar from '@/modules/components/Avatar';
import Button from '@/modules/components/Button';
import Select from '@/modules/components/Select';
import { useMultiState } from '@/modules/hooks';
import { formatValueDecimal } from '@/utils/formate';
// switch begin
const SwitchRoot = styled(Switch.Root)`
  all: unset;
  display: block;
  width: 42px;
  height: 24px;
  background-color: #232534;
  border-radius: 9999px;
  position: relative;
  box-shadow: 0 2px 10px #232534;
  border: 1px solid #373a53;
  &[data-state='checked'] {
    background-color: #783ae3;
  }
`;

const SwitchThumb = styled(Switch.Thumb)`
  all: unset;
  display: block;
  width: 18px;
  height: 18px;
  background-color: white;
  border-radius: 9999px;
  box-shadow: 0 2px 2px var(--blackA7);
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;
  border: 1px solid #373a53;
  &[data-state='checked'] {
    transform: translateX(19px);
  }
`;
// switch end

const Wrap = styled.div`
  width: 510px;
  margin: 0 auto;
  .bos-input-number {
    background-color: var(--dark);
    color: var(--white);
    border: none;
    border-radius: 10px !important;
  }
  .input-group {
    column-gap: 5px;
  }
  .avatars {
    margin-right: 20px;
  }
  .input-group-append {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 138px;
    height: 34px;
    background: #2e3142;
    border: 1px solid #d0d5dd;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 10px !important;
    color: white;
    font-size: 14px;
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
const StakeBtnWrap = styled.div`
  display: flex;
  column-gap: 14px;
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
  const { data, account, TOKENS, switchChain, toast, addAction } = props;
  console.log('===data', data);
  const {
    poolName,
    tokenAssets,
    stakedAmount,
    reward,
    Rewards_contract_address,
    Rewards_depositor_contract_address,
    LP_token_address
  } = data || {};

  const [state, updateState] = useMultiState({
    isClaimRewards: false,
    inputValue: '',
    canUnstake: false,
    unstaking: false,
    stakedAmountShow: Number(stakedAmount).toFixed(2)
  });

  const handleSwitch = (isChecked) => {
    updateState({
      isClaimRewards: isChecked
    });
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (isNaN(Number(value))) return;
    const isZero = Big(value || 0).eq(0);
    if (isZero) {
      updateState({
        inputValue: value,
        canUnstake: false
      });
      return;
    }
    const obj = {};
    obj.inputValue = value;

    if (Big(value || 0).lt(stakedAmount || 0)) {
      obj.canUnstake = true;
    } else {
      obj.canUnstake = false;
    }
    updateState({
      ...obj
    });
  };

  const handleUnStake = () => {
    updateState({
      unstaking: true
    });
    const UnstakeContract = new ethers.Contract(
      Rewards_contract_address,
      [
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256'
            },
            {
              internalType: 'bool',
              name: 'claim',
              type: 'bool'
            }
          ],
          name: 'withdrawAndUnwrap',
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
      Ethers.provider().getSigner()
    );
    UnstakeContract.withdrawAndUnwrap(ethers.utils.parseUnits(state.inputValue), state.isClaimRewards)
      .then((tx) => {
        console.log('tx: ', tx);
        tx.wait()
          .then((res) => {
            const { status, transactionHash } = res;
            console.info('tx_res: ', res);
            if (status === 1) {
              updateState({
                stakedAmountShow: Big(stakedAmount).minus(Big(state.inputValue)).toFixed(2)
              });
              toast.success?.({
                title: 'Transaction Successful!',
                text: `transactionHash ${transactionHash}`
              });
              addAction?.({
                type: 'Staking',
                action: 'Unstake',
                token: { symbol: 'BPT' },
                amount: state.inputValue,
                template: 'Aura Finance',
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
          .finally(() => {
            updateState({
              unstaking: false
            });
          });
      })
      .catch((err) => {
        if (!err?.message.includes('user rejected transaction')) {
          toast.fail?.({
            title: 'Transaction Failed',
            text: err?.data?.message || err?.message
          });
        } else {
          toast.fail?.({
            title: 'Transaction Failed',
            text: `User rejected the request. Details: 
            MetaMask Tx Signature: User denied transaction signature. `
          });
        }
      });
    // .finally(() => {
    //   updateState({
    //     unstaking: false,
    //   });
    // });
  };

  const renderPoolIcon = () => {
    if (tokenAssets) {
      return tokenAssets.map((addr, index) => {
        if (TOKENS[addr]) {
          return (
            <span key={index} style={{ marginRight: -12 }}>
              <Avatar src={TOKENS[addr].icon} />
            </span>
          );
        }
        return null;
      });
    }
  };
  function fillBalance() {
    updateState({
      inputValue: stakedAmount
    });
  }

  return (
    <Wrap>
      <div className="input-group">
        <input
          value={state.inputValue}
          className="form-control bos-input-number"
          placeholder="0.0"
          onChange={handleInputChange}
        />
        <div className="input-group-append">
          <span className="avatars">{renderPoolIcon()}</span>
          BPT
        </div>
      </div>

      <AmountList>
        {/* <span>${stakedAmount}</span> */}
        <span></span>
        <span>
          You Staked:{' '}
          <span className="amount-white" onClick={fillBalance}>
            {state.stakedAmountShow}
          </span>{' '}
          BPT
        </span>
      </AmountList>
      <UnStakeBtnWrap>
        <div className="switch-wrap">
          <SwitchRoot checked={state.isClaimRewards} onCheckedChange={handleSwitch}>
            <SwitchThumb />
          </SwitchRoot>
          <span>Claim Rewards</span>
        </div>
        <Button
          {...{
            text: 'Unstake',
            type: 'primary',
            style: { flex: 1 },
            loading: state.unstaking,
            disabled: !state.canUnstake,
            onClick: handleUnStake
          }}
        />
      </UnStakeBtnWrap>
    </Wrap>
  );
});
