import styled from 'styled-components';

export const StyledContainer = styled.div`
  height: 600px;
`;

export const StyledContent = styled.div`
  padding-top: 90px;
  gap: 99px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .dapdapx {
    position: absolute;
    top: 193px;
  }
`;

export const Rush = styled.div`
  position: relative;
  img {
    display: inline-block;
  }
  .gold {
    position: absolute;
    left: 50%;
    margin-left: -65px;
    margin-top: 47px;
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
