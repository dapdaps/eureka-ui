import { memo, useState } from 'react';

import PageBack from '@/components/PageBack';

import Header from './Header';
import {
  StyledBgWrapper,
  StyledBox,
  StyledContainer,
  StyledContent,
} from './styles';

const Top = (props: { chain: any; loading?: boolean; }) => {
  const { chain, loading } = props;

  const [more, setMore] = useState(false);

  return (
    <StyledContainer style={{ color: chain?.selectBgColor }} className={more ? 'more' : ''}>
      <StyledBox>
        <StyledBgWrapper color={chain?.selectBgColor}/>
        <StyledContent>
          <PageBack defaultPath="/networks" />
          <Header chain={chain} loading={loading} />
        </StyledContent>
      </StyledBox>
    </StyledContainer>
  );
};

export default memo(Top);
