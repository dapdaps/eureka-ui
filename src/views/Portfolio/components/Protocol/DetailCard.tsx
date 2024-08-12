import { styled } from 'styled-components';

import { StyledFlex } from '@/styled/styles';
import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';
import FlexTable from '@/views/Portfolio/components/FlexTable';
import type { Column } from '@/views/Portfolio/components/FlexTable/styles';
import DAppIconWithChain from '@/views/Portfolio/components/Protocol/DAppIconWithChain';
import React, { useMemo } from 'react';
import { getTokenLogo } from '@/views/Portfolio/helpers';
import Big from 'big.js';

export const StyledContainer = styled.div`
  border-radius: 12px;
  border: 1px solid #373A53;
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
    color: #FFF;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
  }

  .category {
    height: 20px;
    line-height: 18px;
    flex-shrink: 0;
    color: #C1BFFF;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    padding: 0 9px;
    border-radius: 30px;
    border: 1px solid #C1BFFF;
    text-align: center;
  }

  .summary {
    margin-left: auto;
    color: #FFF;
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
export const StyledManageButton = styled.a`
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  width: 109px;
  height: 32px;
  line-height: 32px;
  flex-shrink: 0;
  border-radius: 6px;
  background: #EBF479;
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
export const StyledIcon = styled.div<{ src: string }>`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ src }) => `url("${src}") no-repeat center / contain`};

  &:not(:first-child) {
    margin-left: -10px;
  }
`;

const DetailCard = (props: any) => {
  const { dapp, style } = props;

  const {
    chainLogo,
    dappLogo,
    show_name,
    type,
  } = dapp;

  const isLending = ['Lending', 'Yield'].includes(type);

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
              {
                record.assets.map((token: any, idx: number) => (
                  <StyledIcon key={idx} src={token.tokenLogo || getTokenLogo(token.symbol)} />
                ))
              }
            </StyledFlex>
            {record.assets.map((token: any) => token.symbol).join(' / ')}
          </StyledFlex>
        );
      },
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
            {
              record.assets.map((asset: any, idx: number) => (
                <span key={idx}>{asset.amount} {asset.symbol}</span>
              ))
            }
          </StyledFlex>
        );
      },
    },
    {
      title: 'Value',
      dataIndex: 'value',
      align: 'right',
      width: '15%',
      render: (text, record) => {
        return `${formateValueWithThousandSeparatorAndFont(record.totalUsd, 2, true, { prefix: '$' })}`;
      },
    },
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
              <StyledIcon src={record.logo || getTokenLogo(record.symbol)} />
            </StyledFlex>
            {record.symbol}
          </StyledFlex>
        );
      },
    },
    {
      title: 'Supply',
      dataIndex: 'supply',
      align: 'left',
      width: '25%',
      render: (text, record) => {
        if (Big(record.supplyAmount).gt(0)) {
          return `${Big(record.supplyAmount).lt(1e-9) ? Big(record.supplyAmount).toFixed(record.decimals) : Big(record.supplyAmount).toString()} ${record.symbol}`;
        }
        return '-';
      },
    },
    {
      title: 'Borrow',
      dataIndex: 'borrow',
      align: 'left',
      width: '25%',
      render: (text, record) => {
        if (Big(record.borrowAmount).gt(0)) {
          return `${Big(record.borrowAmount).toString()} ${record.symbol}`;
        }
        return '-';
      },
    },
    {
      title: 'Debt Ratio',
      dataIndex: 'debtRatio',
      align: 'left',
      width: '15%',
      render: (text, record) => {
        return `${calcDebtRatio(record.borrowAmount, record.supplyAmount).toFixed(2)}%`;
      },
    },
    columns[2],
  ];

  const tableList = useMemo<any[]>(() => {
    // merge same currency
    if (isLending) {
      const _tableList: any = [];
      dapp.detailList.forEach((it: any) => {
        // Supply / Borrow
        const _type = it.type;
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
              totalUsd: Big(token.usd || 0),
            };
            if (_type === 'Supply') {
              cell.supplyAmount = Big(token.amount || 0);
            }
            if (_type === 'Borrow') {
              cell.borrowAmount = Big(token.amount || 0);
            }
            _tableList.push(cell);
          } else {
            if (_type === 'Supply') {
              _tableList[tokenIdx].supplyAmount = Big(_tableList[tokenIdx].supplyAmount).plus(token.amount || 0);
            }
            if (_type === 'Borrow') {
              _tableList[tokenIdx].borrowAmount = Big(_tableList[tokenIdx].borrowAmount).plus(token.amount || 0);
            }
            _tableList[tokenIdx].totalUsd = Big(_tableList[tokenIdx].totalUsd).plus(token.usd || 0);
          }
        });
      });
      return _tableList;
    }
    return dapp.detailList;
  }, [dapp, isLending]);

  const cardTotalUsd = formateValueWithThousandSeparatorAndFont(dapp.totalUsd, 2, false, {
    prefix: '$',
    isLTIntegerZero: true,
  });

  return (
    <StyledContainer style={style} id={`portfolioProtocolDetail-${dapp.chain_id}-${dapp.type}-${dapp.name}`}>
      <StyledHead>
        <DAppIconWithChain
          size="32px"
          icon={dappLogo}
          chainIcon={chainLogo}
        />
        <div className="name">{show_name}</div>
        <div className="category">{type}</div>
        <StyledManageButton href="/" target="_blank">
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
        <FlexTable columns={isLending ? LendingColumns : columns} list={tableList} />
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