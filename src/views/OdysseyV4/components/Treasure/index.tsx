import Image from 'next/image';
import { useRef, useState } from 'react';

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
import {
  Badge,
  IconGroup,
  ModalBody,
  ModalDesc,
  ModalIconGroup,
  ModalStep,
  ModalSub,
  ModalTitle,
  StyledContainer,
  StyledContent,
  Title,
  Treasure1,
  Treasure2,
  Treasure3,
  Treasure4,
  Treasure5,
  Treasure6,
} from './styles';

const ThrusterCoinListStep1 = [
  {
    key: 1,
    icon: ['/images/odyssey/v4/coin-juice.svg', '/images/odyssey/v4/coin-weth2.svg'],
    name: ['JUICE', 'WETH'],
  },
  {
    key: 2,
    icon: ['/images/odyssey/v4/coin-pac.svg', '/images/odyssey/v4/coin-weth2.svg'],
    name: ['PAC', 'WETH'],
  },
  {
    key: 3,
    icon: ['/images/odyssey/v4/coin-kap.svg', '/images/odyssey/v4/coin-weth2.svg'],
    name: ['KAP', 'WETH'],
  },
  {
    key: 4,
    icon: ['/images/odyssey/v4/coin-yield.svg', '/images/odyssey/v4/coin-weth2.svg'],
    name: ['YIELD', 'WETH'],
  },
  {
    key: 5,
    icon: ['/images/odyssey/v4/coin-glory.svg', '/images/odyssey/v4/coin-weth2.svg'],
    name: ['GLORY', 'WETH'],
  },
  {
    key: 6,
    icon: ['/images/odyssey/v4/coin-ole.svg', '/images/odyssey/v4/coin-weth2.svg'],
    name: ['OLE', 'WETH'],
  },
  {
    key: 7,
    icon: ['/images/odyssey/v4/coin-sss.svg', '/images/odyssey/v4/coin-weth2.svg'],
    name: ['SSS', 'WETH'],
  },
  {
    key: 8,
    icon: ['/images/odyssey/v4/coin-andy.svg', '/images/odyssey/v4/coin-weth2.svg'],
    name: ['ANDY', 'WETH'],
  },
  {
    key: 9,
    icon: ['/images/odyssey/v4/coin-early.svg', '/images/odyssey/v4/coin-weth2.svg'],
    name: ['EARLY', 'WETH'],
  },
  {
    key: 10,
    icon: ['/images/odyssey/v4/coin-mia.svg', '/images/odyssey/v4/coin-weth2.svg'],
    name: ['MIA', 'WETH'],
  },
  {
    key: 12,
    icon: ['/images/odyssey/v4/coin-orbit.svg', '/images/odyssey/v4/coin-weth2.svg'],
    name: ['ORBIT', 'WETH'],
  },
  {
    key: 14,
    icon: ['/images/odyssey/v4/coin-bag.svg', '/images/odyssey/v4/coin-weth2.svg'],
    name: ['BAG', 'WETH'],
  },
  {
    key: 15,
    icon: ['/images/odyssey/v4/coin-pump.svg', '/images/odyssey/v4/coin-weth2.svg'],
    name: ['PUMP', 'WETH'],
  },
];
const ThrusterCoinListStep2 = [
  {
    key: 1,
    icon: ['/images/odyssey/v4/coin-juice.svg', '/images/odyssey/v4/coin-weth1.svg'],
    name: ['JUICE', 'WETH'],
  },
  {
    key: 2,
    icon: ['/images/odyssey/v4/coin-pac.svg', '/images/odyssey/v4/coin-weth1.svg'],
    name: ['PAC', 'WETH'],
  },
  {
    key: 3,
    icon: ['/images/odyssey/v4/coin-kap.svg', '/images/odyssey/v4/coin-weth1.svg'],
    name: ['KAP', 'WETH'],
  },
  {
    key: 4,
    icon: ['/images/odyssey/v4/coin-yield.svg', '/images/odyssey/v4/coin-weth1.svg'],
    name: ['YIELD', 'WETH'],
  },
  {
    key: 5,
    icon: ['/images/odyssey/v4/coin-glory.svg', '/images/odyssey/v4/coin-weth1.svg'],
    name: ['GLORY', 'WETH'],
  },
];

