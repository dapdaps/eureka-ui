import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Left = styled.div``;
const StyledTitle = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  text-transform: capitalize;
`;

const StyledSubtitle = styled.div`
  margin-top: 14px;
  color: #979abe;
  font-family: Montserrat;
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
