import { useEffect, useState } from 'react';

import useDappOpen from '@/hooks/useDappOpen';
import { useAllInOneTabCachedStore } from '@/stores/all-in-one';
import { useLayoutStore } from '@/stores/layout';

import useCheck from '../../hooks/useCheck';
import ArrowIcon from '../ArrowIcon';
import Card from '../Card';
import LockStatus from '../LockStatus';
import RefreshButton from '../RefreshButton';
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
  'Li.Fi': '/assets/images/lifi.png',
  Stargate: '/assets/images/stargate.png',
  Orbiter: '/assets/dapps/orbiter.png'
};

export default function DappCard({
  id,
  operators,
  name,
  category_name,
  source,
  description,
  times,
  spins,
  total_spins,
  onRefreshDetail
}: any) {
  const [execution, setExecution] = useState(0);

  const { checking, handleRefresh } = useCheck({ id, total_spins, spins }, (_times: number) => {
    onRefreshDetail();
    setExecution(_times);
  });
  const { open: dappOpen } = useDappOpen();
  const setLayout = useLayoutStore((store?: any) => store.set);
  const setCachedTab = useAllInOneTabCachedStore((store: any) => store.setCachedTab);

  const handleDappRedirect = (dapp: any) => {
    dapp.route && dappOpen({ dapp: { ...dapp, route: `/${dapp.route}` }, from: 'quest', isCurrentTab: false });
  };

  const onItemClick = () => {
    console.log('onItemClick--', source, operators);

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
    // window.open(source, '_blank');
  };

  useEffect(() => {
    setExecution(total_spins / spins);
  }, [total_spins, spins]);

  return (
    <Card
      onClick={onItemClick}
      // disabled={times === 0 ? false : execution >= times}
    >
      <StyledTop>
        <StyledDappWrapper>
          <StyledDappIcon src={ICON_MAP[name] || operators?.[0]?.dapp_logo} />
          <StyledDappTitleWrapper>
            <StyledDappTitle>{name}</StyledDappTitle>
            <StyledDappDesc>{description}</StyledDappDesc>
          </StyledDappTitleWrapper>
        </StyledDappWrapper>
        <ArrowIcon style={{ marginTop: '6px' }} />
      </StyledTop>
      <StyledFooter>
        <LockStatus status={total_spins > 0 || execution > 0} spins={spins} />
        <StyledFooterActions>
          <RefreshButton
            onClick={(ev: any) => {
              ev.stopPropagation();
              if (!checking) handleRefresh();
            }}
            loading={checking}
          />
        </StyledFooterActions>
      </StyledFooter>
    </Card>
  );
}
