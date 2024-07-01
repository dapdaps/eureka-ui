import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import useAuthCheck from '@/hooks/useAuthCheck';

const StyledContainer = styled.div`
  position: absolute;
  right: -216px;
  top: -8px;
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
  const odysseyId = process.env.NEXT_PUBLIC_API === 'https://test-api.dapdap.net' ? '9' : '6';

  return (
    <StyledContainer
      onClick={() => {
        check(() => {
          router.push(`/odyssey/home?id=${odysseyId}`);
        });
      }}
    >
      {/* <Image src="/images/odyssey/v8/gold-rush.svg" alt="" width={149} height={51} /> */}
      <Image src="/images/odyssey/thruster/head-entry.svg" alt="" width={158} height={59} />
      {/* <StyledIcon /> */}
    </StyledContainer>
  );
}
