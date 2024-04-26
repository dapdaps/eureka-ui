export function formatTokenKey(token: any) {
  return token?.address.toLowerCase();
}

export function formatToken(token: any) {
  return { ...token, address: token.address.toLowerCase() };
}
