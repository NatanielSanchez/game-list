import styled from "styled-components";
import { isPrimaryGameType, type GameType } from "../../services/types";
import GameLink from "../../ui/GameLink";
import { HiOutlineExternalLink } from "react-icons/hi";

function GameTypeLink({ type, parentGameId }: { type?: GameType; parentGameId?: number }) {
  if (!type) return null;

  const typeLink =
    !isPrimaryGameType(type) && parentGameId ? (
      <LinkToMainGame to={`/games/${parentGameId}`} title="Go to main parent game">
        {type}
        <HiOutlineExternalLink />
      </LinkToMainGame>
    ) : (
      <Type>{type}</Type>
    );

  return typeLink;
}

const LinkToMainGame = styled(GameLink)`
  display: flex;
  align-items: center;
  color: var(--color-grey-500);
`;

const Type = styled.p`
  color: var(--color-grey-500);
`;

export default GameTypeLink;
