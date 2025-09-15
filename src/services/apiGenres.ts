import type { ProxyServerError } from "./types";

const PROXY_URL = import.meta.env.VITE_PROXY_URL;

export async function getGenres() {
  const res = await fetch(PROXY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query genres "Genres"{
                fields name;
                limit 500;
              };`,
    }),
  });

  if (!res.ok) {
    const error = (await res.json()) as ProxyServerError;
    throw new Error(error.error);
  }

  const [genres] = (await res.json()) as GenresResponse;
  return genres.result;
}

type GenresResponse = [{ name: "Genres"; result: Genre[] }];
type Genre = {
  id: number;
  name: string;
};
