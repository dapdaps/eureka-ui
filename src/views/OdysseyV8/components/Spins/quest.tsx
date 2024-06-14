import Image from 'next/image';
import { useEffect, useState } from 'react';
import useCheck from '../../hooks/useCheck';
import useParticleReport from '../../hooks/useParticleReport';
import RefreshButton from '../RefreshButton';
import Trapeziform from '../Trapeziform';
import TrapeziformBtn from '../TrapeziformBtn';
import CheckIcon from '../CheckIcon';
import { openLink, openXShareLink } from '@/utils/links';
import useReport from '../../hooks/useReport';
import {
  Body,
  QuestGoldHints,
  Head,
  HeadLeft,
  HeadRight,
  QuestGold,
  QuestBg,
  Spins,
  Desc,
  Gold,
  GoldWapper,
  QuestTitle,
  SpinLine,
} from './styles';

export default function Quest({ data, bgClass, onRefreshDetail, userInfo, authConfig }: any) {
  const { id, name, logo, link, desc, total_spins, spins } = data;
  const { handleReport } = useReport();
  const [execution, setExecution] = useState(0);
  const { checking, handleRefresh } = useCheck({ id }, (_times: number) => {
    onRefreshDetail();
    setExecution(_times);
  });

  const { loading: reportLoading, onStartReport } = useParticleReport(openLink);
  useEffect(() => {
    setExecution(total_spins / spins);
  }, [total_spins, spins]);

  const onItemClick = (item: any) => {
    if (item.link && !item.link?.startsWith('http')) {
      openLink(item.link, true);
      return;
    }
    return;
    if (!userInfo.twitter?.is_bind) {
      const path = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${authConfig.twitter_client_id}&redirect_uri=${window.location.href}&scope=tweet.read%20users.read%20follows.read%20like.read&state=state&code_challenge=challenge&code_challenge_method=plain`;
      sessionStorage.setItem('_auth_type', 'twitter');
      window.open(path, '_blank');
      return;
    }
    openXShareLink(`Join Odyssey Vol.4+ and conquer the quest to earn spins for a chance at big prizes! 🎉 
    Don't miss out on your shot at exciting rewards! @DapDapMeUp @${item.twitter}
    #DapDap #Blast`);
  };

  return (
    <Trapeziform borderColor="#3C3D00" corner={34} className="quest-item">
      <QuestBg $color={data.bgColor} />
      <Head className={bgClass}>
        <HeadLeft>
          <Image src={data.icon} alt="" width={46} height={46} />
          <span className="name">{name}</span>
        </HeadLeft>
        {data.extraGold && (
          <HeadRight>
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
            <div className="tip">
              Top trader based of Volume on {name} will share {data.extraGold.value} Extra Gold
            </div>
          </HeadRight>
        )}
      </Head>
      {!!data.rewards.length && <Desc>Prize Contributed</Desc>}

      <GoldWapper>
        {data.rewards &&
          data.rewards.map((reward: any) => {
            return (
              <Gold key={reward.label}>
                <img src={reward.icon} />
                <span>{reward.label}</span>
              </Gold>
            );
          })}
      </GoldWapper>

      <QuestTitle>Quest</QuestTitle>

      {data.quests.map((item: any) => {
        return (
          <SpinLine
            onClick={() => {
              onItemClick(item);
            }}
            key={item.label}
            $disabled={item.twitter || item.link?.startsWith('http')}
          >
            <span className="spin-count">{item.spin} SPIN</span>
            <span className="spin-title">{item.label}</span>
            <span className="spin-status">
              {/* <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16 8.5C16 12.6421 12.6421 16 8.5 16C4.35786 16 1 12.6421 1 8.5C1 4.35786 4.35786 1 8.5 1"
                  stroke="#00FFD1"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M4.99609 7.5L7.99609 10.5L15.4961 3"
                  stroke="#00FFD1"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg> */}
            </span>
          </SpinLine>
        );
      })}
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
