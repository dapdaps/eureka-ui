import {
  StyledCardContainer,
  StyledCardHead,
  StyledData,
  StyledDataItem,
  StyledItemLabel,
  StyledItemValue,
  Btn,
  StyledBtnGroup,
  StyledReward
} from '../styles';
import React, { FC } from 'react';
import { IProps } from '@/views/networks/list/components/list-item';
import { CardHead, DataListShown } from '@/views/networks/list/components/utils';
import Reward from '@/views/networks/list/components/reward';
import popupsData, { IdToPath } from '@/config/all-in-one/chains';

export const ListCard: FC<IProps> = ({ dataSource }) => {
  const {
    id,
    chain_id,
    odyssey,
  } = dataSource;

  const popupsDataArray = Object.values(popupsData);
  const matchedItem = popupsDataArray.find((item) => item.chainId === chain_id);
  const path = matchedItem ? matchedItem.path : '';

  return (
    <StyledCardContainer className='card-shadow' $bgColor={matchedItem?.theme.button.bg ?? '#FDFE03'} key={id}>
      <StyledCardHead>
       <CardHead { ...dataSource } classname='card-head'/>
      </StyledCardHead>
      <StyledData>
        {
          DataListShown({
           ...dataSource,
            medals: 0,
            classname: 'list-card-data'
          }).map((item) => (
            <StyledDataItem key={item.key}>
              <StyledItemLabel>{item.label}</StyledItemLabel>
              <StyledItemValue $underline={item.underline}>{item.value}</StyledItemValue>
            </StyledDataItem>))
        }
      </StyledData>
      <StyledReward>
        <StyledItemLabel>Campaign Reward</StyledItemLabel>
        {
          odyssey && odyssey.length > 0 ? (
            <Reward odyssey={odyssey} />
          ) : (
            <StyledItemValue className='gray-text'>-</StyledItemValue>
          )
        }
      </StyledReward>
      <StyledBtnGroup>
        <Btn href={`/networks/${IdToPath[id]}`} data-bp="10012-002">
          Details
        </Btn>
        <Btn href={`/all-in-one/${path}`} data-bp="10012-003" className="allinone-btn"
             $bgColor={matchedItem?.theme.button.bg} $color={matchedItem?.theme.button.text}>
          All-In-One
        </Btn>
      </StyledBtnGroup>
    </StyledCardContainer>
  );
};

export default ListCard;