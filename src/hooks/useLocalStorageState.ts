import { useState, useEffect } from "react";

export function useLocalStorageState<T>(initialState: T, key: string) {
  const [value, setValue] = useState<T>(function () {
    const storedValue = localStorage.getItem(key);
    if (storedValue) return JSON.parse(storedValue) as T;
    else return initialState as T;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue] as const;
}
