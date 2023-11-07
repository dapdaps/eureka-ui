import { useTokensStore } from '@/stores/tokens';

export default function useTokens() {
  const tokenStore: any = useTokensStore();

  const importToken = (token: { address: string }) => {
    tokenStore.addImportTokens(token);
  };

  return { tokens: tokenStore.tokens, historyTokens: tokenStore.historyTokens, importToken };
}
