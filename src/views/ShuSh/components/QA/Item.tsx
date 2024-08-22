import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import {
  StyledExpandContainer,
  StyledExpandContent,
  StyledIconBox,
  StyledItemContainer,
  StyledItemIcon,
  StyledItemLeft,
  StyledItemTop,
} from './styles';

export default function Item({ title, icon, content }: any) {
  const [expand, setExpand] = useState(false);
  return (
    <StyledItemContainer>
      <StyledItemTop
        initial={false}
        style={{ borderRadius: expand ? '16px 16px 0px 0px' : '16px' }}
        onClick={() => {
          setExpand(!expand);
        }}
      >
        <StyledItemLeft>
          <StyledItemIcon src={icon} />
          <div>{title}</div>
        </StyledItemLeft>
        <StyledIconBox className={expand ? 'open' : ''}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path
              d="M7.78087 9.02391C7.38054 9.52432 6.61946 9.52432 6.21913 9.02391L0.299758 1.62469C-0.224053 0.969931 0.24212 -1.29017e-06 1.08063 -1.21687e-06L12.9194 -1.81894e-07C13.7579 -1.08589e-07 14.2241 0.969932 13.7002 1.62469L7.78087 9.02391Z"
              fill="#979ABE"
            />
          </svg>
        </StyledIconBox>
      </StyledItemTop>
      <AnimatePresence initial={false}>
        {expand && (
          <StyledExpandContainer
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <StyledExpandContent> {content}</StyledExpandContent>
          </StyledExpandContainer>
        )}
      </AnimatePresence>
    </StyledItemContainer>
  );
}
