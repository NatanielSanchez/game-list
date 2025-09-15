import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useQueryParamSync } from "../../hooks/useQueryParamSync";
import { getGameCards } from "../../services/apiGames";

export default function useGameCards() {
  const { getParam, getAllParams } = useQueryParamSync();

  // PAGE
  const page = Number(getParam("page")) || 1;

  // NAME
  const name = getParam("name");

  // PLATFORMS (database id as strings)
  const platforms = getAllParams("platforms");

  // GENRES (database id as strings)
  const genres = getAllParams("genres");

  // THEMES (database id as strings)
  const themes = getAllParams("themes");

  // SORT (total ratings, name, and release date) e.g.: name desc
  const sort = getParam("sort");

  const { data, isLoading, error } = useQuery({
    queryKey: ["gameCards", page, name, platforms, genres, themes, sort],
    queryFn: () => getGameCards({ page, name, platforms, genres, themes, sort }),
    retry: false,
  });

  if (error) {
    console.error(error);
    toast.error("Something went wrong fetching game cards: " + error.message);
  }

  return { count: data?.count, games: data?.games, isLoading, error } as const;
}
