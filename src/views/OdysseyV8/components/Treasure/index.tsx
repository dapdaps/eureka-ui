import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { container } from '@/components/animation';
import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { StyledFlex } from '@/styled/styles';
import CoinGroup from '@/views/OdysseyV4/components/Treasure/CoinGroup';
import AddLiquidityModal from '@/views/Pool/AddLiquidityModal';
import SkakeModel from '@/views/StakeModal/index';

import useParticleReport from '../../hooks/useParticleReport';
import Line from '../Line';
import Modal from '../Modal';
import Trapeziform from '../Trapeziform';
import TrapeziformBtn from '../TrapeziformBtn';
import ThrusterCoinListStep1 from './1-1';
import Modal1 from './Modal1';
import Modal3 from './Modal3';
import Modal5 from './Modal5';
import Spins from './Spins';
import {
  Badge,
  IconGroup,
  ModalBody,
  ModalDesc,
  ModalIconGroup,
  ModalTitle,
  StyledContainer,
  StyledContent,
  Title,
  ToDappButton,
  Treasure1,
  Treasure2,
  Treasure3,
  Treasure4,
  Treasure5,
  Treasure6
} from './styles';

const ThrusterCoinListStep2 = [
  {
    key: 1,
    icon: ['/images/odyssey/v4/coin-juice.svg', '/images/odyssey/v4/coin-weth1.svg'],
    name: ['JUICE', 'WETH']
  },
  {
    key: 2,
    icon: ['/images/odyssey/v4/coin-pac.svg', '/images/odyssey/v4/coin-weth1.svg'],
    name: ['PAC', 'WETH']
  },
  {
    key: 3,
    icon: ['/images/odyssey/v4/coin-kap.svg', '/images/odyssey/v4/coin-weth1.svg'],
    name: ['KAP', 'WETH']
  },
  {
    key: 4,
    icon: ['/images/odyssey/v4/coin-yield.svg', '/images/odyssey/v4/coin-weth1.svg'],
    name: ['YIELD', 'WETH']
  },
  {
    key: 5,
    icon: ['/images/odyssey/v4/coin-glory.svg', '/images/odyssey/v4/coin-weth1.svg'],
    name: ['GLORY', 'WETH']
  }
];

