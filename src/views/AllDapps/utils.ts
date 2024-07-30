export function checkQueryEmpty(query: string, checkFn?: () => true): boolean {
  if (query && query !== 'null' && query !== 'undefined') {
    if (typeof checkFn === 'function') {
      return checkFn();
    }
  }
  return false;
}
