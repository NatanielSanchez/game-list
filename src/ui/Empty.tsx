import type { ReactNode } from "react";
import styled from "styled-components";

function Empty({ message, error }: { message: ReactNode; error?: ReactNode }) {
  return (
    <StyledEmpty>
      <img src="/Shrug.png" alt="Shrug emojicon" />
      <Message>{message}</Message>
      {error && <Error>{error}</Error>}
    </StyledEmpty>
  );
}

export default Empty;

const StyledEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  padding: 5rem;

  & img {
    width: 10dvw;
  }
`;

const Message = styled.p`
  font-family: var(--all-font-families);
  font-size: 3rem;
`;

const Error = styled.p`
  color: var(--color-red-500);
  font-size: 2rem;
`;
