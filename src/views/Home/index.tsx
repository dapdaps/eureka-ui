import { useState } from 'react';

import CheckConvertingModal from '@/components/Modal/CheckConverting';
import MedalRewardModal from '@/components/Modal/MedalReward';

import Compass from './components/Compass';
import DiscoveryDapps from './components/DiscoveryDapps';
import GridChains from './components/GridChains';
import Networks from './components/Networks';
import RecentRewards from './components/Rewards';
import useConvertTip from './hooks/useConvertTip';
import { StyledContainer } from './styles';

const Home = () => {
  const {
    checkConvertingVisible,
    setCheckConvertingVisible
  } = useConvertTip()
  const [medalRewardVisible, setMedalRewardVisible] = useState<boolean>(false)
  return (
    <StyledContainer>
      <GridChains />
      <Compass />
      <Networks />
      <DiscoveryDapps />
      <RecentRewards />

      {/* <DAvinciModal visible={versionVisible} onClose={handleVersionClosed} /> */}
      <CheckConvertingModal
        visible={checkConvertingVisible}
        onClose={() => {
          setCheckConvertingVisible(false)
        }}
        onCheck={() => {
          setCheckConvertingVisible(false)
          setMedalRewardVisible(true)
        }}
      />
      <MedalRewardModal
        visible={medalRewardVisible}
        onClose={() => {
          setMedalRewardVisible(false)
        }}
      />
    </StyledContainer>
  );
};

export default Home;
