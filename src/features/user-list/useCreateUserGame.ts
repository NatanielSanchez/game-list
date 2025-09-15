import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Tables, TablesInsert } from "../../services/supabase";
import { createUserGame as createUserGameAPI } from "../../services/apiUserList";
import toast from "react-hot-toast";

function useCreateUserGame(gameId: number) {
  const queryClient = useQueryClient();
  const {
    mutate: createUserGame,
    isPending: isCreatingUserGame,
    error,
  } = useMutation<Tables<"userGames">, Error, TablesInsert<"userGames">>({
    mutationFn: createUserGameAPI,
    mutationKey: ["userGame", gameId, "create"],
    onSuccess: (data) => {
      queryClient.setQueryData(["userGame", data.gameId], data);
      queryClient.invalidateQueries({ queryKey: ["userGames"] });
      toast.success("New user game registered successfully for game id " + data.gameId);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Something went wrong on game registration: " + error.message);
    },
  });
  return { createUserGame, isCreatingUserGame, error };
}

export default useCreateUserGame;
