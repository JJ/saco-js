export function valOr0(hash, key) {
  return key in hash ? hash[key] : 0;
}
