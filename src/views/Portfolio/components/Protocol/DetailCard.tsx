import Big from 'big.js';
import React, { useMemo } from 'react';
import { styled } from 'styled-components';

import Loading from '@/components/Icons/Loading';
import useDappOpen from '@/hooks/useDappOpen';
import { StyledFlex } from '@/styled/styles';
import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';
import { get } from '@/utils/http';
import FlexTable from '@/views/Portfolio/components/FlexTable';
import type { Column } from '@/views/Portfolio/components/FlexTable/styles';
import ImageFallback from '@/views/Portfolio/components/ImageFallback';
import DAppIconWithChain from '@/views/Portfolio/components/Protocol/DAppIconWithChain';
import { bridgedTokenSymbol, getTokenLogo } from '@/views/Portfolio/helpers';

export const StyledContainer = styled.div`
  border-radius: 12px;
  border: 1px solid #373a53;
  background: #262836;
  overflow: hidden;
`;
export const StyledHead = styled.div`
  background: #262836;
  height: 64px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 16px;

  .name {
    color: #fff;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
  }

  .category {
    height: 20px;
    line-height: 18px;
    flex-shrink: 0;
    color: #c1bfff;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    padding: 0 9px;
    border-radius: 30px;
    border: 1px solid #c1bfff;
    text-align: center;
  }

  .summary {
    margin-left: auto;
    color: #fff;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    padding-right: 11px;

    .sm {
      font-size: 12px;
    }
  }
`;
export const StyledContent = styled.div``;
export const StyledFoot = styled.div``;
export const StyledManageButton = styled.button`
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  width: 109px;
  height: 32px;
  line-height: 32px;
  flex-shrink: 0;
  border-radius: 6px;
  background: #ebf479;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-left: 6px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`;
export const StyledIcon = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  flex-shrink: 0;

  &:not(:first-child) {
    margin-left: -10px;
  }
