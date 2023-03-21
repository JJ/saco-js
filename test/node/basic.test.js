import { equal, deepEqual } from "node:assert";
import { test, describe, it } from "node:test";

import {
  valOr0,
  incrementOrInit,
  hashify,
  sacoUnion,
  sacoIntersection,
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
});

const anotherArray = [..."ccc".split(""), ..."bbb".split("")];
const anotherSaco = hashify(anotherArray);
const mergedSaco = sacoUnion(aSaco, anotherSaco);

test("sacoUnionTest", (_) => {
  deepEqual(mergedSaco, { a: 3, b: 6, c: 3 });
});
