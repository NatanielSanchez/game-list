import { useQuery } from "@tanstack/react-query";
import { getUserGameByGameId } from "../../services/apiUserList";
import toast from "react-hot-toast";

function useUserGame(gameId: number) {
  const {
    data: userGame,
    isLoading: isFetchingGameState,
    error,
  } = useQuery({
    queryKey: ["userGame", gameId],
    queryFn: ({ signal }) => getUserGameByGameId(gameId, signal),
  });
  if (error) {
    console.error(error);
    toast.error("Something went wrong when fetching game with id " + gameId + ": " + error.message);
  }
  return { userGame, isFetchingGameState, error };
}

export default useUserGame;
