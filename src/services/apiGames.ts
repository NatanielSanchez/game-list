import {
  type API_GameCard,
  type API_Game,
  type GameCard,
  type ProxyServerError,
  type Game,
  type Video,
  type Website,
  getWebsiteImportance,
  type API_GameBasicInfo,
  type GameBasicInfo,
} from "./types";

const PROXY_URL = import.meta.env.VITE_PROXY_URL;
const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE;
const GAME_CARD_FIELDS = import.meta.env.VITE_GAME_CARD_FIELDS;
const GAME_BASIC_FIELDS = import.meta.env.VITE_GAME_BASIC_FIELDS;
const GAME_DETAILS_FIELDS = import.meta.env.VITE_GAME_DETAILS_FIELDS;

/** 
Gets a list of games for the main  Game Browser page, with minimal info for a Card component.
By design, i filter the results by game type to exclude DLCs and fancy limited-time versions (version_parent), since that can go in the GameDetails page.
Uses the multiquery endpoint of IGDB to get the games and the result count of the query, for pagination. 
REMEMBER TO CHANGE FILTERS IN BOTH QUERIES!
*/
export async function getGameCards({
  page,
  name,
  platforms,
  genres,
  themes,
  sort,
}: GameListFilters): Promise<{ count: number; games: GameCard[] }> {
  const nameQuery = name ? `& name ~ *"${name}"*` : "";
  const platformsQuery = platforms.length !== 0 ? `& platforms = [${platforms.join()}]` : "";
  const genresQuery = genres.length !== 0 ? `& genres = [${genres.join()}]` : "";
  const themesQuery = themes.length !== 0 ? `& themes = [${themes.join()}]` : "";
  const sortQuery = sort ? sort : "total_rating_count desc"; // sort by "popularity" by default

  const res = await fetch(PROXY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query games/count "gameCount" {
          where 
            game_type.type = ("Main Game","Remake","Remaster") 
            & version_parent = null 
            ${nameQuery}
            ${platformsQuery}
            ${genresQuery}
            ${themesQuery}
            ;
        };

        query games "games" {
	        fields ${GAME_CARD_FIELDS};

          where 
            game_type.type = ("Main Game","Remake","Remaster") 
            & version_parent = null 
            ${nameQuery}
            ${platformsQuery}
            ${genresQuery}
            ${themesQuery}
            ;

          limit ${PAGE_SIZE};
          offset ${(page - 1) * PAGE_SIZE};
          sort ${sortQuery};
        };`,
    }),
  });

  if (!res.ok) {
    const error = (await res.json()) as ProxyServerError;
    throw new Error(error.error);
  }

  const [gameCount, apiGames] = (await res.json()) as GameCardsQueryResponse;

  const games: GameCard[] = fixGameCardData(apiGames.result);

  return { count: gameCount.count, games };
}

// Gets basic info for GameCardTooltip which shows on hover
export async function getGameBasicInfo(id: number, signal: AbortSignal) {
  if (isNaN(id)) throw new Error("getGameBasicInfo - Invalid parameter when expecting a number: " + id);

  const res = await fetch(PROXY_URL, {
    signal,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query games "gameDetails" {
	        fields ${GAME_BASIC_FIELDS};
          where id = ${id};
          limit 1;
        };`,
    }),
  });

  // throw on response error or unexpected result: im expecting one single game object
  if (!res.ok) {
    const error = (await res.json()) as ProxyServerError;
    throw new Error(error.error);
  }
  const [games] = (await res.json()) as GameBasicInfoQueryResponse;
  if (games.result.length !== 1)
    throw new Error("getGameBasicInfo - Unexpected result count from GameDetails query: " + games.result.length);

  const game = games.result[0];

  const fixedGame = fixGameBasicData(game);
  return fixedGame;
}

// Fetches A SINGLE GAME by id.
export async function getGameById(id: number): Promise<Game> {
  if (isNaN(id)) throw new Error("getGameById - Invalid parameter when expecting a number: " + id);

  const res = await fetch(PROXY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query games "gameDetails" {
	        fields ${GAME_DETAILS_FIELDS};
          where id = ${id};
          limit 1;
        };`,
    }),
  });

  // throw on response error or unexpected result: im expecting one single game object
  if (!res.ok) {
    const error = (await res.json()) as ProxyServerError;
    throw new Error(error.error);
  }
  const [games] = (await res.json()) as GameDetailsQueryResponse;
  if (games.result.length !== 1)
    throw new Error("getGameById - Unexpected result count from GameDetails query: " + games.result.length);

  const game = games.result[0];

  const fixedGame = fixGameDetailsData(game);

  return fixedGame;
}

// Fetches MULTIPLE GAMES by ids, without the game type or version filters from the other method above.
export async function getGameCardsByIds(ids: number[] | undefined) {
  if (ids === undefined || ids.length === 0) return [];

  const res = await fetch(PROXY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query games "gamesByIds" {
	        fields ${GAME_CARD_FIELDS};
          where id = (${ids.join(",")});
          sort name asc;
          limit 500;
        };`,
    }),
  });

  if (!res.ok) {
    const error = (await res.json()) as ProxyServerError;
    throw new Error(error.error);
  }

  const [apiGames] = (await res.json()) as GamesByIdQueryResponse;

  const games: GameCard[] = fixGameCardData(apiGames.result);

  return games;
}

