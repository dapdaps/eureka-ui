// @ts-nocheck
import Big from 'big.js';
import BN from 'bn.js';
import { ethers } from 'ethers';
import { memo, useEffect } from 'react';
import styled from 'styled-components';

import Button from '@/modules/components/Button';
import Select from '@/modules/components/Select';
import { useMultiState } from '@/modules/hooks';
import { useAllowance, useGetTokenBalance } from '@/modules/staking/hooks';
const StakePanel = styled.div`
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

const BoosterLiteWrapper = '0x98Ef32edd24e2c92525E59afc4475C1242a30184';
const BoosterLiteABI = [
  {
    inputs: [
      { internalType: 'uint256', name: '_pid', type: 'uint256' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'bool', name: '_stake', type: 'bool' }
    ],
    name: 'deposit',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

export default memo(function Stake(props) {
  const {
    data,
    account,
    provider,
    TOKENS,
    RewardPoolDepositWrapper,
    RewardPoolDepositABI,
    toast,
    addAction,
    tokenIcons
  } = props;
  const [state, updateState] = useMultiState({
    allowance: 0,
    curToken: '', // token address
    curTokenBal: 0,
    curSymbol: '',
    needApprove: false,
    isApproving: false,
    isApproved: false,
    canStake: false,
    isStaking: false,
    inputValue: '',
    selectData: [],
    updater: 0
  });
  const isEqual = data && state.curToken === data?.LP_token_address;
  function updateAllowance(allowanceRaw) {
    const allowAmount = ethers.utils.formatUnits(allowanceRaw, TOKENS[state.curToken]?.decimals ?? 18);
    updateState({
      allowance: allowAmount
    });
  }
  const handleApprove = (tokenAddress, _spender) => {
    updateState({
      isApproving: true
    });

    const TokenContract = new ethers.Contract(
      tokenAddress,
      [
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
      ],
      provider.getSigner()
    );
    console.info('to approve: ', tokenAddress, TOKENS[tokenAddress]?.decimals);

    TokenContract.approve(_spender, ethers.utils.parseUnits(state.inputValue, TOKENS[state.curToken]?.decimals || 18))
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
        console.info('approve_error: ', err);
        updateState({
          isApproving: false
        });
      });
  };

  const handleInputChange = (e) => {
    updateState({
      inputValue: e.target.value
    });
  };
  // amount: number | string | BN
  // decimals: number | BN
  const simpleToExactAmount = (amount, decimals) => {
    // Code is largely lifted from the guts of web3 toWei here:
    // https://github.com/ethjs/ethjs-unit/blob/master/src/index.js
    console.log('simpleToExactAmount: ', amount, decimals);
    let amountString = amount.toString();
    const decimalsBN = new BN(decimals);

    // if (decimalsBN.gt(100)) {
    //   console.info(`Invalid decimals amount`);
    // }

    const scale = new BN(10).pow(decimalsBN);
    const scaleString = scale.toString();

    // Is it negative?
    const negative = amountString.substring(0, 1) === '-';
    if (negative) {
      amountString = amountString.substring(1);
    }

    if (amountString === '.') {
      console.info(`Error converting number ${amountString} to precise unit, invalid value`);
    }

    // Split it into a whole and fractional part
    // eslint-disable-next-line prefer-const
    let [whole, fraction, ...rest] = amountString.split('.');
    if (rest.length > 0) {
      console.info(`Error converting number ${amountString} to precise unit, too many decimal points`);
    }

    if (!whole) {
      whole = '0';
    }
    if (!fraction) {
      fraction = '0';
    }

    if (fraction.length > scaleString.length - 1) {
      console.info(`Error converting number ${amountString} to precise unit, too many decimal places`);
    }

    while (fraction.length < scaleString.length - 1) {
      fraction += '0';
    }

    const wholeBN = new BN(whole);
    const fractionBN = new BN(fraction);
    let result = wholeBN.mul(scale).add(fractionBN);

    if (negative) {
      result = result.mul('-1');
    }

    return result;
  };

  function handleStakeBPT() {
    updateState({
      isStaking: true
    });
    const { Aura_Pool_ID } = data;
    const BPTContract = new ethers.Contract(BoosterLiteWrapper, BoosterLiteABI, provider.getSigner());
    console.log(ethers.utils.parseUnits(state.inputValue), data, props);
    BPTContract.deposit(Aura_Pool_ID, ethers.utils.parseUnits(state.inputValue), true, {
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
                token: state.curSymbol === 'BPT' ? { symbol: 'BPT' } : TOKENS[state.curToken],
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
      .catch((error) => {
        updateState({
          isStaking: false
        });
        console.log('Aura_Pool_ID_error:', error);
      });
  }

  function handleStake() {
    console.log('====state.curToken', state.curToken);
    console.log('====data.LP_token_address', data.LP_token_address);
    if (state.curToken === data.LP_token_address) {
      handleStakeBPT();
    } else {
      handleStakeToken();
    }
  }
  function handleStakeToken() {
    updateState({
      isStaking: true
    });
    const RewardsContract = new ethers.Contract(RewardPoolDepositWrapper, RewardPoolDepositABI, provider.getSigner());

    const { Rewards_contract_address, Balancer_Pool_ID, tokenAssets } = data;

    console.log('tokenAssets:', tokenAssets);

    const amountsIn = tokenAssets.map((token) =>
      state.curToken === token
        ? ethers.BigNumber.from(simpleToExactAmount(state.inputValue, TOKENS[state.curToken].decimals).toString())
        : 0
    );
    // let userData;

    // if (amountsIn.filter((item) => item === 0).length >= 2) {
    //   const lpIndex = tokenAssets.findIndex((item) => {
    //     return item.toUpperCase() === data.LP_token_address.toUpperCase();
    //   });
    //   const temp = [...amountsIn];
    //   temp.splice(lpIndex, 1);
    //   userData = ethers.utils.defaultAbiCoder.encode(['uint256', 'uint256[]', 'uint256'], [1, temp, 0]);
    // } else {
    //   userData = ethers.utils.defaultAbiCoder.encode(['uint256', 'uint256[]', 'uint256'], [1, amountsIn, 0]);
    // }

    const userData = ethers.utils.defaultAbiCoder.encode(
      ['uint256', 'uint256[]', 'uint256'],
      [1, amountsIn.length > 2 ? amountsIn.slice(0, -1) : amountsIn, 0]
    );
    const params = {
      _rewardPoolAddress: Rewards_contract_address,
      _inputToken: state.curToken,
      _inputAmount: ethers.BigNumber.from(ethers.utils.parseUnits(state.inputValue, TOKENS[state.curToken]?.decimals)),
      _balancerPoolId: Balancer_Pool_ID,
      _request: {
        assets: data.tokenAssets,
        maxAmountsIn: amountsIn,
        userData,
        fromInternalBalance: false
      }
    };

    const { _rewardPoolAddress, _inputToken, _inputAmount, _balancerPoolId, _request } = params;
    RewardsContract.depositSingle(_rewardPoolAddress, _inputToken, _inputAmount, _balancerPoolId, _request, {
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
                token: state.curSymbol === 'BPT' ? { symbol: 'BPT' } : TOKENS[state.curToken],
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
          .catch((error) => {
            console.info('tx_error: ', error);
            toast.fail?.({
              title: 'Transaction Failed!',
              text: `${error.message}`
            });
          })
          .finally(() => {
            updateState({
              isStaking: false,
              updater: new Date().getTime()
            });
          });
      })
      .catch((err) => {
        console.info('RewardsContract_error:', err);
        updateState({
          isStaking: false
        });
      });
  }

  function fillBalance() {
    updateState({
      inputValue: state.curTokenBal
    });
  }

  const renderExtra = () => {
    return (
      <>
        <AmountList>
          <span></span>
          <span>
            Balance:{' '}
            <span className="amount-white" onClick={fillBalance}>
              {Number(state.curTokenBal).toFixed(2)}
            </span>
            {state.curSymbol}
          </span>
        </AmountList>
        <StakeBtnWrap>
          <Button
            {...{
              text: 'Approve',
              type: 'primary',
              style: { flex: 1 },
              disabled: !state.needApprove || state.isApproved,
              loading: state.isApproving,
              onClick: () => {
                if (state.curToken === data.LP_token_address) {
                  handleApprove(data.LP_token_address, BoosterLiteWrapper);
                } else {
                  handleApprove(state.curToken, RewardPoolDepositWrapper);
                }
              }
            }}
          />
          <Button
            {...{
              text: 'Stake',
              type: 'primary',
              style: { flex: 1 },
              disabled: !state.canStake,
              loading: state.isStaking,
              onClick: handleStake
            }}
          />
        </StakeBtnWrap>
      </>
    );
  };
  function updateTokenBalance(bal) {
    updateState({
      curTokenBal: bal
    });
  }

  useAllowance({
    tokenAddress: isEqual ? data.LP_token_address : state.curToken,
    owner: account,
    provider,
    spender: isEqual ? BoosterLiteWrapper : RewardPoolDepositWrapper,
    updateAllowance
  });
  useGetTokenBalance({
    tokenAddress: state.curToken,
    owner: account,
    provider,
    updater: state.updater,
    updateTokenBalance
  });
  useEffect(() => {
    console.log('====data', data);
    if (data) {
      const { tokenAssets } = data;
      if (tokenAssets) {
        const selectData = tokenAssets.map((item) =>
          TOKENS[item]
            ? {
                value: item,
                text: TOKENS[item].symbol,
                icons: [TOKENS[item].icon]
              }
            : null
        );
        const usefulSelect = selectData.filter((n) => n);

        usefulSelect.unshift({
          value: data.LP_token_address,
          text: 'BPT',
          icons: tokenIcons
        });

        updateState({
          selectData: usefulSelect
        });
      }
    }
  }, [data]);

  useEffect(() => {
    // get token allowance when current token change
    if (!state.curToken) {
      // const defaultToken = data?.tokenAssets[0];
      const defaultToken = state?.selectData[0]?.value;
      updateState({
        curToken: defaultToken,
        curSymbol: TOKENS && TOKENS[state?.curToken]?.symbol
      });
    } else {
      if (state.curToken === data.LP_token_address) {
        updateState({
          curTokenBal: data.bptAmount,
          curSymbol: 'BPT'
        });
      } else {
        updateState({
          curSymbol: TOKENS[state.curToken].symbol
        });
      }
    }
  }, [state.curToken]);

  useEffect(() => {
    if (!state.inputValue) {
      // input none
      updateState({
        needApprove: false,
        canStake: false
      });
    }
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
  }, [state.inputValue, state.allowance, state.curToken]);

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
  }, [state.isApproved]);
  console.log('STAKE_STATE', state);
  console.log('====props', props);
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
        <div className="input-group-append">
          <Select
            {...{
              options: state.selectData,
              noLabel: true,
              value: state.selectData.find((obj) => obj.value === state.curToken),
              onChange: (option) => {
                updateState({
                  curToken: option.value
                });
              }
            }}
          />
        </div>
      </div>
      {renderExtra()}
    </StakePanel>
  );
});
