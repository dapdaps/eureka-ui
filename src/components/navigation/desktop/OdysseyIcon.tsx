import styled from 'styled-components';
import useAuthCheck from '@/hooks/useAuthCheck';
import { useRouter } from 'next/router';

const StyledContainer = styled.div`
  position: absolute;
  right: -180px;
  top: 8px;
  width: 96.5px;
  height: 31.209px;
  background-image: url(/images/odyssey/v3/nav-bg.png);
  background-repeat: no-repeat;
  background-size: 100%;
  cursor: pointer;
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
          router.push('/odyssey/home?id=3');
        });
      }}
    >
      <StyledIcon />
    </StyledContainer>
  );
}
