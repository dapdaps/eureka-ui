import actionBg from '@public/images/others/odyssey/v1/components/SlotMachine/action-bg.svg?url'
import bottomChainIconsImg from '@public/images/others/odyssey/v1/components/SlotMachine/bottomChainIcons.svg?url'
import btnImg from '@public/images/others/odyssey/v1/components/SlotMachine/btn.svg?url'
import btnBgImg from '@public/images/others/odyssey/v1/components/SlotMachine/btn-bg.svg?url'
import chainIconsImg from '@public/images/others/odyssey/v1/components/SlotMachine/chianIcons.svg?url'
import clamImg from '@public/images/others/odyssey/v1/components/SlotMachine/clam.svg?url'
import clamPressImg from '@public/images/others/odyssey/v1/components/SlotMachine/clam-press.svg?url'
import coverLeftImg from '@public/images/others/odyssey/v1/components/SlotMachine/cover-left.svg?url'
import coverMidImg from '@public/images/others/odyssey/v1/components/SlotMachine/cover-mid.svg?url'
import coverRightImg from '@public/images/others/odyssey/v1/components/SlotMachine/cover-right.svg?url'
import coverTopImg from '@public/images/others/odyssey/v1/components/SlotMachine/cover-top.png'
import controllerImg from '@public/images/others/odyssey/v1/components/SlotMachine/ctr.png'
import prizeImg from '@public/images/others/odyssey/v1/components/SlotMachine/prize.svg?url'
import ruleImg from '@public/images/others/odyssey/v1/components/SlotMachine/rule.svg?url'
import rulePressImg from '@public/images/others/odyssey/v1/components/SlotMachine/rule-press.svg?url'
import titleImg from '@public/images/others/odyssey/v1/components/SlotMachine/title.svg?url'
import yellowLeftImg from '@public/images/others/odyssey/v1/components/SlotMachine/yellow-left.svg?url'
import yellowMidImg from '@public/images/others/odyssey/v1/components/SlotMachine/yellow-mid.svg?url'
import yellowRightImg from '@public/images/others/odyssey/v1/components/SlotMachine/yellow-right.svg?url'
import compassImg from '@public/images/others/odyssey/v1/odyssey.svg?url'
import { useCallback, useEffect,useRef, useState } from 'react';
import styled from 'styled-components';

import { postClaim } from '../../http/index'
import Spin from '../Spin'
import PrizeModal from './PrizeModal'
import RuleModal from './RuleModal';
import ScrollLine from './ScrollLine';

const Wapper = styled.div`
    width: var(--main-width);
    margin: 150px auto 0;
    position: relative;
    background: radial-gradient(50% 40% at 50% 35%, #EBF479 0%, rgba(235, 244, 121, 0) 100%);
`

const Screen = styled.div`
    width: 1000px;
    height: 524px;
    margin: 0 auto;
    border-radius: 30px;
    border: 1px;
    background: linear-gradient(180deg, rgba(64, 67, 76, 0.9) 0%, rgba(31, 33, 39, 0.9) 100%),
    linear-gradient(180deg, #66676D 0%, rgba(0, 0, 0, 0) 100%);
    position: relative;
`

const ChainIcons = styled.img`
    position: absolute;
    left: 0;
    top: 20px;
    width: 149px;
    height: 183px;
`

const BottomChainIcons = styled.img`
    position: absolute;
    right: 34px;
    bottom: 144px;
    width: 137px;
    height: 100px;
`

const Title = styled.div`
    background: url(${titleImg.src}) center center no-repeat;
    background-size: auto 40%;
    width: 752px;
    height: 135px;
    margin: 0 auto;
    overflow: hidden;
    text-indent: -9999px;
`

const Prize = styled.div`
    width: 528px;
    height: 85px;
    background: url(${prizeImg.src}) center center no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 70px;
    left: 380px;
`

const CompassWapper = styled.div`
    position: absolute;
    background: url(${compassImg.src}) center center no-repeat;
    background-size: 130%;
    width: 120px;
    height: 120px;
    top: 15px;
    right: 20px;
`

