import { expect, test } from "bun:test";

import {
  valOr0,
  incrementOrInit,
  hashify,
  sacoUnion,
  sacoIntersection,
} from "../../index.js";

const FOO = 3;
const dummy = { foo: FOO, bar: 2 };

test("valOr0Test", () => {
  for (const i in dummy) {
    expect(valOr0(dummy, i)).toBe(dummy[i]);
  }
  expect(valOr0(dummy, "thisDoesNotExist")).toBe(0);
});

test("incrementOrInitTest", () => {
  const returned = incrementOrInit(dummy, "foo");
  expect(returned).toBe(dummy);
  expect(dummy["foo"]).toBe(FOO + 1);
  incrementOrInit(dummy, "baz");
  expect(dummy["baz"]).toBe(1);
});

const anArray = [..."aaa".split(""), ..."bbb".split("")];
const aSaco = hashify(anArray);
test("hashifyTest", () => {
  expect(aSaco).toEqual({ a: 3, b: 3 });
});

const anotherArray = [..."ccc".split(""), ..."bbb".split("")];
const anotherSaco = hashify(anotherArray);
const mergedSaco = sacoUnion(aSaco, anotherSaco);

test("sacoUnionTest", () => {
  expect(mergedSaco).toEqual({ a: 3, b: 6, c: 3 });
});

test("sacoInterseccionTest", () => {
  expect(sacoIntersection(mergedSaco, anotherSaco)).toEqual({ b: 3, c: 3 });
  expect(sacoIntersection(mergedSaco, aSaco)).toEqual({ a: 3, b: 3 });
  const unSaco = { a: 3, b: 1 };
  const otroSaco = { a: 1, b: 3 };
  expect(sacoIntersection(unSaco, otroSaco)).toEqual({ a: 1, b: 1 });
});
