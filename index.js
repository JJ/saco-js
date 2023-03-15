/**
 * Value or 0, returns the value corresponding to a key if it exists, 0 if it does not.
 *
 * @param {Object} hash - a hash, associative array or Object
 * @param {String} key  - A string representing a key
 * @returns value corresponding to the `key`or 0 if it does not exist
 */
export function valOr0(hash, key) {
  return key in hash ? hash[key] : 0;
}
