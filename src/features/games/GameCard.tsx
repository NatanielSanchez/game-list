import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";
import { getYearFromUnix } from "../../utils/dateHelpers";
import GameLink from "../../ui/GameLink";
import type { GameCard } from "../../services/types";
import { memo, useEffect } from "react";
import { useHoverable } from "../../ui/Hoverable";
import GameCardTooltip from "./GameCardTooltip";

type GameCardProps = {
  game: GameCard;
};

const COVER_IMG_URL = import.meta.env.VITE_COVER_IMG_URL;

function GameCard({ game }: GameCardProps) {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const { showTooltip, hideTooltip } = useHoverable();

  useEffect(() => {
    return () => {
      hideTooltip();
    };
  }, [hideTooltip]);

  const { id, name, cover, first_release_date, type } = game;

  const nameWords = name.split(" ");
  let displayName = nameWords.length <= 4 ? name : nameWords.slice(0, 4).join(" ") + "...";
  if (displayName.length > 26) displayName = displayName.slice(0, 23).concat("...");

  return (
    <StyledGameCard>
      <Cover
        id={`game-${id}`}
        loading="lazy"
        onClick={() => navigate(`/games/${id}`)}
        onMouseEnter={() => showTooltip(<GameCardTooltip gameId={id} />, `game-${id}`)}
        onMouseLeave={() => hideTooltip()}
        src={cover ? `${COVER_IMG_URL}${cover.image_id}.jpg` : `/no-cover-${isDarkMode ? "dark" : "light"}.png`}
      />
      <GameLink title={name} to={`/games/${id}`}>
        {displayName}
      </GameLink>
      <Spans>
        <span>{first_release_date ? getYearFromUnix(first_release_date) : "Soon™"}</span>
        {type && <span>&bull; {type}</span>}
      </Spans>
    </StyledGameCard>
  );
}

export default memo(GameCard);

const StyledGameCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  & span {
    font-size: 1.2rem;
    color: var(--color-grey-500);
  }

  & a {
    font-size: 1.3rem;
  }
`;

const Cover = styled.img`
  height: 30dvh;
  width: calc(30dvh * 3 / 4);
  object-fit: cover;
  &:hover {
    cursor: pointer;
    // maybe extra styles???
    box-shadow: 0 0 20px var(--color-brand-500);
  }
`;

const Spans = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
`;
