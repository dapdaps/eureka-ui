import Image from 'next/image';
import { useEffect, useState } from 'react';
import useCheck from '../../hooks/useCheck';
import useParticleReport from '../../hooks/useParticleReport';
import RefreshButton from '../RefreshButton';
import Trapeziform from '../Trapeziform';
import TrapeziformBtn from '../TrapeziformBtn';
import CheckIcon from '../CheckIcon';
import { Body, QuestGoldHints, Head, HeadLeft, HeadRight, QuestGold, QuestBg, Spins, Desc, Gold, GoldWapper, QuestTitle, SpinLine } from './styles';

export default function Quest({ data, bgClass, onRefreshDetail }: any) {
  const { id, name, logo, link, desc, total_spins, spins, rewardHints, particleLink, type, bgColor, isGold, reward } =
    data;

  console.log('data:', data)

  const [execution, setExecution] = useState(0);
  const { checking, handleRefresh } = useCheck({ id }, (_times: number) => {
    onRefreshDetail();
    setExecution(_times);
  });
  const openLink = () => {
    const _link = type === 'metastreet' ? particleLink : link;

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

  return (
    <Trapeziform borderColor="#3C3D00" corner={34} className="quest-item">
      <QuestBg $color={data.bgColor} />
      <Head className={bgClass}>
        <HeadLeft>
          <Image src={data.icon} alt="" width={46} height={46} />
          <span className="name">{name}</span>
        </HeadLeft>
        {
          data.extraGold && <HeadRight>
            {/* {total_spins > 0 ? (
            <Spins>
              <span>{total_spins} SPIN</span>
              <CheckIcon />
            </Spins>
          ) : (
            <RefreshButton
              onClick={(ev: any) => {
                ev.stopPropagation();
                if (!checking) handleRefresh();
              }}
              loading={checking}
            >
              Unexplored
            </RefreshButton>
          )} */}
            {data.extraGold.value}
            <div className='tip'>
            Top trader based of Volume on { name } will share { data.extraGold.value } Extra Gold
            </div>
          </HeadRight>
        }
      </Head>
      <Desc>Prize Contributed</Desc>

      <GoldWapper>
        {
          data.rewards && data.rewards.map((reward: any) => {
            return <Gold>
              <img src={reward.icon} />
              <span>{reward.label}</span>
            </Gold>
          })
        }
      </GoldWapper>

      <QuestTitle>Quest</QuestTitle>

      {
        data.quests.map((item: any) => {
          return <SpinLine>
            <span className='spin-count'>{item.spin} SPIN</span>
            <span className='spin-title'>{item.label}</span>
            <span className='spin-status'>
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8.5C16 12.6421 12.6421 16 8.5 16C4.35786 16 1 12.6421 1 8.5C1 4.35786 4.35786 1 8.5 1" stroke="#00FFD1" stroke-width="2" stroke-linecap="round" />
                <path d="M4.99609 7.5L7.99609 10.5L15.4961 3" stroke="#00FFD1" stroke-width="2" stroke-linecap="round" />
              </svg>
            </span>
          </SpinLine>
        })
      }
      <Body>
        {/* <div style={{ textAlign: 'center' }}>
          {isGold ? (
            <svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="33.5" cy="33.5" r="33.5" fill="url(#paint0_linear_10_3)" />
              <path
                d="M18.3037 27.2651L12.4102 41.1917L32.262 48.6298M18.3037 27.2651L37.6902 17.6113L48.8569 19.0356M18.3037 27.2651L30.0907 30.1137M32.262 48.6298L54.5953 30.1137L48.8569 19.0356M32.262 48.6298L30.0907 30.1137M48.8569 19.0356L30.0907 30.1137"
                stroke="black"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_10_3"
                  x1="0"
                  y1="33.5"
                  x2="67"
                  y2="33.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FDF621" />
                  <stop offset="0.595" stopColor="#FDFCC3" />
                  <stop offset="1" stopColor="#FDF973" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            <Image src={logo} alt="" width={67} height={67} />
          )}
        </div>
        <QuestGoldHints>{rewardHints}</QuestGoldHints>
        <QuestGold>+{reward}</QuestGold>
        <div className="quest-desc">{desc}</div>
        <div className="foot">
          <TrapeziformBtn width="100%" height="50px" handleClick={handleTrade} loading={reportLoading}>
            Trade <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
          </TrapeziformBtn>
        </div> */}
      </Body>
    </Trapeziform>
  );
}
