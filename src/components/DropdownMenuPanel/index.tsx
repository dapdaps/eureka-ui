import { AnimatePresence } from 'framer-motion';
import { memo } from 'react';

import { container, overlay } from '@/components/animation';

import Explores from './Explores';
import Menu from './Menu';
import Odyssey from './Odyssey';
import { MaskLayer, MenuContainer, MenuContent } from './styles';

const DropdownMenuPanel = ({ show, setShow }: any) => {
  return (
    <AnimatePresence mode="wait">
      {show && (
        <>
          <MaskLayer onClick={() => setShow(false)} {...overlay} />
          <MenuContainer {...container}>
            <MenuContent>
              <Odyssey setShow={setShow} />
              <Explores setShow={setShow} />
              <Menu setShow={setShow} />
            </MenuContent>
          </MenuContainer>
        </>
      )}
    </AnimatePresence>
  );
};

export default memo(DropdownMenuPanel);
