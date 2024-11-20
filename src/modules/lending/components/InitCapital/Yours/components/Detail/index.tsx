import Big from 'big.js';
import { ethers } from 'ethers';
import { memo, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import Spinner from '@/modules/components/Spinner';
import { ERC20_ABI, OTOKEN_ABI, POS_MANAGER_ABI } from '@/modules/lending/components/InitCapital/Abi';
import LengingHeader from '@/modules/lending/components/InitCapital/Markets/components/Header';
import LendingRow from '@/modules/lending/components/InitCapital/Markets/components/Row';
import { StyledContainer, StyledFlex, StyledFont, StyledSvg } from '@/styled/styles';
import { formatValueDecimal } from '@/utils/formate';

import useFunctions from '../../hooks/useFunctions';
import OperationModal from '../Modal';
const StyledPanel = styled.div`
  flex: 1;
`;

const StyledButton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  background-color: var(--button-color);
  color: #fff;
  font-size: 24px;
`;
const StyledAddAsset = styled.div`
  cursor: pointer;
  width: 320px;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 16px;
  color: var(--button-text-color);
  font-family: 'Montserrat';
  transition: 0.5s all;
  &:hover {
    background-color: var(--button-color);
    color: var(--button-text-color);
  }
`;
const StyledCloseButton = styled.div`
  width: 125px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--button-color);
  cursor: pointer;
  border-radius: 8px;
  color: var(--button-text-color);
