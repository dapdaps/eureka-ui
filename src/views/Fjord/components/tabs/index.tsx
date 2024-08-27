import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import { TabsHead, TabsItem } from './style.tabs';

interface IProps {
  tabData: {
    name: string;
    key: string;
  }[];
  loading?: boolean;
  onTabsChange?: (key: "TradeHistory" | "YourTrades") => void;
  current?: string;
  style?: any;
}

const Tabbar: FC<IProps> = ({ tabData, current, loading, onTabsChange, style }) => {
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
              color: item.key === currentTab ? 'white' : '#979ABE',
            }}
            key={item.key}
            onClick={() => !loading && tabchange(item)}
          >
            {item.name}
          </TabsItem>
        );
      })}
    </TabsHead>
  );
};

export default Tabbar;
