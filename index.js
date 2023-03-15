/**
 * Functions that work with hashes/objects/dicionaries using them as "bags", sets that can have repeated elements.
 */

/**
 * Value or 0, returns the value corresponding to a key if it exists, 0 if it does not.
 *
 * @param {Object} hash - a hash, associative array or Object
 * @param {String} key  - A string representing a key, present or not in the hash
 * @returns value corresponding to the `key`or 0 if it does not exist
 */
export function valOr0(hash, key) {
  return key in hash ? hash[key] : 0;
}

/**
 * Initializes a hash value for a key if it does not exist, increments if it does
 * @param {*} hash - hash to be mutated
 * @param {*} key  - key whose value is going to be set or changed
 */
export function incrementOrInit(hash, key) {
  if (key in hash) {
    hash[key]++;
  } else {
    hash[key] = 1;
  }
}

export function hashify(anArray) {
  return anArray.reduce((runningHash, el) => {
    if (el in runningHash) {
      runningHash[el]++;
    } else {
      runningHash[el] = 1;
    }
  });
}
