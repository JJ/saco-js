import { equal, deepEqual } from "node:assert";
import { test, describe, it } from "node:test";

import {
  valOr0,
  incrementOrInit,
  hashify,
  sacoUnion,
  sacoIntersection,
  sacoDifference,
  sacoSymmetricDifference,
} from "../../index.js";

const FOO = 3;
const dummy = { foo: FOO, bar: 2 };

describe("ValOr0", () => {
  it("should return value for existing keys", () => {
    for (const i in dummy) {
      equal(valOr0(dummy, i), dummy[i]);
    }
  });
  it("should return 0 for non-existing key", () => {
    equal(valOr0(dummy, "thisDoesNotExist"), 0);
  });
});

describe("incrementOrInitTest", () => {
  it("should exist and have a value", () => {
    const returned = incrementOrInit(dummy, "foo");

    equal(returned, dummy);
    equal(dummy["foo"], FOO + 1);
  });
  it("should have incremented its value", () => {
    incrementOrInit(dummy, "baz");
    equal(dummy["baz"], 1);
  });
});

const anArray = [..."aaa".split(""), ..."bbb".split("")];
const aSaco = hashify(anArray);
test("hashifyTest", (_) => {
  deepEqual(aSaco, { a: 3, b: 3 });
  deepEqual(hashify(new Set(["a", "b"])), { a: 1, b: 1 });
});

const anotherArray = [..."ccc".split(""), ..."bbb".split("")];
const anotherSaco = hashify(anotherArray);
const mergedSaco = sacoUnion(aSaco, anotherSaco);

test("sacoUnionTest", (_) => {
  deepEqual(mergedSaco, { a: 3, b: 6, c: 3 });
});

describe("sacoInterseccionTest", () => {
  it("should witk with simple intersection", () => {
    deepEqual(sacoIntersection(mergedSaco, anotherSaco), { b: 3, c: 3 });
    deepEqual(sacoIntersection(mergedSaco, aSaco), { a: 3, b: 3 });
  });
  it("should witk with common elements intersection", () => {
    const unSaco = { a: 3, b: 1 };
    const otroSaco = { a: 1, b: 3 };
    deepEqual(sacoIntersection(unSaco, otroSaco), { a: 1, b: 1 });
  });
});

describe("sacoDifferenceTest", () => {
  it("should return elements in first but not in second", () => {
    const unSaco = { a: 3, b: 1 };
    const otroSaco = { a: 1, b: 3 };
    deepEqual(sacoDifference(unSaco, otroSaco), { a: 2 });
    deepEqual(sacoDifference(otroSaco, unSaco), { b: 2 });
  });
  it("should return all elements when no overlap", () => {
    const unSaco = { a: 3, b: 1 };
    const otroSaco = { c: 2, d: 4 };
    deepEqual(sacoDifference(unSaco, otroSaco), { a: 3, b: 1 });
  });
  it("should return empty when first is subset of second", () => {
    const unSaco = { a: 1, b: 1 };
    const otroSaco = { a: 3, b: 3 };
    deepEqual(sacoDifference(unSaco, otroSaco), {});
  });
  it("should work with complex bags", () => {
    deepEqual(sacoDifference(mergedSaco, aSaco), { b: 3, c: 3 });
    deepEqual(sacoDifference(mergedSaco, anotherSaco), { a: 3, b: 3 });
  });
});

describe("sacoSymmetricDifferenceTest", () => {
  it("should return symmetric difference", () => {
    const unSaco = { a: 3, b: 1 };
    const otroSaco = { a: 1, b: 3 };
    deepEqual(sacoSymmetricDifference(unSaco, otroSaco), { a: 2, b: 2 });
  });
  it("should return union when no overlap", () => {
    const unSaco = { a: 3, b: 1 };
    const otroSaco = { c: 2, d: 4 };
    deepEqual(sacoSymmetricDifference(unSaco, otroSaco), { a: 3, b: 1, c: 2, d: 4 });
  });
  it("should return empty when sacos are identical", () => {
    const unSaco = { a: 3, b: 1 };
    const otroSaco = { a: 3, b: 1 };
    deepEqual(sacoSymmetricDifference(unSaco, otroSaco), {});
  });
  it("should work with complex bags", () => {
    deepEqual(sacoSymmetricDifference(mergedSaco, aSaco), { b: 3, c: 3 });
    deepEqual(sacoSymmetricDifference(aSaco, anotherSaco), { a: 3, c: 3 });
  });
});
