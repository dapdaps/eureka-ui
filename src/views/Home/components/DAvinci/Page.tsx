import { motion } from 'framer-motion';
import React from 'react';

import { StyledFlex } from '@/styled/styles';
import type { SwiperItem } from '@/views/Home/components/DAvinci/config';
import { StyledButton, StyledPagination } from '@/views/Home/components/DAvinci/styles';

export const PageButton = (props: ButtonProps) => {
  const { direction, onClick, style, ...rest } = props;

  const handleClick = (event: any) => {
    onClick && onClick(direction, event);
  };

  return (
    <StyledButton onClick={handleClick} style={style} {...rest}>
      <motion.svg
        width="8"
        height="16"
        viewBox="0 0 8 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          transform: direction === 'prev' ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.412426 15.7582C-0.0614452 15.3775 -0.138275 14.6831 0.240822 14.2072L5.1857 8L0.240822 1.7928C-0.138276 1.31693 -0.0614458 0.622538 0.412425 0.241839C0.886297 -0.138859 1.57776 -0.0617047 1.95686 0.414168L8 8L1.95686 15.5858C1.57776 16.0617 0.886297 16.1389 0.412426 15.7582Z"
          fill="black"
        />
      </motion.svg>
    </StyledButton>
  );
};

interface ButtonProps {
  direction: PageButtonDirection;
  style?: React.CSSProperties;

  [k: string]: any;

  onClick?(direction: PageButtonDirection, e?: any): void;
}

export type PageButtonDirection = 'prev' | 'next';

export const Pagination = (props: PaginationProps) => {
  const { list, currentPage, style, onPage } = props;

  return (
    <StyledFlex justifyContent="center" alignItems="center" gap="13px" style={style}>
      {
        list.map((item, idx) => (
          <StyledPagination
            key={item.key}
            className={currentPage === idx ? 'active' : ''}
            onClick={() => onPage && onPage(idx)}
          />
        ))
      }
    </StyledFlex>
  );
};

interface PaginationProps {
  list: SwiperItem[];
  currentPage: number;
  style?: React.CSSProperties;

  onPage?(page: number): void;
}

