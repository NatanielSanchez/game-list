import Empty from "../../ui/Empty";
import { HoverableProvider } from "../../ui/Hoverable";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import StyledGameList from "../../ui/StyledGameList";
import GameCard from "../games/GameCard";
import useUserGames from "./useUserGames";

function UserListGames() {
  const { count, games, isFetchingUserGames, isRefetchingUserGames, error } = useUserGames();

  if (isFetchingUserGames || isRefetchingUserGames) return <Spinner />;
  if (!games || !count || count === 0) return <Empty message="No games found!" error={error?.message} />;

  return (
    <>
      <HoverableProvider>
        <StyledGameList>
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </StyledGameList>
      </HoverableProvider>
      <Pagination resultCount={count} />
    </>
  );
}

export default UserListGames;
