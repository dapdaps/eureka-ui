// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo, useEffect } from 'react';
import styled from 'styled-components';

import Balance from '@/modules/components/Balance';
import Loading from '@/modules/components/Loading';
import Select from '@/modules/components/Select';
import { useMultiState } from '@/modules/hooks';
import { formatValueDecimal } from '@/utils/formate';
import { asyncFetch } from '@/utils/http';

import Button from './Button';
import Table from './Table';
const StyledContainer = styled.div``;
const Content = styled.div`
  padding: 20px 15px;
`;
const Wrapper = styled.div`
  width: 478px;
  border: 1px solid rgba(55, 58, 83, 1);
  border-radius: 16px;
  margin: 50px auto 0;
  padding: 20px 0 0px;
  position: relative;
`;
const BlurWrap = styled.div`
  position: relative;
`;
const Blur = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  backdrop-filter: blur(4px);
`;
const Summary = styled.div`
  display: flex;
  padding: 0 20px 20px;
  border-bottom: 1px solid rgba(55, 58, 83, 1);
  align-items: center;
  justify-content: space-between;
`;

const SummaryItem = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;

  .title {
    color: rgba(151, 154, 190, 1);
  }

  .amount {
    margin-top: 5px;
    color: rgba(255, 255, 255, 1);
  }

  &.points-and-yield-selector {
    > div > div[type='button'] {
      width: 170px;
    }
  }
`;
const Panel = styled.div`
  height: 100px;
  border-radius: 12px;
  border: 1px solid rgba(55, 58, 83, 1);
  background-color: rgba(46, 49, 66, 1);
  padding: 15px;
  margin-bottom: 20px;

  .title {
    font-size: 14px;
    font-weight: 400;
    line-height: 16.8px;
    color: rgba(151, 154, 190, 1);
  }

  .body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }

  .foot {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
    color: rgba(151, 154, 190, 1);
  }
`;
const Input = styled.input`
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  border: none;
  height: 24px;
  width: 200px;
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
const List = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;

  .keys {
    color: rgba(151, 154, 190, 1);
  }

  .values {
    color: #fff;
  }
`;
export default memo(function DuoContent(props) {
  const {
    dexConfig,
    wethAddress,
    multicallAddress,
    chainIdNotSupport,
    multicall,
    prices,
    account,
    provider,
    addAction,
    toast,
    chainId,
    nativeCurrency,
    tab,
    StakeTokens,
    onSuccess
  } = props;

  const { ExchangeToken, PointsAndYield } = dexConfig ? dexConfig : {};

  const { parseUnits, formatUnits } = ethers.utils;

  const UNSTAKE_TOKEN_CONFIG = ExchangeToken
    ? {
        [ExchangeToken[0].address]: { ...ExchangeToken[0] }, // DETH
        [ExchangeToken[1].address]: { ...ExchangeToken[1] }, // DUSD
        '0x66714db8f3397c767d0a602458b5b4e3c0fe7dd1': { ...ExchangeToken[0] }, // fwDETH
        '0x866f2c06b83df2ed7ca9c2d044940e7cd55a06d6': { ...ExchangeToken[1] } // fwDUSD
      }
    : {};

  const EXCHANGE_TOKEN_CONFIG = {
    ETH: '0x66714db8f3397c767d0a602458b5b4e3c0fe7dd1',
    WETH: '0x66714db8f3397c767d0a602458b5b4e3c0fe7dd1',
    USDB: '0x866f2c06b83df2ed7ca9c2d044940e7cd55a06d6'
  };

  const [state, updateState] = useMultiState({
    stakeAmount: '',
    curToken: '', // token symbol
    curReceivedToken: ExchangeToken && ExchangeToken[0], // token symbol receive
    curPointsAndYield: 1,
    curPointsAndYieldItem: {},
    exchangeRate: 1,
    options: [],
    TVL: '',
    tokenBal: 0,
    tvlLoading: false
  });

  // balance
  function getTokenBalance(addr) {
    const contract = new ethers.Contract(
      addr,
      [
        {
          inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
          name: 'balanceOf',
          outputs: [{ internalType: 'uint256', name: 'value', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function'
        }
      ],
      provider.getSigner()
    );
    contract
      .balanceOf(account)
      .then((_balance) => {
        const _bal = formatUnits(_balance, state.curReceivedToken.decimals);
        updateState({
          tokenBal: _bal
        });
      })
      .catch((err) => {
        console.log('Catch-getTokenBalance-error--', err);
      });
  }

  function fetchData(url) {
    return asyncFetch(url);
  }

  function debounce(fn, wait) {
    let timer = state.timer;
    return () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn({});
      }, wait);
      updateState({ timer });
    };
  }

  const getTvl = debounce(({ mode, token, key }) => {
    updateState({ tvlLoading: true });
    // attention plz
    // exchange 2 DETH, the tvl token is fwDETH
    // exchange 2 DUSD, the tvl token is fwDUSD
    const tvlMode = mode || state.curPointsAndYieldItem.type;
    const tvlKey = key || state.curPointsAndYieldItem.tvlKey;
    token = token || state.curToken;
    const tvlToken = EXCHANGE_TOKEN_CONFIG[token];
    if (!tvlMode || !tvlToken) {
      updateState({ tvlLoading: false });
      return;
    }
    const url = `/duo/exchange/getTvl?token=${tvlToken}&mode=${tvlMode}`;
    fetchData(url)
      .then((res) => {
        if (!res.result || !res.result[tvlKey]) {
          updateState({ tvlLoading: false });
          return;
        }
        const tvlRes = res.result[tvlKey];
        if (!tvlRes.liquidity) {
          updateState({ tvlLoading: false });
          return;
        }
        const tvl = Big(tvlRes.liquidity).div(Big(10).pow(18)).times(prices[token]);
        updateState({
          TVL: tvl.toString() || '-',
          tvlLoading: false
        });
      })
      .catch((err) => {
        console.log(err);
        updateState({ tvlLoading: false });
      });
  }, 900);

  useEffect(() => {
    const options = StakeTokens?.map((item) => ({
      text: item.symbol,
      value: item.symbol
    }));
    updateState({
      options,
      curToken: options && options[0].value
    });
    const addr = StakeTokens?.find((item) => item.symbol === options[0].value)?.address;
    addr && getTokenBalance(addr);
  }, [tab]);

  useEffect(() => {
    const obj = PointsAndYield ? Object.values(PointsAndYield).find((it) => it.key === state.curPointsAndYield) : null;
    updateState({
      curPointsAndYieldItem: obj || {}
    });
    getTvl({ mode: obj?.type, key: obj?.tvlKey });
  }, [state.curPointsAndYield]);

  const clickBalance = (_bal) => {
    updateState({
      stakeAmount: Big(_bal).toFixed(4, 0)
    });
  };

  useEffect(() => {
    if (tab === 'Stake') {
      const _bal = StakeTokens?.find((item) => item.symbol === state.curToken)?.balance;

      let receiveToken = ExchangeToken[0];
      if (['USDB'].includes(state.curToken)) {
        receiveToken = ExchangeToken[1];
      }

      updateState({
        tokenBal: _bal,
        curReceivedToken: receiveToken
      });
    }
  }, [state.curToken, tab]);

  return (
    state.curToken && (
      <div>
        <StyledContainer>
          {tab === 'Stake' ? (
            <Wrapper>
              <Summary>
                <SummaryItem>
                  <div className="title">TVL</div>
                  <div className="amount">
                    {state.tvlLoading ? (
                      <Loading size={16} />
                    ) : (
                      <>{formatValueDecimal(state?.TVL ?? 0, '$', 2, true, false)}</>
                    )}
                  </div>
                </SummaryItem>
                <SummaryItem className="points-and-yield-selector">
                  <Select
                    {...{
                      options: Object.values(PointsAndYield).map((it) => ({
                        text: it.label,
                        value: it.key
                      })),
                      value: { value: state.curPointsAndYield },
                      onChange: (option) => {
                        updateState({
                          curPointsAndYield: option.value
                        });
                      }
                    }}
                  />
                </SummaryItem>
              </Summary>
              <Content>
                <BlurWrap>
                  <Panel>
                    <div className="title">{tab}</div>
                    <div className="body">
                      <Input
                        type="text"
                        placeholder="0"
                        value={state.stakeAmount}
                        onChange={(ev) => {
                          if (isNaN(Number(ev.target.value))) return;
                          let amount = ev.target.value.replace(/\s+/g, '');

                          if (Big(state.tokenBal || 0).gt(0) && Big(amount || 0).gt(Big(state.tokenBal || 0))) {
                            amount = Big(Big(state.tokenBal || 0).toFixed(4, 0)).toString();
                          }

                          updateState({
                            stakeAmount: amount
                          });
                        }}
                      />
                      <Select
                        {...{
                          options: state.options,
                          value: state.options.find((obj) => obj.value === state.curToken),
                          onChange: (option) => {
                            updateState({
                              curToken: option.value,
                              stakeAmount: ''
                            });
                            const addr = StakeTokens?.find((item) => item.symbol === option.value)?.address;
                            addr && getTokenBalance(addr);
                            getTvl({ token: option.value });
                          }
                        }}
                      />
                    </div>
                    <div className="foot">
                      <div class="prices">
                        $
                        {Big(state.stakeAmount || 0)
                          .times(Big(prices[state.curToken] || 1))
                          .toFixed(2, 0)}
                      </div>
                      <div class="balance">
                        Balance:
                        <Balance
                          {...{
                            value: state.tokenBal,
                            digit: 4,
                            onClick: clickBalance,
                            symbol: tab === 'Stake' ? state.curToken : state.curReceivedToken.symbol
                          }}
                        />
                      </div>
                    </div>
                  </Panel>
                  <List>
                    <span className="keys">You will get</span>
                    <span className="values">
                      {Big(state.stakeAmount || 0)
                        .div(state.exchangeRate || 1)
                        .toFixed()}{' '}
                      {tab === 'Stake' ? state.curReceivedToken.symbol : state.curToken}
                    </span>
                  </List>
                  <List>
                    <span className="keys">Exchange rate</span>
                    <span className="values">
                      1 {tab === 'Stake' ? state.curToken : state.curReceivedToken.symbol}=
                      {Big(state.exchangeRate || 0).toFixed()}{' '}
                      {tab === 'Stake' ? state.curReceivedToken.symbol : state.curToken}
                    </span>
                  </List>
                </BlurWrap>
                <Button
                  {...{
                    ...props,
                    provider,
                    actionText: tab,
                    curPointsAndYieldItem: state.curPointsAndYieldItem,
                    curPointsAndYield: state.curPointsAndYield,
                    amount: state.stakeAmount,
                    curToken: state.curToken,
                    curReceivedToken: state.curReceivedToken,
                    stakeToken:
                      tab === 'Stake' ? StakeTokens?.find((item) => item.symbol === state.curToken) : StakeTokens[0],
                    onSuccess: () => {
                      updateState({ stakeAmount: '' });
                      onSuccess();
                    }
                  }}
                />
              </Content>
            </Wrapper>
          ) : (
            <Table
              {...{
                ...props,
                provider,
                actionText: tab,
                UNSTAKE_TOKEN_CONFIG
              }}
            />
          )}
        </StyledContainer>
      </div>
    )
  );
});
