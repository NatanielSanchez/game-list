import { useState } from "react";
import { FaPlay } from "react-icons/fa6";
import styled, { css } from "styled-components";

function Thumbnail({ thumbnailUrl, onClick }: { thumbnailUrl: string; onClick?: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <StyledThumbnail $isHovered={isHovered}>
      <img
        src={thumbnailUrl}
        alt="Youtube Thumbnail"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      />
      <FaPlay />
    </StyledThumbnail>
  );
}

export default Thumbnail;

const StyledThumbnail = styled.div<{ $isHovered: boolean }>`
  position: relative;
  width: 10dvw;

  & img {
    border: 2px solid transparent;
    width: 100%;
    &:hover {
      cursor: pointer;
      border-color: var(--color-brand-700);
    }
  }

  & svg {
    position: absolute;
    transition: color 0.3s, background-color 0.3s;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    pointer-events: none;
    color: transparent;

    ${({ $isHovered }) =>
      $isHovered &&
      css`
        color: var(--color-brand-500);
      `}
  }
`;
