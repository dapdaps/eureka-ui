import { useRouter } from 'next/router';
import { memo } from 'react';
import styled from 'styled-components';
import { BackIcon } from './Icons';

const StyledWrap = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  .text {
    font-size: 16px;
    color: #101010;
    font-weight: 400;
  }
`;

const Back = () => {
  const router = useRouter();
  return (
    <StyledWrap
      onClick={() => {
        router.push('/uniswap/pools');
      }}
    >
      <BackIcon />
      <span className="text">Back to pools</span>
    </StyledWrap>
  );
};

export default memo(Back);
