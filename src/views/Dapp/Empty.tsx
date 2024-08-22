import { useRouter } from 'next/router';
import styled from 'styled-components';

const StyledContainer = styled.div`
  color: #fff;
  font-size: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 30vh;
`;

const StyledButton = styled.button`
  width: 164px;
  height: 46px;
  border-radius: 10px;
  background: #ebf479;
  padding: 0px 18px;
  color: #000;
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 20px;
`;

const DappEmpty = () => {
  const router = useRouter();
  return (
    <StyledContainer>
      <div> Sorry, this dapp is temporarily unavailable.</div>
      <StyledButton
        onClick={() => {
          router.replace('/');
        }}
      >
        Back to Home
      </StyledButton>
    </StyledContainer>
  );
};

export default DappEmpty;
