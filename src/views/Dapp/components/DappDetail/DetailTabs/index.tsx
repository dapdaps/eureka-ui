import { useState } from "react";
import {
  StyledContainer,
  StyledTabs,
  StyledTab,
  StyledTabsContent,
  StyledTabContainer,
} from './styles';
import {TABS, MyHistoryTab } from "../config";
import MyHistory from "./MyHistory";
import Overview from "./Overview";

const DetailTabs = ({ activity, loading, name, description }: any) => {

  const [currTab, setCurrTab] = useState<string>(TABS[0].key);

  return (<StyledContainer>
    <StyledTabContainer>
      <StyledTabs className='history-tabs'>
        {
          TABS.map(item => (
            <StyledTab
              className='history-tab'
              key={item.key}
              onClick={() => setCurrTab(item.key)}
              active={currTab === item.key}
            >
              {item.label}
            </StyledTab>
          ))
        }
      </StyledTabs>
    </StyledTabContainer>
    <StyledTabsContent>
      {
        currTab === TABS[0].key && (<Overview name={name} description={description} />)
      }
      {
        currTab === MyHistoryTab.key && <MyHistory list={[]} loading={false}/>
      }
    </StyledTabsContent>


  </StyledContainer>);
};

export default DetailTabs;