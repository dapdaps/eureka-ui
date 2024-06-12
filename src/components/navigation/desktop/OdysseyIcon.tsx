import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import useAuthCheck from '@/hooks/useAuthCheck';

const StyledContainer = styled.div`
  position: absolute;
  right: -190px;
  top: -2px;
  z-index: -1;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;

export default function OdysseyIcon() {
  const { check } = useAuthCheck({ isNeedAk: true });
  const router = useRouter();
  return (
    <StyledContainer
      onClick={() => {
        check(() => {
          router.push('/odyssey/home?id=5');
        });
      }}
    >
      <Image src="/images/odyssey/v8/gold-rush.svg" alt="" width={149} height={51} />
      {/* <StyledIcon /> */}
    </StyledContainer>
  );
}
