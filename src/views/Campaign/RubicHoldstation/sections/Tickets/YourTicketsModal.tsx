import styled from 'styled-components';

import Modal from '@/components/Modal';

import Button from '../../components/Button';
import ModalTicket from './ModalTicket';

const StyledContainer = styled.div`
  padding: 34px 38px 32px 32px;
`;

const StyledButtonWrapper = styled.div`
  margin-top: 39px;
  display: flex;
  justify-content: center;
`;

export default function YourTicks({ display, onClose }: any) {
  return (
    <Modal
      display={display}
      title="Your Tickets (3)"
      width={470}
      onClose={onClose}
      content={
        <StyledContainer>
          {[1, 2, 3].map((item) => (
            <ModalTicket key={item} index={item} />
          ))}
          <StyledButtonWrapper>
            <Button>Check Now</Button>
          </StyledButtonWrapper>
        </StyledContainer>
      }
    />
  );
}
