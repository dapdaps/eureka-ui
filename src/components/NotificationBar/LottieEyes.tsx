import dynamic from 'next/dynamic';
import { memo } from 'react';

import LottieJSON from './eyes.json';

// fix#ReferenceError: document is not defined
const Lottie: any = dynamic(() => import('react-lottie'), { ssr: false });

const LottieControl = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LottieJSON
  };

  return (
    <Lottie
      options={defaultOptions}
      height={38}
      width={38}
      style={{
        margin: 0,
        transform: 'rotate(-180deg)'
      }}
    />
  );
};

export default memo(LottieControl);
