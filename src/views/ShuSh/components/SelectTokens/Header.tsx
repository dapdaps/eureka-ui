import { memo } from 'react';
import styled from 'styled-components';

import CloseIcon from '@/components/Icons/Close';

import { StyledTitle } from './styles';

const StyledContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledCloseIcon = styled.div`
  color: #979abe;
`;

const Header = ({ onClose }: any) => {
  return (
    <StyledContainer>
      <StyledTitle>Select a token</StyledTitle>
      <StyledCloseIcon>
        <CloseIcon onClose={onClose} />
      </StyledCloseIcon>
    </StyledContainer>
  );
};

export default memo(Header);
