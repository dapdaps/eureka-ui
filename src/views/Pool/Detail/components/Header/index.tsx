import { useRouter } from 'next/router';
import { memo } from 'react';

import { StyledContainer } from './styles';

const Header = ({ tab }: any) => {
  const router = useRouter();

  return (
    <StyledContainer
      onClick={() => {
        router.push(`/dapp/${router.query.dappRoute}${tab ? `?tab=${tab}` : ''}`);
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="9" height="13" viewBox="0 0 9 13" fill="none">
        <path d="M7.5 1L2 6.49992L7.5 12" stroke="#979ABE" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div>Back</div>
    </StyledContainer>
  );
};

export default memo(Header);
