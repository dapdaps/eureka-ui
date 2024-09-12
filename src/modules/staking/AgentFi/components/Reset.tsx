// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

import Loading from '@/modules/components/Loading';
import { useMultiState } from '@/modules/hooks';
import { formatValueDecimal } from '@/utils/formate';
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
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
const StyledContent = styled.div`
  flex: 1;
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
  margin-top: auto;
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
const StyledTips = styled.div`
  color: rgb(151, 154, 190);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 16px;

  &.full {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const StyledWithdrawTips = styled.div`
  width: 240px;
  text-align: center;
  margin: 0 auto;

  .value {
    color: var(--switch-color);
    font-size: 18px;
  }

  .title {
    border-bottom: 1px solid #373a53;
    font-size: 18px;
    color: rgb(151, 154, 190);
    padding: 8px 0;
  }

  .assets {
    margin-top: 8px;
  }

  .head-wd {
    border-bottom: 1px solid #373a53;

    .col-wd {
      color: rgb(151, 154, 190);
    }
  }

  .row-wd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    flex-wrap: nowrap;
  }

  .col-wd {
    flex-shrink: 0;
    flex-basis: 33.33%;
    color: #fff;
    font-size: 14px;
    text-align: left;
    padding: 8px 0;
  }

  .body-wd {
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

const ABI = [
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'router',
            type: 'address'
          },
          {
            internalType: 'uint24',
            name: 'fee',
            type: 'uint24'
          },
          {
            internalType: 'uint24',
            name: 'slippageSwap',
            type: 'uint24'
          },
          {
            internalType: 'uint24',
            name: 'slippageLiquidity',
            type: 'uint24'
          },
          {
            internalType: 'int24',
            name: 'tickLower',
            type: 'int24'
          },
          {
            internalType: 'int24',
            name: 'tickUpper',
            type: 'int24'
          },
          {
            internalType: 'uint160',
            name: 'sqrtPriceX96',
            type: 'uint160'
          }
        ],
        internalType: 'struct IConcentratedLiquidityModuleC.RebalanceParams',
        name: 'params',
        type: 'tuple'
      }
    ],
    name: 'moduleC_rebalance',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  }
];

const { parseUnits, formatUnits } = ethers.utils;

export default memo(function Reset() {
  const {
    record,
    prices,
    dexConfig,
    currentStrategy,
    account,
    onSuccess,
    addAction,
    toast,
    chainId,
    queryPoolInfo,
    tickToPrice,
    priceToUsableTick,
    strategies
  } = props;

  const { StakeTokens } = dexConfig;

  const [state, updateState] = useMultiState({
    pending: false,

    rate: 20,
    currentEth2UsdPrice: '',
    minPrice: '',
    maxPrice: '',
    sqrtPriceX96: '',
    currentEthToken: {},
    currentUsdToken: {}
  });

  const handleSubmit = () => {
    if (!state.rate) return;
    updateState({
      pending: true
    });

    // fixed 0.30 % fee tier
    const fee = currentStrategy.meta.feeTierList[2];

    const tickLower = priceToUsableTick({
      price: state.minPrice,
      token0: state.currentEthToken,
      token1: state.currentUsdToken,
      fee: fee.value
    });
    const tickUpper = priceToUsableTick({
      price: state.maxPrice,
      token0: state.currentEthToken,
      token1: state.currentUsdToken,
      fee: fee.value
    });
    const [_tickLower, _tickUpper] = tickLower > tickUpper ? [tickUpper, tickLower] : [tickLower, tickUpper];

    const params = [
      {
        router: '0x337827814155ecbf24d20231fca4444f530c0555',
        fee: fee.value,
        slippageSwap: 10000,
        slippageLiquidity: 1000000,
        tickLower: _tickLower,
        tickUpper: _tickUpper,
        sqrtPriceX96: state.sqrtPriceX96
      }
    ];

    const contract = new ethers.Contract(record.agentAddress, ABI, provider.getSigner());

    const getTx = (gas) => {
      const contractOption = {
        gasLimit: gas || 4000000,
        value: parseUnits('0', 18)
      };
      contract
        .moduleC_rebalance(...params, contractOption)
        .then((tx) => {
          tx.wait()
            .then((res) => {
              const { status, transactionHash } = res;
              updateState({
                pending: false
              });
              if (status !== 1) throw new Error('');
              onSuccess();
              // formatAddAction(actionText, state.ethAmount, status, transactionHash, state.currentEthToken.value);
              toast?.success({
                title: `Set New Range Successfully!`,
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
                title: `Set New Range Failed!`,
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
            title: `Set New Range Failed!`,
            text: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : ``
          });
        });
    };

    const estimateGas = () => {
      contract.estimateGas
        .moduleC_rebalance(...params, { value: parseUnits('0', 18) })
        .then((gas) => {
          getTx(gas);
        })
        .catch((err) => {
          console.log('get gas failed: ', err);
          getTx();
        });
    };

    estimateGas();
  };

  const handleRate = (ev) => {
    if (isNaN(Number(ev.target.value))) return;
    let amount = ev.target.value.replace(/\s+/g, '');
    if (!amount) {
      updateState({
        rate: ''
      });
      return;
    }
    if (Big(amount).lte(0)) {
      amount = 1;
    }
    if (Big(amount).gt(50)) {
      amount = 50;
    }
    amount = Math.round(amount);
    updateState({
      rate: amount
    });
  };

  const { pending, rate, currentEth2UsdPrice, minPrice, maxPrice } = state;

  useEffect(() => {
    queryPoolInfo({ fee: currentStrategy.meta.feeTierList[2] }).then((poolRes) => {
      if (!poolRes) {
        toast?.fail({
          title: `Initialization Failed!`,
          text: 'Query pool information failed, try again later or reload the page please!'
        });
        return;
      }
      const { tick, sqrtPriceX96 } = poolRes;
      updateState({ sqrtPriceX96 });
      const currentBalancesList = record.balances || [];
      const currentBalance = currentBalancesList.find((it) => /^BlasterSwap Positions NFT/.test(it.name));
      if (!currentBalance || !currentBalance.underlying || currentBalance.underlying.length < 2) {
        toast?.fail({
          title: `Initialization Failed!`,
          text: 'Query token information failed, try again later or reload the page please!'
        });
        return;
      }
      updateState({
        currentEthToken: currentBalance.underlying[1],
        currentUsdToken: currentBalance.underlying[0],
        currentEth2UsdPrice: tickToPrice({
          tick,
          token0: currentBalance.underlying[1],
          token1: currentBalance.underlying[0]
        })
      });
    });
  }, []);

  useEffect(() => {
    if (!currentEth2UsdPrice) return;
    const slippageValue = Big(currentEth2UsdPrice).times(Big(rate).div(100)).div(2);
    const _minPrice = Math.floor(Big(currentEth2UsdPrice).minus(slippageValue).toNumber());
    const _maxPrice = Math.floor(Big(currentEth2UsdPrice).plus(slippageValue).toNumber());
    updateState({
      minPrice: _minPrice,
      maxPrice: _maxPrice
    });
  }, [currentEth2UsdPrice, rate]);

  const renderButton = (disabled) => {
    return (
      <StyledButton disabled={pending || disabled} onClick={handleSubmit}>
        {pending ? <Loading size={16} /> : 'SET NEW RANGE'}
      </StyledButton>
    );
  };

  const renderReset = () => {
    if (record.name.toLowerCase() === strategies[1].name) {
      return (
        <>
          <StyledContent>
            <StyledTips>
              Resetting the strategy will withdraw your existing underlying LP assets and deposit them into the new
              range.
            </StyledTips>
            <StyledFormItem>
              <StyledFormItemTitle>Enter LP Range</StyledFormItemTitle>
              <StyledFormItemBody>
                <div style={{ width: '60px', display: 'flex' }}>
                  <StyledInput type="text" placeholder="0" value={rate} onChange={handleRate} />
                  <span style={{ color: '#fff' }}>%</span>
                </div>
                <div className="current-usdb" style={{ color: '#fff' }}>
                  {Big(currentEth2UsdPrice || 0).toFixed(0)} USDB
                </div>
                <StyledPriceRangeList>
                  <div className="min-price">
                    <span className="range-value">{minPrice}</span>
                    <span className="range-label">min</span>
                  </div>
                  <div className="range-price">
                    <span className="range-value">{rate}%</span>
                    <span className="range-label">range</span>
                  </div>
                  <div className="max-price">
                    <span className="range-value">{maxPrice}</span>
                    <span className="range-label">max</span>
                  </div>
                </StyledPriceRangeList>
              </StyledFormItemBody>
            </StyledFormItem>
          </StyledContent>
          {renderButton(!rate)}
        </>
      );
    }
    return null;
  };

  return <StyledContainer>{renderReset()}</StyledContainer>;
});
