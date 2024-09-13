import AppleLogo from '@public/images/campaign/apple-logo.svg';
import GooglePlayLogo from '@public/images/campaign/google-play-logo.svg';
import React, { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';

import LazyImage from '@/components/LazyImage';
import { StyledFlex } from '@/styled/styles';
import { useCheck } from '@/views/Campaign/hooks/useCheck';
import useReport from '@/views/Campaign/hooks/useReport';
import type { Quest } from '@/views/Campaign/models';
import Button from '@/views/Campaign/RubicHoldstation/components/Button';
import Card from '@/views/Campaign/RubicHoldstation/components/Card';
import Refresh from '@/views/Campaign/RubicHoldstation/components/Refresh';
import Task from '@/views/Campaign/RubicHoldstation/components/Task';
import TicketBadge from '@/views/Campaign/RubicHoldstation/components/TicketBadge';
import RubicHoldstationContext from '@/views/Campaign/RubicHoldstation/context';

import {
  StyledContainer,
  StyledContent,
  StyledDesc,
  StyledDescItem,
  StyledDownload,
  StyledRight,
  StyledTitle,
  StyledTitleSub
} from './styles';

const Holdstation = () => {
  const context = useContext(RubicHoldstationContext);
  const { data, loading, updateData, getData } = context.quests;
  const { getData: getTicketsData } = context.tickets;

  const { checkCompleted, handleRefresh, refreshing } = useCheck();
  const { handleReport } = useReport();

  const twitterList: Quest[] = data.filter((it: Quest) => {
    return ['twitter_follow', 'twitter_retweet'].includes(it.category) && it.name.includes('@HoldstationW');
  });
  const downloadApp: Quest = data.find((it: Quest) => it.name === 'Download App');

  const onRefresh = () => {
    if (!context.account) {
      context.onAuthCheck();
      return;
    }
    if (!downloadApp || !checkCompleted(downloadApp)) return;
    handleRefresh(downloadApp, (resData) => {
      updateData(downloadApp.id, resData);
      // if (resData.total_spins > downloadApp.total_spins) {
      //   context.setNewTicketVisible(true);
      // }
      getTicketsData(true);
    });
  };

  const onDownload = async (type: 'apple' | 'google') => {
    if (!context.account) {
      context.onAuthCheck();
      return;
    }
    if (type === 'apple') {
      window.open('https://apps.apple.com/us/app/holdstation-web3-wallet/id6444925618', '_blank');
    }
    if (type === 'google') {
      window.open('https://play.google.com/store/apps/details?id=io.holdstation', '_blank');
    }

    const reportDone = await handleReport(downloadApp?.id);
    if (!reportDone) {
      getData(true);
    }
  };

  return (
    <StyledContainer>
      <StyledTitle>「Holdstation Hyperlink」</StyledTitle>
      <StyledTitleSub>Complete Mission to get tickets</StyledTitleSub>
      <StyledContent>
        {loading ? (
          <Skeleton width={1000} height={371} borderRadius={20} />
        ) : (
          <Card style={{ padding: '30px 20px 0 30px' }}>
            <StyledFlex justifyContent="space-between" alignItems="flex-start" gap="38px">
              <LazyImage src="/images/campaign/holdstation-bg.png" width={464} height={339} />
              <StyledRight>
                <StyledFlex justifyContent="flex-end" alignItems="flex-start" gap="10px">
                  <TicketBadge amount={downloadApp?.total_spins}></TicketBadge>
                  <Refresh onClick={onRefresh} loading={refreshing} />
                </StyledFlex>
                <LazyImage
                  src="/images/campaign/holdstation-logo.png"
                  width={115}
                  height={48}
                  containerStyle={{ marginTop: 17 }}
                />
                <StyledFlex justifyContent="space-between" alignItems="flex-start" style={{ marginTop: 13 }}>
                  <StyledDownload>
                    Download <br />
                    Holdstation APP
                  </StyledDownload>
                  <LazyImage src="/images/campaign/holdstation-qr-code.svg" width={76} height={76} />
                </StyledFlex>
                <StyledDesc>
                  <StyledDescItem>Download Holdstation wallet and use it to join DapDap</StyledDescItem>
                </StyledDesc>
                <StyledFlex justifyContent="space-between" alignItems="flex-start" gap="16px" style={{ marginTop: 16 }}>
                  <Button style={{ flex: 1 }} onClick={() => onDownload('apple')}>
                    <AppleLogo />
                    <span>App Store</span>
                  </Button>
                  <Button style={{ flex: 1 }} onClick={() => onDownload('google')}>
                    <GooglePlayLogo />
                    <span>Google Play</span>
                  </Button>
                </StyledFlex>
              </StyledRight>
            </StyledFlex>
          </Card>
        )}
        <StyledFlex flexDirection="column" alignItems="stretch" gap="16px" style={{ marginTop: 20 }}>
          {loading
            ? [...new Array(2).keys()].map((idx) => <Skeleton key={idx} width={1000} height={70} borderRadius={12} />)
            : twitterList.map((it) => (
                <Task key={it.id} quest={it}>
                  {it.name}
                </Task>
              ))}
        </StyledFlex>
      </StyledContent>
    </StyledContainer>
  );
};

export default Holdstation;
