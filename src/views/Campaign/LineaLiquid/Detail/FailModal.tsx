import styled from 'styled-components';

import Modal from '../Modal';

const TicketWrapper = styled.div`
  width: 310px;
  height: 103px;
  background: url(/images/odyssey/lineaLiquid/no-prize.svg) 0 0 no-repeat;
  margin: 20px auto;
  color: #fff;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  line-height: 90px;
  font-family: Montserrat;
`;

const Notice = styled.div`
  text-align: center;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  width: 60%;
  margin: 0 auto 20px;
  font-family: Montserrat;
`;

interface Props {
  data?: any;
  onClose: () => void;
}

export default function TicketModal({ onClose, data }: Props) {
  return (
    <Modal title={''} onClose={onClose}>
      <TicketWrapper>No Prize</TicketWrapper>
      <Notice>You weren't selected in round {data.round} Good luck is on its way!</Notice>
    </Modal>
  );
}
