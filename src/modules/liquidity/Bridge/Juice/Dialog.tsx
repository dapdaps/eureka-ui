// @ts-nocheck
import Big from "big.js";
import { ethers } from 'ethers';
import { memo, useEffect } from 'react';
import styled from "styled-components";

import Loading from '@/modules/components/Loading'
import { useMultiState } from '@/modules/hooks';
const StyledDialog = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`
const StyledMasker = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.50);
  z-index: 99;
`
const StyledWrapContainer = styled.div`
  position: relative;
  width: 420px;
  height: 253px;
  flex-shrink: 0;

  border-radius: 16px;
  border: 1px solid #373A53;
  background: #262836;
  z-index: 999;
`
const StyledWrapContainerTop = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #373A53;
`
const StyledClose = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 20px;
  top: 20px;
`
const StyledWrapContainerTopButton = styled.div`
  position: relative;
  padding: 15px 0 17px;
  flex: 1;
  text-align: center;
  color: #979ABE;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
  &.active {
    color: #FFF;
    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 3px;
      background: #FFF;
    }
  }
`
const StyledWrapContainerBottom = styled.div`
  padding: 30px 20px 0;
`
const StyledWrapOrUnwrapInput = styled.div`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #373A53;
  background: #1B1E27;
  height: 71px;
`
const StyledWrapOrUnwrapInputTop = styled.div`
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StyledWrapOrUnwrapInputBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StyledWrapOrUnwrapInputTopType = styled.div`
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const StyledWrapOrUnwrapInputTopBalance = styled.div`
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  span {
    cursor: pointer;
    color: #FFF;
    text-decoration-line: underline;
  }
`
const StyledWrapOrUnwrapInputBottomInput = styled.input`
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  
  color: #FFF;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }
`
const StyledWrapOrUnwrapInputBottomSymbol = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`
const StyledWrapOrUnwrapInputBottomSymbolImage = styled.img`
  width: 20px;
`
const StyledWrapOrUnwrapInputBottomSymbolTxt = styled.div`
  color: #FFF;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const StyledWrapOrUnwrapInputBottomInputTxt = styled.div`
  color: #5E617E;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const StyledWrapOrUnwrapButton = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 380px;
  height: 48px;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 8px;
  background: linear-gradient(180deg, #EEF3BF 0%, #E9F456 100%);

  color: #02051E;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.3;
  }
