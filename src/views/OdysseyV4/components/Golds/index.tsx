import Image from 'next/image';
import { useState } from 'react';

import { ellipsAccount } from '@/utils/account';
import { simplifyNum } from '@/utils/format-number';

import Modal from '../RankModal';
import RefreshButton from '../RefreshButton';
import StatusTag from '../StatusTag';
import Trapeziform from '../Trapeziform';
import TrapeziformBtn from '../TrapeziformBtn';
import {
  BgFoot,
  BgHead,
  Body,
  BodyLeft,
  BodyRight,
  Head,
  HeadLeft,
  HeadRight,
  ModalBody,
  ModalHead,
  StyledContainer,
  StyledContent,
} from './styles';

export default function Banner() {
  const [showRankModal, setShowRankModal] = useState(false);
  const [curDapp, setCurDapp] = useState('');

  const showRank = (dapp: string) => {
    setShowRankModal(true);
    setCurDapp(dapp);
  };

  const hideRank = () => {
    console.log(111);

    setShowRankModal(false);
    setCurDapp('');
  };

  const renderLogo = () => {
    switch (curDapp) {
      case 'Particle':
        return <Image src="/images/odyssey/v4/logo-particle.svg" alt="" width={43} height={43} />;
      case 'Thruster':
        return <Image src="/images/odyssey/v4/logo-thruster.svg" alt="" width={43} height={43} />;
      case 'PAC Finance':
        return <Image src="/images/odyssey/v4/logo-pac.svg" alt="" width={43} height={43} />;
    }
  };

  return (
    <StyledContainer>
      {showRankModal ? (
        <Modal>
          <ModalHead>
            <span className="left">
              {renderLogo()}
              {curDapp} Top 50 Rank
              <div className="smoke"></div>
            </span>
            <Image
              onClick={hideRank}
              src="/images/odyssey/v4/close.svg"
              alt=""
              width={12}
              height={12}
              style={{ cursor: 'pointer', zIndex: 1 }}
            />
          </ModalHead>
          <ModalBody>
            <div className="desc">
              The ranking changes in real time, updated every 15 minutes, and the final list of winners is based on the
              data at the end of the campaign.
            </div>
            <div className="rank-table">
              <div className="rank-head">
                <div className="rank-th text-left">Rank</div>
                <div className="rank-th text-left">User address</div>
                <div className="rank-th text-right">Trading Volume</div>
              </div>
              <div className="rank-row">
                <div className="rank-col text-left">
                  <Image
                    onClick={hideRank}
                    src="/images/odyssey/v4/rank1.svg"
                    alt=""
                    width={25}
                    height={25}
                    style={{ marginRight: 10 }}
                  />
                  1
                </div>
                <div className="rank-col text-left">{ellipsAccount('0xb16fe6F417204b1d3c81CE78740ce0F404071052')}</div>
                <div className="rank-col text-right">${simplifyNum(34231.23)}</div>
              </div>
            </div>
            <div className="you">You</div>
            <div className="your-rank rank-row">
              <div className="rank-col text-left"># 1</div>
              <div className="rank-col text-left">2</div>
              <div className="rank-col text-right">${simplifyNum(20.23)}</div>
            </div>
          </ModalBody>
        </Modal>
      ) : null}
      <BgHead />
      <StyledContent>
        <Trapeziform borderColor="#3C3D00" borderWidth="30px">
          <Head>
            <HeadLeft>
              <Image src="/images/odyssey/v4/logo-particle.svg" alt="" width={85} height={85} />
              <span className="name">Particle</span>
            </HeadLeft>
            <HeadRight>
              <span className="numbers">02 : 08 : 33 : 05</span>
              <span className="strings">
                <b className="str">Days</b>
                <b className="str">Hours</b>
                <b className="str">Mins</b>
                <b className="str">sec</b>
              </span>
            </HeadRight>
          </Head>
          <Body>
            <BodyLeft>
              <Image
                src="/images/odyssey/v4/golds.svg"
                alt=""
                width={414}
                height={328}
                onClick={(e) => showRank('Particle')}
              />
            </BodyLeft>
            <BodyRight>
              <div className="head">
                <div className="rewards">
                  <Image src="/images/odyssey/v4/brick.svg" alt="" width={89} height={89} />
                  <span className="title">+1% Gold</span>
                </div>
                <div className="status">
                  <StatusTag status={false} />
                  <RefreshButton
                    onClick={(ev: any) => {
                      ev.stopPropagation();
                      // if (!checking) handleRefresh();
                    }}
                    // loading={checking}
                  />
                </div>
              </div>
              <div className="body">
                When you use Particle Trade by Thruster on DapDap, you not only receive the same Blast Gold rewards as
                you would on other platforms but also an additional bonus from a pool of Gold allocated to DapDap.
              </div>
              <div className="foot">
                <TrapeziformBtn width="202px" height="62px">
                  Trade <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                </TrapeziformBtn>
              </div>
            </BodyRight>
          </Body>
        </Trapeziform>
      </StyledContent>
      <BgFoot />
    </StyledContainer>
  );
}