const ControllerWapper = styled.div`
    position: absolute;
    width: 100px;
    top: 150px;
    right: 50px;
`

const Controller = styled.div`
    width: 100px;
    height: 104px;
    background: url(${controllerImg.src}) center 0 no-repeat;
    background-size: auto 100%;
    position: absolute;
    z-index: 3;
    left: 0;
    top: 0;
`

const ControllerBg = styled.div`
    width: 26px;
    height: 54px;
    border-radius: 88px;
    position: absolute;
    z-index: 2;
    background: linear-gradient(180deg, #000000 35.51%, #1C1D1F 100%);
    left: calc(50% - 13px);
    top: 70px;
    box-shadow:inset 0px 0px 5px 0px rgba(75, 78, 88, 1);
    border: 2px solid;
    border-image-source: linear-gradient(180deg, #0B0D13 0%, #4B4E58 100%);
`



const ScrollWapper = styled.div`
    width: 777px;
    height: 167px;
    border-radius: 88px;
    background: linear-gradient(180deg, #0B0D13 0%, #373940 100%);
    margin: 38px auto 0 54px;
    position: relative;
`

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
`

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
`

const ControllerBtnCover = styled.div`
    width: 140px;
    height: 140px;
    /* background-size: 100% 100%; */
    background-repeat: no-repeat;
    &.left {
        background-image: url(${coverLeftImg.src});
    }
    &.mid {
        background-image: url(${coverMidImg.src});
    }
    &.right {
        background-image: url(${coverRightImg.src});
    }
`



const ScoreWapper = styled.div`
    display: flex;
    gap: 24px;
    margin: 55px 55px 0;
`

const Score = styled.div`
    height: 72px;
    border-radius: 20px;
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #000;
    overflow: hidden;
`

const ScoreBg = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    height: 72px;
`

const ScoreText = styled.div`
    font-family: 5squared pixel;
    font-size: 26px;
    font-weight: 400;
    line-height: 39px;
    color:rgba(0, 255, 209, 1);
`

const ActionBar = styled.div`
    height: 150px;
    background: url(${actionBg.src}) left top no-repeat;
    background-size: 100% 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 60px;
`


const Rules = styled.div<{ pressed: boolean }>`
    width: 185.5px;
    height: 92px;
    background:  url(${({ pressed }) => pressed ? rulePressImg.src : ruleImg.src}) left top no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
`

const Clam = styled.div<{ pressed: boolean }>`
    width: 185.5px;
    height: 92px;
    background:  url(${({ pressed }) => pressed ? clamPressImg.src : clamImg.src}) left top no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    opacity: .1;
`

const BtnWapper = styled.div`
    width: 609px;
    height: 92px;
    position: relative;
`

const BtnBg = styled.div`
    width: 100%;
    height: 81px;
    background: url(${btnBgImg.src}) left bottom no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    bottom: 0;
`

const Btn = styled.div`
    width: 100%;
    height: 82px;
    background-image: url(${btnImg.src});
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    transition: all .3s;
    &.press {
        top: 11px;
    }
`

const Cover = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 88px;
    background: url(${coverTopImg.src}) left top no-repeat;
    background-size: 100% 100%;
`

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
    const sound = new window.Audio(url)
    sound.play()
}

