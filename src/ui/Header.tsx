import styled from "styled-components";
import NavLinks from "./NavLinks";
import DarkModeToggle from "./DarkModeToggle";

function Header() {
  return (
    <StyledHeader>
      <Logo>
        <img src="/logo.png" alt="site logo" />
        The Game List
      </Logo>
      <NavLinks />
      <Buttons>
        <DarkModeToggle />
      </Buttons>
    </StyledHeader>
  );
}

export default Header;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 5rem;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-brand-700);
  padding: 0.5rem 5rem;

  font-family: "Orbitron", sans-serif;
`;

const Logo = styled.p`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 4rem;
  color: var(--color-grey-900);
  text-shadow: 0px 0px 5px var(--color-brand-800);
  & img {
    max-width: 4rem;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 2rem;
  margin-left: auto;
`;
