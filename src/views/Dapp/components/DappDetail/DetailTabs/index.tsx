import { AnimatePresence } from 'framer-motion';
import { router } from 'next/client';
import { useMemo, useState } from 'react';

import { ArrowLineIcon } from '@/components/Icons/ArrowLineIcon';
import { SupportedChains } from '@/config/all-in-one/chains';
import useAccount from '@/hooks/useAccount';
import type { Category } from '@/hooks/useAirdrop';
import useMyHistory from "@/views/Dapp/hooks/useMyHistory";

import { TABS } from '../config';
import Animate from './Animate';
import MyHistory from "./MyHistory";
import Overview from "./Overview";
import {
  StyledContainer,
  StyledPortfolioButton,
  StyledTab,
  StyledTabContainer,
  StyledTabIcon,
  StyledTabs,
  StyledTabsContent,
  StyledTabText} from './styles';

const DetailTabs = (props: Props) => {

  const [currTab, setCurrTab] = useState<string>(TABS[0].key);

  const { account } = useAccount();

  const {
    logo,
    category,
    overviewTitle,
    chain_id,
    default_chain_id,
    dapp_network = [],
  } = props;

  const {
    loading,
    historyList,
    pageTotal,
    pageIndex,
    fetchHistoryList,
    total
  } = useMyHistory({ category, id: props.id, chainId: chain_id });

  const isHistoryTab = (tab: string) => {
    return tab === TABS[1].key;
  }

  const isShowPortfolio = useMemo(() => {
    return !!chain_id && SupportedChains.map(item => item.chainId).includes(chain_id);
  }, [chain_id]);

  const onPortfolio = () => {
    router.push("/portfolio");
  }

  return (
    <StyledContainer>
      <StyledTabContainer>
        <StyledTabs className='history-tabs'>
          {
            TABS.map(item => (
              <StyledTab
                className='history-tab'
                key={item.key}
                data-bp={item?.bp}
                onClick={() => setCurrTab(item.key)}
              >

                <StyledTabText active={currTab === item.key}>
                  { isHistoryTab(item.key) && (<StyledTabIcon url={logo}/>)}
                  {item.label} { isHistoryTab(item.key) && (`(${total})`) }
                </StyledTabText>
              </StyledTab>
            ))
          }
        </StyledTabs>
        {
          account && isShowPortfolio && (<StyledPortfolioButton onClick={onPortfolio}>
            Portfolio
            <ArrowLineIcon />
          </StyledPortfolioButton>)
        }
      </StyledTabContainer>
      <StyledTabsContent>
        <AnimatePresence mode="wait">
          {
            currTab === TABS[0].key && (
              <Animate key="overview">
                <Overview
                  title={overviewTitle}
                  {...props}
                  chain_id={chain_id || default_chain_id}
                />
              </Animate>
            )
          }
          {
            currTab === TABS[1].key && (
              <Animate key="my-history">
                <MyHistory
                  category={category}
                  loading={loading}
                  historyList={historyList}
                  pageTotal={pageTotal}
                  pageIndex={pageIndex}
                  fetchHistoryList={fetchHistoryList}
                  chainIds={category === 'network' ? [chain_id] : dapp_network.map(item => item.chain_id)}
                />
              </Animate>
            )
          }
        </AnimatePresence>
      </StyledTabsContent>
    </StyledContainer>
  );
};

export default DetailTabs;

interface Props {
  name: string;
  logo: string;
  id: number;
  description: string;
  category: Category;
  overviewTitle: string;
  overviewShadow?: {
    icon?: string;
    color?: string;
  };
  chain_id?: number;
  default_chain_id?: number;
  dapp_network?: Record<string, any>[];
}