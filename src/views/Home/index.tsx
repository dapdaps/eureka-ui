import Compass from './components/Compass';
import DiscoveryDapps from './components/DiscoveryDapps';
import GridChains from './components/GridChains';
import Networks from './components/Networks';
import RecentRewards from './components/Rewards';
import { StyledContainer } from './styles';

const Home = () => {
  return (
    <StyledContainer>
      <GridChains />
      <Compass />
      <Networks />
      <DiscoveryDapps />
      <RecentRewards />

      {/* <TrendingEthereum chains={chains} />
      <QuickOnboarding />
      <SeamlessNavigation chains={chains} />
      <Decentralised /> */}
      {/* <Learn /> */}
    </StyledContainer>
  );
};

export default Home;
