import { PageButton } from './page-button';

export function renderPageMiddle(options: RenderPageMiddleOptions) {
  const { pageTotal, ...restOptions } = options;

  if (pageTotal < 6) {
    const pages = [];
    for (let i = 2; i < pageTotal; i++) {
      pages.push(i);
    }
    return pages.map((page) => (
      <PageButton key={page} page={page} {...restOptions} />
    ));
  }

  let currentPage = null;

  const morePage = (
    <PageButton page="..." {...restOptions} style={{ cursor: "default" }} />
  );

  if (![1, pageTotal].includes(options.pageIndex)) {
    currentPage = (
      <PageButton page={options.pageIndex} {...restOptions} />
    );
  }

  const renderPageLeft = () => {
    if (options.pageIndex === 3) {
      return (
        <PageButton page={2} {...restOptions} />
      );
    }
    if (options.pageIndex > 3) {
      return (
        <>
          {morePage}
          <PageButton page={options.pageIndex - 1} {...restOptions} />
        </>
      );
    }
    return null;
  };

  const renderPageRight = () => {
    if (options.pageIndex === 1) {
      return (
        <>
          <PageButton page={2} {...restOptions} />
          <PageButton page={3} {...restOptions} />
          {morePage}
        </>
      );
    }
    if (options.pageIndex === 2) {
      return (
        <>
          <PageButton page={3} {...restOptions} />
          {morePage}
        </>
      );
    }
    if (options.pageIndex === pageTotal - 2) {
      return (
        <PageButton page={pageTotal - 1} {...restOptions} />
      );
    }
    if (options.pageIndex >= pageTotal - 1) {
      return null;
    }
    return (
      <>
        <PageButton page={options.pageIndex + 1} {...restOptions} />
        {morePage}
      </>
    );
  };

  return (
    <>
      {renderPageLeft()}
      {currentPage}
      {renderPageRight()}
    </>
  );
}

export interface RenderPageMiddleOptions {
  pageIndex: number;
  pageTotal: number;
  className?: string;

  onPage(page: number): void;
}
