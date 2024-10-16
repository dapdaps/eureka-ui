import React, { useState } from 'react';
import styled from 'styled-components';

export enum Tab {
  All = 'All',
  Live = 'Live',
  Ended = 'Ended'
}

const Container = styled.div`
  display: flex;
  background-color: #101115;
  border-radius: 10px;
  overflow: hidden;
  width: fit-content;
  padding: 3px;
`;

const StyledTab = styled.button<{ active: boolean }>`
  background-color: ${({ active }) => (active ? '#21222B' : 'transparent')};
  color: ${({ active }) => (active ? '#fff' : '#979ABE')};
  border: none;
  min-width: 60px;
  height: 30px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition:
    background-color 0.1s,
    color 0.1s;
`;

interface ToggleTabProps<T extends string = Tab> {
  tabs?: readonly T[];
  onClick?: (tab: T) => void;
  className?: string;
}

function ToggleTab<T extends string = Tab>({
  tabs = Object.values(Tab) as unknown as readonly T[],
  onClick,
  className
}: ToggleTabProps<T>) {
  const [activeTab, setActiveTab] = useState<T>(tabs[0]);

  return (
    <Container>
      {tabs.map((tab) => (
        <StyledTab
          key={tab}
          active={activeTab === tab}
          className={className}
          onClick={() => {
            onClick?.(tab);
            setActiveTab(tab);
          }}
        >
          {tab}
        </StyledTab>
      ))}
    </Container>
  );
}

export default ToggleTab;
