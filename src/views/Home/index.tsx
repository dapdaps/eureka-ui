import GridChains from './components/GridChains';
import Compass from './components/Compass';
import DiscoveryDapps from './components/DiscoveryDapps';

import { StyledContainer } from './styles';
import RecentRewards from './components/Rewards';
import Networks from './components/Networks';
import DAvinciModal from '@/views/Home/components/DAvinci/Modal';
import { useVersion } from '@/hooks/useVersion';

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
