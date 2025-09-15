import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ButtonText from "../ui/ButtonText";

const StyledPageNotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  padding: 10rem 0;
`;

const Image = styled.img`
  width: 20rem;
`;

const NotFound = styled.p`
  font-size: 5rem;
`;

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <StyledPageNotFound>
      <Image src="/searching.gif" alt="searching..." />
      <NotFound>Nope. Nothing here...</NotFound>
      <p>Try navigating with the links on the top!</p>
      <ButtonText onClick={() => navigate("/")}>Go home</ButtonText>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
