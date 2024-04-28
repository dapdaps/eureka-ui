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

  const showRank = (dapp: string, id: string) => {
    setShowRankModal(true);
    setCurDapp(dapp);
    setId(id);
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
        rank1: 1000,
        rank2: 500,
        rank3: 500,
        reward: '1%',
        desc: 'Get ready to boost your rewards with Particle! Particle is a powerful dapp in the Blast ecosystem,When you use Particle Trade by Particle on DapDap, you not only receive the same Blast Gold rewards as you would on other platforms but also an additional bonus from a pool of Gold allocated to DapDap.',
      },
    ],
    [
      'Ring Protocol',
      {
        logo: '/images/odyssey/v4/logo-ring.png',
        link: `${location.origin}/dapp/ring-protocol`,
        rank1: 1000,
        rank2: 500,
        rank3: 500,
        reward: '1%',
        desc: 'Participate in our Odyssey4 and earn additional Gold rewards,Traders with the highest volume will be rewarded with special Gold bonuses.Ring Protocol offers seamless asset trading and lending services within the Blast ecosystem,Explore the possibilities with Ring Protocol on DapDap!',
      },
    ],
    [
      'Ambient',
      {
        logo: '/images/odyssey/v4/logo-ambient.png',
        link: `${location.origin}/dapp/ambient`,
        rank1: 1000,
        rank2: 500,
        rank3: 500,
        reward: '1%',
        desc: 'Ambient is a Zero-to-One Decentralized Trading Protocol on Blast, offering cutting-edge trading solutions.Join our Odyssey4 and complete trade on Ambient to earn extra Gold rewards. Trade actively to climb the leaderboard and stand a chance to win one of the top three prizes.',
      },
    ],
  ]);

  return (
    <StyledContainer>
      {showRankModal ? <RankModal name={curDapp} id={id} onClose={hideRank} /> : null}
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
