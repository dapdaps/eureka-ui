import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

import Empty from '@/components/Empty';
import Tooltip from '@/components/TitleTooltip';
import { CampaignData } from '@/data/campaign';
import { StyledFlex } from '@/styled/styles';
import RecentRewards from '@/views/Home/components/Rewards';

import useCompassList from '../Home/components/Compass/hooks/useCompassList';
import OdysseyChroma from './components/OdysseyChroma';
import ToggleTab, { Tab } from './components/Tabs';
import { StatusType } from './components/Tag';

const StyledWrapper = styled.div`
  --var-container-width: 1244px;
  position: relative;
  .section {
    padding-top: 123px;
    height: 670px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    gap: 40px;

    @media (max-width: 1440px) {
      .head {
        transform: scale(0.95);
      }
    }

    .head {
      transition: all 0.5s ease 0s;
      display: flex;
      flex-direction: column;
      align-items: center;
      .slogen {
        font-family: Montserrat;
        font-size: 46px;
        font-weight: 700;
        line-height: 46px;
        text-align: center;
        background: linear-gradient(90deg, #ffffff 0%, #979abe 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .title {
        color: #979abe;
        font-size: 20px;
        line-height: 30px;
        font-family: 'Montserrat';
      }
    }
  }
  .compass {
    width: 1244px;
    height: 405px;
  }
  .odyssey {
    padding: 55px 0;
    display: flex;
    width: var(--var-container-width);
    margin: 0 auto;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      .header-title {
        font-family: Montserrat;
        font-size: 32px;
        font-weight: 700;
        line-height: 32px;
        background: linear-gradient(90deg, #ffffff 0%, #979abe 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .all-odyssey-text {
        width: 194px;
        height: 32px;
      }
      .tab {
        width: 192px;
        height: 36px;
      }
    }
  }
  .odyssey-list {
    width: var(--var-container-width);
    margin: 0 auto;
    margin-top: 26px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    .odyssey-card {
      width: 405px;
      margin-bottom: 34px;
    }
  }
`;

const StyledContent = styled.div`
  position: relative;
  z-index: 1;
`;

const OdysseyChromaWrapper = styled.div`
  width: 100%;
  height: 745px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;

const StyleWrapSkeleton = styled.div`
  width: 1244px;
  height: 405px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const LoadingSkeleton = () => (
  <StyledWrapper>
    <div className="odyssey-card">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index}>
          <Skeleton height={405} borderRadius={12} style={{ marginBottom: '34px' }} />
        </div>
      ))}
    </div>
  </StyledWrapper>
);

const SwiperList = dynamic(() => import('./components/Swiper'), {
  loading: () => (
    <StyleWrapSkeleton>
      <Skeleton height={405} borderRadius={12} />
    </StyleWrapSkeleton>
  )
});

const OdysseyCard = dynamic(() => import('@/views/Dapp/components/DappDetail/RelativeOdyssey/Card'), {
  loading: () => <LoadingSkeleton />
});

const CampaignsTabs = ['All', 'Odyssey', 'DapDap Tales'];

const OdysseyList = () => {
  const { compassList } = useCompassList();
  const [statusTab, setStatusTab] = useState<any>(Tab.All);
  const [tab, setTab] = useState<any>(Tab.All);

  const filterConditions: any = {
    [Tab.All]: () => true,
    [Tab.Live]: (compass: any) => compass.status === StatusType.ongoing,
    [Tab.Ended]: (compass: any) => compass.status === StatusType.ended
  };

  // static campaign data
  const staticCampaignList: any = [];

  Object.values(CampaignData).forEach((campaign) => {
    if (!campaign.odyssey) return;
    campaign.odyssey.forEach((ody) => {
      if (
        !ody.superBridgeBanner ||
        ody.status !== StatusType.ongoing ||
        staticCampaignList.some((it: any) => it.id === ody.id)
      )
        return;
      ody.tag = 'tales';
      ody.mock = true; // mark as static campaign
      staticCampaignList.push(ody);
    });
  });

  const filteredAndCombinedList = useMemo(() => {
    if (compassList.length === 0 && staticCampaignList.length === 0) return [];

    const filteredCompassList = compassList.filter(filterConditions[statusTab]);
    const combined = [...staticCampaignList, ...filteredCompassList];

    return combined.filter((item) => {
      const statusCondition = filterConditions[statusTab](item);
      let campaignCondition = true;

      if (tab === 'Odyssey') {
        campaignCondition = item.tag !== 'tales';
      } else if (tab === 'DapDap Tales') {
        campaignCondition = item.tag === 'tales';
      }
      return statusCondition && campaignCondition;
    });
  }, [tab, statusTab, compassList, staticCampaignList]);

  return (
    <>
      <StyledWrapper>
        <StyledContent>
          <div className="section">
            <div className="head">
              <>
                <div className="slogen">CAMPAIGNS</div>
                {/* <Tooltip
                  sx={{ top: '-28px', left: '10px', zIndex: 11 }}
                  content="Embark on your Web3 Odyssey – where every action brings a chance to earn new rewards! Discover exciting missions across multiple networks, while exploring new dApps along the way. Farm optimised airdrop opportunities and earn a wide range of rewards as you navigate the ever-evolving DeFi landscape."
                /> */}
              </>
              <div className="title">Exclusive Seasonal Lootbox Experiences</div>
            </div>
            <div className="compass">
              <SwiperList />
            </div>
          </div>
          <RecentRewards
            isSubTitle={false}
            style={{
              height: 330,
              justifyContent: 'flex-start',
              paddingTop: 115
            }}
            titleStyle={{
              marginBottom: 10
            }}
          />
          <div className="odyssey">
            <div className="header">
              <span className="header-title">
                Campaigns {filteredAndCombinedList.length > 0 ? `(${filteredAndCombinedList.length})` : ''}
              </span>
              <div className="flex gap-3">
                <ToggleTab className="p-1" tabs={CampaignsTabs} onClick={(tab) => setTab(tab)} />
                <ToggleTab onClick={(tab) => setStatusTab(tab)} />
              </div>
            </div>
            {filteredAndCombinedList?.length > 0 ? (
              <div className="odyssey-list">
                {filteredAndCombinedList?.map((compass: any) => (
                  <OdysseyCard
                    className="odyssey-card"
                    key={compass.id}
                    id={compass.id}
                    bp="1004-001"
                    name={compass.name}
                    banner={compass.banner}
                    status={compass.status}
                    rewards={compass.reward}
                    volume={compass.trading_volume}
                    users={compass.total_users}
                    dapp_reward={compass.dapp_reward}
                    tag={compass.tag}
                    video={compass.video}
                    // {/* Todo: hide Medal  */}
                    // medals={[
                    //   { icon: '/images/medals/medal-mode-bow.svg', id: 1 },
                    // ]}
                  />
                ))}
              </div>
            ) : (
              <StyledFlex justifyContent="center" alignItems="center" style={{ width: '100%' }}>
                <Empty size={64} tips="No Data" />
              </StyledFlex>
            )}
          </div>
        </StyledContent>
        <OdysseyChromaWrapper>
          <OdysseyChroma />
        </OdysseyChromaWrapper>
      </StyledWrapper>
    </>
  );
};

export default OdysseyList;
