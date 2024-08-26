import { memo } from 'react';

import Modal from '@/components/Modal';

import { StyledVideoContent } from './styles';

const OdysseyVideo = (props: Props) => {
  const {
    visible,
    close,
    src,
  } = props;
  
  return (
    <Modal
      width={620}
      overlayClassName="video-modal-overlay"
      overlayStyle={{
        backdropFilter: 'blur(5px)',
      }}
      className="video-modal"
      style={{
        background: '#18191E',
        border: '1px solid #202329',
        backdropFilter: 'blur(10px)',
      }}
      display={visible || false}
      onClose={() => close && close()}
      content={
        <StyledVideoContent>
          <video controls>
            <source src={src} type="video/mp4" />
          </video>
        </StyledVideoContent>
      }
      portal={true}
    />
  );
};

export default memo(OdysseyVideo);

export interface Props {
  visible?: boolean;
  src?: string;

  close?(): void;
}
