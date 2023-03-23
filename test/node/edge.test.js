import { equal, deepEqual } from "node:assert";
import { test, describe, it } from "node:test";

import { sacoUnion, hashify, sacoIntersection } from "../../index.js";

const anArray = [..."aaa".split(""), ..."bbb".split("")];
const aSaco = hashify(anArray);
console.log(aSaco.keys());
const aSet = new Set(["a", "c"]);
console.log(aSet.keys());
const mergedSaco = sacoUnion(aSaco, aSet);
console.log(Object.keys(aSet));

test("sacoUnionTest", (_) => {
  deepEqual(mergedSaco, { a: 4, b: 3, c: 1 });
});
