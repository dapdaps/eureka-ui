import Image from 'next/image';

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
  StyledContainer,
  StyledContent,
} from './styles';

export default function Banner() {
  return (
    <StyledContainer>
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
              <Image src="/images/odyssey/v4/golds.svg" alt="" width={414} height={328} />
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
