import { equal, deepEqual } from "node:assert";
import { test, describe, it } from "node:test";

import { sacoUnion, hashify, sacoIntersection } from "../../index.js";

const anArray = [..."aaa".split(""), ..."bbb".split("")];
const aSaco = hashify(anArray);
const aSet = new Set(["a", "c"]);
const mergedSaco = sacoUnion(aSaco, aSet);

test("sacoUnionTest", (_) => {
  deepEqual(mergedSaco, { a: 4, b: 3, c: 1 });
});

test("sacoUnionTest", (_) => {
  deepEqual(sacoIntersection(aSaco, aSet), { a: 1 });
});
