import styled from 'styled-components';

const StyledContainer = styled.div`
  position: absolute;
  width: 663.796px;
  height: 75.173px;
  transform: rotate(-30deg);
  background-color: #fdfe03;
  left: -65px;
  top: 85px;
  z-index: 3;
  color: #000;
  font-family: '5squared pixel';
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  text-transform: capitalize;
  line-height: 75.173px;
  box-sizing: border-box;
  padding-left: 56px;
`;

export default function DisabledMark() {
  return <StyledContainer>Spin to Win Coming Soon!</StyledContainer>;
}
