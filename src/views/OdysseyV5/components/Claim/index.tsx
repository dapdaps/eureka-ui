import {
  StyledContainer,
  StyledTitle,
  StyledSubTitle,
  StlyedDesc,
  StyledDescIcon,
  StyledDescText,
  StyledListContainer,
  StyledList,
  StyledListItem,
  StyledText,
  StyledListItemIcon,
  StyledListItemText,
  StyledPlate,
  StyledAllContainer
} from './styles';
import Image from 'next/image';

const iconList = [
  'champion.svg',
  'runner-up.svg',
  'third-runner-up.svg',
];

const Claim = () => {

  return (
    <StyledAllContainer id='odysseySectionClimbToLeaderboard'>
      <StyledPlate>
        <Image src="/images/odyssey/v5/climb-plate.svg" alt="" width={368} height={511} className="img-plate" />
      </StyledPlate>
      <StyledContainer>
        <StyledTitle>Climb to <span className="hilight">Leaderboard</span></StyledTitle>
        <StyledTitle>Win <span className="hilight">Extra orbs / photons</span></StyledTitle>
        <StyledSubTitle>
          Climb to the Top 10 for Exclusive Orbs and Photons Rewards!
        </StyledSubTitle>
        <StlyedDesc>
          <StyledDescIcon>
            <Image src="/images/odyssey/v5/union.svg" width={8} height={8} alt="" />
          </StyledDescIcon>
          <StyledDescText>The ranking changes in real time, updated every 15 minutes, and the final list of winners is
            based on the data at the end of the campaign.</StyledDescText>
        </StlyedDesc>
        <StyledListContainer>
          <StyledList>
            <StyledListItem>Rank</StyledListItem>
            <StyledListItem>User address</StyledListItem>
            <StyledListItem>Trading Volume</StyledListItem>
          </StyledList>
          {
            [...new Array(10).map((i, idx) => idx)].map((item, idx) => (
              <StyledList key={idx}>
                <StyledListItem>
                  <StyledListItemIcon url={`/images/odyssey/v5/${iconList[idx]}` ?? ''} />
                  <StyledListItemText>{idx + 1}</StyledListItemText>
                </StyledListItem>
                <StyledListItem>
                  <StyledListItemIcon />
                  <StyledListItemText>0x3bcb...4e26</StyledListItemText>
                </StyledListItem>
                <StyledListItem>$21.5K</StyledListItem>
              </StyledList>
            ))
          }
        </StyledListContainer>
        <StyledText>Your current rank</StyledText>
        <StyledListContainer>
          <StyledList one={true}>
            <StyledListItem>#2,345</StyledListItem>
            <StyledListItem>
              <StyledListItemIcon />
              <StyledListItemText>0x3bcb...4e26</StyledListItemText>
            </StyledListItem>
            <StyledListItem>$535</StyledListItem>
          </StyledList>
        </StyledListContainer>
      </StyledContainer>
    </StyledAllContainer>
  );
};

export default Claim;