import { useSearchParams } from "react-router-dom";

/**
 * Custom hook to simplify reading and manipulating URL query parameters
 * with optional synchronization behavior (e.g., resetting `page` when filters change).
 * Made with the idea of resseting pagination filter when another filter changes.
 *
 * @returns Object containing helpers for reading and writing query parameters.
 */

export function useQueryParamSync() {
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * Gets the first value of a query parameter by key.
   *
   * @param {string} key - The query parameter name.
   * @returns {string | null} - The value of the parameter, or null if not present.
   */
  function getParam(key: string): string | null {
    return searchParams.get(key);
  }

  /**
   * Gets all values associated with a query parameter key.
   *
   * @param {string} key - The query parameter name.
   * @returns {string[]} - An array of all values, or an empty array if none are present.
   */
  function getAllParams(key: string): string[] {
    return searchParams.getAll(key);
  }

  /**
   * Sets a single query parameter. Optionally synchronizes another parameter.
   *
   * @param {string} key - The parameter to set.
   * @param {string} value - The new value for the parameter.
   * @param {string} [syncKey] - An optional key to sync/reset before setting the new param.
   * @param {string | string[]} [syncValue] - Optional value(s) to set for the syncKey after clearing it.
   */
  function setParam(key: string, value: string, syncKey?: string, syncValue?: string | string[]) {
    sync(syncKey, syncValue);

    searchParams.set(key, value);
    setSearchParams(searchParams);
  }

  /**
   * Sets multiple values for a query parameter. Replaces all previous values for the given key.
   *
   * @param {string} key  The parameter to set.
   * @param {string[]} values  An array of values to assign.
   * @param {string} [syncKey]  An optional key to sync/reset before setting the new param.
   * @param {string | string[]} [syncValue] Optional value(s) to set for the syncKey after clearing it.
   */
  function setMultiParams(key: string, values: string[], syncKey?: string, syncValue?: string | string[]) {
    sync(syncKey, syncValue);

    searchParams.delete(key);
    values.forEach((v) => searchParams.append(key, v));
    setSearchParams(searchParams);
  }

  /**
   * Appends a single value to a query parameter.
   *
   * @param {string} key - The parameter name.
   * @param {string} value - The value to append.
   * @param {string} [syncKey] - An optional key to sync/reset before setting the new param.
   * @param {string | string[]} [syncValue] - Optional value(s) to set for the syncKey after clearing it.
   */
  function appendParam(key: string, value: string, syncKey?: string, syncValue?: string | string[]) {
    sync(syncKey, syncValue);
    searchParams.append(key, value);
    setSearchParams(searchParams);
  }

  /**
   * Deletes a query parameter completely or a specific value under a multi-valued param.
   *
   * @param {string} key - The parameter name.
   * @param {string} [value] - If provided, removes only the matching value. Otherwise, removes the entire key.
   * @param {string} [syncKey] - An optional key to sync/reset before setting the new param.
   * @param {string | string[]} [syncValue] - Optional value(s) to set for the syncKey after clearing it.
   */
  function deleteParam(key: string, value?: string, syncKey?: string, syncValue?: string | string[]) {
    sync(syncKey, syncValue);
    if (value) searchParams.delete(key, value);
    else searchParams.delete(key);
    setSearchParams(searchParams);
  }

  /**
   * Internal helper to synchronize a secondary key before modifying another param.
   *
   * @param {string} [syncKey] - Key to reset (e.g. "page").
   * @param {string | string[]} [syncValue] - New value(s) to assign to syncKey after clearing it.
   */
  function sync(syncKey?: string, syncValue?: string | string[]) {
    if (syncKey) {
      searchParams.delete(syncKey);
      if (syncValue) {
        if (Array.isArray(syncValue)) syncValue.forEach((v) => searchParams.append(syncKey, v));
        else searchParams.set(syncKey, syncValue);
      }
    }
  }

  return { getParam, getAllParams, setParam, setMultiParams, appendParam, deleteParam };
}
