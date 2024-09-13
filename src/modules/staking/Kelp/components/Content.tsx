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
import SwitchBtn from './SwitchBtn';
import Wrap from './Wrap';
const StyledContainer = styled.div`
  padding-top: 18px;
  width: 478px;
  border: 1px solid rgba(55, 58, 83, 1);
  border-radius: 16px;
  margin: 50px auto 0;
  padding: 20px 0 0px;
  position: relative;
`;
const Content = styled.div`
  padding: 20px 15px;
`;
const Wrapper = styled.div``;
const BlurWrap = styled.div`
  position: relative;
`;
const WithdrawWrap = styled.div`
  padding: 20px 15px;
  min-height: 300px;
  .withdraw-title {
    font-size: 16px;
    color: white;
    margin-bottom: 20px;
  }
  .withdraw-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
  }
  .empty {
    color: white;
    text-align: center;
  }
  .empty-title {
    font-size: 24px;
    font-weight: 600;
    padding: 20px 0;
  }
  .empty-txt {
    font-size: 16px;
  }
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

const BtnWrap = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;
const Btn = styled.button`
  background-color: var(--switch-color);
  color: var(--button-text-color);

  display: block;
  width: 100%;
  /* width: 130px;
  height: 40px; */
  height: 56px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background-color: #075a5a;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.5;
  }
`;
const ClaimBtn = styled.button`
  background-color: var(--switch-color);
  color: var(--button-text-color);
  display: block;
  width: 80px;
  font-size: 16px;
  font-weight: 600;
  height: 40px;
  color: white;
  background-color: #075a5a;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    opacity: 0.8;
  }
