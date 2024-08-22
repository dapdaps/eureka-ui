import { memo } from 'react';

import Breadcrumb from '@/components/Breadcrumb';

import QA from './components/QA';
import {
  StyledBg1,
  StyledBg2,
  StyledContainer,
  StyledContent,
  StyledGirl,
  StyledMain,
  StyledSubtitle,
  StyledTitle,
} from './styles';

const Common = ({ anonymous, from, children }: any) => {
  return (
    <StyledContainer>
      <StyledGirl src="/images/shush/private-bg.png" $show={anonymous} style={{ top: '-52px' }} />
      <StyledGirl src="/images/shush/semi-private-bg.png" $show={!anonymous} />
      <Breadcrumb
        navs={[
          { name: 'Home', path: '/' },
          { name: 'DapDap X Shush', path: '' },
        ]}
      />
      <StyledContent>
        <StyledMain>
          <StyledBg1 />
          {from !== 'search' && <StyledBg2 />}
          <StyledTitle>MOVE YOUR TOKENS IN SILENCE</StyledTitle>
          <StyledSubtitle>Compliant Private Muti-chain Liquidity Aggregator</StyledSubtitle>
          {children}
        </StyledMain>
        {from === 'index' && <QA />}
      </StyledContent>
    </StyledContainer>
  );
};

export default memo(Common);
