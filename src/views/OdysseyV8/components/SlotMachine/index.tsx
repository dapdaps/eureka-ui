import actionBg from '@public/images/others/odyssey/v8/components/SlotMachine/action-bg.svg?url';
import bgImg from '@public/images/others/odyssey/v8/components/SlotMachine/bg.svg?url';
import btnImg from '@public/images/others/odyssey/v8/components/SlotMachine/btn.svg?url';
import btnActiveImg from '@public/images/others/odyssey/v8/components/SlotMachine/btn-active.svg?url';
import btnBgImg from '@public/images/others/odyssey/v8/components/SlotMachine/btn-bg.svg?url';
import clamImg from '@public/images/others/odyssey/v8/components/SlotMachine/clam.svg?url';
import clamPressImg from '@public/images/others/odyssey/v8/components/SlotMachine/clam-press.svg?url';
import coverTopImg from '@public/images/others/odyssey/v8/components/SlotMachine/cover-top.png';
import controllerImg from '@public/images/others/odyssey/v8/components/SlotMachine/ctr.svg?url';
import controllerActiveImg from '@public/images/others/odyssey/v8/components/SlotMachine/ctr-active.svg?url';
import ruleImg from '@public/images/others/odyssey/v8/components/SlotMachine/rule.svg?url';
import rulePressImg from '@public/images/others/odyssey/v8/components/SlotMachine/rule-press.svg?url';
import yellowLeftImg from '@public/images/others/odyssey/v8/components/SlotMachine/yellow-left.svg?url';
import yellowMidImg from '@public/images/others/odyssey/v8/components/SlotMachine/yellow-mid.svg?url';
import yellowRightImg from '@public/images/others/odyssey/v8/components/SlotMachine/yellow-right.svg?url';
import { useCallback, useEffect,useRef, useState } from 'react';
import styled from 'styled-components';

import useSwitcher from '../../hooks/useSwitcher';
import Pilcrow from '../Pilcrow';
import { BgFoot } from '../Spins/styles';
import { DAPPS } from './config';
import DisabledMark from './DisabledMark';
import PrizeModal from './PrizeModal';
import PrizePoolModal from './PrizePoolModal';
import Rewards from './Rewards';
import RewardsModal from './RewardsModal';
import RuleModal from './RuleModal';
import ScrollLine from './ScrollLine';
import SubTitle from './SubTitle';
import Title from './Title';

const Wapper = styled.div`
  width: var(--main-width);
  margin: 80px auto 70px;
  position: relative;
  background-color: #000;
`;

const HeaderBg = styled(BgFoot)`
  position: absolute;
  z-index: 1;
  width: 100%;
  transform: rotate(180deg);
  top: 130px;
`;

const Bg = styled.div`
  width: 100%;
  height: 440px;
  background: url(${bgImg.src}) center center no-repeat;
  position: absolute;
  bottom: -123px;
`;

const Screen = styled.div`
  width: 1000px;
  height: 524px;
  margin: 0 auto;
  border-radius: 30px;
  border: 1px;
  background: linear-gradient(180deg, #2f3445 0%, #1c1f29 100%);
  position: relative;
`;

const ControllerWapper = styled.div`
  position: absolute;
  width: 100px;
  top: 150px;
  right: 50px;
`;

const Controller = styled.div<{ $active: boolean }>`
  width: 100px;
  height: 104px;
  background: url(${({ $active }) => ($active ? controllerActiveImg.src : controllerImg.src)}) center 0 no-repeat;
  background-size: auto 100%;
  position: absolute;
  z-index: 3;
  left: 0;
  top: 0;
`;

const ControllerBg = styled.div`
  width: 26px;
  height: 54px;
  border-radius: 88px;
  position: absolute;
  z-index: 2;
  background: linear-gradient(180deg, #000000 35.51%, #1c1d1f 100%);
  left: calc(50% - 13px);
  top: 70px;
  box-shadow: inset 0px 0px 5px 0px rgba(75, 78, 88, 1);
  border: 2px solid;
  border-image-source: linear-gradient(180deg, #0b0d13 0%, #4b4e58 100%);
`;

