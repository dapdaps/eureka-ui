import Image from 'next/image';
import type { MouseEvent } from 'react';
import { useRef } from 'react';

import { StyledContainer, StyledContent } from './styles';

export default function Modal({ type, children, onClose, bgColor }: any) {
  const renderShape = () => {
    switch (type) {
      case 'type1':
        return (
          <Image src="/images/odyssey/v5/star-particle.svg" alt="" width={179} height={121} className="shape shape1" />
        );
      case 'type2':
        return (
          <Image src="/images/odyssey/v5/modal-shape-2.svg" alt="" width={214} height={177} className="shape shape2" />
        );
      case 'type3':
        return (
          <Image src="/images/odyssey/v5/modal-shape-3.svg" alt="" width={213} height={140} className="shape shape3" />
        );
      case 'type4':
        return <Image src="/images/odyssey/v5/star3.svg" alt="" width={166} height={128} className="shape shape4" />;
      case 'type5':
        return (
          <Image src="/images/odyssey/v5/modal-shape-5.svg" alt="" width={126} height={126} className="shape shape5" />
        );
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
    <StyledContainer onClick={clickMask}>
      <StyledContent $bgColor={bgColor} ref={bodyRef}>
        {renderShape()}
        <Image className="close" onClick={onClose} src="/images/odyssey/v5/close.svg" alt="" width={12} height={12} />
        <div className="corner-left"></div>
        <div className="corner-right"></div>
        {/* <Image className="corner-left" src="/images/odyssey/v5/modal-corner-left.svg" alt="" width={37} height={37} />
        <Image
          className="corner-right"
          onClick={onClose}
          src="/images/odyssey/v5/modal-corner-right.svg"
          alt=""
          width={37}
          height={37}
        /> */}
        {children}
      </StyledContent>
    </StyledContainer>
  );
}
