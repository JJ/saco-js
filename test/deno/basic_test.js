import { assertEquals } from "https://deno.land/std@0.174.0/testing/asserts.ts";

import {
  valOr0,
  incrementOrInit,
  hashify,
  sacoUnion,
  sacoIntersection,
} from "../../index.js";

const FOO = 3;
const dummy = { foo: FOO, bar: 2 };

Deno.test(function valOr0Test() {
  for (const i in dummy) {
    assertEquals(valOr0(dummy, i), dummy[i]);
  }
  assertEquals(valOr0(dummy, "thisDoesNotExist"), 0);
});

Deno.test(function incrementOrInitTest() {
  const returned = incrementOrInit(dummy, "foo");
  assertEquals(returned, dummy);
  assertEquals(dummy["foo"], FOO + 1);
  incrementOrInit(dummy, "baz");
  assertEquals(dummy["baz"], 1);
});

const anArray = [..."aaa".split(""), ..."bbb".split("")];
const aSaco = hashify(anArray);
Deno.test(function hashifyTest() {
  assertEquals(aSaco, { a: 3, b: 3 });
});

const anotherArray = [..."ccc".split(""), ..."bbb".split("")];
const anotherSaco = hashify(anotherArray);
const mergedSaco = sacoUnion(aSaco, anotherSaco);

Deno.test(function sacoUnionTest() {
  assertEquals(mergedSaco, { a: 3, b: 6, c: 3 });
});

Deno.test(function sacoInterseccionTest() {
  assertEquals(sacoIntersection(mergedSaco, anotherSaco), { b: 3 });
});