`;
export default memo(function Detail(props: any) {
  const { getHealthFactor } = useFunctions();
  const {
    account,
    record,
    markets,
    provider,
    multicall,
    dexConfig,
    underlyingPrices,
    usdcPrice,
    multicallAddress,
    onBack
  } = props;

  console.log('===props', props);
  const { POS_MANAGER, NARROW_DECIMALS } = dexConfig;

  const { posId, sequence } = record;
  const [actionText, setActionText] = useState<'Deposit' | 'Withdraw' | 'Borrow' | 'Repay' | 'Close Position'>(
    'Deposit'
  );

  const COLUMNS = [
    {
      key: 'asset',
      label: 'Asset',
      width: '25%'
    },
    {
      key: 'amount',
      label: 'Amount',
      width: '25%',
      render(data: any) {
        return (
          <StyledFlex flexDirection="column" gap="8px" alignItems="flex-start">
            <StyledFont color="#FFF" fontSize="16px" fontWeight="500">
              {formatValueDecimal(data?.amount, '', 2, false, false)}
            </StyledFont>
            <StyledFont color="#FFF" fontSize="16px" fontWeight="500">
              {formatValueDecimal(
                Big(data?.amount).times(underlyingPrices[data?.address]).div(usdcPrice),
                '$',
                2,
                false,
                false
              )}
            </StyledFont>
          </StyledFlex>
        );
      }
    },
    {
      key: 'apy',
      label: 'APY',
      width: '25%',
      render(data: any) {
        return (
          <StyledFont color="#FFF" fontSize="16px" fontWeight="500">
            {data?.source === 'deposit'
              ? Big(data?.supplyApy).times(100).toFixed(2)
              : '-' + Big(data?.borrowApy).times(100).toFixed(2)}
            %
          </StyledFont>
        );
      }
    },
    {
      key: 'operation',
      label: '',
      width: '25%',
      render(data: any) {
        return (
          <StyledFlex gap="8px">
            <StyledButton onClick={() => handleClickButton(data, 'plus')}>+</StyledButton>
            <StyledButton onClick={() => handleClickButton(data, 'minus')}>-</StyledButton>
          </StyledFlex>
        );
      }
    }
  ];

  const [updater, setUpdater] = useState(0);
  const [visible, setVisible] = useState(false);
  const [depositDataList, setDepositDataList] = useState<any>(null);
  const [borrowDataList, setBorrowDataList] = useState<any>(null);
  const [checkedRecord, setCheckedRecord] = useState(null);
  const [collLoading, setCollLoading] = useState(false);
  const [borrLoading, setBorrLoading] = useState(false);

  const [healthFactor, setHealthFactor] = useState<any>(Infinity);
  const [walletBalances, setWalletBalances] = useState<any>(null);

  const loading = useMemo(() => collLoading && borrLoading, [collLoading, borrLoading]);

  const totalSupply = useMemo(
    () =>
      depositDataList?.reduce(
        (acc: any, curr: any) =>
          (acc = Big(acc).plus(Big(curr?.amount).times(underlyingPrices[curr?.address]).div(usdcPrice))),
        0
      ),
    [depositDataList]
  );
  const totalBorrow = useMemo(
    () =>
      borrowDataList?.reduce(
        (acc: any, curr: any) =>
          (acc = Big(acc).plus(Big(curr?.amount).times(underlyingPrices[curr?.address]).div(usdcPrice))),
        0
      ),
    [borrowDataList]
  );

  const handleGetAmts = async (infos: any) => {
    const calls: any = [];
    infos[0]?.forEach((pool: any, index: number) => {
      calls.push({
        address: pool,
        name: 'toAmt',
        params: [infos[1][index]]
      });
    });
    const amts = (
      await multicall({
        abi: OTOKEN_ABI,
        calls,
        options: {},
        multicallAddress,
        provider
      })
    ).map((res: any, index: number) => {
      const oToken = markets[calls?.[index]?.address];
      return [
        oToken?.address,
        res && res[0] ? ethers.utils.formatUnits(res[0]._hex, oToken?.decimals) : '0',
        infos?.[1]?.[index]
      ];
    });
    return amts;
  };

  const handleGetAmtStored = async (infos: any) => {
    const calls: any = [];
    // const notAmtArray = []
    infos[0]?.forEach((pool: any, index: number) => {
      calls.push({
        address: pool,
        name: 'debtShareToAmtStored',
        params: [infos[1][index]]
      });
    });

    const amts = (
      await multicall({
        abi: OTOKEN_ABI,
        calls,
        options: {},
        multicallAddress,
        provider
      })
    ).map((res: any, index: number) => {
      const oToken = markets[calls?.[index]?.address];
      return [
        oToken?.address,
        res && res[0] ? ethers.utils.formatUnits(res[0]._hex, oToken?.decimals) : '0',
        infos?.[1]?.[index]
      ];
    });
    return amts;
  };

  const handleGetBalances = async () => {};
  const handleGetPosCollInfo = async (id: any) => {
    if (!POS_MANAGER) return;
    try {
      setCollLoading(true);
      const _dataList: any = [];
      const contract = new ethers.Contract(POS_MANAGER, POS_MANAGER_ABI, provider.getSigner());
      const posCollInfo = await contract.getPosCollInfo(id);
      const amts = await handleGetAmts(posCollInfo);
      amts?.forEach((amt: any) => {
        const [pool, amount, shares] = amt;
        _dataList.push({
          ...markets[pool],
          source: 'deposit',
          amount,
          shares
        });
      });
      setCollLoading(false);
      setDepositDataList(_dataList);
    } catch (error) {
      console.log('error:', error);
      setCollLoading(false);
      setTimeout(() => {
        handleGetPosCollInfo(id);
      }, 1500);
    }
  };
  const handleGetPosBorrInfo = async (id: any) => {
    if (!POS_MANAGER) return;
    const calls = [];
    try {
      setBorrLoading(true);
      const _dataList: any = [];
      const contract = new ethers.Contract(POS_MANAGER, POS_MANAGER_ABI, provider.getSigner());
      const posBorrInfo = await contract.getPosBorrInfo(id);
      const amts = await handleGetAmtStored(posBorrInfo);
      amts?.forEach((amt: any, index: number) => {
        const [pool, amount, shares] = amt;
        _dataList.push({
          ...markets[pool],
          source: 'borrow',
          amount,
          shares
        });
      });
      setBorrLoading(false);
      setBorrowDataList(_dataList);
    } catch (error) {
      console.log('error:', error);
      setBorrLoading(false);
      setTimeout(() => {
        handleGetPosBorrInfo(id);
      }, 1500);
    }
  };

  const getData = async (id: string) => {
    if (id) {
      handleGetPosCollInfo(id);
      handleGetPosBorrInfo(id);
    }
  };

  const handleClickButton = (record: any, type: 'plus' | 'minus') => {
    if (record.source === 'deposit') {
      if (type === 'plus') {
        setActionText('Deposit');
      } else {
        setActionText('Withdraw');
      }
    } else {
      if (type === 'plus') {
        setActionText('Borrow');
      } else {
        setActionText('Repay');
      }
    }
    setVisible(true);
    setCheckedRecord(record);
  };
  const handleAddAsset = (text: 'Deposit' | 'Borrow') => {
    setActionText(text);
    setVisible(true);
  };

  const handleClosePosition = () => {
    setActionText('Close Position');
    setVisible(true);
  };

  const getWalletBalance = async (_token: any) => {
    if (_token?.underlyingToken?.address === 'native') {
      return await provider.getBalance(account);
    } else {
      const contract = new ethers.Contract(_token?.underlyingToken?.address, ERC20_ABI, provider);
      return await contract.balanceOf(account);
    }
  };
  const getWalletBalances = async (_depositDataList: any, _borrowDataList: any) => {
    const addressSet = new Set();
    _depositDataList?.forEach((depositData: any) => {
      addressSet.add(depositData.address);
    });
    _borrowDataList?.forEach((borrowData: any) => {
      addressSet.add(borrowData.address);
    });
    console.log('====address', Array.from(addressSet));
    const calls = [];

    const addressArray = Array.from(addressSet);

    const promiseArray: any = [];
    addressArray?.forEach((address: any) => {
      promiseArray.push(getWalletBalance(markets?.[address]));
    });

    const response = await Promise.all(promiseArray);
    const _balances: any = {};
    for (let i = 0; i < addressArray.length; i++) {
      const address: any = addressArray[i];
      _balances[address] = response[i]
        ? ethers.utils.formatUnits(response?.[i], markets?.[address]?.underlyingToken?.decimals ?? 18)
        : 0;
    }
    setWalletBalances(_balances);
  };

  useEffect(() => {
    getData(posId);
  }, [posId, updater]);

  useEffect(() => {
    getHealthFactor(depositDataList, borrowDataList, underlyingPrices);
    getWalletBalances(depositDataList, borrowDataList);
  }, [depositDataList, borrowDataList]);

  return (
    <StyledContainer>
      <StyledFlex
        justifyContent="space-between"
        style={{ padding: 12, backgroundColor: '#262836', borderRadius: 10, marginBottom: 16 }}
      >
        <StyledFont color="#FFF" fontSize="16px" fontWeight="500">
          Positon {record?.sequence}
        </StyledFont>

        <StyledFlex alignItems="center" justifyContent="space-between" gap="16px">
          <StyledFlex flexDirection="column" alignItems="flex-start" gap="8px">
            <StyledFont color="#FFF" fontSize="14px" fontWeight="500">
              Health Factor
            </StyledFont>
            <StyledFont color="#FFF" fontSize="16px" fontWeight="600">
              {isFinite(record?.healthFactor) ? formatValueDecimal(record?.healthFactor, '', 2) : '∞'}
            </StyledFont>
          </StyledFlex>
          <StyledFlex flexDirection="column" alignItems="flex-start" gap="8px">
            <StyledFont color="#FFF" fontSize="14px" fontWeight="500">
              Net APY
            </StyledFont>
            <StyledFont color="#FFF" fontSize="16px" fontWeight="600">
              {formatValueDecimal(Big(record?.netApy).times(100).toFixed(), '', 2)} %
            </StyledFont>
          </StyledFlex>
          <StyledFlex flexDirection="column" alignItems="flex-start" gap="8px">
            <StyledFont color="#FFF" fontSize="14px" fontWeight="500">
              Total Supply
            </StyledFont>
            <StyledFont color="#FFF" fontSize="16px" fontWeight="600">
              {formatValueDecimal(totalSupply, '$', 2)}
            </StyledFont>
          </StyledFlex>
          <StyledFlex flexDirection="column" alignItems="flex-start" gap="8px">
            <StyledFont color="#FFF" fontSize="14px" fontWeight="500">
              Total Borrow
            </StyledFont>
            <StyledFont color="#FFF" fontSize="16px" fontWeight="600">
              {formatValueDecimal(totalBorrow, '$', 2)}
            </StyledFont>
          </StyledFlex>

          <StyledCloseButton
            onClick={() => {
              handleClosePosition();
            }}
          >
            Close Position
          </StyledCloseButton>
        </StyledFlex>
      </StyledFlex>
      <StyledFlex gap="8px" style={{ marginBottom: 12 }} onClick={onBack}>
        <StyledSvg style={{ color: '#FFF', transform: 'rotate(90deg)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </StyledSvg>
        <StyledFont color="#FFF" fontWeight="500" fontSize="14px" style={{ cursor: 'pointer' }}>
          Back to Dashboard
        </StyledFont>
      </StyledFlex>
      <StyledFlex alignItems="flex-start" gap="12px">
        <StyledPanel>
          <StyledFont color="#FFF" fontWeight="500" fontSize="16px" style={{ paddingLeft: 22, paddingRight: 24 }}>
            Deposit
          </StyledFont>
          <LengingHeader columns={COLUMNS} />
          {depositDataList?.map((record: any) => (
            <LendingRow key={'deposit' + record.address} columns={COLUMNS} data={record} showExpand={false} />
          ))}
          <StyledFlex justifyContent="center">
            <StyledAddAsset
              onClick={() => {
                handleAddAsset('Deposit');
              }}
            >
              Add Deposit Asset(s) +
            </StyledAddAsset>
          </StyledFlex>
        </StyledPanel>
        <StyledPanel>
          <StyledFont color="#FFF" fontWeight="500" fontSize="16px" style={{ paddingLeft: 22, paddingRight: 24 }}>
            Borrow
          </StyledFont>
          <LengingHeader columns={COLUMNS} />
          {borrowDataList?.map((record: any) => (
            <LendingRow key={'borrow' + record.address} columns={COLUMNS} data={record} showExpand={false} />
          ))}
          <StyledFlex justifyContent="center">
            <StyledAddAsset
              onClick={() => {
                handleAddAsset('Borrow');
              }}
            >
              Add Borrow Asset(s) +
            </StyledAddAsset>
          </StyledFlex>
        </StyledPanel>
        {loading && <Spinner />}
        <OperationModal
          {...{
            ...props,
            data: checkedRecord,
            depositDataList,
            borrowDataList,
            posId,
            sequence,
            visible,
            actionText,
            walletBalances,
            setCheckedRecord,
            onClose: () => {
              setVisible(false);
              setCheckedRecord(null);
            },
            onSuccess: () => {
              setUpdater(Date.now());
            }
          }}
        />
      </StyledFlex>
    </StyledContainer>
  );
});
