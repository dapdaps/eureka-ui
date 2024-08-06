import { memo } from 'react';
import Modal from '@/components/Modal';
import { StyledVideoContent, StyledVideoModal } from './styles';

const OdysseyVideo = (props: Props) => {
  const {
    visible,
    close,
    src,
  } = props;

  return (
    <StyledVideoModal visible={visible || false}>
      <Modal
        width={620}
        overlayClassName="video-modal-overlay"
        className="video-modal"
        display={visible || false}
        onClose={() => close && close()}
        content={
          <StyledVideoContent>
            <video controls>
              <source src={src} type="video/mp4" />
            </video>
          </StyledVideoContent>
        }
      />
    </StyledVideoModal>
  );
};

export default memo(OdysseyVideo);

export interface Props {
  visible?: boolean;
  src?: string;

  close?(): void;
}
