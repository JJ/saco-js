import { assertEquals } from "https://deno.land/std@0.174.0/testing/asserts.ts";

import { valOr0, incrementOrInit, hashify } from "../../index.js";

const FOO = 3;
let dummy = { foo: FOO, bar: 2 };

Deno.test(function valOr0Test() {
  for (const i in dummy) {
    assertEquals(valOr0(dummy, i), dummy[i]);
  }
  assertEquals(valOr0(dummy, "thisDoesNotExist"), 0);
});

Deno.test(function incrementOrInitTest() {
  incrementOrInit(dummy, "foo");
  assertEquals(dummy["foo"], FOO + 1);
  incrementOrInit(dummy, "baz");
  assertEquals(dummy["baz"], 1);
});

Deno.test(function hashifyTest() {
  const anArray = [..."aaa".split(""), ..."bbb".split("")];
  console.log(anArray);
  const aHash = hashify(anArray);
  assertEquals(aHash, { a: 3, b: 3 });
});
