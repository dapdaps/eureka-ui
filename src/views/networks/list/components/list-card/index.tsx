import React, { type FC } from 'react';

import popupsData from '@/config/all-in-one/chains';
import { type IProps } from '@/views/networks/list/components/list-item';
import Reward from '@/views/networks/list/components/reward';
import { CardHead, DataListShown, FooterButton } from '@/views/networks/list/components/utils';

import {
  StyledBtnGroup,
  StyledCardContainer,
  StyledCardHead,
  StyledData,
  StyledDataItem,
  StyledItemLabel,
  StyledItemValue,
  StyledReward
} from '../styles';

export const ListCard: FC<IProps> = ({ dataSource }) => {
  const { id, chain_id, odyssey } = dataSource;

  const popupsDataArray = Object.values(popupsData);
  const matchedItem = popupsDataArray.find((item) => item.chainId === chain_id);
  const path = matchedItem ? matchedItem.path : '';

  return (
    <StyledCardContainer className="card-shadow" $bgColor={matchedItem?.theme.button.bg ?? '#FDFE03'} key={id}>
      <StyledCardHead>
        <CardHead {...dataSource} classname="card-head" />
      </StyledCardHead>
      <StyledData>
        {DataListShown({
          ...dataSource,
          // TODO medals hidden
          total_medal: undefined,
          classname: 'list-card-data'
        }).map((item) => (
          <StyledDataItem key={item.key}>
            <StyledItemLabel>{item.label}</StyledItemLabel>
            <StyledItemValue $underline={item.underline}>{item.value}</StyledItemValue>
          </StyledDataItem>
        ))}
      </StyledData>
      <StyledReward>
        <StyledItemLabel>DapDap Exclusive Rewards</StyledItemLabel>
        {odyssey && odyssey.length > 0 ? (
          <Reward odyssey={odyssey} />
        ) : (
          <StyledItemValue className="gray-text">-</StyledItemValue>
        )}
      </StyledReward>
      <StyledBtnGroup>
        <FooterButton
          bgColor={matchedItem?.theme.button.bg}
          textColor={matchedItem?.theme.button.text}
          path={path}
          id={id}
        />
      </StyledBtnGroup>
    </StyledCardContainer>
  );
};

export default ListCard;
