import type { Platform, ProxyServerError } from "./types";

const PROXY_URL = import.meta.env.VITE_PROXY_URL;

export async function getPlatforms() {
  const res = await fetch(PROXY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query platforms "Platforms"{
          fields name,abbreviation;
          limit 500;
          sort name;
        };`,
    }),
  });

  if (!res.ok) {
    const error = (await res.json()) as ProxyServerError;
    throw new Error(error.error);
  }

  const [platforms] = (await res.json()) as PlatformQueryResponse;
  return platforms.result;
}

type PlatformQueryResponse = [{ name: "Platforms"; result: Platform[] }];
