import Image from 'next/image';
import { useEffect, useState } from 'react';
import useCheck from '../../hooks/useCheck';
import useParticleReport from '../../hooks/useParticleReport';
import RefreshButton from '../RefreshButton';
import Trapeziform from '../Trapeziform';
import TrapeziformBtn from '../TrapeziformBtn';
import CheckIcon from '../CheckIcon';
import { Body, QuestGoldHints, Head, HeadLeft, HeadRight, QuestGold, QuestBg, Spins } from './styles';

export default function Quest({ data, bgClass, onRefreshDetail }: any) {
  const { id, name, logo, link, desc, total_spins, spins, rewardHints, particleLink, type, bgColor, isGold, reward } =
    data;

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

  // disabled={times === 0 ? false : execution >= times}
  return (
    <Trapeziform borderColor="#3C3D00" corner={34} className="quest-item">
      <QuestBg $color={bgColor} />
      <Head className={bgClass}>
        <HeadLeft>
          <Image src={logo} alt="" width={36} height={36} />
          <span className="name">{name}</span>
        </HeadLeft>
        <HeadRight>
          {total_spins > 0 ? (
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
          )}
        </HeadRight>
      </Head>
      <Body>
        <div style={{ textAlign: 'center' }}>
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
        <div className="quest-desc" dangerouslySetInnerHTML={{ __html: desc }}></div>
        <div className="foot">
          <TrapeziformBtn width="100%" height="50px" handleClick={handleTrade} loading={reportLoading}>
            Trade <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
          </TrapeziformBtn>
        </div>
      </Body>
    </Trapeziform>
  );
}
