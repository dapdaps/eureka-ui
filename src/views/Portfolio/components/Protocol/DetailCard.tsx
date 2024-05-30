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
`;

const DetailCard = (props: any) => {
  const { dapp, style } = props;

  const columns: Column[] = [
    {
      title: 'Pool',
      dataIndex: 'pool',
      align: 'left',
      render: (text, record) => {
        return (
          <StyledFlex gap="14px" alignItems="center" style={{ color: '#fff', fontSize: 14 }}>
            <StyledIcon src={getTokenLogo(record.symbol)} />
            {record.symbol}
          </StyledFlex>
        );
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      align: 'left',
      render: (text, record) => {
        return `$${formateValueWithThousandSeparator(record.price, 2)}`;
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      align: 'left',
      render: (text, record) => {
        return `${record.amount} ${record.symbol}`;
      },
    },
    {
      title: 'Value',
      dataIndex: 'value',
      align: 'left',
      render: (text, record) => {
        return `$${formateValueWithThousandSeparator(record.usd, 2)}`;
      },
    },
  ];

  const tableList = useMemo<any[]>(() => {
    const list: any[] = [];
    // sub type, such as borrow, supply
    dapp.assets.forEach((assetType: any) => {
      assetType.assets.forEach((assetItem: any) => {
        assetItem.assets.forEach((asset: any) => {
          list.push(asset);
        });
      });
    });

    return list;
  }, [dapp]);

  return (
    <StyledContainer style={style}>
      <StyledHead>
        <DAppIconWithChain
          size="32px"
          icon={dapp.icon}
          chainIcon={dapp.chainIcon}
        />
        <div className="name">{dapp.name}</div>
        <div className="category">{dapp.category}</div>
        <StyledManageButton href="/" target="_blank">
          Manage
          <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 5.5H14M14 5.5L8.96774 1M14 5.5L8.96774 10"
              stroke="black"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </StyledManageButton>
        <div className="summary">
          ${formateValueWithThousandSeparatorAndFont(dapp.usd, 2).integer}
          <span className="sm">{formateValueWithThousandSeparatorAndFont(dapp.usd, 2).decimal}</span>
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
