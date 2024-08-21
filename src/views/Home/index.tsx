import GridChains from './components/GridChains';
import Compass from './components/Compass';
import DiscoveryDapps from './components/DiscoveryDapps';

import { StyledContainer } from './styles';
import RecentRewards from './components/Rewards';
import Networks from './components/Networks';

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
