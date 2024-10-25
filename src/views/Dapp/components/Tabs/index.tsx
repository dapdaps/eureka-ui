import { AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { Suspense, useMemo } from 'react';

import { PoolsDAppList } from '@/hooks/useDappInfo';
import { useUpdaterStore } from '@/stores/update';
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
  const { tabs = [], dapp } = props;
  const params = useSearchParams();

  const router = useRouter();
  const updateTab = useUpdaterStore((state) => state.updater);



  const defaultTab = useMemo(() => {
    const tabParam = params.get('tab');
    if (tabParam) return tabParam.toLowerCase();
    const currentDApp = PoolsDAppList.find((item) => dapp.route.startsWith(item.route));
    if (currentDApp) {
      return Object.keys(currentDApp.config)[0];
    }
    return 'dex';
  }, [params, dapp.route]);

  const handleTab = (tab: Tab) => {
    const queryString = dapp.route.split('?')[1];
    let queryParams = new URLSearchParams({});
    if (queryString) {
      queryParams = new URLSearchParams(queryString);
    }
    queryParams.set('tab', tab.name.toLowerCase());

    updateTab();
    router.replace(`/${dapp.route.split('?')[0]}?${queryParams.toString()}`, undefined, {
      scroll: false
    });
  };

  // xy-finance?tab=bridge/dex

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
                {defaultTab === tab.name.toLowerCase() ? <Suspense fallback={<div />}>{tab.content}</Suspense> : null}
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
  dapp: any;
  defaultTab?: string;
}

export interface Tab {
  key: number;
  name: string;
  content: any;
}
