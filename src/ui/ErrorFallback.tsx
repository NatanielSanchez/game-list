import styled from "styled-components";
import ButtonText from "./ButtonText";
import { useNavigate, useRouteError } from "react-router-dom";
const StyledErrorFallback = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-100);
  color: var(--color-grey-900);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  & img {
    max-width: 30dvw;
  }

  & p {
    font-size: 3rem;
    font-family: "Orbitron", sans-serif;
  }

  & span {
    padding: 2rem;
    font-size: 2rem;
    border: 2px solid red;
    border-radius: var(--border-radius-lg);
    color: var(--color-red-800);
  }
`;

function ErrorFallback() {
  const error = useRouteError();
  const navigate = useNavigate();
  const errorMessage = error instanceof Error ? error.message : String(error);
  return (
    <StyledErrorFallback>
      <img src="/buhFlipExplode.gif" alt="App exploded!" />
      <p>The application has exploded!</p>
      <span>{errorMessage}</span>
      <ButtonText onClick={() => navigate("/")}>Try to go home</ButtonText>
    </StyledErrorFallback>
  );
}

export default ErrorFallback;
