import { useVersion } from '@/hooks/useVersion';
import DAvinciModal from '@/views/Home/components/DAvinci/Modal';

import Compass from './components/Compass';
import GridChains from './components/GridChains';

import { StyledContainer } from './styles';
import dynamic from 'next/dynamic';

const Networks = dynamic(() => import('./components/Networks'));
const DiscoveryDapps = dynamic(() => import('./components/DiscoveryDapps'));
const RecentRewards = dynamic(() => import('./components/Rewards'));

const Home = () => {
  const {
    visible: versionVisible,
    handleClosed: handleVersionClosed,
  } = useVersion();

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
      <DAvinciModal visible={versionVisible} onClose={handleVersionClosed} />
    </StyledContainer>
  );
};

export default Home;
