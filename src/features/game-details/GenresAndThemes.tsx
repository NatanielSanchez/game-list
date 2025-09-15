import type { Genre, Theme } from "../../services/types";
import { Fragment } from "react/jsx-runtime";
import InfoTag from "../../ui/InfoTag";
import GameLink from "../../ui/GameLink";

function GenresAndThemes({ genres, themes }: { genres?: Genre[]; themes?: Theme[] }) {
  const genreLinks = genres
    ? genres.map((g) => (
        <GameLink to={`/games?genres=${g.id}`} title={`Search for ${g.name} games`}>
          {g.name}
        </GameLink>
      ))
    : [];
  const themeLinks = themes
    ? themes.map((t) => (
        <GameLink to={`/games?themes=${t.id}`} title={`Search for ${t.name} games`}>
          {t.name}
        </GameLink>
      ))
    : [];
  let genresAndThemes = genreLinks.concat(themeLinks);
  genresAndThemes = genresAndThemes.map((jsx, i) => (
    <Fragment key={i}>
      {jsx}
      {i !== genresAndThemes.length - 1 && " - "}
    </Fragment>
  ));

  if (genresAndThemes.length === 0) return null;
  else
    return (
      <InfoTag>
        <span>Genres/Themes:</span> {genresAndThemes}
      </InfoTag>
    );
}

export default GenresAndThemes;
