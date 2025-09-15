import type { ProxyServerError } from "./types";

const PROXY_URL = import.meta.env.VITE_PROXY_URL;

export async function getThemes() {
  const res = await fetch(PROXY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query themes "Themes"{
                fields name;
                limit 500;
              };`,
    }),
  });

  if (!res.ok) {
    const error = (await res.json()) as ProxyServerError;
    throw new Error(error.error);
  }

  const [themes] = (await res.json()) as ThemesResponse;
  return themes.result;
}

type ThemesResponse = [{ name: "Themes"; result: Theme[] }];

type Theme = {
  id: number;
  name: string;
};
