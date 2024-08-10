import Banner from './components/Banner';
import Compass from './components/Compass';
import DiscoveryDapps from './components/DiscoveryDapps';

import { StyledContainer } from './styles';
import RecentRewards from './components/Rewards';
import Networks from './components/Networks';
import SuperFeatures from './components/SuperFeatures';

const Home = () => {
  return (
    <StyledContainer>
      <Banner />
      <Compass />
      <Networks />
      <DiscoveryDapps />
      <RecentRewards />
      <SuperFeatures /> 
      {/* <TrendingEthereum chains={chains} />
      <QuickOnboarding />
      <SeamlessNavigation chains={chains} />
      <Decentralised /> */}
      {/* <Learn /> */}
    </StyledContainer>
  );
};

export default Home;
