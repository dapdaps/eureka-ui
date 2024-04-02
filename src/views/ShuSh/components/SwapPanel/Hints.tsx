import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 211px;
  height: 74px;
  border-radius: 6px;
  border: 1px solid #373a53;
  background: #262836;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  padding: 9px;
  box-sizing: border-box;
  color: #979abe;
  font-size: 12px;
  font-weight: 400;
  line-height: normal;
  position: absolute;
  top: -78px;
  left: -20px;
  transition: 0.3s;
`;

const Hints = () => {
  return (
    <StyledContainer className="hints">
      Get a better rate and speed by sacrificicng some privacy. While not trivial, it is techincally possible to track
      the transaction.
    </StyledContainer>
  );
};

export default Hints;
