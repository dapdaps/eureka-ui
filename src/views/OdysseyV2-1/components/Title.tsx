import styled from 'styled-components';

const StyledContainer = styled.div`
  color: #fff;
  font-family: Trans-America;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 18px;
`;

export default function Title({ title }: any) {
  return <StyledContainer>{title.toUpperCase()}</StyledContainer>;
}
