import styled from 'styled-components';

export const StyledContainer = styled.div`
  color: #fff;
  background: #000;
  min-height: 100vh;
  font-family: Montserrat;
`;
export const StyledWrapper = styled.div`
  padding: 0 6.13vw;
`;
export const StyledLogo = styled.img`
  width: 58.13vw;
  height: 9.6vw;
  margin: 29.1vw auto 0;
`;
export const StyledTitle = styled.div`
  text-align: center;
  font-size: 12.8vw;
  font-style: italic;
  font-weight: 700;
  line-height: 100%;
  text-transform: capitalize;
  background: linear-gradient(116deg, #c8ff7c 11.9%, #ffa5db 64.92%, #7a78ff 104.11%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 6.4vw;
`;
export const StyledCard = styled.div`
  border-radius: 4.27vw;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  color: #fff;
  text-align: center;
  font-size: 4.8vw;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  padding: 4.8vw 3.7vw 6.4vw;
  margin-top: 12.8vw;

  .primary {
    color: #ebf479;
    font-style: italic;
    font-weight: 700;
  }
`;
export const StyledLink = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.9vw;
  color: #8890ff;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 7.7vw;
  background: transparent;
  border: 0;
`;
export const StyledIconCopy = styled.img`
  width: 3.7vw;
  height: 3.7vw;
`;
export const StyledVideo = styled.video`
  width: 100%;
  margin-top: 10vw;
`;
