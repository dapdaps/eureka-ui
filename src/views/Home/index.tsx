import { useChainsStore } from '@/stores/chains';

import Banner from './components/Banner';
import Compass from './components/Compass';
import Decentralised from './components/Decentralised';
import DiscoveryDapps from './components/DiscoveryDapps';
import QuickOnboarding from './components/QuickOnboarding';
import SeamlessNavigation from './components/SeamlessNavigation';
import TrendingEthereum from './components/TrendingEthereum';

import { StyledContainer } from './styles';
import RecentRewards from './components/Rewards';
import Networks from './components/Networks';
import SuperFeatures from './components/SuperFeatures';

const Home = () => {
  const chains = useChainsStore((store: any) => store.chains);
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
