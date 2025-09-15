import { useQuery } from "@tanstack/react-query";
import { getUserGames } from "../../services/apiUserList";
import toast from "react-hot-toast";
import { useQueryParamSync } from "../../hooks/useQueryParamSync";

function useUserGames() {
  const { getParam } = useQueryParamSync();

  // game state filter
  let state = getParam("state");
  if (state === "All") state = null;

  // pagination
  const page = Number(getParam("page")) || 1;

  //name filter
  const name = getParam("name");

  const {
    data,
    isLoading: isFetchingUserGames,
    isRefetching: isRefetchingUserGames,
    error,
  } = useQuery({
    queryKey: ["userGames", state, page, name],
    queryFn: ({ signal }) => getUserGames(signal, state, page, name),
  });
  if (error) {
    console.error(error);
    toast.error("Something went wrong fetching user games: " + error.message);
  }

  return { count: data?.count, games: data?.games, isFetchingUserGames, isRefetchingUserGames, error };
}

export default useUserGames;
