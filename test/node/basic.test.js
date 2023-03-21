import { equal } from "node:assert";
import { describe, it } from "node:test";

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
