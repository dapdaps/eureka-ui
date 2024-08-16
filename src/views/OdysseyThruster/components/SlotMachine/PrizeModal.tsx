import styled from 'styled-components';
import Image from 'next/image';
import Modal from '../Modal';
import lbImg from '@public/images/others/odyssey/thruster/components/SlotMachine/Congrates.gif';
import smImg from '@public/images/others/odyssey/thruster/components/SlotMachine/sm.svg?url';
import RewardIcons from '../../RewardIcons'
import { useState } from 'react';

const Iocn = styled.img`
  position: absolute;
  left: 50%;
  top: 10px;
  transform: translate(-50%);
  width: 100px;
  height: 100px;
  &.fail {
    top: 30px;
    width: 80px;
    height: 80px;
  }
`;

const Title = styled.div`
  font-family: Gantari;
  font-size: 32px;
  font-weight: 700;
  line-height: 38px;
  text-align: center;
  color: #fff;
  padding-top: 100px;
`;

const Content = styled.div`
  font-family: Gantari;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  text-align: center;
  color: rgba(235, 244, 121, 1);
  margin-top: 15px;
  &.fail {
    color: #fff;
  }
`;

export const Btn = styled.button`
  width: 360px;
  height: 48px;
  border-radius: 10px;
  line-height: 48px;
  background: rgba(235, 244, 121, 1);
  font-family: Gantari;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  transition: 0.5s;
  margin-top: 40px;

  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export default function PrizeModal({ onClose, prize }: { onClose: () => void; prize: any }) {
  return (
    <Modal onClose={onClose} style={{ width: 450, padding: '0px 20px 30px', textAlign: 'center' }}>
      {Object.entries(prize).length === 0 ? (
        <>
          <Iocn className="fail" src={smImg.src} />
          <Title>Oops!</Title>
          <Content className="fail">{"You haven't won this round."}</Content>
          <Btn onClick={onClose}>Keep trying</Btn>
        </>
      ) : (
        <>
          <Iocn src={lbImg.src} />
          <Title>Congrats!</Title>
          <Content>You’ve won</Content>

          <div style={{ marginTop: 30 }}>
            {Object.entries(prize).map(([key, value]) => (
              <>
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 20,
                  }}
                >
                  <Image src={RewardIcons[key].icon} width={26} height={26} alt="" />
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      flexShrink: 0,
                      color: '#fff',
                    }}
                  >
                    {RewardIcons[key].label}
                  </div>
                  <div
                    style={{
                      flexGrow: 1,
                      width: '100%',
                      height: 1,
                      borderBottom: '1px dashed #979ABE',
                    }}
                  ></div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      flexShrink: 0,
                      color: '#fff',
                    }}
                  >
                    {value as string}
                  </div>
                </div>
              </>
            ))}
          </div>
          <Btn
            onClick={() => {
              onClose();
            }}
          >
            Continue
          </Btn>
        </>
      )}
    </Modal>
  );
}
