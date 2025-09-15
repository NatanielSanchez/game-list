import type { GameCard as GameCardType } from "../../services/types";
import StyledGameList from "../../ui/StyledGameList";
import GameCard from "../games/GameCard";

function RelatedGames({ games }: { games: GameCardType[] }) {
  return (
    <StyledGameList>
      {games.map((g) => (
        <GameCard key={g.id} game={g} />
      ))}
    </StyledGameList>
  );
}

export default RelatedGames;
