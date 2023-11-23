import styled from 'styled-components';

const StyledSpinner = styled.div`
  background-color: transparent;
`;
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50vh;
`;
const SpinnerImg = styled.img`
  width: 50px;
`;

export default function Spinner() {
  return (
    <StyledSpinner>
      <SpinnerContainer>
        <SpinnerImg src="https://ipfs.near.social/ipfs/bafkreigxis5i2vafexhyfbafhwfvkebnk7epluyshqrzvkkbixrkkinudu" />
      </SpinnerContainer>
    </StyledSpinner>
  );
}
