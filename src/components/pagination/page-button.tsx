import React from 'react';

import { StyledBtnPage } from '@/components/pagination/styles';

export const PageButton = (props: PageButtonProps) => {
  const {
    page,
    pageIndex,
    className,
    style,
    onPage,
  } = props;

  const handleClick = () => {
    if (typeof page !== 'number' || page === pageIndex) return;
    onPage(page);
  };

  return (
    <StyledBtnPage
      className={`page-${page} ${pageIndex === page ? 'active' : ''} ${className}`}
      style={style}
      onClick={handleClick}
    >
      {page}
    </StyledBtnPage>
  );
};

interface PageButtonProps {
  page: number | string;
  pageIndex: number;
  className?: string;
  style?: React.CSSProperties;

  onPage(page: number): void;
}
