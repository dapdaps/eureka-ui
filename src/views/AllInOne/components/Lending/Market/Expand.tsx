import IconTip from '@public/images/alldapps/icon-tip.svg';
import React, { useMemo } from 'react';

import type { ActionType } from '@/views/AllInOne/components/Lending/LendingDialog/Action';
import {
  StyledExtraInfo,
  StyledExtraInfoItem,
  StyledExtraInfoTab,
  StyledInfoTip,
  StyledListBlock,
  StyledListItem,
  StyledListLabel,
  StyledListTitle
} from '@/views/AllInOne/components/Lending/Market/styles';

const Expand = (props: Props) => {
  const { currentTab, onTabChange, tabList = [], info } = props;

  const YourInfoList = useMemo(() => {
    if (typeof info === 'object') {
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
      ];
    }
    return [];
  }, [info]);

  return (
    <StyledExtraInfo>
      <StyledExtraInfoItem style={{ justifyContent: info ? 'flex-start' : 'center' }}>
        <div className="merge-asset" />
        <>
          {tabList.map((item) => (
            <StyledExtraInfoTab
              key={item.key}
              className={item.key === currentTab ? 'active' : ''}
              onClick={() => onTabChange(item.key)}
              style={{ borderRightWidth: tabList.length > 1 ? 1 : 0 }}
            >
              {item.label}
            </StyledExtraInfoTab>
          ))}
        </>
      </StyledExtraInfoItem>
      <StyledExtraInfoItem>
        {info && (
          <StyledListBlock className="merge-asset">
            <StyledListTitle>Your Info</StyledListTitle>
            {YourInfoList.map((y) => (
              <StyledListItem key={y.key}>
                <StyledListLabel>{y.label}</StyledListLabel>
                <StyledListLabel>{y.value}</StyledListLabel>
              </StyledListItem>
            ))}
            <StyledInfoTip>
              <IconTip className="tip-icon" />
              <div className="tip-text">To borrow you need to supply any asset to be used as collateral.</div>
            </StyledInfoTip>
          </StyledListBlock>
        )}
        {props.children}
      </StyledExtraInfoItem>
    </StyledExtraInfo>
  );
};

export default Expand;

interface Props {
  children?: React.ReactNode;
  currentTab: ActionType;
  tabList: {
    key: ActionType;
    label: string;
  }[];
  onTabChange: (tab: ActionType) => void;
  info:
    | {
        supply: string;
        borrow: string;
        limit: string;
      }
    | boolean;
}
