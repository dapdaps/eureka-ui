// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo, useEffect } from 'react';
import styled from 'styled-components';

import { useMultiState } from '@/modules/hooks';

import Loading from '../../Bridge/Loading';
const StyledContainer = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const StyledContainerTop = styled.div`
  width: 100%;
`;
const StyledBack = styled.div`
  margin: 20px 0 24px;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
`;
const StyledBackTxt = styled.div`
  color: #979abe;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const StyledVault = styled.div`
  border-radius: 16px;
  border: 1px solid #373a53;
  background: #262836;
  overflow: hidden;
`;
const StyledVaultTop = styled.div`
  display: flex;
  height: 100px;
  padding: 18px 16px 18px 30px;
  background: #32364b;
  border-bottom: 1px solid #373a53;
`;
const StyledVaultImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 12px;
  border: 2px solid #262836;
  background: #fff;
`;
const StyledVaultImage = styled.img`
  height: 44px;
`;
const StyledVaultInfo = styled.div`
  flex: 1;
  margin: 0 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const StyledVaultName = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const StyledVaultDesc = styled.div`
  color: #979abe;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledVaultViewButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 130px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #5e617e;
  cursor: pointer;

  color: #979abe;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledVaultBottom = styled.div`
  padding: 18px 33px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const StyledVaultBottomRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const StyledVaulBottomMessage = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;
const StyledVaulBottomMessageLabel = styled.div`
  color: #979abe;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledVaulBottomMessageValue = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const StyledContainerBottom = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;
const StyledDepositOrWithdraw = styled.div`
  width: 490px;
  height: 387px;
  border-radius: 16px;
  border: 1px solid #373a53;
  background: #262836;
`;
const StyledDepositOrWithdrawTop = styled.div`
  border-bottom: 1px solid #373a53;
  display: flex;
  align-items: center;
`;
const StyledDepositOrWithdrawTopButton = styled.div`
  position: relative;
  flex: 1;
  padding: 22px 0;
  text-align: center;
  color: #979abe;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
  &.active {
    color: #fff;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 4px;
      background: #b968f3;
    }
  }
`;
const StyledDepositOrWithdrawBottom = styled.div``;
const StyledEmptyContainer = styled.div`
  padding: 44px 16px 31px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 21px;
`;
const StyledEmptyImage = styled.img`
  width: 120px;
`;
const StyledEmptyTips = styled.div`
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
`;
const StyledDepositContainer = styled.div`
  padding: 20px;
`;

const StyledWithdrawContainer = styled.div`
  padding: 20px;
`;

const StyledDepositOrWithdrawInput = styled.div`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: #1b1e27;
  height: 71px;
`;
const StyledDepositOrWithdrawInputTop = styled.div`
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledDepositOrWithdrawInputBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
`;
const StyledDepositOrWithdrawInputTopType = styled.div`
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledDepositOrWithdrawInputTopBalance = styled.div`
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  span {
    color: #fff;
    cursor: pointer;
    text-decoration-line: underline;
  }
`;
const StyledDepositOrWithdrawInputBottomInput = styled.input`
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  color: #fff;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;
const StyledDepositOrWithdrawInputBottomSymbol = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const StyledDepositOrWithdrawInputBottomSymbolImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
`;
const StyledDepositOrWithdrawInputBottomSymbolImage = styled.img`
  width: 100%;
  height: 100%;
`;
const StyledDepositOrWithdrawInputBottomSymbolTxt = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
// const StyledDepositOrWithdrawOutput = styled.div`
//   padding: 12px 16px;
//   border-radius: 8px;
//   border: 1px solid #373A53;
//   background: #2E3142;
//   height: 71px;
// `
const StyledDepositOrWithdrawInputBottomInputTxt = styled.div`
  color: #5e617e;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const StyledDepositOrWithdrawButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  flex-shrink: 0;
  border-radius: 8px;
  cursor: pointer;
  background: var(--button-color);

  color: var(--button-text-color);
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  &[disabled] {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;
const StyledSlippage = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 14px 0 54px;
`;
const StyledSlippageL = styled.div`
  position: relative;
`;
const StyledSlippageLBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;
const StyledSlippageTxt = styled.div`
  color: #979abe;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledSlippageR = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledOverviewContainer = styled.div`
  width: 490px;
  height: 387px;
  border-radius: 16px;
  border: 1px solid #373a53;
  background: #262836;
`;
const StyledPostionOverview = styled.div`
  padding: 21px 20px 14px;
  border-bottom: 1px solid #373a53;
`;
const StyledOverviewTitle = styled.div`
  margin-bottom: 16px;
  color: #fff;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const StyledOverviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const StyledOverview = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledOverviewLabel = styled.div`
  color: #979abe;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledOverviewValue = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledVaultOverview = styled.div`
  padding: 16px 20px 0 20px;
`;
const StyledOverviewButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
`;
const StyledOverviewButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  width: 218px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #b968f3;
  cursor: pointer;

  color: #fff;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const StyledEarnImageContainer = styled.div`
  position: relative;
  width: 20px;
  &:nth-of-type(n + 2) {
    margin-left: -4px;
  }
`;
const StyledEarnCoverImage = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
`;
const StyledEarnImage = styled.img`
  /* width: 20px; */
  width: 100%;
`;
const StyledMaxSlippageCover = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
`;
const StyledMaxSlippageContainer = styled.div`
  position: absolute;
  top: -6px;
  right: -10px;
  transform: translateX(100%);
  width: 173px;
  height: 91px;
  flex-shrink: 0;
  padding: 13px 16px;
  border-radius: 8px;
  border: 1px solid #454968;
  background: #313447;
  z-index: 9999;
