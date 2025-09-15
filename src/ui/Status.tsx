import styled, { css } from "styled-components";
import type { GameStatus } from "../services/types";

const Status = styled.div<{ $status: GameStatus["status"] }>`
  font-size: 1.2rem;
  padding: 0.5rem;
  border: 2px solid;
  border-radius: var(--border-radius-lg);

  ${({ $status }) =>
    ["Offline", "Cancelled", "Delisted"].includes($status) &&
    css`
      color: var(--color-red-700);
      background-color: var(--color-red-100);
      border-color: var(--color-red-700);
    `}
  ${({ $status }) =>
    ["Alpha", "Beta", "Rumored", "Early Access"].includes($status) &&
    css`
      color: var(--color-yellow-700);
      background-color: var(--color-yellow-100);
      border-color: var(--color-yellow-700);
    `}
    ${({ $status }) =>
    ["Released"].includes($status) &&
    css`
      color: var(--color-green-700);
      background-color: var(--color-green-100);
      border-color: var(--color-green-700);
    `}
`;
export default Status;
