import Image from 'next/image';
import { useEffect, useState } from 'react';

import Loading from '@/components/Icons/Loading';

import { ParticleLink } from '../../const';
import RankModal from '../RankModal';
import RefreshButton from '../RefreshButton';
import StatusTag from '../StatusTag';
import Timer from '../Timer';
import Trapeziform from '../Trapeziform';
import TrapeziformBtn from '../TrapeziformBtn';
import Quest from './quest';
import {
  BgFoot,
  BgHead,
  Body,
  BodyLeft,
  BodyRight,
  Head,
  HeadLeft,
  HeadRight,
  LoadingWrap,
  StyledContainer,
  StyledContent,
  StyledTimerBox,
} from './styles';

export default function Golds({ loading, list, data, onRefreshDetail }: any) {
  const [id, setId] = useState('');

  const [showRankModal, setShowRankModal] = useState(false);
  const [curDapp, setCurDapp] = useState('');
  const [curBgClass, setCurBgClass] = useState('');
  const [curLogo, setCurLogo] = useState('');

  const showRank = (dapp: string, id: string, curClass: string, logo: string) => {
    setShowRankModal(true);
    setCurDapp(dapp);
    setId(id);
    setCurBgClass(curClass);
    setCurLogo(logo);
  };

  const hideRank = () => {
    setShowRankModal(false);
    setCurDapp('');
    setId('');
  };
  const GoldsMap = new Map([
    [
      'Particle',
      {
        logo: '/images/odyssey/v4/logo-particle.svg',
        link: ParticleLink,
        bgClass: 'bg-particle',
        rank1: 100,
        rank2: 60,
        rank3: 40,
        reward: '2700',
        desc: 'Get ready to boost your rewards with Particle! Particle is a powerful dapp in the Blast ecosystem. When you use Particle Trade by Particle on DapDap, you not only receive the same Blast Gold rewards as you would on other platforms but also an additional bonus from a pool of Gold allocated to DapDap.',
        type: '',
      },
    ],
    [
      'Ring Protocol',
      {
        logo: '/images/odyssey/v4/logo-ring.png',
        link: `${location.origin}/dapp/ring-protocol`,
        bgClass: 'bg-ring',
        rank1: 100,
        rank2: 60,
        rank3: 40,
        reward: '1300',
        desc: 'Ring Protocol offers seamless asset trading and lending services within the Blast ecosystem. Explore DeFi with Ring Protocol on DapDap today! <br />Participate in our latest Odyssey campaign and earn additional Gold rewards. The top traders with the highest volume will be rewarded with special Gold bonuses.',
        type: '',
      },
    ],
    [
      'Ambient',
      {
        logo: '/images/odyssey/v4/logo-ambient.png',
        link: `${location.origin}/dapp/ambient`,
        bgClass: 'bg-ambient',
        rank1: 100,
        rank2: 60,
        rank3: 40,
        reward: '800',
        desc: 'Ambient is a Zero-to-One Decentralised Trading Protocol on Blast, offering cutting-edge trading solutions.<br />Complete trades on Ambient to earn extra Gold rewards. Trade actively and climb the leaderboard to stand a chance to win one of the top three prizes!',
        type: '',
      },
    ],
    [
      'MetaStreet',
      {
        logo: '/images/odyssey/v4/logo-metastreet.svg',
        hyperlockLink: `${location.origin}/dapp/hyperlock`,
        thrusterLink: `${location.origin}/dapp/thruster-finance`,
        particleLink: 'https://app.particle.trade/0xe557Fa3DA7c728E9c7e7E76555773BAF00205654',
        bgClass: 'bg-metastreet',
        rank1: 100,
        rank2: 60,
        rank3: 40,
        reward: '1500',
        desc: '',
        type: 'metastreet',
      },
    ],
  ]);

  return (
    <StyledContainer>
      {showRankModal ? (
        <RankModal name={curDapp} id={id} logo={curLogo} bgClass={curBgClass} onClose={hideRank} />
      ) : null}
      <BgHead />
      <StyledContent>
        {loading ? (
          <LoadingWrap>
            <Loading size={30} />
          </LoadingWrap>
        ) : (
          list.map((item: any) => (
            <Quest
              key={item.name}
              showRank={showRank}
              bgClass={GoldsMap.get(item.name)?.bgClass}
              data={{ ...GoldsMap.get(item.name), ...item, start_time: data.start_time, end_time: data.end_time }}
              onRefreshDetail={onRefreshDetail}
            />
          ))
        )}
      </StyledContent>
      <BgFoot />
    </StyledContainer>
  );
}
