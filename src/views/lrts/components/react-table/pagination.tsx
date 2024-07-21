import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

import { usePaginationPages } from './use-pagination';

const Wrap = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 28px;
  justify-content: flex-end;
`;
const PageWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const NumButton = styled.button<{ $active: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #3f3f3f;
  background: ${(props) => (props.$active ? '#414141' : 'rgba(50, 50, 50, 0.60);')};
  backdrop-filter: blur(10px);

  color: #fff;
  font-family: Orbitron;
  font-size: 12px;
  font-weight: 400;
`;

const Pagination = ({
  gotoPage,
  length,
  pageSize,
  setPageSize,
}: {
  gotoPage: any;
  // gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  length: number;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
}) => {
  const [perPage, setPerPage] = useState(pageSize);

  const { canGo, currentPage, pages, goTo, goNext, goPrev } = usePaginationPages({
    gotoPage,
    length,
    pageSize,
  });

  useEffect(() => {
    setPageSize(perPage);
  }, [perPage, setPageSize]);

  return (
    <Wrap>
      <span onClick={goPrev}>
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
          <path
            opacity={!canGo.previous ? '0.2' : '1'}
            d="M6 1L2 6L6 11"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </span>
      <PageWrap>
        {pages.map((page, i) => (
          <NumButton
            onClick={() => goTo(page)}
            key={i}
            $active={currentPage === page}
            className="m-1 px-3 py-1 border rounded-md"
          >
            {page}
          </NumButton>
        ))}
      </PageWrap>
      <span onClick={goNext}>
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
          <path
            opacity={!canGo.next ? '0.2' : '1'}
            d="M1 1L5 6L1 11"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </span>
      {/* <select
        className="px-2 py-[6px] border rounded-md w-30 bg-white"
        value={pageSize}
        onChange={(e) => setPerPage(+e.target.value)}
      >
        {[10, 50, 100].map((pgSize) => (
          <option className="py-2" value={pgSize} key={pgSize}>
            {pgSize} / page
          </option>
        ))}
      </select> */}
    </Wrap>
  );
};

export default memo(Pagination);
