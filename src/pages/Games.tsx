import GameList from "../features/games/GameList";
import GameListOperations from "../features/games/GameListOperations";
import Flexbox from "../ui/Flexbox";
import Heading from "../ui/Heading";

function Games() {
  return (
    <>
      <Flexbox $direction="horizontal">
        <Heading as="h1">Browse games</Heading>
        <GameListOperations />
      </Flexbox>
      <GameList />
    </>
  );
}

export default Games;
