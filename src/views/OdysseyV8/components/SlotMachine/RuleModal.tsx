import styled from 'styled-components';

import Modal from '../Modal';

import { memo } from 'react';

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

function RuleModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose} width={760}>
      <Title>Welcome to DapDap Odyssey ‘Spin to Win’ !</Title>
      <SubTitle>How to Play?</SubTitle>
      <Context>Earn Spins: Complete tasks on the Odyssey event page to earn spins.</Context>
      <Context>Use Spins: Consume your spins to play the slot machine by pressing the "Spin" button.</Context>
      <Context>
        Winning Conditions: The slot machine has 5 symbols. Match 3 or more identical symbols on a spin to win a prize.
      </Context>
      <SubTitle>Rewards:</SubTitle>
      <Context>
        Rewards: 3 Identical Symbols: <span className="color">Win 500 PTS</span>
      </Context>
      <Context>
        Rewards: 4 Identical Symbols: <span className="color">Win 2000 PTS</span>
      </Context>
      <Context>
        Rewards: 5 Identical Symbols: <span className="color">Win 10000 PTS</span>
      </Context>
      <SubTitle>Prize Pool:</SubTitle>
      <Context>Additional Rewards: For matching 4 or more identical symbols, you can also win:</Context>
      <Context />
      <Context>
        - Native Tokens
        <br />
        - Other Project Points
        <br />- Blast Gold
      </Context>
      <Context style={{ marginTop: '24px' }}>
        Keep spinning to maximize your chances of winning the top prizes! Good luck and have fun spinning!
      </Context>
    </Modal>
  );
}

export default memo(RuleModal);
