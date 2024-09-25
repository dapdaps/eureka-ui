// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

import Balance from '@/modules/components/Balance';
import Loading from '@/modules/components/Loading';
import Select from '@/modules/components/Select';
import { useMultiState } from '@/modules/hooks';
import { formatValueDecimal } from '@/utils/formate';
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

const StyledProtocolList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const StyledProtocol = styled.a`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  width: 117px;
  height: 95px;
  border: 1px solid #373a53;
  border-radius: 16px;
  padding: 8px;

  .protocol-icon {
    width: 50px;
    height: 50px;
  }
  .protocol-name {
    color: #979abe;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-decoration: none;
  }
`;
const StyledDexTips = styled.div`
  color: #979abe;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 10px;
`;
const StyledFontWrap = styled.div`
  color: #fff;
  text-decoration: underline;
  cursor: pointer;
`;

const DEPOSIT_POOL_ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'token', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' }
        ],
        name: 'deposit0',
        type: 'tuple'
      },
      {
        components: [
          { internalType: 'address', name: 'token', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' }
        ],
        name: 'deposit1',
        type: 'tuple'
      },
      { internalType: 'address', name: 'receiver', type: 'address' }
    ],
    name: 'createDexBalancerAgentAndExplorerAndRefundExcess',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'token', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' }
        ],
        name: 'deposit0',
        type: 'tuple'
      },
      {
        components: [
          { internalType: 'address', name: 'token', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' }
        ],
        name: 'deposit1',
        type: 'tuple'
      },
      { internalType: 'address', name: 'rootAgentAddress', type: 'address' },
      { internalType: 'address', name: 'receiver', type: 'address' }
    ],
    name: 'createDexBalancerAgentForRootAndRefundExcess',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  }
];

const { parseUnits, formatUnits } = ethers.utils;

