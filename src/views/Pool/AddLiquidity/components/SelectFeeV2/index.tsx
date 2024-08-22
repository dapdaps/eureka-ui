import { AnimatePresence } from 'framer-motion';
import { memo, useState } from 'react';

import { select } from '@/components/animation';

import { StyledContainer, StyledContent,StyledItem, StyledMenu, StyledMenuWrapper } from './styles';

const SelectFeeV2 = ({ fee, onSelectFee }: any) => {
  const [show, setShow] = useState(false);
  return (
    <StyledContainer>
      <StyledContent
        onClick={() => {
          setShow(!show);
        }}
      >
        <span>{fee}% fee tier</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
          <path d="M1 1L5.5 5.5L10 1" stroke="white" strokeWidth="2" />
        </svg>
      </StyledContent>
      <AnimatePresence mode="wait">
        {show && (
          <StyledMenuWrapper {...select}>
            <StyledMenu>
              {[0.3, 1].map((item) => (
                <StyledItem
                  key={item}
                  onClick={() => {
                    onSelectFee(item);
                    setShow(false);
                  }}
                >
                  {item.toFixed(2)}% fee tier
                </StyledItem>
              ))}
            </StyledMenu>
          </StyledMenuWrapper>
        )}
      </AnimatePresence>
    </StyledContainer>
  );
};

export default memo(SelectFeeV2);
