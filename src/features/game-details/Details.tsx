import styled from "styled-components";
import { isPrimaryGameType, type Game } from "../../services/types";
import { useDarkMode } from "../../context/DarkModeContext";
import Status from "../../ui/Status";
import { getDateFromUnix } from "../../utils/dateHelpers";
import Websites from "./Websites";
import Screenshots from "./Screenshots";
import Videos from "./Videos";
import UserGameDetails from "../user-list/UserGameDetails";
import UserListSelect from "../user-list/UserListSelect";
import GenresAndThemes from "./GenresAndThemes";
import GameTypeLink from "./GameTypeLink";
import Platforms from "./Platforms";

const COVER_IMG_1080p_URL = import.meta.env.VITE_COVER_IMG_1080p_URL;

function Details({ game }: { game: Game }) {
  const { isDarkMode } = useDarkMode();
  const {
    id,
    name,
    cover,
    type,
    genres,
    themes,
    status,
    summary,
    parentGameId,
    versionParentId,
    first_release_date,
    franchises,
    developers,
    publishers,
    platforms,
    websites,
    screenshots,
    videos,
  } = game;
  const coverImgUrl = cover
    ? `${COVER_IMG_1080p_URL + cover.image_id}.jpg`
    : `/no-cover-${isDarkMode ? "dark" : "light"}.png`;

  return (
    <>
      <StyledDetails>
        <img src={coverImgUrl} />
        <GameInfo>
          <InfoGroup>
            <Title>{name}</Title>
            <GameTypeLink type={type} parentGameId={parentGameId ? parentGameId : versionParentId} />
            {status && <Status $status={status}>{status}</Status>}
            {isPrimaryGameType(type) && (
              <SelectBox>
                <UserListSelect gameId={id} menuPosition="bottom" fontSize="2rem" />
              </SelectBox>
            )}
          </InfoGroup>

          <Websites websites={websites} />

          <InfoGroup>
            {first_release_date && (
              <InfoTag>
                <span>First release date:</span> {getDateFromUnix(first_release_date)}
              </InfoTag>
            )}
            {franchises && (
              <InfoTag>
                <span>Franchises:</span> {franchises.map((f) => f.name).join(", ")}
              </InfoTag>
            )}
          </InfoGroup>

          <Platforms platforms={platforms} />

          <GenresAndThemes genres={genres} themes={themes} />

          <InfoGroup>
            {developers && (
              <InfoTag>
                <span>Developers:</span> {developers.map((d) => d.name).join(", ")}
              </InfoTag>
            )}
            {publishers && (
              <InfoTag>
                <span>Publishers:</span> {publishers.map((p) => p.name).join(", ")}
              </InfoTag>
            )}
          </InfoGroup>

          <p>{summary}</p>

          {isPrimaryGameType(type) && <UserGameDetails gameId={id} />}
        </GameInfo>
      </StyledDetails>
      {screenshots && <Screenshots screenshots={screenshots} />}
      {videos && <Videos videos={videos} />}
    </>
  );
}
export default Details;

const StyledDetails = styled.div`
  display: flex;
  gap: 2rem;

  & img {
    height: 70dvh;
    max-width: calc(70dvh * 3 / 4);
    flex-shrink: 0;
  }
`;

const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1rem;
`;

const InfoGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  row-gap: 1rem;
`;

const InfoTag = styled.p`
  & span {
    font-weight: bolder;
    text-decoration: underline;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-family: "Orbitron", "Roboto", sans-serif;
`;

const SelectBox = styled.div`
  margin-left: auto;
`;