export default memo(function DEXBalancer(props: any) {
  const {
    prices,
    currentStrategy,
    dexConfig,
    getTokenBalance,
    account,
    provider,
    rootAgent,
    onSuccess,
    addAction,
    toast,
    chainId,
    handleApprove
  } = props;
  const { StakeTokens } = dexConfig;
  const actionText = 'Stake';
  const [state, updateState] = useMultiState<any>({
    currentEthToken: {},
    ethAmount: '',
    ethTokens: [],
    currentEthTokenBalance: 0,
    pending: false,

    usdAmount: '',
    usdTokens: [],
    currentUsdToken: {},
    currentUsdTokenBalance: 0
  });

  const {
    pending,
    ethAmount,
    currentEthToken,
    ethTokens,
    currentEthTokenBalance,
    usdAmount,
    usdTokens,
    currentUsdToken,
    currentUsdTokenBalance
  } = state;

  const handleEthAmount = (ev) => {
    if (isNaN(Number(ev.target.value))) return;
    let amount = ev.target.value.replace(/\s+/g, '');

    if (!amount) {
      updateState({
        ethAmount: '',
        usdAmount: ''
      });
      return;
    }

    if (Big(amount || 0).gt(Big(state.currentEthTokenBalance || 0))) {
      amount = Big(state.currentEthTokenBalance || 0).toFixed(4, 0);
    }
    updateState({
      ethAmount: amount,
      usdAmount: Big(amount)
        .times(prices[state.currentEthToken.value])
        .div(prices[state.currentUsdToken.value])
        .toFixed(state.currentUsdToken.decimals, 0)
    });
  };

  const handleEthToken = (option) => {
    if (option.value === state.currentEthToken.value) return;
    updateState({
      currentEthToken: option,
      ethAmount: ''
    });
    const currToken = StakeTokens.find((it) => it.symbol === option.value);
    currToken &&
      getTokenBalance(currToken).then((value) => {
        updateState({
          currentEthTokenBalance: value
        });
      });
  };

  const handleEthBalance = (value) => {
    // auto enter usd amount
    const updates = {
      ethAmount: Big(value).toFixed(4, 0)
    };
    updates.usdAmount = Big(updates.ethAmount)
      .times(prices[state.currentEthToken.value])
      .div(prices[state.currentUsdToken.value])
      .toFixed(state.currentUsdToken.decimals, 0);
    updateState(updates);
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
    if (Big(state.ethAmount).lte(0) || Big(state.usdAmount).lte(0)) return;
    // if rootAgent.agentAddress: use createDexBalancerAgentForRootAndRefundExcess
    // else: use createDexBalancerAgentAndExplorerAndRefundExcess
    updateState({
      pending: true
    });
    const approveList = [
      handleApprove(
        currentStrategy.meta.contract,
        state.currentEthToken.address,
        state.ethAmount,
        state.currentEthToken.decimals
      ),
      handleApprove(
        currentStrategy.meta.contract,
        state.currentUsdToken.address,
        state.usdAmount,
        state.currentUsdToken.decimals
      )
    ];
    Promise.all(approveList).then((approveRes) => {
      if (approveRes.some((approved) => !approved)) {
        updateState({
          pending: false
        });
        return;
      }
      const ethAmountShown = Big(state.ethAmount || 0)
        .toFixed(state.currentEthToken.decimals, Big.roundDown)
        .toString();
      const usdAmountShown = Big(state.usdAmount || 0)
        .toFixed(state.currentUsdToken.decimals, Big.roundDown)
        .toString();
      let method = 'createDexBalancerAgentAndExplorerAndRefundExcess';
      const params = [
        [
          // token
          state.currentEthToken.address,
          // amount
          parseUnits(ethAmountShown, state.currentEthToken.decimals)
        ],
        [
          // token
          state.currentUsdToken.address,
          // amount
          parseUnits(usdAmountShown, state.currentUsdToken.decimals)
        ],
        // receiver
        account
      ];

      if (rootAgent && rootAgent.agentAddress) {
        // rootAgentAddress
        params.splice(2, 0, rootAgent.agentAddress);
        method = 'createDexBalancerAgentForRootAndRefundExcess';
      }

      const contract = new ethers.Contract(currentStrategy.meta.contract, DEPOSIT_POOL_ABI, provider.getSigner());

      const getTx = (gas) => {
        const contractOption = {
          gasLimit: gas || 4000000
        };
        if (['ETH'].includes(state.currentEthToken.value)) {
          contractOption.value = parseUnits(ethAmountShown, state.currentEthToken.decimals);
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
                formatAddAction(actionText, ethAmountShown, status, transactionHash, state.currentEthToken.value);
                toast?.success({
                  title: `${actionText} Successfully!`,
                  text: `${actionText} ${Big(state.ethAmount).toFixed(2)} ${state.currentEthToken.value} & ${Big(state.usdAmount).toFixed(2)} ${state.currentUsdToken.value}`,
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
        contract.estimateGas[method](...params, { value: parseUnits(ethAmountShown, state.currentEthToken.decimals) })
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

  const handleUsdAmount = (ev) => {
    if (isNaN(Number(ev.target.value))) return;
    let amount = ev.target.value.replace(/\s+/g, '');

    if (!amount) {
      updateState({
        ethAmount: '',
        usdAmount: ''
      });
      return;
    }

    if (Big(amount || 0).gt(Big(state.currentUsdTokenBalance || 0))) {
      amount = Big(state.currentUsdTokenBalance || 0).toFixed(4, 0);
    }
    updateState({
      usdAmount: amount,
      ethAmount: Big(amount)
        .times(prices[state.currentUsdToken.value])
        .div(prices[state.currentEthToken.value])
        .toFixed(state.currentEthToken.decimals, 0)
    });
  };

  const handleUsdToken = (option) => {
    if (option.value === state.currentUsdToken.value) return;
    updateState({
      currentUsdToken: option,
      usdAmount: '',
      ethAmount: ''
    });
    const currToken = StakeTokens.find((it) => it.symbol === option.value);
    currToken &&
      getTokenBalance(currToken).then((value) => {
        updateState({
          currentUsdTokenBalance: value
        });
      });
  };

  const handleUsdBalance = (value) => {
    // auto enter eth amount
    const updates = {
      usdAmount: Big(value).toFixed(4, 0)
    };
    updates.ethAmount = Big(updates.usdAmount)
      .times(prices[state.currentUsdToken.value])
      .div(prices[state.currentEthToken.value])
      .toFixed(state.currentEthToken.decimals, 0);
    updateState(updates);
  };
  useEffect(() => {
    const _ethTokens = [];
    const _usdTokens = [];
    const EthStakeTokens = StakeTokens.filter((it) => ['ETH', 'WETH'].includes(it.symbol));
    const UsdStakeTokens = StakeTokens.filter((it) => ['USDB'].includes(it.symbol));
    EthStakeTokens.forEach((it) => {
      _ethTokens.push({
        ...it,
        text: it.symbol,
        value: it.symbol,
        icons: [it.icon],
        address: it.address === 'native' ? '0x0000000000000000000000000000000000000000' : it.address
      });
    });
    UsdStakeTokens.forEach((it) => {
      _usdTokens.push({
        ...it,
        text: it.symbol,
        value: it.symbol,
        icons: [it.icon]
      });
    });
    updateState({
      ethTokens: _ethTokens,
      currentEthToken: _ethTokens[0],
      usdTokens: _usdTokens,
      currentUsdToken: _usdTokens[0]
    });
    getTokenBalance(EthStakeTokens[0]).then((value) => {
      updateState({
        currentEthTokenBalance: value
      });
    });
    getTokenBalance(UsdStakeTokens[0]).then((value) => {
      updateState({
        currentUsdTokenBalance: value
      });
    });
  }, []);

  return (
    <StyledContainer>
      <StyledProtocolList>
        {currentStrategy.meta.protocolList.map((it, idx) => (
          <StyledProtocol href={it.link} key={idx + ''} rel="nofollow" target="_blank">
            <img className="protocol-icon" src={it.iconUrl} alt="" />
            <span className="protocol-name">{it.name}</span>
          </StyledProtocol>
        ))}
      </StyledProtocolList>
      <StyledDexTips>
        Add assets below - your funds will be allocated evenly across our partner protocols. Hit deposit to launch the
        strategy.
      </StyledDexTips>
      <StyledFormItem>
        <StyledFormItemTitle>Assets and Amounts</StyledFormItemTitle>
        <StyledFormItemBody>
          <StyledInput type="text" placeholder="0" value={ethAmount} onChange={handleEthAmount} />
        </StyledFormItemBody>
        <StyledFormItemFoot>
          <div className="prices">
            $
            {Big(ethAmount || 0)
              .times(Big(prices[currentEthToken.value] || 1))
              .toFixed(2, 0)}
          </div>
          <div className="balance">
            <Balance
              {...{
                value: currentEthTokenBalance,
                digit: 5,
                onClick: handleEthBalance,
                symbol: currentEthToken.value
              }}
            />
          </div>
        </StyledFormItemFoot>
        <StyledFormItemBody>
          <StyledInput type="text" placeholder="0" value={usdAmount} onChange={handleUsdAmount} />
          <Select
            {...{
              options: usdTokens,
              value: currentUsdToken,
              onChange: handleUsdToken
            }}
          />
        </StyledFormItemBody>
        <StyledFormItemFoot>
          <div className="prices">
            $
            {Big(usdAmount || 0)
              .times(Big(prices[currentUsdToken.value] || 1))
              .toFixed(2, 0)}
          </div>
          <div className="balance">
            Balance:
            <Balance
              {...{
                value: currentUsdTokenBalance,
                digit: 5,
                onClick: handleUsdBalance,
                symbol: currentUsdToken.value
              }}
            />
          </div>
        </StyledFormItemFoot>
      </StyledFormItem>
      <StyledButton disabled={pending || !ethAmount} onClick={handleSubmit}>
        {pending ? <Loading size={16} /> : 'Launch Strategy'}
      </StyledButton>
    </StyledContainer>
  );
});
