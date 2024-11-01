import Big from 'big.js';
import { ethers } from 'ethers';
import { memo, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import Spinner from '@/modules/components/Spinner';
import { OTOKEN_ABI, POS_MANAGER_ABI } from '@/modules/lending/components/InitCapital/Abi';
import LengingHeader from '@/modules/lending/components/InitCapital/Markets/components/Header';
import LendingRow from '@/modules/lending/components/InitCapital/Markets/components/Row';
import { StyledContainer, StyledFlex, StyledFont, StyledSvg } from '@/styled/styles';
import { formatValueDecimal } from '@/utils/formate';

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
  background-color: gray;
  color: #fff;
  font-size: 24px;
`;

export default memo(function Detail(props: any) {
  const { record, markets, provider, multicall, dexConfig, underlyingPrices, multicallAddress, onBack } = props;

  const { POS_MANAGER, NARROW_DECIMALS } = dexConfig;

  const { posId, sequence } = record;

  const usdcPrice = underlyingPrices?.['0x00A55649E597d463fD212fBE48a3B40f0E227d06'];

  const [actionText, setActionText] = useState<'Deposit' | 'Withdraw' | 'Borrow' | 'Repay'>('Deposit');

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
              {formatValueDecimal(data?.amount, '', 2)}
            </StyledFont>
            <StyledFont color="#FFF" fontSize="16px" fontWeight="500">
              {formatValueDecimal(Big(data?.amount).times(underlyingPrices[data?.address]).div(usdcPrice), '$', 2)}
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
            {data?.source === 'deposit' ? data?.supplyApy : '-' + data?.borrowApy}
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
  const [depositDataList, setDepositDataList] = useState(null);
  const [borrowDataList, setBorrowDataList] = useState(null);
  const [checkedRecord, setCheckedRecord] = useState(null);
  const [collLoading, setCollLoading] = useState(false);
  const [borrLoading, setBorrLoading] = useState(false);

  const [healthFactor, setHealthFactor] = useState(Infinity);

  const loading = useMemo(() => collLoading && borrLoading, [collLoading, borrLoading]);
  const handleGetAmts = async (infos: any) => {
    const calls = [];
    infos[0]?.forEach((pool, index) => {
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
    ).map((res: any, index) => {
      const oToken = markets[calls?.[index]?.address];
      return [oToken?.address, res && res[0] ? ethers.utils.formatUnits(res[0]._hex, oToken?.decimals) : '0'];
    });
    return amts;
  };

  const handleGetAmtStored = async (infos: any) => {
    const calls = [];
    // const notAmtArray = []
    infos[0]?.forEach((pool, index) => {
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
    ).map((res: any, index) => {
      const oToken = markets[calls?.[index]?.address];
      return [
        oToken?.address,
        res && res[0] ? ethers.utils.formatUnits(res[0]._hex, oToken?.decimals) : '0',
        infos?.[1]?.[index]
      ];
    });
    return amts;
  };
  const handleGetPosCollInfo = async (id: any) => {
    if (!POS_MANAGER) return;
    try {
      setCollLoading(true);
      const _dataList = [];
      const contract = new ethers.Contract(POS_MANAGER, POS_MANAGER_ABI, provider.getSigner());
      const posCollInfo = await contract.getPosCollInfo(id);
      const amts = await handleGetAmts(posCollInfo);
      amts?.forEach((amt) => {
        const [pool, amount] = amt;
        _dataList.push({
          ...markets[pool],
          source: 'deposit',
          amount
        });
      });
      setCollLoading(false);
      setDepositDataList(_dataList);
    } catch (error) {
      console.log('error:', error);
      setCollLoading(false);
      setTimeout(() => {
        handleGetPosCollInfo();
      }, 1500);
    }
  };
  const handleGetPosBorrInfo = async (id: any) => {
    if (!POS_MANAGER) return;
    const calls = [];
    try {
      setBorrLoading(true);
      const _dataList = [];
      const contract = new ethers.Contract(POS_MANAGER, POS_MANAGER_ABI, provider.getSigner());
      const posBorrInfo = await contract.getPosBorrInfo(id);
      const amts = await handleGetAmtStored(posBorrInfo);
      amts?.forEach((amt, index) => {
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
        handleGetPosBorrInfo();
      }, 1500);
    }
  };

  const getHealthFactor = async (_depositDataList, _borrowDataList) => {
    if (_depositDataList && _borrowDataList) {
      let CollateralCredit = 0;
      _depositDataList?.forEach((currentData, index) => {
        CollateralCredit = Big(CollateralCredit).plus(
          Big(currentData?.amount).times(underlyingPrices[currentData?.address]).times(currentData?.collateralFactor)
        );
      });
      let BorrowCredit = 0;
      _borrowDataList?.forEach((currentData, index) => {
        BorrowCredit = Big(BorrowCredit).plus(
          Big(currentData?.amount).times(underlyingPrices[currentData?.address]).times(currentData?.borrowFactor)
        );
      });
      setHealthFactor(
        Big(CollateralCredit)
          .div(BorrowCredit ? BorrowCredit : 1)
          .toFixed()
      );
    } else {
      setHealthFactor(Infinity);
    }
  };

  const getData = async (id) => {
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
  const handleAddAsset = (text) => {
    setActionText(text);
    setVisible(true);
  };

  useEffect(() => {
    getData(posId);
  }, [posId, updater]);

  useEffect(() => {
    getHealthFactor(depositDataList, borrowDataList);
  }, [depositDataList, borrowDataList]);

  return (
    <StyledContainer>
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
            <StyledFont
              color="#FFF"
              fontSize="16px"
              fontWeight="500"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                handleAddAsset('Deposit');
              }}
            >
              Add Deposit Asset(s) +
            </StyledFont>
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
            <StyledFont
              color="#FFF"
              fontSize="16px"
              fontWeight="500"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                handleAddAsset('Borrow');
              }}
            >
              Add Borrow Asset(s) +
            </StyledFont>
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
