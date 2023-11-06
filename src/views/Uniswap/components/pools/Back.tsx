import { useRouter } from 'next/router';
import { memo } from 'react';
import styled from 'styled-components';

import { BackIcon } from './Icons';

const StyledWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  .text {
    font-size: 16px;
    color: #8e8e8e;
    font-weight: bold;
  }
`;

const Back = () => {
  const router = useRouter();
  function goPoolsPage() {
    router.push('/linea/uniswap/pools');
  }
  return (
    <StyledWrap onClick={goPoolsPage}>
      <BackIcon />
      <span className="text">Back to pools</span>
    </StyledWrap>
  );
};

export default memo(Back);
