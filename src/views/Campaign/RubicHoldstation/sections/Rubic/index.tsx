import { StyledFlex } from '@/styled/styles';
import Task from '@/views/Campaign/RubicHoldstation/components/Task';
import RubicCard from '@/views/Campaign/RubicHoldstation/sections/Rubic/Card';

import {
  StyledContainer, StyledContent,
  StyledSectionTitle,
  StyledTitle,
  StyledTitleDesc,
  StyledTitleSub,
  StyledTitleSubDesc,
} from './styles';

const Rubic = () => {
  return (
    <StyledContainer>
      <StyledSectionTitle>
        Get your tickets now!
      </StyledSectionTitle>
      <StyledTitle>
        「Rubic Super Exchange」
      </StyledTitle>
      <StyledTitleDesc>
        1 ticket for asset bridging at Rubic or Super Bridge using Rubic paths <br />
        Requires at least $50 per bridge
      </StyledTitleDesc>
      <StyledTitleSub>
        1 transaction = 1 lottery ticket
      </StyledTitleSub>
      <StyledTitleSubDesc>
        (at least $50 per transaction)
      </StyledTitleSubDesc>
      <StyledContent>
        <StyledFlex justifyContent="space-between" alignItems="center" gap="24px">
          <RubicCard
            key={1}
            title="Super Bridge"
            bg="/images/campaign/super-bridge-bg.png"
            bgWidth={415}
            bgHeight={230}
            btn="Super Bridge"
          />
          <RubicCard
            key={2}
            title="Integreated dApp"
            bg="/images/campaign/integreated-dapp-bg.png"
            bgWidth={215}
            bgHeight={236}
            btn="Rubic dApp"
            bgClassName="rubic-img"
          />
        </StyledFlex>
        <StyledFlex flexDirection="column" alignItems="stretch" gap="16px" style={{ marginTop: 20 }}>
          <Task key={1} amount={1} completed>
            Follow @CryptoRubic
          </Task>
          <Task key={2} amount={1}>
            Retweet @CryptoRubic tweets
          </Task>
        </StyledFlex>
      </StyledContent>
    </StyledContainer>
  );
};

export default Rubic;