function SlotMachine({
    totalSpins,
    availableSpins,
    unclaimedReward,
    chainList,
    handleSpin,
    handleClaim,
    isSpining,
    isClaiming,
    reward,
}: Props) {
    const [isPressed, setIsPressed] = useState(false)
    const [isPressing, setIsPressing] = useState(false)
    const [newUnclaimedReward, setNewunclaimedReward] = useState(unclaimedReward)
    const [ruleShow, setRuleShow] = useState(false)
    const [prizeShow, setPrizeShow] = useState(false)

    const rewardRef = useRef(reward)
    const unclaimedRewardRef = useRef(unclaimedReward)

    const [rulePressed, setRulePressed] = useState(false)
    const [claimPressed, setClaimPressed] = useState(false)

    useEffect(() => {
        rewardRef.current = reward
    }, [reward])

    useEffect(() => {
        if (!isPressing) {
            setNewunclaimedReward(unclaimedReward)
        }
        unclaimedRewardRef.current = unclaimedReward
    }, [unclaimedReward])

    const handleBtnPress = useCallback(() => {
        if (isPressing || isPressed || availableSpins <= 0) {
            return
        }

        playSound('/images/compass/audio/rolling.mp4')

        setTimeout(() => {
            if (rewardRef.current === 10000) {
                playSound('/images/compass/audio/grand-prize.mp3')
            } else if (rewardRef.current > 0) {
                playSound('/images/compass/audio/50PTS.mp3')
            }

            setPrizeShow(true)
            setNewunclaimedReward(unclaimedRewardRef.current)
        }, 12000)


        handleSpin()
        setTimeout(() => {
            setIsPressed(true)
            setIsPressing(true)
            setTimeout(() => {
                setIsPressed(false)
            }, 100)

            setTimeout(() => {
                setIsPressing(false)
            }, 11000)

        }, 300)

    }, [isPressing, isPressed, availableSpins, chainList])

    return <Wapper>
        <Screen>
            <Title>DAPDAP JACKPOT</Title>
            <Prize />
            <ChainIcons src={chainIconsImg.src} />

            <CompassWapper />
            <ControllerWapper>
                <Controller />
                <ControllerBg>
                </ControllerBg>
            </ControllerWapper>
            <ScrollWapper>
                <ControllerBtnBgWapper className='bg'>
                    <ControllerBtnBg className='left' />
                    <ControllerBtnBg className='mid' />
                    <ControllerBtnBg className='mid' />
                    <ControllerBtnBg className='mid' />
                    <ControllerBtnBg className='right' />
                </ControllerBtnBgWapper>
                <ControllerBtnBgWapper className='bg'>
                    {
                        chainList.map((item, index) => {
                            return <ScrollLine
                                noIndex={index}
                                key={index}
                                startAni={isPressing}
                                no={item} />
                        })
                    }
                </ControllerBtnBgWapper>
                {/* <ControllerBtnBgWapper className='cover'>
                    <ControllerBtnCover className='left' />
                    <ControllerBtnCover className='mid' />
                    <ControllerBtnCover className='mid' />
                    <ControllerBtnCover className='mid' />
                    <ControllerBtnCover className='right' />
                </ControllerBtnBgWapper> */}
                <Cover />
            </ScrollWapper>
            <ScoreWapper>
                <Score>
                    <Spin renderChildren={() => <ScoreBg>
                        <ScoreText>Spins:</ScoreText>
                        <ScoreText>{availableSpins} / {totalSpins}</ScoreText>
                    </ScoreBg>} />
                </Score>
                <Score>
                    <Spin renderChildren={() => <ScoreBg>
                        <ScoreText>you win:</ScoreText>
                        <ScoreText>{newUnclaimedReward} pts</ScoreText>
                    </ScoreBg>} />
                </Score>
            </ScoreWapper>

            <BottomChainIcons src={bottomChainIconsImg.src} />
        </Screen>

        <ActionBar>
            <Rules pressed={rulePressed} onClick={() => {
                setRuleShow(true)
                setRulePressed(true)
                setTimeout(() => {
                    setRulePressed(false)
                }, 100)
            }} />
            <BtnWapper>
                <BtnBg />
                <Btn style={{ opacity: availableSpins <= 0 ? '.3' : '1' }} className={isPressed ? 'press' : ''} onClick={handleBtnPress} />
            </BtnWapper>
            <Clam pressed={claimPressed} onClick={() => {
                handleClaim()
                if (newUnclaimedReward <= 0) {
                    return
                }
                setClaimPressed(true)
                setTimeout(() => {
                    setClaimPressed(false)
                }, 100)
            }} style={{ opacity: newUnclaimedReward <= 0 ? '.3' : '1' }} />
        </ActionBar>

        <RuleModal show={ruleShow} onClose={() => setRuleShow(false)} />
        <PrizeModal prize={reward} show={prizeShow}
            onClaim={() => {
                handleClaim
            }} onClose={() => setPrizeShow(false)} />
    </Wapper>
}

export default SlotMachine