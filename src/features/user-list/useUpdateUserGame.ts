import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserGame as updateUserGameAPI } from "../../services/apiUserList";
import toast from "react-hot-toast";
import type { Tables } from "../../services/supabase";

function useUpdateUserGame(gameId: number) {
  const queryClient = useQueryClient();
  const {
    mutate: updateUserGame,
    isPending: isUpdatingGameState,
    error,
  } = useMutation<
    Tables<"userGames">, // type of data returned by mutation
    Error, // type of error thrown by mutation
    Tables<"userGames"> // params object needed by mutation
  >({
    mutationFn: updateUserGameAPI,
    mutationKey: ["userGame", gameId, "update"],
    onSuccess: (data) => {
      queryClient.setQueryData(["userGame", data.gameId], data);
      queryClient.invalidateQueries({ queryKey: ["userGames"] });
      toast.success("Successfuly updated user game with game id " + data.gameId);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Something went wrong on game state update: " + error.message);
    },
  });
  return { updateUserGame, isUpdatingGameState, error };
}

export default useUpdateUserGame;
