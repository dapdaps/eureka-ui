import styled from 'styled-components';

const StyledContainer = styled.div`
  position: relative;
`;

const StyledTicket = styled.div`
  width: 333px;
  height: 92px;
  border-radius: 20px;
  background: linear-gradient(116deg, #c8ff7c 11.9%, #ffa5db 64.92%, #7a78ff 104.11%);
  box-shadow: 0px 11px 6.8px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  padding: 4px 0px;
  position: relative;
  z-index: 2;
`;

const StyledNumber = styled.div`
  width: 29%;
  border-left: 1px dashed #000000;
  color: #000;
  font-size: 42px;
  font-style: normal;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledContent = styled.div`
  width: 71%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledTitle = styled.div`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const StyledLinks = styled.div`
  color: #5755ff;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  text-decoration-line: underline;
  margin-top: 9px;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;

const StyledTicketBg = styled(StyledTicket)`
  opacity: 0.5;
  position: absolute;
  z-index: 1;
  transform: rotate(-4deg);
  top: 0px;
  left: 0px;
`;

export default function Ticket({ onClick }: any) {
  return (
    <StyledContainer>
      <StyledTicket>
        <StyledContent>
          <StyledTitle>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
              <path
                d="M8.5 0.873535L9.35961 3.19659C10.2712 5.66006 12.2135 7.60236 14.6769 8.51393L17 9.37354L14.6769 10.2331C12.2135 11.1447 10.2712 13.087 9.35961 15.5505L8.5 17.8735L7.64039 15.5505C6.72883 13.087 4.78653 11.1447 2.32305 10.2331L0 9.37354L2.32305 8.51393C4.78653 7.60236 6.72882 5.66006 7.64039 3.19659L8.5 0.873535Z"
                fill="black"
              />
            </svg>
            <span>Your Tickets</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
              <path
                d="M8.5 0.873535L9.35961 3.19659C10.2712 5.66006 12.2135 7.60236 14.6769 8.51393L17 9.37354L14.6769 10.2331C12.2135 11.1447 10.2712 13.087 9.35961 15.5505L8.5 17.8735L7.64039 15.5505C6.72883 13.087 4.78653 11.1447 2.32305 10.2331L0 9.37354L2.32305 8.51393C4.78653 7.60236 6.72882 5.66006 7.64039 3.19659L8.5 0.873535Z"
                fill="black"
              />
            </svg>
          </StyledTitle>
          <StyledLinks onClick={onClick}>View Your Tickets</StyledLinks>
        </StyledContent>
        <StyledNumber>8</StyledNumber>
      </StyledTicket>
      <StyledTicketBg />
    </StyledContainer>
  );
}
