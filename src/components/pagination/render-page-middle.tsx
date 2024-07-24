import { PageButton } from './page-button';

export interface RenderPageMiddleOptions {
  current: number;
  pageTotal: number;
  onChange(page: number): void;
}

export function renderPageMiddle(options: RenderPageMiddleOptions) {
  const { pageTotal, ...restOptions } = options;

  if (pageTotal < 6) {
    const pages = [];
    for (let i = 2; i < pageTotal; i++) {
      pages.push(i);
    }
    return pages.map((page) => <PageButton key={page} page={page} {...restOptions} />);
  }

  let currentPage = null;

  const morePage = <PageButton page="..." {...restOptions} style={{ cursor: 'default' }} />;

  if (![1, pageTotal].includes(options.current)) {
    currentPage = <PageButton page={options.current} {...restOptions} />;
  }

  const renderPageLeft = () => {
    if (options.current === 3) {
      return <PageButton page={2} {...restOptions} />;
    }
    if (options.current > 3) {
      return (
        <>
          {morePage}
          <PageButton page={options.current - 1} {...restOptions} />
        </>
      );
    }
    return null;
  };

  const renderPageRight = () => {
    if (options.current === 1) {
      return (
        <>
          <PageButton page={2} {...restOptions} />
          <PageButton page={3} {...restOptions} />
          {morePage}
        </>
      );
    }
    if (options.current === 2) {
      return (
        <>
          <PageButton page={3} {...restOptions} />
          {morePage}
        </>
      );
    }
    if (options.current === pageTotal - 2) {
      return <PageButton page={pageTotal - 1} {...restOptions} />;
    }
    if (options.current >= pageTotal - 1) {
      return null;
    }
    return (
      <>
        <PageButton page={options.current + 1} {...restOptions} />
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
