import { memo } from 'react';
import { PortfolioTabs } from './styles';

const Tab = ({ tab, setTab }: any) => {
  return (
    <PortfolioTabs>
      {['Wallet', 'Protocol', 'Execution Records'].map((_tab) => {
        const isActive = tab === _tab.toString();
        return (
          <div
            key={_tab}
            className={`item ${isActive ? 'active' : ''}`}
            onClick={() => {
              setTab(_tab as 'Wallet' | 'Protocol' | 'Execution Records');
            }}
          >
            {_tab}
            {isActive && <div className="active-bar" />}
          </div>
        );
      })}
    </PortfolioTabs>
  );
};

export default memo(Tab);
