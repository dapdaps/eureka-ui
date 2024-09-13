// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo, useEffect } from 'react';
import styled from 'styled-components';

import Loading from '@/modules/components/Loading';
import Spinner from '@/modules/components/Spinner';
import { useMultiState } from '@/modules/hooks';
import { asyncFetch } from '@/utils/http';
const StyledContainer = styled.div`
  padding-top: 18px;
  width: 478px;
  border: 1px solid rgba(55, 58, 83, 1);
  border-radius: 16px;
  margin: 50px auto 0;
  padding: 20px 0 0px;
  position: relative;
`;
const StyledFont = styled.div`
  color: ${(props) => props.color || '#000'};
  font-family: ${(props) => props.fontFamily || 'Gantari'};
  font-size: ${(props) => props.fontSize || '16px'};
  font-style: ${(props) => props.fontStyle || 'normal'};
  font-weight: ${(props) => props.fontWeight || '400'};
  line-height: ${(props) => props.lineHeight || 'normal'};
  white-space: ${(props) => props.whiteSpace || 'normal'};
`;
const StyledFlex = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || 'row'};
  align-items: ${(props) => props.alignItems || 'center'};
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  gap: ${(props) => props.gap || '0px'};
`;
const StyledDashedUndeline = styled.div`
  padding: 2px 0;
  border-bottom: 1px dashed #979abe;
`;

const TitleText = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 32px;
  color: #ffffff;
  @media (max-width: 900px) {
    display: none;
  }
`;
const ContainerLogin = styled.div`
  display: flex;
  max-width: 500px;

  flex-direction: column;
  margin: 80px auto auto auto;

  .web3-connect {
    width: 480px;
    height: 60px;
    border-radius: 10px;
    background-color: #fff;
    color: #0f1126;
    font-size: 18px;
    font-weight: 500;
    border: none;
    margin-top: 20px;
  }

  @media (max-width: 736px) {
    max-width: 100%;
    .web3-connect {
      width: 100%;

      font-size: 16px;
      height: 40px;
    }
  }
`;
// List
const ListWrapper = styled.div`
  margin-top: 20px;
`;
const SvgIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &.icon-right {
    position: absolute;
    right: 28px;
    top: 50%;
    transform: translateY(-50%);

    &.rotate {
      transform: translateY(-50%) rotate(90deg);
    }
  }
`;
const Table = styled.div``;
const THead = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 30px;
`;
const Th = styled.div`
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  flex-shrink: 0;
`;
const TBody = styled.div``;
const TrWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid rgba(55, 58, 83, 1);
  margin-bottom: 8px;
  overflow: hidden;
`;
const Tr = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 84px;
  background: #262836;
  padding: 0 24px;
`;
const Td = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;

  &.column {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  color: #fff;

  .token-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;

    img {
      width: 38px;
      height: 38px;
    }
  }
`;
const TdTxt = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &.gray {
    color: #979abe;
    font-size: 12px;
  }
`;
const PoolPercentage = styled.div`
  padding: 3px 8px;
  border-radius: 24px;
  background: rgba(151, 154, 190, 0.1);
  color: #979abe;
  font-family: Gantari;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StrategyTxt = styled.div`
  padding: 7px 10px;
  border-radius: 6px;
  background: rgba(151, 154, 190, 0.1);
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledVaultImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 26px;
    height: 26px;
    border-radius: 50%;
  }
