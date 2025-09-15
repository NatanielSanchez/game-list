import { NavLink } from "react-router-dom";
import styled from "styled-components";

const GameLink = styled(NavLink)`
  font-weight: 600;

  &:hover {
    text-decoration: underline;
    color: var(--color-brand-500);
  }
  &:active {
    text-decoration: none;
  }
`;

export default GameLink;
