import styled, { css } from "styled-components";
import { useSearchParams } from "react-router-dom";

const StyledFilter = styled.div`
  display: flex;
  gap: 0.4rem;
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  background-color: var(--color-grey-0);
  border: 1px solid transparent;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.5rem;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: var(--color-brand-600);
  }
`;

/*
-Adds query strings to the URL for filtering purposes.
-filterField: the name/key of the query string
-options: an array with objects for the values for the filterField, and a label for the buttons
*/
function Filter({ filterField, options }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0].value;

  function handleClick(value: string) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.delete("page"); // "reset" the page path query
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          $active={currentFilter === option.value}
          disabled={currentFilter === option.value}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;

type FilterProps = {
  filterField: string;
  options: FilterOption[];
};

type FilterOption = {
  label: string;
  value: string;
};
