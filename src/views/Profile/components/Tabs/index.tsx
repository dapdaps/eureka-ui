import { memo, useRef } from 'react';

import type { Tab } from '../../types';
import RectangleNumber from '../RectangleNumber';
import {
  StyledTab,
  StyledTabs,
  StyledTabWrap
} from './styles';

const TABS: { name: string; key: Tab; bp: string }[] = [
  {
    name: 'In Progress',
    key: 'InProgress',
    bp: "1009-002"
  },
  {
    name: 'Favorite Apps',
    key: 'FavoriteApps',
    bp: "1009-002"
  },
  {
    name: 'Reward History',
    key: 'RewardHistory',
    bp: "1009-004"
  },
];

const Tabs = ({ current, tabsQuantity, onChange, }: { current: Tab; tabsQuantity: number[], onChange: (tab: Tab) => void }) => {
  const index = useRef<number>(0);
  return (
    <StyledTabs>
      {TABS.map((tab, i) => (
        <StyledTabWrap
          key={tab.key}
          $active={current === tab.key}
          data-bp={tab.bp}
          onClick={() => {
            index.current = TABS.findIndex((tab) => tab.key === current);
            onChange(tab.key);
          }}
        >
          <StyledTab >{tab.name}</StyledTab>
          <RectangleNumber quantity={tabsQuantity[i]} />
        </StyledTabWrap>
      ))}
    </StyledTabs>
  );
};

export default memo(Tabs);
