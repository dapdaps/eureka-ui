import styled from 'styled-components';

export const StyledContainer = styled.div`
  background-color: #000;
  height: 600px;
`;

export const StyledContent = styled.div`
  padding-top: 96px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Rush = styled.div`
  position: relative;
  .gold {
    position: absolute;
    left: 50%;
    margin-left: -163px;
    margin-top: -63px;
    z-index: 2;
  }
  .light {
    position: absolute;
    left: 50%;
    margin-left: -186px;
    margin-top: -78px;
    z-index: 1;
    animation: goldLight 10s infinite ease-in-out;
    @keyframes goldLight {
      0% {
        transform: scale(0.6) rotate(0deg);
      }

      50% {
        transform: scale(1.2) rotate(180deg);
      }

      100% {
        transform: scale(0.6) rotate(360deg);
      }
    }
  }
`;
