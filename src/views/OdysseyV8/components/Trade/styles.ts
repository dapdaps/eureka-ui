import Image from 'next/image';
import styled from 'styled-components';

export const StyledContainer = styled.div`
  margin: 0 auto 100px;
  width: 1188px;
`;

export const StyledContent = styled.div`
  padding-top: 20px;
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
`;

export const StyledWrapButton = styled(Image)`
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;
