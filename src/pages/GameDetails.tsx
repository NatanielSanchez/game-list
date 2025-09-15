import Details from "../features/game-details/Details";
import RelatedGames from "../features/game-details/RelatedGames";
import useGameById from "../features/game-details/useGameById";
import Empty from "../ui/Empty";
import Flexbox from "../ui/Flexbox";
import Heading from "../ui/Heading";
import { HoverableProvider } from "../ui/Hoverable";
import Spinner from "../ui/Spinner";

function GameDetails() {
  const { game, isLoading, error } = useGameById();

  if (isLoading) return <Spinner />;
  if (!game || error) return <Empty message={`No game data available! ${error ? error.message : ""}`} />;

  const { dlcs, expansions, bundles } = game;

  return (
    <>
      <Flexbox>
        <Heading as="h1">Game Details</Heading>
      </Flexbox>
      <Details game={game} />

      <HoverableProvider>
        {(dlcs || expansions || bundles) && (
          <>
            <Flexbox>
              <Heading as="h2">DLC's, Expansions and Bundles</Heading>
            </Flexbox>
            <RelatedGames games={[...(dlcs || []), ...(expansions || []), ...(bundles || [])]} />
          </>
        )}
        {game.similarGames && (
          <>
            <Flexbox>
              <Heading as="h2">Similar Games</Heading>
            </Flexbox>
            <RelatedGames games={game.similarGames} />
          </>
        )}
      </HoverableProvider>
    </>
  );
}

export default GameDetails;
