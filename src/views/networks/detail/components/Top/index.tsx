import { memo, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import Header from './Header';
import {
  StyledContainer,
  StyledBox,
  StyledBgWrapper,
  StyledContent,
} from './styles';

const Top = ({ chain }: any) => {

  const [more, setMore] = useState(false);

  return (
    <StyledContainer style={{ color: chain?.selectBgColor }} className={more ? 'more' : ''}>
      <StyledBox>
        <StyledBgWrapper color={chain?.bgColor}/>
        <StyledContent>
          <Breadcrumb
            navs={[
              { name: 'Home', path: '/' },
              { name: 'Networks', path: '/networks' },
              { name: chain?.title, path: '' },
            ]}
          />
          <Header
            bgColor={chain?.bgColor}
            logo={chain?.icon}
            name={chain?.title}
            chainId={chain?.chainId}
            path={chain?.path}
            deepdive={chain?.deepdive}
            id={chain?.id}
            tbd_token={chain?.tbd_token}
            nativeCurrency={chain?.native_currency}
          />
        </StyledContent>
      </StyledBox>
    </StyledContainer>
  );
};

export default memo(Top);