const ScrollWapper = styled.div`
  width: 777px;
  height: 167px;
  border-radius: 88px;
  background: linear-gradient(180deg, #0b0d13 0%, #373940 100%);
  margin: 38px auto 0 54px;
  position: relative;
`;

const ControllerBtnBgWapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.bg {
    padding: 0 15px;
  }
  &.cover {
    padding: 0 14px;
  }
`;

const ControllerBtnBg = styled.div`
  width: 138px;
  height: 138px;
  background-size: 100% 100%;
  &.left {
    background-image: url(${yellowLeftImg.src});
  }
  &.mid {
    background-image: url(${yellowMidImg.src});
  }
  &.right {
    background-image: url(${yellowRightImg.src});
  }
`;

const ScoreWapper = styled.div`
  display: flex;
  gap: 24px;
  margin: 55px 55px 0;
`;

const ActionBar = styled.div`
  height: 150px;
  background: url(${actionBg.src}) left top no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 0 60px;
  position: relative;
  z-index: 2;
`;

const Rules = styled.div<{ pressed: boolean }>`
  width: 185.5px;
  height: 92px;
  background: url(${({ pressed }) => (pressed ? rulePressImg.src : ruleImg.src)}) left top no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  margin-left: 80px;
`;

const Clam = styled.div<{ pressed: boolean }>`
  width: 185.5px;
  height: 92px;
  background: url(${({ pressed }) => (pressed ? clamPressImg.src : clamImg.src)}) left top no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  margin-right: 80px;
`;

const BtnWapper = styled.div`
  width: 609px;
  height: 92px;
  position: relative;
`;

const BtnBg = styled.div`
  width: 100%;
  height: 81px;
  background: url(${btnBgImg.src}) left bottom no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 0;
  bottom: 0;
`;

const Btn = styled.div<{ $active: boolean }>`
  width: 564px;
  height: 82px;
  background-image: url(${({ $active }) => ($active ? btnActiveImg.src : btnImg.src)});
  background-size: 100% 100%;
  position: absolute;
  top: 0px;
  left: 22px;
  cursor: pointer;
  transition: 0.1s;
  transform: translateY(0px);
  &.press {
    transform: translateY(11px);
  }
`;

const Cover = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 88px;
  background: url(${coverTopImg.src}) left top no-repeat;
  background-size: 100% 100%;
`;

function playSound(url: string): void {
  const sound = new window.Audio(url);
  sound.play();
}

