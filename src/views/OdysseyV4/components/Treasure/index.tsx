import Image from 'next/image';
import { useRef, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import SkakeModel from '@/views/StakeModal/index';

import useParticleReport from '../../hooks/useParticleReport';
import Line from '../Line';
import Modal from '../Modal';
import Trapeziform from '../Trapeziform';
import TrapeziformBtn from '../TrapeziformBtn';
import {
  Desc,
  IconGroup,
  ModalBody,
  ModalDesc,
  ModalIconGroup,
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
import CoinGroup from '@/views/OdysseyV4/components/Treasure/CoinGroup';
import { StyledFlex } from '@/styled/styles';

const ThrusterCoinListStep1 = [
  {
    key: 1,
    icon: ['/images/odyssey/v4/coin-weth2.svg', '/images/odyssey/v4/coin-juice.svg'],
    name: ['WETH', 'JUICE'],
  },
  {
    key: 2,
    icon: ['/images/odyssey/v4/coin-weth2.svg', '/images/odyssey/v4/coin-pac.svg'],
    name: ['WETH', 'PAC'],
  },
  {
    key: 3,
    icon: ['/images/odyssey/v4/coin-kap.svg', '/images/odyssey/v4/coin-weth2.svg'],
    name: ['KAP', 'WETH'],
  },
  {
    key: 4,
    icon: ['/images/odyssey/v4/coin-weth2.svg', '/images/odyssey/v4/coin-yield.svg'],
    name: ['WETH', 'YIELD'],
  },
  {
    key: 5,
    icon: ['/images/odyssey/v4/coin-weth2.svg', '/images/odyssey/v4/coin-glory.svg'],
    name: ['WETH', 'GLORY'],
  },
  {
    key: 6,
    icon: ['/images/odyssey/v4/coin-weth2.svg', '/images/odyssey/v4/coin-ole.svg'],
    name: ['WETH', 'OLE'],
  },
  {
    key: 7,
    icon: ['/images/odyssey/v4/coin-weth2.svg', '/images/odyssey/v4/coin-sss.svg'],
    name: ['WETH', 'SSS'],
  },
  {
    key: 8,
    icon: ['/images/odyssey/v4/coin-weth2.svg', '/images/odyssey/v4/coin-andy.svg'],
    name: ['WETH', 'ANDY'],
  },
  {
    key: 9,
    icon: ['/images/odyssey/v4/coin-weth2.svg', '/images/odyssey/v4/coin-early.svg'],
    name: ['WETH', 'EARLY'],
  },
  {
    key: 10,
    icon: ['/images/odyssey/v4/coin-weth2.svg', '/images/odyssey/v4/coin-mia.svg'],
    name: ['WETH', 'MIA'],
  },
  {
    key: 11,
    icon: ['/images/odyssey/v4/coin-weth2.svg', '/images/odyssey/v4/coin-wai.svg'],
    name: ['WETH', 'WAI'],
  },
  {
    key: 12,
    icon: ['/images/odyssey/v4/coin-orbit.svg', '/images/odyssey/v4/coin-weth2.svg'],
    name: ['ORBIT', 'WETH'],
  },
  {
    key: 13,
    icon: ['/images/odyssey/v4/coin-weth2.svg', '/images/odyssey/v4/coin-baja.svg'],
    name: ['WETH', 'BAJA'],
  },
  {
    key: 14,
    icon: ['/images/odyssey/v4/coin-weth2.svg', '/images/odyssey/v4/coin-bag.svg'],
    name: ['WETH', 'BAG'],
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
    icon: ['/images/odyssey/v4/coin-weth1.svg', '/images/odyssey/v4/coin-juice.svg'],
    name: ['WETH', 'JUICE'],
  },
  {
    key: 2,
    icon: ['/images/odyssey/v4/coin-weth1.svg', '/images/odyssey/v4/coin-pac.svg'],
    name: ['WETH', 'PAC'],
  },
  {
    key: 3,
    icon: ['/images/odyssey/v4/coin-kap.svg', '/images/odyssey/v4/coin-weth1.svg'],
    name: ['KAP', 'WETH'],
  },
  {
    key: 4,
    icon: ['/images/odyssey/v4/coin-weth1.svg', '/images/odyssey/v4/coin-yield.svg'],
    name: ['WETH', 'YIELD'],
  },
  {
    key: 5,
    icon: ['/images/odyssey/v4/coin-weth1.svg', '/images/odyssey/v4/coin-glory.svg'],
    name: ['WETH', 'GLORY'],
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
      {/* {showModal1 ? (
        <Modal type="type1" onClose={() => setShowModal1(false)}>
          <ModalTitle>How to earn extra 1% Blast Gold by Particle?</ModalTitle>
          <ModalDesc>
            This strategy benefits users with an additional Gold bonus reward. Trade on Particle with perps, you will
            get 1% extra Blast Gold.
          </ModalDesc>
          <ModalBody>
            <div className="modal-body-1">
              <Trapeziform {...TrapLayout} className="modal-sec-1">
                <div className="coin-group">
                  <Image src="/images/odyssey/v4/coin-btc.svg" alt="" width={46} height={46} />
                  <Image
                    src="/images/odyssey/v4/coin-usdb.svg"
                    alt=""
                    width={26}
                    height={26}
                    style={{ marginLeft: -10 }}
                  />
                </div>
                <div className="coin-title">BTC/USDB</div>
                <div className="tags">
                  <div className="prep">PERP</div>
                  <div className="points">200x O_O Points</div>
                </div>
                <TrapeziformBtn width="236px" height="42px">
                  Add Liquidity <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                </TrapeziformBtn>
              </Trapeziform>
              <Trapeziform {...TrapLayout} className="modal-sec-1">
                <div className="coin-group">
                  <Image src="/images/odyssey/v4/coin-weth.svg" alt="" width={46} height={46} />
                  <Image
                    src="/images/odyssey/v4/coin-usdb.svg"
                    alt=""
                    width={26}
                    height={26}
                    style={{ marginLeft: -10 }}
                  />
                </div>
                <div className="coin-title">WETH/USDB</div>
                <div className="tags">
                  <div className="prep">PERP</div>
                  <div className="points">200x O_O Points</div>
                </div>
                <TrapeziformBtn width="236px" height="42px">
                  Add Liquidity <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                </TrapeziformBtn>
              </Trapeziform>
            </div>
          </ModalBody>
        </Modal>
      ) : null} */}
      {showModal1 ? (
        <Modal type="type1" onClose={() => setShowModal1(false)} bgColor="#000">
          <ModalTitle>How to earn extra 1% Blast Gold by Particle?</ModalTitle>
          <ModalDesc>
            This strategy benefits users with an additional Gold bonus reward. <br />
            Trade on Particle with perps, you will get 1% extra Blast Gold.
          </ModalDesc>
          <ModalBody>
            <TrapeziformBtn
              width="236px"
              height="42px"
              loading={reportLoading}
              handleClick={(e: any) => handleReportLink('https://app.particle.trade/')}
              style={{
                margin: '73px auto 0',
              }}
            >
              Trade on Particle <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
            </TrapeziformBtn>
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
        <Modal type="type5" onClose={() => setShowModal5(false)}>
          <ModalTitle>
            How to earn <Image src="/images/odyssey/v4/td3.svg" alt="" width={79} height={22} /> on Juice?
          </ModalTitle>
          <ModalDesc>
            This strategy enables users to earn Etherfi points/ Eigen Layer points/ Hyperlock Points/ Thruster Credits/
            Juice Points/ Blast Gold + Blast points.
          </ModalDesc>
          <ModalBody>
            <Trapeziform {...TrapLayout} className="modal-list">
              <div className="modal-list-head">
                <div className="head-left">
                  <div className="head-title">Step 1. Create sub account and Deposit WETH on</div>
                </div>
              </div>
              <div className="modal-desc">* If you don’t have WETH, you can wrap ETH to WETH on this page</div>
              <div className="modal-list-body">
                <div className="body-left" style={{ gap: 5 }}>
                  <Image src="/images/odyssey/v4/coin-weth.svg" alt="" width={26} height={26} />

                  <div className="body-left-content">
                    <div className="body-left-content-title">WETH</div>
                  </div>
                </div>
                <div className="body-right">
                  <TrapeziformBtn
                    width="286px"
                    height="42px"
                    handleClick={(e: any) => openLink(`${location.origin}/dapp/juice`)}
                  >
                    Deposit WETH <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                  </TrapeziformBtn>
                </div>
              </div>
            </Trapeziform>
            <Trapeziform {...TrapLayout} className="modal-list">
              <div className="modal-list-head">
                <div className="head-left">
                  <div className="head-title">Step 2.Borrow 3x WETH</div>
                </div>
              </div>
              <div className="modal-list-body">
                <div className="body-left" style={{ gap: 5 }}>
                  <Image src="/images/odyssey/v4/coin-weth.svg" alt="" width={26} height={26} />

                  <div className="body-left-content">
                    <div className="body-left-content-title">WETH</div>
                  </div>
                </div>
                <div className="body-right">
                  <TrapeziformBtn
                    width="286px"
                    height="42px"
                    handleClick={(e: any) => openLink(`${location.origin}/dapp/juice`)}
                  >
                    Borrow WETH <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                  </TrapeziformBtn>
                </div>
              </div>
            </Trapeziform>
            <Trapeziform {...TrapLayout} className="modal-list">
              <div className="modal-list-head">
                <div className="head-left">
                  <div className="head-title">Step 3.Deposit borrowed WETH in EtherFi V3 LP Vault</div>
                </div>
              </div>
              <div className="modal-list-body">
                <div className="body-left" style={{ gap: 5 }}>
                  <Image src="/images/odyssey/v4/coin-weth.svg" alt="" width={26} height={26} />

                  <div className="body-left-content-title">WETH</div>

                  <Image src="/images/odyssey/v4/dash-arrow.svg" alt="" width={33} height={16} />
                  <Image src="/images/odyssey/v4/icon-hyperlock.svg" alt="" width={26} height={26} />

                  <div className="body-left-content-title">HYPLP</div>
                </div>
                <div className="body-right">
                  <TrapeziformBtn
                    width="286px"
                    height="42px"
                    handleClick={(e: any) => openLink(`${location.origin}/dapp/juice`)}
                  >
                    Stake LP
                    <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                  </TrapeziformBtn>
                </div>
              </div>
            </Trapeziform>
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
          <ModalTitle>
            How to participate in a 2x Gold boosted strategy on Thruster and Hyperlock?
          </ModalTitle>
          <ModalDesc>
            Utilize the 2x boosted Thruster and Hyperlock Gold Rush events by adding liquidity to the top 15 Blast native coin pools. Maximize your gains effortlessly!
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
                {
                  ThrusterCoinListStep1.map((coin) => (
                    <CoinGroup
                      key={coin.key}
                      icon={coin.icon}
                      name={coin.name}
                      style={{
                        flexBasis: '25%',
                        marginBottom: 20,
                      }}
                    />
                  ))
                }
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
                {
                  ThrusterCoinListStep2.map((coin) => (
                    <CoinGroup
                      key={coin.key}
                      icon={coin.icon}
                      name={coin.name}
                      style={{
                        flexBasis: '25%',
                        marginBottom: 20,
                      }}
                    />
                  ))
                }
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
            src="/images/odyssey/v4/star-particle.svg"
            alt=""
            width={266}
            height={180}
            className="scale"
            style={{ marginTop: -23 }}
          />
          <Title className="title">1% Extra Gold</Title>
          <Image src="/images/odyssey/v4/icon-gold.svg" alt="" width={42} height={42} className="td1" />
        </Treasure1>
        <Treasure2 onClick={() => setShowModal4(true)}>
          <Line />
          {/* <Image src="/images/odyssey/v4/thruster.svg" alt="" width={208} height={208} className="scale" />
          <Image
            src="/images/odyssey/v4/thruster-track.svg"
            style={{ marginTop: -160 }}
            alt=""
            width={343}
            height={130}
          />
          <Image src="/images/odyssey/v4/particle.svg" alt="" width={47} height={47} className="scale star particle" />
          <Image
            src="/images/odyssey/v4/hyperlock.svg"
            alt=""
            width={60}
            height={60}
            className="scale star hyperlock"
          /> */}
          <Image src="/images/odyssey/v4/star3.svg" alt="" width={313} height={180} className="scale star3" />
          <Title className="title">Extra Points</Title>
          <IconGroup className="td2">
            <Image src="/images/odyssey/v4/icon-thruster.svg" alt="" width={22} height={22} className="" />
            <Image src="/images/odyssey/v4/icon-particle.svg" alt="" width={22} height={22} className="" />
            <Image src="/images/odyssey/v4/icon-hyperlock.svg" alt="" width={22} height={22} className="" />
          </IconGroup>
        </Treasure2>
        <Treasure3 onClick={() => setShowModal5(true)}>
          <Line />
          <Image src="/images/odyssey/v4/juice.svg" alt="" width={170} height={170} className="scale" />
          <Title className="title">Multiple Points</Title>
          <Image src="/images/odyssey/v4/td3.svg" alt="" width={79} height={22} className="td3" />
        </Treasure3>
      </StyledContent>
      <StyledContent className="row-bot">
        <Treasure4 onClick={() => setShowModal2(true)}>
          <Line />
          {/* <Image src="/images/odyssey/v4/track1.svg" alt="" width={478} height={164} className="track1" />

          <Image src="/images/odyssey/v4/particle.svg" alt="" width={74} height={74} className="scale star particle" />
          <Image
            src="/images/odyssey/v4/thruster.svg"
            alt=""
            width={161}
            height={161}
            className="scale star thruster"
          />
          <Image
            src="/images/odyssey/v4/hyperlock.svg"
            alt=""
            width={76}
            height={76}
            className="scale star hyperlock"
          />
          <Image src="/images/odyssey/v4/renzo.svg" alt="" width={118} height={118} className="scale star renzo" /> */}
          <Image src="/images/odyssey/v4/star4.svg" alt="" width={363} height={249} className="scale star4" />
          <Title className="title">Extra Points</Title>
          <Image src="/images/odyssey/v4/td4.svg" alt="" width={79} height={22} className="td4" />
        </Treasure4>
        <Treasure5 onClick={() => setShowModal3(true)}>
          <Line />
          <Image src="/images/odyssey/v4/pac.svg" alt="" width={336} height={188} className="scale pac" />
          <Image src="/images/odyssey/v4/ring.svg" alt="" width={169} height={114} className="scale ring" />
          <Title className="title title1">Airdrop</Title>
          <IconGroup className="td5">
            <Image src="/images/odyssey/v4/icon-mouth.svg" alt="" width={22} height={22} className="" />
            <Image src="/images/odyssey/v4/icon-ring.svg" alt="" width={22} height={22} className="" />
          </IconGroup>
          <Title className="title title2">& 3x Assets</Title>
        </Treasure5>
        <Treasure6 onClick={() => setShowModal6(true)}>
          <Line />
          <Image src="/images/odyssey/v4/star6.svg" alt="" width={221} height={228} className="scale pac" />
          <Title className="title title1">2x Boosted</Title>
          <div className="badge">
            <Image src="/images/odyssey/v4/icon-gold.svg" alt="" width={40} height={40} />
            <span>2x</span>
          </div>
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
    </StyledContainer>
  );
}