`

export default memo(function Dialog(props: any) {
  const [state, updateState] = useMultiState<any>({
    categoryList: ["Wrap", "Unwrap"],
    categoryIndex: 0,
    wrapAmount: "",
    unwrapAmount: "",
    wrapLoading: false,
    unwrapLoading: false,
    balances: {
      ETH: 0,
      WETH: 0
    }

  })
  const {
    toast,
    sender,
    provider,
    chainId,
    addAction,
    onCloseWrap,
  } = props

  const WETH_ADDRESS = "0x4300000000000000000000000000000000000004"
  const isWrapInSufficient = Number(state?.wrapAmount ?? 0) > Number(state?.balances["ETH"] ?? 0)
  const isUnwrapInSufficient = Number(state?.unwrapAmount ?? 0) > Number(state?.balances["WETH"] ?? 0)

  function handleQueryBalances() {
    provider
      .getBalance(sender)
      .then((result) => {
        const balances = state.balances
        balances["ETH"] = Big(ethers.utils.formatEther(result)).toFixed(4)
        updateState({
          balances
        })
      });
    const abi = [{
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }]
    const contract = new ethers.Contract(
      ethers.utils.getAddress(WETH_ADDRESS),
      abi,
      provider.getSigner()
    );
    contract.balanceOf(sender).then(result => {
      const balances = state.balances
      balances["WETH"] = Big(ethers.utils.formatEther(result)).toFixed(4)
      updateState({
        balances
      })
    })
  }
  function handleAmountChange(amount) {
    if (Number(amount) < 0) {
      return
    }
    const keyArray = ["wrapAmount", "unwrapAmount"]
    if (Number(amount) === 0) {
      updateState({
        [keyArray[state.categoryIndex]]: amount,
      })
      return
    }
    updateState({
      [keyArray[state.categoryIndex]]: amount
    })
  }
  function handleWrap() {
    updateState({
      wrapLoading: true
    })
    const toastId = toast?.loading({
      title: `Wrap ${state.wrapAmount} ETH`,
    });
    const abi = [{
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }]
    const contract = new ethers.Contract(
      ethers.utils.getAddress(WETH_ADDRESS),
      abi,
      provider.getSigner()
    );
    const _amount = Big(state.wrapAmount)
      .mul(Big(10).pow(18))
      .toFixed(0)
    contract.deposit({ value: _amount })
      .then(tx => tx.wait())
      .then(result => {
        const { status, transactionHash } = result;
        toast?.dismiss(toastId);
        if (status !== 1) throw new Error("");
        updateState({
          wrapLoading: false
        })
        toast?.success({
          title: "Wrap Successfully!",
          text: `Wrap ${state.wrapAmount} ETH`,
          tx: transactionHash,
          chainId,
        });
        addAction?.({
          type: "Yield",
          action: "Wrap",
          token0: "ETH",
          token1: "WETH",
          amount: state?.wrapAmount,
          template: "Juice",
          add: true,
          status,
          transactionHash,
        });
        handleRefresh()
      })
      .catch(error => {
        console.log('=error', error)
        updateState({
          wrapLoading: false
        })
        toast?.fail({
          title: "Wrap Failed!",
          text: error?.message?.includes("user rejected transaction")
            ? "User rejected transaction"
            : `Wrap ${state.wrapAmount} ETH`,
        });
      })
  }
  function handleUnwrap() {
    updateState({
      unwrapLoading: true
    })
    const toastId = toast?.loading({
      title: `Unwrap ${state.wrapAmount} WETH`,
    });
    const abi = [{
      "inputs": [
        {
          "internalType": "uint256",
          "name": "wad",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }]
    const contract = new ethers.Contract(
      ethers.utils.getAddress(WETH_ADDRESS),
      abi,
      provider.getSigner()
    );
    const _amount = Big(state.unwrapAmount)
      .mul(Big(10).pow(18))
      .toFixed(0)
    contract.withdraw(_amount)
      .then(tx => tx.wait())
      .then(result => {
        const { status, transactionHash } = result;
        toast?.dismiss(toastId);
        if (status !== 1) throw new Error("");
        updateState({
          unwrapLoading: false
        })
        toast?.success({
          title: "Unwrap Successfully!",
          text: `Unwrap ${state.unwrapAmount} WETH`,
          tx: transactionHash,
          chainId,
        });
        addAction?.({
          type: "Yield",
          action: "Unwrap",
          token0: "WETH",
          token1: "ETH",
          amount: state?.unwrapAmount,
          template: "Juice",
          add: false,
          status: 1,
          transactionHash,
        });
        handleRefresh()
      })
      .catch(error => {
        console.log('=error', error)
        updateState({
          unwrapLoading: false
        })
        toast?.fail({
          title: "Unwrap Failed!",
          text: error?.message?.includes("user rejected transaction")
            ? "User rejected transaction"
            : `Unwrap ${state.unwrapAmount} ETH`,
        });
      })
  }
  function handleRefresh() {
    handleQueryBalances()
  }
  function handleMax() {
    const amount = state.categoryIndex === 0 ? state.balances["ETH"] : state.balances["WETH"]
    handleAmountChange(amount)
  }
  useEffect(() => {
    handleRefresh()
  }, [])

  return (
    <StyledDialog>
      <StyledMasker onClick={onCloseWrap} />
      <StyledWrapContainer>
        <StyledWrapContainerTop>
          {
            state.categoryList.map((category, index) => (
              <StyledWrapContainerTopButton
                key={index}
                className={state.categoryIndex === index ? "active" : ""}
                onClick={() => {
                  updateState({
                    categoryIndex: index
                  })
                }}
              >{category}</StyledWrapContainerTopButton>
            ))
          }
          <StyledClose onClick={onCloseWrap}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884124 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882277 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884277 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z" fill="#979ABE" />
            </svg>
          </StyledClose>
        </StyledWrapContainerTop>
        {
          state.categoryIndex === 0 ? (
            <StyledWrapContainerBottom>
              <StyledWrapOrUnwrapInput>
                <StyledWrapOrUnwrapInputTop>
                  <StyledWrapOrUnwrapInputTopType>Deposit</StyledWrapOrUnwrapInputTopType>
                  <StyledWrapOrUnwrapInputTopBalance>
                    Balance: <span onClick={handleMax}>{state.balances["ETH"]}</span>
                  </StyledWrapOrUnwrapInputTopBalance>
                </StyledWrapOrUnwrapInputTop>
                <StyledWrapOrUnwrapInputBottom>
                  <StyledWrapOrUnwrapInputBottomInput type="number" placeholder="0.0" value={state.wrapAmount} onChange={event => handleAmountChange(event.target.value)} />
                  <StyledWrapOrUnwrapInputBottomSymbol>
                    <StyledWrapOrUnwrapInputBottomSymbolImage src="https://ipfs.near.social/ipfs/bafkreib3g5xhs4b3djuvtarhutz5ayogdi7bz7nft6a2zg2e7pi2445uny" />
                    <StyledWrapOrUnwrapInputBottomSymbolTxt>ETH</StyledWrapOrUnwrapInputBottomSymbolTxt>
                  </StyledWrapOrUnwrapInputBottomSymbol>
                </StyledWrapOrUnwrapInputBottom>
              </StyledWrapOrUnwrapInput>
              {
                isWrapInSufficient ? (
                  <StyledWrapOrUnwrapButton disabled>InSufficient Balance</StyledWrapOrUnwrapButton>
                ) : state.wrapLoading ? (
                  <StyledWrapOrUnwrapButton disabled>
                    <Loading />
                  </StyledWrapOrUnwrapButton>
                ) : state.wrapAmount > 0 ? (
                  <StyledWrapOrUnwrapButton onClick={handleWrap}>Wrap</StyledWrapOrUnwrapButton>
                ) : (
                  <StyledWrapOrUnwrapButton disabled>Wrap</StyledWrapOrUnwrapButton>
                )
              }
            </StyledWrapContainerBottom>
          ) : (
            <StyledWrapContainerBottom>
              <StyledWrapOrUnwrapInput>
                <StyledWrapOrUnwrapInputTop>
                  <StyledWrapOrUnwrapInputTopType>Deposit</StyledWrapOrUnwrapInputTopType>
                  <StyledWrapOrUnwrapInputTopBalance>
                    Balance: <span onClick={handleMax}>{state.balances["WETH"]}</span>
                  </StyledWrapOrUnwrapInputTopBalance>
                </StyledWrapOrUnwrapInputTop>
                <StyledWrapOrUnwrapInputBottom>
                  <StyledWrapOrUnwrapInputBottomInput type="number" placeholder="0.0" value={state.unwrapAmount} onChange={event => handleAmountChange(event.target.value)} />
                  <StyledWrapOrUnwrapInputBottomSymbol>
                    <StyledWrapOrUnwrapInputBottomSymbolImage src="https://ipfs.near.social/ipfs/bafkreif5jqf6onhhj6aqfjt6zq2lqanw6o3kzmb7exnqjw42p4hpwrojmu" />
                    <StyledWrapOrUnwrapInputBottomSymbolTxt>WETH</StyledWrapOrUnwrapInputBottomSymbolTxt>
                  </StyledWrapOrUnwrapInputBottomSymbol>
                </StyledWrapOrUnwrapInputBottom>
              </StyledWrapOrUnwrapInput>
              {
                isUnwrapInSufficient ? (
                  <StyledWrapOrUnwrapButton disabled>InSufficient Balance</StyledWrapOrUnwrapButton>
                ) : state.unwrapLoading ? (
                  <StyledWrapOrUnwrapButton disabled>
                    <Loading />
                  </StyledWrapOrUnwrapButton>
                ) : state.unwrapAmount > 0 ? (
                  <StyledWrapOrUnwrapButton onClick={handleUnwrap}>Unwrap</StyledWrapOrUnwrapButton>
                ) : (
                  <StyledWrapOrUnwrapButton disabled>Unwrap</StyledWrapOrUnwrapButton>
                )
              }
            </StyledWrapContainerBottom>
          )
        }
      </StyledWrapContainer>
    </StyledDialog>
  )
})
