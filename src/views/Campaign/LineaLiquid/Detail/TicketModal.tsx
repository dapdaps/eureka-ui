import styled from 'styled-components';

import Modal from '../Modal';

const TicketWrapper = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  font-family: Montserrat;
  .ticket-item {
    width: 204px;
    height: 74px;
    background: url(/images/odyssey/lineaLiquid/ticket-bg.svg) 0 0 no-repeat;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #ebf479;
    font-size: 20px;
    font-weight: 600;
    padding: 0 30px 0 32px;
    &:first-child {
      margin-bottom: 20px;
    }
  }
`;

interface Props {
  data: any[];
  onClose: () => void;
}

export default function TicketModal({ data, onClose }: Props) {
  return (
    <Modal title={`Your Tickets (${data?.length})`} onClose={onClose}>
      <TicketWrapper>
        {data?.map((item, index) => {
          return (
            <div key={index} className="ticket-item">
              {item.map((it: any, index: any) => {
                return <div key={index}>{it}</div>;
              })}
            </div>
          );
        })}
      </TicketWrapper>

      {/* <CheckBtn>Check Now</CheckBtn> */}
    </Modal>
  );
}