// Gets multiple games with ids from the user list on supabase, with optional filters and pagination.
export async function getUserGameCards(ids: number[] | undefined, page: number, name: string | null) {
  if (ids === undefined || ids.length === 0) return { count: 0, games: [] };

  const nameQuery = name ? `& name ~ *"${name}"*` : "";

  const res = await fetch(PROXY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query games/count "gameCount" {
          where 
            id = (${ids.join(",")})
            ${nameQuery}
            ;
        };

        query games "gamesByIds" {
	        fields ${GAME_CARD_FIELDS};
          where 
            id = (${ids.join(",")})
            ${nameQuery}
            ;
            limit ${PAGE_SIZE};
            offset ${(page - 1) * PAGE_SIZE};
            sort name asc;
          };`,
    }),
  });

  if (!res.ok) {
    const error = (await res.json()) as ProxyServerError;
    throw new Error(error.error);
  }

  const [userGameCount, userGames] = (await res.json()) as UserGamesQueryResponse;

  const games: GameCard[] = fixGameCardData(userGames.result);

  return { count: userGameCount.count, games };
}

// the API isnt perfect so these methods help fixing the data a bit, for ease of use in the app
function fixGameCardData(apiGames: API_GameCard[]) {
  const fixedGames: GameCard[] = apiGames.map((game) => {
    const { id, name, cover, first_release_date } = game;
    return { ...{ id, name, cover, first_release_date }, type: game.game_type?.type };
  });

  return fixedGames;
}

function fixGameBasicData(game: API_GameBasicInfo): GameBasicInfo {
  const {
    id,
    name,
    first_release_date,
    game_type,
    game_status,
    involved_companies,
    platforms,
    genres,
    themes,
    summary,
  } = game;
  const developers = involved_companies?.filter((c) => c.developer === true).map((c) => c.company);
  return {
    ...{ id, name, first_release_date, platforms, genres, themes, summary },
    type: game_type?.type,
    status: game_status?.status,
    developers,
  };
}

async function fixGameDetailsData(apiGame: API_Game): Promise<Game> {
  const { id, name, cover, first_release_date, genres, themes, platforms, franchises, summary, screenshots } = apiGame;

  const [dlcs, expansions, bundles, similarGames] = await Promise.all([
    getGameCardsByIds(apiGame.dlcs),
    getGameCardsByIds(apiGame.expansions),
    getGameCardsByIds(apiGame.bundles),
    getGameCardsByIds(apiGame.similar_games),
  ]);

  const developers = apiGame.involved_companies?.filter((c) => c.developer === true).map((c) => c.company);
  const publishers = apiGame.involved_companies?.filter((c) => c.publisher === true).map((c) => c.company);
  const videos: Video[] | undefined = apiGame.videos?.map((v) => {
    return { id: v.id, videoId: v.video_id };
  });

  const websites: Website[] | undefined = apiGame.websites?.map((w) => {
    return { id: w.id, name: w.type.type, url: w.url };
  });

  if (websites) websites.sort((a, b) => getWebsiteImportance(a.name) - getWebsiteImportance(b.name));

  return {
    ...{ id, name, cover, first_release_date, genres, themes, platforms, franchises, summary, screenshots },
    developers: developers?.length === 0 ? undefined : developers,
    publishers: publishers?.length === 0 ? undefined : publishers,
    status: apiGame.game_status?.status,
    type: apiGame.game_type?.type,
    parentGameId: apiGame.parent_game,
    versionParentId: apiGame.version_parent,
    dlcs: dlcs.length === 0 ? undefined : dlcs,
    expansions: expansions.length === 0 ? undefined : expansions,
    bundles: bundles.length === 0 ? undefined : bundles,
    similarGames: similarGames.length === 0 ? undefined : similarGames,
    videos,
    websites,
  };
}

type GameListFilters = {
  page: number;
  name: string | null;
  platforms: string[];
  genres: string[];
  themes: string[];
  sort: string | null;
};
type GameCardsQueryResponse = [{ name: "gameCount"; count: number }, { name: "gameCards"; result: API_GameCard[] }];
type GameBasicInfoQueryResponse = [{ name: "gameBasicInfo"; result: API_GameBasicInfo[] }];
type GameDetailsQueryResponse = [{ name: "gameDetails"; result: API_Game[] }];
type GamesByIdQueryResponse = [{ name: "gamesById"; result: API_GameCard[] }];
type UserGamesQueryResponse = [{ name: "userGameCount"; count: number }, { name: "userGames"; result: API_GameCard[] }];
