import styled, { css } from "styled-components";

const Flexbox = styled.div<{ $direction?: "horizontal" | "vertical" }>`
  display: flex;
  ${({ $direction = "horizontal" }) =>
    $direction === "horizontal"
      ? css`
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        `
      : css`
          flex-direction: column;
          gap: 1rem;
        `}
`;

export default Flexbox;
