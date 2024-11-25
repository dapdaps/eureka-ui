import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { memo } from 'react';

import { StyledContainer, StyledContent } from './styles';

const LottieEyes = dynamic(() => import('./LottieEyes'), { ssr: false });

const NotificationBar = (props: Props) => {
  const { children, styles, contentStyles, closeStyles, onClose = () => {} } = props;

  return (
    <StyledContainer style={styles}>
      <StyledContent style={contentStyles}>
        <LottieEyes />
        {children}
      </StyledContent>
      <Image
        className="close"
        src="/images/odyssey/v4/noti-close.svg"
        alt=""
        width={12}
        height={12}
        onClick={onClose}
        style={{
          cursor: 'pointer',
          ...closeStyles
        }}
      />
    </StyledContainer>
  );
};

export default memo(NotificationBar);

export interface Props {
  children: any;
  styles?: React.CSSProperties;
  contentStyles?: React.CSSProperties;
  closeStyles?: React.CSSProperties;

  onClose?(): void;
}
