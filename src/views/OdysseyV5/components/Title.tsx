import styled from 'styled-components';

const Wrap = styled.div`
  //display: flex;
  //align-items: center;
  //justify-content: space-between;
`;
const Left = styled.div`
  margin-bottom: 30px;
`;
const StyledTitle = styled.div`
  color: #fff;
  font-family: Chakra Petch;
  font-size: 26px;
  text-transform: capitalize;
  margin-bottom: 15px;;
`;

const StyledSubtitle = styled.div`
  color: #979abe;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
`;

export default function Title({ title, subtitle, titleSize, extra }: any) {
  return (
    <Wrap>
      <Left>
        <StyledTitle style={{ fontSize: `${titleSize || 32}px` }}>{title}</StyledTitle>
        <StyledSubtitle>{subtitle}</StyledSubtitle>
      </Left>
      {extra ? extra : null}
    </Wrap>
  );
}
