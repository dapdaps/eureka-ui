import { PageButton } from './page-button';
import { renderPageMiddle } from './render-page-middle';

const Pagination = (props: PaginationProps) => {
  const {
    pageIndex,
    pageTotal,
    hasMore,
    onPage,
    className,
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
    <div className={`flex gap-x-[10px] justify-center items-center ${className}`}>
      <div
        title="previous"
        className="w-[16px] h-[16px] mr-[18px] click flex justify-center items-center hover:bg-[#f6f6f6] transition-all duration-200"
        style={{ cursor: pageIndex > 1 ? 'pointer' : 'not-allowed' }}
        onClick={handlePreviousPage}
      >
        <svg
          width="7"
          height="12"
          viewBox="0 0 7 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity={pageIndex > 1 ? 1 : 0.2}
            d="M6 1L2 6L6 11"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <PageButton className="first-page" page={1} pageIndex={pageIndex} onPage={onPage} />
      {
        pageTotal > 1 && (
          <>
            {renderPageMiddle({ pageIndex, pageTotal, onPage })}
            <PageButton className="last-page" page={pageTotal} pageIndex={pageIndex} onPage={onPage} />
          </>
        )
      }
      <div
        title="next"
        className="w-[16px] h-[16px] ml-[18px] click flex justify-center items-center hover:bg-[#f6f6f6] transition-all duration-200"
        style={{ cursor: hasMore ? 'pointer' : 'not-allowed' }}
        onClick={handleNextPage}
      >
        <svg
          width="7"
          height="12"
          viewBox="0 0 7 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity={hasMore ? 1 : 0.2}
            d="M1 1L5 6L1 11"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

interface PaginationProps {
  pageIndex: number;
  pageTotal: number;
  hasMore: boolean;
  className: string;

  onPage(page: number): void;
}

export default Pagination;
