import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import { TabsHead, TabsItem } from './style.tabs';

interface IProps {
  tabData: {
    name: string;
    key: string;
  }[];
  onTabsChange?: (key: string) => void;
  current?: string;
  style?: any;
}

const Tabbar: FC<IProps> = ({ tabData, current, onTabsChange, style }) => {
  const [currentTab, setCurrentTab] = useState('test');
  const tabchange = (item: any) => {
    setCurrentTab(item.key);
    onTabsChange?.(item.key);
  };
  useEffect(() => {
    setCurrentTab(current || tabData[0].key);
  }, [current]);

  return (
    <TabsHead style={{ ...style }}>
      {tabData.map((item: any) => {
        return (
          <TabsItem
            style={{
              background: item.key === currentTab ? '#3D4159' : 'none',
            }}
            key={item.key}
            onClick={() => tabchange(item)}
          >
            {item.name}
          </TabsItem>
        );
      })}
    </TabsHead>
  );
};

export default Tabbar;
