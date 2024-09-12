import AppleLogo from '@public/images/campaign/apple-logo.svg';
import GooglePlayLogo from '@public/images/campaign/google-play-logo.svg';

import LazyImage from '@/components/LazyImage';
import { StyledFlex } from '@/styled/styles';
import Button from '@/views/Campaign/RubicHoldstation/components/Button';
import Card from '@/views/Campaign/RubicHoldstation/components/Card';
import Refresh from '@/views/Campaign/RubicHoldstation/components/Refresh';
import Task from '@/views/Campaign/RubicHoldstation/components/Task';
import TicketBadge from '@/views/Campaign/RubicHoldstation/components/TicketBadge';

import {
  StyledContainer,
  StyledContent,
  StyledDesc, StyledDescItem,
  StyledDownload,
  StyledRight,
  StyledTitle,
  StyledTitleSub,
} from './styles';

const Holdstation = () => {
  return (
    <StyledContainer>
      <StyledTitle>
        「Holdstation Hyperlink」
      </StyledTitle>
      <StyledTitleSub>
        Complete Mission to get 2 tickets
      </StyledTitleSub>
      <StyledContent>
        <Card style={{ padding: '30px 20px 0 30px' }}>
          <StyledFlex justifyContent="space-between" alignItems="flex-start" gap="38px">
            <LazyImage src="/images/campaign/holdstation-bg.png" width={464} height={339} />
            <StyledRight>
              <StyledFlex justifyContent="flex-end" alignItems="flex-start" gap="10px">
                <TicketBadge amount={0}></TicketBadge>
                <Refresh />
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
                <StyledDescItem>
                  Download Holdstation wallet and use it to join DapDap
                </StyledDescItem>
              </StyledDesc>
              <StyledFlex justifyContent="space-between" alignItems="flex-start" gap="16px" style={{ marginTop: 16 }}>
                <Button style={{ flex: 1 }}>
                  <AppleLogo />
                  <span>App Store</span>
                </Button>
                <Button style={{ flex: 1 }}>
                  <GooglePlayLogo />
                  <span>Google Play</span>
                </Button>
              </StyledFlex>
            </StyledRight>
          </StyledFlex>
        </Card>
        <StyledFlex flexDirection="column" alignItems="stretch" gap="16px" style={{ marginTop: 20 }}>
          <Task key={1} amount={1}>
            Follow @HoldstationW
          </Task>
          <Task key={2} amount={1}>
            Retweet @HoldstationW tweets
          </Task>
        </StyledFlex>
      </StyledContent>
    </StyledContainer>
  );
};

export default Holdstation;
