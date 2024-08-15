import { memo, useEffect, useState } from 'react';
import Image from 'next/image';

const ImageFallback = (props: any) => {
  const { src, fallbackSrc = '/images/tokens/default_icon.png', ...restProps } = props;
  const [imgSrc, setImgSrc] = useState<string>(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...restProps}
      src={imgSrc}
      onError={handleError}
    />
  );
};

export default memo(ImageFallback);
