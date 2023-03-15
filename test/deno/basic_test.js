import { assertEquals } from "https://deno.land/std@0.174.0/testing/asserts.ts";

import { valOr0, incrementOrInit } from "../../index.js";

const FOO = 3;
let dummy = { foo: FOO, bar: 2 };

Deno.test(function valOr0Test() {
  for (const i in dummy) {
    assertEquals(valOr0(dummy, i), dummy[i]);
  }
  assertEquals(valOr0(dummy, "thisDoesNotExist"), 0);
});

Deno.test(function incrementOrInitTest() {
  incrementOrInit(dummy, foo);
  assertEquals(dummy["foo"], FOO + 1);
});
