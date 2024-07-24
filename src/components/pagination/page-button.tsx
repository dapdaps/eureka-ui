import React from 'react';

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

  const pageItemStyles = 'w-[40px] h-[40px] leading-[38px] rounded-[4px] cursor-pointer text-[16px] font-light text-center border backdrop-blur-[10px] transition-all duration-300';
  const pageItemActiveStyles = 'text-white bg-black border-black';
  const pageItemInActiveStyles = 'text-black bg-white border-[#38344B]';

  return (
    <div
      className={`page-${page} ${pageItemStyles} ${pageIndex === page ? pageItemActiveStyles : pageItemInActiveStyles} ${className}`}
      style={style}
      onClick={handleClick}
    >
      {page}
    </div>
  );
};

interface PageButtonProps {
  page: number | string;
  pageIndex: number;
  className?: string;
  style?: React.CSSProperties;

  onPage(page: number): void;
}
