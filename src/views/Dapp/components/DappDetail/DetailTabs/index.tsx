import { useState } from "react";
import {
  StyledContainer,
  StyledTabs,
  StyledTab,
  StyledTabsContent,
  StyledTabContainer, StyledTabText,
} from './styles';
import {TABS, MyHistoryTab } from "../config";
import MyHistory from "./MyHistory";
import Overview from "./Overview";
import { AnimatePresence } from 'framer-motion';
import Animate from './Animate';

const DetailTabs = ({ activity, loading, name, description }: any) => {

  const [currTab, setCurrTab] = useState<string>(TABS[0].key);

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
                  {item.label}
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
                <Overview name={name} description={description} />
              </Animate>
            )
          }
          {
            currTab === MyHistoryTab.key && (
              <Animate key="my-history">
                <MyHistory list={[]} loading={false}/>
              </Animate>
            )
          }
        </AnimatePresence>
      </StyledTabsContent>
    </StyledContainer>
  );
};

export default DetailTabs;