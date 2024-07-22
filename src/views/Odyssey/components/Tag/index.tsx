import styled from 'styled-components';
import { StyledFont } from '@/styled/styles';

const StyledExpired = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px 6px 8px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(32, 34, 47, 0.8);
`;

const StyledLiveContainer = styled.div`
  position: relative;
  &:before {
    content: '';
    position: absolute;
    border-radius: 16px;
    width: 100%;
    height: 100%;
    box-shadow: 0px 0px 5px 6px rgba(87, 219, 100, 0.2);
    background: rgba(32, 34, 47, 0.8);
    animation: 1.5s linear infinite firstAnimation;
  }
  @keyframes firstAnimation {
    0% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.8);
    }
  }
`;
const StyledLive = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 53px;
  height: 26px;
  border-radius: 16px;
  border: 1px solid #57db64;
  background: rgba(32, 34, 47, 0.8);
  position: relative;
`;

export default function Tag({ status }: any) {
  return ['ended', 'un_start'].includes(status) ? (
    <StyledExpired>
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
        <ellipse cx="3.99988" cy="4" rx="4" ry="4" fill="#979ABE" />
      </svg>
      <StyledFont color="#FFF" fontSize="12px" fontWeight="500">
        {status === 'ended' ? 'Expired' : 'Upcoming'}
      </StyledFont>
    </StyledExpired>
  ) : (
    <StyledLiveContainer>
      <StyledLive>
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
          <circle cx="4" cy="4" r="4" fill="#57DB64" />
        </svg>
        <StyledFont color="#FFF" fontSize="12px" fontWeight="500">
          Live
        </StyledFont>
      </StyledLive>
    </StyledLiveContainer>
  );
}
