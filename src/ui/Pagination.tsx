import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";
import styled, { css } from "styled-components";
import { useQueryParam } from "../hooks/useQueryParam";
import Flexbox from "./Flexbox";
import { memo } from "react";

const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE;

function Pagination({ resultCount }: { resultCount: number }) {
  const { queryParam: page, setQueryParam: setPage } = useQueryParam("page");
  const currentPage = !page ? 1 : Number(page);
  const pageCount = Math.ceil(resultCount / PAGE_SIZE);

  const pageNumbers = [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ];

  function firstPage() {
    if (currentPage !== 1) setPage("1");
  }

  function previousPage() {
    const previous = currentPage === 1 ? currentPage : currentPage - 1;
    setPage(previous.toString());
  }

  function lastPage() {
    if (currentPage !== pageCount) setPage(pageCount.toString());
  }

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    setPage(next.toString());
  }

  function goToPage(pageNumber: number) {
    if (pageNumber > 0 && pageNumber <= pageCount) setPage(pageNumber.toString());
  }

  if (pageCount <= 1) return null;
  return (
    <Flexbox $direction="vertical">
      <P>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>{currentPage === pageCount ? resultCount : PAGE_SIZE * currentPage}</span> (
        <span>{resultCount}</span> results)
      </P>
      <StyledPagination>
        {currentPage !== 1 && (
          <>
            <PaginationButton title="First" onClick={firstPage} disabled={currentPage === 1}>
              <HiChevronDoubleLeft />
            </PaginationButton>
            <PaginationButton title="Previous" onClick={previousPage} disabled={currentPage === 1}>
              <HiChevronLeft />
            </PaginationButton>
          </>
        )}
        {pageNumbers.map((num) => {
          if (num > 0 && num <= pageCount)
            return (
              <PaginationButton
                key={num}
                onClick={() => goToPage(num)}
                disabled={currentPage === num}
                $currentPage={currentPage === num}
              >
                {num}
              </PaginationButton>
            );
        })}
        {currentPage !== pageCount && (
          <>
            <PaginationButton title="Next" onClick={nextPage} disabled={currentPage === pageCount}>
              <HiChevronRight />
            </PaginationButton>
            <PaginationButton title="Last" onClick={lastPage} disabled={currentPage === pageCount}>
              <HiChevronDoubleRight />
            </PaginationButton>
          </>
        )}
      </StyledPagination>
    </Flexbox>
  );
}

export default memo(Pagination);

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0.5rem 0;
`;

const P = styled.p`
  font-size: 1.4rem;
  align-self: center;

  & span {
    font-weight: 600;
  }
`;

const PaginationButton = styled.button<{ $currentPage?: boolean }>`
  background-color: var(--color-grey-300);
  border: 2px solid transparent;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  height: 3rem;
  width: 3rem;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  transition: all 0.3s;

  ${({ $currentPage }) =>
    $currentPage &&
    css`
      background-color: var(--color-brand-600);
    `}

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    border-color: var(--color-brand-600);
  }
`;
