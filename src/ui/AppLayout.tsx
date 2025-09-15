import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: 10dvh auto;
  height: 100vh;
`;

const Main = styled.div`
  background-color: var(--color-grey-100);
  overflow-y: scroll;
  overflow-x: auto;
  padding: 1rem;
`;

const Container = styled.div`
  margin: 0 4dvw 4dvh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
