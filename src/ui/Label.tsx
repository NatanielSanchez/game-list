import type { PropsWithChildren, ReactNode } from "react";
import styled from "styled-components";

function Label({ children, label }: PropsWithChildren<{ label: ReactNode }>) {
  return (
    <StyledLabel>
      <p>{label}</p>
      {children}
    </StyledLabel>
  );
}

export default Label;

const StyledLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