`;
const StyledMaxSlippageTop = styled.div`
  margin-bottom: 18px;
  color: #979abe;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledMaxSlippageBottom = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const StyledMaxSlippageAutoButton = styled.div`
  width: 42px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid #454968;
  background: #313447;
  cursor: pointer;
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledMaxSlippageInputContainer = styled.div`
  width: 85px;
  height: 30px;
  flex-shrink: 0;
  padding: 7px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  border: 1px solid #373a53;
  background: #1b1e27;
  &.error {
    background: rgb(153, 27, 27);
    border-color: rgb(220, 38, 38);
  }
`;
const StyledMaxSlippagePercentage = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledMaxSlippageInput = styled.input`
  /* width: ; */
  /* flex: 1; */
  width: 100%;
  max-width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  outline: none;
  background: transparent;

  color: #fff;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;
export default memo(function VaultDetail() {
  const [state, updateState] = useMultiState<any>({
    positionOverview: null,
    vaultOverview: null,
    isDeposit: true,
    inSlippageAmount: '0.05',
    slippageError: false,
    showSlippage: false,
    depositBalance: '',
    withdrawBalance: '',
    depositData: '',
    inDepositAmount: '',
    outDepositAmount: '',
    depositLoading: false,
    inWithdrawAmount: '',
    outWithdrawAmount: '',
    withdrawLoading: false
  });
  const {
    toast,
    sender,
    provider,
    chainId,
    windowOpen,
    addAction,
    isCreatedAccount,
    ICON_MAP,
    PROXY_ADDRESS,
    SYMBOL_ADDRESS,
    multicall,
    multicallAddress,
    smartContractAddress,
    onBack,
    onChangeCategoryIndex,
    checkedVault
  } = props;

  const SECOND_SYMBOL_ADDRESS = typeof SYMBOL_ADDRESS === 'string' ? SYMBOL_ADDRESS : SYMBOL_ADDRESS[1];

  const TOKEN1_MAPPING = {
    '0x78E6265a11a41E5Dcd1431448d00f3524943fD11': 'BlastWETHV3LP',
    '0x3FeC7f626923445F587C4881a80D00a7104782d1': 'BlastSpot'
  };
  const isDepositInSufficient = Number(state?.inDepositAmount ?? 0) > Number(state?.depositBalance ?? 0);
  const isWithdrawInSufficient = Number(state?.inWithdrawAmount ?? 0) > Number(state?.withdrawBalance ?? 0);

  const DepositTxt = checkedVault.type === 'Spot' ? 'Buy' : 'Deposit';
  const WithdrawTxt = checkedVault.type === 'Spot' ? 'Sell' : 'Withdraw';
  function isNotEmptyArray(value) {
    return value && value[0];
  }
  function handleQueryPositionOverview() {
    const calls = [];
    const abi = [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address'
          }
        ],
        name: 'getPositionValue',
        outputs: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      }
    ];
    calls.push({
      address: checkedVault.strategyAddress,
      name: 'getPositionValue',
      params: [smartContractAddress]
    });
    multicall({
      abi,
      calls,
      options: {},
      multicallAddress,
      provider
    }).then((result) => {
      const [positionValueResult, balanceOfResult] = result;
      updateState({
        positionOverview: {
          positionValue: Big(positionValueResult ? ethers.utils.formatUnits(positionValueResult[0]) : 0).toFixed(6)
        }
      });
    });
  }
  function handleQueryVaultOverview() {
    const calls = [];
    const abi = [
      {
        inputs: [],
        name: 'getTotalDepositCap',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [],
        name: 'getTotalBaseDeposit',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [],
        name: 'getMaxDepositPerAccount',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      }
    ];

    calls.push({
      address: checkedVault.strategyAddress,
      name: 'getTotalDepositCap'
    });
    calls.push({
      address: checkedVault.strategyAddress,
      name: 'getTotalBaseDeposit'
    });
    calls.push({
      address: checkedVault.strategyAddress,
      name: 'getMaxDepositPerAccount'
    });

    multicall({
      abi,
      calls,
      options: {},
      multicallAddress,
      provider
    })
      .then((result) => {
        const [getTotalDepositCapResult, getTotalBaseDepositResult, maxDepositPerAccountResult] = result;
        updateState({
          vaultOverview: {
            availableVaultSpace: Big(Big(getTotalDepositCapResult[0]).minus(getTotalBaseDepositResult[0]))
              .div(Big(10).pow(18))
              .toFixed(2),
            totalDepositCap: Big(getTotalDepositCapResult[0]).div(Big(10).pow(18)).toFixed(2),
            maxDepositPerAccount: Big(maxDepositPerAccountResult[0]).div(Big(10).pow(18)).toFixed(2)
          }
        });
      })
      .catch(() => {
        updateState({
          vaultOverview: {}
        });
      });
  }
  function handleGetDepositData(receivedShares, anotherValue) {
    const slippageRate = 0.01;
    const receivedSharesAfterSlippage = ethers.BigNumber.from(
      Big(receivedShares).minus(Big(receivedShares).times(slippageRate)).toFixed(0)
    );
    const anotherValueAfterSlippage = ethers.BigNumber.from(
      Big(anotherValue).minus(Big(anotherValue).times(slippageRate)).toFixed(0)
    );
    const encodedFirstNumber = ethers.utils.defaultAbiCoder.encode(['uint256'], [receivedSharesAfterSlippage]);
    const encodedSecondNumber = ethers.utils.defaultAbiCoder.encode(['uint256'], [anotherValueAfterSlippage]);
    const encodedSecondNumberWithoutPrefix = encodedSecondNumber.slice(2);
    const finalEncodedData = '0x' + encodedFirstNumber.slice(2) + encodedSecondNumberWithoutPrefix;
    return finalEncodedData;
  }
  function handleInAmountChange(amount) {
    if (Number(amount) < 0) {
      return;
    }
    if (Number(amount) === 0) {
      updateState({
        [state.isDeposit ? 'inDepositAmount' : 'inWithdrawAmount']: amount,
        [state.isDeposit ? 'outDepositAmount' : 'outWithdrawAmount']: ''
      });
      return;
    }
    updateState({
      [state.isDeposit ? 'inDepositAmount' : 'inWithdrawAmount']: amount
    });
    const abi = [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          }
        ],
        name: 'previewDeposit',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'strategy',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes'
          }
        ],
        name: 'strategyDeposit',
        outputs: [
          {
            internalType: 'uint256',
            name: 'receivedShares',
            type: 'uint256'
          }
        ],
        stateMutability: 'payable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'strategy',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'shares',
            type: 'uint256'
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes'
          }
        ],
        name: 'strategyWithdraw',
        outputs: [
          {
            internalType: 'uint256',
            name: 'receivedAssets',
            type: 'uint256'
          }
        ],
        stateMutability: 'payable',
        type: 'function'
      }
    ];
    const _amount = Big(amount).mul(Big(10).pow(18)).toFixed(0);

    if (state.isDeposit) {
      const depositHelperAddressMap = {
        'Blast WETH V3 LP': '0x8c123a1299843c64bc46681ac4f63ead076294b1',
        'EtherFi V3 LP': '0x0C7e2906f5cf0e6F6de47E9Fc8ECEd3E82ED405C',
        'Kelp V3 LP V2': '0x7988EA56563a01907ff02f49a7739aB949905104',
        'Renzo V3 LP': '0xfA4042e6777c6C66d71E9b288e756F8fde802130',
        'USDB/WETH 0.05% LP': '0x86a29d4dbd9005bedf2e26ed33f74504e237d436',
        'Ethena USDE V3 LP': '0x5eed3fea11ef1ea98970eb0129c5a424c7f215f3'
      };
      if (depositHelperAddressMap[checkedVault.name]) {
        const contract = new ethers.Contract(
          ethers.utils.getAddress(depositHelperAddressMap[checkedVault.name]),
          abi,
          provider
        );
        contract.callStatic.previewDeposit(_amount).then((result) => {
          updateState({
            depositData: handleGetDepositData(result[0], result[1]),
            outDepositAmount: ethers.utils.formatUnits(result[1])
          });
        });
      } else {
        const depositData = '0x0000000000000000000000000000000000000000000000000000000000000000';
        const contract = new ethers.Contract(ethers.utils.getAddress(smartContractAddress), abi, provider.getSigner());
        contract.callStatic.strategyDeposit(checkedVault.strategyAddress, _amount, depositData).then((result) => {
          updateState({
            depositData,
            outDepositAmount: ethers.utils.formatUnits(result)
          });
        });
      }
    } else {
      getShares(_amount).then((sharesResult) => {
        const shares = sharesResult[1];
        const contract = new ethers.Contract(ethers.utils.getAddress(smartContractAddress), abi, provider.getSigner());
        contract.callStatic
          .strategyWithdraw(
            checkedVault.strategyAddress,
            shares,
            '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
          )
          .then((result) => {
            updateState({
              outWithdrawAmount: ethers.utils.formatUnits(result)
            });
          });
      });
    }
  }
  function handleQueryDepositBalance(callback) {
    const abi = [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address'
          }
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      }
    ];
    const contract = new ethers.Contract(ethers.utils.getAddress(SECOND_SYMBOL_ADDRESS), abi, provider);
    console.log('=SECOND_SYMBOL_ADDRESS', SECOND_SYMBOL_ADDRESS);
    console.log('=smartContractAddress', smartContractAddress);
    contract.balanceOf(smartContractAddress).then((result) => {
      console.log('=result', result);
      const balance = Big(result ? ethers.utils.formatUnits(result) : 0).toFixed();
      updateState({
        depositBalance: balance
      });
      callback && callback(balance);
    });
  }
  function handleQueryWithdrawBalance(callback) {
    const abi = [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address'
          }
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: 'result',
            type: 'uint256'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      }
    ];
    const contract = new ethers.Contract(ethers.utils.getAddress(checkedVault.strategyAddress), abi, provider);
    contract.balanceOf(smartContractAddress).then((result) => {
      const balance = Big(result ? ethers.utils.formatUnits(result) : 0).toFixed();
      updateState({
        withdrawBalance: balance
      });
      callback && callback(balance);
    });
  }
  function getShares(_amount) {
    return new Promise((resolve, reject) => {
      const abi = [
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'assets',
              type: 'uint256'
            }
          ],
          name: 'previewDeposit',
          outputs: [
            {
              internalType: 'uint256',
              name: 'updatedAssets',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'shares',
              type: 'uint256'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        }
      ];
      const contract = new ethers.Contract(ethers.utils.getAddress(PROXY_ADDRESS), abi, provider.getSigner());
      contract.previewDeposit(_amount).then(resolve).catch(reject);
    });
  }
  function handleDeposit() {
    updateState({
      depositLoading: true
    });
    const toastId = toast?.loading({
      title: `Deposit ${state.inDepositAmount} ${checkedVault.token0}`
    });
    const abi = [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'strategy',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes'
          }
        ],
        name: 'strategyDeposit',
        outputs: [
          {
            internalType: 'uint256',
            name: 'receivedShares',
            type: 'uint256'
          }
        ],
        stateMutability: 'payable',
        type: 'function'
      }
    ];
    const contract = new ethers.Contract(ethers.utils.getAddress(smartContractAddress), abi, provider.getSigner());

    const _amount = Big(state?.inDepositAmount).mul(Big(10).pow(18)).toFixed(0);
    contract
      .strategyDeposit(checkedVault.strategyAddress, _amount, state.depositData)
      .then((tx) => tx.wait())
      .then((result) => {
        const { status, transactionHash } = result;
        toast?.dismiss(toastId);
        if (status !== 1) throw new Error('');
        updateState({
          depositLoading: false
        });
        toast?.success({
          title: 'Deposit Successfully!',
          text: `Deposit ${state.inDepositAmount} ${checkedVault.token0}`,
          tx: transactionHash,
          chainId
        });

        if (status === 1) {
          addAction?.({
            type: 'Yield',
            action: 'Deposit',
            token0: checkedVault.token0,
            token1: TOKEN1_MAPPING[checkedVault.strategyAddress] || checkedVault.token1,
            amount: state?.inDepositAmount,
            template: 'Juice',
            add: true,
            status,
            transactionHash
          });
          handleRefresh();
        }
      })
      .catch((error) => {
        console.log('=error', error);
        updateState({
          depositLoading: false
        });
        toast?.fail({
          title: 'Deposit Failed!',
          text: error?.message?.includes('user rejected transaction')
            ? 'User rejected transaction'
            : `Deposit ${state.inDepositAmount} ${checkedVault.token0}`
        });
      });
  }
  function handleWithdraw() {
    updateState({
      withdrawLoading: true
    });
    const toastId = toast?.loading({
      title: `Withdraw ${state.inWithdrawAmount} ${checkedVault.token0}`
    });
    const abi = [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'strategy',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'shares',
            type: 'uint256'
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes'
          }
        ],
        name: 'strategyWithdraw',
        outputs: [
          {
            internalType: 'uint256',
            name: 'receivedAssets',
            type: 'uint256'
          }
        ],
        stateMutability: 'payable',
        type: 'function'
      }
    ];
    const contract = new ethers.Contract(ethers.utils.getAddress(smartContractAddress), abi, provider.getSigner());
    const _amount = Big(state?.inWithdrawAmount).mul(Big(10).pow(18)).toFixed(0);
    getShares(_amount).then((sharesResult) => {
      const shares = sharesResult[1];
      contract
        .strategyWithdraw(
          checkedVault.strategyAddress,
          shares,
          '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
        )
        .then((tx) => tx.wait())
        .then((result) => {
          const { status, transactionHash } = result;
          toast?.dismiss(toastId);
          if (status !== 1) throw new Error('');
          updateState({
            withdrawLoading: false
          });
          toast?.success({
            title: 'Withdraw Successfully!',
            text: `Withdraw ${state.inWithdrawAmount} ${checkedVault.token0}`,
            tx: transactionHash,
            chainId
          });
          if (status === 1) {
            addAction?.({
              type: 'Yield',
              action: 'Withdraw',
              token0: TOKEN1_MAPPING[checkedVault.strategyAddress] || checkedVault.token1,
              token1: checkedVault.token0,
              amount: state?.inWithdrawAmount,
              template: 'Juice',
              add: false,
              status,
              transactionHash,
              extra_data: JSON.stringify({
                action: 'Withdraw',
                amount1: state?.outWithdrawAmount
              })
            });
            handleRefresh();
          }
        })
        .catch((error) => {
          updateState({
            withdrawLoading: false
          });
          toast?.fail({
            title: 'Withdraw Failed!',
            text: error?.message?.includes('user rejected transaction')
              ? 'User rejected transaction'
              : `Withdraw ${state.inWithdrawAmount} ${checkedVault.token0}`
          });
        });
    });
  }
  function handleExplore() {
    windowOpen('https://blastexplorer.io/address/' + checkedVault.vaultAddress, '_blank');
  }
  function handleChart() {
    windowOpen('https://dexscreener.com/blast/' + checkedVault.vaultAddress, '_blank');
  }

  function handleSlippageChange(amount) {
    updateState({
      slippageError: Number(amount) > 50 || Number(amount) < 0,
      inSlippageAmount: amount
    });
  }
  function handleGetSlippageOutAmount(amount, slippageAmount) {
    const slippageOutAmount =
      amount === ''
        ? 0
        : state.slippageError
          ? Big(amount).toFixed(6)
          : Big(amount)
              .times(1 - slippageAmount / 100)
              .toFixed(6);
    return Number(slippageOutAmount) > 0 ? slippageOutAmount : '0.000000';
  }
  function handleMax() {
    const handleQueryBalance = state.isDeposit ? handleQueryDepositBalance : handleQueryWithdrawBalance;
    handleQueryBalance((balance) => {
      handleInAmountChange(Big(balance).eq(Big(10).pow(-18)) ? 0 : balance);
    });
  }
  function handleAuto() {
    handleSlippageChange(0.5);
  }
  function handleRefresh() {
    handleQueryPositionOverview();
    handleQueryVaultOverview();
    handleQueryDepositBalance();
    handleQueryWithdrawBalance();
  }
  useEffect(() => {
    if (state.isDeposit) {
      handleQueryDepositBalance();
    } else {
      handleQueryWithdrawBalance();
    }
  }, [state.isDeposit]);

  useEffect(() => {
    if (checkedVault) {
      handleRefresh();
    }
  }, [checkedVault]);
  return (
    <StyledContainer>
      <StyledContainerTop>
        <StyledBack onClick={onBack}>
          <svg xmlns="http://www.w3.org/2000/svg" width="9" height="13" viewBox="0 0 9 13" fill="none">
            <path d="M7.5 1L2 6.49992L7.5 12" stroke="#979ABE" strokeWidth="2" stroke-linecap="round" />
          </svg>
          <StyledBackTxt>Back to vaults</StyledBackTxt>
        </StyledBack>
        <StyledVault>
          <StyledVaultTop>
            <StyledVaultImageContainer
              style={{
                background: checkedVault.iconBgColor,
                borderColor: checkedVault.borderColor || '#262836'
              }}
            >
              <StyledVaultImage src={checkedVault.icon} />
            </StyledVaultImageContainer>
            <StyledVaultInfo>
              <StyledVaultName>{checkedVault.name}</StyledVaultName>
              <StyledVaultDesc>
                {checkedVault.name === 'Blast Spot'
                  ? 'BLAST spot long positions.'
                  : `This vault manages a single ERC721 LP position in the ${checkedVault.token0}/${checkedVault.token1} V3 pool (0.05%). The LP position is staked in Hyperlock to earn Hyperlock Points and Thruster Points.`}
              </StyledVaultDesc>
            </StyledVaultInfo>
            <StyledVaultViewButton
              onClick={() => {
                windowOpen('https://blastexplorer.io/address/' + checkedVault.strategyAddress, '_blank');
              }}
            >
              View Blastscan
            </StyledVaultViewButton>
          </StyledVaultTop>
          <StyledVaultBottom>
            <StyledVaultBottomRow>
              <StyledVaulBottomMessage>
                <StyledVaulBottomMessageLabel>Protocol</StyledVaulBottomMessageLabel>
                <StyledVaulBottomMessageValue>{checkedVault.protocol}</StyledVaulBottomMessageValue>
              </StyledVaulBottomMessage>
              <StyledVaulBottomMessage>
                <StyledVaulBottomMessageLabel>Type</StyledVaulBottomMessageLabel>
                <StyledVaulBottomMessageValue>{checkedVault.type}</StyledVaulBottomMessageValue>
              </StyledVaulBottomMessage>
              <StyledVaulBottomMessage>
                <StyledVaulBottomMessageLabel>Total Deposited</StyledVaulBottomMessageLabel>
                <StyledVaulBottomMessageValue>
                  {Big(checkedVault.pointList[0]?.value ?? 0)
                    .toNumber()
                    .toLocaleString('en-us', {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2
                    })}{' '}
                  {checkedVault.token0}
                </StyledVaulBottomMessageValue>
              </StyledVaulBottomMessage>
              <StyledVaulBottomMessage>
                <StyledVaulBottomMessageLabel>Accepted Asset</StyledVaulBottomMessageLabel>
                <StyledVaulBottomMessageValue>{checkedVault.token0}</StyledVaulBottomMessageValue>
              </StyledVaulBottomMessage>
            </StyledVaultBottomRow>
            <StyledVaultBottomRow>
              <StyledVaulBottomMessage>
                <StyledVaulBottomMessageLabel>Earns</StyledVaulBottomMessageLabel>
                <StyledVaulBottomMessageValue>
                  <StyledEarnImageContainer>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <circle cx="11" cy="11" r="10.5" fill="#2A135D" stroke="black" />
                    </svg>
                    <StyledEarnCoverImage src={checkedVault.icon} />
                  </StyledEarnImageContainer>
                  {checkedVault.pointList.findIndex((vault) => vault.label === 'Ethena Sats') > -1 && (
                    <StyledEarnImageContainer>
                      <StyledEarnImage src="/images/juice/ethena.svg" />
                    </StyledEarnImageContainer>
                  )}
                  {checkedVault.pointList.findIndex((vault) => vault.label === 'Eigen Layer Points') > -1 && (
                    <StyledEarnImageContainer>
                      <StyledEarnImage src="https://ipfs.near.social/ipfs/bafkreif5l4sfmwpqzpe7gr4res6lv3orsm7wxtovfr3n36wznbybeiy2ku" />
                    </StyledEarnImageContainer>
                  )}
                  {checkedVault.pointList.findIndex((vault) => vault.label === 'Thruster Points') > -1 && (
                    <StyledEarnImageContainer>
                      <StyledEarnImage src="https://ipfs.near.social/ipfs/bafkreiczl353jhnbfkdc2atubwbmscagx4tar4mxmua3ehtknvx2xbjdoq" />
                    </StyledEarnImageContainer>
                  )}
                  {checkedVault.pointList.findIndex((vault) => vault.label === 'Hyperlock Points') > -1 && (
                    <StyledEarnImageContainer>
                      <StyledEarnImage src="https://ipfs.near.social/ipfs/bafkreif3crbizpmljlpvfwfkhx5la54asfj5uizmyzjcnlhppvngcebl7e" />
                    </StyledEarnImageContainer>
                  )}
                  <StyledEarnImageContainer>
                    <StyledEarnImage src="https://ipfs.near.social/ipfs/bafkreibmykmcqzkp4fsqvqhiy7wbcz4wht2qezgv4bzpduaeiup6xnsvii" />
                  </StyledEarnImageContainer>
                  <StyledEarnImageContainer>
                    <StyledEarnImage src="https://ipfs.near.social/ipfs/bafkreia2ihu3szpxrtc4ewtkqxef4dvnvvnouymplexi3dbjw425dvfoey" />
                  </StyledEarnImageContainer>
                  <StyledEarnImageContainer>
                    <StyledEarnImage src="https://ipfs.near.social/ipfs/bafkreibeotwrmejkr4r2hdjjfhia6nv2ok6wsgvu2z7tvqjcxia3fquvyu" />
                  </StyledEarnImageContainer>
                </StyledVaulBottomMessageValue>
              </StyledVaulBottomMessage>
            </StyledVaultBottomRow>
          </StyledVaultBottom>
        </StyledVault>
      </StyledContainerTop>
      <StyledContainerBottom>
        <StyledDepositOrWithdraw>
          <StyledDepositOrWithdrawTop>
            <StyledDepositOrWithdrawTopButton
              className={state.isDeposit ? 'active' : ''}
              onClick={() => {
                updateState({
                  isDeposit: true
                });
              }}
            >
              {DepositTxt}
            </StyledDepositOrWithdrawTopButton>
            <StyledDepositOrWithdrawTopButton
              className={!state.isDeposit ? 'active' : ''}
              onClick={() => {
                updateState({
                  isDeposit: false
                });
              }}
            >
              {WithdrawTxt}
            </StyledDepositOrWithdrawTopButton>
          </StyledDepositOrWithdrawTop>
          <StyledDepositOrWithdrawBottom>
            {!state.isDeposit ? (
              <StyledWithdrawContainer>
                <StyledDepositOrWithdrawInput>
                  <StyledDepositOrWithdrawInputTop>
                    <StyledDepositOrWithdrawInputTopType>{WithdrawTxt}</StyledDepositOrWithdrawInputTopType>
                    <StyledDepositOrWithdrawInputTopBalance>
                      Available: <span onClick={handleMax}>{Big(state?.withdrawBalance ?? 0).toFixed(6)}</span>
                    </StyledDepositOrWithdrawInputTopBalance>
                  </StyledDepositOrWithdrawInputTop>
                  <StyledDepositOrWithdrawInputBottom>
                    <StyledDepositOrWithdrawInputBottomInput
                      type="number"
                      placeholder="0.0"
                      value={state.inWithdrawAmount}
                      onChange={(event) => handleInAmountChange(event.target.value)}
                    />
                    <StyledDepositOrWithdrawInputBottomSymbol>
                      <StyledDepositOrWithdrawInputBottomSymbolImageContainer>
                        <StyledDepositOrWithdrawInputBottomSymbolImage src={ICON_MAP[checkedVault.token1]} />
                      </StyledDepositOrWithdrawInputBottomSymbolImageContainer>
                      <StyledDepositOrWithdrawInputBottomSymbolTxt>
                        {checkedVault.token1}
                      </StyledDepositOrWithdrawInputBottomSymbolTxt>
                    </StyledDepositOrWithdrawInputBottomSymbol>
                  </StyledDepositOrWithdrawInputBottom>
                </StyledDepositOrWithdrawInput>
                <StyledDepositOrWithdrawInput
                  style={{
                    marginTop: 12,
                    background: '#2E3142'
                  }}
                >
                  <StyledDepositOrWithdrawInputTop>
                    <StyledDepositOrWithdrawInputTopType>Expected</StyledDepositOrWithdrawInputTopType>
                  </StyledDepositOrWithdrawInputTop>
                  <StyledDepositOrWithdrawInputBottom>
                    <StyledDepositOrWithdrawInputBottomInputTxt>
                      {handleGetSlippageOutAmount(state?.outWithdrawAmount, state.inSlippageAmount)}
                    </StyledDepositOrWithdrawInputBottomInputTxt>
                    <StyledDepositOrWithdrawInputBottomSymbol>
                      <StyledDepositOrWithdrawInputBottomSymbolImageContainer>
                        <StyledDepositOrWithdrawInputBottomSymbolImage src={ICON_MAP[checkedVault.token0]} />
                      </StyledDepositOrWithdrawInputBottomSymbolImageContainer>
                      <StyledDepositOrWithdrawInputBottomSymbolTxt>
                        {checkedVault.token0}
                      </StyledDepositOrWithdrawInputBottomSymbolTxt>
                    </StyledDepositOrWithdrawInputBottomSymbol>
                  </StyledDepositOrWithdrawInputBottom>
                </StyledDepositOrWithdrawInput>
                <StyledSlippage>
                  <StyledSlippageL>
                    <StyledSlippageLBox
                      onClick={() => {
                        updateState({
                          showSlippage: true
                        });
                      }}
                    >
                      <StyledSlippageTxt>Slippage</StyledSlippageTxt>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                        <path
                          d="M5.5781 0.172943C5.77394 0.059646 5.99609 0 6.22222 0C6.44836 0 6.67051 0.059646 6.86634 0.172943L11.8003 3.02769C11.9962 3.14098 12.1588 3.30393 12.2718 3.50016C12.3849 3.69639 12.4444 3.91899 12.4444 4.14558V9.85442C12.4444 10.081 12.3849 10.3036 12.2718 10.4998C12.1588 10.6961 11.9962 10.859 11.8003 10.9723L6.86634 13.8271C6.67051 13.9404 6.44836 14 6.22222 14C5.99609 14 5.77394 13.9404 5.5781 13.8271L0.644122 10.9723C0.448289 10.859 0.285667 10.6961 0.1726 10.4998C0.0595335 10.3036 5.74368e-06 10.081 0 9.85442V4.14558C5.74368e-06 3.91899 0.0595335 3.69639 0.1726 3.50016C0.285667 3.30393 0.448289 3.14098 0.644122 3.02769L5.5781 0.172943ZM6.22222 1.29083L1.28824 4.14558V9.85442L6.22222 12.7092L11.1562 9.85442V4.14558L6.22222 1.29083ZM6.22222 4.41827C6.90555 4.41827 7.56089 4.69027 8.04408 5.17444C8.52726 5.65861 8.79871 6.31528 8.79871 7C8.79871 7.68472 8.52726 8.34139 8.04408 8.82556C7.56089 9.30973 6.90555 9.58173 6.22222 9.58173C5.5389 9.58173 4.88355 9.30973 4.40037 8.82556C3.91718 8.34139 3.64573 7.68472 3.64573 7C3.64573 6.31528 3.91718 5.65861 4.40037 5.17444C4.88355 4.69027 5.5389 4.41827 6.22222 4.41827ZM6.22222 5.70914C6.05305 5.70914 5.88553 5.74253 5.72923 5.8074C5.57294 5.87227 5.43092 5.96735 5.3113 6.08722C5.19167 6.20709 5.09678 6.34939 5.03204 6.50601C4.9673 6.66262 4.93398 6.83048 4.93398 7C4.93398 7.16952 4.9673 7.33738 5.03204 7.49399C5.09678 7.65061 5.19167 7.79291 5.3113 7.91278C5.43092 8.03265 5.57294 8.12773 5.72923 8.1926C5.88553 8.25748 6.05305 8.29086 6.22222 8.29086C6.56389 8.29086 6.89156 8.15486 7.13315 7.91278C7.37474 7.6707 7.51047 7.34236 7.51047 7C7.51047 6.65764 7.37474 6.32931 7.13315 6.08722C6.89156 5.84514 6.56389 5.70914 6.22222 5.70914Z"
                          fill="#979ABE"
                        />
                      </svg>
                    </StyledSlippageLBox>
                    {state.showSlippage && (
                      <>
                        <StyledMaxSlippageContainer>
                          <StyledMaxSlippageTop>Max. Slippage</StyledMaxSlippageTop>
                          <StyledMaxSlippageBottom>
                            <StyledMaxSlippageAutoButton onClick={handleAuto}>Auto</StyledMaxSlippageAutoButton>
                            <StyledMaxSlippageInputContainer className={state.slippageError ? 'error' : ''}>
                              <StyledMaxSlippageInput
                                type="number"
                                value={state.inSlippageAmount}
                                onChange={(event) => handleSlippageChange(event.target.value)}
                              />
                              <StyledMaxSlippagePercentage>%</StyledMaxSlippagePercentage>
                            </StyledMaxSlippageInputContainer>
                          </StyledMaxSlippageBottom>
                        </StyledMaxSlippageContainer>
                        <StyledMaxSlippageCover
                          onClick={() => {
                            updateState({
                              showSlippage: false
                            });
                          }}
                        />
                      </>
                    )}
                  </StyledSlippageL>
                  <StyledSlippageR>{state.inSlippageAmount}%</StyledSlippageR>
                </StyledSlippage>
                {isWithdrawInSufficient ? (
                  <StyledDepositOrWithdrawButton disabled>InSufficient Balance</StyledDepositOrWithdrawButton>
                ) : state.withdrawLoading ? (
                  <StyledDepositOrWithdrawButton disabled>
                    <Loading />
                  </StyledDepositOrWithdrawButton>
                ) : state.inWithdrawAmount > 0 ? (
                  <StyledDepositOrWithdrawButton onClick={handleWithdraw}>{WithdrawTxt}</StyledDepositOrWithdrawButton>
                ) : (
                  <StyledDepositOrWithdrawButton disabled>{WithdrawTxt}</StyledDepositOrWithdrawButton>
                )}
              </StyledWithdrawContainer>
            ) : !isCreatedAccount || Number(state?.depositBalance) === 0 ? (
              <StyledEmptyContainer>
                <StyledEmptyImage src="https://ipfs.near.social/ipfs/bafkreicbbj3fufcper54zhf3g5siznyfsb3lry2f74vhyejzj2qd2qcory" />
                <StyledEmptyTips>
                  No {checkedVault.token0} available to deposit.
                  <br />
                  Create an Account and borrow {checkedVault.token0} to deposit into the vault.
                </StyledEmptyTips>
                <StyledDepositOrWithdrawButton
                  onClick={() => {
                    onChangeCategoryIndex(1);
                  }}
                >
                  Manage Account
                </StyledDepositOrWithdrawButton>
              </StyledEmptyContainer>
            ) : (
              <StyledDepositContainer>
                <StyledDepositOrWithdrawInput>
                  <StyledDepositOrWithdrawInputTop>
                    <StyledDepositOrWithdrawInputTopType>{DepositTxt}</StyledDepositOrWithdrawInputTopType>
                    <StyledDepositOrWithdrawInputTopBalance>
                      Available: <span onClick={handleMax}>{Big(state?.depositBalance ?? 0).toFixed(6)}</span>
                    </StyledDepositOrWithdrawInputTopBalance>
                  </StyledDepositOrWithdrawInputTop>
                  <StyledDepositOrWithdrawInputBottom>
                    <StyledDepositOrWithdrawInputBottomInput
                      type="number"
                      placeholder="0.0"
                      value={state.inDepositAmount}
                      onChange={(event) => handleInAmountChange(event.target.value)}
                    />
                    <StyledDepositOrWithdrawInputBottomSymbol>
                      <StyledDepositOrWithdrawInputBottomSymbolImageContainer>
                        <StyledDepositOrWithdrawInputBottomSymbolImage src={ICON_MAP[checkedVault.token0]} />
                      </StyledDepositOrWithdrawInputBottomSymbolImageContainer>
                      <StyledDepositOrWithdrawInputBottomSymbolTxt>
                        {checkedVault.token0}
                      </StyledDepositOrWithdrawInputBottomSymbolTxt>
                    </StyledDepositOrWithdrawInputBottomSymbol>
                  </StyledDepositOrWithdrawInputBottom>
                </StyledDepositOrWithdrawInput>
                <StyledDepositOrWithdrawInput
                  style={{
                    marginTop: 12,
                    background: '#2E3142'
                  }}
                >
                  <StyledDepositOrWithdrawInputTop>
                    <StyledDepositOrWithdrawInputTopType>Expected</StyledDepositOrWithdrawInputTopType>
                  </StyledDepositOrWithdrawInputTop>
                  <StyledDepositOrWithdrawInputBottom>
                    <StyledDepositOrWithdrawInputBottomInputTxt>
                      {handleGetSlippageOutAmount(state?.outDepositAmount, state?.inSlippageAmount)}
                    </StyledDepositOrWithdrawInputBottomInputTxt>
                    <StyledDepositOrWithdrawInputBottomSymbol>
                      <StyledDepositOrWithdrawInputBottomSymbolImageContainer>
                        <StyledDepositOrWithdrawInputBottomSymbolImage src={ICON_MAP[checkedVault.token1]} />
                      </StyledDepositOrWithdrawInputBottomSymbolImageContainer>
                      <StyledDepositOrWithdrawInputBottomSymbolTxt>
                        {checkedVault.token1}
                      </StyledDepositOrWithdrawInputBottomSymbolTxt>
                    </StyledDepositOrWithdrawInputBottomSymbol>
                  </StyledDepositOrWithdrawInputBottom>
                </StyledDepositOrWithdrawInput>
                <StyledSlippage>
                  <StyledSlippageL>
                    <StyledSlippageLBox
                      onClick={() => {
                        updateState({
                          showSlippage: true
                        });
                      }}
                    >
                      <StyledSlippageTxt>Slippage</StyledSlippageTxt>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                        <path
                          d="M5.5781 0.172943C5.77394 0.059646 5.99609 0 6.22222 0C6.44836 0 6.67051 0.059646 6.86634 0.172943L11.8003 3.02769C11.9962 3.14098 12.1588 3.30393 12.2718 3.50016C12.3849 3.69639 12.4444 3.91899 12.4444 4.14558V9.85442C12.4444 10.081 12.3849 10.3036 12.2718 10.4998C12.1588 10.6961 11.9962 10.859 11.8003 10.9723L6.86634 13.8271C6.67051 13.9404 6.44836 14 6.22222 14C5.99609 14 5.77394 13.9404 5.5781 13.8271L0.644122 10.9723C0.448289 10.859 0.285667 10.6961 0.1726 10.4998C0.0595335 10.3036 5.74368e-06 10.081 0 9.85442V4.14558C5.74368e-06 3.91899 0.0595335 3.69639 0.1726 3.50016C0.285667 3.30393 0.448289 3.14098 0.644122 3.02769L5.5781 0.172943ZM6.22222 1.29083L1.28824 4.14558V9.85442L6.22222 12.7092L11.1562 9.85442V4.14558L6.22222 1.29083ZM6.22222 4.41827C6.90555 4.41827 7.56089 4.69027 8.04408 5.17444C8.52726 5.65861 8.79871 6.31528 8.79871 7C8.79871 7.68472 8.52726 8.34139 8.04408 8.82556C7.56089 9.30973 6.90555 9.58173 6.22222 9.58173C5.5389 9.58173 4.88355 9.30973 4.40037 8.82556C3.91718 8.34139 3.64573 7.68472 3.64573 7C3.64573 6.31528 3.91718 5.65861 4.40037 5.17444C4.88355 4.69027 5.5389 4.41827 6.22222 4.41827ZM6.22222 5.70914C6.05305 5.70914 5.88553 5.74253 5.72923 5.8074C5.57294 5.87227 5.43092 5.96735 5.3113 6.08722C5.19167 6.20709 5.09678 6.34939 5.03204 6.50601C4.9673 6.66262 4.93398 6.83048 4.93398 7C4.93398 7.16952 4.9673 7.33738 5.03204 7.49399C5.09678 7.65061 5.19167 7.79291 5.3113 7.91278C5.43092 8.03265 5.57294 8.12773 5.72923 8.1926C5.88553 8.25748 6.05305 8.29086 6.22222 8.29086C6.56389 8.29086 6.89156 8.15486 7.13315 7.91278C7.37474 7.6707 7.51047 7.34236 7.51047 7C7.51047 6.65764 7.37474 6.32931 7.13315 6.08722C6.89156 5.84514 6.56389 5.70914 6.22222 5.70914Z"
                          fill="#979ABE"
                        />
                      </svg>
                    </StyledSlippageLBox>
                    {state.showSlippage && (
                      <>
                        <StyledMaxSlippageContainer>
                          <StyledMaxSlippageTop>Max. Slippage</StyledMaxSlippageTop>
                          <StyledMaxSlippageBottom>
                            <StyledMaxSlippageAutoButton onClick={handleAuto}>Auto</StyledMaxSlippageAutoButton>
                            <StyledMaxSlippageInputContainer className={state.slippageError ? 'error' : ''}>
                              <StyledMaxSlippageInput
                                type="number"
                                value={state.inSlippageAmount}
                                onChange={(event) => handleSlippageChange(event.target.value)}
                              />
                              <StyledMaxSlippagePercentage>%</StyledMaxSlippagePercentage>
                            </StyledMaxSlippageInputContainer>
                          </StyledMaxSlippageBottom>
                        </StyledMaxSlippageContainer>
                        <StyledMaxSlippageCover
                          onClick={() => {
                            updateState({
                              showSlippage: false
                            });
                          }}
                        />
                      </>
                    )}
                  </StyledSlippageL>
                  <StyledSlippageR>{state.inSlippageAmount}%</StyledSlippageR>
                </StyledSlippage>
                {isDepositInSufficient ? (
                  <StyledDepositOrWithdrawButton disabled>InSufficient Balance</StyledDepositOrWithdrawButton>
                ) : state.depositLoading ? (
                  <StyledDepositOrWithdrawButton disabled>
                    <Loading />
                  </StyledDepositOrWithdrawButton>
                ) : state.inDepositAmount > 0 ? (
                  <StyledDepositOrWithdrawButton onClick={handleDeposit}>{DepositTxt}</StyledDepositOrWithdrawButton>
                ) : (
                  <StyledDepositOrWithdrawButton disabled>{DepositTxt}</StyledDepositOrWithdrawButton>
                )}
              </StyledDepositContainer>
            )}
          </StyledDepositOrWithdrawBottom>
        </StyledDepositOrWithdraw>
        <StyledOverviewContainer>
          <StyledPostionOverview>
            <StyledOverviewTitle>Position Overview</StyledOverviewTitle>
            <StyledOverviewList>
              <StyledOverview>
                <StyledOverviewLabel>Deposited {checkedVault.token0}</StyledOverviewLabel>
                <StyledOverviewValue>{state.positionOverview?.positionValue}</StyledOverviewValue>
              </StyledOverview>
              <StyledOverview>
                <StyledOverviewLabel>Available LP Poistion</StyledOverviewLabel>
                {state?.withdrawBalance && (
                  <StyledOverviewValue>{Big(state?.withdrawBalance ?? 0).toFixed(6)}</StyledOverviewValue>
                )}
              </StyledOverview>
            </StyledOverviewList>
          </StyledPostionOverview>
          <StyledVaultOverview>
            <StyledOverviewTitle>Vault Overview</StyledOverviewTitle>
            <StyledOverviewList>
              <StyledOverview>
                <StyledOverviewLabel>Deposit Fee</StyledOverviewLabel>
                <StyledOverviewValue>{symbol === 'USDB' ? '0.5' : '1'}%</StyledOverviewValue>
              </StyledOverview>
              <StyledOverview>
                <StyledOverviewLabel>Available Vault Space ({checkedVault.token0})</StyledOverviewLabel>
                <StyledOverviewValue>{state?.vaultOverview?.availableVaultSpace}</StyledOverviewValue>
              </StyledOverview>
              <StyledOverview>
                <StyledOverviewLabel>Total Deposit Cap ({checkedVault.token0})</StyledOverviewLabel>
                <StyledOverviewValue>{state?.vaultOverview?.totalDepositCap}</StyledOverviewValue>
              </StyledOverview>
              <StyledOverview>
                <StyledOverviewLabel>Max Deposit Size per Account ({checkedVault.token0})</StyledOverviewLabel>
                <StyledOverviewValue>{state?.vaultOverview?.maxDepositPerAccount}</StyledOverviewValue>
              </StyledOverview>
            </StyledOverviewList>
          </StyledVaultOverview>
          <StyledOverviewButtonContainer>
            {checkedVault.vaultAddress && (
              <>
                <StyledOverviewButton onClick={handleExplore}>
                  Explore
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M1 12L12 1M12 1H3M12 1V9.5" stroke="white" />
                  </svg>
                </StyledOverviewButton>
                <StyledOverviewButton onClick={handleChart}>
                  Chart
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M1 12L12 1M12 1H3M12 1V9.5" stroke="white" />
                  </svg>
                </StyledOverviewButton>
              </>
            )}
          </StyledOverviewButtonContainer>
        </StyledOverviewContainer>
      </StyledContainerBottom>
    </StyledContainer>
  );
});
