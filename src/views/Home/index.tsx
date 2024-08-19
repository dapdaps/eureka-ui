import Banner from './components/Banner';
import Compass from './components/Compass';
import { StyledContainer } from './styles';
import dynamic from 'next/dynamic';

const Networks = dynamic(() => import('./components/Networks'));
const DiscoveryDapps = dynamic(() => import('./components/DiscoveryDapps'));
const RecentRewards = dynamic(() => import('./components/Rewards'));
const SuperFeatures = dynamic(() => import('./components/SuperFeatures'));
const PlatformStats = dynamic(() => import('./components/PlatformStats'));

const Home = () => {
  return (
    <StyledContainer>
      <Banner />
      <Compass />
      <Networks />
      <DiscoveryDapps />
      <RecentRewards />
      <SuperFeatures />
      <PlatformStats />

      {/* <TrendingEthereum chains={chains} />
      <QuickOnboarding />
      <SeamlessNavigation chains={chains} />
      <Decentralised /> */}
      {/* <Learn /> */}
    </StyledContainer>
  );
};

export default Home;
