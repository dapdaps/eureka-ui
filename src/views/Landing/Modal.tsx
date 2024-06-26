import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { memo } from 'react';
import styled from 'styled-components';

import { modal, overlay } from '@/components/animation';

const Dialog = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9000;
`;
const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 900px) {
    align-items: flex-end;
  }
`;
const Main = styled(motion.div)<{ $width: number }>`
  width: ${({ $width }) => $width + 'px'};
`;

const Content = styled.div`
  border-radius: 0px 0px 16px 16px;
`;

const Modal = ({ display, width = 460, content }: { display: boolean; width?: number; content: ReactNode }) => {
  return (
    <AnimatePresence mode="wait">
      {display && (
        <Dialog>
          <Overlay {...overlay}>
            <Main
              {...modal}
              $width={width}
              onClick={(ev) => {
                ev.stopPropagation();
              }}
            >
              <Content>{content}</Content>
            </Main>
          </Overlay>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default memo(Modal);
