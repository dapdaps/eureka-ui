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

export default function Quest({ data, showRank, bgClass, onRefreshDetail }: any) {
  const {
    id,
    name,
    logo,
    link,
    rank1,
    rank2,
    rank3,
    reward,
    desc,
    start_time,
    end_time,
    total_spins,
    spins,
    hyperlockLink,
    thrusterLink,
    particleLink,
    type,
  } = data;

  const [execution, setExecution] = useState(0);
  const { checking, handleRefresh } = useCheck({ id }, (_times: number) => {
    onRefreshDetail();
    setExecution(_times);
  });
  const openLink = () => {
    const _link = type === 'metastreet' ? particleLink : link;

    window.open(_link, '_blank');
  };
  const openMetaStreetLink = (_link: string) => {
    window.open(_link, '_blank');
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
  return type === 'metastreet' ? (
    <Trapeziform borderColor="#3C3D00" corner={34} className="quest-item">
      <Head className={bgClass}>
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
          <Trapeziform
            borderColor="#363940"
            corner={20}
            className="view-rank"
            onClick={(e: any) => showRank(name, id, bgClass, logo)}
          >
            View Rank <Image src="/images/odyssey/v4/extend.svg" alt="" width={15} height={15} />
          </Trapeziform>
        </BodyLeft>
        <BodyRight>
          <div className="head">
            <div className="rewards">
              <Image src="/images/odyssey/v4/brick.svg" alt="" width={67} height={67} />
              <div className="rewards-right">
                <div className="intro">To divide up extra 1% Gold</div>
                <div className="title">+{reward} Gold</div>
              </div>
            </div>
            {/* <div className="status">
              <RefreshButton
                onClick={(ev: any) => {
                  ev.stopPropagation();
                  if (!checking) handleRefresh();
                }}
                loading={checking}
              />
            </div> */}
          </div>
          <div className="body">
            Swap ETH to yield-bearing Liquid Credit Tokens and LP on partner DEXs. <br />
            Trade <Image src="/images/odyssey/v4/coin-mwsteth.svg" alt="" width={20} height={20} />{' '}
            <b>mwstETH-WPUNKS: 20 / mwstETH-WPUNKS: 40</b> by Thruster or Particle; Stake LP:{' '}
            <Image src="/images/odyssey/v4/coin-mwsteth.svg" alt="" width={20} height={20} />
            <Image src="/images/odyssey/v4/coin-weth1.svg" alt="" width={20} height={20} style={{ marginLeft: -8 }} />
            <b>WETH-mwstETH-WPUNKS:20 / WETH-mwstETH-WPUNKS:40</b> on Hyperlock.
          </div>
          <div className="foot" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TrapeziformBtn
              className="custom-btn"
              width="202px"
              height="62px"
              handleClick={(e: any) => openMetaStreetLink(thrusterLink)}
            >
              <span>
                Trade by <b>Thruster</b>
              </span>
              <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
            </TrapeziformBtn>
            <TrapeziformBtn
              className="custom-btn"
              width="202px"
              height="62px"
              handleClick={onStartReport}
              loading={reportLoading}
            >
              <span>
                Trade by <b>Particle</b>
              </span>{' '}
              <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
            </TrapeziformBtn>
            <TrapeziformBtn
              className="custom-btn"
              width="202px"
              height="62px"
              handleClick={(e: any) => openMetaStreetLink(hyperlockLink)}
            >
              <span>
                Stake on <b>Hyperlock</b>
              </span>{' '}
              <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
            </TrapeziformBtn>
          </div>
        </BodyRight>
      </Body>
    </Trapeziform>
  ) : (
    <Trapeziform borderColor="#3C3D00" corner={34} className="quest-item">
      <Head className={bgClass}>
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
          <Trapeziform
            borderColor="#363940"
            corner={20}
            className="view-rank"
            onClick={(e: any) => showRank(name, id, bgClass, logo)}
          >
            View Rank <Image src="/images/odyssey/v4/extend.svg" alt="" width={15} height={15} />
          </Trapeziform>
        </BodyLeft>
        <BodyRight>
          <div className="head">
            <div className="rewards">
              <Image src="/images/odyssey/v4/brick.svg" alt="" width={67} height={67} />
              <div className="rewards-right">
                <div className="intro">To divide up extra 1% Gold</div>
                <div className="title">+{reward} Gold</div>
              </div>
            </div>
            <div className="status">
              <StatusTag status={total_spins > 0 || execution > 0} />
              <RefreshButton
                onClick={(ev: any) => {
                  ev.stopPropagation();
                  if (!checking) handleRefresh();
                }}
                loading={checking}
              />
            </div>
          </div>
          <div className="body" dangerouslySetInnerHTML={{ __html: desc }}></div>
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
