import { memo } from 'react';
import styled from 'styled-components';

import Question from '@/components/Icons/Question';
import RefreshIcon from '@/components/Icons/Refresh';
import Switcher from '@/components/Switcher';

import Hints from './Hints';

export const StyledHeader = styled.div`
  display: flex;
  padding: 10px 0px;
  --switch-color: #fcc42c;
`;

export const StyledHeaderContent = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const StyledSwitchText = styled.div<{ $active: boolean }>`
  color: ${({ $active }) => ($active ? '#FCC42C' : '#979ABE')};
`;

export const StyledQuestion = styled.div`
  position: relative;
  cursor: pointer;
  padding: 0px 10px 0px 4px;
  position: relative;

  & .hints {
    display: none;
  }

  &:hover {
    opacity: 0.9;
  }

  &:hover .hints {
    display: block;
  }
`;

export const StyledRefresh = styled.div`
  cursor: pointer;
  color: #979abe;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;

const Header = ({ anonymous, setAnonymous, loading, onRefresh }: any) => {
  return (
    <StyledHeader>
      <StyledHeaderContent>
        <StyledSwitchText $active={!anonymous}>Semi-Private</StyledSwitchText>
        <StyledQuestion>
          <Question />
          <Hints />
        </StyledQuestion>
        <Switcher active={anonymous} onChange={setAnonymous} />
        <StyledSwitchText $active={anonymous} style={{ marginLeft: '20px' }}>
          Private
        </StyledSwitchText>
      </StyledHeaderContent>
      <StyledRefresh
        onClick={() => {
          if (!loading) onRefresh();
        }}
      >
        <RefreshIcon refreshing={loading} />
      </StyledRefresh>
    </StyledHeader>
  );
};

export default memo(Header);
