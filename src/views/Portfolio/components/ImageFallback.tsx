import Image from 'next/image';
import { memo, useEffect, useState } from 'react';

const ImageFallback = (props: any) => {
  const { src, fallbackSrc = '/assets/tokens/default_icon.png', ...restProps } = props;
  const [imgSrc, setImgSrc] = useState<string>(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return <Image {...restProps} src={imgSrc} onError={handleError} />;
};

export default memo(ImageFallback);
