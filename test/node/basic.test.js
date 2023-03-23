import { equal, deepEqual } from "node:assert";
import { test, describe, it } from "node:test";

import {
  valOr0,
  incrementOrInit,
  hashify,
  sacoUnion,
  sacoIntersection,
  elements,
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

describe("elements", () => {
  it("should return elements correctly", () => {
    deepEqual(elements(dummy), Object.keys(dummy));
    const aSet = new Set(elements(dummy));
    console.log(aSet.constructor);
    deepEqual(new Set(elements(aSet)), new Set(Object.keys(dummy)));
  });
});

const anArray = [..."aaa".split(""), ..."bbb".split("")];
const aSaco = hashify(anArray);
test("hashifyTest", (_) => {
  deepEqual(aSaco, { a: 3, b: 3 });
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
