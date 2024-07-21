import { useCallback, useEffect, useMemo, useState } from 'react';

export const usePaginationPages = ({
  gotoPage,
  length,
  pageSize,
}: {
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  length: number;
  pageSize: number;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = useMemo<number>(() => {
    return Math.ceil(length / pageSize);
  }, [length, pageSize]);

  const canGo = useMemo(() => {
    return {
      next: currentPage < totalPages,
      previous: currentPage - 1 > 0,
    };
  }, [currentPage, totalPages]);

  const pages = useMemo(() => {
    const start = Math.floor((currentPage - 1) / 5) * 5;
    const end = start + 5 > totalPages ? totalPages : start + 5;
    return Array.from({ length: end - start }, (_, i) => start + i + 1);
  }, [currentPage, totalPages]);

  useEffect(() => {
    gotoPage(currentPage - 1);
  }, [currentPage, gotoPage]);

  const goTo = (pg: number) => {
    setCurrentPage(pg);
  };

  useEffect(() => {
    if (pageSize) {
      goTo(1);
    }
  }, [pageSize]);

  const goNext = useCallback(() => {
    if (canGo.next) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [canGo]);

  const goPrev = useCallback(() => {
    if (canGo.previous) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [canGo]);

  return {
    canGo,
    currentPage,
    pages,
    goTo,
    goNext,
    goPrev,
  };
};