`;
const StyledButton = styled.button`
  background: var(--switch-color);
  color: var(--button-text-color);
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  height: 48px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;
const Input = styled.input`
  color: #fff;
  height: 48px;
  padding: 0 0.75em;
  background: #2e3142;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 10px;
  font-size: 14px;

  &:focus {
    color: #fff;
    background-color: transparent;
  }
`;
const StyledEmpty = styled.div`
  height: 100px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// withdraw params
const WITHDRAW_ABI = [
  // 1: Boost Points | 4: Points & Fixed Yield
  {
    // withdraw ETH
    ETH: {
      inputs: [
        { internalType: 'address', name: 'fixedRate', type: 'address' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' }
      ],
      name: 'burnFixedRate',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    // withdraw USDB
    USDB: {
      inputs: [
        { internalType: 'address', name: 'fixedRate', type: 'address' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' }
      ],
      name: 'burnFixedRate',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    }
  },
  // 2: Boost Yield | 3: Points & Yield
  {
    // withdraw ETH
    ETH: {
      inputs: [
        { internalType: 'address', name: 'variableRate', type: 'address' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
        { internalType: 'uint256', name: 'minYield', type: 'uint256' }
      ],
      name: 'burnVariableRate',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    // withdraw USDB
    USDB: {
      inputs: [
        { internalType: 'address', name: 'variableRate', type: 'address' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
        { internalType: 'uint256', name: 'minYield', type: 'uint256' }
      ],
      name: 'burnVariableRate',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    }
  }
];
export default memo(function DuoTable(props) {
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
    onSuccess,
    dataIndex,
    onChangeDataIndex,
    UNSTAKE_TOKEN_CONFIG,
    actionText
  } = props;

  const { ExchangeToken, PointsAndYield } = dexConfig;

  const { parseUnits, formatUnits } = ethers.utils;

  const [state, updateState] = useMultiState({
    dataList: [],
    loading: false,
    loadingVault: null,
    pending: false
  });

  // un-stake event
  function handleWithdraw({ curPointsAndYield, token, vault, amount, tokenDecimals, curPointsAndYieldItem }) {
    if (state.loadingVault) return;
    updateState({
      loadingVault: vault
    });

    let WITHDRAW_ABI_LATEST;
    let params;
    let unstakeToken = 'ETH';
    if (token.symbol === 'DUSD') {
      unstakeToken = 'USDB';
    }

    // WITHDRAW_ABI
    // ETH: withdraw ETH
    // USDB: withdraw USDB

    // Boost Points, Points & Fixed Yield
    if ([1, 4].includes(curPointsAndYield)) {
      WITHDRAW_ABI_LATEST = WITHDRAW_ABI[0][unstakeToken];
      params = [
        // fixedRate
        vault,
        // amount
        parseUnits(amount, tokenDecimals)
      ];
    }
    // 2: Boost Yield | 3: Points & Yield
    else {
      WITHDRAW_ABI_LATEST = WITHDRAW_ABI[1][unstakeToken];
      params = [
        // variableRate
        vault,
        // amount
        parseUnits(amount, tokenDecimals),
        // minYield
        parseUnits('0', tokenDecimals)
      ];
    }

    const contract = new ethers.Contract(
      curPointsAndYieldItem[unstakeToken],
      [
        WITHDRAW_ABI_LATEST,
        {
          ...WITHDRAW_ABI_LATEST,
          name: 'withdraw',
          constant: false
        }
      ],
      provider.getSigner()
    );

    const getTx = (gas) => {
      contract[WITHDRAW_ABI_LATEST.name](...params, {
        gasLimit: gas || 4000000
        // value: parseUnits(amount, tokenDecimals),
      })
        .then((tx) => {
          tx.wait()
            .then((res) => {
              const { status, transactionHash } = res;
              if (status !== 1) throw new Error('');
              updateState({
                loadingVault: null
              });
              onSuccess();
              addAction?.({
                type: 'Staking',
                action: actionText,
                token: {
                  symbol: unstakeToken
                },
                amount,
                template: props.name,
                add: false,
                status,
                transactionHash
              });
              toast?.success({
                title: `${actionText} Successfully!`,
                text: `${actionText} ${Big(amount).toFixed(2)} ${tokenSymbol}`,
                tx: transactionHash,
                chainId
              });
            })
            .catch((err) => {
              console.log('tx error: ', err);
              updateState({
                loadingVault: null
              });
              toast?.fail({
                title: `${actionText} Failed!`,
                text: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : ``
              });
            });
        })
        .catch((err) => {
          console.log('contract error: ', err);
          updateState({
            loadingVault: null
          });
          toast?.fail({
            title: `${actionText} Failed!`,
            text: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : ``
          });
        });
    };

    // get gas
    const estimateGas = () => {
      contract.estimateGas[WITHDRAW_ABI_LATEST.name](...params, {
        // value: parseUnits(amount, tokenDecimals),
      })
        .then((gas) => {
          getTx(gas);
        })
        .catch((err) => {
          console.log('get gas failed: ', err);
          getTx();
        });
    };
    estimateGas();
  }

  const columnList = [
    {
      width: '20%',
      key: 'id',
      label: 'Vault Address',
      type: 'slot',
      render: (data) => {
        return (
          <div className="flexed">
            <span>{data.id ? `${data.id.slice(2, 7)}...${data.id.slice(-4)}` : ''}</span>
          </div>
        );
      }
    },
    {
      width: '15%',
      key: 'token',
      label: 'Token',
      type: 'slot',
      render: (data) => {
        const currToken = UNSTAKE_TOKEN_CONFIG[data.token];
        if (!currToken) return null;
        return (
          <div className="token-wrapper">
            <img src={currToken.icon} alt="" />
            <span>{currToken.symbol}</span>
          </div>
        );
      }
    },
    {
      width: '20%',
      key: 'type',
      label: 'Type',
      type: 'slot',
      render: (data) => {
        const currType = Object.values(PointsAndYield).find((it) => it.name === data.type);
        if (!currType) return '';
        return <StrategyTxt>{currType.label}</StrategyTxt>;
      }
    },
    {
      width: '15%',
      key: 'principal',
      label: 'Principal',
      type: 'slot',
      render: (data, index) => {
        const _list = state.dataList.slice();
        const currToken = UNSTAKE_TOKEN_CONFIG[data.token];
        const total = Big(data.principal).div(Big(10).pow(currToken.decimals || 18));
        const handleMax = () => {
          _list[index].amount = Big(total.toFixed(currToken.decimals, Big.roundDown)).toString();
          updateState({
            dataList: _list
          });
        };
        if (total.lt(0.0001)) return <span onClick={handleMax}>&lt; 0.0001</span>;
        return <span onClick={handleMax}>{total.toFixed(4, 0)}</span>;
      }
    },
    {
      width: '20%',
      key: 'amount',
      label: 'Amount',
      type: 'slot',
      render: (data, index) => {
        const currToken = UNSTAKE_TOKEN_CONFIG[data.token];
        const total = Big(data.principal).div(Big(10).pow(currToken.decimals || 18));
        return (
          <Input
            value={data.amount}
            onChange={(e) => {
              const val = e.target.value;
              const _list = state.dataList.slice();
              _list[index].amount = val;
              updateState({
                dataList: _list
              });
            }}
            onBlur={(e) => {
              const _list = state.dataList.slice();
              const val = e.target.value;
              if (
                val &&
                (isNaN(Number(val)) ||
                  Big(val).lt(0) ||
                  Big(val).gt(total) ||
                  Big(val).lt(Big(1).div(Big(10).pow(18))) ||
                  Big(val).gt(Big(1).times(Big(10).pow(18))))
              ) {
                _list[index].amount = Big(total.toFixed(currToken.decimals, Big.roundDown)).toString();
              } else {
                _list[index].amount = val;
              }
              updateState({
                dataList: _list
              });
            }}
          />
        );
      }
    },
    {
      width: '10%',
      direction: 'column',
      key: 'action',
      label: '',
      type: 'slot',
      render: (data, index) => {
        const total = Big(data.principal).div(Big(10).pow(18));
        return (
          <StyledButton
            disabled={
              !data.amount ||
              isNaN(Number(data.amount)) ||
              Big(data.amount).lt(0) ||
              Big(data.amount).gt(total) ||
              state.loadingVault === data.id
            }
            type="button"
            onClick={() => {
              const currType = Object.values(PointsAndYield).find((it) => it.name === data.type);
              if (!currType) return;
              const currToken = UNSTAKE_TOKEN_CONFIG[data.token];
              if (!currToken) return;
              handleWithdraw({
                curPointsAndYield: currType.key,
                token: currToken,
                vault: data.id,
                amount: Big(data.amount).toFixed(currToken.decimals || 18, Big.roundDown),
                tokenDecimals: currToken.decimals,
                curPointsAndYieldItem: currType
              });
            }}
          >
            {state.loadingVault === data.id ? <Loading size={16} /> : 'Withdraw'}
          </StyledButton>
        );
      }
    }
  ];

  function renderTD(data, column, index) {
    if (column.type === 'slot') {
      return column.render(data, index);
    }
    if (column.type === 'svg') {
      return <SvgIcon>{data[column.key]}</SvgIcon>;
    }
    return <TdTxt>{data[column.key]}</TdTxt>;
  }

  const getListData = () => {
    updateState({ loading: true });
    const url = `/duo/exchange/getVaultPositions?owner=${account}&showClosed=0`;
    asyncFetch(url)
      .then((res) => {
        if (!res.result) {
          toast?.fail({
            title: `Request Unstake Data Failed!`,
            text: 'Please try again later'
          });
          return;
        }
        const dataListFormatter = (dataSource) => {
          const dataList = [];
          const keys = Object.keys(dataSource);
          Object.values(dataSource).forEach((item, index) => {
            item.items?.forEach((item) => {
              dataList.push({
                ...item,
                type: keys[index]
              });
            });
          });
          return dataList;
        };
        updateState({
          dataList: dataListFormatter(res.result),
          loading: false
        });
      })
      .catch((err) => {
        toast?.fail({
          title: `Request Unstake Data Failed!`,
          text: 'Please try again later'
        });
        updateState({ loading: false });
      });
  };

  useEffect(() => {
    getListData();
  }, []);

  return (
    <>
      {state.dataList.length && !state.loading && (
        <ListWrapper>
          <Table>
            <THead>
              {columnList.map((column, index) => {
                return (
                  <Th key={index} style={{ width: column.width }}>
                    {column.label}
                  </Th>
                );
              })}
            </THead>
            <TBody>
              {state.dataList.map((data, index) => {
                return (
                  <TrWrapper key={data.id}>
                    <Tr>
                      {columnList.map((column, columnIndex) => {
                        return (
                          <Td
                            key={index + columnIndex}
                            className={column.direction === 'column' ? 'column' : ''}
                            style={{ width: column.width }}
                          >
                            {renderTD(data, column, index, columnIndex)}
                          </Td>
                        );
                      })}
                    </Tr>
                    {index === dataIndex && <div>content</div>}
                  </TrWrapper>
                );
              })}
            </TBody>
          </Table>
        </ListWrapper>
      )}
      {state.loading && <Spinner />}
      {!state.dataList.length && !state.loading && <StyledEmpty>No data</StyledEmpty>}
    </>
  );
});
