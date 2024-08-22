import { memo } from 'react';
import styled from 'styled-components';

import Modal from '../Modal';

const Title = styled.div`
  font-size: 26px;
  font-weight: 500;
  line-height: 31px;
  color: #fff;
  padding-top: 10px;
`;

const Context = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  color: rgba(151, 154, 190, 1);

  .color {
    color: #ebf479;
  }
`;

const SubTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  color: #fff;
  margin-top: 27px;
`;

function RuleModal({ onClose, onShowModal }: any) {
  return (
    <Modal onClose={onClose} width={760}>
      <Title>Game Rules for ‘SPIN-TO-WIN’ !</Title>
      <Context>
        Welcome to Odyssey Vol.4+! Participate in our exciting &quot;Spin to Win&quot; game and stand a chance to win
        amazing rewards.
      </Context>
      <SubTitle>Here’s how you can join and play:</SubTitle>
      <Context>
        Complete Tasks: Engage in Odyssey Vol.4+ Strategy、Tasks to earn spins. Spin the Wheel: Use your spins to
        participate in the &quot;Spin to Win&quot; game. Win Rewards: Match symbols to win prizes. The more symbols you
        match, the bigger the rewards!
      </Context>
      <SubTitle>Prizes Include:</SubTitle>
      <Context>Blast Gold，Ring Points, Thruster Credits, Particle Points, veBlade, $Yield, Baja, Rings, Andy.</Context>
      <Context />
      <Context
        style={{ textDecoration: 'underline', cursor: 'pointer' }}
        onClick={() => {
          onShowModal();
        }}
      >
        Check the Prize pool
      </Context>
      <Context style={{ marginTop: '24px' }}>Get started now and spin to win incredible prizes! Good luck!</Context>
    </Modal>
  );
}

export default memo(RuleModal);
