import { assertEquals } from "https://deno.land/std@0.174.0/testing/asserts.ts";

import { valOr0 } from "../../index.js";

const dummy = { foo: 3, bar: 2 };

Deno.test(function valOr0Test() {
  for (const i in dummy) {
    assertEquals(valOr0(dummy, i), dummy[i]);
  }
  assertEquals(valOr0(dummy, "thisDoesNotExist"), 0);
});
