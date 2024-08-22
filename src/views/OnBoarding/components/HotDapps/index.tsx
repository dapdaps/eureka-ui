import { memo } from 'react';

import Dapps from '@/components/Dapps';
import GoMore from '@/components/GoMore';

import { StyledContainer, StyledHeader, StyledTitle, StyledTitleImg } from './styles';

const HotDapps = ({ dapps }: any) => {
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>
          <StyledTitleImg src="/images/onboarding/hot.png" />
          <div>Hot dApps on Linea</div>
        </StyledTitle>
        <GoMore label="View all" path="/alldapps" />
      </StyledHeader>
      <Dapps dapps={dapps || []} bp={{ detail: '100131-005', dapp: '100131-005' }} />
    </StyledContainer>
  );
};

export default memo(HotDapps);
