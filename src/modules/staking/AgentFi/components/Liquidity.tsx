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
const StyledContainer = styled.div`
  position: relative;
`;
const StyledLoadingMask = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
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
const StyledPriceRangeList = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: nowrap;
  gap: 0;
  border: 1px solid #373a53;
  border-radius: 6px;

  .min-price,
  .range-price,
  .max-price {
    padding: 8px 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }

  .min-price {
  }

  .range-price {
    border-left: 1px solid #373a53;
  }

  .max-price {
    border-left: 1px solid #373a53;
  }

  .range-value {
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
  }

  .range-label {
    color: #979abe;
    font-size: 14px;
  }
`;

const DEPOSIT_POOL_ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'manager', type: 'address' },
          { internalType: 'address', name: 'pool', type: 'address' },
          { internalType: 'uint24', name: 'slippageLiquidity', type: 'uint24' },
          { internalType: 'int24', name: 'tickLower', type: 'int24' },
          { internalType: 'int24', name: 'tickUpper', type: 'int24' },
          { internalType: 'uint160', name: 'sqrtPriceX96', type: 'uint160' }
        ],
        name: 'mintParams',
        type: 'tuple'
      },
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
      }
    ],
    name: 'createConcentratedLiquidityAgentAndExplorerAndRefundExcess',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'manager', type: 'address' },
          { internalType: 'address', name: 'pool', type: 'address' },
          { internalType: 'uint24', name: 'slippageLiquidity', type: 'uint24' },
          { internalType: 'int24', name: 'tickLower', type: 'int24' },
          { internalType: 'int24', name: 'tickUpper', type: 'int24' },
          { internalType: 'uint160', name: 'sqrtPriceX96', type: 'uint160' }
        ],
        name: 'mintParams',
        type: 'tuple'
      },
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
      { internalType: 'address', name: 'rootAgentAddress', type: 'address' }
    ],
    name: 'createConcentratedLiquidityAgentForRootAndRefundExcess',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  }
];

const { parseUnits, formatUnits } = ethers.utils;

export default memo(function Liquidity(props: any) {
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
    handleApprove,
    tickToPrice,
    priceToUsableTick,
    QUERY_POOL_ABI,
    provider
  } = props;

  const { StakeTokens } = dexConfig;

  const actionText = 'Stake';

  const [state, updateState] = useMultiState<any>({
    currentDex: currentStrategy.meta.dexList[0],
    currentFeeTier: currentStrategy.meta.feeTierList[0],
    pending: false,

    currentEthToken: {},
    ethAmount: '',
    ethTokens: [],
    currentEthTokenBalance: 0,

    currentUsdToken: {},
    usdAmount: '',
    usdTokens: [],
    currentUsdTokenBalance: 0,

    slippage: 20,

    minPrice: 0,
    maxPrice: 0,
    sqrtPriceX96: 0,

    currentEth2UsdPrice: 0
  });

  const queryPoolInfo = ({ fee, token0, token1 }) => {
    updateState({ pending: true });
    fee = fee || state.currentFeeTier;
    token0 = token0 || state.currentEthToken;
    token1 = token1 || state.currentUsdToken;
    const contract = new ethers.Contract(fee.pool, QUERY_POOL_ABI, provider.getSigner());
    const params = [];
    contract
      .slot0(...params)
      .then((poolAddress) => {
        const [sqrtPriceX96, tick] = poolAddress;
        const currentEth2UsdPrice = tickToPrice({ tick, token0, token1 });
        const currentUsd2EthPrice = tickToPrice({ tick, token0: token1, token1: token0 });
        updateState({
          currentEth2UsdPrice,
          currentUsd2EthPrice,
          sqrtPriceX96,
          pending: false
        });
      })
      .catch((err) => {
        console.log('queryPoolInfo failed, ', err);
        updateState({ pending: false });
      });
  };

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
      usdAmount: Big(amount).times(state.currentEth2UsdPrice).toFixed(state.currentUsdToken.decimals, 0)
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
    queryPoolInfo({ token0: option });
  };

  const handleEthBalance = (value) => {
    // auto enter usd amount
    const updates = {
      ethAmount: Big(value).toFixed(4, 0)
    };
    updates.usdAmount = Big(updates.ethAmount)
      .times(state.currentEth2UsdPrice)
      .toFixed(state.currentUsdToken.decimals, 0);
    updateState(updates);
  };

  const handleFeeTier = (option) => {
    if (state.currentFeeTier.value === option.value) return;
    updateState({
      currentFeeTier: option
    });
    queryPoolInfo({ fee: option });
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
    const tickLower = priceToUsableTick({
      price: state.minPrice,
      token0: state.currentEthToken,
      token1: state.currentUsdToken,
      fee: state.currentFeeTier.value
    });
    const tickUpper = priceToUsableTick({
      price: state.maxPrice,
      token0: state.currentEthToken,
      token1: state.currentUsdToken,
      fee: state.currentFeeTier.value
    });
    const [_tickLower, _tickUpper] = tickLower > tickUpper ? [tickUpper, tickLower] : [tickLower, tickUpper];

    if (Big(state.ethAmount).lte(0) || Big(state.usdAmount).lte(0)) return;
    // if rootAgent.agentAddress: use createConcentratedLiquidityAgentForRootAndRefundExcess
    // else: use createConcentratedLiquidityAgentAndExplorerAndRefundExcess
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
      let method = 'createConcentratedLiquidityAgentAndExplorerAndRefundExcess';
      const params = [
        [
          // manager
          state.currentDex.contract,
          // pool
          state.currentFeeTier.pool,
          // slippageLiquidity
          1000000,
          // tickLower
          _tickLower,
          // tickUpper
          _tickUpper,
          // sqrtPriceX96
          state.sqrtPriceX96
        ],
        [
          // token
          state.currentUsdToken.address,
          // amount
          parseUnits(usdAmountShown, state.currentUsdToken.decimals)
        ],
        [
          // token
          state.currentEthToken.address,
          // amount
          parseUnits(ethAmountShown, state.currentEthToken.decimals)
        ]
      ];

      if (rootAgent && rootAgent.agentAddress) {
        // rootAgentAddress
        params.push(rootAgent.agentAddress);
        method = 'createConcentratedLiquidityAgentForRootAndRefundExcess';
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
                  text: `${actionText} ${Big(ethAmountShown).toFixed(2)} ${state.currentEthToken.value} & ${Big(usdAmountShown).toFixed(2)} ${state.currentUsdToken.value}`,
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

  const handleDex = (option) => {
    updateState({
      currentDex: option
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
      ethAmount: Big(amount).div(state.currentEth2UsdPrice).toFixed(state.currentEthToken.decimals, 0)
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
      .div(state.currentEth2UsdPrice)
      .toFixed(state.currentEthToken.decimals, 0);
    updateState(updates);
  };

  const handleSlippageChange = (value) => {
    if (isNaN(Number(value))) {
      updateState({
        slippage: 1
      });
      return;
    }
    const amount = value.replace(/\s+/g, '');

    if (!amount) {
      updateState({
        slippage: 1
      });
      return;
    }

    if (Big(amount).lte(0)) {
      updateState({
        slippage: 1
      });
      return;
    }

    if (Big(amount).gt(50)) {
      updateState({
        slippage: 50
      });
      return;
    }

    updateState({
      slippage: Math.floor(amount)
    });
  };

  const {
    pending,
    currentDex,
    currentFeeTier,
    ethAmount,
    currentEthToken,
    ethTokens,
    currentEthTokenBalance,
    usdAmount,
    usdTokens,
    currentUsdToken,
    currentUsdTokenBalance,
    slippage,
    currentEth2UsdPrice,
    minPrice,
    maxPrice
  } = state;

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
    queryPoolInfo({
      fee: currentStrategy.meta.feeTierList[0],
      token0: _ethTokens[0],
      token1: _usdTokens[0]
    });
  }, []);

  useEffect(() => {
    const slippageValue = Big(currentEth2UsdPrice).times(Big(slippage).div(100)).div(2);
    const _minPrice = Math.floor(Big(currentEth2UsdPrice).minus(slippageValue).toNumber());
    const _maxPrice = Math.floor(Big(currentEth2UsdPrice).plus(slippageValue).toNumber());
    updateState({
      minPrice: _minPrice,
      maxPrice: _maxPrice
    });
  }, [currentEth2UsdPrice, slippage]);

  return (
    <StyledContainer>
      {pending && (
        <StyledLoadingMask>
          <Spinner />
        </StyledLoadingMask>
      )}
      <StyledFormItem>
        <StyledFormItemTitle>DEX</StyledFormItemTitle>
        <StyledFormItemBody>
          <StyledFullSelect>
            <Select
              {...{
                options: currentStrategy.meta.dexList,
                value: currentDex,
                onChange: handleDex
              }}
            />
          </StyledFullSelect>
        </StyledFormItemBody>
      </StyledFormItem>
      <StyledFormItem>
        <StyledFormItemTitle>Pool Fee Tier</StyledFormItemTitle>
        <StyledFormItemBody>
          <StyledFullSelect>
            <Select
              {...{
                options: currentStrategy.meta.feeTierList,
                value: currentFeeTier,
                onChange: handleFeeTier
              }}
            />
          </StyledFullSelect>
        </StyledFormItemBody>
      </StyledFormItem>
      <StyledFormItem>
        <StyledFormItemTitle>Assets and Amounts</StyledFormItemTitle>
        <StyledFormItemBody>
          <StyledInput type="text" placeholder="0" value={ethAmount} onChange={handleEthAmount} />
          <Select
            {...{
              options: ethTokens,
              value: currentEthToken,
              onChange: handleEthToken
            }}
          />
        </StyledFormItemBody>
        <StyledFormItemFoot>
          <div className="prices">
            $
            {Big(ethAmount || 0)
              .times(Big(prices[currentEthToken.value] || 1))
              .toFixed(2, 0)}
          </div>
          <div className="balance">
            Balance:
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
      <StyledFormItem>
        <StyledFormItemTitle>Price Range</StyledFormItemTitle>
        <StyledFormItemBody style={{ justifyContent: 'space-between' }}>
          <div style={{ width: '60px', display: 'flex' }}>
            <StyledInput
              type="text"
              placeholder="LP Range"
              value={slippage}
              onChange={(e) => handleSlippageChange(e.target.value)}
            />
            <span style={{ color: '#ffffff' }}>%</span>
          </div>
          <div className="current-usdb" style={{ color: '#fff' }}>
            {Big(currentEth2UsdPrice).toFixed(0)} USDB
          </div>
          <StyledPriceRangeList>
            <div className="min-price">
              <span className="range-value">{minPrice}</span>
              <span className="range-label">min</span>
            </div>
            <div className="range-price">
              <span className="range-value">{slippage}%</span>
              <span className="range-label">range</span>
            </div>
            <div className="max-price">
              <span className="range-value">{maxPrice}</span>
              <span className="range-label">max</span>
            </div>
          </StyledPriceRangeList>
        </StyledFormItemBody>
      </StyledFormItem>

      <StyledButton disabled={pending || !ethAmount} onClick={handleSubmit}>
        {pending ? <Loading size={16} /> : ethAmount ? 'Launch Strategy' : 'Enter Deposit Amount'}
      </StyledButton>
    </StyledContainer>
  );
});
