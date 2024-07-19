import { styled } from 'styled-components';

import { StyledFlex } from '@/styled/styles';
import { formateValueWithThousandSeparator, formateValueWithThousandSeparatorAndFont } from '@/utils/formate';
import FlexTable from '@/views/Portfolio/components/FlexTable';
import type { Column } from '@/views/Portfolio/components/FlexTable/styles';
import DAppIconWithChain from '@/views/Portfolio/components/Protocol/DAppIconWithChain';
import { useMemo } from 'react';
import { getTokenLogo } from '@/views/Portfolio/helpers';

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

  const columns: Column[] = [
    {
      title: 'Pool',
      dataIndex: 'pool',
      align: 'left',
      render: (text, record) => {
        if (!record.assets) {
          return null;
        }
        return (
          <StyledFlex gap="14px" alignItems="center" style={{ color: '#fff', fontSize: 14 }}>
            <StyledFlex alignItems="center" style={{ color: '#fff', fontSize: 14 }}>
              {
                record.assets.map((token: any, idx: number) => (
                  <StyledIcon key={idx} src={getTokenLogo(token.symbol)} />
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
      width: '300px',
      render: (text, record) => {
        if (!record.assets) {
          return null;
        }
        return `${record.assets[0].amount} ${record.assets[0].symbol}`;
      },
    },
    {
      title: 'Value',
      dataIndex: 'value',
      align: 'right',
      width: '150px',
      render: (text, record) => {
        return `$${formateValueWithThousandSeparator(record.totalUsd, 2)}`;
      },
    },
  ];

  const tableList = useMemo<any[]>(() => {
    return dapp.detailList;
  }, [dapp]);

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
          ${formateValueWithThousandSeparatorAndFont(dapp.totalUsd, 2).integer}
          <span className="sm">{formateValueWithThousandSeparatorAndFont(dapp.totalUsd, 2).decimal}</span>
        </div>
      </StyledHead>
      <StyledContent>
        <FlexTable columns={columns} list={tableList} />
      </StyledContent>
      <StyledFoot></StyledFoot>
    </StyledContainer>
  );
};

export default DetailCard;