function SlotMachine({
  totalSpins,
  availableSpins,
  chainList,
  handleSpin,
  queryRewards,
  reward,
  onRefresh,
  loading,
  rewards,
  rewardLoading,
}: any) {
  const { isStart, secondsRemaining } = useSwitcher();
  const [isPressed, setIsPressed] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const [ruleShow, setRuleShow] = useState(false);
  const [prizeShow, setPrizeShow] = useState(false);
  const [prizePoolShow, setPrizePoolShow] = useState(false);
  const [rewardShow, setRewardShow] = useState(false);
  const [list, setList] = useState<any>([]);

  const rewardRef = useRef(reward);

  const [rulePressed, setRulePressed] = useState(false);
  const [claimPressed, setClaimPressed] = useState(false);

  useEffect(() => {
    rewardRef.current = reward;
  }, [reward]);

  useEffect(() => {
    const randomList = [...Array(15).keys()].sort(() => 0.5 - Math.random());
    const tempList = randomList.filter((item, i) => i < 5).map((item) => DAPPS[item]);
    setList([...tempList, tempList[0], tempList[1]]);
  }, []);

  const handleBtnPress = useCallback(() => {
    playSound('/images/compass/audio/rolling.mp4');

    setTimeout(() => {
      if (rewardRef.current === 10000) {
        playSound('/images/compass/audio/grand-prize.mp3');
      } else if (rewardRef.current > 0) {
        playSound('/images/compass/audio/50PTS.mp3');
      }

      setPrizeShow(true);
    }, 12000);

    handleSpin();
    setTimeout(() => {
      setIsPressed(true);
      setIsPressing(true);
      setTimeout(() => {
        setIsPressed(false);
      }, 100);

      setTimeout(() => {
        setIsPressing(false);
      }, 11000);
    }, 300);
  }, [isPressing, isPressed, availableSpins, chainList]);

  return (
    <Wapper>
      <HeaderBg />
      <Bg />
      <div style={{ position: 'relative', zIndex: 2, paddingTop: 80 }}>
        <Pilcrow
          title="Earn Spins by completing the missions below"
          desc="Each mission you complete grants you spins, which can earn you rewards like gold, points, and tokens."
        />
        <Screen>
          {!isStart && <DisabledMark secondsRemaining={secondsRemaining} />}
          <Title />
          <SubTitle
            onRefresh={onRefresh}
            refreshing={loading}
            setPrizePoolShow={setPrizePoolShow}
            availableSpins={availableSpins}
            totalSpins={totalSpins}
          />
          <ControllerWapper>
            <Controller $active={isStart} />
            <ControllerBg></ControllerBg>
          </ControllerWapper>
          <ScrollWapper>
            <ControllerBtnBgWapper className="bg">
              <ControllerBtnBg className="left" />
              <ControllerBtnBg className="mid" />
              <ControllerBtnBg className="mid" />
              <ControllerBtnBg className="mid" />
              <ControllerBtnBg className="right" />
            </ControllerBtnBgWapper>
            <ControllerBtnBgWapper className="bg">
              {chainList.map((item: any, index: number) => {
                return <ScrollLine noIndex={index} key={index} startAni={isPressing} no={item} list={list} />;
              })}
            </ControllerBtnBgWapper>
            <Cover />
          </ScrollWapper>
          <ScoreWapper>
            <Rewards rewards={rewards} />
          </ScoreWapper>
        </Screen>
        <ActionBar>
          <Rules
            pressed={!isStart || rulePressed}
            style={{ cursor: isStart ? 'pointer' : 'not-allowed' }}
            onClick={() => {
              if (!isStart) return;
              setRuleShow(true);
              setRulePressed(true);
              setTimeout(() => {
                setRulePressed(false);
              }, 100);
            }}
          />
          <BtnWapper>
            <BtnBg />
            <Btn
              className={isPressed ? 'press' : ''}
              // $active={isStart && availableSpins > 0 && !isPressed && !isPressing}
              $active={false}
              onClick={() => {
                return;
                if (!isStart) return;
                if (isPressing || isPressed || availableSpins <= 0) {
                  return;
                }
                handleBtnPress();
              }}
              style={{ cursor: false ? 'pointer' : 'not-allowed' }}
            />
          </BtnWapper>
          <Clam
            pressed={!isStart || claimPressed}
            onClick={() => {
              if (!isStart) return;
              queryRewards();
              setRewardShow(true);
              setClaimPressed(true);
              setTimeout(() => {
                setClaimPressed(false);
              }, 100);
            }}
            style={{ cursor: isStart ? 'pointer' : 'not-allowed' }}
          />
        </ActionBar>
      </div>
      {ruleShow && (
        <RuleModal
          onClose={() => setRuleShow(false)}
          onShowModal={() => {
            setPrizePoolShow(true);
          }}
        />
      )}
      {prizeShow && <PrizeModal prize={reward} onClose={() => setPrizeShow(false)} />}
      {prizePoolShow && (
        <PrizePoolModal
          onClose={() => {
            setPrizePoolShow(false);
          }}
        />
      )}
      {rewardShow && (
        <RewardsModal
          onClose={() => {
            setRewardShow(false);
          }}
          loading={rewardLoading}
          rewards={rewards}
        />
      )}
    </Wapper>
  );
}

export default SlotMachine;
