import styled from 'styled-components';

const StyledTitle = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-style: italic;
  font-weight: 700;
  line-height: 100%; /* 32px */
  text-transform: capitalize;
`;

const StyledSubtitle = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 20px;
  font-style: italic;
  font-weight: 400;
  line-height: 100%; /* 20px */
  margin-top: 16px;
`;

export default function Title({ title, subtitle, titleSize }: any) {
  return (
    <>
      <StyledTitle style={{ fontSize: `${titleSize || 32}px` }}>{title}</StyledTitle>
      <StyledSubtitle>{subtitle}</StyledSubtitle>
    </>
  );
}
