import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-800);

    &:hover {
      background-color: var(--color-brand-500);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-50);

    &:hover {
      background-color: var(--color-grey-200);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-500);
    }
  `,
};

const Button = styled.button<ButtonStyles>`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  ${({ $variation = "primary" }) => variations[$variation]}
  ${({ $size = "medium" }) => sizes[$size]}

  &:disabled {
    background-color: var(--color-grey-400);
    color: var(--color-grey-800);
  }

  &:active {
    transform: translateY(0.2rem);
  }
`;

export default Button;

type ButtonStyles = {
  $variation: "primary" | "secondary" | "danger";
  $size: "small" | "medium" | "large";
};
