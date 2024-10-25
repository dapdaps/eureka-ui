import styled from 'styled-components';

import Empty from '@/components/Empty';

import Modal from '../Modal';

const TicketWrapper = styled.div`
  /* display: flex;
  flex-flow: wrap;
  justify-content: space-between; */
  font-family: Montserrat;
  max-height: 300px;
  overflow: auto;
  .ticket-item {
    height: 70px;
    background: rgba(115, 113, 252, 1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;

    margin-bottom: 16px;
    .ticket-title {
      flex: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 500;
      gap: 10px;
      border-right: 1px dashed #000;
    }
    .ticket-nums {
      flex: 3;
      display: flex;
      justify-content: center;
      font-size: 30px;
      font-weight: 800;
      letter-spacing: 0.82em;
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
      {data?.length ? (
        <TicketWrapper>
          {data?.map((item, index) => {
            return (
              <div key={index} className="ticket-item">
                <div className="ticket-title">
                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10.1813 0L11.4951 3.55029C12.4066 6.01376 14.3489 7.95605 16.8124 8.86762L20.3627 10.1813L16.8124 11.4951C14.3489 12.4066 12.4066 14.3489 11.4951 16.8124L10.1813 20.3627L8.86762 16.8124C7.95605 14.3489 6.01376 12.4066 3.55028 11.4951L0 10.1813L3.55029 8.86762C6.01376 7.95605 7.95605 6.01376 8.86762 3.55028L10.1813 0Z"
                      fill="white"
                    />
                  </svg>
                  <div>Ticket {index + 1}</div>
                </div>
                <div className="ticket-nums">
                  {item.map((it: any, index: any) => {
                    return <div key={index}>{it}</div>;
                  })}
                </div>
              </div>
            );
          })}
        </TicketWrapper>
      ) : (
        <Empty tips="No tickets yet" />
      )}
    </Modal>
  );
}
