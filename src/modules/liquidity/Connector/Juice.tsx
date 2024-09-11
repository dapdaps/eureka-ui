// @ts-nocheck
import { ethers } from 'ethers';
import { memo, useEffect, useMemo } from 'react';
import styled from 'styled-components';

import ChainWarningBox from '@/modules/components/ChainWarningBox';
import Spinner from '@/modules/components/Spinner';
import { useDynamicLoader, useMultiState } from '@/modules/hooks';

import Borrowers from '../Bridge/Juice/Borrowers';
import Dialog from '../Bridge/Juice/Dialog';
import Positions from '../Bridge/Juice/Positions';
import VaultDetail from '../Bridge/Juice/VaultDetail';
import Vaults from '../Bridge/Juice/Vaults';
const StyledJuiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledCategoryContainer = styled.div`
  margin-top: 18px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1000px;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background: linear-gradient(90deg, rgba(22, 24, 29, 0.00) 0%, #373A53 50%, rgba(22, 24, 29, 0.00) 100%);
  }
`
const StyledCategory = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 46px;
  cursor: pointer;

  color: #979ABE;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  &.active {
    color: #FFF;
    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 2px;
      background: #FFF;
    }
  }
`
const StyledSymbolButtonList = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 8px;
  border: 1px solid #373A53;
  background: rgba(33, 35, 48, 0.5);
`
const StyledSymbolButton = styled.div`
  padding: 8px 24px;
  border-radius: 6px;
  border: 1px solid transparent;
  background: transparent;
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  &.active {
    border-color: #373A53;
    background-color: #32364B;
    color: #FFF;
  }
`

