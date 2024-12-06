import IconLeft from '@public/svg/campaign/linea-marsh/left.svg';
import IconRight from '@public/svg/campaign/linea-marsh/right.svg';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const Button = styled.button<{ disabled: boolean }>`
  padding: 8px;
  border-radius: 6px;
  color: ${(props) => (props.disabled ? '#9CA3AF' : '#374151')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    color: ${(props) => (props.disabled ? '#9CA3AF' : '#111827')};
  }
`;

const PageButton = styled.button<{ active?: boolean }>`
  width: 26px;
  height: 26px;
  border-radius: 4px;
  background-color: ${(props) => (props.active ? '#D9D9D9' : 'transparent')};
  color: #000;
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 14px;
  line-height: 26px;
  text-align: center;
  cursor: pointer;
  border: none;
`;

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    let start = Math.max(1, currentPage - 1);
    const end = Math.min(start + 2, totalPages);

    if (end - start < 2) {
      start = Math.max(1, end - 2);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Container>
      <Button disabled={currentPage === 1} onClick={handlePrevPage}>
        <IconLeft />
      </Button>
      {getPageNumbers().map((pageNum) => (
        <PageButton key={pageNum} active={currentPage === pageNum} onClick={() => handlePageClick(pageNum)}>
          {pageNum}
        </PageButton>
      ))}
      <Button disabled={currentPage === totalPages} onClick={handleNextPage}>
        <IconRight />
      </Button>
    </Container>
  );
};

export default Pagination;
