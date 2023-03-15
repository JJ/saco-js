import { test } from "tap";
import { valOr0 } from "../index.js";

const dummy = { foo: 3, bar: 2 };

test("Checks aux functions", (t) => {
  for (const i in dummy) {
    t.equal(valOr0(dummy, i), dummy[i]);
  }
  t.equal(valOr0(dummy, "thisDoesNotExist"), 0);
  t.end();
});
