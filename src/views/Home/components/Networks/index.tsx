import chainCofig from '@/config/chains';
import Badges from '@/views/AllDapps/components/Badges';
import NetworksBg from '@public/images/home/networks_bg.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useState, type CSSProperties, type FC, type ReactNode } from 'react';
import styled from 'styled-components';
import useRecommendNetwork from '../../hooks/useRecommendNetwork';

import chainsConfig, { IdToPath } from '@/config/all-in-one/chains';
import useDappOpen from '@/hooks/useDappOpen';
import { StyledContainer } from '@/styled/styles';
import hexToRgba from '@/utils/hexToRgba';
import { DappType } from '@/views/Profile/types';
import { useRouter } from 'next/router';
interface IProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

const Container = styled.div`
  /* position: relative; */
  width: 1244px;
  margin: 200px auto 54px;
`;
const StyledNetworksBg = styled.div`
  position: absolute;
  left: 0;
  top: 57px;
`
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-family: Montserrat;
  font-size: 42px;
  font-weight: 500;
  margin-bottom: 54px;

  .highlight {
    color: #ebf479;
    font-family: Montserrat;
    font-size: 42px;
    font-style: normal;
    font-weight: 700;
    line-height: 100%;
  }
`;
const ViewAll = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 11px;
  width: 118px;
  height: 48px;
  flex-shrink: 0;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border-radius: 10px;
  border: 1px solid #333648;
  background: #18191e;
  cursor: pointer;
  transition: all 0.3s linear;
`;

