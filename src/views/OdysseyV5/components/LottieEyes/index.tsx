import Lottie from 'react-lottie';

import LottieJSON from './eyes.json';

export default function LottieControl({}: any) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LottieJSON,
  };

  return (
    <Lottie
      options={defaultOptions}
      height={38}
      width={38}
      style={{
        margin: 0,
        transform: 'rotate(-180deg)',
      }}
    />
  );
}
