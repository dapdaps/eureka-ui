import Image from 'next/image';

import { StyledContainer, StyledContent } from './styles';

export default function Modal({ type, children, onClose }: any) {
  const renderShape = () => {
    switch (type) {
      case 'type1':
        return (
          <Image src="/images/odyssey/v4/modal-shape-1.svg" alt="" width={161} height={161} className="shape shape1" />
        );
      case 'type2':
        return (
          <Image src="/images/odyssey/v4/modal-shape-2.svg" alt="" width={214} height={177} className="shape shape2" />
        );
      case 'type3':
        return (
          <Image src="/images/odyssey/v4/modal-shape-3.svg" alt="" width={213} height={140} className="shape shape3" />
        );
      case 'type4':
        return (
          <Image src="/images/odyssey/v4/modal-shape-4.svg" alt="" width={166} height={128} className="shape shape4" />
        );
      case 'type5':
        return (
          <Image src="/images/odyssey/v4/modal-shape-5.svg" alt="" width={126} height={126} className="shape shape5" />
        );
    }
  };
  return (
    <StyledContainer>
      <StyledContent>
        {renderShape()}
        <Image className="close" onClick={onClose} src="/images/odyssey/v4/close.svg" alt="" width={12} height={12} />
        <Image className="corner-left" src="/images/odyssey/v4/modal-corner-left.svg" alt="" width={37} height={37} />
        <Image
          className="corner-right"
          onClick={onClose}
          src="/images/odyssey/v4/modal-corner-right.svg"
          alt=""
          width={37}
          height={37}
        />
        {children}
      </StyledContent>
    </StyledContainer>
  );
}