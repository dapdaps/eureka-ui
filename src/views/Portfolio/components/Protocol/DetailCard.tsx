import { styled } from 'styled-components';

import { StyledFlex } from '@/styled/styles';
import { formateValueWithThousandSeparator, formateValueWithThousandSeparatorAndFont } from '@/utils/formate';
import FlexTable from '@/views/Portfolio/components/FlexTable';
import type { Column } from '@/views/Portfolio/components/FlexTable/styles';
import DAppIconWithChain from '@/views/Portfolio/components/Protocol/DAppIconWithChain';

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
  background: #EBF479;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-left: 6px;
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
            <StyledIcon src={record.icon} />
            {record.name}
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
    },
    {
      title: 'Value',
      dataIndex: 'value',
      align: 'left',
      render: (text, record) => {
        return `$${formateValueWithThousandSeparator(record.value, 2)}`;
      },
    },
  ];

  const tableList = [
    {
      key: 1,
      name: 'WETH',
      price: '1234.7645',
      amount: '1234.7645',
      value: '1234.7645',
    },
  ];

  return (
    <StyledContainer style={style}>
      <StyledHead>
        <DAppIconWithChain
          size="32px"
          icon={dapp.icon}
          chainIcon={undefined}
        />
        <div className="name">{dapp.name}</div>
        <div className="category">{dapp.category}</div>
        <StyledManageButton>
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
          ${formateValueWithThousandSeparatorAndFont(188.03, 2).integer}
          <span className="sm">{formateValueWithThousandSeparatorAndFont(188.03, 2).decimal}</span>
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
