import { memo, useRef } from 'react';

import type { Tab } from '../../types';
import RectangleNumber from '../RectangleNumber';
import {
  StyledTab,
  StyledTabs,
  StyledTabWrap
} from './styles';

const TABS: { name: string; key: Tab }[] = [
  {
    name: 'In Progress',
    key: 'InProgress',
  },
  {
    name: 'Favorite Apps',
    key: 'FavoriteApps',
  },
  {
    name: 'Reward History',
    key: 'RewardHistory',
  },
];

const Tabs = ({ current, onChange }: { current: Tab; onChange: (tab: Tab) => void }) => {
  const index = useRef<number>(0);
  return (
    <StyledTabs>
      {TABS.map((tab, i) => (
        <StyledTabWrap
          key={tab.key}
          $active={current === tab.key}
          onClick={() => {
            index.current = TABS.findIndex((tab) => tab.key === current);
            onChange(tab.key);
          }}
        >
          <StyledTab >{tab.name}</StyledTab>
          <RectangleNumber quantity={12} />
        </StyledTabWrap>
      ))}
    </StyledTabs>
  );
};

export default memo(Tabs);
