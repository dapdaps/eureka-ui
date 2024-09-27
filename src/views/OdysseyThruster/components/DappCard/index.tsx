'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import useDappOpen from '@/hooks/useDappOpen';
import { useAllInOneTabCachedStore } from '@/stores/all-in-one';
import { useLayoutStore } from '@/stores/layout';

import useCheck from '../../hooks/useCheck';
import useReport from '../../hooks/useReport';
import ArrowIcon from '../ArrowIcon';
import Card from '../Card';
import Spins from '../Spins';
import {
  StyledDappDesc,
  StyledDappIcon,
  StyledDappTitle,
  StyledDappTitleWrapper,
  StyledDappWrapper,
  StyledFooter,
  StyledFooterActions,
  StyledTop
} from './styles';

const ICON_MAP: any = {
  'Li.Fi': 'https://s3.amazonaws.com/dapdap.main/images/lifi.png',
  Stargate: 'https://s3.amazonaws.com/dapdap.main/images/stargate.png',
  Orbiter: '/assets/dapps/orbiter.png'
};
const LogoMap = new Map([
  ['Thruster', '/images/odyssey/thruster/Thruster.svg'],
  ['Hyperlock', '/images/odyssey/thruster/Hyperlock.svg'],
  ['DUO', '/images/odyssey/thruster/DUO.svg'],
  ['Gamma', '/images/odyssey/thruster/Gamma.svg'],
  ['Juice', '/images/odyssey/thruster/Juice.svg']
]);

export default function DappCard({
  id,
  operators,
  name,
  category_name,
  source,
  description,
  times,
  spins,
  category,
  total_spins,
  onRefreshDetail,
  period_complete
}: any) {
  const [execution, setExecution] = useState(0);
  const [finished, setFinished] = useState(false);

  const { checking, handleRefresh } = useCheck({ id, total_spins, spins, category }, (_flag: boolean) => {
    // setExecution(_times);
    setFinished(_flag);
    onRefreshDetail();
  });
  const { open: dappOpen } = useDappOpen();
  const setLayout = useLayoutStore((store?: any) => store.set);
  const setCachedTab = useAllInOneTabCachedStore((store: any) => store.setCachedTab);

  const handleDappRedirect = (dapp: any) => {
    dapp.route && dappOpen({ dapp: { ...dapp, route: `/${dapp.route}` }, from: 'quest', isCurrentTab: false });
  };
  const { check } = useAuthCheck({ isNeedAk: true });
  const { account } = useAccount();
  const { handleReport } = useReport();
  const onItemClick = () => {
    console.log('onItemClick--', account, category, source);
    if (!account) {
      check();
      return;
    }
    if (category === 'page') handleReport(id);
    window.open(`${window.location.origin}/${source}`, '_blank');
    return;
    if (operators?.length) {
      handleDappRedirect(operators[0]);
      return;
    }
    if (source === 'wallet/bridge') {
      setLayout({
        showAccountSider: true,
        defaultTab: 'bridge'
      });
      return;
    }
    if (category_name === 'Bridge') {
      setCachedTab(category_name, 534352);
    }
    if (!source) return;
  };

  useEffect(() => {
    // setExecution(total_spins / spins);
    setFinished(period_complete);
  }, [total_spins, spins, period_complete]);

  return (
    <Card
      onClick={onItemClick}
      // disabled={times === 0 ? false : execution >= times}
    >
      <StyledTop>
        <StyledDappWrapper>
          <StyledDappIcon src={LogoMap.get(name) || operators?.[0]?.dapp_logo} />
          <StyledDappTitleWrapper>
            <StyledDappTitle>{name}</StyledDappTitle>
            <StyledDappDesc>{description}</StyledDappDesc>
          </StyledDappTitleWrapper>
        </StyledDappWrapper>
        <ArrowIcon style={{ marginTop: '6px' }} />
      </StyledTop>
      <StyledFooter>
        <Spins
          spin={spins}
          checking={checking}
          onRefresh={(ev: any) => {
            ev.stopPropagation();
            if (!checking) handleRefresh();
          }}
          active={finished}
          // active={total_spins > 0 || execution > 0}
        />
        {/* <StyledFooterActions>
          <RefreshButton
            onClick={(ev: any) => {
              ev.stopPropagation();
              if (!checking) handleRefresh();
            }}
            loading={checking}
          />
        </StyledFooterActions> */}
      </StyledFooter>
    </Card>
  );
}
