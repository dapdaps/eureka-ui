import styled from 'styled-components';

const StyledContainer = styled.div`
  height: 42px;
  border-radius: 8px;
  border: 1px solid #ff547d;
  background: rgba(255, 84, 125, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: #ff547d;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  margin-top: 19px;
`;

const Expired = () => {
  return (
    <StyledContainer>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.10016 1C7.86996 -0.333334 9.79446 -0.333333 10.5643 1L17.3935 12.8286C18.1633 14.1619 17.201 15.8286 15.6614 15.8286H2.00298C0.463382 15.8286 -0.498867 14.1619 0.270933 12.8286L7.10016 1ZM7.91793 6.22857C7.91793 5.72363 8.32727 5.31429 8.83221 5.31429C9.33716 5.31429 9.7465 5.72363 9.7465 6.22857V9.88572C9.7465 10.3907 9.33716 10.8 8.83221 10.8C8.32727 10.8 7.91793 10.3907 7.91793 9.88572V6.22857ZM8.83221 11.7143C8.32727 11.7143 7.91793 12.1236 7.91793 12.6286C7.91793 13.1335 8.32727 13.5429 8.83221 13.5429C9.33716 13.5429 9.7465 13.1335 9.7465 12.6286C9.7465 12.1236 9.33716 11.7143 8.83221 11.7143Z"
          fill="#FF547D"
        />
      </svg>
      <div>Order expired. This order has exceeded its time limit.</div>
    </StyledContainer>
  );
};

export default Expired;
