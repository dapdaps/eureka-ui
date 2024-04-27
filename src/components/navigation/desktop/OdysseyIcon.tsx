import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import useAuthCheck from '@/hooks/useAuthCheck';

const StyledContainer = styled.div`
  position: absolute;
  right: -190px;
  top: -10px;
  z-index: -1;
  /* width: 96.5px;
  height: 31.209px;
  background-image: url(/images/odyssey/v3/nav-bg.png);
  background-repeat: no-repeat; */
  background-size: 100%;
  cursor: pointer;
  .light {
    position: absolute;
    left: 0;
    top: -2px;
    animation: scale 2s infinite ease-in-out;
    @keyframes scale {
      0% {
        transform: scale(0.6) rotate(0deg);
      }

      50% {
        transform: scale(1.1) rotate(50deg);
      }

      100% {
        transform: scale(0.6);
      }
    }
  }
`;

const StyledIcon = styled.div`
  width: 38px;
  height: 38px;
  background-image: url(/images/odyssey/v3/scroll.png);
  background-repeat: no-repeat;
  background-size: 100%;
  position: absolute;
  top: -3px;
  left: -20px;
  transform-origin: center;
  animation: scale 1.2s infinite ease-in-out;
  @keyframes scale {
    0% {
      transform: scale(0.8);
    }

    50% {
      transform: scale(1);
    }

    100% {
      transform: scale(0.8);
    }
  }
`;

export default function OdysseyIcon() {
  const { check } = useAuthCheck({ isNeedAk: true });
  const router = useRouter();
  return (
    <StyledContainer
      onClick={() => {
        check(() => {
          router.push('/odyssey/home?id=4');
        });
      }}
    >
      <Image src="/images/odyssey/v4/ody-logo.svg" alt="" width={149} height={51} />
      <Image src="/images/odyssey/v4/ody-light.svg" alt="" width={51} height={51} className="light" />
      {/* <StyledIcon /> */}
    </StyledContainer>
  );
}
