import React, { useState } from 'react';
import styled from 'styled-components';

export enum Tab {
  All = 'All',
  Live = 'Live',
  Ended = 'Ended',
}

const tabs = [Tab.All, Tab.Live, Tab.Ended];

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
  width: 60px;
  height: 30px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s, color 0.3s;
`;

const ToggleTab = ({
    onClick
}: {
  onClick?: (tab: Tab) => void;
}) => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.All);

  return (
    <Container>
      {tabs.map((tab) => (
        <StyledTab
          key={tab}
          active={activeTab === tab}
          onClick={() => {
            onClick?.(tab)
            setActiveTab(tab)
          }}
        >
          {tab}
        </StyledTab>
      ))}
    </Container>
  );
};

export default ToggleTab;
