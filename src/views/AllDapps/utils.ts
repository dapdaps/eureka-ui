export function checkQueryEmpty(query: string, checkFn?: () => boolean): boolean {
  if (query && query !== 'null' && query !== 'undefined') {
    if (typeof checkFn === 'function') {
      return checkFn();
    }
  }
  return false;
}
