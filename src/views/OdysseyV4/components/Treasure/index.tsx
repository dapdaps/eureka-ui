import Image from 'next/image';
import { useState } from 'react';

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
} from './styles';

export default function Treasure() {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  return (
    <StyledContainer>
      {showModal1 ? (
        <Modal type="type1" onClose={() => setShowModal1(false)}>
          <ModalTitle>
            How to earn 200x <Image src="/images/odyssey/v4/td1.svg" alt="" width={36} height={21} /> Synfutures Points?
          </ModalTitle>
          <ModalDesc style={{ fontSize: 18 }}>
            <span className="bold">BTC/USDB and WETH/USDB can earn 200x Synfutures points.</span>A higher boost means
            that an equivalent effective liquidity will yield greater points rewards compared to others.
          </ModalDesc>
          <ModalBody>
            <div className="modal-body-1">
              <Trapeziform className="modal-sec-1">
                <div className="coin-group">
                  <Image src="/images/odyssey/v4/coin-btc.svg" alt="" width={46} height={46} />
                  <Image src="/images/odyssey/v4/coin-usdb.svg" alt="" width={26} height={26} />
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
              <Trapeziform className="modal-sec-1">
                <div className="coin-group">
                  <Image src="/images/odyssey/v4/coin-weth.svg" alt="" width={46} height={46} />
                  <Image src="/images/odyssey/v4/coin-usdb.svg" alt="" width={26} height={26} />
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
            <Trapeziform className="modal-list">
              <div className="modal-list-head">
                <div className="head-left">
                  <div className="head-title">Step 1. Swap fwWETH on</div>
                  <div className="tag-thr">
                    <Image src="/images/odyssey/v4/tag-ring.svg" alt="" width={139} height={24} />
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
                  <TrapeziformBtn width="286px" height="42px">
                    Loop fwWETH <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                  </TrapeziformBtn>
                </div>
              </div>
            </Trapeziform>
            <Trapeziform className="modal-list">
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
                  <TrapeziformBtn width="286px" height="42px">
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
            This strategy enables users to earn XP points & Blast points & Blast gold & Thruster points & Hyperlock
            points/Particle points + some APR.
          </ModalDesc>
          <ModalBody>
            <div className="modal-body">
              <Trapeziform className="modal-list">
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
                    <TrapeziformBtn width="286px" height="42px">
                      Swap mwstETH-WPUNKS <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                    </TrapeziformBtn>
                  </div>
                </div>
              </Trapeziform>
              <Trapeziform className="modal-list">
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
                    <div className="body-left-content">
                      <div className="body-left-content-title">mwstETH-WPUNKS / WETH</div>
                    </div>
                  </div>
                  <div className="body-right">
                    <TrapeziformBtn width="286px" height="42px">
                      Swap mwstETH-WPUNKS <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                    </TrapeziformBtn>
                  </div>
                </div>
              </Trapeziform>
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
            This strategy enables users to earn Etherfi points/ Eigen Layer points/ Hyperlock Points/ Thruster Points/
            Juice Points/ Blast Gold + Blast points.
          </ModalDesc>
          <ModalBody>
            <Trapeziform className="modal-list">
              <div className="modal-list-head">
                <div className="head-left">
                  <div className="head-title">Step 1. Create sub account and borrow WETH </div>
                </div>
              </div>
              <div className="modal-list-body">
                <div className="body-left" style={{ gap: 5 }}>
                  <Image src="/images/odyssey/v4/coin-eth.svg" alt="" width={26} height={26} />
                  <Image src="/images/odyssey/v4/arrow-white.svg" alt="" width={19} height={16} />
                  <Image src="/images/odyssey/v4/coin-weth.svg" alt="" width={26} height={26} />
                  <div className="body-left-content">
                    <div className="body-left-content-title">Wrap ETH</div>
                  </div>
                </div>
                <div className="body-right">
                  <TrapeziformBtn width="286px" height="42px">
                    Get weETH <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                  </TrapeziformBtn>
                </div>
              </div>
            </Trapeziform>

            <Trapeziform className="modal-list">
              <div className="modal-list-head">
                <div className="head-left">
                  <div className="head-title">Step 2. Add LP WETH/weETH on</div>
                  <div className="tag-thr">
                    <Image src="/images/odyssey/v4/tag-thr.svg" alt="" width={139} height={24} />
                  </div>
                </div>
              </div>
              <div className="modal-list-body">
                <div className="body-left">
                  <Image src="/images/odyssey/v4/coin-weeth.svg" alt="" width={26} height={26} />
                  <Image src="/images/odyssey/v4/coin-weth.svg" alt="" width={26} height={26} className="lp-img" />
                  <div className="body-left-content">
                    <div className="body-left-content-title">weETH / WETH</div>
                  </div>
                </div>
                <div className="body-right">
                  <TrapeziformBtn width="286px" height="42px">
                    Add Liquidity <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                  </TrapeziformBtn>
                </div>
              </div>
            </Trapeziform>
            <Trapeziform className="modal-list">
              <div className="modal-list-head">
                <div className="head-left">
                  <div className="head-title">Step 3. Stake LP on</div>
                  <div className="tag-thr">
                    <Image src="/images/odyssey/v4/tag-hyp.svg" alt="" width={139} height={24} />
                  </div>
                </div>
              </div>
              <div className="modal-list-body">
                <div className="body-left ">
                  <Image src="/images/odyssey/v4/coin-weeth.svg" alt="" width={26} height={26} />
                  <Image src="/images/odyssey/v4/coin-weth1.svg" alt="" width={26} height={26} className="lp-img" />
                  <div className="body-left-content">
                    <div className="body-left-content-title">weETH / WETH</div>
                  </div>
                </div>
                <div className="body-right">
                  <TrapeziformBtn width="286px" height="42px">
                    Stake LP <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                  </TrapeziformBtn>
                </div>
              </div>
            </Trapeziform>
            <Trapeziform className="modal-list">
              <div className="modal-list-head">
                <div className="head-left">
                  <div className="head-title">Step 4. Deposit position on</div>
                  <div className="tag-juice">
                    <Image src="/images/odyssey/v4/icon-juice.svg" alt="" width={23} height={23} />
                    <Image src="/images/odyssey/v4/tag-juice.svg" alt="" width={50} height={24} />
                  </div>
                </div>
              </div>
              <div className="modal-list-body">
                <div className="body-left ">
                  <Image src="/images/odyssey/v4/coin-weeth.svg" alt="" width={26} height={26} />
                  <Image src="/images/odyssey/v4/coin-weth1.svg" alt="" width={26} height={26} className="lp-img" />
                  <div className="body-left-content">
                    <div className="body-left-content-title">weETH / WETH</div>
                  </div>
                </div>
                <div className="body-right">
                  <TrapeziformBtn width="286px" height="42px">
                    Stake LP <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                  </TrapeziformBtn>
                </div>
              </div>
            </Trapeziform>
          </ModalBody>
        </Modal>
      ) : null}

      <StyledContent>
        <Treasure1 onClick={() => setShowModal1(true)}>
          <Line />
          <Image
            src="/images/odyssey/v4/synfutures.svg"
            alt=""
            width={246}
            height={246}
            className="scale"
            style={{ marginTop: -23 }}
          />
          <Title className="title">200x O_O Points</Title>
          <Image src="/images/odyssey/v4/td1.svg" alt="" width={28} height={16} className="td1" />
        </Treasure1>
        <Treasure2 onClick={() => setShowModal4(true)}>
          <Line />
          <Image src="/images/odyssey/v4/thruster.svg" alt="" width={208} height={208} className="scale" />
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
          />
          <Title className="title">Extra Points</Title>
          <IconGroup className="td2">
            <Image src="/images/odyssey/v4/icon-thruster.svg" alt="" width={22} height={22} className="" />
            <Image src="/images/odyssey/v4/icon-particle.svg" alt="" width={22} height={22} className="" />
            <Image src="/images/odyssey/v4/icon-hyperlock.svg" alt="" width={22} height={22} className="" />
          </IconGroup>
        </Treasure2>
        <Treasure3 onClick={() => setShowModal5(true)}>
          <Line />
          <Image src="/images/odyssey/v4/juice.svg" alt="" width={208} height={208} className="scale" />
          <Title className="title">Mutiple Points</Title>
          <Image src="/images/odyssey/v4/td3.svg" alt="" width={79} height={22} className="td3" />
        </Treasure3>
      </StyledContent>
      <StyledContent
        style={{
          justifyContent: 'space-evenly',
        }}
      >
        <Treasure4 onClick={() => setShowModal2(true)}>
          <Line />
          <Image src="/images/odyssey/v4/track1.svg" alt="" width={478} height={164} className="track1" />

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
          <Image src="/images/odyssey/v4/renzo.svg" alt="" width={118} height={118} className="scale star renzo" />
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
      </StyledContent>
      {/* 
        <Image src="/images/odyssey/v4/gold-rush.svg" alt="" width={1151} height={451} /> */}
    </StyledContainer>
  );
}
