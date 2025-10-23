import { motion } from 'framer-motion';
import { memo, useRef } from 'react';

import { StyledTab, StyledTabActiveBg, StyledTabIcon, StyledTabs, StyledTabWrap } from './styles';

export type Tab = 'Base Tokens' | 'Listed Tokens';
const TABS = [
  {
    name: 'Base Tokens',
    key: 'Base Tokens'
  },
  {
    name: 'Listed Tokens',
    key: 'Listed Tokens'
  }
];

const Tabs = ({ current, onChange }: { current: Tab; onChange: (tab: Tab) => void }) => {
  const index = useRef<number>(0);
  return (
    <StyledTabs $width={730} $mt={60}>
      {TABS.map((tab, i) => (
        <StyledTabWrap
          onClick={() => {
            index.current = TABS.findIndex((tab) => tab.key === current);
            onChange(tab.key as Tab);
          }}
          key={tab.key}
          data-bp="4001-002"
        >
          <StyledTab $active={current === tab.key}>
            <span>{tab.name}</span>
          </StyledTab>
          {current === tab.key && (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {
                  x: index.current > i ? '30%' : '-30%'
                },
                show: {
                  x: '0%',
                  transition: {
                    staggerChildren: 0.5
                  }
                }
              }}
            >
              <StyledTabActiveBg />
            </motion.div>
          )}
        </StyledTabWrap>
      ))}
    </StyledTabs>
  );
};

export default memo(Tabs);
