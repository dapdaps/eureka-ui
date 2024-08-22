import { StyledBtnNext, StyledBtnPrevious, StyledContainer } from '@/components/pagination/styles';

import { PageButton } from './page-button';
import { renderPageMiddle } from './render-page-middle';

const Pagination = (props: PaginationProps) => {
  const {
    pageIndex,
    pageTotal,
    onPage,
    className,
    pageClassName = ''
  } = props;

  const handlePreviousPage = () => {
    if (pageIndex < 2) return;
    onPage(pageIndex - 1);
  };

  const handleNextPage = () => {
    if (pageIndex >= pageTotal) return;
    onPage(pageIndex + 1);
  };

  return (
    <StyledContainer className={className}>
      <StyledBtnPrevious
        className='pagination-previous'
        title="previous"
        style={{ cursor: pageIndex > 1 ? 'pointer' : 'not-allowed' }}
        onClick={handlePreviousPage}
      >
        <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            opacity={pageIndex > 1 ? 1 : 0.3}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.52425 11.8247C5.86926 11.5487 5.9252 11.0452 5.64919 10.7002L2.04899 6.19997L5.64919 1.69973C5.9252 1.35472 5.86926 0.851283 5.52425 0.575275C5.17924 0.299268 4.67581 0.355205 4.3998 0.700214L-4.99168e-06 6.19997L4.3998 11.6997C4.67581 12.0447 5.17924 12.1007 5.52425 11.8247Z"
            fill="white"
          />
        </svg>
      </StyledBtnPrevious>
      <PageButton className="first-page" page={1} pageIndex={pageIndex} onPage={onPage} />
      {
        pageTotal > 1 && (
          <>
            {renderPageMiddle({ pageIndex, pageTotal, onPage, className: pageClassName })}
            <PageButton className="last-page" page={pageTotal} pageIndex={pageIndex} onPage={onPage} />
          </>
        )
      }
      <StyledBtnNext
        className='pagination-next'
        title="next"
        style={{ cursor: pageIndex < pageTotal ? 'pointer' : 'not-allowed' }}
        onClick={handleNextPage}
      >
        <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            opacity={pageIndex < pageTotal ? 1 : 0.3}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.300273 11.8247C-0.0447361 11.5487 -0.100673 11.0452 0.175334 10.7002L3.77553 6.19997L0.175334 1.69973C-0.100674 1.35472 -0.0447366 0.851283 0.300273 0.575275C0.645282 0.299268 1.14872 0.355205 1.42472 0.700214L5.82453 6.19997L1.42472 11.6997C1.14872 12.0447 0.645283 12.1007 0.300273 11.8247Z"
            fill="white"
          />
        </svg>
      </StyledBtnNext>
    </StyledContainer>
  );
};

interface PaginationProps {
  pageIndex: number;
  pageTotal: number;
  className?: string;
  pageClassName?: string;

  onPage(page: number): void;
}

export default Pagination;
