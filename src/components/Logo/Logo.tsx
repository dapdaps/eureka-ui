import React, { useState } from 'react';
import HelpIcon from './HelpIcon';

export const BAD_SRCS: { [imageSrc: string]: true } = {};

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  srcs?: string[];
  isToken?: boolean;
}

/**
 * Renders an image by sequentially trying a list of URIs, and then eventually a fallback triangle alert
 */
const Logo: React.FC<LogoProps> = ({ srcs, isToken = true, alt, ...rest }) => {
  const [, refresh] = useState<number>(0);

  const src: string | undefined = srcs ? srcs.find((s) => !BAD_SRCS[s]) : undefined;
  if (src && !BAD_SRCS[src]) {
    return (
      <img
        {...rest}
        alt={alt}
        src={src}
        onError={() => {
          if (src) BAD_SRCS[src] = true;
          refresh((i) => i + 1);
        }}
      />
    );
  }

  return <HelpIcon size={32} {...rest} />;
};

export default Logo;
