import { AnimatePresence } from 'framer-motion';
import { memo } from 'react';

import { container, overlay } from '@/components/animation';

import Explores from './Explores';
import Menu from './Menu';
import Odyssey from './Odyssey';
import { MaskLayer, MenuContainer, MenuContent } from './styles';
import { useShowTipsStore } from '../ConfirmOfficialUrl/hooks/useShowTipsStore';
import { useRouter } from 'next/router';

const DropdownMenuPanel = ({ show, setShow }: any) => {
  const router = useRouter();
  const showConfirmOfficialUrl  = useShowTipsStore(store => store.showConfirmOfficialUrl)
  const isHomePage = router.pathname === '/';
  
  return (
    <AnimatePresence mode="wait">
      {show && (
        <>
          <MaskLayer onClick={() => setShow(false)} {...overlay} $top={showConfirmOfficialUrl && isHomePage ? '134px' : ''} />
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
