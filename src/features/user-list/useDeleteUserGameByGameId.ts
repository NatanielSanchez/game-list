import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserGameByGameId as deleteUserGameByGameIdAPI } from "../../services/apiUserList";
import toast from "react-hot-toast";

function useDeleteUserGameByGameId(gameId: number) {
  const queryClient = useQueryClient();
  const {
    mutate: deleteUserGameByGameId,
    isPending: isDeletingGameByGameId,
    error,
  } = useMutation({
    mutationFn: deleteUserGameByGameIdAPI,
    mutationKey: ["userGame", gameId, "delete"],
    onSuccess: (data) => {
      queryClient.setQueryData(["userGame", data.gameId], null);
      queryClient.invalidateQueries({ queryKey: ["userGames"] });
      toast.success("User game with game id " + data.gameId + " deleted successfully!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Something went wrong on deleting game: " + error.message);
    },
  });
  return { deleteUserGameByGameId, isDeletingGameByGameId, error };
}

export default useDeleteUserGameByGameId;
