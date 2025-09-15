import { HiOutlineBackspace } from "react-icons/hi2";
import styled from "styled-components";
import { useRef, useState } from "react";
import { useQueryParamSync } from "../hooks/useQueryParamSync";

const StyledInputFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  width: 10dvw;
`;

const Input = styled.input`
  font-size: 1.4rem;
  border: none;
  background-color: inherit;
  width: 100%;
  padding-left: 0.4rem;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: var(--color-grey-400);
  }
`;

const Clear = styled.div`
  display: flex;
  align-items: center;
  & svg {
    width: 3rem;
    height: 3rem;
    color: var(--color-grey-400);

    &:hover {
      color: var(--color-grey-700);
    }
    &:active {
      color: var(--color-brand-600);
    }
  }
`;

/*
-An input that adds a query param for filtering
*/
function InputFilter({ fieldName }: InputFilterProps) {
  const { getParam, setParam, deleteParam } = useQueryParamSync();
  const [name, setName] = useState(() => {
    const name = getParam("name");
    return name || "";
  });

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleParamChange(value: string) {
    setName(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setParam("name", value, "page");
    }, 1200);
  }

  return (
    <StyledInputFilter>
      <Input
        ref={inputRef}
        placeholder={`Search by ${fieldName}`}
        value={name}
        onChange={(e) => handleParamChange(e.target.value)}
      />
      <Clear
        onClick={() => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          deleteParam("name");
          setName("");
          inputRef.current?.focus();
        }}
      >
        <HiOutlineBackspace />
      </Clear>
    </StyledInputFilter>
  );
}

export default InputFilter;

type InputFilterProps = {
  fieldName: string;
};