const PrimaryPanels = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .panel {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    position: relative;
    /* padding: 30px; */
    width: 614px;
    height: 350px;
    flex-shrink: 0;
    border-radius: 20px;
    border: 1px solid #202329;
    background: #18191e;
    backdrop-filter: blur(10px);
  }
  .panel-top {
    position: relative;
    width: 100%;
    flex: 1;
    padding: 30px 30px 0;
    &:hover {
      top: -5px;
    }
  }
  .odyssey-svg {
    position: absolute;
    right: -16px;
    top: -14px;
  }
  .head {
    display: flex;
    gap: 20px;
  }
  .intro {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .intro-title {
    color: #fff;
    font-family: Montserrat;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .intro-detail {
    display: flex;
    align-items: center;
    gap: 17px;
  }
  .dapp-title {
    margin-top: 82px;
    color: #fff;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  .panel-bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-radius: 20px;
    padding-left: 20px;
    

  }
  .panel-bottom-content {
    height: 83px;
    overflow: hidden;
    padding-top: 14px;
    &:hover {
      height: 163px;
      padding-top: 94px;
    }
  }
  .dapp-list-container {
    display: flex;
    align-items: center;
    gap: 14px;
    animation: translateLeft 5s linear infinite;
    animation-play-state: paused;
    &.start {
      animation-play-state: running;
    }
    @keyframes translateLeft {
      0% {
        transform: translate(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }
  }
  .dapp-list {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .dapp-message {
    display: flex;
    position: fixed;
    transform: translate(calc(-50% + 24px), calc(-100% - 14px));
    z-index: 10;
    width: 300px;
    padding: 14px;
    border-radius: 12px;
    border: 1px solid #333648;
    background: #1F2229;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    /* display: flex; */
    align-items: center;
    justify-content: space-between;
    .dapp-name {
      color: #FFF;
      font-family: Montserrat;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
    .dapp-categories {
      display: flex;
      align-items: center;
    }
    .dapp-category {
      padding: 6px 12px;
      font-family: Montserrat;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 100%; /* 12px */
      border-radius: 30px;
      color: #ACFCED;
      border: 1px solid #ACFCED;
    }
  }
  .dapp {
    position: relative;
    cursor: pointer;
    .dapp-image {
      border: 3px solid #202329;
      border-radius: 14px;
      overflow: hidden;
    }
    &:hover {
      top: -5px;
    }
    
  }
`;
const StyledDappCategory = styled.div`

  
`
const SubPanels = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .panel {
    cursor: pointer;
    text-align: center;
    padding-top: 40px;
    width: 234px;
    height: 220px;
    border-radius: 20px;
    border: 1px solid #202329;
    background: #18191e;
    backdrop-filter: blur(10px);
  }
  .title {
    margin: 17px auto 0;
    color: #fff;
    text-align: center;
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
const BadgesContainer = styled.div`
  padding-left: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledLogoWrapper = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 16px;
  margin: 0 auto;
`;
const StyledLogoEmpty = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 16px;
  background: #21222B;
`;

const StyledOdysseyImageList = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 34px;
  background: #21222B;
`
const StyledOdysseyImage = styled.img`
  border-radius: 50%;
  border: 2px solid #292B33;
  width: 20px;
  height: 20px;
`
const TopTvl = styled.div`
  position: absolute;
  width: 120px;
  bottom: -10px;
  left: -7px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  color: #000;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 16px */
  border-radius: 6px;
  border: 2px solid #101115;
  background: #00d1ff;
  img {
    position: absolute;
    left: -28px;
    top: -12px;
    transform: rotate(-10deg);

  }
`;
const Hottest = styled.div`
  position: absolute;
  width: 120px;
  bottom: -10px;
  left: -7px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  color: #000;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 16px */
  border-radius: 6px;
  border: 2px solid #101115;
  background: #FF79C2;
  img {
    position: absolute;
    left: -9px;
    top: -18px;
  }
`
const StyledPanelBg = styled.img`
  position: absolute;
  top: 79px;
  right: 30px;
  width: 207px;
  height: 179px;
  transform: translateX(-10000px);
  object-fit: contain;
`

const Dapp = ({ dapp, setCurrentDapp, setBoundingClientRect, onDappCardClick }: any) => {
  return (
    <div className='dapp'
      onMouseEnter={(event: any) => {
        setCurrentDapp(dapp)
        setBoundingClientRect(event?.target?.getBoundingClientRect())
      }}
      onMouseLeave={() => {
        setCurrentDapp(null)
        setBoundingClientRect(null)
      }}
      onClick={(event) => {
        event.stopPropagation()
        onDappCardClick && onDappCardClick(dapp)
      }}
    >
      <div className='dapp-image'>
        <Image src={dapp?.logo} width={42} height={42} alt={dapp?.name} />
      </div>
    </div>
  )
}
const PrimaryNetwork = ({ network, onDappCardClick, handleClickNetwork, isTopVolume }: any) => {
  const path = IdToPath[network?.id]
  const currentChain = chainsConfig[path]
  const [running, setRunning] = useState(false)
  const [currentDapp, setCurrentDapp] = useState<DappType | null>(null)
  const [boundingClientRect, setBoundingClientRect] = useState<any>(null)
  console.log('====currentChain', currentChain)
  return (
    <>
      <div
        className="panel"
        onMouseEnter={() => setRunning(true)}
        onMouseLeave={() => setRunning(false)}
        onClick={() => {
          handleClickNetwork(network)
        }}
      >
        <div className='panel-top'>
          <StyledPanelBg
            src={currentChain?.bgIcon}
            style={
              currentChain?.selectBgColor ? { filter: `drop-shadow(${hexToRgba(currentChain?.selectBgColor, 0.03)} 10000px 0)` } : {}
            } alt=""
          />
          {
            network?.odyssey?.length > 0 && (
              <div className='odyssey-svg'>
                <Image src={'/images/networks/odyssey.svg'} width={100} height={100} alt='odyssey' />
              </div>
            )
          }
          <div className="head">
            <div style={{ position: 'relative' }}>
              <Image src={network?.logo} width={106} height={106} alt="" />
              {
                isTopVolume ? (
                  <TopTvl>
                    <Image src={'/images/networks/icon-top.png'} width={47} height={47} alt="topVolume" />
                    TOP Volume
                  </TopTvl>
                ) : (
                  <Hottest>
                    <Image src={'/images/networks/icon-hot.gif'} width={54} height={54} alt="hottest" />
                    Hottest
                  </Hottest>
                )
              }
            </div>
            <div className="intro">
              <div className="intro-title">{network?.name}</div>
              <div className="intro-detail">
                <Badges
                  users={network?.participants}
                  rewards={network?.odyssey}
                  tradingVolume={network?.trading_volume}
                  tradingVolumeTooltip="Total trading volume on DapDap"
                  usersTooltip="User amount of this chain on DapDap"
                />
              </div>
            </div>
          </div>
          <div className="dapp-title">{network?.dapps?.length} dApps</div>
        </div>
        <div className='panel-bottom'>
          <div className='panel-bottom-content'>
            <div
              className={['dapp-list-container', running ? 'start' : ''].join(' ')}
              onMouseEnter={(event) => {
                setRunning(false)
              }}
              onMouseLeave={(event) => {
                setRunning(true)
              }}
            >
              <div className='dapp-list'>
                {
                  network?.dapps.map((dapp: any, index: number) => <Dapp key={index} dapp={dapp} setCurrentDapp={setCurrentDapp} setBoundingClientRect={setBoundingClientRect} onDappCardClick={onDappCardClick} />)
                }
              </div>
              <div className='dapp-list'>
                {
                  network?.dapps.map((dapp: any, index: number) => <Dapp key={index} dapp={dapp} setCurrentDapp={setCurrentDapp} setBoundingClientRect={setBoundingClientRect} onDappCardClick={onDappCardClick} />)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        currentDapp && boundingClientRect && (
          <div className='dapp-message' style={{ left: boundingClientRect.x, top: boundingClientRect.y }}>
            <div className='dapp-name'>{currentDapp?.name}</div>
            <div className='dapp-categories'>
              {
                currentDapp?.categories?.map((category: any, index: number) => {
                  return (
                    <div className='dapp-category' key={index} style={{ color: `rgb(${category.colorRgb})`, borderColor: `rgb(${category.colorRgb})` }}>
                      {category?.name}
                    </div>
                  )
                })
              }
            </div>
          </div>
        )
      }
    </>
  )
}

const SubNetwork = ({ network, handleClickNetwork }: any) => {
  return (
    <div className="panel" onClick={() => {
      handleClickNetwork(network)
    }}>
      <StyledLogoWrapper>
        {
          chainCofig[network?.chain_id]?.icon ? (
            <Image src={chainCofig[network?.chain_id]?.icon} width={72} height={72} alt={network?.name} />
          ) : (
            <StyledLogoEmpty />
          )
        }
      </StyledLogoWrapper>
      <div className="title">{network?.name}</div>
      <BadgesContainer>
        <Badges
          users={network?.participants}
          rewards={network?.odyssey}
          tradingVolume={network?.trading_volume}
        />
      </BadgesContainer>
    </div>
  )
}
const Networks: FC<IProps> = (props) => {
  const router = useRouter()
  const { open } = useDappOpen();
  const { recommendNetwork } = useRecommendNetwork()
  const onDappCardClick = function (dapp: any) {
    open({
      dapp,
      from: 'alldapps'
    })
  }
  const handleClickNetwork = function (network: any) {
    router.push(`/networks/${IdToPath[network?.id]}`)
  }
  return (
    <StyledContainer style={{ position: 'relative' }}>
      <StyledNetworksBg>
        <NetworksBg />
      </StyledNetworksBg>
      <Container>
        <Title>
          <span>
            EXPLORE
            <span className="highlight"> 15+ L2</span> NETWORKS
          </span>

          <ViewAll href="/networks">
            View all
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 5.2C0.558172 5.2 0.2 5.55817 0.2 6C0.2 6.44183 0.558172 6.8 1 6.8L1 5.2ZM15.5657 6.56569C15.8781 6.25327 15.8781 5.74674 15.5657 5.43432L10.4745 0.343147C10.1621 0.0307272 9.65557 0.0307272 9.34315 0.343147C9.03073 0.655566 9.03073 1.1621 9.34315 1.47452L13.8686 6L9.34314 10.5255C9.03073 10.8379 9.03073 11.3444 9.34314 11.6569C9.65556 11.9693 10.1621 11.9693 10.4745 11.6569L15.5657 6.56569ZM1 6.8L15 6.8L15 5.2L1 5.2L1 6.8Z"
                fill="white"
              ></path>
            </svg>
          </ViewAll>
        </Title>
        <PrimaryPanels>
          {
            recommendNetwork?.top_volume && (
              <PrimaryNetwork isTopVolume={true} network={recommendNetwork?.top_volume} onDappCardClick={onDappCardClick} handleClickNetwork={handleClickNetwork} />
            )
          }
          {
            recommendNetwork?.hottest && (
              <PrimaryNetwork isTopVolume={false} network={recommendNetwork?.hottest} onDappCardClick={onDappCardClick} handleClickNetwork={handleClickNetwork} />
            )
          }
        </PrimaryPanels>
        <SubPanels>
          {
            recommendNetwork?.list?.map((network: any, index: number) => <SubNetwork key={index} network={network} handleClickNetwork={handleClickNetwork} />)
          }
        </SubPanels>
      </Container>
    </StyledContainer>
  );
};

export default Networks;
