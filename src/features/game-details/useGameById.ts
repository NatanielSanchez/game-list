import { useQuery } from "@tanstack/react-query";
import { getGameById } from "../../services/apiGames";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function useGameById() {
  const { gameId } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["game", gameId],
    queryFn: () => getGameById(Number(gameId)),
  });
  if (error) toast.error(error.message);
  return { game: data, isLoading, error };
}

export default useGameById;
