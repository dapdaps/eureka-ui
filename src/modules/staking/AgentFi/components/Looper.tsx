// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

import Balance from '@/modules/components/Balance';
import Loading from '@/modules/components/Loading';
import Select from '@/modules/components/Select';
import Spinner from '@/modules/components/Spinner';
import { useMultiState } from '@/modules/hooks';

const StyledContainer = styled.div``;
const StyledFormItem = styled.div`
  border-bottom: 1px solid #373a53;
  padding-bottom: 18px;
  padding-top: 18px;

  &.inline {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &:first-child {
    padding-top: 0;
  }
`;
const StyledFormItemTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  color: #979abe;
`;
const StyledFormItemBody = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;
const StyledFormItemFoot = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  color: rgba(151, 154, 190, 1);
`;
const StyledInput = styled.input`
  flex: 1;
  width: 0;
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  border: none;
  height: 24px;
  outline: none;
  background-color: transparent;
  padding: 0;

  &:focus {
    color: #fff;
    background-color: transparent;
    border-color: transparent;
    outline: none;
    box-shadow: none;
  }
`;
const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 8px;
  margin-top: 8px;
`;
const StyledListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;

  .label {
    color: #979abe;
  }
  .value {
    color: #fff;
  }
`;
const StyledButton = styled.button`
  background: var(--switch-color);
  color: var(--button-text-color);

  display: block;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  height: 56px;
  line-height: 56px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.5s;
  margin-top: 20px;
  text-align: center;

  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const StyledFullSelect = styled.div`
  width: 100%;

  > div {
    width: 100%;

    > div[type='button'] {
      width: 100%;
    }
  }
