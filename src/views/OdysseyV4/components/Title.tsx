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
  font-weight: 700;
  line-height: 100%; /* 32px */
  text-transform: capitalize;
`;

const StyledSubtitle = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 20px;
  font-weight: 400;
  line-height: 100%; /* 20px */
  margin-top: 16px;
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
