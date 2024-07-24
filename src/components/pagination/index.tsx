import styled from 'styled-components';

import { PageButton } from './page-button';
import { renderPageMiddle } from './render-page-middle';

const PageWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
  .prev-btn,
  .next-btn {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }
`;

const Pagination = (props: PaginationProps) => {
  const { current, total, pageSize, onChange } = props;
  const pageTotal = Math.ceil(total / pageSize);

  const hasMore = current < pageTotal;
  const handlePreviousPage = () => {
    if (current < 2) return;
    onChange(current - 1);
  };

  const handleNextPage = () => {
    if (current >= pageTotal) return;
    onChange(current + 1);
  };

  return (
    <PageWrap>
      <span
        title="prev"
        className="prev-btn"
        style={{ cursor: current > 1 ? 'pointer' : 'not-allowed' }}
        onClick={handlePreviousPage}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
          <path
            opacity={current > 1 ? 1 : 0.2}
            d="M6 1L2 6L6 11"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </span>
      <PageButton className="first-page" page={1} current={current} onChange={onChange} />
      {pageTotal > 1 && (
        <>
          {renderPageMiddle({ current, pageTotal, onChange })}
          <PageButton className="last-page" page={pageTotal} current={current} onChange={onChange} />
        </>
      )}
      <span
        title="next"
        className="next-btn"
        style={{ cursor: hasMore ? 'pointer' : 'not-allowed' }}
        onClick={handleNextPage}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
          <path opacity={hasMore ? 1 : 0.2} d="M1 1L5 6L1 11" stroke="white" stroke-width="2" stroke-linecap="round" />
        </svg>
      </span>
    </PageWrap>
  );
};

interface PaginationProps {
  current: number;
  total: number;
  pageSize: number;
  onChange(page: number): void;
}

export default Pagination;
