import type { CSSProperties, FC } from 'react';
import React, { memo, useState } from 'react';
import styled from 'styled-components';

interface IProps {
  items: any;
  defaultTab: string;
  className?: string;
  style?: CSSProperties;
  onClick: (name: string) => void;
}

export const StyledTabs = styled.div`
  border-bottom: 1px solid #3F3F3F;
  display: flex;
  justify-content: center;
  margin: 45px 0 0;
`;
export const TabHead = styled.div`
  display: flex;
  align-items: center;
  padding: 0 35px;
  gap: 55px;
  .item {
    padding: 11px 4px;
    color: #828282;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    text-transform: uppercase;
    &.active {
      color: #fff;
      border-bottom: 2px solid #fff;
    }
  }
`;


const Tabs: FC<IProps> = ({ items, onClick, defaultTab }) => {
  const [curTab, setCurTab] = useState(defaultTab);

const handleClick = (item: any) => {
    setCurTab(item)
    onClick(item)
}

  return (
    <StyledTabs>
      <TabHead>
        {items.map((item: any) => (
          <div
            key={item}
            className={`${curTab === item ? 'active' : ''} item`}
            onClick={() => handleClick(item)}
          >
            {item}
          </div>
        ))}
      </TabHead>
    </StyledTabs>
  );
};

export default memo(Tabs);
