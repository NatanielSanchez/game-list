import styled from "styled-components";
import Heading from "../../ui/Heading";
import GameLink from "../../ui/GameLink";
import { getDateFromUnix } from "../../utils/dateHelpers";
import Flexbox from "../../ui/Flexbox";
import { isPrimaryGameType } from "../../services/types";
import Status from "../../ui/Status";
import UserListSelect from "../user-list/UserListSelect";
import useGameBasicInfo from "./useGameBasicInfo";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

function GameCardTooltip({ gameId }: { gameId: number }) {
  const { gameBasicInfo, isFetchingBasicInfo, error } = useGameBasicInfo(gameId);

  if (isFetchingBasicInfo) {
    return (
      <StyledTooltip>
        <Spinner />
      </StyledTooltip>
    );
  }

  if (!gameBasicInfo || error) {
    return (
      <StyledTooltip>
        <Empty message="No game data available" />
      </StyledTooltip>
    );
  }

  const { id, name, first_release_date, developers, genres, platforms, status, summary, themes, type } = gameBasicInfo;

  const genresAndThemes =
    !genres || !themes
      ? "Unknown"
      : genres
          .map((genre) => genre.name)
          .concat(themes.map((theme) => theme.name))
          .join(", ");

  const words = summary ? summary.split(" ") : [];
  const truncatedSummary = words.length > 80 ? words.slice(0, 80).join(" ") + "..." : summary;

  return (
    <StyledTooltip>
      <Flexbox>
        <Heading as="h3">
          <GameLink to={`/games/${id}`}>{name}</GameLink>
        </Heading>
        {type && <GameType>{type}</GameType>}
        {status && <Status $status={status}>{status}</Status>}
      </Flexbox>

      <p>
        <span>Release date:</span> {first_release_date ? getDateFromUnix(first_release_date) : "Unknown"}
      </p>

      <p>
        <span>Platforms:</span> {platforms ? platforms.map((platform) => platform.name).join(", ") : "Unknown"}
      </p>

      <p>
        <span>Genres/Themes:</span> {genresAndThemes}
      </p>

      <p>
        <span>Developer/s:</span> {developers ? developers.map((d) => d.name).join(", ") : "Unknown"}
      </p>

      {summary && <Summary>{truncatedSummary}</Summary>}
      {isPrimaryGameType(type) && <UserListSelect gameId={id} menuPosition="top" fontSize="1.2rem" />}
    </StyledTooltip>
  );
}

export default GameCardTooltip;

const StyledTooltip = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;

  font-size: 1.5rem;

  width: 25dvw;

  & span {
    text-decoration: underline;
    font-weight: bolder;
  }
`;

const GameType = styled.p`
  color: var(--color-grey-600);
  font-weight: bolder;
`;

const Summary = styled.p`
  font-size: 1.2rem;

  // prevent automatic hyphenation
  hyphens: none;
`;
