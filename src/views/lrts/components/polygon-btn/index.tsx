import type { CSSProperties, FC, ReactNode } from 'react';
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

interface IProps {
  children: ReactNode;
  block?: boolean;
  className?: string;
  href?: string;
  style?: CSSProperties;
  onClick?: () => void;
  //   disabled?: boolean;
  //   loading?:boolean;
}

const Wrap = styled.button<{ $block: boolean }>`
  --button-spike-width: 1em;
  --button-border-width: 0.1em;

  position: relative;
  display: inline-block;
  text-align: center;
  border: 0;
  padding: 10px 24px;
  width: ${(props) => (props.$block ? '100%' : 'auto')};

  color: #fff;
  background: #3e3e3e;
  font-family: Orbitron;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;

  clip-path: polygon(
    50% 0%,
    calc(100% - var(--button-spike-width)) 0,
    100% 50%,
    calc(100% - var(--button-spike-width)) 100%,
    var(--button-spike-width) 100%,
    0 50%,
    var(--button-spike-width) 0
  );
  -webkit-clip-path: polygon(
    50% 0%,
    calc(100% - var(--button-spike-width)) 0,
    100% 50%,
    calc(100% - var(--button-spike-width)) 100%,
    var(--button-spike-width) 100%,
    0 50%,
    var(--button-spike-width) 0
  );

  transition: 250ms color;
  cursor: pointer;

  &::before {
    z-index: -1;
    content: '';
    position: absolute;
    background: #2f2f2f;
    transition: 250ms background;

    width: calc(100% - calc(var(--button-border-width) * 2));
    height: calc(100% - calc(var(--button-border-width) * 2));
    top: var(--button-border-width);
    left: var(--button-border-width);
    clip-path: polygon(
      50% 0,
      calc(100% - var(--button-spike-width) + calc(var(--button-border-width) / 2)) 0,
      100% 50%,
      calc(100% - var(--button-spike-width)) calc(100% + var(--button-border-width)),
      var(--button-spike-width) calc(100% + var(--button-border-width)),
      0 50%,
      var(--button-spike-width) calc(0px - var(--button-border-width))
    );
    -webkit-clip-path: polygon(
      50% 0,
      calc(100% - var(--button-spike-width) + calc(var(--button-border-width) / 2)) 0,
      100% 50%,
      calc(100% - var(--button-spike-width)) calc(100% + var(--button-border-width)),
      var(--button-spike-width) calc(100% + var(--button-border-width)),
      0 50%,
      var(--button-spike-width) calc(0px - var(--button-border-width))
    );
  }

  &:hover {
    color: #fff;
    background: #fff;
    text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.6);
    &:before {
      background: #000;
      color: #fff;
    }
  }
`;

const PolygonBtn: FC<IProps> = ({ children, className, style, href, block, onClick }) => {
  if (href) {
    return (
      <Wrap as="a" onClick={onClick} $block={block ?? false} className={className} style={style}>
        {children}
      </Wrap>
    );
  }
  return (
    <Wrap onClick={onClick} $block={block ?? false} className={className} style={style}>
      {children}
    </Wrap>
  );
};

export default memo(PolygonBtn);
