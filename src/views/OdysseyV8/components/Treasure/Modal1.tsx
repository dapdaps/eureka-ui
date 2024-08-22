import Image from 'next/image';

import { StyledFlex } from '@/styled/styles';
import CoinGroup from '@/views/OdysseyV4/components/Treasure/CoinGroup';

import Modal from '../Modal';
import Trapeziform from '../Trapeziform';
import TrapeziformBtn from '../TrapeziformBtn';
import { ModalBody, ModalDesc, ModalTitle, TrapLayout } from './styles';

export default function Modal1({ setShowModal1, setSelectedPool, openLink }: any) {
  return (
    <Modal
      type="type1"
      onClose={() => setShowModal1(false)}
      bgColor="#000"
      style={{ padding: '35px 0px 35px 55px', top: 12 }}
    >
      <div
        style={{
          height: '80vh',
          overflowY: 'auto',
          paddingRight: '55px',
        }}
      >
        <ModalTitle>How to maximize Point or Yield by Particle and DUO? </ModalTitle>
        <ModalDesc>
          This strategy benefits users with an additional Gold bonus and Points reward. <br />
          Trade on Particle and DUO, you will get more rewards.
        </ModalDesc>
        <ModalBody>
          <div style={{ textAlign: 'center', color: '#EBF479', fontSize: '18px', fontWeight: 700 }}>
            Stacking: Boosting x3 gold from 3 projects + 3 points
          </div>
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
                  <span style={{ whiteSpace: 'nowrap' }}>Step 1. Deposit ETH or USDB on DUO Exchange to receive</span>
                  <Image src="/images/odyssey/v8/duo.png" alt="" width={45} height={32} />
                  <span>tokens.</span>
                </StyledFlex>
              </div>
            </div>
            <div className="modal-list-body">
              <div className="body-left" style={{ color: 'white' }}>
                <Image src="/images/odyssey/v4/coin-eth.svg" alt="" width={26} height={26} />
                ETH
                <Image src="/images/odyssey/v4/coin-usdb.svg" alt="" width={26} height={26} />
                USDB
                <Image src="/images/odyssey/v4/arrow-white.svg" alt="" width={19} height={16} />
                <Image src="/images/odyssey/v8/coin-duo.svg" alt="" width={26} height={26} />
                DUO
              </div>
              <div className="body-right">
                <TrapeziformBtn
                  onClick={() => {
                    window.open(`${location.origin}/dapp/duo`, '_blank');
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
                  <span style={{ whiteSpace: 'nowrap' }}>Step 2. Add DETH/ETH or DUSD/USDB on</span>
                  <div className="tag-thr">
                    <Image src="/images/odyssey/v4/tag-thr.svg" alt="" width={139} height={24} />
                  </div>
                </StyledFlex>
              </div>
            </div>
            <div className="modal-list-body">
              <div className="body-left">
                <CoinGroup
                  icon={['/images/tokens/deth.png', '/images/odyssey/v4/coin-eth.svg']}
                  name={['DETH', 'ETH']}
                  onClick={() => {
                    setSelectedPool('DETH,ETH');
                  }}
                />
                <CoinGroup
                  icon={['/images/tokens/dusd.png', '/images/odyssey/v4/coin-usdb.svg']}
                  name={['DUSD', 'USDB']}
                  onClick={() => {
                    setSelectedPool('DUSD,USDB');
                  }}
                />
              </div>
              <div className="body-right">
                <TrapeziformBtn
                  width="236px"
                  height="42px"
                  handleClick={(e: any) => openLink(`${location.origin}/dapp/thruster-liquidity`)}
                >
                  Add Liquidity <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
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
                  <span style={{ whiteSpace: 'nowrap' }}>Step 3. Stake DETH/ETH or DUSD/USDB on</span>
                  <div className="tag-thr">
                    <Image src="/images/odyssey/v4/tag-hyp.svg" alt="" width={107} height={22} />
                  </div>
                </StyledFlex>
              </div>
            </div>
            <div className="modal-list-body">
              <div className="body-left">
                <div className="coin-pairs" style={{ marginRight: '30px' }}>
                  <div className="pairs">
                    <Image src="/images/tokens/deth.png" alt="" width={26} height={26} />
                    <Image
                      src="/images/odyssey/v4/coin-eth.svg"
                      alt=""
                      width={26}
                      height={26}
                      style={{ marginLeft: -10 }}
                    />
                  </div>

                  <div className="txt">DETH / ETH</div>
                </div>
                <div className="coin-pairs">
                  <div className="pairs">
                    <Image src="/images/tokens/dusd.png" alt="" width={26} height={26} />
                    <Image
                      src="/images/odyssey/v4/coin-usdb.svg"
                      alt=""
                      width={26}
                      height={26}
                      style={{ marginLeft: -10 }}
                    />
                  </div>

                  <div className="txt">DUSD / USDB</div>
                </div>
              </div>
              <div className="body-right">
                <TrapeziformBtn
                  width="236px"
                  height="42px"
                  handleClick={(e: any) => openLink(`${location.origin}/dapp/hyperlock`)}
                >
                  Stake LP <Image src="/images/odyssey/v4/arrow.svg" alt="" width={23} height={16} />
                </TrapeziformBtn>
              </div>
            </div>
          </Trapeziform>
          <div style={{ textAlign: 'center', color: '#EBF479', fontSize: '18px', fontWeight: 700 }}>
            Leverage x3 points
          </div>
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
                  <span style={{ whiteSpace: 'nowrap' }}>Deposit ETH or USDB into Particle Vaults on</span>
                  <Image src="/images/odyssey/v8/juice.png" alt="" width={88} height={32} />
                </StyledFlex>
              </div>
            </div>
            <div className="modal-list-body">
              <div className="body-left" style={{ color: 'white' }}>
                <Image src="/images/odyssey/v4/coin-weth2.svg" alt="" width={26} height={26} />
                WETH
                <Image src="/images/odyssey/v4/coin-usdb.svg" alt="" width={26} height={26} />
                USDB
                <Image src="/images/odyssey/v4/arrow-white.svg" alt="" width={19} height={16} />
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                  <rect x="1" y="1" width="40" height="40" rx="11" fill="black" stroke="#262836" stroke-width="2" />
                  <path
                    d="M20.6836 35.3672C12.5741 35.3672 6 28.7931 6 20.6836C6 12.5741 12.5741 6 20.6836 6C28.7931 6 35.3672 12.5741 35.3672 20.6836C35.3672 28.7931 28.7931 35.3672 20.6836 35.3672Z"
                    fill="#191919"
                  />
                  <path
                    d="M20.6846 33.7939C13.4439 33.7939 7.57422 27.9242 7.57422 20.6836C7.57422 13.4429 13.4439 7.57324 20.6846 7.57324C27.9252 7.57324 33.7949 13.4429 33.7949 20.6836C33.7949 27.9242 27.9252 33.7939 20.6846 33.7939Z"
                    fill="#F0F0F0"
                  />
                  <path
                    d="M20.6855 30.123C15.4723 30.123 11.2461 25.8969 11.2461 20.6836C11.2461 15.4703 15.4723 11.2441 20.6855 11.2441C25.8988 11.2441 30.125 15.4703 30.125 20.6836C30.125 25.8969 25.8988 30.123 20.6855 30.123Z"
                    fill="#191919"
                  />
                </svg>
                Particle Vaults
              </div>
              <div className="body-right">
                <TrapeziformBtn
                  onClick={() => {
                    window.open(`${location.origin}/dapp/juice`, '_blank');
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
      </div>
    </Modal>
  );
}
