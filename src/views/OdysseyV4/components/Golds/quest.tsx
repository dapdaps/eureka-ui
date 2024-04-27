import Image from 'next/image';
import { useEffect, useState } from 'react';

import useCheck from '../../hooks/useCheck';
import useParticleReport from '../../hooks/useParticleReport';
import RefreshButton from '../RefreshButton';
import StatusTag from '../StatusTag';
import Timer from '../Timer';
import Trapeziform from '../Trapeziform';
import TrapeziformBtn from '../TrapeziformBtn';
import {
  Bdage,
  BgFoot,
  BgHead,
  Body,
  BodyLeft,
  BodyRight,
  Head,
  HeadLeft,
  HeadRight,
  Rank,
  RankGroup,
  StyledTimerBox,
} from './styles';

export default function Quest({ data, showRank, onRefreshDetail }: any) {
  const { id, name, logo, link, rank1, rank2, rank3, reward, desc, start_time, end_time, total_spins, spins } = data;

  const [execution, setExecution] = useState(0);
  const { checking, handleRefresh } = useCheck({ id, total_spins, spins }, (_times: number) => {
    onRefreshDetail();
    setExecution(_times);
  });
  const openLink = () => {
    window.open(link, '_blank');
  };
  const { loading: reportLoading, onStartReport } = useParticleReport(openLink);
  useEffect(() => {
    setExecution(total_spins / spins);
  }, [total_spins, spins]);
  const handleTrade = () => {
    if (name === 'Particle') {
      onStartReport();
    } else {
      openLink();
    }
  };

  // disabled={times === 0 ? false : execution >= times}
  return (
    <Trapeziform borderColor="#3C3D00" corner={34} className="quest-item">
      <Head>
        <HeadLeft>
          <Image src={logo} alt="" width={85} height={85} />
          <span className="name">{name}</span>
        </HeadLeft>
        <HeadRight>
          <StyledTimerBox>
            {start_time > Date.now() && <div>Upcoming</div>}
            {start_time > Date.now() ? (
              <Timer color="white" endTime={Number(start_time)} />
            ) : (
              <Timer color="white" endTime={Number(end_time)} />
            )}
          </StyledTimerBox>
        </HeadRight>
      </Head>
      <Body>
        <BodyLeft>
          <Rank className="rank1">
            <Bdage className="bd1">1</Bdage>
            <Image src="/images/odyssey/v4/brick.svg" alt="" width={36} height={36} />
            {rank1} Gold
          </Rank>
          <RankGroup>
            <Rank className="rank2">
              <Bdage className="bd2">2</Bdage>
              <Image src="/images/odyssey/v4/brick.svg" alt="" width={32} height={32} />
              {rank2} Gold
            </Rank>
            <Rank className="rank3">
              <Bdage className="bd3">3</Bdage>
              <Image src="/images/odyssey/v4/brick.svg" alt="" width={32} height={32} />
              {rank3} Gold
            </Rank>
          </RankGroup>
          <Trapeziform borderColor="#363940" corner={20} className="view-rank" onClick={(e: any) => showRank(name, id)}>
            View Rank <Image src="/images/odyssey/v4/extend.svg" alt="" width={15} height={15} />
          </Trapeziform>
        </BodyLeft>
        <BodyRight>
          <div className="head">
            <div className="rewards">
              <Image src="/images/odyssey/v4/brick.svg" alt="" width={89} height={89} />
              <span className="title">+{reward} Gold</span>
            </div>
            <div className="status">
              <StatusTag status={false} />
              <RefreshButton
                onClick={(ev: any) => {
                  ev.stopPropagation();
                  if (!checking) handleRefresh();
                }}
                loading={checking}
              />
            </div>
          </div>
          <div className="body">{desc}</div>
          <div className="foot">
            <TrapeziformBtn width="202px" height="62px" handleClick={handleTrade} loading={reportLoading}>
              Trade <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
            </TrapeziformBtn>
          </div>
        </BodyRight>
      </Body>
    </Trapeziform>
  );
}
