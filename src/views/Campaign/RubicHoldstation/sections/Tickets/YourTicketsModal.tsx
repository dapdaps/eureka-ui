import { useContext } from 'react';
import styled from 'styled-components';

import Empty from '@/components/Empty';
import Modal from '@/components/Modal';
import RubicHoldstationContext from '@/views/Campaign/RubicHoldstation/context';

import ModalTicket from './ModalTicket';

const StyledContainer = styled.div`
  padding: 34px 38px 32px 32px;
  max-height: 451px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export default function YourTicks({ display, onClose }: any) {
  const context = useContext(RubicHoldstationContext);

  const { userVouchers } = context.tickets;

  return (
    <Modal
      display={display}
      title={`Your Tickets (${userVouchers.list.length})`}
      width={470}
      onClose={onClose}
      content={
        <StyledContainer>
          {userVouchers.list.length ? (
            userVouchers.list.map((v: string[], idx: number) => (
              <ModalTicket key={idx} index={idx + 1} voucher={v.map((no) => ({ no }))} />
            ))
          ) : (
            <Empty tips="No tickets yet" />
          )}
        </StyledContainer>
      }
    />
  );
}