export default memo(function JuiceConnector(props) {
  const [Data] = useDynamicLoader({ path: '/liquidity/Datas', name: "Juice" });
  const {
    toast,
    account,
    provider,
    prices,
    chainId,
    multicall,
    multicallAddress,
    windowOpen,
    addAction,
    dexConfig,
    connectProps,
    isChainSupported,
    curChain,
    onSwitchChain,
    switchingChain
  } = props

  const sender = useMemo(() => account && ethers.utils.getAddress(account), [account]);
  const {
    ICON_MAP,
    SYMBOL_LIST,
    POOLS_MAPPING,
    SYMBOL_NAME_MAPPING,
  } = dexConfig
  const [state, updateState] = useMultiState<any>({
    categoryList: [
      "Vaults",
      "Borrowers",
      "Positions"
    ],
    categoryIndex: 0,
    symbolIndex: 0,
    checkedVault: null,
    smartContractAddress: "",
    isCreatedAccount: false,
    showDialog: false,
    createSubAccountLoading: false
  })
  const {
    checkedVault,
    categoryList,
    categoryIndex,
    symbolIndex,
    isCreatedAccount,
    smartContractAddress,
    createSubAccountLoading
  } = state

  const {
    vaults,
    PROXY_ADDRESS,
    LENDING_POOL_ADDRESS,
    SYMBOL_ADDRESS
  } = POOLS_MAPPING[symbolIndex]

  function handleGetSubAccount() {
    const abi = [{
      "inputs": [
        {
          "internalType": "address",
          "name": "owner_",
          "type": "address"
        }
      ],
      "name": "getAccount",
      "outputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },]
    const contract = new ethers.Contract(
      ethers.utils.getAddress(PROXY_ADDRESS),
      abi,
      provider
    );
    contract.getAccount(sender)
      .then((result) => {
        updateState({
          smartContractAddress: result
        })
        handleQueryIsCreatedAccount(result)
      })
      .catch(error => {
        console.log('=error', error)
      });
  }
  function handleQueryIsCreatedAccount(smartAddress) {
    const abi = [{
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isCreatedAccount",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }]
    const contract = new ethers.Contract(
      ethers.utils.getAddress(PROXY_ADDRESS),
      abi,
      provider
    );

    contract.isCreatedAccount(smartAddress).then((result) => {
      updateState({
        isCreatedAccount: result
      })
    });
  }
  function handleRefresh() {
    handleGetSubAccount()
  }
  function handleCreateSubAccount() {
    updateState({
      createSubAccountLoading: true
    })
    const abi = [{
      "inputs": [],
      "name": "createAccount",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "account",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }]
    const contract = new ethers.Contract(
      ethers.utils.getAddress(PROXY_ADDRESS),
      abi,
      provider.getSigner()
    );
    contract
      .createAccount()
      .then(tx => tx.wait())
      .then(() => {
        updateState({
          createSubAccountLoading: false
        })
        handleRefresh()
      })
      .catch(error => {
        updateState({
          createSubAccountLoading: false
        })
      });
  }
  function handleOpenWrap() {
    updateState({
      showDialog: true
    })
  }
  function handleCloseWrap() {
    updateState({
      showDialog: false
    })
  }
  function handleManage(vault) {
    updateState({
      categoryIndex: 0,
      checkedVault: vault,
    })
  }
  useEffect(() => {
    sender && handleGetSubAccount()
  }, [sender, symbolIndex])


  return (!account || !isChainSupported) ? (
    <ChainWarningBox
      chain={curChain}
      onSwitchChain={onSwitchChain}
      theme={dexConfig.theme?.button}
    />
  ) : (
    <StyledJuiceContainer>
      <StyledSymbolButtonList>
        {
          SYMBOL_LIST.map((symbol, index) => (
            <StyledSymbolButton
              key={index}
              className={index === symbolIndex ? "active" : ""}
              onClick={() => {
                updateState({
                  symbolIndex: index,
                  checkedVault: null
                })
              }}
            >{symbol}</StyledSymbolButton>
          ))
        }
      </StyledSymbolButtonList>
      <StyledCategoryContainer>
        {
          categoryList.map((category, index) => (
            <StyledCategory
              key={index}
              className={categoryIndex === index ? "active" : ""}
              onClick={() => {
                updateState({
                  categoryIndex: index
                })
              }}
            >{category}</StyledCategory>
          ))
        }

      </StyledCategoryContainer>
      {
        smartContractAddress ? (
          <>
            {
              vaults && (
                <Data
                  {...{
                    provider,
                    dataList: vaults,
                    multicall,
                    multicallAddress,
                    smartContractAddress,
                    onLoad: ({
                      dataList,
                    }) => {
                      updateState({
                        vaults: dataList,
                        loading: false
                      })
                    }
                  }}
                />
              )
            }
            {
              categoryIndex === 0 && checkedVault && (

                <VaultDetail
                  key={'VaultDetail' + symbolIndex}
                  {...{
                    toast,
                    sender,
                    provider,
                    chainId,
                    addAction,
                    windowOpen,
                    isCreatedAccount,
                    multicall,
                    multicallAddress,
                    checkedVault,
                    ICON_MAP,
                    PROXY_ADDRESS,
                    SYMBOL_ADDRESS,
                    SYMBOL_NAME_MAPPING,
                    smartContractAddress,
                    onChangeCategoryIndex: (categoryIndex) => {
                      updateState({
                        categoryIndex
                      })
                    },
                    onBack: () => {
                      updateState({
                        checkedVault: null
                      })
                    }
                  }}
                />
              )
            }
            {
              categoryIndex === 0 && !checkedVault && (
                <Vaults
                  key={'Vaults' + symbolIndex}
                  {...{
                    vaults,
                    prices,
                    onCheckedVaultChange: (vault) => {
                      updateState({
                        checkedVault: vault
                      })
                    }
                  }}
                />
              )
            }
            {
              categoryIndex === 1 && (
                <Borrowers
                  key={'Borrowers' + symbolIndex}
                  {...{
                    toast,
                    prices,
                    sender,
                    provider,
                    ICON_MAP,
                    addAction,
                    isCreatedAccount,
                    multicall,
                    symbolIndex,
                    multicallAddress,
                    PROXY_ADDRESS,
                    smartContractAddress,
                    SYMBOL_ADDRESS,
                    SYMBOL_NAME_MAPPING,
                    LENDING_POOL_ADDRESS,
                    createSubAccountLoading,
                    onCreateSubAccount: handleCreateSubAccount,
                    onOpenWrap: handleOpenWrap
                  }}
                />
              )
            }
            {
              categoryIndex === 2 && (
                <Positions
                  key={'Positions' + symbolIndex}
                  {...{
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
                    onManage: handleManage
                  }}
                />
              )
            }
          </>
        ) : (
          <Spinner />
        )
      }
      {
        state.showDialog && (
          <Dialog
            {...{
              toast,
              sender,
              provider,
              chainId,
              addAction,
              SYMBOL_ADDRESS,
              onCloseWrap: handleCloseWrap
            }}
          />
        )
      }
    </StyledJuiceContainer>
  )
})