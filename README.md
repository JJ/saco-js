# saco-js [![lint and test deno](https://github.com/JJ/saco-js/actions/workflows/deno.yml/badge.svg)](https://github.com/JJ/saco-js/actions/workflows/deno.yml) [![Deploy static content to Pages](https://github.com/JJ/saco-js/actions/workflows/static.yml/badge.svg)](https://github.com/JJ/saco-js/actions/workflows/static.yml)

A bag-like data structure in JavaScript created to be compatible with node as well as deno

## Documentation/Reference

Check the [auto-generated reference](https://jj.github.io/saco-js). Create a local copy by doing

```shell
npm i -g jsdoc
# or
npm i
# and then
npm run doc
```

This will generate documentation in the `doc` directory.

## Example

```js
import { sacoUnion, sacoIntersection } from "../index.js"; // Use published URL instead

const unSaco = { a: 3, b: 1 };
const otroSaco = { a: 1, b: 3 };

console.log(sacoUnion(unSaco, otroSaco)); // { a: 4, b: 4 }
console.log(sacoIntersection(unSaco, otroSaco)); // { a: 1, b:1 }
```

Or run

```shell
deno run examples/basic.js
```

from this directory