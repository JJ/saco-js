import { equal, deepEqual } from "node:assert";
import { test, describe, it } from "node:test";

import { sacoUnion, hashify, sacoIntersection } from "../../index.js";

const anArray = [..."aaa".split(""), ..."bbb".split("")];
const aSaco = hashify(anArray);
const aSet = hashify(new Set(["a", "c"]));
const mergedSaco = sacoUnion(aSaco, aSet);

test("sacoUnionTest", (_) => {
  deepEqual(mergedSaco, { a: 4, b: 3, c: 1 });
});

test("sacoIntersectionTest", (_) => {
  deepEqual(sacoIntersection(aSaco, aSet), { a: 1 });
});

test("Result empty set", (_) => {
  deepEqual(sacoIntersection({ a: 3 }, { b: 3 }), {});
});

test("Result non-integer numbers", (_) => {
  deepEqual(sacoIntersection({ a: 3.2 }, { a: 2.7 }), { a: 2.7 });
});
