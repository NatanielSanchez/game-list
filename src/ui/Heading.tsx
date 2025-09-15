import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${({ as }) =>
    as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: bolder;
    `}
  ${({ as }) =>
    as === "h2" &&
    css`
      font-size: 2.5rem;
      font-weight: bold;
    `}
  ${({ as }) =>
    as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: normal;
    `}
`;

export default Heading;
