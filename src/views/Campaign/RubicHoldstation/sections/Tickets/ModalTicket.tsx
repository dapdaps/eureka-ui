import styled from 'styled-components';

const StyledItem = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  width: 398px;
  height: 57px;
  border-radius: 10px;
  background: linear-gradient(116deg, #c8ff7c 11.9%, #ffa5db 64.92%, #7a78ff 104.11%);
  padding: 6px 0px;
`;

const StyledItemHeader = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 17px;
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  border-right: 1px dashed #000;
  height: 45px;
`;

const StyledItemContent = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

const StyledNumber = styled.div<{ active?: boolean }>`
  color: #000;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  width: 39px;
  height: 39px;
  text-align: center;
  line-height: 34px;
  border-radius: 50%;
  border: 3px solid ${({ active }) => (active ? '#FF008A' : 'transparent')};
`;

export default function ModalTicket({ index, voucher }: ModalTicketProps) {
  const isFullMatch = voucher.every((v) => !!v.won);

  return (
    <StyledItem>
      <StyledItemHeader>
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
          <path
            d="M10.1813 0L11.4951 3.55029C12.4066 6.01376 14.3489 7.95605 16.8124 8.86762L20.3627 10.1813L16.8124 11.4951C14.3489 12.4066 12.4066 14.3489 11.4951 16.8124L10.1813 20.3627L8.86762 16.8124C7.95605 14.3489 6.01376 12.4066 3.55028 11.4951L0 10.1813L3.55029 8.86762C6.01376 7.95605 7.95605 6.01376 8.86762 3.55028L10.1813 0Z"
            fill="black"
          />
        </svg>
        <span>Ticket {index}</span>
      </StyledItemHeader>
      <StyledItemContent>
        {voucher.map((item, idx) => (
          <StyledNumber key={idx} active={!isFullMatch ? item.won : false}>
            {item.no}
          </StyledNumber>
        ))}
      </StyledItemContent>
    </StyledItem>
  );
}

interface ModalTicketProps {
  index: number;
  voucher: { no: string; won?: boolean }[];
}
