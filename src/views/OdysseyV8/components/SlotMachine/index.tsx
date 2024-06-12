import styled from 'styled-components';
import { useCallback, useState, useRef, useEffect } from 'react';

import Spin from './Spin';
import ScrollLine from './ScrollLine';
import RuleModal from './RuleModal';
import PrizeModal from './PrizeModal';

import titleImg from './img/title.svg';
import compassImg from './img/gold-rush.svg';
import controllerImg from './img/ctr.svg';
import controllerActiveImg from './img/ctr-active.svg';
import actionBg from './img/action-bg.svg';

import ruleImg from './img/rule.svg';
import clamImg from './img/clam.svg';
import rulePressImg from './img/rule-press.svg';
import clamPressImg from './img/clam-press.svg';
import btnBgImg from './img/btn-bg.svg';
import btnImg from './img/btn.svg';
import btnActiveImg from './img/btn-active.svg';
import chainIconsImg from './img/chianIcons.svg';
import coverTopImg from './img/cover-top.png';

import yellowLeftImg from './img/yellow-left.svg';
import yellowMidImg from './img/yellow-mid.svg';
import yellowRightImg from './img/yellow-right.svg';
import bgImg from './img/bg.svg';

import DisabledMark from './DisabledMark';
import Pilcrow from '../Pilcrow';
import PrizePoolModal from './PrizePoolModal';
import { BgFoot } from '../Spins/styles';
import useSwitcher from '../../hooks/useSwitcher';

const Wapper = styled.div`
  width: var(--main-width);
  margin: 60px auto 70px;
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
  overflow: hidden;
`;

const ChainIcons = styled.img`
  position: absolute;
  left: 35px;
  top: 22px;
  width: 60px;
  height: 60px;
`;

const Title = styled.div`
  background: url(${titleImg.src}) center center no-repeat;
  background-position: 0px 60px;
  width: 896px;
  height: 135px;
  margin: 0 auto;
  overflow: hidden;
  text-indent: -9999px;
`;

const CompassWapper = styled.div`
  position: absolute;
  background: url(${compassImg.src}) center center no-repeat;
  width: 207px;
  height: 68px;
  top: 46px;
  right: 30px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
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

const Score = styled.div`
  height: 72px;
  border-radius: 20px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #000;
  overflow: hidden;
`;

const ScoreBg = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 72px;
`;

const ScoreText = styled.div`
  color: #00ffd1;
  text-align: center;
  font-family: '5squared pixel';
  font-size: 26px;
  font-weight: 400;
  text-transform: capitalize;
  text-shadow: 2px 2px 10px #00ffd1;
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

interface Props {
  totalSpins: number;
  availableSpins: number;
  unclaimedReward: number;
  chainList: number[];
  handleSpin: () => void;
  handleClaim: () => void;
  isSpining: boolean;
  isClaiming: boolean;
  reward: number;
}

function playSound(url: string): void {
  const sound = new window.Audio(url);
  sound.play();
}

function SlotMachine({ totalSpins, availableSpins, unclaimedReward, chainList, handleSpin, reward }: Props) {
  const { isStart, secondsRemaining } = useSwitcher();
  const [isPressed, setIsPressed] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const [newUnclaimedReward, setNewunclaimedReward] = useState(unclaimedReward);
  const [ruleShow, setRuleShow] = useState(false);
  const [prizeShow, setPrizeShow] = useState(false);
  const [prizePoolShow, setPrizePoolShow] = useState(false);

  const rewardRef = useRef(reward);
  const unclaimedRewardRef = useRef(unclaimedReward);

  const [rulePressed, setRulePressed] = useState(false);
  const [claimPressed, setClaimPressed] = useState(false);

  useEffect(() => {
    rewardRef.current = reward;
  }, [reward]);

  useEffect(() => {
    if (!isPressing) {
      setNewunclaimedReward(unclaimedReward);
    }
    unclaimedRewardRef.current = unclaimedReward;
  }, [unclaimedReward]);

  const handleBtnPress = useCallback(() => {
    playSound('/images/compass/audio/rolling.mp4');

    setTimeout(() => {
      if (rewardRef.current === 10000) {
        playSound('/images/compass/audio/grand-prize.mp3');
      } else if (rewardRef.current > 0) {
        playSound('/images/compass/audio/50PTS.mp3');
      }

      setPrizeShow(true);
      setNewunclaimedReward(unclaimedRewardRef.current);
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
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Pilcrow
          title="SPIN-TO-WIN"
          desc="Each mission you complete grants you spins, which can earn you rewards like gold, points, and tokens"
        />
        <Screen>
          {!isStart && <DisabledMark secondsRemaining={secondsRemaining} />}
          <Title>DAPDAP JACKPOT</Title>
          <ChainIcons src={chainIconsImg.src} />
          <CompassWapper
            onClick={() => {
              setPrizePoolShow(true);
            }}
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
              {chainList.map((item, index) => {
                return <ScrollLine noIndex={index} key={index} startAni={isPressing} no={item} />;
              })}
            </ControllerBtnBgWapper>
            <Cover />
          </ScrollWapper>
          <ScoreWapper>
            <Score>
              <Spin
                renderChildren={() => (
                  <ScoreBg>
                    <ScoreText>Spins:</ScoreText>
                    <ScoreText>
                      {availableSpins} / {totalSpins}
                    </ScoreText>
                  </ScoreBg>
                )}
              />
            </Score>
            <Score>
              <Spin
                renderChildren={() => (
                  <ScoreBg>
                    <ScoreText>you win:</ScoreText>
                    {isStart ? <ScoreText>{newUnclaimedReward} pts</ScoreText> : <ScoreText>Not start yet!</ScoreText>}
                  </ScoreBg>
                )}
              />
            </Score>
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
              $active={isStart && availableSpins > 0 && !isPressed && !isPressing}
              onClick={() => {
                if (!isStart) return;
                if (isPressing || isPressed || availableSpins <= 0) {
                  return;
                }
                handleBtnPress();
              }}
              style={{ cursor: isStart ? 'pointer' : 'not-allowed' }}
            />
          </BtnWapper>
          <Clam
            pressed={!isStart || claimPressed}
            onClick={() => {
              if (!isStart) return;
              setClaimPressed(true);
              setTimeout(() => {
                setClaimPressed(false);
              }, 100);
            }}
            style={{ cursor: isStart ? 'pointer' : 'not-allowed' }}
          />
        </ActionBar>
      </div>
      {ruleShow && <RuleModal onClose={() => setRuleShow(false)} />}
      {prizeShow && <PrizeModal prize={reward} onClose={() => setPrizeShow(false)} />}
      {prizePoolShow && (
        <PrizePoolModal
          onClose={() => {
            setPrizePoolShow(false);
          }}
        />
      )}
    </Wapper>
  );
}

export default SlotMachine;
