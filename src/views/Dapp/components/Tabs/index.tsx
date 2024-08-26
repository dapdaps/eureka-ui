import {
  StyledContainer,
  StyledTabs,
  StyledTabsContent,
  StyledTabsContentItem,
  StyledTabsHead,
  StyledTabsHeadItem,
} from './styles';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { StyledFlex } from '@/styled/styles';

const DAppTabs = (props: Props) => {
  const { tabs = [], ...restProps } = props;
  const [currentTab, setCurrentTab] = useState<Tab>(tabs[0]);

  const handleTab = (tab: Tab) => {
    setCurrentTab(tab);
  };

  return (
    <StyledContainer>
      <StyledTabs>
        <StyledFlex>
          <StyledTabsHead>
            {
              tabs.map((tab) => (
                <StyledTabsHeadItem
                  key={tab.key}
                  onClick={() => handleTab(tab)}
                  className={currentTab.key === tab.key ? 'active' : ''}
                >
                  {tab.name}
                </StyledTabsHeadItem>
              ))
            }
          </StyledTabsHead>
        </StyledFlex>
        <StyledTabsContent>
          <AnimatePresence mode="wait">
            {
              tabs.map((tab) => (
                <StyledTabsContentItem
                  key={tab.key}
                  variants={{
                    visible: {
                      opacity: 1,
                      display: 'flex',
                      y: 0,
                    },
                    hidden: {
                      opacity: 0,
                      display: 'none',
                      y: 5,
                    },
                  }}
                  animate={currentTab.key === tab.key ? 'visible' : 'hidden'}
                  initial="hidden"
                  exit="hidden"
                >
                  <tab.content {...restProps} />
                </StyledTabsContentItem>
              ))
            }
          </AnimatePresence>
        </StyledTabsContent>
      </StyledTabs>
    </StyledContainer>
  );
};

export default DAppTabs;

interface Props {
  tabs: Tab[];

  [k: string]: any;
}

export interface Tab {
  key: number;
  name: string;
  content: any;
}
