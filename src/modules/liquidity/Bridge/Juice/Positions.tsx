// @ts-nocheck
import Big from "big.js";
import { ethers } from 'ethers';
import { memo, useEffect } from 'react';
import styled from "styled-components";

import { useMultiState } from '@/modules/hooks';
const StyledContainer = styled.div`
  width: 1000px;
`
const StyledTitle = styled.div`
  margin-bottom: 16px;
  color: #FFF;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
const StyledDashboardContainer = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  padding-left: 26px;
  border-radius: 12px;
  border: 1px solid #373A53;
  background: #262836;

`
const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const StyledLabel = styled.div`
  color: #979ABE;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const StyledValue = styled.div`
  color: #FFF;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
const StyledPostionsContainer = styled.div`
  border-radius: 12px;
  border: 1px solid #373A53;
  background: #262836;
`
const StyledPostionsTop = styled.div`
  height: 53px;
  display: flex;
  align-items: center;
  padding-left: 26px;
  border-bottom: 1px solid #373A53;
`
const StyledPostionsTopColumn = styled.div`
  width: 20%;
  color: #979ABE;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const StyledPostionsBottom = styled.div`
  padding-bottom: 58px;
`
const StyledPosition = styled.div`
  padding: 20px 0 20px 26px;
  display: flex;
  align-items: center;
`
const StyledPositionColumn = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  gap: 8px;

`
const StyledPositionColumnImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 6px;
  background: #FFF;
`
const StyledPositionColumnImage = styled.img`
  width: 20px;
`
const StyledPositionColumnTxt = styled.div`
  color: #FFF;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
const StyledPositionColumnButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 6px;
  background: var(--button-color);
  color: var(--button-text-color);
  text-align: center;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const StyledNotHave = styled.div`
  padding-top: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #979ABE;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
export default memo(function Positions(props: any) {
  const {
    sender,
    provider,
    vaults,
    prices,
    symbolIndex,
    PROXY_ADDRESS,
    SYMBOL_NAME_MAPPING,
    multicall,
    multicallAddress,
    smartContractAddress,
    onManage
  } = props

  const FIRST_SYMBOL_NAME = SYMBOL_NAME_MAPPING[symbolIndex][0]
  const SECOND_SYMBOL_NAME = SYMBOL_NAME_MAPPING[symbolIndex][1]
  const [state, updateState] = useMultiState<any>({
    dashboard: null,
    filterVaults: [],
    pnl: 0,
  })
  function isNotEmptyArray(value) {
    return value && value[0]
  }
  function handleQueryDashboard() {
    const calls = []
    const GET_ACCOUNT_HEALTH_ABI = symbolIndex === 1 ? {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getAccountHealth",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "debtAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "collateralValue",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "investmentValue",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isLiquidatable",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasBadDebt",
              "type": "bool"
            }
          ],
          "internalType": "struct AccountLib.Health",
          "name": "health",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    } : {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getAccountHealth",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "debtAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "collateralValue",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "investmentValue",
              "type": "uint256"
            },
            {
              "internalType": "UD60x18",
              "name": "healthFactor",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isLiquidatable",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isRisky",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasBadDebt",
              "type": "bool"
            }
          ],
          "internalType": "struct AccountLib.Health",
          "name": "health",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
    console.log('111111')
    const abi = [GET_ACCOUNT_HEALTH_ABI, {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getDebtAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }, {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "balanceOfAssets",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "assets",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }]
    calls.push({
      address: PROXY_ADDRESS,
      name: "getAccountHealth",
      params: [smartContractAddress]
    })
    calls.push({
      address: PROXY_ADDRESS,
      name: "getDebtAmount",
      params: [smartContractAddress]
    })
    calls.push({
      address: PROXY_ADDRESS,
      name: "balanceOfAssets",
      params: [sender]
    })
    multicall({
      abi,
      calls,
      options: {},
      multicallAddress,
      provider,
    }).then(result => {
      const [
        getAccountHealthResult,
        getDebtAmountResult,
        balanceOfAssetsResult,
      ] = result
      const [A1, A2, A3] = isNotEmptyArray(getAccountHealthResult) ? getAccountHealthResult[0] : [1, 0, 0]
      updateState({
        dashboard: {
          accountHealth: Big(A1).gt(0) ? (Big(Big(A2).plus(A3)).div(A1).times(100).toFixed(2) + "%") : "N/A",
          debtAmount: Big(isNotEmptyArray(getDebtAmountResult) ? ethers.utils.formatUnits(getDebtAmountResult[0]) : 0).toFixed(4),
          balanceOfAssets: Big(isNotEmptyArray(balanceOfAssetsResult) ? ethers.utils.formatUnits(balanceOfAssetsResult[0]) : 0).toFixed(4)
        }
      })
    }).catch(error => {
      console.log('=error', error)
    })


  }
  function doQueryPnl(x, y) {
    const abi = [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "x",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "y",
            "type": "uint256"
          }
        ],
        "name": "zeroFloorSub",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "z",
            "type": "uint256"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      }
    ]
    const contract = new ethers.Contract(
      ethers.utils.getAddress("0xe1dA6F46d757699f6D783a2876E01937a1eCa9a9"),
      abi,
      provider.getSigner()
    );
    contract.zeroFloorSub(x, y)
      .then(result => {
        updateState({
          pnl: ethers.utils.formatUnits(result)
        })
      })
  }
  function handleQueryPnl() {
    const calls = []
    const abi = [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "getTotalAccountValue",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "totalValue",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "getDebtAmount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]
    calls.push({
      address: PROXY_ADDRESS,
      name: "getTotalAccountValue",
      params: [smartContractAddress]
    })
    calls.push({
      address: PROXY_ADDRESS,
      name: "getDebtAmount",
      params: [smartContractAddress]
    })
    multicall({
      abi,
      calls,
      options: {},
      multicallAddress,
      provider,
    }).then(result => {
      const [getTotalAccountValueResult, getDebtAmountResult] = result
      if (isNotEmptyArray(getTotalAccountValueResult) && isNotEmptyArray(getDebtAmountResult)) {
        doQueryPnl(getTotalAccountValueResult[0], getDebtAmountResult[0])
      }
    })
  }
  useEffect(() => {
    handleQueryDashboard()
    handleQueryPnl()
  }, [])

  useEffect(() => {
    console.log('====11111=====')
    updateState({
      filterVaults: vaults.filter(vault => Number(vault.positionValue) > 0)
    })
  }, [vaults])

  return (
    <StyledContainer>
      <StyledTitle>Dashboard</StyledTitle>
      <StyledDashboardContainer>
        <StyledColumn style={{
          width: "25%"
        }}>
          <StyledLabel>Deposited {FIRST_SYMBOL_NAME}</StyledLabel>
          <StyledValue>{state?.dashboard?.balanceOfAssets ?? '-'}</StyledValue>
        </StyledColumn>
        <StyledColumn style={{
          width: "25%"
        }}>
          <StyledLabel>Borrowed {SECOND_SYMBOL_NAME}</StyledLabel>
          <StyledValue>{state?.dashboard?.debtAmount ?? '-'}</StyledValue>
        </StyledColumn>
        {/* <StyledColumn style={{
          width: "20%"
        }}>
          <StyledLabel>{SECOND_SYMBOL_NAME} Borrow APY</StyledLabel>
          <StyledValue>23.65%</StyledValue>
        </StyledColumn> */}
        <StyledColumn style={{
          width: "25%"
        }}>
          <StyledLabel>Margin Health Factor</StyledLabel>
          <StyledValue
            style={{
              color: "#74F368"
            }}
          >{state?.dashboard?.accountHealth ?? '-'}</StyledValue>
        </StyledColumn>
        <StyledColumn style={{
          width: "25%"
        }}>
          <StyledLabel>PnL</StyledLabel>
          <StyledValue style={{
            color: "#FF547D"
          }}>{Big(state?.pnl ?? 0).toFixed(4)}</StyledValue>
        </StyledColumn>
      </StyledDashboardContainer>
      <StyledTitle
        style={{
          marginTop: 36
        }}
      >Active Vault Positions</StyledTitle>
      <StyledPostionsContainer>
        <StyledPostionsTop>
          <StyledPostionsTopColumn style={{
            width: "30%"
          }}>Name</StyledPostionsTopColumn>
          <StyledPostionsTopColumn style={{
            width: "25%"
          }}>Protocol</StyledPostionsTopColumn>
          <StyledPostionsTopColumn style={{
            width: "15%"
          }}>Borrowed Asset</StyledPostionsTopColumn>
          <StyledPostionsTopColumn style={{
            width: "15%"
          }}>Position Value</StyledPostionsTopColumn>
          <StyledPostionsTopColumn style={{
            width: "15%"
          }}></StyledPostionsTopColumn>
        </StyledPostionsTop>
        <StyledPostionsBottom>
          {
            state.filterVaults?.length > 0 ? state.filterVaults.map((vault, index) => (
              <StyledPosition key={index}>
                <StyledPositionColumn style={{
                  width: "30%"
                }}>
                  <StyledPositionColumnImageContainer
                    style={{ backgroundColor: vault.iconBgColor }}
                  >
                    <StyledPositionColumnImage src={vault.icon} />
                  </StyledPositionColumnImageContainer>
                  <StyledPositionColumnTxt>{vault.name}</StyledPositionColumnTxt>
                </StyledPositionColumn>
                <StyledPositionColumn style={{
                  width: "25%"
                }}>
                  <StyledPositionColumnTxt>{vault.protocol}</StyledPositionColumnTxt>
                </StyledPositionColumn>
                <StyledPositionColumn style={{
                  width: "15%"
                }}>
                  <StyledPositionColumnTxt>{FIRST_SYMBOL_NAME + '/' + SECOND_SYMBOL_NAME}</StyledPositionColumnTxt>
                </StyledPositionColumn>
                <StyledPositionColumn style={{
                  width: "15%"
                }}>
                  <StyledPositionColumnTxt>{"$" + Big(vault?.positionValue ?? 0).times(prices[SECOND_SYMBOL_NAME]).toFixed(2)}</StyledPositionColumnTxt>
                </StyledPositionColumn>
                <StyledPositionColumn style={{
                  width: "15%"
                }}>
                  <StyledPositionColumnButton onClick={() => {
                    onManage(vault)
                  }}>Manage</StyledPositionColumnButton>
                </StyledPositionColumn>
              </StyledPosition>
            )) : (
              <StyledNotHave>
                You didn’t add any vault yet
              </StyledNotHave>
            )
          }
        </StyledPostionsBottom>
      </StyledPostionsContainer>
    </StyledContainer>
  )
})