export default function Treasure({ strategies }: any) {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const [showModal6, setShowModal6] = useState(false);
  const [showRenzo, setShowRenzo] = useState(false);
  const [selectedPool, setSelectedPool] = useState('');
  const linkRef = useRef<any>();

  const TrapLayout = {
    borderColor: '#FFDD4D',
    corner: 34
  };
  const { check } = useAuthCheck({ isNeedAk: true });
  const { account } = useAccount();
  const openLink = (_link: string) => {
    window.open(_link, '_blank');
  };

  const handleReportLink = (_link: string) => {
    linkRef.current = _link;
    if (!account) {
      check();
    } else {
      onStartReport();
    }
  };
  const reportCallback = () => {
    openLink(linkRef.current);
  };
  const { loading: reportLoading, onStartReport } = useParticleReport(reportCallback);

  return (
    <AnimatePresence mode="wait">
      <StyledContainer {...container}>
        {showModal1 ? (
          <Modal1 setShowModal1={setShowModal1} setSelectedPool={setSelectedPool} openLink={openLink} />
        ) : null}
        {showModal2 ? (
          <Modal type="type2" onClose={() => setShowModal2(false)}>
            <ModalTitle>
              How to earn <Image src="/images/odyssey/v4/td4.svg" alt="" width={79} height={22} /> by Renzo / Hyperlock
              / Particle?
            </ModalTitle>
            <ModalDesc>
              This strategy enables users to earn Renzo points & Eigenlayer Point & Blast points & Blast gold & Thruster
              points & Hyperlock points/Particle points + some APR
            </ModalDesc>
            <ModalBody>
              <div className="modal-body">
                <Trapeziform {...TrapLayout} className="modal-list">
                  <div className="modal-list-head">
                    <div className="head-left">
                      <div className="head-title">Step 1-A. Get ezETH from </div>
                      <div className="tag-thr">
                        <Image src="/images/odyssey/v4/tag-renzo.svg" alt="" width={93} height={24} />
                      </div>
                    </div>
                    <div className="tag-points">
                      <Image
                        src="/images/odyssey/v4/icon-renzo.svg"
                        alt=""
                        width={16}
                        height={16}
                        style={{ marginRight: 5 }}
                      />
                      ezPoints
                    </div>
                  </div>
                  <div className="modal-list-body">
                    <div className="body-left" style={{ color: 'white' }}>
                      <Image src="/images/odyssey/v4/coin-eth.svg" alt="" width={26} height={26} />
                      ETH
                      <Image src="/images/odyssey/v4/arrow-white.svg" alt="" width={19} height={16} />
                      <Image src="/images/odyssey/v4/coin-ezeth.svg" alt="" width={26} height={26} />
                      ezETH
                    </div>
                    <div className="body-right">
                      <TrapeziformBtn
                        onClick={() => {
                          setShowRenzo(true);
                        }}
                        width="286px"
                        height="42px"
                      >
                        Restake
                        <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                      </TrapeziformBtn>
                    </div>
                  </div>
                </Trapeziform>
                <Trapeziform {...TrapLayout} className="modal-list">
                  <div className="modal-list-head">
                    <div className="head-left">
                      <div className="head-title">Step 1-B. Use Super Bridge bridge ezETH to Blast </div>
                    </div>
                  </div>
                  <div className="modal-list-body">
                    <div className="body-left" style={{ color: 'white' }}>
                      <Image src="/images/odyssey/v4/coin-ezeth.svg" alt="" width={26} height={26} />
                      ezETH
                      <Image src="/images/odyssey/v4/arrow-white.svg" alt="" width={19} height={16} />
                      <Image src="/assets/images/blast.png" alt="" width={26} height={26} />
                      Blast
                    </div>
                    <div className="body-right">
                      <TrapeziformBtn
                        onClick={() => {
                          openLink('/super-bridge');
                        }}
                        width="286px"
                        height="42px"
                      >
                        Bridge now
                        <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                      </TrapeziformBtn>
                    </div>
                  </div>
                </Trapeziform>
                <Trapeziform {...TrapLayout} className="modal-list">
                  <div className="modal-list-head">
                    <div className="head-left">
                      <div className="head-title">Step 2. Add ezETH/WETH Liquidity on</div>
                      <div className="tag-thr">
                        <Image src="/images/odyssey/v4/tag-thr.svg" alt="" width={139} height={24} />
                      </div>
                    </div>
                    <div className="tag-points">
                      <Image
                        src="/images/odyssey/v4/icon-thruster.svg"
                        alt=""
                        width={16}
                        height={16}
                        style={{ marginRight: 5 }}
                      />
                      Thruster Credits
                    </div>
                  </div>
                  <div className="modal-list-body">
                    <div className="body-left">
                      <CoinGroup
                        icon={['/images/odyssey/v4/coin-ezeth.svg', '/images/odyssey/v4/coin-weth2.svg']}
                        name={['ezETH', 'WETH']}
                        onClick={() => {
                          setSelectedPool('ezETH,WETH');
                        }}
                      />
                    </div>
                    <div className="body-right">
                      <TrapeziformBtn
                        width="286px"
                        height="42px"
                        handleClick={(e: any) => openLink(`${location.origin}/dapp/thruster-liquidity`)}
                      >
                        Add Liquidity <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                      </TrapeziformBtn>
                    </div>
                  </div>
                </Trapeziform>
                <div className="modal-body-2">
                  <Trapeziform {...TrapLayout} className="modal-sec-2">
                    <div className="step">Step 3-A.</div>
                    <div className="desc">
                      Provide LP on
                      <div className="tag-thr">
                        <Image src="/images/odyssey/v4/tag-hyp.svg" alt="" width={107} height={22} />
                      </div>
                    </div>

                    {/* <div className="tag-coins"> */}
                    <Image src="/images/odyssey/v4/hpgroups.svg" alt="" width={68} height={26} className="" />
                    {/* </div> */}
                    <div className="coin-pairs">
                      <div className="pairs">
                        <Image src="/images/odyssey/v4/coin-ezeth.svg" alt="" width={26} height={26} />
                        <Image
                          src="/images/odyssey/v4/coin-weth1.svg"
                          alt=""
                          width={26}
                          height={26}
                          style={{ marginLeft: -10 }}
                        />
                      </div>

                      <div className="txt">ezETH / WETH</div>
                    </div>
                    <TrapeziformBtn
                      width="236px"
                      height="42px"
                      handleClick={(e: any) => openLink(`${location.origin}/dapp/hyperlock`)}
                    >
                      Stake LP
                      <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                    </TrapeziformBtn>
                  </Trapeziform>
                  <Trapeziform {...TrapLayout} className="modal-sec-2">
                    <div className="step">Step 3-B.</div>
                    <div className="desc">
                      Provide LP on
                      <div className="tag-thr">
                        <Image src="/images/odyssey/v4/tag-par.svg" alt="" width={107} height={22} />
                      </div>
                    </div>

                    <div className="tag-coins">
                      <Image src="/images/odyssey/v4/icon-particle.svg" alt="" width={22} height={22} className="" />
                      Particle Points
                    </div>
                    <div className="coin-pairs">
                      <div className="pairs">
                        <Image src="/images/odyssey/v4/coin-ezeth.svg" alt="" width={26} height={26} />
                        <Image
                          src="/images/odyssey/v4/coin-weth.svg"
                          alt=""
                          width={26}
                          height={26}
                          style={{ marginLeft: -10 }}
                        />
                      </div>

                      <div className="txt">ezETH / WETH</div>
                    </div>
                    <TrapeziformBtn
                      width="236px"
                      height="42px"
                      loading={reportLoading}
                      handleClick={(e: any) => handleReportLink('https://app.particle.trade/earn')}
                    >
                      Stake LP
                      <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                    </TrapeziformBtn>
                  </Trapeziform>
                </div>
              </div>
            </ModalBody>
          </Modal>
        ) : null}
        {showModal3 ? <Modal3 setShowModal3={setShowModal3} openLink={openLink} /> : null}

        {showModal4 ? (
          <Modal type="type4" onClose={() => setShowModal4(false)}>
            <ModalTitle>
              How to earn
              <ModalIconGroup className="td2">
                <Image src="/images/odyssey/v4/icon-thruster.svg" alt="" width={22} height={22} className="" />
                <Image src="/images/odyssey/v4/icon-particle.svg" alt="" width={22} height={22} className="" />
                <Image src="/images/odyssey/v4/icon-hyperlock.svg" alt="" width={22} height={22} className="" />
              </ModalIconGroup>
              by Thruster / Hyperlock / Particle?
            </ModalTitle>
            <ModalDesc>
              This strategy enables users to earn XP points & Blast points & Blast gold & Thruster Credits & Hyperlock
              points/Particle points + some APR.
            </ModalDesc>
            <ModalBody>
              <div className="modal-body">
                <Trapeziform {...TrapLayout} className="modal-list">
                  <div className="modal-list-head">
                    <div className="head-left">
                      <div className="head-title">Step 1. Swap mwstETH-WPUNKS on</div>
                      <div className="tag-thr">
                        <Image src="/images/odyssey/v4/tag-thr.svg" alt="" width={139} height={24} />
                      </div>
                    </div>
                    <div className="tag-points">XP points</div>
                  </div>
                  <div className="modal-list-body">
                    <div className="body-left">
                      <Image src="/images/odyssey/v4/coin-mwesteth.svg" alt="" width={26} height={26} />
                      <div className="body-left-content">
                        <div className="body-left-content-title">mwstETH-WPUNKS</div>
                        <div className="body-left-content-desc">Metastreet V2 Deposit: WPUNKS-wstETH</div>
                      </div>
                    </div>
                    <div className="body-right">
                      <TrapeziformBtn
                        width="286px"
                        height="42px"
                        handleClick={(e: any) => openLink(`${location.origin}/dapp/thruster-finance`)}
                      >
                        Swap mwstETH-WPUNKS <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                      </TrapeziformBtn>
                    </div>
                  </div>
                </Trapeziform>
                <Trapeziform {...TrapLayout} className="modal-list">
                  <div className="modal-list-head">
                    <div className="head-left">
                      <div className="head-title">Step 2. Add LP mwstETH-WPUNKS / WETH on</div>
                      <div className="tag-thr">
                        <Image src="/images/odyssey/v4/tag-thr.svg" alt="" width={139} height={24} />
                      </div>
                    </div>
                    <div className="tag-points">XP points</div>
                  </div>
                  <div className="modal-list-body">
                    <div className="body-left">
                      <CoinGroup
                        icon={['/images/odyssey/v4/coin-mwesteth.svg', '/images/odyssey/v4/coin-weth2.svg']}
                        name={['mwstETH-WPUNKS', 'WETH']}
                        onClick={() => {
                          setSelectedPool('mwstETH-WPUNKS:20,WETH');
                        }}
                      />
                    </div>
                    <div className="body-right">
                      <TrapeziformBtn
                        width="286px"
                        height="42px"
                        handleClick={(e: any) => openLink(`${location.origin}/dapp/thruster-liquidity`)}
                      >
                        Add Liquidity
                        <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                      </TrapeziformBtn>
                    </div>
                  </div>
                </Trapeziform>
                <div className="modal-body-2">
                  <Trapeziform {...TrapLayout} className="modal-sec-2">
                    <div className="step">Step 2-A.</div>
                    <div className="desc">
                      Provide LP on
                      <div className="tag-thr">
                        <Image src="/images/odyssey/v4/tag-hyp.svg" alt="" width={107} height={22} />
                      </div>
                    </div>

                    <div className="tag-coins">
                      <Image src="/images/odyssey/v4/icon-thruster.svg" alt="" width={20} height={20} className="" />
                      <Image src="/images/odyssey/v4/icon-hyperlock.svg" alt="" width={20} height={20} className="" />
                    </div>
                    <div className="coin-pairs">
                      <div className="pairs">
                        <Image src="/images/odyssey/v4/coin-mwesteth.svg" alt="" width={26} height={26} />
                        <Image
                          src="/images/odyssey/v4/coin-weth1.svg"
                          alt=""
                          width={26}
                          height={26}
                          style={{ marginLeft: -10 }}
                        />
                      </div>

                      <div className="txt">
                        mwstETH-WPUNKS <br />/ WETH
                      </div>
                    </div>
                    <TrapeziformBtn
                      width="236px"
                      height="42px"
                      handleClick={(e: any) => openLink(`${location.origin}/dapp/hyperlock`)}
                    >
                      Stake LP <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                    </TrapeziformBtn>
                  </Trapeziform>
                  <Trapeziform {...TrapLayout} className="modal-sec-2">
                    <div className="step">Step 2-B.</div>
                    <div className="desc">
                      Provide LP on
                      <div className="tag-thr">
                        <Image src="/images/odyssey/v4/tag-par.svg" alt="" width={107} height={22} />
                      </div>
                    </div>

                    <div className="tag-coins">
                      <Image src="/images/odyssey/v4/icon-particle.svg" alt="" width={22} height={22} className="" />
                      Particle Points
                    </div>
                    <div className="coin-pairs">
                      <div className="pairs">
                        <Image src="/images/odyssey/v4/coin-mwesteth.svg" alt="" width={26} height={26} />
                        <Image
                          src="/images/odyssey/v4/coin-weth.svg"
                          alt=""
                          width={26}
                          height={26}
                          style={{ marginLeft: -10 }}
                        />
                      </div>

                      <div className="txt">
                        mwstETH-WPUNKS <br />/ WETH
                      </div>
                    </div>
                    <TrapeziformBtn
                      width="236px"
                      height="42px"
                      loading={reportLoading}
                      handleClick={(e: any) => handleReportLink('https://app.particle.trade/earn')}
                    >
                      Stake LP <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                    </TrapeziformBtn>
                  </Trapeziform>
                </div>
              </div>
            </ModalBody>
          </Modal>
        ) : null}
        {showModal5 ? <Modal5 setShowModal5={setShowModal5} openLink={openLink} reportLoading={reportLoading} /> : null}
        {showModal6 ? (
          <Modal
            type="type6"
            onClose={() => setShowModal6(false)}
            className="modal-6"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              top: 150,
              marginBottom: 100,
              width: 900
            }}
          >
            <ModalTitle>How to participate in a 2x Gold boosted strategy on Thruster and Hyperlock?</ModalTitle>
            <ModalDesc>
              Utilize the 2x boosted Thruster and Hyperlock Gold Rush events by adding liquidity to the top 15 Blast
              native coin pools. Maximize your gains effortlessly!
            </ModalDesc>
            <ModalBody>
              <Trapeziform {...TrapLayout} className="modal-list" style={{ padding: '20px 12px' }}>
                <div className="modal-list-head">
                  <div className="head-left">
                    <StyledFlex gap="7px" className="head-title" style={{ paddingLeft: '5px' }}>
                      <span>Step 1. Create a new position on</span>
                      <Image src="/images/odyssey/v4/thruster-rect.svg" alt="" width={156} height={36} />
                      <span>to gain 2x Gold.</span>
                    </StyledFlex>
                  </div>
                </div>
                <StyledFlex
                  justifyContent="flex-start"
                  alignItems="center"
                  style={{
                    marginTop: 15,
                    flexWrap: 'wrap',
                    gap: '10px 8px'
                  }}
                >
                  {ThrusterCoinListStep1.map((coin) => (
                    <CoinGroup
                      key={coin.key}
                      icon={coin.icon}
                      name={coin.name}
                      fee={coin.fee}
                      onClick={() => {
                        openLink(coin.link);
                      }}
                    />
                  ))}
                </StyledFlex>
                <div
                  className="modal-list-foot"
                  style={{
                    justifyContent: 'flex-start'
                  }}
                >
                  <ToDappButton onClick={(e: any) => openLink('https://app.thruster.finance/add')}>
                    <span>Thruster dApp</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" viewBox="0 0 22 16" fill="none">
                      <path
                        d="M1 7C0.447715 7 -4.82822e-08 7.44772 0 8C4.82822e-08 8.55228 0.447715 9 1 9L1 7ZM21.7071 8.7071C22.0976 8.31658 22.0976 7.68342 21.7071 7.29289L15.3431 0.928931C14.9526 0.538407 14.3195 0.538407 13.9289 0.928931C13.5384 1.31946 13.5384 1.95262 13.9289 2.34314L19.5858 8L13.9289 13.6569C13.5384 14.0474 13.5384 14.6805 13.9289 15.0711C14.3195 15.4616 14.9526 15.4616 15.3431 15.0711L21.7071 8.7071ZM1 9L21 9L21 7L1 7L1 9Z"
                        fill="currentColor"
                      />
                    </svg>
                  </ToDappButton>
                </div>
              </Trapeziform>
              <Trapeziform {...TrapLayout} className="modal-list" style={{ padding: '20px 12px' }}>
                <div className="modal-list-head">
                  <div className="head-left">
                    <StyledFlex gap="7px" className="head-title" style={{ paddingLeft: '5px' }}>
                      <span>Step 2. Stake your LPs on</span>
                      <Image src="/images/odyssey/v4/hyperlock-rect.svg" alt="" width={140} height={36} />
                      <span> and get extra another Gold from them</span>
                    </StyledFlex>
                  </div>
                </div>
                <StyledFlex
                  justifyContent="flex-start"
                  alignItems="center"
                  style={{
                    marginTop: 15,
                    flexWrap: 'wrap'
                  }}
                >
                  {ThrusterCoinListStep2.map((coin) => (
                    <CoinGroup
                      key={coin.key}
                      icon={coin.icon}
                      name={coin.name}
                      style={{
                        flexBasis: '25%',
                        marginBottom: 20
                      }}
                    />
                  ))}
                </StyledFlex>
                <div className="modal-list-foot">
                  <TrapeziformBtn
                    width="286px"
                    height="42px"
                    handleClick={(e: any) => openLink(`${location.origin}/dapp/hyperlock`)}
                  >
                    Stake LP <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                  </TrapeziformBtn>
                </div>
              </Trapeziform>
            </ModalBody>
          </Modal>
        ) : null}

        <div style={{ color: '#979ABE', fontSize: '20px', paddingBottom: '160px', textAlign: 'center' }}>
          Explore Blast treasure strategy, maximize your Blast Gold earnings and get 10 spins for each!
        </div>

        <StyledContent className="row-top">
          <Treasure1 onClick={() => setShowModal1(true)}>
            <Spins active={strategies['strategy_particle_duo_ring_juice']} />
            <Line />
            <Image
              src="/images/odyssey/v8/star1.svg"
              alt=""
              width={314}
              height={170}
              className="scale"
              style={{ marginTop: -5 }}
            />
            <Title className="title">
              Particle & Duo & Ring: <br />
              Maximise Points or Yield?
            </Title>
            {/* <Image src="/images/odyssey/v4/icon-gold.svg" alt="" width={42} height={42} className="td1" /> */}
            {/* <div className="badge">
          </div> */}
            <Badge className="td1">
              <Image className="badge-icon" src="/images/odyssey/v4/icon-gold.svg" alt="" width={40} height={40} />
              <span className="badge-title">Extra Gold</span>
            </Badge>
          </Treasure1>
          <Treasure2 onClick={() => setShowModal6(true)}>
            <Spins
              style={{
                left: 172
              }}
              active={strategies['strategy_thruster_hyperlock']}
            />
            <Line />
            <Image src="/images/odyssey/v8/star2.svg" alt="" width={363} height={170} className="scale pac" />
            <Title className="title title1">
              Thruster & Hyperlock: <br />
              2x Booster Pools
            </Title>

            <div className="td2">
              <Badge>
                <Image className="badge-icon" src="/images/odyssey/v4/icon-gold.svg" alt="" width={40} height={40} />
                <span className="badge-title">2x</span>
              </Badge>
              <Badge>
                <Image className="badge-icon" src="/images/odyssey/v4/icon-gold.svg" alt="" width={40} height={40} />
                <span className="badge-title">Extra Gold</span>
              </Badge>
            </div>
          </Treasure2>
          <Treasure3 onClick={() => setShowModal5(true)}>
            <Spins
              style={{
                left: -12
              }}
              active={strategies['strategy_juice']}
            />
            <Line />
            <Image src="/images/odyssey/v4/juice.svg" alt="" width={170} height={170} className="scale" />
            <Title className="title" style={{ textAlign: 'right', top: '-26px' }}>
              Juice: <br />
              3x Leverage <br />
              Vaults
            </Title>
            <div className="td3">
              <Image src="/images/odyssey/v4/td3.svg" alt="" width={106} height={26} />
              <Badge>
                <Image className="badge-icon" src="/images/odyssey/v4/icon-gold.svg" alt="" width={40} height={40} />
                <span className="badge-title">Extra Gold</span>
              </Badge>
            </div>
          </Treasure3>
        </StyledContent>
        <StyledContent className="row-bot" style={{ marginTop: 60 }}>
          <Treasure4 onClick={() => setShowModal2(true)}>
            <Spins
              style={{
                left: 172
              }}
              active={strategies['strategy_renzo_thruster_hyperlock_particle']}
            />
            <Line />
            <Image
              src="/images/odyssey/v4/star4.svg"
              alt=""
              width={408}
              height={221}
              style={{
                top: 120
              }}
              className="scale star4"
            />
            <Title className="title title1">Renzo LRT</Title>
            <Image src="/images/odyssey/v4/td4.svg" alt="" width={118} height={26} className="td4" />
          </Treasure4>
          <Treasure5 onClick={() => setShowModal3(true)}>
            <Spins
              style={{
                left: 170
              }}
              active={strategies['strategy_thruster_orbit_juice']}
            />
            <Line />
            <Image
              src="/images/odyssey/v8/treasure5.svg"
              alt=""
              width={335}
              height={187}
              className="scale pac"
              style={{
                marginRight: 130,
                top: 120
              }}
            />
            <Title className="title title1">
              Ethena:
              <br />
              125x Stats with USDe
            </Title>
            <div style={{ display: 'flex', position: 'absolute', gap: 8, top: 41, left: -15 }}>
              <Badge style={{ padding: '0px 10px' }}>Up to 125x Sats</Badge>
              <Badge>
                <Image className="badge-icon" src="/images/odyssey/v4/icon-gold.svg" alt="" width={40} height={40} />
                <span className="badge-title">4x</span>
              </Badge>
            </div>
            <IconGroup className="td5" style={{ top: 72 }}>
              <Image src="/images/odyssey/v8/treasure5-apps.svg" alt="" width={83} height={26} className="" />
            </IconGroup>
          </Treasure5>
          <Treasure6 onClick={() => setShowModal4(true)}>
            <Spins
              style={{
                left: 30
              }}
              active={strategies['strategy_thruster_thruster_hyperlock_particle']}
            />
            <Line />
            <Image
              src="/images/odyssey/v4/star3.svg"
              style={{
                top: 120
              }}
              alt=""
              width={340}
              height={196}
              className="scale star3"
            />
            <Title className="title">
              Metastreet ERC404:
              <br />
              Swap & Add LP
              <br />
            </Title>
            <IconGroup className="td6">
              <Image src="/images/odyssey/v4/icon-thruster.svg" alt="" width={26} height={26} className="" />
              <Image src="/images/odyssey/v4/icon-particle.svg" alt="" width={26} height={26} className="" />
              <Image src="/images/odyssey/v4/icon-hyperlock.svg" alt="" width={26} height={26} className="" />
            </IconGroup>
          </Treasure6>
        </StyledContent>
        {showRenzo && (
          <SkakeModel
            stakeType="renzo"
            onClose={() => {
              setShowRenzo(false);
            }}
          />
        )}
        <AddLiquidityModal
          open={!!selectedPool}
          dapp={{
            path: 'thruster-liquidity',
            name: 'Thruster Pool'
          }}
          chain={{
            chain_id: 81457,
            name: 'Blast'
          }}
          defaultTokens={selectedPool}
          onClose={() => {
            setSelectedPool('');
          }}
        />
      </StyledContainer>
    </AnimatePresence>
  );
}
