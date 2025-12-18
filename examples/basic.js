import { sacoUnion, sacoIntersection, sacoDifference, sacoSymmetricDifference } from "../index.js";

const unSaco = { a: 3, b: 1 };
const otroSaco = { a: 1, b: 3 };

console.log(sacoUnion(unSaco, otroSaco)); // { a: 4, b: 4 }
console.log(sacoIntersection(unSaco, otroSaco)); // { a: 1, b: 1 }
console.log(sacoDifference(unSaco, otroSaco)); // { a: 2 }
console.log(sacoSymmetricDifference(unSaco, otroSaco)); // { a: 2, b: 2 }
