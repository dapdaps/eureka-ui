import { useState } from 'react';

import CheckConvertingModal from '@/components/Modal/CheckConverting';
import MedalRewardModal from '@/components/Modal/MedalReward';
import { useVersion } from '@/hooks/useVersion';
import DAvinciModal from '@/views/Home/components/DAvinci/Modal';

import Compass from './components/Compass';
import DiscoveryDapps from './components/DiscoveryDapps';
import GridChains from './components/GridChains';
import Networks from './components/Networks';
import RecentRewards from './components/Rewards';
import { StyledContainer } from './styles';

const Home = () => {
  const {
    visible: versionVisible,
    handleClosed: handleVersionClosed,
  } = useVersion();

  const [checkConvertingVisible, setCheckConvertingVisible] = useState(false)
  const [medalRewardVisible, setMedalRewardVisibleVisible] = useState(false)

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

      <CheckConvertingModal
        visible={checkConvertingVisible}
        onClose={() => {
          setCheckConvertingVisible(false)
        }}
      />
      <MedalRewardModal
        visible={medalRewardVisible}
        onClose={() => {
          setMedalRewardVisibleVisible(false)
        }}
      />
    </StyledContainer>
  );
};

export default Home;
