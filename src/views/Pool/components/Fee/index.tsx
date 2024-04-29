import styled from 'styled-components';

const StyledContainer = styled.div`
  border-radius: 4px;
  background: rgba(151, 154, 190, 0.1);
  padding: 3px 5px;
  color: #979abe;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export default function Fee({ fee }: any) {
  return <StyledContainer>{fee / 10000}%</StyledContainer>;
}