export default function Treasure() {
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
    corner: 34,
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
    <StyledContainer>
      {showModal1 ? (
        <Modal type="type1" onClose={() => setShowModal1(false)} bgColor="#000">
          <ModalTitle>How to maximize Point or Yield by Particle and DUO? </ModalTitle>
          <ModalDesc>
            This strategy benefits users with an additional Gold bonus and Points reward. <br />
            Trade on Particle and DUO, you will get more rewards.
          </ModalDesc>
          <ModalBody>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 35 }}>
              <TrapeziformBtn
                width="236px"
                height="42px"
                loading={reportLoading}
                handleClick={(e: any) => handleReportLink('https://app.particle.trade/')}
              >
                Trade on Particle <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
              </TrapeziformBtn>
              <TrapeziformBtn
                width="236px"
                height="42px"
                handleClick={(e: any) => openLink(`${location.origin}/dapp/duo`)}
              >
                Trade on DUO <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
              </TrapeziformBtn>
            </div>
          </ModalBody>
        </Modal>
      ) : null}
      {showModal2 ? (
        <Modal type="type2" onClose={() => setShowModal2(false)}>
          <ModalTitle>
            How to earn <Image src="/images/odyssey/v4/td4.svg" alt="" width={79} height={22} /> by Renzo / Hyperlock /
            Particle?
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
                    <div className="head-title">Step 1. Get ezETH from </div>
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
                    <Image src="/images/odyssey/v4/coin-ezeth.svg" alt="" width={26} height={26} />
                    <Image src="/images/odyssey/v4/coin-weth2.svg" alt="" width={26} height={26} className="lp-img" />
                    <div className="body-left-content">
                      <div className="body-left-content-title">ezETH / WETH</div>
                    </div>
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
      {showModal3 ? (
        <Modal type="type3" onClose={() => setShowModal3(false)}>
          <ModalTitle>How to win Ring & Pac incentive airdrops?</ModalTitle>
          <ModalDesc>
            This strategy allows users to enjoy both Ring and Pac airdrop incentives simultaneously; additionally, PAC
            rewards will have three times the effect on assets.
          </ModalDesc>
          <ModalBody>
            <Trapeziform {...TrapLayout} className="modal-list">
              <div className="modal-list-head">
                <div className="head-left">
                  <div className="head-title">Step 1. Swap fwWETH on</div>
                  <div className="tag-thr">
                    <Image src="/images/odyssey/v4/tag-ring.svg" alt="" width={72} height={27} />
                  </div>
                </div>
                <div className="tag-points">
                  <Image src="/images/odyssey/v4/icon-ring.svg" alt="" width={20} height={20} />
                  Ring
                </div>
              </div>
              <div className="modal-list-body">
                <div className="body-left">
                  <Image src="/images/odyssey/v4/coin-fwweth.svg" alt="" width={26} height={26} />

                  <div className="body-left-content">
                    <div className="body-left-content-title">fwWETH</div>
                    <div className="body-left-content-desc">Few wrapped wrapped ETH</div>
                  </div>
                </div>
                <div className="body-right">
                  <TrapeziformBtn
                    width="286px"
                    height="42px"
                    handleClick={(e: any) => openLink(`${location.origin}/dapp/ring-protocol`)}
                  >
                    Swap fwWETH <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                  </TrapeziformBtn>
                </div>
              </div>
            </Trapeziform>
            <Trapeziform {...TrapLayout} className="modal-list">
              <div className="modal-list-head">
                <div className="head-left">
                  <div className="head-title">Step 2. Loop fwWETH on</div>
                  <div className="tag-thr">
                    <Image src="/images/odyssey/v4/tag-pac.svg" alt="" width={139} height={24} />
                  </div>
                </div>
                <div className="tag-points">
                  <Image src="/images/odyssey/v4/icon-mouth.svg" alt="" width={20} height={20} />
                  PAC
                </div>
              </div>
              <div className="modal-list-body">
                <div className="body-left">
                  <Image src="/images/odyssey/v4/coin-fwweth.svg" alt="" width={26} height={26} />

                  <div
                    className="body-left-content"
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                    }}
                  >
                    <div className="body-left-content-title">fwWETH</div>
                    <div
                      className="tag-points"
                      style={{
                        color: '#fff',
                        border: '1px solid #3D405A',
                        padding: '0 5px',
                        fontSize: 12,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <b style={{ color: '#B2E810' }}>3x</b> effect on assets
                    </div>
                  </div>
                </div>
                <div className="body-right">
                  <TrapeziformBtn
                    width="286px"
                    height="42px"
                    handleClick={(e: any) => openLink(`${location.origin}/dapp/pac-finance`)}
                  >
                    Loop fwWETH <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                  </TrapeziformBtn>
                </div>
              </div>
            </Trapeziform>
          </ModalBody>
        </Modal>
      ) : null}

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
                    <Image src="/images/odyssey/v4/coin-mwesteth.svg" alt="" width={26} height={26} />
                    <Image src="/images/odyssey/v4/coin-weth2.svg" alt="" width={26} height={26} className="lp-img" />
                    <div className="body-left-content">
                      <div className="body-left-content-title">mwstETH-WPUNKS / WETH</div>
                    </div>
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
      {showModal5 ? (
        <Modal type="type5" style={{ width: 914 }} onClose={() => setShowModal5(false)}>
          <ModalTitle>How to participate in Gold Rush: 3x Leverage on Juice?</ModalTitle>
          <ModalSub>
            <Image src="/images/odyssey/v4/td3.svg" alt="" width={79} height={22} />
            <Badge className="">
              <Image className="badge-icon" src="/images/odyssey/v4/icon-gold.svg" alt="" width={40} height={40} />
              <span className="badge-title">Extra Gold</span>
            </Badge>
          </ModalSub>
          <ModalDesc>
            This strategy enables users to earn Etherfi points/ Eigen Layer points/ Hyperlock Points/ Thruster Points/
            Juice Points/ Blast Gold + Blast points.
          </ModalDesc>
          <ModalStep>
            <span className="step">Create sub account on Juice</span>
            <div className="gap"></div>
            <span className="step">Deposit 3x WETH & USDB</span>
            <div className="gap"></div>
            <span className="step">Borrow WETH & USDB</span>
          </ModalStep>
          <ModalBody>
            <div className="modal-body-2">
              <Trapeziform {...TrapLayout} className="modal-sec-3">
                <div className="step" style={{ width: 350, textAlign: 'left', marginBottom: 15 }}>
                  Join Vaults: <br />
                  V3 Thruster &lt;&gt; Hyperlock
                </div>
                <section>
                  <div className="reward-list">
                    <span className="txt">V3 USDB/WETH</span>
                    <div className="gap"></div>
                    <Badge>
                      <Image
                        className="badge-icon"
                        src="/images/odyssey/v4/icon-gold.svg"
                        alt=""
                        width={40}
                        height={40}
                      />
                      <span className="badge-title">50,000</span>
                    </Badge>
                  </div>
                  <div className="reward-list">
                    <span className="txt">etherfi V3</span>
                    <div className="gap"></div>
                    <Badge>
                      <Image
                        className="badge-icon"
                        src="/images/odyssey/v4/icon-gold.svg"
                        alt=""
                        width={40}
                        height={40}
                      />
                      <span className="badge-title">45,000</span>
                    </Badge>
                  </div>
                  <div className="reward-list">
                    <span className="txt">RenzoProtocol</span>
                    <div className="gap"></div>
                    <Badge>
                      <Image
                        className="badge-icon"
                        src="/images/odyssey/v4/icon-gold.svg"
                        alt=""
                        width={40}
                        height={40}
                      />
                      <span className="badge-title">55,000</span>
                    </Badge>
                  </div>
                  <div className="reward-list">
                    <span className="txt">KelpDAO</span>
                    <div className="gap"></div>
                    <Badge>
                      <Image
                        className="badge-icon"
                        src="/images/odyssey/v4/icon-gold.svg"
                        alt=""
                        width={40}
                        height={40}
                      />
                      <span className="badge-title">10,000</span>
                    </Badge>
                  </div>
                </section>
                <div className="reward-desc" style={{ marginBottom: 13 }}>
                  Juice/WETH Lps are also actively earning 2x Gold
                  <Badge style={{ position: 'absolute', left: 44, top: 24 }}>
                    <Image
                      className="badge-icon"
                      src="/images/odyssey/v4/icon-gold.svg"
                      alt=""
                      width={40}
                      height={40}
                    />
                    <span className="badge-title">2x</span>
                  </Badge>
                </div>
                <TrapeziformBtn
                  width="236px"
                  height="42px"
                  className="juice-btn"
                  handleClick={(e: any) => openLink(`${location.origin}/dapp/juice`)}
                >
                  Go to Juice <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                </TrapeziformBtn>
              </Trapeziform>
              <Trapeziform {...TrapLayout} className="modal-sec-3">
                <div className="step" style={{ width: 350, textAlign: 'left', marginBottom: 15 }}>
                  Join Vaults: <br />
                  Particle Boosted Points
                </div>
                <section>
                  <div className="reward-list">
                    <span className="txt">USDB</span>
                    <div className="gap"></div>
                    <Badge>
                      <Image
                        className="badge-icon"
                        src="/images/odyssey/v4/icon-gold.svg"
                        alt=""
                        width={40}
                        height={40}
                      />
                      <span className="badge-title">20,000</span>
                    </Badge>
                  </div>
                </section>
                <div className="reward-list">
                  <span className="txt">WETH</span>
                  <div className="gap"></div>
                  <Badge>
                    <Image
                      className="badge-icon"
                      src="/images/odyssey/v4/icon-gold.svg"
                      alt=""
                      width={40}
                      height={40}
                    />
                    <span className="badge-title">20,000</span>
                  </Badge>
                </div>
                <div className="reward-desc" style={{ margin: '44px 0 62px' }}>
                  Earn Particle & Duo points, Blast Gold, Juice points, and variable boosted Blast points.
                </div>

                <TrapeziformBtn
                  width="236px"
                  height="42px"
                  className="juice-btn"
                  loading={reportLoading}
                  handleClick={(e: any) => openLink(`${location.origin}/dapp/juice`)}
                >
                  Go to Juice <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                </TrapeziformBtn>
              </Trapeziform>
            </div>
          </ModalBody>
        </Modal>
      ) : null}
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
          }}
        >
          <ModalTitle>How to participate in a 2x Gold boosted strategy on Thruster and Hyperlock?</ModalTitle>
          <ModalDesc>
            Utilize the 2x boosted Thruster and Hyperlock Gold Rush events by adding liquidity to the top 15 Blast
            native coin pools. Maximize your gains effortlessly!
          </ModalDesc>
          <ModalBody>
            <Trapeziform {...TrapLayout} className="modal-list">
              <div className="modal-list-head">
                <div className="head-left">
                  <StyledFlex gap="7px" className="head-title">
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
                }}
              >
                {ThrusterCoinListStep1.map((coin) => (
                  <CoinGroup
                    key={coin.key}
                    icon={coin.icon}
                    name={coin.name}
                    style={{
                      flexBasis: '25%',
                      marginBottom: 20,
                    }}
                    onClick={() => {
                      setSelectedPool(coin.name.join(','));
                    }}
                  />
                ))}
              </StyledFlex>
              <div className="modal-list-foot">
                <TrapeziformBtn
                  width="286px"
                  height="42px"
                  handleClick={(e: any) => openLink(`${location.origin}/dapp/thruster-liquidity`)}
                >
                  Add Liquidity <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                </TrapeziformBtn>
              </div>
            </Trapeziform>
            <Trapeziform {...TrapLayout} className="modal-list">
              <div className="modal-list-head">
                <div className="head-left">
                  <StyledFlex gap="7px" className="head-title">
                    <span>Step 2. Staking LP on</span>
                    <Image src="/images/odyssey/v4/hyperlock-rect.svg" alt="" width={140} height={36} />
                    <span>to get exclusive 2x Gold.</span>
                  </StyledFlex>
                </div>
              </div>
              <StyledFlex
                justifyContent="flex-start"
                alignItems="center"
                style={{
                  marginTop: 15,
                  flexWrap: 'wrap',
                }}
              >
                {ThrusterCoinListStep2.map((coin) => (
                  <CoinGroup
                    key={coin.key}
                    icon={coin.icon}
                    name={coin.name}
                    style={{
                      flexBasis: '25%',
                      marginBottom: 20,
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

      <StyledContent className="row-top">
        <Treasure1 onClick={() => setShowModal1(true)}>
          <Line />
          <Image
            src="/images/odyssey/v4/star1.svg"
            alt=""
            width={314}
            height={170}
            className="scale"
            style={{ marginTop: -5 }}
          />
          <Title className="title">
            Gold Rush: <br />
            Maximize Point or Yield?
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
          <Line />
          <Image src="/images/odyssey/v4/star6.svg" alt="" width={221} height={228} className="scale pac" />
          <Title className="title title1">
            Gold Rush: <br />
            2x Boosted
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
          <Line />
          <Image src="/images/odyssey/v4/juice.svg" alt="" width={170} height={170} className="scale" />
          <Title className="title" style={{ textAlign: 'right' }}>
            Gold Rush: <br />
            3x Leverage
          </Title>
          <div className="td3">
            <Image src="/images/odyssey/v4/td3.svg" alt="" width={79} height={22} />
            <Badge>
              <Image className="badge-icon" src="/images/odyssey/v4/icon-gold.svg" alt="" width={40} height={40} />
              <span className="badge-title">Extra Gold</span>
            </Badge>
          </div>
        </Treasure3>
      </StyledContent>
      <StyledContent className="row-bot">
        <Treasure4 onClick={() => setShowModal2(true)}>
          <Line />
          <Image src="/images/odyssey/v4/star4.svg" alt="" width={408} height={221} className="scale star4" />
          <Title className="title">LRTs Stacking</Title>
          <Image src="/images/odyssey/v4/td4.svg" alt="" width={79} height={22} className="td4" />
        </Treasure4>
        <Treasure5 onClick={() => setShowModal3(true)}>
          <Line />
          <Image src="/images/odyssey/v4/pac.svg" alt="" width={336} height={188} className="scale pac" />
          <Image src="/images/odyssey/v4/ring.svg" alt="" width={169} height={114} className="scale ring" />
          <Title className="title">
            Airdrop
            <br />& 3x Assets
          </Title>
          <IconGroup className="td5">
            <Image src="/images/odyssey/v4/icon-mouth.svg" alt="" width={22} height={22} className="" />
            <Image src="/images/odyssey/v4/icon-ring.svg" alt="" width={22} height={22} className="" />
          </IconGroup>
        </Treasure5>
        <Treasure6 onClick={() => setShowModal4(true)}>
          <Line />
          <Image src="/images/odyssey/v4/star3.svg" alt="" width={340} height={196} className="scale star3" />
          <Title className="title">ERC404 Stacking</Title>
          <IconGroup className="td6">
            <Image src="/images/odyssey/v4/icon-thruster.svg" alt="" width={22} height={22} className="" />
            <Image src="/images/odyssey/v4/icon-particle.svg" alt="" width={22} height={22} className="" />
            <Image src="/images/odyssey/v4/icon-hyperlock.svg" alt="" width={22} height={22} className="" />
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
          name: 'Thruster Pool',
        }}
        chain={{
          chain_id: 81457,
          name: 'Blast',
        }}
        defaultTokens={selectedPool}
        onClose={() => {
          setSelectedPool('');
        }}
      />
    </StyledContainer>
  );
}
