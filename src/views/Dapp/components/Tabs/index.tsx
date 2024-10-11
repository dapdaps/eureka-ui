import { AnimatePresence } from 'framer-motion';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { Suspense, useEffect, useState } from 'react';

import { StyledFlex } from '@/styled/styles';

import {
  StyledContainer,
  StyledTabs,
  StyledTabsContent,
  StyledTabsContentItem,
  StyledTabsHead,
  StyledTabsHeadItem
} from './styles';

const DAppTabs = (props: Props) => {
  const { tabs = [] } = props;
  const params = useSearchParams();
  const pathname = usePathname();
  const defaultTab = params.get('tab') || 'dex';
  const router = useRouter();

  const handleTab = (tab: Tab) => {
    const searchParams = new URLSearchParams(params);
    searchParams.set('tab', tab.name.toLowerCase());
    router.replace(`${pathname}${!searchParams.toString() ? '' : '?' + searchParams.toString()}`, undefined, {
      scroll: false
    });
  };

  return (
    <StyledContainer>
      <StyledTabs>
        <StyledFlex>
          <StyledTabsHead>
            {tabs.map((tab) => (
              <StyledTabsHeadItem
                key={tab.key}
                onClick={() => handleTab(tab)}
                className={defaultTab === tab.name.toLowerCase() ? 'active' : ''}
              >
                {tab.name}
              </StyledTabsHeadItem>
            ))}
          </StyledTabsHead>
        </StyledFlex>
        <StyledTabsContent>
          <AnimatePresence mode="wait">
            {tabs.map((tab) => (
              <StyledTabsContentItem
                key={tab.key}
                variants={{
                  visible: {
                    opacity: 1,
                    display: 'flex',
                    y: 0
                  },
                  hidden: {
                    opacity: 0,
                    display: 'none',
                    y: 5
                  }
                }}
                animate={defaultTab === tab.name.toLowerCase() ? 'visible' : 'hidden'}
                initial="hidden"
                exit="hidden"
              >
                <Suspense fallback={<div />}>{tab.content}</Suspense>
              </StyledTabsContentItem>
            ))}
          </AnimatePresence>
        </StyledTabsContent>
      </StyledTabs>
    </StyledContainer>
  );
};

export default DAppTabs;

interface Props {
  tabs: Tab[];
}

export interface Tab {
  key: number;
  name: string;
  content: any;
}
