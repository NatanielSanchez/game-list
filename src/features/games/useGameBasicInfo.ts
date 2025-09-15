import { useQuery } from "@tanstack/react-query";
import { getGameBasicInfo } from "../../services/apiGames";
import toast from "react-hot-toast";

function useGameBasicInfo(gameId: number) {
  const {
    data: gameBasicInfo,
    isLoading: isFetchingBasicInfo,
    error,
  } = useQuery({
    queryKey: ["gameBasicInfo", gameId],
    queryFn: ({ signal }) => getGameBasicInfo(gameId, signal),
    retry: 3,
  });

  if (error) {
    console.error(error);
    toast.error("Something went wrong fetching game basic info for game id " + gameId + ": " + error.message);
  }
  return { gameBasicInfo, isFetchingBasicInfo, error } as const;
}
export default useGameBasicInfo;
