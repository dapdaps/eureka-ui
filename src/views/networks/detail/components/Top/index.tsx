import { memo, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import Header from './Header';
import {
  StyledContainer,
  StyledBox,
  StyledBgWrapper,
  StyledContent,
} from './styles';
import PageBack from '@/components/PageBack';

const Top = ({ chain }: any) => {

  const [more, setMore] = useState(false);

  return (
    <StyledContainer style={{ color: chain?.selectBgColor }} className={more ? 'more' : ''}>
      <StyledBox>
        <StyledBgWrapper color={chain?.selectBgColor}/>
        <StyledContent>
          <PageBack defaultPath="/networks" />
          <Header chain={chain} />
        </StyledContent>
      </StyledBox>
    </StyledContainer>
  );
};

export default memo(Top);
