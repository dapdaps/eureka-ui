
// @ts-nocheck
import type { BigNumberish } from "@ethersproject/bignumber";
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo, useEffect } from 'react';

import useAccount from '@/hooks/useAccount';
import { useMultiState } from '@/modules/hooks';

import {
  BalancePrice,
  Column,
  DetailWrapper,
  FilterButton,
  FilterButtonList,
  Input,
  InputSuffix,
  InputWrap,
  PriceWrap,
  Row,
  StyledButton,
  StyledButtonList,
  StyledImageList,
  TotalPrice
} from '../../styles';
import Loading from '../Loading';


export default memo(function Detail(props: any) {
  const { account, provider } = useAccount();
  const {
    from,
    data,
    toast,
    prices,
    addresses,
    defaultDex,
    proxyAddress,
    addAction,
    userPositions,
    ICON_VAULT_MAP
  } = props;

  const defaultDeposit = props.tab === "deposit" || !props.tab;
  const curPositionUSD = userPositions && userPositions[data?.vaultAddress]?.balanceUSD;

  const [state, updateState] = useMultiState({
    toastId: null,
    isDeposit: defaultDeposit,
    lpBalance: "",
    balances: [],
    amount0: "",
    amount1: "",
    lpAmount: "",
    isError: false,
    isLoading: false,
    isToken0Approved: true,
    isToken1Approved: true,
    isToken0Approving: false,
    isToken1Approving: false,
    loadingMsg: "",
    isPostTx: false,
    showPairs: false,
    focusedSymbol: "",
    lpPercent: 0
  })
  const sourceBalances: any = {
  }
  const {
    isDeposit,
    balances,
    amount0,
    amount1,
    isLoading,
    isError,
    isToken0Approved,
    isToken1Approved,
    isToken0Approving,
    isToken1Approving,
    loadingMsg,
    lpBalance,
    lpAmount,
    isPostTx,
  } = state;

  const detailLoading = Object.keys(balances).length < 2 || lpBalance === ""

  const sender = account;
  const { token0, token1, decimals0, decimals1, id } = data;
  const vaultAddress = addresses[id];

  const tokensPrice = prices;

  const isInSufficient =
    Number(amount0) > Number(balances[token0]) ||
    Number(amount1) > Number(balances[token1]);

  const isWithdrawInsufficient = Number(lpAmount) > Number(lpBalance);

  const balance0 =
    !amount0 || !tokensPrice?.[token0]
      ? "-"
      : parseFloat(Big(amount0).times(tokensPrice[token0]).toFixed(4));

  const balance1 =
    !amount1 || !tokensPrice?.[token1]
      ? "-"
      : parseFloat(Big(amount1).times(tokensPrice[token1]).toFixed(4));

  const balanceLp =
    !lpAmount || !lpBalance || !curPositionUSD
      ? "-"
      : parseFloat(
        Big(lpAmount)
          .div(Big(lpBalance).gt(0) ? lpBalance : 1)
          .times(curPositionUSD)
          .toFixed(4)
      );

  const getFromDepositAmount = (depositAmount: any, tokenDecimal: number) => {
    const a = new Big(depositAmount[0].toString());
    const b = new Big(depositAmount[1].toString());

    if (a.eq(0) && b.eq(0)) return "0";

    let diff;
    let midpoint;
    if (a.gt(b)) {
      diff = a.minus(b);
      midpoint = diff.div(new Big(2)).plus(b);
    } else {
      diff = b.minus(a);
      midpoint = diff.div(new Big(2)).plus(a);
    }

    for (let i = tokenDecimal; i > 0; i--) {
      const midpointFixed = midpoint
        .div(new Big(10).pow(tokenDecimal))
        .toFixed(i);
      if (
        a.div(Big(10).pow(tokenDecimal)).lte(midpointFixed) &&
        b.div(Big(10).pow(tokenDecimal)).gte(midpointFixed)
      ) {
        return midpointFixed;
      }
    }

    return "0";
  };

  const updateLPBalance = () => {
    const abi = ["function balanceOf(address) view returns (uint256)"];
    const vaultContract = new ethers.Contract(
      vaultAddress,
      abi,
      provider
    );
    vaultContract.balanceOf(sender).then((balanceBig: BigNumberish) => {
      const adjustedBalance = ethers.utils.formatUnits(balanceBig, 18);
      updateState({
        lpBalance: adjustedBalance,
      })
    });
  };
  const updateBalance = (token: any) => {
    const { address, decimals, symbol } = token;
    if (symbol === "ETH") {
      provider
        .getBalance(sender)
        .then((balanceBig: BigNumberish) => {
          const adjustedBalance = ethers.utils.formatEther(balanceBig);
          sourceBalances[symbol] = adjustedBalance
          updateState({
            balances: sourceBalances,
          });
        });
    } else {
      const erc20Abi = ["function balanceOf(address) view returns (uint256)"];
      const tokenContract = new ethers.Contract(
        address,
        erc20Abi,
        provider.getSigner()
      );
      tokenContract.balanceOf(sender)
        .then((balanceBig: BigNumberish) => {
          const adjustedBalance = Big(
            ethers.utils.formatUnits(balanceBig, decimals)
          ).toFixed();
          sourceBalances[symbol] = adjustedBalance
          updateState({
            balances: sourceBalances,
          });
        })
        .catch((error: Error) => {
          console.log('error: ', error);
          setTimeout(() => {
            updateBalance(token)
          }, 1500)
        });
    }
  };

  const handleCheckApproval = (symbol: string, amount: string, decimals: number) => {
    const wei: any = ethers.utils.parseUnits(
      Big(amount).toFixed(decimals),
      decimals
    );
    const abi = [
      "function allowance(address, address) external view returns (uint256)",
    ];

    const contract = new ethers.Contract(
      addresses[symbol],
      abi,
      provider.getSigner()
    );
    return new Promise((resolve) => {
      contract
        .allowance(sender, vaultAddress)
        .then((allowance: any) => {
          const approved = !new Big(allowance.toString()).lt(wei)
          updateState({
            [symbol === token0 ? 'isToken0Approved' : 'isToken1Approved']: approved,
          });
          resolve(approved)
        })
        .catch((e: Error) => console.log(e));
    })
  }
  const checkApproval = (amount: string, otherAmount: string, symbol: string, callback: any) => {
    const otherSymbol = symbol === token0 ? token1 : token0
    const decimals = symbol === token0 ? decimals0 : decimals1
    const otherDecimals = symbol === token0 ? decimals1 : decimals0
    const promiseArray = [
      handleCheckApproval(symbol, amount, decimals),
      handleCheckApproval(otherSymbol, otherAmount, otherDecimals)
    ]
    Promise.all(promiseArray).then(result => {
      const [firstApproved, secondApproved] = result
      if (callback) {
        if (firstApproved && secondApproved) {
          symbol === token0 ? callback(amount, otherAmount) : callback(otherAmount, amount)
        } else {
          toast?.dismiss(state.toastId);
          updateState({
            isLoading: false
          })
        }
      }
    })
  };
  const changeMode = (isDeposit: boolean) => {
    updateState({ isDeposit });
  };

  const handleMax = (isToken0: boolean) => {
    if (isToken0) handleTokenChange(balances[token0], token0);
    else handleTokenChange(balances[token1], token1);
  };

  const handleTokenChange = (amount: string, symbol: string, callback?: any) => {
    updateState({ [symbol === token0 ? 'amount0' : 'amount1']: amount });
    if (Number(amount) === 0) {
      updateState({
        [symbol === token0 ? 'amount1' : 'amount0']: "",
        isToken0Approved: true,
        isToken1Approved: true,
      });
      return;
    }

    updateState({
      isLoading: true,
      isError: false,
      loadingMsg: "Computing deposit amount...",
    });
    const decimals = (symbol === token0 ? decimals0 : decimals1)
    const otherDecimals = symbol === token0 ? decimals1 : decimals0

    const tokenWei = ethers.utils.parseUnits(
      Big(amount).toFixed(decimals),
      decimals
    );

    const proxyAbi = [
      "function getDepositAmount(address, address, uint256) public view returns (uint256, uint256)",
    ];
    const proxyContract = new ethers.Contract(
      proxyAddress,
      proxyAbi,
      provider
    );

    proxyContract
      .getDepositAmount(vaultAddress, addresses[symbol], tokenWei)
      .then((depositAmount: any) => {
        const otherAmount = getFromDepositAmount(depositAmount, otherDecimals);
        updateState({
          [symbol === token0 ? 'amount1' : 'amount0']: otherAmount,
          focusedSymbol: symbol,
          isLoading: callback ? true : false
        });
        checkApproval(amount, otherAmount, symbol, callback);
      })
      .catch((e: Error) => {
        updateState({
          isLoading: true,
          isError: true,
          loadingMsg: "Something went wrong. Please try again.",
        });
      });
  };


  const handleLPChange = (amount: string) => {
    updateState({
      lpAmount: amount,
    });
  };

  const handleApprove = (isToken0: boolean) => {
    const _token = isToken0 ? token0 : token1;
    const payload = isToken0
      ? { isToken0Approving: true }
      : { isToken1Approving: true };

    const amount = isToken0
      ? Big(amount0).toFixed(decimals0)
      : Big(amount1).toFixed(decimals1);

    const toastId = toast?.loading({
      title: `Approve ${_token}`,
    });

    updateState({
      ...payload,
      isLoading: true,
      loadingMsg: `Approving ${_token}...`,
    });

    const tokenWei = ethers.utils.parseUnits(
      amount,
      isToken0 ? decimals0 : decimals1
    );

    const abi = ["function approve(address, uint) public"];

    const tokenContract = new ethers.Contract(
      addresses[_token],
      abi,
      provider.getSigner()
    );

    tokenContract
      .approve(vaultAddress, tokenWei)
      .then((tx: any) => tx.wait())
      .then((receipt: any) => {
        const payload = isToken0
          ? { isToken0Approved: true, isToken0Approving: false }
          : { isToken1Approved: true, isToken1Approving: false };

        updateState({ ...payload, isLoading: false, loadingMsg: "" });
        toast?.dismiss(toastId);
        toast?.success({
          title: "Approve Successfully!",
          tx: receipt.transactionHash,
          chainId: props.chainId,
        });
      })
      .catch((error: Error) => {
        console.log('error: ', error)
        updateState({
          isError: true,
          isLoading: false,
          loadingMsg: error?.message,
          isToken0Approving: false,
          isToken1Approving: false,
        });
        toast?.dismiss(toastId);
        toast?.fail({
          title: "Approve Failed!",
          text: error?.message?.includes("user rejected transaction")
            ? "User rejected transaction"
            : null
        });
      });
  };
  const handleDeposit = () => {
    const toastId = toast?.loading({
      title: `Depositing...`,
    });
    updateState({
      toastId,
      isLoading: true,
      isError: false,
      loadingMsg: "Depositing...",
    });
    handleTokenChange(
      state.focusedSymbol === token0 ? amount0 : amount1,
      state.focusedSymbol === token0 ? token0 : token1,
      (amount: string, otherAmount: string) => {
        const tokenWei = ethers.utils.parseUnits(
          Big(amount).toFixed(decimals0),
          decimals0
        );
        const otherTokenWei = ethers.utils.parseUnits(
          Big(otherAmount).toFixed(decimals1),
          decimals1
        );
        const proxyAbi = [
          "function deposit(uint256, uint256,address,address,uint256[4] memory)  external returns (uint256)",
        ];
        const proxyContract = new ethers.Contract(
          proxyAddress,
          proxyAbi,
          provider.getSigner()
        );
        proxyContract
          .deposit(tokenWei, otherTokenWei, sender, ethers.utils.getAddress(vaultAddress), [0, 0, 0, 0])
          .then((tx: any) => {
            return tx.wait();
          })
          .then((receipt: any) => {
            const { status, transactionHash } = receipt;

            addAction?.({
              type: "Liquidity",
              action: "Deposit",
              token0,
              token1,
              amount: amount0,
              template: defaultDex,
              status: status,
              add: 1,
              transactionHash,
              chain_id: props.chainId,
              extra_data: JSON.stringify({
                action: "Deposit",
                amount0,
                amount1,
              })
            });

            updateState({
              isLoading: false,
              isPostTx: true,
            });

            setTimeout(() => updateState({ isPostTx: false }), 10_000);

            const { refetch } = props;
            if (refetch) {
              refetch()
            }

            toast?.dismiss(toastId);
            toast?.success({
              title: "Deposit Successfully!",
            });
          })
          .catch((error: Error) => {
            console.log('error: ', error)
            updateState({
              isError: true,
              isLoading: false,
              loadingMsg: error?.message,
            });
            toast?.dismiss(toastId);
            toast?.fail({
              title: "Deposit Failed!",
              text: error?.message?.includes("user rejected transaction")
                ? "User rejected transaction"
                : error?.message ?? "",
            });
          });
      })
  };
  const handleGetAmount = (contract: any, params: any, callback: any) => {
    contract
      .callStatic
      .withdraw(...params)
      .then(callback)
  }
  const handleWithdraw = () => {
    const toastId = toast?.loading({
      title: `Withdrawing...`,
    });
    updateState({
      isLoading: true,
      isError: false,
      loadingMsg: "Withdrawing...",
    });

    const lpWeiAmount = ethers.utils.parseUnits(Big(lpAmount).toFixed(18), 18);
    const abi = [
      "function withdraw(uint256, address, address,uint256[4] memory) external returns (uint256, uint256)",
    ];

    const contract = new ethers.Contract(
      vaultAddress,
      abi,
      provider.getSigner()
    );
    const params = [lpWeiAmount, sender, sender, [0, 0, 0, 0]]
    contract
      .callStatic
      .withdraw(...params)
      .then(result => {
        contract
          .withdraw(...params)
          .then((tx: any) => tx.wait())
          .then((receipt: any) => {
            updateState({
              isLoading: false,
              isPostTx: true,
            });
            const { status, transactionHash } = receipt;
            console.log('=receipt', receipt)

            addAction?.({
              type: "Liquidity",
              action: "Withdraw",
              token0,
              token1,
              amount: lpAmount,
              template: defaultDex,
              status: status,
              add: 0,
              transactionHash,
              chain_id: props.chainId,
              extra_data: JSON.stringify({
                action: "Withdraw",
                amount0: ethers.utils.formatUnits(result[0], decimals0),
                amount1: ethers.utils.formatUnits(result[1], decimals1),
              })
            });
            setTimeout(() => updateState({ isPostTx: false }), 10_000);
            const { refetch } = props;
            if (refetch) {
              setTimeout(() => {
                refetch();
              }, 3000)
            }

            toast?.dismiss(toastId);
            toast?.success({
              title: "Withdraw Successfully!",
            });
          })
          .catch((error: Error) => {
            updateState({
              isError: true,
              isLoading: false,
              loadingMsg: error?.message,
            });
            toast?.dismiss(toastId);
            toast?.fail({
              title: "Withdraw Failed!",
              text: error?.message?.includes("user rejected transaction")
                ? "User rejected transaction"
                : error?.message ?? "",
            });
          });
      })


  };


  const onUpdateLpPercent = (percent: number) => {
    updateState({
      lpPercent: percent,
    });
  };

  const onChangeSlider = (percent: number) => {
    console.log("percent: ", percent);
    const newLpValue = Big(percent)
      .div(100)
      .times(lpBalance || 0)
      .toFixed(6);

    handleLPChange(newLpValue);
  };
  useEffect(() => {
    if (!sender || !token0 || !token1) return;
    [
      { symbol: token0, address: addresses[token0], decimals: decimals0 },
      { symbol: token1, address: addresses[token1], decimals: decimals1 },
    ].map(updateBalance);

    updateLPBalance();
  }, [sender, token0, token1]);
  
  useEffect(() => {
    if (amount0) {
      handleTokenChange(amount0, token0);
    }
  }, [data]);
  return (
    <DetailWrapper>
      <FilterButtonList>
        <FilterButton className={[isDeposit ? 'isActive' : '', from].join(' ')} onClick={() => changeMode(true)}>Deposit</FilterButton>
        <FilterButton className={[!isDeposit ? 'isActive' : '', from].join(' ')} onClick={() => changeMode(false)}>Withdraw</FilterButton>
      </FilterButtonList>
      {
        detailLoading ? (
          <div style={{ padding: "30px 0 45px" }}>
            <Loading color="#999" />
          </div>
        ) : (
          <>
            {
              isDeposit ? <>
                <Row className="price-input">
                  <Column>
                    <InputWrap className={Number(amount0) > Number(balances[token0]) ? "inSufficient" : ""}>
                      <Input value={amount0} type="number" onChange={(e) => handleTokenChange(e.target.value, token0)} />
                      <InputSuffix>
                        <img src={ICON_VAULT_MAP[token0]} alt={token0} />
                        <span>{token0}</span>
                      </InputSuffix>
                    </InputWrap>
                    <PriceWrap>
                      <TotalPrice>${balance0}</TotalPrice>
                      <BalancePrice>Balance:<span onClick={() => handleMax(true)}>{Big(balances[token0] ?? 0).toFixed(6)}</span> {token0}</BalancePrice>
                    </PriceWrap>
                  </Column>
                  <Column>
                    <InputWrap className={Number(amount1) > Number(balances[token1]) ? "inSufficient" : ""}>
                      <Input value={amount1} type="number" onChange={(e) => handleTokenChange(e.target.value, token1)} />
                      <InputSuffix>
                        <img src={ICON_VAULT_MAP[token1]} alt={token1} />
                        <span>{token1}</span>
                      </InputSuffix>
                    </InputWrap>
                    <PriceWrap>
                      <TotalPrice>${balance1}</TotalPrice>
                      <BalancePrice>Balance:<span onClick={() => handleMax(false)}>{Big(balances[token1] ?? 0).toFixed(6)}</span> {token1}</BalancePrice>
                    </PriceWrap>
                  </Column>
                </Row>
                <StyledButtonList>
                  {isInSufficient && <StyledButton disabled>InSufficient Balance</StyledButton>}
                  {
                    !isInSufficient &&
                    (isToken0Approved &&
                      isToken1Approved &&
                      !isToken0Approving &&
                      !isToken1Approving ? (

                      <StyledButton disabled={isLoading || !amount0 || !amount1} onClick={handleDeposit}>
                        {
                          isLoading ? (
                            <Loading />
                          ) : (
                            "Deposit"
                          )
                        }
                      </StyledButton>
                    ) : (
                      <>
                        <StyledButton disabled={isToken0Approved || isToken0Approving} onClick={() => handleApprove(true)}>{
                          isToken0Approving ? (
                            <Loading />
                          ) : (
                            <>
                              {isToken0Approved ? "Approved" : "Approve"} {token0}
                            </>
                          )}
                        </StyledButton>
                        <StyledButton disabled={isToken1Approved || isToken1Approving} onClick={() => handleApprove(false)}>{
                          isToken1Approving ? (
                            <Loading />
                          ) : (
                            <>
                              {isToken1Approved ? "Approved" : "Approve"} {token1}
                            </>
                          )}
                        </StyledButton>
                      </>
                    ))
                  }
                </StyledButtonList>
              </> : <>
                <Row className="price-input">
                  <Column>
                    <InputWrap>
                      <Input value={lpAmount} type="number" onChange={(e) => {
                        handleLPChange(e.target.value);

                        const value = e.target.value;

                        if (!value) {
                          onUpdateLpPercent(0);
                        }

                        if (value && Big(value).gt(0)) {
                          const newSliderPercent = Big(value || 0)
                            .div(Big(lpBalance).gt(0) ? lpBalance : 1)
                            .times(100)
                            .toFixed(0);
                          onUpdateLpPercent(Number(newSliderPercent));
                        }
                      }} />

                      <InputSuffix>
                        <StyledImageList>
                          <img src={ICON_VAULT_MAP[token0]} alt={token0} />
                          <img src={ICON_VAULT_MAP[token1]} alt={token1} style={{ marginLeft: -6 }} />
                        </StyledImageList>
                        <span>{token0}/{token1}</span>
                      </InputSuffix>
                    </InputWrap>
                    <PriceWrap>
                      <TotalPrice>${balanceLp}</TotalPrice>
                      <BalancePrice>Balance: <span
                        onClick={() => {
                          const newSliderPercent = Big(lpBalance || 0)
                            .div(Big(lpBalance).gt(0) ? lpBalance : 1)
                            .times(100)
                            .toFixed(0);

                          onUpdateLpPercent(Number(newSliderPercent));

                          handleLPChange(lpBalance);
                        }}
                      >
                        {lpBalance}
                      </span></BalancePrice>
                    </PriceWrap>
                  </Column>
                </Row>
                <StyledButtonList>
                  <StyledButton
                    disabled={isWithdrawInsufficient || isLoading || Number(lpAmount) <= 0}
                    onClick={handleWithdraw}
                  >
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <>
                        {isWithdrawInsufficient ? "InSufficient Balance" : "Withdraw"}
                      </>
                    )}
                  </StyledButton>
                </StyledButtonList>
              </>
            }
          </>
        )
      }
    </DetailWrapper>
  )
})
