import { IoGameControllerOutline, IoLibraryOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function NavLinks() {
  return (
    <StyledNavLinks>
      <StyledNavLink to="/games" end>
        <IoGameControllerOutline />
        All Games
      </StyledNavLink>
      {/* <StyledNavLink to="/upcoming-releases">
        <IoFlameOutline />
        Upcoming games
      </StyledNavLink> */}
      <StyledNavLink to="/userList">
        <IoLibraryOutline />
        Your List
      </StyledNavLink>
    </StyledNavLinks>
  );
}
export default NavLinks;

const StyledNavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: flex-start;
  color: var(--color-grey-800);
  font-size: 2rem;
  font-weight: bolder;
  background: transparent;

  & svg {
    max-height: 100%;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-brand-500);
    text-shadow: 0 0 10px var(--color-brand-700);
  }
`;
