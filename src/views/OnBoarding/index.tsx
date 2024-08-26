import { memo, useCallback, useMemo, useState } from 'react';

import Breadcrumb from '@/components/Breadcrumb';
import chainsConfig, { PathToId } from '@/config/all-in-one/chains';

import ExecutionModal from './components/ExecutionModal';
import HotDapps from './components/HotDapps';
import MyActions from './components/MyActions';
import OnBoardingActions from './components/OnBoardingActions';
import Tabs from './components/Tabs';
import Top from './components/Top';
import Trends from './components/Trends';
import useDetail from './hooks/useDetail';
import { StyledContainer } from './styles';

const OnBoarding = ({ path }: any) => {
  const { loading, detail, hotDapps } = useDetail(PathToId[path]);
  const [current, setCurrent] = useState('onboarding');
  const [modalType, setModalType] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [extraInfo, setExtraInfo] = useState();
  const currentChain = useMemo(() => {
    return chainsConfig[path];
  }, [path]);
  const handleModal = (type: any, extra: any) => {
    setModalType(type);
    setOpenModal(true);
    if (extra) setExtraInfo(extra);
  };
  return (
    <StyledContainer>
      <Breadcrumb
        navs={[
          { name: 'Home', path: '/' },
          { name: 'Quick Onboarding', path: '' },
          { name: currentChain.title, path: '' },
        ]}
      />
      <Top chain={{ ...currentChain, ...detail }} />
      <Tabs current={current} onChange={setCurrent} />
      {current === 'onboarding' && <OnBoardingActions openModal={handleModal} chain={{ ...currentChain, ...detail }} />}
      {current === 'my' && <MyActions openModal={handleModal} chain={{ ...currentChain, ...detail }} />}
      <Trends chain={{ ...currentChain, ...detail }} />
      <HotDapps dapps={hotDapps} />
      <ExecutionModal
        type={modalType}
        open={openModal}
        chainId={currentChain.chainId}
        onClose={() => {
          setOpenModal(false);
        }}
      />
    </StyledContainer>
  );
};

export default memo(OnBoarding);
