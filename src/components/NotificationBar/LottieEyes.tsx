import { memo } from 'react';
import Lottie from 'react-lottie';

import LottieJSON from './eyes.json';

const LottieControl = () => {
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

export default memo(LottieControl);
