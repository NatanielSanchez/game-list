import { getUserGameCards } from "./apiGames";
import { supabase, type Tables, type TablesInsert } from "./supabase";
import { isValidUserGameState } from "./types";

export async function getUserGames(signal: AbortSignal, state: string | null, page: number, name: string | null) {
  let query = supabase.from("userGames").select("gameId").abortSignal(signal);

  if (state) {
    if (!isValidUserGameState(state))
      throw new Error("getUserGames - Invalid user game state passed as filter for supabase call.");
    query = query.eq("state", state);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  const igdbData = await getUserGameCards(
    data.map((d) => d.gameId),
    page,
    name
  );
  return { games: igdbData.games, count: igdbData.count };
}

export async function getUserGameByGameId(gameId: number, signal: AbortSignal) {
  const { data, error } = await supabase
    .from("userGames")
    .select()
    .eq("gameId", gameId)
    .abortSignal(signal)
    .maybeSingle(); // maybeSingle doesnt throw if no data is found, returns null instead
  if (error) throw new Error(error.message);
  return data;
}

export async function createUserGame(userGame: TablesInsert<"userGames">) {
  const { data, error } = await supabase.from("userGames").insert([userGame]).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateUserGame(userGame: Tables<"userGames">) {
  const { data, error } = await supabase
    .from("userGames")
    .update(userGame)
    .eq("gameId", userGame.gameId)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteUserGameByGameId(gameId: number) {
  const { data, error } = await supabase.from("userGames").delete().eq("gameId", gameId).select().single();
  if (error) throw new Error(error.message);
  return data;
}
