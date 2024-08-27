import styled from 'styled-components';

import Modal from '../Modal';
import failImg from './fail.png';
import successImg from './success.png';

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

export default function ParterModal({
  onClose,
  success,
  parter,
}: {
  onClose: () => void;
  success: boolean;
  parter: string;
}) {
  return (
    <Modal onClose={onClose} style={{ width: 450, padding: '0px 30px 30px', textAlign: 'center' }}>
      <>
        <Iocn src={success ? successImg.src : failImg.src} />
        <Title>{success ? 'Surprise!' : 'Heads-up!'}</Title>
        <Content>{success ? 'You’ve Unlocked 5 spins' : 'You have already claimed'}</Content>
        <div style={{ marginTop: 30, fontSize: 18, color: '#fff', textAlign: 'left' }}>
          {success ? (
            <>
              <div>
                You’ve accessed this page through {parter}’s special link. As a reward, you receive an extra 5 spins!
              </div>
              <div style={{ marginTop: '20px' }}>Enjoy your bonus and have fun!</div>
            </>
          ) : (
            <>
              <div>
                You have already claimed 5 spins through {parter}. Additional bonuses through other links are not
                allowed.
              </div>
              <div style={{ marginTop: '20px' }}>Participate in missions to get more spins...</div>
            </>
          )}
        </div>
        <Btn
          onClick={() => {
            onClose();
          }}
        >
          {success ? 'Spin to Win' : 'Go to Odyssey'}
        </Btn>
      </>
    </Modal>
  );
}
