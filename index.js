/**
 * Functions that work with hashes/objects/dicionaries using them as "bags", sets that can have repeated elements. Also, assorted utility functions for the same task
 */

/**
 * Value or 0, returns the value corresponding to a key if it exists, 0 if it does not.
 *
 * @param {Object} hashOrSet - a hash, associative array or Object
 * @param {String} key  - A string representing a key, present or not in the hash
 * @returns value corresponding to the `key`or 0 if it does not exist
 */
export function valOr0(hashOrSet, key) {
  if (hashOrSet instanceof Set) {
    return hashOrSet.has(key) ? 1 : 0;
  } else {
    return key in hashOrSet ? hashOrSet[key] : 0;
  }
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
  const keys = new Set([...elements(unSaco), ...elements(otroSaco)]);
  const resultsSet = {};
  for (const i of keys) {
    resultsSet[i] = valOr0(unSaco, i) + valOr0(otroSaco, i);
  }
  return resultsSet;
}

/**
 * Intersection of "sacos", retuns an array that uses keys common to both sacos, with the minimum value.
 * @param {*} unSaco   - first saco
 * @param {*} otroSaco - second saco
 * @returns {Object} merged "saco"
 */
export function sacoIntersection(unSaco, otroSaco) {
  const resultsSet = {};
  for (const i in unSaco) {
    if (i in otroSaco) {
      const min = Math.min(unSaco[i], otroSaco[i]);
      if (min > 0) {
        resultsSet[i] = min;
      }
    }
  }
  return resultsSet;
}

/**
 * Extracts the elements of the bag using different methods depending on the type
 * @param {*} hashOrSet either an associative array or a set
 * @returns { Array } - an Array with the elements of the Set or keys in a bag - associative array
 */
export function elements(hashOrSet) {
  if (hashOrSet instanceof Set) {
    return hashOrSet.keys();
  } else {
    return Object.keys(hashOrSet);
  }
}
