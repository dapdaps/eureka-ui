import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import useAuthCheck from '@/hooks/useAuthCheck';

const StyledContainer = styled.div`
  position: absolute;
  right: -190px;
  top: 4px;
  z-index: -1;
  background-size: 100%;
  cursor: pointer;
  border: 1px solid #dffe00;
  border-radius: 6px;
  overflow: hidden;

  .light {
    position: absolute;
    left: 0;
    top: -2px;
    animation: topLight 3s infinite ease-in-out;
    @keyframes topLight {
      0% {
        transform: scale(0.8) rotate(0deg);
        opacity: 0;
      }

      50% {
        transform: scale(1.1) rotate(50deg);
        opacity: 1;
      }

      100% {
        transform: scale(0.8);
        opacity: 0;
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
          router.push('/campaigns/home?id=5');
        });
      }}
    >
      <Image src="/images/odyssey/v5/ody-logo.svg" alt="" width={112} height={40} />
      {/*<Image src="/images/odyssey/v4/ody-logo.svg" alt="" width={149} height={51} />*/}
      {/*<Image src="/images/odyssey/v4/ody-light.svg" alt="" width={149} height={51} className="light" />*/}
      {/* <StyledIcon /> */}
    </StyledContainer>
  );
}
