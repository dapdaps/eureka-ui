import { useState } from "react";
import {
  StyledContainer,
  StyledTabs,
  StyledTab,
  StyledTabsContent,
  StyledTabContainer,
  StyledTabText,
  StyledTabIcon
} from './styles';
import {TABS } from "../config";
import MyHistory from "./MyHistory";
import Overview from "./Overview";
import { AnimatePresence } from 'framer-motion';
import Animate from './Animate';
import useMyHistory from "@/views/Dapp/hooks/useMyHistory";

const DetailTabs = (props: Props) => {

  const [currTab, setCurrTab] = useState<string>(TABS[0].key);

  const {
    logo,
    historyType,
    overviewTitle,
    chain_id
  } = props;

  const {
    loading,
    historyList,
    pageTotal,
    pageIndex,
    fetchHistoryList,
    total
  } = useMyHistory(chain_id);

  const isHistoryTab = (tab: string) => {
    return tab === TABS[1].key;
  }

  console.log(props);
  return (
    <StyledContainer>
      <StyledTabContainer>
        <StyledTabs className='history-tabs'>
          {
            TABS.map(item => (
              <StyledTab
                className='history-tab'
                key={item.key}
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
      </StyledTabContainer>
      <StyledTabsContent>
        <AnimatePresence mode="wait">
          {
            currTab === TABS[0].key && (
              <Animate key="overview">
                <Overview title={overviewTitle} {...props} />
              </Animate>
            )
          }
          {
            currTab === TABS[1].key && (
              <Animate key="my-history">
                <MyHistory
                  type={historyType}
                  loading={loading}
                  historyList={historyList}
                  pageTotal={pageTotal}
                  pageIndex={pageIndex}
                  fetchHistoryList={fetchHistoryList}
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
  description: string;
  historyType: 'dApp' | 'chain';
  overviewTitle: string;
  overviewShadow?: {
    icon?: string;
    color?: string;
  };
  chain_id?: number;
}