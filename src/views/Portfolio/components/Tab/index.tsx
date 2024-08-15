import { memo, useMemo } from 'react';
import {
  PortfolioTabs,
  PortfolioTabContent,
  StyledTabItem,
  StyledPortfolioTabCursor,
  StyledPortfolioTabHead,
  StyledPortfolioTabBorder
} from './styles';

const Tab = ({ tab, setTab, children, tabs, tabsExtra }: any) => {

  const tabIndex = useMemo(() => {
    const idx = tabs.findIndex((_tab: any) => _tab.key === tab);
    return idx < 0 ? 0 : idx;
  }, [tab, tabs]);

  return (
    <PortfolioTabs>
      <StyledPortfolioTabBorder className={tabsExtra ? 'tab-flex' : ''}>
        <StyledPortfolioTabHead>
            {tabs.map((_tab: { key: string, title: string, bp?: string }) => {
              return (
                <StyledTabItem
                  key={_tab.key}
                  className={`${tab === _tab.key ? 'active' : ''}`}
                  data-bp={_tab?.bp}
                  onClick={() => {
                    setTab(_tab.key as 'Wallet' | 'Protocol' | 'Execution Records');
                  }}
                >
                  {_tab.title}
                </StyledTabItem>
              );
            })}
            <StyledPortfolioTabCursor
              animate={{
                x: tabIndex * 200,
              }}
              initial={{ x: 0 }}
            />
        </StyledPortfolioTabHead>
        { tabsExtra }
      </StyledPortfolioTabBorder>
      <PortfolioTabContent>{children}</PortfolioTabContent>
    </PortfolioTabs>
  );
};

export default memo(Tab);