`;

const DEPOSIT_POOL_ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'wrapMint', type: 'address' },
          { internalType: 'address', name: 'otoken', type: 'address' },
          { internalType: 'address', name: 'underlying', type: 'address' },
          { internalType: 'uint8', name: 'mode', type: 'uint8' },
          { internalType: 'uint256', name: 'leverage', type: 'uint256' }
        ],
        name: 'mintParams',
        type: 'tuple'
      },
      {
        components: [
          { internalType: 'address', name: 'token', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' }
        ],
        name: 'deposit',
        type: 'tuple'
      }
    ],
    name: 'createLoopooorAgentAndExplorer',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'wrapMint', type: 'address' },
          { internalType: 'address', name: 'otoken', type: 'address' },
          { internalType: 'address', name: 'underlying', type: 'address' },
          { internalType: 'uint8', name: 'mode', type: 'uint8' },
          { internalType: 'uint256', name: 'leverage', type: 'uint256' }
        ],
        name: 'mintParams',
        type: 'tuple'
      },
      {
        components: [
          { internalType: 'address', name: 'token', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' }
        ],
        name: 'deposit',
        type: 'tuple'
      },
      { internalType: 'address', name: 'rootAgentAddress', type: 'address' }
    ],
    name: 'createLoopooorAgentForRoot',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  }
];

const { parseUnits, formatUnits } = ethers.utils;

export default memo(function Looper(props) {
  const {
    prices,
    currentStrategy,
    dexConfig,
    getTokenBalance,
    rootAgent,
    onSuccess,
    addAction,
    toast,
    chainId,
    handleApprove
  } = props;

  const { StakeTokens } = dexConfig;

  const actionText = 'Stake';

  const [state, updateState] = useMultiState({
    stakeAmount: '',
    stakeTokens: [],
    stakeToken: {},
    stakeTokenBalance: 0,
    pending: false,
    stakeMode: currentStrategy.meta.modeList[0]
  });

  const { stakeAmount, stakeTokens, stakeToken, stakeTokenBalance, pending, stakeMode, provider } = state;

  const modeList = currentStrategy.meta.modeList.map((it) => {
    const obj = {
      ...it
    };
    if (it.text === 'Boost Points') {
      obj.text = `${it.text} - ${currentStrategy.meta.PointsRate[stakeToken.value]}x`;
    }
    return obj;
  });

  const handleAmount = (ev) => {
    if (isNaN(Number(ev.target.value))) return;
    let amount = ev.target.value.replace(/\s+/g, '');

    if (Big(amount || 0).gt(Big(state.stakeTokenBalance || 0))) {
      amount = Big(state.stakeTokenBalance || 0).toFixed(4, 0);
    }
    updateState({
      stakeAmount: amount
    });
  };

  const handleToken = (option) => {
    if (option.value === state.stakeToken.value) return;
    updateState({
      stakeToken: option,
      stakeAmount: ''
    });
    const currToken = StakeTokens.find((it) => it.symbol === option.value);
    currToken &&
      getTokenBalance(currToken).then((value) => {
        updateState({
          stakeTokenBalance: value
        });
      });
  };

  const handleBalance = (value) => {
    updateState({
      stakeAmount: Big(value).toFixed(4, 0)
    });
  };

  const handleMode = (option) => {
    updateState({
      stakeMode: option
    });
  };

  const formatAddAction = (actionText, _amount, status, transactionHash, tokenSymbol) => {
    addAction?.({
      type: 'Staking',
      action: actionText,
      token: {
        symbol: tokenSymbol
      },
      amount: _amount,
      template: props.name,
      add: false,
      status,
      transactionHash
    });
  };

  const handleSubmit = () => {
    if (Big(state.stakeAmount).lte(0)) return;
    updateState({
      pending: true
    });
    handleApprove(
      currentStrategy.meta.contract,
      state.stakeToken.address,
      state.stakeAmount,
      state.stakeToken.decimals
    ).then((approveRes) => {
      if (!approveRes) {
        updateState({
          pending: false
        });
        return;
      }
      const stakeAmountShown = Big(state.stakeAmount || 0).toFixed(state.stakeToken.decimals, Big.roundDown);
      let method = 'createLoopooorAgentAndExplorer';
      const params = [
        [
          // wrapMint
          currentStrategy.meta.wrapMint[state.stakeToken.value],
          // otoken
          currentStrategy.meta.otoken[state.stakeToken.value],
          // underlying
          currentStrategy.meta.underlying[state.stakeToken.value],
          // mode
          state.stakeMode.value,
          // leverage
          parseUnits('2', 18)
        ],
        [
          // token
          currentStrategy.meta.underlying[state.stakeToken.value],
          // amount
          parseUnits(stakeAmountShown, state.stakeToken.decimals)
        ]
      ];

      if (['DUSD', 'DETH'].includes(state.stakeToken.value)) {
        params[0][3] = 0;
      }

      if (rootAgent && rootAgent.agentAddress) {
        params.push(
          // rootAgentAddress
          rootAgent.agentAddress
        );
        method = 'createLoopooorAgentForRoot';
      }

      const contract = new ethers.Contract(currentStrategy.meta.contract, DEPOSIT_POOL_ABI, provider.getSigner());

      const getTx = (gas) => {
        const contractOption = {
          gasLimit: gas || 4000000
        };
        if (['ETH'].includes(state.stakeToken.value)) {
          contractOption.value = parseUnits(stakeAmountShown, state.stakeToken.decimals);
        }
        contract[method](...params, contractOption)
          .then((tx) => {
            tx.wait()
              .then((res) => {
                const { status, transactionHash } = res;
                updateState({
                  pending: false
                });
                if (status !== 1) throw new Error('');
                onSuccess();
                formatAddAction(actionText, stakeAmountShown, status, transactionHash, state.stakeToken.value);
                toast?.success({
                  title: `${actionText} Successfully!`,
                  text: `${actionText} ${Big(stakeAmountShown).toFixed(2)} ${state.stakeToken.value}`,
                  tx: transactionHash,
                  chainId
                });
              })
              .catch((err) => {
                console.log('tx error: ', err);
                updateState({
                  pending: false
                });
                toast?.fail({
                  title: `${actionText} Failed!`,
                  text: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : ``
                });
              });
          })
          .catch((err) => {
            console.log('contract fn error: ', err);
            updateState({
              pending: false
            });
            toast?.fail({
              title: `${actionText} Failed!`,
              text: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : ``
            });
          });
      };

      const estimateGas = () => {
        contract.estimateGas[method](...params, { value: parseUnits(stakeAmountShown, state.stakeToken.decimals) })
          .then((gas) => {
            getTx(gas);
          })
          .catch((err) => {
            console.log('get gas failed: ', err);
            getTx();
          });
      };

      estimateGas();
    });
  };

  useEffect(() => {
    const _stakeTokens = [];
    StakeTokens.forEach((it) => {
      _stakeTokens.push({
        ...it,
        text: it.symbol,
        value: it.symbol,
        icons: [it.icon]
      });
    });
    updateState({
      stakeMode: currentStrategy.meta.modeList[0],
      stakeTokens: _stakeTokens,
      stakeToken: _stakeTokens[0]
    });
    getTokenBalance(StakeTokens[0]).then((value) => {
      updateState({
        stakeTokenBalance: value
      });
    });
  }, []);

  return (
    <StyledContainer>
      <StyledFormItem>
        <StyledFormItemTitle>Stake</StyledFormItemTitle>
        <StyledFormItemBody>
          <StyledInput type="text" placeholder="0" value={stakeAmount} onChange={handleAmount} />
          <Select
            {...{
              options: stakeTokens,
              value: stakeToken,
              onChange: handleToken
            }}
          />
        </StyledFormItemBody>
        <StyledFormItemFoot>
          <div className="prices">
            $
            {Big(stakeAmount || 0)
              .times(Big(prices[stakeToken.value] || 1))
              .toFixed(2, 0)}
          </div>
          <div className="balance">
            Balance:
            <Balance
              {...{
                value: stakeTokenBalance,
                digit: 4,
                onClick: handleBalance,
                symbol: stakeToken.value
              }}
            />
          </div>
        </StyledFormItemFoot>
      </StyledFormItem>
      <StyledFormItem>
        <StyledFormItemTitle>Mode</StyledFormItemTitle>
        <StyledFormItemBody>
          <StyledFullSelect>
            <Select
              {...{
                options: modeList,
                value: stakeMode,
                onChange: handleMode
              }}
            />
          </StyledFullSelect>
        </StyledFormItemBody>
      </StyledFormItem>
      <StyledList>
        <StyledListItem>
          <span className="label">Supply</span>
          <span className="value">
            {Big(stakeAmount || 0)
              .times(2)
              .toString()}{' '}
            ETH
          </span>
        </StyledListItem>
        <StyledListItem>
          <span className="label">Borrow</span>
          <span className="value">{Big(stakeAmount || 0).toString()} ETH</span>
        </StyledListItem>
        <StyledListItem>
          <span className="label">Leverage</span>
          <span className="value">{currentStrategy.meta.leverage}x</span>
        </StyledListItem>
        <StyledListItem>
          <span className="label">Target LTV</span>
          <span className="value">{currentStrategy.meta.targetLTV}</span>
        </StyledListItem>
      </StyledList>
      <StyledButton disabled={pending || !stakeAmount} onClick={handleSubmit}>
        {pending ? <Loading size={16} /> : stakeAmount ? 'Launch Strategy' : 'Enter An Amount'}
      </StyledButton>
    </StyledContainer>
  );
});
