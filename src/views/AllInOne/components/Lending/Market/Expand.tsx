import IconTip from '@public/images/alldapps/icon-tip.svg';
import React, { useMemo, useState } from 'react';

import {
  StyledExtraInfo,
  StyledExtraInfoItem,
  StyledExtraInfoTab,
  StyledInfoTip,
  StyledListBlock,
  StyledListItem,
  StyledListLabel,
  StyledListTitle} from '@/views/AllInOne/components/Lending/Market/styles';


const Expand = (props: Props) => {

  const {
    currentTab,
    onTabChange,
    tabList = [],
    info
  } = props;

  const YourInfoList = useMemo(() => {

    return [
      {
        key: 'Limit',
        label: 'Your Borrow Limit',
        value: info.limit
      },
      {
        key: 'Supply',
        label: 'Available to Supply',
        value: info.supply
      },
      {
        key: 'Borrow',
        label: 'Available to Borrow',
        value: info.borrow
      }
    ]
  }, [info])

  return (
    <StyledExtraInfo>
      <StyledExtraInfoItem>
        <div className="merge-asset" />
        <>
          {
            tabList.map((item) => (
              <StyledExtraInfoTab
                key={item.key}
                className={item.key === currentTab ? 'active' : ''}
                onClick={() => onTabChange(item.key)}
              >
                { item.label }
              </StyledExtraInfoTab>
            ))
          }
        </>
      </StyledExtraInfoItem>
      <StyledExtraInfoItem>
        <StyledListBlock className="merge-asset">
          <StyledListTitle>Your Info</StyledListTitle>
          {
            YourInfoList.map(y => (
              <StyledListItem key={y.key}>
                <StyledListLabel>{y.label}</StyledListLabel>
                <StyledListLabel>{y.value}</StyledListLabel>
              </StyledListItem>
            ))
          }
          <StyledInfoTip>
            <IconTip className='tip-icon'/>
            <div className='tip-text'>To borrow you need to supply any asset to be used as collateral.</div>
          </StyledInfoTip>
        </StyledListBlock>
        {props.children}
      </StyledExtraInfoItem>
    </StyledExtraInfo>
  )
};

export default Expand;


interface Props {
  children?: React.ReactNode;
  currentTab: string;
  tabList: {
    key: string;
    label: string;
  }[];
  onTabChange: (tab: string) => void;
  info: {
    supply: string;
    borrow: string;
    limit: string;
  }
}