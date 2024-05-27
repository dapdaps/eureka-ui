import { memo } from 'react';
import { PortfolioTabs, PortfolioTabContent, PortfolioTabHead, StyledTabItem } from './styles';

const Tab = ({ tab, setTab, children, tabs }: any) => {
  return (
    <PortfolioTabs>
      <PortfolioTabHead>
        {tabs.map((_tab: { key: string, title: string }) => {
          return (
            <StyledTabItem
              key={_tab.key}
              className={`${tab === _tab.key ? 'active' : ''}`}
              onClick={() => {
                setTab(_tab.key as 'Wallet' | 'Protocol' | 'Execution Records');
              }}
            >
              {_tab.title}
            </StyledTabItem>
          );
        })}
      </PortfolioTabHead>
      <PortfolioTabContent>{ children }</PortfolioTabContent>
    </PortfolioTabs>
  );
};

export default memo(Tab);
