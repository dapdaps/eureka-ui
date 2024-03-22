import { memo } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import QA from './components/QA';
import {
  StyledContainer,
  StyledContent,
  StyledGirl,
  StyledMain,
  StyledTitle,
  StyledSubtitle,
  StyledBg1,
  StyledBg2,
} from './styles';

const Common = ({ anonymous, children }: any) => {
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
          <StyledBg2 />
          <StyledTitle>MOVE YOUR TOKENS IN SILENCE</StyledTitle>
          <StyledSubtitle>Compliant Private Muti-chain Liquidity Aggregator</StyledSubtitle>
          {children}
        </StyledMain>
        <QA />
      </StyledContent>
    </StyledContainer>
  );
};

export default memo(Common);
