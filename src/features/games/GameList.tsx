import GameCard from "./GameCard";
import useGameCards from "./useGameCards";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import { HoverableProvider } from "../../ui/Hoverable";
import StyledGameList from "../../ui/StyledGameList";

function GameList() {
  const { games, count, isLoading, error } = useGameCards();

  if (isLoading) return <Spinner />;
  if (!games || games.length === 0 || error) return <Empty message={`No games found! `} error={error?.message} />;

  return (
    <>
      <HoverableProvider>
        <StyledGameList>
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </StyledGameList>
      </HoverableProvider>
      <Pagination resultCount={count!} />
    </>
  );
}

export default GameList;
