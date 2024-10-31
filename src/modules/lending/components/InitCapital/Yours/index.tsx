import { memo, useState } from 'react';
import styled from 'styled-components';

import { StyledFlex, StyledFont } from '@/styled/styles';
import { formatValueDecimal } from '@/utils/formate';

import { StyledContainer } from '../styles';
import Detail from './components/Detail';
import List from './components/List';
const StyledAsset = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
`;
export default memo(function Yours(props: any) {
  const { markets, dexConfig } = props;
  const [updater, setUpdater] = useState(0);
  const COLUMNS = [
    {
      key: 'Asset',
      label: 'Asset',
      width: '20%',
      render(data: any, _, index: number) {
        const underlyingToken = markets?.[data?.underlyingAddress]?.underlyingToken;
        const borrowToken = markets?.[data?.borrowAddress]?.underlyingToken;
        return (
          <StyledFlex gap="10px">
            <StyledFont color="#FFF" fontSize="16px" fontWeight="500">
              #{data?.index + 1}
            </StyledFont>
            <StyledFlex>
              <StyledAsset src={underlyingToken?.icon} alt={underlyingToken?.symbol} />
              {borrowToken && underlyingToken.symbol !== borrowToken.symbol && (
                <StyledAsset src={borrowToken?.icon} style={{ marginLeft: -8 }} />
              )}
            </StyledFlex>
            <StyledFont color="#FFF" fontSize="16px" fontWeight="500">
              {underlyingToken?.symbol}
            </StyledFont>
          </StyledFlex>
        );
      }
    },
    {
      key: 'healthFactor',
      label: 'Health Factor',
      width: '20%',
      render(data: any) {
        return <StyledFont color="#FFF">Health Factor</StyledFont>;
      }
    },
    {
      key: 'netApy',
      label: 'Net APY',
      width: '20%',
      render(data: any) {
        return <StyledFont color="#FFF">Net APY</StyledFont>;
      }
    },
    {
      key: 'deposit',
      label: 'Deposit',
      width: '20%',
      render(data: any) {
        return <StyledFont color="#FFF">{formatValueDecimal(data?.amount, '$', 2)}</StyledFont>;
      }
    },
    {
      key: 'borrow',
      label: 'Borrow',
      width: '18%',
      render(data: any) {
        return <StyledFont color="#FFF">{formatValueDecimal(data?.borrowAmount, '$', 2)}</StyledFont>;
      }
    },
    {
      key: 'handler',
      width: '2%'
    }
  ];

  const [checkedRecord, setCheckedRecord] = useState<any>(null);
  const handleClick = (record) => {
    setCheckedRecord(record);
  };
  return (
    <StyledContainer>
      {checkedRecord ? (
        <Detail {...{ ...props, record: checkedRecord, onBack: () => setCheckedRecord(null) }} />
      ) : (
        <List {...{ ...props, onClick: handleClick }} />
      )}
    </StyledContainer>
  );
});
