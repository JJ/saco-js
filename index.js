/**
 * Functions that work with hashes/objects/dicionaries using them as "bags", sets that can have repeated elements. Also, assorted utility functions for the same task.
 *
 * In general a "bag" will be a hash or associative array with numeric values. Makes more sense with positive integer values, but all operations will work if values are just numbers.
 *
 * These are sensitive numeric operations, so we prefer to leave all checks on the client side. That means that if you make any operation with a saco with negative coefficients, it will work. What you do with it is up to you.
 *
 * Operations with other non-Object values will either fail or behave as if it was an empty "saco". Again, caveat emptor.
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
 * @param {*} arrayOrSet an  composed preferably of strings or a Set.
 * @returns a "saco" or bag that counts the number of repeated elements
 */
export function hashify(arrayOrSet) {
  const initialHash = {};
  const pureArray =
    arrayOrSet instanceof Set ? Array.from(arrayOrSet) : arrayOrSet;
  return pureArray.reduce(
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
  const resultsSet = {};
  for (const i of keys) {
    resultsSet[i] = valOr0(unSaco, i) + valOr0(otroSaco, i);
  }
  return resultsSet;
}

/**
 * Intersection of "sacos", retuns an array that uses keys common to both sacos, with the minimum value. Non-compatible objects will work as emmpty sacos; simple arrays will act as sets with as many numeric different elements as elements in the array; thus, [1,2] will have a "0" element that appears 1 and an "1" element that appears 2 times.
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
