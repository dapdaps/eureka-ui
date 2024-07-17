import type { CSSProperties, FC, ReactNode } from 'react';
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

interface IProps {
  items: any;
  className?: string;
  style?: CSSProperties;
}

export const StyledTabs = styled.div`
  width: 1200px;
  margin: 0 auto;
`;
export const TabHead = styled.div`
  display: flex;
  align-items: center;
  background-color: #272727;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  .item {
    padding: 14px 38px;
    color: #828282;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;
    &.active {
      color: #fff;
    }
  }
`;
export const TabBody = styled.div`
  .panel {
    display: none;
    min-height: 630px;
    background-color: #2f2f2f;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 30px;
    &.active {
      display: block;
    }
  }
`;

const Tabs: FC<IProps> = ({ items }) => {
  const [curTab, setCurTab] = useState(items[0].key);

  return (
    <StyledTabs>
      <TabHead>
        {items.map((item: any) => (
          <div
            key={item.key}
            className={`${curTab === item.key ? 'active' : ''} item`}
            onClick={() => setCurTab(item.key)}
          >
            {item.label}
          </div>
        ))}
      </TabHead>
      <TabBody>
        {items.map((item: any) => (
          <div key={item.key} className={`${curTab === item.key ? 'active' : ''}  panel`}>
            {item.children}
          </div>
        ))}
      </TabBody>
    </StyledTabs>
  );
};

export default memo(Tabs);