`;

const DetailCard = (props: any) => {
  const { dapp, style } = props;

  const { chainLogo, dappLogo, show_name, type, version } = dapp;

  const { open } = useDappOpen();

  const [managePending, setManagePending] = React.useState(false);

  const isLending = ['Lending', 'Yield'].includes(type);
  const isFarming = ['Leveraged Farming'].includes(type);

  const columns: Column[] = [
    {
      title: 'Pool',
      dataIndex: 'pool',
      align: 'left',
      width: '55%',
      render: (text, record) => {
        if (!record.assets) {
          return null;
        }
        return (
          <StyledFlex gap="14px" alignItems="center" style={{ color: '#fff', fontSize: 14 }}>
            <StyledFlex alignItems="center" style={{ color: '#fff', fontSize: 14 }}>
              {record.assets.map((token: any, idx: number) => (
                <StyledIcon key={idx}>
                  <ImageFallback
                    src={token.tokenLogo || getTokenLogo(token.symbol)}
                    alt=""
                    width={26}
                    height={26}
                    style={{
                      borderRadius: '50%'
                    }}
                  />
                </StyledIcon>
              ))}
            </StyledFlex>
            {record.assets.map((token: any) => bridgedTokenSymbol(token)).join(' / ')}
          </StyledFlex>
        );
      }
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      align: 'left',
      width: '30%',
      render: (text, record) => {
        if (!record.assets) {
          return null;
        }
        return (
          <StyledFlex flexDirection="column" gap="5px" alignItems="flex-start">
            {record.assets.map((asset: any, idx: number) => (
              <span key={idx}>
                {formateValueWithThousandSeparatorAndFont(asset.amount, 6, true)} {bridgedTokenSymbol(asset)}
              </span>
            ))}
          </StyledFlex>
        );
      }
    },
    {
      title: 'Value',
      dataIndex: 'value',
      align: 'right',
      width: '15%',
      render: (text, record) => {
        return `${formateValueWithThousandSeparatorAndFont(record.totalUsd, 2, true, { prefix: '$' })}`;
      }
    }
  ];

  const LendingColumns: Column[] = [
    {
      title: 'Pool',
      dataIndex: 'pool',
      align: 'left',
      width: '20%',
      render: (text: string, record: any, index: number) => {
        return (
          <StyledFlex gap="14px" alignItems="center" style={{ color: '#fff', fontSize: 14 }}>
            <StyledFlex alignItems="center" style={{ color: '#fff', fontSize: 14 }}>
              <StyledIcon>
                <ImageFallback
                  src={record.logo || getTokenLogo(record.symbol)}
                  alt=""
                  width={26}
                  height={26}
                  style={{
                    borderRadius: '50%'
                  }}
                />
              </StyledIcon>
            </StyledFlex>
            {bridgedTokenSymbol(record)}
          </StyledFlex>
        );
      }
    },
    {
      title: 'Supply',
      dataIndex: 'supply',
      align: 'left',
      width: '25%',
      render: (text, record) => {
        if (Big(record.supplyAmount).gt(0)) {
          return `${formateValueWithThousandSeparatorAndFont(record.supplyAmount, 6, true)} ${bridgedTokenSymbol(record)}`;
        }
        return '-';
      }
    },
    {
      title: 'Borrow',
      dataIndex: 'borrow',
      align: 'left',
      width: '25%',
      render: (text, record) => {
        if (Big(record.borrowAmount).gt(0)) {
          return `${formateValueWithThousandSeparatorAndFont(record.borrowAmount, 6, true)} ${bridgedTokenSymbol(record)}`;
        }
        return '-';
      }
    },
    {
      title: 'Debt Ratio',
      dataIndex: 'debtRatio',
      align: 'left',
      width: '15%',
      render: (text, record) => {
        return `${calcDebtRatio(record.borrowAmount, record.supplyAmount).toFixed(2)}%`;
      }
    },
    columns[2]
  ];

  const tableList = useMemo<any[]>(() => {
    // merge same currency
    if (isLending) {
      const _tableList: any = [];
      dapp.detailList.forEach((it: any) => {
        // Supply / Borrow
        const _type = it.type;
        // const _tokenList: any = [];
        it.assets.forEach((token: any) => {
          const tokenIdx = _tableList.findIndex((_it: any) => _it.symbol === token.symbol);
          if (tokenIdx < 0) {
            const cell = {
              symbol: token.symbol,
              decimals: token.decimals,
              logo: token.tokenLogo || getTokenLogo(token.symbol),
              usd: Big(token.usd || 0),
              supplyAmount: Big(0),
              borrowAmount: Big(0),
              totalUsd: Big(0)
            };
            if (_type === 'Supply') {
              cell.supplyAmount = Big(token.amount || 0);
              cell.totalUsd = Big(cell.totalUsd).plus(token.usd || 0);
            }
            if (_type === 'Borrow') {
              cell.borrowAmount = Big(token.amount || 0);
              cell.totalUsd = Big(cell.totalUsd).minus(token.usd || 0);
            }
            _tableList.push(cell);
          } else {
            if (_type === 'Supply') {
              _tableList[tokenIdx].supplyAmount = Big(_tableList[tokenIdx].supplyAmount).plus(token.amount || 0);
              _tableList[tokenIdx].totalUsd = Big(_tableList[tokenIdx].totalUsd).plus(token.usd || 0);
            }
            if (_type === 'Borrow') {
              _tableList[tokenIdx].borrowAmount = Big(_tableList[tokenIdx].borrowAmount).plus(token.amount || 0);
              _tableList[tokenIdx].totalUsd = Big(_tableList[tokenIdx].totalUsd).minus(token.usd || 0);
            }
          }
        });
        // _tokenList.forEach((t: any) => {
        //   _tableList.push(t);
        // });
      });
      return _tableList;
    }
    if (isFarming) {
      const _tableList: any = [];
      dapp.detailList.forEach((it: any) => {
        // The first item in the innermost assets is Supply
        // while the others are Borrow.
        const _tokenList: any = [];
        it.assets.forEach((token: any, index: number) => {
          const tokenIdx = _tokenList.findIndex((_it: any) => _it.symbol === token.symbol);
          // Supply
          if (index === 0) {
            if (tokenIdx < 0) {
              const cell = {
                symbol: token.symbol,
                decimals: token.decimals,
                logo: token.tokenLogo || getTokenLogo(token.symbol),
                usd: Big(token.usd || 0),
                supplyAmount: Big(0),
                borrowAmount: Big(0),
                totalUsd: Big(token.usd || 0)
              };
              cell.supplyAmount = Big(token.amount || 0);
              _tokenList.push(cell);
            } else {
              _tokenList[tokenIdx].supplyAmount = Big(_tokenList[tokenIdx].supplyAmount).plus(token.amount || 0);
              _tokenList[tokenIdx].totalUsd = Big(_tokenList[tokenIdx].totalUsd).plus(token.usd || 0);
            }
          }
          // Borrow
          else {
            if (tokenIdx < 0) {
              const cell = {
                symbol: token.symbol,
                decimals: token.decimals,
                logo: token.tokenLogo || getTokenLogo(token.symbol),
                usd: Big(token.usd || 0),
                supplyAmount: Big(0),
                borrowAmount: Big(0),
                totalUsd: Big(0)
              };
              cell.borrowAmount = Big(token.amount || 0);
              cell.totalUsd = Big(cell.totalUsd).minus(token.usd || 0);
              _tokenList.push(cell);
            } else {
              _tokenList[tokenIdx].borrowAmount = Big(_tokenList[tokenIdx].borrowAmount).plus(token.amount || 0);
              _tokenList[tokenIdx].totalUsd = Big(_tokenList[tokenIdx].totalUsd).minus(token.usd || 0);
            }
          }
        });
        _tokenList.forEach((t: any) => {
          _tableList.push(t);
        });
      });
      return _tableList;
    }
    return dapp.detailList;
  }, [dapp, isLending, isFarming]);

  const cardTotalUsd = formateValueWithThousandSeparatorAndFont(dapp.totalUsd, 2, false, {
    prefix: '$',
    isLTIntegerZero: true
  });

  const handleManage = async () => {
    if (managePending) return;
    setManagePending(true);
    const { show_name } = dapp;
    let dappId = 0;
    try {
      const dappIdRes = await get('/api/dapp/id', {
        name: show_name
      });
      dappId = dappIdRes?.data?.id || 0;
    } catch (err) {
      console.log('get dapp id by show_name failed: %o', err);
    }
    if (dappId <= 0) {
      setManagePending(false);
      return;
    }
    await open({
      dapp: { id: dappId },
      from: 'alldapps'
    });
    setManagePending(false);
  };

  return (
    <StyledContainer style={style} id={`portfolioProtocolDetail-${dapp.chain_id}-${dapp.type}-${dapp.name}`}>
      <StyledHead>
        <DAppIconWithChain size={32} icon={dappLogo} chainIcon={chainLogo} />
        <div className="name">
          {show_name} {version}
        </div>
        <div className="category">{type}</div>
        <StyledManageButton onClick={handleManage}>
          {managePending && <Loading size={12} />}
          Manage
          <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 5.5H14M14 5.5L8.96774 1M14 5.5L8.96774 10"
              stroke="black"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </StyledManageButton>
        <div className="summary">
          {cardTotalUsd.integer}
          <span className="sm">{cardTotalUsd.decimal}</span>
        </div>
      </StyledHead>
      <StyledContent>
        <FlexTable columns={isLending || isFarming ? LendingColumns : columns} list={tableList} />
      </StyledContent>
      <StyledFoot></StyledFoot>
    </StyledContainer>
  );
};

export default DetailCard;

export function calcDebtRatio(borrowAmount: Big.Big, supplyAmount: Big.Big) {
  if (Big(supplyAmount).eq(0)) {
    if (Big(borrowAmount).gt(0)) {
      return Big(100);
    }
    return Big(0);
  }
  if (Big(borrowAmount).eq(0)) {
    return Big(0);
  }
  return Big(borrowAmount).div(supplyAmount).times(100);
}
