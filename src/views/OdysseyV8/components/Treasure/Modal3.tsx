import Image from 'next/image';

import { StyledFlex } from '@/styled/styles';

import Modal from '../Modal';
import Trapeziform from '../Trapeziform';
import TrapeziformBtn from '../TrapeziformBtn';
import { ModalBody, ModalDesc, ModalTitle, TrapLayout } from './styles';

export default function Modal3({ setShowModal3, openLink }: any) {
  return (
    <Modal type="type3" onClose={() => setShowModal3(false)}>
      <ModalTitle style={{ marginBottom: '5px' }}>Ethena: 125x Stats with USDe</ModalTitle>
      <ModalDesc>
        <div style={{ fontWeight: 'bold' }}>Benefits of stacking :</div>
        <ul
          style={{
            fontSize: '16px',
            lineHeight: '150%',
            marginTop: '3px',
          }}
        >
          <li>Earn 125x multiplier on sats (compared to 20x with vanilla staking)</li>
          <li>Get additional rewards: Thruster credits, Hyperlock points, Juice points, Orbit points</li>
          <li>Earn 4x Blast Gold across projects</li>
        </ul>
      </ModalDesc>
      <ModalBody>
        <Trapeziform
          {...TrapLayout}
          className="modal-list"
          style={{
            padding: '20px 26px',
            marginTop: '17px',
          }}
        >
          <div className="modal-list-head">
            <div className="head-left">
              <StyledFlex gap="7px" className="head-title" style={{ paddingLeft: '5px' }}>
                <span style={{ whiteSpace: 'nowrap' }}>Step 1. Buy USDe on</span>
                <div className="tag-thr">
                  <Image src="/images/odyssey/v4/tag-thr.svg" alt="" width={139} height={24} />
                </div>
              </StyledFlex>
            </div>
          </div>
          <div className="modal-list-body">
            <div className="body-left" style={{ color: 'white' }}>
              <Image src="/images/tokens/usde.png" alt="" width={26} height={26} />
              USDe
            </div>
            <div className="body-right">
              <TrapeziformBtn
                width="236px"
                height="42px"
                handleClick={(e: any) => openLink(`${location.origin}/dapp/thruster-finance`)}
              >
                Trade <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
              </TrapeziformBtn>
            </div>
          </div>
        </Trapeziform>
        <Trapeziform
          {...TrapLayout}
          className="modal-list"
          style={{
            padding: '20px 26px',
            marginTop: '17px',
          }}
        >
          <div className="modal-list-head">
            <div className="head-left">
              <StyledFlex gap="7px" className="head-title" style={{ paddingLeft: '5px' }}>
                <span style={{ whiteSpace: 'nowrap' }}> Step 2. Lend USDe on</span>
                <div className="tag-thr">
                  <Image src="/images/odyssey/v8/orbit.png" alt="" width={68} height={20} />
                </div>
                <span> to get USDB (20x multiplier).</span>
              </StyledFlex>
            </div>
          </div>
          <div className="modal-list-body">
            <div className="body-left" style={{ color: 'white' }}>
              <Image src="/images/odyssey/v8/orbit-tag.png" alt="" width={196} height={40} />
            </div>
            <div className="body-right" style={{ display: 'flex', gap: '16px' }}>
              <TrapeziformBtn
                width="216px"
                height="42px"
                handleClick={(e: any) => openLink(`${location.origin}/dapp/orbit-protocol`)}
              >
                Supply USDe <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
              </TrapeziformBtn>
              <TrapeziformBtn
                width="216px"
                height="42px"
                handleClick={(e: any) => openLink(`${location.origin}/dapp/orbit-protocol`)}
              >
                Borrow USDB <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
              </TrapeziformBtn>
            </div>
          </div>
        </Trapeziform>
        <Trapeziform
          {...TrapLayout}
          className="modal-list"
          style={{
            padding: '20px 26px',
            marginTop: '17px',
          }}
        >
          <div className="modal-list-head">
            <div>
              <StyledFlex gap="7px" className="head-title" style={{ paddingLeft: '5px' }}>
                <span style={{ whiteSpace: 'nowrap' }}>Step 3: Deposit USDB to</span>
                <Image src="/images/odyssey/v8/juice.png" alt="" width={88} height={32} />
                <span style={{ whiteSpace: 'nowrap' }}>Pool to borrow 3x of Ethena V3 vault</span>
              </StyledFlex>
              <div className="head-title">(105x multiplier)</div>
            </div>
          </div>
          <div className="modal-list-body">
            <div className="body-left" style={{ color: 'white' }}>
              <Image src="/images/odyssey/v4/coin-usdb.svg" alt="" width={26} height={26} />
              USDB
              <Image src="/images/odyssey/v4/arrow-white.svg" alt="" width={19} height={16} />
              <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                <rect x="1" y="1" width="40" height="40" rx="11" fill="black" stroke="#262836" stroke-width="2" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.1906 10H16.6702L16.3327 10.3837L7.62181 20.2926L7 21L7.62181 21.7073L16.3327 31.6162L16.6702 32H17.1906H32.8733H34V30.9089V24.6096H31.7467V29.8177H19.6545L26.8919 21.7137L27.5293 21L26.8919 20.2862L19.6545 12.1823H31.7467V17.3904H34V11.0911V10H32.8733H17.1906ZM17.1972 12.7667L9.95937 21L17.1972 29.2333L24.55 21L17.1972 12.7667Z"
                  fill="white"
                />
              </svg>
              Ethena V3 Vaults
            </div>
            <div className="body-right">
              <TrapeziformBtn
                onClick={() => {
                  openLink(`${location.origin}/dapp/juice`);
                }}
                width="236px"
                height="42px"
              >
                Deposit
                <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
              </TrapeziformBtn>
            </div>
          </div>
        </Trapeziform>
      </ModalBody>
      <div style={{ fontWeight: 'bold', marginTop: '15px', color: '#fff' }}>Note:</div>
      <ul
        style={{
          fontSize: '16px',
          lineHeight: '150%',
          marginTop: '3px',
          color: '#fff',
        }}
      >
        <li>
          Watch out for borrow rates when using Orbit (LTV 80%) and Juice. Borrow rates: 25% on Orbit + 29% on Juice
        </li>
        <li>Sats are valuable loots in Ethena, Blast Farm offers the highest multiplier to earn them.</li>
      </ul>
    </Modal>
  );
}
