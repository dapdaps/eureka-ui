import Image from 'next/image';
import type { MouseEvent } from 'react';
import { useRef } from 'react';

import { StyledContainer, StyledContent } from './styles';

export default function Modal({ type, children, onClose, bgColor, style, className }: any) {
  const renderShape = () => {
    switch (type) {
      case 'type1':
        return <Image src="/images/odyssey/v8/star1.svg" alt="" width={179} height={121} className="shape shape1" />;
      case 'type2':
        return (
          <Image src="/images/odyssey/v4/modal-shape-2.svg" alt="" width={214} height={177} className="shape shape2" />
        );
      case 'type3':
        return (
          <Image src="/images/odyssey/v8/treasure5.svg" alt="" width={262} height={182} className="shape shape3" />
        );
      case 'type4':
        return <Image src="/images/odyssey/v4/star3.svg" alt="" width={166} height={128} className="shape shape4" />;
      case 'type5':
        return (
          <Image src="/images/odyssey/v4/modal-shape-5.svg" alt="" width={126} height={126} className="shape shape5" />
        );
      case 'type6':
        return <Image src="/images/odyssey/v8/star2.svg" alt="" width={318} height={149} className="shape shape6" />;
    }
  };

  const bodyRef = useRef();
  const clickMask = (e: MouseEvent) => {
    if ((bodyRef?.current as any).contains(e.target)) {
      return;
    } else {
      onClose();
    }
  };
  return (
    <StyledContainer onClick={clickMask} className={className}>
      <StyledContent $bgColor={bgColor} ref={bodyRef} style={style}>
        {renderShape()}
        <Image className="close" onClick={onClose} src="/images/odyssey/v4/close.svg" alt="" width={12} height={12} />
        <div className="corner-left"></div>
        <div className="corner-right"></div>
        {/* <Image className="corner-left" src="/images/odyssey/v4/modal-corner-left.svg" alt="" width={37} height={37} />
        <Image
          className="corner-right"
          onClick={onClose}
          src="/images/odyssey/v4/modal-corner-right.svg"
          alt=""
          width={37}
          height={37}
        /> */}
        <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
      </StyledContent>
    </StyledContainer>
  );
}
