import { AnimatePresence } from 'framer-motion';
import { memo, useState } from 'react';

import { select } from '@/components/animation';

import { StyledContainer, StyledContent,StyledItem, StyledMenu, StyledMenuWrapper } from './styles';

const VersionSelector = ({ version, setVersion }: any) => {
  const [show, setShow] = useState(false);
  return (
    <StyledContainer>
      <StyledContent
        onClick={() => {
          setShow(!show);
        }}
      >
        <span>{version}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
          <path d="M1 1L5.5 5.5L10 1" stroke="white" strokeWidth="2" />
        </svg>
      </StyledContent>

      <AnimatePresence mode="wait">
        {show && (
          <StyledMenuWrapper {...select}>
            <StyledMenu>
              {['V2', 'V3'].map((item) => (
                <StyledItem
                  key={item}
                  onClick={() => {
                    setVersion(item);
                  }}
                >
                  {item}
                </StyledItem>
              ))}
            </StyledMenu>
          </StyledMenuWrapper>
        )}
      </AnimatePresence>
    </StyledContainer>
  );
};

export default memo(VersionSelector);
