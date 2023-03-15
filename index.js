/**
 * Functions that work with hashes/objects/dicionaries using them as "bags", sets that can have repeated elements. Also, assorted utility functions for the same task
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
 * @returns the new version of the hash
 */
export function incrementOrInit(hash, key) {
  if (key in hash) {
    hash[key]++;
  } else {
    hash[key] = 1;
  }
  return hash;
}

/**
 *
 * @param {*} anArray a hash composed preferably of strings.
 * @returns a "saco" or bag that counts the number of repeated elements
 */
export function hashify(anArray) {
  const initialHash = {};
  return anArray.reduce(
    (runningHash, el) => incrementOrInit(runningHash, el),
    initialHash
  );
}

/**
 * Union of "sacos", retuns an array that uses keys from both sacos and adds their values
 * @param {*} unSaco   - first saco
 * @param {*} otroSaco - second saco
 * @returns {Object} merged "saco"
 */
export function sacoUnion(unSaco, otroSaco) {
  const keys = new Set([...Object.keys(unSaco), ...Object.keys(otroSaco)]);
  let resultsSet = {};
  for (let i of keys) {
    resultsSet[i] = valOr0(unSaco, i) + valOr0(otroSaco, i);
  }
  return resultsSet;
}

/**
 * Intersection of "sacos", retuns an array that uses keys common to both sacos, substracting their value.
 * If the difference is 0 or less, the key is eliminated.
 * @param {*} unSaco   - first saco
 * @param {*} otroSaco - second saco
 * @returns {Object} merged "saco"
 */
export function sacoIntersection(unSaco, otroSaco) {
  let resultsSet = {};
  for (let i in unSaco) {
    if (i in otroSaco) {
      const difference = unSaco[i] - otroSaco[i];
      if (difference > 0) {
        resultsSet[i] = difference;
      }
    }
  }
  return resultsSet;
}