`;
export default memo(function KelpContent(props) {
  const {
    dexConfig,
    wethAddress,
    multicallAddress,
    WithdrawalContract,
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
    ExchangeToken,
    onChange
  } = props;
  const { parseUnits, formatUnits } = ethers.utils;
  // console.log("Content--", props);
  const { tokenPairs } = dexConfig;

  const [state, updateState] = useMultiState({
    stakeAmount: '',
    curToken: '', // token symbol
    exchangeRate: '',
    options: [],

    tokenBal: 0,
    showDialog: false,
    withdrawData: {},
    withdrawList: [],
    updater: ''
  });

  useEffect(() => {
    updateState({
      loading: !chainIdNotSupport
    });
  }, []);

  useEffect(() => {
    console.log('tab---', tab, chainId);

    const options = StakeTokens?.map((item) => ({
      text: item.symbol,
      value: item.symbol,
      icons: [item.icon]
    }));
    updateState({
      options,
      curToken: options[0].value
    });
  }, [tab]);

  const clickBalance = (_bal) => {
    updateState({
      stakeAmount: Big(_bal).toFixed(4, 0)
    });
  };
  function getExchangeRate(symbol) {
    const url = `https://universe.kelpdao.xyz/rseth/exchangeRate/?lrtToken=${symbol}`;
    return asyncFetch(url)
      .then((res) => {
        return res.value;
      })
      .catch((err) => {
        console.log('Catch - getExchangeRate--', err);
        setTimeout(getExchangeRate, 500);
      });
  }
  function fetchData(url) {
    return asyncFetch(url);
  }
  function getAPY() {
    const url = `https://universe.kelpdao.xyz/rseth/apy`;
    fetchData(url)
      .then((res) => {
        updateState({
          APY: res.value || '-'
        });
      })
      .catch((err) => {
        setTimeout(getAPY, 500);
        console.log('Catch-getAPY--', err);
      });
  }
  function getTVL() {
    const url = `https://universe.kelpdao.xyz/rseth/tvl/?lrtToken`;
    fetchData(url)
      .then((res) => {
        console.log('======res.usdTvl', res.usdTvl);
        updateState({
          TVL: res.usdTvl || '-'
        });
      })
      .catch((err) => {
        console.log('Catch-getTVL--', err);
      });
  }
  function getWithdrawList(tokenItem) {
    const _userIndexs = generateArray(tokenItem.begin, tokenItem.end - 1);

    const calls = _userIndexs.map((_index) => ({
      address: WithdrawalContract,
      name: 'getUserWithdrawalRequest',
      params: [tokenItem.asset, account, _index]
    }));

    return multicall({
      abi: [
        {
          inputs: [
            { internalType: 'address', name: 'asset', type: 'address' },
            { internalType: 'address', name: 'user', type: 'address' },
            { internalType: 'uint256', name: 'userIndex', type: 'uint256' }
          ],
          name: 'getUserWithdrawalRequest',
          outputs: [
            { internalType: 'uint256', name: 'rsETHAmount', type: 'uint256' },
            {
              internalType: 'uint256',
              name: 'expectedAssetAmount',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'withdrawalStartBlock',
              type: 'uint256'
            },
            { internalType: 'uint256', name: 'userNonce', type: 'uint256' }
          ],
          stateMutability: 'view',
          type: 'function'
        }
      ],
      calls,
      options: {},
      multicallAddress,
      provider
    });
  }

  function generateArray(start, end) {
    return Array.from(new Array(end + 1).keys()).slice(start);
  }
  function getUserAssociatedNonces(_tokens) {
    const calls = _tokens.map((token) => ({
      address: WithdrawalContract,
      name: 'userAssociatedNonces',
      params: [token.address, account]
    }));

    multicall({
      abi: [
        {
          inputs: [
            { internalType: 'address', name: 'asset', type: 'address' },
            { internalType: 'address', name: 'user', type: 'address' }
          ],
          name: 'userAssociatedNonces',
          outputs: [
            { internalType: 'uint128', name: '_begin', type: 'uint128' },
            { internalType: 'uint128', name: '_end', type: 'uint128' }
          ],
          stateMutability: 'view',
          type: 'function'
        }
      ],
      calls,
      options: {},
      multicallAddress,
      provider
    })
      .then((res) => {
        console.log('getUserAssociatedNonces--', res);
        const _withdrawData = {};
        res.forEach((item, index) => {
          if (item && item[1] - item[0] > 0) {
            const [_begin, _end] = item;

            _withdrawData[_tokens[index].address] = {
              asset: _tokens[index].address,
              symbol: _tokens[index].symbol,
              begin: _begin.toNumber(),
              end: _end.toNumber(),
              canClaim: false
            };
          }
        });

        return _withdrawData;
      })
      .then((_withdrawData) => {
        if (Object.values(_withdrawData).length) {
          Object.values(_withdrawData).forEach((item) => {
            getWithdrawList(item).then((res) => {
              _withdrawData[item.asset].list = res;

              const _wl = res.map((wq) => ({
                ...item,
                list: wq
              }));

              updateState((prev) => ({
                ...prev,
                withdrawList: [...prev.withdrawList, ..._wl]
              }));
            });
          });
        }
      })
      .catch((err) => {
        console.log('getUserAssociatedNonces-error--', err);
      });
  }

  function getBlockNumber() {
    return provider
      .getBlockNumber()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log('getBlockNumber-error--', err);
      });
  }
  function getWithdrawalDelayBlocks() {
    const contract = new ethers.Contract(
      WithdrawalContract,
      [
        {
          inputs: [],
          name: 'withdrawalDelayBlocks',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function'
        }
      ],
      provider
    );
    return contract.withdrawalDelayBlocks();
  }

  // function formatList(_withdrawList) {

  // }
  useEffect(() => {
    const _withdrawList = [...state.withdrawList];
    if (!_withdrawList.length) return;

    console.log('withdrawList--', _withdrawList);
    getBlockNumber().then((_blockNumber) => {
      for (let i = 0; i < _withdrawList.length; i++) {
        const [rsETHAmount, expectedAssetAmount, withdrawalStartBlock, userNonce] = _withdrawList[i].list;
        _withdrawList[i].amount = formatUnits(expectedAssetAmount);
        if (Big(_blockNumber).gt(Big(withdrawalStartBlock).plus(state.withdrawalDelayBlocks))) {
          _withdrawList[i].canClaim = true;
        }
      }
    });

    console.log('-----', _withdrawList);
    updateState({
      withdrawList: _withdrawList
    });
  }, [state.withdrawList]);

  function handleClaim(_tokenAddr) {
    console.log('claim--', _tokenAddr);
    updateState({
      claimLoading: true
    });

    const contract = new ethers.Contract(
      WithdrawalContract,
      [
        {
          inputs: [{ internalType: 'address', name: 'asset', type: 'address' }],
          name: 'completeWithdrawal',
          outputs: [],
          stateMutability: 'payable',
          type: 'function'
        }
      ],
      provider.getSigner()
    );
    contract
      .completeWithdrawal(_tokenAddr)
      .then((tx) => {
        tx.wait()
          .then((res) => {
            const { status, transactionHash } = res;
            if (status !== 1) throw new Error('');
            updateState({
              claimLoading: false,
              updater: Date.now()
            });
            toast?.success({
              title: 'Claim Successfully!',
              // text: `Approve ${Big(amount).toFixed(2)} ${tokenSymbol}`,
              tx: transactionHash,
              chainId
            });
          })
          .catch((err) => {
            updateState({
              claimLoading: false
            });
          });
      })
      .catch((err) => {
        console.log('handleClaim-error--', err);
        updateState({
          claimLoading: false
        });
      });
  }
  useEffect(() => {
    getAPY();
    getTVL();
  }, []);

  useEffect(() => {
    if (!state.curToken) return;

    getExchangeRate(state.curToken).then((_rate) => {
      updateState({
        exchangeRate: _rate
      });
    });

    if (tab === 'Stake') {
      const _bal = StakeTokens.find((item) => item.symbol === state.curToken).balance;

      updateState({
        tokenBal: _bal
      });
    }
    if (tab === 'Withdraw' && chainId === 1) {
      getWithdrawalDelayBlocks()
        .then((_blocks) => {
          console.log('getWithdrawalDelayBlocks--', _blocks);
          updateState({
            withdrawalDelayBlocks: _blocks.toString()
          });
        })
        .then(() => {
          const _list = StakeTokens.filter((item) => item.symbol !== 'ETH');
          getUserAssociatedNonces(_list);
        })
        .catch((err) => {
          console.log('getWithdrawalDelayBlocks-error--', err);
        });
    }
  }, [state.curToken, tab, state.updater]);

  // rsETH balance
  function getTokenBalance() {
    const contract = new ethers.Contract(
      ExchangeToken.address,
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
        const _bal = formatUnits(_balance, ExchangeToken.decimals);
        console.log('get-resETH-balance--', _balance, balance);
        updateState({
          tokenBal: _bal
        });
      })
      .catch((err) => {
        console.log('Catch-getTokenBalance-error--', err);
      });
  }
  useEffect(() => {
    // ethereum unstake
    if (chainId !== 1) return;
    if (tab === 'Unstake') {
      getTokenBalance();

      const options = StakeTokens?.map((item) => ({
        text: item.symbol,
        value: item.symbol
      })).filter((item) => item.value !== 'ETH');
      updateState({
        options,
        curToken: options[0].value
      });
    }
  }, [tab]);

  function handleTabChange() {
    // const curTab = tab === "Stake" ? "Unstake" : "Stake";
    // onChange(curTab);
  }
  function handleOpenWrap() {
    updateState({
      showDialog: true
    });
  }
  function handleCloseWrap() {
    updateState({
      showDialog: false
    });
  }
  return (
    <div>
      <StyledContainer>
        <Wrapper>
          <Summary>
            <SummaryItem>
              <div className="title">TVL</div>
              <div className="amount">{formatValueDecimal(state?.TVL, '$', 2, true, false)}</div>
            </SummaryItem>
            <SummaryItem>
              <div className="title">APY</div>
              <div className="amount">{state.APY}%</div>
            </SummaryItem>
          </Summary>
          {(tab === 'Stake' || tab === 'Unstake') && (
            <Content>
              <BlurWrap>
                {chainId !== 1 && (tab === 'Unstake' || tab === 'Withdraw') ? <Blur></Blur> : null}

                <Panel>
                  <div className="title">{tab === 'Unstake' ? 'Withdraw rsETH as' : tab}</div>
                  <div className="body">
                    <Input
                      type="text"
                      placeholder="0"
                      value={state.stakeAmount}
                      onChange={(ev) => {
                        if (isNaN(Number(ev.target.value))) return;
                        let amount = ev.target.value.replace(/\s+/g, '');

                        if (Big(amount || 0).gt(Big(state.tokenBal || 0))) {
                          amount = Big(state.tokenBal || 0).toFixed(4, 0);
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
                          console.log('onchange--', option);
                          updateState({
                            curToken: option.value
                          });
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
                          symbol: tab === 'Stake' ? state.curToken : ExchangeToken.symbol
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
                      .toFixed(4, 0)}{' '}
                    {tab === 'Stake' ? ExchangeToken.symbol : state.curToken}
                  </span>
                </List>
                <List>
                  <span className="keys">Exchange rate</span>
                  <span className="values">
                    1 {ExchangeToken?.symbol} = {Big(state.exchangeRate || 0).toFixed(4, 0)} {state.curToken}
                    {/* {tab === "Stake" ? ExchangeToken.symbol : state.curToken} */}
                  </span>
                </List>
              </BlurWrap>
              <Button
                {...{
                  ...props,
                  actionText: tab,
                  amount: state.stakeAmount,
                  curToken: state.curToken,
                  stakeToken: StakeTokens ? StakeTokens.find((item) => item.symbol === state.curToken) : {},
                  onSuccess: () => {
                    updateState({ loading: true, stakeAmount: '' });
                  }
                }}
              />

              <BtnWrap>
                {[59144, 34443].includes(chainId) && <Btn onClick={handleOpenWrap}>Wrap</Btn>}

                {/* <Btn onClick={handleTabChange}>
                {tab === "Stake" ? "Stake" : "Unstake"}
              </Btn> */}
              </BtnWrap>
            </Content>
          )}

          {tab === 'Withdraw' && (
            <WithdrawWrap>
              <BlurWrap>
                {chainId !== 1 && (tab === 'Unstake' || tab === 'Withdraw') ? <Blur></Blur> : null}
                {state.withdrawList.length ? (
                  <>
                    <div className="withdraw-title">AMOUNT</div>
                    <div className="withdraw-list">
                      {state.withdrawList.map((item, index) => (
                        <div className="withdraw-item" key={index}>
                          <span className="withdraw-amount">
                            {Number(item.amount).toFixed(6)} {item.symbol}
                          </span>
                          {item.canClaim ? (
                            <ClaimBtn onClick={(e) => handleClaim(item.asset)}>
                              {state.claimLoading ? <Loading size={16} /> : 'Claim'}
                            </ClaimBtn>
                          ) : (
                            <span>~in 7 - 10 days</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="empty">
                    <div className="empty-title">No unstake requests found</div>
                    <div className="empty-txt">
                      You will be able to claim your tokens after the Unstake request has been processed. To Unstake
                      your tokens go to Unstake tab
                    </div>
                  </div>
                )}
              </BlurWrap>
              <SwitchBtn
                {...{
                  ...props,
                  actionText: tab
                }}
              />
            </WithdrawWrap>
          )}
        </Wrapper>

        {state.showDialog && (
          <Wrap
            {...{
              account,
              provider,
              toast,
              chainId,
              addAction,
              SYMBOL_ADDRESS,
              tokenPairs,
              onCloseWrap: handleCloseWrap,
              multicall,
              multicallAddress,
              dexConfig
            }}
          />
        )}
      </StyledContainer>
    </div>
  );
});
