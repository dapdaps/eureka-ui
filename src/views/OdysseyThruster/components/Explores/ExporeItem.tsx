import { memo, useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import useDappOpen from '@/hooks/useDappOpen';
import { openLink, openXShareLink } from '@/utils/links';
import CoinGroup from '@/views/OdysseyV4/components/Treasure/CoinGroup';
import AddLiquidityModal from '@/views/Pool/AddLiquidityModal';

import useCheck from '../../hooks/useCheck';
import useParticleReport from '../../hooks/useParticleReport';
import useReport from '../../hooks/useReport';
import ArrowIcon from '../ArrowIcon';
import Spins from '../Spins';
import CardInput from './CardInput';
import { StyledBg, StyledItem, StyledItemLeft, StyledItemRight, StyledItemTitle } from './styles';

const ExporeItem = ({
  userInfo,
  authConfig,
  id,
  name = '',
  source,
  category,
  spins = 0,
  total_spins = 0,
  times = 0,
  onRefreshDetail,
  operators,
  period_complete,
}: any) => {
  const group1 = 'Add LP on Thruster Pool: BLAST/WETH';
  const group2 = 'Add LP on Thruster Pool: BLAST/USDB';

  const [selectedPool, setSelectedPool] = useState('');
  const [finished, setFinished] = useState(false);
  const { checking, handleRefresh } = useCheck({ id, total_spins, times, spins, category }, (_flag: boolean) => {
    console.log('check-cb--', _flag);

    setFinished(_flag);
    onRefreshDetail();
  });
  const { check } = useAuthCheck({ isNeedAk: true });
  const { account } = useAccount();
  const { handleReport } = useReport();
  const { open: dappOpen } = useDappOpen();
  const reportCallback = () => {
    window.open('https://app.particle.trade/earn', '_blank');
  };
  const { loading: reportLoading, onStartReport } = useParticleReport(reportCallback);
  const handleDappRedirect = (dapp: any) => {
    dapp.route && dappOpen({ dapp: { ...dapp, route: `/${dapp.route}` }, from: 'quest', isCurrentTab: false });
  };
  const isComing = [
    'Stake BLAST/WETH or BLAST/USDB in Gamma',
    ' Leverage farm USDB/WETH/ETH for the BLAST pool on Juice',
  ].includes(name);
  const onItemClick = () => {
    console.log('ExporeItem-click', category, account, source, operators);
    if (isComing) return;
    if (name === group1 || name === group2) return;
    if (!account) {
      check();
      return;
    }
    if (category === 'dapp' && name.includes('Particle')) {
      onStartReport();
      return;
    }

    if (operators?.length) {
      handleDappRedirect(operators[0]);
      return;
    }
    // if (source === 'wallet/bridge') {
    //   setLayout({
    //     showAccountSider: true,
    //     defaultTab: 'bridge',
    //   });
    //   return;
    // }
    // if (category_name === 'Bridge') {
    //   setCachedTab(category_name, 534352);
    // }
    if (category === 'twitter_retweet') {
      sessionStorage.setItem('_clicked_twitter_' + id, '1');
      openXShareLink(
        `🚀 Join the THRUSTER TURBO SPIN on DapDap! @DapDapMeUp @ThrusterFi @Blast_L2 %0A
🎉 Use blast hot dapps, Spin the wheel, and win from a massive 25M Thruster Credits prize pool! 
 💰 %23DapDap %23Blast %0A
👉🏻 Check it out and spin to win: https://www.dapdap.net/odyssey/home?id=6`,
      );
    }
    if (!source) return;
    if (finished) return;

    if (category.startsWith('twitter') && userInfo.twitter?.is_bind) {
      sessionStorage.setItem('_clicked_twitter_' + id, '1');
    }
    if (category.startsWith('twitter') && !userInfo.twitter?.is_bind) {
      const path = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${authConfig.twitter_client_id}&redirect_uri=${window.location.href}&scope=tweet.read%20users.read%20follows.read%20like.read&state=state&code_challenge=challenge&code_challenge_method=plain`;
      sessionStorage.setItem('_auth_type', 'twitter');
      window.open(path, '_blank');
      return;
    }

    if (!source) return;

    if (category === 'page') handleReport(id);
    window.open(source, '_blank');
  };

  useEffect(() => {
    // social&password
    if (category.startsWith('twitter') || category.startsWith('password')) {
      const offers = spins * times;
      setFinished(offers <= total_spins);
    } else {
      // others
      setFinished(period_complete);
    }
  }, [total_spins, period_complete, times, spins]);

  return (
    <StyledItem onClick={onItemClick} $disabled={times === 0 ? false : finished} $isComing={isComing}>
      <StyledBg className="card_active_bg" />
      <StyledItemLeft>
        <StyledItemTitle>
          {name}
          {name === group1 && (
            <CoinGroup
              icon={['/images/tokens/blast.svg', '/images/odyssey/v4/coin-weth.svg']}
              name={['BLAST', 'WETH']}
              bgColor="#1c1b1b"
              onClick={() => {
                setSelectedPool('BLAST,WETH');
              }}
            />
          )}
          {name === group2 && (
            <CoinGroup
              icon={['/images/tokens/blast.svg', '/images/tokens/usdb.svg']}
              name={['BLAST', 'USDB']}
              bgColor="#1c1b1b"
              onClick={() => {
                setSelectedPool('BLAST,USDB');
              }}
            />
          )}
        </StyledItemTitle>
      </StyledItemLeft>
      <StyledItemRight>
        {finished ? (
          <>
            <Spins spin={spins} active={true} />
          </>
        ) : category === 'password' ? (
          <CardInput
            onConfirm={(val: string) => {
              if (!checking) handleRefresh(val);
            }}
          />
        ) : (
          <>
            <Spins
              spin={spins}
              checking={checking}
              onRefresh={(ev: any) => {
                ev.stopPropagation();
                if (checking) return;

                if (category.startsWith('twitter')) {
                  const clicked = sessionStorage.getItem('_clicked_twitter_' + id);
                  clicked && handleRefresh();
                } else {
                  handleRefresh();
                }
              }}
              active={false}
            />

            <ArrowIcon />
          </>
        )}
      </StyledItemRight>
      <AddLiquidityModal
        open={!!selectedPool}
        dapp={{
          path: 'thruster-liquidity',
          name: 'Thruster Pool',
        }}
        chain={{
          chain_id: 81457,
          name: 'Blast',
        }}
        defaultTokens={selectedPool}
        onClose={() => {
          setSelectedPool('');
        }}
      />
    </StyledItem>
  );
};

export default memo(ExporeItem);
