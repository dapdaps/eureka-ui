import { useRouter } from 'next/navigation';
import { memo } from 'react';
import type { CSSProperties } from 'styled-components/dist/types';

import { StyledContainer, StyledNav } from './styles';

export type Nav = {
  name: string;
  path: string;
};

type BreadcrumbProps = {
  style?: CSSProperties;
  navs: Nav[];
};

const LeftArrow = (
  <svg xmlns="http://www.w3.org/2000/svg" width="5" height="8" viewBox="0 0 5 8" fill="none">
    <path opacity="0.5" d="M1 1L4 4L1 7" stroke="white" strokeLinecap="round" />
  </svg>
);

const Breadcrumb = ({ style, navs }: BreadcrumbProps) => {
  const router = useRouter();
  return (
    <StyledContainer style={style}>
      {navs.map((nav, i) => (
        <StyledNav
          $active={i === navs.length - 1}
          $disabled={!nav.path}
          key={nav.path || i}
          onClick={() => {
            if (i !== navs.length - 1 && nav.path) router.push(nav.path);
          }}
          whileHover={{
            color:
              i !== navs.length - 1 && nav.path
                ? '#ebf479'
                : i === navs.length - 1
                  ? '#fff'
                  : 'rgba(255, 255, 255, 0.5)',
          }}
        >
          {nav.name}
          {i !== navs.length - 1 && LeftArrow}
        </StyledNav>
      ))}
    </StyledContainer>
  );
};

export default memo(Breadcrumb);
