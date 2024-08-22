import Image from 'next/image';

import Modal from '../Modal';
import Trapeziform from '../Trapeziform';
import TrapeziformBtn from '../TrapeziformBtn';
import { Badge, ModalBody, ModalDesc, ModalStep,ModalSub, ModalTitle, TrapLayout } from './styles';

export default function Modal5({ setShowModal5, openLink, reportLoading }: any) {
  return (
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
        This strategy enables users to earn Etherfi points/ Eigen Layer points/ Hyperlock Points/ Thruster Points/ Juice
        Points/ Blast Gold + Blast points.
      </ModalDesc>
      <ModalStep>
        <span className="step">Create sub account on Juice</span>
        <div className="gap"></div>
        <span className="step">Deposit WETH & USDB</span>
        <div className="gap"></div>
        <span className="step">Borrow 3x WETH & USDB</span>
      </ModalStep>
      <ModalBody>
        <div className="modal-body-2">
          <Trapeziform {...TrapLayout} className="modal-sec-3" style={{ height: 428 }}>
            <div className="step" style={{ width: 350, textAlign: 'left', marginBottom: 15 }}>
              Join Vaults: <br />
              V3 Thruster &lt;&gt; Hyperlock
            </div>
            <section>
              <div className="reward-list">
                <span className="txt">V3 USDB/WETH</span>
                <div className="gap"></div>
                <Badge>
                  <Image className="badge-icon" src="/images/odyssey/v4/icon-gold.svg" alt="" width={40} height={40} />
                  <span className="badge-title">50,000</span>
                </Badge>
              </div>
              <div className="reward-list">
                <span className="txt">etherfi V3</span>
                <div className="gap"></div>
                <Badge>
                  <Image className="badge-icon" src="/images/odyssey/v4/icon-gold.svg" alt="" width={40} height={40} />
                  <span className="badge-title">45,000</span>
                </Badge>
              </div>
              <div className="reward-list">
                <span className="txt">RenzoProtocol</span>
                <div className="gap"></div>
                <Badge>
                  <Image className="badge-icon" src="/images/odyssey/v4/icon-gold.svg" alt="" width={40} height={40} />
                  <span className="badge-title">55,000</span>
                </Badge>
              </div>
              <div className="reward-list">
                <span className="txt">KelpDAO</span>
                <div className="gap"></div>
                <Badge>
                  <Image className="badge-icon" src="/images/odyssey/v4/icon-gold.svg" alt="" width={40} height={40} />
                  <span className="badge-title">10,000</span>
                </Badge>
              </div>
              <div className="reward-list">
                <span className="txt">Ethena V3</span>
                <div className="gap"></div>
                <Badge>
                  <Image className="badge-icon" src="/images/odyssey/v4/icon-gold.svg" alt="" width={40} height={40} />
                  <span className="badge-title">30,000</span>
                </Badge>
              </div>
            </section>
            <div className="reward-desc" style={{ marginBottom: 13 }}>
              Juice/WETH Lps are also actively earning 2x Gold
              <Badge style={{ position: 'absolute', left: 44, top: 24 }}>
                <Image className="badge-icon" src="/images/odyssey/v4/icon-gold.svg" alt="" width={40} height={40} />
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
          <Trapeziform {...TrapLayout} className="modal-sec-3" style={{ height: 428 }}>
            <div className="step" style={{ width: 350, textAlign: 'left', marginBottom: 15 }}>
              Join Vaults: <br />
              Particle & Wasabi
            </div>
            <section>
              <div className="reward-list">
                <span className="txt">Particle</span>
                <div className="gap"></div>
                <Badge>
                  <Image className="badge-icon" src="/images/odyssey/v4/icon-gold.svg" alt="" width={40} height={40} />
                  <span className="badge-title">20,000</span>
                </Badge>
              </div>
            </section>
            <div className="reward-list">
              <span className="txt">Wasabi</span>
              <div className="gap"></div>
              <Badge>
                <Image className="badge-icon" src="/images/odyssey/v4/icon-gold.svg" alt="" width={40} height={40} />
                <span className="badge-title">10,000</span>
              </Badge>
            </div>
            <div className="reward-desc" style={{ margin: '44px 0 98px' }}>
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
  );
}
